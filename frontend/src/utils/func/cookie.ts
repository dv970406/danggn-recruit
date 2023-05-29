import { cookies } from "next/headers";

export const getTokenInCookie = () => cookies().get("token")?.value;
