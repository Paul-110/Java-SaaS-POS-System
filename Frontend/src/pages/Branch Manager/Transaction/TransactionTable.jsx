import React from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Eye } from 'lucide-react';

const TransactionTable = ({filteredTransactions,handleViewTransaction}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-white/10">
          <TableHead className="text-gray-400">Date & Time</TableHead>
          <TableHead className="text-gray-400">Cashier</TableHead>
          <TableHead className="text-gray-400">Customer</TableHead>
          <TableHead className="text-gray-400">Amount</TableHead>
          <TableHead className="text-gray-400">Payment Method</TableHead>
          <TableHead className="text-gray-400">Status</TableHead>
          <TableHead className="text-right text-gray-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredTransactions.map((transaction) => (
          <TableRow key={transaction.id} className="border-white/10">
            <TableCell className="text-gray-300">{new Date(transaction.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'Sale' ? 'bg-green-500/20 text-green-300' : transaction.type === 'Refund' ? 'bg-amber-500/20 text-amber-300' : transaction.type === 'Purchase' || transaction.type === 'Expense' ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'}`}>
                #{transaction.cashierId}
              </span>
            </TableCell>
            <TableCell className="text-gray-300">{transaction.customer?.fullName}</TableCell>
            <TableCell className={transaction.totalAmount > 0 ? 'text-emerald-400 font-medium' : 'text-red-400 font-medium'}>
              {transaction.totalAmount > 0 ? `+₹${transaction.totalAmount.toFixed(2)}` : `-₹${Math.abs(transaction.totalAmount).toFixed(2)}`}
            </TableCell>
            <TableCell className="text-gray-300">{transaction.paymentType}</TableCell>
            <TableCell>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                {transaction.status}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewTransaction(transaction)}
                className="bg-transparent border-blue-500/50 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TransactionTable