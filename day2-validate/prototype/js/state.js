function $(id) { return document.getElementById(id); }
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
function L() { return I18N[state.lang] || I18N.en; }
function t(k, v) {
  var s = L()[k];
  if (s === undefined) { s = I18N.en[k]; }
  if (s === undefined) { s = k; }
  if (v) { for (var x in v) { s = s.split("{" + x + "}").join(v[x]); } }
  return s;
}
function tasksFor(w) { return (L().tasks || I18N.en.tasks)[w]; }

// ---------- State ----------
function blankData() { return { name: "", dob: "", nric: "", passportNo: "", childName: "", childDob: "" }; }

var state = {
  step: 0, who: "", done: {}, helpOpen: {}, stuck: false,
  data: blankData(), ported: blankData(), sp: { status: "idle" }, attempts: 0, retryNote: "",
  step3edits: null, scenario: "ok", recorded: false,
  errors: {}, photo: { status: "none" }, photoNote: false,
  lang: "en", submitted: false,
  savedAt: "", welcome: false, confirmNew: false, saveFailed: false
};
var stuckTimer = null;
var simulateSaveFail = false;   // tester switch: makes saving a draft fail on purpose

// Made-up Singpass test cases. Nobody here is a real person. The NRIC and passport number are made up.
var MADE_UP_PROFILE = { name: "Tan Mei Ling", dob: "1990-03-14", nric: "S0000001A", passportNo: "E0000000X", childName: "Tan Jia Hao", childDob: "2016-09-02" };
var CASES = {
  ok: "Details correct", wrong: "One detail wrong", missing: "Details missing", down: "Singpass unavailable",
  retryDown: "Singpass down, works on retry", retryPartial: "Singpass partial, complete on retry",
  flagged: "Singpass flags applicant (not eligible)"
};

function singpassReturn(c, attempt) {
  var p = blankData(), first = attempt === 0;
  if (c === "down" || (c === "retryDown" && first)) { return { status: "down", data: p }; }
  for (var k in MADE_UP_PROFILE) { p[k] = MADE_UP_PROFILE[k]; }
  if (c === "flagged") { return { status: "flagged", data: p }; }
  if (c === "wrong") { p.name = "Tan Mei Lin"; }
  if (c === "missing" || (c === "retryPartial" && first)) { p.dob = ""; p.childDob = ""; p.passportNo = ""; }
  return { status: "connected", data: p };
}

function relevantFields() {
  return state.who === "child" ? ["childName", "childDob", "name", "nric", "passportNo"] : ["name", "dob", "nric", "passportNo"];
}
function fieldLabel(k) {
  var child = state.who === "child";
  if (k === "name") { return t(child ? "lblParentName" : "lblName"); }
  if (k === "nric") { return t(child ? "lblYourNric" : "lblNric"); }
  if (k === "passportNo") { return t(child ? "lblChildPassport" : "lblPassport"); }
  if (k === "dob") { return t("lblDob"); }
  if (k === "childName") { return t("lblChildName"); }
  return t("lblChildDob");
}
function editedFields() {
  return relevantFields().filter(function (k) { return state.data[k] !== state.ported[k]; });
}
function missingFields() {
  return relevantFields().filter(function (k) { return !state.ported[k]; });
}
function spNote() { return t(state.sp.status === "down" ? "spDown" : "spOk"); }
function singpassNote() {
  if (state.sp.status === "down") { return t("spNoteDown"); }
  var miss = missingFields();
  if (miss.length) { return t("spNoteMissing", { list: miss.map(fieldLabel).join(", ") }); }
  return t("spNoteOk");
}

// ---------- Draft saving. The draft stays in this browser on this device only. The photo is never kept in a draft. ----------
var DRAFT_KEY = "passport-prototype-draft-made-up";
function stepTitle(n) { return [t("whoTitle"), t("readyTitle"), t("detailsTitle"), t("photoTitle"), t("reviewTitle")][n - 1]; }

function readDraft() {
  try {
    var raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}
function persist() {
  try {
    if (simulateSaveFail) { throw new Error("made-up save failure"); }
    var now = new Date();
    localStorage.setItem(DRAFT_KEY, JSON.stringify({
      step: state.step, who: state.who, done: state.done, data: state.data, lang: state.lang, attempts: state.attempts,
      ported: state.ported, sp: state.sp, step3edits: state.step3edits, scenario: state.scenario, recorded: state.recorded,
      savedAt: now.toLocaleString([], { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })
    }));
    state.savedAt = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    state.saveFailed = false;
  } catch (e) { state.saveFailed = true; }
  var el = $("draftStatus");
  if (el) { el.innerHTML = statusText(); }
}
function clearDraft() { try { localStorage.removeItem(DRAFT_KEY); } catch (e) {} }
function statusText() {
  if (state.saveFailed) { return esc(t("saveFailed")) + ' <button class="link" id="trySaveBtn" onclick="saveDraft()">' + esc(t("trySave")) + '</button>'; }
  return state.savedAt ? '<b>' + esc(t("draftSavedLead")) + '</b> ' + esc(t("draftSavedRest", { time: state.savedAt })) : esc(t("progressSaves"));
}
function saveDraft() { saveFields(); persist(); }

