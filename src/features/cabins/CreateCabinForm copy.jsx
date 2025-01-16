import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { isAdding, createCabin } = useCreateCabin();
  function onSubmit(data) {
    createCabin(
      { ...data, image: data.image[0] },
      {
        onSuccess: () => reset(),
      }
    );
  }
  function onError(err) {
    console.log(err);
    toast.error("Check the form");
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"Cabin Name"} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isAdding}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.name?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isAdding}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.name?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isAdding}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 10" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.name?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isAdding}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less or equel to regular price",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.name?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isAdding}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          disabled={isAdding}
          accept="image/*"
          type="file"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isAdding}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
