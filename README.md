# 🍔 React Food Order Application

A modern, responsive food ordering application built with React and Node.js.

## 🚀 Features

### Frontend Features
- **🎨 Modern UI Design** with animations and transitions
- **🛒 Shopping Cart** with add/remove items functionality
- **📱 Responsive Design** works on all devices
- **🍔 Menu Display** with meal items and descriptions
- **💳 Checkout Modal** with form validation
- **🎯 Interactive Elements** with hover effects and micro-interactions

### Backend Features
- **🍽 Meal Management** serve available meals from JSON
- **📝 Order Processing** save orders to JSON file
- **🔐 CORS Support** for frontend-backend communication
- **📊 Order History** persistent order storage

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Vite 4** - Fast build tool and dev server
- **CSS3** - Modern CSS with animations
- **JavaScript ES6+** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Body Parser** - JSON parsing middleware
- **File System** - Local JSON storage

## 📁 Project Structure

```
react-food-order/
├── src/
│   ├── components/
│   │   ├── header.jsx          # Navigation header with cart
│   │   ├── meals.jsx           # Meal list display
│   │   ├── mealItem.jsx        # Individual meal card
│   │   ├── cartModal.jsx        # Shopping cart modal
│   │   ├── checkoutModal.jsx    # Order checkout form
│   │   └── button.jsx           # Reusable button component
│   ├── store/
│   │   └── cartContext.jsx     # Cart state management
│   ├── data/
│   │   └── meals.js            # Static meals data
│   ├── assets/
│   │   └── logo.jpg           # Application logo
│   ├── App.jsx                  # Main application component
│   └── index.css               # Global styles
├── backend/
│   ├── app.js                  # Express server
│   ├── package.json             # Backend dependencies
│   └── data/
│       ├── available-meals.json  # Meals database
│       └── orders.json          # Orders storage
├── public/
│   └── images/                # Meal images
└── build/                     # Production build output
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v8 or higher)

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-food-order
   ```

2. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   ```

3. **Start the application**
   ```bash
   # Terminal 1: Start Backend
   cd backend
   npm start
   
   # Terminal 2: Start Frontend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🎯 Usage

### Ordering Food
1. **Browse Menu** - View available meals with descriptions
2. **Add to Cart** - Click "Add to Cart" on any meal
3. **View Cart** - Click cart icon to see added items
4. **Checkout** - Fill delivery form and submit order
5. **Order Confirmation** - See success message after order submission

### API Endpoints

#### Get Meals
```http
GET http://localhost:3000/meals
```

#### Submit Order
```http
POST http://localhost:3000/orders
Content-Type: application/json

{
  "order": {
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "street": "123 Main St",
      "postal-code": "12345",
      "city": "New York"
    },
    "items": [
      {
        "id": "m1",
        "name": "Mac & Cheese",
        "price": "8.99",
        "quantity": 2
      }
    ],
    "totalAmount": 17.98
  }
}
```

## 🎨 Customization

### Adding New Meals
1. Add meal to `backend/data/available-meals.json`
2. Add meal image to `public/images/`
3. Update `src/data/meals.js` if using static data

### Styling
- Global styles in `src/index.css`
- Component-specific styles inline
- CSS variables for consistent theming
- Responsive design with mobile-first approach

## 📦 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy build/ folder to Vercel
```

### Backend (Render/Railway)
```bash
cd backend
# Deploy to Render or Railway
```

### Environment Variables
- Development: Uses localhost URLs
- Production: Update API URLs for deployment

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend Scripts
```bash
npm start         # Start backend server
```

## 🐛 Troubleshooting

### Common Issues
1. **Port 3000 in use** - Kill existing Node.js processes
2. **CORS errors** - Check backend CORS configuration
3. **Images not loading** - Verify image paths and public folder
4. **Orders not saving** - Check backend file permissions

### Solutions
```bash
# Kill processes on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Check backend logs
cd backend
npm start
```

## 📄 License

This project is licensed under the ISC License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Contact

For questions or support, please reach out to the project maintainers.

---

**Built with ❤️ using React and Node.js**
