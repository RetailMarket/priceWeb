package handler

import (
	"net/http"
	"Retail/priceWeb/client"
	"context"
	priceManager "github.com/RetailMarket/priceManagerClient"
	"encoding/json"
	"fmt"
	_"io/ioutil"
	"log"
	"strconv"
)

func AllRecords(res http.ResponseWriter, req *http.Request) {
	response, err := client.PriceManagerClient.AllRecords(context.Background(), &priceManager.FetchRecordsRequest{});
	if (err != nil) {
		log.Println("Unable to get records from price manager service")
		return;
	}

	entries := []*map[string]interface{}{}

	for i := range response.Entries {
		entry := response.Entries[i]
		data := map[string]interface{}{
			"id": entry.ProductId,
			"name": entry.ProductName,
			"version" : entry.Version,
			"status": entry.Status,
			"is_latest": entry.IsLatest,
			"cost": entry.Cost}
		entries = append(entries, &data)
	}

	records, err := json.Marshal(entries)
	if (err != nil) {
		fmt.Println("Unable to json marshal the fetched entries")
	}
	res.Write(records)
}

func SaveUpdateRequest(res http.ResponseWriter, req *http.Request) {
	req.ParseForm()
	id, err := strconv.Atoi(req.Form["id"][0])
	if (err != nil) {
		log.Println("Unable to parse given id")
	}
	cost, err := strconv.Atoi(req.Form["price"][0])
	if (err != nil) {
		log.Println("Unable to parse given price")
	}
	request := &priceManager.UpdateEntryRequest{ProductId:int32(id), Cost:int32(cost)}

	response, err := client.PriceManagerClient.InsertNewUpdateRequest(context.Background(), request);

	if (err != nil) {
		log.Println("Unable to save in update request")
		return;
	}

	res.Write([]byte(response.Message))
}
