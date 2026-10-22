/**
 * Platform group copy, verbatim from the restructure brief (section 8).
 */

export const overview = {
  heading: "One platform, two faces: an operator app and a manager portal",
  intro:
    "ShiftEaze is a single source of truth, updated in real time. Whatever an operator taps in the app, the planner sees on the portal instantly.",
  body: "ShiftEaze is built for large frontline teams. Operators get a simple app for punch-in, leave, helpdesk and their own performance passbook. Managers and admins run the same operation from a web portal.",
};

export const rostering = {
  intro: "Build a rotation once (Day, Day, Night, Night, Off, Off) and apply it to any terminal, department or batch in a few clicks.",
  bullets: [
    { lead: "Drag-to-build patterns:", text: "planners drag shift chips into a pattern strip and the calendar builds itself." },
    { lead: "Two run modes:", text: "Generate once creates a fixed window of at least 30 days, and Auto-repeat keeps generating the next window until a planner stops it." },
    { lead: "Configurable Shift Master:", text: "shift types such as D, GEN, N, Standard 40 hrs/week and WO each carry their own colour and legend, so new shift types slot in without disruption." },
    { lead: "Shift Extender:", text: "extend a shift with precise OT timing on a dual-handle slider, with a safeguard against duplicate extensions." },
  ],
  closing: "This is AI Rostering that removes date-by-date entry and keeps cycles consistent across every site.",
};

export const absence = {
  intro: "The AI Roster Planner scores absence risk for every operator and every shift. It uses rolling 30-day attendance history, position in the DDNNOO pattern, leave codes and community or festival calendars.",
  bullets: [
    { lead: "Validated:", text: "AUC-ROC of 0.8668 on its home terminal, and the same 0.8668 on a second terminal." },
    { lead: "Respects approvals:", text: "a confirmed, approved leave always overrides the model." },
    { lead: "Learns from rejected leave:", text: "operators whose leave was rejected go absent 24.8% of the time, against a 5.3% baseline, a 4.6× uplift the model is tuned to catch." },
    { lead: "One-click cover:", text: "the “Arrange” button opens a ranked list of available replacement or overtime candidates." },
  ],
};

export const attendance = {
  intro: "Every punch is tied to a place, not just a person. Because it works as AI Based Time Tracking Software for Multi-Site Workforce operations, each punch is checked against its own terminal's boundary.",
  bullets: [
    { lead: "QR gate-pass punch in/out:", text: "accepted only inside that terminal's geofence." },
    { lead: "Six ways to capture attendance:", text: "mobile check-in, QR scan, kiosk or back-office entry, confirmation approval, regularisation approval and an automated no-show job." },
    { lead: "Live updates:", text: "present, on duty, late and absent are visible the moment a punch happens." },
    { lead: "Legacy data included:", text: "Kronos device attendance is imported, so terminals mid-migration see one combined picture." },
  ],
};

export const analytics = {
  intro: "Four dashboards (Manpower, Shift Attendance, Attendance, and a combined Leave/Helpdesk view) give operations, HR and site leadership the same live picture.",
  bullets: [
    { text: "KPI cards for active headcount, present today, on leave, absent and OT today" },
    { text: "Designation-wise strength versus requirement, plus grade distribution" },
    { text: "One filter bar for terminal, department, batch, designation, work type and timeframe" },
    { text: "Export for anything that needs to leave the screen" },
  ],
};

export const voice = {
  intro: "The calls a supervisor used to make by hand are now placed automatically, in the operator's own language (English, Hindi or Gujarati). The scripts were drafted from real supervisor conversations.",
  bullets: [
    { text: "Shift Confirmation Reminder" },
    { text: "Punch-In Reminder" },
    { text: "Absence Prediction Priority Call, fired the moment a risk is flagged" },
    { text: "Overtime Request" },
    { text: "Punch-Out Reminder" },
  ],
  closing: "Each outcome returns through a verified webhook and is logged against the operator's attendance and shift record.",
};

export const passbook = {
  intro: "Every MOVE, attendance record and punctuality signal is tied to one portable worker ID (the RGID) that travels across terminals and contractors.",
  bullets: [
    { lead: "Output tracking:", text: "crane moves, moves-per-hour and Gross Crane Rate (GCR) per operator." },
    { lead: "Clear employee status:", text: "Active, Absconded, Not Reported, Terminated, On Notice Period, or Medical Leave." },
    { lead: "A fair record:", text: "disciplined workers can prove their history, and patterns of problems are flagged early." },
  ],
};

/**
 * New copy (brief §8 Platform › Employee Leave Management Software): the Word
 * copy here is bullets only, so the blue paragraph is published first.
 */
export const leave = {
  blueIntro:
    "Leave is handled digitally from request to outcome, replacing phone calls and paper leave registers. Operators request leave in the app, planners decide from the same queue they manage shifts from, and the outcome feeds back into the AI Roster Planner.",
  bullets: [
    { lead: "Digital requests, live balances:", text: "Paid, Sick, Casual and Unpaid balances update immediately." },
    { lead: "One-tap approvals:", text: "planners approve or reject from the same queue they manage shifts from." },
    { lead: "Automatic rejection follow-up:", text: "did the operator come to work or go absent anyway? That outcome feeds back into the AI Roster Planner." },
    { lead: "Live breakdowns:", text: "by designation, leave type and approval rate, filterable by terminal, department, batch and date range." },
  ],
};

/**
 * New copy (brief §8 Platform › Built to be trusted with your workforce
 * data): blue paragraph first, then the grey Word bullets.
 */
export const security = {
  heading: "Built to be trusted with your workforce data",
  blueIntro:
    "ShiftEaze is built so that what happens on the floor is recorded once, checked at the moment it happens and open to audit later. These are the controls behind that.",
  bullets: [
    { text: "Attendance validated against terminal geofences at the moment of every punch" },
    { text: "Call outcomes returned through a verified, HMAC-signed webhook" },
    { text: "A single, auditable record for attendance, leave approvals and rejection reasons" },
    { text: "Role-based access for operators, planners, managers and admins" },
  ],
};

/** Shown under the end-of-page Request a Demo button on every Platform page. */
export const seeOnYourOwnRoster = "See the platform on your own roster.";
