let createBtn = document.getElementById("submitBtn")
let taskBtn = document.getElementById("task")
let form = document.getElementById("form")
console.log(form)


createBtn.addEventListener("click",async (e)=>{
    e.preventDefault()
    let data = {
        title : form.title.value,
        description : form.desc.value,
        status : form.status.value
    }
    // console.log(data)
    try {
        let url = "http://localhost:8080/task/create";
        let responce = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let res = await responce.json();
        console.log("res", res);
        alert("Task create Successful");
        form.title.value = ""
        form.desc.value = ""
        form.status.value = "completed"
      } catch (error) {
        console.log(error.message);
      }
})

const content = document.getElementById("content")

taskBtn.addEventListener("click", async()=>{
    try {
        let url = "http://localhost:8080/task";
        let responce = await fetch(url);
        let res = await responce.json();
        console.log("res", res);
        Data(res.data)
      } catch (error) {
        console.log(error.message);
      }
})


function Data(data){
    content.innerHTML = ""
    data.forEach(ele => {
       let div = document.createElement("div");

       let h3 = document.createElement("h3");
       let desc = document.createElement("p");
       let status = document.createElement("p");
       let edit = document.createElement("button")
       let deletebtn = document.createElement("button")
        
       deletebtn.id = ele._id
       h3.textContent = `Title : ${ele.title}`
       desc.textContent = `Description : ${ele.description}` 
       status.textContent = `Status : ${ele.status}`
       edit.textContent = "Edit"
       deletebtn.textContent = "Delete"

       edit.addEventListener("click",async(e)=>{
        try {
            let id = e.target.id
            console.log(id)
            let url = `http://localhost:8080/task/${id}`;
            let responce = await fetch(url);
            let res = await responce.json();
            console.log("res", res);



            let updateData = {
                title : res.data.title,
                description : res.data.description,
                status : res.data.status
            }
            let resPatch = await fetch(url,{
                method : "PATCH",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify(updateData)
            });
            Data(res.data)
          } catch (error) {
            console.log(error.message);
          }
       })

       deletebtn.addEventListener("click",async(e)=>{
        try {
            let id = e.target.id
            console.log(id)
            let url = `http://localhost:8080/task/delete/${id}`;
            let responce = await fetch(url,{
                method : "DELETE"
            });
            let res = await responce.json();
            console.log("res", res);
            Data(res.data)
          } catch (error) {
            console.log(error.message);
          }
       })
        div.append(h3,desc,status,edit,deletebtn)
        content.append(div)
    })
}