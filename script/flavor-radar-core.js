export const flavorMetrics = [
  { key: "acidity", label: "Acidity", color: "#d07b3a" },
  { key: "body", label: "Body", color: "#6a4e3a" },
  { key: "sweetness", label: "Sweetness", color: "#4a7f6b" },
  { key: "bitterness", label: "Bitterness", color: "#7e6147" },
  { key: "aroma", label: "Aroma", color: "#9a6e3f" }
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
  anaerobicNatural: { acidity: 0.2, body: 0.7, sweetness: 1.1, bitterness: 0.3, aroma: 1.3 },
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

function clampNumber(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function parseClockToSeconds(value) {
  if (!value && value !== 0) {
    return null;
  }

  const text = String(value).trim();
  const match = text.match(/^(\d{1,3}):(\d{2})$/);
  if (match) {
    return Number(match[1]) * 60 + Number(match[2]);
  }

  const numeric = Number(text);
  if (Number.isFinite(numeric)) {
    return numeric;
  }

  return null;
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

function applyFlavorBias(profile, bias, weight = 1) {
  if (!bias) {
    return;
  }
  flavorMetrics.forEach(metric => {
    const delta = Number(bias[metric.key] || 0) * weight;
    profile[metric.key] += delta;
  });
}

function clampFlavorProfile(profile) {
  const next = {};
  flavorMetrics.forEach(metric => {
    const value = Number(profile[metric.key] || 0);
    next[metric.key] = Math.max(1, Math.min(10, Number(value.toFixed(1))));
  });
  return next;
}

function resolvePrimaryRatio(values) {
  if (values.ratio !== undefined) {
    return Number(values.ratio);
  }
  if (values.brewRatio !== undefined) {
    return Number(values.brewRatio);
  }
  return NaN;
}

function resolvePrimaryTimeSeconds(values) {
  const timeCandidates = [
    values.targetTime,
    values.steepTime,
    values.brewTime,
    values.pressTime,
    values.drawdownTime
  ];

  for (const candidate of timeCandidates) {
    const seconds = parseClockToSeconds(candidate);
    if (Number.isFinite(seconds)) {
      return seconds;
    }
  }

  if (values.shotTime !== undefined) {
    const seconds = Number(values.shotTime);
    if (Number.isFinite(seconds)) {
      return seconds;
    }
  }

  if (values.steepTimeCold !== undefined) {
    const hours = Number(values.steepTimeCold);
    if (Number.isFinite(hours)) {
      return hours * 3600;
    }
  }

  if (values.dripTime !== undefined) {
    const hours = Number(values.dripTime);
    if (Number.isFinite(hours)) {
      return hours * 3600;
    }
  }

  return NaN;
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

export function computeExtractionEstimate({ brewTool, values, dose }) {
  const extractionTargets = {
    v60: { ratio: 14, ratioScale: 3, temp: 92, tempScale: 3, timeSec: 180, timeScale: 70, eyRange: [18.5, 21], tdsRange: [1.2, 1.45], ratioEyWeight: 0.24, timeEyWeight: 0.34, tempEyWeight: 0.08, tdsBase: 1.32 },
    kalita: { ratio: 14, ratioScale: 3, temp: 92, tempScale: 3, timeSec: 190, timeScale: 80, eyRange: [18.7, 21.2], tdsRange: [1.25, 1.5], ratioEyWeight: 0.25, timeEyWeight: 0.32, tempEyWeight: 0.07, tdsBase: 1.34 },
    chemex: { ratio: 15, ratioScale: 3, temp: 93, tempScale: 3, timeSec: 240, timeScale: 90, eyRange: [18.3, 20.8], tdsRange: [1.15, 1.35], ratioEyWeight: 0.23, timeEyWeight: 0.29, tempEyWeight: 0.07, tdsBase: 1.24 },
    aeropress: { ratio: 13, ratioScale: 3, temp: 91, tempScale: 3, timeSec: 110, timeScale: 55, eyRange: [18.8, 21.8], tdsRange: [1.3, 1.7], ratioEyWeight: 0.28, timeEyWeight: 0.38, tempEyWeight: 0.08, tdsBase: 1.48 },
    frenchpress: { ratio: 15, ratioScale: 3, temp: 93, tempScale: 3, timeSec: 240, timeScale: 90, eyRange: [18, 20.8], tdsRange: [1.25, 1.55], ratioEyWeight: 0.24, timeEyWeight: 0.3, tempEyWeight: 0.07, tdsBase: 1.4 },
    syphon: { ratio: 14, ratioScale: 3, temp: 92, tempScale: 3, timeSec: 130, timeScale: 55, eyRange: [18.5, 21.3], tdsRange: [1.2, 1.5], ratioEyWeight: 0.25, timeEyWeight: 0.34, tempEyWeight: 0.08, tdsBase: 1.34 },
    espresso: { ratio: 2.2, ratioScale: 0.8, temp: 93, tempScale: 2, timeSec: 28, timeScale: 10, eyRange: [18, 22], tdsRange: [8.5, 11], ratioEyWeight: 0.9, timeEyWeight: 0.46, tempEyWeight: 0.18, tdsBase: 9.8 },
    mokapot: { ratio: 9, ratioScale: 2.5, temp: 93, tempScale: 2.5, timeSec: 120, timeScale: 45, eyRange: [17.8, 21], tdsRange: [3.5, 6], ratioEyWeight: 0.46, timeEyWeight: 0.36, tempEyWeight: 0.12, tdsBase: 4.6 },
    coldBrew: { ratio: 12, ratioScale: 4, temp: 26, tempScale: 8, timeSec: 57600, timeScale: 21600, eyRange: [17.5, 20.5], tdsRange: [1.4, 2], ratioEyWeight: 0.2, timeEyWeight: 0.26, tempEyWeight: 0.04, tdsBase: 1.72 },
    coldDrip: { ratio: 12, ratioScale: 4, temp: 24, tempScale: 8, timeSec: 10800, timeScale: 3600, eyRange: [18, 21], tdsRange: [1.3, 1.9], ratioEyWeight: 0.22, timeEyWeight: 0.28, tempEyWeight: 0.04, tdsBase: 1.6 }
  };

  const target = extractionTargets[brewTool] || extractionTargets.v60;
  const ratio = resolvePrimaryRatio(values);
  const timeSeconds = resolvePrimaryTimeSeconds(values);
  const temp = Number(values.waterTemp);
  const restDays = Number(values.restDays);

  const timeMinutes = Number.isFinite(timeSeconds) ? timeSeconds / 60 : target.timeSec / 60;
  const ratioReference = brewTool === "espresso" ? Number(values.brewRatio || 2) : ratio;
  const ratioDelta = Number.isFinite(ratioReference)
    ? target.ratio - ratioReference
    : 0;
  const timeDeltaMinutes = (timeMinutes - target.timeSec / 60);
  const tempDelta = Number.isFinite(temp) ? temp - target.temp : 0;

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

  const eyMid = (target.eyRange[0] + target.eyRange[1]) / 2;
  const eyBase = eyMid
    + ratioDelta * target.ratioEyWeight
    + tempDelta * target.tempEyWeight
    + timeDeltaMinutes * target.timeEyWeight
    + resolveGrindExtractionFactor(values.grind)
    + (values.agitation ? (values.agitation === "high" ? 0.4 : values.agitation === "gentle" ? -0.25 : 0) : 0)
    + densityFactor
    + alkalinityFactor
    + turbulenceFactor
    + restFactor
    + toolFactor;

  const eyPercent = clampNumber(eyBase, 14, 24);

  const concentrationBase = target.tdsBase;
  const concentrationRatio = Number.isFinite(ratioReference)
    ? target.ratio / Math.max(0.1, ratioReference)
    : 1;

  const tdsPercent = clampNumber(
    concentrationBase * concentrationRatio + (Number.isFinite(dose) ? (dose - 20) * 0.01 : 0),
    brewTool === "espresso" ? 7 : 0.8,
    brewTool === "espresso" ? 13 : 6.5
  );

  const eyPenalty = eyPercent < target.eyRange[0]
    ? (target.eyRange[0] - eyPercent) * 8
    : eyPercent > target.eyRange[1]
      ? (eyPercent - target.eyRange[1]) * 7
      : 0;
  const tdsPenalty = tdsPercent < target.tdsRange[0]
    ? (target.tdsRange[0] - tdsPercent) * 14
    : tdsPercent > target.tdsRange[1]
      ? (tdsPercent - target.tdsRange[1]) * 14
      : 0;
  const ratioPenalty = Number.isFinite(ratioReference)
    ? (Math.abs(ratioReference - target.ratio) / Math.max(0.1, target.ratioScale)) * 6
    : 4;
  const timePenalty = Number.isFinite(timeSeconds)
    ? (Math.abs(timeSeconds - target.timeSec) / Math.max(1, target.timeScale)) * 6
    : 3;
  const tempPenalty = Number.isFinite(temp)
    ? (Math.abs(temp - target.temp) / Math.max(1, target.tempScale)) * 4
    : 2;
  const extractionIndex = clampNumber(Math.round(100 - eyPenalty - tdsPenalty - ratioPenalty - timePenalty - tempPenalty), 35, 99);

  const statusLabel = eyPercent < target.eyRange[0]
    ? "Under"
    : eyPercent > target.eyRange[1]
      ? "Over"
      : "Ideal";

  return {
    extractionIndex,
    eyPercent: Number(eyPercent.toFixed(1)),
    tdsPercent: Number(tdsPercent.toFixed(2)),
    statusLabel,
    eyRangeLabel: `${target.eyRange[0]}-${target.eyRange[1]}%`,
    tdsRangeLabel: `${target.tdsRange[0]}-${target.tdsRange[1]}%`
  };
}

export function computeFlavorProfile({ coffeeType, brewTool, values, blendRatio }) {
  const profile = createFlavorBaseProfile();

  applyFlavorBias(profile, coffeeFlavorBias[coffeeType]);
  applyFlavorBias(profile, brewToolFlavorBias[brewTool]);
  applyFlavorBias(profile, processFlavorBias[values.processMethod]);
  applyFlavorBias(profile, varietalFlavorBias[values.varietal]);
  applyFlavorBias(profile, roastFlavorBias[values.roastLevel]);
  applyFlavorBias(profile, mineralFlavorBias[values.waterHardness]);
  applyFlavorBias(profile, agitationFlavorBias[values.agitation]);
  applyFlavorBias(profile, beanDensityFlavorBias[values.beanDensity]);
  applyFlavorBias(profile, alkalinityFlavorBias[values.waterAlkalinity]);
  applyFlavorBias(profile, turbulenceFlavorBias[values.turbulence]);

  if (coffeeType === "blend" && blendRatio) {
    const robustaFactor = Number(blendRatio.robusta || 0) / 100;
    const arabicaFactor = Number(blendRatio.arabica || 0) / 100;
    applyFlavorBias(profile, {
      acidity: -0.6 * robustaFactor + 0.8 * arabicaFactor,
      body: 1.2 * robustaFactor - 0.2 * arabicaFactor,
      sweetness: -0.2 * robustaFactor + 0.6 * arabicaFactor,
      bitterness: 1.1 * robustaFactor - 0.3 * arabicaFactor,
      aroma: 0.3 * robustaFactor + 0.9 * arabicaFactor
    });
  }

  const ratio = resolvePrimaryRatio(values);
  if (Number.isFinite(ratio)) {
    const delta = 14 - ratio;
    profile.body += delta * 0.34;
    profile.acidity -= delta * 0.2;
    profile.sweetness += delta * 0.1;
    profile.bitterness += delta * 0.24;

    if (ratio >= 18) {
      const dilutionImpact = (ratio - 18) * 0.45;
      profile.acidity -= dilutionImpact;
      profile.sweetness -= dilutionImpact * 1.05;
      profile.bitterness -= dilutionImpact * 1.08;
      profile.aroma -= dilutionImpact * 1.02;
      profile.body -= dilutionImpact * 0.9;
    } else if (ratio <= 10) {
      const concentrationImpact = (10 - ratio) * 0.52;
      profile.body += concentrationImpact * 1.15;
      profile.bitterness += concentrationImpact * 0.95;
      profile.sweetness += concentrationImpact * 0.4;
      profile.aroma += concentrationImpact * 0.25;
      profile.acidity -= concentrationImpact * 0.2;
    }
  }

  const temp = Number(values.waterTemp);
  if (Number.isFinite(temp)) {
    const delta = temp - 92;
    profile.body += delta * 0.08;
    profile.acidity -= delta * 0.05;
    profile.sweetness -= Math.max(0, delta) * 0.04;
    profile.bitterness += Math.max(0, delta) * 0.08;
    profile.aroma += Math.max(0, 93 - temp) * 0.04;

    if (temp <= 88) {
      const coldPenalty = (88 - temp) * 0.5;
      profile.acidity -= coldPenalty * 1.1;
      profile.sweetness -= coldPenalty * 1.2;
      profile.bitterness -= coldPenalty * 1.15;
      profile.aroma -= coldPenalty * 1.25;
      profile.body -= coldPenalty * 0.7;
    }

    if (temp >= 96) {
      const hotPenalty = (temp - 96) * 0.35;
      profile.sweetness -= hotPenalty * 0.8;
      profile.aroma -= hotPenalty * 0.6;
      profile.bitterness += hotPenalty * 0.9;
      profile.body += hotPenalty * 0.4;
    }
  }

  const timeSeconds = resolvePrimaryTimeSeconds(values);
  if (Number.isFinite(timeSeconds)) {
    const minuteDelta = timeSeconds / 60 - 3;
    profile.body += minuteDelta * 0.22;
    profile.acidity -= minuteDelta * 0.14;
    profile.sweetness += minuteDelta * 0.08;
    profile.bitterness += minuteDelta * 0.2;
  }

  const extractionEstimate = computeExtractionEstimate({
    brewTool,
    values,
    dose: Number(values.dose)
  });

  if (extractionEstimate.eyPercent < 18) {
    const under = 18 - extractionEstimate.eyPercent;
    profile.acidity += under * 0.22;
    profile.sweetness -= under * 0.12;
    profile.body -= under * 0.08;
  } else if (extractionEstimate.eyPercent > 22) {
    const over = extractionEstimate.eyPercent - 22;
    profile.bitterness += over * 0.24;
    profile.aroma -= over * 0.1;
    profile.sweetness -= over * 0.1;
  }

  return clampFlavorProfile(profile);
}

export function normalizeFlavorProfile(profile) {
  const next = {};
  let validMetrics = 0;

  flavorMetrics.forEach(metric => {
    const value = Number(profile?.[metric.key]);
    if (Number.isFinite(value)) {
      validMetrics += 1;
    }
    next[metric.key] = Math.max(1, Math.min(10, Number((Number.isFinite(value) ? value : 5).toFixed(1))));
  });

  return validMetrics > 0 ? next : null;
}

export function setupRadarCanvasContext(canvas) {
  if (!canvas) {
    return null;
  }

  const rect = canvas.getBoundingClientRect();
  const measuredWidth = Math.round(rect.width || canvas.clientWidth || 260);
  const measuredHeight = Math.round(rect.height || canvas.clientHeight || measuredWidth);
  const width = Math.max(140, measuredWidth);
  const height = Math.max(140, measuredHeight);
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

export function drawFlavorRadarOnCanvas(canvas, profile, options = {}) {
  const bundle = setupRadarCanvasContext(canvas);
  if (!bundle || !profile) {
    return;
  }

  const fillStyle = options.fillStyle || "rgba(74, 127, 107, 0.24)";
  const strokeStyle = options.strokeStyle || "rgba(74, 127, 107, 0.88)";

  const { ctx, width, height } = bundle;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) * 0.34;
  const levels = 5;
  const total = flavorMetrics.length;

  ctx.strokeStyle = "rgba(34, 27, 22, 0.14)";
  ctx.lineWidth = 1;

  for (let level = 1; level <= levels; level += 1) {
    const radius = (maxRadius * level) / levels;
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

  ctx.strokeStyle = "rgba(34, 27, 22, 0.2)";
  flavorMetrics.forEach((metric, index) => {
    const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
    ctx.stroke();
  });

  ctx.beginPath();
  flavorMetrics.forEach((metric, index) => {
    const value = Number(profile[metric.key]) / 10;
    const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
    const radius = maxRadius * value;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  ctx.font = "600 12px 'Space Grotesk', sans-serif";
  ctx.fillStyle = "#56483d";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  flavorMetrics.forEach((metric, index) => {
    const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;
    const radius = maxRadius + 18;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    ctx.fillText(metric.label, x, y);
  });
}
