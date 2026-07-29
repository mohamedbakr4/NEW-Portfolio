import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCss3Alt,
  faGithub,
  faHtml5,
  faJs,
  faNodeJs,
  faReact,
  faTailwindCss,
} from "@fortawesome/free-brands-svg-icons";
import { SiExpress, SiMongodb, SiMui,SiNodedotjs } from "react-icons/si";
const Icons = {
  HTML5: <FontAwesomeIcon icon={faHtml5} style={{ fontSize: 36 }} />,
  CSS3: <FontAwesomeIcon icon={faCss3Alt} style={{ fontSize: 36 }} />,
  JavaScript: <FontAwesomeIcon icon={faJs} style={{ fontSize: 36 }} />,

  Bootstrap: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.956v3.348h2.242c1.316 0 2.04-.559 2.04-1.674 0-1.11-.725-1.674-2.143-1.674z" />
      <path d="M0 4.25C0 1.9 1.9 0 4.25 0h15.5C22.1 0 24 1.9 24 4.25v15.5C24 22.1 22.1 24 19.75 24H4.25C1.9 24 0 22.1 0 19.75V4.25zm8.537 13.538c1.938 0 3.27-.906 3.27-2.395v-.009c0-1.15-.77-1.894-2.012-2.07v-.044c1-.19 1.698-.93 1.698-1.95v-.007c0-1.37-1.162-2.27-2.933-2.27H6.25v8.745h2.287z" />
    </svg>
  ),
  React: <FontAwesomeIcon icon={faReact} style={{ fontSize: 36 }} />,
  GitHub: <FontAwesomeIcon icon={faGithub} style={{ fontSize: 36 }} />,
  Tailwind: <FontAwesomeIcon icon={faTailwindCss} style={{ fontSize: 36 }} />,
  RestAPI: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
    </svg>
  ),
  MaterialUI: <SiMui size={36} />,
  node: <SiNodedotjs size={36}/>,
  express: <SiExpress size={36} />,
  mongodb: <SiMongodb size={36} />,
};

const SKILLS_DATA = [
  {
    id: 1,
    name: "HTML5",
    color: "#E44D26",
    glow: "rgba(228,77,38,0.4)",
    level: 90,
    category: "Markup",
  },
  {
    id: 2,
    name: "CSS3",
    color: "#1572B6",
    glow: "rgba(21,114,182,0.4)",
    level: 85,
    category: "Styling",
  },
  {
    id: 3,
    name: "JavaScript",
    color: "#F7DF1E",
    glow: "rgba(247,223,30,0.4)",
    level: 88,
    category: "Language",
  },
  {
    id: 4,
    name: "Bootstrap",
    color: "#7952B3",
    glow: "rgba(121,82,179,0.4)",
    level: 80,
    category: "Styling",
  },
  {
    id: 5,
    name: "React",
    color: "#61DAFB",
    glow: "rgba(97,218,251,0.4)",
    level: 87,
    category: "Framework",
  },
  {
    id: 6,
    name: "GitHub",
    color: "#ffffff",
    glow: "rgba(255,255,255,0.2)",
    level: 82,
    category: "Tool",
  },
  {
    id: 7,
    name: "Tailwind",
    color: "#38BDF8",
    glow: "rgba(56,189,248,0.4)",
    level: 83,
    category: "Styling",
  },
  {
    id: 8,
    name: "RestAPI",
    color: "#4ADE80",
    glow: "rgba(74,222,128,0.4)",
    level: 78,
    category: "Backend",
  },
  {
    id: 9,
    name: "MaterialUI",
    color: "#007FFF",
    glow: "rgba(0,127,255,0.4)",
    level: 75,
    category: "UI Lib",
  },
  {
    id: 10,
    name: "node",
    color: "#6cc24a",
    glow: "rgba(0,127,255,0.4)",
    level: 75,
    category: "Runtime",
  },
  {
    id: 11,
    name: "express",
    color: "#9ca3af",
    glow: "rgba(0,127,255,0.4)",
    level: 75,
    category: "Backend",
  },
  {
    id: 12,
    name: "mongodb",
    color: "#4fae5b",
    glow: "rgba(0,127,255,0.4)",
    level: 75,
    category: "Database",
  },
];

// ── Mock REST API ─────────────────────────────────────────────────────────
async function fetchSkills() {
  // لما يكون عندك API حقيقي، بدّل بـ:
  // const res = await fetch("/api/skills");
  // return res.json();
  await new Promise((r) => setTimeout(r, 1400));
  return SKILLS_DATA;
}

// ── Skeleton Card ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        padding: "28px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Skeleton
        variant="rounded"
        width={52}
        height={18}
        sx={{
          bgcolor: "rgba(255,255,255,0.07)",
          alignSelf: "flex-end",
          borderRadius: "8px",
        }}
      />
      <Skeleton
        variant="circular"
        width={36}
        height={36}
        sx={{ bgcolor: "rgba(255,255,255,0.07)", alignSelf: "center" }}
      />
      <Skeleton
        variant="rounded"
        width="55%"
        height={12}
        sx={{
          bgcolor: "rgba(255,255,255,0.07)",
          alignSelf: "center",
          borderRadius: "8px",
        }}
      />
      <Skeleton
        variant="rounded"
        width="100%"
        height={3}
        sx={{ bgcolor: "rgba(255,255,255,0.07)", borderRadius: "8px" }}
      />
    </div>
  );
}

// ── Skill Card ────────────────────────────────────────────────────────────
function SkillCard({ skill, hovered, onEnter, onLeave }) {
  const active = hovered === skill.id;

  return (
    <Tooltip
      title={`${skill.name} · ${skill.category}`}
      placement="top"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.05em",
            bgcolor: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        },
      }}
    >
      <div
        style={{
          position: "relative",
          background: active
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${active ? skill.color + "50" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 20,
          padding: "28px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          cursor: "pointer",
          overflow: "hidden",
          userSelect: "none",
          boxShadow: active
            ? `0 20px 60px ${skill.glow}, 0 0 0 1px ${skill.color}22`
            : "0 4px 24px rgba(0,0,0,0.3)",
          transform: active
            ? "translateY(-8px) scale(1.03)"
            : "translateY(0) scale(1)",
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        onMouseEnter={() => onEnter(skill.id)}
        onMouseLeave={onLeave}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: active ? "8%" : "25%",
            right: active ? "8%" : "25%",
            height: 2,
            background: skill.color,
            borderRadius: "0 0 4px 4px",
            opacity: active ? 1 : 0,
            transition: "all 0.35s ease",
          }}
        />

        {/* MUI Category Chip */}
        <Chip
          label={skill.category}
          size="small"
          sx={{
            alignSelf: "flex-end",
            fontSize: "0.58rem",
            height: 18,
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.04em",
            background: `${skill.color}15`,
            color: skill.color,
            border: `1px solid ${skill.color}35`,
            "& .MuiChip-label": { px: "6px" },
          }}
        />

        {/* Icon */}
        <div
          style={{
            color: active ? skill.color : "rgba(255,255,255,0.55)",
            transition: "color 0.3s ease, filter 0.3s ease",
            filter: active ? `drop-shadow(0 0 10px ${skill.color})` : "none",
            animation: active ? "floatAnim 2s ease-in-out infinite" : "none",
          }}
        >
          {Icons[skill.name]}
        </div>

        {/* Name */}
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: active ? "#fff" : "rgba(255,255,255,0.6)",
            transition: "color 0.3s ease",
          }}
        >
          {skill.name}
        </span>

        {/* MUI Progress Bar */}
        <div style={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={active ? skill.level : 0}
            sx={{
              height: 3,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.07)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                transition:
                  "transform 0.9s cubic-bezier(0.23,1,0.32,1) !important",
              },
            }}
          />
          <p
            style={{
              textAlign: "right",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.58rem",
              marginTop: 4,
              color: active ? skill.color : "transparent",
              transition: "color 0.3s ease",
            }}
          >
            {skill.level}%
          </p>
        </div>
      </div>
    </Tooltip>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetchSkills()
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load skills.");
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Syne', sans-serif",
        padding: "40px 20px",
      }}
      id="skills"
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes floatAnim {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .skill-reveal { animation: fadeInUp 0.55s ease both; }

        /* ── Responsive Grid ── */
        .skills-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }

        .section-title {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          font-family: 'Space Mono', monospace;
          margin-bottom: 6px;
          text-align: center;
        }
        .section-heading {
          font-weight: 800;
          font-size: clamp(2rem, 6vw, 3.8rem);
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.45) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          line-height: 1.1;
          margin-bottom: 56px;
        }
        .grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .glow-orb {
          position: fixed;
          width: 500px; height: 500px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          opacity: 0.12;
        }
        .api-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          padding: 4px 12px;
          border-radius: 999px;
          font-family: 'Space Mono', monospace;
          font-size: 0.65rem;
          background: rgba(74,222,128,0.08);
          border: 1px solid rgba(74,222,128,0.25);
          color: #4ade80;
        }
        .api-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      {/* Backgrounds */}
      <div className="grid-bg" />
      <div
        className="glow-orb"
        style={{ background: "#4f46e5", top: "-100px", left: "-100px" }}
      />
      <div
        className="glow-orb"
        style={{ background: "#06b6d4", bottom: "-100px", right: "-100px" }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 860,
          width: "100%",
        }}
      >
        {/* Header */}

        {/* API Badge */}
        {!loading && !error && (
          <div style={{ textAlign: "center", marginBottom: 40 }}></div>
        )}

        {/* Error */}
        {error && (
          <p
            style={{
              textAlign: "center",
              color: "#f87171",
              fontFamily: "'Space Mono',monospace",
              fontSize: 13,
              marginBottom: 32,
            }}
          >
            ⚠ {error}
          </p>
        )}

        {/* Grid */}
        <div className="skills-grid">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : skills.map((skill, i) => (
                <div
                  key={skill.id}
                  className="skill-reveal"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <SkillCard
                    skill={skill}
                    hovered={hovered}
                    onEnter={setHovered}
                    onLeave={() => setHovered(null)}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
