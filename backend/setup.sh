docker compose up -d --remove-orphans

sleep 5
poetry install --no-root
poetry run alembic upgrade head
