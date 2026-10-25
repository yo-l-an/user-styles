package main

import (
	"context"
	"flag"
	"log"
	"net/http"
	"os/signal"
	"syscall"
	"time"

	"example.com/sample/server/internal/projects"
)

var version = "dev"

func main() {
	port := flag.String("port", "8080", "port to listen on")
	flag.Parse()

	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	store := projects.NewStore()
	srv := &http.Server{
		Addr:              ":" + *port,
		Handler:           projects.Routes(store),
		ReadHeaderTimeout: 5 * time.Second,
	}

	go func() {
		log.Printf("sample %s listening on %s", version, srv.Addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server error: %v", err)
		}
	}()

	<-ctx.Done()
	shutdown, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_ = srv.Shutdown(shutdown)
}
