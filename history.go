package main

import "encoding/json"

// History represents a Model of complete history which contains a map layers
type History struct {
	Name        string            `json:"name"`
	Description string            `json:"description"`
	Date        string            `json:"date"`
	Image       string            `json:"image"`
	Layers      []json.RawMessage `json:"layers"`
}
