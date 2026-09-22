import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();
const PUERTO: number = Number(process.env.PORT ?? 3000);

app.use(express.json());

/** Ruta de control: responde 200 con el texto OK. */
app.get('/health', (req: Request, res: Response): void => {
  res.status(200).type('text/plain').send('OK');
});

// [TODO] Registrar acá todas sus rutas de la API

app.listen(PUERTO, (): void => {
  console.log(`Servidor abierto en http://localhost:${PUERTO}`);
});
