"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
const paginationHelper_1 = require("./../../../helpers/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_service_1 = require("./book.service");
// Create a new book
const createBook = (0, catchAsync_1.default)(async (req, res) => {
    const book = await book_service_1.bookService.createBook(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book created successfully!',
        data: book,
    });
});
const getAllBooks = async (req, res, next) => {
    try {
        const _a = req.query, { searchTerm, category } = _a, rest = __rest(_a, ["searchTerm", "category"]);
        const filters = {
            searchTerm: searchTerm ? searchTerm : undefined,
            category: category ? category : undefined,
        };
        const options = paginationHelper_1.paginationHelpers.calculatePagination(rest);
        const books = await book_service_1.bookService.getAllBooks(filters, options);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Books with associated category data fetched successfully',
            meta: {
                page: options.page,
                size: options.limit,
                total: books.meta.total,
                totalPage: Math.ceil(books.meta.total / (options.limit || 10)),
            },
            data: books.data,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get books by category
const getBooksByCategory = (0, catchAsync_1.default)(async (req, res) => {
    const { categoryId } = req.params;
    const books = await book_service_1.bookService.getBooksByCategory(categoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Books with associated category data fetched successfully',
        data: books,
    });
});
// Get a single book by ID
const getBookById = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const book = await book_service_1.bookService.getBookById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book fetched successfully',
        data: book,
    });
});
// Update a book by ID
const updateBookById = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const updatedBook = await book_service_1.bookService.updateBookById(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
    });
});
// Delete a book by ID
const deleteBook = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const deletedBook = await book_service_1.bookService.deleteBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Book is deleted successfully',
        data: deletedBook,
    });
});
exports.bookController = {
    createBook,
    getAllBooks,
    getBooksByCategory,
    getBookById,
    updateBookById,
    deleteBook,
};
