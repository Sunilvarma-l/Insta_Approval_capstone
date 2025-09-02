export interface DocumentUploadDTO {
  documentType: string;
  documentId: string;
}

export interface LoanApplicationRequest {
  customerId: number;
  loanAmount: number;
  documents?: DocumentUploadDTO[];
}
