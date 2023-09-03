"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCategory = async (categoryData) => {
    const newCategory = await prisma.category.create({
        data: categoryData,
    });
    return newCategory;
};
const getAllCategories = async () => {
    const categories = await prisma.category.findMany();
    return categories;
};
const getCategoryById = async (categoryId) => {
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });
    return category;
};
const updateCategoryById = async (categoryId, categoryData) => {
    const updatedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: categoryData,
    });
    return updatedCategory;
};
const deleteCategoryById = async (categoryId) => {
    await prisma.category.delete({
        where: { id: categoryId },
    });
};
exports.categoryService = { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById };
