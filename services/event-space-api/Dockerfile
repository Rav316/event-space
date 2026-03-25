FROM gradle:9.1-jdk21 AS build

WORKDIR /home/gradle/src

COPY build.gradle settings.gradle version.gradle ./

RUN gradle dependencies --no-daemon

COPY src ./src

RUN gradle clean bootJar --no-daemon

FROM eclipse-temurin:21-jdk

WORKDIR /app

RUN apt-get update && \
    apt-get install -y imagemagick && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /home/gradle/src/build/libs/*.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=prod

CMD ["java", "-jar", "app.jar"]
