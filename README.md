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

Docker bind mounts

    $ docker run -v <route on my machine>:<path in container> <image id | name>

    $ docker run --name db -v $(pwd):/data/db -d mongo

Show the list of volumes

    $ docker volume ls

Create a new volume

    $ docker volume create <volume name>

Mount a volume in a container

    $ docker run --mount src=<volume name>,dst=<destination path> <image id | name>

Copy a file from the machine to the container

    $ docker cp <local file name> <container name>:<container address>/<container file name>

Extract a file from the container to the machine

    $ docker cp <container name>:<container address>/<container file name> <local file name>

List the images

    $ docker image ls

    $ docker images

Pull an image from the repository

    $ docker pull <image name>:<tag>

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

Retagge an image

    $ docker tag <current tag> <new tag>

Push an image to docker hub

    $ docker login

    $ docker push <image name>

Get the layer history of an image

    $ docker history <image name>

Use dive to get a better description of the history

    https://github.com/wagoodman/dive

List networks

    $ docker network ls

Create a network interface

    $ docker network create --attachable <network name>

Inspect a network interface

    $ docker network inspect <network name>

Remove a network interface

    $ docker network rm <network name>

## Docker compose

Launch in background

    $ docker-compose up -d

Stop containers

    $ docker-compose down

Containers status with docker compose

    $ docker-compose ps

## Kubectl commands

Get cluster information

    $ kubectl cluster-info

Feed a config file to kubectl

    $ kubectl apply -f <filename>

Print the status of all running pods

    $ kubectl get pods

Print the status of all running services

    $ kubectl get services

Get detailed info about an object

    $ kubectl describe <object type> <object name>

Remove an object

    $ kubectl delete -f <config file>

