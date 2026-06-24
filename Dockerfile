# Build stage
FROM node:18-alpine AS builder

ENV NODE_OPTIONS="--openssl-legacy-provider"

RUN apk add --no-cache \
    build-base \
    autoconf \
    automake \
    libtool \
    libpng-dev \
    libjpeg-turbo-dev \
    nasm

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Serve stage
FROM nginx:stable-alpine AS runner

COPY --from=builder /app/public /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
