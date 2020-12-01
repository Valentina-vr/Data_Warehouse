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

let formAdd = document.querySelectorAll("#userForm input,select");
let usersContainer = document.getElementById("users_container");
let notification = document.getElementById("warningUser");
let confirmDelete = document.getElementById("confirmDelete");

let close = () => {
  $("#newUser").modal("hide");
};

let clear = () => {
  formAdd.forEach((input) => {
    input.value = "";
  });
};

let open = () => {
  $("#newUser").modal("show");
};
 
const findUser = () => {
  fetch("http://localhost:8000/users/find").then((userList) => {
    userList.json().then((users) => {
      users.forEach((element) => {
        const { name, lastname, email, rol, id } = element;
        let renderUser = `
            <tr>
                <td>
                  <input type="checkbox" name="" class="selectitem"/>
                </td>
                <td class="name">${name}</td>
                <td class="lastName">${lastname}</td>
                <td class="email">${email}</td>
                <td class="rol">${rol}</td>
                <td>
                <button class="edititem">
                  <i class="fa fa-pencil" onclick="getUserInfo(${id})"></i>
                </button>
                <button class="edititem">
                  <i class="fa fa-trash deleteitem" onclick="deleteUser(${id})"></i>
                </button>
              </td>
          </tr>
        `;
        usersContainer.insertAdjacentHTML("beforeend", renderUser);
      });
    });
  });
};

findUser();

const validationAdd = () => {
  for (let i = 0; i < formAdd.length; i++) {
    /* const element = formAdd[i]; */
    if (formAdd[i].value == "") {
      notification.textContent = "Es necesario rellenar todos los campos";
    } else if (formAdd[4].value !== formAdd[5].value) {
      notification.textContent = "Las contraseñas no coinciden";
    }
  }
  let data = {
    name: formAdd[0].value,
    lastname: formAdd[1].value,
    email: formAdd[2].value,
    rol: formAdd[3].value,
    password: formAdd[4].value,
  };
  console.log(data);
  const dataJSON = JSON.stringify(data);
  console.log(dataJSON);
  addUser(dataJSON);
};

const addUser = (Userdata) => {
  fetch("http://localhost:8000/users/signup", {
    method: "POST",
    body: Userdata,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((user) => {
    user.json().then((users) => {
      console.log(users);
      const { name, lastname, email, rol, id } = users;
      let renderUser = `
          <tr>
            <td>
              <input type="checkbox" name="" class="selectitem"/>
            </td>
            <td class="name">${name}</td>
            <td class="lastName">${lastname}</td>
            <td class="email">${email}</td>
            <td class="role">${rol}</td>
            <td>
            <button class="edititem">
              <i class="fa fa-pencil" onclick="getUserInfo(${id})"></i>
              <i class="fa fa-trash deleteitem" onclick="deleteUser(${id})"></i>
            </button>
            </td>
          </tr>
        `;
      usersContainer.insertAdjacentHTML("beforeend", renderUser);
    });
  });
  close();
  clear();
};

let openDelete = () => {
  $("#deleteConfirm").modal("show");
};

const deleteUser = (id) => {
  /* let objectId = { id: id };
    let jsonId = JSON.stringify(objectId); */
  openDelete();
  confirmDelete.addEventListener("click", () => {
    fetch(`http://localhost:8000/users/delete/${id}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
    }).then((user) => {
      console.log(user);
      location.reload();
    });
  });
};

//UPDATE USERS
let getUserInfo = (id) => {
  fetch(`http://localhost:8000/users/findUser/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((user) => {
    user.json().then((userData) => {
      const { id, name, lastname, email, rol } = userData;
      formAdd[0].value = name;
      formAdd[1].value = lastname;
      formAdd[2].value = email;
      formAdd[3].value = rol;
      open();
      saveUser.onclick = "";
      saveUser.addEventListener("click", () => {
        let formData = Array.from(formAdd).reduce(
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
          name: formData.inputUserName,
          lastname: formData.inputUserLastName,
          email: formData.inputEmail,
          rol: formData.inputProfile,
          password: formData.inputPassword,
        };

        updateUser(id, data2);
        close();
        clear();
      });
    });
  });
};

let updateUser = (id, data) => {
  console.log(data);
  fetch(`http://localhost:8000/users/updateUser/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((updatedUser) => {
    updatedUser.json().then((userUpd) => {
      location.reload();
      console.log(userUpd);
    });
  });
};
