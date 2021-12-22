# Docker Help
Docker commands

Show docker version

    $ docker version

Create a container

    $ docker create <image name>

Start a container

    $ docker start <container id>

    $ docker start -a <container id>

Creating and running a container from an image

    $ docker run <image name>

Get more information about the container

    $ docker inspect <container id>

Add a name to the container

    $ docker run --name <container name> <image name>

Rename the container

    $ docker rename <current name> <new name>

Default command override

    $ docker run <image name> command!

List all running containers

    $ docker ps

List all containers created

    $ docker ps --all

    $ docker ps -a

Remove a container

    $ docker rm <container id | name>

Removing stopped containers

    $ docker container prune

Get logs from a container

    $ docker logs <container id | name>

    $ docker logs -f <container id | name>

    $ docker logs --tail <number of lines> -f <container id | name>

Stop a container (SIGTERM)

    $ docker stop <container id>

Kill a container (SIGKILL)

    $ docker kill <container id>

Execute an additional command in a container

    $ docker exec -it <container id> <command>

    $ docker run -it <image name> <command>

Docker run with port mapping

    $ docker run -p <port localhost>:<port container> <image id|name>

## Building custom images

create a file called Dockerfile, For this example we will create a redis image from scratch, adding the configuration that is presented below.

    # Use an existing docker image as a base
    FROM alpine

    # Download and install a dependency
    RUN apk add --update redis

    # Tell the image what to do when it starts as a contain
    CMD ["redis-server"]

Build an image

    $ docker build .

Build an dev image

    $ docker build -f <Dockerfile.dev> .

Tagging an image

    $ docker build -t <docker_id/repo_project_name:version> .

## Docker compose

Launch in background

    $ docker-compose up -d

Stop containers

    $ docker-compose down

Containers status with docker compose

    $ docker-compose ps