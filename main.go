package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"

	// To use a specific template engine, import as shown below:
	// "github.com/gofiber/template/pug"
	// "github.com/gofiber/template/mustache"
	// etc..

	// In this example we use the html template engine
	"github.com/gofiber/template/html"
)

func main() {
	// Create a new engine by passing the template folder
	// and template extension using <engine>.New(dir, ext string)
	engine := html.New("./views", ".html")

	// // We also support the http.FileSystem interface
	// // See examples below to load templates from embedded files
	// engine := html.NewFileSystem(http.Dir("./views"), ".html")

	// Reload the templates on each render, good for development
	engine.Reload(true) // Optional. Default: false

	// Debug will print each template that is parsed, good for debugging
	engine.Debug(true) // Optional. Default: false

	// Layout defines the variable name that is used to yield templates within layouts
	engine.Layout("embed") // Optional. Default: "embed"

	// Delims sets the action delimiters to the specified strings
	engine.Delims("{{", "}}") // Optional. Default: engine delimiters

	// AddFunc adds a function to the template's global function map.
	engine.AddFunc("greet", func(name string) string {
		return "Hello, " + name + "!"
	})

	// After you created your engine, you can pass it to Fiber's Views Engine
	app := fiber.New(fiber.Config{
		Views: engine,
	})

	// Set a assets handler
	// Or extend your config for customization
	app.Use("/assets", filesystem.New(filesystem.Config{
		Root:         http.Dir("./assets"),
		Index:        "index.html",
		Browse:       true,
		NotFoundFile: "404.html",
	}))

	// To render a template, you can call the ctx.Render function
	// Render(tmpl string, values interface{}, layout ...string)
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{
			"Title": "Hello, World!",
		})
	})

	// Render with layout example
	app.Get("/layout", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{
			"Title": "Hello, World!",
		}, "layouts/main")
	})

	app.Get("/history", historyGet)

	log.Fatal(app.Listen(":3000"))
}

func historyGet(c *fiber.Ctx) error {
	histories := []History{
		History{
			"WWW2",
			"<h1>DESC</h1>",
			"1939-1945",
			"https://images.squarespace-cdn.com/content/v1/5cc0f0fac46f6d618fd57117/1576791011057-SDHMKYNZC2RIMX7VF28T/ke17ZwdGBToddI8pDm48kP06O0_IHyRXSOOiqwgWaApZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVEsL0EX72Q6S7TgfQYQBQpkz5xM6Qt8VXd_xJGg_ziCFib8BodarTVrzIWCp72ioWw/world-war-2-logo.png",
			[]json.RawMessage{
				json.RawMessage(`{
					"type": "FeatureCollection",
					"features": [
						{
							"type": "Feature",
							"properties": {},
							"geometry": {
								"type": "Polygon",
								"coordinates": [
									[
										[
											23.767504692077637,
											52.130774684383226
										],
										[
											23.766345977783203,
											52.129668219784115
										],
										[
											23.766732215881348,
											52.124109136616376
										],
										[
											23.774585723876953,
											52.12484687476596
										],
										[
											23.774499893188477,
											52.127349823904716
										],
										[
											23.767504692077637,
											52.130774684383226
										]
									]
								]
							}
						},
						{
							"type": "Feature",
							"properties": {
								"layer-data": {
									"internal": 1
								}
							},
							"geometry": {
								"type": "Polygon",
								"coordinates": [
									[
										[
											23.783555030822754,
											52.12927304719675
										],
										[
											23.784799575805664,
											52.12774501354899
										],
										[
											23.78535747528076,
											52.12774501354899
										],
										[
											23.785271644592285,
											52.12642770110461
										],
										[
											23.783211708068848,
											52.124873222331125
										],
										[
											23.783683776855465,
											52.12455705052084
										],
										[
											23.785657882690426,
											52.12574268324312
										],
										[
											23.78617286682129,
											52.12721809324443
										],
										[
											23.786087036132812,
											52.12790308842534
										],
										[
											23.784971237182617,
											52.12956284077018
										],
										[
											23.783555030822754,
											52.12927304719675
										]
									]
								]
							}
						}
					]
				}`),
				json.RawMessage(`{
					"type": "FeatureCollection",
					"features": [{
							"type": "Feature",
							"properties": {
								"shape": "Polygon",
								"name": "A map",
								"category": "default",
								"style": {
									"weight": 2,
									"color": "#123",
									"opacity": 1,
									"fillColor": "#aaaa",
									"fillOpacity": 0.8
								},
								"layer-data": {
									"internal": 0
								}
							},
							"geometry": {
								"type": "Polygon",
								"coordinates": [
									[
										[
											383.779579,
											52.138256
										],
										[
											383.765329,
											52.130142
										],
										[
											383.765844,
											52.124873
										],
										[
											383.769621,
											52.121079
										],
										[
											383.773398,
											52.122133
										],
										[
											383.772197,
											52.123081
										],
										[
											383.780266,
											52.127508
										],
										[
											383.78008,
											52.130985
										],
										[
											383.783528,
											52.13225
										],
										[
											383.779579,
											52.138256
										]
									]
								]
							},
							"id": "a4537216-2da9-437c-b946-7c5fe433c5fe"
						},
						{
							"type": "Feature",
							"properties": {
								"marker-color": "#ea2d2d",
								"marker-size": "medium",
								"marker-symbol": "",
								"shape": "Marker",
								"name": "A POINT",
								"category": "default",
								"style": {
									"weight": 2,
									"color": "#123",
									"opacity": 1,
									"fillColor": "#aaaa",
									"fillOpacity": 0.8
								}
							},
							"geometry": {
								"type": "Point",
								"coordinates": [
									383.799013,
									52.134463
								]
							},
							"id": "a2a7c08a-2af1-4dd6-a744-b2fb77762bf0"
						},
						{
							"type": "Feature",
							"properties": {
								"stroke": "#555555",
								"stroke-width": 2,
								"stroke-opacity": 1,
								"fill": "#f40000",
								"fill-opacity": 0.5,
								"shape": "Polygon",
								"name": "A part of the map",
								"category": "default",
								"style": {
									"weight": 2,
									"color": "#999",
									"opacity": 1,
									"fillColor": "#B0DE5C",
									"fillOpacity": 0.8
								}
							},
							"geometry": {
								"type": "Polygon",
								"coordinates": [
									[
										[
											383.773431,
											52.132408
										],
										[
											383.771499,
											52.129563
										],
										[
											383.776564,
											52.130696
										],
										[
											383.773431,
											52.132408
										]
									]
								]
							},
							"id": "7c022309-dbe1-435c-8025-04dab91f4a76"
						}
					]
				}`),
			},
		},
		History{
			"Napaleon invasion to Poland",
			"<h1>bbbb</h1>",
			"1811",
			"https://upload.wikimedia.org/wikipedia/commons/2/20/Napoleon_Bonaparte_logo.png",
			nil,
		},
		History{
			"The russian fall",
			"<h1>aaaaa</h1>",
			"",
			"https://upload.wikimedia.org/wikipedia/commons/1/1c/Flag_of_Russian_Empire_for_private_use_%281914%E2%80%931917%29.svg",
			nil,
		},
	}

	return c.JSON(histories)
}
