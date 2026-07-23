"use strict";

const STORAGE = {
  assessments: "delirium_assessments_v1",
  visits: "delirium_visits_v1",
  profile: "delirium_profile_v1",
  measures: "delirium_measures_v1",
  theme: "delirium_theme_v1",
  pin: "delirium_pin_v1"
};

const measures = [
  ["Orientación frecuente", "Explicar dónde está, fecha, motivo de hospitalización y plan del día con lenguaje simple."],
  ["Reloj y calendario visibles", "Facilitar referencias temporales y mantener iluminación concordante con día y noche."],
  ["Acompañamiento familiar", "Favorecer presencia de personas significativas cuando sea seguro y posible."],
  ["Lentes y audífonos", "Verificar que estén disponibles, limpios y funcionando."],
  ["Higiene del sueño", "Disminuir ruido y luz nocturna; agrupar cuidados y evitar interrupciones innecesarias."],
  ["Movilización precoz", "Sentar, levantar y movilizar según condición clínica y evaluación de riesgo."],
  ["Hidratación y nutrición", "Revisar ingesta, restricciones, balance y necesidad de apoyo."],
  ["Control del dolor", "Valorar con escala apropiada, intervenir y reevaluar."],
  ["Eliminación", "Prevenir y tratar retención urinaria y estreñimiento."],
  ["Revisión de dispositivos", "Retirar vías, sondas, drenajes o contenciones que ya no sean indispensables."],
  ["Revisión de medicamentos", "Identificar fármacos potencialmente precipitantes y comunicar al equipo médico."],
  ["Evitar contención física", "Usarla solo como último recurso, por el menor tiempo posible y según protocolo."],
  ["Oxigenación", "Verificar saturación, vía aérea, ventilación y dispositivos de oxígeno."],
  ["Comunicación calmada", "Dar una instrucción a la vez, validar emociones y evitar confrontaciones."],
  ["Información basal", "Consultar familia o cuidadores sobre cognición, funcionalidad, sueño y conducta habitual."]
];

const causes = [
  {
    icon: "😖",
    title: "Dolor",
    definition: "El dolor no tratado aumenta estrés, insomnio, agitación e inatención, y puede precipitar o empeorar delirium.",
    review: ["Valorar con EVA u otra escala adecuada", "Buscar dolor por procedimientos, heridas, fracturas, movilización o dispositivos", "Reevaluar luego de analgesia"]
  },
  {
    icon: "🫁",
    title: "Hipoxia / alteración respiratoria",
    definition: "La disminución de oxígeno o el aumento de CO₂ afectan directamente la función cerebral.",
    review: ["Revisar SatO₂, FR, trabajo respiratorio y necesidad de oxígeno", "Verificar vía aérea, secreciones, VMNI/VMI y posición", "Corregir rápidamente la causa respiratoria"]
  },
  {
    icon: "🦠",
    title: "Infección / sepsis",
    definition: "La infección sistémica es una de las causas más frecuentes de delirium, especialmente en personas mayores y pacientes críticos.",
    review: ["Evaluar foco infeccioso", "Revisar temperatura, cultivos, leucocitos, PCR o procalcitonina según contexto", "Buscar deterioro hemodinámico o séptico"]
  },
  {
    icon: "💧",
    title: "Deshidratación / desnutrición",
    definition: "Los déficits de agua y aporte energético favorecen hipotensión, trastornos metabólicos y confusión aguda.",
    review: ["Controlar ingesta, balance hídrico y signos de hipovolemia", "Revisar mucosas, uresis y tolerancia alimentaria", "Ajustar hidratación y soporte nutricional"]
  },
  {
    icon: "🚽",
    title: "Retención urinaria",
    definition: "La distensión vesical causa dolor, incomodidad, agitación y empeoramiento del estado mental.",
    review: ["Preguntar por dificultad para orinar o revisar débito", "Palpar globo vesical o usar ecografía si está disponible", "Resolver obstrucción o cateterizar según indicación"]
  },
  {
    icon: "📦",
    title: "Estreñimiento / impactación fecal",
    definition: "El estreñimiento genera dolor, distensión, náuseas y malestar, pudiendo contribuir al delirium.",
    review: ["Revisar fecha de última deposición", "Evaluar distensión, dolor o fecaloma", "Indicar medidas según protocolo local"]
  },
  {
    icon: "🧪",
    title: "Alteraciones metabólicas",
    definition: "Hipoglicemia, hiperglicemia, disnatremias, falla renal, hipercapnia o alteraciones hepáticas pueden generar confusión aguda.",
    review: ["Revisar glicemia capilar", "Evaluar laboratorio reciente: sodio, calcio, función renal, gases, etc.", "Corregir las alteraciones detectadas"]
  },
  {
    icon: "💊",
    title: "Fármacos",
    definition: "Muchos medicamentos precipitan delirium: benzodiacepinas, anticolinérgicos, opioides, corticoides y otros.",
    review: ["Revisar cambios recientes de tratamiento", "Identificar medicamentos de alto riesgo", "Suspender o ajustar lo no imprescindible"]
  },
  {
    icon: "🍷",
    title: "Abstinencia de alcohol o drogas",
    definition: "La abstinencia puede expresarse con ansiedad, temblor, sudoración, agitación, alucinaciones y delirium.",
    review: ["Indagar consumo habitual", "Buscar temblor, taquicardia, sudoración y alucinaciones", "Activar manejo específico según protocolo"]
  },
  {
    icon: "🌙",
    title: "Privación del sueño",
    definition: "El sueño fragmentado altera el ciclo sueño-vigilia y favorece desorientación y delirium.",
    review: ["Preguntar o revisar si durmió", "Reducir ruidos, luces e interrupciones", "Agrupar cuidados y favorecer higiene del sueño"]
  },
  {
    icon: "👓",
    title: "Déficit sensorial",
    definition: "No ver ni oír bien favorece desorientación, temor y mala interpretación del entorno.",
    review: ["Verificar lentes y audífonos", "Comprobar que el paciente entienda lo que se le dice", "Hablar claro y de frente"]
  },
  {
    icon: "🛏️",
    title: "Inmovilidad / entorno hospitalario",
    definition: "La inmovilidad prolongada, las contenciones y un ambiente extraño aumentan riesgo de delirium.",
    review: ["Favorecer movilización segura", "Revisar necesidad de sujeciones y dispositivos", "Reorientar frecuentemente y mantener presencia familiar cuando sea posible"]
  }
];

const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => [...ctx.querySelectorAll(q)];
const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const nowISO = () => new Date().toISOString();
const formatDate = iso => new Intl.DateTimeFormat("es-CL", {dateStyle:"short", timeStyle:"short"}).format(new Date(iso));
const sameDay = (a, b = new Date()) => new Date(a).toDateString() === new Date(b).toDateString();

let assessments = load(STORAGE.assessments, []);
let visits = load(STORAGE.visits, []);
let profile = load(STORAGE.profile, {staffName:"", role:"Enfermero/a", defaultUnit:"", shift:"Día", privacyAccepted:false});
let currentHistory = "assessments";
let scannerStream = null;
let scanTimer = null;
let installPrompt = null;

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove("show"), 2600);
}

function showView(id) {
  $$(".view").forEach(v => v.classList.toggle("active", v.id === id));
  $$(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.view === id));
  if (id === "historial") renderHistory();
  if (id === "qr") updateProfileSummary();
  window.scrollTo({top: 0, behavior: "smooth"});
}

$$(".nav-item").forEach(btn => btn.addEventListener("click", () => showView(btn.dataset.view)));
$$("[data-go]").forEach(btn => btn.addEventListener("click", () => {
  showView(btn.dataset.go);
  if (btn.dataset.tab) activateTab(btn.dataset.tab);
}));

function activateTab(id) {
  $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.tabTarget === id));
  $$(".tab-panel").forEach(p => p.classList.toggle("active", p.id === id));
}
$$(".tab").forEach(t => t.addEventListener("click", () => activateTab(t.dataset.tabTarget)));

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE.theme, theme);
}
setTheme(localStorage.getItem(STORAGE.theme) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
$("#themeToggle").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));

function getRadio(form, name) {
  return Number(new FormData(form).get(name) || 0);
}
function calculate4AT() {
  const form = $("#form4at");
  const score = getRadio(form, "alertness") + getRadio(form, "amt4") + getRadio(form, "attention") + getRadio(form, "acuteChange");
  $("#score4at").textContent = score;
  const box = $("#result4at");
  box.classList.remove("low", "medium", "high");
  if (score === 0) {
    box.classList.add("low");
    $("#title4at").textContent = "Delirium poco probable";
    $("#text4at").textContent = "Mantener medidas preventivas y vigilancia clínica. Reevaluar ante cualquier cambio.";
  } else if (score <= 3) {
    box.classList.add("medium");
    $("#title4at").textContent = "Posible deterioro cognitivo / riesgo de delirium";
    $("#text4at").textContent = "Buscar estado basal, revisar causas precipitantes, reforzar medidas y repetir evaluación según protocolo.";
  } else {
    box.classList.add("high");
    $("#title4at").textContent = "Posible delirium";
    $("#text4at").textContent = "Aplicar CAM, obtener información basal y realizar búsqueda estructurada de causas.";
  }
  return score;
}
$$("#form4at input[type='radio']").forEach(i => i.addEventListener("change", calculate4AT));

$("#form4at").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const score = calculate4AT();
  assessments.unshift({
    id: uid(), type: "4AT", date: nowISO(),
    patientCode: fd.get("patientCode")?.trim() || "",
    bed: fd.get("bed")?.trim() || "",
    score,
    result: score === 0 ? "Bajo" : score <= 3 ? "Intermedio" : "Alto / posible delirium",
    details: {
      alertness: Number(fd.get("alertness")),
      amt4: Number(fd.get("amt4")),
      attention: Number(fd.get("attention")),
      acuteChange: Number(fd.get("acuteChange"))
    },
    evaluator: profile.staffName || "No configurado"
  });
  save(STORAGE.assessments, assessments);
  toast("Evaluación 4AT guardada");
});
$("#reset4at").addEventListener("click", () => { $("#form4at").reset(); calculate4AT(); });

function calculateCAM() {
  const form = $("#formCam");
  const fd = new FormData(form);
  const f1 = fd.get("f1") === "on", f2 = fd.get("f2") === "on", f3 = fd.get("f3") === "on", f4 = fd.get("f4") === "on";
  const positive = f1 && f2 && (f3 || f4);
  const box = $("#resultCam");
  box.classList.toggle("high", positive);
  box.classList.toggle("low", !positive);
  $("#camBadge").textContent = positive ? "+" : "−";
  $("#titleCam").textContent = positive ? "CAM positivo" : "CAM negativo";
  $("#textCam").textContent = positive
    ? "Delirium probable: comunicar al equipo, identificar causas precipitantes y activar manejo."
    : "Revalorar si persiste la sospecha, porque el delirium puede fluctuar.";
  return {positive, f1, f2, f3, f4};
}
$$("#formCam input[type='checkbox']").forEach(i => i.addEventListener("change", calculateCAM));

$("#formCam").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const result = calculateCAM();
  assessments.unshift({
    id: uid(), type: "CAM", date: nowISO(),
    patientCode: fd.get("patientCode")?.trim() || "",
    bed: fd.get("bed")?.trim() || "",
    score: result.positive ? "Positivo" : "Negativo",
    result: result.positive ? "Delirium probable" : "CAM negativo",
    details: {f1: result.f1, f2: result.f2, f3: result.f3, f4: result.f4},
    evaluator: profile.staffName || "No configurado"
  });
  save(STORAGE.assessments, assessments);
  toast("Evaluación CAM guardada");
});
$("#resetCam").addEventListener("click", () => { $("#formCam").reset(); calculateCAM(); });

function updateEva() {
  const value = Number($("#evaSlider").value);
  $("#evaValue").textContent = value;
  const label = $("#evaInterpretation");
  label.classList.remove("low", "medium", "high");
  let text, face, cls;
  if (value === 0) { text = "Sin dolor"; face = "🙂"; cls = "low"; }
  else if (value <= 3) { text = "Dolor leve"; face = "😐"; cls = "low"; }
  else if (value <= 6) { text = "Dolor moderado"; face = "😣"; cls = "medium"; }
  else { text = "Dolor intenso"; face = "😫"; cls = "high"; }
  label.textContent = text; label.classList.add(cls); $("#evaFace").textContent = face;
  return {value, text};
}
$("#evaSlider").addEventListener("input", updateEva);
$("#formEva").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const eva = updateEva();
  assessments.unshift({
    id: uid(), type: "EVA", date: nowISO(),
    patientCode: fd.get("patientCode")?.trim() || "",
    bed: fd.get("bed")?.trim() || "",
    score: eva.value,
    result: eva.text,
    details: {moment: fd.get("moment"), intervention: fd.get("intervention")?.trim() || ""},
    evaluator: profile.staffName || "No configurado"
  });
  save(STORAGE.assessments, assessments);
  toast("Valoración EVA guardada");
});
$("#resetEva").addEventListener("click", () => { $("#formEva").reset(); updateEva(); });

function renderMeasures() {
  const state = load(STORAGE.measures, {});
  $("#measuresList").innerHTML = measures.map(([title, desc], i) => `
    <label class="measure-item ${state[i] ? "done" : ""}">
      <input type="checkbox" data-measure="${i}" ${state[i] ? "checked" : ""}>
      <span><b>${title}</b><small>${desc}</small></span>
    </label>`).join("");
  $$("[data-measure]").forEach(cb => cb.addEventListener("change", () => {
    state[cb.dataset.measure] = cb.checked;
    save(STORAGE.measures, state);
    cb.closest(".measure-item").classList.toggle("done", cb.checked);
  }));
}
$("#resetMeasures").addEventListener("click", () => {
  localStorage.removeItem(STORAGE.measures);
  renderMeasures();
  toast("Checklist reiniciado");
});

function renderCauses() {
  $("#causesList").innerHTML = causes.map(c => `
    <article class="cause-card">
      <div class="cause-card-head">
        <div class="cause-icon">${c.icon}</div>
        <div>
          <h3>${c.title}</h3>
          <p>${c.definition}</p>
        </div>
      </div>
      <div class="tip-box"><b>Qué revisar / qué hacer:</b></div>
      <ul>${c.review.map(item => `<li>${item}</li>`).join("")}</ul>
    </article>
  `).join("");
}

function fillProfileForm() {
  const f = $("#profileForm");
  f.staffName.value = profile.staffName || "";
  f.role.value = profile.role || "Enfermero/a";
  f.defaultUnit.value = profile.defaultUnit || "";
  f.shift.value = profile.shift || "Día";
  f.privacyAccepted.checked = !!profile.privacyAccepted;
}
function updateProfileSummary() {
  $("#profileSummary").textContent = profile.staffName
    ? `${profile.staffName} · ${profile.role} · ${profile.shift}${profile.defaultUnit ? ` · ${profile.defaultUnit}` : ""}`
    : "Configura tus datos antes del primer registro.";
}
$("#profileForm").addEventListener("submit", e => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  profile = {
    staffName: fd.get("staffName").trim(),
    role: fd.get("role"),
    defaultUnit: fd.get("defaultUnit").trim(),
    shift: fd.get("shift"),
    privacyAccepted: fd.get("privacyAccepted") === "on"
  };
  save(STORAGE.profile, profile);
  const pin = fd.get("pin").trim();
  if (pin) localStorage.setItem(STORAGE.pin, pin);
  updateProfileSummary();
  toast("Configuración guardada");
});

function parseQR(raw) {
  const text = raw.trim();
  if (!text) return {};
  try {
    const obj = JSON.parse(text);
    return {unit: obj.unit || obj.unidad || "", location: obj.location || obj.ubicacion || obj.bed || obj.cama || ""};
  } catch {}
  const parts = text.split("|").map(s => s.trim());
  if (parts.length >= 3) return {unit: parts[2] || "", location: parts[3] || ""};
  return {};
}
function applyQR(raw) {
  $("#rawCode").value = raw;
  const parsed = parseQR(raw);
  if (parsed.unit) $("#visitUnit").value = parsed.unit;
  if (parsed.location) $("#visitLocation").value = parsed.location;
  if (!$("#visitUnit").value && profile.defaultUnit) $("#visitUnit").value = profile.defaultUnit;
  toast("QR leído: revisa y confirma el registro");
}
$("#rawCode").addEventListener("change", e => {
  const parsed = parseQR(e.target.value);
  if (parsed.unit) $("#visitUnit").value = parsed.unit;
  if (parsed.location) $("#visitLocation").value = parsed.location;
});

async function startScanner() {
  if (!profile.staffName) {
    toast("Primero configura el perfil del funcionario");
    showView("config");
    return;
  }
  if (!("BarcodeDetector" in window)) {
    $("#scannerStatus").textContent = "Este navegador no dispone de lector QR automático. Usa el ingreso manual o abre la app en Chrome/Edge compatible.";
    toast("Lector automático no compatible");
    return;
  }
  try {
    const formats = await BarcodeDetector.getSupportedFormats();
    if (!formats.includes("qr_code")) throw new Error("QR no soportado");
    scannerStream = await navigator.mediaDevices.getUserMedia({video: {facingMode: {ideal: "environment"}}});
    const video = $("#qrVideo");
    video.srcObject = scannerStream;
    await video.play();
    video.style.display = "block";
    $(".scan-frame").style.display = "block";
    $("#scannerPlaceholder").style.display = "none";
    $("#startScanner").disabled = true;
    $("#stopScanner").disabled = false;
    $("#scannerStatus").textContent = "Apunta la cámara al código QR.";
    const detector = new BarcodeDetector({formats: ["qr_code"]});
    const scan = async () => {
      if (!scannerStream) return;
      try {
        const codes = await detector.detect(video);
        if (codes.length) {
          applyQR(codes[0].rawValue);
          stopScanner();
          return;
        }
      } catch {}
      scanTimer = setTimeout(scan, 250);
    };
    scan();
  } catch (err) {
    $("#scannerStatus").textContent = `No fue posible iniciar la cámara: ${err.message || "permiso denegado"}.`;
    toast("No se pudo iniciar la cámara");
  }
}
function stopScanner() {
  clearTimeout(scanTimer);
  if (scannerStream) scannerStream.getTracks().forEach(t => t.stop());
  scannerStream = null;
  const video = $("#qrVideo");
  video.pause();
  video.srcObject = null;
  video.style.display = "none";
  $(".scan-frame").style.display = "none";
  $("#scannerPlaceholder").style.display = "block";
  $("#startScanner").disabled = false;
  $("#stopScanner").disabled = true;
}
$("#startScanner").addEventListener("click", startScanner);
$("#stopScanner").addEventListener("click", stopScanner);
document.addEventListener("visibilitychange", () => { if (document.hidden) stopScanner(); });

$("#visitForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!profile.staffName || !profile.privacyAccepted) {
    toast("Completa y acepta la configuración de privacidad");
    showView("config");
    return;
  }
  const fd = new FormData(e.currentTarget);
  const rawCode = fd.get("rawCode").trim();
  const unit = fd.get("unit").trim();
  const location = fd.get("location").trim();
  const duplicate = visits.find(v =>
    v.staffName === profile.staffName &&
    v.rawCode === rawCode &&
    (Date.now() - new Date(v.date).getTime()) < 120000
  );
  if (duplicate) {
    toast("Registro duplicado: ya fue marcado hace menos de 2 minutos");
    return;
  }
  visits.unshift({
    id: uid(), date: nowISO(), rawCode, unit, location,
    reason: fd.get("reason"), note: fd.get("note").trim(),
    attendedUnit: true,
    visited: fd.get("visited") === "on",
    staffName: profile.staffName, role: profile.role, shift: profile.shift
  });
  save(STORAGE.visits, visits);
  e.currentTarget.reset();
  if (profile.defaultUnit) $("#visitUnit").value = profile.defaultUnit;
  toast("Asistencia y visita registradas");
});

function renderHistory() {
  $("#statAssessments").textContent = assessments.length;
  $("#statVisits").textContent = visits.length;
  $("#statToday").textContent = assessments.filter(x => sameDay(x.date)).length + visits.filter(x => sameDay(x.date)).length;
  const list = $("#historyList");
  const data = currentHistory === "assessments" ? assessments : visits;
  if (!data.length) {
    list.innerHTML = `<div class="empty">Todavía no hay registros en esta sección.</div>`;
    return;
  }
  list.innerHTML = data.slice(0, 100).map(item => currentHistory === "assessments" ? `
    <article class="history-item">
      <div class="history-item-head"><h4>${escapeHTML(item.type)} · ${escapeHTML(String(item.score))}</h4><time>${formatDate(item.date)}</time></div>
      <div class="history-meta">
        <span>${escapeHTML(item.result)}</span>
        ${item.patientCode ? `<span>Código: ${escapeHTML(item.patientCode)}</span>` : ""}
        ${item.bed ? `<span>Cama: ${escapeHTML(item.bed)}</span>` : ""}
        <span>Evaluador: ${escapeHTML(item.evaluator)}</span>
      </div>
    </article>` : `
    <article class="history-item">
      <div class="history-item-head"><h4>${escapeHTML(item.unit)}${item.location ? ` · ${escapeHTML(item.location)}` : ""}</h4><time>${formatDate(item.date)}</time></div>
      <div class="history-meta">
        <span>${escapeHTML(item.reason)}</span>
        <span>${escapeHTML(item.staffName)} · ${escapeHTML(item.role)}</span>
        <span>${item.visited ? "Visita confirmada" : "Solo asistencia"}</span>
        <span>Turno: ${escapeHTML(item.shift)}</span>
      </div>
    </article>`).join("");
}
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
$$(".history-tab").forEach(btn => btn.addEventListener("click", () => {
  currentHistory = btn.dataset.history;
  $$(".history-tab").forEach(b => b.classList.toggle("active", b === btn));
  renderHistory();
}));

$("#adminUnlock").addEventListener("click", () => {
  $("#pinInput").value = "";
  $("#pinError").textContent = "";
  $("#pinDialog").showModal();
});
$("#pinForm").addEventListener("submit", e => {
  const submitted = e.submitter?.id === "confirmPin";
  if (!submitted) return;
  e.preventDefault();
  const expected = localStorage.getItem(STORAGE.pin) || "2468";
  if ($("#pinInput").value === expected) {
    $("#pinDialog").close();
    $("#adminActions").classList.remove("hidden");
    toast("Panel administrativo habilitado");
  } else {
    $("#pinError").textContent = "PIN incorrecto.";
  }
});

function csvEscape(value) {
  const str = typeof value === "object" ? JSON.stringify(value) : String(value ?? "");
  return `"${str.replace(/"/g, '""')}"`;
}
function exportCSV(filename, rows) {
  if (!rows.length) { toast("No hay datos para exportar"); return; }
  const keys = [...new Set(rows.flatMap(Object.keys))];
  const csv = "\uFEFF" + [keys.map(csvEscape).join(";"), ...rows.map(r => keys.map(k => csvEscape(r[k])).join(";"))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], {type:"text/csv;charset=utf-8"}));
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
$("#exportAssessments").addEventListener("click", () => exportCSV(`evaluaciones-delirium-${new Date().toISOString().slice(0,10)}.csv`, assessments));
$("#exportVisits").addEventListener("click", () => exportCSV(`visitas-qr-${new Date().toISOString().slice(0,10)}.csv`, visits));
$("#clearData").addEventListener("click", () => {
  if (!confirm("¿Borrar definitivamente todas las evaluaciones y visitas guardadas en este dispositivo?")) return;
  assessments = []; visits = [];
  save(STORAGE.assessments, assessments); save(STORAGE.visits, visits);
  renderHistory();
  toast("Datos eliminados");
});

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  installPrompt = e;
  $("#installButton").disabled = false;
});
$("#installButton").addEventListener("click", async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  $("#installButton").disabled = true;
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

renderMeasures();
renderCauses();
fillProfileForm();
updateProfileSummary();
calculate4AT();
calculateCAM();
updateEva();
renderHistory();
if (profile.defaultUnit) $("#visitUnit").value = profile.defaultUnit;
