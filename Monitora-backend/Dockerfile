FROM python:3.7-slim

RUN mkdir /home/monitora-backend
WORKDIR /home/monitora-backend

# configure startup
RUN chmod -R 777 /home/monitora-backend

#Install system dependencies
RUN apt-get update \
    && pip install --upgrade pip \
    && pip install gunicorn

ENV HOME /home/monitora-backend

EXPOSE 8000
ENV PORT 8000

COPY ./requirements.txt .
COPY ./init_container.sh .
RUN pip install -r requirements.txt

COPY ./ /home/monitora-backend/

RUN chmod -R 777 /home/monitora-backend

ENTRYPOINT ["./init_container.sh"]
