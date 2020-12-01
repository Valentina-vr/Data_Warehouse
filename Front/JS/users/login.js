let loginForm = document.querySelectorAll("#loginForm input");
let lackFields = document.getElementById("warninglogin");

//LOGIN USUARIOS
let login = () => {
  let login = Array.from(loginForm).reduce(
    (acc, input) => ({
      ...acc,
      [input.id]: input.value,
    }),
    {}
  );
  console.log(login);

  for (const key in login) {
    if (login[key] === "") {
      lackFields.innerHTML = "Por favor llene todos los campos";
      return;
    }
  }
  let data2 = {
    email: login.login_name,
    password: login.login_pass,
  };

  let data = JSON.stringify(data2);

  fetch("http://localhost:8000/users/login", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 401) {
      lackFields.innerHTML = "Usuario o contaseña no validos";
    } else {
      res.json().then((token) => {
        let data = JSON.stringify(token);
        console.log(token);
         window.localStorage.setItem("token", data);
        window.location.href = "contacts.html"; 
      });
    }
  });
};
