import { useState, useEffect } from "react";
import "./hero.css";
const texts = [
  "develop web site",
  "Building a pro website",
  "create UI/UX designs",
  "write clean code",
];

export default function TypingEffect() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // اكتب حرف زيادة
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === currentText.length) {
            // خلصت الكلمة → استنى 1.5 ثانية وابدأ تمسح
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          // امسح حرف
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex - 1 === 0) {
            // خلصت المسح → روح للكلمة الجاية
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? 60 : 100,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <div>
      <p style={styles.greeting}>I'M Mohamed Bakr</p>
      <p style={styles.typingLine}>
        I {displayText}
        <span style={styles.cursor} />
      </p>

      <div style={styles.buttons} className="divbutton">
        <button type="submit" className="btnSecondary">
          <a href="/public/cv Mo Bakr.pdf" download="/public/cv Mo Bakr.pdf">
            Download My CV
          </a>
        </button>
      </div>
    </div>
  );
}

const styles = {
  hero: {
    padding: "80px",
    fontFamily: "Georgia, serif",
    background: "#f5f3ef",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  greeting: {
    fontSize: "42px",
    fontWeight: "400",
    color: "#ffffff",
    marginBottom: "4px",
  },
  typingLine: {
    fontSize: "42px",
    fontWeight: "700",
    color: " #fff",
    marginBottom: "24px",
    minHeight: "56px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ShadowRoot: "2px 2px 60px rgba(89, 180, 250, 0.586)",
  },
  cursor: {
    display: "inline-block",
    width: "2px",
    height: "44px",
    background: "#1a1a1a",
    marginLeft: "3px",
    animation: "blink 0.7s step-end infinite",
  },
  buttons: {
    display: "flex",
    gap: "16px",
  },
};
