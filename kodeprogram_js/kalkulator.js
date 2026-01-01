let chart;

function gambarGrafik() {
    const ekspresi = document.getElementById("fungsiInput").value.trim();
    if (!ekspresi) return alert("Masukkan fungsi!");

    
    // Hitung titik-titk grafik
    const data = [];
    for (let x = -20; x <= 20; x += .5) {
        try {
            const y = math.evaluate(ekspresi, { x });
            if (isFinite(y)) data.push({ x, y });
        } catch (e) { return alert("Fungsi tidak valid"); }
    }
    if (!data.length) return alert("Tidak ada titik valid.");


//cari nilai min/max pada sekala
    const xs = data.map(p => p.x), ys = data.map(p => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);

    const step = (min, max, ideal = 10) => {
        const r = max - min;
        const s = Math.pow(10, Math.floor(Math.log10(r / ideal)));
        return r / s > 30 ? s * Math.ceil((r / s) / 10) : Math.max(1, s);
    };


    //hitung interfal grid 
    const stepX = step(minX, maxX);
    const stepY = step(minY, maxY);

    if (chart) chart.destroy(); //hapus grafik lame


// buet grafik  baru
    chart = new Chart(grafik, {
        type: "line",
        data: { datasets: [{ label: "y = " + ekspresi, data, borderWidth: 3, borderColor: "#fd0", pointRadius: 2 }] },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { labels: { color: "white" } } },
            scales: {
                x: { type: "linear", min: minX, max: maxX, ticks: { stepSize: stepX, color: "white" }, grid: { color: "#fff2" } },
                y: { min: minY, max: maxY, ticks: { stepSize: stepY, color: "white" }, grid: { color: "#fff2" } }
            }
        }
    });

    grafik.style.height = "420px"; //set tinggi canvas
}