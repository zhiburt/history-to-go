function showHistory(history) {
    currentHistory = history;

    let layer = currentHistory.layers[0];
    showHistoryLayer(layer);
}

function showHistoryLayer(layer) {
    console.log("12313123", layer)

    currentArtifacts = collectArtifacts(layer);

    console.log("currentArtifacts", currentArtifacts)

    info.update({ "artifacts": currentArtifacts });

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

    if (props.description) {
        layer.bindPopup(props.description);
    }
    if (props.name) {
        layer.bindTooltip(`<h6>${props.name}</h6>`);
    }

    if (props["layer-data"] !== undefined) {
        let nextLayerId = props["layer-data"].internal;
        let nextLayer = currentHistory.layers.find((_, i) => i === nextLayerId);

        console.log("nextLayer", nextLayer)

        layer.on('click', () => showHistoryLayer(nextLayer));
    }

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
        // click: zoomToFeature
    });
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        // layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);

    info.update({ "artifacts": currentArtifacts });
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function collectArtifacts(featureCollection) {
    let arr = [];

    featureCollection.features.forEach((feature) => {
        if (feature.properties.artifacts) {
            arr.push(...feature.properties.artifacts);
        } else if (feature.properties.artifact) {
            arr.push(feature.properties.artifact);
        }
    });

    return arr;
}


let currentHistory = null;
let currentArtifacts = null;

var map = L.map('map');

map.setView([39.74739, -105], 4);

var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
}).addTo(map);

let geojson = L.geoJson(null, {
    style: function (feature) {
        return feature.properties && feature.properties.style;
    },
    clickable: true,
    onEachFeature: onEachFeature,
}).addTo(map);

var info = L.control();

info.onAdd = function (map) {
    console.log("CAAAAAL");
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    console.log("AAAA", props);

    let listhtml = "<h4>Artifacts</h4><br/>";
    if (props && props.artifacts) {
        props.artifacts.forEach((artifact) => {
            listhtml += '<b>' + artifact.name + '</b>   <img src="' + artifact.image + '" class="img" style="height: 3rem;"></img></br></br>';
        });
    }

    this._div.innerHTML = listhtml;
};

info.addTo(map);
