import fs from 'fs'
import express from 'express'

const app= express()
const puerto=5237;
app.use(express.json());
app.use(express.static('FrontTesteo'));

const archivojson = 'data/main.json';
const jsontxtcompleto : string = fs.readFileSync(archivojson, "utf-8");
const jsonjsoncompleto : Profile[] = JSON.parse(jsontxtcompleto);



const idd:number= jsonjsoncompleto.length+1


type Profile = {username:string ; password:string ; profileID:number};

let perfil1 : Profile = {
    username: "xXJuanelcrackXx",
    password : "odioatodos",
    profileID : 1,
}

let perfil2 : Profile = {
    username: "Miguelprogamer235215",
    password : "The_special_one",
    profileID : 2,
}

let perfiles : Profile[] = [];

let n : string = "hola";
let m : string = "HolaMundo";
let o : number = 3;

perfiles.push(perfil1);
perfiles.push(perfil2);

let perfil3 : Profile = {
    username: n,
    password: m,
    profileID: o,
}
let perfil4  : Profile = {
    username : "oirgneoiadngroirdsn",
    password : "oerfbesnpobgivesoioerrbveoiu",
    profileID : 4,
}
let perfil5 : Profile = {
    username : "Ernesto",
    password: "amimgoDeInsomniac",
    profileID : idd,
}

console.log(jsontxtcompleto);
console.log(jsonjsoncompleto);

let a : number = 0;

while (a<jsonjsoncompleto.length){
    console.log(jsonjsoncompleto[a]?.username);
    a++;
}

jsonjsoncompleto.push(perfil5)

let jsonnuevo = JSON.stringify(jsonjsoncompleto, null, 1);
fs.writeFileSync(archivojson, jsonnuevo);

a=0;

console.log("------------------------------");

while (a<jsonjsoncompleto.length){
    console.log(jsonjsoncompleto[a]?.username);
    a++;
}
console.log("------------------------------");

console.log(jsonjsoncompleto.find((item) => item.profileID===5)?.username)

let newProfileList = jsonjsoncompleto.filter((item) => item.profileID !==5);

jsonnuevo= JSON.stringify(newProfileList, null, 1);

fs.writeFileSync(archivojson, jsonnuevo);

console.log("------------------------------");

a=0;

while (a<newProfileList.length){
    console.log(newProfileList[a]?.username);
    a++;
}
app.post("/saveProfile", (req,res) =>{
    
    let n:number=0;
    let yaExiste:boolean=false;

    while (n<jsonjsoncompleto.length){
        if (req.body.username===jsonjsoncompleto[n]!.username){
            yaExiste=true
            n=jsonjsoncompleto.length;
        }
        else{
            n++;
        }
    }
    if (yaExiste===true){
     res.status(409).json({error:"Perfil_Preexistente"})
    }
    else{
    const newProfile:Profile={
        username:req.body.username,
        password:req.body.password,
        profileID:jsonjsoncompleto.length+1,
    }
    let jsonnuevofun : string ="";

    jsonjsoncompleto.push(newProfile);
    jsonnuevofun=JSON.stringify(jsonjsoncompleto, null, 1);
    fs.writeFileSync(archivojson,jsonnuevofun);
    res.json({estado:"Perfil-guardado"})
}
});

app.post("/logProfile", (req, res)=>{
    let logProfile:Profile={
        username:req.body.username,
        password:req.body.password,
        profileID:1,
    }
let n:number=0;
let existeElUsername:boolean=false;
let correctProfile: Profile | undefined;

while (n<jsonjsoncompleto.length){
    if (logProfile.username===jsonjsoncompleto[n]!.username){
        existeElUsername=true;
        correctProfile=jsonjsoncompleto[n]
        n=jsonjsoncompleto.length;
    }
    else{
        existeElUsername===false;
        n++;
    }
}
    if (existeElUsername===true){
     if (logProfile.password===correctProfile?.password){
         res.json({entrada:"Todo"})
         res.status(200)
     }
     else{
         res.json({entrada:"ContraIncorrecta"})
         res.status(401)
     }
    }
    else{
        res.json({entrada:"TodoMal"})
        res.status(404)
    }
});

app.listen(puerto,()=>{
 console.log("Todo bien, arrancando servidor");
});

