"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const category_service_1 = require("./category.service");
const createCategory = async (req, res) => {
    try {
        const newCategory = await category_service_1.categoryService.createCategory(req.body);
        res.status(http_status_1.default.CREATED).json({
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: 'Category created successfully',
            data: newCategory,
        });
    }
    catch (error) {
        console.error(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Error creating category',
        });
    }
};
const getAllCategories = async (req, res) => {
    try {
        const categories = await category_service_1.categoryService.getAllCategories();
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Categories retrieved successfully',
            data: categories,
        });
    }
    catch (error) {
        console.error(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Error retrieving categories',
        });
    }
};
const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await category_service_1.categoryService.getCategoryById(categoryId);
        if (!category) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Category retrieved successfully',
            data: category,
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
                message: 'Error retrieving category',
            });
        }
    }
};
const updateCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const updatedCategory = await category_service_1.categoryService.updateCategoryById(categoryId, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Category updated successfully',
            data: updatedCategory,
        });
    }
    catch (error) {
        console.error(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Error updating category',
        });
    }
};
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        await category_service_1.categoryService.deleteCategoryById(categoryId);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Category deleted successfully',
        });
    }
    catch (error) {
        console.error(error);
        res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: 'Error deleting category',
        });
    }
};
exports.categoryController = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategory,
};
