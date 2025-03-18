# --- Build Stage (Python) ---
    FROM python:3.11-alpine AS python-builder

    WORKDIR /app
    
    COPY requirements.txt /app/
    RUN pip install --no-cache-dir -r requirements.txt
    COPY . /app/
    RUN pip install --no-cache-dir Pillow
    
    # --- Build Stage (Node.js) ---
    FROM node:lts-alpine AS node-builder
    
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install typescript tsc unidici
    COPY . ./
    
    # --- Runtime Stage ---
    FROM python:3.11-alpine
    
    WORKDIR /app
    
    # Copy built Python artifacts
    COPY --from=python-builder /app/ .
    
    # Copy node modules
    COPY --from=node-builder /app/node_modules ./node_modules/
    
    EXPOSE 8080
    
    CMD ["python", "EHostel/manage.py", "runserver", "0.0.0.0:8080"]