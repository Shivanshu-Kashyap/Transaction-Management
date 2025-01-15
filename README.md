# Transaction Management Application

A React-based transaction management system built with Firebase Firestore and Material-UI. This application allows users to track their income and expenses with full CRUD (Create, Read, Update, Delete) functionality.

## Features

- 💰 Add new transactions (income/expense)
- 📊 View all transactions in a sortable table
- ✏️ Edit existing transactions
- 🗑️ Delete transactions
- 📅 Date-based transaction tracking
- 🌈 Modern UI with Material-UI components

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivanshu-Kashyap/Transaction-Management.git
   cd Transaction-Management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Get your Firebase configuration

4. Create a `.env` file in the project root and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── AddTransactionForm.jsx
│   └── TransactionList.jsx
├── App.jsx
├── firebase.js
├── index.css
└── main.jsx
```

## Technologies Used

- React
- Firebase Firestore
- Material-UI
- Vite

## Features in Detail

### Transaction Management
- Add transactions with amount, description, and date
- Categorize transactions as income or expense
- Edit existing transaction details
- Delete unwanted transactions
- Sort transactions by date

### User Interface
- Clean and intuitive design
- Responsive layout
- Form validation
- Interactive table for transaction display
- Modal dialog for editing transactions

## Development

To run the project in development mode:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Firebase Hosting

The application is hosted on Firebase:

[Transaction Management Application](https://transaction012.web.app)


