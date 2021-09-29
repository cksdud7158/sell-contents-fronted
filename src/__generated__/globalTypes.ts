/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Admin = "Admin",
  Model = "Model",
  NormalUser = "NormalUser",
  Photo = "Photo",
}

export interface CreateAccountInput {
  email: string;
  password: string;
  nickName: string;
  role: UserRole;
  phoneNum: string;
  snsUrls?: SnsUrlsInputType[] | null;
  verified?: boolean | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SnsUrlsInputType {
  snsName: string;
  url: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
