package ru.alex.eventspaceapi.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.alex.eventspaceapi.dto.auth.JwtTokenData;

import java.time.ZonedDateTime;
import java.util.Date;

@Service
public class JwtService {
    private final String accessTokenSecret;
    private final long accessTokenExpiration;
    private final String refreshTokenSecret;
    private final long refreshTokenExpiration;
    private final String issuer;

    public JwtService(
            @Value("${app.security.jwt.access-token.secret}") String accessTokenSecret,
            @Value("${app.security.jwt.access-token.expiration}") long accessTokenExpiration,
            @Value("${app.security.jwt.refresh-token.secret}") String refreshTokenSecret,
            @Value("${app.security.jwt.refresh-token.expiration}") long refreshTokenExpiration,
            @Value("${app.security.jwt.issuer}") String issuer
    ) {
        this.accessTokenSecret = accessTokenSecret;
        this.refreshTokenSecret = refreshTokenSecret;
        this.refreshTokenExpiration = refreshTokenExpiration;
        this.issuer = issuer;
        this.accessTokenExpiration = accessTokenExpiration;

    }

    public String generateAccessToken(Integer id, String email) throws JWTVerificationException {
        Date expirationDate = Date.from(ZonedDateTime.now().toInstant().plusMillis(accessTokenExpiration));
        return JWT.create()
                .withSubject(id.toString())
                .withClaim("email", email)
                .withIssuedAt(new Date())
                .withIssuer(issuer)
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC256(accessTokenSecret));
    }

    public String generateRefreshToken(Integer id, String email) {
        Date expirationDate = Date.from(ZonedDateTime.now().toInstant().plusMillis(refreshTokenExpiration));
        return JWT.create()
                .withSubject(id.toString())
                .withClaim("email", email)
                .withIssuedAt(new Date())
                .withIssuer(issuer)
                .withExpiresAt(expirationDate)
                .sign(Algorithm.HMAC256(refreshTokenSecret));
    }

    public JwtTokenData validateAccessToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(accessTokenSecret))
                .withIssuer(issuer)
                .build();
        return validateTokenAndRetrieveClaim(verifier, token);
    }

    public JwtTokenData validateRefreshToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(refreshTokenSecret))
                .withIssuer(issuer)
                .build();
        return validateTokenAndRetrieveClaim(verifier, token);
    }

    private JwtTokenData validateTokenAndRetrieveClaim(JWTVerifier verifier, String token) {

        try {
            DecodedJWT jwt = verifier.verify(token);
            return new JwtTokenData(
                    Integer.valueOf(jwt.getSubject()),
                    jwt.getClaim("email").asString()
            );
        } catch (TokenExpiredException e) {
            throw e;
        }
        catch (JWTVerificationException e) {
            throw new JWTVerificationException("JWT token is not valid");
        }
    }
}
