"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classes_routes_1 = __importDefault(require("./classes.routes"));
const connections_routes_1 = __importDefault(require("./connections.routes"));
const routes = express_1.Router();
routes.use('/classes', classes_routes_1.default);
routes.use('/connections', connections_routes_1.default);
exports.default = routes;
