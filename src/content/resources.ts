/** Resources copy, verbatim from the restructure brief (section 8). */

export const heading = "Learn from the field: guides for modern workforce operations";
export const intro =
  "Practical guides, checklists and explainers for planners, HR teams and operations heads. Each hub links to its own articles.";

export const topics = [
  {
    name: "Workforce Management",
    description: "Fundamentals for running shift-based operations without spreadsheets.",
    articles: [
      "Workforce management for frontline teams: where to start",
      "Manpower Shift Management for contractors and agencies",
      "Manual vs digital rostering: what it really costs",
    ],
  },
  {
    name: "Shift Scheduling & Rostering",
    description: "Cycle design, shift patterns and overtime planning.",
    articles: [
      "DDNNOO rosters explained: building a rotation once and reusing it",
      "Employee Shift Management: from roster to payroll",
      "Effective Shift Management: habits of planners who never scramble",
      "Rostering Software for Manufacturing Industries: what to look for",
    ],
  },
  {
    name: "AI Workforce Management",
    description: "How prediction and automation work in practice.",
    articles: [
      "How AI predicts absence risk before the shift",
      "Why an approved leave should always override the model",
      "AI voice calling: replacing the supervisor's phone round",
    ],
  },
  {
    name: "Employee Attendance",
    description: "Getting attendance right, because everything else depends on it.",
    articles: [
      "Geofenced attendance: how QR gate-pass punches work",
      "Regularisation and missed punches: a clean process",
      "Moving from legacy biometric devices without a data gap",
    ],
  },
  {
    name: "Workforce Analytics",
    description: "Reading the numbers that matter.",
    articles: [
      "Manpower, attendance and leave dashboards: a reader's guide",
      "Designation-wise strength vs requirement: spotting gaps early",
      "Rejected leave and absence: what the data shows",
    ],
  },
  {
    name: "Port Workforce Management",
    description: "Terminal operations, moves and productivity.",
    articles: [
      "Rostering Software for Ports: what terminals actually need",
      "Crane moves, moves-per-hour and GCR explained",
      "Managing contractors across multiple terminals",
    ],
  },
] as const;

export const featuredGuide =
  "The Shift Planner's Checklist: 10 things to fix before your next roster cycle.";
