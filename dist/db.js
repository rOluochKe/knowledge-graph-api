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
exports.initializeDb = exports.pool = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
const initializeDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield exports.pool.connect();
    try {
        yield client.query(`
      CREATE TABLE IF NOT EXISTS nodes (
        id SERIAL PRIMARY KEY,
        name TEXT,
        type TEXT
      );

      CREATE TABLE IF NOT EXISTS relationships (
        id SERIAL PRIMARY KEY,
        fromNode INTEGER REFERENCES nodes(id),
        toNode INTEGER REFERENCES nodes(id),
        relationship TEXT
      );
    `);
    }
    catch (err) {
        console.error('Error creating tables:', err);
    }
    finally {
        client.release();
    }
});
exports.initializeDb = initializeDb;
