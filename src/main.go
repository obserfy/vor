package main

import (
	"github.com/go-chi/chi"
	"github.com/go-pg/pg/v9"
	"go.uber.org/zap"
	"net/http"
)

type Env struct {
	db     *pg.DB
	logger *zap.Logger
}

const (
	BCryptCost = 10
)

func main() {

	logger := createLogger()
	defer syncLogger(logger)

	db := getDBConnection()
	defer closeDB(db, logger)

	env := Env{db: db, logger: logger}

	createSchema(env)

	r := chi.NewRouter()

	r.Route("/api/v1", func(r chi.Router) {
		r.Use(createAuthMiddleware(env))
		r.Mount("/students", getStudentsSubroute(env))
	})
	r.Mount("/auth", getAuthSubroute(env))

	frontendFileServer := http.FileServer(http.Dir("frontend/public")).ServeHTTP
	r.Get("/*", frontendFileServer)

	runServer(r, env)
}

func runServer(r *chi.Mux, env Env) {
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		env.logger.Error("Failed serving router", zap.Error(err))
	}
}
