// Tips for the aside section
const TIPS = [
  "Tip: gunakan es batu besar agar tidak cepat mencair dan tetap menjaga body kopi.",
  "Tip: water quality sangat penting - gunakan filtered water untuk hasil maksimal.",
  "Tip: grind size konsisten menghasilkan ekstraksi yang lebih merata dan flavor lebih balanced.",
  "Tip: bloom stage selama 30-45 detik membantu release CO2 dan meningkatkan clarity.",
  "Tip: water temperature 88-92°C ideal untuk kebanyakan brewing method Javanese coffee.",
  "Tip: always weigh your beans dan air menggunakan scale untuk reproducibility.",
  "Tip: cold brew membutuhkan waktu 12-24 jam untuk ekstraksi optimal tanpa bitterness.",
  "Tip: agitasi ringan setelah blooming membantu pemerataan extraction tanpa over-extraction.",
  "Tip: serve dengan glass yang cukup dingin untuk menjaga temperature minuman lebih lama.",
  "Tip: jangan langsung minum - biarkan cooling hingga 60-70°C untuk taste clarity maksimal.",
  "Tip: Javanese coffee punya natural sweetness - jangan tambah gula berlebihan.",
  "Tip: uji extraction dengan tasting test, bukan hanya waktu - sesuaikan per bean.",
  "Tip: roast level lighter memberikan more origin character; darker lebih smooth body.",
  "Tip: grind finer untuk water yang softer; grind coarser untuk water yang harder.",
  "Tip: keep beans di airtight container, jauh dari light, heat, moisture untuk freshness.",
  "Tip: gunakan beans dalam 2-3 minggu setelah roast untuk flavor complexity maksimal.",
  "Tip: V60 cocok untuk experimenter - mudah adjust parameter ekstraksi untuk fine-tuning.",
  "Tip: Kalita Wave design memproduksi cup lebih consistent antar brewing.",
  "Tip: Aeropress versatile - bisa short time strong atau long time smooth brews.",
  "Tip: French Press memberikan full body; increase brew time untuk coarser grind.",
  "Tip: Syphon brewing adalah theater sekaligus precision - great untuk special occasions.",
  "Tip: espresso memerlukan fresh water temperature precision - cek thermoblock temperature regularly.",
  "Tip: Moka Pot produces coffee yang mirip espresso tapi dengan body lebih heavy.",
  "Tip: ratio brew adalah coffee weight : output weight - aim untuk 1:2 ideal extraction.",
  "Tip: extraction yield 18-22% adalah sweet spot untuk balanced cup dengan clarity.",
  "Tip: TDS 1.15-1.35% adalah golden cup range untuk most Javanese coffee.",
  "Tip: water mineral content matters - alkalinity buffer flavor acidity perception.",
  "Tip: experiment dengan mineral water vs distilled water - ada surprising differences.",
  "Tip: agitasi gentle lebih baik daripada vigorous untuk kontrolled extraction.",
  "Tip: pour speed konsisten menghasilkan more predictable cup profile.",
  "Tip: preheat semua equipment sebelum brewing untuk thermal stability maksimal.",
  "Tip: first few bars extraction most important - jangan skip good blooming phase.",
  "Tip: acidity tinggi bukan bad - characteristic penting dari quality Javanese coffee.",
  "Tip: sweetness alam Javanese coffee balance acidity untuk kompleks flavor profile.",
  "Tip: body creamy adalah signature - preserve dengan grind selection dan brewing control.",
  "Tip: aroma adalah first flavor impression - smell your coffee sebelum tasting.",
  "Tip: aftertaste panjang indicator extraction good - bukan sign over extraction.",
  "Tip: consistency brewing lebih penting daripada fancy equipment - master satu method.",
  "Tip: note taste profile changes dengan coffee age - same bean brew berbeda minggu ke minggu.",
  "Tip: practice tamping pressure konsisten - light, medium, atau firm sesuai grind profile.",
  "Tip: steam wand cleanliness crucial untuk milk quality jika pakai milk-based drinks.",
  "Tip: water temp variation 2-3°C bisa significant pada extraction result - be precise.",
  "Tip: filter paper quality matters - rinse filter sebelum brewing untuk paper taste removal.",
  "Tip: turbulence di bedding membantu contact area maksimal untuk even extraction.",
  "Tip: rest beans minimal sebelum grinding - fresh grind sekali sebelum brewing best.",
  "Tip: sunlight exposure ruak coffee freshness - store di tempat gelap always.",
  "Tip: enjoy brewing process - coffee appreciation lebih dari hasil, juga journey-nya.",
  "Tip: keep brewing journal - track parameter variable untuk find your preference.",
  "Tip: sharing coffee brewing moment dengan teman lebih meaningful daripada solo."
];

/**
 * Initialize tips rotator on the aside-tip element
 */
export function initTipsRotator() {
  const tipElement = document.querySelector(".aside-tip");
  if (!tipElement) return;

  let currentTipIndex = 0;

  function updateTip() {
    // Add fade-out class
    tipElement.classList.add("tip-fade-out");

    // Wait for fade-out animation, then change text and fade-in
    setTimeout(() => {
      currentTipIndex = (currentTipIndex + 1) % TIPS.length;
      tipElement.textContent = TIPS[currentTipIndex];
      tipElement.classList.remove("tip-fade-out");
    }, 600); // Duration of fade-out animation
  }

  // Change tip every 5 seconds
  setInterval(updateTip, 5000);
}
