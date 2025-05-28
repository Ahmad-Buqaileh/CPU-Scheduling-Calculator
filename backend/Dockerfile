FROM eclipse-temurin:21-jdk

RUN apt-get update && apt-get install -y curl git unzip

WORKDIR /app

COPY . .

RUN chmod +x mvnw

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["./mvnw", "spring-boot:run"]

