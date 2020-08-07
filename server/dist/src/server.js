"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
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
