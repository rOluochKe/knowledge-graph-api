"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const graphController_1 = require("../controllers/graphController");
const router = (0, express_1.Router)();
router.post('/nodes', graphController_1.addNode);
router.post('/relationships', graphController_1.addRelationship);
router.get('/graph', graphController_1.getGraphData);
exports.default = router;
