#!/usr/bin/env python3
"""index.html + CSS + JS를 하나로 합쳐 단일 HTML 파일을 만듭니다.

파트너·추천 데이터(data/shops.json, data/affiliate.json)는 단일 파일에서도
보이도록 <script id="teafai-seed" type="application/json"> 안에 함께 넣습니다.
온라인으로 열면 앱이 data/*.json을 먼저 읽고, 실패하면 이 내장 사본을 씁니다.
"""
import base64
import json
import re
from pathlib import Path

BASE = Path(__file__).parent
html = (BASE / "index.html").read_text(encoding="utf-8")
css = (BASE / "styles.css").read_text(encoding="utf-8")
data_js = (BASE / "data.js").read_text(encoding="utf-8")
data_yue_js = (BASE / "data_yue.js").read_text(encoding="utf-8")
data_hi_js = (BASE / "data_hi.js").read_text(encoding="utf-8")
data_th_js = (BASE / "data_th.js").read_text(encoding="utf-8")
data_vi_js = (BASE / "data_vi.js").read_text(encoding="utf-8")
culture_js = (BASE / "culture.js").read_text(encoding="utf-8")
i18n_js = (BASE / "i18n.js").read_text(encoding="utf-8")
app_js = (BASE / "app.js").read_text(encoding="utf-8")
features_js = (BASE / "features.js").read_text(encoding="utf-8")
supabase_js = (BASE / "supabase-adapter.js").read_text(encoding="utf-8")

# PWA 전용 태그는 단일 파일에서 뺍니다
html = re.sub(r'\s*<link rel="manifest"[^>]*>', "", html)
html = re.sub(r'\s*<link rel="apple-touch-icon"[^>]*>', "", html)
html = re.sub(r'\s*<link rel="icon"[^>]*>', "", html)

html = html.replace(
    '<link rel="stylesheet" href="styles.css" />',
    "<style>\n" + css + "\n</style>",
)

# 국기 SVG 는 i18n.js 의 mountSwitcher 가 <img> 로 그리므로 data URI 로 함께 품습니다
flags = {}
for code, fname in (("ko", "ko"), ("en", "en"), ("zh-CN", "zh-CN"), ("zh-TW", "zh-TW"), ("ja", "ja"), ("yue", "yue"), ("hi", "hi"), ("th", "th"), ("vi", "vi")):
    raw = (BASE / "icons" / "flags" / (fname + ".svg")).read_bytes()
    flags[code] = "data:image/svg+xml;base64," + base64.b64encode(raw).decode("ascii")
flag_js = "<script>window.TEAFaiFlags = " + json.dumps(flags) + ";</script>\n    "

html = html.replace(
    '<script src="supabase-adapter.js"></script>\n    <script src="i18n.js"></script>\n    <script src="data.js"></script>\n    <script src="data_yue.js"></script>\n    <script src="data_hi.js"></script>\n    <script src="data_th.js"></script>\n    <script src="data_vi.js"></script>\n    <script src="culture.js"></script>\n    <script src="app.js"></script>\n    <script src="features.js"></script>',
    flag_js
    + "<script>\n"
    + supabase_js
    + "\n</script>\n    <script>\n"
    + i18n_js
    + "\n</script>\n    <script>\n"
    + data_js
    + "\n</script>\n    <script>\n"
    + data_yue_js
    + "\n</script>\n    <script>\n"
    + data_hi_js
    + "\n</script>\n    <script>\n"
    + data_th_js
    + "\n</script>\n    <script>\n"
    + data_vi_js
    + "\n</script>\n    <script>\n"
    + culture_js
    + "\n</script>\n    <script>\n"
    + app_js
    + "\n</script>\n    <script>\n"
    + features_js
    + "\n</script>",
)
html = html.replace(
    "<title>티키피디아 — 차 백과 · 스토어</title>",
    "<title>티키피디아 — 차 백과 · 스토어 (단일 파일)</title>",
)

# 헤더의 茶 마크(SVG)는 단일 파일 혼자서도 보이도록 data URI로 품습니다
svg = (BASE / "icons" / "logo_tea_mark.svg").read_text(encoding="utf-8")
svg_uri = "data:image/svg+xml;base64," + base64.b64encode(svg.encode("utf-8")).decode("ascii")
html = html.replace('src="icons/logo_tea_mark.svg"', f'src="{svg_uri}"')

# 내장 데이터 사본
shops = json.loads((BASE / "data" / "shops.json").read_text(encoding="utf-8"))
affiliate = json.loads((BASE / "data" / "affiliate.json").read_text(encoding="utf-8"))
teabags = json.loads((BASE / "data" / "teabags.json").read_text(encoding="utf-8"))
plans = json.loads((BASE / "data" / "onboarding_plans.json").read_text(encoding="utf-8"))
news_path = BASE / "data" / "news.json"
news = json.loads(news_path.read_text(encoding="utf-8")) if news_path.exists() else None
seed = json.dumps(
    {
        "shops": shops.get("shops", []),
        "affiliate": affiliate,
        "teabags": teabags,
        "plans": plans,
        "news": news,
    },
    ensure_ascii=False,
    separators=(",", ":"),
)
seed = seed.replace("</", "<\\/")
html = re.sub(
    r'(<script id="teafai-seed" type="application/json">).*?(</script>)',
    lambda m: m.group(1) + seed + m.group(2),
    html,
    count=1,
    flags=re.S,
)

out = BASE / "tea_fai_app_standalone.html"
out.write_text(html, encoding="utf-8")
print(f"wrote {out} ({len(html):,} bytes)")
