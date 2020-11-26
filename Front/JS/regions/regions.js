//REGION DOM ELEMENTS
let regionContainer = document.getElementById("regionsContainer");
let regionName = document.getElementById("regionName");
let regionMessage = document.getElementById("regionMessage");
let modalConfirm = document.getElementById("confirmDelete");
let addRegionBtn = document.getElementById("addRegionBtn");
let ModalLabelRegion = document.getElementById("ModalLabelRegion");

//OPEN MODAL
let open = () => {
    $("#addRegion").modal("show");
};

//CLOSE MODAL
let close = () => {
    $("#addRegion").modal("hide");
};

//CLEAR MODAL FIELDS
let clear = () => {
    regionName.value = "";
};

let renderRegions = () => {
    fetch("http://localhost:3000/region/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((regionCard) => {
      console.log(regionCard);
      regionCard.json().then((regionCard) => {
        regionCard.forEach((regionC) => {
          const { id, name } = regionC;
          let region = `<section class="region" id=regionId${id}>
          <h2 class="regionTittle">
              <b><a class="regionTree" data-toggle="collapse" href="#regionCollapse${id}" role="button" aria-expanded="false"
                  aria-controls="multiCollapseExample1">${name}</a></b>
          </h2>
          <i class="fas fa-edit" onclick="getRegionInfo(${id}, '${name}')"></i>
          <i class="far fa-trash-alt" onclick="deleteRegion(${id})"></i>
          <i class="fas fa-plus" onclick="getCountryData(${id})"></i>
          <div class="row">
              <div class="col">
                  <div class="collapse multi-collapse" id="regionCollapse${id}">
                      <div class="card card-bodyCo" id="countryCard${id}">
                          
                      </div>
                  </div>
              </div>
          </div>
      </section>`;
          regionContainer.insertAdjacentHTML("beforeend", region);
          renderCountries(id);
        });
      });
    });
  };
  renderRegions();