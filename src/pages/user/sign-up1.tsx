import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { TermsOfService } from "../../components/termsOfService";
import { CollectionAndUseOfPersonalInformation } from "../../components/CollectionAndUseOfPersonalInformation";
import { useHistory } from "react-router-dom";

type CheckType = {
  termsOfService: Boolean;
  collectionAndUseOfPersonalInformation: Boolean;
};

export const SignUp1 = () => {
  const { register, handleSubmit, formState } = useForm<CheckType>({
    mode: "onChange",
    defaultValues: {
      termsOfService: false,
      collectionAndUseOfPersonalInformation: false,
    },
  });

  const history = useHistory();
  const nextBtn = () => {
    history.push("sign-up-2");
  };

  return (
    <div className="container h-full flex flex-col  justify-center">
      {/* form 시작 */}
      <form onSubmit={handleSubmit(nextBtn)} className="w-full">
        <p className="mb-3 text-2xl font-bold text-center">약관 동의</p>

        <div className="h-30vh mb-2">
          <div className="h-5/6 overflow-scroll px-4 border-2  border-gray-300 mb-1 ">
            <TermsOfService />
          </div>
          <div className="flex items-center ml-2 text-sm">
            <input
              type="checkbox"
              {...register("termsOfService", {
                required: true,
              })}
            />
            <p>&nbsp;이용약관 동의 &nbsp;</p>
            <p>(필수)</p>
          </div>
        </div>

        <div className="h-30vh ">
          <div className="h-5/6 overflow-auto px-4 border-2  border-gray-300 mb-1">
            <CollectionAndUseOfPersonalInformation />
          </div>
          <div className="flex items-center ml-2 text-sm">
            <input
              type="checkbox"
              {...register("collectionAndUseOfPersonalInformation", {
                required: true,
              })}
            />
            <p>&nbsp;개인정보 수집 및 이용 &nbsp;</p>
            <p>(필수)</p>
          </div>
        </div>

        <div className="w-full  flex justify-center">
          <Button
            canClick={formState.isValid}
            loading={false}
            actionText={"다  음"}
          />
        </div>
      </form>
    </div>
  );
};
