let Name = document.getElementById("name");
let role = document.getElementById("role");
let email = document.getElementById("email");
let password = document.getElementById("password");

const onsignup = async () => {
  let obj = {
    name: Name.value,
    email: email.value,
    role: role.value,
    password: password.value,
  };
  console.log(obj);
  try {
    let url = "https://task-manager-yu2l.onrender.com/user/register";
    let responce = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await responce.json();
    console.log("res", res);
    if(res.isOk){
      alert("SignUp Successfull");
      window.location.href = "../index.html";
    }else{
      alert(res.message)
    }
    
  } catch (error) {
    console.log(error.message);
  }
};