export type CreatePaymentProps = {
  transactionId: string;
  amount: number;
};

export type UpdatePaymentProps =
  | { encodedData: string; pidx?: string; transactionAmount?: number; transactionId?: string }
  | { encodedData?: string; pidx: string; transactionAmount?: number; transactionId?: string }
  | { encodedData?: string; pidx?: string; transactionAmount: number; transactionId: string };

export type PaymentResponseProps = {
  transactionId: string;
  totalAmount: number;
  paymentProviderId?: string;
  status:string
};