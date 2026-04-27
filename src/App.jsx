import { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowUpRight,
  Code2,
  Smartphone,
  Server,
  Database,
  ChevronDown,
  Terminal,
  Star,
  Menu,
  X,
} from "lucide-react";

// ── tiny primitives ──────────────────────────────────────────────────────────

const Badge = ({ children, accent }) => (
  <span
    className={`inline-block px-2.5 py-0.5 text-xs font-mono rounded-sm border ${
      accent
        ? "border-accent text-accent bg-accent/10"
        : "border-white/10 text-muted bg-white/5"
    }`}
  >
    {children}
  </span>
);

const SectionLabel = ({ children }) => (
  <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4">
    {children}
  </p>
);

// ── data ─────────────────────────────────────────────────────────────────────

const SKILLS = [
  {
    icon: Smartphone,
    label: "Mobile",
    items: [
      "Flutter",
      "Dart",
      "Android",
      "iOS",
      "BLoC",
      "GetX",
      "Riverpod",
      "Clean Architecture",
      "MVVM",
    ],
  },
  {
    icon: Server,
    label: "Backend",
    items: [
      "GraphQL",
      "REST API",
      "WebSockets",
      "Node.js",
      "NestJS",
      "Firebase",
    ],
  },
  {
    icon: Database,
    label: "Data",
    items: ["Realm", "Hive", "SQLite", "Room", "PostgreSQL", "MongoDB"],
  },
  {
    icon: Code2,
    label: "Tools",
    items: [
      "CI/CD",
      "CodeMagic",
      "Testing",
      "Git",
      "Figma",
      "Jira",
      "Firebase",
      "Copilot",
      "Cursor",
    ],
  },
];

const RESUME_LINK =
  "https://docs.google.com/document/d/1R2qX5sIrETN9uIfmU3-Jw3LO92TLAI3uZFhj_YJqeMo/edit?usp=sharing";

const EXPERIENCE = [
  {
    company: "EX Squared Solutions India Pvt. Ltd.",
    role: "Senior Flutter Developer",
    period: "July 2024 – Present",
    project: "SLB Customer Delivery System Applications",
    details: [
      "Designed and developed scalable Flutter applications using clean architecture with repository and data source layers.",
      "Implemented predictable, testable UI flows using BLoC / flutter_bloc.",
      "Consumed GraphQL APIs (queries, mutations, pagination) with proper caching, authentication headers, and error handling.",
      "Enabled real-time updates using GraphQL subscriptions and WebSocket clients.",
      "Wrote unit and widget tests for BLoC logic and critical UI flows using flutter_test and bloc_test.",
      "Optimized performance by reducing unnecessary widget rebuilds, analyzing frame rendering, and monitoring memory usage.",
      "Integrated telemetry and crash analytics using Firebase Analytics and Microsoft Application Insights.",
      "Collaborated with product, design, and backend teams; documented architectural decisions and release notes in Jira.",
    ],
    tech: "Flutter, Dart, BLoC, Dio, GraphQL",
    tools: "Android Studio, Xcode, VS Code",
    footerLink: "https://apps.apple.com/us/app/slb-customer/id1645115498",
    footer: "SLB Customer ® App - App Store",
  },
  {
    company: "Wiom",
    role: "Senior Flutter Developer",
    period: "April 2024 – June 2024",
    project: "Wiom Partner App",
    details: [
      "Built modular Flutter features with reusable UI components and consistent theming.",
      "Implemented state management using BLoC Cubit for predictable state transitions.",
      "Integrated Firebase and CleverTap for analytics, user insights, and crash monitoring.",
      "Improved app stability and release confidence through testing and telemetry analysis.",
    ],
    tech: "Flutter, Dart, BLoC, Dio",
    tools: "Android Studio, Xcode",
    footerLink:
      "https://play.google.com/store/apps/details?id=com.i2e1.wiom.sales",
    footer: "Wiom Partner - Apps on Google Play",
  },
  {
    company: "Purview Services",
    role: "Senior Flutter Developer",
    period: "October 2023 – March 2024",
    project: "KK Mobile Ordering (Order Sweet)",
    details: [
      "Implemented Clean Architecture (Repository & Data Source patterns) to improve scalability and maintainability.",
      "Designed reusable widgets and modular features aligned with design system standards.",
      "Integrated Firebase for push notifications and analytics.",
      "Supported testing, bug fixing, and release hardening activities.",
    ],
    tech: "Flutter, Riverpod, Clean Architecture",
    tools: "Android Studio, VS Code",
    footerLink: "https://apps.apple.com/us/app/krispy-kreme/id482752836",
    footer: "Krispy Kreme ® App - App Store",
  },
  {
    company: "HiNirog HealthTech Pvt. Ltd.",
    role: "Senior Flutter Developer",
    period: "April 2018 – August 2023",
    project: "NirogStreet",
    details: [
      "Owned end-to-end Flutter development for large-scale health-tech applications.",
      "Built offline-friendly features using Realm, Hive, and SQLite for local persistence.",
      "Integrated Razorpay for secure payments and Firebase for analytics and crash reporting.",
      "Implemented state management using GetX and optimized performance for low-end devices.",
      "Collaborated with cross-functional teams to deliver stable, production-ready releases.",
    ],
    tech: "Flutter, Dart, Java, Kotlin, Firebase, Realm",
    tools: "Android Studio, VS Code",
    footerLink:
      "https://play.google.com/store/apps/details?id=com.app.nirogstreet",
    footer: "NirogStreet - Apps on Google Play",
  },
  {
    company: "TechTree IT Systems Pvt. Ltd.",
    role: "Junior Android Developer",
    period: "February 2016 – February 2018",
    project: "ClubApparel & IRCTC E-Catering App",
    details: [
      "Developed reusable UI components and integrated third-party APIs and payment gateways.",
      "Implemented push notifications and basic analytics.",
    ],
    tech: "Android, Firebase",
    tools: "Android Studio, VS Code",
    footerLink: "https://play.google.com/store/apps/details?id=com.irctc.fot",
    footer: "IRCTC eCatering Food on Track - Apps on Google Play",
  },
];

const TECH_MARQUEE = [
  "Flutter",
  "Dart",
  "Android",
  "Node.js",
  "NestJS",
  "Python",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "TypeScript",
  "REST API",
  "GraphQL",
  "Docker",
  "Firebase",
  "BLoC",
  "Clean Architecture",
];

// ── hook: intersection observer ───────────────────────────────────────────────

function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── sections ──────────────────────────────────────────────────────────────────

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-16 lg:px-16 pt-12 pb-10 overflow-hidden">
      {/* background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#F5F2EC 1px, transparent 1px), linear-gradient(90deg, #F5F2EC 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* orange glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

      <div className="relative max-w-5xl">
        <div
          className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-dot" />
            <span className="font-mono text-xs text-muted tracking-widest">
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>

        <h1
          className={`font-display font-bold leading-none tracking-tight transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          Prakash
          <br />
          <span className="text-accent">Kumar</span>
        </h1>

        <div
          className={`mt-6 flex flex-wrap gap-2 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {[
            "Flutter & Android",
            "Node.js & NestJS",
            "PostgreSQL & MongoDB",
            "Clean Architecture & MVVM",
          ].map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <p
          className={`mt-8 text-muted max-w-xl leading-relaxed text-lg transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Senior Flutter Developer with 9+ years of experience building scalable
          mobile applications for large audiences. I deliver clean architecture,
          BLoC-driven UI, GraphQL-backed APIs, and production-ready Flutter apps
          with strong quality and performance.
        </p>

        <div
          className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText("prakashkeshari764@gmail.com")
            }
            className="group inline-flex items-center gap-2 border border-white/15 text-paper px-6 py-3 font-display font-semibold text-sm rounded-sm hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <Mail size={16} />
            prakashkeshari764@gmail.com
          </button>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText("+91 7042750794")}
            className="group inline-flex items-center gap-2 border border-white/15 text-paper px-6 py-3 font-display font-semibold text-sm rounded-sm hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <Smartphone size={16} />
            +91 7042750794
          </button>
          <a
            href={RESUME_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-white/15 text-paper px-6 py-3 font-display font-semibold text-sm rounded-sm hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <ExternalLink size={16} />
            Download Resume
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}

function TechMarquee() {
  const double = [...TECH_MARQUEE, ...TECH_MARQUEE];
  return (
    <div className="border-y border-white/5 py-8 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap">
        {double.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="font-display text-sm font-semibold text-paper/50 hover:text-accent transition-colors cursor-default">
              {t}
            </span>
            <span className="text-accent/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const [ref, visible] = useVisible();
  return (
    <section id="skills" ref={ref} className="px-6 md:px-16 lg:px-16 py-12">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionLabel>What I work with</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-10">
            Skills &<br />
            <span className="text-accent">Expertise</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map(({ icon: Icon, label, items }, i) => (
            <div
              key={label}
              className={`bg-surface/50 border border-white/10 p-7 group hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 rounded-sm ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                transitionDuration: "500ms",
              }}
            >
              <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <Icon size={18} className="text-accent" />
              </div>
              <p className="font-display font-semibold text-paper mb-4 text-lg">
                {label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [ref, visible] = useVisible(0.1);
  return (
    <section
      id="experience"
      ref={ref}
      className="px-6 md:px-16 lg:px-16 py-12 bg-ink/5"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionLabel>Professional Experience</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-10">
            Company Projects
            <br />
            <span className="text-accent">& Experience</span>
          </h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCE.map((item, index) => (
            <div
              key={item.company}
              className={`bg-ink border border-white/10 rounded-sm p-6 md:p-8 hover:border-accent/30 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">
                    {item.company}
                  </p>
                  <h3 className="font-display font-semibold text-2xl text-paper mb-2">
                    {item.role}
                  </h3>
                  <p className="text-muted text-sm">{item.period}</p>
                </div>
                <div className="text-left md:max-w-xs">
                  <p className="text-paper font-semibold">Project</p>
                  <p className="text-muted text-sm mt-1">{item.project}</p>
                </div>
              </div>

              <ul className="list-disc list-inside text-muted space-y-3 mb-6">
                {item.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-paper/80">
                <div>
                  <p className="font-semibold text-paper mb-2">Tech Stack</p>
                  <p>{item.tech}</p>
                </div>
                <div>
                  <p className="font-semibold text-paper mb-2">Tools</p>
                  <p>{item.tools}</p>
                </div>
              </div>

              <p className="mt-6 text-sm text-accent">
                {item.footerLink ? (
                  <a
                    href={item.footerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {item.footer}
                  </a>
                ) : (
                  item.footer
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, visible] = useVisible();
  return (
    <section id="about" ref={ref} className="px-6 md:px-16 lg:px-16 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-start">
        <div
          className={`transition-all duration-600 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"} md:col-span-1`}
        >
          <SectionLabel>About Me</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-8">
            Senior Flutter
            <br />
            <span className="text-accent">Developer</span>
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Senior Flutter Developer with 9+ years of experience building,
              shipping, and maintaining high-quality mobile applications used by
              thousands of users. I deliver production-ready apps with clean
              architecture, BLoC state management, GraphQL integrations, and
              strong performance.
            </p>
            <p>
              I own features end-to-end—from design and implementation to
              testing, optimization, and release—while collaborating closely
              with product, design, and backend teams. My work emphasizes
              offline resilience, telemetry, crash monitoring, and maintainable
              delivery pipelines.
            </p>
            <p>
              I specialize in Flutter & Dart, clean architecture patterns,
              GraphQL, app quality, and CI-friendly mobile release workflows. I
              am based in India (Gurgaon / Delhi / Noida) and available for
              remote opportunities.
            </p>
          </div>
        </div>

        <div
          className={`transition-all duration-600 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"} md:col-span-2`}
        >
          <div className="bg-surface border border-white/5 rounded-sm p-6 md:p-8">
            <p className="font-mono text-xs text-accent mb-6 tracking-widest">
              CORE STRENGTHS
            </p>
            {[
              [
                "Primary Role",
                "Senior Flutter Developer · Mobile App Developer",
              ],
              ["Location", "India · Gurgaon / Delhi / Noida · Remote"],
              ["Mobile Frameworks", "Flutter, Android, iOS"],
              ["State Management", "BLoC, GetX, Cubit, Provider, Riverpod"],
              ["APIs", "GraphQL, REST, WebSockets, Node.js, NestJS"],
              ["Persistence", "Realm, Hive, SQLite, Room"],
              ["Architecture", "Clean Architecture, MVVM, Repository Pattern"],
              [
                "CI/CD",
                "CodeMagic, GitHub Actions, Testing, Release Pipelines",
              ],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex gap-4 py-3 border-b border-white/5 last:border-0"
              >
                <span className="font-mono text-xs text-muted w-28 shrink-0 pt-0.5">
                  {k}
                </span>
                <span className="text-sm text-paper">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, visible] = useVisible();
  return (
    <section
      id="contact"
      ref={ref}
      className="px-6 md:px-16 lg:px-16 py-12 bg-surface/30"
    >
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <SectionLabel>Let's connect</SectionLabel>
        <h2
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(1.4rem, 4.5vw, 2.6rem)", lineHeight: 1.05 }}
        >
          Got a project
          <br />
          in <span className="text-accent">mind?</span>
        </h2>
        <p className="text-muted text-lg mb-10 leading-relaxed">
          Whether it's a Flutter app, a Node.js API, or an Android project — I'd
          love to hear about it. Drop me a line and let's build something great
          together.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="mailto:prakashkeshari764@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-accent text-ink px-7 py-3.5 font-display font-semibold text-sm rounded-sm hover:bg-paper transition-colors duration-200"
          >
            <Mail size={16} />
            Send me an email
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href="https://github.com/prakashkeshari"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 text-paper px-7 py-3.5 font-display font-semibold text-sm rounded-sm hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/prakash-kumar-95335ab9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/15 text-paper px-7 py-3.5 font-display font-semibold text-sm rounded-sm hover:border-accent hover:text-accent transition-colors duration-200"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 md:px-16 lg:px-24 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="font-mono text-xs text-muted">
        © {new Date().getFullYear()} Prakash Keshari. Built with React + Vite.
      </p>
      <div className="flex items-center gap-5">
        {[
          { href: "https://github.com/prakashkeshari", icon: Github },
          {
            href: "https://www.linkedin.com/in/prakash-kumar-95335ab9",
            icon: Linkedin,
          },
          { href: "mailto:prakashkeshari764@gmail.com", icon: Mail },
        ].map(({ href, icon: Icon }) => (
          <a
            key={href}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </footer>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navItems = ["Skills", "Experience", "About", "Contact"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`px-6 md:px-16 lg:px-24 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "bg-ink/90 backdrop-blur-md border-b border-white/5" : ""
        }`}
      >
        <a
          href="#"
          className="font-display font-bold text-paper hover:text-accent transition-colors"
        >
          PK<span className="text-accent">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-xs tracking-widest text-muted hover:text-paper transition-colors uppercase"
            >
              {item}
            </a>
          ))}
        </nav>
        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden text-paper hover:text-accent transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav
        className={`md:hidden bg-ink/95 backdrop-blur-md border-b border-white/5 px-6 py-4 transition-all duration-200 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-xs tracking-widest text-muted hover:text-paper transition-colors uppercase"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

// ── app ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <Nav />
      <Hero />
      <TechMarquee />
      <Skills />
      <Experience />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
