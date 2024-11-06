export type Common = {
  continue: string;
  email: string;
  link: string;
  username: string;
};
export type Sign = {
  title: string;
  desc: string;
  link: string;
  sub: string;
};
export type Signout = {
  desc: string;
  cancel: string;
  title: string;
};
export type Placeholder = {
  country: string;
  email: string;
  name: string;
  password: string;
  nameOrEmail: string;
  username: string;
};
export type Message = {
  verify: string;
  user: string;
  credentials: string;
  generic: string;
  email: string;
  username: string;
};
export type Verify = Signout;

export type AuthData = {
  common: Common;
  placeholder: Placeholder;
  signin: Sign;
  signup: Sign;
  message: Message;
};
