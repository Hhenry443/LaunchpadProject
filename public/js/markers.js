const map = new mapboxgl.Map({
  accessToken: MAPBOX_TOKEN,
  container: "map",
  center: [-1.921133, 52.480618],
  zoom: 16,
});

geojsonFoodbanks = {
  type: "FeatureCollection",
  features: [],
};

geojsonAllotments = {
  type: "FeatureCollection",
  features: [],
};

foodBankMarkers.forEach((marker) => {
  const lng = marker.fb_lng;
  const lat = marker.fb_lat;

  const name = marker.fb_name;
  const description = marker.fb_description;

  newFeature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat],
    },
    properties: {
      title: name,
      description: description,
    },
  };

  console.log(newFeature);

  geojsonFoodbanks.features.push(newFeature);
});

allotmentMarkers.forEach((marker) => {
  const lng = marker.a_lng;
  const lat = marker.a_lat;

  const name = marker.a_name;
  const description = marker.a_description;

  newFeature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat],
    },
    properties: {
      title: name,
      description: description,
    },
  };

  console.log(newFeature);

  geojsonAllotments.features.push(newFeature);
});

const foodbankMarkerInstances = [];
const allotmentMarkerInstances = [];

// add markers to map for food banks
for (const feature of geojsonFoodbanks.features) {
  const el = document.createElement("div");
  el.className = "marker-icon-foodbank";
  el.innerHTML = '<i class="fa-solid fa-shop"></i>';

  const marker = new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${feature.properties.title}</h3>
                <p>${feature.properties.description}</p>`,
      ),
    )
    .addTo(map);

  foodbankMarkerInstances.push(marker);
}

for (const feature of geojsonAllotments.features) {
  const el = document.createElement("div");
  el.className = "marker-icon-allotment";
  el.innerHTML = '<i class="fa-solid fa-leaf"></i>';

  const marker = new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3>${feature.properties.title}</h3>
                  <p>${feature.properties.description}</p>`,
      ),
    )
    .addTo(map);

  allotmentMarkerInstances.push(marker);
}
