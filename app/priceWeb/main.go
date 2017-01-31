package main

import (
	"net/http"
	"Retail/priceWeb/router"
	"Retail/priceWeb/client"
	"log"
)

const PORT = ":5000"

func main() {
	client.CreateClientConnection()
	defer client.CloseConnections()

	router.HandleRequest()
	log.Printf("Listening to port %s", PORT)
	http.ListenAndServe(PORT, nil)
}
