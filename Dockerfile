FROM python:3.11

WORKDIR /app

COPY . /app 

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir Pillow

EXPOSE 8080

CMD ["python", "EHostel/manage.py", "runserver"]