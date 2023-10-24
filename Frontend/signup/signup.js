let name = document.getElementById("name");
let role = document.getElementById("role");
let email = document.getElementById("email");
let password = document.getElementById("password");

const onsignup = async () => {
  let obj = {
    name: name.value,
    email: email.value,
    role: role.value,
    password: password.value,
  };
  console.log(obj);
  try {
    let url = "http://localhost:8080/user/register";
    let responce = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await responce.json();
    console.log("res", res);
    alert("SignUp Successfull");
    window.location.href = "http://127.0.0.1:5500/Frontend/index.html";
  } catch (error) {
    console.log(error.message);
  }
};