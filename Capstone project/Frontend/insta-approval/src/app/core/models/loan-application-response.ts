export interface Document {
  documentId: string;
  documentType: string;
}

export interface LoanApplicationResponse {
  applicationId: number;
  customerId: number;
  loanAmount: number;
  applicationDate: string;
  status: string;
  remarks?: string;
  documents?: Document[];  // change property name and type

  // Remove or keep uploadedDocuments if still used elsewhere
}
