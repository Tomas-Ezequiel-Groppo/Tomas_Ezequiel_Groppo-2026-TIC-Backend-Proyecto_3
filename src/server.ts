import express from 'express';
import type { Express, Request, Response } from 'express';
import fs from 'fs'

const app: Express = express();
const PUERTO: number = Number(process.env.PORT ?? 3000);


const archivojson = 'data/main.json';
const jsontxtcompleto : string = fs.readFileSync(archivojson, "utf-8");
const jsonjsoncompleto : Profile[] = JSON.parse(jsontxtcompleto);

type Profile = {username:string ; password:string ; profileID:number};

app.use(express.json());
app.use(express.static('FrontTesteo'));


/** Ruta de control: responde 200 con el texto OK. */
app.get('/health', (req: Request, res: Response): void => {
  res.status(200).type('text/plain').send('OK');
});

// [TODO] Registrar acá todas sus rutas de la API

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

app.listen(PUERTO, (): void => {
  console.log(`Servidor abierto en http://localhost:${PUERTO}`);
});
