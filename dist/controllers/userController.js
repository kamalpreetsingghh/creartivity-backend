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
exports.signIn = exports.signUp = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const clerk_1 = require("../lib/clerk");
const signUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createUser = request.body;
        const clerkResponse = yield (0, clerk_1.signupClerk)(createUser);
        if (clerkResponse.user) {
            const { clerkId, firstName, lastName, username, email, photo } = clerkResponse.user;
            const user = new userModel_1.default({
                clerkId: clerkId,
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                photo: photo,
            });
            const savedUser = yield user.save();
            return response.status(200).json({
                message: "User created successfully",
                savedUser,
            });
        }
        else {
            return response.status(clerkResponse.result.status).json({
                message: clerkResponse.result.message,
            });
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({ error: error.msg });
    }
});
exports.signUp = signUp;
const signIn = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        const user = yield userModel_1.default.findOne({ email: email }).exec();
        if (user) {
            const clerkResponse = yield (0, clerk_1.signinClerk)(user.clerkId, password);
            if (clerkResponse.verified) {
                return response
                    .status(200)
                    .json({ message: "Signed in successfully", user });
            }
            else {
                return response
                    .status(401)
                    .json({ message: "Incorrect username or password" });
            }
        }
        return response.status(404).json({ message: "User does not exist" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signIn = signIn;
