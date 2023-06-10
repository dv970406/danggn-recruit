import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { QueryKeys } from "../client";
import { getAuth } from "../fetchers/applicant";
import { errorNotify, saveNotify } from "@/src/utils/func/toast";

export const useGetAuth = () => {
  const { push } = useRouter();
  const result = useMutation(getAuth, {
    onSuccess: () => {
      saveNotify("인증에 성공했습니다.");
      push("/resume/my");
    },
    onError: ({ response: { data } }) => {
      // 백엔드로부터 받은 에러문구를 띄워줌
      if (!data.ok) {
        errorNotify(data.error);
      }
      return;
    },
  });

  return result;
};
