import { toast } from "react-hot-toast";

export const errorNotify = (errorMessage: string) => toast.error(errorMessage);
export const saveNotify = (saveMessage: string) => toast.success(saveMessage);
