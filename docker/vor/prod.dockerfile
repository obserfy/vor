# syntax=docker/dockerfile:1.0-experimental
# Commands are relative to the monorepo root
####################################
# Build the gatsby powered frontend
####################################
FROM node:14 AS frontend-builder
WORKDIR /usr/src
COPY . /usr/src
RUN yarn install
# Build the project
RUN --mount=type=secret,id=env,dst=/usr/src/apps/vor/frontend/.env yarn workspace vor run build
# Move the build artifact so its easier to be copied
# on the final build
RUN mkdir /frontend
RUN cp -r ./apps/vor/frontend/public /frontend/public

####################################
# Build the API server
####################################
FROM golang:1.15 AS api-builder
WORKDIR /usr/src/apps/vor
COPY . /usr/src
# Build the project
RUN go build -o ./app ./pkg/*.go

####################################
# Build the final image
####################################
FROM gcr.io/distroless/base
WORKDIR /usr/src/apps/vor
COPY --from=frontend-builder /frontend/public ./frontend/public
COPY --from=api-builder /usr/src/apps/vor/app ./app
COPY --from=api-builder /usr/src/apps/vor/mailTemplates ./mailTemplates

ENV ENV=production

EXPOSE 8080
ENTRYPOINT ["./app"]
