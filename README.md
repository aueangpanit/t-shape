# t-shape

## Run the development server

Database `docker-compose up`

Service `./mvnw spring-boot:run`

Client `npm start`

## Accessing the development database

```
docker ps
docker exec -it [NAME] bash
mysql -uroot -proot
```

## ERD

![ERD](https://i.imgur.com/dTdKfT1.png)

## Risk Assessment Matrix
| Description | Evaluation | Likehood | Impact | Responsibility | Response | Control Measure |
| ----------- | ---------- | -------- | ------ | -------------- | -------- | --------------- |
| Someone could gain unwarented access | Delete all business critical records | Low | Very High | AWS | <ul><li>Indentify/fix vunerability.</li><li>Inform right people.</li><li>Try to recover as much data as possible</li></ul> | <ul><li>(L) Make sure all users have strong password.</li><li>(L) Analyse code to check for vunerabilities.</li><li>(I) Backups</li><li>(I) Limiting user access</li></ul> |
