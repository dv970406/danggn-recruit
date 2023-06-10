import { useGetAuth } from "@/src/clients/mutations/applicant";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IAuthApplicantForm {
  name: string;
  email: string;
  phoneNumber: string;
}
export const useAuthApplicant = () => {
  const {
    formState: { errors, isSubmitted },
    handleSubmit,
    register,
    clearErrors,
    watch,
  } = useForm<IAuthApplicantForm>({
    mode: "onChange",
  });

  const {
    name: liveName,
    email: liveEmail,
    phoneNumber: livePhoneNumber,
  } = watch();

  const isSubmitDisable = !liveName || !liveEmail || !livePhoneNumber;

  useEffect(() => {
    if (isSubmitted) clearErrors();
  }, [isSubmitted]);

  const { mutate: authApplicantMutation, isLoading: getApplicantLoading } =
    useGetAuth();

  const onValid: SubmitHandler<IAuthApplicantForm> = (getApplicantData) => {
    if (getApplicantLoading) return;

    authApplicantMutation(getApplicantData);
  };

  return {
    isSubmitDisable,
    onValid,
    errors,
    handleSubmit,
    register,
    getApplicantLoading,
  };
};
