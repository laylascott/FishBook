FROM maven:3.8.5 AS builder
WORKDIR /build

COPY ./pom.xml .
COPY ./src ./src
RUN mvn clean package

FROM eclipse-temurin:17
WORKDIR /opt
COPY --from=builder /build/target/*.jar /opt/app.jar
ENV PORT 8080
EXPOSE 8080
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar