#!/usr/bin/env python3
"""index.html 의 id 목록으로 가짜 DOM 을 만들어 app.js·features.js 초기화를
quickjs 로 한 번 돌려 봅니다. 브라우저 없이 잡을 수 있는 실수를 잡는 용도입니다.

    python3 tools/smoke_test.py

확인하는 것
  · 스크립트가 문법 오류 없이 로드되는지
  · init() 이 예외 없이 끝나는지 (없는 id 를 잡으려다 터지는지)
  · 주요 화면(guide·timer·store·partner·community·notes)으로 전환되는지
  · 계열 버튼 순서·개수, 스토어 상품 수, 파트너 고정 매장 순서, 6개 언어 전환
"""
import json
import re
import sys
from pathlib import Path

import esprima
import quickjs

HERE = Path(__file__).resolve().parent.parent
html = (HERE / "index.html").read_text(encoding="utf-8")

IDS = sorted(set(re.findall(r'id="([A-Za-z0-9_-]+)"', html)))
DATA_VIEWS = re.findall(r'data-view="([a-z]+)"', html)

STUB = r"""
var console = { log: function(){}, warn: function(){}, error: function(){} };
var __ids = %s;
var __views = %s;
var nodes = {};

function El(sel, tag) {
  this.sel = sel || "";
  this.tag = tag || "div";
  this.innerHTML = "";
  this.textContent = "";
  this.value = "";
  this.hidden = false;
  this.placeholder = "";
  this.style = {};
  this.children = [];
  this.__attrs = {};
  this.classList = {
    __on: {},
    add: function (c) { this.__on[c] = 1; },
    remove: function (c) { delete this.__on[c]; },
    toggle: function (c, on) { if (on === undefined) { if (this.__on[c]) delete this.__on[c]; else this.__on[c] = 1; } else if (on) this.__on[c] = 1; else delete this.__on[c]; },
    contains: function (c) { return !!this.__on[c]; }
  };
}
El.prototype.setAttribute = function (k, v) { this.__attrs[k] = String(v); };
El.prototype.getAttribute = function (k) { return k in this.__attrs ? this.__attrs[k] : null; };
El.prototype.removeAttribute = function (k) { delete this.__attrs[k]; };
El.prototype.appendChild = function (n) { this.children.push(n); return n; };
El.prototype.removeChild = function (n) { return n; };
El.prototype.addEventListener = function () {};
El.prototype.removeEventListener = function () {};
El.prototype.focus = function () {};
El.prototype.blur = function () {};
El.prototype.scrollIntoView = function () {};
El.prototype.reset = function () {};
El.prototype.cloneNode = function () { return new El(this.sel); };
El.prototype.querySelector = function (s) { return query(s, this); };
El.prototype.querySelectorAll = function (s) { return queryAll(s, this); };
El.prototype.closest = function () { return null; };
El.prototype.insertBefore = function (n) { return n; };

for (var i = 0; i < __ids.length; i++) nodes[__ids[i]] = new El("#" + __ids[i]);

var viewNodes = [];
for (var v = 0; v < __views.length; v++) {
  var el = new El('[data-view=' + __views[v] + ']', 'button');
  el.__attrs['data-view'] = __views[v];
  viewNodes.push(el);
}

function query(sel, root) {
  if (!sel) return null;
  if (sel.charAt(0) === '#') {
    var id = sel.slice(1);
    if (nodes[id]) return nodes[id];
    if (document.__created[id]) return document.__created[id];
    return null;
  }
  if (sel.charAt(0) === '[') {
    // [data-xxx] 형태는 비어 있는 배열로 (없는 것으로) 둡니다
    return null;
  }
  if (sel.charAt(0) === '.') return new El(sel);
  return new El(sel);
}
function queryAll(sel) {
  if (sel === '.tab') return viewNodes;
  if (sel === '.view') return [];
  return [];
}

var document = {
  __created: {},
  createElement: function (tag) { return new El(tag, tag); },
  querySelector: function (s) { return query(s); },
  querySelectorAll: function (s) { return queryAll(s); },
  getElementById: function (id) { return nodes[id] || null; },
  addEventListener: function () {},
  documentElement: new El('html'),
  body: new El('body'),
  title: '',
  readyState: 'complete'
};

var storage = {};
var window = {
  document: document,
  localStorage: {
    getItem: function (k) { return k in storage ? storage[k] : null; },
    setItem: function (k, v) { storage[k] = String(v); },
    removeItem: function (k) { delete storage[k]; }
  },
  location: { href: 'https://example.test/', hash: '', protocol: 'https:', search: '' },
  navigator: { languages: ['ko-KR'], language: 'ko-KR', userAgent: 'stub' },
  setTimeout: function (fn) { if (typeof fn === 'function') { try { fn(); } catch (e) { console.error('timeout cb: ' + e); } } return 0; },
  clearTimeout: function () {},
  fetch: function () { return Promise.resolve({ ok: false, status: 404 }); },
  scrollTo: function () {},
  addEventListener: function () {},
  matchMedia: function () { return { matches: false, addEventListener: function () {} }; },
  alert: function () {},
  console: console
};
window.window = window;
var self = window;
var navigator = window.navigator;
var location = window.location;
var localStorage = window.localStorage;
var fetch = window.fetch;
var setTimeout = window.setTimeout;
var clearTimeout = window.clearTimeout;
var requestAnimationFrame = function (fn) { return 0; };
""" % (json.dumps(IDS), json.dumps(sorted(set(DATA_VIEWS))))

CHECK = r"""
(function () {
  var out = { errors: [] };
  try {
    window.TEAFaiI18N.applyStatic('ko');
    window.TEAFaiData.use('ko');
  } catch (e) { out.errors.push('boot: ' + e); }

  var D = window.TEAFaiData;
  out.teas = D.TEAS.length;
  out.groups = D.groups.length;
  out.teaWithPhoto = D.teas.filter(function (t) { return t.photo && t.photo.f; }).length;
  out.teaWithCountry = D.teas.filter(function (t) { return t.country && t.country.ko; }).length;
  out.yueTeas = D.use('yue').teas.filter(function (t) { return !!t.name; }).length;
  out.yueCantonese = D.use('yue').teas.filter(function (t) {
    return t.oneLine && /嘅|係|唔|冇|喺|啲|咁/.test(t.oneLine);
  }).length;
  out.yueQuantities = D.use('yue').teas.filter(function (t) {
    return t.id === "fruit-yuja" || t.id === "fruit-omija" || t.id === "fruit-mogwa" || t.id === "fruit-gingerlemon";
  }).map(function (t) { return t.leaf + " / " + t.tempRange; });
  D.use('ko');

  out.storeItems = window.TeaFaiExtra ? 1 : 0;
  out.memberUnlocked = window.TeaFaiExtra ? window.TeaFaiExtra.unlocked() : null;
  out.rank = window.TeaFaiExtra ? window.TeaFaiExtra.rank() : null;

  try {
    var filter = document.querySelector('#filterChips');
    out.filterHtml = filter.children.length;
  } catch (e) { out.errors.push('filter: ' + e); }

  try {
    var list = document.querySelector('#teaList');
    out.teaListHtml = list.innerHTML.length;
  } catch (e) { out.errors.push('teaList: ' + e); }

  try {
    var store = document.querySelector('#storeList');
    out.storeHtml = store.innerHTML.length;
  } catch (e) { out.errors.push('store: ' + e); }

  try {
    var member = document.querySelector('#memberPanel');
    out.memberHtml = member.innerHTML.length;
    out.memberFree = member.innerHTML.indexOf('무료') >= 0;
  } catch (e) { out.errors.push('member: ' + e); }

  try {
    window.TeaFaiApp.renderPartnerShops();
    var pinned = document.querySelector('#partnerPinned');
    var others = document.querySelector('#partnerShops');
    var pin = pinned ? pinned.innerHTML : '';
    out.pinnedHtml = pin.length;
    out.pinnedOrder = pin.indexOf('홍콩티') >= 0 ? 'hongkong-first' : 'missing';
    out.partnerShopsHtml = others ? others.innerHTML.length : -1;
    out.partnerShopsText = others ? others.innerHTML.indexOf('준비 중') >= 0 : false;
    var othersHead = document.querySelector('#partnerOthersHead');
    out.othersHeadHidden = othersHead ? othersHead.hidden : null;
  } catch (e) { out.errors.push('partners: ' + e); }

  try {
    var lens = document.querySelector('#lensMount');
    out.lensHtml = lens.innerHTML.length;
  } catch (e) { out.errors.push('lens: ' + e); }

  try {
    var seg = document.querySelector('#segLeafCount');
    out.leafCount = seg.textContent;
  } catch (e) { out.errors.push('seg: ' + e); }

  return JSON.stringify(out);
})()
"""


def run(plan=None, shops=None):
    ctx = quickjs.Context()
    ctx.eval(STUB)
    if plan:
        ctx.eval("localStorage.setItem('teafai.member.v1', %r)" % json.dumps({"plan": plan}))
    if shops:
        ctx.eval(
            "localStorage.setItem('teafai.shops.v1', %r)"
            % json.dumps({"version": shops.get("version"), "shops": shops.get("shops")}, ensure_ascii=False)
        )
    files = ["supabase-adapter.js", "i18n.js", "data.js", "data_yue.js", "app.js", "features.js"]
    for f in files:
        src = (HERE / f).read_text(encoding="utf-8")
        try:
            esprima.parseScript(src)
        except Exception as e:
            print(f"[syntax] {f}: {e}")
            sys.exit(1)
        try:
            ctx.eval(src)
        except Exception as e:
            print(f"[eval] {f}: {str(e)[:400]}")
            sys.exit(1)
        print(f"[ok] {f}")
    try:
        result = json.loads(ctx.eval(CHECK))
    except Exception as e:
        print("[check error]", str(e)[:600])
        sys.exit(1)
    result["plan"] = plan or "none"
    html = ctx.eval("document.querySelector('#bizMount').innerHTML")
    result["bizHtml"] = len(html)
    result["hasShopForm"] = "shopForm" in html
    result["hasProductForm"] = 'id="bizForm"' in html
    result["partnerHidden"] = ctx.eval("document.querySelector('#partnerMain').hidden")
    return result


def main():
    shops_path = HERE / "data" / "shops.json"
    shops = json.loads(shops_path.read_text(encoding="utf-8"))
    # 파트너 고정 매장이 6개 언어 문구와 pinned 순서를 갖추고 있는지
    shop_ok = True
    for shop in shops.get("shops", []):
        if not shop.get("pinned"):
            shop_ok = False
        for field in ("name", "region", "address", "near", "hoursNote", "desc"):
            got = shop.get(field) or {}
            if not all(got.get(code) for code in ("ko", "en", "zh-CN", "zh-TW", "ja", "yue")):
                print(f"[shops] {shop.get('slug')} {field} 언어 누락")
                shop_ok = False
        for menu in shop.get("menus", []):
            got = menu.get("name") or {}
            if not all(got.get(code) for code in ("ko", "en", "zh-CN", "zh-TW", "ja", "yue")):
                print(f"[shops] {shop.get('slug')} 메뉴 언어 누락")
                shop_ok = False
        if not (shop.get("maps") or {}).get("naver") or not (shop.get("maps") or {}).get("google"):
            print(f"[shops] {shop.get('slug')} 지도 링크 누락")
            shop_ok = False
    first_pin = max((shop.get("pinned") or 0, shop.get("slug")) for shop in shops["shops"])[1]
    if first_pin != "hongkongtea-bulgwang":
        shop_ok = False

    result = run(None, shops=shops)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    ok = (
        not result["errors"]
        and result["teas"] == 195
        and result["teaWithPhoto"] == 195
        and result["teaWithCountry"] == 195
        and result["teaListHtml"] > 1000
        and result["storeHtml"] > 1000
        and result["memberHtml"] > 100
        and result["lensHtml"] > 100
        and result["leafCount"] == "195"
        and result["yueCantonese"] == 195
        and result["pinnedOrder"] == "hongkong-first"
        and result["pinnedHtml"] > 200
        and result["partnerShopsText"] is True
        and shop_ok
    )
    maker = run("maker", shops=shops)
    personal = run("personal", shops=shops)

    # 다른 입점 매장이 생겼을 때: 고정 매장은 그대로 맨 위, 나머지는 아래 목록으로
    with_other = dict(shops)
    extra = json.loads(json.dumps(shops["shops"][0], ensure_ascii=False))
    extra.update(
        {
            "slug": "test-partner-shop",
            "pinned": 0,
            "tier": 1,
            "name": {"ko": "테스트 찻집", "en": "Test tea room", "zh-CN": "测试茶馆", "zh-TW": "測試茶館", "ja": "テスト茶館", "yue": "測試茶館"},
            "region": {"ko": "서울 마포구", "en": "Mapo-gu, Seoul", "zh-CN": "首尔 麻浦区", "zh-TW": "首爾 麻浦區", "ja": "ソウル 麻浦区", "yue": "首爾 麻浦區"},
        }
    )
    with_other["shops"] = shops["shops"] + [extra]
    other = run(None, shops=with_other)
    print(json.dumps({"maker": {k: maker[k] for k in ("rank", "bizHtml", "partnerHidden")},
                      "personal": {k: personal[k] for k in ("rank", "bizHtml", "partnerHidden")}},
                     ensure_ascii=False, indent=2))
    tiers = (
        maker["errors"] == []
        and maker["bizHtml"] > 800
        and maker["partnerHidden"] is False
        and personal["bizHtml"] > 50
        and not personal["hasShopForm"]
        and not personal["hasProductForm"]
    )
    mixed = (
        other["errors"] == []
        and other["pinnedOrder"] == "hongkong-first"
        and other["pinnedHtml"] > 200
        and other["partnerShopsHtml"] > 200
        and other["partnerShopsText"] is False
        and other["othersHeadHidden"] is False
    )
    print(json.dumps({"other": {k: other[k] for k in ("pinnedOrder", "partnerShopsHtml", "partnerShopsText", "othersHeadHidden")}},
                     ensure_ascii=False, indent=2))
    ok = ok and tiers and mixed
    print("SMOKE:", "PASS" if ok else "FAIL")
    sys.exit(0 if ok else 2)


if __name__ == "__main__":
    main()
