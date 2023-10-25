let email = document.getElementById("email");
let password = document.getElementById("password");
let loginBtn = document.getElementById("login")

loginBtn.addEventListener("click", async (e) => {
  console.log("gsfdfds")
  e.preventDefault()
  let obj = {
    email: email.value,
    password: password.value,
  };
  console.log(obj);
  try {
    let url = "https://task-manager-yu2l.onrender.com/user/login";
    let responce = await fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await responce.json();
    if(res.isOk){
      console.log("res", res);
      localStorage.setItem("token",res.token)
      alert("Login Successfull");
      window.location.href = "./home/home.html";
      email.value = "";
      password.value = "";
    }else{
      alert(res.message)
    }
   
  } catch (error) {
    alert("error")
    console.log(error.message);
  }
});