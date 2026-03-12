package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import ru.alex.eventspaceapi.database.entity.Space;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;
import ru.alex.eventspaceapi.dto.filter.SpaceFilter;

import java.util.List;

public interface SpaceRepositoryCustom {
    List<Space> findAllByFilter(SpaceFilter filter);

    Page<Space> findAllByFilter(AdminListFilter filter, Sort sort);
}
