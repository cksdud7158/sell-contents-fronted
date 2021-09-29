import { Button } from "components/button";
import { SERVICE_NAME } from "../../constants";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const FindUserInfo = () => {
  const { register, handleSubmit, formState } = useForm();

  const findBtn = (data: any) => console.log(data);

  return (
    <div className="h-full flex flex-col justify-center items-center px-4 sm:bg-gray-700">
      <Helmet>
        <title>Find User Info | {SERVICE_NAME}</title>
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
            onSubmit={handleSubmit(findBtn)}
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
              loading={false}
              actionText={"로 그 인"}
            />

            {/* {formState.errors.password?.type === "minLength" && (
            <FormError errorMessage="10 글자 이상 입력해주세요" />
          )} */}
            {/* {errorMessageText && <FormError errorMessage={errorMessageText} />} */}
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
      </div>
    </div>
  );
};
