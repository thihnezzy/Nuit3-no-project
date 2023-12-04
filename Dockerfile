# Use an official Docker image with Docker Compose
FROM docker/compose:2.20.2

# Set the working directory
WORKDIR /app

# Copy the docker-compose.yml file into the container
COPY docker-compose.yml .

# Run the Docker Compose up command
CMD ["docker-compose", "up"]