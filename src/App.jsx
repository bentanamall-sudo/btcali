import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import Layout from "./components/Layout";
import { Button, Card, ImagePlaceholder, VideoPlaceholder, VideoPlayer } from "./components/UI";
import { applyTheme, getStoredTheme, themes } from "./state/theme";
import { keys, readLS, writeLS } from "./utils/storage";

const freeTutorials = ["Handstand Tutorial", "Kick Up Technique", "Wall Handstand", "Wall Handstand Toe Taps", "Balance Drills"];
const roadmapData = {
  Handstand: ["Wall Handstand", "Kick Up", "Freestanding Hold", "Balance Control", "Handstand Pushup"],
  "Front Lever": ["Tuck Front Lever", "Advanced Tuck", "One Leg Front Lever", "Straddle Front Lever", "Full Front Lever"],
  Planche: ["Frog Stand", "Tuck Planche", "Advanced Tuck", "Straddle Planche", "Full Planche"],
};
const rankTiers = ["Beginner", "Athlete", "Advanced Athlete", "Elite", "Master", "Beast"];
const programs = ["Handstand Pushup Level 1", "Handstand Pushup Level 2", "Handstand Pushup Level 3", "Front Lever Level 1", "Front Lever Level 2", "Planche Level 1", "Planche Level 2", "Muscle Up[...]

// Sample video tutorials data
const videoTutorialsData = {
  "handstand-beginner": {
    title: "Handstand Beginner Guide",
    description: "Build your handstand base with premium beginner progressions.",
    videos: [
      {
        id: 1,
        title: "Wrist Mobility Prep",
        src: "https://via.placeholder.com/800x600?text=Wrist+Mobility",
        thumb: "https://via.placeholder.com/80x80?text=Wrist+Mobility"
      },
      {
        id: 2,
        title: "Wall Handstand Hold",
        src: "https://via.placeholder.com/800x600?text=Wall+Hold",
        thumb: "https://via.placeholder.com/80x80?text=Wall+Hold"
      },
      {
        id: 3,
        title: "Kick Up Technique",
        src: "https://via.placeholder.com/800x600?text=Kick+Up",
        thumb: "https://via.placeholder.com/80x80?text=Kick+Up"
      },
      {
        id: 4,
        title: "Balance Drills",
        src: "https://via.placeholder.com/800x600?text=Balance",
        thumb: "https://via.placeholder.com/80x80?text=Balance"
      },
      {
        id: 5,
        title: "Form Corrections",
        src: "https://via.placeholder.com/800x600?text=Form",
        thumb: "https://via.placeholder.com/80x80?text=Form"
      },
      {
        id: 6,
        title: "Progression Tips",
        src: "https://via.placeholder.com/800x600?text=Tips",
        thumb: "https://via.placeholder.com/80x80?text=Tips"
      }
    ]
  },
  "planche-conditioning": {
    title: "Planche Conditioning",
    description: "Develop scap strength, lean capacity, and core tension for sustainable planche progress.",
    videos: [
      {
        id: 1,
        title: "Scapula Strength",
        src: "https://via.placeholder.com/800x600?text=Scapula",
        thumb: "https://via.placeholder.com/80x80?text=Scapula"
      },
      {
        id: 2,
        title: "Lean Training",
        src: "https://via.placeholder.com/800x600?text=Lean",
        thumb: "https://via.placeholder.com/80x80?text=Lean"
      },
      {
        id: 3,
        title: "Core Tension",
        src: "https://via.placeholder.com/800x600?text=Core",
        thumb: "https://via.placeholder.com/80x80?text=Core"
      },
      {
        id: 4,
        title: "Wrist Conditioning",
        src: "https://via.placeholder.com/800x600?text=Wrist",
        thumb: "https://via.placeholder.com/80x80?text=Wrist"
      },
      {
        id: 5,
        title: "Advanced Progressions",
        src: "https://via.placeholder.com/800x600?text=Advanced",
        thumb: "https://via.placeholder.com/80x80?text=Advanced"
      },
      {
        id: 6,
        title: "Common Mistakes",
        src: "https://via.placeholder.com/800x600?text=Mistakes",
        thumb: "https://via.placeholder.com/80x80?text=Mistakes"
      }
    ]
  }
};

function calcRank(xp) {
  const idx = Math.min(Math.floor(xp / 500), rankTiers.length - 1);
  return rankTiers[idx];
}

function PageTitle({ title, sub }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-black">{title}</h1>
      {sub && <p className="mt-2 text-sm text-[var(--muted)]">{sub}</p>}
    </div>
  );
}

function Home() {
  return (
    <div className="space-y-8">
      <Card className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <h1 className="text-4xl font-black">Master Elite Calisthenics Skills.</h1>
          <p className="text-sm text-[var(--muted)]">Structured programs, tutorials, progress tracking, and 1-on-1 coaching in one premium platform.</p>
          <div className="flex gap-2">
            <Link to="/tutorials"><Button>Start Free</Button></Link>
            <Link to="/programs"><Button>View Programs</Button></Link>
          </div>
        </div>
        <ImagePlaceholder label="Hero athlete image - Replace with your own image" />
      </Card>
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[["Free Tutorials", "/tutorials"], ["Training Programs", "/programs"], ["1-on-1 Coaching", "/coaching"], ["Wall of Fame", "/wall-of-fame"]].map(([name, to]) => (
          <Card key={name}><ImagePlaceholder /><h3 className="mt-3 font-semibold">{name}</h3><Link to={to}><Button className="mt-3">Open</Button></Link></Card>
        ))}
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {Object.keys(roadmapData).map((k) => (
          <Card key={k}><ImagePlaceholder label={`${k} thumbnail`} /><h3 className="mt-3 font-semibold">{k}</h3><p className="text-xs text-[var(--muted)]">Visual progression with locked and comple[...]
        ))}
      </section>
      <Card><h3 className="font-semibold">1-on-1 Coaching Preview</h3><p className="mt-2 text-sm text-[var(--muted)]">Personalised programs, form feedback, video uploads, direct support, and group[...]
      <Card className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-2xl font-bold">Ready to Train Smarter?</h3><div className="flex gap-2"><Link to="/tutorials"><Button>S[...]
    </div>
  );
}

function TutorialsHub() {
  const tutorials = [
    {
      title: "Free Handstand Beginner Guide",
      description: "Build confidence with entry drills, kick-up control, and safe freestanding foundations.",
      difficulty: "Beginner",
      to: "/tutorials/handstand-beginner",
    },
    {
      title: "Free Planche Conditioning",
      description: "Develop scap strength, lean capacity, and core tension for sustainable planche progress.",
      difficulty: "Intermediate",
      to: "/tutorials/planche-conditioning",
    },
  ];
  return (
    <div>
      <PageTitle title="Free Tutorials Hub" sub="Choose your free BTCALI guide and start training with premium structure." />
      <div className="grid gap-4 md:grid-cols-2">
        {tutorials.map((item) => (
          <Card
            key={item.title}
            className="border-[color:rgba(255,255,255,0.14)] bg-[color:rgba(15,20,32,0.68)] shadow-[0_0_28px_rgba(59,130,246,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 ho[...]
          >
            <div className="space-y-3">
              <ImagePlaceholder label={`${item.title} - Replace with your own image`} />
              <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold">
                Difficulty: {item.difficulty}
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-sm text-[var(--muted)]">{item.description}</p>
              <Link to={item.to}>
                <Button>Open Tutorial</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TutorialPage({ tutorialKey, title, summary }) {
  const tutorialData = videoTutorialsData[tutorialKey];
  const thumbnails = tutorialData?.videos.map(v => ({ 
    src: v.thumb, 
    alt: v.title, 
    id: v.id 
  })) || [];

  return (
    <div className="space-y-4">
      <PageTitle title={title} sub={summary} />
      <Card className="border-[color:rgba(255,255,255,0.14)] bg-[color:rgba(15,20,32,0.68)] backdrop-blur-xl">
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-1">
          <VideoPlayer
            title={title}
            description={summary}
            thumbnails={thumbnails}
            videoSrc={tutorialData?.videos[0]?.src}
          />
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Premium tutorial page with multiple video modules, coaching cues, and progression checkpoints.
        </p>
        <Card className="bg-[var(--panel)] mt-4">
          <h3 className="font-semibold">What You&apos;ll Learn</h3>
          <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
            <li>Technique setup and mobility preparation</li>
            <li>Structured progressions with quality standards</li>
            <li>Common faults and correction cues</li>
          </ul>
        </Card>
      </Card>
      <div className="flex flex-wrap gap-2">
        <Link to="/tutorials">
          <Button>Back to Tutorials Hub</Button>
        </Link>
        <Link to="/free-tutorials">
          <Button>Open Legacy Free Tutorials</Button>
        </Link>
      </div>
    </div>
  );
}

function FreeTutorials({ done, toggleTutorial }) {
  return <div><PageTitle title="Free Tutorials" sub="Free handstand tutorials with real completion tracking." /><div className="grid gap-4 md:grid-cols-2">{freeTutorials.map((t) => <Card key={t}>[...]
}

function SkillLibrary() {
  return <div><PageTitle title="Paid Skill Library" sub="Premium sections with upgrade overlay placeholder." /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{["Front Lever", "Planche"[...]
}

function Roadmaps({ roadmapDone, toggleRoadmap }) {
  return <div><PageTitle title="Skill Roadmaps" sub="Glowing node progression trees with real completion percentages." /><div className="grid gap-4 lg:grid-cols-3">{Object.entries(roadmapData).ma[...]
}

function Programs() {
  return <div><PageTitle title="Programs" sub="Premium program cards with expandable details and placeholders." /><div className="grid gap-4 md:grid-cols-2">{programs.map((p) => <Card key={p}><Im[...]
}

function Coaching() {
  return <div className="space-y-4"><PageTitle title="1-on-1 Coaching" sub="Premium coaching offer and application flow." /><Card><ul className="grid gap-2 text-sm text-[var(--muted)]"><li>Person[...]
}

function Quiz() {
  const [show, setShow] = useState(false);
  return <div><PageTitle title="Find Your Level" /><Card><div className="grid gap-2 md:grid-cols-2">{["Main goal","Pushup max","Pullup max","Pike pushup max","Handstand level","Front lever level"[...]
}

function WallOfFame() { return <div><PageTitle title="Wall of Fame" /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Card key={i}><ImagePlaceh[...]

function Dashboard({ dash, setDash, programProgress, overallProgress }) {
  const [rest, setRest] = useState(60);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running || rest <= 0) return;
    const id = setInterval(() => setRest((v) => v - 1), 1000);
    return () => clearInterval(id);
  }, [running, rest]);
  const rank = calcRank(dash.xp);
  return <div className="space-y-4"><PageTitle title="Student Dashboard" /><div className="grid gap-4 lg:grid-cols-3"><Card className="lg:col-span-2"><h3 className="font-semibold">Today&apos;s Se[...]
}

function Coach({ students }) {
  return <div><PageTitle title="Coach Dashboard" /><Card><p className="mb-3 text-sm text-[var(--muted)]">Student list, status, assigned program, uploads, check-ins.</p><div className="overflow-au[...]
}

function Students({ students, setStudents }) {
  const update = (i, k, v) => setStudents((list) => list.map((s, idx) => idx === i ? { ...s, [k]: v } : s));
  const add = () => setStudents((s) => [...s, { num: s.length + 1, name: `Student ${s.length + 1}`, age: "", email: "", instagram: "", status: "Trial", goal: "", level: "", program: "", progress:[...]
  return <div className="space-y-4"><PageTitle title="1-on-1 Coaching Student Hub" sub="Manage students, build programs, track progress, review videos, and update coaching plans." /><div classNam[...]
}

function Checkout() { return <div className="space-y-4"><PageTitle title="Checkout / Pricing" /><div className="grid gap-4 md:grid-cols-2"><Card><h3 className="font-semibold">BTCALI Full Access</[...]

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0);
  const [tutorialDone, setTutorialDone] = useState({});
  const [roadmapDone, setRoadmapDone] = useState({});
  const [dash, setDash] = useState({ xp: 0, streak: 0, sessions: 0, completedExercises: 0 });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const t = getStoredTheme();
    setThemeIndex(themes.findIndex((x) => x.id === t.id));
    applyTheme(t);
    setTutorialDone(readLS(keys.tutorials, {}));
    setRoadmapDone(readLS(keys.roadmap, {}));
    setDash(readLS(keys.dashboard, { xp: 0, streak: 0, sessions: 0, completedExercises: 0 }));
    setStudents(readLS(keys.students, Array.from({ length: 20 }).map((_, i) => ({ num: i + 1, name: `Student ${i + 1}`, age: "", email: "", instagram: "", status: "Trial", goal: "", level: "", pr[...]
  }, []);

  useEffect(() => writeLS(keys.tutorials, tutorialDone), [tutorialDone]);
  useEffect(() => writeLS(keys.roadmap, roadmapDone), [roadmapDone]);
  useEffect(() => writeLS(keys.dashboard, dash), [dash]);
  useEffect(() => writeLS(keys.students, students), [students]);

  const tutorialProgress = Math.round((Object.values(tutorialDone).filter(Boolean).length / freeTutorials.length) * 100) || 0;
  const programProgress = Math.min(100, Math.round((dash.completedExercises / 30) * 100) || 0);
  const roadmapTotal = Object.values(roadmapData).flat().length;
  const roadmapProgress = Math.round((Object.values(roadmapDone).filter(Boolean).length / roadmapTotal) * 100) || 0;
  const overallProgress = Math.round((tutorialProgress + programProgress + roadmapProgress) / 3) || 0;

  const currentTheme = themes[themeIndex] ?? themes[0];
  const nextTheme = () => {
    const n = (themeIndex + 1) % themes.length;
    setThemeIndex(n);
    applyTheme(themes[n]);
  };
  const coachStudents = useMemo(() => students.map((s) => ({ ...s, program: s.program || "Unassigned" })), [students]);

  return (
    <Layout onThemeNext={nextTheme} currentTheme={currentTheme.name}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorials" element={<TutorialsHub />} />
        <Route
          path="/tutorials/handstand-beginner"
          element={
            <TutorialPage
              tutorialKey="handstand-beginner"
              title="Handstand Beginner Guide"
              summary="Build your handstand base with premium beginner progressions."
            />
          }
        />
        <Route
          path="/tutorials/planche-conditioning"
          element={
            <TutorialPage
              tutorialKey="planche-conditioning"
              title="Planche Conditioning"
              summary="Condition your shoulders, wrists, and core for planche readiness."
            />
          }
        />
        <Route path="/free-tutorials" element={<FreeTutorials done={tutorialDone} toggleTutorial={(t) => setTutorialDone((d) => ({ ...d, [t]: !d[t] }))} />} />
        <Route path="/skill-library" element={<SkillLibrary />} />
        <Route path="/roadmaps" element={<Roadmaps roadmapDone={roadmapDone} toggleRoadmap={(n) => setRoadmapDone((d) => ({ ...d, [n]: !d[n] }))} />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/coaching" element={<Coaching />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/wall-of-fame" element={<WallOfFame />} />
        <Route path="/dashboard" element={<Dashboard dash={dash} setDash={setDash} programProgress={programProgress} overallProgress={overallProgress} />} />
        <Route path="/coach" element={<Coach students={coachStudents} />} />
        <Route path="/students" element={<Students students={students} setStudents={setStudents} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}
