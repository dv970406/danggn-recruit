export interface IGetResume {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  pdfLink: string;
  disability: string;
  veteransAward: string;
  militaryServiceException: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateResumeInput {
  recruitPostId: string;
  name: string;
  phoneNumber: string;
  email: string;
  pdfFile: File;
  disability: string;
  veteransAward: string;
  militaryServiceException: string;
}

export interface IGetResumesInput {
  name: string;
  email: string;
  phoneNumber: string;
}
