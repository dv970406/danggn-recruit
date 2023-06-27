"use client";
import React from "react";
import FileInput from "../../organisms/recruit/FileInput";
import SubmitButton from "../../molecules/buttons/SubmitButton";
import { useApplyResume } from "@/src/hooks/recruit/ApplyResume";
import { REGEX_EMAIL, REGEX_PHONE_NUMBER } from "@/src/utils/func/regex";
import TextInput from "../../organisms/recruit/TextInput";
import RadiosInput from "../../organisms/recruit/RadiosInput";

interface IApplyResume {
  recruitPostId: string;
}

// /recruit/:recruitPostId/apply
// 지원 폼 Template
const ApplyResume = ({ recruitPostId }: IApplyResume) => {
  const {
    register,
    handleSubmit,
    onValid,
    livePdfFile,
    liveMilitaryServiceException,
    liveDisability,
    liveVeteransAward,
    isSubmitDisable,
    errors,
    createResumeLoading,
  } = useApplyResume(recruitPostId);

  return (
    <form className="w-full gap-4 column-box" onSubmit={handleSubmit(onValid)}>
      <TextInput
        labelId={"name"}
        label="이름"
        register={register("name", {
          maxLength: {
            value: 6,
            message: "이름은 2~6글자입니다.",
          },
          minLength: {
            value: 2,
            message: "이름은 2~6글자입니다.",
          },
          required: {
            value: true,
            message: "이름은 필수 사항입니다.",
          },
        })}
        isRequired={true}
        error={errors["name"]?.message}
        placeholder="이름을 입력하세요."
      />
      <TextInput
        labelId={"phoneNumber"}
        label="전화번호"
        register={register("phoneNumber", {
          pattern: {
            value: REGEX_PHONE_NUMBER,
            message: "전화번호는 하이픈(-)없이 양식을 지켜 입력해주세요.",
          },
          required: {
            value: true,
            message: "전화번호는 필수 사항입니다.",
          },
        })}
        isRequired={true}
        error={errors["phoneNumber"]?.message}
        placeholder="전화번호를 입력하세요."
      />
      <TextInput
        labelId={"email"}
        label="이메일"
        register={register("email", {
          pattern: {
            value: REGEX_EMAIL,
            message: "이메일 양식을 지켜주세요.",
          },
          required: {
            value: true,
            message: "이메일은 필수 사항입니다.",
          },
        })}
        isRequired={true}
        error={errors["email"]?.message}
        placeholder="이메일을 입력하세요."
      />
      <FileInput
        register={register("pdfFile", {
          required: {
            value: true,
            message: "PDF파일을 첨부해주세요.",
          },
        })}
        error={errors["pdfFile"]?.message}
        pdfFileName={livePdfFile && livePdfFile[0]?.name}
        isRequired={true}
        description="파일은 최대 50MB의 PDF 형식만 올려주세요. 노션 등 웹 형태의 지원서는 PDF 파일에 웹 링크를 함께 첨부해 주시면 좋아요."
        label="이력서 및 경력기술서"
        placeholder="파일 첨부하기"
      />

      <RadiosInput
        register={register("militaryServiceException")}
        label="병역 특례"
        labelId="militaryServiceException"
        isRequired={true}
        description="현재 병역 특례 채용은 산업기능요원(현역 전직, 보충역)만 가능한 상황이에요. 산업기능요원(현역 신규 편입) 및 전문연구요원의 채용은 불가한 점 지원 시 참고 부탁드려요."
        radioList={[
          {
            label: "해당없음",
            value: "NO",
          },
          {
            label: "산업기능요원(현역 신규 편입)",
            value: "NEW_ITP", // industrial technical personnel
          },
          {
            label: "산업기능요원(현역 신규 이외의 경우)",
            value: "NO_NEW_ITP", // industrial technical personnel
          },
          {
            label: "전문연구요원",
            value: "PRP", // professional research personnel
          },
        ]}
        selectedValue={liveMilitaryServiceException}
      />
      <RadiosInput
        register={register("veteransAward")}
        label="보훈 대상"
        labelId="veteransAward"
        isRequired={true}
        radioList={[
          {
            label: "해당없음",
            value: "NO",
          },
          {
            label: "일반",
            value: "NORMAL",
          },
          {
            label: "산재",
            value: "INTERSPERSED",
          },
          {
            label: "보훈",
            value: "VETERANS",
          },
        ]}
        selectedValue={liveVeteransAward}
      />
      <RadiosInput
        register={register("disability")}
        label="장애 사항"
        labelId="disability"
        isRequired={true}
        radioList={[
          // 얘같은 경우는 true/false로 해도 되겠는데 그래도 위 다른 아이템과 포맷을 맞추자
          {
            label: "비대상",
            value: "NO",
          },
          {
            label: "대상",
            value: "YES",
          },
        ]}
        selectedValue={liveDisability}
      />

      <SubmitButton
        disabled={isSubmitDisable || createResumeLoading}
        isLoading={createResumeLoading}
        onClick={handleSubmit(onValid)}
        text="지원하기"
      />
    </form>
  );
};

export default ApplyResume;
