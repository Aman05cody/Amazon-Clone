# 🛒 Amazon Clone

A fully responsive Amazon clone built with HTML, CSS, and JavaScript. This project replicates core features of Amazon's e-commerce platform.

![Amazon Clone Screenshot](images/amazon-logo.png)

## 🌟 Features

- **📱 Responsive Design**
  - Fully responsive layout that works on desktop, tablet, and mobile devices
  - Adaptive navigation bar with collapsible menu

- **🏪 Product Catalog**
  - Dynamic product grid with product images and details
  - Product cards with pricing and availability

- **🛍️ Shopping Cart**
  - Add/remove items from cart
  - Update quantities
  - Real-time cart total calculation

- **💳 Checkout System**
  - Multi-step checkout process
  - Order summary
  - Delivery options

- **📦 Order Management**
  - View order history
  - Track package status
  - Cancel orders
  - Real-time delivery tracking

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript 
- Local Storage for data persistence
- Modular JavaScript with ES6 Modules

## 📖 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Aman05cody/Amazon-Clone.git
   ```

2. Open the project folder:
   ```bash
   cd Amazon-Clone
   ```

3. Open `index.html` in your browser to view the project.

## 📱 Screenshots

### Home Page
![Amazon Clone Home Page](images/screenshots/home-page.png)

The home page features:
- Responsive product grid layout
- Product cards with images, titles, and prices
- Rating system with star display
- Add to Cart functionality
- Quantity selection for each product
## 🗂️ Project Structure

```
Amazon-Clone/
│
├── index.html              # Main product listing page
├── checkout.html           # Checkout page
├── orders.html            # Order history page
├── tracking.html          # Order tracking page
│
├── styles/
│   ├── shared/           # Shared styles
│   │   ├── general.css
│   │   └── amazon-header.css
│   │
│   └── pages/            # Page-specific styles
│       ├── amazon.css
│       ├── orders.css
│       └── tracking.css
│
├── scripts/
│   ├── amazon.js         # Main product listing logic
│   ├── checkout.js       # Checkout functionality
│   ├── orders.js         # Order management
│   └── tracking.js       # Order tracking logic
│
├── data/
│   ├── products.js       # Product data
│   ├── cart.js          # Cart management
│   └── orders.js        # Order data
│
└── images/              # Project images and assets
    ├── products/
    ├── icons/
    └── amazon-logo.png
```

## 🔥 Features in Detail

### Product Listing
- Responsive product grid
- Product images with hover effects
- Add to cart functionality
- Price display

### Shopping Cart
- Real-time cart updates
- Quantity adjustments
- Remove items
- Cart total calculation

### Checkout Process
- Order summary
- Delivery options selection
- Address input
- Order confirmation

### Order Management
- Order history display
- Order status tracking
- Cancel order functionality
- Delivery progress tracking

## 🎨 Styling

The project uses custom CSS with:
- Flexbox and Grid layouts
- Responsive design principles
- Custom animations
- Mobile-first approach

## 🔄 State Management

- Uses LocalStorage for data persistence
- Real-time cart updates
- Order tracking state management
- Product data management

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 👤 Author

**Aman**
- GitHub: [@Aman05cody](https://github.com/Aman05cody)

## 📝 License

This project is available for use under the MIT License.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🌟 Acknowledgments

- Special thanks to [SuperSimpleDev](https://www.youtube.com/@SuperSimpleDev) for his excellent JavaScript tutorial that helped immensely in building this project
- Inspired by Amazon's user interface
- Icons and some images from Amazon's website
- Built as a learning project to demonstrate front-end development skills
