package router

import (
	"github.com/gorilla/mux"
	"net/http"
	"Retail/priceWeb/handler"
)

func HandleRequest() {
	router := mux.NewRouter()
	router.HandleFunc("/records", handler.AllLatestRecords).Methods(http.MethodGet)
	router.HandleFunc("/price/update", handler.SaveUpdateRequest).Methods(http.MethodPost)

	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./public")))

	http.Handle("/", router)

}
