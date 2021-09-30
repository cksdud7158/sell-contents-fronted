import React, { useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FormError } from "components/form-error";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "__generated__/createAccountMutation";
import { UserRole } from "__generated__/globalTypes";
import { useHistory } from "react-router-dom";
import { watch } from "fs";

//  회원가입 뮤테이션
export const CREATEEACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

// Form 데이터 타입
interface CreateAccountInput_local {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
  phoneNum1: string;
  phoneNum2: string;
  phoneNum3: string;
  role: UserRole;
  [key: string]: string;
}

enum SNS {
  instagram = "instagram",
  facebook = "facebook",
  youtube = "youtube",
  twitter = "twitter",
  ticktok = "ticktok",
}

export const SignUp2 = () => {
  const history = useHistory();

  // createAccountMutation 완료 시 콜백 함수
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;

    if (ok) {
      history.push("login");
    }
  };

  // useMutation
  const [createAccountMutationTrigger, { data: createAccountResult, loading }] =
    useMutation<createAccountMutation, createAccountMutationVariables>(
      CREATEEACCOUNT_MUTATION,
      {
        onCompleted,
      }
    );

  //  createAccountMutation 시 에러 리턴 시
  let errorMessageText = "";
  if (createAccountResult?.createAccount.error) {
    errorMessageText = createAccountResult.createAccount.error.split("_")[0];
  }

  // useForm
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    getValues,
    setValue,
    watch
  } = useForm<CreateAccountInput_local>({
    mode: "onChange",
  });

  const confirmPassword = (value: any) => {
    const passwordForCheck = getValues("password");
    if (value === passwordForCheck) return true;
    else return "비밀번호가 동일하지않습니다.";
  };

  const num2Focus = useRef<any>(null);
  const num3Focus = useRef<any>(null);

  const phoneNumCheck1 = (e: any) => {
    const num = e.target.value;
    if (num?.length === 3) {
      num2Focus.current?.focus();
    }
  };

  const phoneNumCheck2 = (e: any) => {
    const num = e.target.value;
    if (num?.length === 4) {
      num3Focus.current?.focus();
    }
  };

  const a = watch(["phoneNum1"])

  const [SNSShowFlag, setSNSShowFlag] = useState(false);
  const checkRoleValue = (e: any) => {
    const value = e.target.value;

    if (value === UserRole["Model"] || value === UserRole["Photo"]) {
      setSNSShowFlag(true);
    } else {
      setSNSShowFlag(false);
    }
  };

  const [snsCount, setSnsCount] = useState<number[]>([Date.now()]);

  const addSnsCount = () => {
    setSnsCount((current) => [Date.now(), ...current]);
  };

  const deleteSnsCount = (idToDelete: number) => {
    setSnsCount((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-SNS`, "");
    setValue(`${idToDelete}-SNSUrl`, "");
  };

  // 회원가입 버튼 클릭 함수
  const signUpBtn = (data: CreateAccountInput_local) => {
    if (!loading) {
      const {
        email,
        password,
        confirmPassword,
        nickName,
        phoneNum1,
        phoneNum2,
        phoneNum3,
        role,
        ...rest
      } = data;

      const snsObject = snsCount.map((theId: number) => ({
        snsName: rest[`${theId}-SNS`],
        url: rest[`${theId}-SNSUrl`],
      }));

      createAccountMutationTrigger({
        variables: {
          createAccountInput: {
            email,
            password,
            nickName,
            phoneNum: phoneNum1 + phoneNum2 + phoneNum3,
            role,
            snsUrls: snsObject,
          },
        },
      });
    }
  };

  return (
    <div className="container flex flex-col justify-center">
      {/* form 시작 */}
      <form
        onSubmit={handleSubmit(signUpBtn)}
        className="w-full px-2 h-full bg-scroll my-8 "
      >
        <p className="mb-7 text-2xl font-bold text-center">회 원 가 입</p>
        <div>
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
            type="password"
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
            type="password"
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
          <div className="flex">
            <input
              {...register("phoneNum1", {
                required: "핸드폰 번호를 입력해주세요",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "숫자만 입력해주세요",
                },
              })}
              className="input w-1/3 "
              placeholder="Phone"
              maxLength={3}
              onChange={phoneNumCheck1}
            />

            <p className="locateCenter  w-8 ">-</p>

            <input
              {...register("phoneNum2", {
                required: "핸드폰 번호를 입력해주세요",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "숫자만 입력해주세요",
                },
              })}
              className="input w-1/3"
              maxLength={4}
              ref={num2Focus}
              onChange={phoneNumCheck2}
            />

            <p className="locateCenter w-8 ">-</p>

            <input
              {...register("phoneNum3", {
                required: "핸드폰 번호를 입력해주세요",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "숫자만 입력해주세요",
                },
              })}
              className="input w-1/3"
              maxLength={4}
              ref={num3Focus}
            />
          </div>

          <div className="px-3 pt-1">
            {(errors.phoneNum1?.message ||
              errors.phoneNum2?.message ||
              errors.phoneNum3?.message) && (
              <FormError
                errorMessage={
                  errors.phoneNum1?.message ||
                  errors.phoneNum2?.message ||
                  errors.phoneNum3?.message
                }
              />
            )}
          </div>
        </div>

        <div>
          <p className="ml-3 mt-3 text-blue-600">
            * 가입하시려는 Role을 선택해주세요
          </p>
          <select
            {...register("role", {
              required: "역할을 선택해주세요",
            })}
            className="input"
            onChange={checkRoleValue}
          >
            <option>{UserRole["NormalUser"]}</option>
            <option>{UserRole["Model"]}</option>
            <option>{UserRole["Photo"]}</option>
          </select>

          <div className="px-3 pt-1">
            {errors.role?.message && (
              <FormError errorMessage={errors.role?.message} />
            )}
          </div>
        </div>
        {SNSShowFlag &&
          snsCount.map((snsCountId: number) => (
            <div key={snsCountId}>
              <div className="flex">
                <select {...register(`${snsCountId}-SNS`)} className="input">
                  {Object.keys(SNS).map((sns, snsIndex) => (
                    <option key={snsIndex + "." + sns} value={sns}>
                      {sns}
                    </option>
                  ))}
                </select>
                <p
                  className="smallBtn ml-3"
                  onClick={() => deleteSnsCount(snsCountId)}
                >
                  delete
                </p>
              </div>

              <input
                {...register(`${snsCountId}-SNSUrl`)}
                placeholder="SNS Url"
                className="input"
              />
            </div>
          ))}

        {SNSShowFlag && (
          <p className="smallBtn w-full" onClick={addSnsCount}>
            add
          </p>
        )}

        {errorMessageText && <FormError errorMessage={errorMessageText} />}

        <div className="w-full flex justify-center mt-10">
          <Button
            canClick={isValid}
            loading={loading}
            actionText={"회 원 가 입"}
          />
        </div>
      </form>
    </div>
  );
};
