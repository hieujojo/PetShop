# Pet Shop

## Introduction
Pet Shop is an e-commerce website that allows users to shop for pet products. The project is built with Next.js 13, TypeScript, Node.js, Express.js, MySQL, and other modern technologies.

## Technologies Used
- **Frontend**: Next.js 13, TypeScript, React
- **Backend**: Node.js, Express.js (fully written in TypeScript)
- **Authentication**: Google & Facebook Login (`react-oauth2-code`)
- **Database**: MySQL
- **AI Chatbot History Storage**: MySQL

## Main Features
- **User Registration & Login** (including Google and Facebook login)
- **Product Categories**: Display product listings by category
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add and remove products from the cart
- **Checkout**: Process orders
- **AI Chatbot History**: Store user conversations in MySQL

## Installation
### 1. Clone the project
```bash
git clone https://github.com/hieujojo/PetShop.git
cd PetShop
```

### 2. Configure environment variables
Create a `.env.local` file and add the following environment variables:
```
DATABASE_URL=mysql://user:password@localhost:3306/petshop
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
NEXT_PUBLIC_FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the backend server
Navigate to the `backend` folder and start the TypeScript-based Node.js server:
```bash
cd backend
npm install
npm run dev
```
The backend server will run on `http://localhost:5000`

### 5. Run the frontend
Go back to the root folder and start the Next.js application:
```bash
cd ..
npm run dev
```
Then access `http://localhost:3000`

## Project Structure
```
PetShop/
├── backend/          # Node.js backend (fully written in TypeScript)
│   ├── models/       # TypeScript models for MySQL
│   ├── routes/       # API routes
│   ├── controllers/  # Business logic
│   ├── config/       # Configuration files
│   ├── types/        # TypeScript types
│   ├── middleware/   # Custom middleware
│   ├── services/     # Service layer
│   ├── utils/        # Utility functions
│   ├── tsconfig.json # TypeScript configuration
│   └── server.ts     # Main server file
├── frontend/         # Next.js frontend
│   ├── components/   # Shared components
│   ├── pages/        # Application pages
│   ├── utils/        # Utility functions
│   ├── public/       # Static assets
│   ├── styles/       # CSS files and Styled Components
└── README.md         # Project documentation
```

## Contributions
All contributions are welcome! Feel free to create a pull request or an issue for discussion.

## License
MIT

