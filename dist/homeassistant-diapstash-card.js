// homeassistant-diapstash-card.js
// First preview build for DiapStash Lovelace cards.
// Cards: diapstash-current-card, diapstash-stock-overview-card, diapstash-stock-type-card, diapstash-low-stock-card

const DIAPSTASH_CARD_VERSION = "0.10.0-preview.1";
const DEFAULT_LOGO = new URL("./logo@2x.png", import.meta.url).href;
const DEFAULT_DARK_LOGO = new URL("./dark_logo@2x.png", import.meta.url).href;

const TRANSLATIONS = {
  en: {
    currentDiaper: "Current diaper",
    stockOverview: "Stock overview",
    stockType: "Stock type",
    lowStock: "Low stock",
    product: "Product",
    brand: "Brand",
    size: "Size",
    variant: "Variant",
    duration: "Duration",
    startTime: "Start time",
    wearing: "Wearing",
    notWearing: "Not wearing",
    month: "Month",
    year: "Year",
    total: "Total",
    streak: "Streak",
    stock: "Stock",
    entries: "Entries",
    locations: "Locations",
    toWash: "To wash",
    brands: "Brands",
    types: "Types",
    catalog: "Catalog",
    add: "Add",
    available: "Available",
    noData: "No data available",
    noLowStock: "Everything looks good.",
    missingEntity: "Entity not found",
    configureEntity: "Please configure an entity.",
    showAll: "Show all",
  },
  de: {
    currentDiaper: "Aktuelle Windel",
    stockOverview: "Lagerübersicht",
    stockType: "Windeltyp",
    lowStock: "Niedriger Bestand",
    product: "Produkt",
    brand: "Marke",
    size: "Größe",
    variant: "Variante",
    duration: "Tragedauer",
    startTime: "Startzeit",
    wearing: "Wird getragen",
    notWearing: "Keine Windel aktiv",
    month: "Monat",
    year: "Jahr",
    total: "Gesamt",
    streak: "Streak",
    stock: "Bestand",
    entries: "Einträge",
    locations: "Lagerorte",
    toWash: "Waschen nötig",
    brands: "Marken",
    types: "Typen",
    catalog: "Katalog",
    add: "Hinzufügen",
    available: "Verfügbar",
    noData: "Keine Daten verfügbar",
    noLowStock: "Alles sieht gut aus.",
    missingEntity: "Entität nicht gefunden",
    configureEntity: "Bitte eine Entität konfigurieren.",
    showAll: "Alle anzeigen",
  },
  fr: {
    currentDiaper: "Couche actuelle",
    stockOverview: "Vue du stock",
    stockType: "Type de couche",
    lowStock: "Stock faible",
    product: "Produit",
    brand: "Marque",
    size: "Taille",
    variant: "Variante",
    duration: "Durée",
    startTime: "Heure de début",
    wearing: "Portée",
    notWearing: "Aucune couche active",
    month: "Mois",
    year: "Année",
    total: "Total",
    streak: "Série",
    stock: "Stock",
    entries: "Entrées",
    locations: "Emplacements",
    toWash: "À laver",
    brands: "Marques",
    types: "Types",
    catalog: "Catalogue",
    add: "Ajouter",
    available: "Disponible",
    noData: "Aucune donnée disponible",
    noLowStock: "Tout semble correct.",
    missingEntity: "Entité introuvable",
    configureEntity: "Veuillez configurer une entité.",
    showAll: "Tout afficher",
  },
  es: {
    currentDiaper: "Pañal actual",
    stockOverview: "Resumen de inventario",
    stockType: "Tipo de pañal",
    lowStock: "Stock bajo",
    product: "Producto",
    brand: "Marca",
    size: "Talla",
    variant: "Variante",
    duration: "Duración",
    startTime: "Hora de inicio",
    wearing: "En uso",
    notWearing: "Sin pañal activo",
    month: "Mes",
    year: "Año",
    total: "Total",
    streak: "Racha",
    stock: "Inventario",
    entries: "Entradas",
    locations: "Ubicaciones",
    toWash: "Para lavar",
    brands: "Marcas",
    types: "Tipos",
    catalog: "Catálogo",
    add: "Añadir",
    available: "Disponible",
    noData: "No hay datos disponibles",
    noLowStock: "Todo parece correcto.",
    missingEntity: "Entidad no encontrada",
    configureEntity: "Configura una entidad.",
    showAll: "Mostrar todo",
  },
};

const PALETTES = {
  liquid_clear: {
    "--ds-accent": "#9adfff",
    "--ds-purple": "#c8b7ff",
    "--ds-cyan": "#a8f2ff",
    "--ds-tint-a": "rgba(255,255,255,.28)",
    "--ds-tint-b": "rgba(154,223,255,.24)",
    "--ds-tint-c": "rgba(200,183,255,.18)",
    "--ds-surface": "rgba(255,255,255,.105)",
    "--ds-surface-strong": "rgba(255,255,255,.22)",
  },
  liquid_aqua: {
    "--ds-accent": "#64d2ff",
    "--ds-purple": "#a78bfa",
    "--ds-cyan": "#5eead4",
    "--ds-tint-a": "rgba(100,210,255,.34)",
    "--ds-tint-b": "rgba(94,234,212,.24)",
    "--ds-tint-c": "rgba(167,139,250,.22)",
    "--ds-surface": "rgba(255,255,255,.10)",
    "--ds-surface-strong": "rgba(255,255,255,.22)",
  },
  liquid_lilac: {
    "--ds-accent": "#c084fc",
    "--ds-purple": "#a78bfa",
    "--ds-cyan": "#93c5fd",
    "--ds-tint-a": "rgba(192,132,252,.34)",
    "--ds-tint-b": "rgba(147,197,253,.24)",
    "--ds-tint-c": "rgba(255,192,203,.18)",
    "--ds-surface": "rgba(255,255,255,.105)",
    "--ds-surface-strong": "rgba(255,255,255,.23)",
  },
  liquid_prism: {
    "--ds-accent": "#7dd3fc",
    "--ds-purple": "#c4b5fd",
    "--ds-cyan": "#99f6e4",
    "--ds-tint-a": "rgba(125,211,252,.30)",
    "--ds-tint-b": "rgba(196,181,253,.24)",
    "--ds-tint-c": "rgba(153,246,228,.20)",
    "--ds-surface": "rgba(255,255,255,.095)",
    "--ds-surface-strong": "rgba(255,255,255,.21)",
  },
  platinum: {
    "--ds-accent": "#d1d5db",
    "--ds-purple": "#a5b4fc",
    "--ds-cyan": "#bae6fd",
    "--ds-tint-a": "rgba(255,255,255,.26)",
    "--ds-tint-b": "rgba(209,213,219,.18)",
    "--ds-tint-c": "rgba(165,180,252,.16)",
    "--ds-surface": "rgba(255,255,255,.09)",
    "--ds-surface-strong": "rgba(255,255,255,.20)",
  },
  neutral: {
    "--ds-accent": "#22b8cf",
    "--ds-purple": "#5e5ce6",
    "--ds-cyan": "#64d2ff",
    "--ds-tint-a": "rgba(255,255,255,.16)",
    "--ds-tint-b": "rgba(255,255,255,.15)",
    "--ds-tint-c": "rgba(255,255,255,.08)",
    "--ds-surface": "rgba(255,255,255,.075)",
    "--ds-surface-strong": "rgba(255,255,255,.17)",
  },
  diapstash: {
    "--ds-accent": "#21bfd8",
    "--ds-purple": "#4b2ab5",
    "--ds-cyan": "#21bfd8",
    "--ds-tint-a": "rgba(93, 55, 205, .48)",
    "--ds-tint-b": "rgba(33, 191, 216, .42)",
    "--ds-tint-c": "rgba(255, 130, 210, .34)",
    "--ds-surface": "rgba(255,255,255,.16)",
    "--ds-surface-strong": "rgba(255,255,255,.34)",
  },
  abdl_pastel: {
    "--ds-accent": "#ff8ac6",
    "--ds-purple": "#b58cff",
    "--ds-cyan": "#8de7ff",
    "--ds-tint-a": "rgba(255, 138, 198, .52)",
    "--ds-tint-b": "rgba(141, 231, 255, .44)",
    "--ds-tint-c": "rgba(181, 140, 255, .44)",
    "--ds-surface": "rgba(255,255,255,.16)",
    "--ds-surface-strong": "rgba(255,255,255,.31)",
  },
  bubblegum: {
    "--ds-accent": "#ff5db8",
    "--ds-purple": "#a66cff",
    "--ds-cyan": "#70e1ff",
    "--ds-tint-a": "rgba(255, 93, 184, .55)",
    "--ds-tint-b": "rgba(166, 108, 255, .44)",
    "--ds-tint-c": "rgba(112, 225, 255, .42)",
    "--ds-surface": "rgba(255,255,255,.16)",
    "--ds-surface-strong": "rgba(255,255,255,.31)",
  },
  candy: {
    "--ds-accent": "#ffb703",
    "--ds-purple": "#fb6f92",
    "--ds-cyan": "#00d4ff",
    "--ds-tint-a": "rgba(255, 183, 3, .52)",
    "--ds-tint-b": "rgba(251, 111, 146, .50)",
    "--ds-tint-c": "rgba(0, 212, 255, .42)",
    "--ds-surface": "rgba(255,255,255,.16)",
    "--ds-surface-strong": "rgba(255,255,255,.31)",
  },
  nursery: {
    "--ds-accent": "#7bdff2",
    "--ds-purple": "#cdb4db",
    "--ds-cyan": "#bde0fe",
    "--ds-tint-a": "rgba(189, 224, 254, .55)",
    "--ds-tint-b": "rgba(255, 200, 221, .48)",
    "--ds-tint-c": "rgba(205, 180, 219, .48)",
    "--ds-surface": "rgba(255,255,255,.18)",
    "--ds-surface-strong": "rgba(255,255,255,.34)",
  },
  mint: {
    "--ds-accent": "#7ee8a6",
    "--ds-purple": "#77a6ff",
    "--ds-cyan": "#64f4df",
    "--ds-tint-a": "rgba(126, 232, 166, .50)",
    "--ds-tint-b": "rgba(100, 244, 223, .44)",
    "--ds-tint-c": "rgba(119, 166, 255, .38)",
    "--ds-surface": "rgba(255,255,255,.14)",
    "--ds-surface-strong": "rgba(255,255,255,.29)",
  },
  sunset: {
    "--ds-accent": "#ff9f0a",
    "--ds-purple": "#bf5af2",
    "--ds-cyan": "#ff6b6b",
    "--ds-tint-a": "rgba(255, 159, 10, .55)",
    "--ds-tint-b": "rgba(255, 107, 107, .46)",
    "--ds-tint-c": "rgba(191, 90, 242, .44)",
    "--ds-surface": "rgba(255,255,255,.15)",
    "--ds-surface-strong": "rgba(255,255,255,.30)",
  },
  rainbow: {
    "--ds-accent": "#ff7ab6",
    "--ds-purple": "#9b7cff",
    "--ds-cyan": "#6ee7ff",
    "--ds-tint-a": "rgba(255, 122, 182, .55)",
    "--ds-tint-b": "rgba(110, 231, 255, .48)",
    "--ds-tint-c": "rgba(255, 221, 87, .42)",
    "--ds-surface": "rgba(255,255,255,.18)",
    "--ds-surface-strong": "rgba(255,255,255,.36)",
  },
  night: {
    "--ds-accent": "#64d2ff",
    "--ds-purple": "#5e5ce6",
    "--ds-cyan": "#32d7d2",
    "--ds-tint-a": "rgba(94, 92, 230, .32)",
    "--ds-tint-b": "rgba(50, 215, 210, .23)",
    "--ds-tint-c": "rgba(10, 132, 255, .22)",
    "--ds-surface": "rgba(255,255,255,.075)",
    "--ds-surface-strong": "rgba(255,255,255,.16)",
  },
};

const PRESETS = {
  fancy: {
    finish: "elegant",
    palette: "liquid_prism",
    text_contrast: "high",
    logo_variant: "auto",
  },
  elegant: {
    finish: "elegant",
    palette: "liquid_prism",
    text_contrast: "high",
    logo_variant: "auto",
  },
  platinum: {
    finish: "elegant",
    palette: "platinum",
    text_contrast: "high",
    logo_variant: "auto",
  },
  abdl_playful: {
    finish: "playful",
    palette: "rainbow",
    text_contrast: "high",
    logo_variant: "auto",
  },
  abdl_pastel: {
    finish: "playful",
    palette: "abdl_pastel",
    text_contrast: "high",
    logo_variant: "auto",
  },
  candy: {
    finish: "playful",
    palette: "candy",
    text_contrast: "high",
    logo_variant: "auto",
  },
  bubblegum: {
    finish: "playful",
    palette: "bubblegum",
    text_contrast: "high",
    logo_variant: "auto",
  },
};

function deepMerge(base, override) {
  const out = { ...base };
  for (const [key, value] of Object.entries(override || {})) {
    if (value && typeof value === "object" && !Array.isArray(value) && typeof base[key] === "object") {
      out[key] = deepMerge(base[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safe(value, fallback = "—") {
  if (value === undefined || value === null || value === "" || value === "unknown" || value === "unavailable") {
    return fallback;
  }
  return value;
}

function numberSafe(value, fallback = "0") {
  if (value === undefined || value === null || value === "" || value === "unknown" || value === "unavailable") return fallback;
  return value;
}

function safeUrl(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (text.startsWith("http://") || text.startsWith("https://") || text.startsWith("/") || text.startsWith("data:image/")) return text;
  return "";
}

function safeCssValue(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  return /^[#a-zA-Z0-9.,()%\s-]+$/.test(text) ? text : "";
}

function styleVars(vars) {
  return Object.entries(vars || {})
    .map(([key, value]) => [key, safeCssValue(value)])
    .filter(([key, value]) => key.startsWith("--") && value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

function getLang(hass, config = {}) {
  const configured = (config.language || "auto").toLowerCase();
  const raw = configured !== "auto"
    ? configured
    : (hass?.locale?.language || hass?.language || navigator.language || "en");
  const lang = String(raw).toLowerCase().split("-")[0];
  return TRANSLATIONS[lang] ? lang : "en";
}

function l(hass, config, key) {
  const lang = getLang(hass, config);
  return TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
}

function formatDateTime(value, hass, config) {
  if (!value) return "—";
  const lang = getLang(hass, config);
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return new Intl.DateTimeFormat(lang, { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" }).format(date);
  } catch (_err) {
    return String(value);
  }
}

function stateObj(hass, entityId) {
  if (!hass || !entityId) return undefined;
  return hass.states[entityId];
}

function attr(entity, name, fallback = undefined) {
  return entity?.attributes?.[name] ?? fallback;
}

function unitDisplay(unit, value, hass, config) {
  const lang = getLang(hass, config);
  const numeric = Number(value);
  const singular = Number.isFinite(numeric) && numeric === 1;
  if (unit === "changes") {
    if (lang === "de") return "Wechsel";
    if (lang === "fr") return singular ? "changement" : "changements";
    if (lang === "es") return singular ? "cambio" : "cambios";
    return singular ? "change" : "changes";
  }
  return unit;
}

function entityDisplay(entity, fallback = "—", hass, config) {
  if (!entity) return fallback;
  const value = safe(entity.state, fallback);
  const unit = entity.attributes?.unit_of_measurement;
  if (!unit || value === fallback || String(value).includes(String(unit))) return value;
  return `${value} ${unitDisplay(unit, value, hass, config)}`;
}

function firstMatchingEntity(hass, predicate) {
  if (!hass) return undefined;
  return Object.keys(hass.states).find(predicate);
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function resolveLimit(value, fallback = Infinity) {
  if (value === undefined || value === null || value === "" || value === "all") return fallback;
  if (value === false || value === 0 || value === "0") return Infinity;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function limitArray(items, limit) {
  return limit === Infinity ? items : items.slice(0, limit);
}

function metric(label, value, tone = 0) {
  return `
    <div class="metric tone-${Number(tone) % 6}">
      <div class="metric-value">${escapeHtml(numberSafe(value))}</div>
      <div class="metric-label">${escapeHtml(label)}</div>
    </div>`;
}

const SHARED_CSS = `
  :host {
    display: block;
    --ds-radius: var(--diapstash-card-radius, 34px);
    --ds-gap: 12px;
    --ds-accent: var(--diapstash-accent-color, var(--accent-color, #21bfd8));
    --ds-purple: var(--diapstash-purple, #4b2ab5);
    --ds-cyan: var(--diapstash-cyan, #21bfd8);
    --ds-tint-a: rgba(93, 55, 205, .48);
    --ds-tint-b: rgba(33, 191, 216, .42);
    --ds-tint-c: rgba(255, 130, 210, .34);
    --ds-surface: rgba(255,255,255,.16);
    --ds-surface-strong: rgba(255,255,255,.34);
    --ds-warning: var(--warning-color, #ff9f0a);
    --ds-error: var(--error-color, #ff453a);
    --ds-success: var(--success-color, #32d74b);
    --ds-text-muted: color-mix(in srgb, var(--primary-text-color) 62%, transparent);
    --ds-glass-fill: var(--diapstash-glass-fill, rgba(255,255,255,.105));
    --ds-glass-fill-strong: var(--diapstash-glass-fill-strong, rgba(255,255,255,.155));
    --ds-glass-stroke: var(--diapstash-glass-stroke, rgba(255,255,255,.28));
    --ds-shadow: var(--diapstash-card-shadow, 0 26px 70px rgba(0,0,0,.30), 0 4px 16px rgba(0,0,0,.18));
    --ds-inner-shadow: inset 0 1px 0 rgba(255,255,255,.52), inset 0 -1px 0 rgba(255,255,255,.15), inset 0 0 0 1px rgba(255,255,255,.15);
    color: var(--primary-text-color);
  }

  ha-card {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    border-radius: var(--ds-radius);
    border: 1px solid var(--ds-glass-stroke);
    background:
      linear-gradient(135deg, rgba(255,255,255,.31) 0%, rgba(255,255,255,.15) 34%, rgba(255,255,255,.045) 65%, rgba(255,255,255,.18) 100%),
      radial-gradient(140% 105% at 0% 0%, var(--ds-tint-a) 0%, rgba(255,255,255,.15) 34%, transparent 70%),
      radial-gradient(95% 90% at 100% 0%, var(--ds-tint-b) 0%, transparent 72%),
      radial-gradient(100% 100% at 18% 115%, var(--ds-tint-c) 0%, transparent 76%),
      color-mix(in srgb, var(--ha-card-background, #1c1c1e) 12%, transparent);
    box-shadow: var(--ds-shadow), var(--ds-inner-shadow);
    backdrop-filter: blur(34px) saturate(210%) brightness(1.08);
    -webkit-backdrop-filter: blur(34px) saturate(210%) brightness(1.08);
  }

  ha-card::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    border-radius: inherit;
    background:
      radial-gradient(450px 180px at 10% -15%, rgba(255,255,255,.50), rgba(255,255,255,.16) 42%, transparent 72%),
      radial-gradient(300px 240px at 112% 0%, var(--ds-tint-b), transparent 72%),
      radial-gradient(280px 240px at -8% 100%, var(--ds-tint-c), transparent 72%);
    opacity: .88;
  }

  ha-card::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: calc(var(--ds-radius) - 1px);
    pointer-events: none;
    z-index: 1;
    background:
      linear-gradient(115deg, rgba(255,255,255,.58) 0%, rgba(255,255,255,.18) 10%, transparent 26%),
      linear-gradient(300deg, transparent 58%, rgba(255,255,255,.16) 78%, rgba(255,255,255,.34) 100%);
    mix-blend-mode: screen;
    opacity: .58;
  }

  ha-card.no-glass,
  ha-card.solid {
    background: var(--ha-card-background, var(--card-background-color));
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  ha-card.no-glass::before,
  ha-card.no-glass::after,
  ha-card.solid::before,
  ha-card.solid::after {
    display: none;
  }

  .card-inner {
    position: relative;
    z-index: 2;
    padding: 20px;
  }

  .logo {
    position: absolute;
    top: 18px;
    width: var(--diapstash-logo-width, 82px);
    height: auto;
    opacity: .96;
    z-index: 3;
    pointer-events: none;
    filter: drop-shadow(0 2px 5px rgba(0,0,0,.22)) drop-shadow(0 0 10px rgba(255,255,255,.16));
  }

  .logo.right { right: 20px; }
  .logo.left { left: 20px; }

  .title {
    margin: 0;
    padding-right: 92px;
    font-size: 1.26rem;
    font-weight: 780;
    line-height: 1.08;
    letter-spacing: -.025em;
    text-wrap: balance;
    text-shadow: 0 1px 2px rgba(0,0,0,.22);
  }

  .logo.left + .header .title,
  .logo-left-padding {
    padding-left: 92px;
    padding-right: 0;
  }

  .subtitle {
    color: var(--ds-text-muted);
    margin-top: 6px;
    line-height: 1.25;
    font-weight: 500;
  }

  .layout {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 18px;
  }

  .product-image,
  .placeholder-image {
    width: var(--diapstash-image-size, 112px);
    height: var(--diapstash-image-size, 112px);
    border-radius: 30px;
    background:
      linear-gradient(145deg, var(--ds-surface-strong), var(--ds-surface)),
      radial-gradient(120% 90% at 0% 0%, var(--ds-tint-b), transparent 70%);
    border: 1px solid rgba(255,255,255,.31);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.35),
      inset 0 -1px 0 rgba(255,255,255,.08),
      0 12px 30px rgba(0,0,0,.22);
  }

  .product-image {
    object-fit: cover;
  }

  .placeholder-image {
    display: grid;
    place-items: center;
  }

  .placeholder-image ha-icon {
    color: var(--ds-accent);
    --mdc-icon-size: 42px;
    filter: drop-shadow(0 0 14px color-mix(in srgb, var(--ds-accent) 42%, transparent));
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 14px;
  }

  .chip {
    --chip-color: var(--ds-accent);
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-height: 31px;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.20);
    background:
      linear-gradient(135deg, var(--ds-surface-strong), var(--ds-surface));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.34), inset 0 -1px 0 rgba(255,255,255,.08), 0 5px 18px rgba(0,0,0,.10);
    font-size: .82rem;
    font-weight: 720;
    white-space: nowrap;
    backdrop-filter: blur(24px) saturate(190%);
    -webkit-backdrop-filter: blur(24px) saturate(190%);
  }

  .chip ha-icon {
    --mdc-icon-size: 18px;
  }

  .chip {
    color: var(--primary-text-color);
    text-shadow: 0 1px 2px rgba(0,0,0,.28);
  }

  .chip.accent { --chip-color: var(--ds-accent); }
  .chip.success { --chip-color: var(--ds-success); }
  .chip.warning { --chip-color: var(--ds-warning); }
  .chip.error { --chip-color: var(--ds-error); }

  .chip.accent,
  .chip.success,
  .chip.warning,
  .chip.error {
    color: var(--primary-text-color);
  }

  .chip.accent ha-icon,
  .chip.success ha-icon,
  .chip.warning ha-icon,
  .chip.error ha-icon {
    color: var(--chip-color);
    filter: drop-shadow(0 0 7px color-mix(in srgb, var(--chip-color) 48%, transparent));
  }

  ha-card.high-contrast .chip {
    color: #fff;
    background:
      linear-gradient(135deg, rgba(0,0,0,.34), rgba(0,0,0,.18)),
      linear-gradient(135deg, color-mix(in srgb, var(--chip-color, var(--ds-accent)) 22%, rgba(255,255,255,.20)), rgba(255,255,255,.07));
    border-color: rgba(255,255,255,.32);
    text-shadow: 0 1px 3px rgba(0,0,0,.62);
  }

  ha-card.high-contrast .chip ha-icon {
    filter: drop-shadow(0 0 9px color-mix(in srgb, var(--chip-color, var(--ds-accent)) 62%, transparent));
  }

  ha-card.high-contrast .meta-label,
  ha-card.high-contrast .metric-label,
  ha-card.high-contrast .subtitle {
    color: rgba(255,255,255,.78);
    text-shadow: 0 1px 2px rgba(0,0,0,.45);
  }

  ha-card.high-contrast .meta-value,
  ha-card.high-contrast .metric-value,
  ha-card.high-contrast .list-label,
  ha-card.high-contrast .list-value {
    color: #fff;
    text-shadow: 0 1px 3px rgba(0,0,0,.45);
  }

  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 16px;
  }

  .meta-item,
  .metric,
  .list-row,
  .button,
  .empty,
  .missing {
    border: 1px solid rgba(255,255,255,.18);
    background:
      linear-gradient(145deg, var(--ds-surface-strong), var(--ds-surface));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.30),
      inset 0 -1px 0 rgba(255,255,255,.07),
      0 6px 20px rgba(0,0,0,.10);
    backdrop-filter: blur(22px) saturate(180%);
    -webkit-backdrop-filter: blur(22px) saturate(180%);
  }

  .meta-item {
    border-radius: 22px;
    padding: 12px;
  }

  .meta-label {
    font-size: .72rem;
    color: var(--ds-text-muted);
    margin-bottom: 4px;
    font-weight: 560;
  }

  .meta-value {
    font-weight: 760;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    margin-top: 17px;
  }

  .metric {
    border-radius: 24px;
    padding: 13px 8px 12px;
    text-align: center;
    min-width: 0;
  }

  .metric-value {
    font-size: 1.34rem;
    font-weight: 820;
    line-height: 1.1;
    letter-spacing: -.02em;
  }

  .metric-label {
    color: var(--ds-text-muted);
    font-size: .72rem;
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 560;
  }

  .section-title {
    margin: 20px 0 10px;
    font-size: .9rem;
    font-weight: 780;
    color: var(--primary-text-color);
    letter-spacing: -.01em;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 9px;
  }

  .list-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    padding: 12px 15px;
    border-radius: 22px;
    transition: transform .18s ease, background .18s ease, border-color .18s ease;
  }

  .list-row:hover,
  .button:hover,
  .clickable:hover .product-image,
  .clickable:hover .placeholder-image {
    transform: translateY(-1px);
  }

  .list-row:hover {
    background: linear-gradient(145deg, rgba(255,255,255,.28), var(--ds-surface-strong));
    border-color: rgba(255,255,255,.30);
  }

  .list-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .list-value {
    font-weight: 820;
  }


  .tone-0 { --tone: var(--ds-tint-a); }
  .tone-1 { --tone: var(--ds-tint-b); }
  .tone-2 { --tone: var(--ds-tint-c); }
  .tone-3 { --tone: color-mix(in srgb, var(--ds-accent) 36%, transparent); }
  .tone-4 { --tone: color-mix(in srgb, var(--ds-purple) 34%, transparent); }
  .tone-5 { --tone: color-mix(in srgb, var(--ds-cyan) 34%, transparent); }

  .metric[class*="tone-"],
  .list-row[class*="tone-"],
  .meta-item[class*="tone-"] {
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--tone) 72%, var(--ds-surface-strong)), color-mix(in srgb, var(--tone) 28%, var(--ds-surface))),
      radial-gradient(120% 100% at 0% 0%, rgba(255,255,255,.24), transparent 70%);
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 16px;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-height: 36px;
    padding: 7px 13px;
    border-radius: 999px;
    text-decoration: none;
    color: var(--primary-text-color);
    font-weight: 760;
    transition: transform .18s ease, filter .18s ease;
  }

  .button ha-icon {
    --mdc-icon-size: 18px;
  }

  .button.primary {
    color: white;
    border-color: color-mix(in srgb, var(--ds-accent) 70%, white 18%);
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--ds-accent) 82%, white 18%), color-mix(in srgb, var(--ds-accent) 62%, var(--ds-purple) 38%));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 8px 24px color-mix(in srgb, var(--ds-accent) 35%, transparent);
  }

  .warning-card {
    background:
      linear-gradient(145deg, rgba(255,159,10,.20), rgba(255,255,255,.055));
    border-color: rgba(255,159,10,.32);
  }

  .empty,
  .missing {
    display: flex;
    gap: 10px;
    align-items: center;
    min-height: 64px;
    color: var(--ds-text-muted);
    border-radius: 22px;
    padding: 12px 14px;
  }

  .clickable { cursor: pointer; }



  /* Refined Apple Liquid Glass inspired finish: calmer color, stronger optical depth. */
  ha-card.finish-elegant {
    --ds-radius: var(--diapstash-card-radius, 36px);
    border-color: rgba(255,255,255,.34);
    background:
      linear-gradient(145deg, rgba(255,255,255,.23) 0%, rgba(255,255,255,.075) 38%, rgba(255,255,255,.035) 66%, rgba(255,255,255,.13) 100%),
      radial-gradient(120% 105% at -8% -10%, color-mix(in srgb, var(--ds-tint-a) 54%, rgba(255,255,255,.18)), transparent 62%),
      radial-gradient(90% 90% at 108% 0%, color-mix(in srgb, var(--ds-tint-b) 56%, transparent), transparent 70%),
      radial-gradient(90% 100% at 0% 115%, color-mix(in srgb, var(--ds-tint-c) 52%, transparent), transparent 78%),
      rgba(18, 18, 22, .20);
    box-shadow:
      0 28px 80px rgba(0,0,0,.34),
      0 10px 28px rgba(0,0,0,.22),
      inset 0 1px 0 rgba(255,255,255,.64),
      inset 1px 0 0 rgba(255,255,255,.16),
      inset -1px 0 0 rgba(255,255,255,.08),
      inset 0 -1px 0 rgba(255,255,255,.13);
    backdrop-filter: blur(46px) saturate(190%) brightness(1.08) contrast(1.02);
    -webkit-backdrop-filter: blur(46px) saturate(190%) brightness(1.08) contrast(1.02);
  }

  ha-card.finish-elegant::before {
    opacity: .72;
    background:
      radial-gradient(500px 190px at 12% -16%, rgba(255,255,255,.58), rgba(255,255,255,.12) 38%, transparent 70%),
      radial-gradient(340px 240px at 106% -8%, color-mix(in srgb, var(--ds-cyan) 20%, transparent), transparent 74%),
      radial-gradient(340px 260px at -10% 110%, color-mix(in srgb, var(--ds-purple) 18%, transparent), transparent 74%);
  }

  ha-card.finish-elegant::after {
    opacity: .74;
    background:
      linear-gradient(118deg, rgba(255,255,255,.66) 0%, rgba(255,255,255,.20) 8%, transparent 24%),
      linear-gradient(310deg, transparent 57%, rgba(255,255,255,.11) 76%, rgba(255,255,255,.40) 100%);
  }

  ha-card.finish-elegant .logo {
    width: var(--diapstash-logo-width, 76px);
    opacity: .92;
  }

  ha-card.finish-elegant .title {
    font-weight: 760;
    letter-spacing: -.03em;
  }

  ha-card.finish-elegant .product-image,
  ha-card.finish-elegant .placeholder-image,
  ha-card.finish-elegant .meta-item,
  ha-card.finish-elegant .metric,
  ha-card.finish-elegant .list-row,
  ha-card.finish-elegant .button,
  ha-card.finish-elegant .chip {
    border-color: rgba(255,255,255,.30);
    background:
      linear-gradient(145deg, rgba(255,255,255,.24), rgba(255,255,255,.075)),
      radial-gradient(120% 100% at 0% 0%, color-mix(in srgb, var(--tone, var(--ds-tint-a)) 34%, transparent), transparent 72%);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.46),
      inset 0 -1px 0 rgba(255,255,255,.10),
      0 8px 24px rgba(0,0,0,.14);
  }

  ha-card.finish-elegant .metric[class*="tone-"],
  ha-card.finish-elegant .list-row[class*="tone-"],
  ha-card.finish-elegant .meta-item[class*="tone-"] {
    background:
      linear-gradient(145deg, rgba(255,255,255,.24), rgba(255,255,255,.07)),
      radial-gradient(130% 110% at 0% 0%, color-mix(in srgb, var(--tone) 45%, transparent), transparent 76%);
  }

  ha-card.finish-elegant.high-contrast .chip {
    background:
      linear-gradient(135deg, rgba(0,0,0,.28), rgba(0,0,0,.13)),
      radial-gradient(120% 100% at 0% 0%, color-mix(in srgb, var(--chip-color, var(--ds-accent)) 26%, rgba(255,255,255,.18)), transparent 72%);
  }


  @supports not (color: color-mix(in srgb, red 50%, blue)) {
    :host {
      --ds-text-muted: rgba(235,235,245,.62);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .list-row,
    .button,
    .product-image,
    .placeholder-image {
      transition: none;
    }
  }

  @media (max-width: 420px) {
    .layout {
      grid-template-columns: 1fr;
    }
    .product-image,
    .placeholder-image {
      width: 100px;
      height: 100px;
    }
    .metric-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .meta-grid {
      grid-template-columns: 1fr;
    }
  }
`

class DiapStashBaseCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._config = undefined;
    this._hass = undefined;
    this.shadowRoot.addEventListener("click", (event) => this._handleClick(event));
  }

  setConfig(config) {
    const raw = config || {};
    const preset = raw.preset ? (PRESETS[raw.preset] || {}) : {};
    this._config = deepMerge(deepMerge(this.defaultConfig(), preset), raw);
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  defaultConfig() {
    return {
      language: "auto",
      logo: DEFAULT_LOGO,
      dark_logo: DEFAULT_DARK_LOGO,
      logo_variant: "auto",
      logo_position: "right",
      appearance: "liquid",
      preset: undefined,
      finish: "elegant",
      palette: "diapstash",
      colors: {},
      text_contrast: "high",
      glass: true,
    };
  }

  getCardSize() {
    return 4;
  }


  paletteStyle() {
    const name = this._config?.palette || this._config?.theme || "diapstash";
    const palette = PALETTES[name] || PALETTES.diapstash;
    return styleVars({ ...palette, ...(this._config?.colors || {}) });
  }

  getLogoHtml() {
    const pos = this._config?.logo_position === "left" ? "left" : "right";
    const variant = this._config?.logo_variant || "auto";
    const darkMode = Boolean(this._hass?.themes?.darkMode);
    const autoLogo = variant === "dark" || (variant === "auto" && darkMode)
      ? (this._config?.dark_logo || DEFAULT_DARK_LOGO)
      : DEFAULT_LOGO;
    const logo = safeUrl(this._config?.logo || autoLogo);
    if (!logo) return "";
    return `<img class="logo ${pos}" src="${escapeHtml(logo)}" alt="DiapStash">`;
  }

  cardClass(extra = "") {
    const appearance = this._config?.glass === false ? "no-glass" : (this._config?.appearance || "liquid");
    const contrast = this._config?.text_contrast === "soft" ? "" : "high-contrast";
    const finish = this._config?.finish || "elegant";
    return `${appearance} finish-${finish} ${contrast} ${extra}`.trim();
  }

  missing(message, entityId = "") {
    return `
      <style>${SHARED_CSS}</style>
      <ha-card class="${this.cardClass()}" style="${this.paletteStyle()}">
        <div class="card-inner">
          ${this.getLogoHtml()}
          <div class="missing ${entityId ? "clickable" : ""}" ${entityId ? `data-entity="${escapeHtml(entityId)}"` : ""}>
            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
            <div>${escapeHtml(message)}</div>
          </div>
        </div>
      </ha-card>`;
  }


  resolveEntity(primary, fallbacks = []) {
    const candidates = [primary, ...fallbacks].filter(Boolean);
    return candidates.find((id) => stateObj(this._hass, id)) || primary;
  }

  _handleClick(event) {
    const target = event.target.closest("[data-entity]");
    if (!target) return;
    const entityId = target.getAttribute("data-entity");
    if (!entityId) return;
    event.preventDefault();
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }));
  }

  render() {}
}

class DiapStashCurrentCard extends DiapStashBaseCard {
  defaultConfig() {
    return deepMerge(super.defaultConfig(), {
      type: "custom:diapstash-current-card",
      entity: "sensor.diapstash_current_diaper",
      entity_fallbacks: ["sensor.diapstash_aktuelle_windel"],
      wearing_entity: "binary_sensor.diapstash_wearing",
      duration_entity: "sensor.diapstash_wearing_duration_text",
      duration_entity_fallbacks: ["sensor.diapstash_tragedauer"],
      streak_entity: "sensor.diapstash_current_streak",
      show: {
        image: true,
        brand: true,
        size: true,
        start_time: true,
        stats: true,
        streak: true,
      },
    });
  }

  static getStubConfig() {
    return {
      entity: "sensor.diapstash_current_diaper",
      entity_fallbacks: ["sensor.diapstash_aktuelle_windel"],
      wearing_entity: "binary_sensor.diapstash_wearing",
      duration_entity: "sensor.diapstash_wearing_duration_text",
      duration_entity_fallbacks: ["sensor.diapstash_tragedauer"],
      streak_entity: "sensor.diapstash_current_streak",
      language: "auto",
      logo_position: "right",
    };
  }

  getCardSize() { return 4; }

  render() {
    if (!this._config || !this._hass) return;
    const entityId = this.resolveEntity(this._config.entity, this._config.entity_fallbacks || []);
    if (!entityId) {
      this.shadowRoot.innerHTML = this.missing(l(this._hass, this._config, "configureEntity"));
      return;
    }
    const current = stateObj(this._hass, entityId);
    if (!current) {
      this.shadowRoot.innerHTML = this.missing(`${l(this._hass, this._config, "missingEntity")}: ${this._config.entity}`, this._config.entity);
      return;
    }

    const wearingState = stateObj(this._hass, this._config.wearing_entity);
    const durationEntityId = this.resolveEntity(this._config.duration_entity, this._config.duration_entity_fallbacks || []);
    const durationState = stateObj(this._hass, durationEntityId);
    const streakState = stateObj(this._hass, this._config.streak_entity);
    const wearing = attr(current, "wearing") === true || wearingState?.state === "on";
    const image = safeUrl(attr(current, "entity_picture") || attr(current, "image_url"));
    const name = safe(attr(current, "diaper_name"), safe(current.state, l(this._hass, this._config, "currentDiaper")));
    const brand = safe(attr(current, "brand"));
    const size = safe(attr(current, "size"));
    const variant = safe(attr(current, "variant"), "");
    const duration = safe(attr(current, "duration_text"), safe(durationState?.state));
    const startTime = formatDateTime(attr(current, "start_time"), this._hass, this._config);
    const month = safe(attr(current, "month_count"), stateObj(this._hass, "sensor.diapstash_month_changes")?.state || "—");
    const year = safe(attr(current, "year_count"), stateObj(this._hass, "sensor.diapstash_year_changes")?.state || "—");
    const total = safe(attr(current, "total_changes"), stateObj(this._hass, "sensor.diapstash_total_changes")?.state || "—");
    const streakCount = attr(current, "streak_count");
    const streak = streakState ? entityDisplay(streakState, "—", this._hass, this._config) : safe(streakCount, "—");
    const logoLeftClass = this._config.logo_position === "left" ? "logo-left-padding" : "";

    this.shadowRoot.innerHTML = `
      <style>${SHARED_CSS}</style>
      <ha-card class="${this.cardClass(wearing ? "is-wearing" : "")}" style="${this.paletteStyle()}">
        <div class="card-inner">
          ${this.getLogoHtml()}
          <div class="layout clickable" data-entity="${escapeHtml(entityId)}">
            ${this._config.show?.image === false ? "" : image
              ? `<img class="product-image" src="${escapeHtml(image)}" alt="${escapeHtml(name)}">`
              : `<div class="placeholder-image"><ha-icon icon="mdi:wardrobe-outline"></ha-icon></div>`}
            <div>
              <div class="title ${logoLeftClass}">${escapeHtml(name)}</div>
              <div class="subtitle">
                ${this._config.show?.brand === false ? "" : `${escapeHtml(brand)}`}
                ${this._config.show?.size === false ? "" : ` · ${escapeHtml(l(this._hass, this._config, "size"))} ${escapeHtml(size)}`}
                ${variant ? ` · ${escapeHtml(variant)}` : ""}
              </div>
              <div class="chips">
                <span class="chip accent"><ha-icon icon="mdi:timer-outline"></ha-icon>${escapeHtml(duration)}</span>
                <span class="chip ${wearing ? "success" : ""}"><ha-icon icon="mdi:checkbox-blank-circle-outline"></ha-icon>${escapeHtml(wearing ? l(this._hass, this._config, "wearing") : l(this._hass, this._config, "notWearing"))}</span>
              </div>
            </div>
          </div>

          <div class="meta-grid">
            ${this._config.show?.start_time === false ? "" : `
              <div class="meta-item tone-0">
                <div class="meta-label">${escapeHtml(l(this._hass, this._config, "startTime"))}</div>
                <div class="meta-value">${escapeHtml(startTime)}</div>
              </div>`}
            <div class="meta-item tone-1">
              <div class="meta-label">${escapeHtml(l(this._hass, this._config, "duration"))}</div>
              <div class="meta-value">${escapeHtml(duration)}</div>
            </div>
            ${this._config.show?.stats === false ? "" : `
              <div class="meta-item tone-2">
                <div class="meta-label">${escapeHtml(l(this._hass, this._config, "month"))} / ${escapeHtml(l(this._hass, this._config, "year"))}</div>
                <div class="meta-value">${escapeHtml(month)} / ${escapeHtml(year)}</div>
              </div>
              <div class="meta-item tone-3">
                <div class="meta-label">${escapeHtml(l(this._hass, this._config, "total"))}</div>
                <div class="meta-value">${escapeHtml(total)}</div>
              </div>`}
            ${this._config.show?.streak === false ? "" : `
              <div class="meta-item tone-4">
                <div class="meta-label">${escapeHtml(l(this._hass, this._config, "streak"))}</div>
                <div class="meta-value">${escapeHtml(streak)}</div>
              </div>`}
          </div>
        </div>
      </ha-card>`;
  }
}

class DiapStashStockOverviewCard extends DiapStashBaseCard {
  defaultConfig() {
    return deepMerge(super.defaultConfig(), {
      type: "custom:diapstash-stock-overview-card",
      entity: "sensor.diapstash_stock_overview",
      limit: "all",
      brand_limit: undefined,
      type_limit: undefined,
      show: {
        brands: true,
        types: true,
        locations: true,
        to_wash: true,
      },
    });
  }

  static getStubConfig() {
    return {
      entity: "sensor.diapstash_stock_overview",
      language: "auto",
      limit: "all",
      logo_position: "right",
    };
  }

  getCardSize() { return 5; }

  render() {
    if (!this._config || !this._hass) return;
    const entityId = this._config.entity;
    const stock = stateObj(this._hass, entityId);
    if (!stock) {
      this.shadowRoot.innerHTML = this.missing(`${l(this._hass, this._config, "missingEntity")}: ${entityId}`, entityId);
      return;
    }

    const total = attr(stock, "stock_total", stock.state);
    const entries = attr(stock, "stock_entries", stateObj(this._hass, "sensor.diapstash_stock_entries")?.state);
    const locationsCount = attr(stock, "stock_locations_count", stateObj(this._hass, "sensor.diapstash_stock_locations")?.state);
    const toWash = attr(stock, "stock_to_wash", stateObj(this._hass, "sensor.diapstash_stock_to_wash")?.state);
    const brands = asArray(attr(stock, "stock_by_brand"));
    const types = asArray(attr(stock, "stock_by_type"));
    const baseLimit = resolveLimit(this._config.limit, Infinity);
    const brandLimit = resolveLimit(this._config.brand_limit, baseLimit);
    const typeLimit = resolveLimit(this._config.type_limit, baseLimit);
    const logoLeftClass = this._config.logo_position === "left" ? "logo-left-padding" : "";

    const brandRows = limitArray(brands, brandLimit).map((item, index) => `
      <div class="list-row tone-${index % 6}">
        <span class="list-label">${escapeHtml(safe(item.brand))}</span>
        <span class="list-value">${escapeHtml(numberSafe(item.available))}</span>
      </div>`).join("");

    const typeRows = limitArray(types, typeLimit).map((item, index) => `
      <div class="list-row tone-${(index + 2) % 6}">
        <span class="list-label">${escapeHtml(safe(item.label || [item.brand, item.diaper_name, item.size].filter(Boolean).join(" ")))}</span>
        <span class="list-value">${escapeHtml(numberSafe(item.available))}</span>
      </div>`).join("");

    this.shadowRoot.innerHTML = `
      <style>${SHARED_CSS}</style>
      <ha-card class="${this.cardClass()}" style="${this.paletteStyle()}">
        <div class="card-inner clickable" data-entity="${escapeHtml(entityId)}">
          ${this.getLogoHtml()}
          <div class="title ${logoLeftClass}">${escapeHtml(l(this._hass, this._config, "stockOverview"))}</div>
          <div class="subtitle">${escapeHtml(l(this._hass, this._config, "stock"))}</div>

          <div class="metric-grid">
            ${metric(l(this._hass, this._config, "total"), total, 0)}
            ${metric(l(this._hass, this._config, "entries"), entries, 1)}
            ${this._config.show?.locations === false ? "" : metric(l(this._hass, this._config, "locations"), locationsCount, 2)}
            ${this._config.show?.to_wash === false ? "" : metric(l(this._hass, this._config, "toWash"), toWash, 3)}
          </div>

          ${this._config.show?.brands === false ? "" : `
            <div class="section-title">${escapeHtml(l(this._hass, this._config, "brands"))}</div>
            <div class="list">${brandRows || `<div class="empty">${escapeHtml(l(this._hass, this._config, "noData"))}</div>`}</div>`}

          ${this._config.show?.types === false ? "" : `
            <div class="section-title">${escapeHtml(l(this._hass, this._config, "types"))}</div>
            <div class="list">${typeRows || `<div class="empty">${escapeHtml(l(this._hass, this._config, "noData"))}</div>`}</div>`}
        </div>
      </ha-card>`;
  }
}

class DiapStashStockTypeCard extends DiapStashBaseCard {
  defaultConfig() {
    return deepMerge(super.defaultConfig(), {
      type: "custom:diapstash-stock-type-card",
      entity: undefined,
      fallback_to_first: true,
      stock_overview_entity: "sensor.diapstash_stock_overview",
      actions: {
        catalog: true,
        add: true,
      },
    });
  }

  static getStubConfig(hass) {
    const found = firstMatchingEntity(hass, (id) => id.startsWith("sensor.diapstash_stock_type_"));
    return {
      entity: found || "sensor.diapstash_stock_type_98_l",
      language: "auto",
      logo_position: "right",
    };
  }

  getCardSize() { return 4; }

  render() {
    if (!this._config || !this._hass) return;
    let entityId = this._config.entity;
    let entity = stateObj(this._hass, entityId);
    if (!entity && this._config.fallback_to_first !== false) {
      entityId = firstMatchingEntity(this._hass, (id) => id.startsWith("sensor.diapstash_stock_type_"));
      entity = stateObj(this._hass, entityId);
    }
    if (!entity && this._config.stock_overview_entity) {
      const overview = stateObj(this._hass, this._config.stock_overview_entity);
      const firstType = asArray(attr(overview, "stock_by_type"))[0];
      if (firstType) {
        entityId = this._config.stock_overview_entity;
        entity = {
          state: firstType.available,
          attributes: {
            ...firstType,
            entity_picture: firstType.entity_picture || firstType.image_url,
          },
        };
      }
    }
    if (!entityId) {
      this.shadowRoot.innerHTML = this.missing(l(this._hass, this._config, "configureEntity"));
      return;
    }
    if (!entity) {
      this.shadowRoot.innerHTML = this.missing(`${l(this._hass, this._config, "missingEntity")}: ${this._config.entity}`, this._config.entity);
      return;
    }

    const label = safe(attr(entity, "label"), safe(entity.state, l(this._hass, this._config, "stockType")));
    const brand = safe(attr(entity, "brand"));
    const diaperName = safe(attr(entity, "diaper_name"), "");
    const size = safe(attr(entity, "size"));
    const available = attr(entity, "available", entity.state);
    const image = safeUrl(attr(entity, "entity_picture") || attr(entity, "image_url"));
    const catalogUrl = safeUrl(attr(entity, "catalog_url"));
    const addUrl = safeUrl(attr(entity, "add_url"));
    const locations = asArray(attr(entity, "stock_locations"));
    const logoLeftClass = this._config.logo_position === "left" ? "logo-left-padding" : "";

    const locationRows = locations.map((loc, index) => `
      <div class="list-row tone-${index % 6}">
        <span class="list-label">${escapeHtml(safe(loc.stock_name || loc.name))}</span>
        <span class="list-value">${escapeHtml(numberSafe(loc.available))}</span>
      </div>`).join("");

    const actions = `
      <div class="actions">
        ${this._config.actions?.catalog === false || !catalogUrl ? "" : `<a class="button" href="${escapeHtml(catalogUrl)}" target="_blank" rel="noopener noreferrer"><ha-icon icon="mdi:open-in-new"></ha-icon>${escapeHtml(l(this._hass, this._config, "catalog"))}</a>`}
        ${this._config.actions?.add === false || !addUrl ? "" : `<a class="button primary" href="${escapeHtml(addUrl)}" target="_blank" rel="noopener noreferrer"><ha-icon icon="mdi:plus"></ha-icon>${escapeHtml(l(this._hass, this._config, "add"))}</a>`}
      </div>`;

    this.shadowRoot.innerHTML = `
      <style>${SHARED_CSS}</style>
      <ha-card class="${this.cardClass()}" style="${this.paletteStyle()}">
        <div class="card-inner">
          ${this.getLogoHtml()}
          <div class="layout clickable" data-entity="${escapeHtml(entityId)}">
            ${image ? `<img class="product-image" src="${escapeHtml(image)}" alt="${escapeHtml(label)}">` : `<div class="placeholder-image"><ha-icon icon="mdi:package-variant-closed"></ha-icon></div>`}
            <div>
              <div class="title ${logoLeftClass}">${escapeHtml(label)}</div>
              <div class="subtitle">${escapeHtml([brand, diaperName, size !== "—" ? `${l(this._hass, this._config, "size")} ${size}` : ""].filter(Boolean).join(" · "))}</div>
              <div class="chips">
                <span class="chip accent"><ha-icon icon="mdi:counter"></ha-icon>${escapeHtml(l(this._hass, this._config, "available"))}: ${escapeHtml(numberSafe(available))}</span>
                ${locations.length ? `<span class="chip"><ha-icon icon="mdi:map-marker-outline"></ha-icon>${locations.length} ${escapeHtml(l(this._hass, this._config, "locations"))}</span>` : ""}
              </div>
            </div>
          </div>

          <div class="section-title">${escapeHtml(l(this._hass, this._config, "locations"))}</div>
          <div class="list">${locationRows || `<div class="empty">${escapeHtml(l(this._hass, this._config, "noData"))}</div>`}</div>
          ${actions}
        </div>
      </ha-card>`;
  }
}

class DiapStashLowStockCard extends DiapStashBaseCard {
  defaultConfig() {
    return deepMerge(super.defaultConfig(), {
      type: "custom:diapstash-low-stock-card",
      auto_discover: true,
      entities: [],
      entity_prefix: "diapstash",
      low_stock_prefix: undefined,
      stock_type_prefix: undefined,
      show_empty: true,
      account_id: undefined,
      limit: 20,
    });
  }

  static getStubConfig() {
    return {
      auto_discover: true,
      entity_prefix: "diapstash",
      language: "auto",
      logo_position: "right",
    };
  }

  getCardSize() { return 4; }

  getEntries() {
    const hass = this._hass;
    const config = this._config;
    const explicit = asArray(config.entities).filter(Boolean);
    const lowPrefix = config.low_stock_prefix || `binary_sensor.${config.entity_prefix}_low_stock_`;
    const typePrefix = config.stock_type_prefix || `sensor.${config.entity_prefix}_stock_type_`;
    let ids = explicit;

    if (!ids.length && config.auto_discover !== false) {
      ids = Object.keys(hass.states).filter((id) => id.startsWith(lowPrefix));
    }

    return ids
      .map((id) => ({ id, low: hass.states[id] }))
      .filter(({ low }) => low && low.state === "on")
      .filter(({ low }) => !config.account_id || low.attributes?.account_id === config.account_id)
      .slice(0, Number(config.limit || 20))
      .map(({ id, low }) => {
        const suffix = id.startsWith(lowPrefix) ? id.slice(lowPrefix.length) : id.split("low_stock_").pop();
        const mapped = config.type_entities?.[id] || config.type_entities?.[suffix];
        const typeEntityId = mapped || `${typePrefix}${suffix}`;
        const typeEntity = hass.states[typeEntityId];
        return { id, low, suffix, typeEntityId, typeEntity };
      });
  }

  render() {
    if (!this._config || !this._hass) return;
    const entries = this.getEntries();
    const logoLeftClass = this._config.logo_position === "left" ? "logo-left-padding" : "";

    const rows = entries.map(({ id, low, typeEntityId, typeEntity }) => {
      const label = safe(attr(typeEntity, "label"), attr(low, "friendly_name", id));
      const available = safe(attr(typeEntity, "available"), safe(typeEntity?.state, "—"));
      const image = safeUrl(attr(typeEntity, "entity_picture") || attr(typeEntity, "image_url"));
      const addUrl = safeUrl(attr(typeEntity, "add_url"));
      const catalogUrl = safeUrl(attr(typeEntity, "catalog_url"));
      return `
        <div class="list-row warning-card tone-3 clickable" data-entity="${escapeHtml(typeEntity ? typeEntityId : id)}">
          <div class="list-label" style="display:flex;align-items:center;gap:10px;min-width:0;">
            ${image ? `<img src="${escapeHtml(image)}" alt="" style="width:34px;height:34px;border-radius:10px;object-fit:cover;">` : `<ha-icon icon="mdi:alert-outline" style="color:var(--ds-warning)"></ha-icon>`}
            <div style="min-width:0;">
              <div style="font-weight:850;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(label)}</div>
              <div style="color:var(--ds-text-muted);font-size:.78rem;">${escapeHtml(l(this._hass, this._config, "available"))}: ${escapeHtml(available)}</div>
            </div>
          </div>
          <div class="actions" style="margin:0;justify-content:flex-end;">
            ${catalogUrl ? `<a class="button" href="${escapeHtml(catalogUrl)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(l(this._hass, this._config, "catalog"))}"><ha-icon icon="mdi:open-in-new"></ha-icon></a>` : ""}
            ${addUrl ? `<a class="button primary" href="${escapeHtml(addUrl)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(l(this._hass, this._config, "add"))}"><ha-icon icon="mdi:plus"></ha-icon></a>` : ""}
          </div>
        </div>`;
    }).join("");

    this.shadowRoot.innerHTML = `
      <style>${SHARED_CSS}</style>
      <ha-card class="${this.cardClass(entries.length ? "has-low-stock" : "")}" style="${this.paletteStyle()}">
        <div class="card-inner">
          ${this.getLogoHtml()}
          <div class="title ${logoLeftClass}">${escapeHtml(l(this._hass, this._config, "lowStock"))}</div>
          <div class="subtitle">${entries.length ? `${entries.length} ${escapeHtml(l(this._hass, this._config, "types"))}` : escapeHtml(l(this._hass, this._config, "noLowStock"))}</div>
          <div class="list" style="margin-top:16px;">
            ${rows || (this._config.show_empty === false ? "" : `<div class="empty"><ha-icon icon="mdi:check-circle-outline" style="color:var(--ds-success)"></ha-icon>${escapeHtml(l(this._hass, this._config, "noLowStock"))}</div>`)}
          </div>
        </div>
      </ha-card>`;
  }
}

customElements.define("diapstash-current-card", DiapStashCurrentCard);
customElements.define("diapstash-stock-overview-card", DiapStashStockOverviewCard);
customElements.define("diapstash-stock-type-card", DiapStashStockTypeCard);
customElements.define("diapstash-low-stock-card", DiapStashLowStockCard);

window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "diapstash-current-card",
    name: "DiapStash Current Card",
    description: "Shows the currently worn diaper with image, status, duration and stats.",
    preview: true,
  },
  {
    type: "diapstash-stock-overview-card",
    name: "DiapStash Stock Overview Card",
    description: "Shows total stock, entries, locations, brands and types.",
    preview: true,
  },
  {
    type: "diapstash-stock-type-card",
    name: "DiapStash Stock Type Card",
    description: "Shows one stock type with product image, locations and DiapStash links.",
    preview: true,
  },
  {
    type: "diapstash-low-stock-card",
    name: "DiapStash Low Stock Card",
    description: "Auto-discovers DiapStash low-stock binary sensors and links them to stock-type sensors.",
    preview: true,
  },
);

console.info(
  `%c DIAPSTASH-CARD %c ${DIAPSTASH_CARD_VERSION} `,
  "color: white; background: #43239b; font-weight: 700;",
  "color: white; background: #22b8cf; font-weight: 700;",
);
