import { Injectable } from '@angular/core';
import { Transaction } from '../Types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private filteredData: Transaction[] = [];
  private data: Transaction[] = [
    {
      transactionId: '1q8807328764234',
      student: 'Philip Yaw Annan',
      school: 'SmartSapp International School',
      createdBy: 'Kwame Nkrumah',
      createdAt: '20th March, 2024 - 08:00 AM',
      status: 'Success',
      invoiceDetails: {
        name: 'Michael Anderson',
        billId: 'SM000976565',
        totalAmount: 5000,
        outstandingAmount: 1000,
      },
    },
    {
      transactionId: '2w9908459875345',
      student: 'Akosua Mensah',
      school: 'SmartSapp College',
      createdBy: 'Yaa Asantewaa',
      createdAt: '15th April, 2024 - 10:30 AM',
      status: 'Pending',
      invoiceDetails: {
        name: 'John Doe',
        billId: 'SM000987654',
        totalAmount: 3000,
        outstandingAmount: 500,
      },
    },
    {
      transactionId: '3e1019560986456',
      student: 'Kofi Amoah',
      school: 'SmartSapp International School',
      createdBy: 'Nana Addo',
      createdAt: '5th May, 2024 - 12:00 PM',
      status: 'Failed',
      invoiceDetails: {
        name: 'Jane Smith',
        billId: 'SM000998765',
        totalAmount: 4500,
        outstandingAmount: 4500,
      },
    },
    {
      transactionId: '4r1120671097567',
      student: 'Ama Serwaa',
      school: 'SmartSapp College',
      createdBy: 'Kofi Annan',
      createdAt: '10th June, 2024 - 09:00 AM',
      status: 'Success',
      invoiceDetails: {
        name: 'Peter Parker',
        billId: 'SM001009876',
        totalAmount: 2000,
        outstandingAmount: 0,
      },
    },
    {
      transactionId: '5t2231782108678',
      student: 'Yaw Boateng',
      school: 'SmartSapp International School',
      createdBy: 'Kwame Nkrumah',
      createdAt: '25th July, 2024 - 03:00 PM',
      status: 'Pending',
      invoiceDetails: {
        name: 'Clark Kent',
        billId: 'SM001011987',
        totalAmount: 6000,
        outstandingAmount: 1200,
      },
    },
    // Add more objects as needed
  ];

  constructor() {}

  loadData(): Transaction[] {
    return this.data;
  }

  loadDataById(id: string): Transaction | null {
    const newData = this.data?.find((el) => el?.transactionId === id);
    return newData ? newData : null;
  }

  addTransaction(transaction: Transaction): void {
    this.data.push(transaction);
  }

  updateTransaction(
    id: string,
    updatedTransaction: Partial<Transaction>
  ): boolean {
    const index = this.data.findIndex((el) => el.transactionId === id);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...updatedTransaction };
      return true;
    }
    return false;
  }

  deleteTransaction(id: string): boolean {
    const index = this.data.findIndex((el) => el.transactionId === id);
    if (index !== -1) {
      this.data.splice(index, 1);
      return true;
    }
    return false;
  }

  filterTransactions(criteria: Partial<Transaction>): Transaction[] {
    return this.data.filter((transaction) => {
      return Object.keys(criteria).every(
        (key) =>
          transaction[key as keyof Transaction] ===
          criteria[key as keyof Transaction]
      );
    });
  }

  searchTransactions(query: string): Transaction[] {
    return this.data.filter((transaction) => {
      return (
        transaction.student.toLowerCase().includes(query.toLowerCase()) ||
        transaction.school.toLowerCase().includes(query.toLowerCase()) ||
        transaction.transactionId.includes(query)
      );
    });
  }

  paginateTransactions(page: number, pageSize: number): Transaction[] {
    const startIndex = (page - 1) * pageSize;
    return this.data.slice(startIndex, startIndex + pageSize);
  }
}
