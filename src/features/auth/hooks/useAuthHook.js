import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../state/authSlice";

const useAuthHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const auth = useSelector((state) => state.auth);

  const loginForm = async (formData) => {
    try {
      const result = await dispatch(loginUser(formData));

      if (loginUser.fulfilled.match(result)) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    navigate,
    register,
    handleSubmit,
    errors,
    loginForm,
    ...auth,
  };
};

export default useAuthHook;