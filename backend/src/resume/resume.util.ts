import * as nodemailer from 'nodemailer';
import * as AWS from 'aws-sdk';
import { getCreatedDateFormat } from '../core/shared.utils';

const DOMAIN = 'www.어쩌고.com'; // 배포 후 작성

export const sendEmail = async ({
  applicantData,
  receiveEmail,
  recruitPostData,
  pdfFile,
  resumeCreatedAt,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODE_MAILER_AUTH_EMAIL,
        pass: process.env.NODE_MAILER_AUTH_PASS,
      },
    });

    // (nodemailer 관련 이슈 존재 : from에 설정된 이메일이 아니라 내가 nodemailer에서 API KEY를 발급받은 계정의 이메일이 from으로 송신자가 됨)
    const mailOptions = {
      from: `"${applicantData.name}" <${applicantData.email}>`, //송신할 이메일(유저의 Email)
      to: receiveEmail, //수신할 이메일(관리자의 Email)
      subject: `${recruitPostData.title}에 지원한 ${applicantData.name}입니다.`,
      html: `
        <div style="width: 100%">
      <h2>
        ${applicantData.name}님이
        <a href="https://${DOMAIN}/recruit/${
        recruitPostData.id
      }" target="_blank">${recruitPostData.title}</a>에
        지원하였습니다.
      </h2>
      <div
        style="
          display: flex;
          gap: 4px;
          align-items: center;
          justify-content: space-between;
        "
      >
        <h3 style="font-size: 24px">이름</h3>
        <b style="font-size: 20px">${applicantData.name}</b>
      </div>
      <div
        style="
          display: flex;
          gap: 4px;
          align-items: center;
          justify-content: space-between;
        "
      >
        <h3 style="font-size: 24px">이메일</h3>
        <b style="font-size: 20px">${applicantData.email}</b>
      </div>
      <div
        style="
          display: flex;
          gap: 4px;
          align-items: center;
          justify-content: space-between;
        "
      >
        <h3 style="font-size: 24px">전화번호</h3>
        <b style="font-size: 20px">${applicantData.phoneNumber}</b>
      </div>
      <div
        style="
          display: flex;
          gap: 4px;
          align-items: center;
          justify-content: space-between;
        "
      >
        <h3 style="font-size: 24px">작성일</h3>
        <b style="font-size: 20px">${getCreatedDateFormat(resumeCreatedAt)}</b>
      </div>

      <h2 style="color: #ff6f0f; text-align: center">
        첨부된 지원서 파일 참고바랍니다.
      </h2>
    </div>
      `,
      attachments: [
        {
          filename: `${applicantData.name}_${recruitPostData.title}_지원서`,
          content: pdfFile.buffer,
        },
      ],
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('이메일 전송에 실패했습니다.');
  }
};

export const uploadPDFFile = async ({ email, file }) => {
  const objectName = `${email}-${Date.now()}-resume.pdf`;
  const upload = await new AWS.S3({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  })
    .upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: objectName,
      ACL: 'public-read',
      Body: file.buffer,
      ContentDisposition: `attachment; filename="${email}.pdf"`, // 프론트에서 다운로드 시 파일명을 수정할 수 있게 함
    })
    .promise();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return upload.Location;
};
