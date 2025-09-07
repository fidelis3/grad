FROM python:3.11-slim as builder

WORKDIR /app

RUN python -m pip install --upgrade pip

COPY pyproject.toml .

RUN python -m pip install .

FROM python:3.11-slim

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

COPY . .

RUN python -m pip install -e .

COPY ./db ./db

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "src.medai.api:app", "--host", "0.0.0.0", "--port", "8000"]