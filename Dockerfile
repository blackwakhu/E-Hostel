FROM python:3.11-alpine

WORKDIR /app

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir Pillow

# Install Node.js dependencies
RUN npm install typescript tsc unidici

# Copy application code
COPY . /app

EXPOSE 8080

CMD ["python", "EHostel/manage.py", "runserver", "0.0.0.0:8080"]