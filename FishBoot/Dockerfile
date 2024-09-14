FROM maven:3.8.5 AS builder
WORKDIR /build

ARG DBUSER
ARG DBPASS
ARG SPRING_DATASOURCE_URL
ENV DBUSER=${DBUSER}
ENV DBPASS=${DBPASS}
ENV SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}

COPY ./pom.xml .
COPY ./src ./src
RUN mvn clean package

FROM eclipse-temurin:17
WORKDIR /opt
COPY --from=builder /build/target/*.jar /opt/app.jar
ENV PORT 8080
EXPOSE 8080
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar