"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createOrder = (0, catchAsync_1.default)(async (req, res) => {
    const orderData = req.body;
    const newOrder = await order_service_1.orderService.createOrder(orderData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created successfully',
        data: newOrder,
    });
});
const getAllOrders = (0, catchAsync_1.default)(async (_req, res) => {
    const orders = await order_service_1.orderService.getAllOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully',
        data: orders,
    });
});
const getOrderById = (0, catchAsync_1.default)(async (req, res) => {
    const { orderId } = req.params;
    if (!req.user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Please authenticate !');
    }
    const userId = req.user.id;
    const order = await order_service_1.orderService.getOrderById(orderId, userId);
    if (!order) {
        return (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'Order not found',
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order retrieved successfully',
        data: order,
    });
});
exports.OrderController = {
    createOrder,
    getAllOrders,
    getOrderById,
};
