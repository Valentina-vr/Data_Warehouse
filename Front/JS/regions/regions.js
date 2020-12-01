let data = parseJwt(window.localStorage.getItem("token"));
let token = JSON.parse(window.localStorage.getItem("token"));
let users = document.getElementById("usersTab");

if (!data) {
  window.location = "login.html";
} else {
  if (data.rol !== "Administrador") {
    users.style.display = "none";
  }
}

//REGION
let regionContainer = document.getElementById("regionsContainer");
let regionName = document.getElementById("regionName");
let regionMessage = document.getElementById("regionMessage");
let modalConfirm = document.getElementById("confirmDelete");
let addRegionBtn = document.getElementById("addRegionBtn");
let ModalLabelRegion = document.getElementById("ModalLabelRegion");

//COUNTRY
let countryName = document.getElementById("countryName");
let countryMessage = document.getElementById("countryMessage");
let addCountryBtn = document.getElementById("btnAddCountry");
let modalCountryConfirm = document.getElementById("confirmDeleteCountry");
let ModalLabelCountry = document.getElementById("ModalLabelCountry");

//CITY DOM ELEMENTS
let cityName = document.getElementById("cityName");
let cityMessage = document.getElementById("cityMessage");
let addCityBtn = document.getElementById("addCityBtn");
let ModalLabelCity = document.getElementById("ModalLabelCity");
let modalCityConfirm = document.getElementById("confirmDeleteCity");

let clear = () => {
  regionName.value = "";
};

let open = () => {
  $("#addRegion").modal("show");
};

let close = () => {
  $("#addRegion").modal("hide");
};

let openCountry = () => {
  $("#addCountry").modal("show");
};

let closeCountry = () => {
  $("#addCountry").modal("hide");
};

let openCity = () => {
  $("#addCity").modal("show");
};

let closeCity = () => {
  $("#addCity").modal("hide");
};

//RENDER REGION
let renderRegions = () => {
  fetch("http://localhost:8000/region/find", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((regionCard) => {
    regionCard.json().then((regionCard) => {
      regionCard.forEach((regionC) => {
        const { id, name } = regionC;
        let region = `
                      <div id="regionCard">
                        <h1 class="regionTittle">
                          <a class="regionTree" data-toggle="collapse" href="#regionCollapse${id}" role="button" aria-expanded="false"
                            aria-controls="multiCollapseExample1">${name}</a>
                        </h1>
                        <div id="accionRegion">
                          <button class="btn plus_accordion" id="" type="submit" data-toggle="modal" onclick="getCountryData(${id})" data-target="#addCountry">
                            <i class="fa fa-plus-square-o"></i>
                          </button>
                          <button class="btn plus_accordion" id="" type="submit"  onclick="getRegionInfo(${id}, '${name}')" data-toggle="modal" data-target="">
                            <i class="fa fa-pencil-square-o"></i>
                          </button>
                          <button class="btn plus_accordion" id="" type="submit"  onclick="deleteRegion(${id})" data-toggle="modal" data-target="">
                            <i class="fa fa-trash-o"></i>
                          </button>
                        </div>
                        <div class="row">
                            <div class="col">
                                <div class="collapse multi-collapse" id="regionCollapse${id}">
                                    <div class="card card-bodyCo" id="countryCard${id}">
                                    </div>
                                </div>
                            </div>
                      </div>
                    `;
        regionContainer.insertAdjacentHTML("beforeend", region);
        renderCountries(id);
      });
    });
  });
};
renderRegions();

//ADD REGION
let validationRegion = () => {
  let regionData = regionName.value;
  console.log(regionData);

  if (regionData === "") {
    regionMessage.innerHTML =
      "*Por favor ingrese el nombre de la región a agregar";
  } else {
    let dataObject = {
      name: regionData,
    };
    let data = JSON.stringify(dataObject);
    addRegion(data);
  }
};

let addRegion = (data) => {
  event.preventDefault;
  fetch("http://localhost:8000/region/createRegion", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      regionMessage.innerHTML = "Ya existe la región";
    } else {
      res.json().then((info) => {
        console.log(info);
        const { id, name } = info;
        let regionCard = `
            <div id="regionCard">
            <h1 class="regionTittle">
              <a class="regionTree" data-toggle="collapse" href="#regionCollapse" role="button" aria-expanded="false"
                aria-controls="multiCollapseExample1">${name}</a>
            </h1>
            <div id="accionRegion">
              <button class="btn plus_accordion" id="" type="submit" data-toggle="modal" onclick="getCountryData(${id})" data-target="#addCountry">
                <i class="fa fa-plus-square-o"></i>
              </button>
              <button class="btn plus_accordion" id="" type="submit"  onclick="getRegionInfo(${id}, '${name}')" data-toggle="modal" data-target="">
                <i class="fa fa-pencil-square-o"></i>
              </button>
              <button class="btn plus_accordion" id="" type="submit"  onclick="deleteRegion(${id})" data-toggle="modal" data-target="">
                <i class="fa fa-trash-o"></i>
              </button>
            </div>
            <div class="row">
                <div class="col">
                    <div class="collapse multi-collapse" id="regionCollapse${id}">
                        <div class="card card-bodyCo" id="countryCard${id}">
                        </div>
                    </div>
                </div>
          </div>
        `;
        regionContainer.insertAdjacentHTML("beforeend", regionCard);
        clear();
        close();
      });
    }
  });
};

//UPDATE REGION
let getRegionInfo = (id, name) => {
  fetch(`http://localhost:8000/region/findRegion/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((region) => {
    region.json().then((regionInfo) => {
      regionName.value = name;
      open();
      ModalLabelRegion.innerHTML = "Editar Región";
      addRegionBtn.onclick = "";
      addRegionBtn.addEventListener("click", () => {
        let newData = regionName.value;
        let dataObject = {
          name: newData,
        };
        let data = JSON.stringify(dataObject);
        updateRegion(id, data);
        close();
      });
    });
  });
};

let updateRegion = (id, data) => {
  fetch(`http://localhost:8000/region/updateRegion/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((updatedRegion) => {
    updatedRegion.json().then((regionUpd) => {
      location.reload();
    });
  });
};

//DELETE REGION
let regionOpenDelete = () => {
  $("#regionDeleteConfirm").modal("show");
};

let deleteRegion = (id) => {
  regionOpenDelete();
  modalConfirm.addEventListener("click", () => {
    fetch(`http://localhost:8000/region/deleteRegion/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      location.reload();
    });
  });
};

//RENDER COUNTRIES
let renderCountries = (regionId) => {
  fetch(`http://localhost:8000/country/find/region/${regionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((countryCard) => {
    countryCard.json().then((country) => {
      country.forEach((element) => {
        const { id, name, regionId } = element;
        let countryCard = document.querySelector(`#countryCard${regionId}`);
        let renderCountry = `
        <div class="countryContainer" id="countryC${id}">
        <h2 class="coTitle">
          <a class="regionTree" data-toggle="collapse" href="#cityCollapse${id}" role="button"
            aria-expanded="flase" aria-controls="multiCollapseExample1">${name}</a>
        </h2>
        <div id="accionRegion">
          <button class="btn plus_accordion" id="" type="submit" onclick="getCityData(${id})" data-toggle="modal" data-target="#addCity">
            <i class="fa fa-plus-square-o"></i>
          </button>
          <button class="btn plus_accordion" id="" type="submit"  onclick="getCountryInfo(${id}, '${name}')" data-toggle="modal" data-target="">
            <i class="fa fa-pencil-square-o"></i>
          </button>
          <button class="btn plus_accordion" id="" type="submit"  onclick="deleteCountry(${id})" data-toggle="modal" data-target="">
            <i class="fa fa-trash-o"></i>
          </button>
          </div>
        </div>
        <div class="col cityContainer">
        <div class="collapse multi-collapse" id="cityCollapse${id}">
        </div>
        </div>
      `;
        countryCard.insertAdjacentHTML("beforeend", renderCountry);
        renderCities(id);
      });
    });
  });
};

//ADD COUNTRIES
let getCountryData = (regionId) => {
  openCountry();

  addCountryBtn.addEventListener("click", function countryFunct() {
    let countryData = countryName.value;

    if (countryData === "") {
      countryMessage.innerHTML = "Por favor ingrese el nombre del país";
    } else {
      let dataObject = {
        name: countryData,
        regionId: regionId,
      };
      let data = JSON.stringify(dataObject);
      addCountry(data);
      addCountryBtn.removeEventListener("click", countryFunct);
    }
  });
};

let addCountry = (data) => {
  event.preventDefault;
  fetch("http://localhost:8000/country/create", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      countryMessage.innerHTML = "Ya existe un país con este nombre";
    } else {
      res.json().then((info) => {
        console.log(info);
        const { id, name, regionId } = info;
        let regionCard = document.querySelector(`#countryCard${regionId}`);
        console.log(regionCard);
        let countryCard = `
        <div class="countryContainer" id="countryC${id}">
        <h2 class="coTitle">
          <a class="regionTree" data-toggle="collapse" href="#cityCollapse${id}" role="button"
            aria-expanded="flase" aria-controls="multiCollapseExample1">${name}</a>
        </h2>
        <div id="accionRegion">
          <button class="btn plus_accordion" id="" type="submit" data-toggle="modal" data-target="#addCity">
            <i class="fa fa-plus-square-o"></i>
          </button>
          <button class="btn plus_accordion" id="" type="submit"  onclick="getCountryInfo(${id}, '${name}')" data-toggle="modal" data-target="">
            <i class="fa fa-pencil-square-o"></i>
          </button>
          <button class="btn plus_accordion" id="" type="submit"  onclick="deleteCountry(${id})" data-toggle="modal" data-target="">
            <i class="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
      <div class="col cityContainer">
      <div class="collapse multi-collapse" id="cityCollapse${id}">
      </div>
    </div>
        `;
        regionCard.insertAdjacentHTML("beforeend", countryCard);
        closeCountry();
        clear();
      });
    }
  });
};

//UPDATE COUNTRY
let getCountryInfo = (id, name) => {
  fetch(`http://localhost:8000/country/findCountry/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((country) => {
    country.json().then((countryInfo) => {
      countryName.value = name;
      openCountry();
      ModalLabelCountry.innerHTML = "Editar país";
      addCountryBtn.addEventListener("click", () => {
        let newData = countryName.value;
        let dataObject = {
          name: newData,
        };
        let data = JSON.stringify(dataObject);
        updateCountry(id, data);
        closeCountry();
      });
    });
  });
};

let updateCountry = (id, data) => {
  fetch(`http://localhost:8000/country/updateCountry/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((updatedCountry) => {
    updatedCountry.json().then((countryUpd) => {
      location.reload();
    });
  });
};

//DELETE COUNTRY
let DeleteCountryOpen = () => {
  $("#ConfirmCountryDelete").modal("show");
};

let deleteCountry = (id) => {
  DeleteCountryOpen();
  modalCountryConfirm.addEventListener("click", () => {
    fetch(`http://localhost:8000/country/deleteCountry/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      location.reload();
    });
  });
};

//RENDER CITIES
let renderCities = (countryId) => {
  fetch(`http://localhost:8000/City/find/country/${countryId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((cityCard) => {
    cityCard.json().then((cityCard) => {
      cityCard.forEach((city) => {
        const { id, name, countryId } = city;
        let regionCard = document.querySelector(`#cityCollapse${countryId}`);
        let cityCard = `
        <div class="card card-bodyCi" id="cityCard${id}">
        <h6>${name}</h6>
        <div id="accionRegion">
          <button class="btn plus_accordion" id="" type="submit"   onclick="getCityInfo(${id}, '${name}')" data-toggle="modal" data-target="">
            <i class="fa fa-pencil-square-o"></i>
          </button>
          <button class="btn plus_accordion" id="" type="submit" onclick="deleteCity(${id})" data-toggle="modal" data-target="">
            <i class="fa fa-trash-o"></i>
          </button>
      </div>
    </div>`;
        regionCard.insertAdjacentHTML("beforeend", cityCard);
      });
    });
  });
};

//ADD CITY
let getCityData = (countryId) => {
  openCity();

  addCityBtn.addEventListener("click", function cityFunct() {
    let cityData = cityName.value;

    if (cityData === "") {
      cityMessage.innerHTML =
        "Por favor ingrese el nombre de la ciudad a agregar";
    } else {
      let dataObject = {
        name: cityData,
        countryId: countryId,
      };
      let data = JSON.stringify(dataObject);
      console.log(data);
      addCity(data);
      addCityBtn.removeEventListener("click", cityFunct);
    }
  });
};

let addCity = (data) => {
  event.preventDefault;
  fetch("http://localhost:8000/city/createCity", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      cityMessage.innerHTML = "Ya existe una ciudad con este nombre";
    } else {
      res.json().then((info) => {
        console.log(info);
        const { id, name, countryId } = info;
        let countryCard = document.querySelector(`#cityCollapse${countryId}`);
        console.log(countryCard);
        let cityCard = `
          <div class="card card-bodyCi" id="cityCard${id}">
            <h6>${name}</h6>
            <div id="accionRegion">
              <button class="btn plus_accordion" id="" type="submit"   onclick="getCityInfo(${id}, '${name}')" data-toggle="modal" data-target="">
                <i class="fa fa-pencil-square-o"></i>
              </button>
              <button class="btn plus_accordion" id="" type="submit" onclick="deleteCity(${id})" data-toggle="modal" data-target="">
                <i class="fa fa-trash-o"></i>
              </button>
          </div>
        </div>`;
        countryCard.insertAdjacentHTML("beforeend", cityCard);
        closeCity();
        clear();
      });
    }
  });
};

//UPDATE CITY
let getCityInfo = (id, name) => {
  fetch(`http://localhost:8000/city/findcity/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((city) => {
    city.json().then((cityInfo) => {
      cityName.value = name;
      openCity();
      addCityBtn.addEventListener("click", () => {
        let newData = cityName.value;
        let dataObject = {
          name: newData,
        };
        let data = JSON.stringify(dataObject);
        updateCity(id, data);
        closeCountry();
      });
    });
  });
};

let updateCity = (id, data) => {
  fetch(`http://localhost:8000/city/updateCity/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((updatedCity) => {
    updatedCity.json().then((updatedCity) => {
      location.reload();
    });
  });
};

//DELETE CITY
let cityOpenDelete = () => {
  $("#cityDeleteConfirm").modal("show");
};

let deleteCity = (id) => {
  cityOpenDelete();
  modalCityConfirm.addEventListener("click", () => {
    fetch(`http://localhost:8000/city/deleteCity/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      location.reload();
    });
  });
};
