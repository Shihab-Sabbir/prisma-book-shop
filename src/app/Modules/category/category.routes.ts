import express from 'express';
import { categoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.patch('/:id', categoryController.updateCategoryById);
router.delete('/:id', categoryController.deleteCategory);

export default router;
