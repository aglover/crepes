# Crepes are fancy pancakes

This project uses MYSQL as a backing store through Docker compose. Simply type:

```
docker compose start
```

Note, however, the first time you fire things up, use the `docker compose up` command to bootstrap things. Naturally, to stop things, type `docker compose stop`. This [cheat sheet](https://devhints.io/docker-compose) is nice.

To run the application in development mode (which means recompiling TypeScript on changes and reloading the resultant JS), ensure you run this command:

```
npm run dev
```

You'll note that the TS compilation process produces a .js file in the `dist` directory. 