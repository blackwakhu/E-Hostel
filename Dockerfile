# --- Build Stage (Python) ---
    FROM python:3.11-slim AS python-builder

    WORKDIR /app
    
    # Install PostgreSQL client libraries
    RUN apt-get update && apt-get install -y libpq-dev gcc
    
    COPY requirements.txt /app/
    RUN pip install --no-cache-dir -r requirements.txt
    COPY . /app/
    RUN pip install --no-cache-dir Pillow
    
    # --- Build Stage (Node.js) ---
    FROM node:lts-alpine AS node-builder
    
    WORKDIR /app
    
    # Update npm and install TypeScript and tsc
    RUN npm install -g npm@latest
    RUN npm install typescript tsc
    
    # Copy all Node.js files (TypeScript, JavaScript, etc.)
    COPY . ./
    
    # --- Runtime Stage ---
    FROM python:3.11-slim
    
    WORKDIR /app
    
    # Install PostgreSQL client libraries in runtime
    RUN apt-get update && apt-get install -y libpq-dev
    
    # Copy built Python artifacts
    COPY --from=python-builder /app/ .
    
    # Copy Node.js files and node_modules
    COPY --from=node-builder /app/ .
    
    EXPOSE 8080
    
    CMD ["python", "EHostel/manage.py", "runserver", "0.0.0.0:8080"]