import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

/**
 * Request body -> Diz os dados da informação a ser atalizada \ criada
 *  * request.body
 * Route params -> Identifica a informação
 *  * request.params
 * Query params -> ' Resto ' -> Paginação..., filtrar...
 *  * request.query
 * */

/**
 * Identificação dos casos de uso -> Facil pelo layout
 */

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`Server listening on *:${port}`);
});
