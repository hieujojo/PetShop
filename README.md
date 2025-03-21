# Pet Shop

## Introduction
Pet Shop is an e-commerce website that allows users to shop for pet products. The project is built with Next.js 13, TypeScript, MySQL, and other modern technologies.

## Technologies Used
- **Frontend**: Next.js 13, TypeScript, React
- **Backend**: Next.js API Routes, MySQL
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

### 4. Run the project
```bash
npm run dev
```
Then access `http://localhost:3000`

## Project Structure
```
PetShop/
├── components/       # Shared components
├── pages/            # Application pages
├── api/              # Next.js API routes
├── models/           # MySQL models
├── utils/            # Utility functions
├── public/           # Static assets
├── styles/           # CSS files and Styled Components
└── README.md         # Project documentation
```

## Contributions
All contributions are welcome! Feel free to create a pull request or an issue for discussion.

## License
MIT

