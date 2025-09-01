// if (!process.env.NEXT_PUBLIC_BASE_URL) {
//   throw new Error('missing env variable "NEXT_PUBLIC_BASE_URL"');
// }

export const config = {
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  DEFAULT_LOCALE: "ar",
};
