"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const config_json_1 = __importDefault(require("./config.json"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const todoRoute_1 = __importDefault(require("./routes/todoRoute"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default
    .connect(config_json_1.default.connectionString)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
app.get("/", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});
app.use("/api/auth", authRoute_1.default);
app.use("/api/user", userRoute_1.default);
app.use("/api/app", todoRoute_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
