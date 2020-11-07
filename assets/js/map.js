let mainLayer = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "shape": "Polygon",
                "name": "A map",
                "category": "default",
                "style": { "weight": 2, "color": "#123", "opacity": 1, "fillColor": "#aaaa", "fillOpacity": 0.8 },
                "layer-data": {
                    "internal": 2,
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
                "style": { "weight": 2, "color": "#123", "opacity": 1, "fillColor": "#aaaa", "fillOpacity": 0.8 }
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
                "style": { "weight": 2, "color": "#999", "opacity": 1, "fillColor": "#B0DE5C", "fillOpacity": 0.8 }
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
};

var internalLayer = {
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
                    "internal": 1,
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
};

let history = [
    { "id": 1, "layer": mainLayer },
    { "id": 2, "layer": internalLayer }
]

let historyFrontLayer = mainLayer;

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }

    let props = layer.feature.properties;
    layer.bindPopup(props.name);

    if (props["layer-data"] !== undefined) {
        let nextLayerId = props["layer-data"].internal;
        let nextLayer = history.find((e) => e.id === nextLayerId);
        let newLayer = nextLayer.layer;
        layer.on('click', function () {
            geojson.clearLayers()
            let l = geojson.addData(newLayer);
            map.fitBounds(l.getBounds(), { "animate": false });
        })
    }
}

var myCustomStyle = {
    stroke: true,
    fill: true,
    // fillColor: '#fff',
    fillOpacity: 1
}
var map = L.map('map').setView([39.74739, -105], 4);

// map.createPane('labels');
// map.getPane('labels').style.zIndex = 650;
// map.getPane('labels').style.pointerEvents = 'none';

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(map);

var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '©OpenStreetMap, ©CartoDB'
}).addTo(map);

var positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: '©OpenStreetMap, ©CartoDB',
    pane: 'labels'
}).addTo(map);

let geojson = L.geoJson(historyFrontLayer, {
    style: function (feature) {
        return feature.properties && feature.properties.style;
    },
    clickable: true,
    onEachFeature: onEachFeature,
    // style: myCustomStyle
}).addTo(map);

var layerCoordinates = L.latLng(52.134463, 383.799013);

// map.setView(layerCoordinates);

// map.zoomIn(1000);
// map.fitBounds([layerCoordinates, L.latLng(52.138256, 383.779579)])
// map.fitBounds([layerCoordinates], { "animate": true })

// (async () => {
//     function sleep(ms) {
//         return new Promise(resolve => setTimeout(resolve, ms));
//     }

//     await sleep(5000);


//     let polygonZoomCoordinates = [
//         [
//             52.138256,
//             383.779579,
//         ],
//         [
//             52.130142,
//             383.765329,
//         ],
//         [
//             52.124873,
//             383.765844,
//         ],
//         [
//             52.121079,
//             383.769621,
//         ],
//         [
//             52.122133,
//             383.773398,
//         ],
//         [
//             52.123081,
//             383.772197,
//         ],
//         [
//             52.127508,
//             383.780266,
//         ],
//         [
//             52.130985,
//             383.78008,
//         ],
//         [
//             52.13225,
//             383.783528,
//         ],
//         [
//             52.138256,
//             383.779579
//         ]
//     ];

//     map.fitBounds(polygonZoomCoordinates, { "animate": false, "easeLinearity": 1, "duration": 10 })
// })();

// let newLayerFeature = {
//     "type": "Feature",
//     "properties": {
//         "name": "Coors Field",
//         "amenity": "Baseball Stadium",
//         "popupContent": "This is where the Rockies play!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [-104.99404, 39.75621]
//     }
// };

// geojson.eachLayer(function (layer) {
//     let props = layer.feature.properties;
//     layer.bindPopup(props.name);

//     if (props["layer-data"] !== undefined) {
//         let nextLayerId = props["layer-data"].internal;
//         let nextLayer = history.find((e) => e.id === nextLayerId);
//         let newLayer = nextLayer.layer;
//         layer.on('click', function () {
//             geojson.clearLayers()
//             let l = geojson.addData(newLayer);
//             map.fitBounds(l.getBounds(), { "animate": false });
//         })
//     }
// });

map.fitBounds(geojson.getBounds(), { "animate": false });
