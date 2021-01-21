# use alpine linux with standard python-7
FROM python:3.7.7-alpine

# open up port 5000
EXPOSE 5000

# set working directory
WORKDIR /api

# copy files over
ADD ./requirements.txt /api/requirements.txt
ADD ./lib /api/lib/
ADD ./app.py /api/app.py
ADD ./static /api/static
ADD ./templates /api/templates
ADD ./codon_usage_data.db /api/codon_usage_data.db

# install python dependencies
RUN pip install -r requirements.txt

# set env variables
ENV FLASK_APP api.py

# spin up api server
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]