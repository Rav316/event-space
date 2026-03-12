package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import ru.alex.eventspaceapi.database.entity.Faculty;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;

public interface FacultyRepositoryCustom {
    Page<Faculty> findAllByFilter(AdminListFilter filter, Sort sort);
}
