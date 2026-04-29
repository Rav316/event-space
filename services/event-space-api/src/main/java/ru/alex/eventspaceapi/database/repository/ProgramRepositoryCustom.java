package ru.alex.eventspaceapi.database.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import ru.alex.eventspaceapi.database.entity.Program;
import ru.alex.eventspaceapi.dto.program.ProgramDeleteImpactDto;
import ru.alex.eventspaceapi.dto.filter.AdminListFilter;

public interface ProgramRepositoryCustom {
    Page<Program> findAllByFilter(AdminListFilter filter, Sort sort);

    ProgramDeleteImpactDto getDeleteImpact(Integer id);
}
