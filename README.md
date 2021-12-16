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

Default command override

    $ docker run <image name> command!

List all running containers

    $ docker ps

List all containers created

    $ docker ps --all

    $ docker ps -a

Removing stopped containers

    $ docker system prune

Get logs from a container

    $ docker logs <container id>

Stop a container (SIGTERM)

    $ docker stop <container id>

Kill a container (SIGKILL)

    $ docker kill <container id>

Execute an additional command in a container

    $ docker exec -it <container id> <command>

    $ docker run -it <image name> <command>