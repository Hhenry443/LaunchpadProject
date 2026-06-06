const toggleableLayerIds = ["foodbanks", "allotments", "purchasingPower"];

const domMarkerGroups = {
  foodbanks: foodbankMarkerInstances,
  allotments: allotmentMarkerInstances,
};

const layers = document.getElementById("buttons");

for (const id of toggleableLayerIds) {
  if (document.getElementById(id)) {
    continue;
  }

  if (id == "foodbanks") {
    layers.insertAdjacentHTML(
      "beforeend",
      `<div class="w-full sm:w-1/3"><a id="${id}" class="p-4 bg-gray-300 rounded-lg flex flex-col space-y-2 active"><i class="fa-solid fa-shop text-2xl text-[#6A994E]"></i> <p>Foodbanks</p></a></div>`,
    );
  } else if (id == "allotments") {
    layers.insertAdjacentHTML(
      "beforeend",
      `<div class="w-full sm:w-1/3"><a id="${id}" class="p-4 bg-gray-300 rounded-lg flex flex-col space-y-2 active"><i class="fa-solid fa-leaf text-2xl text-[#6A994E]"></i> <p>Allotments</p></a></div>`,
    );
  } else if (id == "purchasingPower") {
    layers.insertAdjacentHTML(
      "beforeend",
      `<div class="w-full sm:w-1/3"><a id="${id}" class="p-4 bg-gray-300 rounded-lg flex flex-col space-y-2 active"><i class="fa-solid fa-money-bill text-2xl text-[#6A994E]"></i> <p>Purchasing Power</p></a></div>`,
    );
  }

  document.getElementById(id).onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();

    const clickedLayer = this.id;
    const isActive = this.classList.contains("active");

    const icon = this.querySelector("i");

    if (domMarkerGroups[clickedLayer]) {
      domMarkerGroups[clickedLayer].forEach((marker) => {
        marker.getElement().style.display = isActive ? "none" : "";
      });
      this.classList.toggle("active");
      icon.classList.toggle("text-[#6A994E]", !isActive);
      icon.classList.toggle("text-[#BC4749]", isActive);
      this.classList.toggle("bg-gray-300", !isActive);
      this.classList.toggle("bg-gray-200", isActive);
    } else {
      const visibility = map.getLayoutProperty(clickedLayer, "visibility");
      if (visibility === "visible") {
        map.setLayoutProperty(clickedLayer, "visibility", "none");
        this.classList.remove("active");
        icon.classList.remove("text-[#6A994E]");
        icon.classList.add("text-[#BC4749]");
        this.classList.remove("bg-gray-300");
        this.classList.add("bg-gray-200");
      } else {
        this.classList.add("active");
        icon.classList.remove("text-[#BC4749]");
        icon.classList.add("text-[#6A994E]");
        this.classList.remove("bg-gray-200");
        this.classList.add("bg-gray-300");
        map.setLayoutProperty(clickedLayer, "visibility", "visible");
      }
    }
  };
}
