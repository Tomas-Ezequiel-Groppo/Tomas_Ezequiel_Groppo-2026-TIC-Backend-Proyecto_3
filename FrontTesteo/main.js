console.log("Hola")
function profileReg(user){
    return fetch("/saveProfile" , {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user)
    })
    .then(res => res.json());
}
function profileLog(user){
    return fetch("/logProfile" , {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user)
    })
    .then(res => res.json());
}

button.addEventListener("click" ,() => {
  console.log("Mundo")
  const nuevoUsuario = {
    username:username.value,
    password:password.value,
  }
  profileReg(nuevoUsuario).then(resp =>{
    if (resp.estado==="Perfil-guardado"){
       alert("Perfil guardado")
    }
    else{
      alert ("No se pudo guardar debido a que el username estaba en uso")
    }
  }) 
  
});

buttonL.addEventListener("click" ,() => {
  console.log("Gente")
  let n=0;
   const logUsuario = {
    username:username.value,
    password:password.value,
  }
  profileLog(logUsuario).then(resp=>{
    if (resp.entrada==="Todo"){
      alert("Logeado correctamente "+username.value)
    }
    else if (resp.entrada==="TodoMal"){
      alert("Fijate si la cuenta existe porque mínimo el username esta mal")
    }
    else{
      alert("La contraseña esta mal")
    }
  })
});