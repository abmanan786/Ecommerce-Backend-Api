# ⌚ SwissEagle - Premium E-Commerce Watch Store

SwissEagle is a modern full-stack premium e-commerce web application built for luxury watches and elegant shopping experiences. It includes a beautifully crafted **React + Vite frontend** and a structured **Node.js + Express backend**, organized in a clean monorepo format.

---

## 🌐 Live Links

- **Frontend:** https://ecommerce-backend-api-five.vercel.app/
- **Backend API:** https://ecommerce-backend-api-production-9628.up.railway.app

---

## 📂 Project Structure

```bash
Ecommerce-Backend-Api/
│
├── backend/              # Express backend API
│   ├── controllers/
│   ├── routes/
│   ├── public/
│   ├── data/
│   ├── server.js
│   └── package.json
│
├── frontend/             # React + Vite frontend
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── package.json
│
└── README.md
✨ Features
🛍️ Frontend Features
Premium responsive home page
Shop page with filters, pagination, and search
Product detail page
Add to cart system
Cart preview dropdown
Checkout flow
Order success page with celebration effects
Premium responsive navbar
Premium responsive footer
Authentication system (frontend-only)
Login
Register
Forgot Password
Account Dashboard
Protected account route
Mobile responsive design
Smooth animations with Framer Motion
⚙️ Backend Features
Product APIs
Shop listing APIs
Product detail APIs
Static image serving
REST API structure using Express
🧰 Tech Stack
Frontend
React
Vite
React Router DOM
Tailwind CSS
Framer Motion
Lucide React
React Toastify
Axios
Backend
Node.js
Express.js
Deployment
Frontend: Vercel
Backend: Railway
🎨 UI / UX Highlights
Luxury ecommerce inspired design
Premium watch store aesthetic
Smooth transitions and animations
Fully responsive layout for all screen sizes
Premium login/register/account experience
Elegant product cards and sections
Interactive navbar and cart preview
🔐 Authentication
This project currently uses a frontend-only authentication system with localStorage.

Included auth flow:
Register new users
Login existing users
Keep session stored in browser
Logout functionality
Edit account details
Protected /account page
Redirect logged-in users away from login/register pages
Backend-integrated JWT authentication can be added later.

📦 Installation & Setup
1. Clone the repository
Bash

git clone https://github.com/abmanan786/Ecommerce-Backend-Api.git
cd Ecommerce-Backend-Api
2. Run Backend
Bash

cd backend
npm install
npm run dev
3. Run Frontend
Open another terminal:

Bash

cd frontend
npm install
npm run dev
🚀 Build for Production
Frontend Build
Bash

cd frontend
npm run build
Preview Frontend Build
Bash

npm run preview
🌍 Deployment
Frontend Deployment (Vercel)
Import GitHub repository into Vercel
Set Root Directory to:
Bash

frontend
Framework preset: Vite
Build command:
Bash

npm run build
Output directory:
Bash

dist
Backend Deployment (Railway)
Deploy the backend folder
Use server.js as entry point
Add environment variables if needed
📸 Main Pages Included
Home
Shop
Product Details
Cart
Checkout
Order Success
Login
Register
Forgot Password
Account
Watches Collection
📌 Future Improvements
JWT-based backend authentication
Wishlist persistence
Order history from backend
Payment gateway integration
Product reviews
Coupon/discount system
Admin dashboard
Avatar upload
Saved addresses
Real email reset flow
👨‍💻 Author
Developed by Abdul Manan
GitHub: @abmanan786

📄 License
This project is created for learning, portfolio, and development purposes.
