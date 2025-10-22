FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o placeholder main.go

FROM alpine:3.20
WORKDIR /root/
COPY --from=builder /app/placeholder .
EXPOSE 8080
CMD ["./placeholder"]
