import { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";

const Icons = {
  HTML5: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
    </svg>
  ),
  CSS3: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.413z" />
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
  ),
  Bootstrap: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.956v3.348h2.242c1.316 0 2.04-.559 2.04-1.674 0-1.11-.725-1.674-2.143-1.674z" />
      <path d="M0 4.25C0 1.9 1.9 0 4.25 0h15.5C22.1 0 24 1.9 24 4.25v15.5C24 22.1 22.1 24 19.75 24H4.25C1.9 24 0 22.1 0 19.75V4.25zm8.537 13.538c1.938 0 3.27-.906 3.27-2.395v-.009c0-1.15-.77-1.894-2.012-2.07v-.044c1-.19 1.698-.93 1.698-1.95v-.007c0-1.37-1.162-2.27-2.933-2.27H6.25v8.745h2.287z" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  RestAPI: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
    </svg>
  ),
  MaterialUI: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
      <path d="M0 0v24h24V0H0zm19.939 5.072L12 9.166 8.031 6.999l.001 4.086L12 13.25l7.939-4.093V5.072zM4.061 7.001L4.06 7v10l7.94 4.093V17l-3.97-2.046V10.94L4.061 7.001zm15.878 0l-3.969 2.046v4.914L12 16.007v4.086L19.939 17V7.001z" />
    </svg>
  ),
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
