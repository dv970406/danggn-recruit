import { IGetRecruitPostsInput } from "@/src/type/recruit-post.interface";
import { customAxios } from "../axios";

export const getRecruitPosts = async ({
  keyword = "",
  partName = "프론트엔드",
  careerType = "all",
  pageParam = 1,
}: IGetRecruitPostsInput) => {
  const { data } = await customAxios.get(
    `/recruit-post?keyword=${keyword}&partName=${partName}&careerType=${careerType}&pageParam=${pageParam}`
  );

  return data;
};

// export const getRecruitPost = async (recruitPostId?: string) => {
//   const { data } = await customAxios.get(`/recruit-post/${recruitPostId}`);
//   return data;
// };
