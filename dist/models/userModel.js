"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    planId: {
        type: Number,
        default: 1,
    },
    creditBalance: {
        type: Number,
        default: 10,
    },
});
const User = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.User) || (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
