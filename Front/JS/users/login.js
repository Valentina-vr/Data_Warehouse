
let loginForm = document.querySelectorAll("#form_login input");
let warninglogin = document.getElementById("warninglogin");

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
      warninglogin.innerHTML = "Es necesario llenar todos los campos";
      return;
    }
  }
  let data2 = {
    email: login.InputEmail,
    password: login.exampleInputPassword1,
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
      warninglogin.innerHTML = "Usuario o contaseña no validos";
    } else {
      res.json().then((token) => {
        let data = JSON.stringify(token);
        console.log(token);
        window.localStorage.setItem("token", data);
        window.location.href = "/contacts.html";
      });
    }
  });
};
