# Electronify – Full-Stack eCommerce Template

🚀 **Electronify** is an open-source, fully customizable eCommerce website template built with **React** for the frontend and **Node.js/Express** for the backend. Designed to help developers and entrepreneurs quickly launch scalable and maintainable eCommerce applications.

---

# About ℹ️
Electronify is an open-source eCommerce web template that acts as a solid foundation for building multiple eCommerce projects. It can be easily customized and extended to suit different business needs, making development faster and easier.


## 📦 Features

* **User Authentication**: Secure login and registration with JWT and token-based session management.
* **Product Management**: Dynamic product listings with search and filter capabilities.
* **Shopping Cart**: Real-time cart updates and persistent cart state.
* **Order Management**: Track order history and status.
* **Responsive UI**: Mobile-first design using Tailwind CSS.
* **API Backend**: RESTful API built with Express and MongoDB.

---

## ⚙️ Installation

### Prerequisites

* Node.js (v16 or higher)
* npm or yarn
* MongoDB (local or cloud instance)
* Paypal developer Account
* Cloudinary Account

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Kharthicsj/Electronify.git
   cd Electronify
   ```

2. Install dependencies for both client and server:

   ```bash
   # For client
   cd client
   npm install

   # For server
   cd ../server
   npm install
   ```

3. Configure environment variables:

   * Create a `.env` file in the `server` directory and `client` directory.
   * Add the environment values as below:

     In client needed environment variables are:
         ```VITE_API_URL="backend URL"```

     In server needed environment variables are:
         ```CLOUDINARY_CLOUD_NAME="your_cloud_name"
         CLOUDINARY_API_KEY="your_cloud_api_key"
         CLOUDINARY_API_SECRET="your_cloud_api_secret"
         CLOUDINARY_URL="your_cloud_URL"
         PAYPAL_CLIENT_ID="your_paypal_client_id"
         PAYPAL_SECRET_KEY="your_paypal_secret_key"
         MONGO_DB=""
         CLIENT_URL="<Your Front end URL>"```
     

4. Run the application:

   ```bash
   # In one terminal window
   cd client
   npm run dev

   # In another terminal window
   cd server
   node server.js
   ```

---

## 📂 Project Structure

```
/client          # React frontend
  /src
    /components  # Reusable UI components
    /context     # React context for state management
    /pages       # Application pages
    /services    # API service functions

/server          # Node.js/Express backend
  /controllers   # Route handlers
  /models        # Mongoose models
  /routes        # API routes
  /middleware    # Authentication and error handling
  /utils        # Util files
```

---

## 🛠️ Technologies Used

* **Frontend**: React, Tailwind CSS, Axios
* **Backend**: Node.js, Express, MongoDB, JWT
* **Authentication**: JWT with token-based session management

---

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Kharthicsj/Electronify.git
   ```

2. Follow the [Installation] steps to set up the project locally.

3. Explore the project structure and start building your own eCommerce application!

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your proposed changes.

---

Feel free to customize this README further to suit your project's specifics. Let me know if you need assistance with additional sections or details!
