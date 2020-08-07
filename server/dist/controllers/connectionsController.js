"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class ConnectionsController {
    async index(request, response) {
        try {
            const [totalConnections] = await connection_1.default('connections').count('* as total');
            const { total } = totalConnections;
            return response.json({ total });
        }
        catch (error) {
            console.log(error);
            return response.status(400).json({ error: 'Something went wrong...' });
        }
    }
    async create(request, response) {
        try {
            const { user_id } = request.body;
            await connection_1.default('connections').insert({
                user_id,
            });
            return response.status(201).send();
        }
        catch (error) {
            console.log(error);
            return response.status(400).json({
                error: 'An unexpected problem happened while creating an connection',
            });
        }
    }
}
exports.default = ConnectionsController;
