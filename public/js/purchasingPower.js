map.on("load", () => {
  map.addSource("income-data", {
    type: "geojson",
    data: "./geojson/income.geojson",
  });

  map.addLayer({
    id: "purchasingPower",
    type: "fill",
    source: "income-data",
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "income_decile"],
        1,
        "rgb(215,25,28)", // deprived = red
        5,
        "rgb(255,255,102)", // average = yellow
        10,
        "rgb(44,123,182)", // affluent = blue
      ],
      "fill-opacity": 0.7,
    },
  });
});
