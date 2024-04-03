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
exports.signupClerk = void 0;
const clerk_sdk_node_1 = __importDefault(require("@clerk/clerk-sdk-node"));
const signupClerk = (_a) => __awaiter(void 0, [_a], void 0, function* ({ firstName, lastName, userName, email, password, }) {
    try {
        const result = yield clerk_sdk_node_1.default.users.createUser({
            firstName,
            lastName,
            username: userName,
            emailAddress: [email],
            password,
        });
        return result;
    }
    catch (error) {
        console.error(error);
    }
});
exports.signupClerk = signupClerk;
