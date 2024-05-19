# slang almanac

small project created for full stack udemy course for practice using apis.
allows users to search urban dictionary whether it is with a random word or a word the user inputs.

## set up
### 1. clone repo
```
git clone git@github.com:baller7215/slang-almanac.git
```

### 2. install node.js
```
cd ./slang-almanac
npm init -y
```
### 3. install dependencies
```
npm install
```
or 
```
npm install express axios body-parser dotenv
```

### 4. get api key and store in dotenv file
random word API: https://api.api-ninjas.com/v1/randomword
urban dictionary API: https://mashape-community-urban-dictionary.p.rapidapi.com/define

### 5. run program on local host 2000
```
nodemon index.js
```
