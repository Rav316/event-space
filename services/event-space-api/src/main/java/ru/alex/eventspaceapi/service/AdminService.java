package ru.alex.eventspaceapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.alex.eventspaceapi.database.dao.AdminStatisticsDao;
import ru.alex.eventspaceapi.dto.statistics.AdminStatisticsDto;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AdminService {
    private final AdminStatisticsDao adminStatisticsDao;

    public AdminStatisticsDto getStatistics() {
        return adminStatisticsDao.getAdminStatistics();
    }
}
