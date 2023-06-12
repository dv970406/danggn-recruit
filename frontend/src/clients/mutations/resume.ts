import { QueryKeys } from "../client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createResume, getAppliedRecruitPosts } from "../fetchers/resume";
import { redirect, usePathname, useRouter } from "next/navigation";
import { errorNotify } from "@/src/utils/func/toast";
import { useSetRecoilState } from "recoil";
import { successAppliedResumeState } from "@/src/utils/recoil/resume";
import { IAppliedRecruitPosts } from "@/src/type/resume.interface";

export const useGetAppliedRecruitPosts = () => {
  const result = useQuery<IAppliedRecruitPosts>(
    [QueryKeys.RECRUIT_POST, "MY"],
    getAppliedRecruitPosts,
    {
      suspense: true,
    }
  );

  if (!result?.data?.ok || result?.data?.error) {
    errorNotify(result?.data?.error!);
    redirect("/resume/auth");
  }
  return result;
};

// export const useGetMyResume = (resumeId?: string) => {
//   const result = useQuery<IResume>(
//     [QueryKeys.RESUME, resumeId],
//     () => getMyResume(resumeId),
//     {
//       enabled: !!resumeId,
//     }
//   );

//   return result;
// };

export const useCreateResume = () => {
  const { push } = useRouter();
  const setSuccessAppliedResume = useSetRecoilState(successAppliedResumeState);
  const pathname = usePathname();
  const result = useMutation(createResume, {
    onSuccess: ({ ok, error, resume: newResume }) => {
      if (!ok) {
        errorNotify(error);
        return;
      }
      // reactQueryClient.setQueryData<IResume[]>(
      //   [QueryKeys.RESUME],
      //   (prevResumes) => {
      //     if (!prevResumes) return;

      //     // Cache에 새 데이터를 추가
      //     return [newResume, ...prevResumes];
      //   }
      // );
      setSuccessAppliedResume(newResume);
      push(`${pathname}/success`);
    },
  });

  return result;
};

// export const usePatchResume = () => {
//   const result = useMutation(patchResume, {
//     onSuccess: (updatedResumeData: IResume) => {
//       reactQueryClient.setQueryData<IResume[]>(
//         [QueryKeys.RESUME],
//         (prevResumes) => {
//           if (!prevResumes) return;
//           const copiedResumes = [...prevResumes];

//           // Cache에 들어 있는 예전 Resumes 배열에서 해당 데이터의 Index를 찾아냄
//           const targetResumeDataIndex = copiedResumes.findIndex(
//             (prevResume) => prevResume.id === updatedResumeData.id
//           );

//           // 그 index의 데이터를 삭제하고 서버에게 받은 새로운 데이터를 붙여넣음
//           copiedResumes.splice(targetResumeDataIndex, 1, updatedResumeData);

//           return copiedResumes;
//         }
//       );
//     },
//   });

//   return result;
// };

// export const useDeleteResume = () => {
//   const result = useMutation(deleteResume, {
//     onSuccess: ({ resumeId }) => {
//       reactQueryClient.setQueryData<IResume[]>(
//         [QueryKeys.RESUME],
//         (prevResumes) => {
//           if (prevResumes?.length === 0) return;

//           // 지워진 데이터를 Cache에서도 삭제
//           const newResumes = prevResumes?.filter(
//             (Resume) => Resume.id !== resumeId
//           );

//           return newResumes;
//         }
//       );
//     },
//   });

//   return result;
// };
