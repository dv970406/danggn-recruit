import { useGetAuth } from "@/src/clients/mutations/applicant";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IAuthApplicantForm {
  name: string;
  email: string;
  phoneNumber: string;
}

// 로그인 API 및 폼의 로직 처리 훅
export const useAuthApplicant = () => {
  const {
    formState: { errors, isSubmitSuccessful },
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
    if (isSubmitSuccessful) clearErrors();
  }, [isSubmitSuccessful]);

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
