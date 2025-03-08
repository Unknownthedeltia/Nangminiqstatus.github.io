let baseStats = { hp: 0, atk: 0, def: 0, spd: 0 };
let emotions = [];
let chart;
let adjustments = { hp: 0, atk: 0, def: 0, spd: 0 };

const jobs = {
    "無職": { hp: 0, atk: 0, def: 0, spd: 0 },
    "学生": { hp: -10, atk: -10, def: 10, spd: 10 },
    "猟師": { hp: -15, atk: 15, def: -15, spd: 15 },
    "軍人": { hp: 3, atk: 3, def: 4, spd: 5 },
    "救急隊員": { hp: 20, atk: -20, def: -20, spd: 10 },
    "シェフ": { hp: 5, atk: -5, def: 5, spd: -5 },
    "アスリート": { hp: 10, atk: 10, def: -5, spd: 15 },
    "探偵": { hp: -5, atk: -5, def: 5, spd: 10 },
    "エンジニア": { hp: -10, atk: -10, def: 20, spd: -10 },
    "アーティスト": { hp: 0, atk: 5, def: -5, spd: 5 },
    "農家": { hp: 15, atk: 5, def: 10, spd: -10 },
    "冒険家": { hp: 10, atk: 10, def: 5, spd: 10 },
    "マフィア": { hp: 20, atk: 20, def: -10, spd: 5 },
    "カジノディーラー": { hp: -5, atk: -5, def: 5, spd: 10 },
    "用心棒": { hp: 20, atk: 10, def: 15, spd: -5 },
    "傭兵": { hp: 15, atk: 15, def: 5, spd: 10 },
    "聖職者": { hp: 10, atk: -10, def: 10, spd: -5 },
    "ホスト": { hp: -5, atk: 5, def: -5, spd: 15 },
    "教師": { hp: -5, atk: -5, def: 15, spd: -5 }
};

const weapons = {
    "素手": { hp: 5, atk: 30, def: 0, spd: 5 },
    "片手剣": { hp: 0, atk: 22, def: 12, spd: 0 },
    "両手剣": { hp: 0, atk: 35, def: 15, spd: -10 },
    "短剣": { hp: 0, atk: 15, def: 5, spd: 10 },
    "槍": { hp: 0, atk: 25, def: 10, spd: -5 },
    "斧": { hp: 5, atk: 40, def: 10, spd: -15 },
    "弓": { hp: 0, atk: 20, def: 5, spd: 5 },
    "銃": { hp: 0, atk: 30, def: 0, spd: 10 },
    "杖": { hp: -20, atk: 15, def: 5, spd: 0 },
    "ハンマー": { hp: 10, atk: 45, def: 20, spd: -20 },
    "ナックル": { hp: -20, atk: 25, def: 0, spd: 10 },
    "鞭": { hp: 0, atk: 18, def: 8, spd: 5 },
    "ランス": { hp: 5, atk: 28, def: 12, spd: -5 },
    "手裏剣": { hp: -12, atk: 10, def: 0, spd: 20 },
    "鎌": { hp: 0, atk: 32, def: 8, spd: 5 },
    "メイス": { hp: 5, atk: 28, def: 15, spd: -10 },
    "チェーンソー": { hp: -20, atk: 50, def: 5, spd: -15 }
};

const emotionEffects = {
    "△": { hp: 0, atk: 3, def: 3, spd: 0 },
    "▽": { hp: 2, atk: 0, def: 0, spd: 4 }
};

function rollD10() {
    return Math.floor(Math.random() * 10) + 1;
}

function generateStats() {
    baseStats.hp = 0;
    baseStats.atk = 0;
    baseStats.def = 0;
    baseStats.spd = 0;
    for (let i = 0; i < 20; i++) {
        baseStats.hp += rollD10();
        baseStats.atk += rollD10();
        baseStats.def += rollD10();
        baseStats.spd += rollD10();
    }
    adjustments = { hp: 0, atk: 0, def: 0, spd: 0 };
    resetAdjustInputs();
    updateStats();
}

function addEmotion(emotion) {
    if (emotions.length >= 15) {
        emotions.shift();
    }
    emotions.push(emotion);
    document.getElementById("emotion-line").textContent = emotions.join(" ");
    updateStats();
}

function adjustStats() {
    adjustments.hp = parseInt(document.getElementById("hp-adjust").value) || 0;
    adjustments.atk = parseInt(document.getElementById("atk-adjust").value) || 0;
    adjustments.def = parseInt(document.getElementById("def-adjust").value) || 0;
    adjustments.spd = parseInt(document.getElementById("spd-adjust").value) || 0;
    updateStats();
}

function updateStats() {
    let baseHp = baseStats.hp + adjustments.hp;
    let baseAtk = baseStats.atk + adjustments.atk;
    let baseDef = baseStats.def + adjustments.def;
    let baseSpd = baseStats.spd + adjustments.spd;

    let hp = baseHp;
    let atk = baseAtk;
    let def = baseDef;
    let spd = baseSpd;

    const job = document.getElementById("job").value;
    const weapon = document.getElementById("weapon").value;

    hp += jobs[job].hp + weapons[weapon].hp;
    atk += jobs[job].atk + weapons[weapon].atk;
    def += jobs[job].def + weapons[weapon].def;
    spd += jobs[job].spd + weapons[weapon].spd;

    emotions.forEach(emotion => {
        hp += emotionEffects[emotion].hp;
        atk += emotionEffects[emotion].atk;
        def += emotionEffects[emotion].def;
        spd += emotionEffects[emotion].spd;
    });

    document.getElementById("base-hp").textContent = baseHp;
    document.getElementById("base-atk").textContent = baseAtk;
    document.getElementById("base-def").textContent = baseDef;
    document.getElementById("base-spd").textContent = baseSpd;

    document.getElementById("hp").textContent = hp;
    document.getElementById("atk").textContent = atk;
    document.getElementById("def").textContent = def;
    document.getElementById("spd").textContent = spd;

    updateChart(baseHp, baseAtk, baseDef, baseSpd, hp, atk, def, spd);
}

function updateChart(baseHp, baseAtk, baseDef, baseSpd, hp, atk, def, spd) {
    const ctx = document.getElementById("statsChart").getContext("2d");
    if (chart) {
        chart.destroy();
    }
    const minValue = Math.min(baseHp, baseAtk, baseDef, baseSpd, hp, atk, def, spd, 0) - 10;
    const maxValue = Math.max(baseHp, baseAtk, baseDef, baseSpd, hp, atk, def, spd, 0) + 10;
    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["HP", "ATK", "DEF", "SPD"],
            datasets: [
                {
                    label: "基礎ステータス",
                    data: [baseHp, baseAtk, baseDef, baseSpd],
                    backgroundColor: "rgba(46, 204, 113, 0.2)",
                    borderColor: "rgba(46, 204, 113, 1)",
                    borderWidth: 1
                },
                {
                    label: "補正後ステータス",
                    data: [hp, atk, def, spd],
                    backgroundColor: "rgba(231, 76, 60, 0.2)",
                    borderColor: "rgba(231, 76, 60, 1)",
                    borderWidth: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    suggestedMin: minValue,
                    suggestedMax: maxValue
                }
            }
        }
    });
}

function resetAll() {
    baseStats = { hp: 0, atk: 0, def: 0, spd: 0 };
    emotions = [];
    adjustments = { hp: 0, atk: 0, def: 0, spd: 0 };
    document.getElementById("char-name").value = "";
    document.getElementById("char-desc").value = "";
    document.getElementById("job").value = "無職";
    document.getElementById("weapon").value = "素手";
    document.getElementById("emotion-line").textContent = "";
    resetAdjustInputs();
    updateStats();
}

function resetAdjustInputs() {
    document.getElementById("hp-adjust").value = 0;
    document.getElementById("atk-adjust").value = 0;
    document.getElementById("def-adjust").value = 0;
    document.getElementById("spd-adjust").value = 0;
}

function saveToTxt() {
    const name = document.getElementById("char-name").value || "名無し";
    const desc = document.getElementById("char-desc").value || "紹介なし";
    const job = document.getElementById("job").value;
    const weapon = document.getElementById("weapon").value;
    const text = `
キャラクター情報
名前: ${name}
紹介: ${desc}
職業: ${job}
武器: ${weapon}
基礎HP: ${document.getElementById("base-hp").textContent}
基礎ATK: ${document.getElementById("base-atk").textContent}
基礎DEF: ${document.getElementById("base-def").textContent}
基礎SPD: ${document.getElementById("base-spd").textContent}
補正後HP: ${document.getElementById("hp").textContent}
補正後ATK: ${document.getElementById("atk").textContent}
補正後DEF: ${document.getElementById("def").textContent}
補正後SPD: ${document.getElementById("spd").textContent}
感情ライン: ${emotions.join(" ")}
    `;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name || "character"}.txt`;
    link.click();
}

function loadFromTxt() {
    const fileInput = document.getElementById("load-file");
    const file = fileInput.files[0];
    if (!file) {
        alert("ファイルを選択してください。");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const lines = text.split("\n").map(line => line.trim());
        let parsed = {};
        lines.forEach(line => {
            const [key, value] = line.split(": ");
            if (key && value) parsed[key] = value;
        });

        // エラーチェック
        let errors = [];
        if (!parsed["名前"]) errors.push("名前がありません");
        if (!parsed["職業"] || !jobs[parsed["職業"]]) errors.push("職業が無効です");
        if (!parsed["武器"] || !weapons[parsed["武器"]]) errors.push("武器が無効です");
        if (!parsed["基礎HP"] || isNaN(parseInt(parsed["基礎HP"]))) errors.push("基礎HPが無効です");
        if (!parsed["補正後HP"] || isNaN(parseInt(parsed["補正後HP"]))) errors.push("補正後HPが無効です");

        if (errors.length > 0) {
            alert("エラー:\n" + errors.join("\n"));
            return;
        }

        document.getElementById("char-name").value = parsed["名前"];
        document.getElementById("char-desc").value = parsed["紹介"] || "";
        document.getElementById("job").value = parsed["職業"];
        document.getElementById("weapon").value = parsed["武器"];
        
        emotions = (parsed["感情ライン"] || "").split(" ").filter(e => e === "△" || e === "▽");
        document.getElementById("emotion-line").textContent = emotions.join(" ");

        // 基礎値を直接設定
        baseStats.hp = parseInt(parsed["基礎HP"]) || 0;
        baseStats.atk = parseInt(parsed["基礎ATK"]) || 0;
        baseStats.def = parseInt(parsed["基礎DEF"]) || 0;
        baseStats.spd = parseInt(parsed["基礎SPD"]) || 0;

        adjustments = { hp: 0, atk: 0, def: 0, spd: 0 };
        resetAdjustInputs();
        updateStats();
    };
    reader.onerror = function() {
        alert("ファイルの読み込みに失敗しました。");
    };
    reader.readAsText(file);
}

function toggleTheme() {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// 初期テーマ設定
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
} else {
    document.body.classList.add("light");
}