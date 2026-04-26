(function initRecipeCompare() {
  const comparePanelEl = document.getElementById("comparePanel");
  if (!comparePanelEl) {
    return;
  }

  const compareToggleEl = document.getElementById("compareToggle");
  const compareBodyEl = document.getElementById("compareBody");
  const compareSyncBEl = document.getElementById("compareSyncB");

  const compareAToolEl = document.getElementById("compareATool");
  const compareARatioEl = document.getElementById("compareARatio");
  const compareATempEl = document.getElementById("compareATemp");
  const compareATimeEl = document.getElementById("compareATime");
  const compareAPassportEl = document.getElementById("compareAPassport");

  const compareBToolEl = document.getElementById("compareBTool");
  const compareBRatioEl = document.getElementById("compareBRatio");
  const compareBTempEl = document.getElementById("compareBTemp");
  const compareBTimeEl = document.getElementById("compareBTime");

  const compareDeltaRatioEl = document.getElementById("compareDeltaRatio");
  const compareDeltaTempEl = document.getElementById("compareDeltaTemp");
  const compareDeltaTimeEl = document.getElementById("compareDeltaTime");

  const impactBodyDeltaEl = document.getElementById("impactBodyDelta");
  const impactBodyFillAEl = document.getElementById("impactBodyFillA");
  const impactBodyFillBEl = document.getElementById("impactBodyFillB");
  const impactBodyValueAEl = document.getElementById("impactBodyValueA");
  const impactBodyValueBEl = document.getElementById("impactBodyValueB");
  const impactBodyTextEl = document.getElementById("impactBodyText");

  const impactAcidityDeltaEl = document.getElementById("impactAcidityDelta");
  const impactAcidityFillAEl = document.getElementById("impactAcidityFillA");
  const impactAcidityFillBEl = document.getElementById("impactAcidityFillB");
  const impactAcidityValueAEl = document.getElementById("impactAcidityValueA");
  const impactAcidityValueBEl = document.getElementById("impactAcidityValueB");
  const impactAcidityTextEl = document.getElementById("impactAcidityText");

  const impactSweetnessDeltaEl = document.getElementById("impactSweetnessDelta");
  const impactSweetnessFillAEl = document.getElementById("impactSweetnessFillA");
  const impactSweetnessFillBEl = document.getElementById("impactSweetnessFillB");
  const impactSweetnessValueAEl = document.getElementById("impactSweetnessValueA");
  const impactSweetnessValueBEl = document.getElementById("impactSweetnessValueB");
  const impactSweetnessTextEl = document.getElementById("impactSweetnessText");

  const compareImpactSummaryEl = document.getElementById("compareImpactSummary");

  const state = {
    enabled: false,
    seededFromA: false,
    customB: false,
    lastAKey: ""
  };

  const toolFlavorBias = {
    v60: { body: -0.8, acidity: 1, sweetness: 0.3 },
    kalita: { body: -0.1, acidity: 0.7, sweetness: 0.5 },
    chemex: { body: -1, acidity: 0.9, sweetness: 0.2 },
    aeropress: { body: 0.8, acidity: 0.3, sweetness: 0.6 },
    frenchpress: { body: 1.4, acidity: -0.3, sweetness: 0.4 },
    syphon: { body: 0.2, acidity: 0.8, sweetness: 0.5 },
    espresso: { body: 2, acidity: -0.4, sweetness: 0.8 },
    mokapot: { body: 1.6, acidity: -0.6, sweetness: 0.2 },
    coldBrew: { body: 1.1, acidity: -1.1, sweetness: 0.9 },
    coldDrip: { body: 0.5, acidity: 0.3, sweetness: 0.8 }
  };

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function toNumber(value, fallback = null) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function getValueById(id) {
    const el = document.getElementById(id);
    return el ? el.value : null;
  }

  function selectedLabelById(id) {
    const el = document.getElementById(id);
    if (!el || !(el instanceof HTMLSelectElement)) {
      return "";
    }
    const option = el.options[el.selectedIndex];
    return option ? option.textContent.trim() : "";
  }

  function parseTimeClock(value) {
    if (!value) {
      return null;
    }

    const text = String(value).trim();
    const clockMatch = text.match(/^(\d{1,2}):(\d{2})$/);
    if (clockMatch) {
      return Number(clockMatch[1]) * 60 + Number(clockMatch[2]);
    }

    const numeric = Number(text);
    if (Number.isFinite(numeric)) {
      return numeric;
    }

    return null;
  }

  function formatClock(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) {
      return "-";
    }
    const rounded = Math.round(seconds);
    const minutes = Math.floor(rounded / 60);
    const sec = rounded % 60;
    return `${minutes}:${String(sec).padStart(2, "0")}`;
  }

  function formatDeltaClock(secondsDiff) {
    if (!Number.isFinite(secondsDiff)) {
      return "-";
    }
    if (Math.abs(secondsDiff) < 1) {
      return "0:00";
    }
    const sign = secondsDiff > 0 ? "+" : "-";
    return `${sign}${formatClock(Math.abs(secondsDiff))}`;
  }

  function setTrendClass(element, value) {
    if (!element) {
      return;
    }

    if (!Number.isFinite(value) || Math.abs(value) < 0.05) {
      element.dataset.trend = "neutral";
      return;
    }

    element.dataset.trend = value > 0 ? "positive" : "negative";
  }

  function resolveRatioMetricA() {
    const ratio = getValueById("ratio");
    if (ratio !== null) {
      const value = toNumber(ratio, null);
      if (value !== null) {
        return { value, label: `1:${value}` };
      }
    }

    const brewRatio = getValueById("brewRatio");
    if (brewRatio !== null) {
      const value = toNumber(brewRatio, null);
      if (value !== null) {
        return { value, label: `1:${value}` };
      }
    }

    return null;
  }

  function resolveTimeMetricA() {
    const targetTime = getValueById("targetTime");
    if (targetTime) {
      const seconds = parseTimeClock(targetTime);
      if (seconds !== null) {
        return { seconds, label: targetTime };
      }
    }

    const steepTime = getValueById("steepTime");
    if (steepTime) {
      const seconds = parseTimeClock(steepTime);
      if (seconds !== null) {
        return { seconds, label: steepTime };
      }
    }

    const brewTime = getValueById("brewTime");
    if (brewTime) {
      const seconds = parseTimeClock(brewTime);
      if (seconds !== null) {
        return { seconds, label: brewTime };
      }
    }

    const shotTime = getValueById("shotTime");
    if (shotTime) {
      const seconds = toNumber(shotTime, null);
      if (seconds !== null) {
        return { seconds, label: `${shotTime} detik` };
      }
    }

    const steepTimeCold = getValueById("steepTimeCold");
    if (steepTimeCold) {
      const hours = toNumber(steepTimeCold, null);
      if (hours !== null) {
        return { seconds: hours * 3600, label: `${steepTimeCold} jam` };
      }
    }

    const dripTime = getValueById("dripTime");
    if (dripTime) {
      const hours = toNumber(dripTime, null);
      if (hours !== null) {
        return { seconds: hours * 3600, label: `${dripTime} jam` };
      }
    }

    return null;
  }

  function readSetupA() {
    const brewTool = getValueById("brewTool");
    if (!brewTool) {
      return null;
    }

    const ratioMetric = resolveRatioMetricA();
    const temp = toNumber(getValueById("waterTemp"), null);
    const timeMetric = resolveTimeMetricA();

    return {
      brewTool,
      brewToolLabel: selectedLabelById("brewTool") || brewTool,
      ratio: ratioMetric ? ratioMetric.value : null,
      ratioLabel: ratioMetric ? ratioMetric.label : "-",
      temp,
      tempLabel: temp !== null ? `${temp}°C` : "-",
      timeSeconds: timeMetric ? timeMetric.seconds : null,
      timeLabel: timeMetric ? timeMetric.label : "-",
      process: selectedLabelById("processMethod") || "-",
      varietal: selectedLabelById("varietal") || "-",
      roast: selectedLabelById("roastLevel") || "-"
    };
  }

  function ensureBToolOptions() {
    const source = document.getElementById("brewTool");
    if (!source || compareBToolEl.options.length > 0) {
      return;
    }

    const options = Array.from(source.options)
      .filter(option => option.value)
      .map(option => `<option value="${option.value}">${option.textContent.trim()}</option>`)
      .join("");

    compareBToolEl.innerHTML = options;
  }

  function seedSetupBFromA(setupA) {
    if (!setupA) {
      return;
    }

    ensureBToolOptions();

    compareBToolEl.value = setupA.brewTool;
    compareBRatioEl.value = setupA.ratio !== null ? String(setupA.ratio) : "14";
    compareBTempEl.value = setupA.temp !== null ? String(setupA.temp) : "92";
    compareBTimeEl.value = setupA.timeSeconds !== null ? formatClock(setupA.timeSeconds) : "3:00";

    state.seededFromA = true;
  }

  function readSetupB(setupA) {
    const fallbackRatio = setupA && setupA.ratio !== null ? setupA.ratio : 14;
    const fallbackTemp = setupA && setupA.temp !== null ? setupA.temp : 92;
    const fallbackTime = setupA && setupA.timeSeconds !== null ? setupA.timeSeconds : 180;

    const ratio = clamp(toNumber(compareBRatioEl.value, fallbackRatio), 1, 30);
    const temp = clamp(toNumber(compareBTempEl.value, fallbackTemp), 75, 100);
    const parsedTime = parseTimeClock(compareBTimeEl.value);
    const timeSeconds = clamp(parsedTime !== null ? parsedTime : fallbackTime, 30, 14_400);

    compareBRatioEl.value = String(Number(ratio.toFixed(1)));
    compareBTempEl.value = String(Math.round(temp));
    compareBTimeEl.value = formatClock(timeSeconds);

    return {
      brewTool: compareBToolEl.value || (setupA ? setupA.brewTool : "v60"),
      ratio,
      temp,
      timeSeconds
    };
  }

  function scoreFlavor(setup) {
    let body = 5;
    let acidity = 5;
    let sweetness = 5;

    const bias = toolFlavorBias[setup.brewTool] || { body: 0, acidity: 0, sweetness: 0 };
    body += bias.body;
    acidity += bias.acidity;
    sweetness += bias.sweetness;

    if (setup.ratio !== null) {
      const ratioDelta = 14 - setup.ratio;
      body += ratioDelta * 0.34;
      acidity -= ratioDelta * 0.19;
      sweetness += ratioDelta * 0.08;
    }

    if (setup.temp !== null) {
      const tempDelta = setup.temp - 92;
      body += tempDelta * 0.08;
      acidity -= tempDelta * 0.05;
      sweetness -= Math.max(0, tempDelta) * 0.03;
      sweetness += Math.max(0, 90 - setup.temp) * 0.03;
    }

    if (setup.timeSeconds !== null) {
      const minuteDelta = setup.timeSeconds / 60 - 3;
      body += minuteDelta * 0.24;
      acidity -= minuteDelta * 0.14;
      sweetness += minuteDelta * 0.12;
    }

    return {
      body: clamp(Number(body.toFixed(1)), 1, 10),
      acidity: clamp(Number(acidity.toFixed(1)), 1, 10),
      sweetness: clamp(Number(sweetness.toFixed(1)), 1, 10)
    };
  }

  function describeDirection(diff, upText, downText) {
    if (Math.abs(diff) < 0.15) {
      return "relatif sama";
    }
    return diff > 0 ? upText : downText;
  }

  function renderDeltaCards(a, b) {
    const ratioDiff = a.ratio !== null ? b.ratio - a.ratio : NaN;
    const tempDiff = a.temp !== null ? b.temp - a.temp : NaN;
    const timeDiff = a.timeSeconds !== null ? b.timeSeconds - a.timeSeconds : NaN;

    compareDeltaRatioEl.textContent = Number.isFinite(ratioDiff)
      ? `Rasio ${ratioDiff >= 0 ? "+" : ""}${ratioDiff.toFixed(1)}x`
      : "Rasio -";

    compareDeltaTempEl.textContent = Number.isFinite(tempDiff)
      ? `Suhu ${tempDiff >= 0 ? "+" : ""}${Math.round(tempDiff)}°C`
      : "Suhu -";

    compareDeltaTimeEl.textContent = Number.isFinite(timeDiff)
      ? `Waktu ${formatDeltaClock(timeDiff)}`
      : "Waktu -";

    setTrendClass(compareDeltaRatioEl, ratioDiff);
    setTrendClass(compareDeltaTempEl, tempDiff);
    setTrendClass(compareDeltaTimeEl, timeDiff);
  }

  function describeMetricDelta(metricName, diff) {
    if (Math.abs(diff) < 0.15) {
      return "Setara";
    }
    if (diff > 0) {
      return "B lebih tinggi dari A";
    }
    return "B lebih rendah dari A";
  }

  function renderImpactRow(metricName, aValue, bValue, deltaEl, fillAEl, fillBEl, valueAEl, valueBEl, textEl) {
    const diff = Number((bValue - aValue).toFixed(1));
    deltaEl.textContent = `Delta ${diff >= 0 ? "+" : ""}${diff.toFixed(1)}`;
    fillAEl.style.width = `${(aValue / 10) * 100}%`;
    fillBEl.style.width = `${(bValue / 10) * 100}%`;
    valueAEl.textContent = aValue.toFixed(1);
    valueBEl.textContent = bValue.toFixed(1);
    textEl.textContent = describeMetricDelta(metricName, diff);
    setTrendClass(deltaEl, diff);
    setTrendClass(textEl, diff);
    return diff;
  }

  function renderImpactSummary(bodyDiff, acidityDiff, sweetnessDiff) {
    if (Math.abs(bodyDiff) < 0.15 && Math.abs(acidityDiff) < 0.15 && Math.abs(sweetnessDiff) < 0.15) {
      compareImpactSummaryEl.textContent = "Ringkas: profil Setup A dan B masih sangat mirip.";
      return;
    }

    const bodyNote = describeDirection(bodyDiff, "body lebih tebal", "body lebih ringan");
    const acidityNote = describeDirection(acidityDiff, "acidity lebih menonjol", "acidity lebih lembut");
    const sweetnessNote = describeDirection(sweetnessDiff, "sweetness lebih naik", "sweetness lebih turun");

    compareImpactSummaryEl.textContent = `Ringkas: Setup B cenderung ${bodyNote}, ${acidityNote}, dan ${sweetnessNote}.`;
  }

  function renderCompare() {
    const setupA = readSetupA();
    if (!setupA) {
      compareAToolEl.textContent = "-";
      compareARatioEl.textContent = "-";
      compareATempEl.textContent = "-";
      compareATimeEl.textContent = "-";
      compareAPassportEl.textContent = "-";

      compareDeltaRatioEl.textContent = "Rasio -";
      compareDeltaTempEl.textContent = "Suhu -";
      compareDeltaTimeEl.textContent = "Waktu -";
      setTrendClass(compareDeltaRatioEl, NaN);
      setTrendClass(compareDeltaTempEl, NaN);
      setTrendClass(compareDeltaTimeEl, NaN);

      impactBodyDeltaEl.textContent = "Delta 0.0";
      impactAcidityDeltaEl.textContent = "Delta 0.0";
      impactSweetnessDeltaEl.textContent = "Delta 0.0";
      setTrendClass(impactBodyDeltaEl, NaN);
      setTrendClass(impactAcidityDeltaEl, NaN);
      setTrendClass(impactSweetnessDeltaEl, NaN);

      impactBodyFillAEl.style.width = "50%";
      impactBodyFillBEl.style.width = "50%";
      impactAcidityFillAEl.style.width = "50%";
      impactAcidityFillBEl.style.width = "50%";
      impactSweetnessFillAEl.style.width = "50%";
      impactSweetnessFillBEl.style.width = "50%";

      impactBodyValueAEl.textContent = "5.0";
      impactBodyValueBEl.textContent = "5.0";
      impactAcidityValueAEl.textContent = "5.0";
      impactAcidityValueBEl.textContent = "5.0";
      impactSweetnessValueAEl.textContent = "5.0";
      impactSweetnessValueBEl.textContent = "5.0";

      impactBodyTextEl.textContent = "Setara";
      impactAcidityTextEl.textContent = "Setara";
      impactSweetnessTextEl.textContent = "Setara";
      setTrendClass(impactBodyTextEl, NaN);
      setTrendClass(impactAcidityTextEl, NaN);
      setTrendClass(impactSweetnessTextEl, NaN);
      compareImpactSummaryEl.textContent = "Pilih Setup A, lalu atur Setup B untuk melihat prediksi perubahan rasa.";
      return;
    }

    const aKey = `${setupA.brewTool}|${setupA.ratio}|${setupA.temp}|${setupA.timeSeconds}|${setupA.process}|${setupA.varietal}|${setupA.roast}`;

    ensureBToolOptions();
    if (!state.seededFromA || (!state.customB && state.lastAKey !== aKey)) {
      seedSetupBFromA(setupA);
    }

    state.lastAKey = aKey;

    compareAToolEl.textContent = setupA.brewToolLabel;
    compareARatioEl.textContent = setupA.ratioLabel;
    compareATempEl.textContent = setupA.tempLabel;
    compareATimeEl.textContent = setupA.timeLabel;
    compareAPassportEl.textContent = `${setupA.process} · ${setupA.varietal} · ${setupA.roast}`;

    const setupB = readSetupB(setupA);

    renderDeltaCards(setupA, setupB);

    const scoreA = scoreFlavor(setupA);
    const scoreB = scoreFlavor(setupB);

    const bodyDiff = renderImpactRow(
      "Body",
      scoreA.body,
      scoreB.body,
      impactBodyDeltaEl,
      impactBodyFillAEl,
      impactBodyFillBEl,
      impactBodyValueAEl,
      impactBodyValueBEl,
      impactBodyTextEl
    );

    const acidityDiff = renderImpactRow(
      "Acidity",
      scoreA.acidity,
      scoreB.acidity,
      impactAcidityDeltaEl,
      impactAcidityFillAEl,
      impactAcidityFillBEl,
      impactAcidityValueAEl,
      impactAcidityValueBEl,
      impactAcidityTextEl
    );

    const sweetnessDiff = renderImpactRow(
      "Sweetness",
      scoreA.sweetness,
      scoreB.sweetness,
      impactSweetnessDeltaEl,
      impactSweetnessFillAEl,
      impactSweetnessFillBEl,
      impactSweetnessValueAEl,
      impactSweetnessValueBEl,
      impactSweetnessTextEl
    );

    renderImpactSummary(bodyDiff, acidityDiff, sweetnessDiff);
  }

  function toggleCompare() {
    state.enabled = !state.enabled;
    compareBodyEl.classList.toggle("is-hidden", !state.enabled);
    compareToggleEl.classList.toggle("is-active", state.enabled);
    compareToggleEl.textContent = state.enabled ? "Tutup Compare" : "Aktifkan Compare";

    if (state.enabled) {
      renderCompare();
    }
  }

  function bindSetupBInputs() {
    [compareBToolEl, compareBRatioEl, compareBTempEl, compareBTimeEl].forEach(element => {
      element.addEventListener("input", () => {
        state.customB = true;
        if (state.enabled) {
          renderCompare();
        }
      });
      element.addEventListener("change", () => {
        state.customB = true;
        if (state.enabled) {
          renderCompare();
        }
      });
    });
  }

  function bindSetupAInputs() {
    const watchIds = ["coffeeType", "brewTool", "customCoffee", "blendRobusta", "blendArabica", "generate"];
    watchIds.forEach(id => {
      const element = document.getElementById(id);
      if (!element) {
        return;
      }
      element.addEventListener("input", () => state.enabled && renderCompare());
      element.addEventListener("change", () => state.enabled && renderCompare());
      if (id === "generate") {
        element.addEventListener("click", () => state.enabled && renderCompare());
      }
    });

    const toolFields = document.getElementById("toolFields");
    if (toolFields) {
      toolFields.addEventListener("input", () => state.enabled && renderCompare());
      toolFields.addEventListener("change", () => state.enabled && renderCompare());
    }
  }

  compareToggleEl.addEventListener("click", toggleCompare);

  compareSyncBEl.addEventListener("click", () => {
    state.customB = false;
    renderCompare();
  });

  bindSetupBInputs();
  bindSetupAInputs();
  ensureBToolOptions();
  renderCompare();
})();
