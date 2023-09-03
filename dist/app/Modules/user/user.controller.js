"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createUser = async (req, res) => {
    try {
        const newUser = await user_service_1.userService.createUser(req.body);
        res.status(http_status_1.default.CREATED).json({
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: 'User created successfully',
            data: newUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Error creating user',
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await user_service_1.userService.getAllUsers();
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Users retrieved successfully',
            data: users,
        });
    }
    catch (error) {
        console.error(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Error retrieving users',
        });
    }
};
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await user_service_1.userService.getUserById(userId);
        if (!user) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'User retrieved successfully',
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        if (error instanceof ApiError_1.default) {
            res.status(error.statusCode).json({
                success: false,
                statusCode: error.statusCode,
                message: error.message,
            });
        }
        else {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
                message: 'Error retrieving user',
            });
        }
    }
};
const updateUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const updatedUser = await user_service_1.userService.updateUserById(userId, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'User updated successfully',
            data: updatedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Error updating user',
        });
    }
};
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await user_service_1.userService.deleteUserById(userId);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        console.error(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Error deleting user',
        });
    }
};
const getUserProfile = async (req, res) => {
    if (!req.user) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: 'Unauthorized. User not authenticated.',
        });
        return;
    }
    const userId = req.user.id;
    const userProfile = await user_service_1.userService.getUserProfile(userId);
    if (userProfile) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User profile retrieved successfully',
            data: userProfile,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'User not found',
        });
    }
};
exports.userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser,
    getUserProfile
};
