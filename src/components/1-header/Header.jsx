import "./header.css";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";

const Header = () => {
  return (
    <header className="  flex">
      <img className="img" src="/public/Untitled-2.png" />

      <nav>
        <ul className="flex">
          <li>
            <a href="#About">About</a>
          </li>

          <li>
            <a href="#skills">skills</a>
          </li>
          <li>
            <a href="#Projects">Projects</a>
          </li>
          <li>
            <a href="#Contact">Contact</a>
          </li>
        </ul>
      </nav>

      <div className="all-icons flex">
        <IconButton>
          <a href="https://github.com/mohamedbakr4">
            <GitHubIcon className="link" />
          </a>
        </IconButton>
        <IconButton>
          <a href="https://www.facebook.com/mohamed.bakr.918568/">
            <FacebookIcon className="link" />
          </a>
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
