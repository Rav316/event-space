FROM gradle:9.3-jdk21 AS build

WORKDIR /home/gradle/src

COPY build.gradle settings.gradle version.gradle ./

RUN gradle dependencies --no-daemon

COPY src ./src

RUN gradle clean bootJar --no-daemon

FROM eclipse-temurin:21-jdk

WORKDIR /app

RUN apt-get update && \
    apt-get install -y imagemagick curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v2.26.1/opentelemetry-javaagent.jar /app/opentelemetry-javaagent.jar

COPY --from=build /home/gradle/src/build/libs/*.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod

CMD ["java", "-javaagent:/app/opentelemetry-javaagent.jar", "-jar", "app.jar"]
