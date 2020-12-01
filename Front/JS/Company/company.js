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
    $("#newCompany").modal("hide");
};
  
//OPEN MODALS
let open = () => {
    $("#newCompany").modal("show");
};
  
let openDelete = () => {
    $("#deleteCompanyConfirm").modal("show");
};

let clear = () => {
  form.forEach((input) => {
    input.value = "";
  });
};

//RENDER COMPANIES
let renderCompanies = () => {
    fetch("http://localhost:8000/company/find", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
                    <i class="fa fa-pencil" onclick="getCompanyInfo(${id})"></i>
                </button>
                <button class="edititem">
                    <i class="fa fa-trash deleteitem" onclick="deleteCompany(${id})"></i>
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

//ADD COMPANY

let getCompanyData = () => {
  let formData = Array.from(form).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );


  for (const key in formData) {
    if (formData[key] === "") {
      lackFields.innerHTML = "*Por favor llene todos los campos";
      return;
    }
  }

  let data2 = {
    name: formData.CompanyName,
    country: formData.companyCountry,
    city: formData.companyCity,
    address: formData.companyAddress,
    email: formData.companyEmail,
    phone: formData.companyPhone,
  };

  let data = JSON.stringify(data2);
  addCompany(data);
};

let addCompany = (data) => {
  event.preventDefault;
  fetch("http://localhost:8000/company/create", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      emailExist.innerHTML =
        "El email ya se encuentra registrado en otra compañia";
    } else if (res.status === 500) {
      lackFields.innerHTML =
        "Tenemos problemas en el servidor, por favor intente mas tarde";
    } else {
      res.json().then((info) => {
        const { id, name, country, city, address, email, phone } = info;
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
                    <i class="fa fa-pencil" onclick="getCompanyInfo(${id})"></i>
                </button>
                <button class="edititem">
                    <i class="fa fa-trash deleteitem" onclick="deleteCompany(${id})"></i>
                </button>
            </td>
         </tr>
        `;
        companyList.insertAdjacentHTML("beforeend", company);
        close();
        clear();
      });
    }
  });
};

let renderCountries = () => {
    fetch(`http://localhost:8000/country/find`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((allCountries) => {
      allCountries.json().then((countries) => {
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
        Authorization: "Bearer " + token,
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


//DELETE COMPANY

let deleteCompany = (id) => {
  openDelete();
  modalYes.addEventListener("click", () => {
    fetch(`http://localhost:8000/company/deleteCompany/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((company) => {
      location.reload();
    });
  });
};


//UPDATE COMPANY
let getCompanyInfo = (id) => {
  fetch(`http://localhost:8000/company/findCompany/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((company) => {
    company.json().then((companyData) => {
      const { id, name, country, city, address, email, phone } = companyData;
      ModalLabel.innerHTML = "Editar compañia";
      form[0].value = name;
      form[1].value = country;
      form[2].value = city;
      form[3].value = address;
      form[4].value = email;
      form[5].value = phone;
      open();
      saveCompany.onclick = "";
      saveCompany.addEventListener("click", () => {
        let formData = Array.from(form).reduce(
          (acc, input) => ({
            ...acc,
            [input.id]: input.value,
          }),
          {}
        );
        for (const key in formData) {
          if (formData[key] === "") {
            delete formData[key];
          }
        }
        let data2 = {
          name: formData.CompanyName,
          country: formData.companyCountry,
          city: formData.companyCity,
          address: formData.companyAddress,
          email: formData.companyEmail,
          phone: formData.companyPhone,
        };

        let data = JSON.stringify(data2);
        updateCompany(id, data);
        close();
        clear();
      });
    });
  });
};

let updateCompany = (id, data) => {
  fetch(`http://localhost:8000/company/updatecompany/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((updatedCompany) => {
    updatedCompany.json().then((companyUpd) => {
      location.reload();
    });
  });
};



