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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllNodes = exports.createNode = void 0;
const db_1 = require("../db");
const createNode = (name, type) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.pool.connect();
    try {
        const result = yield client.query('INSERT INTO nodes (name, type) VALUES ($1, $2) RETURNING id', [name, type]);
        return { id: result.rows[0].id, name, type };
    }
    catch (error) {
        console.error('Error creating node:', error);
        throw error;
    }
    finally {
        client.release();
    }
});
exports.createNode = createNode;
const getAllNodes = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.pool.connect();
    try {
        const result = yield client.query('SELECT * FROM nodes');
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching nodes:', error);
        throw error;
    }
    finally {
        client.release();
    }
});
exports.getAllNodes = getAllNodes;
