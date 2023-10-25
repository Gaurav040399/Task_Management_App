let createBtn = document.getElementById("submitBtn")
let taskBtn = document.getElementById("task")
let form = document.getElementById("form");
const content = document.getElementById("content");
let title = document.getElementById("title")
let description = document.getElementById("desc")
let status = document.getElementById("status")
let closeBtn = document.getElementById("closeBtn")
let myModel = document.getElementById("myModal")
// console.log(form)
let editingData 
let isEditing = false


createBtn.addEventListener("click",async (e)=>{
    e.preventDefault()
    editCreatTask()
})

async function editCreatTask(){
  if(!isEditing){
    let data = {
      title : form.title.value,
      description : form.desc.value,
      status : form.status.value
  }
  // console.log(data)
  try {
      let url = "https://task-manager-yu2l.onrender.com/task/create";
      let responce = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
      });
      let res = await responce.json();
      console.log("res", res);
      if(res.isOk){
        alert("Task create Successful");
        allTaskf()
        form.reset()
      }else{
        alert(res.message)
      }
      
    } catch (error) {
      console.log(error.message);
    }
   }else{
    try {
       
      
      // status.value = editingData.status

      let updateData = {
          title : title.value,
          description : description.value,
          status : form.status.value
      }
      
      let resPatch = await fetch(`https://task-manager-yu2l.onrender.com/task/update/${editingData._id}`,{
          method : "PATCH",
          headers:{
              "content-type":"application/json",
                "Authorization": localStorage.getItem("token")
             
          },
          body: JSON.stringify(updateData)
      });
      // Data(res.data)
      let resData = await resPatch.json()
      if(resData.isOk){
        isEditing = false;
        createBtn.innerText = "Add Task"
        // myModel.style.display = "none"
        window.location.reload()
        // allTaskf()
      }else{
        alert(resData.message)
      }
      
      
    } catch (error) {
      console.log(error.message);
    }
   }
}


taskBtn.addEventListener("click",allTaskf)


 async function allTaskf(){
  try {
    let url = "https://task-manager-yu2l.onrender.com/task";
    let responce = await fetch(url,{
      headers:{
        "Authorization": localStorage.getItem("token")
      }
    });
    let res = await responce.json();
    // console.log("res", res);
    Data(res.data)
  } catch (error) {
    console.log(error.message);
  }
}

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
       edit.setAttribute("type", "button");
       edit.id = ele._id
       edit.className = "btn btn-info";
       edit.setAttribute("data-toggle", "modal");
       edit.setAttribute("data-target", "#myModal");
       edit.textContent = "Edit"
       deletebtn.textContent = "Delete"

       edit.addEventListener("click",async(e)=>{
        isEditing = true
        let id = e.target.id
        console.log(id)
        let url = `https://task-manager-yu2l.onrender.com/task/${id}`;
        let responce = await fetch(url,{
          headers:{
            "Authorization": localStorage.getItem("token")
          }
        });
        let res = await responce.json();
        if(res.isOk){
          editingData = res.data
          form.title.value = editingData.title
          description.value = editingData.description
          // console.log(editingData._id)
          // console.log("res....", res.data);
          createBtn.innerText = "Edit Task"
        }else{
          alert(res.message)
        }
        
       })

       deletebtn.addEventListener("click",async(e)=>{
        try {
            let id = e.target.id
            console.log(id)
            let url = `https://task-manager-yu2l.onrender.com/task/delete/${id}`;
            let responce = await fetch(url,{
                method : "DELETE"
            });
            let res = await responce.json();
            console.log("res", res);
            allTaskf()
            // Data(res.data)
          } catch (error) {
            console.log(error.message);
          }
       })
        div.append(h3,desc,status,edit,deletebtn)
        content.append(div)
    })
}

allTaskf()
function homePage(){
  localStorage.clear()
  window.location.href = "../index.html"
}