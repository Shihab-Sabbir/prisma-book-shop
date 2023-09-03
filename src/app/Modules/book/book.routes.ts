import express from 'express';
import { bookController } from './book.controller';

const router = express.Router();

router.post('/create-book', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:categoryId/category', bookController.getBooksByCategory);
router.get('/:id', bookController.getBookById);
router.patch('/:id', bookController.updateBookById);
router.delete('/:id', bookController.deleteBook);

export default router;
