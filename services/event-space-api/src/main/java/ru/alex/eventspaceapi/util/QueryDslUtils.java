package ru.alex.eventspaceapi.util;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import lombok.experimental.UtilityClass;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@UtilityClass
public class QueryDslUtils {
    public static OrderSpecifier<?>[] toOrderSpecifiers(
            Sort sort,
            Map<String, ComparableExpressionBase<?>> bindings
    ) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();

        if (sort == null || sort.isUnsorted()) {
            return orderSpecifiers.toArray(new OrderSpecifier[0]);
        }

        for (Sort.Order order : sort) {
            if (bindings.containsKey(order.getProperty())) {
                ComparableExpressionBase<?> path = bindings.get(order.getProperty());

                Order direction = order.isAscending() ? Order.ASC : Order.DESC;

                orderSpecifiers.add(new OrderSpecifier<>(direction, path));
            }
        }

        return orderSpecifiers.toArray(new OrderSpecifier[0]);
    }

    public static OrderSpecifier<?>[] toOrderSpecifiers(
            Sort sort,
            Map<String, ComparableExpressionBase<?>> bindings,
            OrderSpecifier<?> defaultOrder
    ) {
        OrderSpecifier<?>[] result = toOrderSpecifiers(sort, bindings);
        return result.length == 0 ? new OrderSpecifier[]{defaultOrder} : result;
    }
}
