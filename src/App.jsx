import { useState, useEffect, useRef } from "react";
import photo from "./assets/photo.svg";
import Doodles from "./components/Doodles";
import Reveal from "./components/Reveal";
import Pill from "./components/Pill";
import ProjectCard from "./components/ProjectCard";
import "./styles/global.css";
import "./styles/nav.css";
import "./styles/hero.css";
import "./styles/sections.css";
import "./styles/contact.css";
import "./styles/footer.css";
import portfolioAnimation from "./components/Ani";

const GITHUB = "https://github.com/Ishika-bit16";
const LINKEDIN = "https://www.linkedin.com/in/ishika-sogra-355318325";
const TO_EMAIL = "ishi16sogra@gmail.com";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const skills = [
  "C++",  "JavaScript", "Python", "HTML/CSS",  "Node.js","Git", "Git hub",
  "Figma", "SQL", "REST APIs", "Problem Solving", "React","TypeScript", 
];

const projects = [
  { title: "Portfolio Website", desc: "A responsive personal portfolio with smooth animations and dark aesthetic.", tech: ["React", "CSS", "Figma"] },
  { title: "Spendwise", desc: "Interactive analytics dashboard with real-time chart updates.", tech: ["JavaScript", "D3.js", "SQL"] },
  { title: "Roadmap Analyzer", desc: "Real-time messaging app with authentication and rooms.", tech: ["Node.js", "Socket.io", "React"] },
  { title: "Fake News Detector", desc: "Image classification model using CNNs with a clean web interface.", tech: ["Python", "TensorFlow", "Flask"] },
];

const stats = [
  { label: "Projects Built", val: "", color: "#F5C842" },
  { label: "Technologies", val: "", color: "#7EC8A0" },
  { label: "GitHub Repos", val: "", color: "#B8A9E8" },
  { label: "Coffees ☕", val: "∞", color: "#F7A825" },
];

const WORD_LIMIT = 200;

function countWords(str) {
  return str.trim() === "" ? 0 : str.trim().split(/\s+/).length;
}

export default function App() {
  const [navVisible, setNavVisible] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);

  // contact form
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const wordCount = countWords(form.message);
  const overLimit = wordCount > WORD_LIMIT;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y > lastScroll.current + 10) setNavVisible(false);
      else if (y < lastScroll.current - 5) setNavVisible(true);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!form.name || !form.email || !form.message || overLimit) return;

    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("access_key", "c08b474f-272f-452f-83bf-b2be3a035501");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("message", form.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="app">
      <Doodles />

      {/* ── TOP NAV ── */}
      <nav className={`top-nav ${scrolled ? "top-nav--scrolled" : ""} ${navVisible ? "" : "top-nav--hidden"}`}>
        
        <div className="nav-links">
          {navLinks.map((l) => (
            <span key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>{l.label}</span>
          ))}
        </div>
      </nav>

      {/* ── FLOATING BOTTOM NAV ── */}
      {!navVisible && (
        <div className="bottom-nav">
          {navOpen ? (
            <div className="bottom-nav__open">
              {navLinks.map((l) => (
                <span key={l.id} className="bottom-nav__link" onClick={() => scrollTo(l.id)}>{l.label}</span>
              ))}
              <span className="bottom-nav__close" onClick={() => setNavOpen(false)}>✕</span>
            </div>
          ) : (
            <button className="bottom-nav__pill" onClick={() => setNavOpen(true)}>☰ Menu</button>
          )}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="hero__text">
          <div className="section-eyebrow section-eyebrow--green">✦ Hello, I'm</div>
          <h1 className="hero__name">Ishika Sogra</h1>
          <div className="hero__role cursor">Developer &amp; Designer</div>
          <p className="hero__bio">
            I build thoughtful digital experiences — blending clean code with expressive design to make the web a more beautiful place.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary" onClick={() => scrollTo("projects")}>See Projects →</button>
            <button className="btn btn--outline" onClick={() => scrollTo("contact")}>Get in Touch</button>
          </div>
          <div className="hero__social">
            <span className="hero__social-label">Find me on</span>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="hero__social-link hero__social-link--github">GitHub</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hero__social-link hero__social-link--linkedin">LinkedIn</a>
          </div>
        </div>

        {/* ── PHOTO VISUAL — matches Figma: blob + gold ring ── */}
        <div className="hero__visual">
          <div className="photo-cluster">
            <span className="pdoodle pdoodle--star">✦</span>
            <span className="pdoodle pdoodle--cross">✕</span>
            <span className="pdoodle pdoodle--dot">•••</span>
            <span className="pdoodle pdoodle--squiggle">〜</span>
            <span className="pdoodle pdoodle--circle">◯</span>
            <div className="blob-circle" />
            <div className="gold-ring">
              <img src={photo} alt="Ishika Sogra" className="gold-ring__img" />
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="container">
          <Reveal><div className="section-eyebrow section-eyebrow--green">// 01 — About me</div></Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-heading">
              Curious mind,<br /><span className="accent-gold">creative hands.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="about-grid">
              {[
                { emoji: "🌻", text: "I’m Ishika, a developer & designer who build digital experiences where clean, predictable logic meets expressive, beautiful design." },
                { emoji: "✨", text: "Right now, I’m translating complex ideas into full-stack applications and pixel-pushing my design work. Yes, my design files are just as organized as my GitHub repositories." },
                { emoji: "📍 ", text: "Based in India, always ready for global collaborations, internships, or side-projects that push the envelope. Let’s build something people love to click." },
              ].map((card) => (
                <div key={card.emoji} className="about-card">
                  <div className="about-card__emoji">{card.emoji}</div>
                  <p className="about-card__text">{card.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section">
        <div className="container">
          <Reveal><div className="section-eyebrow section-eyebrow--lavender">// 02 — Skills</div></Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-heading">
              What I work<br /><span className="accent-lavender">with.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="skills-box">
              <div className="skills-pills">
                {skills.map((s, i) => <Pill key={s} label={s} delay={i * 0.06} />)}
              </div>
              <div className="stats-grid">
                {stats.map((s) => (
                  <div key={s.label} className="stat-card" style={{ "--stat-color": s.color }}>
                    <div className="stat-card__val">{s.val}</div>
                    <div className="stat-card__label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section">
        <div className="container">
          <Reveal><div className="section-eyebrow section-eyebrow--gold">// 03 — Projects</div></Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-heading">
              Things I've<br /><span className="accent-gold">built.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="projects-grid">
              {projects.map((p, i) => <ProjectCard key={p.title} {...p} index={i} />)}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="projects-cta">
              <a href={GITHUB} target="_blank" rel="noreferrer" className="btn btn--ghost">View all on GitHub →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section">
        <div className="container container--narrow">
          <Reveal><div className="section-eyebrow section-eyebrow--green">// 04 — Contact me</div></Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-heading section-heading--center">
              Let's create something<br /><span className="accent-green">together.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="contact-bio">
              Have a project in mind, want to collaborate, or just say hi? Fill in the form and I'll get back to you.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="contact-box">
              {status === "sent" ? (
                <div className="contact-success">
                  <span className="contact-success__icon">🌻</span>
                  <p className="contact-success__msg">Message sent! I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSend}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input
                        className="form-input"
                        type="text"
                        name="name"
                        placeholder="e.g. Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Your Email</label>
                      <input
                        className="form-input"
                        type="email"
                        name="email"
                        placeholder="e.g. example@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-label-row">
                      <label className="form-label">Message</label>
                      <span className={`word-count ${overLimit ? "word-count--over" : ""}`}>
                        {wordCount} / {WORD_LIMIT} words
                      </span>
                    </div>
                    <textarea
                      className={`form-textarea ${overLimit ? "form-textarea--over" : ""}`}
                      name="message"
                      rows={6}
                      placeholder="What's on your mind?"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                    {overLimit && (
                      <span className="form-error">Please keep your message under {WORD_LIMIT} words.</span>
                    )}
                    {status === "error" && (
                      <span className="form-error">Something went wrong. Please try again later.</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    className={`btn btn--primary contact-submit ${(!form.name || !form.email || !form.message || overLimit || status === "sending") ? "contact-submit--disabled" : ""}`}
                    disabled={!form.name || !form.email || !form.message || overLimit || status === "sending"}
                  >
                    {status === "sending" ? "Sending... ✦" : "Send Message ✦"}
                  </button>
                  <p className="contact-note">Sends securely via Web3Forms • Usually responds within 24 hours</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
      {/* ── AUDIO── */}
      <audio id="background-audio" loop autoPlay visibility="hidden" volume="0.01" >
        <source src="src\assets\tunes\Daydreams-chosic.com_.mp3" type="audio/mpeg" />
       
      </audio>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span className="footer__copy">© 2025 Ishika Sogra — crafted with 🌻</span>
      </footer>
    </div>
  );
}