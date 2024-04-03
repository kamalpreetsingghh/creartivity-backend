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
exports.signinClerk = exports.signupClerk = void 0;
const clerk_sdk_node_1 = __importDefault(require("@clerk/clerk-sdk-node"));
const signupClerk = (_a) => __awaiter(void 0, [_a], void 0, function* ({ firstName, lastName, userName, email, password, }) {
    try {
        const user = yield clerk_sdk_node_1.default.users.createUser({
            firstName,
            lastName,
            username: userName,
            emailAddress: [email],
            password,
        });
        const response = {
            user: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                username: user.username || "",
                photo: user.imageUrl,
            },
            result: { status: 200, message: "User created successfully" },
        };
        return response;
    }
    catch (error) {
        console.log(error);
        let status = 500;
        let message = "Something went wrong";
        const emailExistsError = error.errors.filter((err) => err.message === "That email address is taken. Please try another.");
        if (emailExistsError.length > 0) {
            status = 409;
            message = "Email Already Exists";
        }
        else {
            const usernameExistsError = error.errors.filter((err) => err.message === "That username is taken. Please try another.");
            if (usernameExistsError.length > 0) {
                status = 409;
                message = "Username Already Exists";
            }
            else {
                const passwordStrengthError = error.errors.filter((err) => err.message ===
                    "Password has been found in an online data breach. For account safety, please use a different password.");
                if (passwordStrengthError.length > 0) {
                    status = 401;
                    message =
                        "Password strength is too weak. Please use a strong password.";
                }
            }
        }
        const response = {
            user: null,
            result: { status, message },
        };
        return response;
    }
});
exports.signupClerk = signupClerk;
const signinClerk = (userId, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield clerk_sdk_node_1.default.users.verifyPassword({
            userId,
            password,
        });
        return { user: null, verified: result.verified };
    }
    catch (error) {
        return { user: null, verified: false };
    }
});
exports.signinClerk = signinClerk;
