# Proffy

  A project made for helping students to find teachers from a specific subject which they need to learn !
Made in august, 2020 during Next Level Week II -> A project made by Rocketseat for teaching programming and making an actual project.

## How to run

### Putting this project in your machine
``` bash
  # Clone this repository
  git clone https://github.com/tsuyusk/proffy
  # Go to the folder
  cd proffy
```

### Server
To run the server, you have to:
``` bash
  # Go to the server folder
  cd server
  
  # Install dependencies
  yarn / npm install
  
  # Create the database
  yarn knex:migrate
  
  # Running the server
  yarn dev:server / npm run dev:server
```

### Web
To run the web version, you have to:
``` bash
  # Go to the web folder
  cd web
  
  # Install dependencies
  yarn / npm install
  
  # Starting the project
  yarn start / npm start
  # Now, go to http://localhost:3000
```
