###Steps to Run

##Database:
#Just run the following command in root folder to get DB docker up with tables configured
#can access db locally via any postgres client via settings in .env file
at port 5432 with connection settings)
docker-compose up --build
                     OR
Run a Postrgres DB and update config in .env and run queries mentioned in db.sql

##Server
#Run following commands from root folder
npm i
node node.js

##Client(available at localhost:3000)
#switch to client folder and run following commands
npm i
npm start

#Make sure db is working as application may break otherwise
