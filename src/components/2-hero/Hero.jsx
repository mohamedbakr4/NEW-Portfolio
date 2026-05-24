import Lottie from "lottie-react";
import "./hero.css";
import devAnimation from "../../animation/dev.json";
import { useRef } from "react";
import { motion } from "framer-motion";
import TypingEffect from "./write";

const Hero = () => {
  const lottieRef = useRef();

  return (
    <section className="hero flex">
      <div className="left-section  ">
        <div className="parent-avatar flex">
          <motion.img
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1.1)" }}
            transition={{ damping: 6, type: "spring", stiffness: 100 }}
            src={`${import.meta.env.BASE_URL}11zon_cropped.png`}
            className="avatar"
          />
          <div className="icon-verified"></div>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="title"
        >
          <TypingEffect />
        </motion.h1>

        <p className="sub-title">
          <span>I'm a web programmer and developer (front-end developer).</span>
          <br />I have extensive experience and the ability to produce
          sophisticated, high-tech, and responsive web pages, thanks to my
          proficiency in{" "}
          <span>
            HTML, CSS,JavaScript,Tailwind,and I am a React pro and have produced
            high-quality projects quickly with clean code, utilizing frameworks
            such as Material UI.
          </span>
          I have the ability to connect front-end and back-end interfaces using
          an application programming interface (API).
        </p>
      </div>

      <div className="right-section animation ">
        <Lottie
          lottieRef={lottieRef}
          className=""
          onLoadedImages={() => {
            // @ts-ignore
            // https://lottiereact.com/
            lottieRef.current.setSpeed(0.5);
          }}
          animationData={devAnimation}
        />
      </div>
    </section>
  );
};

export default Hero;
