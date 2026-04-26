(function initCompareDualLab() {
  const fieldRoots = {
    A: document.getElementById("brewFieldsA"),
    B: document.getElementById("brewFieldsB")
  };
  const canvasRoots = {
    A: document.getElementById("flavorRadarCanvasA"),
    B: document.getElementById("flavorRadarCanvasB")
  };
  const metricRoots = {
    A: document.getElementById("flavorMetricGridA"),
    B: document.getElementById("flavorMetricGridB")
  };
  const compareSummaryGridEl = document.getElementById("compareSummaryGrid");
  const compareSummaryNoteEl = document.getElementById("compareSummaryNote");

  if (!fieldRoots.A || !fieldRoots.B || !canvasRoots.A || !canvasRoots.B || !metricRoots.A || !metricRoots.B || !compareSummaryGridEl) {
    return;
  }

  const flavorMetrics = [
    { key: "acidity", label: "Acidity", color: "#d07b3a" },
    { key: "body", label: "Body", color: "#6a4e3a" },
    { key: "sweetness", label: "Sweetness", color: "#4a7f6b" },
    { key: "bitterness", label: "Bitterness", color: "#7e6147" },
    { key: "aroma", label: "Aroma", color: "#9a6e3f" }
  ];

  const optionSets = {
    coffeeType: [
      { value: "java-robusta", label: "Java Robusta" },
      { value: "java-arabica", label: "Java Arabica" },
      { value: "java-excelsa", label: "Java Excelsa" },
      { value: "java-liberica", label: "Java Liberica" },
      { value: "blend", label: "Javanese Blend" },
      { value: "custom", label: "Custom" }
    ],
    brewTool: [
      { value: "v60", label: "V60" },
      { value: "kalita", label: "Kalita Wave" },
      { value: "aeropress", label: "Aeropress" },
      { value: "frenchpress", label: "French Press" },
      { value: "chemex", label: "Chemex" },
      { value: "syphon", label: "Syphon" },
      { value: "espresso", label: "Espresso Maker" },
      { value: "mokapot", label: "Moka Pot" },
      { value: "coldBrew", label: "Cold Brew" },
      { value: "coldDrip", label: "Cold Drip Tower" }
    ],
    processMethod: [
      { value: "washed", label: "Washed" },
      { value: "fullWashed", label: "Full Washed" },
      { value: "natural", label: "Natural / Dry" },
      { value: "honeyYellow", label: "Honey - Yellow" },
      { value: "honeyRed", label: "Honey - Red" },
      { value: "honeyBlack", label: "Honey - Black" },
      { value: "pulpedNatural", label: "Pulped Natural" },
      { value: "semiWashed", label: "Semi Washed" },
      { value: "wetHulled", label: "Wet Hulled / Giling Basah" },
      { value: "anaerobicNatural", label: "Anaerobic Natural" },
      { value: "anaerobicWashed", label: "Anaerobic Washed" },
      { value: "carbonicMaceration", label: "Carbonic Maceration" },
      { value: "wineProcess", label: "Wine Process" },
      { value: "lacticFermentation", label: "Lactic Fermentation" },
      { value: "yeastInoculated", label: "Yeast Inoculated" },
      { value: "extendedFermentation", label: "Extended Fermentation" },
      { value: "doubleFermentation", label: "Double Fermentation" },
      { value: "thermalShock", label: "Thermal Shock" },
      { value: "monsooned", label: "Monsooned" },
      { value: "coferment", label: "Co-ferment (Eksperimental)" }
    ],
    varietal: [
      { value: "typica", label: "Typica" },
      { value: "bourbon", label: "Bourbon" },
      { value: "caturra", label: "Caturra" },
      { value: "catuai", label: "Catuai" },
      { value: "mundoNovo", label: "Mundo Novo" },
      { value: "catimor", label: "Catimor" },
      { value: "sarchimor", label: "Sarchimor" },
      { value: "castillo", label: "Castillo" },
      { value: "colombia", label: "Colombia" },
      { value: "geisha", label: "Geisha / Gesha" },
      { value: "sl28", label: "SL28" },
      { value: "sl34", label: "SL34" },
      { value: "pacamara", label: "Pacamara" },
      { value: "maragogype", label: "Maragogype" },
      { value: "pacas", label: "Pacas" },
      { value: "java", label: "Java" },
      { value: "ethiopianHeirloom", label: "Ethiopian Heirloom" },
      { value: "sidra", label: "Sidra" },
      { value: "wushWush", label: "Wush Wush" },
      { value: "rudolph", label: "Rudolph" },
      { value: "ruiru11", label: "Ruiru 11" },
      { value: "batian", label: "Batian" },
      { value: "timorHybrid", label: "Timor Hybrid" },
      { value: "s795", label: "S795" },
      { value: "s288", label: "S288" },
      { value: "pache", label: "Pache" },
      { value: "villaSarchi", label: "Villa Sarchi" },
      { value: "obata", label: "Obata" },
      { value: "garnica", label: "Garnica" },
      { value: "moka", label: "Moka" },
      { value: "libTek", label: "Liberica Tekisik/Local" },
      { value: "robustaClonal", label: "Robusta Clonal" }
    ],
    grind: [
      { value: "coarse", label: "Coarse" },
      { value: "medium", label: "Medium" },
      { value: "fine", label: "Fine" }
    ],
    roastLevel: [
      { value: "light", label: "Light" },
      { value: "medium", label: "Medium" },
      { value: "dark", label: "Dark" }
    ],
    ratio: [
      { value: "12", label: "1:12 (lebih bold)" },
      { value: "14", label: "1:14 (seimbang)" },
      { value: "16", label: "1:16 (lebih ringan)" }
    ],
    waterTemp: [
      { value: "88", label: "88°C" },
      { value: "90", label: "90°C" },
      { value: "92", label: "92°C" },
      { value: "93", label: "93°C" },
      { value: "94", label: "94°C" },
      { value: "96", label: "96°C" }
    ],
    waterHardness: [
      { value: "soft", label: "Soft" },
      { value: "balanced", label: "Balanced" },
      { value: "hard", label: "Hard" }
    ],
    agitation: [
      { value: "gentle", label: "Gentle" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" }
    ],
    targetTime: [
      { value: "2:30", label: "2:30" },
      { value: "3:00", label: "3:00" },
      { value: "3:30", label: "3:30" },
      { value: "4:00", label: "4:00" }
    ],
    beanDensity: [
      { value: "low", label: "Rendah" },
      { value: "medium", label: "Sedang" },
      { value: "high", label: "Tinggi" }
    ],
    restDays: [
      { value: "3", label: "3 hari" },
      { value: "7", label: "7 hari" },
      { value: "14", label: "14 hari" },
      { value: "21", label: "21 hari" },
      { value: "30", label: "30 hari" }
    ],
    waterAlkalinity: [
      { value: "low", label: "Rendah" },
      { value: "balanced", label: "Seimbang" },
      { value: "high", label: "Tinggi" }
    ],
    turbulence: [
      { value: "low", label: "Rendah" },
      { value: "medium", label: "Sedang" },
      { value: "high", label: "Tinggi" }
    ]
  };

  const fieldSchema = [
    { key: "coffeeType", label: "Jenis kopi", type: "select", options: optionSets.coffeeType, defaultValue: "java-arabica" },
    { key: "brewTool", label: "Alat penyeduhan", type: "select", options: optionSets.brewTool, defaultValue: "v60" },
    { key: "processMethod", label: "Proses kopi", type: "select", options: optionSets.processMethod, defaultValue: "washed" },
    { key: "varietal", label: "Varietas kopi", type: "select", options: optionSets.varietal, defaultValue: "typica" },
    { key: "grind", label: "Jenis gilingan", type: "select", options: optionSets.grind, defaultValue: "medium" },
    { key: "roastLevel", label: "Roast level", type: "select", options: optionSets.roastLevel, defaultValue: "medium" },
    { key: "beanDensity", label: "Densitas biji", type: "select", options: optionSets.beanDensity, defaultValue: "medium" },
    { key: "restDays", label: "Masa resting roast", type: "select", options: optionSets.restDays, defaultValue: "14" },
    { key: "waterAlkalinity", label: "Alkalinitas air", type: "select", options: optionSets.waterAlkalinity, defaultValue: "balanced" },
    { key: "turbulence", label: "Turbulensi aliran", type: "select", options: optionSets.turbulence, defaultValue: "medium" },
    { key: "dose", label: "Gramasi kopi (gram)", type: "number", min: 10, max: 40, step: 1, defaultValue: "20" },
    { key: "ratio", label: "Rasio kopi:air (1:x)", type: "select", options: optionSets.ratio, defaultValue: "14" },
    { key: "waterTemp", label: "Suhu air", type: "select", options: optionSets.waterTemp, defaultValue: "92" },
    { key: "waterHardness", label: "Mineral air", type: "select", options: optionSets.waterHardness, defaultValue: "balanced" },
    { key: "agitation", label: "Agitasi", type: "select", options: optionSets.agitation, defaultValue: "gentle" },
    { key: "targetTime", label: "Target brew time", type: "select", options: optionSets.targetTime, defaultValue: "3:00" }
  ];

  const coffeeFlavorBias = {
    "java-robusta": { acidity: -1.1, body: 1.8, sweetness: -0.3, bitterness: 1.6, aroma: 0.4 },
    "java-arabica": { acidity: 1.1, body: -0.3, sweetness: 0.8, bitterness: -0.6, aroma: 1.4 },
    "java-excelsa": { acidity: 1.5, body: 0.2, sweetness: 0.5, bitterness: -0.2, aroma: 1.1 },
    "java-liberica": { acidity: -0.2, body: 1.1, sweetness: 0.4, bitterness: 0.3, aroma: 1.3 },
    blend: { acidity: 0.2, body: 0.8, sweetness: 0.6, bitterness: 0.2, aroma: 0.9 },
    custom: { acidity: 0, body: 0, sweetness: 0, bitterness: 0, aroma: 0 }
  };

  const brewToolFlavorBias = {
    v60: { acidity: 1, body: -0.8, sweetness: 0.4, bitterness: -0.4, aroma: 1 },
    kalita: { acidity: 0.7, body: -0.1, sweetness: 0.6, bitterness: -0.2, aroma: 0.7 },
    chemex: { acidity: 0.9, body: -1, sweetness: 0.3, bitterness: -0.5, aroma: 1 },
    aeropress: { acidity: 0.3, body: 0.8, sweetness: 0.7, bitterness: 0.2, aroma: 0.5 },
    frenchpress: { acidity: -0.4, body: 1.5, sweetness: 0.4, bitterness: 0.8, aroma: 0.4 },
    syphon: { acidity: 0.8, body: 0.2, sweetness: 0.6, bitterness: -0.2, aroma: 0.9 },
    espresso: { acidity: -0.2, body: 2, sweetness: 0.8, bitterness: 1.5, aroma: 0.9 },
    mokapot: { acidity: -0.7, body: 1.6, sweetness: 0.2, bitterness: 1.4, aroma: 0.5 },
    coldBrew: { acidity: -1.3, body: 1.2, sweetness: 1, bitterness: -0.3, aroma: 0.4 },
    coldDrip: { acidity: 0.2, body: 0.6, sweetness: 0.9, bitterness: -0.2, aroma: 0.8 }
  };

  const processFlavorBias = {
    washed: { acidity: 0.7, body: -0.2, sweetness: 0.1, bitterness: -0.2, aroma: 0.4 },
    fullWashed: { acidity: 0.9, body: -0.3, sweetness: 0.1, bitterness: -0.3, aroma: 0.6 },
    natural: { acidity: 0.1, body: 0.8, sweetness: 0.9, bitterness: 0.2, aroma: 0.9 },
    honeyYellow: { acidity: 0.2, body: 0.5, sweetness: 0.8, bitterness: 0.1, aroma: 0.6 },
    honeyRed: { acidity: 0.1, body: 0.7, sweetness: 1, bitterness: 0.2, aroma: 0.7 },
    honeyBlack: { acidity: -0.2, body: 1, sweetness: 1.1, bitterness: 0.5, aroma: 0.8 },
    pulpedNatural: { acidity: 0.2, body: 0.5, sweetness: 0.7, bitterness: 0.1, aroma: 0.5 },
    semiWashed: { acidity: -0.3, body: 0.8, sweetness: 0.3, bitterness: 0.4, aroma: 0.3 },
    wetHulled: { acidity: -0.8, body: 1.3, sweetness: 0.1, bitterness: 0.7, aroma: 0.2 },
    anaerobicNatural: { acidity: 0.2, body: 0.7, sweetness: 1.1, bitterness: 0.3, aroma: 1.3 }
    ,
    anaerobicWashed: { acidity: 0.4, body: 0.5, sweetness: 0.8, bitterness: 0.2, aroma: 1.2 },
    carbonicMaceration: { acidity: 0.8, body: 0.3, sweetness: 0.8, bitterness: -0.1, aroma: 1.4 },
    wineProcess: { acidity: 0.4, body: 0.8, sweetness: 1, bitterness: 0.2, aroma: 1.3 },
    lacticFermentation: { acidity: -0.1, body: 0.5, sweetness: 0.9, bitterness: -0.1, aroma: 1 },
    yeastInoculated: { acidity: 0.5, body: 0.3, sweetness: 0.8, bitterness: -0.1, aroma: 1.3 },
    extendedFermentation: { acidity: -0.1, body: 0.8, sweetness: 0.9, bitterness: 0.5, aroma: 1.1 },
    doubleFermentation: { acidity: 0.2, body: 0.7, sweetness: 1, bitterness: 0.4, aroma: 1.2 },
    thermalShock: { acidity: 0.7, body: 0.1, sweetness: 0.7, bitterness: -0.2, aroma: 1.1 },
    monsooned: { acidity: -1.4, body: 1.5, sweetness: 0, bitterness: 0.8, aroma: 0.1 },
    coferment: { acidity: 0.4, body: 0.6, sweetness: 1.2, bitterness: 0.2, aroma: 1.5 }
  };

  const varietalFlavorBias = {
    typica: { acidity: 0.5, body: -0.1, sweetness: 0.6, bitterness: -0.2, aroma: 0.7 },
    bourbon: { acidity: 0.3, body: 0.2, sweetness: 0.8, bitterness: -0.1, aroma: 0.6 },
    caturra: { acidity: 0.3, body: 0, sweetness: 0.4, bitterness: 0, aroma: 0.4 },
    catuai: { acidity: 0.1, body: 0.2, sweetness: 0.5, bitterness: 0.1, aroma: 0.3 },
    mundoNovo: { acidity: -0.1, body: 0.6, sweetness: 0.4, bitterness: 0.2, aroma: 0.2 },
    catimor: { acidity: -0.3, body: 0.6, sweetness: 0.2, bitterness: 0.5, aroma: 0.1 },
    sarchimor: { acidity: -0.1, body: 0.5, sweetness: 0.3, bitterness: 0.4, aroma: 0.2 },
    castillo: { acidity: 0.1, body: 0.2, sweetness: 0.4, bitterness: 0.1, aroma: 0.3 },
    colombia: { acidity: 0.2, body: 0.2, sweetness: 0.5, bitterness: 0, aroma: 0.3 },
    geisha: { acidity: 0.9, body: -0.4, sweetness: 0.6, bitterness: -0.4, aroma: 1.6 },
    sl28: { acidity: 0.9, body: -0.1, sweetness: 0.5, bitterness: -0.2, aroma: 0.9 },
    sl34: { acidity: 0.5, body: 0.2, sweetness: 0.6, bitterness: -0.1, aroma: 0.8 },
    pacamara: { acidity: 0.5, body: 0.6, sweetness: 0.8, bitterness: 0.1, aroma: 1 },
    maragogype: { acidity: 0.3, body: -0.2, sweetness: 0.4, bitterness: -0.1, aroma: 0.5 },
    pacas: { acidity: 0.3, body: 0.1, sweetness: 0.5, bitterness: 0, aroma: 0.4 },
    java: { acidity: 0.4, body: 0, sweetness: 0.4, bitterness: -0.1, aroma: 0.6 },
    ethiopianHeirloom: { acidity: 0.8, body: -0.2, sweetness: 0.6, bitterness: -0.2, aroma: 1.2 },
    sidra: { acidity: 0.6, body: 0.1, sweetness: 0.8, bitterness: -0.1, aroma: 1.2 },
    wushWush: { acidity: 0.7, body: 0.1, sweetness: 0.7, bitterness: -0.1, aroma: 1.1 },
    rudolph: { acidity: 0.7, body: 0.2, sweetness: 0.8, bitterness: 0, aroma: 0.9 },
    ruiru11: { acidity: 0.1, body: 0.3, sweetness: 0.4, bitterness: 0.2, aroma: 0.3 },
    batian: { acidity: 0.4, body: 0.1, sweetness: 0.5, bitterness: 0, aroma: 0.6 },
    timorHybrid: { acidity: -0.4, body: 0.8, sweetness: 0.2, bitterness: 0.5, aroma: 0.1 },
    s795: { acidity: -0.1, body: 0.6, sweetness: 0.2, bitterness: 0.5, aroma: 0.3 },
    s288: { acidity: -0.2, body: 0.5, sweetness: 0.4, bitterness: 0.3, aroma: 0.4 },
    pache: { acidity: 0.3, body: 0.1, sweetness: 0.5, bitterness: 0, aroma: 0.5 },
    villaSarchi: { acidity: 0.2, body: 0, sweetness: 0.5, bitterness: 0, aroma: 0.5 },
    obata: { acidity: 0, body: 0.3, sweetness: 0.3, bitterness: 0.2, aroma: 0.2 },
    garnica: { acidity: 0.1, body: 0.2, sweetness: 0.4, bitterness: 0.1, aroma: 0.3 },
    moka: { acidity: 0.5, body: -0.1, sweetness: 0.5, bitterness: -0.1, aroma: 0.8 },
    libTek: { acidity: -0.2, body: 1.1, sweetness: 0.4, bitterness: 0.4, aroma: 0.9 },
    robustaClonal: { acidity: -1, body: 1.6, sweetness: -0.2, bitterness: 1.7, aroma: 0.4 }
  };

  const roastFlavorBias = {
    light: { acidity: 1, body: -0.4, sweetness: 0.3, bitterness: -0.9, aroma: 1.1 },
    medium: { acidity: 0.2, body: 0.2, sweetness: 0.4, bitterness: 0.1, aroma: 0.5 },
    dark: { acidity: -1.1, body: 0.9, sweetness: -0.3, bitterness: 1.6, aroma: 0.1 }
  };

  const mineralFlavorBias = {
    soft: { acidity: 0.1, body: -0.2, sweetness: 0.5, bitterness: -0.2, aroma: 0.2 },
    balanced: { acidity: 0.2, body: 0.1, sweetness: 0.3, bitterness: 0, aroma: 0.3 },
    hard: { acidity: -0.2, body: 0.7, sweetness: -0.1, bitterness: 0.5, aroma: 0.1 }
  };

  const agitationFlavorBias = {
    gentle: { acidity: 0.2, body: -0.1, sweetness: 0.3, bitterness: -0.2, aroma: 0.2 },
    medium: { acidity: 0, body: 0.2, sweetness: 0.2, bitterness: 0.2, aroma: 0.1 },
    high: { acidity: -0.3, body: 0.7, sweetness: -0.1, bitterness: 0.8, aroma: -0.1 }
  };

  const beanDensityFlavorBias = {
    low: { acidity: 0.2, body: -0.2, sweetness: 0.1, bitterness: -0.1, aroma: 0.2 },
    medium: { acidity: 0, body: 0, sweetness: 0, bitterness: 0, aroma: 0 },
    high: { acidity: -0.2, body: 0.3, sweetness: 0.1, bitterness: 0.2, aroma: -0.1 }
  };

  const alkalinityFlavorBias = {
    low: { acidity: 0.5, body: -0.2, sweetness: 0.1, bitterness: -0.2, aroma: 0.2 },
    balanced: { acidity: 0, body: 0, sweetness: 0, bitterness: 0, aroma: 0 },
    high: { acidity: -0.6, body: 0.2, sweetness: 0.1, bitterness: 0.2, aroma: -0.1 }
  };

  const turbulenceFlavorBias = {
    low: { acidity: 0.1, body: -0.1, sweetness: 0.2, bitterness: -0.2, aroma: 0 },
    medium: { acidity: 0, body: 0, sweetness: 0, bitterness: 0, aroma: 0 },
    high: { acidity: -0.2, body: 0.3, sweetness: -0.1, bitterness: 0.4, aroma: -0.1 }
  };

  const state = {
    A: null,
    B: null
  };

  const extractionState = {
    A: null,
    B: null
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function sideFieldId(side, key) {
    return `${key}${side}`;
  }

  function renderFields(side) {
    const markup = fieldSchema
      .map(field => {
        const id = sideFieldId(side, field.key);

        if (field.type === "number") {
          return `
            <div class="compare-field-row">
              <label for="${id}">${field.label}</label>
              <input id="${id}" type="number" min="${field.min}" max="${field.max}" step="${field.step}" value="${field.defaultValue}" />
            </div>
          `;
        }

        const optionsMarkup = field.options
          .map(option => {
            const selected = option.value === field.defaultValue ? " selected" : "";
            return `<option value="${escapeHtml(option.value)}"${selected}>${escapeHtml(option.label)}</option>`;
          })
          .join("");

        return `
          <div class="compare-field-row">
            <label for="${id}">${field.label}</label>
            <select id="${id}">${optionsMarkup}</select>
          </div>
        `;
      })
      .join("");

    fieldRoots[side].innerHTML = markup;
  }

  function parseClockToSeconds(clockValue) {
    const text = String(clockValue || "").trim();
    const match = text.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) {
      return 180;
    }
    return Number(match[1]) * 60 + Number(match[2]);
  }

  function createFlavorBaseProfile() {
    return {
      acidity: 5,
      body: 5,
      sweetness: 5,
      bitterness: 4,
      aroma: 5
    };
  }

  function applyFlavorBias(profile, bias) {
    if (!bias) {
      return;
    }
    flavorMetrics.forEach(metric => {
      profile[metric.key] += Number(bias[metric.key] || 0);
    });
  }

  function clampProfile(profile) {
    const next = {};
    flavorMetrics.forEach(metric => {
      next[metric.key] = Math.max(1, Math.min(10, Number(profile[metric.key].toFixed(1))));
    });
    return next;
  }

  function clampNumber(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function resolveGrindExtractionFactor(grindValue) {
    const grindMap = {
      coarse: -0.9,
      medium: 0,
      fine: 0.9,
      "medium-fine": 0.45
    };

    return grindMap[grindValue] || 0;
  }

  function computeExtractionEstimate(values) {
    const brewTool = values.brewTool;
    const ratio = Number(values.ratio);
    const targetTimeSeconds = parseClockToSeconds(values.targetTime);
    const temp = Number(values.waterTemp);
    const dose = Number(values.dose);
    const restDays = Number(values.restDays);
    const timeMinutes = Number.isFinite(targetTimeSeconds) ? targetTimeSeconds / 60 : 3;

    const ratioDelta = Number.isFinite(ratio) ? 14 - ratio : 0;
    const densityFactor = values.beanDensity === "high" ? -0.35 : values.beanDensity === "low" ? 0.2 : 0;
    const alkalinityFactor = values.waterAlkalinity === "high" ? -0.2 : values.waterAlkalinity === "low" ? 0.15 : 0;
    const turbulenceFactor = values.turbulence === "high" ? 0.35 : values.turbulence === "low" ? -0.2 : 0;
    const restFactor = Number.isFinite(restDays)
      ? restDays < 5
        ? -0.8
        : restDays > 28
          ? -0.2
          : 0.3
      : 0;

    const toolFactor = {
      v60: 0,
      kalita: 0.15,
      chemex: -0.2,
      aeropress: 0.3,
      frenchpress: 0.2,
      syphon: 0.25,
      espresso: 0.7,
      mokapot: 0.45,
      coldBrew: -0.3,
      coldDrip: -0.1
    }[brewTool] || 0;

    const eyBase = 19
      + ratioDelta * 0.26
      + (Number.isFinite(temp) ? (temp - 92) * 0.08 : 0)
      + (timeMinutes - 3) * 0.32
      + resolveGrindExtractionFactor(values.grind)
      + (values.agitation ? (values.agitation === "high" ? 0.4 : values.agitation === "gentle" ? -0.25 : 0) : 0)
      + densityFactor
      + alkalinityFactor
      + turbulenceFactor
      + restFactor
      + toolFactor;

    const eyPercent = clampNumber(eyBase, 14, 24);
    const tdsPercent = clampNumber(1.35 * (Number.isFinite(ratio) ? 14 / ratio : 1) + (Number.isFinite(dose) ? (dose - 20) * 0.01 : 0), 0.8, 2.6);
    const eyPenalty = eyPercent < 18 ? (18 - eyPercent) * 7 : eyPercent > 22 ? (eyPercent - 22) * 6 : 0;
    const tdsPenalty = Math.abs(tdsPercent - 1.35) * 14;
    const extractionIndex = clampNumber(Math.round(100 - eyPenalty - tdsPenalty), 38, 99);

    return {
      extractionIndex,
      eyPercent: Number(eyPercent.toFixed(1)),
      tdsPercent: Number(tdsPercent.toFixed(2))
    };
  }

  function readSideValues(side) {
    const values = {};
    fieldSchema.forEach(field => {
      const input = document.getElementById(sideFieldId(side, field.key));
      values[field.key] = input ? input.value : field.defaultValue;
    });
    return values;
  }

  function computeFlavorProfile(values) {
    const profile = createFlavorBaseProfile();

    applyFlavorBias(profile, coffeeFlavorBias[values.coffeeType]);
    applyFlavorBias(profile, brewToolFlavorBias[values.brewTool]);
    applyFlavorBias(profile, processFlavorBias[values.processMethod]);
    applyFlavorBias(profile, varietalFlavorBias[values.varietal]);
    applyFlavorBias(profile, roastFlavorBias[values.roastLevel]);
    applyFlavorBias(profile, mineralFlavorBias[values.waterHardness]);
    applyFlavorBias(profile, agitationFlavorBias[values.agitation]);
    applyFlavorBias(profile, beanDensityFlavorBias[values.beanDensity]);
    applyFlavorBias(profile, alkalinityFlavorBias[values.waterAlkalinity]);
    applyFlavorBias(profile, turbulenceFlavorBias[values.turbulence]);

    const ratio = Number(values.ratio);
    if (Number.isFinite(ratio)) {
      const ratioDelta = 14 - ratio;
      profile.body += ratioDelta * 0.34;
      profile.acidity -= ratioDelta * 0.2;
      profile.sweetness += ratioDelta * 0.1;
      profile.bitterness += ratioDelta * 0.24;
    }

    const waterTemp = Number(values.waterTemp);
    if (Number.isFinite(waterTemp)) {
      const tempDelta = waterTemp - 92;
      profile.body += tempDelta * 0.08;
      profile.acidity -= tempDelta * 0.05;
      profile.sweetness -= Math.max(0, tempDelta) * 0.04;
      profile.bitterness += Math.max(0, tempDelta) * 0.08;
      profile.aroma += Math.max(0, 93 - waterTemp) * 0.04;
    }

    const dose = Number(values.dose);
    if (Number.isFinite(dose)) {
      const doseDelta = dose - 20;
      profile.body += doseDelta * 0.06;
      profile.bitterness += doseDelta * 0.05;
      profile.acidity -= Math.max(0, doseDelta) * 0.02;
    }

    const targetTimeSeconds = parseClockToSeconds(values.targetTime);
    const minuteDelta = targetTimeSeconds / 60 - 3;
    profile.body += minuteDelta * 0.22;
    profile.acidity -= minuteDelta * 0.14;
    profile.sweetness += minuteDelta * 0.08;
    profile.bitterness += minuteDelta * 0.2;

    const extraction = computeExtractionEstimate(values);
    if (extraction.eyPercent < 18) {
      const under = 18 - extraction.eyPercent;
      profile.acidity += under * 0.22;
      profile.sweetness -= under * 0.12;
      profile.body -= under * 0.08;
    } else if (extraction.eyPercent > 22) {
      const over = extraction.eyPercent - 22;
      profile.bitterness += over * 0.24;
      profile.aroma -= over * 0.1;
      profile.sweetness -= over * 0.1;
    }

    return clampProfile(profile);
  }

  function setupCanvasContext(canvas) {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(220, Math.round(rect.width || canvas.clientWidth || 300));
    const height = Math.max(220, Math.round(rect.height || canvas.clientHeight || 260));
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return null;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    return { ctx, width, height };
  }

  function drawFlavorRadar(side, profile) {
    const canvas = canvasRoots[side];
    const bundle = setupCanvasContext(canvas);
    if (!bundle) {
      return;
    }

    const { ctx, width, height } = bundle;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.34;
    const total = flavorMetrics.length;
    const fillColor = side === "A" ? "rgba(208, 123, 58, 0.22)" : "rgba(74, 127, 107, 0.22)";
    const strokeColor = side === "A" ? "rgba(208, 123, 58, 0.9)" : "rgba(74, 127, 107, 0.9)";

    ctx.strokeStyle = "rgba(34, 27, 22, 0.14)";
    ctx.lineWidth = 1;

    for (let level = 1; level <= 5; level += 1) {
      const radius = (maxRadius * level) / 5;
      ctx.beginPath();
      flavorMetrics.forEach((metric, index) => {
        const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.stroke();
    }

    ctx.beginPath();
    flavorMetrics.forEach((metric, index) => {
      const value = profile[metric.key] / 10;
      const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * maxRadius * value;
      const y = centerY + Math.sin(angle) * maxRadius * value;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    ctx.font = "600 12px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "#56483d";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    flavorMetrics.forEach((metric, index) => {
      const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * (maxRadius + 18);
      const y = centerY + Math.sin(angle) * (maxRadius + 18);
      ctx.fillText(metric.label, x, y);
    });
  }

  function renderMetricGrid(side, profile) {
    const root = metricRoots[side];

    root.innerHTML = flavorMetrics
      .map(metric => {
        const value = profile[metric.key];
        const percent = (value / 10) * 100;
        return `
          <div class="flavor-metric-item">
            <div class="flavor-metric-top">
              <span>${metric.label}</span>
              <strong>${value.toFixed(1)}</strong>
            </div>
            <div class="flavor-metric-track"><span style="width:${percent}%; background:${metric.color}"></span></div>
          </div>
        `;
      })
      .join("");
  }

  function describeDelta(metricLabel, delta) {
    if (Math.abs(delta) < 0.1) {
      return `${metricLabel}: relatif setara`;
    }
    const direction = delta > 0 ? "lebih tinggi" : "lebih rendah";
    return `${metricLabel}: ${Math.abs(delta).toFixed(1)} poin ${direction}`;
  }

  function renderComparisonSummary() {
    const profileA = state.A;
    const profileB = state.B;
    const extractionA = extractionState.A;
    const extractionB = extractionState.B;

    if (!profileA || !profileB || !extractionA || !extractionB) {
      return;
    }

    const cards = flavorMetrics
      .map(metric => {
        const delta = Number((profileB[metric.key] - profileA[metric.key]).toFixed(1));
        const trend = delta > 0 ? "positive" : delta < 0 ? "negative" : "neutral";
        const sign = delta > 0 ? "+" : "";
        return `
          <div class="compare-delta-card" data-trend="${trend}">
            <span>${metric.label}</span>
            <strong>${sign}${delta.toFixed(1)}</strong>
            <small>${describeDelta(metric.label, delta)}</small>
          </div>
        `;
      })
      .join("");

    const extractionDelta = extractionB.extractionIndex - extractionA.extractionIndex;
    const eyDelta = Number((extractionB.eyPercent - extractionA.eyPercent).toFixed(1));
    const extractionCards = `
      <div class="compare-delta-card" data-trend="${extractionDelta > 0 ? "positive" : extractionDelta < 0 ? "negative" : "neutral"}">
        <span>Extraction Index</span>
        <strong>${extractionDelta > 0 ? "+" : ""}${extractionDelta}</strong>
        <small>B: ${extractionB.extractionIndex} vs A: ${extractionA.extractionIndex}</small>
      </div>
      <div class="compare-delta-card" data-trend="${eyDelta > 0 ? "positive" : eyDelta < 0 ? "negative" : "neutral"}">
        <span>Estimasi Extraction Yield</span>
        <strong>${eyDelta > 0 ? "+" : ""}${eyDelta.toFixed(1)}%</strong>
        <small>B: ${extractionB.eyPercent}% vs A: ${extractionA.eyPercent}%</small>
      </div>
    `;

    compareSummaryGridEl.innerHTML = cards + extractionCards;

    if (!compareSummaryNoteEl) {
      return;
    }

    const dominantMetric = flavorMetrics
      .map(metric => ({ key: metric.key, label: metric.label, delta: Number((profileB[metric.key] - profileA[metric.key]).toFixed(1)) }))
      .sort((left, right) => Math.abs(right.delta) - Math.abs(left.delta))[0];

    if (Math.abs(dominantMetric.delta) < 0.15 && Math.abs(extractionDelta) < 2) {
      compareSummaryNoteEl.textContent = "Dua setup masih sangat mirip. Coba ubah rasio, suhu, waktu, atau variabel teknis ekstraksi untuk melihat perbedaan lebih jelas.";
      return;
    }

    const direction = dominantMetric.delta > 0 ? "lebih tinggi" : "lebih rendah";
    compareSummaryNoteEl.textContent = `Perbedaan terbesar pada ${dominantMetric.label} (${Math.abs(dominantMetric.delta).toFixed(1)} poin ${direction}) dengan selisih Extraction Index ${extractionDelta > 0 ? "+" : ""}${extractionDelta}.`;
  }

  function renderSide(side) {
    const values = readSideValues(side);
    const profile = computeFlavorProfile(values);
    const extraction = computeExtractionEstimate(values);
    state[side] = profile;
    extractionState[side] = extraction;

    drawFlavorRadar(side, profile);
    renderMetricGrid(side, profile);
  }

  function rerenderAll() {
    renderSide("A");
    renderSide("B");
    renderComparisonSummary();
  }

  function bindSideEvents(side) {
    fieldSchema.forEach(field => {
      const input = document.getElementById(sideFieldId(side, field.key));
      if (!input) {
        return;
      }

      input.addEventListener("change", rerenderAll);
      input.addEventListener("input", rerenderAll);
    });
  }

  renderFields("A");
  renderFields("B");
  bindSideEvents("A");
  bindSideEvents("B");
  rerenderAll();

  window.addEventListener("resize", () => {
    renderSide("A");
    renderSide("B");
  });
})();
