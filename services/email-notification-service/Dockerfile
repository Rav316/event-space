FROM gradle:9.1-jdk21 as build

WORKDIR /home/gradle/src
COPY . .

RUN gradle clean bootJar

FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /home/gradle/src/build/libs/*.jar app.jar


EXPOSE 8081

CMD ["java", "-jar", "app.jar"]
