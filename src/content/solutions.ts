/** Solutions group copy, verbatim from the restructure brief (section 8). */

export const overviewHeading = "Solutions for every stage of workforce operations";

export const useCasesHeading = "What teams use ShiftEaze for";

export const useCases: { useCase: string; line: string; href: string }[] = [
  { useCase: "Automated Employee Scheduling", line: "Build once, apply everywhere, with no manual date entry.", href: "/platform#ai-rostering-shift-scheduling-software" },
  { useCase: "Rotating Shift Management", line: "Effective Shift Management for DDNNOO and other cycles, with Generate once or Auto-repeat.", href: "/solutions#shift-based-workforce-management" },
  { useCase: "AI Absence Prediction", line: "Risk scores per operator, days before the shift.", href: "/platform#ai-absence-prediction-overtime-backfill" },
  { useCase: "Overtime & Backfill", line: "Ranked replacement candidates in one click.", href: "/solutions#overtime-backfill-management" },
  { useCase: "Geofenced Attendance", line: "Punches accepted only inside the terminal boundary.", href: "/platform#geofenced-employee-attendance-software" },
  { useCase: "Multi-Site Workforce Management", line: "One portal, every terminal, shared filters.", href: "/solutions#multi-site-workforce-management" },
  { useCase: "Workforce Productivity Tracking", line: "Moves, moves-per-hour and GCR per operator.", href: "/platform#workforce-performance-worker-passbook" },
  { useCase: "Real-Time Workforce Visibility", line: "Assigned versus present, live, on the Shift Dashboard.", href: "/platform#workforce-analytics-real-time-dashboards" },
];

/**
 * Each Solutions section publishes the grey Word copy first, then the new
 * blue paragraph after it, as one continuous section (brief §8 Solutions).
 */
export const shiftBased = {
  grey: "ShiftEaze is AI based Shift Management Software that runs 24×7 operations on cycle-based rosters, live attendance and proactive absence handling. Planners get Effective Shift Management without the spreadsheet cycle.",
  blue: "Shift-based operations run in rotations such as Day, Day, Night, Night, Off, Off (DDNNOO), and every rotation has to be planned, confirmed and tracked. In ShiftEaze a planner builds the rotation once and applies it to any terminal, department or batch. Generate once creates a fixed window of at least 30 days, and Auto-repeat keeps generating the next window until a planner stops it. Shift types such as D, GEN, N, Standard 40 hrs/week and WO are configurable, each with its own colour and legend, so new shift types slot in without disruption. Once the shift starts, present, on duty, late and absent are visible the moment a punch happens, and absence risk is scored for every operator and every shift. That is Effective Shift Management for 24×7 operations, without the spreadsheet cycle.",
};

export const multiSite = {
  grey: "See every terminal on one screen, with shared filters that work the same way on every dashboard. ShiftEaze acts as AI Based Time Tracking Software for Multi-Site Workforce teams, so head office and site managers work from the same numbers.",
  blue: "With several terminals to run, ShiftEaze keeps head office and site managers on one source of truth, updated in real time. One portal and four dashboards (Manpower, Shift Attendance, Attendance, and a combined Leave/Helpdesk view) give operations, HR and site leadership the same live picture. KPI cards show active headcount, present today, on leave, absent and OT today, and designation-wise strength is shown against requirement. One filter bar covers terminal, department, batch, designation, work type and timeframe, so a view built for one site works the same way for the next, and anything that needs to leave the screen can be exported. At Mundra Port this approach supports 12+ terminals and divisions, with cycle-based rosters built once and reused across terminals.",
};

export const scheduling = {
  grey: "With AI based Employee Scheduling Software, a cycle is built once and reused across terminals, departments and batches. Risk scores show gaps days ahead, so planners plan cover calmly rather than in a panic at shift start.",
  blue: "Scheduling is optimised in two steps. First, the cycle: planners drag shift chips into a pattern strip and the calendar builds itself, which removes date-by-date entry and keeps cycles consistent across every site. Second, the forecast: the AI Roster Planner scores absence risk for every operator and every shift, using rolling 30-day attendance history, position in the DDNNOO pattern, leave codes and community or festival calendars. A confirmed, approved leave always overrides the model, and the model is tuned to catch the patterns that follow rejected leave. When a gap is flagged, the Arrange button opens a ranked list of available replacement or overtime candidates, so cover is arranged days ahead rather than at the gate.",
};

export const overtime = {
  grey: "When a slot is flagged, ShiftEaze suggests the best available replacement or overtime candidate. Managers approve a backfill in seconds, and the AI can call the operator directly with the OT offer.",
  blue: "Backfill starts the moment a risk is flagged. The AI Roster Planner scores absence risk for every operator and every shift, and the Arrange button opens a ranked list of available replacement or overtime candidates. Where overtime is needed, the Shift Extender lets a planner extend a shift with precise OT timing on a dual-handle slider, with a safeguard against duplicate extensions. AI voice calling can then place the Overtime Request call in the operator's own language (English, Hindi or Gujarati), and each outcome returns through a verified webhook and is logged against the operator's attendance and shift record. OT today appears on the live dashboard, so managers see cover and overtime in one place.",
};

export const payroll = {
  grey: "Geofenced punches, six capture methods and a full audit trail mean fewer attendance and payroll disputes. Attendance is the ground truth for leave, prediction and performance.",
  blue: "Accurate payroll depends on attendance that can be verified. Every punch in ShiftEaze is checked against its own terminal's geofence, and attendance can be captured six ways: mobile check-in, QR scan, kiosk or back-office entry, confirmation approval, regularisation approval and an automated no-show job. Present, on duty, late and absent are visible the moment a punch happens, and Kronos device attendance is imported so terminals mid-migration see one combined picture. Leave is digital too, with Paid, Sick, Casual and Unpaid balances updating immediately, and attendance, leave approvals and rejection reasons sit in a single, auditable record. Because attendance is the ground truth for leave, prediction and performance, fewer disputes reach payroll.",
};

export const managedRostering =
  "Prefer not to build rosters in-house? Our team can set up and manage your rostering cycles on the platform.";

/**
 * Supporting paragraph for Managed Rostering Services. Drafted for review (not from the
 * restructure brief); every claim restates a capability already described in the sections above.
 */
export const managedRosteringDetail =
  "Our team builds your rotation once, such as Day, Day, Night, Night, Off, Off (DDNNOO), and applies it to every terminal, department or batch. Shift types stay configurable, and Generate once or Auto-repeat keeps the next window of at least 30 days ready. Your planners keep the live view: attendance, absence risk and ranked replacement candidates sit on the same dashboards, so cover is arranged days ahead rather than at the gate.";
