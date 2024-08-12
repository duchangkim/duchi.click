# Duchi's blog

## how to start

### docker

```bash
docker build -t nextjs-docker:latest .
docker run -d -p 3011:3011 --name next-blog-test nextjs-docker:latest
```

http://localhost:3011 접속

### next

**start dev server**

```bash
npm run dev
```

**start dev server with pagefind**

```bash
npm run pagefind:dev
```

http://localhost:3000 접속
