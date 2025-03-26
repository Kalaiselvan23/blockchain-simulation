# 🚀 Blockchain Simulation  

A simple blockchain simulation built with **React (Vite) for the frontend** and **Node.js (Express) for the backend**. This project allows users to create transactions, mine blocks, and validate the blockchain in a visual and interactive way.  

---

## 📌 Features  
✅ **Create Transactions** – Add transactions to the pending transaction pool.  
✅ **Mine Blocks** – Process pending transactions and add them to the blockchain.  
✅ **Validate Blockchain** – Check if the blockchain is valid and tamper-free.  
✅ **Visualize Blocks** – View the blockchain in a dynamic flow diagram.  
✅ **Reset Blockchain** – Reset the blockchain to its initial (genesis) state.  
✅ **Theming Support** – The UI adapts to dark/light modes.  

---

## 🏗️ Tech Stack  

### **Frontend:**  
- **React** (Vite) – Fast and optimized development  
- **ShadCN UI** – Modern UI components  
- **React Flow** – Visual representation of the blockchain  
- **React Tour** – Step-by-step interactive guide  

### **Backend:**  
- **Node.js & Express** – REST API for blockchain operations  
- **CryptoJS** – Secure hashing (SHA-256)  
- **CORS & Body Parser** – API request handling  

---

## 🔧 Project Setup  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-username/blockchain-simulation.git
cd blockchain-simulation
```

### **2️⃣ Install Dependencies**  

#### **Frontend:**
```sh
cd client
npm install
```

#### **Backend:**
```sh
cd server
npm install
```

---

## 🚀 Running the Project  

### **1️⃣ Start the Backend**  
```sh
cd server
npm start
```
> Runs on **http://localhost:5000**

### **2️⃣ Start the Frontend**  
```sh
cd client
npm run dev
```
> Runs on **http://localhost:5173** (default Vite port)

---

## 🔌 API Endpoints  

| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| **GET**  | `/blockchain`   | Fetches blockchain data |
| **POST** | `/transaction`  | Adds a new transaction |
| **POST** | `/mine`         | Mines a new block |
| **GET**  | `/validate`     | Checks if the blockchain is valid |
| **POST** | `/reset`        | Resets the blockchain |

---

## 🎨 Theming & UI Tour  

- Uses **React Tour** for a step-by-step guide.  
- UI is **fully responsive** and supports **dark/light modes** automatically.
  
---
## Sample Images:
- Dashboard:
  ![image](https://github.com/user-attachments/assets/9ab796ea-57e8-44ed-8f4d-a31e9285ffe1)
  ![image](https://github.com/user-attachments/assets/b04643e3-fa22-45d1-8930-5b019c5c58fc)
  ![image](https://github.com/user-attachments/assets/65791b06-ceb8-4ccc-848d-1158c755a3c6)
- Tour(guidance)
  ![image](https://github.com/user-attachments/assets/8078e705-f7c2-4c3a-9730-564af3407700)


## 🎉 Acknowledgments  
Built for **educational purposes** to help understand how blockchain works.  

