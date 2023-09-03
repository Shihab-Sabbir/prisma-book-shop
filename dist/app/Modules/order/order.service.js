"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = async (orderData) => {
    const newOrder = await prisma_1.default.order.create({
        data: orderData,
    });
    return newOrder;
};
const getAllOrders = async () => {
    const orders = await prisma_1.default.order.findMany();
    return orders;
};
const getOrderById = async (orderId, userId) => {
    const order = await prisma_1.default.order.findUnique({
        where: { id: orderId, userId: userId },
    });
    return order;
};
exports.orderService = {
    createOrder,
    getAllOrders,
    getOrderById,
};
