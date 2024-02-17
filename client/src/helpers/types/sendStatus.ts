export const SendTransactionStatus = {
  DEFAULT: 'default',
  APPROVAL_REQUIRED: 'approval_required',
  INVALID_ROUTES: 'invalid_routes',
  INVALID_RECIPIENT_ADDRESS: 'invalid_recipient_address',
  MISSING_AMOUNTS: 'missing_amounts',
  INSUFFICIENT_BALANCE: 'insufficient_balance',
  TRANSACTION_SIGNING: 'transaction_signing',
  TRANSACTION_MINING: 'transaction_mining',
  VALID_FOR_NATIVE_TRANSFER: 'valid_for_native_transfer',
  VALID_FOR_BRIDGE: 'valid_for_bridge',
  TRANSACTION_SUCCEEDED: 'transaction_succeeded'
};

export type SendTransactionStatusType = typeof SendTransactionStatus[keyof typeof SendTransactionStatus];