import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { LoginInput } from "../../__generated__/globalTypes";
import { Helmet } from "react-helmet-async";
import { LOCALSTORAGE_TOKEN, SERVICE_NAME } from "../../constants";
import { Button } from "../../components/button";
import {
  loginMutation,
  loginMutationVariables,
} from "../../__generated__/loginMutation";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { FormError } from "../../components/form-error";

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
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
  } = useForm<LoginInput>({
    mode: "onChange",
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;

    if (ok && token) {
      sessionStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };

  const [
    loginMutationTrigger,
    { data: loginMutationResult, loading },
  ] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
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
    <div className="container h-screen flex flex-col justify-center items-center px-4">
      <Helmet>
        <title>Login | {SERVICE_NAME}</title>
      </Helmet>
      <h1 className="text-center text-4xl pb-10">Sign up</h1>
      <form
        onSubmit={handleSubmit(loginBtnClick)}
        className="w-full flex flex-col justify-center items-center"
      >
        <input
          ref={register({
            required: "이메일을 입력해주세요",
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          type="email"
          placeholder="Email"
          name="email"
          required
          className="block border p-3 rounded mb-4 w-full max-w-xl "
        />
        <input
          ref={register({ required: "비밀번호를 입력해주세요" })}
          required
          name="password"
          type="password"
          placeholder="Password"
          className="block border border-grey-light w-full p-3 rounded mb-4 max-w-xl"
        />
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText={"로 그 인"}
        />
        {errors.email?.type === "pattern" && (
          <FormError errorMessage={"이메일 형식이 맞지않습니다."} />
        )}
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        {errors.password?.type === "minLength" && (
          <FormError errorMessage="10 글자 이상 입력해주세요" />
        )}
        {errorMessageText && <FormError errorMessage={errorMessageText} />}
      </form>
    </div>
  );
};
