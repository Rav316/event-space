FROM gradle:9.1-jdk21 as build

WORKDIR /home/gradle/src
COPY . .

RUN gradle clean bootJar

FROM eclipse-temurin:21-jdk

WORKDIR /app

RUN apt-get update && \
    apt-get install -y imagemagick && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /home/gradle/src/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
