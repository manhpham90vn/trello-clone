FROM node:21-alpine

RUN apk add git

RUN npm install -g pnpm

CMD exec /bin/sh -c "trap : TERM INT; sleep infinity & wait"