"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const actorSchema = new mongoose_1.default.Schema({
    name: String,
    characters: [String],
    movies: [String],
});
const Actor = mongoose_1.default.model("Actor", actorSchema);
exports.default = Actor;
