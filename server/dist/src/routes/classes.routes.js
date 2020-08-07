"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classesController_1 = __importDefault(require("../controllers/classesController"));
const classesRouter = express_1.Router();
const classesController = new classesController_1.default();
classesRouter.get('/classes', classesController.index);
classesRouter.post('/classes', classesController.create);
exports.default = classesRouter;
