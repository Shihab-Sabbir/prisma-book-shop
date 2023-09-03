import express from 'express';
import bookRoutes from '../Modules/book/book.routes';
import categoryRoutes from '../Modules/category/category.routes';
import orderRoutes from '../Modules/order/order.routes';
import userRoutes from '../Modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/book',
    route: bookRoutes,
  },
  {
    path: '/category',
    route: categoryRoutes,
  },
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
