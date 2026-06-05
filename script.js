/* =====================================================================
   CONFIGURACIÓN  ·  EDITÁ ESTOS 4 VALORES
   ===================================================================== */
const CONFIG = {
  // Número de WhatsApp en formato internacional, SIN +, SIN espacios.
  // Ej. Argentina celular: 549 + característica sin 0 + número sin 15.
  whatsapp: "5491178990040",                 // <-- CHANGE_ME

  // Link de cobro de la seña (Mercado Pago, MODO, etc.).
  // Pegá tu link de pago. Si lo dejás vacío, el botón avisa por WhatsApp.
  paymentLink: "",                            // <-- CHANGE_ME  ej: "https://mpago.la/xxxxxx"

  // Link de ubicación (Google Maps). Opcional.
  mapsLink: "https://maps.app.goo.gl/4BVeJucihF9nDPhX8?g_st=iw",   // <-- CHANGE_ME

  // Mensaje por defecto del botón flotante / CTA de WhatsApp.
  defaultMsg: "¡Hola Abi! Quiero hacer una consulta sobre los servicios",
};
/* ===================================================================== */

const waUrl = (msg) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

document.addEventListener("DOMContentLoaded", () => {
  // Año del footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Menú mobile
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // Links genéricos de WhatsApp (botón flotante, hero, footer)
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.setAttribute("href", waUrl(CONFIG.defaultMsg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // Link de mapa
  document.querySelectorAll("[data-maps]").forEach((el) => {
    el.setAttribute("href", CONFIG.mapsLink);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  // ---- Galería + Lightbox ----
  const TOTAL_FOTOS = 28; // cantidad de img/nail-XX.jpg
  const gallery = document.getElementById("gallery");
  const sources = [];
  if (gallery) {
    for (let i = 1; i <= TOTAL_FOTOS; i++) {
      const src = `img/nail-${String(i).padStart(2, "0")}.jpg`;
      sources.push(src);
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Trabajo de WAYS ${i}`;
      img.loading = "lazy";
      img.dataset.index = i - 1;
      img.addEventListener("click", () => openLightbox(i - 1));
      gallery.appendChild(img);
    }
  }

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  let current = 0;
  const openLightbox = (i) => {
    current = i;
    lbImg.src = sources[i];
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
  };
  const closeLightbox = () => {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
  };
  const move = (dir) => {
    current = (current + dir + sources.length) % sources.length;
    lbImg.src = sources[current];
  };
  if (lb) {
    document.getElementById("lbClose").addEventListener("click", closeLightbox);
    document.getElementById("lbPrev").addEventListener("click", () => move(-1));
    document.getElementById("lbNext").addEventListener("click", () => move(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "ArrowRight") move(1);
    });
  }

  // ---- Días y horarios disponibles ----
  // getDay(): 0 Dom · 1 Lun · 2 Mar · 3 Mié · 4 Jue · 5 Vie · 6 Sáb
  const HORARIOS = {
    2: ["10:00", "13:00"], // Martes
    3: ["10:00", "18:00"], // Miércoles
    4: ["10:00", "13:00"], // Jueves
    6: ["09:00", "18:00"], // Sábado
  };
  const DIAS = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const dd = (n) => String(n).padStart(2, "0");

  const fecha = document.getElementById("fecha");
  const hora = document.getElementById("hora");

  // Cargar los próximos 8 semanas de días atendidos
  if (fecha) {
    const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    for (let i = 0; i < 56; i++) {
      const dt = new Date(hoy); dt.setDate(hoy.getDate() + i);
      if (!HORARIOS[dt.getDay()]) continue;
      const opt = document.createElement("option");
      opt.value = `${dt.getFullYear()}-${dd(dt.getMonth() + 1)}-${dd(dt.getDate())}`;
      opt.textContent = `${DIAS[dt.getDay()]} ${dd(dt.getDate())}/${dd(dt.getMonth() + 1)}`;
      fecha.appendChild(opt);
    }
  }

  // Al elegir el día, generar los horarios (de a 30 min) dentro del rango
  const llenarHoras = () => {
    hora.innerHTML = '<option value="" disabled selected>Elegí un horario</option>';
    const dt = fecha.value ? new Date(fecha.value + "T00:00:00") : null;
    const rango = dt ? HORARIOS[dt.getDay()] : null;
    if (!rango) { hora.disabled = true; return; }

    const [hi, mi] = rango[0].split(":").map(Number);
    const [hf, mf] = rango[1].split(":").map(Number);
    const fin = hf * 60 + mf;

    const ahora = new Date();
    const esHoy = dt.toDateString() === ahora.toDateString();
    const minAhora = ahora.getHours() * 60 + ahora.getMinutes();

    for (let m = hi * 60 + mi; m < fin; m += 30) {
      if (esHoy && m <= minAhora) continue; // no mostrar horarios ya pasados
      const t = `${dd(Math.floor(m / 60))}:${dd(m % 60)}`;
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = `${t} h`;
      hora.appendChild(opt);
    }
    hora.disabled = false;
  };
  if (fecha && hora) fecha.addEventListener("change", llenarHoras);

  // ---- Formulario de turno -> WhatsApp ----
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const d = Object.fromEntries(new FormData(form).entries());
      const msg =
        `*Nuevo pedido de turno*\n\n` +
        `- Nombre: ${d.nombre}\n` +
        `- Teléfono: ${d.telefono}\n` +
        `- Servicio: ${d.servicio}\n` +
        `- Fecha: ${formatDate(d.fecha)}\n` +
        `- Hora: ${d.hora}\n` +
        (d.notas ? `- Notas: ${d.notas}\n` : "") +
        `\n¿Me confirmás la disponibilidad?`;

      window.open(waUrl(msg), "_blank", "noopener");
    });
  }

  // ---- Botón pagar seña ----
  const payBtn = document.getElementById("payBtn");
  if (payBtn) {
    payBtn.addEventListener("click", () => {
      if (CONFIG.paymentLink) {
        window.open(CONFIG.paymentLink, "_blank", "noopener");
      } else {
        const msg =
          "¡Hola! Quiero abonar la seña para confirmar mi turno. " +
          "¿Me pasás el link de pago?";
        window.open(waUrl(msg), "_blank", "noopener");
      }
    });
  }
});

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
