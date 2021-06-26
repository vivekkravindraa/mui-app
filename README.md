[![Netlify Status](https://api.netlify.com/api/v1/badges/00994fe3-f0b9-4d4b-8d45-91aa880686d6/deploy-status)](https://app.netlify.com/sites/momentive/deploys)

```
$ yarn build
```

```javascript
# Stage 1
FROM node:8 as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```
$ docker build . -t react-docker
```

```
$ docker images
```

```
$ docker run -p 8000:80 react-docker
```

```
$ docker ps
```
