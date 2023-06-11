"use client";
import TextInput from "@/src/components/molecules/inputs/TextInput";
import React from "react";
import SubmitButton from "../../molecules/buttons/SubmitButton";
import { useAuthApplicant } from "@/src/hooks/resume/AuthApplicant";
import { REGEX_EMAIL, REGEX_PHONE_NUMBER } from "@/src/utils/func/regex";

// /resume/auth
// 로그인 폼 Template
const AuthApplicant = () => {
  const {
    handleSubmit,
    onValid,
    register,
    isSubmitDisable,
    errors,
    getApplicantLoading,
  } = useAuthApplicant();

  return (
    <section className="w-full h-full my-auto flex-center">
      <form
        className="w-full gap-4 mt-20 column-box"
        onSubmit={handleSubmit(onValid)}
      >
        <TextInput
          fieldId={"name"}
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
          fieldId={"phoneNumber"}
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
          fieldId={"email"}
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

        <SubmitButton
          onClick={handleSubmit(onValid)}
          disabled={isSubmitDisable || getApplicantLoading}
          isLoading={getApplicantLoading}
          text="확인"
        />
      </form>
    </section>
  );
};

export default AuthApplicant;
