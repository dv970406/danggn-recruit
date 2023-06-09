import * as nodemailer from 'nodemailer';
import * as AWS from 'aws-sdk';

export const sendEmail = async ({
  applicantData,
  receiveEmail,
  recruitPostData,
  pdfFile,
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
    const mailOptions = {
      from: applicantData.email, //송신할 이메일(유저의 Email)
      to: receiveEmail, //수신할 이메일(관리자의 Email)
      subject: `${recruitPostData.title}에 지원한 ${applicantData.name}입니다.`,
      html: `<b>${recruitPostData.content}</b>`,
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
