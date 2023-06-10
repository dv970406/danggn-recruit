import React, { ChangeEventHandler } from "react";
import { FaSearch } from "react-icons/fa";

interface ISearchKeyword {
  handleFilteringRecruitPosts: ChangeEventHandler<HTMLInputElement>;
}

const SearchKeyword = ({ handleFilteringRecruitPosts }: ISearchKeyword) => {
  return (
    <div className="items-center w-full gap-2 px-3 py-2 row-box border-b-transition focus-within:border-b-danggn-orange">
      <FaSearch />
      <input
        placeholder="검색어를 입력하세요"
        className="w-full outline-none"
        name="keyword"
        onChange={handleFilteringRecruitPosts}
      />
    </div>
  );
};

export default SearchKeyword;
