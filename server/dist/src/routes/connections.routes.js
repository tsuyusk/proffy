"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connectionsController_1 = __importDefault(require("../controllers/connectionsController"));
const connectionsRoutes = express_1.Router();
const connectionsController = new connectionsController_1.default();
connectionsRoutes.post('/', connectionsController.create);
connectionsRoutes.get('/', connectionsController.index);
exports.default = connectionsRoutes;
