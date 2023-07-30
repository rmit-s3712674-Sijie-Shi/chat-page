import React, { useEffect, useState } from "react";
import { IUser } from "../globleTypes/userTypes";
import { useLocation } from "react-router-dom";
import { getUserForms } from "../httpRequests/formRequests";

const FormMainPage = () => {
  const user: IUser = useLocation().state;
  const [formState, setFormState] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    getUserForms(user.user._id)
      .then((res) => setFormState(res))
      .catch((err) => setError(err));
    
  });
  return (
    <>
      <div>
        <div>saved</div>
        {}
        <div>sent</div>

        <div>finishied</div>
      </div>
    </>
  );
};

export default FormMainPage;
