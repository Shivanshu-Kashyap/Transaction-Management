import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import { Container, Typography, Box } from '@mui/material';

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const q = query(collection(db, 'transactions'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const transactionList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(transactionList);
    } catch (error) {
      console.error('Error fetching transactions: ', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Transaction Management
        </Typography>
        <AddTransactionForm onTransactionAdded={fetchTransactions} />
        <TransactionList 
          transactions={transactions} 
          onTransactionUpdated={fetchTransactions}
        />
      </Box>
    </Container>
  );
}

export default App;