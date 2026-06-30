"use client";

import { useState, useEffect } from "react";
import {
  CalendarDays,
  Sliders,
  Wrench,
  Users,
  Lightbulb,
  Award,
  ClipboardCheck,
  Calculator,
  Mail,
  Clock,
  Sparkles,
  Presentation,
  HelpCircle,
  Trophy,
  CheckCircle2,
  ChevronRight,
  Hourglass,
  Megaphone,
  Search,
} from "lucide-react";
import { motion } from "motion/react";

// Images are served statically from /public/images
const logoUrl = "/images/science_council_logo_1782262205490.png";
const registrationQrUrl = "/images/registration_form_QR.png";
const pitchSubmissionQrUrl = "/images/Pitch_submission_form_QR.png";

interface Milestone {
  name: string;
  date: Date;
  dateStr: string;
}

export default function Home() {
  // Milestones
  const milestones: Milestone[] = [
    {
      name: "Round 1: Registration & Initial Pitch",
      date: new Date("2026-07-20T23:59:59"),
      dateStr: "25th June - 20th July",
    },
    {
      name: "Proposal Evaluation Phase",
      date: new Date("2026-07-26T23:59:59"),
      dateStr: "20th July - 26th July",
    },
    {
      name: "Top 8 Teams Announcement",
      date: new Date("2026-07-31T23:59:59"),
      dateStr: "27th July - 31st July",
    },
    {
      name: "Round 2: Prototype Exhibition",
      date: new Date("2026-09-02T08:30:00"),
      dateStr: "2nd September",
    },
    {
      name: "Round 3: Grand Pitch Finale",
      date: new Date("2026-10-26T10:00:00"),
      dateStr: "October 26th (Tentative)",
    },
  ];

  // Active milestone and countdown state
  const [activeMilestone, setActiveMilestone] = useState<Milestone | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  // Avoid hydration mismatch: render zeros first on the server, compute on the client.
  const [mounted, setMounted] = useState(false);

  // Calculate countdown
  useEffect(() => {
    setMounted(true);
    const runCountdown = () => {
      const now = new Date();
      let target: Milestone | null = null;

      // Find the closest future milestone
      for (let i = 0; i < milestones.length; i++) {
        if (milestones[i].date > now) {
          target = milestones[i];
          break;
        }
      }

      setActiveMilestone(target);

      if (!target) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const diff = target.date.getTime() - now.getTime();

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    };

    runCountdown();
    const interval = setInterval(runCountdown, 1000);
    return () => clearInterval(interval);
    // milestones is a stable literal; disable exhaustive-deps for this port.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Checklist state
  const [checklist, setChecklist] = useState([
    {
      id: 1,
      text: "Form Your Dream Team",
      desc: "Assemble exactly 4 students from Taylor's International School KL.",
      checked: false,
    },
    {
      id: 2,
      text: "Problem Identification",
      desc: "Brainstorm and research a major global or school-wide problem.",
      checked: false,
    },
    {
      id: 3,
      text: "Draft Proposal Pitch",
      desc: "Describe the core innovation and fill out the Google Form.",
      checked: false,
    },
    {
      id: 4,
      text: "Design & Prototype",
      desc: "Manufacture your digital or physical setup during holidays.",
      checked: false,
    },
  ]);

  const toggleChecklist = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const checkedCount = checklist.filter((item) => item.checked).length;
  const progressPercent = Math.round((checkedCount / checklist.length) * 100);

  // Rubric Calculator State
  const [quality, setQuality] = useState(5);
  const [practical, setPractical] = useState(5);
  const [sustain, setSustain] = useState(5);
  const [cost, setCost] = useState(5);

  const totalSum = quality + practical + sustain + cost;
  const rubricPercentage = Math.round((totalSum / 40) * 100);

  const getRubricLabel = (percent: number) => {
    if (percent >= 85) return "🌟 Excellent Presentation-Ready Prototype!";
    if (percent >= 70) return "✅ High potential - polish details to secure victory";
    if (percent >= 50) return "🔧 Standard build - focus on practicality";
    return "⚠️ Early Phase - iterate with team for higher score";
  };

  // Timeline active selection/highlighting
  const [selectedTimelineRound, setSelectedTimelineRound] = useState<
    number | null
  >(null);

  // Smooth-scroll the page down to the timeline section.
  const scrollToTimeline = () => {
    const el = document.getElementById("timeline-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#f9fbf9] text-gray-800 antialiased min-h-screen flex flex-col justify-between font-sans">
      {/* ========== HERO / LANDING ========== */}
      <header className="relative bg-gradient-to-br from-[#1C3D2B] via-[#2C5E43] to-emerald-950 text-white overflow-hidden px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Abstract background geometric accents */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-[#76B095] blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-emerald-400 blur-3xl"></div>
        </div>

        {/* Top nav row: logo + quick jumps */}
        <div className="relative z-20 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Science Council Taylor's International School KL Logo"
              className="h-16 sm:h-20 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="flex items-center gap-2">
            <a
              href="#timeline-section"
              className="px-4 py-2 rounded-full text-sm font-semibold text-[#2C5E43] bg-[#EAF2EE] hover:bg-[#76B095] hover:text-white transition-all duration-200 flex items-center gap-1.5"
            >
              <CalendarDays className="w-4 h-4" /> Challenge Timeline
            </a>
            <a
              href="#interactive-hub"
              className="px-4 py-2 rounded-full text-sm font-semibold text-emerald-50 bg-white/10 border border-white/10 hover:bg-[#2C5E43] hover:text-white transition-all duration-200 flex items-center gap-1.5"
            >
              <Sliders className="w-4 h-4" /> Project Toolkit
            </a>
          </div>
        </div>

        {/* Hero content */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#76B095]/20 text-[#76B095] border border-[#76B095]/30 uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#76B095] animate-ping"></span>{" "}
            Annual Science &amp; Innovation Challenge
          </motion.span>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 font-sans">
            From Vision to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76B095] to-emerald-300">
              Reality
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed font-light mb-8">
            Formulate, design, and pitch your innovative solutions. Follow our
            three-phase path to turn your scientific theories into real-world
            impact.
          </p>

          {/* Open Timeline button -> smooth scroll to timeline section */}
          <button
            onClick={scrollToTimeline}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#1C3D2B] bg-[#76B095] hover:bg-emerald-300 transition-colors shadow-lg mb-12"
          >
            <CalendarDays className="w-4 h-4" /> Open Timeline
          </button>

          {/* Live Countdown Timer */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-xl mx-auto shadow-2xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#76B095] mb-3 flex items-center justify-center gap-1.5">
              <Clock className="w-4 h-4" /> Countdown to Next Milestone
            </h2>
            <div className="text-sm font-semibold text-white/90 mb-4">
              {mounted && activeMilestone ? (
                <span>
                  Next Milestone:{" "}
                  <span className="text-[#76B095] font-bold">
                    {activeMilestone.name}
                  </span>{" "}
                  on{" "}
                  {activeMilestone.date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              ) : mounted && !activeMilestone ? (
                <span className="flex items-center justify-center gap-1 text-[#76B095]">
                  <CheckCircle2 className="w-4 h-4" /> All 2026 milestone rounds
                  completed successfully!
                </span>
              ) : (
                <span className="text-white/70">Loading countdown…</span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {timeLeft.days}
                </div>
                <div className="text-[10px] text-[#76B095] font-semibold uppercase tracking-wider mt-1">
                  Days
                </div>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {timeLeft.hours}
                </div>
                <div className="text-[10px] text-[#76B095] font-semibold uppercase tracking-wider mt-1">
                  Hours
                </div>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {timeLeft.minutes}
                </div>
                <div className="text-[10px] text-[#76B095] font-semibold uppercase tracking-wider mt-1">
                  Mins
                </div>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {timeLeft.seconds}
                </div>
                <div className="text-[10px] text-[#76B095] font-semibold uppercase tracking-wider mt-1">
                  Secs
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        {/* SECTION: Forms & Submissions Hub */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-[#2C5E43] font-bold text-2xl sm:text-3xl font-sans">
              Official Participation Portals
            </h3>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto text-sm sm:text-base">
              Team leaders, please fill in both forms below before the deadline
              to complete your participation requirements.
            </p>
            <div className="w-16 h-1.5 bg-[#76B095] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Registration Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm hover:shadow-md hover:border-[#76B095]/40 transition-all duration-200 flex flex-col sm:flex-row items-center sm:items-start gap-6"
            >
              <div className="w-36 h-36 bg-white border border-gray-100 p-2 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={registrationQrUrl}
                  alt="Registration Form QR Code"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow text-center sm:text-left flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF2EE] text-[#2C5E43]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                      Active
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                      Until 20th July
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      Team Leaders
                    </span>
                  </div>
                  <h4 className="font-bold text-lg text-[#2C5E43] mb-1.5">
                    1. Registration Form
                  </h4>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Form your team of 4 members and register. Team leaders,
                    please fill in the registration form below or scan the QR
                    code.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeayM5k1chgR9pp4EjjBl8gr70pWFGttIEDZXEtWkFMN6ZNQg/viewform?usp=publish-editor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2C5E43] hover:bg-[#1C3D2B] px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm"
                  >
                    Open Registration Form{" "}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Pitch Submission Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm hover:shadow-md hover:border-[#76B095]/40 transition-all duration-200 flex flex-col sm:flex-row items-center sm:items-start gap-6"
            >
              <div className="w-36 h-36 bg-white border border-gray-100 p-2 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pitchSubmissionQrUrl}
                  alt="Pitch Submission Form QR Code"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow text-center sm:text-left flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF2EE] text-[#2C5E43]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                      Active
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                      Until 20th July
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      Team Leaders
                    </span>
                  </div>
                  <h4 className="font-bold text-lg text-[#2C5E43] mb-1.5">
                    2. Pitch Submission Form
                  </h4>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    For previously formed teams of 4 to propose their identified
                    problem, solution, and other details in a Google form. Team
                    leaders, please fill in the Google form by scanning the QR
                    code.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScM8drlOHmM9F0ye_LQNKuWeUQ86PLSKUcntUh_q9J0iNjNBQ/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#2C5E43] hover:bg-[#1C3D2B] px-4 py-2.5 rounded-xl transition-all duration-150 shadow-sm"
                  >
                    Open Pitch Submission Form{" "}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 1: Interactive Timeline */}
        <section id="timeline-section" className="scroll-mt-24 mb-24">
          <div className="text-center mb-16">
            <h3 className="text-[#2C5E43] font-bold text-3xl sm:text-4xl">
              The Challenge Pathway
            </h3>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              Track key dates, team configurations, and deliverable targets for
              each stage of the competition. Click a round below to highlight.
            </p>
            <div className="w-16 h-1.5 bg-[#76B095] mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Timeline Diagram Container */}
          <div className="relative">
            {/* Vertical Line (Desktop only) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#76B095] via-[#2C5E43] to-[#1C3D2B] rounded-full"></div>

            {/* Round 1 Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() =>
                setSelectedTimelineRound(
                  selectedTimelineRound === 1 ? null : 1
                )
              }
              className={`relative flex flex-col md:flex-row items-stretch mb-12 md:mb-16 md:even:flex-row-reverse group cursor-pointer transition-all duration-300 ${
                selectedTimelineRound === 1
                  ? "scale-[1.02]"
                  : "opacity-95 hover:opacity-100"
              }`}
            >
              {/* Date Column (Desktop: left/right matching) */}
              <div className="w-full md:w-1/2 pr-0 md:pr-12 md:group-even:pl-12 md:group-even:pr-0 flex justify-end md:group-even:justify-start items-center">
                <div
                  className={`bg-[#EAF2EE] border rounded-2xl p-6 w-full max-w-md transition-all duration-300 shadow-sm ${
                    selectedTimelineRound === 1
                      ? "border-[#76B095] ring-2 ring-[#76B095]/30 shadow-md"
                      : "border-[#76B095]/30 hover:border-[#76B095] hover:shadow-md"
                  }`}
                >
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C5E43] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#76B095]/20 mb-3">
                    <CalendarDays className="w-3.5 h-3.5 text-[#2C5E43]" /> 25th
                    June - 20th July
                  </span>
                  <h4 className="text-xl font-bold text-[#2C5E43] mb-2 flex items-center gap-2">
                    Round 1: Registration &amp; Initial Pitch
                    {selectedTimelineRound === 1 && (
                      <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                    )}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Register your team, secure your participants, and design
                    your initial idea proposal to kickstart your project.
                  </p>
                  <div className="space-y-2 bg-white/70 p-3 rounded-lg border border-[#EAF2EE] text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#2C5E43]" />
                      <span>
                        <strong>Team Size:</strong> Exactly 4 participants
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-[#76B095]" />
                      <span>
                        <strong>Submit:</strong> Google Forms Brief Pitch
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Badge Icon */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 z-10 font-bold text-lg shadow-md ${
                  selectedTimelineRound === 1
                    ? "bg-[#76B095] border-white text-white scale-110"
                    : "bg-white border-[#76B095] text-[#2C5E43] group-hover:scale-110"
                }`}
              >
                1
              </div>

              {/* Right Column Detail Callout (Desktop) */}
              <div className="w-full md:w-1/2 pl-0 md:pl-12 md:group-even:pr-12 md:group-even:pl-0 mt-4 md:mt-0 flex items-center">
                <div
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 w-full max-w-md ${
                    selectedTimelineRound === 1
                      ? "border-[#76B095]/60 shadow-md bg-emerald-50/10"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  <h5 className="font-bold text-sm uppercase tracking-wider text-[#2C5E43] mb-3 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-[#76B095]" /> Pitch Focus
                  </h5>
                  <p className="text-gray-600 text-sm">
                    You must clearly identify a real-world problem and design a
                    unique, scientific, or technological solution. Focus on
                    defining the impact of your solution.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phase 1.5: Proposal Evaluation Phase */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() =>
                setSelectedTimelineRound(
                  selectedTimelineRound === 11 ? null : 11
                )
              }
              className={`relative flex flex-col md:flex-row-reverse items-stretch mb-12 md:mb-16 group cursor-pointer transition-all duration-300 ${
                selectedTimelineRound === 11
                  ? "scale-[1.02]"
                  : "opacity-95 hover:opacity-100"
              }`}
            >
              {/* Date Column (Desktop: Right matching) */}
              <div className="w-full md:w-1/2 pl-0 md:pl-12 flex justify-start items-center">
                <div
                  className={`bg-[#EAF2EE] border rounded-2xl p-6 w-full max-w-md transition-all duration-300 shadow-sm ${
                    selectedTimelineRound === 11
                      ? "border-[#76B095] ring-2 ring-[#76B095]/30 shadow-md"
                      : "border-[#76B095]/30 hover:border-[#76B095] hover:shadow-md"
                  }`}
                >
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C5E43] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#76B095]/20 mb-3">
                    <CalendarDays className="w-3.5 h-3.5 text-[#2C5E43]" /> 20th
                    July - 26th July
                  </span>
                  <h4 className="text-xl font-bold text-[#2C5E43] mb-2 flex items-center gap-2">
                    Proposal Evaluation Phase
                    {selectedTimelineRound === 11 && (
                      <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                    )}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    The registration portal closes, and the Science Council
                    begins reviewing all team submissions. Judges will assess
                    each proposal based on feasibility, creativity, and
                    scientific rigor.
                  </p>
                  <div className="space-y-2 bg-white/70 p-3 rounded-lg border border-[#EAF2EE] text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Hourglass className="w-4 h-4 text-[#2C5E43]" />
                      <span>
                        <strong>Status:</strong> Registration Closed
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#76B095]" />
                      <span>
                        <strong>Process:</strong> Proposal Evaluation
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Badge Icon */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 z-10 font-bold text-lg shadow-md ${
                  selectedTimelineRound === 11
                    ? "bg-[#76B095] border-white text-white scale-110"
                    : "bg-white border-[#76B095] text-[#2C5E43] group-hover:scale-110"
                }`}
              >
                <Hourglass className="w-4 h-4" />
              </div>

              {/* Right Column Detail Callout (Desktop: Left) */}
              <div className="w-full md:w-1/2 pr-0 md:pr-12 mt-4 md:mt-0 flex items-center justify-end">
                <div
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 w-full max-w-md ${
                    selectedTimelineRound === 11
                      ? "border-[#76B095]/60 shadow-md bg-emerald-50/10"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  <h5 className="font-bold text-sm uppercase tracking-wider text-[#2C5E43] mb-3 flex items-center gap-1.5">
                    <ClipboardCheck className="w-4 h-4 text-[#76B095]" /> Review
                    Process
                  </h5>
                  <p className="text-gray-600 text-sm">
                    Our expert panel of science teachers and advisors will
                    evaluate every submitted Google Form to identify the most
                    promising innovations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Phase 1.8: Announcement of Top 8 Teams */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() =>
                setSelectedTimelineRound(
                  selectedTimelineRound === 12 ? null : 12
                )
              }
              className={`relative flex flex-col md:flex-row items-stretch mb-12 md:mb-16 group cursor-pointer transition-all duration-300 ${
                selectedTimelineRound === 12
                  ? "scale-[1.02]"
                  : "opacity-95 hover:opacity-100"
              }`}
            >
              {/* Date Column (Desktop: Left matching) */}
              <div className="w-full md:w-1/2 pr-0 md:pr-12 flex justify-end items-center">
                <div
                  className={`bg-[#EAF2EE] border rounded-2xl p-6 w-full max-w-md transition-all duration-300 shadow-sm ${
                    selectedTimelineRound === 12
                      ? "border-[#76B095] ring-2 ring-[#76B095]/30 shadow-md"
                      : "border-[#76B095]/30 hover:border-[#76B095] hover:shadow-md"
                  }`}
                >
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C5E43] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#76B095]/20 mb-3">
                    <CalendarDays className="w-3.5 h-3.5 text-[#2C5E43]" /> 27th
                    July - 31st July
                  </span>
                  <h4 className="text-xl font-bold text-[#2C5E43] mb-2 flex items-center gap-2">
                    Top 8 Teams Announcement
                    {selectedTimelineRound === 12 && (
                      <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                    )}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    The evaluation results are officially published! The top 8
                    teams are selected to advance to the prototype phase and
                    will receive guidelines for their project construction.
                  </p>
                  <div className="space-y-2 bg-white/70 p-3 rounded-lg border border-[#EAF2EE] text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-[#2C5E43]" />
                      <span>
                        <strong>Announcement:</strong> The top 8 teams advance
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[#76B095]" />
                      <span>
                        <strong>Outcome:</strong> Shortlisted for Round 2
                        Exhibition
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Badge Icon */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 z-10 font-bold text-lg shadow-md ${
                  selectedTimelineRound === 12
                    ? "bg-[#76B095] border-white text-white scale-110"
                    : "bg-white border-[#76B095] text-[#2C5E43] group-hover:scale-110"
                }`}
              >
                <Megaphone className="w-4 h-4" />
              </div>

              {/* Right Column Detail Callout (Desktop: Right) */}
              <div className="w-full md:w-1/2 pl-0 md:pl-12 mt-4 md:mt-0 flex items-center">
                <div
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 w-full max-w-md ${
                    selectedTimelineRound === 12
                      ? "border-[#76B095]/60 shadow-md bg-emerald-50/10"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  <h5 className="font-bold text-sm uppercase tracking-wider text-[#2C5E43] mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#76B095]" /> Next Steps
                  </h5>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    All teams will receive an email announcing whether they have
                    been selected or not. Shortlisted teams will begin
                    constructing their prototypes during the school holidays,
                    and their notification email will include detailed marking
                    criteria and project guidelines.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Round 2 Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() =>
                setSelectedTimelineRound(
                  selectedTimelineRound === 2 ? null : 2
                )
              }
              className={`relative flex flex-col md:flex-row-reverse items-stretch mb-12 md:mb-16 group cursor-pointer transition-all duration-300 ${
                selectedTimelineRound === 2
                  ? "scale-[1.02]"
                  : "opacity-95 hover:opacity-100"
              }`}
            >
              {/* Date Column (Desktop: left/right matching) */}
              <div className="w-full md:w-1/2 pl-0 md:pl-12 flex justify-start items-center">
                <div
                  className={`bg-[#EAF2EE] border rounded-2xl p-6 w-full max-w-md transition-all duration-300 shadow-sm ${
                    selectedTimelineRound === 2
                      ? "border-[#76B095] ring-2 ring-[#76B095]/30 shadow-md"
                      : "border-[#76B095]/30 hover:border-[#76B095] hover:shadow-md"
                  }`}
                >
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C5E43] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#76B095]/20 mb-3">
                    <CalendarDays className="w-3.5 h-3.5 text-[#2C5E43]" /> 2nd
                    September
                  </span>
                  <h4 className="text-xl font-bold text-[#2C5E43] mb-2 flex items-center gap-2">
                    Round 2: Prototype Exhibition
                    {selectedTimelineRound === 2 && (
                      <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                    )}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Bring your designs to life during the school holidays.
                    Prepare a dynamic physical or digital working prototype to
                    show the judges.
                  </p>
                  <div className="space-y-2 bg-white/70 p-3 rounded-lg border border-[#EAF2EE] text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-[#2C5E43]" />
                      <span>
                        <strong>Medium:</strong> Digital or physical prototype
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Presentation className="w-4 h-4 text-[#76B095]" />
                      <span>
                        <strong>Format:</strong> Booth-style exhibition
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Badge Icon */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 z-10 font-bold text-lg shadow-md ${
                  selectedTimelineRound === 2
                    ? "bg-[#2C5E43] border-white text-white scale-110"
                    : "bg-white border-[#2C5E43] text-[#2C5E43] group-hover:scale-110"
                }`}
              >
                2
              </div>

              {/* Right Column Detail Callout (Desktop) */}
              <div className="w-full md:w-1/2 pr-0 md:pr-12 mt-4 md:mt-0 flex items-center justify-end">
                <div
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 w-full max-w-md ${
                    selectedTimelineRound === 2
                      ? "border-[#76B095]/60 shadow-md bg-emerald-50/10"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  <h5 className="font-bold text-sm uppercase tracking-wider text-[#2C5E43] mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#76B095]" /> Evaluation
                    Rubric
                  </h5>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#76B095]" />{" "}
                      Innovation &amp; Quality
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#76B095]" />{" "}
                      Practicality &amp; Usability
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#76B095]" />{" "}
                      Sustainability &amp; Materials
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#76B095]" />{" "}
                      Cost-Effectiveness
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Round 3 Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={() =>
                setSelectedTimelineRound(
                  selectedTimelineRound === 3 ? null : 3
                )
              }
              className={`relative flex flex-col md:flex-row items-stretch mb-12 md:mb-16 group cursor-pointer transition-all duration-300 ${
                selectedTimelineRound === 3
                  ? "scale-[1.02]"
                  : "opacity-95 hover:opacity-100"
              }`}
            >
              {/* Date Column (Desktop: left/right matching) */}
              <div className="w-full md:w-1/2 pr-0 md:pr-12 flex justify-end items-center">
                <div
                  className={`bg-[#EAF2EE] border rounded-2xl p-6 w-full max-w-md transition-all duration-300 shadow-sm ${
                    selectedTimelineRound === 3
                      ? "border-[#76B095] ring-2 ring-[#76B095]/30 shadow-md"
                      : "border-[#76B095]/30 hover:border-[#76B095] hover:shadow-md"
                  }`}
                >
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2C5E43] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#76B095]/20 mb-3">
                    <CalendarDays className="w-3.5 h-3.5 text-[#2C5E43]" />{" "}
                    October 26th (Tentative)
                  </span>
                  <h4 className="text-xl font-bold text-[#2C5E43] mb-2 flex items-center gap-2">
                    Round 3: Grand Pitch Finale
                    {selectedTimelineRound === 3 && (
                      <Sparkles className="w-5 h-5 text-[#D4AF37] animate-pulse" />
                    )}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    The ultimate test. Showcase your project to the entire
                    school and survive high-pressure questioning from expert
                    judges.
                  </p>
                  <div className="space-y-2 bg-white/70 p-3 rounded-lg border border-[#EAF2EE] text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Presentation className="w-4 h-4 text-[#2C5E43]" />
                      <span>
                        <strong>Stage:</strong> Assembly Hall Presentation
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#76B095]" />
                      <span>
                        <strong>Focus:</strong> Detailed Prototype Q&amp;A
                        Defenses
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Badge Icon */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 z-10 font-bold text-lg shadow-md ${
                  selectedTimelineRound === 3
                    ? "bg-[#1C3D2B] border-white text-white scale-110"
                    : "bg-white border-[#1C3D2B] text-[#2C5E43] group-hover:scale-110"
                }`}
              >
                3
              </div>

              {/* Right Column Detail Callout (Desktop) */}
              <div className="w-full md:w-1/2 pl-0 md:pl-12 mt-4 md:mt-0 flex items-center">
                <div
                  className={`bg-white rounded-2xl p-6 border transition-all duration-300 w-full max-w-md ${
                    selectedTimelineRound === 3
                      ? "border-[#76B095]/60 shadow-md bg-emerald-50/10"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  <h5 className="font-bold text-sm uppercase tracking-wider text-[#2C5E43] mb-3 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-[#76B095]" /> Glory &amp;
                    Recognition
                  </h5>
                  <p className="text-gray-600 text-sm">
                    Finalist teams present in front of teachers and peers.
                    Winning teams will receive Hampers, Medals, and
                    Certification of participation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Interactive Hub */}
        <section
          id="interactive-hub"
          className="scroll-mt-24 border-t border-[#EAF2EE] pt-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-[#2C5E43] font-bold text-3xl font-sans">
              Project Toolkit
            </h3>
            <p className="text-gray-500 mt-2">
              Tools designed to help you prepare your entry and estimate your
              scores.
            </p>
            <div className="w-16 h-1.5 bg-[#76B095] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Toolkit Sub-component A: Interactive Team Checklist */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2EE] flex items-center justify-center text-[#2C5E43]">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-[#2C5E43]">
                      Team Milestones Checklist
                    </h4>
                    <p className="text-xs text-gray-400">
                      Complete these actions to perfect your competition entry
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {checklist.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all duration-150 cursor-pointer group ${
                        item.checked
                          ? "border-[#76B095]/30 bg-[#EAF2EE]/20"
                          : "border-gray-100 hover:border-[#EAF2EE] hover:bg-[#EAF2EE]/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleChecklist(item.id)}
                        className="w-5 h-5 rounded text-[#2C5E43] focus:ring-[#76B095] border-gray-300 mt-0.5 accent-[#2C5E43]"
                      />
                      <div className="flex-grow">
                        <span
                          className={`block text-sm font-semibold transition-colors ${
                            item.checked
                              ? "text-[#2C5E43] line-through"
                              : "text-gray-700 group-hover:text-[#2C5E43]"
                          }`}
                        >
                          {item.text}
                        </span>
                        <span className="block text-xs text-gray-400">
                          {item.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Progress Indicator Bar */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C5E43]">
                    Your Readiness
                  </span>
                  <span className="text-xs font-extrabold text-[#76B095]">
                    {progressPercent}% Completed
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#76B095] h-full rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Toolkit Sub-component B: Interactive Self-Assessment Rubric Calculator */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#EAF2EE] flex items-center justify-center text-[#2C5E43]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-[#2C5E43]">
                    Prototype Rubric Calculator
                  </h4>
                  <p className="text-xs text-gray-400">
                    Score your project (1-10) to see where you stand.
                  </p>
                </div>
              </div>

              {/* Slider 1 */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <label
                    className="text-xs font-bold text-gray-700"
                    htmlFor="range-quality"
                  >
                    Innovation &amp; Quality
                  </label>
                  <span className="text-xs font-bold text-[#2C5E43] bg-[#EAF2EE] px-2 py-0.5 rounded">
                    {quality}/10
                  </span>
                </div>
                <input
                  type="range"
                  id="range-quality"
                  min="1"
                  max="10"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2C5E43]"
                />
              </div>

              {/* Slider 2 */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <label
                    className="text-xs font-bold text-gray-700"
                    htmlFor="range-practical"
                  >
                    Practicality / Usability
                  </label>
                  <span className="text-xs font-bold text-[#2C5E43] bg-[#EAF2EE] px-2 py-0.5 rounded">
                    {practical}/10
                  </span>
                </div>
                <input
                  type="range"
                  id="range-practical"
                  min="1"
                  max="10"
                  value={practical}
                  onChange={(e) => setPractical(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2C5E43]"
                />
              </div>

              {/* Slider 3 */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-1">
                  <label
                    className="text-xs font-bold text-gray-700"
                    htmlFor="range-sustain"
                  >
                    Sustainability
                  </label>
                  <span className="text-xs font-bold text-[#2C5E43] bg-[#EAF2EE] px-2 py-0.5 rounded">
                    {sustain}/10
                  </span>
                </div>
                <input
                  type="range"
                  id="range-sustain"
                  min="1"
                  max="10"
                  value={sustain}
                  onChange={(e) => setSustain(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2C5E43]"
                />
              </div>

              {/* Slider 4 */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <label
                    className="text-xs font-bold text-gray-700"
                    htmlFor="range-cost"
                  >
                    Cost-Effectiveness
                  </label>
                  <span className="text-xs font-bold text-[#2C5E43] bg-[#EAF2EE] px-2 py-0.5 rounded">
                    {cost}/10
                  </span>
                </div>
                <input
                  type="range"
                  id="range-cost"
                  min="1"
                  max="10"
                  value={cost}
                  onChange={(e) => setCost(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2C5E43]"
                />
              </div>

              {/* Total Score Display */}
              <div className="p-4 bg-[#EAF2EE]/50 border border-[#EAF2EE] rounded-2xl flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-bold uppercase text-[#2C5E43] tracking-widest">
                    Calculated Readiness Grade
                  </span>
                  <span className="text-sm font-bold text-[#1C3D2B]">
                    {getRubricLabel(rubricPercentage)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-[#2C5E43]">
                    {rubricPercentage}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1C3D2B] text-white pt-12 pb-8 border-t-4 border-[#76B095]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/10 text-sm">
            {/* Info block A */}
            <div>
              <h5 className="font-bold text-[#76B095] uppercase tracking-wider mb-3">
                Science Council KL
              </h5>
              <p className="text-emerald-100/70 leading-relaxed">
                Leading the frontier of young scientific discovery, creation,
                and problem solving at Taylor&apos;s International School Kuala
                Lumpur.
              </p>
            </div>
            {/* Info block B */}
            <div>
              <h5 className="font-bold text-[#76B095] uppercase tracking-wider mb-3">
                Participation Rules
              </h5>
              <ul className="space-y-2 text-emerald-100/70">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76B095]" /> Every team
                  must have 4 members.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76B095]" />{" "}
                  Prototypes can be digital or physical.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#76B095]" /> All
                  pitches require submission by the deadline.
                </li>
              </ul>
            </div>
            {/* Info block C */}
            <div>
              <h5 className="font-bold text-[#76B095] uppercase tracking-wider mb-3">
                Need Assistance?
              </h5>
              <p className="text-emerald-100/70 leading-relaxed mb-3">
                Contact Dhiya (Student Leader) or the Science Council
                teachers-in-charge (Ms Nuris or Mr Silvaraj) for guidelines.
              </p>
              <a
                href="mailto:kl3798@kl.student.tis.edu.my"
                className="inline-flex items-center gap-2 text-white bg-[#76B095]/20 hover:bg-[#76B095]/40 px-4 py-2 rounded-lg transition-all border border-[#76B095]/40"
              >
                <Mail className="w-4 h-4" /> Contact Dhiya
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-100/50">
            <p>
              &copy; 2026 Science Council - Taylor&apos;s International School
              KL. All rights reserved.
            </p>
            <p className="mt-2 sm:mt-0">
              Designed &amp; Developed with Academic Excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
