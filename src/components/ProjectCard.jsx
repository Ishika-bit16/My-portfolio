import "../styles/projectcard.css";

const CARD_COLORS = ["#F5C842", "#7EC8A0", "#B8A9E8", "#F7A825"];

export default function ProjectCard({ title, desc, tech, index }) {
  const color = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <div
      className="project-card"
      style={{ "--card-color": color }}
    >
      <div className="project-card__corner" />
      <div className="project-card__num">Project 0{index + 1}</div>
      <div className="project-card__title">{title}</div>
      <p className="project-card__desc">{desc}</p>
      <div className="project-card__tags">
        {tech.map((t) => (
          <span key={t} className="project-card__tag">{t}</span>
        ))}
      </div>
    </div>
  );
}
