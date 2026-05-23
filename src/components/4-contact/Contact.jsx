import "./contact.css";
import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import doneAnimation from "../../animation/done.json";
import contactAnimation from "../../animation/contact.json";

const Contact = () => {
  const [state, handleSubmit] = useForm("xrgvvdlo");

  return (
    <section className="contact-us" id="Contact">
      <h1 className="title">
        <span className="icon-envelope"> </span>
        Contact us
      </h1>
      <p className="sub-title">
        Contact us for more information and Get notified when I publish
        something new.
      </p>

      <div
        style={{ justifyContent: "space-between", flexWrap: "wrap" }}
        className="flex"
      >
        <ul class="contact-list">
          <li class="contact-item">
            <div class="icon-box">
              <EmailIcon />
            </div>
            <div class="item-text">
              <h4>Email</h4>
              <p>mohmedbakr145@gmail.com</p>
            </div>
          </li>

          <li class="contact-item">
            <div class="icon-box">
              <PhoneIcon />
            </div>
            <div class="item-text">
              <h4>Phone</h4>
              <p>01021599607</p>
              <p>01125713602</p>
            </div>
          </li>

          <li class="contact-item">
            <div class="icon-box">
              <LocationOnIcon />
            </div>
            <div class="item-text">
              <h4>Location</h4>
              <p>Ahmed Orabi, Engineers</p>
            </div>
          </li>
        </ul>
        <form onSubmit={handleSubmit} className="">
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input
              autoComplete="off"
              required
              type="email"
              name="email"
              id="email"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="flex" style={{ marginTop: "24px" }}>
            <label htmlFor="message">Your message:</label>
            <textarea required name="message" id="message"></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>

          <button type="submit" disabled={state.submitting} className="submit">
            {state.submitting ? "Submitting ..." : "Submit"}
          </button>

          {state.succeeded && (
            <p
              className="flex"
              style={{ fontSize: "18px", marginTop: "1.7rem" }}
            >
              <Lottie
                loop={false}
                style={{ height: 37 }}
                animationData={doneAnimation}
              />
              Your message has been sent successfully 👌
            </p>
          )}
        </form>
        <div className=" animation">
          <Lottie
            className="contact-animation"
            style={{ height: 355 }}
            animationData={contactAnimation}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
