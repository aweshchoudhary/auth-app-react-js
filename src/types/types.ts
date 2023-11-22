import { Dispatch, SetStateAction } from "react";

export interface UserInterface {
  number: number;
  email: string;
}

export interface PromptTypes {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface LoginReqData {
  username: string;
  password: string;
}
export interface LoginResData {
  access_token: string;
  token_type: string;
}

export interface RegisterReqData {
  user: {
    number: string;
    email: string;
  };
  password: {
    password: string;
    password2: string;
  };
}
export interface RegisterResData {
  number: string;
  email: string;
}
export interface UpdatePassReqData {
  current_password: string;
  password: string;
  password2: string;
}
