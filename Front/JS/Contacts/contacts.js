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
let form = document.querySelectorAll("#newContact input,select");
let lackFields = document.querySelector("#lackFields");
let emailExist = document.querySelector(".emailExist");
let saveContact = document.querySelector("#saveContact");
let contactList = document.querySelector("#contactsContainer");
let modalYes = document.getElementById("confirmDelete");
let inputRegion = document.getElementById("inputRegion");
let inputCountry = document.getElementById("inputCountry");
let inputCity = document.getElementById("inputCity");
let exampleModalLabel = document.getElementById("exampleModalLabel");
let contactModal = document.getElementById("BtnAddContact");

let clear = () => {
  form.forEach((input) => {
    input.value = "";
  });
};

let close = () => {
  $("#newContact").modal("hide");
};

let open = () => {
  $("#newContact").modal("show");
};

contactModal.addEventListener("click", () => {
  clear();
});

//RENDER CONTACTS
let renderContacts = () => {
  fetch("http://localhost:8000/contact/find", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((contactCard) => {
    contactCard.json().then((contactCard) => {
      contactCard.forEach((contactC) => {
        const {
          id,
          name,
          lastname,
          role,
          email,
          company,
          region,
          country,
          city,
          interest,
        } = contactC;
        var color;
        switch (interest) {
          case "0":
            color = "success";
            break;
          case "25":
            color = "success";
            break;
          case "50":
            color = "info";
            break;
          case "75":
            color = "warning";
            break;
          case "100":
            color = "danger";
            break;
          default:
            color = "success";
            break;
        }
        let contact = `
          <tr>
          <td>
              <input type="checkbox" name="" class="selectitem"/>
          </td>
          <td class="name">${
            name + " " + lastname
          }<p class="emailContact">${email}</p></td>
          <td class="country">${country}<p class="emailContact">${region}</p></td>
          <td class="city">${company}</td>
          <td class="role">${role}</td>
          <td class="interest">
          <div class="progress">
            <div
                class="progress-bar bg-${color}"
                role="progressbar"
                style="width: ${interest}%"
                aria-valuenow="${interest}"
                aria-valuemin="0"
                aria-valuemax="100"
            >
            </div>
          </div>
        </td>
          <td>
              <button class="edititem">
                  <i class="fa fa-pencil" onclick="getContactInfo(${id})"></i>
              </button>
              <button class="edititem">
                  <i class="fa fa-trash deleteitem" onclick="deleteUser(${id})"></i>
              </button>
          </td>
       </tr>
        `;
        contactList.insertAdjacentHTML("beforeend", contact);
      });
    });
  });
};
renderContacts();

//ADD CONTACT
let getContactData = () => {
  let formData = Array.from(form).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );
  for (const key in formData) {
    if (formData[key] === "") {
      lackFields.innerHTML = "Por favor llene todos los campos";
      return;
    }
  }

  let data2 = {
    name: formData.inputName,
    lastname: formData.inputLastName,
    role: formData.inputRole,
    email: formData.inputEmail,
    company: formData.inputCompany,
    region: formData.inputRegion,
    country: formData.inputCountry,
    city: formData.inputCity,
    address: formData.inputAddress,
    interest: formData.inputInterest,
  };

  let data = JSON.stringify(data2);
  addContact(data);
};

let addContact = (data) => {
  event.preventDefault;
  fetch("http://localhost:8000/contact/create", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    if (res.status === 400) {
      emailExist.innerHTML = "*Este email ya se encuentra registrado";
    } else if (res.status === 500) {
      lackFields.innerHTML =
        "Oh, Tenemos problemas en el servidor, por favor intente mas tarde";
    } else {
      res.json().then((info) => {
        const {
          id,
          name,
          lastname,
          role,
          email,
          company,
          region,
          country,
          city,
          interest,
        } = info;
        var color;
        switch (interest) {
          case "0":
            color = "success";
            break;
          case "25":
            color = "success";
            break;
          case "50":
            color = "info";
            break;
          case "75":
            color = "warning";
            break;
          case "100":
            color = "danger";
            break;
          default:
            color = "success";
            break;
        }
        let contact = `
        <tr>
        <td>
            <input type="checkbox" name="" class="selectitem"/>
        </td>
        <td class="name">${
          name + " " + lastname
        }<p class="emailContact">${email}</p></td>
        <td class="country">${country}<p class="emailContact">${region}</p></td>
        <td class="city">${company}</td>
        <td class="role">${role}</td>
        <td class="interest">
        <div class="progress">
          <div
              class="progress-bar bg-${color}"
              role="progressbar"
              style="width: ${interest}%"
              aria-valuenow="${interest}"
              aria-valuemin="0"
              aria-valuemax="100"
          >
          </div>
        </div>
      </td>
        <td>
            <button class="edititem">
                <i class="fa fa-pencil" onclick="getContactInfo(${id})"></i>
            </button>
            <button class="edititem">
                <i class="fa fa-trash deleteitem" onclick="deleteUser(${id})"></i>
            </button>
        </td>
     </tr>
          `;
        contactList.insertAdjacentHTML("beforeend", contact);
        clear();
        close();
      });
    }
  });
};

//DELETE CONTACT
let openDelete = () => {
  $("#deleteContactConfirm").modal("show");
};

let deleteUser = (id) => {
  openDelete();
  modalYes.addEventListener("click", () => {
    fetch(`http://localhost:8000/contact/deletecontact/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then((user) => {
      location.reload();
    });
  });
};

//UPDATE CONTACT
let getContactInfo = (id) => {
  fetch(`http://localhost:8000/contact/findcontact/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((contact) => {
    contact.json().then((contactData) => {
      const {
        id,
        name,
        lastname,
        role,
        email,
        company,
        region,
        country,
        city,
        address,
        interest,
      } = contactData;
      exampleModalLabel.innerHTML = "Editar contacto";
      form[0].value = name;
      form[1].value = lastname;
      form[2].value = role;
      form[3].value = email;
      form[4].value = company;
      form[5].value = region;
      form[6].innerHTML = `<option selected>${country}</option>`;
      form[7].innerHTML = `<option selected>${city}</option>`;
      form[8].value = address;
      form[9].value = interest;
      open();
      saveContact.onclick = "";
      saveContact.addEventListener("click", () => {
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
          name: formData.inputName,
          lastname: formData.inputLastName,
          role: formData.inputRole,
          email: formData.inputEmail,
          company: formData.inputCompany,
          region: formData.inputRegion,
          country: formData.inputCountry,
          city: formData.inputCity,
          address: formData.inputAddress,
          interest: formData.inputInterest,
        };

        let data = JSON.stringify(data2);
        updateContact(id, data);
        close();
        clear();
      });
    });
  });
};

let updateContact = (id, data) => {
  fetch(`http://localhost:8000/contact/updatecontact/${id}`, {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((updatedContact) => {
    updatedContact.json().then((contactUpd) => {
      location.reload();
      console.log(contactUpd);
    });
  });
};


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
        let region = `<option data-id="${id}">${name}</option>`;
        inputRegion.insertAdjacentHTML("beforeend", region);
      });
    });
  });
};

let renderCountries = (regionId) => {
  fetch(`http://localhost:8000/country/find/region/${regionId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((Countries) => {
    Countries.json().then((countries) => {
      countries.forEach((element) => {
        const { id, name } = element;
        let countrySelect = `<option data-id="${id}">${name}</option>`;
        inputCountry.insertAdjacentHTML("beforeend", countrySelect);
      });
    });
  });
};

let showCountries = () => {
  inputCountry.innerHTML = "";
  let option = `<option selected></option>`;
  inputCountry.insertAdjacentHTML("afterbegin", option);
  let id = getSelectedOption(inputRegion);
  renderCountries(id.dataset.id);
};

let showCities = () => {
  inputCity.innerHTML = "";
  let option = `<option selected></option>`;
  inputCity.insertAdjacentHTML("afterbegin", option);
  let id = getSelectedOption(inputCountry);
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

let renderCities = (CountryId) => {
  fetch(`http://localhost:8000/city/find/country/${CountryId}`, {
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
        inputCity.insertAdjacentHTML("beforeend", citySelect);
      });
    });
  });
};

renderRegions();

