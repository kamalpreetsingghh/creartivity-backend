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
exports.getUser = exports.signUp = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const clerk_1 = require("../lib/clerk");
const signUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createUser = request.body;
        const clerkUser = yield (0, clerk_1.signupClerk)(createUser);
        if (clerkUser) {
            const { id, firstName, lastName, username, emailAddresses, imageUrl } = clerkUser;
            const user = new userModel_1.default({
                clerkId: id,
                email: emailAddresses[0].emailAddress,
                username: username,
                firstName: firstName,
                lastName: lastName,
                photo: imageUrl,
            });
            const savedUser = yield user.save();
            return response.status(200).json({
                message: "User created successfully",
                savedUser,
            });
        }
        else {
            return response.status(500).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({ error: error.msg });
    }
});
exports.signUp = signUp;
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inside Get User");
    response.status(200).json({ message: "User Data" });
});
exports.getUser = getUser;
