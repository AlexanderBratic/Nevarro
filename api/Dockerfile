FROM gradle:7.5.1-jdk17-alpine AS build
COPY . /app
WORKDIR /app
RUN gradle bootJar

FROM openjdk:17-jdk-slim AS deploy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
COPY GoogleApiMockResponse.txt AutoCompleteMockResponse.txt apiKe[y] ./api/
ENTRYPOINT ["java", "-jar", "app.jar"]
