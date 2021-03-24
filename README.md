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
| DDOS attack | Prevent users from using our website. Increase cloud spending. | Low | High | Us | <ul><li>Temporary shut down server.</li><li>Black list ip adresses. </li></ul> | Setup budget alert |
| Did not finished all items in planed sprint | May not finish the project in time | Low | High | Us | Move items to next sprint and re-evaluate verlocity. | Prioritise tasks to make sure that at a minium, the core functionalities are completed. |
| Server is down | Prevent users from using our website | Low | High | AWS | Contact AWS. Create new instances and migrate data from db. | Have backup instances |
| A bug is found in the live website after a commit | May prevent users from certain functionalities | Medium | Low-High (depends on the bug) | Us | Revert commit/fix issue in new commit in some cases | Follow best practices. Have unit, integration and E2E tests. Have a testing team. Use code reviews. |
