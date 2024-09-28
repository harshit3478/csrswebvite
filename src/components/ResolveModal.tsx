import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuthContext";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
type FormInputs = {
  sensitivity: string;
  des: string;
};
const ResolveModal = ({ id, setShowModal }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>();
  const { user } = useAuthContext();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: FormInputs) => {
    // alert(JSON.stringify(data));
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/emergency/v1/resolve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            respondedBy: user?.name,
            sensitivity: data.sensitivity,
            description: data.des,
          }),
        }
      );
      const json = await res.json();
      console.log("json", json);
      if (res.ok == false) throw new Error("error");

      setSuccess(true);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  function handleClose(e) {
    e.preventDefault();
    setShowModal(false);
  }
  useEffect(() => {
    if(success){
    const timer = setTimeout(() => {
      navigate("/");
    }, 2000); // 2000ms = 2 seconds
}   
    // return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  if (loading)
    return (
      <>
      <dialog id="my_modal" className="modal modal-open">
      <div className="modal-box relative">
        <div className="w-full h-full flex items-center justify-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
        </div>
        </dialog>
      </>
    );

    if(success) return (
        <>
        <dialog id="my_modal" className="modal modal-open">
        <div className="modal-box relative">
        <h2 className="text-center font-bold">Form Submitted Succesfully !! </h2>
        <div className="w-full h-full flex items-center justify-center">
            <img src="/success.gif" alt="gif" />
        </div>
        <button className="btn btn-success text-center" onClick={()=> window.location.href = "/"} >Home</button>
        </div>
      </dialog>
        </>
    )
  return (
    <>
      <dialog id="my_modal" className="modal modal-open">
        <div className="modal-box relative">
          <button
            className="btn absolute top-1 right-1"
            onClick={(e) => handleClose(e)}
          >
            X
          </button>
          <div className="modal-content flex  flex-1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col flex-1 gap-2"
            >
              <h1 className="text-center font-bold text-2xl">Resolve</h1>
              <label htmlFor="sensitivity">
                <strong>Sensitivity</strong>
              </label>
              <select
                className="select select-bordered"
                id="sensitivity"
                defaultValue={"medium"}
                {...register("sensitivity", { required: true, minLength: 3 })}
              >
                {/* <option disabled >senitivity</option> */}
                <option>low</option>
                <option>medium</option>
                <option>high</option>
              </select>
              {errors.sensitivity && (
                <span className="text-red-500">This field is required</span>
              )}
              <label htmlFor="des">
                <strong>Description</strong>
              </label>
              <textarea
                className="textarea textarea-bordered"
                id="des"
                {...register("des", { required: true, minLength: 10 })}
              ></textarea>
              {errors.des && (
                <span className="text-red-500">
                  This field is required & minimum of 10 words{" "}
                </span>
              )}
              <p className="font-semibold italic ">
                responded by : {user?.name}
              </p>
              <button type="submit" className="btn btn-primary">
                Resolve
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ResolveModal;
