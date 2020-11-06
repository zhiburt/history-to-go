var geojsonFeature = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "shape": "Polygon",
                "name": "Unnamed Layer",
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
                "name": "Unnamed Layer",
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
                "name": "Unnamed Layer",
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

var myCustomStyle = {
    stroke: true,
    fill: true,
    // fillColor: '#fff',
    fillOpacity: 1
}
var map = L.map('map').setView([39.74739, -105], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(map);

L.geoJson(geojsonFeature, {
    style: function (feature) {
        return feature.properties && feature.properties.style;
    },
    clickable: true,
    // style: myCustomStyle
}).addTo(map);


var layerCoordinates = L.latLng(52.134463, 383.799013);

// map.setView(layerCoordinates);

// map.zoomIn(1000);
// map.fitBounds([layerCoordinates, L.latLng(52.138256, 383.779579)])
// map.fitBounds([layerCoordinates], { "animate": true })

(async () => {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    await sleep(5000);


    let polygonZoomCoordinates = [
        [
            52.138256,
            383.779579,
        ],
        [
            52.130142,
            383.765329,
        ],
        [
            52.124873,
            383.765844,
        ],
        [
            52.121079,
            383.769621,
        ],
        [
            52.122133,
            383.773398,
        ],
        [
            52.123081,
            383.772197,
        ],
        [
            52.127508,
            383.780266,
        ],
        [
            52.130985,
            383.78008,
        ],
        [
            52.13225,
            383.783528,
        ],
        [
            52.138256,
            383.779579
        ]
    ];

    map.fitBounds(polygonZoomCoordinates, { "animate": true, "easeLinearity": 1, "duration": 10 })
})();
