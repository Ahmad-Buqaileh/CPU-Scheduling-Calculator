FROM eclipse-temurin:17-jdk-alpine


RUN apk add --no-cache bash curl git unzip

WORKDIR /app


COPY . .


RUN chmod +x mvnw


RUN ./mvnw -X clean package -DskipTests

EXPOSE 8080


CMD ["./mvnw", "spring-boot:run"]

