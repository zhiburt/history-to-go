package main

import "encoding/json"

// History represents a Model of complete history which contains a map layers
type History struct {
	Name        string            `json:"name"`
	Description string            `json:"description"`
	Date        string            `json:"date"`
	Image       string            `json:"image"`
	Artifacts   []Artifact        `json:"artifacts"`
	Layers      []json.RawMessage `json:"layers"`
}

// Artifact
type Artifact struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}
