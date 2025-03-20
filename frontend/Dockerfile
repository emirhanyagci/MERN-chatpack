FROM node:22.14 AS builder

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install

COPY . .


ARG VITE_BASE_URL
ARG VITE_NODE_ENV
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_NODE_ENV=$VITE_NODE_ENV
RUN yarn build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]