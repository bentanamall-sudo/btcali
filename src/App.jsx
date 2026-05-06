import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import Layout from "./components/Layout";
import { Button, Card, ImagePlaceholder, VideoPlaceholder } from "./components/UI";
import { applyTheme, getStoredTheme, themes } from "./state/theme";
import { keys, readLS, writeLS } from "./utils/storage";

const freeTutorials = ["Handstand Tutorial", "Kick Up Technique", "Wall Handstand", "Wall Handstand Toe Taps", "Balance Drills"];
const roadmapData = {
  Handstand: ["Wall Handstand", "Kick Up", "Freestanding Hold", "Balance Control", "Handstand Pushup"],
  "Front Lever": ["Tuck Front Lever", "Advanced Tuck", "One Leg Front Lever", "Straddle Front Lever", "Full Front Lever"],
  Planche: ["Frog Stand", "Tuck Planche", "Advanced Tuck", "Straddle Planche", "Full Planche"],
};
const rankTiers = ["Beginner", "Athlete", "Advanced Athlete", "Elite", "Master", "Beast"];
const programs = ["Handstand Pushup Level 1", "Handstand Pushup Level 2", "Handstand Pushup Level 3", "Front Lever Level 1", "Front Lever Level 2", "Planche Level 1", "Planche Level 2", "Muscle Up Level 1", "Bent Arm Press Level 1"];

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
          <Card key={k}><ImagePlaceholder label={`${k} thumbnail`} /><h3 className="mt-3 font-semibold">{k}</h3><p className="text-xs text-[var(--muted)]">Visual progression with locked and completed nodes.</p><Link to="/roadmaps"><Button className="mt-3">View Roadmap</Button></Link></Card>
        ))}
      </section>
      <Card><h3 className="font-semibold">1-on-1 Coaching Preview</h3><p className="mt-2 text-sm text-[var(--muted)]">Personalised programs, form feedback, video uploads, direct support, and group chat access.</p><Link to="/coaching"><Button className="mt-3">Apply for Coaching</Button></Link></Card>
      <Card className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-2xl font-bold">Ready to Train Smarter?</h3><div className="flex gap-2"><Link to="/tutorials"><Button>Start Free</Button></Link><Link to="/checkout"><Button>Unlock Full Access</Button></Link></div></Card>
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
            className="border-[color:rgba(255,255,255,0.14)] bg-[color:rgba(15,20,32,0.68)] shadow-[0_0_28px_rgba(59,130,246,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(59,130,246,0.26)]"
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

function TutorialPage({ title, summary }) {
  return (
    <div className="space-y-4">
      <PageTitle title={title} sub={summary} />
      <Card className="border-[color:rgba(255,255,255,0.14)] bg-[color:rgba(15,20,32,0.68)] backdrop-blur-xl">
        <ImagePlaceholder label={`${title} hero - Replace with your own image`} />
        <p className="mt-4 text-sm text-[var(--muted)]">
          Premium placeholder tutorial page. Add your video modules, coaching cues, and progression checkpoints here.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <VideoPlaceholder label="Replace with your own video" />
          <Card className="bg-[var(--panel)]">
            <h3 className="font-semibold">What You&apos;ll Learn</h3>
            <ul className="mt-2 space-y-1 text-sm text-[var(--muted)]">
              <li>Technique setup and mobility preparation</li>
              <li>Structured progressions with quality standards</li>
              <li>Common faults and correction cues</li>
            </ul>
          </Card>
        </div>
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
  return <div><PageTitle title="Free Tutorials" sub="Free handstand tutorials with real completion tracking." /><div className="grid gap-4 md:grid-cols-2">{freeTutorials.map((t) => <Card key={t}><ImagePlaceholder label={`${t} image placeholder`} /><div className="mt-3"><h3 className="font-semibold">{t}</h3><p className="text-xs text-[var(--muted)]">Technique breakdown for safer and stronger practice.</p></div><div className="mt-3"><VideoPlaceholder label="Replace with your own video" /></div><p className="mt-3 text-xs">Status: <span className={done[t] ? "text-green-400" : "text-[var(--muted)]"}>{done[t] ? "Completed" : "Incomplete"}</span></p><div className="mt-3 flex gap-2"><Button>Watch Tutorial</Button><Button onClick={() => toggleTutorial(t)}>{done[t] ? "Undo Complete" : "Mark as Complete"}</Button></div></Card>)}</div></div>;
}

function SkillLibrary() {
  return <div><PageTitle title="Paid Skill Library" sub="Premium sections with upgrade overlay placeholder." /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{["Front Lever", "Planche", "Muscle Up", "Conditioning", "Bent Arm Press"].map((s) => <Card key={s}><ImagePlaceholder label={`${s} premium image`} /><h3 className="mt-3 font-semibold">{s}</h3><p className="text-xs text-[var(--muted)]">Locked premium section</p><div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-3 text-xs">This section is part of BTCALI Premium.</div><Link to="/checkout"><Button className="mt-3">Unlock Full Access</Button></Link></Card>)}{<Card key="Handstand Push-Up"><ImagePlaceholder label="Handstand Push-Up premium image" /><h3 className="mt-3 font-semibold">Handstand Push-Up</h3><p className="text-xs text-[var(--muted)]">Difficulty: Advanced. Locked premium section. Build vertical pressing strength from pike pushups through scalable progressions toward freestanding HSPU.</p><p className="mt-2 text-xs text-[var(--muted)]">Progression path: Pike Pushups, Elevated Pike Pushups, Wall Handstand Hold, Wall HSPU Negatives, Partial ROM Wall HSPU, L-Sit to Handstand, Full Wall HSPU, Freestanding HSPU</p><div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-3 text-xs">This section is part of BTCALI Premium.</div><Link to="/checkout"><Button className="mt-3">Unlock Full Access</Button></Link></Card>}</div></div>;
}

function Roadmaps({ roadmapDone, toggleRoadmap }) {
  return <div><PageTitle title="Skill Roadmaps" sub="Glowing node progression trees with real completion percentages." /><div className="grid gap-4 lg:grid-cols-3">{Object.entries(roadmapData).map(([name, nodes]) => { const pct = Math.round((nodes.filter((n) => roadmapDone[n]).length / nodes.length) * 100) || 0; return <Card key={name}><h3 className="font-semibold">{name}</h3><p className="text-xs text-[var(--muted)]">Progress: {pct}%</p><div className="mt-2 h-2 rounded-full bg-[var(--panel)]"><div className="h-2 rounded-full bg-[var(--accent)]" style={{ width: `${pct}%` }} /></div><div className="mt-3 space-y-2">{nodes.map((n) => <button key={n} onClick={() => toggleRoadmap(n)} className={`w-full rounded-xl border px-3 py-2 text-left text-xs ${roadmapDone[n] ? "border-green-400 bg-green-500/10" : "border-[var(--border)] bg-[var(--panel)]"}`}>{n} {roadmapDone[n] ? "Completed" : "Locked/Unlocked placeholder"}</button>)}</div></Card>;})}</div></div>;
}

function Programs() {
  return <div><PageTitle title="Programs" sub="Premium program cards with expandable details and placeholders." /><div className="grid gap-4 md:grid-cols-2">{programs.map((p) => <Card key={p}><ImagePlaceholder label={`${p} cover image`} /><h3 className="mt-3 font-semibold">{p}</h3><p className="text-xs text-[var(--muted)]">Requirements, goals, difficulty, duration, cues, mobility, recovery, tracking.</p><VideoPlaceholder label="Program exercise demo video placeholder" /><Link to="/checkout"><Button className="mt-3">Buy</Button></Link></Card>)}</div></div>;
}

function Coaching() {
  return <div className="space-y-4"><PageTitle title="1-on-1 Coaching" sub="Premium coaching offer and application flow." /><Card><ul className="grid gap-2 text-sm text-[var(--muted)]"><li>Personalised programs</li><li>Weekly check-ins</li><li>Video uploads and feedback</li><li>Direct support + group chat access</li></ul><div className="mt-3 flex gap-2"><Button>Apply for Coaching</Button><Button>Unlock Coaching Premium</Button></div></Card><Card><h3 className="font-semibold">Application Form</h3><div className="mt-3 grid gap-2 md:grid-cols-2">{["Name","Email","Instagram","Main Goal","Current Level","Injuries/Limitations"].map((f) => <input key={f} placeholder={f} className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm"/>)}</div><p className="mt-3 text-xs text-[var(--muted)]">Check your Instagram messages after payment. If private account blocks requests, use backup coaching group chat.</p><Button className="mt-3">Join Backup Coaching Group Chat</Button></Card></div>;
}

function Quiz() {
  const [show, setShow] = useState(false);
  return <div><PageTitle title="Find Your Level" /><Card><div className="grid gap-2 md:grid-cols-2">{["Main goal","Pushup max","Pullup max","Pike pushup max","Handstand level","Front lever level","Planche level","Training days/week","Equipment","Injuries","First skill goal"].map((q) => <input key={q} placeholder={q} className="rounded-xl border border-[var(--border)] bg-[var(--panel)] px-3 py-2 text-sm"/>)}</div><Button className="mt-3" onClick={() => setShow(true)}>Submit Quiz</Button></Card>{show && <div className="fixed inset-0 z-40 grid place-items-center bg-black/50 p-4"><Card className="max-w-md bg-[color:rgba(15,20,32,0.85)] backdrop-blur-xl"><h3 className="text-xl font-bold">Diagnosis Complete</h3><p className="mt-2 text-sm text-[var(--muted)]">Your recommended program is ready.</p><p className="mt-2 text-xs">Level: Athlete | Program: Handstand Pushup Level 1 | Reason: Strength + control baseline</p><div className="mt-3 flex gap-2"><Link to="/programs"><Button>View Recommended Program</Button></Link><Link to="/checkout"><Button>Buy Program</Button></Link></div><Button className="mt-3" onClick={() => setShow(false)}>Close</Button></Card></div>}</div>;
}

function WallOfFame() { return <div><PageTitle title="Wall of Fame" /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Card key={i}><ImagePlaceholder label="Before/After image placeholder" /><h3 className="mt-3 font-semibold">Student {i + 1}</h3><p className="text-xs text-[var(--muted)]">Skill achieved, progress story, achievement date.</p><VideoPlaceholder label="Optional transformation video" /></Card>)}</div><Button className="mt-4">Submit Your Progress</Button></div>; }

function Dashboard({ dash, setDash, programProgress, overallProgress }) {
  const [rest, setRest] = useState(60);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running || rest <= 0) return;
    const id = setInterval(() => setRest((v) => v - 1), 1000);
    return () => clearInterval(id);
  }, [running, rest]);
  const rank = calcRank(dash.xp);
  return <div className="space-y-4"><PageTitle title="Student Dashboard" /><div className="grid gap-4 lg:grid-cols-3"><Card className="lg:col-span-2"><h3 className="font-semibold">Today&apos;s Session</h3><div className="mt-3 grid gap-2">{["Pike Pushups", "Wall Handstand Hold", "Hollow Body Hold"].map((e, idx) => <div key={e} className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-3 text-sm"><p>{e} - 3 sets x 8 reps</p><p className="text-xs text-[var(--muted)]">Cues, notes, rest time, upload video placeholder.</p><div className="mt-2 flex gap-2"><Button onClick={() => setDash((d) => ({ ...d, completedExercises: d.completedExercises + 1, xp: d.xp + 20 }))}>Complete Exercise</Button><Button>Upload Video</Button></div></div>)}</div><Button className="mt-3" onClick={() => setDash((d) => ({ ...d, streak: d.streak + 1, xp: d.xp + 80, sessions: d.sessions + 1 }))}>Complete Session</Button></Card><Card><h3 className="font-semibold">Rest Timer</h3><p className="mt-2 text-4xl font-black">{rest}s</p><div className="mt-3 flex gap-2"><Button onClick={() => setRunning(true)}>Start</Button><Button onClick={() => setRunning(false)}>Pause</Button><Button onClick={() => { setRunning(false); setRest(60); }}>Reset</Button></div><div className="mt-3 flex gap-2">{[45,60,90].map((p) => <Button key={p} onClick={() => setRest(p)}>{p}s</Button>)}</div></Card></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><Card><p>Program Progress</p><p className="text-2xl font-bold">{programProgress}%</p></Card><Card><p>Overall Progress</p><p className="text-2xl font-bold">{overallProgress}%</p></Card><Card><p>XP / Rank</p><p className="text-2xl font-bold">{dash.xp} XP</p><p className="text-xs text-[var(--muted)]">{rank}</p></Card><Card><p>Streak</p><p className="text-2xl font-bold">{dash.streak} days</p></Card></div></div>;
}

function Coach({ students }) {
  return <div><PageTitle title="Coach Dashboard" /><Card><p className="mb-3 text-sm text-[var(--muted)]">Student list, status, assigned program, uploads, check-ins.</p><div className="overflow-auto"><table className="w-full text-left text-xs"><thead><tr className="border-b border-[var(--border)]"><th>Name</th><th>Status</th><th>Program</th><th>Progress</th><th>Last Upload</th><th>Last Check-In</th><th>Priority</th><th></th></tr></thead><tbody>{students.slice(0,8).map((s, i) => <tr key={i} className="border-b border-[var(--border)]"><td>{s.name}</td><td>{s.status}</td><td>{s.program}</td><td>{s.progress}%</td><td>{s.lastUpload}</td><td>{s.lastCheckIn}</td><td>{s.priority}</td><td><Link to="/students"><Button className="px-2 py-1 text-xs">Open</Button></Link></td></tr>)}</tbody></table></div><Link to="/students"><Button className="mt-3">Go to Student Management Hub</Button></Link></Card></div>;
}

function Students({ students, setStudents }) {
  const update = (i, k, v) => setStudents((list) => list.map((s, idx) => idx === i ? { ...s, [k]: v } : s));
  const add = () => setStudents((s) => [...s, { num: s.length + 1, name: `Student ${s.length + 1}`, age: "", email: "", instagram: "", status: "Trial", goal: "", level: "", program: "", progress: 0, lastUpload: "-", lastCheckIn: "-", priority: "Normal", notes: "" }]);
  return <div className="space-y-4"><PageTitle title="1-on-1 Coaching Student Hub" sub="Manage students, build programs, track progress, review videos, and update coaching plans." /><div className="flex flex-wrap gap-2"><Button onClick={add}>Add Student</Button><Button onClick={() => writeLS(keys.students, students)}>Save Students</Button><Button onClick={() => localStorage.removeItem(keys.students)}>Reset Demo Data</Button><Button>Export Placeholder</Button></div><Card className="overflow-auto"><table className="w-full min-w-[1200px] text-left text-xs"><thead><tr className="border-b border-[var(--border)]">{["Student Number","Name","Age","Email","Instagram","Status","Main Goal","Current Skill Level","Assigned Program","Progress %","Last Upload","Last Check-In","Priority","Notes","Open Workspace"].map((h) => <th key={h} className="p-2">{h}</th>)}</tr></thead><tbody>{students.map((s, i) => <tr key={i} className="border-b border-[var(--border)]"><td className="p-2">{s.num}</td><td><input value={s.name} onChange={(e) => update(i, "name", e.target.value)} className="field"/></td><td><input value={s.age} onChange={(e) => update(i, "age", e.target.value)} className="field"/></td><td><input value={s.email} onChange={(e) => update(i, "email", e.target.value)} className="field"/></td><td><input value={s.instagram} onChange={(e) => update(i, "instagram", e.target.value)} className="field"/></td><td><select value={s.status} onChange={(e) => update(i, "status", e.target.value)} className="field">{["Active","Trial","Paused","Needs Check-In","Completed"].map((o) => <option key={o}>{o}</option>)}</select></td><td><input value={s.goal} onChange={(e) => update(i, "goal", e.target.value)} className="field"/></td><td><input value={s.level} onChange={(e) => update(i, "level", e.target.value)} className="field"/></td><td><input value={s.program} onChange={(e) => update(i, "program", e.target.value)} className="field"/></td><td><input type="number" min="0" max="100" value={s.progress} onChange={(e) => update(i, "progress", Math.max(0, Math.min(100, Number(e.target.value || 0))))} className="field"/></td><td><input value={s.lastUpload} onChange={(e) => update(i, "lastUpload", e.target.value)} className="field"/></td><td><input value={s.lastCheckIn} onChange={(e) => update(i, "lastCheckIn", e.target.value)} className="field"/></td><td><select value={s.priority} onChange={(e) => update(i, "priority", e.target.value)} className="field">{["Low","Normal","High","Urgent"].map((o) => <option key={o}>{o}</option>)}</select></td><td><input value={s.notes} onChange={(e) => update(i, "notes", e.target.value)} className="field"/></td><td><Button className="px-2 py-1 text-xs">Open Workspace</Button></td></tr>)}</tbody></table></Card><Card><h3 className="font-semibold">Student Workspace (placeholder tabs)</h3><p className="text-xs text-[var(--muted)]">Tabs: Profile, Program Builder, Progress Tracking, Video Uploads, Coach Feedback, Weekly Check-Ins, Private Notes.</p></Card></div>;
}

function Checkout() { return <div className="space-y-4"><PageTitle title="Checkout / Pricing" /><div className="grid gap-4 md:grid-cols-2"><Card><h3 className="font-semibold">BTCALI Full Access</h3><p className="text-sm text-[var(--muted)]">Paid tutorials, programs, progress tracking, skill library.</p><Button className="mt-3">Apple Pay Placeholder</Button><Button className="mt-2">Card Payment Placeholder</Button><Button className="mt-2">Bank Transfer Placeholder</Button></Card><Card><h3 className="font-semibold">BTCALI 1-on-1 Coaching Premium</h3><p className="text-sm text-[var(--muted)]">Full access + personalised programs + video review + support.</p><Button className="mt-3">Apple Pay Placeholder</Button><Button className="mt-2">Card Payment Placeholder</Button><Button className="mt-2">Bank Transfer Placeholder</Button></Card></div><Card><h3 className="font-semibold">Payment Confirmed</h3><p className="text-sm text-[var(--muted)]">Your BTCALI access is ready.</p></Card></div>; }

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
    setStudents(readLS(keys.students, Array.from({ length: 20 }).map((_, i) => ({ num: i + 1, name: `Student ${i + 1}`, age: "", email: "", instagram: "", status: "Trial", goal: "", level: "", program: "", progress: 0, lastUpload: "-", lastCheckIn: "-", priority: "Normal", notes: "" }))));
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
              title="Handstand Beginner Guide"
              summary="Build your handstand base with premium beginner progressions."
            />
          }
        />
        <Route
          path="/tutorials/planche-conditioning"
          element={
            <TutorialPage
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
