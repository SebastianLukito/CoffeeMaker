const recipeEl = document.getElementById("recipe");
const toolFieldsEl = document.getElementById("toolFields");
const blendControlsEl = document.getElementById("blendControls");
const customControlsEl = document.getElementById("customControls");
const generateBtn = document.getElementById("generate");
const advancedOptionsEl = document.getElementById("advancedOptions");
const setupHintEl = document.getElementById("setupHint");
const blendRobustaEl = document.getElementById("blendRobusta");
const blendArabicaEl = document.getElementById("blendArabica");
const manualDoseEl = document.getElementById("manualDose");
const manualWaterEl = document.getElementById("manualWater");
const manualWaterTempEl = document.getElementById("manualWaterTemp");
const ratioWarningEl = document.getElementById("ratioWarning");
const manualToggleBtn = document.getElementById("manualToggleBtn");
const manualOverridesPanelEl = document.getElementById("manualOverridesPanel");
const cupFillIndicatorEl = document.getElementById("cupFillIndicator");
const cupFillTextEl = document.getElementById("cupFillText");
const flavorVisualEl = document.getElementById("flavorVisual");
const flavorRadarCanvasEl = document.getElementById("flavorRadarCanvas");
const flavorMetricGridEl = document.getElementById("flavorMetricGrid");
const tuningAssistantEl = document.getElementById("tuningAssistant");
const tasteIssueEl = document.getElementById("tasteIssue");
const runTuningEl = document.getElementById("runTuning");
const tuningSummaryEl = document.getElementById("tuningSummary");
const tuningListEl = document.getElementById("tuningList");

const stats = {
  coffee: { row: document.querySelector('[data-stat="coffee"]'), value: document.getElementById("coffeeProfile") },
  process: { row: document.querySelector('[data-stat="process"]'), value: document.getElementById("processProfile") },
  varietal: { row: document.querySelector('[data-stat="varietal"]'), value: document.getElementById("varietalProfile") },
  grind: { row: document.querySelector('[data-stat="grind"]'), value: document.getElementById("grindProfile") },
  roast: { row: document.querySelector('[data-stat="roast"]'), value: document.getElementById("roastProfile") },
  temp: { row: document.querySelector('[data-stat="temp"]'), value: document.getElementById("tempProfile") },
  mineral: { row: document.querySelector('[data-stat="mineral"]'), value: document.getElementById("mineralProfile") },
  agitation: { row: document.querySelector('[data-stat="agitation"]'), value: document.getElementById("agitationProfile") },
  time: { row: document.querySelector('[data-stat="time"]'), value: document.getElementById("timeProfile") },
  totalWater: { row: document.querySelector('[data-stat="totalWater"]'), value: document.getElementById("totalWater") },
  bloomWater: { row: document.querySelector('[data-stat="bloomWater"]'), value: document.getElementById("bloomWater") },
  firstPour: { row: document.querySelector('[data-stat="firstPour"]'), value: document.getElementById("firstPour") },
  secondPour: { row: document.querySelector('[data-stat="secondPour"]'), value: document.getElementById("secondPour") },
  iceWater: { row: document.querySelector('[data-stat="iceWater"]'), value: document.getElementById("iceWater") },
  brewRatio: { row: document.querySelector('[data-stat="brewRatio"]'), value: document.getElementById("brewRatioProfile") },
  shotTime: { row: document.querySelector('[data-stat="shotTime"]'), value: document.getElementById("shotTimeProfile") },
  pressure: { row: document.querySelector('[data-stat="pressure"]'), value: document.getElementById("pressureProfile") },
  steepTime: { row: document.querySelector('[data-stat="steepTime"]'), value: document.getElementById("steepTimeProfile") },
  drawdownTime: { row: document.querySelector('[data-stat="drawdownTime"]'), value: document.getElementById("drawdownTimeProfile") },
  dripRate: { row: document.querySelector('[data-stat="dripRate"]'), value: document.getElementById("dripRateProfile") },
  dripTime: { row: document.querySelector('[data-stat="dripTime"]'), value: document.getElementById("dripTimeProfile") },
  extractionIndex: { row: document.querySelector('[data-stat="extractionIndex"]'), value: document.getElementById("extractionIndexProfile") },
  ey: { row: document.querySelector('[data-stat="ey"]'), value: document.getElementById("eyProfile") },
  tds: { row: document.querySelector('[data-stat="tds"]'), value: document.getElementById("tdsProfile") },
  extractionStatus: { row: document.querySelector('[data-stat="extractionStatus"]'), value: document.getElementById("extractionStatusProfile") }
};

const extractionGuidanceText = [
  "Optimal (Golden Cup): TDS 1,15-1,35%, EY 18-22%.",
  "Under-extracted: EY < 18% (rasa asam/tipis).",
  "Over-extracted: EY > 22% (rasa pahit/sepat).",
  "Espresso: TDS 8-12%, EY 18-22%."
].join("\n");

const hoverHelpByFieldId = {
  coffeeType: "Pilih jenis kopi untuk menentukan karakter rasa dasar dan bias flavor awal.",
  brewTool: "Setiap alat seduh punya target ekstraksi berbeda, jadi langkah dan rekomendasi akan menyesuaikan.",
  processMethod: "Metode proses pasca panen memengaruhi acidity, sweetness, body, dan aroma akhir.",
  varietal: "Varietas menentukan kecenderungan rasa bawaan seperti floral, fruity, spicy, atau nutty.",
  beanDensity: "Densitas tinggi cenderung butuh energi ekstraksi lebih besar; densitas rendah cenderung lebih mudah terekstrak.",
  restDays: "Masa resting roast memengaruhi stabilitas degassing dan konsistensi ekstraksi.",
  waterAlkalinity: "Alkalinitas air memengaruhi buffer keasaman dan persepsi clarity rasa.",
  turbulence: "Turbulensi aliran memengaruhi seberapa cepat dan merata pelarutan senyawa kopi.",
  grind: "Semakin halus gilingan, laju ekstraksi biasanya makin cepat; terlalu halus bisa meningkatkan pahit.",
  roastLevel: "Roast level mengubah kelarutan: light umumnya butuh energi lebih, dark lebih cepat terekstrak.",
  dose: "Jumlah kopi memengaruhi strength dan body; dosis lebih tinggi biasanya menghasilkan minuman lebih pekat.",
  ratio: "Rasio kopi-air menentukan kekuatan seduhan. Angka lebih kecil biasanya lebih pekat.",
  waterTemp: "Suhu lebih tinggi mempercepat ekstraksi; terlalu tinggi bisa memicu rasa pahit/sepat.",
  waterHardness: "Mineral air memengaruhi keseimbangan clarity, sweetness, dan body pada cangkir akhir.",
  agitation: "Agitasi membantu pemerataan ekstraksi, tetapi berlebihan bisa menaikkan bitterness.",
  targetTime: "Target waktu seduh membantu menjaga konsistensi extraction yield antar brew.",
  brewRatio: "Untuk espresso, rasio brew adalah gram kopi : gram hasil ekstraksi (yield).",
  shotTime: "Shot time terlalu singkat cenderung under, terlalu lama cenderung over extraction.",
  pressure: "Tekanan espresso memengaruhi laju aliran dan efisiensi ekstraksi pada puck.",
  steepTime: "Waktu perendaman menentukan kedalaman ekstraksi pada metode immersion.",
  pressTime: "Durasi press pada Aeropress memengaruhi body dan clarity hasil akhir.",
  brewTime: "Waktu brew Syphon memengaruhi keseimbangan acidity, body, dan aroma.",
  drawdownTime: "Waktu drawdown memberi sinyal resistensi bed kopi dan konsistensi grind.",
  steepTimeCold: "Cold brew memakai perendaman panjang untuk ekstraksi halus dengan acidity rendah.",
  icePercent: "Persentase pengenceran saat serving mengatur kekuatan akhir minuman dingin.",
  dripRate: "Laju tetes cold drip menentukan kontak air-kopi dan profil ekstraksi.",
  dripTime: "Durasi total cold drip memengaruhi extraction yield dan intensitas rasa.",
  manualDose: "Override manual gram kopi jika ingin keluar dari rekomendasi otomatis.",
  manualWater: "Override manual volume air untuk kontrol rasio yang lebih presisi.",
  manualWaterTemp: "Override manual suhu air untuk eksperimen ekstraksi yang lebih detail."
};

const hoverHelpByStatKey = {
  coffee: "Jenis kopi aktif yang dipakai sebagai basis perhitungan profil rasa.",
  process: "Ringkasan proses pasca panen dari konfigurasi saat ini.",
  varietal: "Ringkasan varietas kopi yang aktif.",
  grind: "Ringkasan tingkat gilingan aktif.",
  roast: "Ringkasan roast level aktif.",
  temp: "Suhu air aktual yang dipakai dalam model ekstraksi.",
  mineral: "Tingkat mineral air yang memengaruhi persepsi rasa.",
  agitation: "Level agitasi yang dipakai selama proses seduh.",
  time: "Target waktu utama untuk metode seduh aktif.",
  totalWater: "Total air yang dipakai pada resep saat ini.",
  bloomWater: "Volume air untuk fase blooming.",
  firstPour: "Volume tuangan pertama setelah blooming.",
  secondPour: "Volume tuangan kedua untuk menyelesaikan total brew water.",
  iceWater: "Perkiraan air/es untuk pengenceran saat penyajian.",
  brewRatio: "Rasio brew espresso: gram kopi terhadap gram hasil ekstraksi.",
  shotTime: "Durasi ekstraksi shot espresso.",
  pressure: "Tekanan ekstraksi espresso dalam bar.",
  steepTime: "Durasi perendaman pada metode immersion.",
  drawdownTime: "Waktu penurunan kopi setelah fase brew pada syphon.",
  dripRate: "Laju tetesan pada cold drip.",
  dripTime: "Durasi total ekstraksi cold drip.",
  extractionIndex: "Skor ringkas kualitas ekstraksi berdasarkan deviasi dari target alat seduh.",
  ey: extractionGuidanceText,
  tds: extractionGuidanceText,
  extractionStatus: "Status ringkas ekstraksi saat ini: Under, Ideal, atau Over."
};

const tasteNotes = {
  "java-robusta": "Body tebal, cokelat pekat, sedikit smokey.",
  "java-arabica": "Aroma floral, acidity lembut, clean finish.",
  "java-excelsa": "Aroma tropis, hint berry, acidity tajam namun juicy.",
  "java-liberica": "Floral, woody, dan aftertaste manis herbal.",
  "blend": "Keseimbangan manis-rempah, creamy, dan juicy.",
  "custom": "Profil rasa tergantung origin dan prosesnya."
};

const toolNotes = {
  v60: "Tuangan spiral halus agar clarity maksimal.",
  kalita: "Tuangan stabil di tengah untuk ekstraksi merata.",
  aeropress: "Seduh dengan tekanan manual untuk body lebih creamy.",
  frenchpress: "Immersion penuh untuk body tebal.",
  chemex: "Filter tebal, menghasilkan clarity tinggi.",
  syphon: "Ekstraksi bersih dengan aroma kuat.",
  espresso: "Ekstraksi tekanan tinggi untuk crema padat.",
  mokapot: "Karakter bold, mendekati espresso.",
  coldBrew: "Immersion dingin panjang dengan rasa low-acid dan sweet.",
  coldDrip: "Ekstraksi dingin, rasa sangat clean."
};

const coffeeLabels = {
  "java-robusta": "Java Robusta",
  "java-arabica": "Java Arabica",
  "java-excelsa": "Java Excelsa",
  "java-liberica": "Java Liberica",
  "blend": "Javanese Blend",
  "custom": "Custom"
};

const coffeeFlavorProfiles = {
  "java-robusta": "dominan dark chocolate, kacang panggang, dan spice tebal dengan body tinggi",
  "java-arabica": "floral-citrus yang bersih, manis gula tebu, dengan aftertaste teh hitam",
  "java-excelsa": "nuansa buah tropis, jackfruit dan berry dengan acidity tajam-juicy",
  "java-liberica": "aroma woody-floral, hint nangka matang, herbal manis dan body creamy",
  "blend": "karakter gabungan robusta-arabika yang bisa bergerak dari bold ke elegant tergantung komposisi",
  "custom": "karakter origin spesifik yang fleksibel dan sangat dipengaruhi proses serta varietas"
};

const processFlavorProfiles = {
  washed: "cenderung clean, acidity terdefinisi, dan aftertaste rapi",
  fullWashed: "sangat bersih dengan clarity tinggi, acid line presisi, dan finish crisp",
  natural: "lebih fruity, manis ferment, body lebih penuh dengan fruit-forward aromatics",
  honeyYellow: "sweetness madu ringan dengan body medium dan acidity bulat",
  honeyRed: "sweetness karamel-merah, body lebih sirupy, fruit tone lebih matang",
  honeyBlack: "intens manis pekat, body tebal, sering muncul note dried fruit dan molasses",
  pulpedNatural: "menjaga keseimbangan clean cup dan sweetness buah matang",
  semiWashed: "body lebih round dengan acidity lembut dan earthy undertone halus",
  wetHulled: "body besar, acidity rendah, dengan karakter earthy-herbal khas Nusantara",
  anaerobicNatural: "buah ferment kompleks (tropical winey), sweetness tinggi, aroma eksplosif",
  anaerobicWashed: "tetap clean tetapi memiliki lapisan ferment yang kompleks dan aromatik",
  carbonicMaceration: "aroma red fruit, florality tinggi, dan mouthfeel juicy sparkling",
  wineProcess: "aroma winey, grape-berry matang, sweetness tinggi dengan finish panjang",
  lacticFermentation: "profil creamy-yogurt, acidity lembut-lactic, dan sweetness bulat",
  yeastInoculated: "aroma sangat terarah (sering floral atau tropical) dengan kejernihan rasa tinggi",
  extendedFermentation: "kompleksitas meningkat, sering muncul note rum raisin dan cacao nib",
  doubleFermentation: "layer rasa berlapis dari clean fruit ke ferment depth yang dalam",
  thermalShock: "clarity tinggi dengan aromatik terangkat dan sweetness lebih terfokus",
  monsooned: "acidity sangat rendah, body berat, nutty-spicy dengan karakter aged",
  coferment: "profil eksperimental dengan aroma sangat intens, manis tinggi, dan karakter unik"
};

const varietalFlavorProfiles = {
  typica: "elegan floral, citrus lembut, dan sweetness gula tebu",
  bourbon: "manis kompleks seperti red apple, caramel, dan fruit jam",
  caturra: "clean, medium body, nutty-citrus seimbang",
  catuai: "sweet nutty-caramel, acidity medium, body stabil",
  mundoNovo: "cokelat-kacang, sweet caramel, body kuat",
  catimor: "bold herbal-cacao, acidity rendah-menengah, struktur tegas",
  sarchimor: "chocolate-spice, body solid, acidity medium",
  castillo: "clean sweet cocoa, citrus ringan, body medium",
  colombia: "caramel, red fruit ringan, dan acidity seimbang",
  geisha: "jasmine, black tea, peach/tropical fruit dengan aromatik sangat tinggi",
  sl28: "blackcurrant, citrus terang, juicy acidity",
  sl34: "stone fruit manis, black tea, body lebih round",
  pacamara: "buah tropis besar, floral, spice kompleks, body creamy",
  maragogype: "floral ringan, citrus lembut, body halus",
  pacas: "sweet caramel, orange zest, clean finish",
  java: "floral-herbal clean dengan acidity lembut",
  ethiopianHeirloom: "floral intens, bergamot, stone fruit, tea-like finish",
  sidra: "tropical floral dan sweetness tinggi dengan mouthfeel silky",
  wushWush: "floral eksotis, berry matang, body juicy",
  rudolph: "fruit-forward, acid terang, dan sweetness syrupy",
  ruiru11: "balanced cocoa-fruit, body medium, acidity moderat",
  batian: "citrus floral, sweetness rapi, body medium",
  timorHybrid: "body tebal, herbal-cacao, acidity cenderung rendah",
  s795: "spice, nutty-chocolate, dan sweet tobacco ringan",
  s288: "herbal spicy dengan sweetness jaggery",
  pache: "floral manis, caramel ringan, acidity lembut",
  villaSarchi: "sweet citrus dan brown sugar, body halus",
  obata: "clean nutty, chocolate ringan, body stabil",
  garnica: "sweet mild-cocoa, acidity lembut, body medium",
  moka: "floral-tea dan citrus sweet dengan body ringan",
  libTek: "woody-sweet tropical dan body besar khas liberica",
  robustaClonal: "dark cacao, roasted nuts, earthy spice dengan body sangat tebal"
};

const roastFlavorEffects = {
  light: "Roast light mempertahankan florality dan acidity origin secara maksimal.",
  medium: "Roast medium menjaga keseimbangan manis, body, dan aromatik.",
  dark: "Roast dark mempertegas cokelat pahit, spice, dan body bold."
};

const mineralFlavorEffects = {
  soft: "Konsentrasi mineral air soft biasanya membuat rasa lebih manis dan lembut.",
  balanced: "Mineral balanced membantu keseimbangan clarity dan body.",
  hard: "Mineral hard mendorong body dan intensity menjadi lebih tegas."
};

const agitationFlavorEffects = {
  gentle: "Agitasi gentle menjaga cup tetap clean dan terkontrol.",
  medium: "Agitasi medium memberi ekstraksi merata dengan body sedang.",
  high: "Agitasi tinggi meningkatkan ekstraksi dan mempertebal mouthfeel."
};

const brewFlavorEffects = {
  v60: "Metode V60 menonjolkan clarity dan note aromatik atas.",
  kalita: "Kalita cenderung memberi body bulat dengan sweetness konsisten.",
  chemex: "Chemex membuat cup sangat bersih dan tea-like.",
  aeropress: "Aeropress memberi body juicy dengan intensitas tinggi.",
  frenchpress: "French press menonjolkan body tebal dan tekstur kaya.",
  syphon: "Syphon mengangkat aroma dan menghasilkan cup bersih-juicy.",
  espresso: "Espresso memadatkan rasa menjadi pekat dan berdimensi.",
  mokapot: "Moka pot memberi profil bold dengan karakter nutty-cacao.",
  coldBrew: "Cold brew membuat cup low-acid, smooth, dan sweet.",
  coldDrip: "Cold drip menghasilkan clarity tinggi dengan finish panjang."
};

const fieldState = {};

const options = {
  grindAll: [
    { value: "coarse", label: "Coarse" },
    { value: "medium", label: "Medium" },
    { value: "fine", label: "Fine" }
  ],
  grindImmersion: [
    { value: "coarse", label: "Coarse" },
    { value: "medium", label: "Medium" }
  ],
  grindEspresso: [
    { value: "fine", label: "Fine" },
    { value: "medium-fine", label: "Medium-Fine" }
  ],
  roast: [
    { value: "light", label: "Light" },
    { value: "medium", label: "Medium" },
    { value: "dark", label: "Dark" }
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
  ratioPourOver: [
    { value: "12", label: "1:12 (lebih bold)" },
    { value: "14", label: "1:14 (seimbang)" },
    { value: "16", label: "1:16 (lebih ringan)" }
  ],
  ratioImmersion: [
    { value: "13", label: "1:13" },
    { value: "15", label: "1:15" },
    { value: "17", label: "1:17" }
  ],
  ratioMoka: [
    { value: "6", label: "1:6" },
    { value: "7", label: "1:7" },
    { value: "8", label: "1:8" }
  ],
  ratioColdBrew: [
    { value: "6", label: "1:6" },
    { value: "8", label: "1:8" },
    { value: "10", label: "1:10" }
  ],
  ratioColdDrip: [
    { value: "8", label: "1:8" },
    { value: "10", label: "1:10" },
    { value: "12", label: "1:12" }
  ],
  brewRatioEspresso: [
    { value: "2", label: "1:2" },
    { value: "2.5", label: "1:2.5" },
    { value: "3", label: "1:3" }
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
  icePercent: [
    { value: "25", label: "25%" },
    { value: "35", label: "35%" },
    { value: "40", label: "40%" },
    { value: "45", label: "45%" }
  ],
  steepTime: [
    { value: "1:30", label: "1:30" },
    { value: "2:00", label: "2:00" },
    { value: "3:30", label: "3:30" },
    { value: "4:00", label: "4:00" }
  ],
  pressTime: [
    { value: "0:30", label: "0:30" },
    { value: "0:45", label: "0:45" },
    { value: "1:00", label: "1:00" }
  ],
  brewTime: [
    { value: "1:30", label: "1:30" },
    { value: "2:00", label: "2:00" },
    { value: "2:30", label: "2:30" }
  ],
  drawdownTime: [
    { value: "0:45", label: "0:45" },
    { value: "1:00", label: "1:00" }
  ],
  shotTime: [
    { value: "25", label: "25 detik" },
    { value: "28", label: "28 detik" },
    { value: "30", label: "30 detik" },
    { value: "32", label: "32 detik" }
  ],
  pressure: [
    { value: "8", label: "8 bar" },
    { value: "9", label: "9 bar" },
    { value: "10", label: "10 bar" }
  ],
  dripRate: [
    { value: "1", label: "1 tetes/detik" },
    { value: "2", label: "2 tetes/detik" },
    { value: "3", label: "3 tetes/detik" }
  ],
  dripTime: [
    { value: "2", label: "2 jam" },
    { value: "3", label: "3 jam" },
    { value: "4", label: "4 jam" },
    { value: "6", label: "6 jam" }
  ],
  steepTimeCold: [
    { value: "12", label: "12 jam" },
    { value: "16", label: "16 jam" },
    { value: "18", label: "18 jam" },
    { value: "24", label: "24 jam" }
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

const commonFlavorFields = [
  { id: "processMethod", label: "Proses kopi", type: "select", options: options.processMethod, default: "washed" },
  { id: "varietal", label: "Varietas kopi", type: "select", options: options.varietal, default: "typica" }
];

const commonExtractionFields = [
  { id: "beanDensity", label: "Densitas biji", type: "select", options: options.beanDensity, default: "medium" },
  { id: "restDays", label: "Masa resting roast", type: "select", options: options.restDays, default: "14" },
  { id: "waterAlkalinity", label: "Alkalinitas air", type: "select", options: options.waterAlkalinity, default: "balanced" },
  { id: "turbulence", label: "Turbulensi aliran", type: "select", options: options.turbulence, default: "medium" }
];

const toolConfigs = {
  v60: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindAll, default: "medium" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "medium" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 10, max: 30, step: 1, default: 20 },
      { id: "ratio", label: "Rasio kopi (gr) terhadap air (ml)", type: "select", options: options.ratioPourOver, default: "14" },
      { id: "waterTemp", label: "Suhu air", type: "select", options: options.waterTemp, default: "92" },
      { id: "waterHardness", label: "Konsentrasi mineral air", type: "select", options: options.waterHardness, default: "balanced" },
      { id: "agitation", label: "Agitasi", type: "select", options: options.agitation, default: "gentle" },
      { id: "targetTime", label: "Target brew time", type: "select", options: options.targetTime, default: "3:00" }
    ]
  },
  kalita: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindAll, default: "medium" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "medium" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 10, max: 30, step: 1, default: 20 },
      { id: "ratio", label: "Rasio kopi (gr) terhadap air (ml)", type: "select", options: options.ratioPourOver, default: "14" },
      { id: "waterTemp", label: "Suhu air", type: "select", options: options.waterTemp, default: "92" },
      { id: "waterHardness", label: "Konsentrasi mineral air", type: "select", options: options.waterHardness, default: "balanced" },
      { id: "agitation", label: "Agitasi", type: "select", options: options.agitation, default: "gentle" },
      { id: "targetTime", label: "Target brew time", type: "select", options: options.targetTime, default: "3:00" }
    ]
  },
  chemex: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindAll, default: "medium" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "medium" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 10, max: 30, step: 1, default: 20 },
      { id: "ratio", label: "Rasio kopi (gr) terhadap air (ml)", type: "select", options: options.ratioPourOver, default: "16" },
      { id: "waterTemp", label: "Suhu air", type: "select", options: options.waterTemp, default: "92" },
      { id: "waterHardness", label: "Konsentrasi mineral air", type: "select", options: options.waterHardness, default: "balanced" },
      { id: "agitation", label: "Agitasi", type: "select", options: options.agitation, default: "gentle" },
      { id: "targetTime", label: "Target brew time", type: "select", options: options.targetTime, default: "4:00" }
    ]
  },
  aeropress: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindAll, default: "fine" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "medium" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 12, max: 25, step: 1, default: 18 },
      { id: "ratio", label: "Rasio kopi (gr) terhadap air (ml)", type: "select", options: options.ratioImmersion, default: "13" },
      { id: "waterTemp", label: "Suhu air", type: "select", options: options.waterTemp, default: "90" },
      { id: "steepTime", label: "Steep time", type: "select", options: options.steepTime, default: "1:30" },
      { id: "pressTime", label: "Press time", type: "select", options: options.pressTime, default: "0:30" }
    ]
  },
  frenchpress: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindImmersion, default: "coarse" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "medium" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 15, max: 30, step: 1, default: 22 },
      { id: "ratio", label: "Rasio kopi (gr) terhadap air (ml)", type: "select", options: options.ratioImmersion, default: "15" },
      { id: "waterTemp", label: "Suhu air", type: "select", options: options.waterTemp, default: "92" },
      { id: "steepTime", label: "Steep time", type: "select", options: options.steepTime, default: "4:00" }
    ]
  },
  syphon: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindAll, default: "medium" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "light" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 15, max: 30, step: 1, default: 20 },
      { id: "ratio", label: "Rasio kopi (gr) terhadap air (ml)", type: "select", options: options.ratioPourOver, default: "14" },
      { id: "waterTemp", label: "Suhu air", type: "select", options: options.waterTemp, default: "92" },
      { id: "brewTime", label: "Brew time", type: "select", options: options.brewTime, default: "1:30" },
      { id: "drawdownTime", label: "Drawdown time", type: "select", options: options.drawdownTime, default: "0:45" }
    ]
  },
  espresso: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindEspresso, default: "fine" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "medium" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 16, max: 22, step: 1, default: 18 },
      { id: "brewRatio", label: "Rasio brew (gram : gram, 1:x)", type: "select", options: options.brewRatioEspresso, default: "2" },
      { id: "waterTemp", label: "Suhu air", type: "select", options: options.waterTemp, default: "93" },
      { id: "shotTime", label: "Shot time", type: "select", options: options.shotTime, default: "28" },
      { id: "pressure", label: "Pressure", type: "select", options: options.pressure, default: "9" }
    ]
  },
  mokapot: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindEspresso, default: "medium-fine" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "dark" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 15, max: 28, step: 1, default: 20 },
      { id: "ratio", label: "Rasio kopi (gr) terhadap air (ml)", type: "select", options: options.ratioMoka, default: "7" },
      { id: "waterTemp", label: "Suhu air", type: "select", options: options.waterTemp, default: "90" }
    ]
  },
  coldBrew: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindImmersion, default: "coarse" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "medium" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 30, max: 90, step: 5, default: 60 },
      { id: "ratio", label: "Rasio kopi (gr) terhadap air (ml)", type: "select", options: options.ratioColdBrew, default: "8" },
      { id: "steepTimeCold", label: "Waktu perendaman", type: "select", options: options.steepTimeCold, default: "16" },
      { id: "icePercent", label: "Persen air dingin saat serving", type: "select", options: options.icePercent, default: "35" }
    ]
  },
  coldDrip: {
    fields: [
      { id: "grind", label: "Jenis gilingan", type: "select", options: options.grindImmersion, default: "coarse" },
      { id: "roastLevel", label: "Roast level", type: "select", options: options.roast, default: "medium" },
      { id: "dose", label: "Gramasi kopi (gram)", type: "number", min: 30, max: 80, step: 5, default: 50 },
      { id: "ratio", label: "Rasio kopi (gr) terhadap air (ml)", type: "select", options: options.ratioColdDrip, default: "10" },
      { id: "dripRate", label: "Drip rate", type: "select", options: options.dripRate, default: "2" },
      { id: "dripTime", label: "Drip time", type: "select", options: options.dripTime, default: "3" }
    ]
  }
};

const flavorMetrics = [
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

let lastFlavorProfile = null;
let lastTuningContext = null;
let cupFillStatusTimer = null;

function formatMl(value) {
  return `${Math.round(value)} ml`;
}

function clampBlendPercent(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(100, Math.max(0, Math.round(parsed)));
}

function syncBlendInputs(changedField = "robusta") {
  if (!blendRobustaEl || !blendArabicaEl) {
    return { robusta: 30, arabica: 70 };
  }

  if (changedField === "arabica") {
    const arabica = clampBlendPercent(blendArabicaEl.value, 70);
    const robusta = 100 - arabica;
    blendArabicaEl.value = String(arabica);
    blendRobustaEl.value = String(robusta);
    return { robusta, arabica };
  }

  const robusta = clampBlendPercent(blendRobustaEl.value, 30);
  const arabica = 100 - robusta;
  blendRobustaEl.value = String(robusta);
  blendArabicaEl.value = String(arabica);
  return { robusta, arabica };
}

function getBlendRatio() {
  const { robusta, arabica } = syncBlendInputs("robusta");

  return { robusta, arabica, note: `${robusta}/${arabica}` };
}

function resolveCoffeeLabel(coffeeType) {
  const customName = document.getElementById("customCoffee").value.trim();
  if (coffeeType === "custom") {
    return customName || "Custom Coffee";
  }

  if (coffeeType === "blend") {
    const ratio = getBlendRatio();
    return `Javanese Blend (${ratio.note} R/A)`;
  }

  return coffeeLabels[coffeeType] || "Kopi pilihan";
}

function resolveRecipeTitle(coffeeLabel, brewToolLabel) {
  const recipeNameEl = document.getElementById("recipeName");
  const recipeName = recipeNameEl ? recipeNameEl.value.trim() : "";

  if (recipeName) {
    return recipeName;
  }

  return `${coffeeLabel} - ${brewToolLabel}`;
}

function getManualNumericValue(element) {
  if (!element) {
    return null;
  }

  const value = Number(element.value);
  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return value;
}

function getManualBrewOverrides() {
  return {
    dose: getManualNumericValue(manualDoseEl),
    water: getManualNumericValue(manualWaterEl),
    waterTemp: getManualNumericValue(manualWaterTempEl)
  };
}

function getRatioWarningMessage(dose, water, brewTool) {
  if (!Number.isFinite(dose) || !Number.isFinite(water) || dose <= 0 || water <= 0) {
    return "Masukkan angka kopi dan air yang valid dulu.";
  }

  if (dose < 5) {
    return "Gram kopi terlalu kecil. Pastikan satuannya gram, bukan miligram.";
  }

  if (dose > 2000) {
    return "Gram kopi terlalu besar. Pastikan tidak salah pilih satuan, misalnya kilogram atau ton.";
  }

  if (water < 30) {
    return "Air terlalu sedikit. Pastikan satuannya ml, bukan tetes atau gram yang belum dikonversi.";
  }

  if (water > 5000) {
    return "Volume air sangat besar. Cek lagi apakah angka yang dimasukkan sudah benar.";
  }

  const ratio = water / dose;
  if (brewTool === "espresso") {
    if (ratio < 1 || ratio > 4) {
      return "Rasio espresso terlihat tidak wajar. Biasanya berada di kisaran 1:2 sampai 1:3.";
    }
    return "";
  }

  if (ratio < 4 || ratio > 25) {
    return "Rasio kopi dan air terlihat tidak wajar. Coba cek lagi apakah angka sudah dalam gram dan ml.";
  }

  return "";
}

function toggleBlendControls(coffeeType) {
  if (coffeeType === "blend") {
    blendControlsEl.classList.add("active");
  } else {
    blendControlsEl.classList.remove("active");
  }
}

function toggleCustomControls(coffeeType) {
  if (coffeeType === "custom") {
    customControlsEl.classList.add("active");
  } else {
    customControlsEl.classList.remove("active");
  }
}

function replayClass(element, className) {
  if (!element) {
    return;
  }

  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function resetCupFillIndicator() {
  if (!cupFillIndicatorEl) {
    return;
  }
  cupFillIndicatorEl.classList.remove("is-filling", "is-ready");
  if (cupFillTextEl) {
    cupFillTextEl.textContent = "Siap diracik";
  }
  if (cupFillStatusTimer) {
    clearTimeout(cupFillStatusTimer);
    cupFillStatusTimer = null;
  }
}

function playCupFillAnimation() {
  if (!cupFillIndicatorEl) {
    return;
  }
  if (cupFillStatusTimer) {
    clearTimeout(cupFillStatusTimer);
    cupFillStatusTimer = null;
  }

  cupFillIndicatorEl.classList.remove("is-filling");
  cupFillIndicatorEl.classList.add("is-ready");
  if (cupFillTextEl) {
    cupFillTextEl.textContent = "Cup siap disajikan";
  }
}

function hasBaseSelection() {
  const coffeeType = document.getElementById("coffeeType").value;
  const brewTool = document.getElementById("brewTool").value;
  return Boolean(coffeeType) && Boolean(brewTool);
}

function updateProgressiveVisibility() {
  if (hasBaseSelection()) {
    advancedOptionsEl.classList.remove("is-hidden");
    setupHintEl.classList.add("is-hidden");
  } else {
    advancedOptionsEl.classList.add("is-hidden");
    setupHintEl.classList.remove("is-hidden");
  }
}

function resetStats() {
  Object.values(stats).forEach(stat => {
    stat.row.classList.add("hidden");
  });
}

function showStat(key, value) {
  const stat = stats[key];
  if (!stat) {
    return;
  }

  const nextValue = String(value);
  const hasChanged = stat.value.textContent !== nextValue;

  stat.row.classList.remove("hidden");
  stat.value.textContent = nextValue;

  if (hasChanged) {
    replayClass(stat.row, "updated");
  }
}

function setHoverHelp(target, text) {
  if (!target || !text) {
    return;
  }

  target.setAttribute("title", text);
  target.setAttribute("data-tooltip", text);
  target.classList.add("hover-help");
}

function applyHoverHelpToFormLabels() {
  document.querySelectorAll("label[for]").forEach(label => {
    const fieldId = label.getAttribute("for");
    setHoverHelp(label, hoverHelpByFieldId[fieldId]);
  });
}

function applyHoverHelpToStats() {
  Object.entries(stats).forEach(([key, stat]) => {
    if (!stat || !stat.row) {
      return;
    }
    const labelEl = stat.row.querySelector("span");
    setHoverHelp(labelEl, hoverHelpByStatKey[key]);
  });
}

function hydrateHoverHelp() {
  applyHoverHelpToFormLabels();
  applyHoverHelpToStats();
}

function optionLabel(field, value) {
  if (!field || !field.options) {
    return value;
  }
  const match = field.options.find(option => option.value === String(value));
  return match ? match.label : value;
}

function getFieldValue(field, fallback) {
  const el = document.getElementById(field.id);
  if (!el) {
    return fallback;
  }
  if (el.type === "number") {
    const parsed = Number(el.value || fallback);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return el.value || fallback;
}

function getActiveFields(toolConfig) {
  return [...commonFlavorFields, ...commonExtractionFields, ...toolConfig.fields];
}

function setFlavorVisualVisibility(visible) {
  if (!flavorVisualEl) {
    return;
  }
  flavorVisualEl.classList.toggle("is-hidden", !visible);
}

function setTuningAssistantVisibility(visible) {
  if (!tuningAssistantEl) {
    return;
  }
  tuningAssistantEl.classList.toggle("is-hidden", !visible);
}

function buildTuningRecommendations(issue, context) {
  const { values, profile, brewTool, activeFields } = context;
  const hasField = id => activeFields.some(field => field.id === id);
  const suggestions = [];

  const canAdjustTemp = hasField("waterTemp") && Number.isFinite(Number(values.waterTemp));
  const canAdjustRatio = hasField("ratio") && Number.isFinite(Number(values.ratio));
  const canAdjustEspressoRatio = hasField("brewRatio") && Number.isFinite(Number(values.brewRatio));
  const canAdjustGrind = hasField("grind");
  const canAdjustTime = ["targetTime", "steepTime", "brewTime", "pressTime", "drawdownTime", "shotTime"].some(id => hasField(id));

  if (issue === "too-bitter") {
    if (canAdjustTemp) {
      const nextTemp = Math.max(75, Number(values.waterTemp) - 2);
      suggestions.push(`Turunkan suhu air sekitar 2°C (coba ${nextTemp}°C).`);
    }
    if (canAdjustGrind) {
      suggestions.push("Gunakan grind sedikit lebih kasar untuk menurunkan over-extraction.");
    }
    if (canAdjustRatio) {
      const nextRatio = Math.min(30, Number(values.ratio) + 1);
      suggestions.push(`Naikkan rasio air ke sekitar 1:${nextRatio} agar cup lebih clean.`);
    }
    if (canAdjustTime) {
      suggestions.push("Pendekkan waktu seduh 10-20 detik pada tahap utama.");
    }
  }

  if (issue === "too-sour") {
    if (canAdjustTemp) {
      const nextTemp = Math.min(100, Number(values.waterTemp) + 2);
      suggestions.push(`Naikkan suhu air sekitar 2°C (coba ${nextTemp}°C).`);
    }
    if (canAdjustGrind) {
      suggestions.push("Gunakan grind sedikit lebih halus untuk meningkatkan ekstraksi.");
    }
    if (canAdjustRatio) {
      const nextRatio = Math.max(8, Number(values.ratio) - 1);
      suggestions.push(`Turunkan rasio ke sekitar 1:${nextRatio} untuk memperkuat body dan sweetness.`);
    }
    if (canAdjustTime) {
      suggestions.push("Tambahkan waktu kontak air 10-20 detik.");
    }
  }

  if (issue === "too-thin") {
    if (canAdjustRatio) {
      const nextRatio = Math.max(8, Number(values.ratio) - 1);
      suggestions.push(`Gunakan rasio lebih pekat: coba 1:${nextRatio}.`);
    } else if (canAdjustEspressoRatio) {
      const nextRatio = Math.max(1.5, Number(values.brewRatio) - 0.2).toFixed(1);
      suggestions.push(`Turunkan brew ratio espresso ke sekitar 1:${nextRatio}.`);
    }
    if (canAdjustGrind) {
      suggestions.push("Pakai grind sedikit lebih halus agar body naik.");
    }
    suggestions.push("Kurangi agitasi berlebihan agar struktur cup tidak terlalu tipis.");
  }

  if (issue === "too-heavy") {
    if (canAdjustRatio) {
      const nextRatio = Math.min(30, Number(values.ratio) + 1);
      suggestions.push(`Naikkan rasio ke sekitar 1:${nextRatio} supaya body lebih ringan.`);
    } else if (canAdjustEspressoRatio) {
      const nextRatio = Math.min(4, Number(values.brewRatio) + 0.2).toFixed(1);
      suggestions.push(`Naikkan brew ratio espresso ke sekitar 1:${nextRatio}.`);
    }
    if (canAdjustGrind) {
      suggestions.push("Gunakan grind sedikit lebih kasar untuk mengurangi kepadatan seduhan.");
    }
    if (canAdjustTemp) {
      suggestions.push("Turunkan suhu 1-2°C agar ekstraksi komponen pahit lebih terkendali.");
    }
  }

  if (issue === "too-flat") {
    if (canAdjustTemp) {
      const nextTemp = Math.min(100, Number(values.waterTemp) + 1);
      suggestions.push(`Naikkan suhu tipis sekitar 1°C (target ${nextTemp}°C) untuk buka aroma.`);
    }
    suggestions.push("Tingkatkan agitasi 1 level lebih tinggi saat fase awal seduh.");
    suggestions.push("Pakai grind sedikit lebih halus agar note aromatik lebih keluar.");
  }

  if (issue === "too-dry") {
    if (canAdjustTemp) {
      const nextTemp = Math.max(75, Number(values.waterTemp) - 1);
      suggestions.push(`Turunkan suhu 1°C (coba ${nextTemp}°C) untuk aftertaste lebih smooth.`);
    }
    if (canAdjustRatio) {
      const nextRatio = Math.min(30, Number(values.ratio) + 1);
      suggestions.push(`Sedikit naikkan rasio air ke 1:${nextRatio}.`);
    }
    suggestions.push("Kurangi intensitas agitasi agar tannin tidak terlalu menonjol.");
  }

  if (profile.bitterness >= 7 && !suggestions.some(item => item.includes("suhu"))) {
    suggestions.push("Bitterness terdeteksi tinggi, prioritas pertama: turunkan suhu atau coarsen grind.");
  }

  return suggestions.slice(0, 4);
}

function renderTuningAssistant(issue = "too-bitter") {
  if (!tuningSummaryEl || !tuningListEl || !lastTuningContext) {
    return;
  }

  const labels = {
    "too-bitter": "terlalu pahit",
    "too-sour": "terlalu asam",
    "too-thin": "body terlalu tipis",
    "too-heavy": "body terlalu tebal",
    "too-flat": "aroma kurang keluar",
    "too-dry": "aftertaste terlalu kering"
  };

  const recommendations = buildTuningRecommendations(issue, lastTuningContext);
  const fallback = ["Belum ada saran spesifik. Coba ubah satu variabel kecil dulu (suhu atau rasio), lalu cupping ulang."];
  const result = recommendations.length > 0 ? recommendations : fallback;

  tuningSummaryEl.textContent = `Analisis untuk keluhan ${labels[issue] || issue}.`;
  tuningListEl.innerHTML = result.map(item => `<li>${item}</li>`).join("");
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

function computeExtractionEstimate({ brewTool, values, dose }) {
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
  const note = statusLabel === "Under"
    ? "indikasi under-extracted (cenderung asam/kurang manis)"
    : statusLabel === "Over"
      ? "indikasi over-extracted (cenderung pahit/kering)"
      : "masuk rentang ekstraksi ideal";

  return {
    extractionIndex,
    eyPercent: Number(eyPercent.toFixed(1)),
    tdsPercent: Number(tdsPercent.toFixed(2)),
    statusLabel,
    eyRangeLabel: `${target.eyRange[0]}-${target.eyRange[1]}%`,
    tdsRangeLabel: `${target.tdsRange[0]}-${target.tdsRange[1]}%`,
    note
  };
}

function computeFlavorProfile({ coffeeType, brewTool, values, blendRatio }) {
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
    const robustaFactor = blendRatio.robusta / 100;
    const arabicaFactor = blendRatio.arabica / 100;
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
  }

  const temp = Number(values.waterTemp);
  if (Number.isFinite(temp)) {
    const delta = temp - 92;
    profile.body += delta * 0.08;
    profile.acidity -= delta * 0.05;
    profile.sweetness -= Math.max(0, delta) * 0.04;
    profile.bitterness += Math.max(0, delta) * 0.08;
    profile.aroma += Math.max(0, 93 - temp) * 0.04;
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

function setupCanvasContext(canvas) {
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
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  return { ctx, width, height };
}

function drawFlavorRadar(profile) {
  const bundle = setupCanvasContext(flavorRadarCanvasEl);
  if (!bundle) {
    return;
  }

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
    const value = profile[metric.key] / 10;
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
  ctx.fillStyle = "rgba(74, 127, 107, 0.24)";
  ctx.strokeStyle = "rgba(74, 127, 107, 0.88)";
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

function renderFlavorMetricGrid(profile) {
  if (!flavorMetricGridEl) {
    return;
  }

  flavorMetricGridEl.innerHTML = flavorMetrics
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

function renderFlavorVisual(profile) {
  if (!flavorVisualEl) {
    return;
  }

  lastFlavorProfile = profile;
  setFlavorVisualVisibility(true);
  drawFlavorRadar(profile);
  renderFlavorMetricGrid(profile);
}

window.addEventListener("resize", () => {
  if (!lastFlavorProfile || !flavorVisualEl || flavorVisualEl.classList.contains("is-hidden")) {
    return;
  }
  renderFlavorVisual(lastFlavorProfile);
});

function cubicBezierPoint(t, p0, p1, p2, p3) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  return {
    x: mt2 * mt * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t2 * t * p3.x,
    y: mt2 * mt * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t2 * t * p3.y
  };
}

function cubicBezierDerivative(t, p0, p1, p2, p3) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const t2 = t * t;
  return {
    x: 3 * mt2 * (p1.x - p0.x) + 6 * mt * t * (p2.x - p1.x) + 3 * t2 * (p3.x - p2.x),
    y: 3 * mt2 * (p1.y - p0.y) + 6 * mt * t * (p2.y - p1.y) + 3 * t2 * (p3.y - p2.y)
  };
}

class CoffeeSpillBackground {
  constructor(canvas, animated) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.animated = animated;
    this.time = 0;
    this.lastTime = 0;
    this.raf = null;
    this.dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    this.droplets = [];
    this.path = null;
    this.streamWidth = 0;
    this.puddle = null;

    this.frame = this.frame.bind(this);
    this.resize = this.resize.bind(this);

    this.resize();
    this.seedDroplets();
    window.addEventListener("resize", this.resize, { passive: true });
  }

  setAnimated(animated) {
    this.animated = animated;
    if (this.animated) {
      if (!this.raf) {
        this.lastTime = performance.now();
        this.raf = requestAnimationFrame(this.frame);
      }
      return;
    }

    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
    this.draw(0);
  }

  start() {
    if (this.animated) {
      this.lastTime = performance.now();
      this.raf = requestAnimationFrame(this.frame);
      return;
    }
    this.draw(0);
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = Math.round(width * this.dpr);
    this.canvas.height = Math.round(height * this.dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.width = width;
    this.height = height;
    this.streamWidth = Math.max(56, Math.min(width, height) * 0.16);
    this.path = {
      p0: { x: width * 1.08, y: -height * 0.1 },
      p1: { x: width * 0.92, y: height * 0.14 },
      p2: { x: width * 0.45, y: height * 0.56 },
      p3: { x: -width * 0.08, y: height * 1.06 }
    };
    this.puddle = {
      x: width * 0.1,
      y: height * 0.9,
      rx: width * 0.24,
      ry: height * 0.12
    };

    this.seedDroplets();
    this.draw(0);
  }

  seedDroplets() {
    const count = this.width < 640 ? 56 : this.width < 1024 ? 82 : 110;
    if (this.droplets.length === count) {
      return;
    }
    this.droplets = Array.from({ length: count }, (_, index) => {
      const seed = (index / count) * Math.PI * 2;
      return this.createDroplet(Math.random(), seed);
    });
  }

  createDroplet(initialT, seed) {
    return {
      t: initialT,
      speed: 0.12 + Math.random() * 0.24,
      size: 1.2 + Math.random() * 3.5,
      lateral: (Math.random() - 0.5) * 1.6,
      seed,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0
    };
  }

  samplePath(t, phase) {
    const point = cubicBezierPoint(t, this.path.p0, this.path.p1, this.path.p2, this.path.p3);
    const derivative = cubicBezierDerivative(t, this.path.p0, this.path.p1, this.path.p2, this.path.p3);
    const length = Math.hypot(derivative.x, derivative.y) || 1;
    const tx = derivative.x / length;
    const ty = derivative.y / length;
    const nx = -ty;
    const ny = tx;
    const taper = Math.pow(1 - t, 0.42);
    const wobble = Math.sin(t * 15 - this.time * 2.1 + phase) * this.streamWidth * 0.045 * taper;

    return {
      x: point.x + nx * wobble,
      y: point.y + ny * wobble,
      tx,
      ty,
      nx,
      ny
    };
  }

  drawPathLayer(widthScale, phase, opacity) {
    const ctx = this.ctx;
    const steps = 140;

    ctx.beginPath();
    for (let index = 0; index <= steps; index += 1) {
      const t = index / steps;
      const point = this.samplePath(t, phase);
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }

    const gradient = ctx.createLinearGradient(this.width, 0, 0, this.height);
    gradient.addColorStop(0, `rgba(58, 30, 16, ${0.68 * opacity})`);
    gradient.addColorStop(0.35, `rgba(86, 45, 24, ${0.62 * opacity})`);
    gradient.addColorStop(0.72, `rgba(110, 62, 33, ${0.56 * opacity})`);
    gradient.addColorStop(1, `rgba(72, 37, 20, ${0.54 * opacity})`);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = this.streamWidth * widthScale;
    ctx.strokeStyle = gradient;
    ctx.shadowColor = `rgba(46, 23, 11, ${0.25 * opacity})`;
    ctx.shadowBlur = 26;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  drawHighlights() {
    const ctx = this.ctx;
    const steps = 110;

    ctx.beginPath();
    for (let index = 0; index <= steps; index += 1) {
      const t = index / steps;
      const point = this.samplePath(t, 2.6);
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = this.streamWidth * 0.12;
    ctx.strokeStyle = "rgba(245, 210, 166, 0.23)";
    ctx.stroke();
  }

  drawPuddle() {
    const ctx = this.ctx;
    const { x, y, rx, ry } = this.puddle;

    const gradient = ctx.createRadialGradient(x * 0.93, y * 0.96, 14, x, y, rx * 1.1);
    gradient.addColorStop(0, "rgba(120, 72, 44, 0.42)");
    gradient.addColorStop(0.4, "rgba(94, 53, 30, 0.34)");
    gradient.addColorStop(1, "rgba(63, 33, 18, 0)");

    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, -0.28, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    for (let ripple = 0; ripple < 4; ripple += 1) {
      const progress = (this.time * 0.22 + ripple * 0.26) % 1;
      const alpha = (1 - progress) * 0.16;

      ctx.beginPath();
      ctx.ellipse(
        x + progress * 22,
        y + progress * 8,
        rx * (0.55 + progress * 0.65),
        ry * (0.5 + progress * 0.62),
        -0.28,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `rgba(176, 122, 88, ${alpha})`;
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }
  }

  updateDroplets(deltaTime) {
    for (const droplet of this.droplets) {
      droplet.t += droplet.speed * deltaTime;

      if (droplet.t > 1.15) {
        Object.assign(droplet, this.createDroplet(Math.random() * 0.03, droplet.seed + Math.random()));
      }

      if (droplet.t <= 1) {
        const sample = this.samplePath(Math.max(0, droplet.t), droplet.seed);
        const spread = (1 - droplet.t) * 0.34 + 0.12;
        droplet.x = sample.x + sample.nx * droplet.lateral * this.streamWidth * spread;
        droplet.y = sample.y + sample.ny * droplet.lateral * this.streamWidth * spread;
        droplet.vx = sample.tx * this.width * (0.1 + droplet.speed * 0.15);
        droplet.vy = sample.ty * this.height * (0.1 + droplet.speed * 0.12);
      } else {
        droplet.x += droplet.vx * deltaTime;
        droplet.y += droplet.vy * deltaTime;
        droplet.vy += this.height * 0.18 * deltaTime;
      }
    }
  }

  drawDroplets() {
    const ctx = this.ctx;
    for (const droplet of this.droplets) {
      const alpha = droplet.t <= 1 ? 0.22 : 0.16;
      const radius = droplet.size * (droplet.t <= 1 ? 1 : 0.8);

      const gradient = ctx.createRadialGradient(droplet.x - radius * 0.25, droplet.y - radius * 0.3, 0, droplet.x, droplet.y, radius * 1.8);
      gradient.addColorStop(0, `rgba(191, 136, 97, ${alpha + 0.1})`);
      gradient.addColorStop(1, `rgba(92, 49, 27, ${alpha})`);

      ctx.beginPath();
      ctx.arc(droplet.x, droplet.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  draw(deltaTime) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    this.drawPuddle();
    this.drawPathLayer(1, 0, 1);
    this.drawPathLayer(0.76, 1.8, 0.84);
    this.drawPathLayer(0.44, 3.1, 0.7);
    this.drawHighlights();

    if (this.animated) {
      this.updateDroplets(deltaTime);
      this.drawDroplets();
    }
  }

  frame(timestamp) {
    if (!this.lastTime) {
      this.lastTime = timestamp;
    }

    const deltaTime = Math.min((timestamp - this.lastTime) / 1000, 0.033);
    this.lastTime = timestamp;
    this.time += deltaTime;

    this.draw(deltaTime);
    this.raf = requestAnimationFrame(this.frame);
  }
}

function setupCoffeeSpillBackground() {
  const canvas = document.getElementById("spillCanvas");
  if (!canvas || !canvas.getContext) {
    return;
  }

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const spillBackground = new CoffeeSpillBackground(canvas, !reducedMotionQuery.matches);
  spillBackground.start();

  const handleMotionPreference = event => {
    spillBackground.setAnimated(!event.matches);
  };

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", handleMotionPreference);
  } else if (typeof reducedMotionQuery.addListener === "function") {
    reducedMotionQuery.addListener(handleMotionPreference);
  }
}

function renderToolFields(toolId) {
  const toolConfig = toolConfigs[toolId];
  if (!toolConfig) {
    toolFieldsEl.innerHTML = "";
    toolFieldsEl.classList.remove("is-switching");
    return;
  }

  const activeFields = getActiveFields(toolConfig);

  toolFieldsEl.innerHTML = activeFields.map((field, index) => {
    const stored = fieldState[field.id];
    const value = stored !== undefined ? stored : field.default;
    if (field.type === "select") {
      const optionsHtml = field.options
        .map(option => {
          const selected = option.value === String(value) ? " selected" : "";
          return `<option value="${option.value}"${selected}>${option.label}</option>`;
        })
        .join("");
      return `
        <div class="tool-field" style="--field-index:${index}">
          <label for="${field.id}">${field.label}</label>
          <select id="${field.id}">${optionsHtml}</select>
        </div>
      `;
    }
    const safeValue = value !== undefined ? value : "";
    return `
      <div class="tool-field" style="--field-index:${index}">
        <label for="${field.id}">${field.label}</label>
        <input id="${field.id}" type="number" min="${field.min}" max="${field.max}" step="${field.step || 1}" value="${safeValue}" />
      </div>
    `;
  }).join("");

  replayClass(toolFieldsEl, "is-switching");
  applyHoverHelpToFormLabels();
}

const brewTimerState = {
  stepMeta: [],
  completed: new Set(),
  activeIndex: -1,
  remainingSeconds: 0,
  intervalId: null,
  toastTimeoutId: null
};

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

function formatTimerClock(totalSeconds) {
  if (!Number.isFinite(totalSeconds)) {
    return "--:--";
  }

  const safe = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function clearActiveStageTimer() {
  if (brewTimerState.intervalId) {
    clearInterval(brewTimerState.intervalId);
    brewTimerState.intervalId = null;
  }
}

function resetRecipeTimerState() {
  clearActiveStageTimer();
  if (brewTimerState.toastTimeoutId) {
    clearTimeout(brewTimerState.toastTimeoutId);
    brewTimerState.toastTimeoutId = null;
  }
  brewTimerState.stepMeta = [];
  brewTimerState.completed = new Set();
  brewTimerState.activeIndex = -1;
  brewTimerState.remainingSeconds = 0;
}

function getTimedStepMeta() {
  return brewTimerState.stepMeta.filter(step => step.durationSec > 0);
}

function getNextPendingStepIndex() {
  for (const step of brewTimerState.stepMeta) {
    if (step.durationSec <= 0) {
      continue;
    }
    if (!brewTimerState.completed.has(step.index) && step.index !== brewTimerState.activeIndex) {
      return step.index;
    }
  }
  return -1;
}

function getProgressPercent() {
  const timedSteps = getTimedStepMeta();
  if (timedSteps.length === 0) {
    return 0;
  }

  let progressUnits = 0;
  timedSteps.forEach(step => {
    if (brewTimerState.completed.has(step.index)) {
      progressUnits += 1;
      return;
    }
    if (step.index === brewTimerState.activeIndex && step.durationSec > 0) {
      const elapsed = step.durationSec - brewTimerState.remainingSeconds;
      progressUnits += Math.max(0, Math.min(1, elapsed / step.durationSec));
    }
  });

  return Math.max(0, Math.min(100, (progressUnits / timedSteps.length) * 100));
}

function showStageToast(message) {
  const toastEl = document.getElementById("brewStageToast");
  if (!toastEl) {
    return;
  }

  toastEl.textContent = message;
  toastEl.classList.add("is-visible");

  if (brewTimerState.toastTimeoutId) {
    clearTimeout(brewTimerState.toastTimeoutId);
  }

  brewTimerState.toastTimeoutId = setTimeout(() => {
    toastEl.classList.remove("is-visible");
  }, 1800);
}

function updateStageCardClasses() {
  const cards = recipeEl.querySelectorAll(".step[data-step-index]");
  const nextIndex = brewTimerState.activeIndex === -1 ? getNextPendingStepIndex() : -1;

  cards.forEach(card => {
    const index = Number(card.dataset.stepIndex);
    card.classList.toggle("is-active", index === brewTimerState.activeIndex);
    card.classList.toggle("is-complete", brewTimerState.completed.has(index));
    card.classList.toggle("is-next", index === nextIndex);
  });
}

function getVisibleTimerStepIndex() {
  if (brewTimerState.activeIndex >= 0) {
    return brewTimerState.activeIndex;
  }

  return getNextPendingStepIndex();
}

function updateStepControls() {
  const visibleIndex = getVisibleTimerStepIndex();

  brewTimerState.stepMeta.forEach(step => {
    const card = recipeEl.querySelector(`.step[data-step-index="${step.index}"]`);
    if (!card) {
      return;
    }

    const controls = card.querySelector(".step-timer-controls");
    const passive = card.querySelector(".step-timer-passive");
    const shouldShowTimedControls = step.durationSec > 0 && step.index === visibleIndex;

    if (controls) {
      controls.hidden = !shouldShowTimedControls;
    }

    if (passive) {
      passive.hidden = step.durationSec > 0;
    }

    if (step.durationSec <= 0 || !shouldShowTimedControls) {
      return;
    }

    const btn = card.querySelector(`.step-start-btn[data-step-index="${step.index}"]`);
    const display = card.querySelector(`#stepTimerDisplay-${step.index}`);
    if (!btn || !display) {
      return;
    }

    if (brewTimerState.activeIndex === step.index) {
      btn.textContent = "Stop";
      btn.dataset.state = "running";
      display.textContent = formatTimerClock(brewTimerState.remainingSeconds);
      return;
    }

    if (brewTimerState.completed.has(step.index)) {
      btn.textContent = "Ulangi";
      btn.dataset.state = "done";
      display.textContent = "Selesai";
      return;
    }

    btn.textContent = "Start";
    btn.dataset.state = "idle";
    display.textContent = formatTimerClock(step.durationSec);
  });
}

function updateTimerProgressUI() {
  const barFillEl = document.getElementById("brewTimerBarFill");
  const ringEl = document.getElementById("brewTimerRing");
  const percentEl = document.getElementById("brewTimerPercent");
  const statusEl = document.getElementById("brewTimerStatus");

  if (!barFillEl || !ringEl || !percentEl || !statusEl) {
    return;
  }

  const percent = getProgressPercent();
  const roundedPercent = Math.round(percent);

  barFillEl.style.width = `${percent}%`;
  ringEl.style.setProperty("--brew-progress", `${percent * 3.6}deg`);
  percentEl.textContent = `${roundedPercent}%`;

  if (brewTimerState.activeIndex >= 0) {
    const activeStep = brewTimerState.stepMeta.find(step => step.index === brewTimerState.activeIndex);
    statusEl.textContent = activeStep
      ? `${activeStep.title} berjalan - sisa ${formatTimerClock(brewTimerState.remainingSeconds)}`
      : "Tahap berjalan.";
    return;
  }

  const timedSteps = getTimedStepMeta();
  if (timedSteps.length > 0 && brewTimerState.completed.size >= timedSteps.length) {
    statusEl.textContent = "Semua tahap selesai. Brew siap dinikmati.";
    return;
  }

  const nextIndex = getNextPendingStepIndex();
  if (nextIndex >= 0) {
    const nextStep = brewTimerState.stepMeta.find(step => step.index === nextIndex);
    statusEl.textContent = nextStep
      ? `Siap lanjut ke ${nextStep.title}. Tekan Start saat siap.`
      : "Pilih tahap dan tekan Start.";
    return;
  }

  statusEl.textContent = "Pilih tahap dan tekan Start saat siap brewing.";
}

function completeStage(index) {
  clearActiveStageTimer();
  brewTimerState.activeIndex = -1;
  brewTimerState.remainingSeconds = 0;
  brewTimerState.completed.add(index);

  const step = brewTimerState.stepMeta.find(item => item.index === index);
  if (step) {
    showStageToast(`Tahap selesai: ${step.title}`);
  }

  const nextIndex = getNextPendingStepIndex();
  if (nextIndex >= 0) {
    const nextStep = brewTimerState.stepMeta.find(item => item.index === nextIndex);
    if (nextStep) {
      showStageToast(`Lanjut ke ${nextStep.title}. Tekan Start saat siap.`);
    }
  }

  updateStageCardClasses();
  updateStepControls();
  updateTimerProgressUI();
}

function startStageTimer(index) {
  const step = brewTimerState.stepMeta.find(item => item.index === index);
  if (!step || step.durationSec <= 0) {
    return;
  }

  if (brewTimerState.activeIndex === index) {
    clearActiveStageTimer();
    brewTimerState.activeIndex = -1;
    brewTimerState.remainingSeconds = 0;
    showStageToast("Timer dihentikan.");
    updateStageCardClasses();
    updateStepControls();
    updateTimerProgressUI();
    return;
  }

  clearActiveStageTimer();
  brewTimerState.completed.delete(index);
  brewTimerState.activeIndex = index;
  brewTimerState.remainingSeconds = step.durationSec;
  showStageToast(`Mulai: ${step.title}`);

  updateStageCardClasses();
  updateStepControls();
  updateTimerProgressUI();

  brewTimerState.intervalId = setInterval(() => {
    brewTimerState.remainingSeconds = Math.max(0, brewTimerState.remainingSeconds - 1);
    updateStepControls();
    updateTimerProgressUI();

    if (brewTimerState.remainingSeconds <= 0) {
      completeStage(index);
    }
  }, 1000);
}

function renderRecipeWithTimers(steps) {
  resetRecipeTimerState();

  const stepMeta = steps.map((step, index) => ({
    index,
    title: step.title,
    durationSec: Number.isFinite(step.durationSec) && step.durationSec > 0 ? Math.round(step.durationSec) : 0
  }));
  brewTimerState.stepMeta = stepMeta;

  const hasTimedStep = stepMeta.some(step => step.durationSec > 0);

  const timerPanelHtml = hasTimedStep
    ? `
      <div class="brew-timer-panel" id="brewTimerPanel">
        <div class="brew-timer-head">
          <div>
            <h4>Brew Timer Bertahap</h4>
            <p id="brewTimerStatus">Pilih tahap dan tekan Start saat siap brewing.</p>
          </div>
          <div class="brew-timer-ring" id="brewTimerRing" style="--brew-progress:0deg">
            <span id="brewTimerPercent">0%</span>
          </div>
        </div>
        <div class="brew-timer-bar"><span id="brewTimerBarFill"></span></div>
      </div>
    `
    : "";

  const stepsHtml = steps
    .map((step, index) => {
      const duration = stepMeta[index].durationSec;
      const timerControlHtml = duration > 0
        ? `
          <div class="step-timer-controls">
            <span class="step-duration">${formatTimerClock(duration)}</span>
            <span class="step-timer-display" id="stepTimerDisplay-${index}">${formatTimerClock(duration)}</span>
            <button type="button" class="step-start-btn" data-step-index="${index}" data-state="idle">Start</button>
          </div>
        `
        : `<span class="step-timer-passive">Tanpa timer</span>`;

      return `
        <div class="step" style="--step-index:${index}" data-step-index="${index}">
          <div class="step-head">
            <h4>${step.title}</h4>
            ${timerControlHtml}
          </div>
          <p>${step.desc}</p>
        </div>
      `;
    })
    .join("");

  const toastHtml = hasTimedStep
    ? '<div class="brew-stage-toast" id="brewStageToast" role="status" aria-live="polite"></div>'
    : "";

  recipeEl.innerHTML = `${timerPanelHtml}${stepsHtml}${toastHtml}`;
  updateStageCardClasses();
  updateStepControls();
  updateTimerProgressUI();
}

recipeEl.addEventListener("click", event => {
  const startBtn = event.target.closest(".step-start-btn");
  if (!startBtn) {
    return;
  }

  const index = Number(startBtn.dataset.stepIndex);
  if (!Number.isFinite(index)) {
    return;
  }

  startStageTimer(index);
});

function buildRecipe(options = {}) {
  const { animateCup = false } = options;
  const coffeeType = document.getElementById("coffeeType").value;
  const brewTool = document.getElementById("brewTool").value;
  updateProgressiveVisibility();

  if (!hasBaseSelection()) {
    recipeEl.innerHTML = "";
    resetCupFillIndicator();
    setFlavorVisualVisibility(false);
    setTuningAssistantVisibility(false);
    lastFlavorProfile = null;
    lastTuningContext = null;
    resetStats();
    return;
  }

  const toolConfig = toolConfigs[brewTool];
  if (!toolConfig) {
    recipeEl.innerHTML = "";
    resetCupFillIndicator();
    setFlavorVisualVisibility(false);
    setTuningAssistantVisibility(false);
    lastFlavorProfile = null;
    lastTuningContext = null;
    return;
  }

  const activeFields = getActiveFields(toolConfig);
  const values = {};
  activeFields.forEach(field => {
    const value = getFieldValue(field, field.default);
    values[field.id] = value;
    fieldState[field.id] = value;
  });

  const manualOverrides = getManualBrewOverrides();
  const doseValue = manualOverrides.dose ?? values.dose;
  const waterTempValue = manualOverrides.waterTemp ?? values.waterTemp;
  let ratioCheckWater = NaN;
  const extractionEstimate = computeExtractionEstimate({
    brewTool,
    values,
    dose: doseValue
  });

  const coffeeLabel = resolveCoffeeLabel(coffeeType);
  const blendRatio = coffeeType === "blend" ? getBlendRatio() : null;
  const finalFlavorProfile = computeFlavorProfile({
    coffeeType,
    brewTool,
    values,
    blendRatio
  });
  const brewToolLabel = document.getElementById("brewTool")?.selectedOptions?.[0]?.textContent?.trim() || brewTool;
  const recipeTitle = resolveRecipeTitle(coffeeLabel, brewToolLabel);

  const processField = activeFields.find(field => field.id === "processMethod");
  const varietalField = activeFields.find(field => field.id === "varietal");
  const processLabel = optionLabel(processField, values.processMethod);
  const varietalLabel = optionLabel(varietalField, values.varietal);

  const coffeeFlavor = coffeeFlavorProfiles[coffeeType] || coffeeFlavorProfiles.custom;
  const processFlavor = processFlavorProfiles[values.processMethod] || processFlavorProfiles.washed;
  const varietalFlavor = varietalFlavorProfiles[values.varietal] || varietalFlavorProfiles.typica;
  const brewFlavor = brewFlavorEffects[brewTool] || "";
  const roastFlavor = values.roastLevel ? roastFlavorEffects[values.roastLevel] : "";
  const mineralFlavor = values.waterHardness ? mineralFlavorEffects[values.waterHardness] : "";
  const agitationFlavor = values.agitation ? agitationFlavorEffects[values.agitation] : "";

  let blendFlavor = "";
  if (blendRatio) {
    if (blendRatio.robusta >= 60) {
      blendFlavor = "Komposisi blend dominan robusta, sehingga body dan bitterness cenderung lebih menonjol.";
    } else if (blendRatio.arabica >= 60) {
      blendFlavor = "Komposisi blend dominan arabika, sehingga aroma dan acidity lebih ekspresif.";
    } else {
      blendFlavor = "Komposisi blend seimbang, menahan body tetap tebal sambil menjaga aromatik tetap kompleks.";
    }
  }

  resetStats();
  showStat("coffee", coffeeLabel);
  if (values.processMethod) {
    showStat("process", processLabel);
  }
  if (values.varietal) {
    showStat("varietal", varietalLabel);
  }
  if (values.grind) {
    const grindField = activeFields.find(field => field.id === "grind");
    showStat("grind", optionLabel(grindField, values.grind));
  }
  if (values.roastLevel) {
    const roastField = activeFields.find(field => field.id === "roastLevel");
    showStat("roast", optionLabel(roastField, values.roastLevel));
  }
  if (waterTempValue) {
    showStat("temp", `${waterTempValue}°C`);
  }
  if (values.waterHardness) {
    const mineralField = activeFields.find(field => field.id === "waterHardness");
    showStat("mineral", optionLabel(mineralField, values.waterHardness));
  }
  if (values.agitation) {
    const agitationField = activeFields.find(field => field.id === "agitation");
    showStat("agitation", optionLabel(agitationField, values.agitation));
  }
  showStat("extractionIndex", `${extractionEstimate.extractionIndex}/100`);
  showStat("ey", `${extractionEstimate.eyPercent}% (target ${extractionEstimate.eyRangeLabel})`);
  showStat("tds", `${extractionEstimate.tdsPercent}% (target ${extractionEstimate.tdsRangeLabel})`);
  showStat("extractionStatus", extractionEstimate.statusLabel);

  const steps = [];

  if (blendRatio) {
    steps.push({
      title: "Blend ratio",
      desc: `Komposisi blend: Robusta ${blendRatio.robusta}% / Arabica ${blendRatio.arabica}%.`,
      durationSec: 20
    });
  }

  if (["v60", "kalita", "chemex"].includes(brewTool)) {
    const totalWater = manualOverrides.water ?? doseValue * Number(values.ratio);
    const bloomWater = doseValue * 3;
    ratioCheckWater = totalWater;
    const remainingWater = Math.max(totalWater - bloomWater, 0);
    const firstPour = remainingWater * 0.5;
    const secondPour = remainingWater - firstPour;

    showStat("time", values.targetTime);
    showStat("totalWater", formatMl(totalWater));
    showStat("bloomWater", formatMl(bloomWater));
    showStat("firstPour", formatMl(firstPour));
    showStat("secondPour", formatMl(secondPour));

    steps.push(
      {
        title: "Persiapan",
        desc: `Gunakan ${doseValue}g kopi (${coffeeLabel}), gilingan ${values.grind}, roast ${values.roastLevel}. Bilas filter, panaskan server, lalu buang airnya.`,
        durationSec: 60
      },
      {
        title: "Blooming",
        desc: `Tuang ${formatMl(bloomWater)} air panas (${waterTempValue}°C). Aduk ringan, diamkan 35-45 detik.`,
        durationSec: 45
      },
      {
        title: "Tuangan pertama",
        desc: `Tuang ${formatMl(firstPour)} secara perlahan. Jaga aliran stabil selama 30-40 detik.`,
        durationSec: 40
      },
      {
        title: "Tuangan kedua",
        desc: `Tuang sisa ${formatMl(secondPour)} sampai total air panas habis. Target total waktu ${values.targetTime}.`,
        durationSec: Math.max(30, parseClockToSeconds(values.targetTime) || 90)
      },
      {
        title: "Serve dingin",
        desc: "Tuang hasil seduhan ke gelas berisi es batu besar agar tetap clean tanpa over-dilution.",
        durationSec: 20
      }
    );
  }

  if (brewTool === "aeropress") {
    const totalWater = manualOverrides.water ?? doseValue * Number(values.ratio);
    ratioCheckWater = totalWater;

    showStat("steepTime", values.steepTime);
    showStat("totalWater", formatMl(totalWater));

    steps.push(
      {
        title: "Persiapan",
        desc: `Gunakan ${doseValue}g kopi (${coffeeLabel}), gilingan ${values.grind}, roast ${values.roastLevel}. Bilas filter dan preheat chamber.`,
        durationSec: 45
      },
      {
        title: "Seduh",
        desc: `Tuang ${formatMl(totalWater)} air panas (${waterTempValue}°C). Aduk 10 detik, diamkan ${values.steepTime}.`,
        durationSec: Math.max(20, parseClockToSeconds(values.steepTime) || 90)
      },
      {
        title: "Press",
        desc: `Tekan perlahan selama ${values.pressTime} hingga kopi keluar merata.`,
        durationSec: Math.max(15, parseClockToSeconds(values.pressTime) || 30)
      },
      {
        title: "Serve dingin",
        desc: "Sajikan langsung di atas es batu besar untuk karakter yang tetap bright.",
        durationSec: 20
      }
    );
  }

  if (brewTool === "frenchpress") {
    const totalWater = manualOverrides.water ?? doseValue * Number(values.ratio);
    ratioCheckWater = totalWater;

    showStat("steepTime", values.steepTime);
    showStat("totalWater", formatMl(totalWater));

    steps.push(
      {
        title: "Persiapan",
        desc: `Gunakan ${doseValue}g kopi (${coffeeLabel}), gilingan ${values.grind}, roast ${values.roastLevel}. Panaskan french press.`,
        durationSec: 45
      },
      {
        title: "Seduh",
        desc: `Tuang ${formatMl(totalWater)} air panas (${waterTempValue}°C). Aduk 2-3 kali, diamkan ${values.steepTime}.`,
        durationSec: Math.max(30, parseClockToSeconds(values.steepTime) || 240)
      },
      {
        title: "Plunge",
        desc: "Tekan plunger perlahan hingga dasar, lalu tuang kopi ke server.",
        durationSec: 30
      },
      {
        title: "Serve dingin",
        desc: "Tuang ke gelas berisi es batu agar body tetap tebal namun tetap segar.",
        durationSec: 20
      }
    );
  }

  if (brewTool === "syphon") {
    const totalWater = manualOverrides.water ?? doseValue * Number(values.ratio);
    ratioCheckWater = totalWater;

    showStat("time", values.brewTime);
    showStat("drawdownTime", values.drawdownTime);
    showStat("totalWater", formatMl(totalWater));

    steps.push(
      {
        title: "Persiapan",
        desc: `Gunakan ${doseValue}g kopi (${coffeeLabel}), gilingan ${values.grind}, roast ${values.roastLevel}. Panaskan ${formatMl(totalWater)} air (${waterTempValue}°C) di lower chamber.`,
        durationSec: 60
      },
      {
        title: "Ekstraksi",
        desc: `Saat air naik, masukkan kopi dan aduk ringan. Seduh selama ${values.brewTime} dengan api stabil.`,
        durationSec: Math.max(30, parseClockToSeconds(values.brewTime) || 90)
      },
      {
        title: "Drawdown",
        desc: `Matikan api, biarkan kopi turun selama ${values.drawdownTime}.`,
        durationSec: Math.max(20, parseClockToSeconds(values.drawdownTime) || 45)
      },
      {
        title: "Serve dingin",
        desc: "Sajikan di atas es batu besar untuk menjaga clarity dan aroma.",
        durationSec: 20
      }
    );
  }

  if (brewTool === "espresso") {
    const yieldAmount = manualOverrides.water ?? doseValue * Number(values.brewRatio);
    ratioCheckWater = yieldAmount;

    showStat("brewRatio", `1:${values.brewRatio} (g:g)`);
    showStat("shotTime", `${values.shotTime} detik`);
    showStat("pressure", `${values.pressure} bar`);

    steps.push(
      {
        title: "Persiapan",
        desc: `Gunakan ${doseValue}g kopi (${coffeeLabel}), gilingan ${values.grind}, roast ${values.roastLevel}. Distribusi dan tamping merata.`,
        durationSec: 45
      },
      {
        title: "Extraction",
        desc: `Seduh pada ${values.pressure} bar, ${waterTempValue}°C selama ${values.shotTime} detik. Target yield ${formatMl(yieldAmount)}.`,
        durationSec: Math.max(15, Number(values.shotTime) || 28)
      },
      {
        title: "Iced finish",
        desc: "Tarik shot langsung ke gelas berisi es batu besar untuk menjaga crema dan rasa manis alami.",
        durationSec: 20
      }
    );
  }

  if (brewTool === "mokapot") {
    const totalWater = manualOverrides.water ?? doseValue * Number(values.ratio);
    ratioCheckWater = totalWater;

    showStat("totalWater", formatMl(totalWater));

    steps.push(
      {
        title: "Persiapan",
        desc: `Gunakan ${doseValue}g kopi (${coffeeLabel}), gilingan ${values.grind}, roast ${values.roastLevel}.`,
        durationSec: 45
      },
      {
        title: "Brew",
        desc: `Isi base dengan ${formatMl(totalWater)} air (${waterTempValue}°C). Pasang basket tanpa menekan, seduh dengan api kecil hingga warna mulai menguning.`,
        durationSec: 120
      },
      {
        title: "Serve dingin",
        desc: "Tuang hasil moka pot ke gelas berisi es batu besar, aduk sekali sebelum diminum.",
        durationSec: 20
      }
    );
  }

  if (brewTool === "coldBrew") {
    const totalWater = manualOverrides.water ?? doseValue * Number(values.ratio);
    ratioCheckWater = totalWater;
    const serveDilution = totalWater * (Number(values.icePercent) / 100);

    showStat("steepTime", `${values.steepTimeCold} jam`);
    showStat("totalWater", formatMl(totalWater));
    showStat("iceWater", formatMl(serveDilution));

    steps.push(
      {
        title: "Persiapan",
        desc: `Gunakan ${doseValue}g kopi (${coffeeLabel}), gilingan ${values.grind}, roast ${values.roastLevel}.`,
        durationSec: 60
      },
      {
        title: "Immersion",
        desc: `Campur kopi dengan ${formatMl(totalWater)} air suhu ruang di wadah tertutup, aduk 10-15 detik.`,
        durationSec: 20
      },
      {
        title: "Perendaman",
        desc: `Simpan selama ${values.steepTimeCold} jam di chiller atau suhu ruang sejuk.`,
        durationSec: Math.max(60, (Number(values.steepTimeCold) || 16) * 3600)
      },
      {
        title: "Filtrasi",
        desc: "Saring dua tahap (saringan kasar lalu paper filter) sampai hasil clean.",
        durationSec: 120
      },
      {
        title: "Serving",
        desc: `Saat disajikan, tambahkan sekitar ${formatMl(serveDilution)} air dingin/es sesuai kekuatan rasa yang diinginkan.`,
        durationSec: 30
      }
    );
  }

  if (brewTool === "coldDrip") {
    const totalWater = manualOverrides.water ?? doseValue * Number(values.ratio);
    ratioCheckWater = totalWater;

    showStat("totalWater", formatMl(totalWater));
    showStat("dripRate", `${values.dripRate} tetes/detik`);
    showStat("dripTime", `${values.dripTime} jam`);

    steps.push(
      {
        title: "Persiapan",
        desc: `Gunakan ${doseValue}g kopi (${coffeeLabel}), gilingan ${values.grind}, roast ${values.roastLevel}.`,
        durationSec: 60
      },
      {
        title: "Drip setup",
        desc: `Masukkan ${formatMl(totalWater)} air dingin ke upper chamber. Atur laju tetes ${values.dripRate} tetes/detik.`,
        durationSec: 90
      },
      {
        title: "Ekstraksi",
        desc: `Biarkan menetes selama ${values.dripTime} jam sampai kopi terkumpul di server.`,
        durationSec: Math.max(60, (Number(values.dripTime) || 3) * 3600)
      },
      {
        title: "Serve",
        desc: "Sajikan langsung dengan es batu besar untuk rasa clean.",
        durationSec: 30
      }
    );
  }

  const flavorNarrative = [
    `Karakter dasar ${coffeeLabel}: ${coffeeFlavor}.`,
    tasteNotes[coffeeType],
    `Proses ${processLabel}: ${processFlavor}.`,
    `Varietas ${varietalLabel}: ${varietalFlavor}.`,
    brewFlavor,
    toolNotes[brewTool],
    roastFlavor,
    mineralFlavor,
    agitationFlavor,
    blendFlavor
  ]
    .filter(Boolean)
    .map(line => `- ${line}`)
    .join("\n");

  steps.push({
    title: "Catatan rasa",
    desc: flavorNarrative
  });

  const ratioWarningMessage = getRatioWarningMessage(doseValue, ratioCheckWater, brewTool);
  if (ratioWarningEl) {
    if (ratioWarningMessage) {
      ratioWarningEl.textContent = ratioWarningMessage;
      ratioWarningEl.classList.remove("is-hidden");
    } else {
      ratioWarningEl.textContent = "";
      ratioWarningEl.classList.add("is-hidden");
    }
  }

  renderRecipeWithTimers(steps);
  renderFlavorVisual(finalFlavorProfile);

  lastTuningContext = {
    values,
    profile: finalFlavorProfile,
    brewTool,
    activeFields
  };
  setTuningAssistantVisibility(true);
  renderTuningAssistant(tasteIssueEl?.value || "too-bitter");

  const recipeSnapshot = {
    title: recipeTitle,
    coffeeType,
    coffeeLabel,
    brewTool,
    brewToolLabel,
    recipeName: document.getElementById("recipeName")?.value.trim() || "",
    manualDose: manualOverrides.dose,
    manualWater: manualOverrides.water,
    manualWaterTemp: manualOverrides.waterTemp,
    processLabel,
    varietalLabel,
    settings: {
      ...values,
      dose: doseValue,
      waterTemp: waterTempValue,
      blendRatio: blendRatio ? { robusta: blendRatio.robusta, arabica: blendRatio.arabica } : null
    },
    steps: steps.map(step => ({
      title: step.title,
      desc: step.desc,
      durationSec: Number.isFinite(step.durationSec) ? step.durationSec : null
    })),
    flavorProfile: { ...finalFlavorProfile },
    extractionEstimate,
    flavorNarrative,
    sourcePage: "index",
    generatedAtMs: Date.now()
  };

  window.__brewLatestRecipe = recipeSnapshot;
  window.dispatchEvent(new CustomEvent("brew:recipe-ready", { detail: recipeSnapshot }));

  if (animateCup) {
    playCupFillAnimation();
  }
}

function setManualOverridesExpanded(expanded) {
  if (manualOverridesPanelEl) {
    manualOverridesPanelEl.classList.toggle("is-collapsed", !expanded);
  }

  if (manualToggleBtn) {
    manualToggleBtn.setAttribute("aria-expanded", String(expanded));
    manualToggleBtn.textContent = expanded ? "Sembunyikan kustom manual" : "Tampilkan kustom manual";
  }
}

if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    replayClass(generateBtn, "btn-pulse");
    buildRecipe({ animateCup: true });
  });
}
document.getElementById("coffeeType").addEventListener("change", event => {
  toggleBlendControls(event.target.value);
  toggleCustomControls(event.target.value);
  if (event.target.value === "blend") {
    syncBlendInputs("robusta");
  }
  buildRecipe();
});
blendRobustaEl.addEventListener("input", () => {
  syncBlendInputs("robusta");
  buildRecipe();
});
blendArabicaEl.addEventListener("input", () => {
  syncBlendInputs("arabica");
  buildRecipe();
});
document.getElementById("customCoffee").addEventListener("input", buildRecipe);
document.getElementById("recipeName").addEventListener("input", buildRecipe);
manualDoseEl?.addEventListener("input", buildRecipe);
manualWaterEl?.addEventListener("input", buildRecipe);
manualWaterTempEl?.addEventListener("input", buildRecipe);
document.getElementById("brewTool").addEventListener("change", event => {
  renderToolFields(event.target.value);
  buildRecipe();
});
toolFieldsEl.addEventListener("input", buildRecipe);
toolFieldsEl.addEventListener("change", buildRecipe);
if (runTuningEl) {
  runTuningEl.addEventListener("click", () => {
    replayClass(runTuningEl, "btn-pulse");
    renderTuningAssistant(tasteIssueEl?.value || "too-bitter");
  });
}
if (tasteIssueEl) {
  tasteIssueEl.addEventListener("change", () => {
    renderTuningAssistant(tasteIssueEl.value);
  });
}

if (manualToggleBtn) {
  setManualOverridesExpanded(false);
  manualToggleBtn.addEventListener("click", () => {
    const isExpanded = manualOverridesPanelEl ? !manualOverridesPanelEl.classList.contains("is-collapsed") : false;
    setManualOverridesExpanded(!isExpanded);
  });
}

toggleBlendControls(document.getElementById("coffeeType").value);
toggleCustomControls(document.getElementById("coffeeType").value);
syncBlendInputs("robusta");
renderToolFields(document.getElementById("brewTool").value);
hydrateHoverHelp();
updateProgressiveVisibility();
setupCoffeeSpillBackground();
buildRecipe();
