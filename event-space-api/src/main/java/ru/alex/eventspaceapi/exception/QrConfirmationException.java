package ru.alex.eventspaceapi.exception;

import lombok.Getter;
import ru.alex.eventspaceapi.model.QrConfirmErrorCode;

public class QrConfirmationException extends RuntimeException {
    @Getter
    private final QrConfirmErrorCode code;

    public QrConfirmationException(QrConfirmErrorCode code, String message) {
        super(message);
        this.code = code;
    }
}
