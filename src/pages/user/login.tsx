import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { LOCALSTORAGE_TOKEN, SERVICE_NAME } from "../../constants";
import { Button } from "../../components/button";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { FormError } from "../../components/form-error";
import { Link, useHistory } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import kakaoLogo from "images/kakaoLogo.svg";
import {
  loginMutation,
  loginMutationVariables,
} from "__generated__/loginMutation";
import { LoginInput } from "__generated__/globalTypes";

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const { register, handleSubmit, formState, getValues } = useForm<LoginInput>({
    mode: "onChange",
  });

  const history = useHistory();

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;

    if (ok && token) {
      sessionStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
      history.push("/");
    }
  };

  const [loginMutationTrigger, { data: loginMutationResult, loading }] =
    useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
      onCompleted,
    });

  let errorMessageText = "";
  if (loginMutationResult?.login.error) {
    errorMessageText = loginMutationResult.login.error.split("_")[0];
  }

  const loginBtnClick = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutationTrigger({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center px-4 sm:bg-gray-700">
      <Helmet>
        <title>Login | {SERVICE_NAME}</title>
      </Helmet>
      <div className="w-full max-w-xl bg-white sm:rounded-lg ">
        <div className="sm:my-20 sm:mx-10 ">
          {/* <h1 className="text-center text-4xl pb-10 font-medium">Sign In</h1> */}
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcom Back!
            </h2>
            <p className="mt-2 text-sm text-gray-600 pb-10">
              Please sign in to your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(loginBtnClick)}
            className="w-full flex flex-col justify-center items-center px-2"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>

            <input
              {...register("email", {
                required: "Email is required",
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              placeholder="Email"
              required
              className="input mb-4"
            />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: 10,
              })}
              required
              type="password"
              placeholder="Password"
              className="input mb-7"
            />
            <Button
              canClick={formState.isValid}
              loading={loading}
              actionText={"로 그 인"}
            />
            {formState.errors.email?.type === "pattern" && (
              <FormError errorMessage={"이메일 형식이 맞지않습니다."} />
            )}
            {formState.errors.email?.message && (
              <FormError errorMessage={formState.errors.email?.message} />
            )}
            {formState.errors.password?.message && (
              <FormError errorMessage={formState.errors.password?.message} />
            )}
            {formState.errors.password?.type === "minLength" && (
              <FormError errorMessage="10 글자 이상 입력해주세요" />
            )}
            {errorMessageText && <FormError errorMessage={errorMessageText} />}
          </form>

          <hr className="my-3" />
          <div className=" flex justify-between px-1 pb-3">
            <Link
              to="/sign-up-1"
              className="link text-sm sm:text-base md:text-xl"
            >
              회원 가입{" "}
            </Link>
            <Link
              to="/find-user-info"
              className="link text-sm sm:text-base md:text-xl"
            >
              아이디 &#183; 비밀번호 찾기
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 pb-3">
          <span className="h-px w-16 bg-gray-300"></span>
          <span className="text-gray-500 font-normal">OR</span>
          <span className="h-px w-16 bg-gray-300"></span>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-around w-44 ">
            <FcGoogle className="w-10 h-10"></FcGoogle>
            <img src={kakaoLogo} alt="" className="w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};
