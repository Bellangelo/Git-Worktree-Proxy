
# Git-Worktree-Server

A proxy to run code from specific branches. Simply request `branch-name.example.com` and it will proxy it to the `branch-name` branch. Useful for testing environments to test right away new branches without any other extra work. Furthermore, it doesn't increase resources usages ( except disk space ) as it doesn't load a new container for each branch.

  

# How it works

Behind the scenes the proxy utilises the `git-worktree` to create a different worktree for each new branch you request. After it has created the new worktree it just proxies the request to the correct path. For example, if your project is in `var/html/my-project` and you request the `my-branch.example.com` it will create a new worktree in `var/html/my-project-6d792d6272616e6368` and proxy the request to this folder instead.

  

# How to use it

 - Create a `.env` file based on `.env.example`.
 -- PORT: Is the port that the proxy will run.
 -- PROXY_DOMAIN: Is the virtual domain of your server.
 -- PROJECT_PARENT_FOLDER: Is the full path that your project file 	exists in the server. For example, if your project runs in `/var/html/my-project` then the value would be `/var/html`.
 -- PROJECT_FOLDER: The folder name of your project. For example, if your project runs in `/var/html/my-project` then the value would be `my-project`.
- Add the server to your `docker-compose.yml` and give access to the volume that your code exists.

# Example - PHP + Apache
Let's say your `docker-compose.yml` contains something like this:
```yaml
services:  
  php:  
    build: ./php  
    volumes:  
      - ./:/var/www/html/  
  apache:  
    build: ./apache  
    volumes:  
      - ./:/var/www/html  
    depends_on:  
      - php  
    ports:  
    - 80:80
```
Then you should add the above lines to your file to build as well the `Git-Worktree-Server`.
```yaml
  git_worktree_server:  
    build: ./git-worktree-server  
    volumes:  
      - ./:/var/www/html  
    depends_on:  
      - php
      - apache  
    ports:  
    - 8080:8080
```

Having access to the same volume allows it create the necessary folders for each branch.

Based on the these your `.env` file should look like this:
```
PORT=8080

PROXY_DOMAIN=fcgi://php:9000

PROJECT_PARENT_FOLDER=var/www/html/

PROJECT_FOLDER=my-project
```

# Roadmap
- Run git command through special query parameters.
- Better error validation of commands.
- Add hooks to add extra functionality through "plugins".