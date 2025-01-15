import { useState } from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function TransactionList({ transactions, onTransactionUpdated }) {
  const [editDialog, setEditDialog] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'transactions', id));
      onTransactionUpdated();
    } catch (error) {
      console.error('Error deleting transaction: ', error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction({
      ...transaction,
      date: new Date(transaction.date.seconds * 1000).toISOString().split('T')[0]
    });
    setEditDialog(true);
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, 'transactions', editingTransaction.id);
      await updateDoc(docRef, {
        amount: Number(editingTransaction.amount),
        description: editingTransaction.description,
        type: editingTransaction.type,
        date: new Date(editingTransaction.date)
      });
      setEditDialog(false);
      onTransactionUpdated();
    } catch (error) {
      console.error('Error updating transaction: ', error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date.seconds * 1000).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>${transaction.amount}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(transaction)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(transaction.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TextField
            label="Amount"
            type="number"
            value={editingTransaction?.amount}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={editingTransaction?.description}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Select
            value={editingTransaction?.type}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, type: e.target.value })}
            fullWidth
            margin="normal"
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
          <TextField
            type="date"
            value={editingTransaction?.date}
            onChange={(e) => setEditingTransaction({ ...editingTransaction, date: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TransactionList;