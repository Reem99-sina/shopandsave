import localFont from "next/font/local";

const enFont = localFont({
  src: [
    {
      path: "../../public/fonts/Codec-Pro-News.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/Codec-Pro-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/Codec-Pro-Extrabold.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/Codec-Pro-Heavy.otf",
      weight: "700",
    },
  ],
});

const arFont = localFont({
  src: [
    {
      path: "../../public/fonts/FFShamelSansOne-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/FFShamelSansOne-Normal.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/FFShamelSansOne-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/fonts/FFShamelSansOne-Bold.otf",
      weight: "700",
    },
  ],
});

export { arFont, enFont };
