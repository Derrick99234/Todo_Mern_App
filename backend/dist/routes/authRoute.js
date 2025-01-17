"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/create_acct", authController_1.create_acct);
router.post("/login", authController_1.login);
exports.default = router;
