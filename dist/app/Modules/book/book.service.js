"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createBook = async (bookData) => {
    const newBook = await prisma_1.default.book.create({
        data: bookData,
    });
    return newBook;
};
const getAllBooks = async (filters, options) => {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, category, sortBy, sortOrder, minPrice, maxPrice } = filters;
    const whereConditions = {};
    if (searchTerm) {
        whereConditions.OR = [
            {
                title: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            },
            {
                author: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            },
            {
                genre: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            },
        ];
    }
    if (category) {
        whereConditions.categoryId = category;
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
        whereConditions.price = {
            gte: minPrice,
            lte: maxPrice,
        };
    }
    const orderBy = {};
    if (sortBy && sortOrder) {
        orderBy[sortBy] = sortOrder;
    }
    const result = await prisma_1.default.book.findMany({
        include: {
            category: true,
            reviewAndRating: true,
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: Object.keys(orderBy).length > 0 ? orderBy : { createdAt: 'desc' },
    });
    const total = await prisma_1.default.book.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};
const getBooksByCategory = async (categoryId) => {
    const books = await prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
    });
    return books;
};
const getBookById = async (id) => {
    const book = await prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Book not found');
    }
    return book;
};
const updateBookById = async (id, updatedBookData) => {
    const updatedBook = await prisma_1.default.book.update({
        where: {
            id,
        },
        data: updatedBookData,
    });
    return updatedBook;
};
const deleteBook = async (id) => {
    const deletedBook = await prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return deletedBook;
};
exports.bookService = {
    createBook,
    getAllBooks,
    getBooksByCategory,
    getBookById,
    updateBookById,
    deleteBook,
};
