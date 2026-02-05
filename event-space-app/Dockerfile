# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ARG VITE_API_URL=/api
ARG VITE_STATIC_URL=/media
ARG VITE_PLACEHOLDER_URL=/placeholder

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_STATIC_URL=${VITE_STATIC_URL}
ENV VITE_PLACEHOLDER_URL=${VITE_PLACEHOLDER_URL}

RUN yarn build

FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
