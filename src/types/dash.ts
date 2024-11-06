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
  generic: string;
  success: string;
};

export type NotEnough = {
  title: string;
  desc: string;
  cancel: string;
};

export type TransCard = {
  title: string;
  number: string;
  amount: string;
  proceed: string;
  cancel: string;
};

export type Card = {
  transfer: string;
  withdraw: string;
  details: string;
  active: string;
  inactive: string;
  closed: string;
  notEnough: NotEnough;
  transCard: TransCard;
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
