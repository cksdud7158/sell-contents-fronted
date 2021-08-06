import React, { useState } from "react";
import { gql } from "@apollo/client";
import { FormError } from "components/form-error";
import { useForm } from "react-hook-form";
import { SnsUrlsInputType, UserRole } from "__generated__/globalTypes";
import { Button } from "../../components/button";

export const CREATEEACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

type CreateAccountInput = {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  roles: UserRole[];
  phoneNum: string;
  snsUrls?: SnsUrlsInputType[] | null;
  verified?: boolean | null;
};

export const SignUp2 = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    setValue,
    trigger,
  } = useForm<CreateAccountInput>({
    mode: "onChange",
    defaultValues: {
      roles: [UserRole["NormalUser"]],
    },
  });

  const nextBtn = () => {
    console.log("Click");
  };

  const confirmPassword = (value: any) => {
    const passwordForCheck = getValues("password");
    if (value == passwordForCheck) return true;
    else return "비밀번호가 동일하지않습니다.";
  };

  const phoneNumCheck = (value: any) => {
    const regExp = /^\d{3}-\d{3,4}-\d{4}$/;
    if (regExp.test(value)) {
      setValue("phoneNum", value.replace(/\-/g, ""));
      return true;
    } else {
    }

    return false;
  };

  return (
    <div className="container h-full flex flex-col justify-center">
      {/* form 시작 */}
      <form onSubmit={handleSubmit(nextBtn)} className="w-full px-2">
        <p className="mb-3 text-2xl font-bold text-center">회 원 가 입</p>

        <div className="">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "이메일 형식이 맞지않습니다.",
              },
            })}
            placeholder="Email"
            className="input"
            maxLength={100}
          />
          <div className="px-3 pt-1">
            {errors.email?.message && (
              <FormError errorMessage={errors.email?.message} />
            )}
          </div>
        </div>

        <div>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 10,
                message: "10 글자 이상 입력해주세요",
              },
            })}
            className="input "
            placeholder="Password"
            maxLength={30}
          />
          <div className="px-3 pt-1">
            {errors.password?.message && (
              <FormError errorMessage={errors.password?.message} />
            )}
          </div>
        </div>

        <div>
          <input
            {...register("confirmPassword", {
              required: "Password is required",
              minLength: {
                value: 10,
                message: "10 글자 이상 입력해주세요 ",
              },
              validate: { confirmPassword },
            })}
            className="input"
            placeholder="Confirm Password"
            maxLength={30}
          />
          <div className="px-3 pt-1">
            {errors.confirmPassword?.message && (
              <FormError errorMessage={errors.confirmPassword?.message} />
            )}
          </div>
        </div>

        <div>
          <input
            {...register("nickName", {
              required: "Nickname is required",
              minLength: {
                value: 5,
                message: "5 글자 이상 입력해주세요",
              },
            })}
            className="input "
            placeholder="Nickname"
            maxLength={30}
          />
          <div className="px-3 pt-1">
            {errors.nickName?.message && (
              <FormError errorMessage={errors.nickName?.message} />
            )}
          </div>
        </div>

        <div>
          <input
            {...register("phoneNum", {
              required: "핸드폰 번호를 입력해주세요",
              validate: { phoneNumCheck },
            })}
            className="input"
            placeholder="PhoneNumber"
            maxLength={20}
          />
          <div className="px-3 pt-1">
            {errors.nickName?.message && (
              <FormError errorMessage={errors.nickName?.message} />
            )}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <Button canClick={isValid} loading={false} actionText={"다  음"} />
        </div>
      </form>
    </div>
  );
};
