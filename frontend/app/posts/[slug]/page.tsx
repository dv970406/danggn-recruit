import type { NextPage } from "next";
import React from "react";

interface IPostDetail {
  params: {
    slug: string;
  };
}
const PostDetail: NextPage<IPostDetail> = ({ params }) => {
  return <div>{params.slug}</div>;
};

export default PostDetail;
