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
exports.getAllRelationships = exports.createRelationship = void 0;
const db_1 = require("../db");
const createRelationship = (fromNode, toNode, relationship) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.pool.connect();
    try {
        const result = yield client.query('INSERT INTO relationships (fromNode, toNode, relationship) VALUES ($1, $2, $3) RETURNING id', [fromNode, toNode, relationship]);
        return { id: result.rows[0].id, fromNode, toNode, relationship };
    }
    catch (error) {
        console.error('Error creating relationship:', error);
        throw error;
    }
    finally {
        client.release();
    }
});
exports.createRelationship = createRelationship;
const getAllRelationships = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_1.pool.connect();
    try {
        const result = yield client.query('SELECT * FROM relationships');
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching relationships:', error);
        throw error;
    }
    finally {
        client.release();
    }
});
exports.getAllRelationships = getAllRelationships;
