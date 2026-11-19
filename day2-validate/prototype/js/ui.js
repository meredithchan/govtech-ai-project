// ---------- Page chrome and language ----------
function applyChrome() {
  document.documentElement.lang = HTML_LANG[state.lang];
  $("banner").textContent = t("banner");
  $("siteTitle").textContent = t("siteTitle");
  $("siteSub").textContent = t("siteSub");
  $("skipLink").textContent = t("skip");
  $("langLbl").textContent = t("langLabel");
  $("side").setAttribute("aria-label", t("exampleTitle"));
  var opts = "";
  for (var k in LANGS) { opts += '<option value="' + k + '" lang="' + HTML_LANG[k] + '"' + (state.lang === k ? " selected" : "") + '>' + LANGS[k] + '</option>'; }
  $("langSel").innerHTML = opts;
}
function setLang(v) {
  saveFields();
  state.lang = v;
  applyChrome();
  closeExample();
  if (state.welcome) { renderWelcome(); } else { render(); }
  if (state.step > 0) { persist(); }
}
function setTitle(txt) { document.title = txt + " - " + t("siteTitle") + " (prototype, made-up data)"; }
function focusHeading() {
  var h = document.querySelector("#main h1");
  if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
}
function focusId(id) { var e = $(id); if (e) { e.focus(); } }

// ---------- Examples open in the side panel so the form is not interrupted ----------
var exOpener = "";
function exampleHtml(key) {
  var eg = function (v, extra) { return '<div class="eg"><b>' + esc(t("madeUpEg")) + '</b><br>' + v + (extra ? '<br>' + esc(extra) : '') + '</div>'; };
  if (key === "name" || key === "parentName") { return eg("Tan Mei Ling"); }
  if (key === "dob") { return eg("14 / 03 / 1990"); }
  if (key === "nric") { return eg("S0000001A", t("notReal")); }
  if (key === "passportNo") { return eg("E0000000X", t("notReal")); }
  if (key === "childName") { return eg("Tan Jia Hao"); }
  if (key === "childDob") { return eg("02 / 09 / 2016"); }
  return '<span class="photo good"><b>' + esc(t("photoGood")) + '</b><br>' + esc(t("photoGoodTxt")) + '</span>' +
    '<span class="photo bad"><b>' + esc(t("photoBad")) + '</b><br>' + esc(t("photoBadTxt")) + '</span><p class="hint">' + esc(t("photoMadeUp")) + '</p>';
}
function showExample(key, openerId) {
  exOpener = openerId || "";
  $("side").className = "open";
  $("side").innerHTML = "<b>" + esc(t("exampleTitle")) + "</b>" + exampleHtml(key) +
    '<button id="exClose" onclick="closeExample(true)">' + esc(t("close")) + '</button>';
  focusId("exClose");
}
function closeExample(restore) {
  $("side").className = ""; $("side").innerHTML = "";
  if (restore && exOpener) { focusId(exOpener); }
  exOpener = "";
}
function exLink(key) {
  var id = "eg_" + key;
  return '<button class="link" id="' + id + '" onclick="showExample(\'' + key + '\',\'' + id + '\')">' + esc(t("seeExample")) + '</button>';
}

// ---------- Building blocks ----------
function head(title) {
  setTitle(title);
  return '<div class="progress" id="progressLbl">' + esc(t("stepOf", { n: state.step, total: TOTAL })) + '</div>' +
    '<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + TOTAL + '" aria-valuenow="' + state.step + '" aria-labelledby="progressLbl"><div style="width:' + (state.step / TOTAL * 100) + '%"></div></div>' +
    '<h1 id="pageTitle" tabindex="-1">' + esc(title) + '</h1>';
}
function nav(showBack, nextDisabled, why) {
  return (why && nextDisabled ? '<p class="hint" id="nextWhy">' + esc(why) + '</p>' : '') +
    (showBack ? '<button onclick="go(-1)">' + esc(t("back")) + '</button>' : '') +
    '<button class="primary" id="nextBtn" onclick="go(1)"' + (nextDisabled ? ' disabled' + (why ? ' aria-describedby="nextWhy"' : '') : "") + '>' + esc(t("next")) + '</button>' +
    '<button onclick="saveDraft()">' + esc(t("saveDraft")) + '</button>';
}
function footer() { return '<p class="made-up">' + esc(t("madeUpFoot")) + '</p>'; }
function todayStr() {
  var n = new Date(), p = function (x) { return (x < 10 ? "0" : "") + x; };
  return n.getFullYear() + "-" + p(n.getMonth() + 1) + "-" + p(n.getDate());
}

function fieldRow(key, type, withEg) {
  var id = "f_" + key, err = state.errors[key];
  return '<div class="frow"><label class="f" for="' + id + '">' + esc(fieldLabel(key)) + '</label>' + (withEg ? exLink(key) : "") + '</div>' +
    '<input type="' + type + '" id="' + id + '" value="' + esc(state.data[key]) + '" autocomplete="off"' +
    (type === "date" ? ' max="' + todayStr() + '"' : "") +
    (err ? ' aria-invalid="true" aria-describedby="e_' + key + '"' : "") + '>' +
    (err ? '<div class="err" id="e_' + key + '"><span aria-hidden="true">&#9888; </span>' + esc(t(err)) + '</div>' : "");
}
function errSummaryHtml() {
  var keys = Object.keys(state.errors);
  if (!keys.length) { return ""; }
  return '<div class="errsum" id="errSum" tabindex="-1">' + esc(t("errSummary")) + '<ul>' +
    keys.map(function (k) { return '<li><a href="#f_' + k + '">' + esc(fieldLabel(k)) + '</a></li>'; }).join("") + '</ul></div>';
}

function saveFields() {
  ["name", "dob", "nric", "passportNo", "childName", "childDob"].forEach(function (k) {
    var el = $("f_" + k);
    if (el) { state.data[k] = el.value; }
  });
}

// Field rules (all made up). Letters are made upper case for the two number fields.
function validPastDate(v) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) { return false; }
  var d = new Date(v + "T00:00:00Z");
  return !isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v && v <= todayStr() && v >= "1900-01-01";
}
function validate() {
  var errs = {}, d = state.data;
  relevantFields().forEach(function (k) {
    var v = String(d[k] || "").trim();
    if (k === "nric" || k === "passportNo") { v = v.toUpperCase(); }
    d[k] = v;
    if (!v) { errs[k] = "errRequired"; return; }
    if ((k === "name" || k === "childName") && !NAME_RE.test(v)) { errs[k] = "errName"; }
    else if ((k === "dob" || k === "childDob") && !validPastDate(v)) { errs[k] = "errDate"; }
    else if (k === "nric" && !NRIC_RE.test(v)) { errs[k] = "errNric"; }
    else if (k === "passportNo" && !PASS_RE.test(v)) { errs[k] = "errPassport"; }
  });
  return errs;
}

function go(d) {
  saveFields();
  if (d === 1 && state.step === 3) {
    var errs = validate();
    if (Object.keys(errs).length) { state.errors = errs; render(); focusId("errSum"); return; }
    state.errors = {};
  }
  if (d === 1 && state.step === 4 && state.photo.status !== "ok") { return; }
  if (state.step === 3 && d === 1) { state.step3edits = editedFields().length; }
  if (state.step === 4) { state.photoNote = false; }
  state.step += d;
  state.errors = {};
  closeExample();
  clearTimeout(stuckTimer);
  persist();
  render();
  focusHeading();
}

function setWho(w) {
  if (state.who !== w) { state.done = {}; state.helpOpen = {}; state.stuck = false; }
  state.who = w;
  $("nextBtn").disabled = false;
  persist();
}

function toggleDone(i) { state.done[i] = !state.done[i]; persist(); render(); focusId("done_" + i); }
function toggleHelp(i) { state.helpOpen[i] = !state.helpOpen[i]; render(); focusId("help_" + i); }

function doneCount() {
  var list = tasksFor(state.who) || [], n = 0;
  for (var i = 0; i < list.length; i++) { if (state.done[i]) { n++; } }
  return n;
}

