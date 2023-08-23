all: dev-build

prod:
			docker compose -f docker-compose.prod.yml up --build --attach backend --attach frontend --attach bdd

dev:
			docker compose up --attach backend --attach frontend --attach bdd

dev-build:
			docker compose up --build --attach backend --attach frontend --attach bdd

prune:
			docker system prune -af

volume:
			docker volume ls -q | xargs --no-run-if-empty docker volume rm

prune-all:	prune volume
			clear
			@echo "All cleared"

.PHONY: prod dev dev-build prune volume prune-all

# --------------------------------------------------------

# all: build

# build:
# 	docker-compose -f docker-compose.yml up --build

# stop:
# 	docker-compose -f docker-compose.yml stop

# start:
# 	docker-compose -f docker-compose.yml start

# down:
# 	docker-compose -f docker-compose.yml down

# clean: down
# 	docker system prune -af

# fclean : clean
# 	docker volume rm srcs_react_volume&
# 	docker volume rm srcs_nest_volume&
# 	docker volume rm srcs_postgres_volume&
# 	docker volume prune -f&

# re: fclean all

# log :
# 	docker-compose -f docker-compose.yml logs

# .PHONY: all build stop start down clean fclean re log
