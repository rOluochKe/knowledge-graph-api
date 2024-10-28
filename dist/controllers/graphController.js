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
exports.getGraphData = exports.addRelationship = exports.addNode = void 0;
const nodeModel_1 = require("../models/nodeModel");
const relationshipModel_1 = require("../models/relationshipModel");
const addNode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, type } = req.body;
    if (!name || !type) {
        res.status(400).json({ message: 'Name and type are required' });
        return;
    }
    try {
        const node = yield (0, nodeModel_1.createNode)(name, type);
        res.status(201).json(node);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating node', error });
    }
});
exports.addNode = addNode;
const addRelationship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fromNode, toNode, relationship } = req.body;
    if (!fromNode || !toNode || !relationship) {
        res.status(400).json({ message: 'FromNode, ToNode, and relationship are required' });
        return;
    }
    try {
        const rel = yield (0, relationshipModel_1.createRelationship)(fromNode, toNode, relationship);
        res.status(201).json(rel);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating relationship', error });
    }
});
exports.addRelationship = addRelationship;
const getGraphData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nodes = yield (0, nodeModel_1.getAllNodes)();
    const relationships = yield (0, relationshipModel_1.getAllRelationships)();
    res.status(200).json({ nodes, relationships });
});
exports.getGraphData = getGraphData;
