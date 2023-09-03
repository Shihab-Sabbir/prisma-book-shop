"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const signUp = (0, catchAsync_1.default)(async (req, res) => {
    const user = await auth_service_1.AuthService.signUp(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User created successfully!',
        data: user,
    });
});
const signIn = (0, catchAsync_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const token = await auth_service_1.AuthService.signIn(email, password);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User signin successfully!',
        token: token
    });
});
exports.AuthController = {
    signUp,
    signIn,
};
