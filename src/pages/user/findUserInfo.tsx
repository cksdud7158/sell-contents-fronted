import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Checkbox } from "@material-ui/core";

interface IFormInputs {
  TextField: string;
  MyCheckbox: boolean;
}

export function FindUserInfo() {
  const { handleSubmit, control, reset, watch, register } =
    useForm<IFormInputs>({
      mode: "onChange",
    });
  const onSubmit: SubmitHandler<IFormInputs> = (data) => console.log(data);

  console.log(watch());

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Controller
        name="MyCheckbox"
        control={control}
        defaultValue={false}
        rules={{ required: true }}
        render={({ field }) => <Checkbox {...field} />}
      /> */}
      <input type="checkbox" {...register("MyCheckbox")} />
      <input type="submit" />
    </form>
  );
}
