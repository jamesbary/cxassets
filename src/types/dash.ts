export type Common = {
  savings: string;
  checking: string;
  business: string;
  details: string;
  action: string;
};
export type Block = {
  title: string;
  desc: string;
  action: string;
};
export type Create = {
  title: string;
  desc: string;
  confirm: string;
  cancel: string;
  success: string;
  exists: string;
  error: string;
  placeholder?: {
    name: string;
    type: string;
  };
};

export type Message = {
  enough: string;
  exist: string;
  limit: string;
  day: string;
  no_pin: string;
  invalid_pin: string;
  generic: string;
  success: string;
};

export type NotEnough = {
  title: string;
  desc: string;
  cancel: string;
};

export type Pin = {
  title: string;
  desc: string;
  proceed: string;
  cancel: string;
};

export type TransCard = {
  title: string;
  number: string;
  amount: string;
  proceed: string;
  cancel: string;
};

export type WithdrawCard = {
  title: string;
  bank: string;
  number: string;
  name: string;
  amount: string;
  proceed: string;
  cancel: string;
  pin: {
    title: string;
    label: string;
    proceed: string;
    cancel: string;
  };
};

export type Card = {
  transfer: string;
  withdraw: string;
  details: string;
  active: string;
  inactive: string;
  closed: string;
  notEnough: NotEnough;
  pin: PinTranslation;
  transCard: TransCard;
  withdrawCard: WithdrawCard;
  action: string;
};

type MetaBit = {
  ready: string;
  isUploading: string;
  prep: string;
};

export type Upload = {
  complete: string;
  success: string;
  button: MetaBit;
  allowed: MetaBit;
};

export type Transfer = {
  search: string;
  status: string;
  type: string;
  name: string;
  amount: string;
  date: string;
  asc: string;
  desc: string;
  hide: string;
  pending: string;
  success: string;
  rejected: string;
  transfer: string;
  fund: string;
  withdrawal: string;
  reset: string;
};

export type Meta = {
  upload: Upload;
  transfer: Transfer;
};

export type Account = {
  create: Create;
};

export type DashData = {
  common: Common;
  checking: Account;
  savings: Account;
  business: Account;
};

export type PinMessage = {
  name: string;
  message: string;
};
export type CreatePin = {
  title: string;
  name: string;
  confirm: string;
  proceed: string;
  cancel: string;
  error: PinMessage;
  success: PinMessage;
};
export type ChangePin = {
  title: string;
  current: string;
  new: string;
  confirm: string;
  proceed: string;
  cancel: string;
  error: PinMessage;
  success: PinMessage;
};
export type ResetPin = {
  title: string;
  instructions: string;
  email: string;
  proceed: string;
  cancel: string;
  error: PinMessage;
  success: PinMessage;
};
export type VerifyPin = {
  title: string;
  name: string;
  proceed: string;
  cancel: string;
  error: PinMessage;
  success: PinMessage;
};
export type PinTranslation = {
  title: string;
  create: CreatePin;
  change: ChangePin;
  reset: ResetPin;
  verify: VerifyPin;
  name: string;
  proceed: string;
  cancel: string;
};
