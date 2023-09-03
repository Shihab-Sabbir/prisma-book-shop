"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const generateJWT_Token_1 = require("../../../shared/utils/jwt/generateJWT_Token");
const verifyJWT_Token_1 = require("../../../shared/utils/jwt/verifyJWT_Token");
const config_1 = require("../../../config");
const signUp = async (userData) => {
    const hashedPassword = await bcrypt_1.default.hash(userData.password, Number(config_1.bycrypt_salt_rounds));
    const newUser = await prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, userData), { password: hashedPassword }),
    });
    return newUser;
};
const signIn = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    const token = (0, generateJWT_Token_1.generateJWT_Token)(user, config_1.jwt_secret, config_1.jwt_expires_in);
    const verifyUser = await (0, verifyJWT_Token_1.verifyJWT_Token)(token, config_1.jwt_secret);
    if (verifyUser === null || verifyUser === void 0 ? void 0 : verifyUser.id) {
        return verifyUser;
    }
    throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Authentication failed. Invalid credentials.');
};
exports.AuthService = { signUp, signIn };
