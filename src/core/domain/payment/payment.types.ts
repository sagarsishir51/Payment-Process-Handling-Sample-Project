export type CreatePaymentProps = {
  transactionId: string;
  amount: number;
};

export type UpdatePaymentProps =
  | { encodedData: string; pidx?: string }
  | { encodedData?: string; pidx: string };

export type PaymentResponseProps = {
  transactionId: string;
  totalAmount: number;
  paymentProviderId: string;
  status:string
};