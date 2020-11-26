let formAdd = document.querySelectorAll("#userForm input,select");
let usersContainer = document.getElementById("users_container");
let notification = document.getElementById("warningUser");
let confirmDelete = document.getElementById("confirmDelete");

console.log(formAdd);

const findUser = () => {
  fetch("http://localhost:8000/users/find").then((userList) => {
    userList.json().then((users) => {
      console.log(users);
      users.forEach((element) => {
        const { name, lastname, email, role, id } = element;
        let renderUser = `
            <tr>
                <td>
                  <input type="checkbox" name="" class="selectitem"/>
                </td>
                <td class="name">${name}</td>
                <td class="lastName">${lastname}</td>
                <td class="email">${email}</td>
                <td class="role">${role}</td>
                <td>
                <button class="edititem">
                  <i class="fa fa-pencil onclick="deleteUser(${id})""></i>
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
      //TODO:   Authorization: "Bearer " + token,
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
              <i class="fa fa-pencil"></i>
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
    fetch(`http://localhost:8000/users/delete/1${id}`, {
      method: "DELETE",
      /* headers: {
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + token,
        }, */
    }).then((user) => {
      console.log(user);
      location.reload();
    });
  });
};

let close = () => {
 $("#newUser").modal("hide");
 };

let clear = () => {
   formAdd.forEach((input) => {
    input.value = "";
   });
};
