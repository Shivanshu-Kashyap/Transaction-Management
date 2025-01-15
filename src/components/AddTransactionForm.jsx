import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Grid } from '@mui/material';

function AddTransactionForm({ onTransactionAdded }) {
  const [transaction, setTransaction] = useState({
    amount: '',
    description: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'transactions'), {
        ...transaction,
        amount: Number(transaction.amount),
        date: new Date(transaction.date)
      });
      setTransaction({ amount: '', description: '', type: 'expense', date: new Date().toISOString().split('T')[0] });
      onTransactionAdded();
    } catch (error) {
      console.error('Error adding transaction: ', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* Amount Field */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={transaction.amount}
            onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
            required
          />
        </Grid>

        {/* Description Field */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="Description"
            value={transaction.description}
            onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
            required
          />
        </Grid>

        {/* Type Select Field */}
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={transaction.type}
              label="Type"
              onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Date Field */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            type="date"
            value={transaction.date}
            onChange={(e) => setTransaction({ ...transaction, date: e.target.value })}
            required
          />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Transaction
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddTransactionForm;
