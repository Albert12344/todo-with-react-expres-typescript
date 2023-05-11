"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Schema_1 = __importDefault(require("./Schema"));
const cors_1 = __importDefault(require("cors"));
require('./Mongodb').connect();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT;
app.post('/todo', (req, res) => {
    const { text, status } = req.body;
    try {
        Schema_1.default.create({
            text,
            status
        });
        return res.status(200).send(text);
    }
    catch (error) {
        console.log(error);
    }
});
app.get('/gettodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getInfo = yield Schema_1.default.find().lean();
        if (getInfo) {
            return res.status(200).send(getInfo);
        }
        return res.status(404).json({ error: 'Todo not found' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
app.delete('/deletetodo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTodo = yield Schema_1.default.findByIdAndDelete(id);
        if (deletedTodo) {
            return res.status(200).json({ message: 'Todo removed successfully' });
        }
        return res.status(404).json({ error: 'Todo not found' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running with typescript`);
});
