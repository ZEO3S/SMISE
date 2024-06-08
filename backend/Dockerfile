# Dockerfile for FastAPI with Conda
FROM continuumio/miniconda3

# Set working directory
WORKDIR /app

# Copy environment.yml
COPY environment.yml .

# Create the environment
RUN conda env create -f environment.yml

# Make RUN commands use the new environment:
SHELL ["conda", "run", "-n", "myenv", "/bin/bash", "-c"]

# Install Uvicorn
RUN conda install -n myenv uvicorn

# Copy the application code
COPY . .

# Expose the port
EXPOSE 8080

# Set the command to run the app using conda run
CMD ["conda", "run", "-n", "myenv", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]