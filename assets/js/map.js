let currentHistory = null;

var map = L.map('map');

map.setView([39.74739, -105], 4);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', { foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' }).addTo(map);

var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '©OpenStreetMap, ©CartoDB'
}).addTo(map);

var positronLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: '©OpenStreetMap, ©CartoDB',
    pane: 'labels'
}).addTo(map);

let geojson = L.geoJson(null, {
    style: function (feature) {
        return feature.properties && feature.properties.style;
    },
    clickable: true,
    onEachFeature: onEachFeature,
    // style: myCustomStyle
}).addTo(map);

function showHistory(history) {
    currentHistory = history;
    
    let layer = currentHistory[0].layer;
    showHistoryLayer(layer);
}

function showHistoryLayer(layer) {
    geojson.clearLayers();
    let l = geojson.addData(layer);
    map.fitBounds(l.getBounds(), { "animate": false });
}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }

    let props = layer.feature.properties;
    layer.bindPopup(props.name);

    if (props["layer-data"] !== undefined) {
        let nextLayerId = props["layer-data"].internal;
        let nextLayer = currentHistory.find((e) => e.id === nextLayerId);
        let newLayer = nextLayer.layer;
        layer.on('click', () => showHistoryLayer(newLayer));
    }
}