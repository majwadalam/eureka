/* eslint-disable @next/next/no-img-element */
import SpaceWarp from "@/components/space-warp";
import localFont from "next/font/local";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const starJedi = localFont({
  src: "./fonts/StarJedi.woff",
  variable: "--font-star-jedi",
  weight: "400",
});

const Page = () => {
  return (
    <div>
      <SpaceWarp />

      <header className="absolute top-10 md:left-[20%] left-[10%]">
        <img src="/logo/light.svg" alt="logo" className="w-10" />
      </header>

      <main
        className={`${starJedi.variable} absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] flex flex-col items-center justify-center`}
        style={{ fontFamily: "var(--font-star-jedi)" }}
      >
        <h1 className="text-6xl">Eureka!</h1>
        <p className="text-xl">itu innovations club</p>
      </main>

      <footer className="absolute w-[80%] md:w-[60%] bottom-10 md:mx-[20%] mx-[10%]">
        <p className="text-xl font-semibold text-center mb-2">Socials</p>
        <div className="h-0.5 bg-white mb-4"></div>
        <div className="flex justify-center items-center gap-4">
          <a
            href="https://www.facebook.com/eurekaxitu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={"25"} />
          </a>
          <a
            href="https://www.linkedin.com/company/eureka-itu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={"25"} />
          </a>
          <a
            href="https://www.instagram.com/eureka_itu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={"25"} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Page;
