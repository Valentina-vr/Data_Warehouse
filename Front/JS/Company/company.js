//DOM ELEMENTS
let form = document.querySelectorAll("#companyForm input,select");
let lackFields = document.querySelector("#lackFields");
let emailExist = document.querySelector("#emailExist");
let saveCompany = document.querySelector("#saveCompany");
let companyList = document.querySelector("#companyContainer");
let modalYes = document.getElementById("confirmDelete");
let ModalLabel = document.getElementById("ModalLabel");
let companyCountry = document.getElementById("companyCountry");
let companyCity = document.getElementById("companyCity");

//CLOSE MODAL
let close = () => {
    $("#addCompany").modal("hide");
};
  
//OPEN MODALS
let open = () => {
    $("#addCompany").modal("show");
};
  
let openDelete = () => {
    $("#deleteCompanyConfirm").modal("show");
};

//RENDER COMPANIES
let renderCompanies = () => {
    fetch("http://localhost:8000/company/find", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + token,
      },
    }).then((companyCard) => {
      companyCard.json().then((companyCard) => {
        companyCard.forEach((companyC) => {
          const { id, name, country, city, address, email, phone } = companyC;
          let company = `
          <tr>
            <td>
                <input type="checkbox" name="" class="selectitem"/>
            </td>
            <td class="name">${name}</td>
            <td class="country">${country}</td>
            <td class="city">${city}</td>
            <td class="address">${address}</td>
            <td class="address">${email}</td>
            <td class="address">${phone}</td>
            <td>
                <button class="edititem">
                    <i class="fa fa-pencil" onclick=""></i>
                </button>
                <button class="edititem">
                    <i class="fa fa-trash deleteitem" onclick=""></i>
                </button>
            </td>
         </tr>
            `;
          companyList.insertAdjacentHTML("beforeend", company);
        });
      });
    });
};

renderCompanies();

let renderCountries = () => {
    fetch(`http://localhost:8000/country/find`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + token,
      },
    }).then((allCountries) => {
      allCountries.json().then((countries) => {
        console.log(countries);
        countries.forEach((country) => {
          const { id, name } = country;
          let countrySelect = `<option data-id="${id}">${name}</option>`;
          companyCountry.insertAdjacentHTML("beforeend", countrySelect);
        });
      });
    });
};

let showCities = () => {
    companyCity.innerHTML = "";
    let option = `<option selected></option>`;
    companyCity.insertAdjacentHTML("afterbegin", option);
    let id = getSelectedOption(companyCountry);
    renderCities(id.dataset.id);
};

let getSelectedOption = (sel) => {
    var opt;
    for (var i = 0, len = sel.options.length; i < len; i++) {
      opt = sel.options[i];
      if (opt.selected === true) {
        break;
      }
    }
    return opt;
};

let renderCities = (countryId) => {
    fetch(`http://localhost:8000/city/find/country/${countryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + token,
      },
    }).then((cityCard) => {
      cityCard.json().then((cityCard) => {
        cityCard.forEach((city) => {
          const { id, name } = city;
          let citySelect = `<option>${name}</option>`;
          companyCity.insertAdjacentHTML("beforeend", citySelect);
        });
      });
    });
};

renderCountries();

//
