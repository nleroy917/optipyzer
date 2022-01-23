FROM tiangolo/uvicorn-gunicorn:python3.9

COPY requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt

COPY . /app/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]