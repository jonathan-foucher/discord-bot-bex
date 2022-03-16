# Overview
This app bundles discord bot programs for the BEX discord server.

## systemeio-role-bot
This bot listens to http requests posted by system.io with webhooks inside a workflow and extract the email of the user in the database.
The user can then use the `/link-email` command to link his discord account to this email in the database and receive the "Membre" role on the BEX discord server.

# Developpement environement
## Node
You need to install node to start the project.
Then you can run the `npm i` command to install all the required packages.
## Docker
You will also need to install docker and docker-compose to start the database in local.
Once Docker has started, go to the `/docker` folder with your terminal and run the `docker-compose up -d` command. It will download the required images and start the database container.

A workaround is also possible if you don't want to use Docker in your developement environment by installing a postgresql database on your machine.

## Environment variables
To provide the environment variables, just make a copy of the `.env.template` file and name it `.env`.
Then you can complete it with your values.

**HTTP_PORT**: The http port on which the server listens
<br>**DB_HOST**: The postgresql database host
<br>**DB_PORT**: The postgresql database port
<br>**DB_NAME**: The postgresql database name
<br>**DB_USER**: The postgresql database username
<br>**DB_PASSWORD**: The postgresql database password
<br>**DATABASE_URL**: The postgresql database url, you shouldn't modify it
<br>**DISCORD_APP_ID**: The discord application id
<br>**DISCORD_SERVER_ID**: The discord server id (= guild id)
<br>**DISCORD_BOT_TOKEN**: The discord bot token
<br>**DISCORD_MEMBER_ROLE_ID**: The discord "Membre" role id
<br>**COMMON_COACHING_COURSE_ID**: Systeme.io common coaching course id

# Database migrations
In order to initialize the database, play the migrations scripts with the command `npm run migrate up`

## Start the application
To start the application just run `node main.js` on the main file you want to run.

# Install and run in production
For production you can rely on the development steps, but I would suggest to use a real postgresql database installed on your server.
