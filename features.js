/* ============================================================
   티키피디아 — 스토어 · 스마트렌즈 · 파트너 회원 (2026-11 개편)
   app.js 뒤에 로드됩니다. app.js 가 window.TeaFaiApp 으로 넘겨 주는
   공용 함수(t·esc·go·toast…)만 써서 화면을 그립니다.
   ============================================================ */
(function () {
  "use strict";

  var A = null; /* window.TeaFaiApp — app.js 가 채웁니다 */
  var D = window.TEAFaiData;

  function bridge() {
    if (!A) A = window.TeaFaiApp || null;
    return A;
  }
  function t(key, vars) {
    return bridge() ? A.t(key, vars) : key;
  }
  function esc(s) {
    return bridge()
      ? A.esc(s)
      : String(s == null ? "" : s)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
  }
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function lang() {
    return bridge() ? A.lang : "ko";
  }
  function storeGet(key, fallback) {
    return bridge() ? A.storeGet(key, fallback) : fallback;
  }
  function storeSet(key, value) {
    if (bridge()) A.storeSet(key, value);
  }
  function toast(msg) {
    if (bridge()) A.toast(msg);
  }
  function won(n) {
    return bridge() ? A.won(n) : String(n);
  }
  function fmtDur(sec) {
    return bridge() ? A.fmtDur(sec) : sec + "s";
  }
  function l10n(obj) {
    return bridge() ? A.l10n(obj) : String(obj || "");
  }

  /* ---------------- 밀크티·홍차 완제품 (쿠팡 검색 링크) ----------------
     발급받은 쿠팡파트너스 단축 링크가 없는 품목이라, 있는 척하는 가짜 링크
     대신 실제 쿠팡 검색 주소를 씁니다. paid:false 이므로 대가성 문구와 분리됩니다. */
  var SEARCH = "https://www.coupang.com/np/search?q=";
  var FINISHED = [
    {
      id: "milk-hongkong",
      q: "홍콩 밀크티",
      title: { ko: "홍콩식 밀크티 (완제품·분말)", en: "Hong Kong style milk tea", "zh-CN": "港式奶茶", "zh-TW": "港式奶茶", ja: "香港式ミルクティー", yue: "港式奶茶（現成·粉）" },
      note: { ko: "진한 홍차에 연유를 넣은 홍콩식", en: "Strong black tea with evaporated milk", "zh-CN": "浓红茶加淡奶", "zh-TW": "濃紅茶加淡奶", yue: "濃紅茶加淡奶嘅港式" },
      url: "https://link.coupang.com/a/iR15M5wWbI",
      price: 6080,
      thumb: "images/store/fin-milk-hongkong.jpg"
    },
    {
      id: "milk-powder",
      q: "밀크티 파우더",
      title: { ko: "밀크티 파우더·베이스", en: "Milk tea powder or base", "zh-CN": "奶茶粉·基底", "zh-TW": "奶茶粉·基底", ja: "ミルクティーパウダー", yue: "奶茶粉·基底" },
      note: { ko: "집에서 밀크티 만들 때 쓰는 베이스", en: "For making milk tea at home", "zh-CN": "在家做奶茶用", "zh-TW": "在家做奶茶用", yue: "喺屋企整奶茶用嘅基底" },
      url: "https://link.coupang.com/a/iR162uSjtI",
      price: 5780,
      thumb: "images/store/fin-milk-powder.jpg"
    },
    {
      id: "milk-tapioca",
      q: "타피오카 펄",
      title: { ko: "타피오카 펄 (버블티)", en: "Tapioca pearls for bubble tea", "zh-CN": "珍珠粉圆", "zh-TW": "珍珠粉圓", ja: "タピオカパール", yue: "珍珠（珍珠奶茶用）" },
      note: { ko: "버블티용 펄", en: "Pearls for bubble tea", "zh-CN": "做珍珠奶茶用", "zh-TW": "做珍珠奶茶用", yue: "整珍珠奶茶用嘅珍珠" },
      url: "https://link.coupang.com/a/iR18jIvX3s",
      price: 8700,
      thumb: "images/store/fin-milk-tapioca.jpg"
    },
    {
      id: "milk-evap",
      q: "연유",
      title: { ko: "연유 (홍콩 밀크티용)", en: "Evaporated milk", "zh-CN": "淡奶", "zh-TW": "淡奶", ja: "エバミルク", yue: "淡奶（港式奶茶用）" },
      note: { ko: "홍콩 밀크티의 진한 맛", en: "The body of Hong Kong milk tea", "zh-CN": "港式奶茶的厚度", "zh-TW": "港式奶茶的厚度", yue: "港式奶茶嘅厚度" },
      url: "https://link.coupang.com/a/iR19scSVy0",
      price: 5400,
      thumb: "images/store/fin-milk-evap.jpg"
    },
    {
      id: "black-ceylon-bag",
      q: "실론 홍차 티백",
      title: { ko: "실론 홍차 티백 (대용량)", en: "Ceylon black tea bags, large pack", "zh-CN": "锡兰红茶茶包（大包装）", "zh-TW": "錫蘭紅茶茶包（大包裝）", ja: "セイロン紅茶ティーバッグ", yue: "錫蘭紅茶茶包（大包）" },
      note: { ko: "밀크티 베이스로 좋은 진한 홍차", en: "A strong tea for milk tea", "zh-CN": "适合做奶茶基底", "zh-TW": "適合做奶茶基底", yue: "啱做奶茶基底嘅濃紅茶" },
      url: "https://link.coupang.com/a/iR2aEhJymG",
      price: 18900,
      thumb: "images/store/fin-black-ceylon-bag.jpg"
    },
    {
      id: "black-assam-bag",
      q: "아삼 홍차",
      title: { ko: "아삼 홍차", en: "Assam black tea", "zh-CN": "阿萨姆红茶", "zh-TW": "阿薩姆紅茶", ja: "アッサム紅茶", yue: "阿薩姆紅茶" },
      note: { ko: "몰트 향이 진한 홍차", en: "Malty and full", "zh-CN": "麦芽香浓", "zh-TW": "麥芽香濃", yue: "麥芽香濃嘅紅茶" },
      url: "https://link.coupang.com/a/iR2bNt6k2e",
      price: 8900,
      thumb: "images/store/fin-black-assam-bag.jpg"
    },
    {
      id: "black-earlgrey-bulk",
      q: "얼그레이 티백",
      title: { ko: "얼그레이 티백 (대용량)", en: "Earl Grey tea bags, large pack", "zh-CN": "伯爵茶包（大包装）", "zh-TW": "伯爵茶包（大包裝）", ja: "アールグレイ ティーバッグ", yue: "伯爵茶包（大包）" },
      note: { ko: "매일 마시는 베르가못 홍차", en: "Everyday bergamot black tea", "zh-CN": "日常佛手柑红茶", "zh-TW": "日常佛手柑紅茶", yue: "日日飲嘅佛手柑紅茶" },
      url: "https://link.coupang.com/a/iR2cSQYflY",
      price: 24900,
      thumb: "images/store/fin-black-earlgrey-bulk.jpg"
    },
    {
      id: "black-chai",
      q: "마살라 차이",
      title: { ko: "마살라 차이 (향신료 홍차)", en: "Masala chai", "zh-CN": "玛萨拉香料红茶", "zh-TW": "瑪薩拉香料紅茶", ja: "マサラチャイ", yue: "瑪薩拉香料茶" },
      note: { ko: "우유와 향신료를 넣어 끓이는 인도 홍차", en: "Indian spiced milk tea", "zh-CN": "印度香料奶茶", "zh-TW": "印度香料奶茶", yue: "加奶同香料一齊煲嘅印度紅茶" },
      url: "https://link.coupang.com/a/iR2dTAmlAO",
      price: 14400,
      thumb: "images/store/fin-black-chai.jpg"
    }
  ];

  /* ---------------- 스토어 상태 ---------------- */
  var storeState = { cat: "all", q: "", bagId: null };

  function affiliate() {
    return (bridge() && A.partner && A.partner.affiliate) || null;
  }

  function normTitle(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    var key = lang() === "yue" ? "yue" : lang();
    var out = obj[key];
    if (!out && key === "yue") out = obj["zh-TW"];
    return out || obj.en || obj.ko || "";
  }

  function storeItems() {
    var out = [];
    var aff = affiliate();
    (aff && aff.items ? aff.items : []).forEach(function (it) {
      if (it.active === false || it.is_active === false) return;
      if (!it.url) return;
      out.push({
        id: it.id,
        cat: it.kind === "teaware" ? "teaware" : "leaf",
        paid: it.paid !== false,
        badge: normTitle(it.badge) || (it.kind === "teaware" ? t("store.catTeaware") : t("store.catLeaf")),
        title: normTitle(it.title) || normTitle(it.name),
        sub: "",
        price: it.price_krw || null,
        url: String(it.url),
        thumb: it.thumb || null
      });
    });

    var bags = (bridge() && A.feature && A.feature.bags && A.feature.bags.bags) || [];
    bags.forEach(function (bag) {
      var brand = A.bagBrandName ? A.bagBrandName(bag) : bag.brand || "";
      var name = normTitle(bag.name);
      var aff = bag.affiliate && bag.affiliate.url ? bag.affiliate : null;
      out.push({
        id: "bag-" + bag.id,
        cat: "bag",
        paid: !!aff,
        badge: t("store.catBag"),
        title: (brand ? brand + " · " : "") + name,
        sub: t("bag.brew", { temp: bag.temp, dur: fmtDur(bag.seconds) }),
        price: (aff && aff.price) || null,
        url: aff ? String(aff.url) : SEARCH + encodeURIComponent((brand ? brand + " " : "") + name + " 티백"),
        thumb: (aff && aff.thumb) || bag.thumb || (bag.photo && bag.photo.f) || null
      });
    });

    FINISHED.forEach(function (f) {
      out.push({
        id: "fin-" + f.id,
        cat: "milk",
        paid: !!f.url,
        badge: t("store.catMilk"),
        title: normTitle(f.title),
        sub: normTitle(f.note),
        price: f.price || null,
        url: f.url ? String(f.url) : SEARCH + encodeURIComponent(f.q),
        thumb: f.thumb || null
      });
    });
    return out;
  }

  function storeHaystack(item) {
    return [item.title, item.sub, item.badge].join(" ").toLowerCase();
  }

  function visibleStoreItems() {
    var q = storeState.q.trim().toLowerCase();
    return storeItems().filter(function (it) {
      if (storeState.bagId && it.id !== "bag-" + storeState.bagId) return false;
      if (storeState.cat !== "all" && it.cat !== storeState.cat) return false;
      if (q && storeHaystack(it).indexOf(q) < 0) return false;
      return true;
    });
  }

  var CATS = [
    { id: "all", key: "store.catAll", glyph: "茶" },
    { id: "leaf", key: "store.catLeaf", glyph: "葉" },
    { id: "teaware", key: "store.catTeaware", glyph: "具" },
    { id: "bag", key: "store.catBag", glyph: "包" },
    { id: "milk", key: "store.catMilk", glyph: "奶" }
  ];

  function renderStoreCats() {
    var wrap = $("#storeCats");
    if (!wrap) return;
    wrap.innerHTML = "";
    CATS.forEach(function (c) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip small";
      btn.setAttribute("aria-pressed", String(storeState.cat === c.id));
      btn.textContent = t(c.key);
      btn.addEventListener("click", function () {
        storeState.cat = c.id;
        storeState.bagId = null;
        renderStore();
      });
      wrap.appendChild(btn);
    });
  }

  function storeItemHtml(it) {
    var glyph = "茶";
    for (var i = 0; i < CATS.length; i++) if (CATS[i].id === it.cat) glyph = CATS[i].glyph;
    return (
      '<a class="store-item" href="' +
      esc(it.url) +
      '" target="_blank" rel="' +
      (it.paid ? "sponsored noopener" : "noopener") +
      '">' +
      '<span class="store-thumb' +
      (it.thumb ? " has-photo" : "") +
      '" aria-hidden="true">' +
      '<em class="store-glyph">' +
      esc(glyph) +
      "</em>" +
      (it.thumb
        ? '<img src="' + esc(it.thumb) + '" alt="" loading="lazy" decoding="async" width="160" height="160" />'
        : "") +
      "</span>" +
      '<span class="store-body"><span class="store-badge' +
      (it.paid ? "" : " plain") +
      '">' +
      esc(it.badge || "") +
      "</span><b>" +
      esc(it.title) +
      '</b><span class="store-sub">' +
      esc(it.sub || "") +
      "</span>" +
      (it.price ? '<span class="store-price">' + esc(won(it.price)) + "</span>" : "") +
      "</span>" +
      '<span class="store-cta">' +
      esc(it.paid ? t("store.buy") : t("store.browse")) +
      '<svg width="12" height="12"><use href="#ic-arrow"/></svg></span></a>'
    );
  }

  function renderStore() {
    var list = $("#storeList");
    if (!list) return;
    renderStoreCats();
    var items = visibleStoreItems();
    var count = $("#storeCount");
    if (count) count.textContent = t("store.count", { n: items.length });
    list.innerHTML = items.length
      ? items.map(storeItemHtml).join("")
      : '<div class="empty">' + esc(t("store.empty")) + "</div>";
    var disc = $("#storeDisclosure");
    if (disc) {
      var aff = affiliate();
      disc.textContent = aff && aff.disclosure ? normTitle(aff.disclosure) : t("store.disclosure");
    }
    var input = $("#storeSearchInput");
    if (input && input.value !== storeState.q) input.value = storeState.q;
    /* 사진이 없는 상품만 한자 글리프로 남도록, 사진 로딩에 실패하면 글리프로 되돌립니다 */
    [].forEach.call(list.querySelectorAll(".store-thumb img"), function (img) {
      img.addEventListener("error", function () {
        var wrap = img.parentNode;
        img.parentNode.removeChild(img);
        if (wrap) wrap.classList.remove("has-photo");
      });
    });
    /* 스토어를 다시 그릴 때 스마트렌즈의 문구도 현재 언어로 맞춥니다 */
    renderLens();
  }

  /* 백과의 "이 차 사기" → 스토어에서 그 차 이름으로 찾습니다 */
  function openStoreFor(teaId) {
    var tea = D.byId(teaId);
    storeState.cat = "all";
    storeState.bagId = null;
    storeState.q = tea ? tea.name : "";
    renderStore();
    if (bridge()) A.go("store");
    toast(t("store.forTea"));
  }

  /* 백과의 티백 "이 티백 사기" → 스토어의 그 티백 카드로 바로 갑니다 */
  function openStoreForBag(bagId) {
    var bags = (bridge() && A.feature && A.feature.bags && A.feature.bags.bags) || [];
    var found = null;
    bags.forEach(function (bag) {
      if (bag.id === bagId) found = bag;
    });
    if (!found) return;
    storeState.cat = "all";
    storeState.q = "";
    storeState.bagId = bagId;
    renderStore();
    if (bridge()) A.go("store");
    toast(t("bag.buy"));
  }

  /* ---------------- 스마트렌즈 ---------------- */
  var lensState = { busy: false, preview: null, barcode: null, hits: [], done: false, register: false };

  function bagHits(q) {
    var needle = String(q || "").trim().toLowerCase();
    if (!needle) return [];
    var bags = (bridge() && A.feature && A.feature.bags && A.feature.bags.bags) || [];
    var out = [];
    bags.forEach(function (bag) {
      var brand = A.bagBrandName ? A.bagBrandName(bag) : bag.brand || "";
      var hay = [brand, normTitle(bag.name), normTitle(bag.note), bag.bag, (bag.tags || []).join(" ")].join(" ").toLowerCase();
      if (hay.indexOf(needle) < 0) return;
      out.push({
        id: bag.id,
        title: (brand ? brand + " · " : "") + normTitle(bag.name),
        sub: t("bag.brew", { temp: bag.temp, dur: fmtDur(bag.seconds) }),
        glyph: "包",
        url: SEARCH + encodeURIComponent((brand ? brand + " " : "") + normTitle(bag.name) + " 티백")
      });
    });
    if (!out.length) {
      D.teas.forEach(function (tea) {
        var hay = [tea.name, tea.sub, tea.groupName, tea.oneLine, (tea.alias || []).join(" ")].join(" ").toLowerCase();
        if (hay.indexOf(needle) < 0) return;
        var g = null;
        for (var i = 0; i < D.groups.length; i++) if (D.groups[i].id === tea.group) g = D.groups[i];
        out.push({
          id: tea.id,
          title: tea.name,
          sub: tea.groupName || "",
          glyph: tea.hanja || "茶",
          url: SEARCH + encodeURIComponent(tea.name + " 찻잎"),
          accent: g ? g.accent : null
        });
      });
    }
    return out.slice(0, 4);
  }

  function lensHitHtml(hit) {
    return (
      '<a class="lens-hit" href="' +
      esc(hit.url) +
      '" target="_blank" rel="noopener">' +
      '<span class="store-thumb" aria-hidden="true">' +
      esc(hit.glyph || "茶") +
      "</span><span class=\"lh-text\"><b>" +
      esc(hit.title) +
      "</b><em>" +
      esc(hit.sub || "") +
      "</em></span>" +
      '<span class="store-cta">' +
      esc(t("store.browse")) +
      "</span></a>"
    );
  }

  function lensResultHtml() {
    if (!lensState.done) return "";
    var html = '<div class="lens-result"><h4>' + esc(t("lens.result")) + "</h4>";
    if (lensState.barcode) {
      html += '<p class="lens-note">' + esc(t("lens.barcode", { code: lensState.barcode })) + "</p>";
    }
    if (lensState.hits.length) {
      html += lensState.hits.map(lensHitHtml).join("");
      html +=
        '<button class="lens-btn" type="button" data-lens-register style="margin-top:8px">' +
        esc(t("lens.register")) +
        "</button>";
    } else {
      html += '<p class="lens-empty">' + esc(t("lens.noMatch")) + "</p>";
      html +=
        '<button class="lens-btn primary" type="button" data-lens-register style="margin-top:8px">' +
        esc(t("lens.register")) +
        "</button>";
    }
    html += "</div>";
    if (lensState.register) html += lensFormHtml();
    return html;
  }

  function lensFormHtml() {
    var opts = D.groups
      .map(function (g) {
        return '<option value="' + esc(g.id) + '">' + esc(g.name) + "</option>";
      })
      .join("");
    return (
      '<form class="lens-form" id="lensForm" autocomplete="off">' +
      '<div class="field"><label for="lensName">' +
      esc(t("lens.regName")) +
      '</label><input id="lensName" type="text" maxlength="60" required /></div>' +
      '<div class="field"><label for="lensBrand">' +
      esc(t("lens.regBrand")) +
      '</label><input id="lensBrand" type="text" maxlength="40" /></div>' +
      '<div class="field"><label for="lensType">' +
      esc(t("lens.regType")) +
      '</label><select id="lensType">' +
      opts +
      "</select></div>" +
      '<div class="field"><label for="lensNote">' +
      esc(t("lens.regNote")) +
      '</label><textarea id="lensNote" maxlength="200"></textarea></div>' +
      '<button class="lens-btn primary" type="submit">' +
      esc(t("lens.regSubmit")) +
      "</button></form>"
    );
  }

  function renderLens() {
    var mount = $("#lensMount");
    if (!mount) return;
    mount.innerHTML =
      '<div class="lens-card">' +
      '<div class="lens-head"><svg width="17" height="17"><use href="#ic-camera"/></svg><b>' +
      esc(t("lens.title")) +
      "</b></div>" +
      '<p class="lens-lead">' +
      esc(t("lens.lead")) +
      "</p>" +
      '<div class="lens-actions">' +
      '<label class="lens-btn primary"><svg width="14" height="14"><use href="#ic-camera"/></svg>' +
      esc(t("lens.shoot")) +
      '<input type="file" accept="image/*" capture="environment" id="lensCamera" /></label>' +
      '<label class="lens-btn"><svg width="14" height="14"><use href="#ic-bag"/></svg>' +
      esc(t("lens.pick")) +
      '<input type="file" accept="image/*" id="lensFile" /></label>' +
      "</div>" +
      (lensState.preview
        ? '<div class="lens-preview"><img src="' +
          esc(lensState.preview) +
          '" alt="" />' +
          '<span class="lens-empty">' +
          esc(lensState.busy ? t("lens.reading") : t("lens.result")) +
          "</span></div>"
        : "") +
      lensResultHtml() +
      '<p class="lens-note">' +
      esc(t("lens.notice")) +
      "</p>" +
      "</div>";

    ["#lensCamera", "#lensFile"].forEach(function (sel) {
      var input = $(sel);
      if (input) {
        input.addEventListener("change", function () {
          var file = input.files && input.files[0];
          if (file) readLensImage(file);
        });
      }
    });
    var regBtn = $("[data-lens-register]", mount);
    if (regBtn) {
      regBtn.addEventListener("click", function () {
        lensState.register = true;
        renderLens();
      });
    }
    var form = $("#lensForm");
    if (form) form.addEventListener("submit", submitLensProduct);
  }

  /* 사진에서 읽을 수 있는 것(바코드)은 읽고, 나머지는 제품명으로 찾습니다.
     실제 이미지 인식(Vision API)은 아직 연결하지 않았고 화면에 그렇게 적습니다. */
  function readLensImage(file) {
    lensState.busy = true;
    lensState.done = false;
    lensState.hits = [];
    lensState.barcode = null;
    try {
      lensState.preview = URL.createObjectURL(file);
    } catch (e) {
      lensState.preview = null;
    }
    renderLens();

    var finish = function () {
      lensState.busy = false;
      lensState.done = true;
      renderLens();
    };

    var detect = function () {
      if (!("BarcodeDetector" in window)) return Promise.resolve(null);
      var detector;
      try {
        detector = new window.BarcodeDetector();
      } catch (e) {
        return Promise.resolve(null);
      }
      return detector
        .detect(file)
        .then(function (codes) {
          if (codes && codes.length) return String(codes[0].rawValue || "");
          return null;
        })
        .catch(function () {
          return null;
        });
    };

    detect()
      .then(function (code) {
        if (code) {
          lensState.barcode = code;
          lensState.hits = bagHits(code);
        }
        finish();
      })
      .catch(finish);
  }

  function submitLensProduct(e) {
    e.preventDefault();
    var nameEl = $("#lensName");
    var name = nameEl ? nameEl.value.trim() : "";
    if (!name) {
      if (nameEl) nameEl.focus();
      return;
    }
    var brandEl = $("#lensBrand");
    var typeEl = $("#lensType");
    var noteEl = $("#lensNote");
    var entry = {
      id: "tb" + Date.now().toString(36),
      name: name.slice(0, 60),
      brand: brandEl ? brandEl.value.trim().slice(0, 40) : "",
      type: typeEl ? typeEl.value : "",
      note: noteEl ? noteEl.value.trim().slice(0, 200) : "",
      barcode: lensState.barcode || "",
      createdAt: Date.now(),
      lang: lang()
    };
    var list = storeGet("teafai.submissions.v1", []);
    if (!Array.isArray(list)) list = [];
    list.push(entry);
    storeSet("teafai.submissions.v1", list);
    renderLens();

    if (window.TeaFaiSupabase && window.TeaFaiSupabase.isConfigured && window.TeaFaiSupabase.isConfigured()) {
      window.TeaFaiSupabase.submitTeaBag(entry).then(function (res) {
        toast(res && res.ok ? t("lens.regOk") : t("lens.regLocal"));
      });
    } else {
      toast(t("lens.regLocal"));
    }
    lensState.register = false;
    lensState.done = false;
    lensState.hits = [];
    renderLens();
  }

  /* ---------------- 회원 등급 3단계 ----------------
     개인(3,900) ⊂ 찻집(13,900) ⊂ 제조사(23,900) — 위 등급은 아래 등급의 기능을 모두 포함합니다.
     결제는 Google Play 인앱 정기구독 상품으로 엽니다. */
  var MEMBER_KEY = "teafai.member.v1";
  var SKU = {
    personal: "teakipedia_personal_monthly",
    teahouse: "teakipedia_teahouse_monthly",
    maker: "teakipedia_maker_monthly"
  };
  var PLAN_ORDER = ["personal", "teahouse", "maker"];
  var RANK = { none: 0, personal: 1, teahouse: 2, maker: 3 };
  var LEGACY = { member: "personal", partner: "teahouse" };

  function memberState() {
    var s = storeGet(MEMBER_KEY, null);
    if (!s) return { plan: "none", rank: 0 };
    var plan = LEGACY[s.plan] || s.plan;
    if (RANK[plan] == null) return { plan: "none", rank: 0 };
    s.plan = plan;
    s.rank = RANK[plan];
    return s;
  }
  function rank() {
    return memberState().rank || 0;
  }
  /* 개인 회원 이상 — 파트너 목록·지도 열람 */
  function unlocked() {
    return rank() >= 1;
  }
  /* 찻집 회원 이상 — 매장 정보·메뉴 업로드 */
  function canUploadShop() {
    return rank() >= 2;
  }
  /* 제조사 회원 — 자사 제품 업로드 */
  function canUploadProduct() {
    return rank() >= 3;
  }

  /* Google Play 디지털 상품 서비스 어댑터 — 안드로이드 앱(TWA)에서만 열립니다. */
  function playService() {
    if (!("getDigitalGoodsService" in window)) return Promise.resolve(null);
    try {
      return Promise.resolve(window.getDigitalGoodsService("https://play.google.com/store")).catch(function () {
        return null;
      });
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  function savePlan(plan, sku, source) {
    storeSet(MEMBER_KEY, { plan: plan, sku: sku, since: Date.now(), source: source });
  }

  function checkPurchases() {
    return playService().then(function (service) {
      if (!service) return { ok: false, reason: "no_service" };
      return service
        .listPurchases()
        .then(function (purchases) {
          var list = purchases || [];
          var best = null;
          for (var i = 0; i < list.length; i++) {
            var sku = list[i].itemId || list[i].sku || "";
            for (var k = 0; k < PLAN_ORDER.length; k++) {
              if (sku === SKU[PLAN_ORDER[k]]) {
                if (!best || RANK[PLAN_ORDER[k]] > RANK[best]) best = PLAN_ORDER[k];
              }
            }
          }
          if (best) {
            savePlan(best, SKU[best], "play");
            return { ok: true, plan: best };
          }
          return { ok: false, reason: "none" };
        })
        .catch(function () {
          return { ok: false, reason: "error" };
        });
    });
  }

  function startSubscribe(plan) {
    toast(t("member.checking"));
    checkPurchases().then(function (res) {
      if (res.ok) {
        toast(t("member.unlocked"));
        renderMemberPanel();
        if (bridge()) A.renderPartnerShops();
        return;
      }
      playService().then(function (service) {
        if (!service) {
          toast(t("member.playMissing"));
          return;
        }
        /* 웹에서는 Play 결제 창이 열리지 않습니다 — 앱 안내로 대신합니다 */
        toast(t("member.webNote"));
        if (service && typeof service.listDetails === "function") {
          service.listDetails([SKU[plan] || SKU.personal]).catch(function () {});
        }
      });
    });
  }

  function planBoxHtml(plan) {
    var feats = [
      "member." + plan + "F1",
      "member." + plan + "F2",
      "member." + plan + "F3"
    ];
    return (
      '<div class="plan-box' +
      (plan === "maker" ? " biz" : "") +
      '"><div class="pb-top"><b>' +
      esc(t("member." + plan)) +
      '</b><span class="pb-price">' +
      esc(t("member." + plan + "Price")) +
      '</span></div><span class="pb-soon">' +
      esc(t("partner.soon")) +
      "</span><ul>" +
      feats
        .map(function (f) {
          return "<li>" + esc(t(f)) + "</li>";
        })
        .join("") +
      "</ul></div>"
    );
  }

  /* 파트너 탭은 오픈 무료 기간입니다 — 잠금 카드 대신 무료 안내와
     회원 등급(추후 지원 예정)을 보여 주고, 입점 신청은 열어 둡니다. */
  function renderMemberPanel() {
    var box = $("#memberPanel");
    var main = $("#partnerMain");
    if (main) main.hidden = false;
    if (!box) return;
    var state = memberState();
    if (state.plan !== "none") {
      box.innerHTML =
        '<span class="member-state"><svg width="13" height="13"><use href="#ic-check"/></svg>' +
        esc(t("member.current")) +
        " · " +
        esc(t("member." + state.plan)) +
        "</span>" +
        '<p class="member-note">' +
        esc(t("member.upgrade")) +
        "</p>";
      renderUploads();
      return;
    }

    box.innerHTML =
      '<div class="section-head"><h2>' +
      esc(t("partner.plansTitle")) +
      "</h2></div>" +
      '<div class="lock-card free">' +
      '<span class="free-pill">' +
      esc(t("partner.freePill")) +
      "</span><h3>" +
      esc(t("member.freeTitle")) +
      "</h3><p>" +
      esc(t("member.freeBody")) +
      "</p></div>" +
      '<div class="plan-grid three">' +
      PLAN_ORDER.map(planBoxHtml).join("") +
      "</div>" +
      '<p class="member-note">' +
      esc(t("member.priceNote")) +
      "</p>";

    renderUploads();
  }

  /* ---------------- 찻집 회원 · 제조사 회원 업로드 ---------------- */
  function renderUploads() {
    var mount = $("#bizMount");
    if (!mount) return;
    var shop = canUploadShop();
    var prod = canUploadProduct();
    if (!shop && !prod) {
      mount.innerHTML =
        '<div class="section-head"><h2>' +
        esc(t("upload.soonTitle")) +
        '</h2></div><p class="member-note" style="margin-top:-6px">' +
        esc(t("upload.soonBody")) +
        "</p>";
      return;
    }
    mount.innerHTML =
      (shop
        ? '<div class="section-head"><h2>' +
          esc(t("upload.shopTitle")) +
          "</h2></div>" +
          '<p class="member-note" style="margin-top:-6px">' +
          esc(t("upload.shopLead")) +
          "</p>" +
          '<form class="form-card biz-form" id="shopForm" autocomplete="off">' +
          '<div class="field"><label for="upShopName">' +
          esc(t("upload.shopName")) +
          '</label><input id="upShopName" type="text" maxlength="80" required /></div>' +
          '<div class="field"><label for="upShopAddress">' +
          esc(t("upload.shopAddress")) +
          '</label><input id="upShopAddress" type="text" maxlength="200" required /></div>' +
          '<div class="field"><label for="upShopPlace">' +
          esc(t("upload.shopPlace")) +
          '</label><input id="upShopPlace" type="text" maxlength="200" /></div>' +
          '<div class="field"><label for="upShopHours">' +
          esc(t("upload.shopHours")) +
          '</label><input id="upShopHours" type="text" maxlength="120" placeholder="11:00-21:00" /></div>' +
          '<div class="field"><label for="upShopMenu">' +
          esc(t("upload.shopMenu")) +
          '</label><textarea id="upShopMenu" maxlength="600"></textarea></div>' +
          '<div class="field"><label for="upShopContact">' +
          esc(t("upload.shopContact")) +
          '</label><input id="upShopContact" type="text" maxlength="80" /></div>' +
          '<button class="btn btn-dark btn-block" type="submit">' +
          esc(t("upload.shopSubmit")) +
          "</button></form>"
        : '<p class="member-note">' + esc(t("member.gateShop")) + "</p>") +
      (prod
        ? '<div class="section-head"><h2>' +
          esc(t("upload.prodTitle")) +
          "</h2></div>" +
          '<p class="member-note" style="margin-top:-6px">' +
          esc(t("upload.prodLead")) +
          "</p>" +
          '<form class="form-card biz-form" id="bizForm" autocomplete="off">' +
          '<div class="field"><label for="bizName">' +
          esc(t("upload.prodName")) +
          '</label><input id="bizName" type="text" maxlength="80" required /></div>' +
          '<div class="form-grid">' +
          '<div class="field"><label for="bizKind">' +
          esc(t("upload.kind")) +
          '</label><select id="bizKind"><option value="leaf">' +
          esc(t("upload.kindLeaf")) +
          '</option><option value="bag">' +
          esc(t("upload.kindBag")) +
          '</option><option value="teaware">' +
          esc(t("upload.kindTeaware")) +
          "</option></select></div>" +
          '<div class="field"><label for="bizPrice">' +
          esc(t("upload.prodPrice")) +
          '</label><input id="bizPrice" type="number" min="0" inputmode="numeric" /></div>' +
          "</div>" +
          '<div class="form-grid">' +
          '<div class="field"><label for="bizWeight">' +
          esc(t("upload.prodWeight")) +
          '</label><input id="bizWeight" type="text" maxlength="30" placeholder="100g" /></div>' +
          '<div class="field"><label for="bizOrigin">' +
          esc(t("upload.prodOrigin")) +
          '</label><input id="bizOrigin" type="text" maxlength="80" /></div>' +
          "</div>" +
          '<div class="field"><label for="bizNote">' +
          esc(t("upload.prodNote")) +
          '</label><textarea id="bizNote" maxlength="300"></textarea></div>' +
          '<button class="btn btn-dark btn-block" type="submit">' +
          esc(t("upload.prodSubmit")) +
          "</button></form>"
        : '<p class="member-note">' + esc(t("member.gateProduct")) + "</p>");

    var shopForm = $("#shopForm");
    if (shopForm) shopForm.addEventListener("submit", submitShopProfile);
    var prodForm = $("#bizForm");
    if (prodForm) prodForm.addEventListener("submit", submitProduct);
  }

  function submitShopProfile(e) {
    e.preventDefault();
    if (!canUploadShop()) {
      toast(t("member.gateShop"));
      return;
    }
    var nameEl = $("#upShopName");
    var name = nameEl ? nameEl.value.trim() : "";
    if (!name) {
      if (nameEl) nameEl.focus();
      return;
    }
    var entry = {
      id: "sh" + Date.now().toString(36),
      shopName: name.slice(0, 80),
      address: ($("#upShopAddress") ? $("#upShopAddress").value.trim() : "").slice(0, 200),
      place: ($("#upShopPlace") ? $("#upShopPlace").value.trim() : "").slice(0, 200),
      hours: ($("#upShopHours") ? $("#upShopHours").value.trim() : "").slice(0, 120),
      menu: ($("#upShopMenu") ? $("#upShopMenu").value.trim() : "").slice(0, 600),
      contact: ($("#upShopContact") ? $("#upShopContact").value.trim() : "").slice(0, 80),
      plan: memberState().plan,
      createdAt: Date.now(),
      lang: lang()
    };
    var list = storeGet("teafai.shop_uploads.v1", []);
    if (!Array.isArray(list)) list = [];
    list.push(entry);
    storeSet("teafai.shop_uploads.v1", list);

    if (window.TeaFaiSupabase && window.TeaFaiSupabase.isConfigured && window.TeaFaiSupabase.isConfigured()) {
      window.TeaFaiSupabase.submitShopUpload(entry).then(function (res) {
        toast(res && res.ok ? t("upload.shopOk") : t("upload.shopFail"));
      });
    } else {
      toast(t("upload.shopOk"));
    }
    e.target.reset();
  }

  function submitProduct(e) {
    e.preventDefault();
    if (!canUploadProduct()) {
      toast(t("member.gateProduct"));
      return;
    }
    var nameEl = $("#bizName");
    var name = nameEl ? nameEl.value.trim() : "";
    if (!name) {
      if (nameEl) nameEl.focus();
      return;
    }
    var entry = {
      id: "pz" + Date.now().toString(36),
      name: name.slice(0, 80),
      kind: $("#bizKind") ? $("#bizKind").value : "leaf",
      price: $("#bizPrice") ? Number($("#bizPrice").value || 0) : 0,
      weight: $("#bizWeight") ? $("#bizWeight").value.trim().slice(0, 30) : "",
      origin: $("#bizOrigin") ? $("#bizOrigin").value.trim().slice(0, 80) : "",
      note: $("#bizNote") ? $("#bizNote").value.trim().slice(0, 300) : "",
      createdAt: Date.now(),
      lang: lang()
    };
    var list = storeGet("teafai.maker_products.v1", []);
    if (!Array.isArray(list)) list = [];
    list.push(entry);
    storeSet("teafai.maker_products.v1", list);

    if (window.TeaFaiSupabase && window.TeaFaiSupabase.isConfigured && window.TeaFaiSupabase.isConfigured()) {
      window.TeaFaiSupabase.submitMakerProduct(entry).then(function (res) {
        toast(res && res.ok ? t("upload.prodOk") : t("upload.prodFail"));
      });
    } else {
      toast(t("upload.prodOk"));
    }
    e.target.reset();
  }

  /* ---------------- 시작 ---------------- */
  function init() {
    bridge();
    var storeInput = $("#storeSearchInput");
    if (storeInput) {
      storeInput.addEventListener("input", function () {
        storeState.q = storeInput.value;
        storeState.bagId = null;
        renderStore();
      });
    }
    renderStore();
    renderLens();
    renderMemberPanel();
  }

  window.TeaFaiExtra = {
    init: init,
    renderStore: renderStore,
    renderLens: renderLens,
    renderMemberPanel: renderMemberPanel,
    openStoreFor: openStoreFor,
    openStoreForBag: openStoreForBag,
    unlocked: unlocked,
    canUploadShop: canUploadShop,
    canUploadProduct: canUploadProduct,
    memberState: memberState,
    rank: rank,
    checkPurchases: checkPurchases
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.setTimeout(init, 0);
    });
  } else {
    window.setTimeout(init, 0);
  }
})();
