FROM python:3.11-slim
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . ./

# Install any necessary dependencies
RUN pip install --no-cache-dir --upgrade pip \
    && pip install -r requirements.txt

# Set environment variables (if needed, you can uncomment)
ENV DBUSER=fishdatareader
ENV DBPASS=fish123
ENV DBHOST=fish.cru6qs60kq5x.us-east-1.rds.amazonaws.com
ENV DBPORT=3306
ENV DBSCHEMA=fish_schema

# Expose port 8000 for FastAPI
EXPOSE 8000

# Command to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]