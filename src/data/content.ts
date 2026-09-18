/**
 * Site content.
 *
 * Copy register is set by section 03: strong, focused, raw, disciplined,
 * technical. Explicitly not cheesy and not overly motivational, which rules
 * out most of the vocabulary a gym site normally reaches for. No "crush your
 * goals", no "unleash", no exclamation marks. Short declaratives, specific
 * numbers, and a willingness to say who the place is not for.
 *
 * Lines taken verbatim from the brief are marked.
 */

export const brand = {
  name: "FORGE",
  full: "FORGE Athletics",
  city: "Hyderabad",
  country: "India",
  established: 2018,
  /** From the brief. */
  tagline: "Build what others fear.",
  pillars: ["Strength", "Discipline", "Progress", "Community"],
};

export const hero = {
  eyebrow: "Forge Athletics / Hyderabad",
  /** From the brief, set as three display lines. */
  headline: ["Build", "what others", "fear."],
  /** From the brief. */
  sub: "Strength and performance training for people who refuse to stay average.",
  primary: { label: "Start training", href: "#contact" },
  secondary: { label: "Explore Forge", href: "#facility" },
};

/** The manifesto block. Both display lines are from the brief. */
export const manifesto = {
  kicker: "The mind builds first.",
  lines: ["Your body", "is the project."],
  body: [
    "Most gyms sell comfort. Machines that move for you, mirrors angled to flatter, a playlist loud enough to stop you thinking.",
    "We sell load, technique, and the eighteen months it takes to move properly under it. Nobody here is going to tell you that you are doing great when you are not.",
  ],
  note: "Discipline today. A stronger tomorrow.",
};

export const programs = [
  {
    n: "01",
    name: "Strength",
    summary: "Squat, press, pull, hinge. Linear progression until it stops working, then conjugate.",
    points: [
      "Barbell technique from the floor up",
      "Written programming, reviewed fortnightly",
      "Competition prep for powerlifting",
    ],
    image: "/program-strength.webp",
  },
  {
    n: "02",
    name: "Conditioning",
    summary: "Work capacity built on a heart rate monitor, not on how tired you felt afterwards.",
    points: [
      "Lactate and heart rate testing",
      "Sled, bike, rower and loaded carries",
      "Intervals prescribed by zone, not by feel",
    ],
    image: "/program-conditioning.webp",
  },
  {
    n: "03",
    name: "Performance",
    summary: "For athletes in season. Speed, power output, and staying available to compete.",
    points: [
      "Velocity-based training on the main lifts",
      "Jump and sprint profiling",
      "Return to play written with your physio",
    ],
    image: "/program-performance.webp",
  },
];

/** Specific and odd on purpose. Round numbers read as invented. */
export const stats = [
  { value: 2018, label: "Established", plain: true },
  { value: 412, label: "Members" },
  { value: 7, label: "Coaches" },
  { value: 11400, label: "Square feet" },
];

export const coaches = [
  {
    name: "Arjun Reddy",
    role: "Head of Strength",
    since: 2018,
    credential: "SSC certified, 190kg competition squat",
    philosophy:
      "Most people do not need a harder programme. They need to run an easy one properly for a year.",
    image: "/coach-arjun.webp",
  },
  {
    name: "Nikhita Rao",
    role: "Performance Lead",
    since: 2019,
    credential: "MSc Sport Science, Loughborough",
    philosophy:
      "If we are not testing it, we are guessing. I would rather be corrected by a number than by an injury.",
    image: "/coach-nikhita.webp",
  },
  {
    name: "Imran Sheikh",
    role: "Conditioning",
    since: 2020,
    credential: "Former 800m national qualifier",
    philosophy:
      "Conditioning is not punishment for eating. It is a separate quality and it deserves its own programme.",
    image: "/coach-imran.webp",
  },
  {
    name: "Meera Krishnan",
    role: "Olympic Lifting",
    since: 2021,
    credential: "National referee, Category B",
    philosophy:
      "The snatch takes two years before it feels like anything. People quit at eight months. Do not.",
    image: "/coach-meera.webp",
  },
];

export const facility = [
  { name: "Strength floor", detail: "14 racks, calibrated plates, competition bars", image: "/facility-strength.webp" },
  { name: "Olympic platforms", detail: "6 platforms, bumper sets, jerk blocks", image: "/facility-platforms.webp" },
  { name: "Conditioning", detail: "Assault bikes, ski ergs, 40m turf lane", image: "/facility-conditioning.jpg" },
  { name: "Recovery", detail: "Sauna, cold plunge, soft tissue room", image: "/facility-recovery.jpg" },
  { name: "Changing rooms", detail: "Lockers, showers, towel service", image: "/facility-changing.jpg" },
];

export type ScheduleKind = "Strength" | "Conditioning" | "Performance" | "Open";

export type ScheduleEntry = {
  time: string;
  name: string;
  coach: string;
  kind: ScheduleKind;
};

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const schedule: Record<string, ScheduleEntry[]> = {
  Mon: [
    { time: "06:00", name: "Strength: Lower", coach: "Arjun", kind: "Strength" },
    { time: "07:30", name: "Olympic Technique", coach: "Meera", kind: "Performance" },
    { time: "12:00", name: "Open floor", coach: "Floor coach", kind: "Open" },
    { time: "18:00", name: "Strength: Lower", coach: "Arjun", kind: "Strength" },
    { time: "19:30", name: "Threshold Intervals", coach: "Imran", kind: "Conditioning" },
  ],
  Tue: [
    { time: "06:00", name: "Strength: Upper", coach: "Arjun", kind: "Strength" },
    { time: "07:30", name: "Zone 2 Base", coach: "Imran", kind: "Conditioning" },
    { time: "12:00", name: "Open floor", coach: "Floor coach", kind: "Open" },
    { time: "18:00", name: "Velocity Work", coach: "Nikhita", kind: "Performance" },
    { time: "19:30", name: "Strength: Upper", coach: "Arjun", kind: "Strength" },
  ],
  Wed: [
    { time: "06:00", name: "Olympic Technique", coach: "Meera", kind: "Performance" },
    { time: "07:30", name: "Strength: Lower", coach: "Arjun", kind: "Strength" },
    { time: "12:00", name: "Open floor", coach: "Floor coach", kind: "Open" },
    { time: "18:00", name: "Sled and Carries", coach: "Imran", kind: "Conditioning" },
    { time: "19:30", name: "Strength: Lower", coach: "Arjun", kind: "Strength" },
  ],
  Thu: [
    { time: "06:00", name: "Strength: Upper", coach: "Arjun", kind: "Strength" },
    { time: "07:30", name: "Jump Profiling", coach: "Nikhita", kind: "Performance" },
    { time: "12:00", name: "Open floor", coach: "Floor coach", kind: "Open" },
    { time: "18:00", name: "Strength: Upper", coach: "Arjun", kind: "Strength" },
    { time: "19:30", name: "Zone 2 Base", coach: "Imran", kind: "Conditioning" },
  ],
  Fri: [
    { time: "06:00", name: "Strength: Full", coach: "Arjun", kind: "Strength" },
    { time: "07:30", name: "Snatch and Clean", coach: "Meera", kind: "Performance" },
    { time: "12:00", name: "Open floor", coach: "Floor coach", kind: "Open" },
    { time: "18:00", name: "Strength: Full", coach: "Arjun", kind: "Strength" },
    { time: "19:30", name: "Anaerobic Sets", coach: "Imran", kind: "Conditioning" },
  ],
  Sat: [
    { time: "07:00", name: "Testing Day", coach: "Nikhita", kind: "Performance" },
    { time: "09:00", name: "Olympic Technique", coach: "Meera", kind: "Performance" },
    { time: "10:30", name: "Open floor", coach: "Floor coach", kind: "Open" },
  ],
  Sun: [{ time: "09:00", name: "Open floor", coach: "Floor coach", kind: "Open" }],
};

export const testimonials = [
  {
    quote:
      "I came in squatting 80 and thinking I was strong. Arjun took me back to an empty bar for three weeks. Two years on it is 165 and my back has not hurt once.",
    name: "Rohit Varma",
    detail: "Member since 2021",
  },
  {
    quote:
      "I asked for a harder programme. Nikhita showed me my attendance for the previous eight weeks and said no. She was right and I was annoyed about it for a month.",
    name: "Sneha Iyer",
    detail: "Member since 2022",
  },
  {
    quote:
      "Nobody films here. Nobody is sitting on a rack between sets. It is the least social gym I have trained in and that is exactly why I stayed.",
    name: "Kabir Menon",
    detail: "Member since 2019",
  },
];

export const contact = {
  address: ["Plot 14, Road No. 36", "Jubilee Hills", "Hyderabad 500033", "Telangana"],
  phone: "+91 40 2354 8800",
  email: "train@forgeathletics.in",
  hours: [
    { days: "Monday to Friday", time: "05:30 to 22:00" },
    { days: "Saturday", time: "06:30 to 18:00" },
    { days: "Sunday", time: "08:00 to 14:00" },
  ],
  social: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "YouTube", href: "https://youtube.com" },
  ],
};
