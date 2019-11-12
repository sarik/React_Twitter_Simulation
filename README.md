# Steps to Run

#### Use browser incognito mode for multiple signups

#### Database:

Just run the following command in root folder to get DB docker up with tables configured .Can access db locally via any
postgres client via connection settings mentioned in .env file

`docker-compose up --build`
                     OR
Run a Postrgres DB and update corresponding connection config in .env and run queries mentioned in db.sql

####  Server

Run following commands from root folder

```
npm i
node index.js
```

####  Client(available at localhost:3000)
Switch to client folder and run following commands
```
npm i
npm start
```

