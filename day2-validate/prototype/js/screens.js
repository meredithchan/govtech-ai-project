// ---------- Screens ----------
function render() {
  var m = $("main"), h = "";
  if (state.submitted) { renderSubmitted(); return; }

  if (state.sp.status === "flagged" && state.step > 0) {
    setTitle(t("flagTitle"));
    m.innerHTML = '<h1 id="pageTitle" tabindex="-1">' + esc(t("flagTitle")) + '</h1>' +
      '<div class="note"><b>' + esc(t("flagLead")) + '</b> ' + esc(t("flagText")) + '</div>' +
      '<p>' + esc(t("flagP1")) + '</p><p>' + esc(t("flagP2")) + '</p>' +
      '<button class="primary" onclick="startNew()">' + esc(t("flagBack")) + '</button>' + footer();
    renderTester();
    return;
  }

  if (state.step === 0) {
    setTitle(t("signInTitle"));
    h = '<h1 id="pageTitle" tabindex="-1">' + esc(t("signInTitle")) + '</h1>' +
      '<p>' + esc(t("signInText")) + '</p>' +
      '<button class="primary" id="spBtn" onclick="connect()">' + esc(t("signInBtn")) + '</button>';

  } else if (state.step === 1) {
    h = head(t("whoTitle")) +
      '<div role="radiogroup" aria-labelledby="pageTitle">' +
      '<label class="choice"><input type="radio" name="who" ' + (state.who === "self" ? "checked" : "") + ' onclick="setWho(\'self\')"> ' + esc(t("whoSelf")) + '</label>' +
      '<label class="choice"><input type="radio" name="who" ' + (state.who === "child" ? "checked" : "") + ' onclick="setWho(\'child\')"> ' + esc(t("whoChild")) + '<div class="sub">' + esc(t("whoChildSub")) + '</div></label>' +
      '</div><div class="note">' + esc(spNote()) + '</div>' +
      nav(false, !state.who);

  } else if (state.step === 2) {
    var list = tasksFor(state.who), total = list.length, n = doneCount(), cards = "";
    list.forEach(function (x, i) {
      var isDone = !!state.done[i], open = !!state.helpOpen[i], act = t(isDone ? "undo" : "done");
      cards += '<li class="stepcard' + (isDone ? " done" : "") + '">' +
        '<div class="num" aria-hidden="true">' + (isDone ? "&#10003;" : (i + 1)) + '</div>' +
        '<div class="body"><span class="t">' + esc(x[0]) + '</span>' + (isDone ? '<span class="sr"> (' + esc(t("done")) + ')</span>' : "") +
        '<button class="link" id="help_' + i + '" aria-expanded="' + open + '" onclick="toggleHelp(' + i + ')">' + esc(t("needHelp")) + '</button>' +
        (open ? '<div class="help">' + esc(x[1]) + '</div>' : "") + '</div>' +
        '<button id="done_' + i + '" aria-label="' + esc(act + ": " + x[0]) + '" onclick="toggleDone(' + i + ')">' + esc(act) + '</button></li>';
    });
    h = head(t("readyTitle")) +
      '<ol class="path">' + cards + '</ol>' +
      '<div class="count">' + esc(t("countDone", { n: n, total: total })) + '</div>' +
      '<div id="stuckArea" role="status">' + (state.who === "child" && state.stuck ? '<div class="note">' + esc(t("stuck")) + '</div>' : "") + '</div>' +
      nav(true, n < total, t("nextWhy2"));
    clearTimeout(stuckTimer);
    if (state.who === "child" && !state.stuck) {
      stuckTimer = setTimeout(function () {
        state.stuck = true;
        var a = $("stuckArea");
        if (state.step === 2 && a) { a.innerHTML = '<div class="note">' + esc(t("stuck")) + '</div>'; }
      }, 15000);
    }

  } else if (state.step === 3) {
    var keys = state.who === "child" ? ["childName", "childDob", "name", "nric", "passportNo"] : ["name", "dob", "nric", "passportNo"];
    var fields = keys.map(function (k) { return fieldRow(k, (k === "dob" || k === "childDob") ? "date" : "text", true); }).join("");
    var canRetry = state.sp.status === "down" || missingFields().length > 0;
    h = head(t("detailsTitle")) + errSummaryHtml() +
      '<div class="note" id="spNote">' + esc(singpassNote()) + '</div>' +
      (canRetry ? '<button id="retryBtn" onclick="retrySingpass()">' + esc(t("retryBtn")) + '</button>' : "") +
      (state.retryNote ? '<div class="note" id="retryNote" role="status" tabindex="-1">' + esc(t(state.retryNote)) + '</div>' : "") +
      fields + nav(true, false);

  } else if (state.step === 4) {
    var ok = state.photo.status === "ok";
    h = head(t("photoTitle")) +
      (state.photoNote ? '<div class="note">' + esc(t("resumePhoto")) + '</div>' : "") +
      '<div class="frow"><label class="f" for="photoFile">' + esc(t("photoPick")) + '</label>' + exLink("photo") + '</div>' +
      '<input type="file" id="photoFile" accept="image/jpeg,image/png,image/heic,image/heif,.jpg,.jpeg,.png,.heic,.heif" onchange="onPhotoPick(this)">' +
      '<p class="hint">' + esc(t("photoHint")) + ' ' + esc(t("photoLimit")) + '</p>' +
      '<div id="photoStatus" role="status" aria-live="polite">' + photoStatusHtml() + '</div>' +
      '<p class="hint" id="nextWhy"' + (ok ? ' style="display:none"' : "") + '>' + esc(t("photoWhy")) + '</p>' +
      '<button onclick="go(-1)">' + esc(t("back")) + '</button>' +
      '<button class="primary" id="nextBtn" onclick="go(1)"' + (ok ? "" : ' disabled aria-describedby="nextWhy"') + '>' + esc(t("next")) + '</button>' +
      '<button onclick="saveDraft()">' + esc(t("saveDraft")) + '</button>';

  } else {
    var c = state.who === "child";
    var rk = c ? ["childName", "childDob", "name", "nric", "passportNo"] : ["name", "dob", "nric", "passportNo"];
    h = head(t("reviewTitle")) + errSummaryHtml() +
      '<p>' + esc(t("reviewIntro")) + '</p>' +
      rk.map(function (k) { return fieldRow(k, (k === "dob" || k === "childDob") ? "date" : "text", false); }).join("") +
      '<p><b class="pass" aria-hidden="true">&#10003;</b> ' + esc(t("photoReview")) + '</p>' +
      '<div class="note"><b>' + esc(t("notApprovalB")) + '</b><br>' + esc(t("notApprovalT")) + '</div>' +
      '<button onclick="go(-1)">' + esc(t("back")) + '</button><button class="primary" onclick="submitForm()">' + esc(t("submit")) + '</button>' +
      '<button onclick="saveDraft()">' + esc(t("saveDraft")) + '</button>';
  }
  m.innerHTML = (state.step === 0 ? "" : '<div class="draft" id="draftStatus" role="status">' + statusText() + '</div>') + h + footer();
  renderTester();
}

function connect() {
  var r = singpassReturn(state.scenario, 0);
  state.sp = { status: r.status };
  state.ported = r.data;
  state.data = blankData();
  for (var k in r.data) { state.data[k] = r.data[k]; }
  state.attempts = 0; state.retryNote = "";
  state.errors = {}; state.photo = { status: "none" }; state.photoNote = false;
  state.step3edits = null;
  state.recorded = false;
  quizPick = {};
  state.step = 1;
  persist();
  render();
  focusHeading();
}

// Try Singpass again. Anything the applicant typed is kept.
function retrySingpass() {
  saveFields();
  state.attempts++;
  var r = singpassReturn(state.scenario, state.attempts), merged = blankData();
  for (var k in merged) {
    var typed = state.data[k];
    merged[k] = (typed && typed !== state.ported[k]) ? typed : r.data[k];
  }
  state.sp = { status: r.status };
  state.ported = r.data;
  state.data = merged;
  state.step3edits = null;
  if (r.status === "down") { state.retryNote = "retryFailed"; }
  else if (missingFields().length) { state.retryNote = "retryStillMissing"; }
  else { state.retryNote = "retryWorked"; }
  persist();
  render();
  focusId("retryNote");
}

function submitForm() {
  saveFields();
  var errs = validate();
  if (Object.keys(errs).length) { state.errors = errs; render(); focusId("errSum"); return; }
  state.errors = {};
  finish();
}
function finish() {
  saveFields();
  clearDraft();
  state.submitted = true;
  record();
  renderSubmitted();
  focusHeading();
}
function renderSubmitted() {
  setTitle(t("subTitle"));
  $("main").innerHTML = '<h1 id="pageTitle" tabindex="-1">' + esc(t("subTitle")) + '</h1>' +
    '<div class="note">' + esc(t("subNote")) + '</div>' +
    '<p>' + esc(t("subEnd")) + '</p>' +
    '<button class="primary" onclick="startNew()">' + esc(t("subAgain")) + '</button>' + footer();
  renderTester();
}

// ---------- Welcome back (saved draft) ----------
function renderWelcome() {
  var dr = readDraft();
  var m = $("main");
  var stepNo = dr ? Math.min(Math.max(dr.step, 1), TOTAL) : 1;
  var stepName = dr && dr.step === 0 ? t("signInTitle") : stepTitle(stepNo);
  setTitle(t("welcomeTitle"));
  var h = '<h1 id="pageTitle" tabindex="-1">' + esc(t("welcomeTitle")) + '</h1>' +
    '<p>' + esc(t("welcomeSaved")) + '</p>' +
    '<div class="welcome-meta"><b>' + esc(t("lastSaved")) + '</b> ' + esc(dr ? dr.savedAt : "") + '<br><b>' + esc(t("youWereOn")) + '</b> ' +
    (dr && dr.step === 0 ? esc(stepName) : esc(t("stepOf", { n: stepNo, total: TOTAL })) + ', ' + esc(stepName)) + '</div>';
  if (state.confirmNew) {
    h += '<div class="note">' + esc(t("delNote")) + '</div>' +
      '<button class="primary" onclick="startNew()">' + esc(t("delYes")) + '</button>' +
      '<button onclick="state.confirmNew=false;renderWelcome()">' + esc(t("delKeep")) + '</button>';
  } else {
    h += '<button class="primary" id="resumeBtn" onclick="resumeDraft()">' + esc(t("continueBtn")) + '</button>' +
      '<button onclick="state.confirmNew=true;renderWelcome()">' + esc(t("newBtn")) + '</button>';
  }
  m.innerHTML = h + footer();
  renderTester();
}

function resumeDraft() {
  var dr = readDraft();
  if (dr) {
    state.step = Math.min(Math.max(dr.step, 0), TOTAL);
    state.who = dr.who || "";
    state.done = dr.done || {};
    for (var k in dr.data) { if (state.data.hasOwnProperty(k)) { state.data[k] = dr.data[k]; } }
    if (dr.ported) { for (var j in dr.ported) { if (state.ported.hasOwnProperty(j)) { state.ported[j] = dr.ported[j]; } } }
    state.sp = dr.sp || { status: "idle" };
    state.step3edits = typeof dr.step3edits === "number" ? dr.step3edits : null;
    state.scenario = dr.scenario || "ok";
    state.recorded = !!dr.recorded;
    state.attempts = dr.attempts || 0;
    if (dr.lang && LANGS[dr.lang]) { state.lang = dr.lang; applyChrome(); }
    state.savedAt = "";
    state.photo = { status: "none" };
    if (state.step >= TOTAL) { state.step = 4; state.photoNote = true; }   // the photo is never saved, so ask for it again
  }
  state.welcome = false;
  render();
  focusHeading();
}

// The sign in step stays out of drafts until Singpass has connected.
function startNew() {
  clearDraft();
  clearTimeout(stuckTimer);
  state.welcome = false; state.confirmNew = false; state.submitted = false; state.step = 0; state.who = ""; state.done = {}; state.helpOpen = {}; state.stuck = false;
  state.data = blankData(); state.ported = blankData(); state.sp = { status: "idle" }; state.step3edits = null; state.recorded = false;
  state.attempts = 0; state.retryNote = ""; state.errors = {}; state.photo = { status: "none" }; state.photoNote = false; state.savedAt = "";
  render();
  focusHeading();
}

// Save typed changes as the applicant types, so nothing is lost. A field's error clears when the applicant edits it.
$("main").addEventListener("input", function (e) {
  if (e.target && e.target.id && e.target.id.indexOf("f_") === 0) {
    var key = e.target.id.slice(2);
    if (state.errors[key]) {
      delete state.errors[key];
      var er = $("e_" + key);
      if (er) { er.remove(); }
      e.target.removeAttribute("aria-invalid"); e.target.removeAttribute("aria-describedby");
    }
    saveFields(); persist();
  }
});

