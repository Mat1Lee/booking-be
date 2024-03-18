############# Builder image #############
FROM node:16-bullseye-slim as builder

WORKDIR /source.tmp

COPY . .
#RUN apk add --no-cache git
RUN apt-get update && apt-get install -y git

RUN npm install && \
  npm run build && \
  cd dist && \
  npm install --only=prod


############# Runner image #############
FROM node:16-bullseye-slim

WORKDIR /opt/worldpharma/backend

COPY --from=builder /source.tmp/dist .

EXPOSE 3000

CMD [ "node", "index.js" ]
