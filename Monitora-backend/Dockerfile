FROM python:3.6
LABEL maintainer="appsvc-images@microsoft.com"

# Web Site Home
#ENV HOME_SITE "/home/site/wwwroot"
ENV HOME_SITE "/opt/defaultsite"


#Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        openssh-server \
        vim \
        curl \
        wget \
        apt-transport-https \
        tcptraceroute \
    && pip install --upgrade pip \
    && pip install subprocess32 \
    && pip install gunicorn \ 
    && pip install virtualenv


WORKDIR ${HOME_SITE}

RUN apt-get update \
 && apt-get install --yes --no-install-recommends \
        curl \
        gnupg \
        unixodbc-dev \
 && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
 && curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list \
 && apt-get update \
 && ACCEPT_EULA=Y apt-get install --yes --no-install-recommends msodbcsql17 \
 && ACCEPT_EULA=Y apt-get install --yes --no-install-recommends mssql-tools

EXPOSE 8000
ENV PORT 8000
ENV SSH_PORT 2222

# setup SSH
RUN mkdir -p /home/LogFiles \
     && echo "root:Docker!" | chpasswd \
     && echo "cd /home" >> /etc/bash.bashrc \
     && echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> /etc/bash.bash_profile \
     && echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> /etc/bash.bashrc \
     && /bin/bash -c "source /etc/bash.bashrc"

COPY sshd_config /etc/ssh/
RUN mkdir -p /opt/startup

COPY hostingstart.html /opt/defaultsite
COPY . /opt/defaultsite

COPY ./requirements.txt /var/www/requirements.txt
COPY ./wheelhouse /var/www/wheelhouse
RUN pip install --no-index -r /var/www/requirements.txt --find-links=/var/www/wheelhouse

# configure startup
RUN chmod -R 777 /opt/defaultsite
COPY entrypoint.py /usr/local/bin

ENTRYPOINT ["/opt/defaultsite/init_container.sh"]
