interface InvoiceDetails {
  name: string;
  billId: string;
  totalAmount: number | string;
  outstandingAmount: number;
}

export interface Transaction {
  transactionId: string;
  student: string;
  school: string;
  createdBy: string;
  createdAt: string;
  invoiceDetails: InvoiceDetails;
  status: string;
}

export interface activityLogEntry {
  actor: {
    name: string;
    id: string;
    avatarInitials: string;
  };
  action: string;
  ipAddress: {
    address: string;
    location: string;
  };
  date: {
    fullDate: string;
    time: string;
  };
}

export interface PaginationConfig {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export interface Vendor {
  firstName: string;
  lastName: string;
  otherNames?: string;
  role: string;
  countryCode: string;
  phoneNumber: string;
  usePhoneNumber: boolean;
  accountType: string;
  bank: string;
  bankBranch: string;
  bankAccountNumber: string;
  nameOnAccount: string;
  addAnotherVendor: boolean;
}
