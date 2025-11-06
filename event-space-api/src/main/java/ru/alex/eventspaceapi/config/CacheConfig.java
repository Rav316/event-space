package ru.alex.eventspaceapi.config;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new CaffeineCacheManager() {
            @Override
            protected Cache<Object, Object> createNativeCaffeineCache(String name) {
                if (name.equals("overviewStats") || name.equals("reviewsStats")) {
                    return Caffeine.newBuilder()
                            .expireAfterWrite(10, TimeUnit.MINUTES)
                            .maximumSize(1000)
                            .build();
                }
                return Caffeine.newBuilder()
                        .expireAfterWrite(15, TimeUnit.MINUTES)
                        .maximumSize(1000)
                        .build();
            }
        };
    }
}
