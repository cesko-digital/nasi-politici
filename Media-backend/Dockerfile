FROM python:3.7-slim

RUN mkdir /home/media-backend
WORKDIR /home/media-backend

# configure startup
RUN chmod -R 777 /home/media-backend

#Install system dependencies
RUN apt-get update \
    && pip install --upgrade pip \
    && pip install gunicorn

ENV HOME /home/media-backend

EXPOSE 8000
ENV PORT 8000

COPY ./requirements.txt .
COPY ./init_container.sh .
RUN pip install -r requirements.txt

COPY ./ /home/media-backend/

RUN chmod -R 777 /home/media-backend

ENTRYPOINT ["./init_container.sh"]
