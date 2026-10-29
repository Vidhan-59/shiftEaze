/**
 * Plain-language copy for the Platform sub-sections: a short intro per section
 * plus one carousel card per point. `visual` keys the illustration in
 * MiniVisual. The long-form brief copy still lives in ./platform.ts.
 */

export type PlatformCard = {
  title: string;
  text: string;
  visual: string;
  /** Extra label for visuals that take one (e.g. the call type). */
  label?: string;
};

export const overviewBody =
  "Operators use a simple app for punch-in, leave, helpdesk and their own passbook. Managers run the same operation from a web portal.";

export const rosteringSimple = {
  intro: "Set a shift pattern once, then apply it to any site in a few clicks.",
  closing: "No more date-by-date entry.",
  tag: "Rostering",
  cards: [
    { title: "Drag to build", text: "Drop shift chips into a strip and the calendar fills itself.", visual: "pattern" },
    { title: "Two run modes", text: "Generate once for 30+ days, or auto-repeat until you stop it.", visual: "runmodes" },
    { title: "Your own shift types", text: "Every shift gets its own colour, so new types slot right in.", visual: "shiftmaster" },
    { title: "Shift Extender", text: "Add overtime with a simple slider. Duplicate extensions are blocked.", visual: "extender" },
  ] as PlatformCard[],
};

export const absenceSimple = {
  intro: "Know who is likely to be absent before the shift even starts.",
  tag: "Absence AI",
  cards: [
    { title: "Proven accurate", text: "Tested on two terminals with the same strong result (AUC-ROC 0.87).", visual: "gauge" },
    { title: "Approved leave wins", text: "A confirmed leave always overrides the prediction.", visual: "approved" },
    { title: "Learns from rejected leave", text: "These operators go absent far more often (24.8% vs 5.3%), so the model watches for it.", visual: "rejected" },
    { title: "One-click cover", text: "Press Arrange to see ranked replacement and overtime options.", visual: "arrange" },
  ] as PlatformCard[],
};

export const attendanceSimple = {
  intro: "Every punch is checked against the terminal where it happens.",
  tag: "Attendance",
  cards: [
    { title: "QR gate-pass punch", text: "Punch in and out only works inside that terminal's boundary.", visual: "qr" },
    { title: "Six ways to record", text: "Mobile, QR, kiosk, back-office, approvals and an automatic no-show job.", visual: "sixways" },
    { title: "Live status", text: "Present, on duty, late and absent update the moment someone punches.", visual: "live" },
    { title: "Old data included", text: "Kronos device data is imported, so you see one combined picture.", visual: "legacy" },
  ] as PlatformCard[],
};

export const analyticsSimple = {
  intro: "Four live dashboards give operations, HR and leadership the same picture.",
  tag: "Dashboards",
  cards: [
    { title: "Key numbers", text: "Headcount, present, on leave, absent and overtime at a glance.", visual: "kpi" },
    { title: "Strength vs need", text: "See staffing by designation against what is required.", visual: "bars" },
    { title: "One filter bar", text: "Narrow by terminal, department, batch, designation and time.", visual: "filters" },
    { title: "Export anything", text: "Take any view out of the screen when you need it.", visual: "export" },
  ] as PlatformCard[],
};

export const voiceSimple = {
  intro: "Routine shift calls now go out automatically, in English, Hindi or Gujarati.",
  closing: "Every call outcome is logged against the operator's record.",
  tag: "Voice calls",
  cards: [
    { title: "Shift confirmation", text: "Reminds operators about their upcoming shift.", visual: "call", label: "Shift reminder" },
    { title: "Punch-in reminder", text: "A friendly nudge when it is time to clock in.", visual: "call", label: "Punch in" },
    { title: "Absence risk call", text: "Placed the moment a risk is flagged.", visual: "call", label: "Priority call" },
    { title: "Overtime request", text: "Offers extra shifts to operators who are available.", visual: "call", label: "Overtime?" },
    { title: "Punch-out reminder", text: "Reminds operators to clock out at the end of the shift.", visual: "call", label: "Punch out" },
  ] as PlatformCard[],
};

export const passbookSimple = {
  intro: "One portable worker ID follows each operator across terminals and contractors.",
  tag: "Passbook",
  cards: [
    { title: "Output tracking", text: "Crane moves, moves per hour and Gross Crane Rate for every operator.", visual: "moves" },
    { title: "Clear status", text: "Active, On Notice, Medical Leave and more, always up to date.", visual: "status" },
    { title: "A fair record", text: "Good workers can prove their history, and problem patterns surface early.", visual: "record" },
  ] as PlatformCard[],
};

export const leaveSimple = {
  intro: "Leave goes digital from request to decision, replacing calls and paper registers.",
  tag: "Leave",
  cards: [
    { title: "Live balances", text: "Paid, Sick, Casual and Unpaid balances update instantly.", visual: "balances" },
    { title: "One-tap approvals", text: "Approve or reject from the same queue you manage shifts in.", visual: "approvals" },
    { title: "Smart follow-up", text: "If rejected leave still ends in absence, the AI learns from it.", visual: "followup" },
    { title: "Live breakdowns", text: "By designation, leave type and approval rate.", visual: "breakdown" },
  ] as PlatformCard[],
};

export const securitySimple = {
  intro: "What happens on the floor is recorded once, checked instantly and open to audit.",
  tag: "Security",
  cards: [
    { title: "Geofenced punches", text: "Every punch is validated at the moment it happens.", visual: "geofence" },
    { title: "Signed call results", text: "Call outcomes return through a verified, HMAC-signed webhook.", visual: "webhook" },
    { title: "One audit trail", text: "Attendance, leave approvals and rejection reasons in a single record.", visual: "audit" },
    { title: "Role-based access", text: "Operators, planners, managers and admins see only what they should.", visual: "roles" },
  ] as PlatformCard[],
};
