import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import useToastify from "../../../Hooks/useToastify";

function StatusForm({ orderId, setUpdated, status }) {
  const { register, handleSubmit } = useForm({
    defaultValues: { status: status },
  });
  const { toastSuccess, toastError } = useToastify();

  const onChange = (data) => {
    axios
      .put(
        `https://aqueous-escarpment-00747.herokuapp.com/order/${orderId}`,
        data
      )
      .then(function (response) {
        if (response.data.modifiedCount > 0) {
          setUpdated(true);
          toastSuccess("Status Updated");
        }
      })
      .catch(function (error) {
        toastError(error.message + "Try Again");
      });
  };

  return (
    <form onChange={handleSubmit(onChange)}>
      <select {...register("status", { required: true })}>
        <option value='pending'>pending</option>
        <option value='canceled'>canceled</option>
        <option value='confirmed'>confirmed</option>
        <option value='shipped'>shipped</option>
      </select>
    </form>
  );
}

export default StatusForm;
