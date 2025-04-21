export type CreatePaymentProps = {
  transactionId: string;
  amount: number;
};

export type PaymentResponseProps = {
  transactionId: string;
  totalAmount: number;
  paymentProviderId: string;
  status:string
};