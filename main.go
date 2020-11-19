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
			nil,
			[]json.RawMessage{
				json.RawMessage(`{
					"type": "FeatureCollection",
					"features": [
					  {
						"type": "Feature",
						"properties": {
						  "description": "Brest 123123123",
						  "name": "Brest Map",
						  "layer-data": {
							"internal": 1
						  },
						  "artifacts": [
							{"name": "plane", "image": "https://img.pngio.com/download-ww2-planes-png-transparent-png-png-images-ww2-png-840_859.png"},
						  	{"name": "ak-47", "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8UFBQzMzMAAAA/Pz8LCws2Nja6urrs7OwRERGvr69DQ0MGBgYZGRkmJiby8vIcHByjo6P4+PhKSkosLCw7OzshISGTk5MuLi5oaGjBwcF8fHzLy8tRUVFHR0eIiIjd3d1eXl7b29uampp0dHRlZWWNjY1+fn5aWlqenp7Hx8fc3NyxylccAAAGU0lEQVR4nO3bh5aiOgAGYCSCREV6swAqOo73/d/vJmChSXFFZ+b839mzsyoy+UlI0xUEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAX2AynU7NTxciE3uCMDXNtSZoiqe8qlA7whgvOtk/WpMkmSQjIgW+LfozORBMpV6fsyqjkU6WQ5W5H82wiE5VXXfGjDgnu9O8FvnqU+LkMN4M00qVKEmSIDgcttsTs+EsywrDGcMiOI4jy+xPij1wwo14eSQyPlU3Pq2n+jut7FExdl/CLhwk4ZlcXC681IEr5sljcVSLurOFWmZP6stxigZKuCa0vnhNignF2YOEI3cmixVSbcS1bCWzQVqpRfoHrE0osWYgXeqO/XtOHyUU7boe6KSYpnIaIOHymYAjnRVcLiSkxPqKEufS4K3V6jRiPyk/yF7k+eyJoFqOyTf/23t5QjN4KiDN6vDS1YjiWKQkTk+4Pnqe953V0drbG+eNb0dGXsAiutVhbxszu+3LEya9AlLdzeg+z3XtRNLX5saas0a6rlPxzP8dEBIKB5aw8CuNBXur65W6VG2WXirnQS/0NKVfL+PKcm6UEN3Cm7Pmmd2IUvaA1bWlq6o0ywn9Eb8qxJ0VZRdPp2Nn/ZpoS+O4nBwtqU8NUrvYYbjt79ElyvudvMtloaXx5/Y0+eqdRlPORrSdrWL+wFTi6XGr8ivM76Oajq47tT2hSiqky2Sg8kIakP089qmp3cQLLDc7MSHbaHWYpb8zvWBsttIjoVzCnupQ7fJyUiYvbN65uklUeHrJuwRK9pPpw0lPEcu2ldXsml1/37zwiDp9Eo4r5C4JRb4iKpKz4UP3Si95vLDnDtFMnk1PJ2FSYzdCWamdzjVYTeg0JqQSv54krNbhdKF65+Wy+sLy+NXSyZjK+jsJ02xdekhq90jYVof3ubaU9aO2dQqSL69u8hLvujXDUrq1EThSoRW2JlzwlU/nSuRrCie3oGA3k3SprfTOVll3v7B90bGCyDgrHW+mruKA9gqXcft1NRd83uWEp2AV7TdsNcJb4n49+N5D8szyIO1MHbsmhM0tFulL6V++z6tswQZkdRFr9zjHzWk16bWOf5b33OSStbettyg2RjYF0dkNFB29/ZGls1djer/L2GQlfEeeqvNzCYnBrv+esqrRL/NLyToHJLmc1Qx93xKiwrmp/ZmEcafOs5yPePy9Rj6B5AjCbHpNaPn+prS6ovP4MxHlPvPLNArRo+wGmuQTUF8QptelAE9omVqxfXxqM2zVr5kSMjau3bmm5+qfuuwZp5BQKM7OyeozCSc9EvIJan7usM+9d847kt0hG5LNmeiHmvBdOLckfmZXWuuckM02ShON+P5eSr6z50zuuBB5HcalZtpl6jgAsdONyHqX7aRcB/cEVFpa3MYK2VTAVdngzncbSs308Il8bOztUImseUZx9a33Fs461/LuPD9gX6rEmnO8QeuIyKpPrv9g57YXRd36yWRcnDHdxsv30prnbSzf4cHKRMlXYb3tj6jExh2X+uaZuXeV5NF6oLSlSmp2O9/g8bYgq7+oYXZ82zBrKDgtNhDymt2wnvYPErJ8q6a12pp0KHdxSPzQmFg/5lMyaqo/IVf3kv/4oPJdTqLHxw5mV5OQTT73Las35dYAH/YzXFQ6+yfaqTIqdaasedrtn/vfVxaNPWR5b1wavXiXogOzuLzgs5cu06vw+q75qfG4SiVuXlPsPjbzfD4p2+Fuc2/bZNp4oFLeBPrAGuP+MRkl9Lvj5slt1UWllmZX2ShpvG8HcS2CRBbdv5OidhgML0blKcXbv/oyJVk+2+gxWN2H+9abtjrzfXdEPnT3zHeveEraj63sI9xWk+8SERJWFn8tzE02DEhWh2PFeSVinw/CXkB7Zi4VZR8zdOk24ur6hQQ/5Jt2TZT1PjlEnQpaMzMks3jg8r1XzfSezF/93YLPqtm1pORvRax+/Ubyf8Gt2Me2Mrf50O7icE4/YktjUIfCBx30LR8fvll+S6hlSfJb3ReL8w5zoV/JuM5uyH+fLspQltk39N49L32nnc+XMvYfGwoLtC2hP+U/RwzF+4tDYdH6/TuKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwJ/wPF5Rqeyahv3gAAAAASUVORK5CYII="}
						  ],
						  "stroke": "#555555",
						  "stroke-width": 2,
						  "stroke-opacity": 1,
						  "fill": "#abbfdc",
						  "fill-opacity": 0.5
						},
						"geometry": {
						  "type": "Polygon",
						  "coordinates": [
							[
							  [
								22.933959960937496,
								51.50190410761811
							  ],
							  [
								25.175170898437496,
								51.50190410761811
							  ],
							  [
								25.175170898437496,
								52.669720383688166
							  ],
							  [
								22.933959960937496,
								52.669720383688166
							  ],
							  [
								22.933959960937496,
								51.50190410761811
							  ]
							]
						  ]
						}
					  },
					  {
						"type": "Feature",
						"properties": {
						  "stroke": "#555555",
						  "stroke-width": 2,
						  "stroke-opacity": 1,
						  "fill": "#92dda3",
						  "fill-opacity": 0.5
						},
						"geometry": {
						  "type": "Polygon",
						  "coordinates": [
							[
							  [
								23.466796875,
								53.9560855309879
							  ],
							  [
								23.675537109375,
								53.52071674896369
							  ],
							  [
								24.8291015625,
								53.54683559190011
							  ],
							  [
								24.2138671875,
								53.72921671251272
							  ],
							  [
								24.169921875,
								53.89786522246521
							  ],
							  [
								23.466796875,
								53.9560855309879
							  ]
							]
						  ]
						}
					  }
					]
				  }`),
				json.RawMessage(`{
					"type": "FeatureCollection",
					"features": [
					  {
						"type": "Feature",
						"properties": {
						  "description": "Something here",
						  "name": "A part of teritory",
						  "layer-data": {
								"internal": 0
							},
						  "stroke": "#270d0d",
						  "stroke-width": 2,
						  "stroke-opacity": 1,
						  "fill": "#917979",
						  "fill-opacity": 0.5
						},
						"geometry": {
						  "type": "Polygon",
						  "coordinates": [
							[
							  [
								23.785057067871094,
								52.398648338652535
							  ],
							  [
								23.783855438232422,
								52.38764910347806
							  ],
							  [
								23.780078887939453,
								52.38943011801332
							  ],
							  [
								23.773727416992188,
								52.38691572366521
							  ],
							  [
								23.770809173583984,
								52.38398208257353
							  ],
							  [
								23.77269744873047,
								52.381257812715745
							  ],
							  [
								23.768749237060547,
								52.38031475706198
							  ],
							  [
								23.770294189453125,
								52.377275885161175
							  ],
							  [
								23.76514434814453,
								52.376332744462054
							  ],
							  [
								23.760852813720703,
								52.37601835975285
							  ],
							  [
								23.75741958618164,
								52.37497039455815
							  ],
							  [
								23.75570297241211,
								52.37570397280555
							  ],
							  [
								23.75072479248047,
								52.37444640263532
							  ],
							  [
								23.751239776611328,
								52.37381760412148
							  ],
							  [
								23.74660491943359,
								52.373083994540266
							  ],
							  [
								23.748836517333984,
								52.36868208115476
							  ],
							  [
								23.760852813720703,
								52.36490866337324
							  ],
							  [
								23.763084411621094,
								52.3587237539045
							  ],
							  [
								23.775959014892575,
								52.35453010248701
							  ],
							  [
								23.775959014892575,
								52.35840924385213
							  ],
							  [
								23.78917694091797,
								52.367948386273355
							  ],
							  [
								23.792781829833984,
								52.37161673882133
							  ],
							  [
								23.785057067871094,
								52.398648338652535
							  ]
							]
						  ]
						}
					  },
					  {
						"type": "Feature",
						"properties": {
						  "description": "<h4>On this teritory</h4> happend a ....",
						  "name": "Huge devide"
						},
						"geometry": {
						  "type": "Polygon",
						  "coordinates": [
							[
							  [
								23.809776306152344,
								52.38209606749874
							  ],
							  [
								23.797159194946286,
								52.37035905226707
							  ],
							  [
								23.818531036376953,
								52.359457601988254
							  ],
							  [
								23.833980560302734,
								52.37093549638307
							  ],
							  [
								23.809776306152344,
								52.38209606749874
							  ]
							]
						  ]
						}
					  },
					  {
						"type": "Feature",
						"properties": {
							"artifact": {"name": "ak-47", "image": "data:image/png;base64,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"}
						},
						"geometry": {
						  "type": "Point",
						  "coordinates": [
							23.7819242477417,
							52.37779984351264
						  ]
						}
					  },
					  {
						"type": "Feature",
						"properties": {
							"artifact": {"name": "plane", "image": "https://img.pngio.com/download-ww2-planes-png-transparent-png-png-images-ww2-png-840_859.png"}
							
						},
						"geometry": {
						  "type": "Point",
						  "coordinates": [
							23.76389980316162,
							52.371276118915574
						  ]
						}
					  }
					]
				  }`),
			},
		},
		History{
			"Napaleon invasion",
			"<h1>bbbb</h1>",
			"1811",
			"https://upload.wikimedia.org/wikipedia/commons/2/20/Napoleon_Bonaparte_logo.png",
			nil,
			nil,
		},
		History{
			"2020 election",
			"<h1>aaaaa</h1>",
			"Not finished yet",
			"https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/1994_Senate_election_map.svg/1200px-1994_Senate_election_map.svg.png",
			nil,
			nil,
		},
	}

	return c.JSON(histories)
}
