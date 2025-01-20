import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      toast.success("Account created successfully. Please verify your email.");
    },
  });

  return { signup, isLoading };
}

export default useSignup;
