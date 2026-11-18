// ================= Tester view. Not part of the applicant's screens. English only. =================
// Results live in this page only and are never saved or sent.
var results = [];
var photoChecks = [];

// Made-up document quiz. Only used when Singpass connected. Answers stay on this page.
// This list must match day2-validate/context-skill.md (rules 2 and 3, source S1).
var NOT_NEEDED = ["Printed copy of NRIC", "Proof of address", "Marriage certificate", "Printed Singpass summary"];
var DOCS = {
  self: { need: ["Current passport", "Recent photo"], extra: NOT_NEEDED },
  child: { need: ["Child's passport", "Child's birth certificate", "Recent photo of your child", "Your own ID"], extra: NOT_NEEDED }
};
var lastQuiz = null;
var quizPick = {}, quizResults = [];
function quizList() {
  var d = DOCS[state.who || "self"];
  return d.need.concat(d.extra).sort();
}
function pickDoc(name, on) { quizPick[name] = on; }
function recordQuiz() {
  var d = DOCS[state.who || "self"];
  var missed = d.need.filter(function (x) { return !quizPick[x]; }).length;
  var wrong = d.extra.filter(function (x) { return quizPick[x]; }).length;
  quizResults.push({ who: state.who || "self", missed: missed, wrong: wrong, perfect: !missed && !wrong });
  lastQuiz = {
    missed: d.need.filter(function (x) { return !quizPick[x]; }),
    wrong: d.extra.filter(function (x) { return quizPick[x]; })
  };
  quizPick = {};
  renderTester();
}
function clearQuiz() { quizResults = []; quizPick = {}; lastQuiz = null; renderTester(); }
function lastQuizNote() {
  if (!lastQuiz) { return ""; }
  if (!lastQuiz.missed.length && !lastQuiz.wrong.length) { return '<p>Last answer: <span class="pass">exactly right</span>.</p>'; }
  return '<p>Last answer: <span class="fail">not exact</span>.' +
    (lastQuiz.missed.length ? ' Missed: ' + lastQuiz.missed.map(esc).join(", ") + '.' : '') +
    (lastQuiz.wrong.length ? ' Not needed: ' + lastQuiz.wrong.map(esc).join(", ") + '.' : '') + '</p>';
}
function quizSummary() {
  var n = quizResults.length;
  if (!n) { return ""; }
  var ok = quizResults.filter(function (r) { return r.perfect; }).length;
  var pct = Math.round(ok / n * 100);
  return '<p><b>Success signal (picked exactly the needed documents):</b> ' + ok + ' of ' + n + ' = ' + pct + '%. ' +
    (pct >= 90 ? '<span class="pass">Met (90% or more)</span>' : '<span class="fail">Not met</span>') + '</p>' +
    '<p><b>Kill switch (under 70% exactly right):</b> ' + (pct < 70 ? '<span class="fail">TRIGGERED</span>' : '<span class="pass">Not triggered</span>') + '</p>';
}
function renderQuiz() {
  if (state.sp.status !== "connected") { return '<h3>Document check (made up)</h3><p>Sign in with Singpass (a connected case) to use this check.</p>'; }
  var boxes = quizList().map(function (x) {
    return '<label class="choice"><input type="checkbox" ' + (quizPick[x] ? "checked" : "") + ' onchange="pickDoc(this.dataset.n,this.checked)" data-n="' + esc(x) + '"> ' + esc(x) + '</label>';
  }).join("");
  return '<h3>Document check (made up)</h3>' +
    '<p>Singpass has filled in the details. Which documents do you still need to gather?</p>' + boxes +
    '<button id="quizRec" onclick="recordQuiz()">Record answer</button><button id="quizClr" onclick="clearQuiz()">Clear document results</button>' +
    '<p>Answers recorded: ' + quizResults.length + '</p>' + lastQuizNote() + quizSummary() +
    '<p class="hint">Answer key: context-skill.md, rules 2 and 3 (S1). All document names are made up.</p>';
}

// Made-up photos for the photo check. They are drawn on the page and never saved.
var PHOTO_TESTS = { good: ["Good photo", true], blue: ["Blue background", false], old: ["9 months old", false], notimage: ["Not an image", false] };
function makeMadeUpPhoto(kind, cb) {
  if (kind === "notimage") { cb(new File(["not an image (made up)"], "made-up-note.txt", { type: "text/plain" })); return; }
  var c = document.createElement("canvas"); c.width = 200; c.height = 240;
  var x = c.getContext("2d");
  x.fillStyle = kind === "blue" ? "#2f5fb3" : "#ffffff"; x.fillRect(0, 0, 200, 240);
  x.fillStyle = "#c98f65"; x.beginPath(); x.arc(100, 100, 42, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#2b3a55"; x.beginPath(); x.ellipse(100, 250, 72, 70, 0, 0, Math.PI * 2); x.fill();
  c.toBlob(function (b) {
    var when = kind === "old" ? Date.now() - 270 * 86400000 : Date.now();
    cb(new File([b], "made-up-photo-" + kind + ".png", { type: "image/png", lastModified: when }));
  }, "image/png");
}
function testPhoto(kind) {
  makeMadeUpPhoto(kind, function (f) { checkPhoto(f, { label: PHOTO_TESTS[kind][0], expectOk: PHOTO_TESTS[kind][1] }); });
}
function clearPhotoResults() { photoChecks = []; renderTester(); }
function photoSummary() {
  var n = photoChecks.length;
  if (!n) { return ""; }
  var right = photoChecks.filter(function (r) { return r.ok === r.expectOk; }).length;
  var leaked = photoChecks.filter(function (r) { return r.ok && !r.expectOk; }).length;
  var rows = photoChecks.map(function (r) {
    return '<tr><td>' + esc(r.label) + '</td><td>' + (r.ok ? 'Passed' : 'Stopped') + ' (' + (r.ok === r.expectOk ? '<span class="pass">right</span>' : '<span class="fail">wrong</span>') + ')</td></tr>';
  }).join("");
  return '<table>' + rows + '</table><p><b>Photo check (right verdict on made-up photos):</b> ' + right + ' of ' + n + '. ' +
    (right === n ? '<span class="pass">All right</span>' : '<span class="fail">Some wrong</span>') + '</p>' +
    '<p><b>Kill switch (a bad photo gets through):</b> ' + (leaked ? '<span class="fail">TRIGGERED</span>' : '<span class="pass">Not triggered</span>') + '</p>';
}

function setScenario(v) { state.scenario = v; }

function record() {
  if (state.sp.status === "idle" || state.recorded) { return; }
  var needed = relevantFields();
  var portedAll = state.sp.status === "connected" && needed.every(function (k) { return !!state.ported[k]; });
  var edits = state.step3edits === null ? editedFields().length : state.step3edits;
  results.push({ scenario: CASES[state.scenario], connected: state.sp.status === "connected", portedAll: portedAll, edits: edits, retries: state.attempts,
    flagged: state.sp.status === "flagged", stopped: state.sp.status === "flagged" && state.step <= 1 });
  state.recorded = true;
  persist();
  renderTester();
}

function clearResults() { results = []; renderTester(); }

function summary() {
  var all = results.length;
  if (!all) { return ""; }
  var normal = results.filter(function (r) { return !r.flagged; });
  var flagged = results.filter(function (r) { return r.flagged; });
  var out = "";
  var n = normal.length;
  if (n) {
    var ok = normal.filter(function (r) { return r.connected && r.portedAll; }).length;
    var heavy = normal.filter(function (r) { return r.edits >= 2; }).length;
    var pct = Math.round(heavy / n * 100);
    out += '<p><b>Success signal (connects and all fields ported):</b> ' + ok + ' of ' + n + ' tests.</p>' +
      '<p><b>Kill switch (edited at least 2 fields):</b> ' + heavy + ' of ' + n + ' = ' + pct + '%. ' +
      (pct >= 30 ? '<span class="fail">TRIGGERED (30% or more)</span>' : '<span class="pass">Not triggered (under 30%)</span>') + '</p>';
  }
  if (flagged.length) {
    var stopped = flagged.filter(function (r) { return r.stopped; }).length;
    out += '<p><b>Flag check (flagged applicant stopped before the form):</b> ' + stopped + ' of ' + flagged.length + '. ' +
      (stopped === flagged.length ? '<span class="pass">All stopped</span>' : '<span class="fail">Some got through</span>') + '</p>';
  }
  return out + '<p class="hint">Flagged tests are counted separately from the Singpass connection tests.</p>';
}

function renderTester() {
  var box = $("tester");
  if (!box) { return; }
  var ae = document.activeElement, keepId = (ae && box.contains(ae)) ? ae.id : "";
  var opts = "";
  for (var k in CASES) { opts += '<option value="' + k + '"' + (state.scenario === k ? " selected" : "") + '>' + CASES[k] + '</option>'; }
  var rows = results.map(function (r, i) {
    if (r.flagged) {
      return '<tr><td>Test ' + (i + 1) + ': ' + esc(r.scenario) + '</td><td>Stopped before the form: ' + (r.stopped ? '<span class="pass">yes</span>' : '<span class="fail">no</span>') + '.</td></tr>';
    }
    return '<tr><td>Test ' + (i + 1) + ': ' + esc(r.scenario) + '</td><td>Connected: ' + (r.connected ? '<span class="pass">yes</span>' : '<span class="fail">no</span>') +
      '. All fields ported: ' + (r.portedAll ? '<span class="pass">yes</span>' : '<span class="fail">no</span>') + '. Fields edited: ' + r.edits + '. Retries: ' + (r.retries || 0) + '.</td></tr>';
  }).join("");
  var onPhoto = state.step === 4 && !state.submitted && state.sp.status !== "flagged";
  var pbtn = function (kind) { return '<button id="p_' + kind + '" onclick="testPhoto(\'' + kind + '\')"' + (onPhoto ? "" : " disabled") + '>' + PHOTO_TESTS[kind][0] + '</button>'; };
  box.innerHTML = '<h2>Tester view (made up). Not shown to applicants.</h2>' +
    '<div><label for="scenarioSel">Made-up Singpass case for the next sign in: </label><select id="scenarioSel" onchange="setScenario(this.value)">' + opts + '</select></div>' +
    '<div>This test: Singpass <b>' + esc(state.sp.status) + '</b>. Retries used: <b>' + state.attempts + '</b>. Fields edited so far on "Check your details": <b>' + (state.sp.status === "idle" ? 0 : (state.step3edits === null ? editedFields().length : state.step3edits)) + '</b>.</div>' +
    '<div><label><input type="checkbox" id="simFail" onchange="simulateSaveFail=this.checked;persist();renderTester()"' + (simulateSaveFail ? " checked" : "") + '> Make saving a draft fail (made up)</label></div>' +
    '<button id="recBtn" onclick="record()"' + (state.sp.status === "idle" || state.recorded ? " disabled" : "") + '>Record this test</button>' +
    '<button id="clrBtn" onclick="clearResults()">Clear results</button>' +
    (rows ? '<table>' + rows + '</table>' : '<p>No tests recorded yet.</p>') + summary() +
    '<h3>Photo check (made up)</h3>' +
    '<p>' + (onPhoto ? 'Send a made-up photo through the "Add a photo" step:' : 'Go to the "Add a photo" step to use these.') + '</p>' +
    pbtn("good") + pbtn("blue") + pbtn("old") + pbtn("notimage") +
    '<button id="photoClr" onclick="clearPhotoResults()">Clear photo results</button>' + photoSummary() +
    renderQuiz() +
    '<p class="hint">All profiles, photos and numbers here are made up. Results stay on this page and are not saved or sent. Tamil and Hindi wording needs a native speaker to check it before real use.</p>';
  if (keepId && $(keepId)) { $(keepId).focus(); }
}

