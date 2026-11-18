// ---------- Passport photo check. Made-up rules. It never keeps the photo and cannot judge a face. ----------
var photoToken = 0;
function checkPhoto(file, meta) {
  var tok = ++photoToken;
  state.photo = { status: "checking" };
  updatePhotoUi();
  var fail = function (code) { if (tok === photoToken) { state.photo = { status: "error", reason: code }; finishPhoto(meta); } };
  if (!/^image\//.test(file.type)) { return fail("photoErrType"); }
  if (file.size > 5 * 1024 * 1024) { return fail("photoErrSize"); }
  var limit = new Date(); limit.setMonth(limit.getMonth() - 6);
  if (file.lastModified && file.lastModified < limit.getTime()) { return fail("photoErrOld"); }   // file date stands in for the photo's date tag
  readBackground(file, function (res) {
    if (tok !== photoToken) { return; }
    if (res === "read") { return fail("photoErrRead"); }
    if (res === "notwhite") { return fail("photoErrBg"); }
    state.photo = { status: "ok" };
    finishPhoto(meta);
  });
}
function readBackground(file, cb) {
  var url = URL.createObjectURL(file), img = new Image();
  img.onload = function () {
    try {
      var w = 48, h = 48, c = document.createElement("canvas");
      c.width = w; c.height = h;
      var ctx = c.getContext("2d"); ctx.drawImage(img, 0, 0, w, h);
      var px = ctx.getImageData(0, 0, w, h).data, n = 0, white = 0, edge = 6;
      for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          if (x < edge || x >= w - edge || y < edge) {   // top and sides only, the bottom shows shoulders
            var i = (y * w + x) * 4, r = px[i], g = px[i + 1], b = px[i + 2];
            n++;
            if (r >= 200 && g >= 200 && b >= 200 && Math.max(r, g, b) - Math.min(r, g, b) <= 30) { white++; }
          }
        }
      }
      URL.revokeObjectURL(url);
      cb(white / n >= 0.85 ? "white" : "notwhite");
    } catch (e) { URL.revokeObjectURL(url); cb("read"); }
  };
  img.onerror = function () { URL.revokeObjectURL(url); cb("read"); };
  img.src = url;
}
function onPhotoPick(inp) {
  var f = inp.files && inp.files[0];
  if (!f) { photoToken++; state.photo = { status: "none" }; updatePhotoUi(); return; }
  checkPhoto(f, null);
}
function photoStatusHtml() {
  var p = state.photo;
  if (p.status === "checking") { return '<div class="note">' + esc(t("photoChecking")) + '</div>'; }
  if (p.status === "ok") { return '<div class="note ok"><b class="pass">&#10003;</b> ' + esc(t("photoOk")) + '</div>'; }
  if (p.status === "error") {
    return '<div class="err"><span aria-hidden="true">&#9888; </span>' + esc(t(p.reason)) + '</div>' +
      '<button id="photoTry" onclick="$(\'photoFile\').click()">' + esc(t("photoTry")) + '</button>';
  }
  return "";
}
function updatePhotoUi() {
  var s = $("photoStatus");
  if (s) { s.innerHTML = photoStatusHtml(); }
  var n = $("nextBtn");
  if (n && state.step === 4) { n.disabled = state.photo.status !== "ok"; }
  var w = $("nextWhy");
  if (w) { w.style.display = state.photo.status === "ok" ? "none" : ""; }
}
function finishPhoto(meta) {
  if (meta) { photoChecks.push({ label: meta.label, expectOk: meta.expectOk, ok: state.photo.status === "ok", reason: state.photo.reason || "" }); }
  updatePhotoUi();
  renderTester();
}

