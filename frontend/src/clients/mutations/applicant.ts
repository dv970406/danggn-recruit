import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { QueryKeys } from "../client";
import { getAuth } from "../fetchers/applicant";
import { errorNotify, saveNotify } from "@/src/utils/func/toast";

export const useGetAuth = () => {
  const { push } = useRouter();
  const result = useMutation(getAuth, {
    onSuccess: ({ ok, token }) => {
      saveNotify("인증에 성공했습니다.");

      document.cookie = `token=${token}`;
      push("/resume/my");
    },
    onError: ({ response: { data } }) => {
      // 백엔드로부터 받은 에러문구를 띄워줌
      if (!data.ok) {
        // 토큰 인식 실패한 경우 쿠키에 저장된 토큰 삭제
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        errorNotify(data.error);
      }
      return;
    },
  });

  return result;
};
