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

    public String saveFile(MultipartFile file, String subDir) {
        String extension = getFileExtension(file, subDir);

        String randomFileName = UUID.randomUUID() + extension;
        Path dirPath = Paths.get(staticContentPath, subDir);

        try {
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }

            Path filePath = dirPath.resolve(randomFileName);

            file.transferTo(filePath);

            if (isImage(extension)) {
                compressWithMagick(filePath);
            }

            return "/" + subDir + "/" + randomFileName;

        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }

    private static String getFileExtension(MultipartFile file, String subDir) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("file is empty");
        }

        if (subDir == null || subDir.isBlank()) {
            throw new IllegalArgumentException("subDir must not be empty");
        }

        String originalFileName = file.getOriginalFilename();
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf(".")).toLowerCase();
        }
        return extension;
    }

    public void deleteFileByUrl(String fileUrl) {
        if (fileUrl == null || fileUrl.isBlank()) {
            throw new IllegalArgumentException("fileUrl is empty");
        }

        Path filePath = Paths.get(staticContentPath, fileUrl.startsWith("/") ? fileUrl.substring(1) : fileUrl);

        try {
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + filePath, e);
        }
    }

    private boolean isImage(String ext) {
        return ext.endsWith(".jpg") || ext.endsWith(".jpeg") || ext.endsWith(".png");
    }

    private void compressWithMagick(Path filePath) throws IOException, InterruptedException {
        ProcessBuilder pb = new ProcessBuilder(
                "magick", filePath.toString(),
                "-resize", "1920x1080>",
                "-quality", "75",
                filePath.toString()
        );

        pb.redirectErrorStream(true);
        Process process = pb.start();

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("ImageMagick compression failed, exit code = " + exitCode);
        }
    }
}
