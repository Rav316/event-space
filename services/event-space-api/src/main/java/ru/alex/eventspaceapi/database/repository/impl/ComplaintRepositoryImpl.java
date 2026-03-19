package ru.alex.eventspaceapi.database.repository.impl;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import ru.alex.eventspaceapi.database.entity.Complaint;
import ru.alex.eventspaceapi.database.repository.ComplaintRepositoryCustom;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.util.PageUtils;
import ru.alex.eventspaceapi.util.QueryDslUtils;

import java.util.List;
import java.util.Map;

import static ru.alex.eventspaceapi.database.entity.QComplaint.complaint;

@Component
@RequiredArgsConstructor
public class ComplaintRepositoryImpl implements ComplaintRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    private static final Map<String, ComparableExpressionBase<?>> SORT_BINDINGS = Map.of(
            "id", complaint.id,
            "complaintDate", complaint.complaintDate,
            "status", complaint.status,
            "targetType", complaint.targetType,
            "complaintTypeName", complaint.complaintType.name
    );

    @Override
    public Page<Complaint> findAll(AdminListFilter filter, Sort sort) {
        int page = filter.page() != null && filter.page() > 0 ? filter.page() : 0;
        int requestedSize = filter.size() != null && filter.size() > 0 ? filter.size() : 15;
        int pageSize = PageUtils.getNearestPageSize(requestedSize);
        Pageable pageable = PageRequest.of(page, pageSize);

        BooleanExpression predicate = buildPredicate(filter);
        OrderSpecifier<?>[] sortOrder = QueryDslUtils.toOrderSpecifiers(sort, SORT_BINDINGS, complaint.id.desc());

        List<Complaint> complaints = queryFactory
                .selectFrom(complaint)
                .leftJoin(complaint.complaintType).fetchJoin()
                .leftJoin(complaint.author).fetchJoin()
                .where(predicate)
                .orderBy(sortOrder)
                .limit(pageable.getPageSize())
                .offset(pageable.getOffset())
                .fetch();

        Long total = queryFactory
                .select(complaint.count())
                .from(complaint)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(complaints, pageable, total != null ? total : 0);
    }

    private BooleanExpression buildPredicate(AdminListFilter filter) {
        BooleanExpression predicate = Expressions.TRUE.isTrue();

        if (filter.search() != null && !filter.search().isBlank()) {
            predicate = predicate.and(
                    complaint.description.containsIgnoreCase(filter.search())
                            .or(complaint.author.firstName.containsIgnoreCase(filter.search()))
                            .or(complaint.author.lastName.containsIgnoreCase(filter.search()))
                            .or(complaint.complaintType.name.containsIgnoreCase(filter.search()))
            );
        }

        return predicate;
    }
}
