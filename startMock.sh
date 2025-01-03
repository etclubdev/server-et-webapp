#!/bin/bash  

# Configuration  
CONTAINER_NAME="postgres_container"  
SQL_FILE="src/database/migrations/create_tables.sql"  

#Pull image
docker compose up -d

# Check if the image has been pulled successfully
if [ $? -eq 0 ]; then
  echo "Image pulled successfully!"
else
  echo "Failed to pull the image."
  exit 1
fi 

# Copy the SQL file into the container  
echo "Copying $SQL_FILE to container $CONTAINER_NAME..."
docker cp "$SQL_FILE" "$CONTAINER_NAME:tmp/create_tables.sql"

# Check if the file has been copied successfully
if [ $? -eq 0 ]; then
  echo "File copied successfully!"
else
  echo "Failed to copy the file."
  exit 1
fi 

# Execute the SQL script inside the container  
docker exec -it "$CONTAINER_NAME" psql -U etclubdev -d etclubweb -f "tmp/create_tables.sql"  

# Check if the command succeeded  
if [ $? -eq 0 ]; then  
    echo "SQL script executed successfully."  
else  
    echo "Failed to execute SQL script."  
fi  