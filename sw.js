/* 티키피디아 서비스 워커 — 앱 껍데기를 캐시해 오프라인에서도 열립니다
   (온라인일 때는 네트워크를 먼저 보고, 새 파일이 오면 캐시를 갱신합니다.
    data/ 아래 파트너·추천 데이터는 캐시를 먼저 주고 뒤에서 갱신하는
    stale-while-revalidate 로 두어, 앱을 다시 설치하지 않아도 내용이 바뀝니다) */
var CACHE = "teafai-v87";
var DATA_PREFIX = "data/";
var ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./i18n.js",
  "./supabase-adapter.js",
  "./data.js",
  "./data_yue.js",
  "./data_hi.js",
  "./data_th.js",
  "./data_vi.js",
  "./culture.js",
  "./app.js",
  "./features.js",
  "./manifest.webmanifest",
  "./privacy.html",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/logo_tea_mark.svg",
  "./icons/flags/ko.svg",
  "./icons/flags/en.svg",
  "./icons/flags/zh-CN.svg",
  "./icons/flags/zh-TW.svg",
  "./icons/flags/ja.svg",
  "./icons/flags/yue.svg",
  "./icons/flags/hi.svg",
  "./icons/flags/th.svg",
  "./icons/flags/vi.svg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(function (cache) {
        return cache.addAll(ASSETS);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.map(function (key) {
            if (key !== CACHE) return caches.delete(key);
            return null;
          })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("message", function (event) {
  if (event.data === "skip-waiting") self.skipWaiting();
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;

  var url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }
  if (url.origin !== self.location.origin) return;

  // 파트너·추천 데이터는 stale-while-revalidate (프리캐시에는 넣지 않습니다)
  if (url.pathname.indexOf(DATA_PREFIX) >= 0) {
    event.respondWith(
      caches.open(CACHE).then(function (cache) {
        return cache.match(req).then(function (hit) {
          var fresh = fetch(req, { cache: "no-store" })
            .then(function (res) {
              if (res && res.status === 200 && res.type === "basic") cache.put(req, res.clone());
              return res;
            })
            .catch(function () {
              return hit || Response.error();
            });
          if (hit) {
            event.waitUntil(fresh);
            return hit;
          }
          return fresh;
        });
      })
    );
    return;
  }

  // 화면 이동과 앱 파일은 네트워크 먼저, 실패하면 캐시
  event.respondWith(
    fetch(req, { cache: "no-cache" })
      .then(function (res) {
        if (res && res.status === 200 && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) {
            cache.put(req, copy);
          });
        }
        return res;
      })
      .catch(function () {
        return caches.match(req).then(function (hit) {
          if (hit) return hit;
          if (req.mode === "navigate") return caches.match("./index.html");
          return Response.error();
        });
      })
  );
});
