### Live Link
[https://prisma-book-shop-backend.vercel.app](https://prisma-book-shop-backend.vercel.app/)

### Application Routes

#### User Routes
- `POST /api/v1/auth/signup`: Create a new user.
- `GET /api/v1/users`: Get a list of all users.
- `GET /api/v1/users/6177a5b87d32123f08d2f5d4`: Get a single user by ID.
- `PATCH /api/v1/users/6177a5b87d32123f08d2f5d4`: Update a user's information.
- `DELETE /api/v1/users/6177a5b87d32123f08d2f5d4`: Delete a user by ID.
- `GET /api/v1/profile`: Get the user's profile.

#### Category Routes
- `POST /api/v1/categories/create-category`: Create a new category.
- `GET /api/v1/categories`: Get a list of all categories.
- `GET /api/v1/categories/6177a5b87d32123f08d2f5d4`: Get a single category by ID.
- `PATCH /api/v1/categories/6177a5b87d32123f08d2f5d4`: Update a category's information.
- `DELETE /api/v1/categories/6177a5b87d32123f08d2f5d4`: Delete a category by ID.

#### Books Routes
- `POST /api/v1/books/create-book`: Create a new book.
- `GET /api/v1/books`: Get a list of all books.
- `GET /api/v1/books/:categoryId/category`: Get books by category.
- `GET /api/v1/books/:id`: Get a single book by ID.
- `PATCH /api/v1/books/:id`: Update a book's information.
- `DELETE /api/v1/books/:id`: Delete a book by ID.

#### Orders Routes
- `POST /api/v1/orders/create-order`: Create a new order.
- `GET /api/v1/orders`: Get a list of all orders.
- `GET /api/v1/orders/:orderId`: Get a single order by order ID.
