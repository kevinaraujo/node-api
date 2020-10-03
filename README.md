# Node api

Follow these steps:
- Run `docker-compose up -d` to build the docker
- Run `docker-compose exec node_app bash` to ccess the container
- Inside the container, run `npm test` to execute the integration tests

If you want to test in postman, import the **postman.json** file within **docs** folder.

The **swagger.yaml** contains all details about api endpoints.
