import { useCreateResume } from "@/src/clients/mutations/resume";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FILE_SIZE_50MB_TO_BYTES } from "../../utils/constants/file";
import { REGEX_EMAIL } from "../../utils/func/regex";

export interface IResumeForm {
  name: string;
  phoneNumber: string;
  email: string;
  pdfFile: FileList;
  militaryServiceException: string;
  disability: string;
  veteransAward: string;
}

export const useApplyResume = (recruitPostId: string) => {
  const {
    formState: { errors, isValid, isSubmitted },
    handleSubmit,
    register,
    watch,
    clearErrors,
  } = useForm<IResumeForm>({
    mode: "onChange",
  });

  useEffect(() => {
    if (isSubmitted) clearErrors();
  }, [isSubmitted]);
  const {
    pdfFile: livePdfFile,
    disability: liveDisability,
    email,
    militaryServiceException: liveMilitaryServiceException,
    name,
    phoneNumber,
    veteransAward: liveVeteransAward,
  } = watch();

  const isSubmitDisable =
    !liveDisability ||
    !email ||
    !liveMilitaryServiceException ||
    !name ||
    !phoneNumber ||
    !liveVeteransAward ||
    !isValid;

  const { mutate: createResumeMutation, isLoading: createResumeLoading } =
    useCreateResume();

  const onValid: SubmitHandler<IResumeForm> = ({ pdfFile, ...resumeData }) => {
    if (createResumeLoading) return;

    if (pdfFile[0].size > FILE_SIZE_50MB_TO_BYTES) {
      return;
    }

    const receiveEmail = prompt(
      "지원서를 받을 이메일을 입력해주세요! (기능 체크를 위한 입력폼으로 실제 서비스에서는 recruit@danggn.com이 들어갈 예정입니다.)"
    );

    if (!receiveEmail || !REGEX_EMAIL.test(receiveEmail)) {
      alert("이메일 양식을 지켜서 작성해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("recruitPostId", recruitPostId);
    formData.append("name", resumeData.name);
    formData.append("phoneNumber", resumeData.phoneNumber);
    formData.append("email", resumeData.email);
    formData.append(
      "militaryServiceException",
      resumeData.militaryServiceException
    );
    formData.append("disability", resumeData.disability);
    formData.append("veteransAward", resumeData.veteransAward);
    formData.append("pdfFile", pdfFile[0]);
    formData.append("receiveEmail", receiveEmail);

    createResumeMutation(formData);
  };

  return {
    errors,
    handleSubmit,
    register,
    livePdfFile,
    liveMilitaryServiceException,
    liveDisability,
    liveVeteransAward,
    isSubmitDisable,
    onValid,
    createResumeLoading,
  };
};
