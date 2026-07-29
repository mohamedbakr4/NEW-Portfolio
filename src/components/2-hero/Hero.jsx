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
          <span>
            Full Stack Software Engineer with expertise in the MERN Stack
            (MongoDB, Express.js, React, Node.js)
          </span>
          <br /> Experienced in developing secure, scalable, and
          high-performance web applications. Skilled in designing REST APIs,
          integrating databases, authentication systems, and building responsive
          front-end interfaces. Committed to writing clean, reusable code and
          delivering reliable solutions that meet business needs.
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
