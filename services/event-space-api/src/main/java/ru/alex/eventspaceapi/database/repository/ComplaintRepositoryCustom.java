package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import ru.alex.eventspaceapi.database.entity.Complaint;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;

public interface ComplaintRepositoryCustom {
    Page<Complaint> findAll(AdminListFilter filter, Sort sort);
}
