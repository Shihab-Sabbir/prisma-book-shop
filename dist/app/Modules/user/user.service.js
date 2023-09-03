"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = async (userData) => {
    const newUser = await prisma.user.create({
        data: userData,
    });
    return newUser;
};
const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
};
const getUserById = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    return user;
};
const updateUserById = async (userId, userData) => {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: userData,
    });
    return updatedUser;
};
const getUserProfile = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImage: true,
        },
    });
    return user;
};
const deleteUserById = async (userId) => {
    await prisma.user.delete({
        where: { id: userId },
    });
};
exports.userService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserProfile,
};
