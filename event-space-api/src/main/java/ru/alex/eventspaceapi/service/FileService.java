package ru.alex.eventspaceapi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {
    @Value("${app.static-content.path}")
    private String staticContentPath;

    public String saveFile(MultipartFile file) {
        if(file.isEmpty()) {
            throw new IllegalArgumentException("file is empty");
        }
        String originalFileName = file.getOriginalFilename();
        String extension = "";
        if(originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }

        String randomFileName = UUID.randomUUID() + extension;

        Path dirPath = Paths.get(staticContentPath + "/events");
        try {
            if(!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }
            Path filePath = dirPath.resolve(randomFileName);
            file.transferTo(filePath.toFile());
            return "/events/" + randomFileName;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
