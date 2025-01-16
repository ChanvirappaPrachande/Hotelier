import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isAdding } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New Cabin added successfully");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isAdding, createCabin };
}

export default useCreateCabin;
