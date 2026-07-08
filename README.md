# hangman-pwa

## Docker deployment

Build the production image and run it as a container:

```bash
docker build -t hangman-pwa .
docker run -d -p 80:80 --name hangman-pwa hangman-pwa
```

Or use Docker Compose:

```bash
docker compose up -d --build
```

Then open your browser to `http://<server-ip>/`.

If you need a different port:

```bash
docker run -d -p 8080:80 --name hangman-pwa hangman-pwa
```

The container is static-only and serves the Vite-built `dist` output with Nginx.
