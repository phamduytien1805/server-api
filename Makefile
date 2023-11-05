DB_URL=postgresql://postgres:123456@localhost:5433/slack_clone?sslmode=disable

network:
	docker network create slack-network

postgres:
	docker run --name postgres-slack --network slack-network -p 5433:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=123456 -d postgres:14-alpine

createdb:
	docker exec -it postgres-slack createdb --username=postgres --owner=postgres slack_clone

dropdb:
	docker exec -it postgres-slack dropdb slack_clone