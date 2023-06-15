
# Crawling kết quả RACING F1 của RACE RESULTS

+ VRILLAR VIETNAM - Bài test phỏng vấn cho vị trí lập trình viên Frontend/interview assignment for the position of Frontend programmer
+ VRILLAR VIETNAM - Bài test phỏng vấn cho vị trí lập trình viên Backend/interview assignment for the position of Backend programmer
## Introduce myself
+ Hi 👋, I'm Nguyễn Nhật Tâm
+ I'm a fullstack javascript developer
## Introduce my project
### Frontend
#### Install
+ cd client
+ yarn install
+ yarn start
#### Description
+ The website shows a list of races, teams, drivers by year and by points in descending order
### Backend
#### Install
+ cd server
+ npm install --save-dev
+ npm run dev
#### Description
##### Race api
+ http://locahost:5000/race/list?year=... 
=> returns the race list for the year
+ http://locahost:5000/race/detail/:year/:id 
=> returns detailed information and a list of the racers in the race
##### Team api
+ http://locahost:5000/team/list?sortBy=points&&orderBy=desc&&year=... 
=> returns the team list for the year
+ http://locahost:5000/team/detail/:year/:id 
=> returns a list of races the team participated in during the year
##### Driver api
+ http://locahost:5000/driver/list?sortBy=points&&orderBy=desc&&year=... 
=> returns the driver list for the year
+ http://locahost:5000/driver/detail/:year/:id 
=>  returns a list of races the driver participated in during the year
##### In addition, jsonwebtoken is used to authenticate and decentralize users when adding races, team and driver information; also use package joi to validate input data