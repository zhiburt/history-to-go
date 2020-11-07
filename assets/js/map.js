var geojsonFeature = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "shape": "Polygon",
                "name": "A map",
                "category": "default",
                "style": { "weight": 2, "color": "#123", "opacity": 1, "fillColor": "#aaaa", "fillOpacity": 0.8 }
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

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
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

let geojson = L.geoJson(geojsonFeature, {
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

geojson.eachLayer(function (layer) {
    layer.bindPopup(layer.feature.properties.name);
    layer.on('click', function () {
        let newLayerFeature = {
            "type": "Feature",
            "properties": {
                "name": "Coors Field",
                "amenity": "Baseball Stadium",
                "popupContent": "This is where the Rockies play!"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-104.99404, 39.75621]
            }
        };;
        geojson.clearLayers()
        geojson.addData(newLayerFeature);
        // map.fitBounds(newLayerFeature.getBounds());

        var states = {
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
                                    29.071197509765625,
                                    53.210144943955406
                                ],
                                [
                                    29.07394409179687,
                                    53.20973372247789
                                ],
                                [
                                    29.32388305664062,
                                    53.224946288810635
                                ],
                                [
                                    29.28817749023437,
                                    53.25042550620077
                                ],
                                [
                                    29.190673828124996,
                                    53.256587554596635
                                ],
                                [
                                    29.168701171875,
                                    53.24097530800699
                                ],
                                [
                                    29.141235351562504,
                                    53.2344000261399
                                ],
                                [
                                    29.106216430664062,
                                    53.21960194869829
                                ],
                                [
                                    29.071197509765625,
                                    53.210144943955406
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
                        "fill": "#cc1111",
                        "fill-opacity": 0.2
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [
                                    26.242904663085938,
                                    52.40116206466771
                                ],
                                [
                                    26.14608764648437,
                                    52.36511830615023
                                ],
                                [
                                    26.05819702148437,
                                    52.3324020045096
                                ],
                                [
                                    26.00189208984375,
                                    52.33995406943698
                                ],
                                [
                                    25.990219116210938,
                                    52.3344999296827
                                ],
                                [
                                    25.983352661132812,
                                    52.25008491227731
                                ],
                                [
                                    26.072616577148438,
                                    52.18319485497131
                                ],
                                [
                                    26.174240112304688,
                                    52.23536933191902
                                ],
                                [
                                    26.176986694335934,
                                    52.271939049983985
                                ],
                                [
                                    26.242904663085938,
                                    52.29840175155
                                ],
                                [
                                    26.248397827148438,
                                    52.326527284622735
                                ],
                                [
                                    26.27105712890625,
                                    52.32484864992542
                                ],
                                [
                                    26.2957763671875,
                                    52.331562806577544
                                ],
                                [
                                    26.327362060546875,
                                    52.32946474208912
                                ],
                                [
                                    26.341094970703125,
                                    52.33701730853913
                                ],
                                [
                                    26.312255859375,
                                    52.353796172573944
                                ],
                                [
                                    26.28753662109375,
                                    52.38398208257353
                                ],
                                [
                                    26.242904663085938,
                                    52.40116206466771
                                ]
                            ]
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "stroke": "#4de916",
                        "stroke-width": 2,
                        "stroke-opacity": 1,
                        "fill": "#555555",
                        "fill-opacity": 0.9
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [
                                    26.246337890625,
                                    52.26101332738652
                                ],
                                [
                                    26.363067626953125,
                                    52.26101332738652
                                ],
                                [
                                    26.363067626953125,
                                    52.32233057845825
                                ],
                                [
                                    26.246337890625,
                                    52.32233057845825
                                ],
                                [
                                    26.246337890625,
                                    52.26101332738652
                                ]
                            ]
                        ]
                    }
                }
            ]
        };

        let geoJsson = L.geoJson(states).addTo(map);

        map.fitBounds(geoJsson.getBounds(), { "animate": false });
    })
});

map.fitBounds(geojson.getBounds(), { "animate": false });
