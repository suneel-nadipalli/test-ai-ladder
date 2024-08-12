# Web Development & Deployment Tutorial

## Overview

This repository serves as a personal tutorial for developing and deploying a full stack web app to an AWS EC2 Instance with the help of DockerHub and GitHub Actions

## Technology Stack

React JS will be used for the UI component whereas FastAPI will be used for the API backend 

## Setting Up Base Application

Create a root folder in your local development environment

### UI

In the root folder, run the following command

```
npx create-react-app ui
```
To create the UI folder

Run ```npm start``` to make sure the basic web-app works 

Perform the following steps to fully setup the UI component:

- Delete jsx contents in App.js
- Delete logo.svg
- Delete App.css
- Delete everything related to reportWebVitals and setupTest
- Move index.css to a new css folder within src
- Run ```del .git``` to remove any auto-generated git files within the ui folder
- Run ```npm install react-bootstrap bootstrap```
- Create a .vscode folder in the root folder
- Create a settings.json within the .vscode folder
- Copy the contents of that and the package.json file as seen in this repo
- Finally, change directory to the ui folder and run:

     ```npm install -D prettier eslint-config-prettier            eslint-plugin-prettier``` 

### API

In the root folder, create another ```api``` folder for the backend.

Run the following command

```conda create --name <env-name> python=<version>```

To create a new virtual env for API development

## Setting Up Dockerfiles

For both UI and API, use the Dockerfile and .dockerignore files in this repo as templates

## Setting Up Workflow file

Use the workfow file in this repo as a templates

## Setting Up AWS

### Launching EC2 Instance

- Launch an instance from the EC2 Dashboard
- Choose an Ubuntu image
- Allow traffic from both HTTP and HTTPS
- Launch the instance

### Setting up Docker

- Connect to the EC2 Console from the launched instance

Run the following commands:
```
sudo apt-get update
sudo apt-get install docker.io -y
sudo systemctl start docker
sudo docker run hello-world
sudo chmod 666 /var/run/docker.sock
sudo systemctl enable docker
docker --version
```
To set up Docker on the instance

### Setting up Nginx

Run the following commands:
```
sudo apt-get update -y
sudo apt-get install nginx -y
```
To install nginx

Open up the nginx configuration file using 

```sudo nano /etc/nginx/sites-available/default```

And replace the contents with:

```
server {
    listen 80;
    server_name your_domain.com;  # or your public IP address

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

You can check the ufw (Uncomplicated Firewall) status:

```sudo ufw status```

Test the Nginx configuration to ensure there are no syntax errors:

```sudo nginx -t```

If test is successful, reload with

```sudo systemctl reload nginx```

(Optional)

Finally, if you’ve made any changes to the configuration, restart both Nginx and your application:

```
sudo systemctl restart nginx
sudo docker restart <your_container_id>
```

To find the correct id, run:
 
```docker ps```

### Editing Inbound Security Rules

Add the following rules in the instance's security group:

- Custom TCP | 3000 | Anywhere IP-V4
- Custom TCP | 80 | Anywhere IP-V4
- Custom TCP | 8000 | Anywhere IP-V4

### Setting Up Self Hosted Runner 

Follow commands from GitHub to create a self-hosted runner to use in the Dockerfile

Always connect to EC2 Console and run ```./run.sh``` in the runner directory to make sure it's idle and accepting jobs before pushing to repo

## Pushing to GitHub

Set up DOCKERHUB_USERNAME and DOCKERHUB_PASSWORD as repository secrets

Finally, push code to GitHub.

After workfow builds and is successful, visit the IP-V4 address at both ports: 3000 and 8000 to ensure UI and API are working respectivelt.

## Tying it all together 

Once that is done, modify API calls and Allowed Origins list as follows:

- First:

    - API URL: http://<ip-v4>:8000
    - Allowed Origins List:
        ```
        [
            "http://<ip-v4>",
            "http://<ip-v4>:3000"
        ]
        ```
- Then assign and associate an elastic IP address:
    - API URL: http://<elastic-ip>:8000
    - Allowed Origins List:
        ```
        [
            "http://<elastic-ip>",
            "http://<elastic-ip>:3000"
        ]
        ```
- Finally, setup a domain (A type record):
    - API URL: http://<web-site>:8000
    - Allowed Origins List:
        ```
        [
            "http://<web-site>",
            "http://<web-site>:3000"
        ]
        ```

