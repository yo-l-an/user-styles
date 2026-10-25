# syntax=docker/dockerfile:1
FROM golang:1.23-alpine AS build
WORKDIR /src

ARG VERSION=dev
ENV CGO_ENABLED=0 \
    GOOS=linux

COPY server/go.mod server/go.sum ./
RUN go mod download

COPY server/ .
RUN go build -ldflags "-X main.version=${VERSION}" -o /out/app ./cmd/app

FROM alpine:3.20
RUN adduser -D app
USER app
COPY --from=build /out/app /usr/local/bin/app
EXPOSE 8080
HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:8080/health || exit 1
ENTRYPOINT ["app"]
CMD ["--port", "8080"]
