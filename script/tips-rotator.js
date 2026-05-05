// Tips for the aside section (Bahasa awam yang mudah dipahami)
const TIPS = [
    "Tip: Gunakan es batu ukuran besar supaya tidak cepat cair, jadi rasa kopinya tidak cemplang (hambar).",
    "Tip: Kualitas air itu penting banget. Gunakan air minum yang sudah disaring untuk hasil seduhan terbaik.",
    "Tip: Ukuran gilingan kopi yang seragam bikin rasa kopi lebih seimbang dan nikmat.",
    "Tip: Di awal menyeduh, tuang sedikit air dan diamkan 30-45 detik. Ini membuang gas pada kopi agar rasanya lebih jernih.",
    "Tip: Suhu air 88-92°C paling pas untuk menyeduh kebanyakan jenis kopi Jawa (jangan gunakan air yang baru mendidih).",
    "Tip: Selalu timbang kopi dan air pakai timbangan digital, biar rasa kopimu selalu konsisten tiap kali menyeduh.",
    "Tip: Membuat kopi seduh dingin (cold brew) butuh waktu 12-24 jam di kulkas agar rasanya keluar maksimal tanpa rasa pahit berlebih.",
    "Tip: Aduk pelan saja setelah tuangan pertama agar kopi terseduh merata tanpa membuatnya jadi terlalu pahit.",
    "Tip: Kalau buat kopi es, sajikan di gelas yang sudah didinginkan sebelumnya supaya suhu dinginnya awet.",
    "Tip: Jangan langsung minum kopi yang masih panas. Tunggu sebentar sampai agak hangat agar rasa aslinya lebih keluar.",
    "Tip: Kopi Jawa punya rasa manis bawaan yang unik, jadi coba hindari menambahkan gula terlalu banyak.",
    "Tip: Patokan kopi enak itu dari rasanya di lidah, bukan cuma dari waktu seduhnya. Beda biji kopi, beda juga cara seduhnya.",
    "Tip: Kopi yang disangrai ringan (light roast) rasanya lebih unik; yang disangrai gelap (dark roast) rasanya lebih pekat dan kental.",
    "Tip: Jika memakai air minum kemasan yang terasa ringan di lidah, giling kopi lebih halus. Jika airnya terasa tebal bermineral, giling lebih kasar.",
    "Tip: Simpan biji kopi di wadah kedap udara, jauhkan dari sinar matahari, panas, dan tempat lembap agar tetap segar.",
    "Tip: Kopi paling enak diseduh dalam rentang waktu 2-3 minggu setelah tanggal sangrai (roast date).",
    "Tip: Alat seduh V60 cocok buat yang suka eksperimen, karena kamu bisa bebas mengubah rasa dengan mengatur aliran air.",
    "Tip: Alat seduh Kalita Wave dirancang supaya pemula sekalipun bisa bikin kopi yang rasanya selalu konsisten.",
    "Tip: Aeropress itu alat yang serbaguna; bisa bikin kopi yang kental dan kuat, atau kopi yang ringan dan lembut.",
    "Tip: French Press bikin kopi terasa lebih kental. Kalau gilingan kopinya kasar, seduhlah lebih lama sedikit.",
    "Tip: Menyeduh pakai alat Syphon itu mirip eksperimen sains yang keren, cocok banget buat pamer ke tamu!",
    "Tip: Membuat espresso butuh suhu air yang pas. Pastikan mesin kopimu sudah cukup panas sebelum dipakai.",
    "Tip: Moka Pot menghasilkan kopi pekat yang mirip espresso, tapi biasanya dengan tekstur yang lebih berat.",
    "Tip: Perbandingan kopi dan air itu penting. Untuk membuat espresso, coba takaran 1 gram kopi untuk 2 gram air (1:2).",
    "Tip: Kopi yang diseduh dengan takaran pas tidak akan terasa terlalu asam menyengat, maupun terlalu pahit gosong.",
    "Tip: Kekentalan kopi yang pas (tidak terlalu encer atau terlalu pekat) adalah kunci nikmatnya seduhan kopi Jawa.",
    "Tip: Kandungan mineral dalam air seduhan akan sangat memengaruhi seberapa tajam rasa asam kopi yang dihasilkan.",
    "Tip: Coba deh bedakan menyeduh pakai air mineral biasa dengan air murni (seperti Amidis) - rasanya bisa beda jauh, lho!",
    "Tip: Kalau ingin mengaduk kopi saat diseduh, lakukan dengan lembut. Mengaduk terlalu kasar bikin kopi jadi pahit.",
    "Tip: Kecepatan menuang air panas yang stabil bikin rasa kopimu tidak melenceng dari harapan.",
    "Tip: Siram alat seduh dan gelasmu dengan air panas sebelum mulai, supaya suhu kopinya nanti tidak merosot drastis.",
    "Tip: Tuangan air pertama adalah penentu! Basahi semua bubuk kopi merata di awal agar semua rasanya keluar.",
    "Tip: Kopi asam itu belum tentu buruk. Rasa asam buah segar malah jadi tanda biji kopi Jawa berkualitas baik.",
    "Tip: Manis alami dari kopi Jawa akan menyeimbangkan rasa asamnya, bikin rasanya jadi lebih kaya di lidah.",
    "Tip: Kopi Jawa terkenal dengan teksturnya yang kental (creamy). Dapatkan tekstur ini dengan ukuran gilingan yang tepat.",
    "Tip: Aroma adalah bocoran awal rasanya. Jangan lupa hirup wangi kopimu sebelum diteguk!",
    "Tip: Rasa kopi yang masih tertinggal lama di mulut (aftertaste) itu tanda seduhannya berhasil, bukan berarti terlalu pahit.",
    "Tip: Konsistensi caramu menyeduh jauh lebih penting dari alat mahal. Pahami dan kuasai satu alat seduh dulu sampai jago.",
    "Tip: Rasa biji kopimu bisa berubah seiring waktu. Kopi yang sama bisa terasa berbeda rasanya jika diseduh minggu depan.",
    "Tip: Saat memadatkan kopi untuk espresso (tamping), pastikan tekanannya stabil dan rata agar air mengalir dengan baik.",
    "Tip: Kalau suka kopi susu, selalu lap bersih pipa pemanas susu di mesin kopimu sesaat setelah dipakai agar tetap higienis.",
    "Tip: Beda suhu air sedikit saja (2-3 derajat) bisa mengubah rasa kopi secara drastis. Berusahalah sepresisi mungkin.",
    "Tip: Kertas saring kopi punya bau kertas alami. Siram dulu kertasnya dengan air panas dan buang airnya sebelum menyeduh kopi.",
    "Tip: Menggoyang perlahan corong V60 saat diseduh membantu air membasahi seluruh bagian bubuk kopi dengan merata.",
    "Tip: Kopi paling segar adalah yang baru digiling tepat sebelum diseduh, bukan kopi bubuk yang sudah dibiarkan berhari-hari.",
    "Tip: Sinar matahari langsung bisa merusak kesegaran kopi dengan cepat. Selalu simpan di tempat yang gelap.",
    "Tip: Nikmati setiap proses menyeduhnya! Bikin kopi itu bukan cuma soal tegukan terakhir, tapi juga ritual pembuatannya.",
    "Tip: Catat takaran kopi, suhu air, dan caramu menyeduh. Ini sangat membantu kamu menemukan resep paling pas sesuai selera.",
    "Tip: Secangkir kopi yang enak akan terasa jauh lebih istimewa kalau diseduh dan diminum bersama orang terdekat."
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