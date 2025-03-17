FROM python:3.11
FROM node:lts-alpine

WORKDIR /app

COPY . /app 

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir Pillow

RUN npm install typescript tsc unidici

EXPOSE 8080

CMD ["python", "EHostel/manage.py", "runserver"]