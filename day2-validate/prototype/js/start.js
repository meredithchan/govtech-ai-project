// ---------- Start ----------
applyChrome();
if (readDraft()) { state.welcome = true; renderWelcome(); } else { render(); }
