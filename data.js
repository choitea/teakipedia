/* ============================================================
   티키피디아(Teakipedia) — 차 백과 & 우림 타이머
   수록 데이터 출처
   · 《찻잎의 시간, 오늘의 한 잔》 (최티) — 1~6장, 부록 1·2
   · 《최초의 가향 홍차 — 얼그레이의 모든 것》 (최티) — 1~6장, 부록 1·2
   책에 적힌 수치와 서술만 옮겨 정리했습니다. 없는 값은 만들지 않았습니다.
   · 계열 6종 + 품종 34종을 한국어·영어·중국어(간체/번체)로 수록
   ============================================================ */
window.TEAFaiData = (function () {
  "use strict";

  var LANGS = ["ko", "en", "zh-CN", "zh-TW", "ja", "yue"];

  /* 광동어(yue)는 아직 차별 문구를 따로 쓰지 않았습니다. 번체 중국어 문구를 그대로 쓰고,
     없는 항목은 영어까지 내려갑니다(화면이 비지 않게). */
  var LANG_CHAIN = {
    ko: ["ko", "en"],
    en: ["en", "ko"],
    "zh-CN": ["zh-CN", "zh-TW", "en"],
    "zh-TW": ["zh-TW", "zh-CN", "en"],
    ja: ["ja", "en"],
    yue: ["yue", "zh-TW", "zh-CN", "en"]
  };

  /* 계열 이름은 일본어를 따로 적어 둡니다(차별 설명은 영어로 내려갑니다) */
  var JA_GROUP_LINES = {
    green: "摘んだあと24時間でほぼすべてが決まる、時間との勝負。",
    white: "萎凋して乾かす、それだけ。だから葉の質がそのまま出る。",
    yellow: "悶黄というひと工程が生むやわらかな甘み。六大茶類で最も希少。",
    oolong: "狙ったところで正確に止める半発酵の芸術。",
    black: "完全発酵。赤い水色とミルクに負けない力はここから生まれる。",
    dark: "時間が保存期間ではなく材料になるお茶。",
    everyday: "穀物・根・実を炒るか乾かして淹れる一杯と、花や葉をそのまま淹れるハーブティー。カフェインなしで一日のそばに。",
    traditional: "根・実・砂糖漬けを煮出した韓国の茶。体を温め、気を整える一杯。",
  };

  var JA_GROUPS = {
    green: "緑茶",
    white: "白茶",
    yellow: "黄茶",
    oolong: "烏龍茶",
    black: "紅茶",
    dark: "黒茶・プーアル茶",
    everyday: "代用茶・ハーブティー",
    traditional: "伝統茶",
  };

  /* ---------------- 계열 (6) ---------------- */
  var GROUPS = [
    {
      id: "green",
      kind: "group",
      hanja: "綠",
      sub: "Green Tea",
      accent: "#4F7A4A",
      accentSoft: "#E7EEDF",
      temp: 75,
      tempRange: "70~80℃",
      leaf: "2~3g",
      water: "200ml",
      steeps: [90, 30, 60],
      maxSteep: 3,
      oxidationValue: 0,
      ko: {
        name: "녹차",
        oneLine: "딴 뒤 24시간 안에 모든 것이 결정되는, 시간과의 싸움.",
        oxidation: "0%",
        ratioNote: "150ml에 2~3g — 티스푼 한 스푼 남짓",
        rounds: "3~4회",
        steepBasis: "책 기준 포다 1분~1분 30초, 두 번째 30초, 세 번째 1분. 우린 잎은 바로 건집니다.",
        process:
          "위조 → 살청(덖음 또는 증청) → 유념 → 건조. 산화 단계가 없습니다. 솥에 덖으면 구수한 고소함이, 수증기로 찌면 해조류 같은 향과 감칠맛이 남습니다.",
        varieties: ["용정차(서호)", "센차·마차·교쿠로", "하동·보성·제주 녹차"],
        flavor:
          "아미노산의 감칠맛, 카테킨의 옅은 떫은맛, 클로로필의 풋풋함이 균형을 이룰 때 “봄이 입안에 있다”고 말합니다. 덖음차는 구운 콩·볶은 곡물 쪽, 증청차는 해조류·풀잎 쪽으로 향이 갑니다.",
        pairing:
          "회, 초밥, 흰살생선 구이, 나물, 두부 요리. 기름진 고기나 크림 많은 디저트와는 부딪힙니다. 곁들일 것이 필요하면 견과류·약과처럼 기름기 적은 단맛이 좋습니다.",
        keep:
          "유통기한보다 제조일을 봅니다. 제조 후 6개월 안, 개봉 후 한 달 안이 이상적입니다. 빛을 막는 질소 충전 알루미늄 파우치를 고르고, 개봉 후에는 작은 밀폐 용기에 담아 냄새 없는 냉장고 채소칸에 둡니다. 100g에 1만~3만원대가 일상적으로 좋은 차를 마시는 구간입니다.",
        brewTip:
          "끓인 물을 다른 컵에 한 번 옮겨 부으면 대략 80도. 잎을 넣고 자리를 떠나지 말고, 시간이 되면 바로 건져야 떫어지지 않습니다.",
        keywords: "용정 센차 마차 하동 보성 제주 우전 세작 덖음 증청 아가리 냉침 감칠맛"
      },
      en: {
        name: "Green tea",
        oneLine: "Everything is decided within 24 hours of picking — a race against time.",
        oxidation: "0%",
        ratioNote: "2–3 g to 150 ml — a little more than a level teaspoon",
        rounds: "3–4 infusions",
        steepBasis:
          "By the book: 1 to 1½ minutes for the first infusion, 30 seconds for the second, 1 minute for the third. Lift the leaves out as soon as the time is up.",
        process:
          "Withering → firing (pan-firing or steaming) → rolling → drying. There is no oxidation step. Pan-firing leaves a toasted, nutty sweetness; steaming leaves a seaweed-like aroma and savoury umami.",
        varieties: ["West Lake Longjing", "Sencha, matcha, gyokuro", "Hadong, Boseong and Jeju green teas"],
        flavor:
          "When the umami of amino acids, the faint astringency of catechins and the green freshness of chlorophyll are in balance, people say “spring is in the mouth.” Pan-fired teas lean toward roasted soy and toasted grain; steamed teas toward seaweed and cut grass.",
        pairing:
          "Sashimi, sushi, grilled white fish, namul herbs and tofu. It clashes with fatty meat and cream-heavy desserts; if you want something alongside, choose a low-fat sweetness such as nuts or yakgwa.",
        keep:
          "Look at the production date rather than the expiry date. Ideally within 6 months of production and a month of opening. Choose a light-blocking, nitrogen-flushed aluminium pouch, then keep it in a small airtight tin in the odour-free vegetable drawer of the fridge.",
        brewTip:
          "Pour boiling water into another cup first and it lands near 80 °C. Don't walk away once the leaves are in, and lift them out the moment the time is up.",
        keywords: "longjing sencha matcha hadong boseong jeju ujeon sejack pan-fired steamed umami"
      },
      "zh-CN": {
        name: "绿茶",
        oneLine: "采下后24小时内一切就已决定——与时间的赛跑。",
        oxidation: "0%",
        ratioNote: "150毫升水配2~3克——约一平茶匙多一点",
        rounds: "3~4泡",
        steepBasis: "按书中的标准：第一泡1分钟~1分30秒，第二泡30秒，第三泡1分钟。泡完立即把茶叶取出。",
        process:
          "萎凋 → 杀青（炒青或蒸青）→ 揉捻 → 干燥。没有发酵环节。炒青留下烘烤般的坚果香，蒸青则留下海苔般的香气与鲜味。",
        varieties: ["西湖龙井", "煎茶、抹茶、玉露", "河东、宝城、济州绿茶"],
        flavor:
          "氨基酸的鲜味、儿茶素淡淡的涩感、叶绿素的青草气三者平衡时，人们会说“春天在口中”。炒青茶香气偏向炒豆与焙谷，蒸青茶偏向海苔与青草。",
        pairing:
          "生鱼片、寿司、白身鱼烧烤、野菜、豆腐料理。与油腻的肉类或奶油多的甜点相冲。若想配点心，坚果、药果这类油脂少的甜味更合适。",
        keep:
          "看生产日期而不是保质期。生产后6个月内、开封后一个月内最理想。选避光的充氮铝箔袋，开封后装入小密封罐，放在无异味的冰箱蔬菜格。",
        brewTip: "把沸水先倒入另一个杯子再冲，水温大约80度。放茶后不要离开，时间一到立即取出茶叶，才不会变涩。",
        keywords: "龙井 煎茶 抹茶 河东 宝城 济州 雨前 雀舌 炒青 蒸青 冷泡 鲜味"
      },
      "zh-TW": {
        name: "綠茶",
        oneLine: "採下後24小時內一切就已決定——與時間的賽跑。",
        oxidation: "0%",
        ratioNote: "150毫升水配2~3公克——約一平茶匙多一點",
        rounds: "3~4泡",
        steepBasis: "依書中標準：第一泡1分鐘~1分30秒，第二泡30秒，第三泡1分鐘。泡完立即取出茶葉。",
        process:
          "萎凋 → 殺菁（炒菁或蒸菁）→ 揉捻 → 乾燥。沒有發酵環節。炒菁留下烘烤般的堅果香，蒸菁則留下海苔般的香氣與鮮味。",
        varieties: ["西湖龍井", "煎茶、抹茶、玉露", "河東、寶城、濟州綠茶"],
        flavor:
          "胺基酸的鮮味、兒茶素淡淡的澀感、葉綠素的青草氣三者平衡時，人們會說「春天在口中」。炒菁茶香氣偏向炒豆與焙穀，蒸菁茶偏向海苔與青草。",
        pairing:
          "生魚片、壽司、白身魚燒烤、野菜、豆腐料理。與油膩的肉類或奶油多的甜點相衝。若想配點心，堅果、藥果這類油脂少的甜味更合適。",
        keep:
          "看製造日期而不是有效期限。製造後6個月內、開封後一個月內最理想。選避光的充氮鋁箔袋，開封後裝入小密封罐，放在無異味的冰箱蔬果格。",
        brewTip: "把沸水先倒入另一個杯子再沖，水溫大約80度。放茶後不要離開，時間一到立即取出茶葉，才不會變澀。",
        keywords: "龍井 煎茶 抹茶 河東 寶城 濟州 雨前 雀舌 炒菁 蒸菁 冷泡 鮮味"
      },
      yue: {
        "name": "綠茶",
        "oneLine": "採落嚟24個鐘內就決定晒——同時間鬥快。",
        "oxidation": "0%",
        "ratioNote": "150毫升水配2~3克——大約一平茶匙多啲",
        "rounds": "3~4泡",
        "steepBasis": "照書嘅標準：頭泡1分鐘~1分30秒，第二泡30秒，第三泡1分鐘。沖完即刻攞返茶葉出嚟。",
        "process": "萎凋 → 殺菁（炒菁或者蒸菁）→ 揉捻 → 乾燥。冇發酵呢一環。炒菁留低烘烤般嘅果仁香，蒸菁就留低紫菜般嘅香氣同鮮味。",
        "varieties": ["西湖龍井", "煎茶、抹茶、玉露", "河東、寶城、濟州綠茶"],
        "flavor": "胺基酸嘅鮮味、兒茶素淡淡嘅澀、葉綠素嘅青草氣，三者平衡嗰陣，人就會話「春天喺口入面」。炒菁茶香氣偏向炒豆同焙穀，蒸菁茶偏向紫菜同青草。",
        "pairing": "刺身、壽司、白身魚燒烤、野菜、豆腐料理。同油膩嘅肉或者多奶油嘅甜品相衝。想配點心，果仁、藥果呢類少油嘅甜嘢會啱啲。",
        "keep": "睇製造日期，唔係睇到期日。製造後6個月內、開封後一個月內最理想。揀避光嘅充氮鋁箔袋，開封後裝入細密封罐，放喺無異味嘅雪櫃蔬果格。",
        "brewTip": "將滾水先倒入另一個杯再沖，水溫大約80度。放茶之後唔好走開，時間一到即刻攞返茶葉出嚟，咁就唔會澀。",
        "keywords": "龍井 煎茶 抹茶 河東 寶城 濟州 雨前 雀舌 炒菁 蒸菁 冷泡 鮮味",
      }
    },
    {
      id: "white",
      kind: "group",
      hanja: "白",
      sub: "White Tea",
      accent: "#8B7B4F",
      accentSoft: "#EFE8D5",
      temp: 85,
      tempRange: "80~90℃",
      leaf: "3~4g",
      water: "200ml",
      steeps: [120, 60, 120],
      maxSteep: 3,
      oxidationValue: 8,
      ko: {
        name: "백차",
        oneLine: "위조하고 말린다. 그게 전부라서 잎의 품질이 그대로 드러난다.",
        oxidation: "5~10%",
        ratioNote: "은침은 3g, 수미처럼 잎이 두꺼우면 4g",
        rounds: "4~5회",
        steepBasis: "책 기준 포다 1분 30초~2분, 두 번째 1분, 세 번째 2분. 오래 두어도 쉽게 떫어지지 않습니다.",
        process:
          "위조 → 건조. 유념도 살청도 인위적 산화도 없습니다. 24~48시간 자연 위조 후 40~50도의 낮은 열로 천천히 말리며, 저장 중에도 아주 느린 산화가 이어집니다.",
        varieties: ["백호은침(싹만)", "백모단(싹 하나에 잎 두 장)", "수미·공미(잎 위주)", "운남 월광백"],
        flavor:
          "국물은 아주 연한 살구빛, 향은 은방울꽃·라일락에 가깝습니다. 떫은맛이 거의 없고 단맛이 길게 남습니다. 1~2년이면 대추와 꿀이 더해지고, 3년부터 약재 향, 5~7년이면 짙은 호박색이 됩니다.",
        pairing:
          "은침은 견과·대추·밤, 백모단은 담백한 생선과 닭고기, 수미는 전·튀김·고기 요리와 맞습니다. 노백차에 대추와 진피를 넣어 약한 불로 끓이면 겨울을 데우는 차가 됩니다.",
        keep:
          "상온에서 직사광선을 피하고 습도 50~60%를 지킵니다. 냉장고는 습기와 냄새, 꺼낼 때의 결로 때문에 피합니다. 초보자는 밀봉해 두는 편이 안전합니다. 이름보다 잎의 상태(은백색 털이 남고 색이 고른지)를 봅니다.",
        brewTip:
          "잎이 물 위에 뜨므로 물을 먼저 붓고 잎을 넣거나, 30초 뒤 찻숟가락으로 가볍게 저어 줍니다. 은침은 80~85도, 수미는 90도가 좋습니다.",
        keywords: "백호은침 백모단 수미 공미 노백차 월광백 복정 정화 대추 약재 숙성"
      },
      en: {
        name: "White tea",
        oneLine: "Wither and dry — that is all, so the quality of the leaf shows through untouched.",
        oxidation: "5–10%",
        ratioNote: "3 g for Silver Needle; 4 g when the leaf is thick, as with Shou Mei",
        rounds: "4–5 infusions",
        steepBasis:
          "By the book: 1½ to 2 minutes for the first infusion, 1 minute for the second, 2 minutes for the third. It turns bitter only slowly.",
        process:
          "Withering → drying. No rolling, no firing, no deliberate oxidation. After 24–48 hours of natural withering the leaf is dried slowly at a low 40–50 °C, and a very slow oxidation continues in storage.",
        varieties: ["Silver Needle (buds only)", "White Peony (one bud, two leaves)", "Shou Mei and Gong Mei (leaf)", "Yunnan Moonlight White"],
        flavor:
          "The liquor is a very pale apricot and the aroma sits close to lily of the valley and lilac. Almost no astringency, a long sweetness. Dates and honey join in at one or two years; a medicinal note from three; a deep amber by five to seven.",
        pairing:
          "Silver Needle with nuts, dates and chestnuts; White Peony with light fish and chicken; Shou Mei with pancakes, fritters and meat. Simmer aged white tea with dates and dried tangerine peel and it warms a winter evening.",
        keep:
          "Room temperature, out of direct sun, at 50–60% humidity. Avoid the fridge — moisture, odours and condensation each time you open it. For a beginner, sealed is safer. Look at the leaf rather than the name: silvery down, even colour.",
        brewTip:
          "The leaf floats, so pour the water first and add the leaf, or stir gently with a tea spoon after 30 seconds. Silver Needle likes 80–85 °C; Shou Mei, 90 °C.",
        keywords: "silver needle white peony shou mei gong mei aged white moonlight zhenghe fuding date medicinal"
      },
      "zh-CN": {
        name: "白茶",
        oneLine: "萎凋后晒干，如此而已，所以叶子的品质一览无遗。",
        oxidation: "5~10%",
        ratioNote: "银针3克，寿眉这种叶厚的则用4克",
        rounds: "4~5泡",
        steepBasis: "按书中的标准：第一泡1分30秒~2分钟，第二泡1分钟，第三泡2分钟。放久了也不易变涩。",
        process:
          "萎凋 → 干燥。没有揉捻，没有杀青，也没有人为发酵。自然萎凋24~48小时后，以40~50度的低温慢慢烘干，储存中仍持续极缓慢的发酵。",
        varieties: ["白毫银针（只用芽）", "白牡丹（一芽两叶）", "寿眉、贡眉（以叶为主）", "云南月光白"],
        flavor:
          "茶汤颜色极淡的杏色，香气接近铃兰与丁香。几乎没有涩味，甜味悠长。存放1~2年多了枣香与蜜香，3年起有药香，5~7年转为深琥珀色。",
        pairing:
          "银针配坚果、红枣、栗子；白牡丹配清淡的鱼与鸡肉；寿眉配煎饼、油炸与肉类料理。老白茶加红枣与陈皮小火煮，是冬天的暖身茶。",
        keep:
          "常温避直射光，湿度保持50~60%。避免冰箱，因为湿气、异味以及取出时的结露都不利。新手密封保存更安全。看叶子的状态比看名字可靠。",
        brewTip: "叶子会浮在水面，所以先注水再放茶，或30秒后用茶匙轻轻拨动。银针80~85度，寿眉90度较好。",
        keywords: "白毫银针 白牡丹 寿眉 贡眉 老白茶 月光白 政和 福鼎 红枣 药香 陈化"
      },
      "zh-TW": {
        name: "白茶",
        oneLine: "萎凋後晒乾，如此而已，所以葉子的品質一覽無遺。",
        oxidation: "5~10%",
        ratioNote: "銀針3公克，壽眉這種葉厚的則用4公克",
        rounds: "4~5泡",
        steepBasis: "依書中標準：第一泡1分30秒~2分鐘，第二泡1分鐘，第三泡2分鐘。放久了也不易變澀。",
        process:
          "萎凋 → 乾燥。沒有揉捻，沒有殺菁，也沒有人為發酵。自然萎凋24~48小時後，以40~50度的低溫慢慢烘乾，儲存中仍持續極緩慢的發酵。",
        varieties: ["白毫銀針（只用芽）", "白牡丹（一芽兩葉）", "壽眉、貢眉（以葉為主）", "雲南月光白"],
        flavor:
          "茶湯顏色極淡的杏色，香氣接近鈴蘭與丁香。幾乎沒有澀味，甜味悠長。存放1~2年多了棗香與蜜香，3年起有藥香，5~7年轉為深琥珀色。",
        pairing:
          "銀針配堅果、紅棗、栗子；白牡丹配清淡的魚與雞肉；壽眉配煎餅、油炸與肉類料理。老白茶加紅棗與陳皮小火煮，是冬天的暖身茶。",
        keep:
          "常溫避直射光，濕度保持50~60%。避免冰箱，因為濕氣、異味以及取出時的結露都不利。新手密封保存更安全。看葉子的狀態比看名字可靠。",
        brewTip: "葉子會浮在水面，所以先注水再放茶，或30秒後用茶匙輕輕撥動。銀針80~85度，壽眉90度較好。",
        keywords: "白毫銀針 白牡丹 壽眉 貢眉 老白茶 月光白 政和 福鼎 紅棗 藥香 陳化"
      },
      yue: {
        "name": "白茶",
        "oneLine": "萎凋之後曬乾，就係咁多，所以葉嘅質素一睇就知。",
        "oxidation": "5~10%",
        "ratioNote": "銀針3克，壽眉呢類葉厚嘅就用4克",
        "rounds": "4~5泡",
        "steepBasis": "照書嘅標準：頭泡1分30秒~2分鐘，第二泡1分鐘，第三泡2分鐘。放耐咗都唔容易澀。",
        "process": "萎凋 → 乾燥。冇揉捻，冇殺菁，亦都冇人工發酵。自然萎凋24~48個鐘之後，用40~50度低溫慢慢烘乾，存緊嘅時候仲會繼續極緩慢咁發酵。",
        "varieties": ["白毫銀針（淨係用芽）", "白牡丹（一芽兩葉）", "壽眉、貢眉（以葉為主）", "雲南月光白"],
        "flavor": "茶湯顏色極淡嘅杏色，香氣接近鈴蘭同丁香。幾乎冇澀味，甜味悠長。放1~2年多咗棗香同蜜香，3年起有藥香，5~7年轉做深琥珀色。",
        "pairing": "銀針配果仁、紅棗、栗子；白牡丹配清淡嘅魚同雞肉；壽眉配煎餅、油炸同肉類料理。老白茶加紅棗同陳皮細火煲，係冬天暖身茶。",
        "keep": "室溫避直射光，濕度保持50~60%。唔好放雪櫃，因為濕氣、異味同拎出嚟嗰陣嘅結露都唔好。新手密封保存穩陣啲。睇葉嘅狀態比睇名可靠。",
        "brewTip": "葉會浮喺水面，所以先注水再放茶，或者30秒後用茶匙輕輕撥一撥。銀針80~85度，壽眉90度好啲。",
        "keywords": "白毫銀針 白牡丹 壽眉 貢眉 老白茶 月光白 政和 福鼎 紅棗 藥香 陳化",
      }
    },
    {
      id: "yellow",
      kind: "group",
      hanja: "黃",
      sub: "Yellow Tea",
      accent: "#A98B2E",
      accentSoft: "#F3EBCE",
      temp: 85,
      tempRange: "80~85℃",
      leaf: "3g",
      water: "200ml",
      steeps: [90, 60, 90],
      maxSteep: 3,
      oxidationValue: 15,
      ko: {
        name: "황차",
        oneLine: "민황이라는 한 단계가 만드는 부드러운 단맛 — 육대다류 가운데 가장 희귀한 차.",
        oxidation: "10~20%",
        ratioNote: "200ml에 3g, 유리잔이면 물을 먼저",
        rounds: "3~4회",
        steepBasis: "책 기준 80~85도에서 1~1분 30초, 2포 1분, 3포 1~1분 30초. 뜨거우면 민황의 단맛이 사라집니다.",
        process:
          "살청(덖음 또는 증청) → 민황 → 건조. 덖거나 찐 잎을 아직 따뜻할 때 더미로 모아 두어 스스로 누렇게 익게 하는 민황이 황차의 핵심 공정입니다.",
        varieties: ["군산은침(군산도)", "몽정황아(쓰촨 몽정산)", "곽산황아(안후이 곽산)"],
        flavor:
          "녹차의 풋풋함과 백차의 부드러움이 만나는 지점. 구운 곡물·버터·삶은 옥수수 같은 단맛이 나고 떫은맛은 거의 없습니다. 물색은 연한 노란빛입니다.",
        pairing: "담백한 생선찜, 죽, 달걀 요리, 은행, 견과. 매콤한 요리와는 향이 가려집니다.",
        keep:
          "개봉 후 한 달 안. 민황을 거친 잎은 습기에 약하므로 밀봉해 냉장하고, 꺼낼 때 결로를 피합니다.",
        brewTip:
          "80~85도. 끓는 물을 그대로 붓지 말고 다른 컵에 한 번 옮겨 식힌 뒤 부으세요. 잎이 뜨면 30초 뒤 가볍게 눌러 줍니다.",
        keywords: "황차 민황 군산은침 몽정황아 곽산황아 육대다류 희귀차 노란차"
      },
      en: {
        name: "Yellow tea",
        oneLine: "One extra step — sealed yellowing — gives the softest sweetness of the six tea families, and the rarest of them.",
        oxidation: "10–20%",
        ratioNote: "3 g to 200 ml; water first in a glass",
        rounds: "3–4 infusions",
        steepBasis: "By the book: 80–85 °C for 1 to 1½ minutes, then 1 minute, then 1 to 1½. Too hot and the yellowed sweetness disappears.",
        process:
          "Firing (pan or steam) → menhuang (sealed yellowing) → drying. The fired leaf is piled while still warm and left to turn yellow on its own; that resting step is what makes a yellow tea.",
        varieties: ["Junshan Yinzhen (Junshan Island)", "Mengding Huangya (Mount Mengding, Sichuan)", "Huoshan Huangya (Huoshan, Anhui)"],
        flavor:
          "Where green tea's freshness meets white tea's softness: roasted grain, butter and boiled corn, with almost no astringency. The liquor is pale yellow.",
        pairing: "Steamed fish, congee, egg dishes, ginkgo nuts, nuts. Spicy food buries the aroma.",
        keep: "Within a month of opening. Yellowed leaf hates damp, so seal it and keep it cold, and let it come up to room temperature sealed.",
        brewTip:
          "80–85 °C. Don't pour straight off the boil; move the water to another cup first. If the leaf floats, press it down gently after 30 seconds.",
        keywords: "yellow tea menhuang junshan yinzhen mengding huangya huoshan six tea families rare"
      },
      "zh-CN": {
        name: "黄茶",
        oneLine: "多一道“闷黄”，就有了六大茶类里最柔和的甜——也是最稀有的一类。",
        oxidation: "10~20%",
        ratioNote: "200毫升配3克，玻璃杯则先注水",
        rounds: "3~4泡",
        steepBasis: "按书中的标准：80~85度泡1~1分30秒，第二泡1分钟，第三泡1~1分30秒。水太热闷黄的甜就没了。",
        process:
          "杀青（炒或蒸）→ 闷黄 → 干燥。把还温热的叶子堆起来盖上，让它自己转黄，这道闷黄正是黄茶的关键。",
        varieties: ["君山银针（君山岛）", "蒙顶黄芽（四川蒙顶山）", "霍山黄芽（安徽霍山）"],
        flavor: "绿茶的新鲜与白茶的柔和在这里相遇：炒谷、黄油、煮玉米般的甜，几乎没有涩味。汤色浅黄。",
        pairing: "清蒸鱼、粥、蛋类料理、白果、坚果。辛辣的菜会盖住香气。",
        keep: "开封后一个月内。闷黄的叶子怕潮，密封冷藏，取出时保持密封以免结露。",
        brewTip: "80~85度。不要直接用沸水，先倒到另一个杯子降温。叶子浮起时30秒后轻轻压一下。",
        keywords: "黄茶 闷黄 君山银针 蒙顶黄芽 霍山黄芽 六大茶类 稀有"
      },
      "zh-TW": {
        name: "黃茶",
        oneLine: "多一道「悶黃」，就有了六大茶類裡最柔和的甜——也是最稀有的一類。",
        oxidation: "10~20%",
        ratioNote: "200毫升配3公克，玻璃杯則先注水",
        rounds: "3~4泡",
        steepBasis: "依書中標準：80~85度泡1~1分30秒，第二泡1分鐘，第三泡1~1分30秒。水太熱悶黃的甜就沒了。",
        process:
          "殺菁（炒或蒸）→ 悶黃 → 乾燥。把還溫熱的葉子堆起來蓋上，讓它自己轉黃，這道悶黃正是黃茶的關鍵。",
        varieties: ["君山銀針（君山島）", "蒙頂黃芽（四川蒙頂山）", "霍山黃芽（安徽霍山）"],
        flavor: "綠茶的新鮮與白茶的柔和在這裡相遇：炒穀、奶油、煮玉米般的甜，幾乎沒有澀味。湯色淺黃。",
        pairing: "清蒸魚、粥、蛋類料理、白果、堅果。辛辣的菜會蓋住香氣。",
        keep: "開封後一個月內。悶黃的葉子怕潮，密封冷藏，取出時保持密封以免結露。",
        brewTip: "80~85度。不要直接用沸水，先倒到另一個杯子降溫。葉子浮起時30秒後輕輕壓一下。",
        keywords: "黃茶 悶黃 君山銀針 蒙頂黃芽 霍山黃芽 六大茶類 稀有"
      },
      yue: {
        "name": "黃茶",
        "oneLine": "多一道「悶黃」，就有六大茶類入面最柔和嘅甜——亦都係最稀有嘅一類。",
        "oxidation": "10~20%",
        "ratioNote": "200毫升配3克，玻璃杯就先注水",
        "rounds": "3~4泡",
        "steepBasis": "照書嘅標準：80~85度沖1~1分30秒，第二泡1分鐘，第三泡1~1分30秒。水太熱悶黃嘅甜就冇咗。",
        "process": "殺菁（炒或者蒸）→ 悶黃 → 乾燥。將仲暖嘅葉堆埋冚住，等佢自己轉黃，呢道悶黃就係黃茶嘅關鍵。",
        "varieties": ["君山銀針（君山島）", "蒙頂黃芽（四川蒙頂山）", "霍山黃芽（安徽霍山）"],
        "flavor": "綠茶嘅新鮮同白茶嘅柔和喺呢度相遇：炒穀、奶油、烚粟米般嘅甜，幾乎冇澀味。湯色淺黃。",
        "pairing": "清蒸魚、粥、蛋類料理、白果、果仁。辣嘅菜會蓋過香氣。",
        "keep": "開封後一個月內。悶黃嘅葉怕潮，密封冷藏，拎出嚟嗰陣保持密封以免結露。",
        "brewTip": "80~85度。唔好直接用滾水，先倒去另一個杯降溫。葉浮起就30秒後輕輕壓一壓。",
        "keywords": "黃茶 悶黃 君山銀針 蒙頂黃芽 霍山黃芽 六大茶類 稀有",
      }
    },    {
      id: "oolong",
      kind: "group",
      hanja: "烏",
      sub: "Oolong Tea",
      accent: "#B97A3D",
      accentSoft: "#F6E7D7",
      temp: 95,
      tempRange: "90~95℃",
      leaf: "5~7g",
      water: "200ml",
      steeps: [45, 20, 30],
      maxSteep: 3,
      oxidationValue: 45,
      ko: {
        name: "우롱차",
        oneLine: "원하는 지점에서 정확히 멈추는 반발효의 예술.",
        oxidation: "15~70%",
        ratioNote: "개완 5~7g에 110ml, 서양식 찻잔 5g에 300ml",
        rounds: "7~10회",
        steepBasis: "책 기준 첫 물 30초~1분, 이어서 20초·30초·45초로 늘려 갑니다. 짧게 여러 번이 원칙입니다.",
        process:
          "위조 → 요청(4~8회 이상) → 살청 → 유념 → 건조 → 배화. 잎끼리 부딪혀 가장자리만 산화되는 ‘녹엽홍양변’이 우롱차의 핵심입니다.",
        varieties: ["동방미인", "대만 고산차(아리산·산린시·리산)", "무이암차(대홍포·수선·육계)", "안시 철관음"],
        flavor:
          "동방미인은 꿀과 잘 익은 복숭아, 고산차는 난초·크림 같은 청량함, 무이암차는 구운 곡물·코코아에 미네랄감(암운), 철관음은 난초 향과 끝의 옅은 떫은맛입니다.",
        pairing:
          "구운 고기, 치즈, 과일과 잘 맞습니다. 우롱 밀크티는 철관음 8g을 95도 200ml에 4분 진하게 우리고 우유 150ml를 더합니다. 우롱 하이볼은 우롱 60ml에 위스키 45ml, 탄산수 90ml.",
        keep:
          "청향 스타일(고산차·문산포종)은 개봉 후 밀봉해 냉장·냉동에, 배화를 강하게 한 무이암차와 전통 철관음은 상온에서도 잘 버팁니다. 우린 잎의 재우림은 하루 안에.",
        brewTip:
          "첫 물은 세차로 버리면 먼지를 씻고 잎을 데웁니다. 구형으로 뭉친 차는 포다에 충분히 열려야 하므로 30초~1분을 기다립니다.",
        keywords: "동방미인 고산차 아리산 산린시 리산 다위링 무이암차 대홍포 수선 육계 철관음 요청 배화 암운"
      },
      en: {
        name: "Oolong tea",
        oneLine: "The art of semi-oxidation: stopping at exactly the point you want.",
        oxidation: "15–70%",
        ratioNote: "5–7 g to 110 ml in a gaiwan; 5 g to 300 ml in a Western cup",
        rounds: "7–10 infusions",
        steepBasis:
          "By the book: 30 seconds to 1 minute for the first pour, then 20, 30 and 45 seconds, lengthening as you go. Short and many is the rule.",
        process:
          "Withering → bruising (four to eight rounds or more) → firing → rolling → drying → roasting. The leaf edges oxidise where the leaves bruise against each other — “green leaf, red border” — and that is the heart of oolong.",
        varieties: ["Oriental Beauty", "Taiwanese high-mountain tea (Alishan, Shanlinxi, Lishan)", "Wuyi rock tea (Da Hong Pao, Shui Xian, Rou Gui)", "Anxi Tieguanyin"],
        flavor:
          "Oriental Beauty brings honey and ripe peach; high-mountain tea an orchid-and-cream coolness; Wuyi rock tea roasted grain and cocoa over a mineral “rock rhyme”; Tieguanyin orchid fragrance with a faint astringency at the end.",
        pairing:
          "Grilled meat, cheese and fruit. Oolong milk tea: 8 g of Tieguanyin in 200 ml at 95 °C for 4 minutes, then 150 ml milk. Oolong highball: 60 ml oolong, 45 ml whisky, 90 ml soda.",
        keep:
          "Lightly oxidised styles should be sealed and chilled or frozen after opening; heavily roasted Wuyi rock tea and traditional Tieguanyin keep well at room temperature. Re-steep used leaves within the day.",
        brewTip:
          "Throw the first pour away as a rinse: it washes off dust and warms the leaf. Tightly rolled tea needs to open fully in the first infusion, so give it 30 seconds to a minute.",
        keywords: "oriental beauty high mountain alishan shanlinxi lishan wuyi rock da hong pao tieguanyin bruising roasting rock rhyme"
      },
      "zh-CN": {
        name: "乌龙茶",
        oneLine: "在想要的地方精确停下——半发酵的艺术。",
        oxidation: "15~70%",
        ratioNote: "盖碗5~7克配110毫升，西式茶杯5克配300毫升",
        rounds: "7~10泡",
        steepBasis: "按书中的标准：第一泡30秒~1分钟，之后20秒、30秒、45秒逐渐加长。短泡多泡是原则。",
        process:
          "萎凋 → 摇青（4~8次以上）→ 杀青 → 揉捻 → 干燥 → 焙火。叶子互相碰撞，只有边缘发酵的“绿叶红镶边”，正是乌龙茶的核心。",
        varieties: ["东方美人", "台湾高山茶（阿里山、杉林溪、梨山）", "武夷岩茶（大红袍、水仙、肉桂）", "安溪铁观音"],
        flavor:
          "东方美人是蜂蜜与熟桃，高山茶是兰花与奶油般的清凉，武夷岩茶是焙谷与可可上叠着矿物感（岩韵），铁观音是兰花香与尾端淡淡的涩。",
        pairing:
          "烤肉、奶酪、水果都很合。乌龙奶茶：铁观音8克，95度200毫升闷4分钟，再加牛奶150毫升。乌龙高球：乌龙60毫升加威士忌45毫升、苏打水90毫升。",
        keep: "清香型（高山茶、文山包种）开封后密封冷藏或冷冻；重焙火的武夷岩茶与传统铁观音常温也能放。泡过的叶子要在当天内再泡。",
        brewTip: "第一泡当洗茶倒掉，可洗去灰尘并温热茶叶。紧结成球状的茶第一泡要充分展开，所以等30秒~1分钟。",
        keywords: "东方美人 高山茶 阿里山 杉林溪 梨山 武夷岩茶 大红袍 水仙 肉桂 铁观音 摇青 焙火 岩韵"
      },
      "zh-TW": {
        name: "烏龍茶",
        oneLine: "在想要的地方精確停下——半發酵的藝術。",
        oxidation: "15~70%",
        ratioNote: "蓋碗5~7公克配110毫升，西式茶杯5公克配300毫升",
        rounds: "7~10泡",
        steepBasis: "依書中標準：第一泡30秒~1分鐘，之後20秒、30秒、45秒逐漸加長。短泡多泡是原則。",
        process:
          "萎凋 → 搖菁（4~8次以上）→ 殺菁 → 揉捻 → 乾燥 → 焙火。葉子互相碰撞，只有邊緣發酵的「綠葉紅鑲邊」，正是烏龍茶的核心。",
        varieties: ["東方美人", "台灣高山茶（阿里山、杉林溪、梨山）", "武夷岩茶（大紅袍、水仙、肉桂）", "安溪鐵觀音"],
        flavor:
          "東方美人是蜂蜜與熟桃，高山茶是蘭花與奶油般的清涼，武夷岩茶是焙穀與可可上疊著礦物感（岩韻），鐵觀音是蘭花香與尾端淡淡的澀。",
        pairing:
          "烤肉、起司、水果都很合。烏龍奶茶：鐵觀音8公克，95度200毫升悶4分鐘，再加牛奶150毫升。烏龍高球：烏龍60毫升加威士忌45毫升、蘇打水90毫升。",
        keep: "清香型（高山茶、文山包種）開封後密封冷藏或冷凍；重焙火的武夷岩茶與傳統鐵觀音常溫也能放。泡過的葉子要在當天內再泡。",
        brewTip: "第一泡當洗茶倒掉，可洗去灰塵並溫熱茶葉。緊結成球狀的茶第一泡要充分展開，所以等30秒~1分鐘。",
        keywords: "東方美人 高山茶 阿里山 杉林溪 梨山 武夷岩茶 大紅袍 水仙 肉桂 鐵觀音 搖菁 焙火 岩韻"
      },
      yue: {
        "name": "烏龍茶",
        "oneLine": "想停就準確咁停——半發酵嘅藝術。",
        "oxidation": "15~70%",
        "ratioNote": "蓋碗5~7克配110毫升，西式茶杯5克配300毫升",
        "rounds": "7~10泡",
        "steepBasis": "照書嘅標準：頭泡30秒~1分鐘，之後20秒、30秒、45秒慢慢加長。短沖多泡係原則。",
        "process": "萎凋 → 搖菁（4~8次以上）→ 殺菁 → 揉捻 → 乾燥 → 焙火。葉互相撞，淨係邊緣發酵嘅「綠葉紅鑲邊」，就係烏龍茶嘅核心。",
        "varieties": ["東方美人", "台灣高山茶（阿里山、杉林溪、梨山）", "武夷岩茶（大紅袍、水仙、肉桂）", "安溪鐵觀音"],
        "flavor": "東方美人係蜜糖同熟桃，高山茶係蘭花同奶油般嘅清涼，武夷岩茶係焙穀同可可上面疊住礦物感（岩韻），鐵觀音係蘭花香同尾段淡淡嘅澀。",
        "pairing": "燒肉、芝士、水果都好夾。烏龍奶茶：鐵觀音8克，95度200毫升焗4分鐘，再加奶150毫升。烏龍 highball：烏龍60毫升加威士忌45毫升、蘇打水90毫升。",
        "keep": "清香型（高山茶、文山包種）開封後密封冷藏或者冷凍；重焙火嘅武夷岩茶同傳統鐵觀音室溫都放得。沖過嘅葉要當日再沖。",
        "brewTip": "頭泡當洗茶倒咗佢，可以洗走灰塵同暖茶葉。緊結成球狀嘅茶頭泡要夠展開，所以等30秒~1分鐘。",
        "keywords": "東方美人 高山茶 阿里山 杉林溪 梨山 武夷岩茶 大紅袍 水仙 肉桂 鐵觀音 搖菁 焙火 岩韻",
      }
    },
    {
      id: "black",
      kind: "group",
      hanja: "紅",
      sub: "Black Tea",
      accent: "#8C3B2E",
      accentSoft: "#F3E1DC",
      temp: 98,
      tempRange: "95~100℃",
      leaf: "3~5g",
      water: "200ml",
      steeps: [180, 240, 240],
      maxSteep: 2,
      oxidationValue: 90,
      ko: {
        name: "홍차",
        oneLine: "완전 산화. 붉은색과 우유를 견디는 힘이 여기서 나온다.",
        oxidation: "80~95%",
        ratioNote: "우유를 넣을 차는 5g에 200ml로 더 진하게",
        rounds: "1~2회",
        steepBasis: "책 기준 3~5분, 1~2회. 두 번째 우리는 같은 잎에 1분을 더합니다. 세 번째부터는 향보다 떫은맛이 앞섭니다.",
        process:
          "위조 → 유념 → 산화(22~26도, 습도 90%에서 2~4시간) → 건조(100도 이상 열풍, 수분 3%). 유념으로 세포를 터뜨려 카테킨이 산소를 만나게 하는 것이 전부입니다.",
        varieties: ["다즐링(머스캣)", "아쌈(몰트·CTC)", "우바(청량감)", "기문(기문향)", "정산소종(훈연)"],
        flavor:
          "다즐링은 포도·꽃·살구, 아쌈은 몰트와 묵직한 바디, 우바는 멘톨 같은 청량감, 기문은 장미·난초·다크초콜릿, 정산소종은 소나무 훈연 향입니다.",
        pairing:
          "다즐링은 스콘·마들렌·과일 타르트, 아쌈은 크림치즈 베이글·버터 토스트·초콜릿 케이크, 기문은 다크초콜릿과 잘 맞습니다.",
        keep: "제조일을 확인하고 1년을 기준으로 봅니다. 빛과 산소, 냄새를 막는 불투명 밀봉 용기에 두고, 향신료나 커피 옆은 피합니다.",
        brewTip:
          "물은 반드시 새로 끓인 것을. 5분을 넘기면 떫은맛이 급격히 강해지므로 시간이 되면 잎을 바로 건집니다. 티백은 넣은 뒤 젓지 않습니다.",
        keywords: "다즐링 아쌈 우바 기문 정산소종 금준미 CTC 정통엽 밀크티 스콘 훈연"
      },
      en: {
        name: "Black tea",
        oneLine: "Fully oxidised. The red colour and the strength to carry milk come from here.",
        oxidation: "80–95%",
        ratioNote: "For milk tea, use 5 g to 200 ml for a stronger cup",
        rounds: "1–2 infusions",
        steepBasis:
          "By the book: 3–5 minutes, one or two infusions. For the second, add a minute to the same leaf. From the third, astringency overtakes aroma.",
        process:
          "Withering → rolling → oxidation (22–26 °C at 90% humidity for 2–4 hours) → drying (hot air above 100 °C down to 3% moisture). All of it is in rolling: breaking the cells so catechins meet oxygen.",
        varieties: ["Darjeeling (muscatel)", "Assam (malt, CTC)", "Uva (cooling)", "Keemun", "Lapsang Souchong (smoked)"],
        flavor:
          "Darjeeling is grape, flower and apricot; Assam malt and a heavy body; Uva a menthol-like coolness; Keemun rose, orchid and dark chocolate; Lapsang Souchong the smell of pine smoke.",
        pairing:
          "Darjeeling with scones and fruit tarts; Assam with cream-cheese bagels, buttered toast and chocolate cake; Keemun with dark chocolate.",
        keep: "Check the production date and think in terms of a year. An opaque, sealed tin away from light, air and odours, and away from spices or coffee.",
        brewTip:
          "The water must be freshly boiled. Past five minutes astringency rises sharply, so lift the leaves out on time. Don't stir a tea bag once it is in.",
        keywords: "darjeeling assam uva keemun lapsang souchong golden tips CTC orthodox milk tea scone smoke"
      },
      "zh-CN": {
        name: "红茶",
        oneLine: "完全发酵。红色的汤色与承受牛奶的力量都在这里。",
        oxidation: "80~95%",
        ratioNote: "要加奶的茶用5克配200毫升，泡得更浓一些",
        rounds: "1~2泡",
        steepBasis: "按书中的标准：3~5分钟，1~2泡。第二泡同样的叶子多加1分钟。第三泡起涩味会盖过香气。",
        process:
          "萎凋 → 揉捻 → 发酵（22~26度、湿度90%下2~4小时）→ 干燥（100度以上热风，水分降至3%）。全部关键在揉捻：破坏细胞，让儿茶素与氧气相遇。",
        varieties: ["大吉岭（麝香葡萄香）", "阿萨姆（麦芽香、CTC）", "乌瓦（清凉感）", "祁门", "正山小种（烟熏）"],
        flavor:
          "大吉岭是葡萄、花与杏，阿萨姆是麦芽与厚重的口感，乌瓦有薄荷般的清凉，祁门是玫瑰、兰花与黑巧克力，正山小种是松木烟熏香。",
        pairing: "大吉岭配司康、水果塔；阿萨姆配奶油奶酪贝果、黄油吐司、巧克力蛋糕；祁门配黑巧克力。",
        keep: "确认生产日期，以一年为基准。放在不透光密封罐中，避开光线、空气与异味，也别放在香料或咖啡旁边。",
        brewTip: "水一定要现烧。超过5分钟涩味会急剧增强，时间一到就取出茶叶。茶包放入后不要搅拌。",
        keywords: "大吉岭 阿萨姆 乌瓦 祁门 正山小种 金骏眉 CTC 传统工艺 奶茶 司康 烟熏"
      },
      "zh-TW": {
        name: "紅茶",
        oneLine: "完全發酵。紅色的湯色與承受牛奶的力量都在這裡。",
        oxidation: "80~95%",
        ratioNote: "要加奶的茶用5公克配200毫升，泡得更濃一些",
        rounds: "1~2泡",
        steepBasis: "依書中標準：3~5分鐘，1~2泡。第二泡同樣的葉子多加1分鐘。第三泡起澀味會蓋過香氣。",
        process:
          "萎凋 → 揉捻 → 發酵（22~26度、濕度90%下2~4小時）→ 乾燥（100度以上熱風，水分降至3%）。全部關鍵在揉捻：破壞細胞，讓兒茶素與氧氣相遇。",
        varieties: ["大吉嶺（麝香葡萄香）", "阿薩姆（麥芽香、CTC）", "烏瓦（清涼感）", "祁門", "正山小種（煙燻）"],
        flavor:
          "大吉嶺是葡萄、花與杏，阿薩姆是麥芽與厚重的口感，烏瓦有薄荷般的清涼，祁門是玫瑰、蘭花與黑巧克力，正山小種是松木煙燻香。",
        pairing: "大吉嶺配司康、水果塔；阿薩姆配奶油起司貝果、奶油吐司、巧克力蛋糕；祁門配黑巧克力。",
        keep: "確認製造日期，以一年為基準。放在不透光密封罐中，避開光線、空氣與異味，也別放在香料或咖啡旁邊。",
        brewTip: "水一定要現燒。超過5分鐘澀味會急劇增強，時間一到就取出茶葉。茶包放入後不要攪拌。",
        keywords: "大吉嶺 阿薩姆 烏瓦 祁門 正山小種 金駿眉 CTC 傳統工藝 奶茶 司康 煙燻"
      },
      yue: {
        "name": "紅茶",
        "oneLine": "完全發酵。紅色嘅湯色同頂得住奶嘅力量都喺呢度。",
        "oxidation": "80~95%",
        "ratioNote": "要加奶嘅茶用5克配200毫升，沖濃啲",
        "rounds": "1~2泡",
        "steepBasis": "照書嘅標準：3~5分鐘，1~2泡。第二泡用同一批葉再加1分鐘。第三泡起澀味會蓋過香氣。",
        "process": "萎凋 → 揉捻 → 發酵（22~26度、濕度90%下2~4個鐘）→ 乾燥（100度以上熱風，水份降到3%）。關鍵全在揉捻：整破細胞，等兒茶素同氧氣相遇。",
        "varieties": ["大吉嶺（麝香葡萄香）", "阿薩姆（麥芽香、CTC）", "烏瓦（清涼感）", "祁門", "正山小種（煙燻）"],
        "flavor": "大吉嶺係葡萄、花同杏，阿薩姆係麥芽同厚身口感，烏瓦有薄荷般嘅清涼，祁門係玫瑰、蘭花同黑朱古力，正山小種係松木煙燻香。",
        "pairing": "大吉嶺配司康、水果撻；阿薩姆配忌廉芝士貝果、奶油多士、朱古力蛋糕；祁門配黑朱古力。",
        "keep": "睇製造日期，以一年為基準。放喺唔透光嘅密封罐，避開光、空氣同異味，亦都唔好放喺香料或者咖啡隔籬。",
        "brewTip": "水一定要即燒。超過5分鐘澀味會急劇增強，時間一到就攞返茶葉出嚟。茶包放落去之後唔好攪。",
        "keywords": "大吉嶺 阿薩姆 烏瓦 祁門 正山小種 金駿眉 CTC 傳統工藝 奶茶 司康 煙燻",
      }
    },
    {
      id: "dark",
      kind: "group",
      hanja: "黑",
      sub: "Dark Tea",
      accent: "#5B4636",
      accentSoft: "#EBE3D8",
      temp: 100,
      tempRange: "100℃",
      leaf: "5g",
      water: "100ml",
      steeps: [20, 25, 30],
      maxSteep: 3,
      oxidationValue: 100,
      ko: {
        name: "흑차 · 보이차",
        oneLine: "시간이 보관 기간이 아니라 재료가 되는 차.",
        oxidation: "후발효",
        ratioNote: "개완·자사호 5g에 100ml, 세차 1~2회",
        rounds: "8회 이상",
        steepBasis: "책 기준 포다 15~20초, 이후 5초씩 늘려 8~10회. 세차는 끓는 물로 10~20초씩 한두 번.",
        process:
          "생차는 위조 → 살청 → 유념 → 건조 → 압착 뒤 자연 후발효. 숙차는 여기에 악퇴를 더합니다. 수분 30~40%로 불린 잎을 1미터 더미로 쌓아 50~65도에서 40~70일 삭힙니다.",
        varieties: ["보이차 생차·숙차", "멍하이·이무·징마이", "육보차", "천량차"],
        flavor:
          "테아브라운이 만드는 흙내음 뒤에 대추 같은 단맛과 부드러운 질감이 있습니다. 생차는 5년에 말린 과일·꿀, 10년에 대추·약재, 20년이면 한약방과 오래된 나무 서랍 같은 향이 납니다.",
        pairing:
          "기름진 식사, 중식, 육류 뒤에 좋습니다. 공복은 피하고 식후 30분 뒤가 무난합니다. 진하게 우린 숙차에 우유와 연유를 더하면 보이차 밀크티가 됩니다.",
        keep: "20~25도, 습도 60~70%, 통풍이 되면서 냄새가 배지 않는 곳. 냉장고는 금지입니다. 생차는 약간 통기되게, 숙차는 밀봉해도 됩니다.",
        brewTip:
          "잎이 단단하게 압착되어 있어 100도의 끓는 물로 여러 번 우려야 합니다. 병차는 칼로 긁지 말고 차침으로 결을 따라 떼어냅니다.",
        keywords: "보이차 생차 숙차 악퇴 테아브라운 멍하이 이무 징마이 육보차 자사호 세차 식후차"
      },
      en: {
        name: "Dark tea · Pu-erh",
        oneLine: "Time is not a shelf life here; it is an ingredient.",
        oxidation: "Post-fermented",
        ratioNote: "5 g to 100 ml in a gaiwan or Yixing pot; rinse once or twice",
        rounds: "8 or more infusions",
        steepBasis:
          "By the book: 15–20 seconds for the first infusion, then 5 seconds longer each time, for 8–10 infusions. Rinse once or twice with boiling water for 10–20 seconds.",
        process:
          "Sheng: withering → firing → rolling → drying → pressing, then natural post-fermentation. Shou adds wo dui: dampened leaf at 30–40% moisture is piled a metre high and fermented at 50–65 °C for 40–70 days.",
        varieties: ["Sheng and shou pu-erh", "Menghai, Yiwu, Jingmai", "Liu bao tea", "Qianliang tea"],
        flavor:
          "Behind the earthy note made by theabrownin there is a date-like sweetness and a soft texture. Sheng: dried fruit and honey at five years, dates and medicinal herbs at ten, and by twenty a Chinese pharmacy and an old wooden drawer.",
        pairing:
          "Good after rich meals, Chinese food and meat. Avoid an empty stomach; 30 minutes after eating is comfortable. Add milk and condensed milk to a strong shou and it becomes pu-erh milk tea.",
        keep: "20–25 °C, 60–70% humidity, somewhere with air movement and no foreign odours. Never the fridge. Sheng likes a little air; shou can be sealed.",
        brewTip:
          "The leaf is pressed tight, so it needs boiling water and several infusions. Don't scrape a cake with a knife; use a tea pick and follow the grain.",
        keywords: "pu-erh sheng shou wo dui theabrownin menghai yiwu jingmai liubao yixing rinse after meal"
      },
      "zh-CN": {
        name: "黑茶 · 普洱茶",
        oneLine: "在这里，时间不是保质期而是原料。",
        oxidation: "后发酵",
        ratioNote: "盖碗或紫砂壶5克配100毫升，洗茶1~2次",
        rounds: "8泡以上",
        steepBasis: "按书中的标准：第一泡15~20秒，之后每次加5秒，共8~10泡。以沸水洗茶10~20秒，一两次。",
        process:
          "生茶：萎凋 → 杀青 → 揉捻 → 干燥 → 压制后自然后发酵。熟茶多了渥堆：把含水30~40%的茶叶堆成一米高，在50~65度下发醇40~70天。",
        varieties: ["普洱生茶、熟茶", "勐海、易武、景迈", "六堡茶", "千两茶"],
        flavor:
          "茶褐素带来的陈土香之后，是红枣般的甜味与柔滑的口感。生茶5年是干果与蜂蜜，10年是红枣与药材，20年则像中药铺与老木抽屉。",
        pairing: "适合油腻的餐食、中餐与肉类之后。避免空腹，饭后30分钟较稳妥。浓泡的熟茶加牛奶与炼乳，就是普洱奶茶。",
        keep: "20~25度、湿度60~70%，通风且不沾异味的地方。禁止放冰箱。生茶略透气，熟茶可以密封。",
        brewTip: "茶叶压得紧实，要用100度沸水多泡几次。茶饼不要用刀刮，用茶针顺着纹理撬开。",
        keywords: "普洱 生茶 熟茶 渥堆 茶褐素 勐海 易武 景迈 六堡 紫砂壶 洗茶 饭后茶"
      },
      "zh-TW": {
        name: "黑茶 · 普洱茶",
        oneLine: "在這裡，時間不是保存期限而是原料。",
        oxidation: "後發酵",
        ratioNote: "蓋碗或紫砂壺5公克配100毫升，洗茶1~2次",
        rounds: "8泡以上",
        steepBasis: "依書中標準：第一泡15~20秒，之後每次加5秒，共8~10泡。以沸水洗茶10~20秒，一兩次。",
        process:
          "生茶：萎凋 → 殺菁 → 揉捻 → 乾燥 → 壓製後自然後發酵。熟茶多了渥堆：把含水30~40%的茶葉堆成一公尺高，在50~65度下發酵40~70天。",
        varieties: ["普洱生茶、熟茶", "勐海、易武、景邁", "六堡茶", "千兩茶"],
        flavor:
          "茶褐素帶來的陳土香之後，是紅棗般的甜味與柔滑的口感。生茶5年是乾果與蜂蜜，10年是紅棗與藥材，20年則像中藥鋪與老木抽屜。",
        pairing: "適合油膩的餐食、中餐與肉類之後。避免空腹，飯後30分鐘較穩妥。濃泡的熟茶加牛奶與煉乳，就是普洱奶茶。",
        keep: "20~25度、濕度60~70%，通風且不沾異味的地方。禁止放冰箱。生茶略透氣，熟茶可以密封。",
        brewTip: "茶葉壓得緊實，要用100度沸水多泡幾次。茶餅不要用刀刮，用茶針順著紋理撬開。",
        keywords: "普洱 生茶 熟茶 渥堆 茶褐素 勐海 易武 景邁 六堡 紫砂壺 洗茶 飯後茶"
      },
      yue: {
        "name": "黑茶 · 普洱",
        "oneLine": "喺呢度，時間唔係保存期限，而係原料。",
        "oxidation": "後發酵",
        "ratioNote": "蓋碗或者紫砂壺5克配100毫升，洗茶1~2次",
        "rounds": "8泡以上",
        "steepBasis": "照書嘅標準：頭泡15~20秒，之後每次加5秒，一共8~10泡。用滾水洗茶10~20秒，一兩次。",
        "process": "生茶：萎凋 → 殺菁 → 揉捻 → 乾燥 → 壓製後自然後發酵。熟茶多咗渥堆：將含水30~40%嘅茶葉堆到一米高，喺50~65度下發酵40~70日。",
        "varieties": ["普洱生茶、熟茶", "勐海、易武、景邁", "六堡茶", "千兩茶"],
        "flavor": "茶褐素帶嚟嘅陳土香之後，係紅棗般嘅甜味同柔滑口感。生茶5年係乾果同蜜糖，10年係紅棗同藥材，20年就好似中藥舖同舊木抽屜。",
        "pairing": "啱油膩嘅餐、中菜同肉類之後。唔好空肚飲，飯後30分鐘穩陣啲。濃沖嘅熟茶加奶同煉奶，就係普洱奶茶。",
        "keep": "20~25度、濕度60~70%，通風又唔沾異味嘅地方。唔好放雪櫃。生茶略透氣，熟茶可以密封。",
        "brewTip": "茶葉壓得緊，要用100度滾水多沖幾次。茶餅唔好用刀刮，用茶針順住紋理撬開。",
        "keywords": "普洱 生茶 熟茶 渥堆 茶褐素 勐海 易武 景邁 六堡 紫砂壺 洗茶 飯後茶",
      }
    },
    {
      id: "everyday",
      kind: "group",
      hanja: "代",
      sub: "Everyday & Herbal Tea",
      accent: "#6E7F52",
      accentSoft: "#E9EDDD",
      temp: 95,
      tempRange: "90~100℃",
      leaf: "3g",
      water: "200ml",
      steeps: [300, 360, 420],
      maxSteep: 3,
      oxidationValue: 0,
      ko: {
        name: "대용차 · 허브차",
        "oneLine": "차나무 대신 곡물·뿌리·열매를 볶거나 말려 우린 대용차와, 꽃과 잎을 그대로 우린 허브차 — 카페인 없이 하루 곁에.",
        oxidation: "무산화 · 카페인 없음",
        "ratioNote": "200ml에 3g, 곡물은 5g",
        rounds: "1~3회",
        "steepBasis": "95도에서 5분, 두 번째 6분. 뿌리는 10분까지 우려도 됩니다.",
        process: "볶음 → (분쇄) → 우림. 보리·현미·메밀은 볶아 향을 내고, 뿌리는 말려 끓입니다. 꽃과 잎은 말려 그대로 우립니다.",
        varieties: ["보리·현미·메밀", "옥수수수염·결명자·우엉", "루이보스·마테·민들레", "캐모마일·페퍼민트·라벤더", "히비스커스·국화·레몬그라스"],
        flavor: "볶은 곡물의 고소함과 뿌리의 담백한 단맛, 꽃향과 잎의 청량함 — 떫음이 거의 없습니다.",
        pairing: "식후, 밤, 물 대신. 보리·현미는 사계절, 결명자·우엉은 기름진 식사 뒤, 허브차는 디저트와 자기 전에.",
        keep: "볶은 곡물은 향이 빨리 날아가 소분해 서늘한 곳에 3~6개월, 꽃과 잎은 밀봉해 12개월 둡니다.",
        "brewTip": "끓는 물에 5분, 뿌리는 10분. 꽃은 뚜껑을 덮어 향을 잡습니다. 루이보스는 우유와도 잘 맞습니다.",
        keywords: "대용차 보리 현미 메밀 옥수수수염 결명자 우엉 루이보스 마테 민들레 카페인 없음 허브차 캐모마일 페퍼민트 라벤더 레몬그라스 국화 히비스커스",
      },
      en: {
        name: "Everyday & herbal tea",
        "oneLine": "Grains, roots and fruit roasted or dried instead of the tea bush, and flowers and leaves steeped as they are — caffeine-free, always at hand.",
        oxidation: "None · caffeine-free",
        "ratioNote": "3 g to 200 ml; 5 g for grain",
        rounds: "1–3 infusions",
        "steepBasis": "95 °C for 5 minutes, 6 for the second. Roots take up to 10.",
        process: "Roasted → (ground) → steeped. Barley, brown rice and buckwheat are roasted for aroma; roots are dried and boiled. Flowers and leaves are dried and steeped as they are.",
        varieties: ["Barley · brown rice · buckwheat", "Corn silk · cassia seed · burdock", "Rooibos · mate · dandelion", "Chamomile · peppermint · lavender", "Hibiscus · chrysanthemum · lemongrass"],
        flavor: "Roasted grain and the clean sweetness of roots, flower perfume and the coolness of leaves — almost no astringency.",
        pairing: "After meals, at night, or in place of water. Barley and brown rice all year; cassia and burdock after rich food; herbal teas with desserts and before sleep.",
        keep: "Roasted grain loses its aroma fast: keep it in small amounts, cool, for 3–6 months; flowers and leaves sealed for 12 months.",
        "brewTip": "Five minutes in boiling water; roots 10. Flowers under a lid to hold the aroma. Rooibos takes milk well.",
        keywords: "everyday tea barley brown rice buckwheat corn silk cassia burdock rooibos mate dandelion caffeine free herbal tea chamomile peppermint lavender lemongrass chrysanthemum hibiscus",
      },
      "zh-CN": {
        name: "代用茶 · 花草茶",
        "oneLine": "不用茶树，把谷物、根与果实炒过或晒干来泡，再加上把花与叶直接泡开的花草茶——无咖啡因，随时在手边。",
        oxidation: "不发酵 · 无咖啡因",
        "ratioNote": "200毫升配3克，谷物5克",
        rounds: "1~3泡",
        "steepBasis": "95度泡5分钟，第二泡6分钟。根类可到10分钟。",
        process: "烘炒 → （研磨）→ 冲泡。大麦、玄米、荞麦炒出香气，根类晒干后煮。花与叶晒干后直接冲泡。",
        varieties: ["大麦·玄米·荞麦", "玉米须·决明子·牛蒡", "路易波士·马黛·蒲公英", "洋甘菊·薄荷·薰衣草", "洛神花·菊花·香茅"],
        flavor: "炒谷物的焙香与根的清甜，花的香与叶的清凉——几乎没有涩味。",
        pairing: "饭后、夜里、代替白水。大麦、玄米四季皆宜；决明子、牛蒡适合油腻餐后；花草茶适合甜点与睡前。",
        keep: "炒过的谷物香气散得快，少量分装放阴凉处可存3~6个月；花与叶密封可存12个月。",
        "brewTip": "沸水泡5分钟，根类10分钟。花要盖上盖子留住香气。路易波士加牛奶也很好喝。",
        keywords: "代用茶 大麦 玄米 荞麦 玉米须 决明子 牛蒡 路易波士 马黛 蒲公英 无咖啡因 花草茶 洋甘菊 薄荷 薰衣草 香茅 菊花 洛神花",
      },
      "zh-TW": {
        name: "代用茶 · 花草茶",
        "oneLine": "不用茶樹，把穀物、根與果實炒過或曬乾來泡，再加上把花與葉直接泡開的花草茶——無咖啡因，隨時在手邊。",
        oxidation: "不發酵 · 無咖啡因",
        "ratioNote": "200毫升配3公克，穀物5公克",
        rounds: "1~3泡",
        "steepBasis": "95度泡5分鐘，第二泡6分鐘。根類可到10分鐘。",
        process: "烘炒 → （研磨）→ 沖泡。大麥、玄米、蕎麥炒出香氣，根類曬乾後煮。花與葉曬乾後直接沖泡。",
        varieties: ["大麥·玄米·蕎麥", "玉米鬚·決明子·牛蒡", "路易波士·馬黛·蒲公英", "洋甘菊·薄荷·薰衣草", "洛神花·菊花·香茅"],
        flavor: "炒穀物的焙香與根的清甜，花的香與葉的清涼——幾乎沒有澀味。",
        pairing: "飯後、夜裡、代替白水。大麥、玄米四季皆宜；決明子、牛蒡適合油膩餐後；花草茶適合甜點與睡前。",
        keep: "炒過的穀物香氣散得快，少量分裝放陰涼處可存3~6個月；花與葉密封可存12個月。",
        "brewTip": "沸水泡5分鐘，根類10分鐘。花要蓋上蓋子留住香氣。路易波士加牛奶也很好喝。",
        keywords: "代用茶 大麥 玄米 蕎麥 玉米鬚 決明子 牛蒡 路易波士 馬黛 蒲公英 無咖啡因 花草茶 洋甘菊 薄荷 薰衣草 香茅 菊花 洛神花",
      },
      ja: {
        name: "代用茶・ハーブティー",
        "oneLine": "茶の木の代わりに、穀物・根・実を炒るか乾かして淹れる一杯と、花や葉をそのまま淹れるハーブティー — カフェインなしで、いつも手元に。",
        oxidation: "無発酵 · カフェインなし",
        "ratioNote": "200mlに3g、穀物は5g",
        rounds: "1~3煎",
        "steepBasis": "95度で5分、2煎目は6分。根は10分まで。",
        process: "焙煎 → （粉砕）→ 抽出。大麦・玄米・そばは炒って香りを出し、根は乾かして煮出します。花や葉は乾かしてそのまま淹れます。",
        varieties: ["大麦・玄米・そば", "トウモロコシのひげ・決明子・ごぼう", "ルイボス・マテ・タンポポ", "カモミール・ペパーミント・ラベンダー", "ハイビスカス・菊花・レモングラス"],
        flavor: "炒った穀物の香ばしさと根のやさしい甘み、花の香りと葉の清涼感 — 渋みはほとんどありません。",
        pairing: "食後、夜、水代わりに。大麦・玄米は年中、決明子・ごぼうは脂っこい食事のあとに。ハーブティーはデザートや就寝前に。",
        keep: "炒った穀物は香りが飛びやすいので小分けにして涼しい場所へ3~6か月、花や葉は密封して12か月。",
        "brewTip": "沸騰した湯で5分、根は10分。花は蓋をして香りを閉じ込めます。ルイボスはミルクにも合います。",
        keywords: "代用茶 大麦 玄米 そば トウモロコシのひげ 決明子 ごぼう ルイボス マテ タンポポ カフェインなし ハーブティー カモミール ペパーミント ラベンダー レモングラス 菊花 ハイビスカス",
      },
      yue: {
        name: "代用茶 · 花草茶",
        "oneLine": "唔用茶樹，用穀物、根同果實炒過或者曬乾嚟沖，再加埋將花同葉直接沖開嘅花草茶——無咖啡因，隨時喺手邊。",
        oxidation: "不發酵 · 無咖啡因",
        "ratioNote": "200毫升配3克，穀物5克",
        rounds: "1~3泡",
        "steepBasis": "95度沖5分鐘，第二泡6分鐘。根類可以到10分鐘。",
        process: "烘炒 → （研磨）→ 沖泡。大麥、玄米、蕎麥炒出香氣，根類曬乾後煮。花同葉曬乾後直接沖泡。",
        varieties: ["大麥·玄米·蕎麥", "粟米鬚·決明子·牛蒡", "路易波士·馬黛·蒲公英", "洋甘菊·薄荷·薰衣草", "洛神花·菊花·香茅"],
        flavor: "炒穀物嘅焙香同根嘅清甜，花嘅香同葉嘅清涼——幾乎冇澀味。",
        pairing: "飯後、夜晚、代替白水。大麥、玄米四季都啱；決明子、牛蒡啱油膩餐後；花草茶啱甜品同睡前。",
        keep: "炒過嘅穀物香氣散得快，少量分裝放陰涼處可以存3~6個月；花同葉密封可以存12個月。",
        "brewTip": "沸水沖5分鐘，根類10分鐘。花要冚蓋留住香氣。路易波士加奶都好飲。",
        keywords: "代用茶 大麥 玄米 蕎麥 粟米鬚 決明子 牛蒡 路易波士 馬黛 蒲公英 無咖啡因 花草茶 洋甘菊 薄荷 薰衣草 香茅 菊花 洛神花",
      },
    },
    {
      id: "traditional",
      kind: "group",
      hanja: "傳",
      sub: "Traditional Tea",
      accent: "#8A5A3C",
      accentSoft: "#F2E4D8",
      temp: 95,
      tempRange: "90~100℃",
      leaf: "3g",
      water: "200ml",
      steeps: [300, 360, 420],
      maxSteep: 3,
      oxidationValue: 0,
      ko: {
        name: "전통차",
        "oneLine": "뿌리·열매·청으로 달이는 한국의 차 — 몸을 데우고 기운을 세우는 잔.",
        oxidation: "무산화 · 대부분 카페인 없이",
        "ratioNote": "200ml에 3g, 청(유자·모과)은 2큰술",
        rounds: "1~3회",
        "steepBasis": "95도에서 5분, 두 번째 6분. 뿌리·열매는 10분까지 우려도 됩니다.",
        process: "말리기 → (볶음·덖음·절임) → 달임. 뿌리와 열매는 오래 끓이고, 유자·모과·오미자는 설탕·꿀에 절여 청으로 둡니다.",
        varieties: ["쌍화·생강·대추", "유자·모과·오미자", "구기자·산수유·둥굴레", "도라지·감잎·뽕잎·쑥·연잎"],
        flavor: "약재의 쌉쌀함과 청의 단맛 — 몸을 데우고 소화를 돕는 잔입니다.",
        pairing: "겨울, 감기 기운, 식후. 쌍화·생강은 저녁, 유자·모과는 목이 칼칼할 때.",
        keep: "청은 냉장 6개월, 말린 뿌리·열매는 밀봉해 서늘한 곳에 6~12개월.",
        "brewTip": "청은 80도 물에 풀어야 향이 살아 있습니다. 뿌리차는 끓는 물에 10분.",
        keywords: "전통차 한방차 쌍화 생강 대추 유자 모과 오미자 구기자 산수유 도라지 감잎 뽕잎 쑥 연잎 둥굴레",
      },
      en: {
        name: "Traditional tea",
        "oneLine": "Korea's decocted teas of root, fruit and preserved syrup — a cup that warms and steadies.",
        oxidation: "None · mostly caffeine-free",
        "ratioNote": "3 g to 200 ml; 2 spoons of syrup (yuja, mogwa)",
        rounds: "1–3 infusions",
        "steepBasis": "95 °C for 5 minutes, 6 for the second. Roots and fruit take up to 10.",
        process: "Dried → (roasted, pan-fired or preserved in sugar) → decocted. Roots and fruit are boiled long; yuja, mogwa and omija are preserved in sugar or honey as cheong.",
        varieties: ["Ssanghwa · ginger · jujube", "Yuja · quince · omija", "Goji · cornelian cherry · Solomon's seal", "Balloon flower · persimmon leaf · mulberry · mugwort · lotus"],
        flavor: "The bittersweet of medicinal roots meeting the sweetness of syrup — warming and digestive.",
        pairing: "Winter, a coming cold, after meals. Ssanghwa and ginger in the evening; yuja and quince for a scratchy throat.",
        keep: "Cheong keeps 6 months refrigerated; dried root and fruit keep sealed and cool for 6–12 months.",
        "brewTip": "Stir cheong into 80 °C water so the aroma survives; root teas want 10 minutes in boiling water.",
        keywords: "traditional tea korean herbal tea ssanghwa ginger jujube yuja quince omija goji cornelian cherry balloon flower persimmon mulberry mugwort lotus",
      },
      "zh-CN": {
        name: "传统茶",
        "oneLine": "用根、果实与糖渍膏冲煮的韩国茶——暖身、安神的一杯。",
        oxidation: "不发酵 · 大多无咖啡因",
        "ratioNote": "200毫升配3克，柚子·木瓜膏2大匙",
        rounds: "1~3泡",
        "steepBasis": "95度泡5分钟，第二泡6分钟。根与果实可到10分钟。",
        process: "晒干 → （烘炒·炒青·糖渍）→ 煎煮。根与果实久煮，柚子、木瓜、五味子用糖或蜂蜜腌成膏。",
        varieties: ["双和·生姜·大枣", "柚子·木瓜·五味子", "枸杞·山茱萸·玉竹", "桔梗·柿叶·桑叶·艾草·荷叶"],
        flavor: "药材的微苦与膏的甘甜——暖身又帮助消化。",
        pairing: "冬天、感觉要感冒时、饭后。双和、生姜适合晚上；柚子、木瓜适合嗓子发干时。",
        keep: "膏冷藏可存6个月，干燥的根与果实密封放阴凉处可存6~12个月。",
        "brewTip": "膏要用80度水化开才留得住香气；根类茶用沸水煮10分钟。",
        keywords: "传统茶 韩方茶 双和 生姜 大枣 柚子 木瓜 五味子 枸杞 山茱萸 桔梗 柿叶 桑叶 艾草 荷叶 玉竹",
      },
      "zh-TW": {
        name: "傳統茶",
        "oneLine": "用根、果實與糖漬膏沖煮的韓國茶——暖身、安神的一杯。",
        oxidation: "不發酵 · 大多無咖啡因",
        "ratioNote": "200毫升配3公克，柚子·木瓜膏2大匙",
        rounds: "1~3泡",
        "steepBasis": "95度泡5分鐘，第二泡6分鐘。根與果實可到10分鐘。",
        process: "曬乾 → （烘炒·炒菁·糖漬）→ 煎煮。根與果實久煮，柚子、木瓜、五味子用糖或蜂蜜醃成膏。",
        varieties: ["雙和·生薑·大棗", "柚子·木瓜·五味子", "枸杞·山茱萸·玉竹", "桔梗·柿葉·桑葉·艾草·荷葉"],
        flavor: "藥材的微苦與膏的甘甜——暖身又幫助消化。",
        pairing: "冬天、感覺要感冒時、飯後。雙和、生薑適合晚上；柚子、木瓜適合喉嚨乾時。",
        keep: "膏冷藏可存6個月，乾燥的根與果實密封放陰涼處可存6~12個月。",
        "brewTip": "膏要用80度水化開才留得住香氣；根類茶用沸水煮10分鐘。",
        keywords: "傳統茶 韓方茶 雙和 生薑 大棗 柚子 木瓜 五味子 枸杞 山茱萸 桔梗 柿葉 桑葉 艾草 荷葉 玉竹",
      },
      ja: {
        name: "伝統茶",
        "oneLine": "根・実・砂糖漬けの膏を煮出してつくる韓国の茶 — 体を温め、気を整える一杯。",
        oxidation: "無発酵 · ほとんどカフェインなし",
        "ratioNote": "200mlに3g、柚子・木瓜の膏は大さじ2",
        rounds: "1~3煎",
        "steepBasis": "95度で5分、2煎目は6分。根と実は10分まで。",
        process: "乾燥 → （焙煎・炒青・糖漬け）→ 煮出し。根と実は長く煮て、柚子・木瓜・五味子は砂糖や蜂蜜に漬けて膏にします。",
        varieties: ["双和・生姜・ナツメ", "柚子・木瓜・五味子", "クコ・サンシュユ・アマドコロ", "キキョウ・柿の葉・桑の葉・ヨモギ・蓮の葉"],
        flavor: "薬草のほろ苦さと膏の甘さ — 体を温め、消化を助けます。",
        pairing: "冬、風邪の気配、食後に。双和・生姜は夜に、柚子・木瓜は喉が乾くときに。",
        keep: "膏は冷蔵で6か月、乾燥した根と実は密封して涼しい場所に6~12か月。",
        "brewTip": "膏は80度の湯に溶かすと香りが残ります。根の茶は沸騰した湯で10分。",
        keywords: "伝統茶 韓方茶 双和 生姜 ナツメ 柚子 木瓜 五味子 クコ サンシュユ キキョウ 柿の葉 桑の葉 ヨモギ 蓮の葉 アマドコロ",
      },
      yue: {
        name: "傳統茶",
        "oneLine": "用根、果實同糖漬膏煲出嚟嘅韓國茶——暖身、安神嘅一杯。",
        oxidation: "不發酵 · 大多無咖啡因",
        "ratioNote": "200毫升配3克，柚子·木瓜膏2大匙",
        rounds: "1~3泡",
        "steepBasis": "95度沖5分鐘，第二泡6分鐘。根同果實可以到10分鐘。",
        process: "曬乾 → （烘炒·炒菁·糖漬）→ 煲。根同果實煲耐啲，柚子、木瓜、五味子用糖或蜜糖醃成膏。",
        varieties: ["雙和·生薑·紅棗", "柚子·木瓜·五味子", "杞子·山茱萸·玉竹", "桔梗·柿葉·桑葉·艾草·荷葉"],
        flavor: "藥材嘅微苦同膏嘅甘甜——暖身又幫助消化。",
        pairing: "冬天、覺得要感冒、飯後。雙和、生薑啱夜晚；柚子、木瓜啱喉嚨乾。",
        keep: "膏冷藏可以存6個月，乾燥嘅根同果實密封放陰涼處可以存6~12個月。",
        "brewTip": "膏要用80度水開才留得住香氣；根類茶用沸水煲10分鐘。",
        keywords: "傳統茶 韓方茶 雙和 生薑 紅棗 柚子 木瓜 五味子 杞子 山茱萸 桔梗 柿葉 桑葉 艾草 荷葉 玉竹",
      },
    }
  ];

  /* ---------------- 품종 (60여 종) ---------------- */
  var TEAS = [
    /* ── 녹차 ── */
    {
      id: "green-longjing",
      group: "green",
      kind: "tea",
      hanja: "龍",
      sub: "Xihu Longjing",
      alias: ["용정차 (서호)","서호용정", "서호 용정", "용정"],
      hz: "西湖龍井",
      hs: "西湖龙井",
      rom: "Xihu Longjing",
      x: {
        ko: [
          "살청(솥에서 덖음) → 유념 → 건조. 덖는 열로 효소를 멈추고 손바닥으로 눌러 납작한 잎을 만듭니다.",
          "청 건륭제가 시후에서 차를 마시고 호숫가 차나무 열여덟 그루를 ‘어전십팔수(御前十八棵)’로 봉했다는 이야기가 전합니다."
        ],
        en: [
          "Firing in a wok → rolling → drying. The wok's heat stops the enzymes and the palm presses the leaf flat.",
          "Tradition says the Qianlong Emperor, tasting tea at West Lake, honoured eighteen bushes by the shore as imperial tea trees — a title still kept."
        ],
        "zh-CN": [
          "在锅里炒青 → 揉捻 → 干燥。锅温终止酶活性，手掌把叶子压成扁形。",
          "相传乾隆帝在西湖品茶后，把湖畔十八棵茶树封为“御前十八棵”，至今仍有此说。"
        ],
        "zh-TW": [
          "在鍋裡炒菁 → 揉捻 → 乾燥。鍋溫終止酶活性，手掌把葉子壓成扁形。",
          "相傳乾隆帝在西湖品茶後，把湖畔十八棵茶樹封為「御前十八棵」，至今仍有此說。"
        ]
      },
      temp: 80,
      tempRange: "75~80℃",
      leaf: "3g",
      water: "150ml",
      steeps: [90, 30, 45],
      maxSteep: 3,
      oxidationValue: 0,
      ko: {
        name: "용정",
        oneLine: "볶은 콩 같은 고소함과 납작하게 누른 잎 — 덖음 녹차의 기준.",
        oxidation: "0%",
        ratioNote: "150ml에 3g, 유리잔이면 물을 먼저",
        rounds: "3~4회",
        steepBasis: "80도에서 1분 30초, 2포 30초, 3포 45초. 잎을 넣은 뒤 젓지 않습니다.",
        origin: "저장성 항저우 시후 주변. 청명 전에 딴 명전을 가장 쳐주고, 솥에서 손으로 덖어 납작하게 누른 잎이 표식입니다.",
        flavor: "볶은 콩·밤·아몬드의 고소함, 옅은 단맛, 끝에 아주 가벼운 떫음. 물색은 연한 연둣빛입니다.",
        pairing: "용정하인(새우 요리), 생선찜, 두부, 죽. 크림 많은 디저트와는 부딪힙니다.",
        keep: "개봉 후 한 달 안. 밀봉해 냉장 보관하고, 꺼낼 때는 밀봉 채로 꺼내 결로를 피합니다.",
        brewTip: "상투법 — 물을 먼저 붓고 잎을 얹으면 잎이 가라앉으며 향이 열립니다."
      },
      en: {
        name: "West Lake Longjing",
        oneLine: "Roasted-soy sweetness in a flat-pressed leaf — the yardstick for pan-fired green tea.",
        oxidation: "0%",
        ratioNote: "3 g to 150 ml; in a glass, water first",
        rounds: "3–4 infusions",
        steepBasis: "80 °C: 1½ minutes, then 30 seconds, then 45. Don't stir after the leaf goes in.",
        origin: "Around West Lake in Hangzhou, Zhejiang. Pre-Qingming picking is the most prized, and the flat leaf pressed by hand in a wok is its signature.",
        flavor: "Roasted soy, chestnut and almond, a light sweetness, a faint astringency at the end. The liquor is a pale young green.",
        pairing: "Longjing shrimp, steamed fish, tofu, congee. Cream-heavy desserts clash with it.",
        keep: "Within a month of opening. Keep it sealed in the fridge and take it out still sealed so condensation stays off the leaf.",
        brewTip: "Water first, then the leaf: it sinks slowly and the aroma opens as it does."
      },
      "zh-CN": {
        name: "西湖龙井",
        oneLine: "炒豆般的香气与压扁的叶片——炒青绿茶的标准。",
        oxidation: "0%",
        ratioNote: "150毫升配3克，玻璃杯则先注水",
        rounds: "3~4泡",
        steepBasis: "80度泡1分30秒，第二泡30秒，第三泡45秒。放茶后不要搅动。",
        origin: "浙江杭州西湖一带。清明前采的“明前”最受推崇，在锅里手工炒压成扁形的叶片是它的标志。",
        flavor: "炒豆、栗子、杏仁般的香气，淡淡的甜，尾端极轻的涩。汤色是浅嫩的绿。",
        pairing: "龙井虾仁、清蒸鱼、豆腐、粥。与奶油多的甜点相冲。",
        keep: "开封后一个月内。密封冷藏，取出时保持密封以免结露。",
        brewTip: "上投法——先注水再放茶，叶片下沉时香气才打开。"
      },
      "zh-TW": {
        name: "西湖龍井",
        oneLine: "炒豆般的香氣與壓扁的葉片——炒菁綠茶的標準。",
        oxidation: "0%",
        ratioNote: "150毫升配3公克，玻璃杯則先注水",
        rounds: "3~4泡",
        steepBasis: "80度泡1分30秒，第二泡30秒，第三泡45秒。放茶後不要攪動。",
        origin: "浙江杭州西湖一帶。清明前採的「明前」最受推崇，在鍋裡手工炒壓成扁形的葉片是它的標誌。",
        flavor: "炒豆、栗子、杏仁般的香氣，淡淡的甜，尾端極輕的澀。湯色是淺嫩的綠。",
        pairing: "龍井蝦仁、清蒸魚、豆腐、粥。與奶油多的甜點相衝。",
        keep: "開封後一個月內。密封冷藏，取出時保持密封以免結露。",
        brewTip: "上投法——先注水再放茶，葉片下沉時香氣才打開。"
      }
    },
    {
      id: "green-biluochun",
      group: "green",
      kind: "tea",
      hanja: "碧",
      sub: "Biluochun",
      hz: "洞庭碧螺春",
      hs: "洞庭碧螺春",
      rom: "Dongting Biluochun",
      x: {
        ko: [
          "살청(덖음) → 유념 → 말리기. 잎을 손바닥으로 비벼 달팽이처럼 꼬는 것이 특징입니다.",
          "원래 이름은 향이 사람을 놀라게 한다는 ‘하살인향(嚇煞人香)’이었는데, 강희제가 우아하지 않다 여겨 ‘벽라춘’으로 고쳤다는 이야기가 전합니다."
        ],
        en: [
          "Pan-firing → rolling → drying, with the leaf rubbed in the palms into snail-like coils.",
          "The first name meant “a scent that startles”; the Kangxi Emperor is said to have found it unrefined and renamed it Biluochun."
        ],
        "zh-CN": [
          "炒青 → 揉捻 → 干燥。用手掌把叶子搓成螺旋状是它的特点。",
          "原名“吓煞人香”，相传康熙帝觉得不雅，改名为“碧螺春”。"
        ],
        "zh-TW": [
          "炒菁 → 揉捻 → 乾燥。用手掌把葉子搓成螺旋狀是它的特點。",
          "原名「嚇煞人香」，相傳康熙帝覺得不雅，改名為「碧螺春」。"
        ]
      },
      temp: 75,
      tempRange: "70~75℃",
      leaf: "3g",
      water: "150ml",
      steeps: [60, 30, 45],
      maxSteep: 3,
      oxidationValue: 0,
      ko: {
        name: "벽라춘",
        oneLine: "달팽이처럼 꼬인 잎에서 과일 향이 난다 — 가장 향기로운 녹차.",
        oxidation: "0%",
        ratioNote: "150ml에 3g, 낮은 온도가 핵심",
        rounds: "3~4회",
        steepBasis: "75도에서 1분, 2포 30초, 3포 45초. 뜨거우면 떫어지므로 온도를 낮게.",
        origin: "장쑤성 둥팅산. 이른 봄 첫 싹만 골라 손바닥으로 달팽이 모양으로 말아, ‘백호’의 솜털이 남습니다.",
        flavor: "복숭아·살구 같은 과일 향, 크림 같은 부드러움, 끝의 청량한 단맛.",
        pairing: "흰살생선, 죽, 과일 디저트, 견과. 매운 음식과는 향이 지웁니다.",
        keep: "제조 후 6개월, 개봉 후 한 달. 알루미늄 파우치에 밀봉해 냉장고 채소칸.",
        brewTip: "70~75도 물을 먼저 붓고 잎을 넣습니다. 끓인 물은 컵에 옮겨 식힌 뒤 쓰세요."
      },
      en: {
        name: "Biluochun",
        oneLine: "Fruit aroma in a leaf twisted like a snail — the most fragrant of green teas.",
        oxidation: "0%",
        ratioNote: "3 g to 150 ml; low temperature is the whole trick",
        rounds: "3–4 infusions",
        steepBasis: "At 75 °C, 1 minute, then 30 seconds, then 45. Hot water makes it bitter, so keep it low.",
        origin: "Dongting Mountain in Jiangsu. Only the first spring buds, rolled by hand into snail-like coils that keep their white down.",
        flavor: "Peach and apricot, a creamy softness, a cool sweetness at the end.",
        pairing: "White fish, congee, fruit desserts, nuts. Spicy food wipes out the aroma.",
        keep: "Six months from production, a month after opening. Sealed aluminium pouch in the fridge's vegetable drawer.",
        brewTip: "Pour 70–75 °C water first, then add the leaf. Move boiled water to another cup to cool it."
      },
      "zh-CN": {
        name: "碧螺春",
        oneLine: "卷成螺旋的叶子里有果香——最香的绿茶。",
        oxidation: "0%",
        ratioNote: "150毫升配3克，低温是关键",
        rounds: "3~4泡",
        steepBasis: "75度泡1分钟，第二泡30秒，第三泡45秒。水太热会涩，温度要低。",
        origin: "江苏洞庭山。只取早春第一茬嫩芽，用手掌搓成螺旋状，留着白色的绒毛。",
        flavor: "桃子、杏子般的果香，奶油般的柔滑，尾端清凉的甜。",
        pairing: "白身鱼、粥、水果甜点、坚果。与辛辣食物相冲。",
        keep: "生产后6个月，开封后一个月。密封铝箔袋放入冰箱蔬菜格。",
        brewTip: "先注70~75度的水再放茶。沸水先倒到另一个杯子降温。"
      },
      "zh-TW": {
        name: "碧螺春",
        oneLine: "捲成螺旋的葉子裡有果香——最香的綠茶。",
        oxidation: "0%",
        ratioNote: "150毫升配3公克，低溫是關鍵",
        rounds: "3~4泡",
        steepBasis: "75度泡1分鐘，第二泡30秒，第三泡45秒。水太熱會澀，溫度要低。",
        origin: "江蘇洞庭山。只取早春第一茬嫩芽，用手掌搓成螺旋狀，留著白色的絨毛。",
        flavor: "桃子、杏子般的果香，奶油般的柔滑，尾端清涼的甜。",
        pairing: "白身魚、粥、水果甜點、堅果。與辛辣食物相衝。",
        keep: "製造後6個月，開封後一個月。密封鋁箔袋放入冰箱蔬果格。",
        brewTip: "先注70~75度的水再放茶。沸水先倒到另一個杯子降溫。"
      }
    },
    {
      id: "green-maofeng",
      group: "green",
      kind: "tea",
      hanja: "黃",
      sub: "Huangshan Maofeng",
      hz: "黃山毛峯",
      hs: "黄山毛峰",
      rom: "Huangshan Maofeng",
      x: {
        ko: [
          "살청 → 유념 → 건조. 잎을 살짝 눌러 황록색으로 만들고 흰 솜털을 남깁니다.",
          "1890년대 안후이 황산에서 만들어진 비교적 젊은 명차로, 청명 전의 작은 잎을 ‘연심(蓮心)’이라 부릅니다."
        ],
        en: [
          "Firing → rolling → drying, the leaf lightly pressed to a yellow-green with its white down intact.",
          "A relatively young famous tea, established around Huangshan from the 1890s; pre-Qingming buds are called “lotus hearts.”"
        ],
        "zh-CN": [
          "炒青 → 揉捻 → 干燥。叶子轻压成黄绿色，保留白色绒毛。",
          "19世纪90年代在安徽黄山一带定型的较年轻名茶，清明前的小芽称为“莲心”。"
        ],
        "zh-TW": [
          "炒菁 → 揉捻 → 乾燥。葉子輕壓成黃綠色，保留白色絨毛。",
          "19世紀90年代在安徽黃山一帶定型的較年輕名茶，清明前的小芽稱為「蓮心」。"
        ]
      },
      temp: 80,
      tempRange: "75~85℃",
      leaf: "3g",
      water: "150ml",
      steeps: [90, 30, 60],
      maxSteep: 3,
      oxidationValue: 0,
      ko: {
        name: "황산모봉",
        oneLine: "안개 낀 산의 부드러운 고소함 — 중국 녹차의 또 다른 표준.",
        oxidation: "0%",
        ratioNote: "150ml에 3g",
        rounds: "3~4회",
        steepBasis: "80도에서 1분 30초, 2포 30초, 3포 1분.",
        origin: "안후이성 황산. 안개와 큰 일교차로 잎이 두툼해지고, 황록색 잎에 흰 솜털이 남습니다.",
        flavor: "부드러운 고소함과 난초 같은 청량함, 감칠맛이 길게 남습니다.",
        pairing: "닭고기 요리, 죽, 나물, 은행. 기름진 요리보다 담백한 쪽이 좋습니다.",
        keep: "개봉 후 한 달, 밀봉 냉장. 냄새가 옮지 않도록 채소칸에 둡니다.",
        brewTip: "잎이 가늘어 우려내는 시간이 짧습니다. 80도에서 1분 30초를 넘기지 마세요."
      },
      en: {
        name: "Huangshan Maofeng",
        oneLine: "A soft nuttiness from misty mountains — China's other green-tea standard.",
        oxidation: "0%",
        ratioNote: "3 g to 150 ml",
        rounds: "3–4 infusions",
        steepBasis: "80 °C: 1½ minutes, then 30 seconds, then 1 minute.",
        origin: "Huangshan in Anhui. Mist and wide day–night swings thicken the leaf, which dries yellow-green with white down.",
        flavor: "Soft roasted notes with an orchid freshness, and an umami that stays a long time.",
        pairing: "Chicken dishes, congee, wild greens, ginkgo nuts. Lighter food suits it better than rich dishes.",
        keep: "A month after opening, sealed and chilled. Keep it in the vegetable drawer so it picks up no odour.",
        brewTip: "The leaf is fine, so the steep is short. Don't go past 1½ minutes at 80 °C."
      },
      "zh-CN": {
        name: "黄山毛峰",
        oneLine: "雾山深处的柔和豆香——中国绿茶的另一种标准。",
        oxidation: "0%",
        ratioNote: "150毫升配3克",
        rounds: "3~4泡",
        steepBasis: "80度泡1分30秒，第二泡30秒，第三泡1分钟。",
        origin: "安徽黄山。云雾与昼夜温差让叶片变得肥厚，干茶黄绿并留下白色绒毛。",
        flavor: "柔和的焙香与兰花般的清凉，鲜味留得久。",
        pairing: "鸡肉料理、粥、野菜、白果。清淡的菜比油腻的菜更合适。",
        keep: "开封后一个月，密封冷藏。放在蔬果格避免串味。",
        brewTip: "叶片细嫩，冲泡时间短。80度不要超过1分30秒。"
      },
      "zh-TW": {
        name: "黃山毛峰",
        oneLine: "霧山深處的柔和豆香——中國綠茶的另一種標準。",
        oxidation: "0%",
        ratioNote: "150毫升配3公克",
        rounds: "3~4泡",
        steepBasis: "80度泡1分30秒，第二泡30秒，第三泡1分鐘。",
        origin: "安徽黃山。雲霧與晝夜溫差讓葉片變得肥厚，乾茶黃綠並留下白色絨毛。",
        flavor: "柔和的焙香與蘭花般的清涼，鮮味留得久。",
        pairing: "雞肉料理、粥、野菜、白果。清淡的菜比油膩的菜更合適。",
        keep: "開封後一個月，密封冷藏。放在蔬果格避免串味。",
        brewTip: "葉片細嫩，沖泡時間短。80度不要超過1分30秒。"
      }
    },
    {
      id: "green-sencha",
      group: "green",
      kind: "tea",
      hanja: "煎",
      sub: "Sencha",
      hz: "煎茶",
      hs: "煎茶",
      rom: "Sencha",
      x: {
        ko: [
          "증청 → 유념 → 건조. 차광하지 않은 잎을 김으로 쪄서 효소를 멈춥니다.",
          "무로마치 시대에 중국에서 전해진 증청법이 일본에 남아 센차가 되었습니다. 오늘날 일본 녹차 소비의 6할을 차지합니다."
        ],
        en: [
          "Steaming → rolling → drying. Unshaded leaf is steamed to stop the enzymes.",
          "Steaming came from China in the Muromachi period and stayed in Japan as sencha; it is about 60% of Japanese green-tea consumption today."
        ],
        "zh-CN": [
          "蒸青 → 揉捻 → 干燥。不遮光的叶子用蒸汽杀青。",
          "室町时代从中国传入的蒸青法在日本留下来，成了煎茶。今天占日本绿茶消费的六成。"
        ],
        "zh-TW": [
          "蒸菁 → 揉捻 → 乾燥。不遮光的葉子用蒸氣殺菁。",
          "室町時代從中國傳入的蒸菁法在日本留下來，成了煎茶。今天占日本綠茶消費的六成。"
        ]
      },
      temp: 70,
      tempRange: "70~80℃",
      leaf: "3g",
      water: "150ml",
      steeps: [90, 20, 30],
      maxSteep: 3,
      oxidationValue: 0,
      ko: {
        name: "센차",
        oneLine: "증기로 쪄낸 일본의 일상 녹차 — 해조류 향과 감칠맛.",
        oxidation: "0%",
        ratioNote: "150ml에 3g, 첫 물은 70도",
        rounds: "3회",
        steepBasis: "70도에서 1분 30초, 2포 20초, 3포 30초. 두 번째가 가장 감칠맛이 좋습니다.",
        origin: "일본 전역. 차광하지 않고 햇볕에서 기른 잎을 증청해 말립니다. 이른 봄의 신차가 향이 가장 밝습니다.",
        flavor: "해조류·풀잎 향, 아미노산의 감칠맛, 끝의 가벼운 떫음. 물색은 노란 연둣빛.",
        pairing: "주먹밥, 초밥, 튀김, 시오자케. 단맛 디저트보다 짠맛 안주와 어울립니다.",
        keep: "개봉 후 한 달. 밀봉해 냉장, 가능하면 소분해 냉동 보관합니다.",
        brewTip: "물을 끓인 뒤 70도까지 식혀 부으세요. 80도면 떫은맛이 확 올라옵니다."
      },
      en: {
        name: "Sencha",
        oneLine: "Japan's everyday steamed green tea — seaweed aroma and umami.",
        oxidation: "0%",
        ratioNote: "3 g to 150 ml; first pour at 70 °C",
        rounds: "3 infusions",
        steepBasis: "70 °C: 1½ minutes, then 20 seconds, then 30. The second infusion carries the most umami.",
        origin: "Across Japan. Leaf grown without shading, steamed and dried. First-flush shincha is the brightest of the year.",
        flavor: "Seaweed and cut grass, savoury amino-acid umami, a light astringency at the end. The liquor is yellow-green.",
        pairing: "Onigiri, sushi, tempura, salted rice. It suits salty snacks better than sweet desserts.",
        keep: "A month after opening. Sealed and chilled, ideally portioned and frozen.",
        brewTip: "Boil, then cool to 70 °C before pouring. At 80 °C the astringency jumps."
      },
      "zh-CN": {
        name: "煎茶",
        oneLine: "蒸汽杀青的日本日常绿茶——海苔香与鲜味。",
        oxidation: "0%",
        ratioNote: "150毫升配3克，第一泡70度",
        rounds: "3泡",
        steepBasis: "70度泡1分30秒，第二泡20秒，第三泡30秒。第二泡鲜味最好。",
        origin: "日本各地。不遮光、全日照栽培的叶子蒸青后干燥。早春的新茶香气最明亮。",
        flavor: "海苔与青草香、氨基酸的鲜味、尾端轻涩。汤色黄绿。",
        pairing: "饭团、寿司、天妇罗、盐渍小菜。配咸味小食比甜点更合适。",
        keep: "开封后一个月。密封冷藏，最好分装冷冻。",
        brewTip: "水烧开后降到70度再冲。80度涩味明显上升。"
      },
      "zh-TW": {
        name: "煎茶",
        oneLine: "蒸氣殺菁的日本日常綠茶——海苔香與鮮味。",
        oxidation: "0%",
        ratioNote: "200毫升配3公克，第一泡70度",
        rounds: "3泡",
        steepBasis: "70度泡1分30秒，第二泡20秒，第三泡30秒。第二泡鮮味最好。",
        origin: "日本各地。不遮光、全日照栽培的葉子蒸菁後乾燥。早春的新茶香氣最明亮。",
        flavor: "海苔與青草香、胺基酸的鮮味、尾端輕澀。湯色黃綠。",
        pairing: "飯糰、壽司、天婦羅、鹽漬小菜。配鹹味小食比甜點更合適。",
        keep: "開封後一個月。密封冷藏，最好分裝冷凍。",
        brewTip: "水燒開後降到70度再沖。80度澀味明顯上升。"
      }
    },
    {
      id: "green-gyokuro",
      group: "green",
      kind: "tea",
      hanja: "玉",
      sub: "Gyokuro",
      alias: ["옥로"],
      hz: "玉露",
      hs: "玉露",
      rom: "Gyokuro",
      x: {
        ko: [
          "차광(20일 이상) → 증청 → 유념 → 건조. 차광으로 아미노산이 늘고 카테킨이 줄어듭니다.",
          "1835년 우지의 차농 야마모토 야마키치가 차광 재배를 널리 퍼뜨렸습니다. ‘옥 같은 이슬’이라는 이름은 짙은 감칠맛에서 나왔습니다."
        ],
        en: [
          "Shade for 20 days or more → steam → roll → dry. Shading raises amino acids and lowers catechins.",
          "In 1835 the Uji grower Yamamoto Yamakichi spread the shaded method; the name “jade dew” comes from the deep umami."
        ],
        "zh-CN": [
          "遮光20天以上 → 蒸青 → 揉捻 → 干燥。遮光使氨基酸增加、儿茶素减少。",
          "1835年宇治茶农山本山吉推广了遮光栽培。“玉露”之名来自浓厚的鲜味。"
        ],
        "zh-TW": [
          "遮光20天以上 → 蒸菁 → 揉捻 → 乾燥。遮光使胺基酸增加、兒茶素減少。",
          "1835年宇治茶農山本山吉推廣了遮光栽培。「玉露」之名來自濃厚的鮮味。"
        ]
      },
      temp: 55,
      tempRange: "50~60℃",
      leaf: "5g",
      water: "40ml",
      steeps: [150, 60, 90],
      maxSteep: 3,
      oxidationValue: 0,
      ko: {
        name: "교쿠로",
        oneLine: "차광 재배로 감칠맛을 극한까지 끌어올린, 가장 진한 녹차.",
        oxidation: "0%",
        ratioNote: "40ml에 5g, 아주 적은 물에 많은 잎",
        rounds: "3회",
        steepBasis: "55~60도에서 2분 30초, 2포 1분, 3포 1분 30초. 낮은 온도로 천천히.",
        origin: "일본 우지 등. 수확 전 20일 넘게 차광해 아미노산을 키웁니다. 짙은 녹색의 가늘고 긴 잎.",
        flavor: "된장·다시마 같은 짙은 감칠맛, 크림 같은 질감, 떫음은 거의 없습니다.",
        pairing: "그 자체로 마시는 차. 곁들인다면 말린 과일이나 흰떡 정도.",
        keep: "향이 약해지기 쉬워 개봉 후 3주 안이 좋습니다. 소분 냉동을 권합니다.",
        brewTip: "55도의 미지근한 물. 뜨거우면 감칠맛이 아니라 떫은맛이 나옵니다."
      },
      en: {
        name: "Gyokuro",
        oneLine: "Shade-grown to push umami to its limit — the deepest of green teas.",
        oxidation: "0%",
        ratioNote: "5 g to 40 ml — much leaf, very little water",
        rounds: "3 infusions",
        steepBasis: "55–60 °C: 2½ minutes, then 1 minute, then 1½.",
        origin: "Uji and elsewhere in Japan. Shaded for more than 20 days before picking to build amino acids. Long, thin, deep-green needles.",
        flavor: "Deep umami like miso and dashi, a creamy texture, almost no astringency.",
        pairing: "A tea to drink on its own. With anything, dried fruit or plain rice cake.",
        keep: "The aroma fades quickly; best within three weeks of opening. Portion and freeze.",
        brewTip: "55 °C — lukewarm water. Hotter water brings astringency instead of umami."
      },
      "zh-CN": {
        name: "玉露",
        oneLine: "遮光栽培把鲜味推到极致——最浓厚的绿茶。",
        oxidation: "0%",
        ratioNote: "40毫升配5克，水极少茶多",
        rounds: "3泡",
        steepBasis: "55~60度泡2分30秒，第二泡1分钟，第三泡1分30秒。",
        origin: "日本宇治等地。采摘前遮光20天以上以增加氨基酸。叶形细长、深绿。",
        flavor: "味噌、高汤般的浓厚鲜味，奶油般的质地，几乎没有涩味。",
        pairing: "适合单独品饮。要配就配干果或白年糕。",
        keep: "香气容易走失，开封后3周内最好。建议分装冷冻。",
        brewTip: "用55度的温水。水太热出来的是涩味而不是鲜味。"
      },
      "zh-TW": {
        name: "玉露",
        oneLine: "遮光栽培把鮮味推到極致——最濃厚的綠茶。",
        oxidation: "0%",
        ratioNote: "100毫升配5公克，水少茶多",
        rounds: "3泡",
        steepBasis: "55~60度泡2分30秒，第二泡1分鐘，第三泡1分30秒。",
        origin: "日本宇治等地。採摘前遮光20天以上以增加胺基酸。葉形細長、深綠。",
        flavor: "味噌、高湯般的濃厚鮮味，奶油般的質地，幾乎沒有澀味。",
        pairing: "適合單獨品飲。要配就配乾果或白年糕。",
        keep: "香氣容易走失，開封後3週內最好。建議分裝冷凍。",
        brewTip: "用55度的溫水。水太熱出來的是澀味而不是鮮味。"
      }
    },
    {
      id: "green-matcha",
      group: "green",
      kind: "tea",
      hanja: "抹",
      sub: "Matcha",
      alias: ["마차"],
      hz: "抹茶",
      hs: "抹茶",
      rom: "Matcha",
      x: {
        ko: [
          "차광 → 증청 → 건조 → 잎맥 제거 → 석식 분쇄. 가루가 곧 찻잎 전체입니다.",
          "송대 중국의 점차(點茶)가 일본으로 건너가 발전했습니다. 맷돌 한 대로 한 시간에 40g 남짓만 갈 수 있습니다."
        ],
        en: [
          "Shade → steam → dry → de-stem → stone-mill. The powder is the whole leaf.",
          "Song-dynasty whisked tea reached Japan and became matcha; one stone mill grinds only about 40 g an hour."
        ],
        "zh-CN": [
          "遮光 → 蒸青 → 干燥 → 去脉 → 石磨研磨。粉末就是整片叶子。",
          "宋代中国的点茶传到日本后发展成抹茶。一台石磨一小时只能磨出40克左右。"
        ],
        "zh-TW": [
          "遮光 → 蒸菁 → 乾燥 → 去脈 → 石磨研磨。粉末就是整片葉子。",
          "宋代中國的點茶傳到日本後發展成抹茶。一台石磨一小時只能磨出40克左右。"
        ]
      },
      temp: 80,
      tempRange: "75~85℃",
      leaf: "2g",
      water: "60ml",
      steeps: [30, 30, 30],
      maxSteep: 1,
      oxidationValue: 0,
      ko: {
        name: "말차",
        oneLine: "잎을 갈아 물에 그대로 마시는 차 — 향이 아니라 몸 전체로 마시는 녹차.",
        oxidation: "0%",
        ratioNote: "우스차 2g에 60ml, 고이차는 4g에 60ml",
        rounds: "1회",
        steepBasis: "70~80도 60ml에 2g, 30초간 차선으로 W자로 휘저어 거품을 냅니다.",
        origin: "일본 우지·니시오. 차광한 잎을 증청·건조해 잎맥을 걷어내고 맷돌로 갈아냅니다.",
        flavor: "짙은 감칠맛과 크림 같은 거품, 끝의 쌉싸름함. 물색은 선명한 녹색입니다.",
        pairing: "화과자, 양갱, 마차 라테, 바닐라 아이스크림.",
        keep: "산화가 매우 빨라 개봉 후 2~3주. 밀봉 냉동하고 상온에서 개봉하지 마세요.",
        brewTip: "물은 80도 이하. 끓는 물을 부으면 쓴맛만 남습니다. 체에 한 번 걸러 덩어리를 풀어 주세요."
      },
      en: {
        name: "Matcha",
        oneLine: "The whole leaf, ground and drunk — green tea you take in, not just smell.",
        oxidation: "0%",
        ratioNote: "2 g to 60 ml for usucha; 4 g to 60 ml for koicha",
        rounds: "One bowl",
        steepBasis: "2 g in 60 ml at 70–80 °C, whisked in a W for 30 seconds until foamy.",
        origin: "Uji and Nishio in Japan. Shaded leaf is steamed, dried, de-stemmed and ground on stone mills.",
        flavor: "Deep umami under a creamy foam, a bitter edge at the end. Vivid green.",
        pairing: "Wagashi, yokan, matcha latte, vanilla ice cream.",
        keep: "It oxidises fast: two to three weeks after opening. Freeze sealed and never open it at room temperature.",
        brewTip: "Water below 80 °C. Boiling water leaves only bitterness. Sift once to break up lumps."
      },
      "zh-CN": {
        name: "抹茶",
        oneLine: "把整片叶子磨碎喝下去——不只是闻香，而是喝进身体的绿茶。",
        oxidation: "0%",
        ratioNote: "薄茶2克配60毫升，浓茶4克配60毫升",
        rounds: "1碗",
        steepBasis: "70~80度60毫升配2克，用茶筅以W字形搅打30秒至起泡。",
        origin: "日本宇治、西尾。遮光的叶子蒸青干燥后去脉，用石磨磨成粉。",
        flavor: "浓厚的鲜味与奶油般的泡沫，尾端带一点苦。汤色鲜绿。",
        pairing: "和果子、羊羹、抹茶拿铁、香草冰淇淋。",
        keep: "氧化极快，开封后2~3周。密封冷冻，不要在常温下开封。",
        brewTip: "水温80度以下。用沸水只剩苦味。先过筛把结块弄散。"
      },
      "zh-TW": {
        name: "抹茶",
        oneLine: "把整片葉子磨碎喝下去——不只是聞香，而是喝進身體的綠茶。",
        oxidation: "0%",
        ratioNote: "薄茶2公克配70毫升，濃茶4公克配70毫升",
        rounds: "1碗",
        steepBasis: "70~80度60毫升配2公克，用茶筅以W字形攪打30秒至起泡。",
        origin: "日本宇治、西尾。遮光的葉子蒸菁乾燥後去脈，用石磨磨成粉。",
        flavor: "濃厚的鮮味與奶油般的泡沫，尾端帶一點苦。湯色鮮綠。",
        pairing: "和菓子、羊羹、抹茶拿鐵、香草冰淇淋。",
        keep: "氧化極快，開封後2~3週。密封冷凍，不要在常溫下開封。",
        brewTip: "水溫80度以下。用沸水只剩苦味。先過篩把結塊弄散。"
      }
    },
    {
      id: "green-jeju",
      group: "green",
      kind: "tea",
      hanja: "雪",
      sub: "Ujeon (Jeju)",
      alias: ["작설", "제주 우전"],
      hz: "濟州雨前",
      hs: "济州雨前",
      rom: "Ujeon (Jeju)",
      x: {
        ko: [
          "살청 → 유념 → 건조. 제주는 곡우 전 우전, 그 뒤 세작·중작으로 채취 시기를 나눕니다.",
          "1979년 제주 도순다원에서 녹차 재배가 시작된 뒤, 화산토와 해풍, 큰 일교차를 살린 우전이 명차로 자리 잡았습니다."
        ],
        en: [
          "Firing → rolling → drying. Jeju grades the pick by date: ujeon before Grain Rain, then sejaak and jungjak.",
          "Green tea came to Jeju in 1979 at the Dosun tea garden; volcanic soil, sea wind and wide day–night swings made ujeon its signature."
        ],
        "zh-CN": [
          "炒青 → 揉捻 → 干燥。济州按采摘时间分级：谷雨前为雨前，之后为细作、中作。",
          "1979年济州道顺茶园开始种茶，火山土、海风与昼夜温差让雨前成为代表。"
        ],
        "zh-TW": [
          "炒菁 → 揉捻 → 乾燥。濟州按採摘時間分級：穀雨前為雨前，之後為細作、中作。",
          "1979年濟州道順茶園開始種茶，火山土、海風與晝夜溫差讓雨前成為代表。"
        ]
      },
      temp: 75,
      tempRange: "70~80℃",
      leaf: "3g",
      water: "150ml",
      steeps: [90, 30, 60],
      maxSteep: 3,
      oxidationValue: 0,
      ko: {
        name: "우전 (제주)",
        oneLine: "곡우 전에 딴 한국의 첫 잎 — 봄비 머금은 부드러운 떫음.",
        oxidation: "0%",
        ratioNote: "150ml에 3g",
        rounds: "3~4회",
        steepBasis: "75도에서 1분 30초, 2포 30초, 3포 1분.",
        origin: "제주 서광·한남 등. 곡우(4월 20일경) 전에 딴 우전과 그 뒤의 세작으로 나뉩니다. 화산토와 해풍이 잎을 두껍게 합니다.",
        flavor: "풋풋한 잎 향과 고소함, 옅은 떫음이 끝에서 부드럽게 풀립니다.",
        pairing: "나물 비빔밥, 생선구이, 전, 유자 디저트.",
        keep: "제조 후 6개월, 개봉 후 한 달. 밀봉 냉장.",
        brewTip: "70~80도. 첫 물은 1분 30초를 넘기지 않으면 떫지 않습니다."
      },
      en: {
        name: "Ujeon (Jeju)",
        oneLine: "Korea's first leaf, picked before Grain Rain — a soft astringency full of spring rain.",
        oxidation: "0%",
        ratioNote: "3 g to 150 ml",
        rounds: "3–4 infusions",
        steepBasis: "75 °C: 1½ minutes, then 30 seconds, then 1 minute.",
        origin: "Seogwang and Hannam on Jeju. Ujeon is picked before Grain Rain (around 20 April); later pickings are sejack. Volcanic soil and sea wind thicken the leaf.",
        flavor: "Green leaf and toasted notes, with a light astringency that softens at the end.",
        pairing: "Herb bibimbap, grilled fish, jeon pancakes, citron desserts.",
        keep: "Six months from production, a month after opening. Sealed and chilled.",
        brewTip: "70–80 °C. Keep the first pour under 1½ minutes and it won't turn bitter."
      },
      "zh-CN": {
        name: "济州雨前",
        oneLine: "谷雨前采下的韩国第一片嫩叶——带着春雨的柔和涩感。",
        oxidation: "0%",
        ratioNote: "150毫升配3克",
        rounds: "3~4泡",
        steepBasis: "75度泡1分30秒，第二泡30秒，第三泡1分钟。",
        origin: "济州西广、汉南等地。谷雨（4月20日前后）前采的为雨前，之后为细作。火山土与海风让叶片更厚。",
        flavor: "青草香与焙香，尾端淡淡的涩感柔和地化开。",
        pairing: "野菜拌饭、烤鱼、煎饼、柚子甜点。",
        keep: "生产后6个月，开封后一个月。密封冷藏。",
        brewTip: "70~80度。第一泡不超过1分30秒就不会涩。"
      },
      "zh-TW": {
        name: "濟州雨前",
        oneLine: "穀雨前採下的韓國第一片嫩葉——帶著春雨的柔和澀感。",
        oxidation: "0%",
        ratioNote: "150毫升配3公克",
        rounds: "3~4泡",
        steepBasis: "75度泡1分30秒，第二泡30秒，第三泡1分鐘。",
        origin: "濟州西廣、漢南等地。穀雨（4月20日前後）前採的為雨前，之後為細作。火山土與海風讓葉片更厚。",
        flavor: "青草香與焙香，尾端淡淡的澀感柔和地化開。",
        pairing: "野菜拌飯、烤魚、煎餅、柚子甜點。",
        keep: "製造後6個月，開封後一個月。密封冷藏。",
        brewTip: "70~80度。第一泡不超過1分30秒就不會澀。"
      }
    },
    /* ── 백차 ── */
    {
      id: "white-silverneedle",
      group: "white",
      kind: "tea",
      hanja: "銀",
      sub: "Silver Needle",
      hz: "白毫銀針",
      hs: "白毫银针",
      rom: "Baihao Yinzhen",
      x: {
        ko: [
          "위조 → 건조. 싹만 골라 유념도 살청도 없이 말립니다.",
          "‘백호’는 싹을 덮은 은백색 털, ‘은침’은 바늘처럼 뾰족한 모양에서 왔습니다. 푸젠에서는 ‘1년 차, 3년 약, 7년 보배’라 합니다."
        ],
        en: [
          "Withering → drying. Only buds, with no rolling and no firing.",
          "“Baihao” is the silvery down on the bud and “yinzhen” the needle shape; Fujian says “one year a tea, three years a medicine, seven a treasure.”"
        ],
        "zh-CN": [
          "萎凋 → 干燥。只取芽，不揉捻也不杀青。",
          "“白毫”指芽上的银白绒毛，“银针”指针形。福建有“一年茶、三年药、七年宝”之说。"
        ],
        "zh-TW": [
          "萎凋 → 乾燥。只取芽，不揉捻也不殺菁。",
          "「白毫」指芽上的銀白絨毛，「銀針」指針形。福建有「一年茶、三年藥、七年寶」之說。"
        ]
      },
      temp: 85,
      tempRange: "80~85℃",
      leaf: "3g",
      water: "200ml",
      steeps: [120, 60, 120],
      maxSteep: 3,
      oxidationValue: 5,
      ko: {
        name: "백호은침",
        oneLine: "싹에 붙은 은백색 털이 그대로 남은, 백차의 가장 조용한 형태.",
        oxidation: "5%",
        ratioNote: "200ml에 3g",
        rounds: "4~5회",
        steepBasis: "85도에서 2분, 2포 1분, 3포 2분. 잎이 뜨면 30초 뒤 가볍게 저어 줍니다.",
        origin: "푸젠성 정화·복정. 봄 첫 싹만 골라 위조 후 말립니다. 은백색 털이 남아 있는지가 등급의 기준입니다.",
        flavor: "은방울꽃·라일락 같은 향, 아주 연한 살구빛 물색, 떫음 없이 긴 단맛.",
        pairing: "견과, 대추, 밤, 담백한 생선. 진한 고기와는 어울리지 않습니다.",
        keep: "상온 50~60% 습도, 직사광선 회피. 냉장고는 결로와 냄새 때문에 피합니다.",
        brewTip: "잎이 물에 뜨므로 물을 먼저 붓고 잎을 얹은 뒤 30초 후 가볍게 누릅니다."
      },
      en: {
        name: "Silver Needle",
        oneLine: "The palest form of white tea: a bud still in its silvery down.",
        oxidation: "5%",
        ratioNote: "3 g to 200 ml",
        rounds: "4–5 infusions",
        steepBasis: "85 °C: 2 minutes, then 1 minute, then 2. If the buds float, stir gently after 30 seconds.",
        origin: "Zhenghe and Fuding in Fujian. Only the first spring buds, withered and dried. Whether the silver down survives is the grade.",
        flavor: "Lily of the valley and lilac, a very pale apricot liquor, no astringency and a long sweetness.",
        pairing: "Nuts, dates, chestnuts, light fish. It does not sit well with heavy meat.",
        keep: "Room temperature, 50–60% humidity, out of direct sun. Avoid the fridge — condensation and odours.",
        brewTip: "The buds float: water first, buds on top, then press them down gently after 30 seconds."
      },
      "zh-CN": {
        name: "白毫银针",
        oneLine: "芽上保留着银白绒毛，白茶里最安静的一种。",
        oxidation: "5%",
        ratioNote: "200毫升配3克",
        rounds: "4~5泡",
        steepBasis: "85度泡2分钟，第二泡1分钟，第三泡2分钟。芽浮起时30秒后轻轻拨动。",
        origin: "福建政和、福鼎。只取春季第一批芽，萎凋后晒干。银白绒毛是否保留是分级标准。",
        flavor: "铃兰、丁香般的香气，极浅的杏色汤，没有涩味，甜味悠长。",
        pairing: "坚果、红枣、栗子、清淡的鱼。与浓重的肉类不合。",
        keep: "常温、湿度50~60%，避直射光。避免冰箱的结露与异味。",
        brewTip: "芽会浮起：先注水再放芽，30秒后轻轻压一下。"
      },
      "zh-TW": {
        name: "白毫銀針",
        oneLine: "芽上保留著銀白絨毛，白茶裡最安靜的一種。",
        oxidation: "5%",
        ratioNote: "200毫升配3公克",
        rounds: "4~5泡",
        steepBasis: "85度泡2分鐘，第二泡1分鐘，第三泡2分鐘。芽浮起時30秒後輕輕撥動。",
        origin: "福建政和、福鼎。只取春季第一批芽，萎凋後晒乾。銀白絨毛是否保留是分級標準。",
        flavor: "鈴蘭、丁香般的香氣，極淺的杏色湯，沒有澀味，甜味悠長。",
        pairing: "堅果、紅棗、栗子、清淡的魚。與濃重的肉類不合。",
        keep: "常溫、濕度50~60%，避直射光。避免冰箱的結露與異味。",
        brewTip: "芽會浮起：先注水再放芽，30秒後輕輕壓一下。"
      }
    },
    {
      id: "white-peony",
      group: "white",
      kind: "tea",
      hanja: "牡",
      sub: "White Peony",
      hz: "白牡丹",
      hs: "白牡丹",
      rom: "Baimudan",
      x: {
        ko: [
          "위조 → 건조. 싹 하나와 잎 두 장을 함께 말립니다.",
          "잎과 싹이 함께 펴진 모양이 활짝 핀 모란을 닮아 백모단이라는 이름이 붙었다고 전합니다."
        ],
        en: [
          "Withering → drying. One bud and two leaves dried together.",
          "The open bud and leaves are said to resemble a peony in full bloom, which gave the tea its name."
        ],
        "zh-CN": [
          "萎凋 → 干燥。一芽两叶一起萎凋晒干。",
          "芽与叶一起舒展的样子像盛开的牡丹，因此得名。"
        ],
        "zh-TW": [
          "萎凋 → 乾燥。一芽兩葉一起萎凋晒乾。",
          "芽與葉一起舒展的樣子像盛開的牡丹，因此得名。"
        ]
      },
      temp: 85,
      tempRange: "80~90℃",
      leaf: "4g",
      water: "200ml",
      steeps: [90, 60, 90],
      maxSteep: 3,
      oxidationValue: 8,
      ko: {
        name: "백모단",
        oneLine: "싹 하나에 잎 두 장 — 은침보다 향이 풍부하고 값은 부드럽습니다.",
        oxidation: "8%",
        ratioNote: "200ml에 4g",
        rounds: "4~5회",
        steepBasis: "85도에서 1분 30초, 2포 1분, 3포 1분 30초.",
        origin: "푸젠성. 싹 하나와 잎 두 장을 함께 말립니다. 잎이 넓어 향과 단맛의 폭이 넓습니다.",
        flavor: "흰 꽃과 건초, 옅은 대추 단맛. 은침보다 바디가 있습니다.",
        pairing: "닭고기, 담백한 생선, 샌드위치, 마들렌.",
        keep: "상온 밀봉. 1~2년 두면 대추와 꿀이 더해집니다.",
        brewTip: "90도까지 올려도 떫지 않습니다. 잎이 펴지도록 첫 물을 넉넉히."
      },
      en: {
        name: "White Peony",
        oneLine: "One bud and two leaves — more aroma than Silver Needle, at a gentler price.",
        oxidation: "8%",
        ratioNote: "4 g to 200 ml",
        rounds: "4–5 infusions",
        steepBasis: "85 °C: 1½ minutes, then 1 minute, then 1½.",
        origin: "Fujian. A bud with two leaves is dried together. The broader leaf gives a wider spread of aroma and sweetness.",
        flavor: "White flowers and hay, a light date sweetness, more body than Silver Needle.",
        pairing: "Chicken, light fish, sandwiches, madeleines.",
        keep: "Sealed at room temperature. A year or two adds dates and honey.",
        brewTip: "It takes 90 °C without turning bitter. Give the first pour room for the leaf to open."
      },
      "zh-CN": {
        name: "白牡丹",
        oneLine: "一芽两叶——比银针香更丰富，价格也更温和。",
        oxidation: "8%",
        ratioNote: "200毫升配4克",
        rounds: "4~5泡",
        steepBasis: "85度泡1分30秒，第二泡1分钟，第三泡1分30秒。",
        origin: "福建。一芽两叶一起萎凋晒干。叶片较宽，香气与甜味的层次也更宽。",
        flavor: "白花与干草，淡淡的红枣甜，比银针更有厚度。",
        pairing: "鸡肉、清淡的鱼、三明治、玛德莲。",
        keep: "常温密封。放一两年会多出枣香与蜜香。",
        brewTip: "到90度也不涩。第一泡给足水让叶子展开。"
      },
      "zh-TW": {
        name: "白牡丹",
        oneLine: "一芽兩葉——比銀針香更豐富，價格也更溫和。",
        oxidation: "8%",
        ratioNote: "200毫升配4公克",
        rounds: "4~5泡",
        steepBasis: "85度泡1分30秒，第二泡1分鐘，第三泡1分30秒。",
        origin: "福建。一芽兩葉一起萎凋晒乾。葉片較寬，香氣與甜味的層次也更寬。",
        flavor: "白花與乾草，淡淡的紅棗甜，比銀針更有厚度。",
        pairing: "雞肉、清淡的魚、三明治、瑪德蓮。",
        keep: "常溫密封。放一兩年會多出棗香與蜜香。",
        brewTip: "到90度也不澀。第一泡給足水讓葉子展開。"
      }
    },
    {
      id: "white-shoumei",
      group: "white",
      kind: "tea",
      hanja: "壽",
      sub: "Shou Mei",
      hz: "壽眉",
      hs: "寿眉",
      rom: "Shou Mei",
      x: {
        ko: [
          "위조 → 건조. 싹 없이 잎만으로 만듭니다.",
          "마른 잎의 모양이 늙은 사람의 눈썹을 닮아 수미라 불렸다고 전합니다. 오래 두고 마시는 ‘구차(舊茶)’로 많이 썼습니다."
        ],
        en: [
          "Withering → drying. Made from leaf without buds.",
          "The dried leaf is said to look like an old man's eyebrows, hence Shou Mei; it was long kept as an aged “old tea.”"
        ],
        "zh-CN": [
          "萎凋 → 干燥。不带芽，只用叶。",
          "干叶的形状像老人的眉毛，因此得名“寿眉”，过去多作久放的“旧茶”。"
        ],
        "zh-TW": [
          "萎凋 → 乾燥。不帶芽，只用葉。",
          "乾葉的形狀像老人的眉毛，因此得名「壽眉」，過去多作久放的「舊茶」。"
        ]
      },
      temp: 90,
      tempRange: "85~95℃",
      leaf: "4g",
      water: "200ml",
      steeps: [120, 60, 120],
      maxSteep: 3,
      oxidationValue: 10,
      ko: {
        name: "수미",
        oneLine: "잎 위주의 백차. 오래 두고 끓여 마시는 데 가장 알맞습니다.",
        oxidation: "10%",
        ratioNote: "200ml에 4g, 끓여 마실 때는 5g에 500ml",
        rounds: "4~5회",
        steepBasis: "90도에서 2분, 2포 1분, 3포 2분. 끓여 마시면 5분.",
        origin: "푸젠성. 싹과 잎을 함께 쓰는 잎 위주의 등급으로, 잎이 두껍고 단맛이 강합니다.",
        flavor: "건초와 대추, 살짝 익은 과일 향. 물색은 짙은 살구빛입니다.",
        pairing: "전, 튀김, 고기 요리, 찜. 기름진 음식과 잘 맞습니다.",
        keep: "상온 밀봉. 3년 이상 두면 약재 향이 나고 5~7년이면 호박색이 됩니다.",
        brewTip: "잎이 두꺼워 90도 이상에서도 쉽게 떫어지지 않습니다. 주전자에 끓여도 좋습니다."
      },
      en: {
        name: "Shou Mei",
        oneLine: "The leaf-forward white tea — the best one for long, slow simmering.",
        oxidation: "10%",
        ratioNote: "4 g to 200 ml; 5 g to 500 ml when simmering",
        rounds: "4–5 infusions",
        steepBasis: "90 °C: 2 minutes, then 1 minute, then 2. Simmer for 5 if you boil it.",
        origin: "Fujian. A leaf-forward grade that still uses buds with the leaf: thicker leaf, stronger sweetness.",
        flavor: "Hay and dates with a hint of ripe fruit. The liquor is a deeper apricot.",
        pairing: "Pancakes, fritters, meat dishes, steamed food. It stands up to richness.",
        keep: "Sealed at room temperature. Three years brings a medicinal note; five to seven, amber.",
        brewTip: "The thick leaf resists bitterness even above 90 °C. Simmering it in a pot works well."
      },
      "zh-CN": {
        name: "寿眉",
        oneLine: "以叶为主的白茶。最适合久放后煮着喝。",
        oxidation: "10%",
        ratioNote: "200毫升配4克，煮饮则5克配500毫升",
        rounds: "4~5泡",
        steepBasis: "90度泡2分钟，第二泡1分钟，第三泡2分钟。煮饮5分钟。",
        origin: "福建。芽叶同用的叶多等级，叶片厚、甜味强。",
        flavor: "干草与红枣，带一点熟果香。汤色是较深的杏色。",
        pairing: "煎饼、油炸、肉类料理、蒸菜。与油腻的食物很合。",
        keep: "常温密封。放三年以上有药香，五到七年转为琥珀色。",
        brewTip: "叶厚，90度以上也不易涩。用壶煮也很好。"
      },
      "zh-TW": {
        name: "壽眉",
        oneLine: "以葉為主白茶。最適合久放後煮著喝。",
        oxidation: "10%",
        ratioNote: "200毫升配4公克，煮飲則5公克配500毫升",
        rounds: "4~5泡",
        steepBasis: "90度泡2分鐘，第二泡1分鐘，第三泡2分鐘。煮飲5分鐘。",
        origin: "福建。芽葉同用的葉多等級，葉片厚、甜味強。",
        flavor: "乾草與紅棗，帶一點熟果香。湯色是較深的杏色。",
        pairing: "煎餅、油炸、肉類料理、蒸菜。與油膩的食物很合。",
        keep: "常溫密封。放三年以上有藥香，五到七年轉為琥珀色。",
        brewTip: "葉厚，90度以上也不易澀。用壺煮也很好。"
      }
    },
    {
      id: "white-aged",
      group: "white",
      kind: "tea",
      hanja: "老",
      sub: "Aged White",
      hz: "老白茶",
      hs: "老白茶",
      rom: "Aged White",
      x: {
        ko: [
          "백차를 상온에서 3년 이상 숙성. 저장 중에도 느린 산화와 미생물 작용이 이어집니다.",
          "푸젠의 ‘1년 차, 3년 약, 7년 보배(一年茶 三年藥 七年寶)’라는 말이 노백차의 출발입니다."
        ],
        en: [
          "White tea aged at room temperature for three years or more; slow oxidation and microbial action continue in storage.",
          "Fujian's saying — “one year a tea, three years a medicine, seven a treasure” — is where aged white tea begins."
        ],
        "zh-CN": [
          "白茶在常温下陈化三年以上，储存中仍有缓慢的氧化与微生物作用。",
          "福建“一年茶、三年药、七年宝”的说法，就是老白茶的由来。"
        ],
        "zh-TW": [
          "白茶在常溫下陳化三年以上，儲存中仍有緩慢的氧化與微生物作用。",
          "福建「一年茶、三年藥、七年寶」的說法，就是老白茶的由來。"
        ]
      },
      temp: 95,
      tempRange: "90~100℃",
      leaf: "5g",
      water: "200ml",
      steeps: [180, 120, 180],
      maxSteep: 3,
      oxidationValue: 15,
      ko: {
        name: "노백차",
        oneLine: "3년이 약, 7년이 보배 — 시간이 만든 백차.",
        oxidation: "15%",
        ratioNote: "200ml에 5g, 끓여 마시면 5g에 500ml",
        rounds: "5회 이상",
        steepBasis: "95도에서 3분, 2포 2분, 3포 3분. 대추·진피를 넣고 약한 불로 끓여도 좋습니다.",
        origin: "푸젠성. 백차를 3년 이상 상온 숙성한 것. ‘일 년 차, 삼 년 약, 칠 년 보배’라는 말이 있습니다.",
        flavor: "대추·약재·말린 과일 향, 부드러운 단맛과 깊은 여운. 물색은 짙은 호박색.",
        pairing: "한과, 대추, 밤, 겨울 국물 요리. 식후 소화를 돕는 차로 마십니다.",
        keep: "상온 20~25도, 습도 60% 이하, 냄새 없는 곳. 밀봉해 두면 계속 익습니다.",
        brewTip: "끓는 물로. 잎이 두꺼워 3분 이상 우려도 좋습니다. 주전자에 넣고 10분 끓이면 진한 약차가 됩니다."
      },
      en: {
        name: "Aged White",
        oneLine: "Three years a medicine, seven a treasure — white tea made by time.",
        oxidation: "15%",
        ratioNote: "5 g to 200 ml; 5 g to 500 ml when simmering",
        rounds: "5 or more infusions",
        steepBasis: "95 °C: 3 minutes, then 2, then 3. Simmer with dates and dried peel if you like.",
        origin: "Fujian. White tea aged at room temperature for three years or more — “one year a tea, three years a medicine, seven a treasure.”",
        flavor: "Dates, medicinal herbs and dried fruit, a soft sweetness and a long finish. Deep amber liquor.",
        pairing: "Korean sweets, dates, chestnuts, winter broths. Drunk after meals as a digestif.",
        keep: "20–25 °C, below 60% humidity, no odours. Sealed, it keeps maturing.",
        brewTip: "Boiling water. The thick leaf takes three minutes or more; ten minutes in a pot makes a strong medicinal brew."
      },
      "zh-CN": {
        name: "老白茶",
        oneLine: "三年是药，七年是宝——时间做成的白茶。",
        oxidation: "15%",
        ratioNote: "200毫升配5克，煮饮则5克配500毫升",
        rounds: "5泡以上",
        steepBasis: "95度泡3分钟，第二泡2分钟，第三泡3分钟。加红枣、陈皮小火煮也很好。",
        origin: "福建。白茶在常温下陈化三年以上。“一年茶、三年药、七年宝”说的就是它。",
        flavor: "红枣、药材、干果香，柔和的甜与深长的余韵。汤色深琥珀。",
        pairing: "韩式点心、红枣、栗子、冬天的汤菜。饭后作为助消化的茶。",
        keep: "常温20~25度、湿度60%以下、无异味处。密封会继续陈化。",
        brewTip: "用沸水。叶厚，泡3分钟以上也好；放壶里煮10分钟就是浓药茶。"
      },
      "zh-TW": {
        name: "老白茶",
        oneLine: "三年是藥，七年是寶——時間做成的白茶。",
        oxidation: "15%",
        ratioNote: "200毫升配5公克，煮飲則5公克配500毫升",
        rounds: "5泡以上",
        steepBasis: "95度泡3分鐘，第二泡2分鐘，第三泡3分鐘。加紅棗、陳皮小火煮也很好。",
        origin: "福建。白茶在常溫下陳化三年以上。「一年茶、三年藥、七年寶」說的就是它。",
        flavor: "紅棗、藥材、乾果香，柔和的甜與深長的餘韻。湯色深琥珀。",
        pairing: "韓式點心、紅棗、栗子、冬天的湯菜。飯後作為助消化的茶。",
        keep: "常溫20~25度、濕度60%以下、無異味處。密封會繼續陳化。",
        brewTip: "用沸水。葉厚，泡3分鐘以上也好；放壺裡煮10分鐘就是濃藥茶。"
      }
    },
    {
      id: "white-gongmei",
      group: "white",
      h: "貢",
      hz: "貢眉",
      hs: "贡眉",
      rom: "Gong Mei",
      sub: "Gong Mei",
      temp: 90,
      tempRange: "85~95℃",
      leaf: "4g",
      water: "200ml",
      steeps: [120, 60, 120],
      maxSteep: 3,
      oxidationValue: 10,
      x: {
        ko: [
          "위조 → 건조. 백차 가운데 잎 비중이 높은 등급입니다.",
          "중국 백차에서 백모단 다음, 수미보다 위로 보는 차입니다. 같은 밭에서 나도 등급에 따라 이름이 달라집니다."
        ],
        en: [
          "Withering → drying. A white tea grade with a high proportion of leaf.",
          "In Chinese white tea it ranks below Bai Mudan and above Shou Mei; tea from the same field takes a different name by grade."
        ],
        "zh-CN": [
          "萎凋 → 干燥。白茶中叶片比例较高的等级。",
          "在中国白茶中排在白牡丹之后、寿眉之前；同一片茶园也会因等级不同而改名。"
        ],
        "zh-TW": [
          "萎凋 → 乾燥。白茶中葉片比例較高的等級。",
          "在中國白茶中排在白牡丹之後、壽眉之前；同一片茶園也會因等級不同而改名。"
        ]
      },
      ko: {
        name: "공미",
        oneLine: "채차 품종으로 만드는, 백모단과 수미 사이의 백차.",
        oxidation: "10%",
        ratioNote: "200ml에 4g",
        rounds: "4~5회",
        steepBasis: "90도에서 2분, 두 번째 1분, 세 번째 2분.",
        origin: "푸젠성 푸딩·정허·젠양. 채차 품종의 잎과 싹을 함께 씁니다.",
        flavor: "건초, 은은한 꽃향, 대추 같은 단맛. 수미보다 향이 또렷합니다.",
        pairing: "한과, 찐 고구마, 담백한 떡.",
        keep: "상온 밀봉. 오래 두면 약재 향이 나고 맛이 둥글어집니다.",
        brewTip: "90도에서 2분. 잎이 두꺼워 두 번째 우리도 쉽게 우러납니다."
      },
      en: {
        name: "Gong Mei",
        oneLine: "A white tea between Bai Mudan and Shou Mei, made from the cai cha cultivar group.",
        oxidation: "10%",
        ratioNote: "4 g to 200 ml",
        rounds: "4–5 infusions",
        steepBasis: "Two minutes at 90 °C, then one and two minutes.",
        origin: "Fuding, Zhenghe and Jianyang in Fujian, from the leaves and buds of the cai cha group cultivar.",
        flavor: "Hay, quiet florals, a date-like sweetness — more defined than Shou Mei.",
        pairing: "Hangwa sweets, steamed sweet potato, plain rice cakes.",
        keep: "Seal at room temperature; with age it gains a medicinal note and rounds out.",
        brewTip: "Two minutes at 90 °C. The leaf is thick enough for an easy second infusion."
      },
      "zh-CN": {
        name: "贡眉",
        oneLine: "用菜茶品种制作、介于白牡丹与寿眉之间的白茶。",
        oxidation: "10%",
        ratioNote: "200毫升配4克",
        rounds: "4~5泡",
        steepBasis: "90度泡2分钟，第二泡1分钟，第三泡2分钟。",
        origin: "福建福鼎、政和、建阳，用菜茶品种的叶与芽。",
        flavor: "干草、幽微花香、枣般的甜味，比寿眉更有层次。",
        pairing: "韩果、蒸红薯、清淡年糕。",
        keep: "常温密封；久放会出药香，口感更圆润。",
        brewTip: "90度两分钟，叶片厚，第二泡也容易出味。"
      },
      "zh-TW": {
        name: "貢眉",
        oneLine: "用菜茶品種製作、介於白牡丹與壽眉之間的白茶。",
        oxidation: "10%",
        ratioNote: "200毫升配4公克",
        rounds: "4~5泡",
        steepBasis: "90度泡2分鐘，第二泡1分鐘，第三泡2分鐘。",
        origin: "福建福鼎、政和、建陽，用菜茶品種的葉與芽。",
        flavor: "乾草、幽微花香、棗般的甜味，比壽眉更有層次。",
        pairing: "韓果、蒸地瓜、清淡年糕。",
        keep: "常溫密封；久放會出藥香，口感更圓潤。",
        brewTip: "90度兩分鐘，葉片厚，第二泡也容易出味。"
      }
    },
    /* ── 녹차 (이어서) ── */
    {
      id: "green-luanguapian",
      group: "green",
      h: "瓜",
      hz: "六安瓜片",
      hs: "六安瓜片",
      rom: "Lu'an Guapian",
      sub: "Lu'an Melon Seed",
      t: 85,
      tr: "80~85℃",
      l: "3g",
      w: "150ml",
      s: [90, 45, 60],
      ox: 0,
      ko: [
        "육안과편",
        "싹과 줄기를 떼고 잎만 남겨 멜론 씨처럼 편평하게 만든, 녹차 중 유일한 ‘잎만’ 차.",
        "0%",
        "150ml에 3g",
        "3~4회",
        "85도에서 1분 30초, 2포 45초, 3포 1분.",
        "안후이성 류안. 대별산 북쪽 기슭, 해발 300~800m의 안개 낀 차밭.",
        "판편 → 살청 → 홍배(모화·소화·노화). 싹과 줄기를 떼고 잎만 남겨 비비지 않고 만들며, 마지막에 숯불로 한 번 더 건조합니다.",
        "육안차는 명나라 때 공차로 올라갔고, 잎만 쓰는 과편의 형태는 청나라 때 그 안에서 갈라져 나왔습니다. 잎만 쓰는 제법 덕에 향이 오래갑니다.",
        "구운 밤·감자 같은 고소함, 두툼한 바디, 끝의 단맛. 물색은 짙은 노란 연둣빛.",
        "볶음 요리, 만두, 훈제 오리, 견과.",
        "잎이 두꺼워 85도에서도 잘 우러납니다. 물을 먼저 붓고 잎을 얹으세요."
      ],
      en: [
        "Lu'an Guapian",
        "Only leaf and no bud, pressed flat like a melon seed — the one green tea made from leaf alone.",
        "0%",
        "3 g to 150 ml",
        "3–4 infusions",
        "85 °C: 1½ minutes, then 45 seconds, then 1 minute.",
        "Lu'an in Anhui, on the northern slope of the Dabie Mountains, 300–800 m of misty gardens.",
        "Leaf separated → firing → staged baking. Buds and stems are removed, the leaf kept flat without rolling, then dried once more over charcoal.",
        "Lu'an tea itself was Ming tribute; the leaf-only guapian form split off from it under the Qing. Using only leaf is why its aroma keeps so long.",
        "Roasted chestnut and potato, a thick body, sweetness at the end. The liquor is a deep yellow-green.",
        "Stir-fries, dumplings, smoked duck, nuts.",
        "The thick leaf opens easily at 85 °C. Water first, leaf on top."
      ],
      "zh-CN": [
        "六安瓜片",
        "只留叶、不留芽，压成瓜子形的唯一一种“纯叶”绿茶。",
        "0%",
        "150毫升配3克",
        "3~4泡",
        "85度泡1分30秒，第二泡45秒，第三泡1分钟。",
        "安徽六安，大别山北麓，海拔300~800米的云雾茶园。",
        "扳片 → 炒青 → 烘焙（毛火·小火·老火）。去芽去梗只留叶，不经揉捻，最后再用炭火焙一次。",
        "六安茶在明代已是贡茶，只用叶片的瓜片形态在清代从中分化出来。只用叶片的做法让香气留得久。",
        "烤栗子与土豆般的香气，汤体厚，尾端回甜。汤色深黄绿。",
        "炒菜、饺子、熏鸭、坚果。",
        "叶片厚，85度也很容易出味。先注水再放茶。"
      ],
      "zh-TW": [
        "六安瓜片",
        "只留葉、不留芽，壓成瓜子形的唯一一種「純葉」綠茶。",
        "0%",
        "150毫升配3公克",
        "3~4泡",
        "85度泡1分30秒，第二泡45秒，第三泡1分鐘。",
        "安徽六安，大別山北麓，海拔300~800米的雲霧茶園。",
        "扳片 → 炒菁 → 烘焙（毛火·小火·老火）。去芽去梗只留葉，不經揉捻，最後再用炭火焙一次。",
        "六安茶在明代已是貢茶，只用葉片的瓜片形態在清代從中分化出來。只用葉片的做法讓香氣留得久。",
        "烤栗子與馬鈴薯般的香氣，湯體厚，尾端回甘。湯色深黃綠。",
        "炒菜、餃子、燻鴨、堅果。",
        "葉片厚，85度也很容易出味。先注水再放茶。"
      ]
    },
    {
      id: "green-houkui",
      group: "green",
      h: "猴",
      hz: "太平猴魁",
      hs: "太平猴魁",
      rom: "Taiping Houkui",
      sub: "Taiping Houkui",
      t: 85,
      tr: "80~85℃",
      l: "3g",
      w: "150ml",
      s: [90, 45, 60],
      ox: 0,
      ko: [
        "태평후괴",
        "손바닥만 한 큰 잎에 격자 무늬가 남는, 중국에서 가장 큰 녹차.",
        "0%",
        "150ml에 3g",
        "3~4회",
        "85도에서 1분 30초, 2포 45초, 3포 1분.",
        "안후이 황산 태평현 후갱 일대, 해발 400~700m.",
        "살청 → 압형 → 건조. 잎을 천과 망에 싸 눌러 편평하게 만들며 격자 자국이 남습니다.",
        "1900년 무렵 후갱의 차농 왕규성이 만들었다는 설이 전하고, ‘후괴’는 원숭이(猴)가 많은 산 이름에서 왔다는 이야기도 있습니다.",
        "난초 향과 옅은 감칠맛, 잎이 커도 떫지 않습니다.",
        "담백한 생선찜, 죽, 두부.",
        "키 큰 유리잔에 잎을 세워 우려냅니다. 85도에서 1분 30초."
      ],
      en: [
        "Taiping Houkui",
        "A leaf the size of a palm with a cloth grid pressed into it — the largest green tea in China.",
        "0%",
        "3 g to 150 ml",
        "3–4 infusions",
        "85 °C: 1½ minutes, then 45 seconds, then 1 minute.",
        "Hougang near Taiping, Huangshan, Anhui, at 400–700 m.",
        "Firing → pressing → drying. The leaf is wrapped in cloth and mesh and pressed flat, which leaves the grid marks.",
        "Tradition credits the Hougang grower Wang Kuisheng around 1900; the name is also said to come from a mountain full of monkeys (hou).",
        "Orchid aroma and a light umami; even a large leaf stays free of bitterness.",
        "Steamed fish, congee, tofu.",
        "Stand the leaf upright in a tall glass. 85 °C for 1½ minutes."
      ],
      "zh-CN": [
        "太平猴魁",
        "巴掌大的叶片上留著布纹格印，中国最大的绿茶。",
        "0%",
        "150毫升配3克",
        "3~4泡",
        "85度泡1分30秒，第二泡45秒，第三泡1分钟。",
        "安徽黄山太平县猴坑一带，海拔400~700米。",
        "炒青 → 压形 → 干燥。用布与网包住叶片压平，留下格纹。",
        "相传1900年前后由猴坑茶农王魁成创制；“猴魁”也有人说是因山中多猴而得名。",
        "兰花香与淡淡的鲜味，叶片虽大却不涩。",
        "清蒸鱼、粥、豆腐。",
        "用高玻璃杯让叶片竖立冲泡。85度1分30秒。"
      ],
      "zh-TW": [
        "太平猴魁",
        "巴掌大的葉片上留著布紋格印，中國最大的綠茶。",
        "0%",
        "150毫升配3公克",
        "3~4泡",
        "85度泡1分30秒，第二泡45秒，第三泡1分鐘。",
        "安徽黃山太平縣猴坑一帶，海拔400~700米。",
        "炒菁 → 壓形 → 乾燥。用布與網包住葉片壓平，留下格紋。",
        "相傳1900年前後由猴坑茶農王魁成創制；「猴魁」也有人說是因山中多猴而得名。",
        "蘭花香與淡淡的鮮味，葉片雖大卻不澀。",
        "清蒸魚、粥、豆腐。",
        "用高玻璃杯讓葉片豎立沖泡。85度1分30秒。"
      ]
    },
    {
      id: "green-maojian",
      group: "green",
      h: "尖",
      hz: "信陽毛尖",
      hs: "信阳毛尖",
      rom: "Xinyang Maojian",
      sub: "Xinyang Maojian",
      t: 80,
      tr: "75~85℃",
      l: "3g",
      w: "150ml",
      s: [90, 30, 45],
      ox: 0,
      ko: [
        "신양모첨",
        "바늘처럼 가는 잎에서 풀과 밤 향이 올라오는 허난의 명차.",
        "0%",
        "150ml에 3g",
        "3~4회",
        "80도에서 1분 30초, 2포 30초, 3포 45초.",
        "허난성 신양, 동백산·차운산 일대 해발 500~800m.",
        "살청 → 유념 → 건조. 가는 잎을 손으로 비벼 바늘처럼 곧게 만듭니다.",
        "당나라 문헌에 신양 산지가 기록되어 있고, 1915년 파나마 만국박람회에서 금상을 받았다고 전합니다.",
        "풀잎·밤·옅은 스모크, 산뜻한 떫음.",
        "두부 요리, 닭고기, 봄나물.",
        "80도에서 1분 30초. 잎이 가늘어 조금만 넘겨도 떫어집니다."
      ],
      en: [
        "Xinyang Maojian",
        "Needle-fine leaf carrying grass and chestnut — Henan's famous green.",
        "0%",
        "3 g to 150 ml",
        "3–4 infusions",
        "80 °C: 1½ minutes, then 30 seconds, then 45.",
        "Xinyang in Henan, on Mount Dongbai and Mount Cheyun at 500–800 m.",
        "Firing → rolling → drying. The fine leaf is rolled by hand into straight needles.",
        "Tang records name Xinyang as a tea region, and the tea is said to have taken gold at the 1915 Panama–Pacific exhibition.",
        "Cut grass, chestnut, a faint smoke, and a lively astringency.",
        "Tofu dishes, chicken, spring greens.",
        "80 °C for 1½ minutes. The leaf is fine; a little long and it turns bitter."
      ],
      "zh-CN": [
        "信阳毛尖",
        "针一样细的叶子里有青草与栗子的香，河南名茶。",
        "0%",
        "150毫升配3克",
        "3~4泡",
        "80度泡1分30秒，第二泡30秒，第三泡45秒。",
        "河南信阳，东柏山、车云山一带海拔500~800米。",
        "炒青 → 揉捻 → 干燥。细叶靠手工搓成挺直的针形。",
        "唐代文献已记载信阳产茶，相传1915年巴拿马万国博览会获金奖。",
        "青草、栗子、一丝烟熏，涩感清爽。",
        "豆腐料理、鸡肉、春野菜。",
        "80度1分30秒。叶子细，稍久就涩。"
      ],
      "zh-TW": [
        "信陽毛尖",
        "針一樣細的葉子裡有青草與栗子的香，河南名茶。",
        "0%",
        "150毫升配3公克",
        "3~4泡",
        "80度泡1分30秒，第二泡30秒，第三泡45秒。",
        "河南信陽，東柏山、車雲山一帶海拔500~800米。",
        "炒菁 → 揉捻 → 乾燥。細葉靠手工搓成挺直的針形。",
        "唐代文獻已記載信陽產茶，相傳1915年巴拿馬萬國博覽會獲金獎。",
        "青草、栗子、一絲煙燻，澀感清爽。",
        "豆腐料理、雞肉、春野菜。",
        "80度1分30秒。葉子細，稍久就澀。"
      ]
    },
    {
      id: "green-lushan",
      group: "green",
      h: "霧",
      hz: "廬山雲霧",
      hs: "庐山云雾",
      rom: "Lushan Yunwu",
      sub: "Lushan Cloud Mist",
      t: 80,
      tr: "75~85℃",
      l: "3g",
      w: "150ml",
      s: [90, 30, 45],
      ox: 0,
      ko: [
        "여산운무",
        "안개 속에서 자라 잎이 부드러운 장시의 차.",
        "0%",
        "150ml에 3g",
        "3~4회",
        "80도에서 1분, 2포 30초, 3포 45초.",
        "장시성 여산, 해발 800~1,200m. 해마다 안개가 끼는 날이 190일이 넘습니다.",
        "살청 → 유념 → 초건 → 재건. 안개로 잎이 얇고 부드러워 낮은 온도로 천천히 덖습니다.",
        "여산의 차는 당·송대부터 알려졌고, ‘여산운무’라는 이름은 명대 문헌에 보입니다.",
        "부드러운 풀 향과 감칠맛, 떫음이 적습니다.",
        "죽, 흰살생선, 은행.",
        "80도에서 1분. 잎이 얇아 오래 우리지 않습니다."
      ],
      en: [
        "Lushan Yunwu",
        "Grown inside the cloud, with a leaf soft enough to bruise easily.",
        "0%",
        "3 g to 150 ml",
        "3–4 infusions",
        "80 °C: 1 minute, then 30 seconds, then 45.",
        "Mount Lu in Jiangxi, 800–1,200 m, with mist on more than 190 days a year.",
        "Firing → rolling → first drying → second drying. The mist makes the leaf thin and tender, so it is fired slowly at a low heat.",
        "Tea from Mount Lu was known in Tang and Song times; the name Lushan Yunwu appears in Ming records.",
        "Soft grass and umami, with little astringency.",
        "Congee, white fish, ginkgo nuts.",
        "80 °C for 1 minute. The leaf is thin, so don't leave it long."
      ],
      "zh-CN": [
        "庐山云雾",
        "在云雾里长大，叶子薄而柔软，江西名茶。",
        "0%",
        "150毫升配3克",
        "3~4泡",
        "80度泡1分钟，第二泡30秒，第三泡45秒。",
        "江西庐山，海拔800~1200米，一年有190多天起雾。",
        "炒青 → 揉捻 → 初烘 → 复烘。云雾让叶子薄而软，要用低温慢慢焙。",
        "庐山茶在唐宋已知名，“庐山云雾”之名见于明代文献。",
        "柔和的青草香与鲜味，涩感低。",
        "粥、白身鱼、白果。",
        "80度1分钟。叶子薄，不要久泡。"
      ],
      "zh-TW": [
        "廬山雲霧",
        "在雲霧裡長大，葉子薄而柔軟，江西名茶。",
        "0%",
        "150毫升配3公克",
        "3~4泡",
        "80度泡1分鐘，第二泡30秒，第三泡45秒。",
        "江西廬山，海拔800~1200米，一年有190多天起霧。",
        "炒菁 → 揉捻 → 初烘 → 復烘。雲霧讓葉子薄而軟，要用低溫慢慢焙。",
        "廬山茶在唐宋已知名，「廬山雲霧」之名見於明代文獻。",
        "柔和的青草香與鮮味，澀感低。",
        "粥、白身魚、白果。",
        "80度1分鐘。葉子薄，不要久泡。"
      ]
    },
    {
      id: "green-hojicha",
      group: "green",
      alias: ["호지차"],
      h: "焙",
      hz: "焙じ茶",
      hs: "焙茶",
      rom: "Hōjicha",
      sub: "Hojicha",
      t: 95,
      tr: "90~100℃",
      l: "3g",
      w: "130ml",
      s: [30, 20, 30],
      ox: 0,
      ko: [
        "호지",
        "센차를 숯불에 볶아 카페인을 줄이고 고소함을 올린 차.",
        "0%",
        "130ml에 3g",
        "2~3회",
        "95도에서 30초. 끓는 물에 그대로 부어도 됩니다.",
        "일본 교토·시즈오카. 센차의 줄기와 잎을 200도 안팎에서 강하게 볶습니다.",
        "증청 → 유념 → 건조 → 강한 볶음. 열로 카테킨과 카페인의 일부를 바꿔 쓰지 않고 고소하게 만듭니다.",
        "1920년대 교토에서 유통되던 차를 볶아 쓰기 시작한 것이 기원으로 전합니다. 아이와 밤에도 마시는 차로 자리 잡았습니다.",
        "볶은 곡물·카라멜·나무 향, 거의 쓰지 않습니다.",
        "밥, 튀김, 단 디저트. 식후와 밤에.",
        "95도에서 1분. 끓는 물을 그대로 부어도 좋습니다."
      ],
      en: [
        "Hojicha",
        "Sencha roasted over charcoal: less caffeine, more roasted sweetness.",
        "0%",
        "3 g to 130 ml",
        "2–3 infusions",
        "95 °C: 30 seconds. Boiling water straight in is fine.",
        "Kyoto and Shizuoka in Japan. Stems and leaf are roasted hard at around 200 °C.",
        "Steaming → rolling → drying → strong roasting. Heat changes catechins and part of the caffeine, so it turns nutty rather than bitter.",
        "It is said to have begun in 1920s Kyoto by roasting tea that was already in circulation; it became the cup for children and for night.",
        "Roasted grain, caramel and wood, with almost no bitterness.",
        "Rice, fried food, sweet desserts. After meals and at night.",
        "95 °C for 1 minute. Pouring boiling water straight on works."
      ],
      "zh-CN": [
        "焙茶",
        "把煎茶用炭火焙炒，咖啡因更少、焙香更足。",
        "0%",
        "130毫升配3克",
        "2~3泡",
        "95度泡30秒。直接冲沸水也可以。",
        "日本京都、静冈。把煎茶的茎与叶在200度左右强火焙炒。",
        "蒸青 → 揉捻 → 干燥 → 强焙。高温改变儿茶素与部分咖啡因，所以不苦而是焙香。",
        "相传1920年代京都开始把流通中的茶焙炒来喝，后来成了小孩和夜里也能喝的一杯。",
        "焙谷、焦糖与木香，几乎没有苦味。",
        "米饭、油炸、甜点。饭后与夜里。",
        "95度1分钟。直接冲沸水也行。"
      ],
      "zh-TW": [
        "焙茶",
        "把煎茶用炭火焙炒，咖啡因更少、焙香更足。",
        "0%",
        "200毫升配3公克",
        "2~3泡",
        "95度泡1分鐘，第二泡30秒。直接沖沸水也可以。",
        "日本京都、靜岡。把煎茶的莖與葉在200度左右強火焙炒。",
        "蒸菁 → 揉捻 → 乾燥 → 強焙。高溫改變兒茶素與部分咖啡因，所以不苦而是焙香。",
        "相傳1920年代京都開始把流通中的茶焙炒來喝，後來成了小孩和夜裡也能喝的一杯。",
        "焙穀、焦糖與木香，幾乎沒有苦味。",
        "米飯、油炸、甜點。飯後與夜裡。",
        "95度1分鐘。直接沖沸水也行。"
      ]
    },
    {
      id: "green-genmaicha",
      group: "green",
      alias: ["겐마이차"],
      h: "玄",
      hz: "玄米茶",
      hs: "玄米茶",
      rom: "Genmaicha",
      sub: "Genmaicha",
      t: 90,
      tr: "85~95℃",
      l: "3g",
      w: "130ml",
      s: [30, 20, 30],
      ox: 0,
      ko: [
        "겐마이",
        "볶은 현미를 센차에 섞은 차 — 차와 밥의 중간.",
        "0%",
        "130ml에 3g (현미 포함)",
        "2~3회",
        "90도에서 30초.",
        "일본 전역. 볶은 현미와 센차를 1:1~1:2로 섞습니다.",
        "현미를 볶아 터뜨린 뒤 증청한 센차와 섞습니다.",
        "에도 시대 서민이 적은 차를 아끼려 현미를 섞은 데서 시작했다는 이야기가 전합니다.",
        "누룽지·팝콘 같은 고소함에 센차의 풀 향.",
        "주먹밥, 튀김, 매운 안주.",
        "90도에서 1분. 현미가 뜨면 잠시 기다렸다 마십니다."
      ],
      en: [
        "Genmaicha",
        "Sencha with roasted brown rice — halfway between tea and rice.",
        "0%",
        "3 g to 130 ml (rice included)",
        "2–3 infusions",
        "90 °C: 30 seconds.",
        "Across Japan. Roasted brown rice and sencha at roughly 1:1 to 1:2.",
        "Brown rice is roasted until it pops, then mixed with steamed sencha.",
        "It is said Edo-era households stretched a little tea by mixing in rice.",
        "Scorched rice and popcorn over sencha's green edge.",
        "Onigiri, tempura, spicy snacks.",
        "90 °C for 1 minute. Let the rice settle before drinking."
      ],
      "zh-CN": [
        "玄米茶",
        "把焙炒的糙米混进煎茶——茶与饭之间的一杯。",
        "0%",
        "130毫升配3克（含玄米）",
        "2~3泡",
        "90度泡30秒。",
        "日本各地。焙炒糙米与煎茶按1:1~1:2混合。",
        "糙米炒到爆开，再与蒸青煎茶混合。",
        "相传江户时代百姓为省茶而掺入玄米，由此开始。",
        "锅巴、爆米花般的香，加上煎茶的青草气。",
        "饭团、天妇罗、辣味小食。",
        "90度1分钟。玄米浮起时稍等再喝。"
      ],
      "zh-TW": [
        "玄米茶",
        "把焙炒的糙米混進煎茶——茶與飯之間的一杯。",
        "0%",
        "200毫升配3公克（含玄米）",
        "2~3泡",
        "90度泡1分鐘，第二泡30秒。",
        "日本各地。焙炒糙米與煎茶按1:1~1:2混合。",
        "糙米炒到爆開，再與蒸菁煎茶混合。",
        "相傳江戶時代百姓為省茶而摻入玄米，由此開始。",
        "鍋巴、爆米花般的香，加上煎茶的青草氣。",
        "飯糰、天婦羅、辣味小食。",
        "90度1分鐘。玄米浮起時稍等再喝。"
      ]
    },
    /* ── 한국 잎차 ── */
    {
      id: "green-hadong",
      group: "green",
      h: "雨",
      hz: "河東雨前",
      hs: "河东雨前",
      rom: "Ujeon (Hadong)",
      sub: "Ujeon (Hadong)",
      alias: ["하동 우전"],
      t: 75,
      tr: "70~80℃",
      l: "3g",
      w: "150ml",
      s: [90, 30, 60],
      ox: 0,
      ko: [
        "우전 (하동)",
        "곡우 전, 지리산 자락에서 딴 한 해의 첫 잎.",
        "0%",
        "150ml에 3g",
        "3~4회",
        "75도에서 1분 30초, 2포 30초, 3포 1분.",
        "경남 하동 화개·악양, 지리산 남쪽 자락 해발 200~800m의 야생 차밭.",
        "살청(덖음) → 유념 → 건조. 화개 지역은 손으로 덖는 전통을 지켜 잎에 주름이 살아 있습니다.",
        "하동은 신라 흥덕왕 때 차를 들여왔다는 기록이 있는 한국 차의 오랜 산지입니다. 우전은 곡우(4월 20일경) 전에 딴 가장 이른 잎을 말합니다.",
        "풋풋한 잎 향에 고소함, 떫음이 적고 감칠맛이 길게 남습니다.",
        "나물 비빔밥, 생선구이, 전, 유자 디저트.",
        "70~80도. 첫 물 1분 30초를 넘기지 않으면 떫지 않습니다."
      ],
      en: [
        "Ujeon (Hadong)",
        "The year's first leaf from the foot of Jirisan, picked before Grain Rain.",
        "0%",
        "3 g to 150 ml",
        "3–4 infusions",
        "75 °C: 1½ minutes, then 30 seconds, then 1 minute.",
        "Hwagae and Agyang in Hadong, on the southern slope of Mount Jiri, wild gardens at 200–800 m.",
        "Pan-firing → rolling → drying. Hwagae keeps the hand-fired tradition, so the leaf stays crumpled.",
        "Hadong is one of Korea's oldest tea districts, with records of tea arriving under King Heungdeok of Silla. Ujeon means the earliest pick before Grain Rain (around 20 April).",
        "Fresh green leaf with a toasted note, little astringency and a long umami.",
        "Herb bibimbap, grilled fish, jeon pancakes, citron desserts.",
        "70–80 °C. Keep the first pour under 1½ minutes and it won't turn bitter."
      ],
      "zh-CN": [
        "河东雨前",
        "谷雨前，在智异山脚下采下的一年第一片叶。",
        "0%",
        "150毫升配3克",
        "3~4泡",
        "75度泡1分30秒，第二泡30秒，第三泡1分钟。",
        "庆南河东花开、岳阳，智异山南麓海拔200~800米的野生茶园。",
        "炒青 → 揉捻 → 干燥。花开保留手工炒制传统，叶上留着褶皱。",
        "河东是新罗兴德王时期就有茶传入记载的韩国古老产区。雨前指谷雨（4月20日前后）前采的最早一批。",
        "青草香带焙香，涩味少，鲜味长。",
        "野菜拌饭、烤鱼、煎饼、柚子甜点。",
        "70~80度。第一泡不超过1分30秒就不涩。"
      ],
      "zh-TW": [
        "河東雨前",
        "穀雨前，在智異山腳下採下的一年第一片葉。",
        "0%",
        "150毫升配3公克",
        "3~4泡",
        "75度泡1分30秒，第二泡30秒，第三泡1分鐘。",
        "慶南河東花開、岳陽，智異山南麓海拔200~800米的野生茶園。",
        "炒菁 → 揉捻 → 乾燥。花開保留手工炒製傳統，葉上留著皺褶。",
        "河東是新羅興德王時期就有茶傳入記載的韓國古老產區。雨前指穀雨（4月20日前後）前採的最早一批。",
        "青草香帶焙香，澀味少，鮮味長。",
        "野菜拌飯、烤魚、煎餅、柚子甜點。",
        "70~80度。第一泡不超過1分30秒就不澀。"
      ]
    },
    {
      id: "green-sejak",
      group: "green",
      h: "細",
      hz: "細雀",
      hs: "细雀",
      rom: "Sejak",
      sub: "Sejak",
      t: 80,
      tr: "75~85℃",
      s: [75, 30, 45],
      ox: 0,
      ko: [
        "세작",
        "곡우 뒤 입하 전, 참새 혀처럼 여린 두 번째 잎.",
        "0%",
        "150ml에 3g",
        "3회",
        "80도에서 1분 15초, 2포 30초, 3포 45초.",
        "하동·보성·제주. 우전 다음, 곡우에서 입하 사이에 딴 잎.",
        "살청 → 유념 → 건조. 우전보다 잎이 조금 굵고 향이 진합니다.",
        "‘세작(細雀)’은 참새의 혀처럼 작다는 뜻으로, 채취 시기로 등급을 나누는 한국 차의 이름입니다.",
        "우전보다 진한 풀 향과 고소함, 끝에 가벼운 떫음.",
        "보리밥, 된장국, 조림.",
        "80도에서 1분 15초. 우전보다 5도 높여도 좋습니다."
      ],
      en: [
        "Sejak",
        "After Grain Rain and before early summer: the second pick, tender as a sparrow's tongue.",
        "0%",
        "3 g to 150 ml",
        "3 infusions",
        "80 °C: 1¼ minutes, then 30 seconds, then 45.",
        "Hadong, Boseong and Jeju, picked between Grain Rain and the start of summer.",
        "Firing → rolling → drying. The leaf is a little coarser than ujeon and the aroma stronger.",
        "Sejak means fine sparrow, the name of a Korean grade set by picking date.",
        "Stronger grass and toast than ujeon, with a light astringency at the end.",
        "Barley rice, soybean-paste soup, braised dishes.",
        "80 °C for 1¼ minutes; five degrees above ujeon suits it."
      ],
      "zh-CN": [
        "细雀",
        "谷雨后、立夏前，像麻雀舌头一样细嫩的第二批叶。",
        "0%",
        "150毫升配3克",
        "3泡",
        "80度泡1分15秒，第二泡30秒，第三泡45秒。",
        "河东、宝城、济州。雨前之后、谷雨到立夏之间采的叶。",
        "炒青 → 揉捻 → 干燥。叶比雨前略粗，香气更浓。",
        "“细雀”意为像麻雀舌一样小，是韩国按采摘时间分级的名称。",
        "青草香与焙香比雨前更浓，尾端略带涩。",
        "大麦饭、大酱汤、炖菜。",
        "80度1分15秒。比雨前高5度也合适。"
      ],
      "zh-TW": [
        "細雀",
        "穀雨後、立夏前，像麻雀舌頭一樣細嫩的第二批葉。",
        "0%",
        "150毫升配3公克",
        "3泡",
        "80度泡1分15秒，第二泡30秒，第三泡45秒。",
        "河東、寶城、濟州。雨前之後、穀雨到立夏之間採的葉。",
        "炒菁 → 揉捻 → 乾燥。葉比雨前略粗，香氣更濃。",
        "「細雀」意為像麻雀舌一樣小，是韓國按採摘時間分級的名稱。",
        "青草香與焙香比雨前更濃，尾端略帶澀。",
        "大麥飯、大醬湯、燉菜。",
        "80度1分15秒。比雨前高5度也合適。"
      ]
    },
    {
      id: "green-jungjak",
      group: "green",
      h: "中",
      hz: "中雀",
      hs: "中雀",
      rom: "Jungjak",
      sub: "Jungjak",
      t: 85,
      tr: "80~90℃",
      s: [60, 30, 45],
      ox: 0,
      ko: [
        "중작",
        "입하 뒤 망종 전, 잎이 두꺼워진 세 번째 잎.",
        "0%",
        "150ml에 3g",
        "3회",
        "85도에서 1분, 2포 30초, 3포 45초.",
        "하동·보성. 입하에서 망종 사이, 잎이 두툼해지는 시기의 차.",
        "살청 → 유념 → 건조. 잎이 두꺼워 우전보다 센 불에 짧게 덖습니다.",
        "중작은 ‘중간 참새’라는 뜻으로, 우전·세작보다 늦게 딴 등급입니다.",
        "구수함과 떫음이 함께, 물색은 짙은 연둣빛.",
        "된장찌개, 고등어구이, 김치전.",
        "85도에서 1분. 잎이 두꺼워도 1분을 넘기면 떫습니다."
      ],
      en: [
        "Jungjak",
        "Between early summer and Grain in Ear: the third pick, when the leaf thickens.",
        "0%",
        "3 g to 150 ml",
        "3 infusions",
        "85 °C: 1 minute, then 30 seconds, then 45.",
        "Hadong and Boseong, from the early-summer pick as the leaf thickens.",
        "Firing → rolling → drying. Thicker leaf, so a hotter, shorter firing than ujeon.",
        "Jungjak means middle sparrow, a grade picked after ujeon and sejaak.",
        "Toast and astringency together; the liquor is a deep green.",
        "Soybean-paste stew, grilled mackerel, kimchi pancakes.",
        "85 °C for 1 minute. Even a thick leaf turns bitter past it."
      ],
      "zh-CN": [
        "中雀",
        "立夏后、芒种前，叶片变厚的第三批。",
        "0%",
        "150毫升配3克",
        "3泡",
        "85度泡1分钟，第二泡30秒，第三泡45秒。",
        "河东、宝城。立夏到芒种之间，叶片变厚的时期。",
        "炒青 → 揉捻 → 干燥。叶片厚，用比雨前更高的火短炒。",
        "“中雀”是中等麻雀之意，比雨前、细雀更晚采的等级。",
        "焙香与涩味并存，汤色深绿。",
        "大酱汤、烤青花鱼、泡菜煎饼。",
        "85度1分钟。叶再厚，超过1分钟也会涩。"
      ],
      "zh-TW": [
        "中雀",
        "立夏後、芒種前，葉片變厚的第三批。",
        "0%",
        "150毫升配3公克",
        "3泡",
        "85度泡1分鐘，第二泡30秒，第三泡45秒。",
        "河東、寶城。立夏到芒種之間，葉片變厚的時期。",
        "炒菁 → 揉捻 → 乾燥。葉片厚，用比雨前更高的火短炒。",
        "「中雀」是中等麻雀之意，比雨前、細雀更晚採的等級。",
        "焙香與澀味並存，湯色深綠。",
        "大醬湯、烤青花魚、泡菜煎餅。",
        "85度1分鐘。葉再厚，超過1分鐘也會澀。"
      ]
    },
    {
      id: "green-daejak",
      group: "green",
      h: "大",
      hz: "大雀",
      hs: "大雀",
      rom: "Daejak",
      sub: "Daejak",
      t: 90,
      tr: "85~95℃",
      s: [60, 30, 45],
      ox: 0,
      ko: [
        "대작",
        "여름에 딴 굵은 잎 — 매일 마시는 한국의 생활차.",
        "0%",
        "150ml에 3g, 끓여 마셔도",
        "2~3회",
        "90도에서 1분, 2포 30초. 주전자에 끓여도 좋습니다.",
        "하동·보성·제주. 망종 이후 여름철에 딴 잎.",
        "살청 → 유념 → 건조. 잎이 굵어 덖는 시간이 길고 대량으로 만들어집니다.",
        "‘대작’은 큰 참새라는 뜻으로, 채취 등급의 마지막 자리입니다. 식당에서 흔히 쓰는 자리이기도 합니다.",
        "구수함과 뚜렷한 떫음, 뜨거울 때보다 식으면 부드럽습니다.",
        "매운 찌개, 고기 요리, 식당 밥.",
        "90도 이상. 끓는 물에 오래 우리면 떫으니 1분을 지키세요."
      ],
      en: [
        "Daejak",
        "The coarse summer leaf — Korea's everyday cup.",
        "0%",
        "3 g to 150 ml; good simmered",
        "2–3 infusions",
        "90 °C: 1 minute, then 30 seconds. A pot on the stove works too.",
        "Hadong, Boseong and Jeju, picked in summer after Grain in Ear.",
        "Firing → rolling → drying. Coarse leaf, longer firing, made in quantity.",
        "Daejak means big sparrow, the last grade of the picking year — the cup restaurants pour.",
        "Toast with a clear astringency that softens as the cup cools.",
        "Spicy stews, meat dishes, plain rice.",
        "90 °C or above. Long steeping in boiling water turns it bitter; keep it to a minute."
      ],
      "zh-CN": [
        "大雀",
        "夏天采的粗叶——韩国每天喝的生活茶。",
        "0%",
        "150毫升配3克，也可煮",
        "2~3泡",
        "90度泡1分钟，第二泡30秒。用壶煮也可以。",
        "河东、宝城、济州。芒种之后夏季采的叶。",
        "炒青 → 揉捻 → 干燥。叶粗、炒得久，产量大。",
        "“大雀”意为大麻雀，是采摘等级的最后一档，也是餐馆常备的茶。",
        "焙香与明显的涩，凉下来会变柔和。",
        "辣汤、肉类料理、白饭。",
        "90度以上。沸水久泡会涩，控制在1分钟。"
      ],
      "zh-TW": [
        "大雀",
        "夏天採的粗葉——韓國每天喝的生活茶。",
        "0%",
        "150毫升配3公克，也可煮",
        "2~3泡",
        "90度泡1分鐘，第二泡30秒。用壺煮也可以。",
        "河東、寶城、濟州。芒種之後夏季採的葉。",
        "炒菁 → 揉捻 → 乾燥。葉粗、炒得久，產量大。",
        "「大雀」意為大麻雀，是採摘等級的最後一檔，也是餐館常備的茶。",
        "焙香與明顯的澀，涼下來會變柔和。",
        "辣湯、肉類料理、白飯。",
        "90度以上。沸水久泡會澀，控制在1分鐘。"
      ]
    },
    {
      id: "green-jukro",
      group: "green",
      h: "竹",
      hz: "竹露茶",
      hs: "竹露茶",
      rom: "Jukro",
      sub: "Jukro",
      t: 75,
      tr: "70~80℃",
      l: "3g",
      w: "150ml",
      s: [90, 30, 60],
      ox: 0,
      ko: [
        "죽로차",
        "하동 야생 차나무를 손으로 덖어 만드는, 한국 녹차의 가장 오래된 방식.",
        "0%",
        "150ml에 3g",
        "3~4회",
        "75도에서 1분 30초, 2포 30초, 3포 1분.",
        "경남 하동 악양·화개. 뿌리가 깊은 야생 차나무의 봄잎.",
        "살청 → 유념 → 건조. 모두 손으로 하며, 가마솥에서 두 손으로 300번 넘게 뒤집어 덖습니다.",
        "‘죽로(竹露)’는 대나무에 맺힌 이슬이라는 뜻으로, 하동 악양의 차밭 이름에서 왔다는 설이 있습니다.",
        "야생 차 특유의 깊은 감칠맛과 꽃 향, 떫음이 적습니다.",
        "나물, 버섯, 담백한 생선, 한과.",
        "75도에서 1분 30초. 손으로 덖은 잎은 물을 넉넉히 머금습니다."
      ],
      en: [
        "Jukro",
        "Wild Hadong bushes fired entirely by hand — the oldest way of making Korean green tea.",
        "0%",
        "3 g to 150 ml",
        "3–4 infusions",
        "75 °C: 1½ minutes, then 30 seconds, then 1 minute.",
        "Agyang and Hwagae in Hadong, from deep-rooted wild tea bushes.",
        "Firing → rolling → drying, all by hand: more than 300 turns in an iron pot with both palms.",
        "Jukro means bamboo dew, said to come from the name of a tea garden in Agyang.",
        "The deep umami and floral note of wild leaf, with little astringency.",
        "Wild greens, mushrooms, light fish, Korean sweets.",
        "75 °C for 1½ minutes. Hand-fired leaf holds plenty of water."
      ],
      "zh-CN": [
        "竹露茶",
        "用手工炒制河东野生茶树的韩国最古老绿茶做法。",
        "0%",
        "150毫升配3克",
        "3~4泡",
        "75度泡1分30秒，第二泡30秒，第三泡1分钟。",
        "庆南河东岳阳、花开的深根野生茶树。",
        "炒青 → 揉捻 → 干燥，全部手工，在铁锅里用手翻300多次。",
        "“竹露”指竹叶上的露水，据说来自岳阳一处茶园的名字。",
        "野生茶特有的深厚鲜味与花香，涩味少。",
        "野菜、菌菇、清淡的鱼、韩式点心。",
        "75度1分30秒。手工炒的叶子吸水量大。"
      ],
      "zh-TW": [
        "竹露茶",
        "用手工炒製河東野生茶樹的韓國最古老綠茶做法。",
        "0%",
        "150毫升配3公克",
        "3~4泡",
        "75度泡1分30秒，第二泡30秒，第三泡1分鐘。",
        "慶南河東岳陽、花開的深根野生茶樹。",
        "炒菁 → 揉捻 → 乾燥，全部手工，在鐵鍋裡用手翻300多次。",
        "「竹露」指竹葉上的露水，據說來自岳陽一處茶園的名字。",
        "野生茶特有的深厚鮮味與花香，澀味少。",
        "野菜、菌菇、清淡的魚、韓式點心。",
        "75度1分30秒。手工炒的葉子吸水量大。"
      ]
    },
    /* ── 황차 ── */
    {
      id: "yellow-junshan",
      group: "yellow",
      h: "君",
      hz: "君山銀針",
      hs: "君山银针",
      rom: "Junshan Yinzhen",
      sub: "Junshan Silver Needle",
      t: 85,
      l: "3g",
      w: "150ml",
      s: [90, 60, 90],
      ox: 10,
      ko: [
        "군산은침",
        "둥팅호의 섬에서 나는, 황차 가운데 가장 이름난 은침.",
        "10%",
        "150ml에 3g",
        "3회",
        "85도에서 1분 30초, 2포 1분, 3포 1분 30초.",
        "후난성 웨양 둥팅호의 군산도, 해발 50~100m의 섬 차밭.",
        "살청 → 초홍 → 종이에 싸서 민황(초포) → 복홍 → 재포 → 족화. 싹의 원형을 그대로 지키며 만들며, 우릴 때 싹이 물에 서는 것으로 유명합니다.",
        "당나라 때 이름이 났고 오대(五代)부터 공차로 바쳐졌으며, 청나라 때는 ‘황금보다 귀하다’는 말이 있었습니다. 우릴 때 싹이 세 번 오르내린다는 이야기가 전합니다.",
        "옅은 노란 물색, 옥수수·버터 같은 단맛, 떫음이 거의 없습니다.",
        "담백한 생선찜, 죽, 은행.",
        "85도. 유리잔에 우리면 싹이 서는 모습을 볼 수 있습니다."
      ],
      en: [
        "Junshan Yinzhen",
        "The best known silver needle of the yellow teas, from an island in Dongting Lake.",
        "10%",
        "3 g to 150 ml",
        "3 infusions",
        "85 °C: 1½ minutes, then 1 minute, then 1½.",
        "Junshan Island in Dongting Lake, Hunan, gardens 50–100 m above the water.",
        "Firing → first bake → wrapped in paper to yellow → rebaked → rewrapped → finished over fire. The buds keep their natural shape; in the glass they are famous for standing upright.",
        "Famed in Tang times and sent as tribute from the Five Dynasties on, under the Qing it was said to be worth more than gold. Tradition says the buds rise and fall three times as they steep.",
        "A pale yellow liquor, corn-and-butter sweetness, almost no astringency.",
        "Steamed fish, congee, ginkgo nuts.",
        "85 °C. In a glass you can watch the buds stand up."
      ],
      "zh-CN": [
        "君山银针",
        "产于洞庭湖小岛，黄茶中最有名的银针。",
        "10%",
        "150毫升配3克",
        "3泡",
        "85度泡1分30秒，第二泡1分钟，第三泡1分30秒。",
        "湖南岳阳洞庭湖君山岛，海拔50~100米的岛上茶园。",
        "杀青 → 初烘 → 纸包闷黄（初包）→ 复烘 → 复包 → 足火。保持芽的原形，冲泡时芽竖立是它的标志。",
        "唐代盛名，五代起为贡茶，清代有“贵于黄金”之说。相传冲泡时芽会在杯中三起三落。",
        "汤色浅黄，玉米与奶油般的甜，几乎没有涩味。",
        "清蒸鱼、粥、白果。",
        "85度。用玻璃杯能看见芽竖起来的样子。"
      ],
      "zh-TW": [
        "君山銀針",
        "產於洞庭湖小島，黃茶中最有名的銀針。",
        "10%",
        "150毫升配3公克",
        "3泡",
        "85度泡1分30秒，第二泡1分鐘，第三泡1分30秒。",
        "湖南岳陽洞庭湖君山島，海拔50~100米的島上茶園。",
        "殺菁 → 初烘 → 紙包悶黃（初包）→ 復烘 → 復包 → 足火。保持芽的原形，沖泡時芽豎立是它的標誌。",
        "唐代盛名，五代起為貢茶，清代有「貴於黃金」之說。相傳沖泡時芽會在杯中三起三落。",
        "湯色淺黃，玉米與奶油般的甜，幾乎沒有澀味。",
        "清蒸魚、粥、白果。",
        "85度。用玻璃杯能看見芽豎起來的樣子。"
      ]
    },
    {
      id: "yellow-mengding",
      group: "yellow",
      h: "蒙",
      hz: "蒙頂黃芽",
      hs: "蒙顶黄芽",
      rom: "Mengding Huangya",
      sub: "Mengding Yellow Bud",
      t: 85,
      l: "3g",
      w: "150ml",
      s: [90, 60, 90],
      ox: 15,
      ko: [
        "몽정황아",
        "쓰촨 몽정산의 가장 오래된 명차 — 황차의 원형.",
        "15%",
        "150ml에 3g",
        "3회",
        "85도에서 1분 30초, 2포 1분, 3포 1분 30초.",
        "쓰촨성 야안 몽정산, 해발 1,000~1,400m. ‘하늘에 닿은 지붕’이라는 이름의 차밭.",
        "살청 → 민황 → 건조. 싹을 솥에 덖은 뒤 쌓아 두어 스스로 노랗게 익게 합니다.",
        "서한 때 차를 심었다는 전승이 있는 산지로, 당나라 때부터 공차로 바쳐진 중국에서 가장 오래된 명차 가운데 하나입니다.",
        "옥수수·버터·은은한 꽃 향, 부드러운 단맛.",
        "중식, 죽, 달걀 요리.",
        "85도에서 1분 30초. 민황한 잎은 열에 약합니다."
      ],
      en: [
        "Mengding Huangya",
        "The oldest famous tea of Mount Mengding in Sichuan — the original yellow tea.",
        "15%",
        "3 g to 150 ml",
        "3 infusions",
        "85 °C: 1½ minutes, then 1 minute, then 1½.",
        "Mount Mengding in Ya'an, Sichuan, 1,000–1,400 m — the name means a roof that reaches heaven.",
        "Firing → menhuang → drying. The buds are fired in a pan, then piled so they yellow on their own.",
        "Tradition says tea was planted here in the Western Han; sent as tribute from the Tang on, it is among China's oldest famous teas.",
        "Corn, butter and a quiet floral note, with a soft sweetness.",
        "Chinese dishes, congee, egg dishes.",
        "85 °C for 1½ minutes. Yellowed leaf dislikes heat."
      ],
      "zh-CN": [
        "蒙顶黄芽",
        "四川蒙顶山最古老的名茶——黄茶的原型。",
        "15%",
        "150毫升配3克",
        "3泡",
        "85度泡1分30秒，第二泡1分钟，第三泡1分30秒。",
        "四川雅安蒙顶山，海拔1000~1400米，名字意为“上接天顶”的茶园。",
        "杀青 → 闷黄 → 干燥。芽在锅里炒过再堆起来，让它自己转黄。",
        "相传西汉已在此种茶，唐代起为贡茶，是中国最古老的名茶之一。",
        "玉米、奶油与淡淡花香，柔和的甜。",
        "中餐、粥、蛋类料理。",
        "85度1分30秒。闷黄过的叶子怕热。"
      ],
      "zh-TW": [
        "蒙頂黃芽",
        "四川蒙頂山最古老的名茶——黃茶的原型。",
        "15%",
        "150毫升配3公克",
        "3泡",
        "85度泡1分30秒，第二泡1分鐘，第三泡1分30秒。",
        "四川雅安蒙頂山，海拔1000~1400米，名字意為「上接天頂」的茶園。",
        "殺菁 → 悶黃 → 乾燥。芽在鍋裡炒過再堆起來，讓它自己轉黃。",
        "相傳西漢已在此種茶，唐代起為貢茶，是中國最古老的名茶之一。",
        "玉米、奶油與淡淡花香，柔和的甜。",
        "中餐、粥、蛋類料理。",
        "85度1分30秒。悶黃過的葉子怕熱。"
      ]
    },
    {
      id: "yellow-huoshan",
      group: "yellow",
      h: "霍",
      hz: "霍山黃芽",
      hs: "霍山黄芽",
      rom: "Huoshan Huangya",
      sub: "Huoshan Yellow Bud",
      t: 85,
      l: "3g",
      w: "150ml",
      s: [80, 60, 80],
      ox: 15,
      ko: [
        "곽산황아",
        "안후이 곽산의 작은 황차 — 대나무 숲 사이 차밭.",
        "15%",
        "150ml에 3g",
        "3회",
        "85도에서 1분 20초, 2포 1분, 3포 1분 20초.",
        "안후이성 곽산, 해발 400~800m의 대나무 숲 사이 차밭.",
        "살청 → 민황 → 건조. 잎을 살짝 덖어 민황한 뒤 낮은 온도로 말립니다.",
        "명나라 때 곽산의 차가 공차로 올라갔다는 기록이 있습니다. 오랫동안 소량만 만들어졌습니다.",
        "부드러운 곡물 향과 단맛, 끝의 옅은 떫음.",
        "담백한 중식, 죽, 견과.",
        "85도에서 1분 20초. 잎이 작아 금방 우러납니다."
      ],
      en: [
        "Huoshan Huangya",
        "A small yellow tea from Huoshan, grown among bamboo.",
        "15%",
        "3 g to 150 ml",
        "3 infusions",
        "85 °C: 1¼ minutes, then 1 minute, then 1¼.",
        "Huoshan in Anhui, gardens at 400–800 m among bamboo groves.",
        "Firing → menhuang → drying. The leaf is lightly fired, yellowed, then dried at low heat.",
        "Ming records list Huoshan tea as tribute; for centuries it was made only in small amounts.",
        "Soft grain and sweetness with a faint astringency at the end.",
        "Light Chinese dishes, congee, nuts.",
        "85 °C for 1¼ minutes. The small leaf opens quickly."
      ],
      "zh-CN": [
        "霍山黄芽",
        "安徽霍山的小叶黄茶——竹林中生长的茶园。",
        "15%",
        "150毫升配3克",
        "3泡",
        "85度泡1分20秒，第二泡1分钟，第三泡1分20秒。",
        "安徽霍山，海拔400~800米的竹林间茶园。",
        "杀青 → 闷黄 → 干燥。轻炒后闷黄，再低温烘干。",
        "明代有霍山茶入贡的记载，长期只少量制作。",
        "柔和的谷物香与甜，尾端淡淡涩感。",
        "清淡中餐、粥、坚果。",
        "85度1分20秒。叶小，出味快。"
      ],
      "zh-TW": [
        "霍山黃芽",
        "安徽霍山的小葉黃茶——竹林中生長的茶園。",
        "15%",
        "150毫升配3公克",
        "3泡",
        "85度泡1分20秒，第二泡1分鐘，第三泡1分20秒。",
        "安徽霍山，海拔400~800米的竹林間茶園。",
        "殺菁 → 悶黃 → 乾燥。輕炒後悶黃，再低溫烘乾。",
        "明代有霍山茶入貢的記載，長期只少量製作。",
        "柔和的穀物香與甜，尾端淡淡澀感。",
        "清淡中餐、粥、堅果。",
        "85度1分20秒。葉小，出味快。"
      ]
    },
    /* ── 우롱차 ── */
    {
      id: "oolong-tieguanyin",
      group: "oolong",
      h: "鐵",
      hz: "安溪鐵觀音",
      hs: "安溪铁观音",
      rom: "Anxi Tieguanyin",
      sub: "Anxi Tieguanyin",
      alias: ["안계 철관음", "안계철관음", "철관음"],
      t: 95,
      l: "7g",
      w: "110ml",
      s: [45, 20, 30],
      ox: 30,
      ko: [
        "철관음 (안계)",
        "난초 향과 관음운(觀音韻) — 반구형으로 뭉친 우롱차의 대표.",
        "30%",
        "개완 110ml에 7g",
        "7~8회",
        "95도에서 45초, 2포 20초, 3포 30초. 이후 5초씩 늘립니다.",
        "푸젠성 안시, 해발 600~1,000m. 붉은 흙과 안개가 잎을 두겁게 합니다.",
        "위조 → 요청(6~8회) → 살청 → 유념(천으로 싸서 반구형으로 뭉침) → 건조 → 약한 배화.",
        "1720년대 안시 송암촌의 차농 위음이 관음암 근처에서 찾은 나무에서 시작되었다는 이야기가 전합니다. 이름은 철처럼 무겁고 관음보살처럼 자비롭다는 뜻으로 풀이됩니다.",
        "난초·백합 향, 크림 같은 질감, 끝의 옅은 떫음과 돌아오는 단맛(회감).",
        "구운 고기, 치즈, 견과, 우롱 밀크티.",
        "첫 물은 세차로 버립니다. 구형 차는 포다에 충분히 열려야 하므로 45초를 지키세요."
      ],
      en: [
        "Anxi Tieguanyin",
        "Orchid aroma and guanyin yun — the benchmark oolong, rolled into tight hemispheres.",
        "30%",
        "7 g to 110 ml in a gaiwan",
        "7–8 infusions",
        "95 °C: 45 seconds, then 20, then 30, adding 5 seconds each time.",
        "Anxi in Fujian, 600–1,000 m, where red soil and mist thicken the leaf.",
        "Withering → bruising (6–8 rounds) → firing → rolling into cloth-wrapped balls → drying → light roasting.",
        "Tradition traces it to a bush found near the Guanyin temple by Wei Yin of Songyan village in the 1720s; the name is read as heavy as iron and as merciful as Guanyin.",
        "Orchid and lily, a creamy texture, a faint astringency that turns into returning sweetness.",
        "Grilled meat, cheese, nuts, oolong milk tea.",
        "Rinse the first pour away. A rolled tea needs the full 45 seconds to open."
      ],
      "zh-CN": [
        "安溪铁观音",
        "兰花香气与“观音韵”——揉成半球形的乌龙茶代表。",
        "30%",
        "盖碗110毫升配7克",
        "7~8泡",
        "95度泡45秒，第二泡20秒，第三泡30秒，之后每次加5秒。",
        "福建安溪，海拔600~1000米，红壤与云雾让叶片变厚。",
        "萎凋 → 摇青（6~8次）→ 杀青 → 揉捻（布包揉成半球）→ 干燥 → 轻焙火。",
        "相传1720年代安溪松岩村茶农魏荫在观音岩附近发现一株茶树，由此开始。名字被解为“铁一般重、观音般慈悲”。",
        "兰花与百合香，奶油般的质地，尾端轻涩转为回甘。",
        "烤肉、奶酪、坚果、乌龙奶茶。",
        "第一泡洗茶倒掉。球形茶第一泡要足45秒才展开。"
      ],
      "zh-TW": [
        "安溪鐵觀音",
        "蘭花香氣與「觀音韻」——揉成半球形的烏龍茶代表。",
        "30%",
        "蓋碗110毫升配7公克",
        "7~8泡",
        "95度泡45秒，第二泡20秒，第三泡30秒，之後每次加5秒。",
        "福建安溪，海拔600~1000米，紅壤與雲霧讓葉片變厚。",
        "萎凋 → 搖菁（6~8次）→ 殺菁 → 揉捻（布包揉成半球）→ 乾燥 → 輕焙火。",
        "相傳1720年代安溪松岩村茶農魏蔭在觀音岩附近發現一株茶樹，由此開始。名字被解為「鐵一般重、觀音般慈悲」。",
        "蘭花與百合香，奶油般的質地，尾端輕澀轉為回甘。",
        "烤肉、起司、堅果、烏龍奶茶。",
        "第一泡洗茶倒掉。球形茶第一泡要足45秒才展開。"
      ]
    },
    {
      id: "oolong-dahongpao",
      group: "oolong",
      h: "袍",
      hz: "武夷大紅袍",
      hs: "武夷大红袍",
      rom: "Da Hong Pao (Wuyi)",
      sub: "Da Hong Pao (Wuyi)",
      alias: ["무이 대홍포", "대홍포", "무이 암차"],
      t: 98,
      tr: "95~100℃",
      l: "7g",
      w: "110ml",
      s: [30, 20, 25],
      ox: 55,
      ko: [
        "대홍포 (무이)",
        "바위 틈에서 자란 잎을 강하게 배화한, 암운(岩韻)의 차.",
        "55%",
        "개완 110ml에 7g",
        "8~10회",
        "98도에서 30초, 2포 20초, 3포 25초.",
        "푸젠성 우이산, 해발 300~600m의 붉은 사암 협곡. 바위 그늘과 계곡 물이 향을 만듭니다.",
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화(숯불에 3~6회).",
        "명나라 때 과거길의 수재 정현(丁顯)이 우이산의 차로 병이 나은 뒤 붉은 도포를 바위에 걸었다는 전설이 있습니다. 모수는 구룡과(九龍窠) 절벽의 여섯 그루로 전합니다.",
        "구운 곡물·코코아·젖은 바위 냄새, 두꺼운 바디, 긴 여운.",
        "양고기, 훈제 오리, 된장 요리, 다크초콜릿.",
        "끓는 물 98~100도. 첫 물은 세차. 배화한 차는 3포부터 향이 열립니다."
      ],
      en: [
        "Da Hong Pao (Wuyi)",
        "Rock-grown leaf roasted hard — the tea of yan yun, the rock rhyme.",
        "55%",
        "7 g to 110 ml in a gaiwan",
        "8–10 infusions",
        "98 °C: 30 seconds, then 20, then 25.",
        "The red sandstone gorges of Mount Wuyi in Fujian, 300–600 m; rock shade and stream water make the aroma.",
        "Withering → bruising → firing → rolling → drying → charcoal roasting, three to six times.",
        "Legend has it that Ding Xian, a scholar on his way to the examinations, was cured by Wuyi tea and hung his red robe on the rock in thanks; the mother bushes are the six on the Jiulongke cliff.",
        "Roasted grain, cocoa and wet rock, a thick body and a long finish.",
        "Lamb, smoked duck, soybean-paste dishes, dark chocolate.",
        "98–100 °C. Rinse first. A roasted tea opens from the third infusion."
      ],
      "zh-CN": [
        "武夷大红袍",
        "岩缝里长出的叶子重度焙火——岩韵之茶。",
        "55%",
        "盖碗110毫升配7克",
        "8~10泡",
        "98度泡30秒，第二泡20秒，第三泡25秒。",
        "福建武夷山，海拔300~600米的红色砂岩峡谷，岩荫与溪水造就香气。",
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 炭焙（3~6次）。",
        "相传明代赴考的书生丁显因武夷茶治愈顽疾，把红袍披在岩上以示感恩；母树为九龙窠岩壁上的六株。",
        "焙谷、可可与湿岩气息，汤体厚，余韵长。",
        "羊肉、熏鸭、大酱料理、黑巧克力。",
        "98~100度沸水。第一泡洗茶。焙火车从第三泡开始展开。"
      ],
      "zh-TW": [
        "武夷大紅袍",
        "岩縫裡長出的葉子重度焙火——岩韻之茶。",
        "55%",
        "蓋碗110毫升配7公克",
        "8~10泡",
        "98度泡30秒，第二泡20秒，第三泡25秒。",
        "福建武夷山，海拔300~600米的紅色砂岩峽谷，岩蔭與溪水造就香氣。",
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 炭焙（3~6次）。",
        "相傳明代赴考的書生丁顯因武夷茶治癒頑疾，把紅袍披在岩上以示感恩；母樹為九龍窠岩壁上的六株。",
        "焙穀、可可與濕岩氣息，湯體厚，餘韻長。",
        "羊肉、燻鴨、大醬料理、黑巧克力。",
        "98~100度沸水。第一泡洗茶。焙火茶從第三泡開始展開。"
      ]
    },
    {
      id: "oolong-dancong",
      group: "oolong",
      h: "鳳",
      hz: "鳳凰單叢",
      hs: "凤凰单丛",
      rom: "Fenghuang Dancong",
      sub: "Phoenix Dancong",
      t: 95,
      l: "7g",
      w: "110ml",
      s: [30, 15, 20],
      ox: 40,
      ko: [
        "봉황단총",
        "한 그루에서 한 향 — 나무마다 이름이 붙은 광둥의 향 차.",
        "40%",
        "개완 110ml에 7g",
        "10회 이상",
        "95도에서 30초, 2포 15초, 3포 20초.",
        "광둥성 차오저우 봉황산, 해발 600~1,200m. 핵심 산지인 우동(烏崬) 일대의 고목 차나무에서 나며, 향형마다 이름이 붙습니다.",
        "위조 → 요청(자주) → 살청 → 유념 → 건조 → 가벼운 배화.",
        "봉황산의 오래된 차나무를 한 그루씩 따로 만들어 ‘한 그루 한 향(單叢)’이라 부른 데서 이름이 왔습니다.",
        "백화향·치자·꿀 같은 화향이 매우 선명하고, 끝에 떫음과 회감이 옵니다.",
        "과일, 치즈, 구운 생선, 우롱 하이볼.",
        "짧게 여러 번. 15~30초를 넘기면 화향이 무너집니다."
      ],
      en: [
        "Phoenix Dancong",
        "One bush, one aroma — single-tree oolongs from Guangdong, each with its own name.",
        "40%",
        "7 g to 110 ml in a gaiwan",
        "10 or more infusions",
        "95 °C: 30 seconds, then 15, then 20.",
        "Phoenix Mountain in Chaozhou, Guangdong, 600–1,200 m, where old bushes carry names like orchid and honey-orchid.",
        "Withering → repeated bruising → firing → rolling → drying → light roasting.",
        "Each old bush on Phoenix Mountain is made separately, hence dancong — single bush.",
        "Very clear white-flower, gardenia and honey aromas, with astringency and returning sweetness at the end.",
        "Fruit, cheese, grilled fish, an oolong highball.",
        "Short and many. Past 15–30 seconds the flowers fall apart."
      ],
      "zh-CN": [
        "凤凰单丛",
        "一树一香——每棵茶树都有一个名字的广东香茶。",
        "40%",
        "盖碗110毫升配7克",
        "10泡以上",
        "95度泡30秒，第二泡15秒，第三泡20秒。",
        "广东潮州凤凰山，海拔600~1200米，老树各有“黄枝香”“蜜兰香”等香名。",
        "萎凋 → 反复摇青 → 杀青 → 揉捻 → 干燥 → 轻焙火。",
        "凤凰山的老树一棵一棵单独制作，所以叫“单丛”。",
        "白花香、栀子与蜂蜜香非常清晰，尾端带涩与回甘。",
        "水果、奶酪、烤鱼、乌龙高球。",
        "短泡多泡。超过15~30秒花香就散了。"
      ],
      "zh-TW": [
        "鳳凰單叢",
        "一樹一香——每棵茶樹都有一個名字的廣東香茶。",
        "40%",
        "蓋碗110毫升配7公克",
        "10泡以上",
        "95度泡30秒，第二泡15秒，第三泡20秒。",
        "廣東潮州鳳凰山，海拔600~1200米，老樹各有「黃枝香」「蜜蘭香」等香名。",
        "萎凋 → 反覆搖菁 → 殺菁 → 揉捻 → 乾燥 → 輕焙火。",
        "鳳凰山的老樹一棵一棵單獨製作，所以叫「單叢」。",
        "白花香、梔子與蜂蜜香非常清晰，尾端帶澀與回甘。",
        "水果、起司、烤魚、烏龍高球。",
        "短泡多泡。超過15~30秒花香就散了。"
      ]
    },
    {
      id: "oolong-dongding",
      group: "oolong",
      h: "凍",
      hz: "凍頂烏龍",
      hs: "冻顶乌龙",
      rom: "Dong Ding",
      sub: "Dong Ding Oolong",
      t: 95,
      l: "6g",
      w: "150ml",
      s: [45, 25, 35],
      ox: 25,
      ko: [
        "동정우롱",
        "대만 중부 산기슭의 중배화 우롱 — 밤과 꽃 향의 균형.",
        "25%",
        "150ml에 6g",
        "6~8회",
        "95도에서 45초, 2포 25초, 3포 35초.",
        "난터우현 루구, 해발 600~1,200m. 안개가 많아 잎이 두껍습니다.",
        "위조 → 요청 → 살청 → 유념 → 건조 → 중간 배화.",
        "1855년 과거에 합격한 임봉지(林鳳池)가 푸젠 우이산에서 묘목 36주를 가져와 심었다는 이야기가 전합니다. ‘동정’은 발끝이 얼 만큼 추운 산길을 올라야 닿는 산꼭대기라는 민간 어원이 전합니다.",
        "구운 곡물과 밤, 난초 향, 부드러운 단맛.",
        "구운 채소, 삼겹살, 파인애플, 치즈.",
        "95도에서 45초. 배화가 중간이라 2포부터 단맛이 올라옵니다."
      ],
      en: [
        "Dong Ding",
        "A mid-roasted oolong from Taiwan's central foothills — chestnut and flower in balance.",
        "25%",
        "6 g to 150 ml",
        "6–8 infusions",
        "95 °C: 45 seconds, then 25, then 35.",
        "Lugu in Nantou County, 600–1,200 m, where heavy mist thickens the leaf.",
        "Withering → bruising → firing → rolling → drying → medium roasting.",
        "In 1855 the examination graduate Lin Fengchi is said to have brought 36 seedlings from Wuyi in Fujian and planted them here; folk etymology says dong ding, 'frozen peak', names a summit reached by a path cold enough to freeze your toes.",
        "Roasted grain and chestnut, orchid, a soft sweetness.",
        "Roasted vegetables, pork belly, pineapple, cheese.",
        "95 °C for 45 seconds. With medium roast the sweetness rises from the second infusion."
      ],
      "zh-CN": [
        "冻顶乌龙",
        "台湾中部山脚的中焙乌龙——栗子与花香的平衡。",
        "25%",
        "150毫升配6克",
        "6~8泡",
        "95度泡45秒，第二泡25秒，第三泡35秒。",
        "南投县鹿谷，海拔600~1200米，云雾多使叶片变厚。",
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 中焙火。",
        "相传1855年举人林凤池从福建武夷山带回36株茶苗种植。“冻顶”民间说法指上山路冷得冻脚的山顶。",
        "焙谷与栗子、兰花香，柔和的甜。",
        "烤蔬菜、五花肉、凤梨、奶酪。",
        "95度45秒。中焙火，第二泡起甜味上来。"
      ],
      "zh-TW": [
        "凍頂烏龍",
        "台灣中部山腳的中焙烏龍——栗子與花香的平衡。",
        "25%",
        "150毫升配6公克",
        "6~8泡",
        "95度泡45秒，第二泡25秒，第三泡35秒。",
        "南投縣鹿谷，海拔600~1200米，雲霧多使葉片變厚。",
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 中焙火。",
        "相傳1855年舉人林鳳池從福建武夷山帶回36株茶苗種植。「凍頂」民間說法指上山路冷得凍腳的山頂。",
        "焙穀與栗子、蘭花香，柔和的甜。",
        "烤蔬菜、五花肉、鳳梨、起司。",
        "95度45秒。中焙火，第二泡起甜味上來。"
      ]
    },
    {
      id: "oolong-alishan",
      group: "oolong",
      h: "山",
      hz: "阿里山高山烏龍",
      hs: "阿里山高山乌龙",
      rom: "Alishan High Mountain",
      sub: "High Mountain Oolong (Alishan)",
      alias: ["아리산 고산우롱"],
      t: 95,
      l: "6g",
      w: "150ml",
      s: [50, 25, 35],
      ox: 20,
      ko: [
        "고산우롱 (아리산)",
        "해발 1,200m 위, 청량한 난초 향의 대만 고산차.",
        "20%",
        "150ml에 6g",
        "6~8회",
        "95도에서 50초, 2포 25초, 3포 35초.",
        "자이현 아리산, 해발 1,000~1,600m. 낮은 온도로 자라 잎이 두껍고 향이 맑습니다.",
        "위조 → 요청 → 살청 → 유념(구형) → 건조 → 가벼운 배화.",
        "1980년대 대만 고산차 붐과 함께 아리산 차밭이 넓어졌습니다. 고도가 높을수록 감칠맛이 강해 ‘고산차’라 부릅니다.",
        "난초·크림·청사과, 맑고 긴 단맛, 떫음이 거의 없습니다.",
        "과일, 흰살생선, 가벼운 디저트.",
        "95도에서 50초. 구형이라 첫 물에서 충분히 펴지게 하세요."
      ],
      en: [
        "High Mountain Oolong (Alishan)",
        "Above 1,200 m: a cool orchid-scented high-mountain tea from Taiwan.",
        "20%",
        "6 g to 150 ml",
        "6–8 infusions",
        "95 °C: 50 seconds, then 25, then 35.",
        "Alishan in Chiayi County, 1,000–1,600 m; the cool air makes a thick leaf with a clear aroma.",
        "Withering → bruising → firing → ball rolling → drying → light roasting.",
        "Alishan's gardens spread with Taiwan's high-mountain tea boom in the 1980s; the higher the garden, the stronger the umami.",
        "Orchid, cream and green apple, a clear long sweetness, almost no astringency.",
        "Fruit, white fish, light desserts.",
        "95 °C for 50 seconds. The rolled leaf needs the full first pour to open."
      ],
      "zh-CN": [
        "阿里山高山乌龙",
        "海拔1200米以上，清凉兰花香气的台湾高山茶。",
        "20%",
        "150毫升配6克",
        "6~8泡",
        "95度泡50秒，第二泡25秒，第三泡35秒。",
        "嘉义阿里山，海拔1000~1600米，低温让叶片厚、香气清。",
        "萎凋 → 摇青 → 杀青 → 揉捻（球形）→ 干燥 → 轻焙火。",
        "1980年代台湾高山茶热潮中阿里山茶园扩大。海拔越高鲜味越强，故称高山茶。",
        "兰花、奶油与青苹果，清亮的长甜，几乎没有涩。",
        "水果、白身鱼、清淡甜点。",
        "95度50秒。球形茶第一泡要让叶子充分展开。"
      ],
      "zh-TW": [
        "阿里山高山烏龍",
        "海拔1200米以上，清涼蘭花香氣的台灣高山茶。",
        "20%",
        "150毫升配6公克",
        "6~8泡",
        "95度泡50秒，第二泡25秒，第三泡35秒。",
        "嘉義阿里山，海拔1000~1600米，低溫讓葉片厚、香氣清。",
        "萎凋 → 搖菁 → 殺菁 → 揉捻（球形）→ 乾燥 → 輕焙火。",
        "1980年代台灣高山茶熱潮中阿里山茶園擴大。海拔越高鮮味越強，故稱高山茶。",
        "蘭花、奶油與青蘋果，清亮的長甜，幾乎沒有澀。",
        "水果、白身魚、清淡甜點。",
        "95度50秒。球形茶第一泡要讓葉子充分展開。"
      ]
    },
    {
      id: "oolong-beauty",
      group: "oolong",
      h: "美",
      hz: "東方美人",
      hs: "东方美人",
      rom: "Oriental Beauty",
      sub: "Oriental Beauty",
      t: 90,
      tr: "85~90℃",
      l: "6g",
      w: "150ml",
      s: [60, 30, 45],
      ox: 60,
      ko: [
        "동방미인",
        "매미가 물어야 나는 꿀 향 — 대만의 대표 백호우롱.",
        "60%",
        "150ml에 6g",
        "5~6회",
        "90도에서 1분, 2포 30초, 3포 45초.",
        "신주·먀오리, 해발 300~800m. 여름에 차잎매미가 물은 잎만 씁니다.",
        "위조 → 요청 → 살청 → 유념 → 건조. 매미가 물어 상처 난 잎이 산화되며 꿀 향이 생깁니다.",
        "영국 빅토리아 여왕이 이 차를 맛보고 ‘동방의 미인’이라 불렀다는 이야기가 전합니다. 대만에서는 ‘팽풍차(膨風茶)’라고도 합니다.",
        "꿀·잘 익은 복숭아·장미, 둥글고 부드러운 단맛.",
        "과일 타르트, 치즈, 훈제 연어, 디저트.",
        "90도에서 1분. 매미 물린 잎은 뜨거운 물에서 향이 더 열립니다."
      ],
      en: [
        "Oriental Beauty",
        "The honey that only a leafhopper can make — Taiwan's signature heavily oxidised oolong.",
        "60%",
        "6 g to 150 ml",
        "5–6 infusions",
        "90 °C: 1 minute, then 30 seconds, then 45.",
        "Hsinchu and Miaoli, 300–800 m, using only summer leaf bitten by the green leafhopper.",
        "Withering → bruising → firing → rolling → drying. The bite wound oxidises and produces the honey note.",
        "Queen Victoria is said to have named it Oriental Beauty after tasting it; in Taiwan it is also called puff-fong tea.",
        "Honey, ripe peach and rose, with a round, soft sweetness.",
        "Fruit tarts, cheese, smoked salmon, desserts.",
        "90 °C for 1 minute. The bitten leaf opens further in hotter water."
      ],
      "zh-CN": [
        "东方美人",
        "被小绿叶蝉咬过才有蜜香——台湾代表性的重发酵乌龙。",
        "60%",
        "150毫升配6克",
        "5~6泡",
        "90度泡1分钟，第二泡30秒，第三泡45秒。",
        "新竹、苗栗，海拔300~800米，夏天只采被茶绿叶蝉咬过的叶。",
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥。咬伤处发酵，产生蜜香。",
        "相传英国维多利亚女王尝后称之为“东方美人”；台湾也叫“膨风茶”。",
        "蜂蜜、熟桃与玫瑰，圆润柔和的甜。",
        "水果塔、奶酪、烟熏鲑鱼、甜点。",
        "90度1分钟。被咬过的叶在热水中香气更开。"
      ],
      "zh-TW": [
        "東方美人",
        "被小綠葉蟬咬過才有蜜香——台灣代表性的重發酵烏龍。",
        "60%",
        "150毫升配6公克",
        "5~6泡",
        "90度泡1分鐘，第二泡30秒，第三泡45秒。",
        "新竹、苗栗，海拔300~800米，夏天只採被茶綠葉蟬咬過的葉。",
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥。咬傷處發酵，產生蜜香。",
        "相傳英國維多利亞女王嘗後稱之為「東方美人」；台灣也叫「膨風茶」。",
        "蜂蜜、熟桃與玫瑰，圓潤柔和的甜。",
        "水果塔、起司、煙燻鮭魚、甜點。",
        "90度1分鐘。被咬過的葉在熱水中香氣更開。"
      ]
    },
    {
      id: "oolong-si-ji-chun",
      group: "oolong",
      h: "四",
      hz: "四季春",
      hs: "四季春",
      rom: "Si Ji Chun",
      sub: "Four Seasons Spring",
      temp: 90,
      tempRange: "85~95℃",
      leaf: "4g",
      water: "150ml",
      steeps: [45, 25, 40],
      maxSteep: 3,
      oxidationValue: 18,
      x: {
        ko: [
          "위조 → 살청 → 유념(구형으로 말기) → 건조. 산화는 15~20%에서 멈춥니다.",
          "1980년대 타이베이 무자에서 우연히 발견된 나무가 사계절 내내 싹을 올려 이런 이름을 얻었다고 전합니다. 향이 좋아 재스민 차의 베이스로도 많이 씁니다."
        ],
        en: [
          "Withering → firing → rolling into ball shape → drying. Oxidation stops at 15–20 per cent.",
          "A tree found by chance in Muzha, Taipei, in the 1980s that kept flushing through all four seasons is said to have given the tea its name. Its fragrance makes it a common base for jasmine tea."
        ],
        "zh-CN": [
          "萎凋 → 杀青 → 揉捻成球 → 干燥。发酵停在15~20%。",
          "相传1980年代在台北木栅偶然发现的一株茶树四季都发新芽，因而得名。香气好，也常作茉莉花茶的茶底。"
        ],
        "zh-TW": [
          "萎凋 → 殺青 → 揉捻成球 → 乾燥。發酵停在15~20%。",
          "相傳1980年代在台北木柵偶然發現的一株茶樹四季都發新芽，因而得名。香氣好，也常作茉莉花茶的茶底。"
        ]
      },
      ko: {
        name: "사계춘",
        oneLine: "한 해에 네 번, 봄처럼 싹이 나 다시 사계춘. 대만에서 가장 흔히 만나는 가벼운 우롱.",
        oxidation: "15~20%",
        ratioNote: "150ml에 4g",
        rounds: "3~4회",
        steepBasis: "90도에서 45초, 두 번째 25초, 세 번째 40초.",
        origin: "타이베이 무자에서 발견된 품종. 지금은 난터우 밍젠 일대에서 많이 재배합니다.",
        flavor: "치자·재스민 같은 꽃향, 가벼운 단맛, 떫음이 적습니다.",
        pairing: "가벼운 디저트, 과일, 샌드위치. 향이 은은해 단맛이 강한 음식과는 거리를 둡니다.",
        keep: "개봉 후 밀봉해 냉장. 향이 날아가기 쉬워 3개월 안에 마시는 편이 좋습니다.",
        brewTip: "85~90도로 낮추면 꽃향이 살고, 끓는 물이면 단맛이 앞섭니다. 잎을 오래 두지 마세요."
      },
      en: {
        name: "Si Ji Chun",
        oneLine: "Four harvests a year, each spring-like: the light oolong you meet most often in Taiwan.",
        oxidation: "15–20%",
        ratioNote: "4 g to 150 ml",
        rounds: "3–4 infusions",
        steepBasis: "45 seconds at 90 °C, then 25 and 40 seconds.",
        origin: "A cultivar found in Muzha, Taipei; now widely grown around Mingjian in Nantou.",
        flavor: "Gardenia and jasmine florals, light sweetness, little astringency.",
        pairing: "Light desserts, fruit, sandwiches. The scent is gentle, so keep it away from very sweet food.",
        keep: "Seal and refrigerate after opening; the aroma fades, so finish within about three months.",
        brewTip: "85–90 °C keeps the florals; boiling water pushes the sweetness forward. Don't leave the leaf in."
      },
      "zh-CN": {
        name: "四季春",
        oneLine: "一年四季都像春天发芽，台湾最常见的清爽型乌龙。",
        oxidation: "15~20%",
        ratioNote: "150毫升配4克",
        rounds: "3~4泡",
        steepBasis: "90度泡45秒，第二泡25秒，第三泡40秒。",
        origin: "在台北木栅发现的品种，如今南投名间一带大量种植。",
        flavor: "栀子、茉莉般的花香，甜味轻，涩感少。",
        pairing: "清淡甜点、水果、三明治。香气细致，不宜配过甜的食物。",
        keep: "开封后密封冷藏；香气易散，最好三个月内喝完。",
        brewTip: "85~90度能留住花香，沸水会让甜味更突出。不要久泡。"
      },
      "zh-TW": {
        name: "四季春",
        oneLine: "一年四季都像春天發芽，台灣最常見的清爽型烏龍。",
        oxidation: "15~20%",
        ratioNote: "150毫升配4公克",
        rounds: "3~4泡",
        steepBasis: "90度泡45秒，第二泡25秒，第三泡40秒。",
        origin: "在台北木柵發現的品種，如今南投名間一帶大量種植。",
        flavor: "梔子、茉莉般的花香，甜味輕，澀感少。",
        pairing: "清淡甜點、水果、三明治。香氣細緻，不宜配過甜的食物。",
        keep: "開封後密封冷藏；香氣易散，最好三個月內喝完。",
        brewTip: "85~90度能留住花香，沸水會讓甜味更突出。不要久泡。"
      }
    },
    {
      id: "oolong-jin-xuan",
      group: "oolong",
      h: "萱",
      hz: "金萱",
      hs: "金萱",
      rom: "Jin Xuan",
      sub: "Jin Xuan",
      alias: ["밀키 우롱"],
      temp: 90,
      tempRange: "85~95℃",
      leaf: "4g",
      water: "150ml",
      steeps: [50, 30, 45],
      maxSteep: 3,
      oxidationValue: 18,
      x: {
        ko: [
          "위조 → 살청 → 유념 → 건조. 산화 15~20%의 경발효 우롱으로 만듭니다.",
          "대만 차업개량장이 1981년에 12호로 등록한 품종입니다. 우유 같은 향은 품종 자체에서 나는 천연 유향이고, 시중의 밀키 우롱 가운데에는 같은 이름을 쓰면서 향을 따로 입힌 가향 제품도 있어 라벨의 원료 표기를 보는 것이 좋습니다."
        ],
        en: [
          "Withering → firing → rolling → drying, as a lightly oxidised oolong of 15–20 per cent.",
          "Registered by Taiwan's Tea Research and Extension Station as No. 12 in 1981. The milky note is natural to the cultivar; some products sold as milk oolong are the same leaf with flavour added, so the ingredient list is worth reading."
        ],
        "zh-CN": [
          "萎凋 → 杀青 → 揉捻 → 干燥，做成发酵15~20%的轻发酵乌龙。",
          "台湾茶业改良场于1981年登记的第12号品种。奶香来自品种本身；市面上也有同名但另外加香的奶香乌龙，选购时可看配料标示。"
        ],
        "zh-TW": [
          "萎凋 → 殺青 → 揉捻 → 乾燥，做成發酵15~20%的輕發酵烏龍。",
          "台灣茶業改良場於1981年登記的第12號品種。奶香來自品種本身；市面上也有同名但另外加香的奶香烏龍，選購時可看配料標示。"
        ]
      },
      ko: {
        name: "금훤",
        oneLine: "우유 같은 크림 향이 잎에서 자연스럽게 나는 대만 12호 — ‘밀키 우롱’으로도 부르는, 부드럽고 둥근 우롱.",
        oxidation: "15~20%",
        ratioNote: "150ml에 4g",
        rounds: "3~4회",
        steepBasis: "90도에서 50초, 두 번째 30초, 세 번째 45초.",
        origin: "대만 차업개량장이 개발한 품종으로 타이완 12호라 부릅니다. 자이·난터우 고산지에서 재배합니다.",
        flavor: "우유·크림 같은 향, 재스민, 둥근 단맛. 떫음이 적습니다.",
        pairing: "스콘, 크림 디저트, 견과류. 우유를 넣어 마셔도 향이 남습니다.",
        keep: "밀봉 냉장. 향이 섬세해 개봉 후 3개월 안이 좋습니다.",
        brewTip: "90도 전후에서 1분을 넘기지 않으면 크림 향이 살아 있습니다."
      },
      en: {
        name: "Jin Xuan",
        oneLine: "Taiwan's No. 12 cultivar, whose creamy, milky scent comes from the leaf itself — also sold as Milky Oolong; a soft, round cup.",
        oxidation: "15–20%",
        ratioNote: "4 g to 150 ml",
        rounds: "3–4 infusions",
        steepBasis: "50 seconds at 90 °C, then 30 and 45 seconds.",
        origin: "A cultivar from Taiwan's Tea Research and Extension Station, called TTES No. 12; grown in the highlands of Chiayi and Nantou.",
        flavor: "Milk and cream, jasmine, rounded sweetness, little astringency.",
        pairing: "Scones, cream desserts, nuts. The scent survives a splash of milk.",
        keep: "Seal and refrigerate; the aroma is delicate, so finish within about three months.",
        brewTip: "Stay near 90 °C and under a minute to keep the creamy note."
      },
      "zh-CN": {
        name: "金萱烏龍",
        oneLine: "奶香来自叶片本身的台茶十二号，柔顺圆润的乌龙，也叫奶香乌龙。",
        oxidation: "15~20%",
        ratioNote: "150毫升配4克",
        rounds: "3~4泡",
        steepBasis: "90度泡50秒，第二泡30秒，第三泡45秒。",
        origin: "台湾茶业改良场育成的品种，称台茶12号；多种于嘉义、南投高山。",
        flavor: "牛奶与奶油香、茉莉、圆润的甜味，涩感少。",
        pairing: "司康、奶油甜点、坚果。加一点牛奶香气仍在。",
        keep: "密封冷藏；香气细致，最好三个月内喝完。",
        brewTip: "90度左右、一分钟以内，奶香最明显。"
      },
      "zh-TW": {
        name: "金萱烏龍",
        oneLine: "奶香來自葉片本身的台茶十二號，柔順圓潤的烏龍，也叫奶香烏龍。",
        oxidation: "15~20%",
        ratioNote: "150毫升配4公克",
        rounds: "3~4泡",
        steepBasis: "90度泡50秒，第二泡30秒，第三泡45秒。",
        origin: "台灣茶業改良場育成的品種，稱台茶12號；多種於嘉義、南投高山。",
        flavor: "牛奶與奶油香、茉莉、圓潤的甜味，澀感少。",
        pairing: "司康、奶油甜點、堅果。加一點牛奶香氣仍在。",
        keep: "密封冷藏；香氣細緻，最好三個月內喝完。",
        brewTip: "90度左右、一分鐘以內，奶香最明顯。"
      }
    },
    {
      id: "oolong-pouchong",
      group: "oolong",
      alias: ["포종차"],
      h: "包",
      hz: "包種茶",
      hs: "包种茶",
      rom: "Wen Shan Pouchong",
      sub: "Wen Shan Pouchong",
      temp: 85,
      tempRange: "80~90℃",
      leaf: "3g",
      water: "150ml",
      steeps: [60, 30, 50],
      maxSteep: 3,
      oxidationValue: 10,
      x: {
        ko: [
          "위조 → 살청 → 유념(條索 모양) → 건조. 산화 8~12%로 녹차에 가깝습니다.",
          "차를 종이에 싸서 향을 보관한 데서 '포종(包種)'이라 불렸다는 이야기가 전합니다. 향을 입힌 화향포종과 달리 원산 포종은 잎 자체의 꽃향을 봅니다."
        ],
        en: [
          "Withering → firing → rolling into strips → drying. At 8–12 per cent oxidation it sits close to green tea.",
          "The name is said to come from wrapping the tea in paper to hold its scent. Unlike scented pouchong, origin pouchong is judged on the leaf's own florals."
        ],
        "zh-CN": [
          "萎凋 → 杀青 → 揉捻成条 → 干燥。发酵8~12%，接近绿茶。",
          "相传因把茶包在纸里保存香气而得名“包种”。与窨花的花香包种不同，原产包种看的是茶叶本身的花香。"
        ],
        "zh-TW": [
          "萎凋 → 殺青 → 揉捻成條 → 乾燥。發酵8~12%，接近綠茶。",
          "相傳因把茶包在紙裡保存香氣而得名「包種」。與窨花的花香包種不同，原產包種看的是茶葉本身的花香。"
        ]
      },
      ko: {
        name: "포종",
        oneLine: "향을 종이로 감싸 두던 데서 이름이 온, 타이완 북부의 가벼운 우롱.",
        oxidation: "8~12%",
        ratioNote: "150ml에 3g",
        rounds: "3회",
        steepBasis: "85도에서 1분, 두 번째 30초, 세 번째 50초.",
        origin: "신베이 핑린 일대가 중심인 문산 포종. 잎을 말아 향을 살립니다.",
        flavor: "난초·치자 같은 꽃향, 풋풋한 여운, 가볍고 맑습니다.",
        pairing: "흰살생선, 채소 요리, 가벼운 과자.",
        keep: "밀봉 냉장. 향이 가벼워 오래 두면 향이 먼저 사라집니다.",
        brewTip: "80~85도에서 짧게. 끓는 물을 쓰면 꽃향보다 떫은맛이 앞섭니다."
      },
      en: {
        name: "Wen Shan Pouchong",
        oneLine: "A light northern Taiwanese oolong named for the paper its scent was once wrapped in.",
        oxidation: "8–12%",
        ratioNote: "3 g to 150 ml",
        rounds: "3 infusions",
        steepBasis: "One minute at 85 °C, then 30 and 50 seconds.",
        origin: "Wen Shan pouchong, centred on Pinglin in New Taipei; the leaf is rolled to hold its aroma.",
        flavor: "Orchid and gardenia, a green finish, light and clear.",
        pairing: "White fish, vegetable dishes, light pastries.",
        keep: "Seal and refrigerate; the scent is light, so it goes first.",
        brewTip: "80–85 °C and short. Boiling water brings out astringency before the florals."
      },
      "zh-CN": {
        name: "包种茶",
        oneLine: "因用纸包住香气而得名的台湾北部轻发酵乌龙。",
        oxidation: "8~12%",
        ratioNote: "150毫升配3克",
        rounds: "3泡",
        steepBasis: "85度泡1分钟，第二泡30秒，第三泡50秒。",
        origin: "以新北坪林一带为中心的文山包种，揉成条索以留住香气。",
        flavor: "兰花、栀子般的花香，清绿的尾韵，轻盈明亮。",
        pairing: "白肉鱼、蔬菜料理、清淡糕点。",
        keep: "密封冷藏；香气轻，放久了先散香。",
        brewTip: "80~85度短泡。沸水会让涩味先于花香出现。"
      },
      "zh-TW": {
        name: "包種茶",
        oneLine: "因用紙包住香氣而得名的台灣北部輕發酵烏龍。",
        oxidation: "8~12%",
        ratioNote: "150毫升配3公克",
        rounds: "3泡",
        steepBasis: "85度泡1分鐘，第二泡30秒，第三泡50秒。",
        origin: "以新北坪林一帶為中心的文山包種，揉成條索以留住香氣。",
        flavor: "蘭花、梔子般的花香，清綠的尾韻，輕盈明亮。",
        pairing: "白肉魚、蔬菜料理、清淡糕點。",
        keep: "密封冷藏；香氣輕，放久了先散香。",
        brewTip: "80~85度短泡。沸水會讓澀味先於花香出現。"
      }
    },
    /* ── 홍차 ── */
    {
      id: "black-darjeeling-first",
      group: "black",
      alias: ["다즐링 퍼스트 플러시", "다즐링 세컨드 플러시", "다즐링 오텀널"],
      h: "春",
      hz: "大吉嶺",
      hs: "大吉岭",
      rom: "Darjeeling First Flush",
      sub: "Darjeeling First Flush",
      t: 90,
      tr: "85~90℃",
      l: "3g",
      w: "200ml",
      s: [150, 180, 210],
      ox: 85,
      ko: [
        "다즐링",
        "봄의 첫 싹, 포도와 꽃 — ‘차의 샴페인’.",
        "85%",
        "200ml에 3g",
        "1~2회",
        "85~90도에서 2분 30초, 2포 3분.",
        "인도 서벵골 다즐링, 히말라야 남쪽 기슭 해발 2,000m 안팎의 안개 차밭.",
        "위조 → 유념 → 짧은 산화 → 건조. 퍼스트 플러시는 산화를 30% 아래로 멈춰 푸른 잎을 남깁니다.",
        "1835년 영국이 이 지역을 넘겨받은 뒤, 1841년 캠벨 박사가 중국 차나무를 처음 심으며 시작된 산지입니다. 상업 재배는 아쌈이 앞섰습니다. ‘차의 샴페인’이라는 별명은 머스캣 향에서 왔습니다.",
        "청포도·머스캣·흰 꽃, 가볍고 떫음이 적습니다.",
        "스콘, 과일 타르트, 흰살생선.",
        "85~90도에서 2분 30초. 우유는 넣지 않습니다."
      ],
      en: [
        "Darjeeling First Flush",
        "The spring bud: grape and flower, the champagne of tea.",
        "85%",
        "3 g to 200 ml",
        "1–2 infusions",
        "85–90 °C for 2½ minutes, then 3.",
        "Darjeeling in West Bengal, on the southern Himalaya at around 2,000 m, in misty gardens.",
        "Withering → rolling → a short oxidation → drying. First flush stops oxidation below 30%, leaving green leaf.",
        "The district began after Britain took over the area in 1835; Dr Campbell first planted Chinese bushes in 1841. Commercial tea growing began earlier in Assam. The champagne nickname comes from its muscatel note.",
        "Green grape, muscatel and white flowers, light with little astringency.",
        "Scones, fruit tarts, white fish.",
        "85–90 °C for 2½ minutes. No milk."
      ],
      "zh-CN": [
        "大吉岭春摘",
        "春天的第一芽，葡萄与花香——“茶中香槟”。",
        "85%",
        "200毫升配3克",
        "1~2泡",
        "85~90度泡2分30秒，第二泡3分钟。",
        "印度西孟加拉大吉岭，喜马拉雅南麓海拔2000米上下的云雾茶园。",
        "萎凋 → 揉捻 → 短时间发酵 → 干燥。春摘把发酵停在30%以下，留下青绿的叶。",
        "1835年英国接管此地后，1841年坎贝尔博士首次种下中国茶树。商业种茶则以阿萨姆更早。香槟之名来自麝香葡萄香。",
        "青葡萄、麝香葡萄与白花，轻盈、涩味少。",
        "司康、水果塔、白身鱼。",
        "85~90度2分30秒。不加牛奶。"
      ],
      "zh-TW": [
        "大吉嶺春摘",
        "春天的第一芽，葡萄與花香——「茶中香檳」。",
        "85%",
        "200毫升配3公克",
        "1~2泡",
        "85~90度泡2分30秒，第二泡3分鐘。",
        "印度西孟加拉大吉嶺，喜馬拉雅南麓海拔2000米上下的雲霧茶園。",
        "萎凋 → 揉捻 → 短時間發酵 → 乾燥。春摘把發酵停在30%以下，留下青綠的葉。",
        "1835年英國接管此地後，1841年坎貝爾博士首次種下中國茶樹。商業種茶則以阿薩姆更早。香檳之名來自麝香葡萄香。",
        "青葡萄、麝香葡萄與白花，輕盈、澀味少。",
        "司康、水果塔、白身魚。",
        "85~90度2分30秒。不加牛奶。"
      ]
    },
    {
      id: "black-assam",
      group: "black",
      alias: ["아삼"],
      h: "麥",
      hz: "阿薩姆",
      hs: "阿萨姆",
      rom: "Assam",
      sub: "Assam",
      t: 98,
      l: "5g",
      s: [180, 240, 240],
      ox: 95,
      ko: [
        "아쌈",
        "몰트 향과 두꺼운 바디 — 밀크티의 뼈대.",
        "95%",
        "200ml에 5g, 밀크티는 150ml에 5g",
        "1~2회",
        "98도에서 3분, 2포 4분.",
        "인도 아쌈, 브라마푸트라강 유역 해발 50~200m의 평원. 세계 최대 홍차 산지입니다.",
        "위조 → 유념 → 산화(90% 이상) → 건조. CTC 방식은 잎을 잘게 부숴 1~2분 만에 진한 색을 냅니다.",
        "1823년 로버트 브루스가 아쌈의 야생 차나무(assamica)를 발견한 것이 시작입니다. 큰잎 변종이라 몰트 향이 강합니다.",
        "몰트·꿀·건포도, 두꺼운 바디. CTC는 더 진하고 떫습니다.",
        "크림치즈 베이글, 버터 토스트, 초콜릿 케이크, 마살라 차이 베이스.",
        "98도에서 3분. 우유를 넣으면 5g에 150ml로 진하게."
      ],
      en: [
        "Assam",
        "Malt and a thick body — the backbone of milk tea.",
        "95%",
        "5 g to 200 ml; 5 g to 150 ml for milk tea",
        "1–2 infusions",
        "98 °C for 3 minutes, then 4.",
        "The Brahmaputra plain of Assam, India, at 50–200 m — the world's largest black-tea region.",
        "Withering → rolling → full oxidation → drying. CTC shreds the leaf so it colours in a minute or two.",
        "It began in 1823 when Robert Bruce found wild assamica bushes; the large leaf is why the malt is so strong.",
        "Malt, honey and raisins with a thick body; CTC is stronger and more astringent.",
        "Cream-cheese bagels, buttered toast, chocolate cake, the base of masala chai.",
        "98 °C for 3 minutes. For milk, use 5 g to 150 ml."
      ],
      "zh-CN": [
        "阿萨姆",
        "麦芽香与厚重的汤体——奶茶的骨架。",
        "95%",
        "200毫升配5克，奶茶用150毫升配5克",
        "1~2泡",
        "98度泡3分钟，第二泡4分钟。",
        "印度阿萨姆，布拉马普特拉河流域海拔50~200米的平原，世界最大的红茶产区。",
        "萎凋 → 揉捻 → 完全发酵 → 干燥。CTC把叶片切碎，一两分钟就出色。",
        "1823年罗伯特·布鲁斯在此发现野生阿萨姆茶树，由此开始。大叶种所以麦芽香强。",
        "麦芽、蜂蜜与葡萄干，汤体厚；CTC更浓更涩。",
        "奶油奶酪贝果、黄油吐司、巧克力蛋糕、印度奶茶基底。",
        "98度3分钟。加奶则5克配150毫升。"
      ],
      "zh-TW": [
        "阿薩姆",
        "麥芽香與厚重的湯體——奶茶的骨幹。",
        "95%",
        "200毫升配5公克，奶茶用150毫升配5公克",
        "1~2泡",
        "98度泡3分鐘，第二泡4分鐘。",
        "印度阿薩姆，布拉馬普特拉河流域海拔50~200米的平原，世界最大的紅茶產區。",
        "萎凋 → 揉捻 → 完全發酵 → 乾燥。CTC把葉片切碎，一兩分鐘就出色。",
        "1823年羅伯特·布魯斯在此發現野生阿薩姆茶樹，由此開始。大葉種所以麥芽香強。",
        "麥芽、蜂蜜與葡萄乾，湯體厚；CTC更濃更澀。",
        "奶油起司貝果、奶油吐司、巧克力蛋糕、印度奶茶基底。",
        "98度3分鐘。加奶則5公克配150毫升。"
      ]
    },
    {
      id: "black-nilgiri",
      group: "black",
      h: "藍",
      hz: "尼爾吉里",
      hs: "尼尔吉里",
      rom: "Nilgiri",
      sub: "Nilgiri",
      t: 95,
      l: "3g",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "닐기리",
        "남인도 고원의 차 — 청량한 향과 부드러운 떫음.",
        "90%",
        "200ml에 3g",
        "1~2회",
        "95도에서 3분, 2포 3분 30초.",
        "인도 타밀나두 닐기리 산맥, 해발 1,000~2,500m. ‘푸른 산’이라는 이름의 고원입니다.",
        "위조 → 유념 → 산화 → 건조. 고도가 높아 겨울에도 채취하는 ‘겨울 향’ 차가 있습니다.",
        "1835년 처음 차를 심었고, 1859년 첫 상업 다원이 문을 열며 본격적으로 시작되었습니다. 고산의 청량함과 홍차의 힘을 함께 가진 차로 평가받습니다.",
        "시트러스·민트 같은 청량감, 부드러운 몰트.",
        "남인도 커리, 샌드위치, 과일.",
        "95도에서 3분. 아이스티로도 좋습니다."
      ],
      en: [
        "Nilgiri",
        "A southern Indian highland tea: cool aroma, soft astringency.",
        "90%",
        "3 g to 200 ml",
        "1–2 infusions",
        "95 °C for 3 minutes, then 3½.",
        "The Nilgiri hills of Tamil Nadu, 1,000–2,500 m — the Blue Mountains.",
        "Withering → rolling → oxidation → drying. Height allows a winter pick with its own aroma.",
        "The British first planted tea here in 1835, and the first commercial gardens opened in 1859; it is prized for highland freshness with black-tea strength.",
        "Citrus and mint-like coolness over a soft malt.",
        "South Indian curry, sandwiches, fruit.",
        "95 °C for 3 minutes. Good iced."
      ],
      "zh-CN": [
        "尼尔吉里",
        "南印度高原茶——清凉的香气与柔和的涩。",
        "90%",
        "200毫升配3克",
        "1~2泡",
        "95度泡3分钟，第二泡3分30秒。",
        "印度泰米尔纳德尼尔吉里山脉，海拔1000~2500米，意为“蓝山”。",
        "萎凋 → 揉捻 → 发酵 → 干燥。海拔高，冬天也有带香气的“冬摘”。",
        "1835年英国人首次在此种茶，1859年首个商业茶园开业，兼具高山清凉与红茶的力量。",
        "柑橘与薄荷般的清凉，柔和的麦芽。",
        "南印度咖喱、三明治、水果。",
        "95度3分钟。做冰茶也好。"
      ],
      "zh-TW": [
        "尼爾吉里",
        "南印度高原茶——清涼的香氣與柔和的澀。",
        "90%",
        "200毫升配3公克",
        "1~2泡",
        "95度泡3分鐘，第二泡3分30秒。",
        "印度泰米爾納德尼爾吉里山脈，海拔1000~2500米，意為「藍山」。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。海拔高，冬天也有帶香氣的「冬摘」。",
        "1835年英國人首次在此種茶，1859年首個商業茶園開業，兼具高山清涼與紅茶的力量。",
        "柑橘與薄荷般的清涼，柔和的麥芽。",
        "南印度咖喱、三明治、水果。",
        "95度3分鐘。做冰茶也好。"
      ]
    },
    {
      id: "black-nuwaraeliya",
      group: "black",
      h: "露",
      hz: "努沃勒埃利耶",
      hs: "努沃勒埃利耶",
      rom: "Nuwara Eliya",
      sub: "Nuwara Eliya",
      t: 95,
      l: "3g",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "누와라 엘리야",
        "실론 최고 고도, 1,800m 안개의 차 — 가장 밝고 섬세한 실론.",
        "90%",
        "200ml에 3g",
        "1~2회",
        "90~95도에서 3분, 2포 3분 30초.",
        "스리랑카 누와라 엘리야, 해발 1,800m 이상(평균 2,000m). 실론에서 가장 높은 산지.",
        "위조 → 유념 → 산화 → 건조. 서늘한 기후라 산화가 느려 섬세한 향이 남습니다.",
        "19세기 커피 병해 이후 스리랑카 전역이 차로 바뀌었고, 누와라 엘리야는 ‘실론의 샴페인’이라 불립니다.",
        "시트러스·흰 꽃·옅은 민트, 가볍고 밝습니다.",
        "과일, 샌드위치, 가벼운 디저트.",
        "90~95도에서 3분. 우유 없이 마십니다."
      ],
      en: [
        "Nuwara Eliya",
        "Ceylon's highest gardens at 1,800 m in the mist — its brightest and most delicate.",
        "90%",
        "3 g to 200 ml",
        "1–2 infusions",
        "90–95 °C for 3 minutes, then 3½.",
        "Nuwara Eliya in Sri Lanka, above 1,800 m (average 2,000 m), the island's highest district.",
        "Withering → rolling → oxidation → drying. Cool air slows oxidation, so the aroma stays fine.",
        "After coffee blight in the 19th century the island turned to tea; Nuwara Eliya is called the champagne of Ceylon.",
        "Citrus, white flowers and a touch of mint, light and bright.",
        "Fruit, sandwiches, light desserts.",
        "90–95 °C for 3 minutes. No milk."
      ],
      "zh-CN": [
        "努沃勒埃利耶",
        "锡兰最高海拔1800米的云雾茶——最明亮细腻的锡兰茶。",
        "90%",
        "200毫升配3克",
        "1~2泡",
        "90~95度泡3分钟，第二泡3分30秒。",
        "斯里兰卡努沃勒埃利耶，海拔1800米以上（平均2000米），锡兰最高的产区。",
        "萎凋 → 揉捻 → 发酵 → 干燥。气候凉爽发酵慢，香气细腻。",
        "19世纪咖啡病害后全岛改种茶，努沃勒埃利耶被称为“锡兰的香槟”。",
        "柑橘、白花与一点薄荷，轻盈明亮。",
        "水果、三明治、清淡甜点。",
        "90~95度3分钟。不加牛奶。"
      ],
      "zh-TW": [
        "努沃勒埃利耶",
        "錫蘭最高海拔1800米的雲霧茶——最明亮細膩的錫蘭茶。",
        "90%",
        "200毫升配3公克",
        "1~2泡",
        "90~95度泡3分鐘，第二泡3分30秒。",
        "斯里蘭卡努沃勒埃利耶，海拔1800米以上（平均2000米），錫蘭最高的產區。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。氣候涼爽發酵慢，香氣細膩。",
        "19世紀咖啡病害後全島改種茶，努沃勒埃利耶被稱為「錫蘭的香檳」。",
        "柑橘、白花與一點薄荷，輕盈明亮。",
        "水果、三明治、清淡甜點。",
        "90~95度3分鐘。不加牛奶。"
      ]
    },
    {
      id: "black-udapussellawa",
      group: "black",
      h: "玫",
      hz: "烏達普塞拉瓦",
      hs: "乌达普塞拉瓦",
      rom: "Uda Pussellawa",
      sub: "Uda Pussellawa",
      t: 95,
      l: "3g",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "우다 푸셀라와",
        "누와라 엘리야 옆, 장미 향이 도는 작은 산지.",
        "90%",
        "200ml에 3g",
        "1~2회",
        "95도에서 3분.",
        "스리랑카 우다 푸셀라와, 해발 950~1,600m. 실론 7대 산지 가운데 가장 작습니다.",
        "위조 → 유념 → 산화 → 건조. 누와라 엘리야보다 진하고 우바보다 부드럽습니다.",
        "서늘한 품질 시즌에 만든 차에는 장미 향이 돈다고 알려져 있습니다.",
        "장미·옅은 시트러스, 중간 정도의 바디, 끝의 산뜻한 떫음.",
        "스콘, 과일, 가벼운 디저트.",
        "95도에서 3분. 우유 없이 마시면 장미 향이 살아 있습니다."
      ],
      en: [
        "Uda Pussellawa",
        "Next to Nuwara Eliya, a small district with a rose note.",
        "90%",
        "3 g to 200 ml",
        "1–2 infusions",
        "95 °C for 3 minutes.",
        "Uda Pussellawa in Sri Lanka, 950–1,600 m — the smallest of the seven Ceylon districts.",
        "Withering → rolling → oxidation → drying; darker than Nuwara Eliya, softer than Uva.",
        "Tea made in the cool quality season is said to carry a hint of rose.",
        "Rose and light citrus, a medium body, a bright finish.",
        "Scones, fruit, light desserts.",
        "95 °C for 3 minutes; without milk the rose stays."
      ],
      "zh-CN": [
        "乌达普塞拉瓦",
        "与大吉岭式的努沃勒埃利耶相邻，带玫瑰香的小产区。",
        "90%",
        "200毫升配3克",
        "1~2泡",
        "95度泡3分钟。",
        "斯里兰卡乌达普塞拉瓦，海拔950~1600米，是锡兰七大产区中最小的一处。",
        "萎凋 → 揉捻 → 发酵 → 干燥。比努沃勒埃利耶浓，比乌伐柔。",
        "据说凉爽的品质季制成的茶带有玫瑰香。",
        "玫瑰与淡柑橘，中等汤体，尾端清爽的涩。",
        "司康、水果、清淡甜点。",
        "95度3分钟。不加奶时玫瑰香更明显。"
      ],
      "zh-TW": [
        "烏達普塞拉瓦",
        "與努沃勒埃利耶相鄰，帶玫瑰香的小產區。",
        "90%",
        "200毫升配3公克",
        "1~2泡",
        "95度泡3分鐘。",
        "斯里蘭卡烏達普塞拉瓦，海拔950~1600米，是錫蘭七大產區中最小的一處。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。比努沃勒埃利耶濃，比烏伐柔。",
        "據說涼爽的品質季製成的茶帶有玫瑰香。",
        "玫瑰與淡柑橘，中等湯體，尾端清爽的澀。",
        "司康、水果、清淡甜點。",
        "95度3分鐘。不加奶時玫瑰香更明顯。"
      ]
    },
    {
      id: "black-uva",
      group: "black",
      h: "凉",
      hz: "烏伐",
      hs: "乌伐",
      rom: "Uva",
      sub: "Uva",
      t: 95,
      l: "3g",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "우바",
        "동풍이 부는 건기의 차 — 멘톨 같은 청량감.",
        "90%",
        "200ml에 3g",
        "1~2회",
        "95도에서 3분.",
        "스리랑카 우바, 해발 1,000~1,600m. 두 계절풍이 만나는 동쪽 사면으로, 7~9월 건기에 향이 가장 좋습니다.",
        "위조 → 유념 → 산화 → 건조. 건기의 잎은 향이 강하고 물색이 밝습니다.",
        "우바의 동풍 시기 차는 세계에서 가장 청량한 홍차로 꼽힙니다.",
        "멘톨·유칼립투스 같은 청량감, 끝의 떫음.",
        "과일, 치즈, 아이스티.",
        "95도에서 3분. 아이스티로 탁월합니다."
      ],
      en: [
        "Uva",
        "Tea from the dry monsoon: a menthol-like coolness.",
        "90%",
        "3 g to 200 ml",
        "1–2 infusions",
        "95 °C for 3 minutes.",
        "Uva in Sri Lanka, 1,000–1,600 m on the eastern slopes, where both monsoons meet; the July–September dry season is the finest.",
        "Withering → rolling → oxidation → drying. Dry-season leaf is aromatic and bright.",
        "Uva tea picked in the eastern-wind season is counted among the world's coolest black teas.",
        "Menthol and eucalyptus, with astringency at the end.",
        "Fruit, cheese, iced tea.",
        "95 °C for 3 minutes. Outstanding iced."
      ],
      "zh-CN": [
        "乌伐",
        "东风吹起的干季茶——薄荷般的清凉感。",
        "90%",
        "200毫升配3克",
        "1~2泡",
        "95度泡3分钟。",
        "斯里兰卡乌伐，海拔1000~1600米，位于两季风交汇的东坡，7~9月干季香气最好。",
        "萎凋 → 揉捻 → 发酵 → 干燥。干季的叶子香强、汤色亮。",
        "乌伐东风期的茶被认为世界上最清凉的红茶之一。",
        "薄荷、尤加利般的清凉，尾端带涩。",
        "水果、奶酪、冰茶。",
        "95度3分钟。做冰茶极好。"
      ],
      "zh-TW": [
        "烏伐",
        "東風吹起的乾季茶——薄荷般的清涼感。",
        "90%",
        "200毫升配3公克",
        "1~2泡",
        "95度泡3分鐘。",
        "斯里蘭卡烏伐，海拔1000~1600米，位於兩季風交匯的東坡，7~9月乾季香氣最好。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。乾季的葉子香強、湯色亮。",
        "烏伐東風期的茶被認為世界上最清涼的紅茶之一。",
        "薄荷、尤加利般的清涼，尾端帶澀。",
        "水果、起司、冰茶。",
        "95度3分鐘。做冰茶極好。"
      ]
    },
    {
      id: "black-dimbula",
      group: "black",
      h: "均",
      hz: "丁布拉",
      hs: "丁布拉",
      rom: "Dimbula",
      sub: "Dimbula",
      t: 95,
      l: "3g",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "딤불라",
        "실론 중부 고원 — 균형 잡힌 표준 홍차.",
        "90%",
        "200ml에 3g",
        "1~2회",
        "95도에서 3분.",
        "스리랑카 딤불라, 해발 1,100~1,600m.",
        "위조 → 유념 → 산화 → 건조. 1~3월 건기 차가 향이 가장 좋습니다.",
        "딤불라는 실론 홍차 수출의 중심지이며, 영국식 아침 홍차 블렌드의 기둥으로 쓰입니다.",
        "꽃·시트러스·몰트의 균형, 적당한 떫음.",
        "아침 식사, 스콘, 잉글리쉬 브렉퍼스트.",
        "95도에서 3분. 우유를 넣어도 향이 살아 있습니다."
      ],
      en: [
        "Dimbula",
        "Ceylon's central highlands: the balanced, standard black tea.",
        "90%",
        "3 g to 200 ml",
        "1–2 infusions",
        "95 °C for 3 minutes.",
        "Dimbula, Sri Lanka, at 1,100–1,600 m.",
        "Withering → rolling → oxidation → drying; the January–March dry season is the most fragrant.",
        "Dimbula is the centre of Ceylon's tea trade and a pillar of English breakfast blends.",
        "Flower, citrus and malt in balance, with moderate astringency.",
        "Breakfast, scones, English breakfast.",
        "95 °C for 3 minutes. Holds its aroma under milk."
      ],
      "zh-CN": [
        "丁布拉",
        "锡兰中部高地——均衡的标准红茶。",
        "90%",
        "200毫升配3克",
        "1~2泡",
        "95度泡3分钟。",
        "斯里兰卡丁布拉，海拔1100~1600米。",
        "萎凋 → 揉捻 → 发酵 → 干燥。1~3月干季的茶香气最好。",
        "丁布拉是锡兰红茶贸易的中心，也是英式早餐茶拼配的支柱。",
        "花香、柑橘与麦芽均衡，涩度适中。",
        "早餐、司康、英式早餐茶。",
        "95度3分钟。加奶也留住香气。"
      ],
      "zh-TW": [
        "丁布拉",
        "錫蘭中部高地——均衡的標準紅茶。",
        "90%",
        "200毫升配3公克",
        "1~2泡",
        "95度泡3分鐘。",
        "斯里蘭卡丁布拉，海拔1100~1600米。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。1~3月乾季的茶香氣最好。",
        "丁布拉是錫蘭紅茶貿易的中心，也是英式早餐茶拼配的支柱。",
        "花香、柑橘與麥芽均衡，澀度適中。",
        "早餐、司康、英式早餐茶。",
        "95度3分鐘。加奶也留住香氣。"
      ]
    },
    {
      id: "black-sabaragamuwa",
      group: "black",
      h: "果",
      hz: "薩巴拉加穆瓦",
      hs: "萨巴拉加穆瓦",
      rom: "Sabaragamuwa",
      sub: "Sabaragamuwa",
      t: 95,
      l: "3g",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "사바라가무와",
        "실론 서남부, 과일 향이 도는 저중지대 차.",
        "90%",
        "200ml에 3g",
        "1~2회",
        "95도에서 3분.",
        "스리랑카 사바라가무와, 해발 0~610m.",
        "위조 → 유념 → 산화 → 건조. 습한 기후로 잎이 부드럽습니다.",
        "사바라가무와는 실론 차 산지 가운데 하나로, 과일 향이 특징입니다.",
        "잘 익은 과일과 꿀, 부드러운 바디.",
        "과일, 디저트, 밀크티.",
        "95도에서 3분."
      ],
      en: [
        "Sabaragamuwa",
        "Ceylon's south-west low country, with fruit on the nose.",
        "90%",
        "3 g to 200 ml",
        "1–2 infusions",
        "95 °C for 3 minutes.",
        "Sabaragamuwa, Sri Lanka, from sea level to 610 m.",
        "Withering → rolling → oxidation → drying; the humid climate keeps the leaf soft.",
        "One of Ceylon's tea regions, known for a fruity note.",
        "Ripe fruit and honey with a soft body.",
        "Fruit, desserts, milk tea.",
        "95 °C for 3 minutes."
      ],
      "zh-CN": [
        "萨巴拉加穆瓦",
        "锡兰西南部，带果香的低中海拔茶。",
        "90%",
        "200毫升配3克",
        "1~2泡",
        "95度泡3分钟。",
        "斯里兰卡萨巴拉加穆瓦，海拔0~610米。",
        "萎凋 → 揉捻 → 发酵 → 干燥。气候潮湿，叶片柔软。",
        "萨巴拉加穆瓦是锡兰茶产区之一，以果香著称。",
        "熟果与蜂蜜，汤体柔和。",
        "水果、甜点、奶茶。",
        "95度3分钟。"
      ],
      "zh-TW": [
        "薩巴拉加穆瓦",
        "錫蘭西南部，帶果香的低中海拔茶。",
        "90%",
        "200毫升配3公克",
        "1~2泡",
        "95度泡3分鐘。",
        "斯里蘭卡薩巴拉加穆瓦，海拔0~610米。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。氣候潮濕，葉片柔軟。",
        "薩巴拉加穆瓦是錫蘭茶產區之一，以果香著稱。",
        "熟果與蜂蜜，湯體柔和。",
        "水果、甜點、奶茶。",
        "95度3分鐘。"
      ]
    },
    {
      id: "black-kandy",
      group: "black",
      h: "始",
      hz: "康提",
      hs: "康提",
      rom: "Kandy",
      sub: "Kandy",
      t: 95,
      l: "3g",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "캔디",
        "실론 차의 시작점, 중고도의 부드러운 홍차.",
        "90%",
        "200ml에 3g",
        "1~2회",
        "95도에서 3분.",
        "스리랑카 캔디, 해발 600~1,300m.",
        "위조 → 유념 → 산화 → 건조. 1867년 제임스 테일러가 룰콘데라에서 상업 재배를 시작했습니다.",
        "스리랑카 차 산업은 1867년 캔디의 룰콘데라 농장에서 테일러가 차를 심은 데서 시작되었습니다.",
        "부드러운 몰트와 꽃, 떫음이 적습니다.",
        "우유 홍차, 카레, 아침 식사.",
        "95도에서 3분. 밀크티에 알맞습니다."
      ],
      en: [
        "Kandy",
        "Where Ceylon tea began: a soft mid-grown black.",
        "90%",
        "3 g to 200 ml",
        "1–2 infusions",
        "95 °C for 3 minutes.",
        "Kandy, Sri Lanka, at 600–1,300 m.",
        "Withering → rolling → oxidation → drying. James Taylor planted the first commercial garden at Loolecondera in 1867.",
        "Sri Lanka's tea industry started in 1867 on Taylor's Loolecondera estate near Kandy.",
        "Soft malt and flowers, little astringency.",
        "Milk tea, curry, breakfast.",
        "95 °C for 3 minutes; suits milk."
      ],
      "zh-CN": [
        "康提",
        "锡兰茶的起点，中海拔的柔和红茶。",
        "90%",
        "200毫升配3克",
        "1~2泡",
        "95度泡3分钟。",
        "斯里兰卡康提，海拔600~1300米。",
        "萎凋 → 揉捻 → 发酵 → 干燥。1867年詹姆斯·泰勒在卢尔孔德拉种下第一批商业茶树。",
        "斯里兰卡茶业始于1867年康提的卢尔孔德拉庄园。",
        "柔和的麦芽与花香，涩味少。",
        "奶茶、咖喱、早餐。",
        "95度3分钟，适合加奶。"
      ],
      "zh-TW": [
        "康提",
        "錫蘭茶的起點，中海拔的柔和紅茶。",
        "90%",
        "200毫升配3公克",
        "1~2泡",
        "95度泡3分鐘。",
        "斯里蘭卡康提，海拔600~1300米。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。1867年詹姆斯·泰勒在盧爾孔德拉種下第一批商業茶樹。",
        "斯里蘭卡茶業始於1867年康提的盧爾孔德拉莊園。",
        "柔和的麥芽與花香，澀味少。",
        "奶茶、咖喱、早餐。",
        "95度3分鐘，適合加奶。"
      ]
    },
    {
      id: "black-ruhuna",
      group: "black",
      h: "濃",
      hz: "魯忽努",
      hs: "鲁忽努",
      rom: "Ruhuna",
      sub: "Ruhuna",
      t: 98,
      l: "4g",
      s: [180, 240, 240],
      ox: 90,
      ko: [
        "루후나",
        "실론 남부 저지대 — 진하고 굵은 맛.",
        "90%",
        "200ml에 4g",
        "1~2회",
        "98도에서 3분 30초.",
        "스리랑카 루후나, 해발 0~600m 남부 저지.",
        "위조 → 유념 → 산화 → 건조. 더운 기후로 산화가 빨라 색이 진합니다.",
        "루후나는 실론 차 가운데 물색이 가장 진해 밀크티용으로 많이 수출됩니다.",
        "진한 붉은 색, 굵은 몰트, 강한 떫음.",
        "밀크티, 마살라 차이, 진한 아침 차.",
        "98도에서 3분 30초. 우유를 넣으면 부드러워집니다."
      ],
      en: [
        "Ruhuna",
        "Ceylon's southern low country: dark and broad.",
        "90%",
        "4 g to 200 ml",
        "1–2 infusions",
        "98 °C for 3½ minutes.",
        "Ruhuna in southern Sri Lanka, 0–600 m.",
        "Withering → rolling → oxidation → drying; the heat speeds oxidation and deepens the colour.",
        "Ruhuna gives Ceylon's darkest liquor and goes largely into milk tea.",
        "Deep red, broad malt, strong astringency.",
        "Milk tea, masala chai, a strong morning cup.",
        "98 °C for 3½ minutes; milk softens it."
      ],
      "zh-CN": [
        "鲁忽努",
        "锡兰南部低地——浓而厚的一杯。",
        "90%",
        "200毫升配4克",
        "1~2泡",
        "98度泡3分30秒。",
        "斯里兰卡鲁忽努，海拔0~600米南部低地。",
        "萎凋 → 揉捻 → 发酵 → 干燥。天气热发酵快，汤色更深。",
        "鲁忽努的汤色是锡兰茶中最深的，多用作奶茶。",
        "深红汤色，厚重的麦芽，涩味强。",
        "奶茶、印度香料奶茶、浓早晨茶。",
        "98度3分30秒。加奶会变柔。"
      ],
      "zh-TW": [
        "魯忽努",
        "錫蘭南部低地——濃而厚的一杯。",
        "90%",
        "200毫升配4公克",
        "1~2泡",
        "98度泡3分30秒。",
        "斯里蘭卡魯忽努，海拔0~600米南部低地。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。天氣熱發酵快，湯色更深。",
        "魯忽努的湯色是錫蘭茶中最深的，多用作奶茶。",
        "深紅湯色，厚重的麥芽，澀味強。",
        "奶茶、印度香料奶茶、濃早晨茶。",
        "98度3分30秒。加奶會變柔。"
      ]
    },
    {
      id: "black-keemun",
      group: "black",
      h: "祁",
      hz: "祁門紅茶",
      hs: "祁门红茶",
      rom: "Keemun",
      sub: "Keemun",
      t: 95,
      tr: "90~95℃",
      l: "3g",
      w: "150ml",
      s: [150, 180, 210],
      ox: 90,
      ko: [
        "기문",
        "장미·난초·다크초콜릿 — 중국 홍차의 기준.",
        "90%",
        "150ml에 3g",
        "1~2회",
        "90~95도에서 2분 30초.",
        "안후이성 치먼, 황산 서쪽. 차밭의 대부분이 해발 100~350m에 있습니다.",
        "위조 → 유념 → 산화 → 건조 → 정형. 잎을 가늘게 말아 천천히 산화시킵니다.",
        "1875년 치먼의 여간신(余干臣)이 푸젠의 홍차 제법을 들여와 만들었다고 전합니다. ‘기문향’은 세계 3대 향으로 꼽힙니다.",
        "장미·난초·다크초콜릿, 부드러운 떫음과 긴 여운.",
        "다크초콜릿, 훈제 요리, 아침 식사.",
        "90~95도에서 2분 30초. 우유 없이 향을 즐깁니다."
      ],
      en: [
        "Keemun",
        "Rose, orchid and dark chocolate — the yardstick for Chinese black tea.",
        "90%",
        "3 g to 150 ml",
        "1–2 infusions",
        "90–95 °C for 2½ minutes.",
        "Qimen in Anhui, west of Huangshan; most gardens lie at 100–350 m.",
        "Withering → rolling → oxidation → drying → sorting, with the leaf rolled fine and oxidised slowly.",
        "Tradition says Yu Ganchen of Qimen brought the Fujian method here in 1875; the Keemun aroma is counted among the world's three great tea aromas.",
        "Rose, orchid and dark chocolate, soft astringency and a long finish.",
        "Dark chocolate, smoked dishes, breakfast.",
        "90–95 °C for 2½ minutes. No milk."
      ],
      "zh-CN": [
        "祁门红茶",
        "玫瑰、兰花与黑巧克力——中国红茶的标准。",
        "90%",
        "150毫升配3克",
        "1~2泡",
        "90~95度泡2分30秒。",
        "安徽祁门，黄山以西，茶园多在海拔100~350米。",
        "萎凋 → 揉捻 → 发酵 → 干燥 → 筛分。叶子揉细、慢慢发酵。",
        "相传1875年祁门人余干臣从福建引入红茶制法。“祁门香”被视为世界三大茶香之一。",
        "玫瑰、兰花与黑巧克力，涩味柔，余韵长。",
        "黑巧克力、熏制料理、早餐。",
        "90~95度2分30秒。不加奶。"
      ],
      "zh-TW": [
        "祁門紅茶",
        "玫瑰、蘭花與黑巧克力——中國紅茶的標準。",
        "90%",
        "150毫升配3公克",
        "1~2泡",
        "90~95度泡2分30秒。",
        "安徽祁門，黃山以西，茶園多在海拔100~350米。",
        "萎凋 → 揉捻 → 發酵 → 乾燥 → 篩分。葉子揉細、慢慢發酵。",
        "相傳1875年祁門人余干臣從福建引入紅茶製法。「祁門香」被視為世界三大茶香之一。",
        "玫瑰、蘭花與黑巧克力，澀味柔，餘韻長。",
        "黑巧克力、燻製料理、早餐。",
        "90~95度2分30秒。不加奶。"
      ]
    },
    {
      id: "black-lapsang",
      group: "black",
      h: "煙",
      hz: "正山小種",
      hs: "正山小种",
      rom: "Lapsang Souchong",
      sub: "Lapsang Souchong",
      t: 98,
      l: "3g",
      s: [180, 210, 240],
      ox: 95,
      ko: [
        "정산소종",
        "소나무 연기로 건조한, 세계에서 향이 가장 강한 홍차.",
        "95%",
        "200ml에 3g",
        "1~2회",
        "98도에서 3분.",
        "푸젠성 우이산 북쪽 끝의 퉁무관, 해발 800~1,500m.",
        "위조 → 유념 → 산화 → 소나무 연기로 건조(熏焙). 마지막 건조를 솔가지 연기로 합니다.",
        "명대 말 군대를 피해 자리를 뜬 사이 잎이 붉게 산화되었고, 급히 소나무로 건조한 데서 시작되었다는 이야기가 전합니다.",
        "소나무 연기·타르·말린 과일, 깊고 묵직합니다.",
        "훈제 고기, 바비큐, 치즈, 피트 위스키.",
        "98도에서 3분. 연기가 강해 우유와도 어울립니다."
      ],
      en: [
        "Lapsang Souchong",
        "Smoke-dried over pine: the most powerfully scented black tea there is.",
        "95%",
        "3 g to 200 ml",
        "1–2 infusions",
        "98 °C for 3 minutes.",
        "Tongmuguan, at the northern edge of Mount Wuyi in Fujian, at 800–1,500 m.",
        "Withering → rolling → oxidation → drying over pine smoke.",
        "A late-Ming story: soldiers forced the growers to flee, the leaf oxidised red, and they dried it hastily over pine.",
        "Pine smoke, tar and dried fruit, deep and heavy.",
        "Smoked meat, barbecue, cheese, peated whisky.",
        "98 °C for 3 minutes. Strong enough for milk."
      ],
      "zh-CN": [
        "正山小种",
        "用松烟烘干，世界上香气最强的红茶。",
        "95%",
        "200毫升配3克",
        "1~2泡",
        "98度泡3分钟。",
        "福建武夷山北端桐木关，海拔800~1500米。",
        "萎凋 → 揉捻 → 发酵 → 松烟熏焙。最后用松枝烟熏干。",
        "相传明末为避兵乱离开，叶子变红发酵，匆忙用松木烘干，由此开始。",
        "松烟、焦油与干果，深沉厚重。",
        "熏肉、烧烤、奶酪、泥煤威士忌。",
        "98度3分钟。烟味强，加奶也好。"
      ],
      "zh-TW": [
        "正山小種",
        "用松煙烘乾，世界上香氣最強的紅茶。",
        "95%",
        "200毫升配3公克",
        "1~2泡",
        "98度泡3分鐘。",
        "福建武夷山北端桐木關，海拔800~1500米。",
        "萎凋 → 揉捻 → 發酵 → 松煙燻焙。最後用松枝煙燻乾。",
        "相傳明末為避兵亂離開，葉子變紅發酵，匆忙用松木烘乾，由此開始。",
        "松煙、焦油與乾果，深沉厚重。",
        "燻肉、燒烤、起司、泥煤威士忌。",
        "98度3分鐘。煙味強，加奶也好。"
      ]
    },
    {
      id: "black-jinjunmei",
      group: "black",
      h: "金",
      hz: "金駿眉",
      hs: "金骏眉",
      rom: "Jin Jun Mei",
      sub: "Jin Jun Mei",
      t: 90,
      tr: "85~90℃",
      l: "3g",
      w: "150ml",
      s: [120, 150, 180],
      ox: 85,
      ko: [
        "금준미",
        "정산소종의 싹만으로 만든, 가장 귀한 홍차 가운데 하나.",
        "85%",
        "150ml에 3g",
        "2회",
        "85~90도에서 2분, 2포 2분 30초.",
        "푸젠성 우이산 퉁무관, 해발 1,200m 안팎 야생 차밭.",
        "위조 → 유념 → 산화 → 건조. 봄싹만 골라 훈연 없이 만들어 꽃과 꿀 향을 살립니다.",
        "2005년 정산당(正山堂)의 강원의(江元勳) 팀이 정산소종의 싹만으로 새 차를 만들며 이름을 붙였다고 전합니다.",
        "꿀·흰 꽃·말린 살구, 부드럽고 긴 단맛.",
        "과일, 가벼운 디저트, 흰살생선.",
        "85~90도에서 2분. 끓는 물은 싹을 상하게 합니다."
      ],
      en: [
        "Jin Jun Mei",
        "Made from buds alone in the Lapsang style — one of the most precious black teas.",
        "85%",
        "3 g to 150 ml",
        "2 infusions",
        "85–90 °C for 2 minutes, then 2½.",
        "Tongmuguan, Mount Wuyi, Fujian, wild gardens around 1,200 m.",
        "Withering → rolling → oxidation → drying, with only spring buds and no smoke at all, so the flower and honey stay.",
        "It was created in 2005 by Jiang Yuanxun's team at Zheng Shan Tang, using only buds of the lapsang bush.",
        "Honey, white flowers and dried apricot, with a soft, long sweetness.",
        "Fruit, light desserts, white fish.",
        "85–90 °C for 2 minutes; boiling water bruises the buds."
      ],
      "zh-CN": [
        "金骏眉",
        "只用正山小种的芽制成，最珍贵的红茶之一。",
        "85%",
        "150毫升配3克",
        "2泡",
        "85~90度泡2分钟，第二泡2分30秒。",
        "福建武夷山桐木关，海拔1200米上下的野生茶园。",
        "萎凋 → 揉捻 → 发酵 → 干燥。只取春芽，不加烟熏，留住花香与蜜香。",
        "2005年正山堂江元勋团队只用小种的芽制成新茶，因而得名。",
        "蜂蜜、白花与杏干，柔和而长久的甜。",
        "水果、清淡甜点、白身鱼。",
        "85~90度2分钟。沸水会伤到芽。"
      ],
      "zh-TW": [
        "金駿眉",
        "只用正山小種的芽製成，最珍貴的紅茶之一。",
        "85%",
        "150毫升配3公克",
        "2泡",
        "85~90度泡2分鐘，第二泡2分30秒。",
        "福建武夷山桐木關，海拔1200米上下的野生茶園。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。只取春芽，不加煙燻，留住花香與蜜香。",
        "2005年正山堂江元勳團隊只用小種的芽製成新茶，因而得名。",
        "蜂蜜、白花與杏乾，柔和而長久的甜。",
        "水果、清淡甜點、白身魚。",
        "85~90度2分鐘。沸水會傷到芽。"
      ]
    },
    {
      id: "black-dianhong",
      group: "black",
      h: "滇",
      hz: "滇紅",
      hs: "滇红",
      rom: "Dianhong",
      sub: "Dianhong",
      t: 95,
      l: "5g",
      s: [180, 210, 240],
      ox: 95,
      ko: [
        "전홍",
        "윈난 대엽종의 힘 — 밝은 금색과 꿀 향.",
        "95%",
        "200ml에 5g",
        "1~2회",
        "95도에서 3분.",
        "윈난성 린창·펑칭, 해발 1,500~2,000m의 대엽종 차밭.",
        "위조 → 유념 → 산화 → 건조. 큰잎을 오래 산화해 금색 싹이 드러납니다.",
        "1939년 펑칭에서 처음 만들어진 비교적 젊은 홍차입니다.",
        "꿀·말린 자두·몰트, 두꺼운 바디.",
        "중식, 바비큐, 밀크티.",
        "95도에서 3분. 우유를 넣어도 힘이 남습니다."
      ],
      en: [
        "Dianhong",
        "Yunnan large-leaf strength: bright gold and honey.",
        "95%",
        "5 g to 200 ml",
        "1–2 infusions",
        "95 °C for 3 minutes.",
        "Lincang and Fengqing in Yunnan, 1,500–2,000 m, large-leaf gardens.",
        "Withering → rolling → long oxidation → drying, which brings out golden buds.",
        "First made in Fengqing in 1939 — a young black tea.",
        "Honey, dried plum and malt with a thick body.",
        "Chinese food, barbecue, milk tea.",
        "95 °C for 3 minutes; still has strength under milk."
      ],
      "zh-CN": [
        "滇红",
        "云南大叶种的力量——明亮的金芽与蜜香。",
        "95%",
        "200毫升配5克",
        "1~2泡",
        "95度泡3分钟。",
        "云南临沧、凤庆，海拔1500~2000米的大叶种茶园。",
        "萎凋 → 揉捻 → 长发酵 → 干燥。大叶久发酵，显出金色芽头。",
        "1939年在凤庆首次制成，是较年轻的红茶。",
        "蜂蜜、干李与麦芽，汤体厚。",
        "中餐、烧烤、奶茶。",
        "95度3分钟。加奶仍有力量。"
      ],
      "zh-TW": [
        "滇紅",
        "雲南大葉種的力量——明亮的金芽與蜜香。",
        "95%",
        "200毫升配5公克",
        "1~2泡",
        "95度泡3分鐘。",
        "雲南臨滄、鳳慶，海拔1500~2000米的大葉種茶園。",
        "萎凋 → 揉捻 → 長發酵 → 乾燥。大葉久發酵，顯出金色芽頭。",
        "1939年在鳳慶首次製成，是較年輕的紅茶。",
        "蜂蜜、乾李與麥芽，湯體厚。",
        "中餐、燒烤、奶茶。",
        "95度3分鐘。加奶仍有力量。"
      ]
    },
    {
      id: "blend-masala",
      group: "black",
      h: "香",
      hz: "馬薩拉茶",
      hs: "马萨拉茶",
      rom: "Masala Chai",
      sub: "Masala Chai",
      t: 98,
      l: "5g",
      w: "150ml",
      s: [300, 300, 300],
      m: 1,
      ox: 95,
      ko: [
        "마살라 차이",
        "홍차에 향신료와 우유를 끓인 인도의 일상 — 차이왈라의 잔.",
        "95%",
        "150ml에 5g, 우유 반을 섞어",
        "1회",
        "98도에서 5분 진하게 우린 뒤 우유와 설탕을 더해 끓입니다.",
        "인도 전역, 특히 뭄바이·델리의 차이왈라.",
        "아쌈 CTC를 진하게 우리고 생강·카다멈·계피·정향·후추를 넣어 우유와 함께 끓입니다.",
        "영국 식민지 시대 인도에서 차 재배가 늘며, 향신료와 우유를 넣어 마시는 방식이 자리 잠았습니다.",
        "향신료의 따뜻함, 우유의 둥근 단맛, 진한 홍차의 힘.",
        "사모사, 파라타, 아침 빵.",
        "우유와 함께 끓여야 향신료가 열립니다. 설탕은 취향껏."
      ],
      en: [
        "Masala Chai",
        "Black tea boiled with spice and milk — India's everyday cup from the chai-wallah.",
        "95%",
        "5 g to 150 ml, then half milk",
        "One boil",
        "Steep 5 minutes at 98 °C, then add milk and sugar and bring to a boil.",
        "All over India, most of all at the stalls of Mumbai and Delhi.",
        "Strong Assam CTC with ginger, cardamom, cinnamon, clove and pepper, boiled with milk.",
        "Tea growing spread in colonial India and the spiced, milky way of drinking it settled in with it.",
        "Warm spice, round milk sweetness and the strength of strong black tea.",
        "Samosa, paratha, morning bread.",
        "Boil with the milk so the spice opens. Sugar to taste."
      ],
      "zh-CN": [
        "马萨拉茶",
        "红茶与香料、牛奶一起煮——印度街头茶摊的日常。",
        "95%",
        "150毫升配5克，再加一半牛奶",
        "1次",
        "98度泡5分钟至浓，加牛奶与糖再煮沸。",
        "印度各地，尤其孟买、德里的街头茶摊。",
        "用阿萨姆CTC浓泡，加生姜、小豆蔻、肉桂、丁香、胡椒，与牛奶同煮。",
        "殖民时期印度茶叶增产，加香料与牛奶的喝法也随之普及。",
        "香料的温暖、牛奶的圆润甜与浓红茶的力。",
        "萨莫萨、印度煎饼、早餐面包。",
        "与牛奶同煮香气才开。糖按口味。"
      ],
      "zh-TW": [
        "馬薩拉茶",
        "紅茶與香料、牛奶一起煮——印度街頭茶攤的日常。",
        "95%",
        "150毫升配5公克，再加一半牛奶",
        "1次",
        "98度泡5分鐘至濃，加牛奶與糖再煮沸。",
        "印度各地，尤其孟買、德里的街頭茶攤。",
        "用阿薩姆CTC濃泡，加生薑、小豆蔻、肉桂、丁香、胡椒，與牛奶同煮。",
        "殖民時期印度茶葉增產，加香料與牛奶的喝法也隨之普及。",
        "香料的溫暖、牛奶的圓潤甜與濃紅茶的力。",
        "薩莫薩、印度煎餅、早餐麵包。",
        "與牛奶同煮香氣才開。糖按口味。"
      ]
    },
    {
      id: "black-sikkim",
      group: "black",
      h: "雪",
      hz: "锡金泰米",
      hs: "锡金泰米",
      rom: "Temi (Sikkim)",
      sub: "Temi (Sikkim)",
      alias: ["시킴 테미"],
      t: 95,
      l: "3g",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "테미 (시킴)",
        "히말라야 동쪽, 전 지역 유기농으로 유명한 소규모 산지.",
        "90%",
        "200ml에 3g",
        "1~2회",
        "95도에서 3분.",
        "인도 시킴 테미, 해발 1,400~2,000m.",
        "위조 → 유념 → 산화 → 건조. 2000년대에 유기농 재배로 전환했습니다.",
        "시킴은 인도에서 처음으로 전 지역 유기농 차 재배를 선언한 주입니다.",
        "꽃 향과 옅은 머스캣, 부드러운 바디.",
        "스콘, 견과, 가벼운 디저트.",
        "95도에서 3분. 우유 없이 향을 살립니다."
      ],
      en: [
        "Temi (Sikkim)",
        "East Himalaya: a small garden known for being wholly organic.",
        "90%",
        "3 g to 200 ml",
        "1–2 infusions",
        "95 °C for 3 minutes.",
        "Temi in Sikkim, India, at 1,400–2,000 m.",
        "Withering → rolling → oxidation → drying; the state converted to organic growing in the 2000s.",
        "Sikkim was the first Indian state to declare all of its tea organic.",
        "Flowers and a light muscatel, with a soft body.",
        "Scones, nuts, light desserts.",
        "95 °C for 3 minutes; no milk, to keep the aroma."
      ],
      "zh-CN": [
        "锡金泰米",
        "喜马拉雅东侧，全境有机的小产区。",
        "90%",
        "200毫升配3克",
        "1~2泡",
        "95度泡3分钟。",
        "印度锡金泰米，海拔1400~2000米。",
        "萎凋 → 揉捻 → 发酵 → 干燥。2000年代起转为有机种植。",
        "锡金是印度第一个宣布全境茶叶有机的邦。",
        "花香与淡麝香葡萄，汤体柔和。",
        "司康、坚果、清淡甜点。",
        "95度3分钟。不加奶以保留香气。"
      ],
      "zh-TW": [
        "錫金泰米",
        "喜馬拉雅東側，全境有機的小產區。",
        "90%",
        "200毫升配3公克",
        "1~2泡",
        "95度泡3分鐘。",
        "印度錫金泰米，海拔1400~2000米。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。2000年代起轉為有機種植。",
        "錫金是印度第一個宣布全境茶葉有機的邦。",
        "花香與淡麝香葡萄，湯體柔和。",
        "司康、堅果、清淡甜點。",
        "95度3分鐘。不加奶以保留香氣。"
      ]
    },
    {
      id: "black-nepal",
      group: "black",
      h: "蘭",
      hz: "伊拉姆",
      hs: "伊拉姆",
      rom: "Ilam (Nepal)",
      sub: "Ilam (Nepal)",
      alias: ["네팔 일람"],
      t: 95,
      l: "3g",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "일람 (네팔)",
        "히말라야 동쪽, 다즐링과 이웃한 고산 홍차.",
        "90%",
        "200ml에 3g",
        "1~2회",
        "90~95도에서 3분.",
        "네팔 일람, 해발 1,200~2,000m. 다즐링 바로 서쪽.",
        "위조 → 유념 → 산화 → 건조. 소규모 농가가 손으로 만드는 차가 많습니다.",
        "네팔 차는 1863년 중국에서 종자를 들여와 시작되었고, 다즐링과 비슷한 향으로 알려졌습니다.",
        "꽃·청포도·옅은 머스캣, 가볍습니다.",
        "스콘, 과일, 가벼운 디저트.",
        "90~95도에서 3분. 우유 없이."
      ],
      en: [
        "Ilam (Nepal)",
        "East Himalaya: a high-grown black next door to Darjeeling.",
        "90%",
        "3 g to 200 ml",
        "1–2 infusions",
        "90–95 °C for 3 minutes.",
        "Ilam in Nepal, 1,200–2,000 m, just west of Darjeeling.",
        "Withering → rolling → oxidation → drying, much of it by hand on small farms.",
        "Nepali tea began with seed from China in 1863 and is known for a Darjeeling-like aroma.",
        "Flowers, green grape and a light muscatel.",
        "Scones, fruit, light desserts.",
        "90–95 °C for 3 minutes, no milk."
      ],
      "zh-CN": [
        "伊拉姆",
        "喜马拉雅东侧，与大吉岭相邻的高山红茶。",
        "90%",
        "200毫升配3克",
        "1~2泡",
        "90~95度泡3分钟。",
        "尼泊尔伊拉姆，海拔1200~2000米，在大吉岭西侧。",
        "萎凋 → 揉捻 → 发酵 → 干燥。多为小农手工制作。",
        "尼泊尔茶始于1863年从中国引入茶种，香气近似大吉岭。",
        "花香、青葡萄与淡麝香葡萄。",
        "司康、水果、清淡甜点。",
        "90~95度3分钟，不加奶。"
      ],
      "zh-TW": [
        "伊拉姆",
        "喜馬拉雅東側，與大吉嶺相鄰的高山紅茶。",
        "90%",
        "200毫升配3公克",
        "1~2泡",
        "90~95度泡3分鐘。",
        "尼泊爾伊拉姆，海拔1200~2000米，在大吉嶺西側。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。多為小農手工製作。",
        "尼泊爾茶始於1863年從中國引入茶種，香氣近似大吉嶺。",
        "花香、青葡萄與淡麝香葡萄。",
        "司康、水果、清淡甜點。",
        "90~95度3分鐘，不加奶。"
      ]
    },
    {
      id: "black-kenya",
      group: "black",
      h: "赤",
      hz: "肯尼亞",
      hs: "肯尼亚",
      rom: "CTC (Kenya)",
      sub: "CTC (Kenya)",
      alias: ["케냐 CTC"],
      t: 98,
      l: "4g",
      s: [180, 240, 240],
      ox: 95,
      ko: [
        "CTC (케냐)",
        "적도 고지의 CTC — 진한 색과 힘.",
        "95%",
        "200ml에 4g",
        "1~2회",
        "98도에서 3분.",
        "케냐 리프트밸리, 해발 1,500~2,200m.",
        "위조 → CTC(분쇄·발효) → 건조. 잘게 부순 잎이 금방 진하게 우러납니다.",
        "1903년 영국인이 차를 들여온 뒤 세계 3대 홍차 수출국이 되었습니다. 대부분 티백용입니다.",
        "진한 붉은 색, 강한 몰트와 떫음, 우유를 잘 견딥니다.",
        "밀크티, 차이, 아침 티백.",
        "98도에서 3분. 우유와 함께 마십니다."
      ],
      en: [
        "CTC (Kenya)",
        "Equatorial highland CTC: deep colour and strength.",
        "95%",
        "4 g to 200 ml",
        "1–2 infusions",
        "98 °C for 3 minutes.",
        "The Rift Valley in Kenya, 1,500–2,200 m.",
        "Withering → CTC (crush, tear, curl) → drying; the shredded leaf colours fast.",
        "Tea arrived in 1903 and Kenya became one of the world's three largest exporters, mostly for tea bags.",
        "Deep red, strong malt and astringency, stands up to milk.",
        "Milk tea, chai, morning tea bags.",
        "98 °C for 3 minutes. Made for milk."
      ],
      "zh-CN": [
        "肯尼亚CTC",
        "赤道高地的CTC——深色与力量。",
        "95%",
        "200毫升配4克",
        "1~2泡",
        "98度泡3分钟。",
        "肯尼亚大裂谷，海拔1500~2200米。",
        "萎凋 → CTC（切碎、撕裂、卷曲）→ 干燥。碎叶很快出色。",
        "1903年英国人引入茶种，如今是世界三大红茶出口国之一，多用于茶包。",
        "深红汤色，强麦芽与涩，耐得住牛奶。",
        "奶茶、香料茶、早餐茶包。",
        "98度3分钟。适合加奶。"
      ],
      "zh-TW": [
        "肯亞CTC",
        "赤道高地的CTC——深色與力量。",
        "95%",
        "200毫升配4公克",
        "1~2泡",
        "98度泡3分鐘。",
        "肯亞大裂谷，海拔1500~2200米。",
        "萎凋 → CTC（切碎、撕裂、捲曲）→ 乾燥。碎葉很快出色。",
        "1903年英國人引入茶種，如今是世界三大紅茶出口國之一，多用於茶包。",
        "深紅湯色，強麥芽與澀，耐得住牛奶。",
        "奶茶、香料茶、早餐茶包。",
        "98度3分鐘。適合加奶。"
      ]
    },
    {
      id: "black-jaksal",
      group: "black",
      h: "雀",
      hz: "河東雀舌紅茶",
      hs: "河东雀舌红茶",
      rom: "Jaksal (Hadong)",
      sub: "Jaksal (Hadong)",
      alias: ["하동 잭살차", "작설"],
      t: 90,
      tr: "85~90℃",
      l: "3g",
      w: "150ml",
      s: [180, 210, 240],
      ox: 90,
      ko: [
        "잭살 (하동)",
        "하동에서 만든 발효 홍차 — 잭살은 ‘작설’의 방언.",
        "90%",
        "150ml에 3g",
        "1~2회",
        "85~90도에서 3분.",
        "경남 하동 화개, 지리산 자락의 여름잎.",
        "위조 → 유념 → 산화 → 건조. 하동의 녹차 잎을 완전 산화시켜 홍차로 만듭니다.",
        "‘잭살’은 작설(雀舌)의 경남 방언입니다. 하동 농가가 녹차 잎으로 홍차를 만들며 붙인 이름입니다.",
        "꿀·말린 과일·몰트, 부드러운 떫음.",
        "과일, 빵, 밀크티.",
        "85~90도에서 3분. 향이 부드러워 우유 없이도 좋습니다."
      ],
      en: [
        "Jaksal (Hadong)",
        "A black tea made in Hadong from Korean leaf; jaksal is the local word for a sparrow's tongue.",
        "90%",
        "3 g to 150 ml",
        "1–2 infusions",
        "85–90 °C for 3 minutes.",
        "Hwagae in Hadong, summer leaf from the slopes of Mount Jiri.",
        "Withering → rolling → full oxidation → drying, using Hadong green-tea leaf.",
        "Jaksal is the Gyeongsang dialect for jakseol, a young leaf; Hadong growers gave the name to their black tea.",
        "Honey, dried fruit and malt, with a soft astringency.",
        "Fruit, bread, milk tea.",
        "85–90 °C for 3 minutes. Soft enough without milk."
      ],
      "zh-CN": [
        "河东雀舌红茶",
        "在河东用韩国茶叶制成的红茶——“잭살”是“雀舌”的方言。",
        "90%",
        "150毫升配3克",
        "1~2泡",
        "85~90度泡3分钟。",
        "庆南河东花开，智异山山腰的夏叶。",
        "萎凋 → 揉捻 → 完全发酵 → 干燥，用河东的绿茶鲜叶制成。",
        "“잭살”是庆尚方言里的“雀舌”。河东茶农用绿茶鲜叶做红茶时取了这个名字。",
        "蜂蜜、干果与麦芽，涩味柔和。",
        "水果、面包、奶茶。",
        "85~90度3分钟。不加奶也很好。"
      ],
      "zh-TW": [
        "河東雀舌紅茶",
        "在河東用韓國茶葉製成的紅茶——「잭살」是「雀舌」的方言。",
        "90%",
        "150毫升配3公克",
        "1~2泡",
        "85~90度泡3分鐘。",
        "慶南河東花開，智異山山腰的夏葉。",
        "萎凋 → 揉捻 → 完全發酵 → 乾燥，用河東的綠茶鮮葉製成。",
        "「잭살」是慶尚方言裡的「雀舌」。河東茶農用綠茶鮮葉做紅茶時取了這個名字。",
        "蜂蜜、乾果與麥芽，澀味柔和。",
        "水果、麵包、奶茶。",
        "85~90度3分鐘。不加奶也很好。"
      ]
    },
    {
      id: "black-ruby18",
      group: "black",
      h: "月",
      hz: "日月潭",
      hs: "日月潭",
      rom: "Sun Moon Lake",
      sub: "Sun Moon Lake",
      alias: ["일월담 홍차"],
      t: 95,
      l: "5g",
      s: [180, 210, 240],
      ox: 95,
      ko: [
        "일월담",
        "타이완 야생차와 미얀마 아쌈의 교배 — 민트와 계피 향.",
        "95%",
        "200ml에 5g",
        "1~2회",
        "95도에서 3분.",
        "난터우 위츠(썬문 호수) 일대, 해발 600~800m.",
        "위조 → 유념 → 산화 → 건조. 대엽종을 오래 산화시킵니다.",
        "1951년 타이완 차개량장 어지분장에서 미얀마 아쌈(B-729)과 타이완 야생 산차(B-607)를 교배해 만들었고, 1999년 대차18호로 명명, 2003년 ‘홍옥’이라는 이름이 붙었습니다.",
        "민트·계피·육두구 같은 향신료 향, 진한 색, 긴 여운.",
        "중식, 훈제 요리, 밀크티.",
        "95도에서 3분. 민트 향은 뜨거운 물에서 더 열립니다."
      ],
      en: [
        "Sun Moon Lake",
        "A cross of Taiwanese wild tea and Burmese assamica — mint and cinnamon.",
        "95%",
        "5 g to 200 ml",
        "1–2 infusions",
        "95 °C for 3 minutes.",
        "Around Sun Moon Lake in Nantou, at 600–800 m.",
        "Withering → rolling → oxidation → drying, with a long oxidation of large leaf.",
        "Crossed in 1951 at the Yuchi branch of Taiwan's tea improvement station from Burmese assamica (B-729) and Taiwanese wild mountain tea (B-607); named TTES No.18 in 1999 and given the name Hong Yu (Ruby) in 2003.",
        "Mint, cinnamon and nutmeg, a deep colour, a long finish.",
        "Chinese food, smoked dishes, milk tea.",
        "95 °C for 3 minutes; hot water opens the mint."
      ],
      "zh-CN": [
        "日月潭",
        "台湾野生茶与缅甸阿萨姆的杂交——薄荷与肉桂香。",
        "95%",
        "200毫升配5克",
        "1~2泡",
        "95度泡3分钟。",
        "南投鱼池（日月潭）一带，海拔600~800米。",
        "萎凋 → 揉捻 → 发酵 → 干燥。大叶种长时间发酵。",
        "1951年台湾茶改场鱼池分场以缅甸阿萨姆（B-729）与台湾野生山茶（B-607）杂交育成，1999年命名台茶18号，2003年定名“红玉”。",
        "薄荷、肉桂与肉豆蔻般的香料香，汤色深，余韵长。",
        "中餐、熏制料理、奶茶。",
        "95度3分钟。热水使薄荷香更开。"
      ],
      "zh-TW": [
        "日月潭",
        "台灣野生茶與緬甸阿薩姆的雜交——薄荷與肉桂香。",
        "95%",
        "200毫升配5公克",
        "1~2泡",
        "95度泡3分鐘。",
        "南投魚池（日月潭）一帶，海拔600~800米。",
        "萎凋 → 揉捻 → 發酵 → 乾燥。大葉種長時間發酵。",
        "1951年台灣茶改場魚池分場以緬甸阿薩姆（B-729）與台灣野生山茶（B-607）雜交育成，1999年命名台茶18號，2003年定名「紅玉」。",
        "薄荷、肉桂與肉豆蔻般的香料香，湯色深，餘韻長。",
        "中餐、燻製料理、奶茶。",
        "95度3分鐘。熱水使薄荷香更開。"
      ]
    },
    /* ── 흑차 ── */
    {
      id: "dark-sheng",
      group: "dark",
      h: "生",
      hz: "普洱生茶",
      hs: "普洱生茶",
      rom: "Sheng Pu-erh",
      sub: "Raw Pu-erh",
      ox: 100,
      ko: [
        "보이 생차",
        "익지 않은 보이차 — 시간이 미생물과 함께 숙성시킵니다.",
        "후발효 · 생차",
        "개완 100ml에 5g, 세차 1회",
        "8회 이상",
        "100도에서 20초, 이후 5초씩 늘려 8~10회.",
        "윈난성 멍하이·이무·징마이, 해발 1,200~2,000m.",
        "위조 → 살청 → 유념 → 건조 → 압착, 이후 자연 후발효.",
        "청나라 때 공차로 바쳐지고 티베트와 광동·홍콩 등지로 대량 유통되었습니다. 생차는 눌러 만든 뒤 오래 두며 익힙니다.",
        "5년에 말린 과일·꿀, 10년에 대추·약재, 20년이면 오래된 나무 서랍 같은 향.",
        "기름진 식사, 중식, 육류.",
        "100도 끓는 물. 첫 물은 세차로 버립니다."
      ],
      en: [
        "Sheng Pu-erh",
        "Unripened pu-erh — time and microbes do the ageing.",
        "Post-fermented · raw",
        "5 g to 100 ml in a gaiwan; rinse once",
        "8 or more infusions",
        "100 °C: 20 seconds, then 5 seconds longer each time, 8–10 infusions.",
        "Menghai, Yiwu and Jingmai in Yunnan, 1,200–2,000 m.",
        "Withering → firing → rolling → drying → pressing, then natural post-fermentation.",
        "In Qing times the cakes went as tribute and in bulk to Tibet and to Guangdong and Hong Kong; sheng is left to mature for years.",
        "Dried fruit and honey at five years, dates and herbs at ten, an old wooden drawer by twenty.",
        "Rich meals, Chinese food, meat.",
        "Boiling water. Discard the first rinse."
      ],
      "zh-CN": [
        "普洱生茶",
        "未经握堆的生茶——时间与微生物一起陈化。",
        "后发酵 · 生茶",
        "盖碗100毫升配5克，洗茶一次",
        "8泡以上",
        "100度泡20秒，之后每次加5秒，共8~10泡。",
        "云南勐海、易武、景迈，海拔1200~2000米。",
        "萎凋 → 杀青 → 揉捻 → 干燥 → 压制，然后自然后发酵。",
        "清代作为贡茶，并大量销往西藏与广东、香港。生茶压成饼后要放多年才成熟。",
        "5年是干果与蜂蜜，10年是红枣与药材，20年像老木抽屉。",
        "油腻餐食、中餐、肉类。",
        "用沸水。第一泡洗茶倒掉。"
      ],
      "zh-TW": [
        "普洱生茶",
        "未經渥堆的生茶——時間與微生物一起陳化。",
        "後發酵 · 生茶",
        "蓋碗100毫升配5公克，洗茶一次",
        "8泡以上",
        "100度泡20秒，之後每次加5秒，共8~10泡。",
        "雲南勐海、易武、景邁，海拔1200~2000米。",
        "萎凋 → 殺菁 → 揉捻 → 乾燥 → 壓製，然後自然後發酵。",
        "清代作為貢茶，並大量銷往西藏與廣東、香港。生茶壓成餅後要放多年才成熟。",
        "5年是乾果與蜂蜜，10年是紅棗與藥材，20年像老木抽屜。",
        "油膩餐食、中餐、肉類。",
        "用沸水。第一泡洗茶倒掉。"
      ]
    },
    {
      id: "dark-shou",
      group: "dark",
      h: "熟",
      hz: "普洱熟茶",
      hs: "普洱熟茶",
      rom: "Shou Pu-erh",
      sub: "Ripe Pu-erh",
      ox: 100,
      ko: [
        "보이 숙차",
        "악퇴로 미리 익힌 보이차 — 바로 마실 수 있는 흙내음.",
        "후발효 · 숙차",
        "개완 100ml에 5g, 세차 2회",
        "8회 이상",
        "100도에서 15초, 이후 5초씩.",
        "윈난성 멍하이 일대, 해발 1,000~2,000m.",
        "위조 → 살청 → 유념 → 악퇴(수분 30~40%, 50~65도에서 40~70일) → 건조 → 압착.",
        "1973년 쿤밍차창이 숙성 기간을 줄이려고 악퇴 기법을 개발했습니다.",
        "흙내음·대추·버섯, 부드러운 질감과 단맛.",
        "식후, 기름진 음식, 매운 요리.",
        "100도에서 15초. 첫 두 번은 세차로 버립니다."
      ],
      en: [
        "Shou Pu-erh",
        "Pu-erh ripened in advance — the earthy cup you can drink now.",
        "Post-fermented · ripe",
        "5 g to 100 ml; rinse twice",
        "8 or more infusions",
        "100 °C: 15 seconds, then 5 seconds longer each time.",
        "Around Menghai in Yunnan, 1,000–2,000 m.",
        "Withering → firing → rolling → wo dui (30–40% moisture, 50–65 °C, 40–70 days) → drying → pressing.",
        "The Kunming tea factory developed wo dui in 1973 to shorten the wait.",
        "Earth, dates and mushroom, with a soft texture and sweetness.",
        "After meals, rich food, spicy dishes.",
        "100 °C for 15 seconds. Discard the first two rinses."
      ],
      "zh-CN": [
        "普洱熟茶",
        "握堆提前成熟的普洱——现在就能喝的陈香。",
        "后发酵 · 熟茶",
        "盖碗100毫升配5克，洗茶两次",
        "8泡以上",
        "100度泡15秒，之后每次加5秒。",
        "云南勐海一带，海拔1000~2000米。",
        "萎凋 → 杀青 → 揉捻 → 渥堆（含水30~40%，50~65度下40~70天）→ 干燥 → 压制。",
        "1973年昆明茶厂为缩短陈化时间而开发了渥堆工艺。",
        "陈土、红枣与菌菇，柔和的口感与甜。",
        "饭后、油腻食物、辛辣料理。",
        "100度15秒。前两次洗茶倒掉。"
      ],
      "zh-TW": [
        "普洱熟茶",
        "渥堆提前成熟的普洱——現在就能喝的陳香。",
        "後發酵 · 熟茶",
        "蓋碗100毫升配5公克，洗茶兩次",
        "8泡以上",
        "100度泡15秒，之後每次加5秒。",
        "雲南勐海一帶，海拔1000~2000米。",
        "萎凋 → 殺菁 → 揉捻 → 渥堆（含水30~40%，50~65度下40~70天）→ 乾燥 → 壓製。",
        "1973年昆明茶廠為縮短陳化時間而開發了渥堆工藝。",
        "陳土、紅棗與菌菇，柔和的口感與甜。",
        "飯後、油膩食物、辛辣料理。",
        "100度15秒。前兩次洗茶倒掉。"
      ]
    },
    {
      id: "dark-anhua",
      group: "dark",
      h: "安",
      hz: "安化黑茶",
      hs: "安化黑茶",
      rom: "Anhua Dark Tea",
      sub: "Anhua Heicha",
      ox: 100,
      ko: [
        "안화흑차",
        "후난 안화의 압착 흑차 — 천량차로 대표됩니다.",
        "후발효",
        "5g에 150ml",
        "6회 이상",
        "100도에서 20초, 이후 5초씩.",
        "후난성 안화, 해발 200~800m.",
        "살청 → 유념 → 악퇴 → 칠성조에서 소나무 연기로 천천히 건조.",
        "안화는 명·청 시대에 변방으로 가는 ‘변차’를 만들던 흑차의 본거지입니다.",
        "연기·대추·약재, 부드럽고 진합니다.",
        "고기, 중식, 차게.",
        "100도에서 20초, 여러 번 우립니다."
      ],
      en: [
        "Anhua Dark Tea",
        "Pressed dark tea from Anhua in Hunan, famous as the thousand-liang log.",
        "Post-fermented",
        "5 g to 150 ml",
        "6 or more infusions",
        "100 °C: 20 seconds, then 5 seconds longer each time.",
        "Anhua in Hunan, 200–800 m.",
        "Firing → rolling → wo dui → slow drying over pine smoke on the seven-star stove.",
        "Anhua was the home of the border tea sent to the frontiers in Ming and Qing times.",
        "Smoke, dates and herbs, soft but deep.",
        "Meat, Chinese food, and it goes down cold too.",
        "100 °C for 20 seconds, many times."
      ],
      "zh-CN": [
        "安化黑茶",
        "湖南安化的压制黑茶——以千两茶为代表。",
        "后发酵",
        "5克配150毫升",
        "6泡以上",
        "100度泡20秒，之后每次加5秒。",
        "湖南安化，海拔200~800米。",
        "杀青 → 揉捻 → 渥堆 → 七星灶松烟慢烘。",
        "明清时期安化是输往边疆的“边茶”之乡。",
        "烟熏、红枣与药材，柔和而深。",
        "肉类、中餐，冷了也好喝。",
        "100度20秒，可多次冲泡。"
      ],
      "zh-TW": [
        "安化黑茶",
        "湖南安化的壓製黑茶——以千兩茶為代表。",
        "後發酵",
        "5公克配150毫升",
        "6泡以上",
        "100度泡20秒，之後每次加5秒。",
        "湖南安化，海拔200~800米。",
        "殺菁 → 揉捻 → 渥堆 → 七星灶松煙慢烘。",
        "明清時期安化是輸往邊疆的「邊茶」之鄉。",
        "煙燻、紅棗與藥材，柔和而深。",
        "肉類、中餐，冷了也好喝。",
        "100度20秒，可多次沖泡。"
      ]
    },
    {
      id: "dark-liubao",
      group: "dark",
      h: "六",
      hz: "六堡茶",
      hs: "六堡茶",
      rom: "Liu Bao",
      sub: "Liu Bao Tea",
      ox: 100,
      ko: [
        "육보차",
        "광시의 흑차 — 대나무 광주리에서 진화됩니다.",
        "후발효",
        "5g에 150ml",
        "6회 이상",
        "100도에서 20초, 이후 5초씩.",
        "광시 우저우시 창우현 육보진 일대.",
        "살청 → 유념 → 퇴민 → 건조, 이후 악퇴와 증압을 거쳐 대나무 광주리에 담아 진화.",
        "청 가경 연간 중국 24대 명차에 들었고, 광저우를 거쳐 홍콩·동남아로 나가는 교소차로 이름을 알렸습니다. 1950년대에 냉수 악퇴 공법이 정립됐습니다.",
        "버섯·빈랑 향, 부드러운 단맛.",
        "기름진 음식, 중식.",
        "100도에서 20초. 오래 둘수록 부드러워집니다."
      ],
      en: [
        "Liu Bao",
        "Guangxi's dark tea, aged in bamboo baskets.",
        "Post-fermented",
        "5 g to 150 ml",
        "6 or more infusions",
        "100 °C: 20 seconds, then 5 seconds longer each time.",
        "Liubao town, Cangwu county, Wuzhou, Guangxi.",
        "Firing → rolling → piling → drying, then further piling and steaming, and ageing in bamboo baskets.",
        "Listed among China's 24 famous teas in the Jiaqing era, it became known as an export tea shipped via Guangzhou to Hong Kong and Southeast Asia; the cold-water piling method was set in the 1950s.",
        "Mushroom and betel-nut notes with a soft sweetness.",
        "Rich food, Chinese dishes.",
        "100 °C for 20 seconds; it softens with age."
      ],
      "zh-CN": [
        "六堡茶",
        "广西的黑茶，在竹篓里陈化。",
        "后发酵",
        "5克配150毫升",
        "6泡以上",
        "100度泡20秒，之后每次加5秒。",
        "广西梧州苍梧县六堡镇一带。",
        "杀青 → 揉捻 → 堆闷 → 干燥，再经渥堆与蒸压，入竹篓陈化。",
        "清嘉庆年间列入中国24种名茶，经广州销往香港与东南亚，为侨销茶。1950年代定型冷水渥堆工艺。",
        "菌菇与槟榔香，柔和的甜。",
        "油腻食物、中餐。",
        "100度20秒，越存越柔。"
      ],
      "zh-TW": [
        "六堡茶",
        "廣西的黑茶，在竹簍裡陳化。",
        "後發酵",
        "5公克配150毫升",
        "6泡以上",
        "100度泡20秒，之後每次加5秒。",
        "廣西梧州蒼梧縣六堡鎮一帶。",
        "殺菁 → 揉捻 → 堆悶 → 乾燥，再經渥堆與蒸壓，入竹簍陳化。",
        "清嘉慶年間列入中國24種名茶，經廣州銷往香港與東南亞，為僑銷茶。1950年代定型冷水渥堆工藝。",
        "菌菇與檳榔香，柔和的甜。",
        "油膩食物、中餐。",
        "100度20秒，越存越柔。"
      ]
    },
    {
      id: "dark-cheongtaejeon",
      group: "dark",
      h: "錢",
      hz: "青苔錢",
      hs: "青苔钱",
      rom: "Cheongtaejeon",
      sub: "Korean Coin Tea",
      t: 100,
      l: "5g",
      w: "200ml",
      s: [60, 90, 120],
      ox: 100,
      ko: [
        "청태전",
        "장흥의 동전 모양 발효차 — 한국의 흑차.",
        "후발효",
        "한 조각(5g)에 200ml",
        "3회 이상",
        "100도에서 1분, 끓이면 5분.",
        "전남 장흥, 해발 100~300m.",
        "찐 잎을 절구에 짜아 엽전 모양으로 눌러 구멍을 뚫고 말린 뒤, 보관하며 발효합니다.",
        "조선 시대 장흥·강진에서 만들어진 동전 모양 차입니다. 일제강점기 이후 맥이 끊겼다가 2006~2008년 장흥에서 복원되었습니다.",
        "흙·약재·대추, 부드럽고 따뜻합니다.",
        "식후, 겨울, 기름진 음식.",
        "100도에서 1분, 또는 500ml에 넣고 5분 끓입니다."
      ],
      en: [
        "Cheongtaejeon",
        "A coin-shaped fermented tea from Jangheung — Korea's dark tea.",
        "Post-fermented",
        "One coin (5 g) to 200 ml",
        "3 or more infusions",
        "100 °C for 1 minute, or 5 minutes simmered.",
        "Jangheung in Jeollanam-do, 100–300 m.",
        "Steamed leaf is pounded, pressed into coins with a hole, dried and stored to ferment.",
        "Made in Jangheung and Gangjin in Joseon times, it faded out after the Japanese colonial period and was revived in Jangheung in 2006–2008.",
        "Earth, herbs and dates, soft and warming.",
        "After meals, winter, rich food.",
        "100 °C for 1 minute, or simmer one coin in 500 ml for 5 minutes."
      ],
      "zh-CN": [
        "青苔钱",
        "长兴的铜钱形发酵茶——韩国的黑茶。",
        "后发酵",
        "一枚（5克）配200毫升",
        "3泡以上",
        "100度泡1分钟，煮则5分钟。",
        "全南长兴，海拔100~300米。",
        "蒸过的叶子在臼里捣碎，压成带孔的铜钱形，烘干后存放发酵。",
        "朝鲜时期长兴、康津一带的铜钱形茶，日据时期后失传，2006~2008年在长兴复原。",
        "泥土、药材与红枣，柔和温暖。",
        "饭后、冬天、油腻食物。",
        "100度1分钟，或500毫升水煮5分钟。"
      ],
      "zh-TW": [
        "青苔錢",
        "長興的銅錢形發酵茶——韓國的黑茶。",
        "後發酵",
        "一枚（5公克）配200毫升",
        "3泡以上",
        "100度泡1分鐘，煮則5分鐘。",
        "全南長興，海拔100~300米。",
        "蒸過的葉子在臼裡搗碎，壓成帶孔的銅錢形，烘乾後存放發酵。",
        "朝鮮時期長興、康津一帶的銅錢形茶，日據時期後失傳，2006~2008年在長興復原。",
        "泥土、藥材與紅棗，柔和溫暖。",
        "飯後、冬天、油膩食物。",
        "100度1分鐘，或500毫升水煮5分鐘。"
      ]
    },
    /* ── 가향 · 블렌딩 ── */
    {
      id: "blend-earlgrey",
      group: "black",
      h: "伯",
      hz: "伯爵茶",
      hs: "伯爵茶",
      rom: "Earl Grey",
      sub: "Earl Grey",
      t: 96,
      tr: "95~98℃",
      l: "3g",
      w: "200ml",
      s: [180, 240, 240],
      ox: 95,
      ko: [
        "얼그레이",
        "베르가못 향을 입힌 홍차. 이름은 상표가 아니라 200년의 산업사.",
        "95%",
        "잉 1에 물 60 — 3g에 200ml",
        "1~2회",
        "3분, 2포 4분. 1분은 향, 3분은 균형, 5분은 떫음의 정점입니다.",
        "베이스는 인도·스리랑카·중국 홍차, 향은 이탈리아 칼라브리아의 베르가못 껍질.",
        "기문·아쌈·실론 등 홍차를 섞고, 베르가못 오일을 얹어 향을 입힙니다. 배합 비율은 브랜드마다 다릅니다.",
        "1830년대 영국 총리 찰스 그레이 백작이 중국에서 받은 향차를 즐겼고, 런던의 차상 트와이닝이 상품화했다는 이야기가 전합니다. ‘얼그레이’는 상표가 아니라 차의 갈래가 되었습니다.",
        "시트러스와 꽃, 3분에 향과 맛이 균형을 이룹니다. 카페인은 한 잔 40~70mg.",
        "스콘과 클로티드 크림, 다크초콜릿, 레몬 타르트, 약과, 훈제 연어.",
        "티백은 90~95도에 2분 30초~3분. 밀크티는 4~5분 진하게."
      ],
      en: [
        "Earl Grey",
        "Black tea scented with bergamot — the name is not a trademark but 200 years of trade.",
        "95%",
        "1 part leaf to 60 water — 3 g to 200 ml",
        "1–2 infusions",
        "3 minutes, then 4. One minute is aroma, three balance, five the peak of astringency.",
        "A base of Indian, Ceylon and Chinese black tea, scented with bergamot peel from Calabria.",
        "Keemun, Assam, Ceylon and other black teas blended and scented with bergamot oil; the proportions differ by brand.",
        "In the 1830s the British prime minister Charles Grey is said to have been given a scented tea from China, which Twinings turned into a product; Earl Grey became a family of tea, not a brand.",
        "Citrus and flowers, balanced at three minutes. A cup holds 40–70 mg of caffeine.",
        "Scones with clotted cream, dark chocolate, lemon tart, yakgwa, smoked salmon.",
        "A tea bag at 90–95 °C for 2½–3 minutes; for milk tea, 4–5 minutes strong."
      ],
      "zh-CN": [
        "伯爵茶",
        "以佛手柑赋香的红茶。名字不是商标，而是两百年的产业史。",
        "95%",
        "叶1对水60——3克配200毫升",
        "1~2泡",
        "3分钟，第二泡4分钟。1分钟是香，3分钟是平衡，5分钟是涩味的顶点。",
        "基底为印度、锡兰与中国红茶，香气来自意大利卡拉布里亚的佛手柑皮。",
        "以祁门、阿萨姆、锡兰等红茶拼配，加入佛手柑油赋香，比例各品牌不同。",
        "相传1830年代英国首相查尔斯·格雷伯爵收到来自中国的香茶，伦敦茶商川宁将其商品化。“伯爵茶”成了一个茶类。",
        "柑橘与花香，3分钟时香与味最平衡。一杯咖啡因约40~70毫克。",
        "司康与凝脂奶油、黑巧克力、柠檬塔、药果、烟熏鲑鱼。",
        "茶包90~95度泡2分30秒~3分钟；奶茶泡4~5分钟。"
      ],
      "zh-TW": [
        "伯爵茶",
        "以佛手柑賦香的紅茶。名字不是商標，而是兩百年的產業史。",
        "95%",
        "葉1對水60——3公克配200毫升",
        "1~2泡",
        "3分鐘，第二泡4分鐘。1分鐘是香，3分鐘是平衡，5分鐘是澀味的頂點。",
        "基底為印度、錫蘭與中國紅茶，香氣來自義大利卡拉布里亞的佛手柑皮。",
        "以祁門、阿薩姆、錫蘭等紅茶拼配，加入佛手柑油賦香，比例各品牌不同。",
        "相傳1830年代英國首相查爾斯·格雷伯爵收到來自中國的香茶，倫敦茶商川寧將其商品化。「伯爵茶」成了一個茶類。",
        "柑橘與花香，3分鐘時香與味最平衡。一杯咖啡因約40~70毫克。",
        "司康與凝脂奶油、黑巧克力、檸檬塔、藥果、煙燻鮭魚。",
        "茶包90~95度泡2分30秒~3分鐘；奶茶泡4~5分鐘。"
      ]
    },
    {
      id: "blend-ladygrey",
      group: "black",
      h: "淑",
      hz: "仕女伯爵",
      hs: "仕女伯爵",
      rom: "Lady Grey",
      sub: "Lady Grey",
      t: 96,
      l: "3g",
      s: [180, 240, 240],
      ox: 95,
      ko: [
        "레이디 그레이",
        "얼그레이에 레몬·오렌지 껍질과 꽃을 더한 부드러운 변주.",
        "95%",
        "200ml에 3g",
        "1~2회",
        "3분. 껍질이 많아 3분을 넘기면 씁쓰레합니다.",
        "영국 트와이닝이 1990년대에 내놓은 블렌드로 전해집니다.",
        "홍차에 베르가못 오일과 시트러스 껍질, 꽃잎을 더해 착향합니다.",
        "그레이 백작 부인의 이름을 붙인 데서 출발했다는 이야기가 있습니다.",
        "베르가못보다 부드러운 시트러스, 꽃 향, 옅은 단맛.",
        "과일 타르트, 치즈케이크, 아이스티.",
        "3분. 아이스티로도 잘 어울립니다."
      ],
      en: [
        "Lady Grey",
        "Earl Grey with lemon and orange peel and flowers — a softer variation.",
        "95%",
        "3 g to 200 ml",
        "1–2 infusions",
        "3 minutes; the peel turns bitter past that.",
        "A blend said to have been launched by Twinings in the 1990s.",
        "Black tea scented with bergamot, citrus peel and petals.",
        "It is said to take its name from the Countess Grey.",
        "Softer citrus than Earl Grey, with flowers and a light sweetness.",
        "Fruit tarts, cheesecake, iced tea.",
        "3 minutes; good iced."
      ],
      "zh-CN": [
        "仕女伯爵茶",
        "在伯爵茶上再加柠檬、橙皮与花的柔和变奏。",
        "95%",
        "200毫升配3克",
        "1~2泡",
        "3分钟。果皮多，泡久了会苦。",
        "据说由英国川宁在1990年代推出。",
        "红茶加佛手柑油、柑橘皮与花瓣赋香。",
        "相传名字来自格雷伯爵夫人。",
        "比伯爵更柔和的柑橘、花香与淡甜。",
        "水果塔、芝士蛋糕、冰茶。",
        "3分钟。做冰茶也好。"
      ],
      "zh-TW": [
        "仕女伯爵茶",
        "在伯爵茶上再加檸檬、橙皮與花的柔和變奏。",
        "95%",
        "200毫升配3公克",
        "1~2泡",
        "3分鐘。果皮多，泡久了會苦。",
        "據說由英國川寧在1990年代推出。",
        "紅茶加佛手柑油、柑橘皮與花瓣賦香。",
        "相傳名字來自格雷伯爵夫人。",
        "比伯爵更柔和的柑橘、花香與淡甜。",
        "水果塔、起司蛋糕、冰茶。",
        "3分鐘。做冰茶也好。"
      ]
    },
    {
      id: "blend-englishbreakfast",
      group: "black",
      h: "晨",
      hz: "英式早餐茶",
      hs: "英式早餐茶",
      rom: "English Breakfast",
      sub: "English Breakfast",
      alias: ["잉글리시 브렉퍼스트", "잉글리쉬브렉퍼스트", "잉글리시브렉퍼스트"],
      t: 98,
      l: "4g",
      s: [180, 240, 240],
      ox: 95,
      ko: [
        "잉글리쉬 브렉퍼스트",
        "아쌈·실론·기문을 섞은 진한 아침 블렌드.",
        "95%",
        "200ml에 4g",
        "1~2회",
        "95~98도에서 3~4분.",
        "영국식 아침 차. 아쌈·실론·기문(또는 케냐)을 섞습니다.",
        "진한 홍차를 중심으로 몰트와 색을 보강하는 배합입니다.",
        "19세기 영국에서 아침 식사와 함께 마시던 진한 홍차 배합이 굳어진 것입니다.",
        "몰트·꿀·말린 과일, 우유를 잘 견딥니다.",
        "베이컨·에그, 토스트, 아침 식사.",
        "3~4분. 우유를 넣으면 5g·150ml로."
      ],
      en: [
        "English Breakfast",
        "A strong morning blend of Assam, Ceylon and Keemun.",
        "95%",
        "4 g to 200 ml",
        "1–2 infusions",
        "95–98 °C for 3–4 minutes.",
        "A British morning tea blending Assam, Ceylon and Keemun or Kenyan leaf.",
        "Built around strong black tea, with malt and colour reinforced.",
        "The strong blend drunk with breakfast in 19th-century Britain settled into this.",
        "Malt, honey and dried fruit, stands up to milk.",
        "Bacon and eggs, toast, breakfast.",
        "3–4 minutes; with milk, 5 g to 150 ml."
      ],
      "zh-CN": [
        "英式早餐茶",
        "阿萨姆、锡兰与祁门拼成的浓郁早晨茶。",
        "95%",
        "200毫升配4克",
        "1~2泡",
        "95~98度泡3~4分钟。",
        "英式早晨茶，以阿萨姆、锡兰与祁门（或肯尼亚）拼配。",
        "以浓红茶为主体，补足麦芽香与汤色。",
        "19世纪英国早餐配浓茶的喝法固定下来成为此拼配。",
        "麦芽、蜂蜜与干果，很耐牛奶。",
        "培根蛋、吐司、早餐。",
        "3~4分钟。加奶则5克配150毫升。"
      ],
      "zh-TW": [
        "英式早餐茶",
        "阿薩姆、錫蘭與祁門拼成的濃郁早晨茶。",
        "95%",
        "200毫升配4公克",
        "1~2泡",
        "95~98度泡3~4分鐘。",
        "英式早晨茶，以阿薩姆、錫蘭與祁門（或肯亞）拼配。",
        "以濃紅茶為主體，補足麥芽香與湯色。",
        "19世紀英國早餐配濃茶的喝法固定下來成為此拼配。",
        "麥芽、蜂蜜與乾果，很耐牛奶。",
        "培根蛋、吐司、早餐。",
        "3~4分鐘。加奶則5公克配150毫升。"
      ]
    },    {
      id: "blend-jasmine",
      group: "green",
      h: "茉",
      hz: "茉莉花茶",
      hs: "茉莉花茶",
      rom: "Jasmine",
      sub: "Jasmine Tea",
      alias: ["모리화차", "자스민차"],
      t: 85,
      tr: "80~90℃",
      l: "4g",
      s: [150, 180, 210],
      ox: 90,
      ko: [
        "자스민",
        "밤에 핀 자스민을 녹차에 여러 번 겹쳐 향을 옮긴 차.",
        "90% (녹차 베이스)",
        "200ml에 4g",
        "1~2회",
        "85도에서 2분 30초.",
        "푸젠·광시. 여름밤에 핀 자스민과 녹차 잎.",
        "차잎과 자스민을 층층이 쌓아 향을 옮기는 인향(窨制)을 여러 번 반복합니다.",
        "송대에 시작되어 청대에 푸젠에서 크게 발전했습니다. ‘모리화’는 자스민의 중국 이름입니다.",
        "달콤한 흰 꽃 향, 부드러운 녹차의 감칠맛.",
        "중식, 과일, 가벼운 디저트.",
        "85도에서 2분 30초. 향이 날아가지 않게 뚜껑을 덮습니다."
      ],
      en: [
        "Jasmine Tea",
        "Green tea layered again and again with jasmine picked at night.",
        "90% (green base)",
        "4 g to 200 ml",
        "1–2 infusions",
        "85 °C for 2½ minutes.",
        "Fujian and Guangxi: summer-night jasmine and green leaf.",
        "Leaf and flowers are layered so the aroma transfers, repeated many times (yinxiang).",
        "It began in the Song and grew greatly in Fujian under the Qing; molihua is the Chinese name for jasmine.",
        "Sweet white blossom over the soft umami of green tea.",
        "Chinese food, fruit, light desserts.",
        "85 °C for 2½ minutes; keep the lid on so the aroma stays."
      ],
      "zh-CN": [
        "茉莉花茶",
        "用夜里开的茉莉一层层窨进绿茶里的茶。",
        "90%（绿茶基底）",
        "200毫升配4克",
        "1~2泡",
        "85度泡2分30秒。",
        "福建、广西，夏夜开放的茉莉与绿茶鲜叶。",
        "茶叶与花层层堆叠，反复窨制，把香气移入茶中。",
        "始于宋代，清代在福建大发展。“茉莉”是它的中文名。",
        "甜润的白花香与绿茶柔和的鲜味。",
        "中餐、水果、清淡甜点。",
        "85度2分30秒。盖上盖子以免香气跑掉。"
      ],
      "zh-TW": [
        "茉莉花茶",
        "用夜裡開的茉莉一層層窨進綠茶裡的茶。",
        "90%（綠茶基底）",
        "200毫升配4公克",
        "1~2泡",
        "85度泡2分30秒。",
        "福建、廣西，夏夜開放的茉莉與綠茶鮮葉。",
        "茶葉與花層層堆疊，反覆窨製，把香氣移入茶中。",
        "始於宋代，清代在福建大發展。「茉莉」是它的中文名。",
        "甜潤的白花香與綠茶柔和的鮮味。",
        "中餐、水果、清淡甜點。",
        "85度2分30秒。蓋上蓋子以免香氣跑掉。"
      ]
    },
    {
      id: "blend-hongkong",
      group: "black",
      alias: ["홍콩식 밀크티"],
      h: "港",
      hz: "港式奶茶",
      hs: "港式奶茶",
      rom: "Hong Kong Milk Tea",
      sub: "Hong Kong Milk Tea",
      t: 98,
      l: "8g",
      w: "200ml",
      s: [300, 300, 300],
      m: 1,
      ox: 95,
      ko: [
        "홍콩 블렌딩",
        "진하게 우린 홍차에 무가당 연유를 더한 홍콩 차찬텡의 잔.",
        "95%",
        "200ml에 8g, 연유는 취향껏",
        "1회",
        "98도에서 5분 진하게. 얼음과 연유에 향이 지지 않게.",
        "홍콩 차찬텡. 스리랑카·아쌈 블렌드를 진하게 우립니다.",
        "여러 홍차를 섞어 진하게 우리고 무가당 연유(淡奶)를 더합니다.",
        "영국의 밀크티가 홍콩 차찬텡에서 연유와 진한 농도로 자리 잡았습니다.",
        "진한 몰트와 연유의 둥근 단맛, 두꺼운 질감.",
        "파인애플 번, 토스트, 달걀 타르트.",
        "5분 진하게. 연유는 마지막에 넣고 저어 마십니다."
      ],
      en: [
        "Hong Kong Milk Tea",
        "Strong black tea with evaporated milk — the cup of a Hong Kong cha chaan teng.",
        "95%",
        "8 g to 200 ml; milk to taste",
        "One brew",
        "98 °C for 5 minutes, strong, so ice and milk don't flatten it.",
        "Hong Kong tea restaurants, using a strong Ceylon and Assam blend.",
        "Several black teas are blended and brewed strong, then evaporated milk is added.",
        "British milk tea settled in Hong Kong as a strong cup with evaporated milk.",
        "Strong malt and the round sweetness of milk, with a thick texture.",
        "Pineapple bun, toast, egg tart.",
        "Five minutes, strong. Add the milk last and stir."
      ],
      "zh-CN": [
        "港式奶茶",
        "浓泡红茶加淡奶——香港茶餐厅的一杯。",
        "95%",
        "200毫升配8克，淡奶按口味",
        "1次",
        "98度泡5分钟至浓，免得冰和奶把香气冲淡。",
        "香港茶餐厅，用锡兰与阿萨姆拼配浓泡。",
        "几种红茶拼配浓泡，最后加淡奶。",
        "英式奶茶在香港茶餐厅演变成浓泡加淡奶的喝法。",
        "浓麦芽与淡奶的圆润甜，质地厚。",
        "菠萝包、吐司、蛋挞。",
        "5分钟泡浓。淡奶最后加再搅匀。"
      ],
      "zh-TW": [
        "港式奶茶",
        "濃泡紅茶加淡奶——香港茶餐廳的一杯。",
        "95%",
        "200毫升配8公克，淡奶按口味",
        "1次",
        "98度泡5分鐘至濃，免得冰和奶把香氣沖淡。",
        "香港茶餐廳，用錫蘭與阿薩姆拼配濃泡。",
        "幾種紅茶拼配濃泡，最後加淡奶。",
        "英式奶茶在香港茶餐廳演變成濃泡加淡奶的喝法。",
        "濃麥芽與淡奶的圓潤甜，質地厚。",
        "菠蘿包、吐司、蛋撻。",
        "5分鐘泡濃。淡奶最後加再攪勻。"
      ]
    },
    /* ── 허브 · 한국 전통차 ── */
    {
      id: "fruit-daechu",
      group: "traditional",
      h: "棗",
      hz: "紅棗茶",
      hs: "红枣茶",
      rom: "Daechu-cha",
      sub: "Date Tea",
      t: 95,
      tr: "90~100℃",
      l: "5g",
      w: "200ml",
      s: [300, 360],
      m: 2,
      ox: 0,
      ko: [
        "대추차",
        "말린 대추를 졸여 만든 달콤한 차 — 겨울의 따뜻한 한 잔.",
        "무산화 · 카페인 없음",
        "대추 5~6개 또는 청 2큰술에 200ml",
        "1회 (청은 물만 더해 여러 번)",
        "95도에서 5분. 청이라면 뜨거운 물에 타서.",
        "한국 전역. 경북 경산·보은 대추가 유명합니다.",
        "대추의 단맛과 살작 탄 향, 부드러운 바디.",
        "한과, 밤, 겨울 간식.",
        "대추를 반으로 갈라 우려야 단맛이 빨리 납니다."
      ],
      en: [
        "Date Tea",
        "Dried jujubes simmered sweet — a warm winter cup.",
        "None · caffeine-free",
        "5–6 dates or 2 spoons of cheong to 200 ml",
        "One brew (cheong can be topped up)",
        "95 °C for 5 minutes; with cheong, simply dissolve in hot water.",
        "Across Korea, with Gyeongsan and Boeun dates the best known.",
        "Date sweetness with a light scorched note and a soft body.",
        "Korean sweets, chestnuts, winter snacks.",
        "Split the dates so the sweetness comes out faster."
      ],
      "zh-CN": [
        "红枣茶",
        "把干红枣熬成的甜茶——冬天的暖杯。",
        "不发酵 · 无咖啡因",
        "红枣5~6颗或蜜渍2勺配200毫升",
        "1次（蜜渍可续水多次）",
        "95度泡5分钟；蜜渍直接用热水冲开。",
        "韩国各地，庆山与报恩的红枣最有名。",
        "红枣的甜与微微的焙香，汤体柔和。",
        "韩式点心、栗子、冬季零食。",
        "红枣剖开再泡，甜味出得快。"
      ],
      "zh-TW": [
        "紅棗茶",
        "把乾紅棗熬成的甜茶——冬天的暖杯。",
        "不發酵 · 無咖啡因",
        "紅棗5~6顆或蜜漬2勺配200毫升",
        "1次（蜜漬可續水多次）",
        "95度泡5分鐘；蜜漬直接用熱水沖開。",
        "韓國各地，慶山與報恩的紅棗最有名。",
        "紅棗的甜與微微的焙香，湯體柔和。",
        "韓式點心、栗子、冬季零食。",
        "紅棗剖開再泡，甜味出得快。"
      ]
    },
    {
      id: "herb-ginger",
      group: "traditional",
      h: "薑",
      hz: "生薑茶",
      hs: "生姜茶",
      rom: "Saenggang-cha",
      sub: "Ginger Tea",
      ox: 0,
      ko: [
        "생강차",
        "생강을 꿀에 절여 만든, 몸을 데우는 차.",
        "무산화 · 카페인 없음",
        "청 2큰술에 200ml",
        "1회",
        "95도 물에 타서. 생강을 직접 씨다면 5분 우립니다.",
        "한국·중국. 생강 뿌리를 얇게 씨서 꿀에 절입니다.",
        "알싸한 매운맛과 꿀의 단맛.",
        "감기 기운이 있을 때, 식후.",
        "너무 오래 끓이면 매운맛만 남습니다."
      ],
      en: [
        "Ginger Tea",
        "Ginger preserved in honey — a cup that warms you through.",
        "None · caffeine-free",
        "2 spoons of cheong to 200 ml",
        "One brew",
        "Stir into 95 °C water; sliced fresh ginger needs 5 minutes.",
        "Korea and China; thin slices of root preserved in honey.",
        "A clean peppery heat with honey sweetness.",
        "When a cold is coming, or after a meal.",
        "Boil it too long and only the heat is left."
      ],
      "zh-CN": [
        "生姜茶",
        "生姜用蜂蜜腌成的暖身茶。",
        "不发酵 · 无咖啡因",
        "蜜渍2勺配200毫升",
        "1次",
        "用95度水冲开；现切生姜则泡5分钟。",
        "韩国与中国，姜切薄片用蜜腌。",
        "清爽的辛香与蜂蜜的甜。",
        "快感冒时，或饭后。",
        "煮太久只剩辣味。"
      ],
      "zh-TW": [
        "生薑茶",
        "生薑用蜂蜜醃成的暖身茶。",
        "不發酵 · 無咖啡因",
        "蜜漬2勺配200毫升",
        "1次",
        "用95度水沖開；現切生薑則泡5分鐘。",
        "韓國與中國，薑切薄片用蜜醃。",
        "清爽的辛香與蜂蜜的甜。",
        "快感冒時，或飯後。",
        "煮太久只剩辣味。"
      ]
    },
    {
      id: "fruit-yuja",
      group: "traditional",
      h: "柚",
      hz: "柚子茶",
      hs: "柚子茶",
      rom: "Yuja-cha",
      sub: "Citron Tea",
      t: 80,
      tr: "80℃",
      l: "청 2큰술",
      w: "200ml",
      s: [300],
      m: 1,
      ox: 0,
      ko: [
        "유자차",
        "유자를 꿀에 절여 만든 향긋한 겨울 차.",
        "무산화 · 카페인 없음",
        "청 2큰술에 200ml",
        "1회",
        "80도 물에 타야 향이 살아 있습니다.",
        "전남 고흥·완도. 11~12월 유자를 껍질째 절입니다.",
        "감귤 껍질의 향과 산뜻한 산미.",
        "과일, 디저트, 목이 아플 때.",
        "끓는 물보다 80도가 향을 살립니다."
      ],
      en: [
        "Citron Tea",
        "Citron preserved in honey — a fragrant winter cup.",
        "None · caffeine-free",
        "2 spoons of cheong to 200 ml",
        "One brew",
        "80 °C keeps the aroma; boiling water flattens it.",
        "Goheung and Wando in Jeollanam-do; November–December citron preserved peel and all.",
        "Citrus peel aroma with a clean acidity.",
        "Fruit, desserts, a sore throat.",
        "80 °C rather than boiling keeps the fragrance."
      ],
      "zh-CN": [
        "柚子茶",
        "柚子用蜂蜜腌成的香甜蜜茶。",
        "不发酵 · 无咖啡因",
        "蜜渍2勺配200毫升",
        "1次",
        "用80度水冲，香气才在。",
        "全南高兴、莞岛，11~12月连皮腌制。",
        "柑橘皮的香与清爽的酸。",
        "水果、甜点、嗓子不舒服时。",
        "80度比沸水更能留住香气。"
      ],
      "zh-TW": [
        "柚子茶",
        "柚子用蜂蜜醃成的香甜蜜茶。",
        "不發酵 · 無咖啡因",
        "蜜漬2勺配200毫升",
        "1次",
        "用80度水沖，香氣才在。",
        "全南高興、莞島，11~12月連皮醃製。",
        "柑橘皮的香與清爽的酸。",
        "水果、甜點、嗓子不舒服時。",
        "80度比沸水更能留住香氣。"
      ]
    },
    {
      id: "fruit-omija",
      group: "traditional",
      h: "五",
      hz: "五味子茶",
      hs: "五味子茶",
      rom: "Omija-cha",
      sub: "Schisandra Tea",
      t: 80,
      tr: "찬물~80℃",
      l: "청 2큰술",
      w: "200ml",
      s: [300],
      m: 1,
      ox: 0,
      ko: [
        "오미자차",
        "다섯 가지 맛이 난다는 붉은 열매차 — 여름의 차.",
        "무산화 · 카페인 없음",
        "청 2큰술에 200ml, 냉수도 좋습니다",
        "1회",
        "찬물에 타면 산뜻하고, 뜨거운 물에는 향이 날아갑니다.",
        "경북 문경·강원 정선. 9월 붉게 익은 오미자를 절입니다.",
        "신맛·단맛·쓴맛·짠맛·매운맛이 겹칩니다.",
        "여름 화채, 한과.",
        "찬물이나 얼음물에 타야 신맛이 살아 있습니다."
      ],
      en: [
        "Schisandra Tea",
        "A red berry said to hold five flavours — a summer cup.",
        "None · caffeine-free",
        "2 spoons of cheong to 200 ml; cold water works too",
        "One brew",
        "Cold water keeps it bright; hot water drives the aroma off.",
        "Mungyeong in North Gyeongsang and Jeongseon in Gangwon; berries preserved after ripening in September.",
        "Sour, sweet, bitter, salty and pungent at once.",
        "Summer fruit punch, Korean sweets.",
        "Mix with cold or iced water so the sourness stays."
      ],
      "zh-CN": [
        "五味子茶",
        "据说有五种味道的红色果实茶——夏天的茶。",
        "不发酵 · 无咖啡因",
        "蜜渍2勺配200毫升，冷水也可",
        "1次",
        "冷水冲更清爽，热水会把香气赶走。",
        "庆北闻庆、江原旌善，9月红熟的果实腌制。",
        "酸、甜、苦、咸、辛层层叠叠。",
        "夏日花菜、韩式点心。",
        "用冷水或冰水冲，酸味才在。"
      ],
      "zh-TW": [
        "五味子茶",
        "據說有五種味道的紅色果實茶——夏天的茶。",
        "不發酵 · 無咖啡因",
        "蜜漬2勺配200毫升，冷水也可",
        "1次",
        "冷水沖更清爽，熱水會把香氣趕走。",
        "慶北聞慶、江原旌善，9月紅熟的果實醃製。",
        "酸、甜、苦、鹹、辛層層疊疊。",
        "夏日花菜、韓式點心。",
        "用冷水或冰水沖，酸味才在。"
      ]
    },
    {
      id: "herb-ssanghwa",
      group: "traditional",
      h: "雙",
      hz: "雙和茶",
      hs: "双和茶",
      rom: "Ssanghwa-cha",
      sub: "Ssanghwa Tea",
      ox: 0,
      ko: [
        "쌍화차",
        "백작약·숙지황·황기·당귀·천궁 등 아홉 가지 약재를 달인 한방차 — 피로에 한 잔.",
        "무산화 · 카페인 없음",
        "한 팩(200ml)을 그대로",
        "1회",
        "달인 액을 데워 마십니다. 계란노른자를 풀어 넣기도 합니다.",
        "한국 전통 한방차. 백작약·숙지황·황기·당귀·천궁·계피·감초에 생강·대추를 더합니다.",
        "약재의 쓴맛과 단맛, 깊고 묵직합니다.",
        "피로할 때, 겨울, 식후.",
        "데워 마시고 꿀이나 대추청을 더하면 부드러워집니다."
      ],
      en: [
        "Ssanghwa Tea",
        "Nine medicinal herbs decocted — a cup for weariness.",
        "None · caffeine-free",
        "One 200 ml pack, as is",
        "One brew",
        "Warm the decoction; some stir in an egg yolk.",
        "A traditional Korean herbal tea of peony, rehmannia, astragalus, angelica, cnidium, cinnamon and licorice, with ginger and dates.",
        "Bitter and sweet herbs, deep and heavy.",
        "When tired, in winter, after meals.",
        "Warm it and add honey or date syrup to soften."
      ],
      "zh-CN": [
        "双和茶",
        "白芍、熟地、黄芪、当归、川芎等九味药材熬成的韩方茶——疲累时的一杯。",
        "不发酵 · 无咖啡因",
        "一包（200毫升）直接喝",
        "1次",
        "把熬好的药汤温热喝，也有人打一个蛋黄进去。",
        "韩国传统韩方茶，白芍、熟地、黄芪、当归、川芎、桂皮、甘草与生姜、红枣同煎。",
        "药材的苦与甜，深沉厚重。",
        "疲劳时、冬天、饭后。",
        "温热后加蜂蜜或红枣蜜会更柔。"
      ],
      "zh-TW": [
        "雙和茶",
        "白芍、熟地、黃芪、當歸、川芎等九味藥材熬成的韓方茶——疲累時的一杯。",
        "不發酵 · 無咖啡因",
        "一包（200毫升）直接喝",
        "1次",
        "把熬好的藥湯溫熱喝，也有人打一個蛋黃進去。",
        "韓國傳統韓方茶，白芍、熟地、黃芪、當歸、川芎、桂皮、甘草與生薑、紅棗同煎。",
        "藥材的苦與甜，深沉厚重。",
        "疲勞時、冬天、飯後。",
        "溫熱後加蜂蜜或紅棗蜜會更柔。"
      ]
    },
    {
      id: "herb-dunggulle",
      group: "traditional",
      h: "玉",
      hz: "玉竹茶",
      hs: "玉竹茶",
      rom: "Dunggulle-cha",
      sub: "Solomon's Seal Tea",
      ox: 0,
      ko: [
        "둥굴레차",
        "둥굴레 뿌리를 볶아 만든 구수한 차 — 커피 대신.",
        "무산화 · 카페인 없음",
        "200ml에 3g",
        "2회",
        "95도에서 5분. 끓이면 더 구수합니다.",
        "한국 산지의 둥굴레 뿌리. 가을에 캐 말려 볶습니다.",
        "볶은 곡물 같은 고소함과 옅은 단맛.",
        "식후, 밤, 디저트.",
        "볶은 뿌리는 5분 이상 우려야 맛이 납니다."
      ],
      en: [
        "Solomon's Seal Tea",
        "Roasted Solomon's seal root — the nutty cup in place of coffee.",
        "None · caffeine-free",
        "3 g to 200 ml",
        "2 infusions",
        "95 °C for 5 minutes; simmering makes it nuttier.",
        "Korean hillsides; the root is dug in autumn, dried and roasted.",
        "Roasted grain sweetness with a light finish.",
        "After meals, at night, with dessert.",
        "Roasted root needs five minutes or more."
      ],
      "zh-CN": [
        "玉竹茶",
        "把玉竹根烘炒成的焙香茶——代替咖啡。",
        "不发酵 · 无咖啡因",
        "200毫升配3克",
        "2泡",
        "95度泡5分钟，煮则更香。",
        "韩国山地，秋天挖根晒干后烘炒。",
        "焙谷般的香与淡甜。",
        "饭后、夜里、配甜点。",
        "炒过的根要泡5分钟以上才出味。"
      ],
      "zh-TW": [
        "玉竹茶",
        "把玉竹根烘炒成的焙香茶——代替咖啡。",
        "不發酵 · 無咖啡因",
        "200毫升配3公克",
        "2泡",
        "95度泡5分鐘，煮則更香。",
        "韓國山地，秋天挖根晒乾後烘炒。",
        "焙穀般的香與淡甜。",
        "飯後、夜裡、配甜點。",
        "炒過的根要泡5分鐘以上才出味。"
      ]
    },
    {
      id: "herb-buckwheat",
      group: "everyday",
      h: "蕎",
      hz: "蕎麥茶",
      hs: "荞麦茶",
      rom: "Memil-cha",
      sub: "Buckwheat Tea",
      ox: 0,
      ko: [
        "메밀차",
        "메밀을 볶아 우린 고소한 차 — 단맛이 오래 남습니다.",
        "무산화 · 카페인 없음",
        "200ml에 3g",
        "2회",
        "95도에서 5분.",
        "한국·일본. 메밀알을 볶아 우립니다.",
        "볶은 곡물의 고소함과 메밀 특유의 옅은 쓴맛.",
        "식후, 밤, 메밀 부침개.",
        "볶은 메밀은 뜨거운 물에 5분이면 충분합니다."
      ],
      en: [
        "Buckwheat Tea",
        "Roasted buckwheat with a long sweetness.",
        "None · caffeine-free",
        "3 g to 200 ml",
        "2 infusions",
        "95 °C for 5 minutes.",
        "Korea and Japan; the groats are roasted before steeping.",
        "Roasted grain with buckwheat's faint bitterness.",
        "After meals, at night, with buckwheat pancakes.",
        "Roasted buckwheat is done in five minutes."
      ],
      "zh-CN": [
        "荞麦茶",
        "炒过的荞麦泡出的焙香茶，甜味留得久。",
        "不发酵 · 无咖啡因",
        "200毫升配3克",
        "2泡",
        "95度泡5分钟。",
        "韩国与日本，荞麦粒炒过再泡。",
        "焙谷的香与荞麦特有的淡苦。",
        "饭后、夜里、配荞麦煎饼。",
        "炒过的荞麦5分钟就够。"
      ],
      "zh-TW": [
        "蕎麥茶",
        "炒過的蕎麥泡出的焙香茶，甜味留得久。",
        "不發酵 · 無咖啡因",
        "200毫升配3公克",
        "2泡",
        "95度泡5分鐘。",
        "韓國與日本，蕎麥粒炒過再泡。",
        "焙穀的香與蕎麥特有的淡苦。",
        "飯後、夜裡、配蕎麥煎餅。",
        "炒過的蕎麥5分鐘就夠。"
      ]
    },
    {
      id: "herb-barley",
      group: "everyday",
      h: "麥",
      hz: "麥茶",
      hs: "麦茶",
      rom: "Bori-cha",
      sub: "Barley Tea",
      ox: 0,
      ko: [
        "보리차",
        "볶은 보리를 끓인, 물처럼 마시는 한국의 차.",
        "무산화 · 카페인 없음",
        "1L에 볶은 보리 20g",
        "1회 (끓여 계속 마심)",
        "끓는 물에 10분.",
        "한국 전역. 겉보리를 볶아 씁니다.",
        "구수한 볶은 곡물 향, 깔끔한 뒷맛.",
        "모든 식사, 매운 음식.",
        "끓인 뒤 식혀 두고 하루 동안 마십니다."
      ],
      en: [
        "Barley Tea",
        "Boiled roasted barley — the tea Koreans drink like water.",
        "None · caffeine-free",
        "20 g roasted barley to 1 L",
        "One boil, drunk through the day",
        "Simmer 10 minutes in boiling water.",
        "Across Korea, using roasted unhulled barley.",
        "Toasted grain with a clean finish.",
        "Every meal, spicy food.",
        "Boil, cool, and drink it through the day."
      ],
      "zh-CN": [
        "麦茶",
        "煮炒过的大麦，韩国人当水喝的茶。",
        "不发酵 · 无咖啡因",
        "1升水配炒大麦20克",
        "1次（煮后整天喝）",
        "沸水煮10分钟。",
        "韩国各地，用炒过的大麦。",
        "焙谷香，余味干净。",
        "所有餐食、辛辣料理。",
        "煮好放凉，一整天慢慢喝。"
      ],
      "zh-TW": [
        "麥茶",
        "煮炒過的大麥，韓國人當水喝的茶。",
        "不發酵 · 無咖啡因",
        "1升水配炒大麥20公克",
        "1次（煮後整天喝）",
        "沸水煮10分鐘。",
        "韓國各地，用炒過的大麥。",
        "焙穀香，餘味乾淨。",
        "所有餐食、辛辣料理。",
        "煮好放涼，一整天慢慢喝。"
      ]
    },
    {
      id: "herb-brownrice",
      group: "everyday",
      h: "米",
      hz: "玄米茶",
      hs: "玄米茶",
      rom: "Hyeonmi-cha",
      sub: "Brown Rice Tea",
      ox: 0,
      ko: [
        "현미차",
        "볶은 현미를 끓인 구수한 차 — 밥을 차로.",
        "무산화 · 카페인 없음",
        "1L에 볶은 현미 20g",
        "1회",
        "끓는 물에 10분.",
        "한국·일본. 겉겨를 남긴 현미를 볶습니다.",
        "누룽지 향, 옅은 단맛.",
        "식사, 식후.",
        "오래 끓일수록 진해집니다."
      ],
      en: [
        "Brown Rice Tea",
        "Boiled roasted brown rice — rice turned into tea.",
        "None · caffeine-free",
        "20 g roasted rice to 1 L",
        "One brew",
        "Simmer 10 minutes.",
        "Korea and Japan; brown rice with the bran left on is roasted.",
        "Scorched-rice aroma with a light sweetness.",
        "With meals, after meals.",
        "The longer it simmers, the deeper it gets."
      ],
      "zh-CN": [
        "玄米茶",
        "煮炒过的糙米——把饭变成茶。",
        "不发酵 · 无咖啡因",
        "1升水配炒玄米20克",
        "1次",
        "煮10分钟。",
        "韩国与日本，用带麸皮的糙米炒制。",
        "锅巴香与淡甜。",
        "配餐、饭后。",
        "煮得越久越浓。"
      ],
      "zh-TW": [
        "玄米茶",
        "煮炒過的糙米——把飯變成茶。",
        "不發酵 · 無咖啡因",
        "1升水配炒玄米20公克",
        "1次",
        "煮10分鐘。",
        "韓國與日本，用帶麩皮的糙米炒製。",
        "鍋巴香與淡甜。",
        "配餐、飯後。",
        "煮得越久越濃。"
      ]
    },
    {
      id: "herb-persimmon",
      group: "traditional",
      h: "柿",
      hz: "柿葉茶",
      hs: "柿叶茶",
      rom: "Gamip-cha",
      sub: "Persimmon Leaf Tea",
      ox: 0,
      ko: [
        "감잎차",
        "감나무 잎을 말려 만든 차 — 비타민 C가 많은 잎차.",
        "무산화 · 카페인 없음",
        "200ml에 3g",
        "2회",
        "90도에서 3분.",
        "한국 전역. 6~7월 감잎을 따 찌거나 말려 씁니다.",
        "옅은 풀 향과 단맛, 떫음이 적습니다.",
        "식후, 간식.",
        "잎을 찌면 떫음이 줄고 보관이 쉬워집니다."
      ],
      en: [
        "Persimmon Leaf Tea",
        "Dried persimmon leaf, rich in vitamin C.",
        "None · caffeine-free",
        "3 g to 200 ml",
        "2 infusions",
        "90 °C for 3 minutes.",
        "Across Korea; leaves picked in June and July, steamed or dried.",
        "Light grass and sweetness, little astringency.",
        "After meals, with snacks.",
        "Steaming the leaf cuts the astringency and keeps better."
      ],
      "zh-CN": [
        "柿叶茶",
        "用柿树叶制成的茶——维生素C丰富的叶茶。",
        "不发酵 · 无咖啡因",
        "200毫升配3克",
        "2泡",
        "90度泡3分钟。",
        "韩国各地，6~7月采叶蒸或晒干。",
        "淡青草香与甜，涩味少。",
        "饭后、配点心。",
        "叶子蒸过涩感更少，也好保存。"
      ],
      "zh-TW": [
        "柿葉茶",
        "用柿樹葉製成的茶——維生素C豐富的葉茶。",
        "不發酵 · 無咖啡因",
        "200毫升配3公克",
        "2泡",
        "90度泡3分鐘。",
        "韓國各地，6~7月採葉蒸或晒乾。",
        "淡青草香與甜，澀味少。",
        "飯後、配點心。",
        "葉子蒸過澀感更少，也好保存。"
      ]
    },
    {
      id: "herb-mulberry",
      group: "traditional",
      h: "桑",
      hz: "桑葉茶",
      hs: "桑叶茶",
      rom: "Ppongip-cha",
      sub: "Mulberry Leaf Tea",
      ox: 0,
      ko: [
        "뽕잎차",
        "뽕나무 잎을 말려 볶은 차 — 부드러운 단맛.",
        "무산화 · 카페인 없음",
        "200ml에 3g",
        "2회",
        "95도에서 5분.",
        "한국·중국. 늦봄~여름 뽕잎을 말려 볶아 씁니다.",
        "볶은 잎의 고소함과 옅은 단맛.",
        "식후에 가볍게.",
        "볶은 잎은 5분 우려야 맛이 납니다."
      ],
      en: [
        "Mulberry Leaf Tea",
        "Dried and roasted mulberry leaf with a soft sweetness.",
        "None · caffeine-free",
        "3 g to 200 ml",
        "2 infusions",
        "95 °C for 5 minutes.",
        "Korea and China; late-spring and summer leaves dried and roasted.",
        "Roasted leaf with a light sweetness.",
        "Lightly, after meals.",
        "Roasted leaf needs five minutes."
      ],
      "zh-CN": [
        "桑叶茶",
        "桑叶晒干再炒，带柔和甜味。",
        "不发酵 · 无咖啡因",
        "200毫升配3克",
        "2泡",
        "95度泡5分钟。",
        "韩国与中国，晚春至夏天的桑叶晒干后炒制。",
        "炒叶的焙香与淡甜。",
        "饭后轻轻一杯。",
        "炒过的叶要泡5分钟。"
      ],
      "zh-TW": [
        "桑葉茶",
        "桑葉晒乾再炒，帶柔和甜味。",
        "不發酵 · 無咖啡因",
        "200毫升配3公克",
        "2泡",
        "95度泡5分鐘。",
        "韓國與中國，晚春至夏天的桑葉晒乾後炒製。",
        "炒葉的焙香與淡甜。",
        "飯後輕輕一杯。",
        "炒過的葉要泡5分鐘。"
      ]
    },
    {
      id: "herb-lotus",
      group: "traditional",
      h: "荷",
      hz: "荷葉茶",
      hs: "荷叶茶",
      rom: "Yeonip-cha",
      sub: "Lotus Leaf Tea",
      ox: 0,
      ko: [
        "연잎차",
        "연잎을 말려 우린 향긋한 차 — 여름의 차.",
        "무산화 · 카페인 없음",
        "200ml에 2g",
        "2회",
        "90도에서 3분. 오래 우리면 씁니다.",
        "한국·중국 연못. 여름 연잎을 말려 씁니다.",
        "풀 향과 옅은 쓴맛, 청량합니다.",
        "기름진 식사 뒤, 여름.",
        "2g이면 충분합니다. 많으면 씁니다."
      ],
      en: [
        "Lotus Leaf Tea",
        "Dried lotus leaf — a green summer cup.",
        "None · caffeine-free",
        "2 g to 200 ml",
        "2 infusions",
        "90 °C for 3 minutes; longer turns it bitter.",
        "Korean and Chinese ponds; summer leaves dried.",
        "Green and faintly bitter, cooling.",
        "After rich meals, in summer.",
        "Two grams is enough; more is bitter."
      ],
      "zh-CN": [
        "荷叶茶",
        "晒干的荷叶——夏天的一杯清茶。",
        "不发酵 · 无咖啡因",
        "200毫升配2克",
        "2泡",
        "90度泡3分钟，久了会苦。",
        "韩国与中国的荷塘，夏天采叶晒干。",
        "青草香与微苦，清凉。",
        "油腻餐后、夏天。",
        "2克就够，多了会苦。"
      ],
      "zh-TW": [
        "荷葉茶",
        "晒乾的荷葉——夏天的一杯清茶。",
        "不發酵 · 無咖啡因",
        "200毫升配2公克",
        "2泡",
        "90度泡3分鐘，久了會苦。",
        "韓國與中國的荷塘，夏天採葉晒乾。",
        "青草香與微苦，清涼。",
        "油膩餐後、夏天。",
        "2公克就夠，多了會苦。"
      ]
    },
    {
      id: "herb-balloonflower",
      group: "traditional",
      h: "梗",
      hz: "桔梗茶",
      hs: "桔梗茶",
      rom: "Doraji-cha",
      sub: "Balloon Flower Root Tea",
      ox: 0,
      ko: [
        "도라지차",
        "도라지 뿌리를 말려 달인 차 — 전통적으로 목이 칼칼할 때 찾던 뿌리차.",
        "무산화 · 카페인 없음",
        "200ml에 5g",
        "2회",
        "95도에서 10분, 끓이면 더 진합니다.",
        "한국 산지. 가을 도라지 뿌리를 말려 씁니다.",
        "옅은 쓴맛과 단맛, 뿌리 특유의 향.",
        "목이 아플 때, 겨울.",
        "말린 뿌리는 끓여야 맛이 납니다."
      ],
      en: [
        "Balloon Flower Root Tea",
        "Dried balloon-flower root, decocted — a root tea traditionally sought when the throat feels rough.",
        "None · caffeine-free",
        "5 g to 200 ml",
        "2 infusions",
        "95 °C for 10 minutes; simmering goes deeper.",
        "Korean hills; autumn roots dried.",
        "A light bitterness and sweetness, with the aroma of the root.",
        "A sore throat, winter.",
        "Dried root needs simmering."
      ],
      "zh-CN": [
        "桔梗茶",
        "桔梗根晒干熬煮——传统上嗓子不适时喝的根茶。",
        "不发酵 · 无咖啡因",
        "200毫升配5克",
        "2泡",
        "95度泡10分钟，煮更浓。",
        "韩国山地，秋天挖根晒干。",
        "微苦与甜，带根特有的香。",
        "嗓子疼时、冬天。",
        "干根要煮才出味。"
      ],
      "zh-TW": [
        "桔梗茶",
        "桔梗根晒乾熬煮——傳統上嗓子不適時喝的根茶。",
        "不發酵 · 無咖啡因",
        "200毫升配5公克",
        "2泡",
        "95度泡10分鐘，煮更濃。",
        "韓國山地，秋天挖根晒乾。",
        "微苦與甜，帶根特有的香。",
        "嗓子疼時、冬天。",
        "乾根要煮才出味。"
      ]
    },
    {
      id: "herb-mugwort",
      group: "traditional",
      h: "艾",
      hz: "艾草茶",
      hs: "艾草茶",
      rom: "Ssuk-cha",
      sub: "Mugwort Tea",
      ox: 0,
      ko: [
        "쑥차",
        "봄 쑥을 말려 우린 향긋한 차 — 봄의 차.",
        "무산화 · 카페인 없음",
        "200ml에 2g",
        "2회",
        "90도에서 3분.",
        "한국 전역. 3~4월 어린 쑥을 말려 씁니다.",
        "풀 향과 옅은 쓴맛, 따뜻하게 마시는 봄의 차.",
        "봄, 식후.",
        "말린 쑥은 2g이면 충분합니다."
      ],
      en: [
        "Mugwort Tea",
        "Spring mugwort dried — the cup of early spring.",
        "None · caffeine-free",
        "2 g to 200 ml",
        "2 infusions",
        "90 °C for 3 minutes.",
        "Across Korea; young leaves of March and April dried.",
        "Green and faintly bitter; a spring tea drunk warm.",
        "Spring, after meals.",
        "Two grams of dried mugwort is plenty."
      ],
      "zh-CN": [
        "艾草茶",
        "春天艾草晒干——初春的一杯。",
        "不发酵 · 无咖啡因",
        "200毫升配2克",
        "2泡",
        "90度泡3分钟。",
        "韩国各地，3~4月的嫩艾晒干。",
        "青草香与微苦，温热着喝的春茶。",
        "春天、饭后。",
        "干艾2克就够。"
      ],
      "zh-TW": [
        "艾草茶",
        "春天艾草晒乾——初春的一杯。",
        "不發酵 · 無咖啡因",
        "200毫升配2公克",
        "2泡",
        "90度泡3分鐘。",
        "韓國各地，3~4月的嫩艾晒乾。",
        "青草香與微苦，溫熱著喝的春茶。",
        "春天、飯後。",
        "乾艾2公克就夠。"
      ]
    },
    {
      id: "herb-tteokcha",
      group: "traditional",
      h: "餅",
      hz: "餅茶",
      hs: "饼茶",
      rom: "Tteokcha",
      sub: "Korean Pressed Tea",
      alias: ["전통 병차"],
      t: 100,
      l: "5g",
      w: "300ml",
      s: [180, 240, 300],
      ox: 0,
      ko: [
        "떡차",
        "찐 잎을 눌러 만든 전통 병차 — 오래 두고 마십니다.",
        "약한 후발효",
        "한 조각(5g)에 300ml",
        "3회 이상",
        "100도에서 3분, 끓이면 10분.",
        "한국 전남·경남. 찐 잎을 절구에 짜아 판에 눌러 말립니다.",
        "약재·대추·흙, 부드럽고 따뜻합니다.",
        "식후, 겨울, 기름진 음식.",
        "조각을 부숴 끓이면 깊은 맛이 납니다."
      ],
      en: [
        "Tteokcha",
        "Steamed leaf pressed into cakes — a tea kept for years.",
        "Mild post-fermentation",
        "One piece (5 g) to 300 ml",
        "3 or more infusions",
        "100 °C for 3 minutes, or 10 simmered.",
        "Jeolla and Gyeongsang in Korea; steamed leaf pounded and pressed in a mould to dry.",
        "Herbs, dates and earth, soft and warming.",
        "After meals, winter, rich food.",
        "Break off a piece and simmer it for depth."
      ],
      "zh-CN": [
        "饼茶",
        "蒸叶压成的茶饼——可存放多年。",
        "轻微后发酵",
        "一片（5克）配300毫升",
        "3泡以上",
        "100度泡3分钟，煮则10分钟。",
        "韩国全南、庆南，蒸叶捣碎压模晒干。",
        "药材、红枣与泥土，柔和温暖。",
        "饭后、冬天、油腻食物。",
        "掰下一块煮，味道更深。"
      ],
      "zh-TW": [
        "餅茶",
        "蒸葉壓成的茶餅——可存放多年。",
        "輕微後發酵",
        "一片（5公克）配300毫升",
        "3泡以上",
        "100度泡3分鐘，煮則10分鐘。",
        "韓國全南、慶南，蒸葉搗碎壓模晒乾。",
        "藥材、紅棗與泥土，柔和溫暖。",
        "飯後、冬天、油膩食物。",
        "掰下一塊煮，味道更深。"
      ]
    },
    {
      id: "herb-chamomile",
      group: "everyday",
      h: "菊",
      hz: "洋甘菊",
      hs: "洋甘菊",
      rom: "Chamomile",
      sub: "Chamomile",
      ox: 0,
      ko: [
        "캐모마일",
        "사과와 꿀 향의 꽃차 — 잠들기 전 한 잔.",
        "무산화 · 카페인 없음",
        "200ml에 2g (꽃 1작은술)",
        "1~2회",
        "95도에서 5분, 뚜껑을 덮어.",
        "이집트·독일 등. 캐모마일 꽃을 말려 씁니다.",
        "사과·꿀·건초, 부드럽고 약간 달콤합니다.",
        "밤, 디저트, 꿀 한 스푼.",
        "끓는 물에 5분, 뚜껑을 덮어 향을 잡습니다."
      ],
      en: [
        "Chamomile",
        "Apple and honey in a flower — a cup before sleep.",
        "None · caffeine-free",
        "2 g (a teaspoon of flowers) to 200 ml",
        "1–2 infusions",
        "95 °C for 5 minutes with the lid on.",
        "Egypt, Germany and elsewhere; the flowers are dried.",
        "Apple, honey and hay, soft and faintly sweet.",
        "Night, desserts, a spoon of honey.",
        "Five minutes in boiling water, lid on to keep the aroma."
      ],
      "zh-CN": [
        "洋甘菊",
        "苹果与蜂蜜香的花茶——睡前一杯。",
        "不发酵 · 无咖啡因",
        "200毫升配2克（一小勺花）",
        "1~2泡",
        "95度盖盖泡5分钟。",
        "埃及、德国等地，用干燥的洋甘菊花。",
        "苹果、蜂蜜与干草，柔和微甜。",
        "夜里、配甜点、加一勺蜂蜜。",
        "沸水泡5分钟，盖住留住香气。"
      ],
      "zh-TW": [
        "洋甘菊",
        "蘋果與蜂蜜香的花茶——睡前一杯。",
        "不發酵 · 無咖啡因",
        "200毫升配2公克（一小勺花）",
        "1~2泡",
        "95度蓋蓋泡5分鐘。",
        "埃及、德國等地，用乾燥的洋甘菊花。",
        "蘋果、蜂蜜與乾草，柔和微甜。",
        "夜裡、配甜點、加一勺蜂蜜。",
        "沸水泡5分鐘，蓋住留住香氣。"
      ]
    },
    {
      id: "herb-peppermint",
      group: "everyday",
      h: "荷",
      hz: "薄荷",
      hs: "薄荷",
      rom: "Peppermint",
      sub: "Peppermint",
      ox: 0,
      ko: [
        "페퍼민트",
        "서늘한 민트 향의 허브차 — 식후에.",
        "무산화 · 카페인 없음",
        "200ml에 2g",
        "1~2회",
        "95도에서 5분.",
        "유럽·미국. 박하 잎을 말려 씁니다.",
        "청량한 멘톨 향, 떫지 않습니다.",
        "식후, 기름진 음식 뒤.",
        "5분이면 충분합니다. 너무 오래 우리면 씁니다."
      ],
      en: [
        "Peppermint",
        "Cool mint in a herb tea — for after eating.",
        "None · caffeine-free",
        "2 g to 200 ml",
        "1–2 infusions",
        "95 °C for 5 minutes.",
        "Europe and America; dried mint leaf.",
        "Cool menthol, not astringent.",
        "After meals, after rich food.",
        "Five minutes is enough; longer turns it bitter."
      ],
      "zh-CN": [
        "薄荷",
        "清凉薄荷香的草本茶——饭后喝。",
        "不发酵 · 无咖啡因",
        "200毫升配2克",
        "1~2泡",
        "95度泡5分钟。",
        "欧美，用干燥的薄荷叶。",
        "清凉的薄荷脑香，不涩。",
        "饭后、油腻食物之后。",
        "5分钟就够，久了会苦。"
      ],
      "zh-TW": [
        "薄荷",
        "清涼薄荷香的草本茶——飯後喝。",
        "不發酵 · 無咖啡因",
        "200毫升配2公克",
        "1~2泡",
        "95度泡5分鐘。",
        "歐美，用乾燥的薄荷葉。",
        "清涼的薄荷腦香，不澀。",
        "飯後、油膩食物之後。",
        "5分鐘就夠，久了會苦。"
      ]
    },
    {
      id: "herb-hibiscus",
      group: "everyday",
      h: "洛",
      hz: "洛神花",
      hs: "洛神花",
      rom: "Hibiscus",
      sub: "Hibiscus",
      ox: 0,
      ko: [
        "히비스커스",
        "붉은 꽃받침의 신맛 — 아이스티로 가장 좋은 차.",
        "무산화 · 카페인 없음",
        "200ml에 3g",
        "1~2회",
        "95도에서 5분. 오래 우리면 시큼해집니다.",
        "아프리카·중남미·동남아. 로젤(히비스커스) 꽃받침을 말립니다.",
        "새콤한 산미와 베리 향, 진한 붉은 색.",
        "아이스티, 디저트, 식후.",
        "끓는 물 5분. 차갑게 해서 마시면 더 좋습니다."
      ],
      en: [
        "Hibiscus",
        "The sourness of red calyx — the best tea to drink iced.",
        "None · caffeine-free",
        "3 g to 200 ml",
        "1–2 infusions",
        "95 °C for 5 minutes; longer turns it sharply sour.",
        "Africa, Latin America and South-East Asia; dried roselle calyces.",
        "Tart berry acidity and a deep red colour.",
        "Iced tea, desserts, after meals.",
        "Five minutes in boiling water; even better cold."
      ],
      "zh-CN": [
        "洛神花",
        "红色花萼的酸——最适合做冰茶的茶。",
        "不发酵 · 无咖啡因",
        "200毫升配3克",
        "1~2泡",
        "95度泡5分钟，久了会过酸。",
        "非洲、中南美、东南亚，用干燥的洛神花萼。",
        "酸爽的莓果香，汤色深红。",
        "冰茶、甜点、饭后。",
        "沸水5分钟，冰镇更好喝。"
      ],
      "zh-TW": [
        "洛神花",
        "紅色花萼的酸——最適合做冰茶的茶。",
        "不發酵 · 無咖啡因",
        "200毫升配3公克",
        "1~2泡",
        "95度泡5分鐘，久了會過酸。",
        "非洲、中南美、東南亞，用乾燥的洛神花萼。",
        "酸爽的莓果香，湯色深紅。",
        "冰茶、甜點、飯後。",
        "沸水5分鐘，冰鎮更好喝。"
      ]
    },
    {
      id: "herb-rooibos",
      group: "everyday",
      h: "紅",
      hz: "路易波士",
      hs: "路易波士",
      rom: "Rooibos",
      sub: "Rooibos",
      ox: 0,
      ko: [
        "루이보스",
        "남아공의 붉은 관목차 — 카페인 없이 우유와도 어울립니다.",
        "무산화 · 카페인 없음",
        "200ml에 3g",
        "2회",
        "95도에서 5분. 오래 우리도 쓰지 않습니다.",
        "남아프리카 세데르버흐 산지. 침엽 모양의 잎을 발효·건조합니다.",
        "바닐라·무화과·꿀, 부드러운 단맛.",
        "우유를 넣은 차, 아이스티, 디저트.",
        "5분 이상 우려도 됩니다. 우유를 넣으면 밀크티가 됩니다."
      ],
      en: [
        "Rooibos",
        "South Africa's red bush tea — caffeine-free, and it takes milk.",
        "None · caffeine-free",
        "3 g to 200 ml",
        "2 infusions",
        "95 °C for 5 minutes; it never turns bitter.",
        "The Cederberg in South Africa; needle-like leaves fermented and dried.",
        "Vanilla, fig and honey with a soft sweetness.",
        "Milk tea, iced tea, desserts.",
        "Steep five minutes or more; with milk it becomes a milk tea."
      ],
      "zh-CN": [
        "路易波士",
        "南非的红灌木茶——无咖啡因，也适合加奶。",
        "不发酵 · 无咖啡因",
        "200毫升配3克",
        "2泡",
        "95度泡5分钟，泡久了也不苦。",
        "南非塞德堡山区，针状叶发酵后干燥。",
        "香草、无花果与蜂蜜，柔和的甜。",
        "奶茶、冰茶、甜点。",
        "5分钟以上也行，加奶就是奶茶。"
      ],
      "zh-TW": [
        "路易波士",
        "南非的紅灌木茶——無咖啡因，也適合加奶。",
        "不發酵 · 無咖啡因",
        "200毫升配3公克",
        "2泡",
        "95度泡5分鐘，泡久了也不苦。",
        "南非塞德堡山區，針狀葉發酵後乾燥。",
        "香草、無花果與蜂蜜，柔和的甜。",
        "奶茶、冰茶、甜點。",
        "5分鐘以上也行，加奶就是奶茶。"
      ]
    },
    {
      id: "herb-mate",
      group: "everyday",
      h: "馬",
      hz: "馬黛茶",
      hs: "马黛茶",
      rom: "Yerba Mate",
      sub: "Yerba Mate",
      ox: 0,
      ko: [
        "마테",
        "남미의 카페인 잎차 — 호리병과 금속 빨대로 마십니다.",
        "무산화 · 카페인 있음",
        "200ml에 3g",
        "2~3회",
        "80도에서 3분. 끓는 물은 씁니다.",
        "아르헨티나·브라질·파라과이. 마테 나무 잎을 말려 씁니다.",
        "풀·건초·옅은 연기, 쌉쌀한 여운.",
        "아침, 작업, 육류 요리.",
        "80도가 적당합니다. 90도 이상이면 씁니다."
      ],
      en: [
        "Yerba Mate",
        "South America's caffeinated leaf — drunk from a gourd with a metal straw.",
        "None · contains caffeine",
        "3 g to 200 ml",
        "2–3 infusions",
        "80 °C for 3 minutes; boiling water makes it bitter.",
        "Argentina, Brazil and Paraguay; dried leaves of the mate tree.",
        "Grass, hay and a light smoke, with a bitter finish.",
        "Morning, work, meat dishes.",
        "80 °C is right; above 90 °C it turns bitter."
      ],
      "zh-CN": [
        "马黛茶",
        "南美的含咖啡因叶茶——用葫芦和金属吸管喝。",
        "不发酵 · 含咖啡因",
        "200毫升配3克",
        "2~3泡",
        "80度泡3分钟，沸水会苦。",
        "阿根廷、巴西、巴拉圭，用马黛树叶干燥制成。",
        "青草、干草与一丝烟熏，尾端带苦。",
        "早晨、工作时、肉类料理。",
        "80度最合适，高于90度会苦。"
      ],
      "zh-TW": [
        "馬黛茶",
        "南美的含咖啡因葉茶——用葫蘆和金屬吸管喝。",
        "不發酵 · 含咖啡因",
        "200毫升配3公克",
        "2~3泡",
        "80度泡3分鐘，沸水會苦。",
        "阿根廷、巴西、巴拉圭，用馬黛樹葉乾燥製成。",
        "青草、乾草與一絲煙燻，尾端帶苦。",
        "早晨、工作時、肉類料理。",
        "80度最合適，高於90度會苦。"
      ]
    },
    {
      id: "herb-lavender",
      group: "everyday",
      h: "薰",
      hz: "薰衣草",
      hs: "薰衣草",
      rom: "Lavender",
      sub: "Lavender",
      ox: 0,
      ko: [
        "라벤더",
        "프로방스의 보랏빛 꽃차 — 향이 강해 조금만.",
        "무산화 · 카페인 없음",
        "200ml에 1g",
        "1회",
        "90도에서 3분. 오래 우리면 비누 향이 납니다.",
        "프랑스 프로방스. 라벤더 꽃을 말립니다.",
        "라벤더·꿀·옅은 시트러스, 매우 향기롭습니다.",
        "디저트, 밤, 블렌딩.",
        "1g이면 충분합니다. 홍차에 소량 섮어도 좋습니다."
      ],
      en: [
        "Lavender",
        "Provence's purple flower — so fragrant that a little is enough.",
        "None · caffeine-free",
        "1 g to 200 ml",
        "One infusion",
        "90 °C for 3 minutes; longer tastes of soap.",
        "Provence in France; dried lavender flowers.",
        "Lavender, honey and a light citrus, very perfumed.",
        "Desserts, night, blending.",
        "One gram is plenty; a pinch in black tea works too."
      ],
      "zh-CN": [
        "薰衣草",
        "普罗旺斯的紫色花茶——香气强，少放为宜。",
        "不发酵 · 无咖啡因",
        "200毫升配1克",
        "1泡",
        "90度泡3分钟，久了像肥皂。",
        "法国普罗旺斯，用干燥的薰衣草花。",
        "薰衣草、蜂蜜与淡柑橘，香气极浓。",
        "甜点、夜里、调和用。",
        "1克就够，加一点到红茶里也好。"
      ],
      "zh-TW": [
        "薰衣草",
        "普羅旺斯的紫色花茶——香氣強，少放為宜。",
        "不發酵 · 無咖啡因",
        "200毫升配1公克",
        "1泡",
        "90度泡3分鐘，久了像肥皂。",
        "法國普羅旺斯，用乾燥的薰衣草花。",
        "薰衣草、蜂蜜與淡柑橘，香氣極濃。",
        "甜點、夜裡、調和用。",
        "1公克就夠，加一點到紅茶裡也好。"
      ]
    },
    {
      id: "herb-lemongrass",
      group: "everyday",
      h: "茅",
      hz: "香茅",
      hs: "香茅",
      rom: "Lemongrass",
      sub: "Lemongrass",
      ox: 0,
      ko: [
        "레몬그라스",
        "레몬 향의 풀차 — 동남아의 향신료 차.",
        "무산화 · 카페인 없음",
        "200ml에 2g",
        "2회",
        "95도에서 5분.",
        "태국·베트남. 레몬그라스 줄기와 잎을 말립니다.",
        "레몬·시트러스·옅은 생강, 상쾌합니다.",
        "동남아 요리, 식후, 아이스티.",
        "줄기를 잘게 썰어 5분 우립니다."
      ],
      en: [
        "Lemongrass",
        "A lemon-scented grass — South-East Asia in a cup.",
        "None · caffeine-free",
        "2 g to 200 ml",
        "2 infusions",
        "95 °C for 5 minutes.",
        "Thailand and Vietnam; dried stalks and leaves.",
        "Lemon, citrus and a hint of ginger, refreshing.",
        "South-East Asian food, after meals, iced tea.",
        "Slice the stalk fine and steep five minutes."
      ],
      "zh-CN": [
        "香茅",
        "带着柠檬香的草茶——东南亚的味道。",
        "不发酵 · 无咖啡因",
        "200毫升配2克",
        "2泡",
        "95度泡5分钟。",
        "泰国、越南，用干燥的香茅茎叶。",
        "柠檬、柑橘与一点生姜，清爽。",
        "东南亚料理、饭后、冰茶。",
        "茎切碎再泡5分钟。"
      ],
      "zh-TW": [
        "香茅",
        "帶著檸檬香的草茶——東南亞的味道。",
        "不發酵 · 無咖啡因",
        "200毫升配2公克",
        "2泡",
        "95度泡5分鐘。",
        "泰國、越南，用乾燥的香茅莖葉。",
        "檸檬、柑橘與一點生薑，清爽。",
        "東南亞料理、飯後、冰茶。",
        "莖切碎再泡5分鐘。"
      ]
    },
    {
      id: "herb-chrysanthemum",
      group: "everyday",
      alias: ["국화차"],
      h: "菊",
      hz: "菊花茶",
      hs: "菊花茶",
      rom: "Chrysanthemum",
      sub: "Chrysanthemum Tea",
      ox: 0,
      ko: [
        "국화",
        "가을 국화를 말려 우린 향긋한 꽃차.",
        "무산화 · 카페인 없음",
        "200ml에 2g(꽃 3~4송이)",
        "2회",
        "95도에서 3분.",
        "중국 항저우·황산, 한국. 노란 국화를 말립니다.",
        "청량한 약재 향과 옅은 단맛.",
        "호두, 대추, 기름진 식사 뒤.",
        "꽃이 뜨면 뚜껑을 덮어 향을 잡습니다."
      ],
      en: [
        "Chrysanthemum Tea",
        "Autumn chrysanthemum dried — a fragrant flower tea.",
        "None · caffeine-free",
        "2 g (3–4 flowers) to 200 ml",
        "2 infusions",
        "95 °C for 3 minutes.",
        "Hangzhou and Huangshan in China, and Korea; yellow chrysanthemums dried.",
        "A cool medicinal note with a light sweetness.",
        "Walnuts, dates, after rich meals.",
        "When the flowers float, lid the cup to keep the aroma."
      ],
      "zh-CN": [
        "菊花茶",
        "秋天菊花晒干——清香的花茶。",
        "不发酵 · 无咖啡因",
        "200毫升配2克（3~4朵）",
        "2泡",
        "95度泡3分钟。",
        "中国杭州、黄山与韩国，用黄菊花干燥。",
        "清凉的药香与淡甜。",
        "核桃、红枣、油腻餐后。",
        "花浮起来时盖上盖子留住香气。"
      ],
      "zh-TW": [
        "菊花茶",
        "秋天菊花晒乾——清香的花茶。",
        "不發酵 · 無咖啡因",
        "200毫升配2公克（3~4朵）",
        "2泡",
        "95度泡3分鐘。",
        "中國杭州、黃山與韓國，用黃菊花乾燥。",
        "清涼的藥香與淡甜。",
        "核桃、紅棗、油膩餐後。",
        "花浮起來時蓋上蓋子留住香氣。"
      ]
    },
    /* ── 과일차 (블렌드 포함) ── */
    {
      id: "fruit-mogwa",
      group: "traditional",
      h: "木",
      hz: "木瓜茶",
      hs: "木瓜茶",
      rom: "Mogwa-cha",
      sub: "Quince Tea",
      t: 85,
      tr: "80~90℃",
      l: "청 2큰술",
      w: "200ml",
      s: [300, 300],
      m: 1,
      ox: 0,
      ko: [
        "모과차",
        "향이 강한 모과를 꿀에 절여 우린, 겨울 목을 위한 잔.",
        "무산화 · 카페인 없음",
        "청 2큰술에 200ml",
        "1회",
        "80~90도 물에 청을 풀어 마십니다. 끓이면 향이 날아갑니다.",
        "한국. 모과는 중국 원산으로 한반도에 들어와 정원수로 심었고, 열매는 향이 강해 방에 두거나 옷장에 넣었습니다.",
        "모과를 얇게 썰어 씨째 설탕·꿀이나 조청에 절여 숙성 → 뜨거운 물에 풀어 마심. 껍질을 살리면 향이 오래갑니다.",
        "‘나무에 열린 향기’라 불렀습니다. 차로 마시기 전부터 방향(芳香)의 열매로 쓰였습니다.",
        "은은한 꽃향과 단맛, 끝의 옅은 떫음.",
        "약과, 호두과자, 겨울 디저트.",
        "청 2큰술을 80~90도 물 200ml에 풀고, 과육을 함께 넣어야 향이 좋습니다."
      ],
      en: [
        "Quince Tea",
        "Quince preserved in honey — a winter cup for a scratchy throat.",
        "None · caffeine-free",
        "2 spoons of cheong to 200 ml",
        "One brew",
        "Stir the cheong into 80–90 °C water; boiling drives the aroma off.",
        "Korea. Quince came from China and was planted in Korean gardens; the fruit's strong perfume went into rooms and wardrobes.",
        "Thinly sliced quince, seeds and all, preserved in sugar, honey or jocheong → stirred into hot water. Keeping the peel keeps the aroma.",
        "It was called “fragrance borne on a tree” and used to scent rooms long before anyone drank it.",
        "A soft floral perfume and sweetness, with a faint astringency at the end.",
        "Yakgwa, walnut cakes, winter desserts.",
        "Two spoons of cheong in 200 ml of 80–90 °C water, fruit included."
      ],
      "zh-CN": [
        "木瓜茶",
        "香气浓烈的木瓜用蜜腌成的一杯，为冬天的嗓子。",
        "不发酵 · 无咖啡因",
        "蜜渍2勺配200毫升",
        "1次",
        "用80~90度水冲开蜜渍；煮沸会让香气跑掉。",
        "韩国。木瓜原产中国，传入韩半岛后多种在庭院，果实香气浓，常放在房里或衣柜中。",
        "木瓜切薄片（连籽）用糖、蜜或麦芽糖腌渍熟成 → 兑热水饮用。保留果皮香气更久。",
        "古人称它“长在树上的香”；在作为茶之前，早已用来熏香房间。",
        "柔和的花香与甜味，尾端有淡淡涩感。",
        "药果、核桃糕、冬季甜点。",
        "蜜渍2勺兑80~90度水200毫升，连果肉一起放。"
      ],
      "zh-TW": [
        "木瓜茶",
        "香氣濃烈的木瓜用蜜醃成的一杯，為冬天的嗓子。",
        "不發酵 · 無咖啡因",
        "蜜漬2勺配200毫升",
        "1次",
        "用80~90度水沖開蜜漬；煮沸會讓香氣跑掉。",
        "韓國。木瓜原產中國，傳入韓半島後多種在庭院，果實香氣濃，常放在房裡或衣櫃中。",
        "木瓜切薄片（連籽）用糖、蜜或麥芽糖醃漬熟成 → 兌熱水飲用。保留果皮香氣更久。",
        "古人稱它「長在樹上的香」；在作為茶之前，早已用來薰香房間。",
        "柔和的花香與甜味，尾端有淡淡澀感。",
        "藥果、核桃糕、冬季甜點。",
        "蜜漬2勺兌80~90度水200毫升，連果肉一起放。"
      ]
    },

  ];

  /* ---------------- 홈: 기분·상황별 추천 ---------------- */
  var MOODS = [
    {
      id: "morning",
      icon: "sun",
      teaId: "blend-earlgrey",
      alt: "black-assam",
      ko: {
        label: "아침 집중",
        headline: "베르가못 향으로 하루를 연다",
        reason:
          "홍차의 카페인은 커피보다 천천히 흡수되어 각성이 오래갑니다. 베르가못 향은 뜨거운 물에서 열리고, 우유를 넣어도 향이 무너지지 않습니다.",
        tip: "우유를 넣을 거라면 5g·150ml로 조금 더 진하게."
      },
      en: {
        label: "Morning focus",
        headline: "Open the day with bergamot",
        reason:
          "The caffeine in black tea is absorbed more slowly than coffee's, so the lift lasts longer. Bergamot opens in hot water and doesn't collapse when you add milk.",
        tip: "If you take milk, use 5 g to 150 ml for a stronger cup."
      },
      "zh-CN": {
        label: "晨间专注",
        headline: "以佛手柑的香气开启一天",
        reason:
          "红茶的咖啡因比咖啡吸收得慢，所以清醒更持久。佛手柑香在热水中释放，加了牛奶也不会散。",
        tip: "要加奶的话用5克·150毫升，泡浓一点。"
      },
      "zh-TW": {
        label: "晨間專注",
        headline: "以佛手柑的香氣開啟一天",
        reason:
          "紅茶的咖啡因比咖啡吸收得慢，所以清醒更持久。佛手柑香在熱水中釋放，加了牛奶也不會散。",
        tip: "要加奶的話用5公克·150毫升，泡濃一點。"
      },
      "yue": {
        "label": "朝早專注",
        "headline": "用佛手柑香開始一日",
        "reason": "紅茶嘅咖啡因比咖啡吸收得慢，所以清醒得耐啲。佛手柑香喺熱水入面放，加咗奶都唔會散。",
        "tip": "要加奶就用5克·150毫升，沖濃啲。",
      }
    },
    {
      id: "aftermeal",
      icon: "bowl",
      teaId: "dark-shou",
      alt: "green-longjing",
      ko: {
        label: "식후 개운",
        headline: "기름진 입안을 정리하는 한 잔",
        reason:
          "진하고 따뜻한 흑차가 입안을 헹구고 기름진 맛을 정리합니다. 테아브라운과 다당류가 장내 환경에 관여한다는 연구도 보고되었습니다. 차는 약이 아니라 식후의 습관입니다.",
        tip: "공복은 피하고 식후 30분 뒤에. 포다는 15~20초."
      },
      en: {
        label: "After a meal",
        headline: "A cup to clear a rich mouthful",
        reason:
          "A strong, warm dark tea rinses the mouth and settles greasy flavours. Studies have also reported that theabrownin and polysaccharides play a part in gut environment. Tea is a habit after eating, not medicine.",
        tip: "Avoid an empty stomach; 30 minutes after eating. First infusion 15–20 seconds."
      },
      "zh-CN": {
        label: "饭后清爽",
        headline: "整理油腻口感的这一杯",
        reason:
          "浓而温热的黑茶能漱净口腔、化开油味。也有研究指出茶褐素与多糖参与肠道环境。茶不是药，而是饭后的习惯。",
        tip: "避免空腹，饭后30分钟。第一泡15~20秒。"
      },
      "zh-TW": {
        label: "飯後清爽",
        headline: "整理油膩口感的這一杯",
        reason:
          "濃而溫熱的黑茶能漱淨口腔、化開油味。也有研究指出茶褐素與多醣參與腸道環境。茶不是藥，而是飯後的習慣。",
        tip: "避免空腹，飯後30分鐘。第一泡15~20秒。"
      },
      "yue": {
        "label": "飯後清爽",
        "headline": "整理油膩口感嘅一杯",
        "reason": "濃而溫熱嘅黑茶可以漱淨口腔、化開油味。亦有研究話茶褐素同多醣同腸道環境有關。茶唔係藥，係飯後嘅習慣。",
        "tip": "唔好空肚，飯後30分鐘。頭泡15~20秒。",
      }
    },
    {
      id: "afternoon",
      icon: "cup",
      teaId: "oolong-tieguanyin",
      alt: "black-keemun",
      ko: {
        label: "오후 나른",
        headline: "짧게 여러 번, 오후를 깨우는 향",
        reason:
          "우롱차는 산화도가 중간이라 녹차보다 바디가 있고 홍차보다 가볍습니다. 30초씩 짧게 여러 번 우리면 한 잔으로 오래, 잔마다 다른 층이 열립니다.",
        tip: "개완이 없으면 작은 주전자에 우리고 바로 다른 컵에 따라두세요."
      },
      en: {
        label: "Afternoon dip",
        headline: "Short and often — an aroma that wakes the afternoon",
        reason:
          "Oolong sits mid-way in oxidation: more body than green tea, less weight than black. Thirty seconds at a time, many times, and each pour opens a different layer.",
        tip: "No gaiwan? Brew in a small pot and pour it straight into another cup."
      },
      "zh-CN": {
        label: "午后困倦",
        headline: "短泡多次，唤醒午后的香",
        reason:
          "乌龙茶发酵度居中，比绿茶有厚度，比红茶轻。每次30秒、多泡几次，一杯可以喝很久，每一泡都打开不同的层次。",
        tip: "没有盖碗就用小壶泡，泡好马上倒到另一个杯子里。"
      },
      "zh-TW": {
        label: "午後睏倦",
        headline: "短泡多次，喚醒午後的香",
        reason:
          "烏龍茶發酵度居中，比綠茶有厚度，比紅茶輕。每次30秒、多泡幾次，一杯可以喝很久，每一泡都打開不同的層次。",
        tip: "沒有蓋碗就用小壺泡，泡好馬上倒到另一個杯子裡。"
      },
      "yue": {
        "label": "下晝想瞓",
        "headline": "短沖多次，叫醒下晝嘅香",
        "reason": "烏龍茶發酵度中間，比綠茶有厚度，比紅茶輕。每次30秒、沖多幾次，一杯可以飲好耐，每泡都打開唔同嘅層次。",
        "tip": "冇蓋碗就用細壺沖，沖好即刻倒去另一個杯。",
      }
    },
    {
      id: "night",
      icon: "moon",
      teaId: "herb-chamomile",
      alt: "white-silverneedle",
      ko: {
        label: "밤 릴랙스",
        headline: "가장 조용한 차 한 잔",
        reason:
          "캐모마일은 카페인이 없고 사과·꿀 같은 향이 긴장을 풉니다. 백차는 카페인의 쓴맛이 부드럽게 감싸지고 떫은맛이 거의 없습니다.",
        tip: "캐모마일은 95도에서 5분, 뚜껑을 덮어 향을 잡습니다."
      },
      en: {
        label: "Night calm",
        headline: "The quietest cup of the day",
        reason:
          "Chamomile has no caffeine and its apple-and-honey aroma loosens the shoulders. In white tea the bitterness of caffeine is wrapped softly, with almost no astringency.",
        tip: "Chamomile at 95 °C for 5 minutes, lid on to keep the aroma."
      },
      "zh-CN": {
        label: "夜间放松",
        headline: "最安静的一杯茶",
        reason:
          "洋甘菊没有咖啡因，苹果与蜂蜜般的香气能放松紧绷。白茶的咖啡因苦味被柔和地包住，几乎没有涩味。",
        tip: "洋甘菊95度泡5分钟，盖住盖子留住香气。"
      },
      "zh-TW": {
        label: "夜間放鬆",
        headline: "最安靜的一杯茶",
        reason:
          "洋甘菊沒有咖啡因，蘋果與蜂蜜般的香氣能放鬆緊繃。白茶的咖啡因苦味被柔和地包住，幾乎沒有澀味。",
        tip: "洋甘菊95度泡5分鐘，蓋住蓋子留住香氣。"
      },
      "yue": {
        "label": "夜晚放鬆",
        "headline": "最安靜嘅一杯茶",
        "reason": "洋甘菊冇咖啡因，蘋果同蜜糖般嘅香氣可以放鬆繃緊。白茶嘅咖啡因苦味被柔和咁包住，幾乎冇澀味。",
        "tip": "洋甘菊95度沖5分鐘，冚蓋留住香氣。",
      }
    }
  ];


  /* ---------------- 취향 태그 (10문항 테스트용) ----------------
     각 차의 성격을 태그로 적어 두고, 퀴즈 답변의 태그 점수와 맞춥니다.
     시간 t- / 향 a- / 바디 b- / 방식 s- / 카페인 c- / 맛 k- / 배전 r- /
     페어링 p- / 우림 w- / 기분 m-  */
  var TRAITS = {
    /* 녹차 */
    "green-longjing": "t-morning t-afternoon a-roast a-grass b-medium k-sweet r-clean s-hot w-quick w-gongfu p-meal c-mid m-refresh",
    "green-biluochun": "t-morning t-afternoon a-floral a-fruit a-grass b-light k-sweet r-clean s-hot s-iced w-quick p-dessert c-mid m-refresh",
    "green-maofeng": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
    "green-sencha": "t-morning t-afternoon a-grass b-light k-sweet k-crisp r-clean s-hot w-quick p-meal c-mid m-refresh",
    "green-gyokuro": "t-afternoon t-night a-grass b-medium k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    "green-matcha": "t-morning a-grass b-full k-crisp r-clean s-hot s-milk w-quick p-dessert c-mid m-energy",
    "green-jeju": "t-morning t-afternoon a-roast a-grass b-light k-sweet r-clean s-hot w-quick p-meal c-mid",
    "green-luanguapian": "t-afternoon a-roast b-full k-sweet r-clean s-hot w-gongfu p-meal c-mid m-cozy",
    "green-houkui": "t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot w-quick p-solo c-mid",
    "green-maojian": "t-morning a-grass a-roast b-light k-crisp r-smoke s-hot w-quick p-solo c-mid",
    "green-lushan": "t-afternoon a-grass b-light k-sweet r-clean s-hot w-quick p-solo c-mid m-calm",
    "green-hojicha": "t-afternoon t-night a-roast b-light k-sweet r-smoke s-hot s-milk w-quick p-dessert c-low m-cozy m-calm",
    "green-genmaicha": "t-morning t-afternoon a-roast b-light k-sweet r-smoke s-hot w-quick p-meal c-low m-cozy",
    "green-hadong": "t-morning t-afternoon a-grass a-roast b-light k-sweet r-clean s-hot w-quick p-meal c-mid",
    "green-sejak": "t-morning t-afternoon a-grass a-roast b-light k-crisp r-clean s-hot w-quick c-mid",
    "green-jungjak": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-meal c-mid",
    "green-daejak": "t-afternoon a-roast b-full k-crisp r-clean s-hot w-quick p-meal c-mid",
    "green-jukro": "t-afternoon a-floral a-grass b-medium k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    /* 백차 */
    "white-silverneedle": "t-night t-afternoon a-floral b-light k-sweet r-clean s-hot s-iced w-gongfu p-solo p-dessert c-low m-calm",
    "white-peony": "t-afternoon t-night a-floral a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-low m-calm",
    "white-shoumei": "t-afternoon a-floral a-roast b-medium k-sweet r-clean s-hot w-gongfu p-solo c-low m-cozy",
    "white-aged": "t-night t-afternoon a-roast a-malt b-full k-sweet r-clean s-hot w-gongfu p-solo c-low m-cozy m-calm",
    /* 황차 */
    "yellow-junshan": "t-afternoon t-night a-floral b-light k-sweet r-clean s-hot w-gongfu p-dessert c-low m-calm",
    "yellow-mengding": "t-afternoon a-floral a-roast b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
    "yellow-huoshan": "t-afternoon a-roast b-light k-sweet r-clean s-hot w-quick p-meal c-low",
    /* 청차·우롱 */
    "oolong-tieguanyin": "t-afternoon a-floral b-medium k-sweet k-crisp r-clean s-hot w-gongfu p-meal c-mid m-calm",
    "oolong-dahongpao": "t-afternoon t-night a-roast r-smoke b-full k-sweet s-hot w-gongfu p-meal c-mid m-cozy",
    "oolong-dancong": "t-afternoon a-floral a-fruit b-medium k-sweet s-hot w-gongfu p-solo c-mid m-calm",
    "oolong-dongding": "t-afternoon a-roast a-floral b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-cozy",
    "oolong-alishan": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot s-iced w-gongfu p-solo c-mid m-refresh",
    "oolong-beauty": "t-afternoon a-floral a-fruit a-malt b-medium k-sweet s-hot s-iced w-gongfu p-dessert c-mid m-calm",
    "oolong-si-ji-chun": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot s-iced w-quick w-gongfu p-solo c-mid m-refresh",
    "oolong-jin-xuan": "t-afternoon a-floral b-medium k-sweet s-hot s-milk w-quick c-mid m-calm",
    "oolong-pouchong": "t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot w-quick c-mid m-calm",
    "white-gongmei": "t-afternoon t-night a-floral a-roast b-medium k-sweet r-clean s-hot w-gongfu p-meal c-low m-cozy",
    /* 홍차 */
    "black-darjeeling-first": "t-morning t-afternoon a-floral b-light k-crisp r-clean s-hot s-iced w-quick p-dessert c-high m-refresh",
    "black-assam": "t-morning a-malt b-full k-sweet s-milk s-hot w-quick p-meal p-dessert c-high m-energy",
    "black-nilgiri": "t-morning t-afternoon a-herb a-malt b-light k-crisp r-clean s-hot s-iced w-quick c-high m-refresh",
    "black-nuwaraeliya": "t-morning a-floral a-herb b-light k-crisp r-clean s-hot s-iced w-quick c-high m-refresh",
    "black-udapussellawa": "t-afternoon a-floral b-medium k-crisp s-hot w-quick c-high m-calm",
    "black-uva": "t-morning a-herb b-medium k-crisp s-hot w-quick c-high m-refresh",
    "black-dimbula": "t-afternoon a-floral a-malt b-medium k-sweet s-hot s-milk w-quick c-high",
    "black-sabaragamuwa": "t-afternoon a-malt a-fruit b-medium k-sweet s-milk w-quick p-dessert c-high m-cozy",
    "black-kandy": "t-morning a-malt a-floral b-light k-sweet s-hot w-quick c-high",
    "black-ruhuna": "t-morning a-malt b-full k-crisp s-milk w-quick p-meal c-high m-energy",
    "black-keemun": "t-afternoon a-floral a-malt b-medium k-sweet s-hot w-quick p-dessert c-high m-calm",
    "black-lapsang": "t-afternoon t-night a-roast r-smoke b-full k-crisp s-hot w-quick p-meal c-high m-cozy",
    "black-jinjunmei": "t-afternoon a-floral a-malt a-fruit b-medium k-sweet s-hot w-quick p-dessert c-high",
    "black-dianhong": "t-morning t-afternoon a-malt a-fruit b-full k-sweet s-milk s-hot w-quick p-dessert c-high m-cozy",
    "black-sikkim": "t-afternoon a-floral b-medium k-sweet s-hot w-quick c-high",
    "black-nepal": "t-morning a-floral a-fruit b-light k-crisp s-hot s-iced w-quick c-high m-refresh",
    "black-kenya": "t-morning a-malt b-full k-crisp s-milk w-quick p-meal c-high m-energy",
    "black-jaksal": "t-afternoon a-malt a-roast b-medium k-sweet s-hot w-quick c-high",
    "black-ruby18": "t-afternoon a-herb a-malt a-fruit b-full k-sweet s-hot s-milk w-quick p-dessert c-high m-cozy",
    /* 흑차 */
    "dark-sheng": "t-afternoon a-roast b-medium k-crisp s-hot w-gongfu p-meal c-mid m-calm",
    "dark-shou": "t-night a-roast b-full k-sweet s-hot s-milk w-gongfu p-meal c-mid m-cozy m-calm",
    "dark-anhua": "t-night a-roast r-smoke b-full k-sweet s-hot s-milk w-gongfu p-meal c-mid m-cozy",
    "dark-liubao": "t-afternoon a-roast b-full k-sweet s-hot w-gongfu p-meal c-mid m-cozy",
    "dark-cheongtaejeon": "t-night a-roast b-medium k-sweet s-hot w-gongfu c-mid m-cozy m-calm",
    /* 블렌딩차 */
    "blend-earlgrey": "t-morning t-afternoon a-herb a-floral b-medium k-crisp k-blend r-clean s-hot s-iced s-milk w-quick p-dessert c-high m-refresh",
    "blend-ladygrey": "t-afternoon a-herb a-floral a-fruit b-light k-sweet k-blend s-hot w-quick p-dessert c-high m-calm",
    "blend-englishbreakfast": "t-morning a-malt b-full k-crisp k-blend s-milk s-hot w-quick p-meal c-high m-energy",
        "blend-jasmine": "t-afternoon a-floral b-light k-sweet k-blend s-hot w-quick p-dessert c-mid m-calm",
    "blend-hongkong": "t-morning t-afternoon a-malt b-full k-sweet k-blend s-milk w-quick p-dessert c-high m-cozy",
    "blend-masala": "t-morning a-malt a-herb b-full k-sweet k-blend s-milk w-quick p-dessert c-high m-cozy m-energy",
    /* 대용차 */
    "herb-ginger": "t-morning t-night a-herb b-medium k-crisp k-grain s-hot w-quick p-meal c-none m-cozy m-energy",
    "herb-ssanghwa": "t-night a-roast a-herb b-full k-sweet k-grain s-hot w-quick c-none m-cozy m-calm",
    "herb-dunggulle": "t-night a-roast b-medium k-sweet k-grain s-hot w-quick c-none m-calm m-cozy",
    "herb-buckwheat": "t-afternoon t-night a-roast b-light k-sweet k-grain s-hot w-quick p-meal c-none m-calm",
    "herb-barley": "t-afternoon a-roast b-light k-sweet k-grain s-hot s-iced w-quick p-meal c-none m-refresh",
    "herb-brownrice": "t-afternoon a-roast b-light k-sweet k-grain s-hot w-quick p-meal c-none m-cozy",
    "herb-persimmon": "t-afternoon a-herb b-light k-crisp k-grain s-hot s-iced w-quick c-none",
    "herb-mulberry": "t-afternoon a-herb a-roast b-light k-crisp k-grain s-hot w-quick c-none",
    "herb-lotus": "t-afternoon a-herb b-light k-crisp k-grain s-hot s-iced w-quick c-none m-refresh",
    "herb-balloonflower": "t-night a-herb b-medium k-crisp k-grain s-hot w-quick c-none m-cozy",
    "herb-mugwort": "t-afternoon a-herb a-roast b-medium k-crisp k-grain s-hot w-quick c-none",
    "herb-tteokcha": "t-afternoon a-roast b-full k-sweet k-grain s-hot w-gongfu c-mid m-cozy m-calm",
    "herb-rooibos": "t-night a-roast a-malt b-medium k-sweet k-grain s-hot s-milk w-quick p-dessert c-none m-cozy m-calm",
    "herb-mate": "t-morning a-roast a-herb b-medium k-crisp k-grain s-hot w-gongfu c-high m-energy",
    /* 허브차 */
    "herb-chamomile": "t-night a-floral a-herb b-light k-sweet s-hot w-quick p-dessert c-none m-calm m-cozy",
    "herb-peppermint": "t-afternoon t-night a-herb b-light k-crisp s-hot s-iced w-quick p-solo c-none m-refresh",
    "herb-hibiscus": "t-afternoon a-herb a-fruit b-light k-crisp s-iced w-quick p-dessert c-none m-refresh",
    "herb-lavender": "t-night a-floral a-herb b-light k-sweet s-hot w-quick c-none m-calm",
    "herb-lemongrass": "t-afternoon a-herb a-fruit b-light k-crisp s-hot s-iced w-quick p-meal c-none m-refresh",
    "herb-chrysanthemum": "t-afternoon a-floral a-herb b-light k-sweet s-hot s-iced w-quick c-none m-calm m-refresh",
    /* 과일차 */
    "fruit-yuja": "t-afternoon a-fruit a-herb b-light k-sweet s-hot s-iced w-quick p-dessert c-none m-refresh",
    "fruit-mogwa": "t-afternoon t-night a-fruit a-floral b-light k-sweet s-hot w-quick p-dessert c-none m-cozy",
    "fruit-omija": "t-afternoon a-fruit a-herb b-light k-crisp s-iced w-quick p-solo c-none m-refresh",
    "fruit-daechu": "t-night a-roast a-fruit b-medium k-sweet s-hot w-quick p-dessert c-none m-cozy m-calm",
  };

  /* ── BEGIN generated: research ── */
  /* ── 신규 65종 (tea_fai_research/extra_teas.json) ── */
  var EXTRA_TEAS = [
  {
    "id": "green-zhuyeqing",
    "group": "green",
    "kind": "tea",
    "hanja": "竹",
    "sub": "Zhu Ye Qing",
    "alias": [
      "죽엽청",
      "아미산 죽엽청"
    ],
    "hz": "竹葉青",
    "hs": "竹叶青",
    "rom": "Zhu Ye Qing",
    "temp": 80,
    "tempRange": "75~80℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      60,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청(솥 덖음) → 유념 → 건조. 솥에서 덖어 잎을 대나무 잎처럼 곧고 납작하게 만듭니다.",
        "1964년 어메이산에서 만들어지기 시작한 것으로 전해지며, 이름은 잎 모양에서 왔습니다."
      ],
      "en": [
        "Pan-fired in a wok, rolled, dried. The firing keeps the blade straight and flat, like a bamboo leaf.",
        "It is said to have begun on Mount Emei in 1964; the name simply describes the shape of the leaf."
      ],
      "zh-CN": [
        "锅里炒青 → 揉捻 → 干燥。炒制把芽叶压成竹叶般的扁平直条。",
        "相传1964年创制于峨眉山，名字就来自叶形。"
      ],
      "zh-TW": [
        "鍋裡炒青 → 揉捻 → 乾燥。炒制把芽葉壓成竹葉般的扁平直條。",
        "相傳1964年創製於峨眉山，名字就來自葉形。"
      ]
    },
    "ko": {
      "name": "죽엽청 (아미산)",
      "oneLine": "대나무 잎처럼 곧게 편 잎 — 쓰촨의 봄을 일찍 담는 차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분, 2포 30초, 3포 45초.",
      "origin": "쓰촨성 어메이산 일대, 해발 800~1,200m. 청명 전에 딴 어린 싹을 씁니다.",
      "process": "살청 → 유념 → 건조. 솥에서 덖어 잎을 곧고 납작하게 만듭니다.",
      "story": "1964년 어메이산에서 처음 만들었다고 전합니다. 이름은 대나무 잎을 닮은 모양에서 왔습니다.",
      "flavor": "옅은 풀 향과 단맛, 끝에 아주 가벼운 떫음. 물색은 연한 청록입니다.",
      "pairing": "담백한 생선찜, 두부, 죽. 기름진 요리와는 어울리지 않습니다.",
      "brewTip": "유리잔이면 물을 먼저 붓고 잎을 얹으세요. 잎이 서서히 가라앉으며 향이 열립니다.",
      "keep": "개봉 후 한 달 안. 밀봉해 냉장 보관합니다.",
      "keywords": "죽엽청 아미산 쓰촨 덖음 녹차 명전"
    },
    "en": {
      "name": "Zhu Ye Qing (Emei)",
      "oneLine": "Flat blades like bamboo leaves — Sichuan's early spring in a cup.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1 minute, then 30 seconds, then 45.",
      "origin": "The Emei Mountain area of Sichuan, 800–1,200 m, picked before Qingming.",
      "process": "Firing, rolling, drying. The wok keeps the blade straight and flat.",
      "story": "Said to have begun on Mount Emei in 1964; the name comes from the shape of the leaf.",
      "flavor": "Light green-grass aroma, sweetness, a faint astringency at the end. Pale blue-green liquor.",
      "pairing": "Steamed white fish, tofu, congee. Oily dishes fight it.",
      "brewTip": "In a glass, pour the water first and drop the leaf in; it sinks slowly and opens as it goes.",
      "keep": "Within a month of opening, sealed in the fridge.",
      "keywords": "Zhu Ye Qing Emei Sichuan pan-fired green tea pre-Qingming"
    },
    "zh-CN": {
      "name": "竹叶青",
      "oneLine": "形如竹叶的扁平芽叶——把四川的早春装进杯里。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分钟，第二泡30秒，第三泡45秒。",
      "origin": "四川峨眉山一带，海拔800~1200米，清明前采嫩芽。",
      "process": "炒青 → 揉捻 → 干燥，锅里炒成扁平直条。",
      "story": "相传1964年创制于峨眉山，名字来自叶形。",
      "flavor": "清草香与回甘，尾端极轻的涩，汤色浅青绿。",
      "pairing": "清蒸鱼、豆腐、粥。油腻菜会压住香气。",
      "brewTip": "玻璃杯先注水再投茶，芽叶缓缓下沉，香气随之打开。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "竹叶青 峨眉 四川 炒青绿茶 明前"
    },
    "zh-TW": {
      "name": "竹葉青",
      "oneLine": "形如竹葉的扁平芽葉——把四川的早春裝進杯裡。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分鐘，第二泡30秒，第三泡45秒。",
      "origin": "四川峨眉山一帶，海拔800~1200米，清明前採嫩芽。",
      "process": "炒青 → 揉捻 → 乾燥，鍋裡炒成扁平直條。",
      "story": "相傳1964年創製於峨眉山，名字來自葉形。",
      "flavor": "清草香與回甘，尾端極輕的澀，湯色淺青綠。",
      "pairing": "清蒸魚、豆腐、粥。油膩菜會壓住香氣。",
      "brewTip": "玻璃杯先注水再投茶，芽葉緩緩下沉，香氣隨之打開。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "竹葉青 峨眉 四川 炒青綠茶 明前"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "green-enshi-yulu",
    "group": "green",
    "kind": "tea",
    "hanja": "玉",
    "sub": "Enshi Yulu",
    "alias": [
      "은시옥로",
      "옥로"
    ],
    "hz": "恩施玉露",
    "hs": "恩施玉露",
    "rom": "Enshi Yulu",
    "temp": 75,
    "tempRange": "70~80℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-herb b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "증청(수증기로 찌기) → 유념 → 건조. 일본식 증청을 지키는 중국 녹차로는 드문 차입니다.",
        "후베이성 언스의 바둥(巴東) 지역에서 청대부터 만들었고, 1960년대에 지금의 증청 방식이 정리되었습니다."
      ],
      "en": [
        "Steamed → rolled → dried. Steam fixing is rare among Chinese greens, kept from Japanese practice.",
        "Made in Enshi, Hubei since the Qing era; the present steamed process was consolidated in the 1960s."
      ],
      "zh-CN": [
        "蒸汽杀青 → 揉捻 → 干燥。中国绿茶里少见的蒸青工艺。",
        "清代已在湖北恩施一带制作，1960年代定型为现在的蒸青做法。"
      ],
      "zh-TW": [
        "蒸汽殺青 → 揉捻 → 乾燥。中國綠茶裡少見的蒸青工藝。",
        "清代已在湖北恩施一帶製作，1960年代定型為現在的蒸青做法。"
      ]
    },
    "ko": {
      "name": "은시옥로",
      "oneLine": "수증기로 찌고 바늘처럼 비튼, 중국에서 드문 증청 녹차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "75도에서 1분 15초, 2포 30초, 3포 45초. 물이 뜨거우면 해조류 같은 향이 강해집니다.",
      "origin": "후베이성 언스시, 해발 400~800m의 산지.",
      "process": "증청 → 유념 → 건조. 찐 잎을 비벼 가는 바늘 모양으로 만듭니다.",
      "story": "청대부터 언스에서 만들었고, 1936년에 솥덖음이 증청으로 바뀌며 지금의 옥로가 되었습니다.",
      "flavor": "찐 잎의 감칠맛과 해조류 같은 향, 부드러운 단맛. 물색은 맑은 연둣빛입니다.",
      "pairing": "회, 초밥, 나물. 기름진 고기와는 부딪힙니다.",
      "brewTip": "70~75도. 끓인 물을 다른 컵에 한 번 옮겨 쓰면 대략 그 온도가 됩니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장. 증청차는 산화가 빨라 더 서늘하게 둡니다.",
      "keywords": "은시옥로 증청 녹차 후베이 바늘잎"
    },
    "en": {
      "name": "Enshi Yulu",
      "oneLine": "Steamed and twisted into needles — a rare steamed green in China.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "75 °C: 1¼ minutes, then 30 seconds, then 45. Hotter water brings out a seaweed note.",
      "origin": "Enshi, Hubei, 400–800 m.",
      "process": "Steaming, rolling, drying; the steamed leaf is rolled into fine needles.",
      "story": "Made in Enshi since the Qing era; in 1936 the pan-firing was replaced by steaming, giving today's Yulu.",
      "flavor": "Savory steamed-leaf umami, a seaweed edge, soft sweetness. Clear pale-green liquor.",
      "pairing": "Sashimi, sushi, namul. Oily meat clashes.",
      "brewTip": "70–75 °C. Pour boiling water into another cup once to land near that.",
      "keep": "Within a month of opening, sealed and cold — steamed leaf fades faster.",
      "keywords": "Enshi Yulu steamed green tea Hubei needle"
    },
    "zh-CN": {
      "name": "恩施玉露",
      "oneLine": "蒸汽杀青、揉成针形，中国少见的蒸青绿茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "75度泡1分15秒，第二泡30秒，第三泡45秒。水太烫会突出海藻气。",
      "origin": "湖北恩施，海拔400~800米。",
      "process": "蒸青 → 揉捻 → 干燥，揉成细针状。",
      "story": "清代已在恩施制作，1936年由炒青改为蒸青，成为今天的玉露。",
      "flavor": "蒸青的鲜味与海藻香，回甘柔和，汤色浅绿清亮。",
      "pairing": "生鱼片、寿司、凉拌菜。油腻肉类相冲。",
      "brewTip": "70~75度，沸水先倒到另一个杯子再冲。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "恩施玉露 蒸青绿茶 湖北 针形"
    },
    "zh-TW": {
      "name": "恩施玉露",
      "oneLine": "蒸汽殺青、揉成針形，中國少見的蒸青綠茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "75度泡1分15秒，第二泡30秒，第三泡45秒。水太燙會突出海藻氣。",
      "origin": "湖北恩施，海拔400~800米。",
      "process": "蒸青 → 揉捻 → 乾燥，揉成細針狀。",
      "story": "清代已在恩施製作，1936年由炒青改為蒸青，成為今天的玉露。",
      "flavor": "蒸青的鮮味與海藻香，回甘柔和，湯色淺綠清亮。",
      "pairing": "生魚片、壽司、涼拌菜。油膩肉類相衝。",
      "brewTip": "70~75度，沸水先倒到另一個杯子再衝。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "恩施玉露 蒸青綠茶 湖北 針形"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "green-anji-baipian",
    "group": "green",
    "kind": "tea",
    "hanja": "白",
    "sub": "Anji Bai Cha",
    "alias": [
      "안길백편",
      "안길백차",
      "안지백차"
    ],
    "hz": "安吉白茶",
    "hs": "安吉白茶",
    "rom": "Anji Bai Cha",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 건조. 잎이 여려 낮은 온도에서 짧게 덖습니다.",
        "이름은 ‘백차’지만 백차가 아니라 녹차입니다. 봄에 잎이 연두빛 흰색을 띠는 백엽1호 품종으로 만듭니다."
      ],
      "en": [
        "Fired, rolled, dried — gently and briefly, because the leaf is thin.",
        "Despite the name it is a green tea, not a white tea: the cultivar 'Baiye 1' turns pale in spring."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 干燥，叶薄，低温短炒。",
        "虽名为“白茶”，实际是绿茶，用的是春季叶色偏白的“白叶一号”品种。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 乾燥，葉薄，低溫短炒。",
        "雖名為「白茶」，實際是綠茶，用的是春季葉色偏白的「白葉一號」品種。"
      ]
    },
    "ko": {
      "name": "안길백차",
      "oneLine": "봄에 잎이 희게 뜨는 품종으로 만든, 이름은 백차지만 녹차인 차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분 15초, 2포 30초, 3포 45초.",
      "origin": "저장성 안길현, 해발 300~800m. 봄에 잎이 연한 흰빛을 띠는 시기에 딴 잎을 씁니다.",
      "process": "살청 → 유념 → 건조. 잎이 얇아 낮은 온도로 짧게 덖습니다.",
      "story": "1980년대 안길의 한 그루 야생 차나무에서 시작해 널리 퍼진 품종 이야기가 전합니다.",
      "flavor": "아미노산이 많아 감칠맛이 두드러지고 떫음이 거의 없습니다. 물색은 아주 연합니다.",
      "pairing": "흰살생선, 두부, 달지 않은 과자.",
      "brewTip": "잎이 여리므로 75~80도. 시간이 길면 감칠맛보다 풀 향이 앞섭니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "안길백차 안지백차 백엽1호 저장 감칠맛"
    },
    "en": {
      "name": "Anji Bai Cha",
      "oneLine": "A green tea from a spring-pale cultivar, named white tea.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1¼ minutes, then 30 seconds, then 45.",
      "origin": "Anji, Zhejiang, 300–800 m; picked while the spring flush is still pale.",
      "process": "Fired, rolled, dried — briefly at low heat for a thin leaf.",
      "story": "Traced to a single wild bush found in Anji in the 1980s and propagated since.",
      "flavor": "High amino acids give strong umami and almost no astringency; very pale liquor.",
      "pairing": "White fish, tofu, unsweetened pastry.",
      "brewTip": "75–80 °C. Too long and grass outweighs the savor.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Anji Bai Cha Baiye 1 Zhejiang umami green tea"
    },
    "zh-CN": {
      "name": "安吉白茶",
      "oneLine": "用春季叶色发白的品种做成，名字叫白茶，其实是绿茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "浙江安吉，海拔300~800米，春季叶色发白时采摘。",
      "process": "炒青 → 揉捻 → 干燥，叶薄，低温短炒。",
      "story": "1980年代在安吉发现一株野生茶树，其后繁殖推广。",
      "flavor": "氨基酸高，鲜味突出，几乎不涩，汤色极浅。",
      "pairing": "白肉鱼、豆腐、不甜的糕点。",
      "brewTip": "75~80度，久泡则草气盖过鲜味。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "安吉白茶 白叶一号 浙江 鲜爽"
    },
    "zh-TW": {
      "name": "安吉白茶",
      "oneLine": "用春季葉色發白的品種做成，名字叫白茶，其實是綠茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "浙江安吉，海拔300~800米，春季葉色發白時採摘。",
      "process": "炒青 → 揉捻 → 乾燥，葉薄，低溫短炒。",
      "story": "1980年代在安吉發現一株野生茶樹，其後繁殖推廣。",
      "flavor": "胺基酸高，鮮味突出，幾乎不澀，湯色極淺。",
      "pairing": "白肉魚、豆腐、不甜的糕點。",
      "brewTip": "75~80度，久泡則草氣蓋過鮮味。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "安吉白茶 白葉一號 浙江 鮮爽"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "green-gougunao",
    "group": "green",
    "kind": "tea",
    "hanja": "狗",
    "sub": "Gougunao",
    "alias": [
      "구고뇌",
      "구구뇌"
    ],
    "hz": "狗牯腦",
    "hs": "狗牯脑",
    "rom": "Gougunao",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 건조. 개울가 안개가 많은 골짜기의 잎을 씁니다.",
        "1915년 파나마 만국박람회에서 금상을 받았다는 기록이 전합니다."
      ],
      "en": [
        "Fired, rolled, dried; the leaf comes from a misty valley site.",
        "Records say it took a gold medal at the 1915 Panama-Pacific exposition."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 干燥，鲜叶出自溪谷多雾的茶山。",
        "据记载1915年巴拿马万国博览会获金奖。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 乾燥，鮮葉出自溪谷多霧的茶山。",
        "據記載1915年巴拿馬萬國博覽會獲金獎。"
      ]
    },
    "ko": {
      "name": "구고뇌",
      "oneLine": "장시 오지의 안개 골짜기에서 나는, 난초 향의 가는 잎 녹차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분 15초, 2포 30초, 3포 45초.",
      "origin": "장시성 쑤이촨현 탕후진 일대, 해발 600~1,000m.",
      "process": "살청 → 유념 → 건조. 잎을 가늘게 비벼 말립니다.",
      "story": "1915년 파나마 만국박람회 금상 기록이 전합니다.",
      "flavor": "난초에 가까운 꽃 향과 부드러운 단맛, 떫음이 적습니다.",
      "pairing": "담백한 찜 요리, 죽, 견과.",
      "brewTip": "잎이 가늘어 80도면 충분합니다. 2포부터 향이 가장 좋습니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "구고뇌 쑤이촨 장시 난초향 녹차"
    },
    "en": {
      "name": "Gougunao",
      "oneLine": "Fine-leaf green tea with an orchid scent from a misty Jiangxi valley.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1¼ minutes, then 30 seconds, then 45.",
      "origin": "Tanghu, Suichuan county, Jiangxi, 600–1,000 m.",
      "process": "Fired, rolled into fine strands, dried.",
      "story": "Records credit it with a gold medal at the 1915 Panama-Pacific exposition.",
      "flavor": "Orchid-leaning florals, gentle sweetness, little astringency.",
      "pairing": "Light steamed dishes, congee, nuts.",
      "brewTip": "80 °C is enough for this thin leaf; the second infusion is the best.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Gougunao Suichuan Jiangxi orchid green tea"
    },
    "zh-CN": {
      "name": "狗牯脑",
      "oneLine": "江西深谷雾山里细条形的兰花香绿茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "江西遂川县汤湖一带，海拔600~1000米。",
      "process": "炒青 → 揉捻 → 干燥，揉成细条。",
      "story": "据记载1915年获巴拿马万国博览会金奖。",
      "flavor": "近似兰花的香气，回甘柔和，涩味轻。",
      "pairing": "清蒸菜、粥、坚果。",
      "brewTip": "叶细，80度即可；第二泡香气最好。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "狗牯脑 遂川 江西 兰香 绿茶"
    },
    "zh-TW": {
      "name": "狗牯腦",
      "oneLine": "江西深谷霧山裡細條形的蘭花香綠茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "江西遂川縣湯湖一帶，海拔600~1000米。",
      "process": "炒青 → 揉捻 → 乾燥，揉成細條。",
      "story": "據記載1915年獲巴拿馬萬國博覽會金獎。",
      "flavor": "近似蘭花的香氣，回甘柔和，澀味輕。",
      "pairing": "清蒸菜、粥、堅果。",
      "brewTip": "葉細，80度即可；第二泡香氣最好。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "狗牯腦 遂川 江西 蘭香 綠茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "green-wuyuan-mingmei",
    "group": "green",
    "kind": "tea",
    "hanja": "眉",
    "sub": "Wuyuan Mingmei",
    "alias": [
      "무원명미",
      "명미"
    ],
    "hz": "婺源茗眉",
    "hs": "婺源茗眉",
    "rom": "Wuyuan Mingmei",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "1958년에 만들어져 전국 명차 평가에서 이름을 얻었다고 전합니다.",
        "눈썹 모양으로 비튼 잎 — 이름의 ‘미(眉)’가 여기서 왔습니다."
      ],
      "en": [
        "Created in 1958 and later listed among China's famous teas, by the usual account.",
        "The leaf is rolled into an eyebrow shape — hence 'mei' (eyebrow) in the name."
      ],
      "zh-CN": [
        "1958年创制，后被评为全国名茶。",
        "揉成眉状，名字里的“眉”即由此而来。"
      ],
      "zh-TW": [
        "1958年創製，後被評為全國名茶。",
        "揉成眉狀，名字裡的「眉」即由此而來。"
      ]
    },
    "ko": {
      "name": "무원명미",
      "oneLine": "눈썹처럼 휘어진 잎, 장시 무원의 부드러운 녹차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분 15초, 2포 30초, 3포 45초.",
      "origin": "장시성 우위안현, 해발 300~800m. 안후이·장시 경계의 산간.",
      "process": "살청 → 유념 → 건조. 잎을 눈썹 모양으로 비벼 말립니다.",
      "story": "1958년 만들어졌고 이후 전국 명차로 꼽혔다고 전합니다.",
      "flavor": "부드러운 풀 향과 밤 같은 단맛, 떫음이 적습니다.",
      "pairing": "나물, 두부, 밥 반찬 전반.",
      "brewTip": "80도에서 짧게. 잎이 얇아 두 번이면 충분합니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "무원명미 우위안 장시 눈썹 모양 녹차"
    },
    "en": {
      "name": "Wuyuan Mingmei",
      "oneLine": "Eyebrow-curved leaf — a gentle green from Wuyuan, Jiangxi.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1¼ minutes, then 30 seconds, then 45.",
      "origin": "Wuyuan county, Jiangxi, 300–800 m, in the hills on the Anhui border.",
      "process": "Fired, rolled into an eyebrow shape, dried.",
      "story": "Created in 1958 and later counted among the national famous teas.",
      "flavor": "Soft grass, chestnut sweetness, little astringency.",
      "pairing": "Vegetable dishes, tofu, everyday rice meals.",
      "brewTip": "Brief at 80 °C; two infusions are plenty for this thin leaf.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Wuyuan Mingmei Jiangxi eyebrow green tea"
    },
    "zh-CN": {
      "name": "婺源茗眉",
      "oneLine": "眉形弯曲的叶片，江西婺源的柔和绿茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "江西婺源，海拔300~800米，皖赣交界的山区。",
      "process": "炒青 → 揉捻 → 干燥，揉成眉形。",
      "story": "1958年创制，后被评为全国名茶。",
      "flavor": "柔和的青草香与栗子般的甘甜，涩味轻。",
      "pairing": "家常蔬菜、豆腐、日常米饭。",
      "brewTip": "80度快出，叶薄两泡足够。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "婺源茗眉 江西 眉形 绿茶"
    },
    "zh-TW": {
      "name": "婺源茗眉",
      "oneLine": "眉形彎曲的葉片，江西婺源的柔和綠茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "江西婺源，海拔300~800米，皖贛交界的山區。",
      "process": "炒青 → 揉捻 → 乾燥，揉成眉形。",
      "story": "1958年創製，後被評為全國名茶。",
      "flavor": "柔和的青草香與慄子般的甘甜，澀味輕。",
      "pairing": "家常蔬菜、豆腐、日常米飯。",
      "brewTip": "80度快出，葉薄兩泡足夠。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "婺源茗眉 江西 眉形 綠茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "green-mengding-ganlu",
    "group": "green",
    "kind": "tea",
    "hanja": "甘",
    "sub": "Mengding Ganlu",
    "alias": [
      "몽정감로",
      "감로"
    ],
    "hz": "蒙頂甘露",
    "hs": "蒙顶甘露",
    "rom": "Mengding Ganlu",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 삼초(三炒) → 삼유(三揉)로 잎을 곱게 비벼 말립니다.",
        "당대부터 몽정산 차가 공차로 올라갔다는 기록이 있어, 이름난 차 가운데서도 유서가 깊습니다."
      ],
      "en": [
        "Fired, rolled, then fired and rolled twice more, which gives the fine curl.",
        "Mengding tea was already sent to the Tang court as tribute — one of the longest records in Chinese tea."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 三炒三揉，揉成细卷。",
        "唐代蒙顶茶即为贡茶，渊源在名茶中数一数二。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 三炒三揉，揉成細卷。",
        "唐代蒙頂茶即為貢茶，淵源在名茶中數一數二。"
      ]
    },
    "ko": {
      "name": "몽정감로",
      "oneLine": "몽정산에서 내려온, 곱게 꼬인 쓰촨의 명차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분 15초, 2포 30초, 3포 45초.",
      "origin": "쓰촨성 야안 몽정산, 해발 1,000~1,400m.",
      "process": "살청 → 유념 → 세 번 덖고 세 번 비비는 삼초삼유로 잎을 곱게 꼬아 말립니다.",
      "story": "몽정차는 당대에 이미 공차로 올라갔고, ‘감로’라는 이름의 차는 명대에 만들어졌다는 설이 전합니다.",
      "flavor": "밤과 콩의 고소함, 부드러운 단맛, 끝이 깨끗합니다.",
      "pairing": "쌀밥, 나물, 담백한 국.",
      "brewTip": "80도. 잎이 곱게 꼬여 있어 1분이면 충분합니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "몽정감로 야안 쓰촨 공차 삼초삼유"
    },
    "en": {
      "name": "Mengding Ganlu",
      "oneLine": "A finely curled Sichuan classic from Mount Mengding.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1¼ minutes, then 30 seconds, then 45.",
      "origin": "Mount Mengding, Ya'an, Sichuan, 1,000–1,400 m.",
      "process": "Fired, rolled, then fired and rolled twice more — the 'three fires, three rolls' that make the fine curl.",
      "story": "Records already list Mengding tea as Tang-dynasty tribute.",
      "flavor": "Chestnut and soy roastiness, soft sweetness, a clean finish.",
      "pairing": "Rice, vegetables, light soups.",
      "brewTip": "80 °C; the tight curl gives everything up in a minute.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Mengding Ganlu Ya'an Sichuan tribute tea"
    },
    "zh-CN": {
      "name": "蒙顶甘露",
      "oneLine": "四川蒙顶的细卷名茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "四川雅安蒙顶山，海拔1000~1400米。",
      "process": "炒青 → 揉捻 → 三炒三揉，揉成细卷后干燥。",
      "story": "蒙顶茶唐代已列为贡茶，“甘露”之名相传创于明代。",
      "flavor": "栗子与豆香，回甘柔和，收尾干净。",
      "pairing": "米饭、蔬菜、清淡汤品。",
      "brewTip": "80度，卷曲紧，一分钟即可。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "蒙顶甘露 雅安 四川 贡茶"
    },
    "zh-TW": {
      "name": "蒙頂甘露",
      "oneLine": "四川蒙頂的細卷名茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "四川雅安蒙頂山，海拔1000~1400米。",
      "process": "炒青 → 揉捻 → 三炒三揉，揉成細卷後乾燥。",
      "story": "蒙頂茶唐代已列為貢茶，「甘露」之名相傳創於明代。",
      "flavor": "慄子與豆香，回甘柔和，收尾乾淨。",
      "pairing": "米飯、蔬菜、清淡湯品。",
      "brewTip": "80度，捲曲緊，一分鐘即可。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "蒙頂甘露 雅安 四川 貢茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "green-hanzhong-xianhao",
    "group": "green",
    "kind": "tea",
    "hanja": "仙",
    "sub": "Hanzhong Xianhao",
    "alias": [
      "한중선호",
      "오자선호"
    ],
    "hz": "漢中仙毫",
    "hs": "汉中仙毫",
    "rom": "Hanzhong Xianhao",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "한중은 중국 차 산지 가운데 북쪽 끝에 가깝습니다. 겨울이 길어 봄 채취가 늦고 잎이 두껍습니다.",
        "2007년 한중 지역의 여러 이름을 ‘한중선호’로 묶어 부르기 시작했습니다."
      ],
      "en": [
        "Hanzhong sits near the northern edge of Chinese tea country: long winters, a late spring flush, thicker leaf.",
        "In 2007 the area's various tea names were brought under one label, Hanzhong Xianhao."
      ],
      "zh-CN": [
        "汉中接近中国茶区北缘，冬季长、春茶来得晚、叶质厚。",
        "2007年起把汉中各地名茶统一称为“汉中仙毫”。"
      ],
      "zh-TW": [
        "漢中接近中國茶區北緣，冬季長、春茶來得晚、葉質厚。",
        "2007年起把漢中各地名茶統一稱為「漢中仙毫」。"
      ]
    },
    "ko": {
      "name": "한중선호",
      "oneLine": "중국 차 산지의 북쪽 끝, 긴 겨울을 견딘 두꺼운 봄잎.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분 15초, 2포 30초, 3포 45초.",
      "origin": "산시성 한중, 친링산맥 남쪽 기슭 해발 600~1,200m.",
      "process": "살청 → 유념 → 건조. 싹을 곧게 비벼 말립니다.",
      "story": "2007년 한중 지역의 여러 차 이름을 ‘한중선호’로 묶었습니다.",
      "flavor": "풀 향과 옅은 꽃 향, 단맛이 오래 남고 떫음이 적습니다.",
      "pairing": "담백한 면 요리, 나물, 견과.",
      "brewTip": "잎이 두꺼워 80도에서 1분 15초. 2포에서 단맛이 살아납니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "한중선호 산시 친링 북쪽 차밭"
    },
    "en": {
      "name": "Hanzhong Xianhao",
      "oneLine": "From the northern edge of Chinese tea country: thick spring leaf after a long winter.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1¼ minutes, then 30 seconds, then 45.",
      "origin": "Hanzhong, Shaanxi, on the south slopes of the Qinling range, 600–1,200 m.",
      "process": "Fired, rolled straight, dried.",
      "story": "In 2007 the area's separate tea names were unified as Hanzhong Xianhao.",
      "flavor": "Grass and faint flowers, a lasting sweetness, low astringency.",
      "pairing": "Plain noodles, vegetables, nuts.",
      "brewTip": "The thick leaf wants 1¼ minutes at 80 °C; sweetness shows in the second infusion.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Hanzhong Xianhao Shaanxi Qinling northern tea"
    },
    "zh-CN": {
      "name": "汉中仙毫",
      "oneLine": "中国茶区北缘，熬过漫长冬季的厚实春叶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "陕西汉中，秦岭南麓，海拔600~1200米。",
      "process": "炒青 → 揉捻 → 干燥，揉成直条。",
      "story": "2007年把汉中各地茶名统一为“汉中仙毫”。",
      "flavor": "青草与淡花香，回甘持久，涩味轻。",
      "pairing": "清汤面、蔬菜、坚果。",
      "brewTip": "叶厚，80度一分十五秒；第二泡出甜。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "汉中仙毫 陕西 秦岭 北缘茶区"
    },
    "zh-TW": {
      "name": "漢中仙毫",
      "oneLine": "中國茶區北緣，熬過漫長冬季的厚實春葉。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "陝西漢中，秦嶺南麓，海拔600~1200米。",
      "process": "炒青 → 揉捻 → 乾燥，揉成直條。",
      "story": "2007年把漢中各地茶名統一為「漢中仙毫」。",
      "flavor": "青草與淡花香，回甘持久，澀味輕。",
      "pairing": "清湯麵、蔬菜、堅果。",
      "brewTip": "葉厚，80度一分十五秒；第二泡出甜。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "漢中仙毫 陝西 秦嶺 北緣茶區"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "green-huiming",
    "group": "green",
    "kind": "tea",
    "hanja": "惠",
    "sub": "Huiming Tea",
    "alias": [
      "혜명차",
      "경녕혜명"
    ],
    "hz": "惠明茶",
    "hs": "惠明茶",
    "rom": "Huiming Cha",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 건조. 싹이 곧고 잎이 여려 낮은 온도에서 덖습니다.",
        "저장성 징닝의 산사 혜명사 주변에서 시작된 차로, 절 이름이 차 이름이 되었습니다."
      ],
      "en": [
        "Fired, rolled, dried at low heat because the buds are tender.",
        "It grew up around Huiming temple in Jingning, Zhejiang — the temple gave the tea its name."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 干燥，芽嫩，低温轻炒。",
        "产于浙江景宁惠明寺一带，寺名成了茶名。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 乾燥，芽嫩，低溫輕炒。",
        "產於浙江景寧惠明寺一帶，寺名成了茶名。"
      ]
    },
    "ko": {
      "name": "혜명",
      "oneLine": "절 이름을 그대로 가진, 저장 산사의 봄잎.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분, 2포 30초, 3포 45초.",
      "origin": "저장성 징닝현 츠무산 일대, 해발 600~1,000m.",
      "process": "살청 → 유념 → 건조. 싹을 곧게 비벼 말립니다.",
      "story": "혜명사 주변에서 재배가 시작되어 절 이름이 차 이름이 되었습니다.",
      "flavor": "옅은 꽃 향과 풀 향, 깨끗한 단맛.",
      "pairing": "죽, 나물, 담백한 생선.",
      "brewTip": "80도에서 1분. 잎이 여려 오래 우리면 씁니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "혜명차 징닝 저장 산사 녹차"
    },
    "en": {
      "name": "Huiming Tea",
      "oneLine": "Spring leaf from a Zhejiang mountain temple that gave the tea its name.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1 minute, then 30 seconds, then 45.",
      "origin": "Around Mount Chimu, Jingning county, Zhejiang, 600–1,000 m.",
      "process": "Fired, rolled straight, dried.",
      "story": "Cultivation began around Huiming temple, and the temple name became the tea's name.",
      "flavor": "Faint flowers with grass, a clean sweetness.",
      "pairing": "Congee, vegetables, light fish.",
      "brewTip": "One minute at 80 °C; the tender leaf turns bitter if left.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Huiming tea Jingning Zhejiang temple green tea"
    },
    "zh-CN": {
      "name": "惠明茶",
      "oneLine": "以寺为名，浙江山寺边的春芽。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分钟，第二泡30秒，第三泡45秒。",
      "origin": "浙江景宁敕木山一带，海拔600~1000米。",
      "process": "炒青 → 揉捻 → 干燥，揉成直条。",
      "story": "始于惠明寺周边栽培，寺名成了茶名。",
      "flavor": "淡花香与青草气，甘净。",
      "pairing": "粥、蔬菜、清蒸鱼。",
      "brewTip": "80度一分钟，久泡发涩。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "惠明茶 景宁 浙江 寺茶"
    },
    "zh-TW": {
      "name": "惠明茶",
      "oneLine": "以寺為名，浙江山寺邊的春芽。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分鐘，第二泡30秒，第三泡45秒。",
      "origin": "浙江景寧敕木山一帶，海拔600~1000米。",
      "process": "炒青 → 揉捻 → 乾燥，揉成直條。",
      "story": "始於惠明寺周邊栽培，寺名成了茶名。",
      "flavor": "淡花香與青草氣，甘淨。",
      "pairing": "粥、蔬菜、清蒸魚。",
      "brewTip": "80度一分鐘，久泡發澀。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "惠明茶 景寧 浙江 寺茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "green-boseong",
    "group": "green",
    "kind": "tea",
    "hanja": "寶",
    "sub": "Green Tea (Boseong)",
    "alias": [
      "보성 녹차",
      "보성차"
    ],
    "hz": "寶城綠茶",
    "hs": "宝城绿茶",
    "rom": "Nokcha (Boseong)",
    "temp": 75,
    "tempRange": "70~80℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      90,
      30,
      60
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-roast b-medium k-sweet r-clean s-hot s-iced w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "살청(덖음) → 유념 → 건조. 대량 생산은 기계 덖음, 소규모 농가는 손덖음을 함께 씁니다.",
        "전남 보성은 한국에서 차밭이 가장 넓게 이어지는 곳입니다. 봄부터 초여름까지 우전·세작·중작·대작을 이어 땁니다."
      ],
      "en": [
        "Pan-fired, rolled, dried — machine-fired at scale, hand-fired on small farms.",
        "Boseong in Jeollanam-do has the widest tea fields in Korea, picking ujeon through daejak from spring into early summer."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 干燥，量产多用机炒，小农户仍手工炒制。",
        "全罗南道宝城是韩国茶田最连片的地方，从春到初夏依次采雨前、细雀、中雀、大雀。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 乾燥，量產多用機炒，小農戶仍手工炒制。",
        "全羅南道寶城是韓國茶田最連片的地方，從春到初夏依次採雨前、細雀、中雀、大雀。"
      ]
    },
    "ko": {
      "name": "녹차 (보성)",
      "oneLine": "한국에서 차밭이 가장 넓게 이어지는 곳, 보성의 봄잎.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3~4회",
      "steepBasis": "75도에서 1분 30초, 2포 30초, 3포 1분.",
      "origin": "전라남도 보성군 일대, 해발 100~400m의 구릉 차밭.",
      "process": "살청(덖음) → 유념 → 건조. 규모에 따라 기계 덖음과 손덖음이 나뉩니다.",
      "story": "보성의 차밭은 1939년 조성된 뒤 한국 차 재배의 중심으로 자리 잡았습니다.",
      "flavor": "구수한 덖음 향과 풀 향이 겹치고, 단맛이 뒤따릅니다. 대작으로 갈수록 떫음이 늘어납니다.",
      "pairing": "나물, 생선구이, 김. 보리밥과도 잘 맞습니다.",
      "brewTip": "70~75도. 대작은 85~90도에서 짧게 우려도 됩니다.",
      "keep": "개봉 후 한 달 안. 냉장 보관하고 습기를 피합니다.",
      "keywords": "보성 녹차 전남 대한다원 우전 세작 중작 대작"
    },
    "en": {
      "name": "Green Tea (Boseong)",
      "oneLine": "Korea's widest tea fields — spring leaf from Boseong.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3–4 infusions",
      "steepBasis": "75 °C: 1½ minutes, then 30 seconds, then 1 minute.",
      "origin": "Boseong county, Jeollanam-do, rolling fields at 100–400 m.",
      "process": "Pan-fired, rolled, dried; machine-fired at scale, hand-fired on small farms.",
      "story": "Boseong's fields were planted from 1939 and became the centre of Korean tea growing.",
      "flavor": "Roasted and grassy at once, with sweetness behind; later pickings turn more astringent.",
      "pairing": "Vegetables, grilled fish, seaweed, barley rice.",
      "brewTip": "70–75 °C; the coarse daejak can take 85–90 °C briefly.",
      "keep": "Within a month of opening, cold and dry.",
      "keywords": "Boseong green tea Korea ujeon sejak jungjak daejak"
    },
    "zh-CN": {
      "name": "宝城绿茶",
      "oneLine": "韩国茶田最连片之处，宝城的春叶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3~4泡",
      "steepBasis": "75度泡1分30秒，第二泡30秒，第三泡1分钟。",
      "origin": "全罗南道宝城郡，海拔100~400米的丘陵茶田。",
      "process": "炒青 → 揉捻 → 干燥，量產用机炒，小农手工炒制。",
      "story": "宝城茶田自1939年开垦，此后成为韩国茶叶主产区。",
      "flavor": "炒香与青草香交叠，回甘在后；越到晚采越涩。",
      "pairing": "凉拌菜、烤鱼、紫菜、大麦饭。",
      "brewTip": "70~75度；粗老的大雀可用85~90度短泡。",
      "keep": "开封后一个月内，冷藏防潮。",
      "keywords": "宝城绿茶 全罗南道 雨前 细雀 中雀 大雀"
    },
    "zh-TW": {
      "name": "寶城綠茶",
      "oneLine": "韓國茶田最連片之處，寶城的春葉。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3~4泡",
      "steepBasis": "75度泡1分30秒，第二泡30秒，第三泡1分鐘。",
      "origin": "全羅南道寶城郡，海拔100~400米的丘陵茶田。",
      "process": "炒青 → 揉捻 → 乾燥，量產用機炒，小農手工炒制。",
      "story": "寶城茶田自1939年開墾，此後成為韓國茶葉主產區。",
      "flavor": "炒香與青草香交疊，回甘在後；越到晚採越澀。",
      "pairing": "涼拌菜、烤魚、紫菜、大麥飯。",
      "brewTip": "70~75度；粗老的大雀可用85~90度短泡。",
      "keep": "開封後一個月內，冷藏防潮。",
      "keywords": "寶城綠茶 全羅南道 雨前 細雀 中雀 大雀"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "green-sanxia-biluochun",
    "group": "green",
    "kind": "tea",
    "hanja": "峡",
    "sub": "Biluochun (Sanxia)",
    "alias": [
      "삼협 벽라춘",
      "대만 벽라춘"
    ],
    "hz": "三峽碧螺春",
    "hs": "三峡碧螺春",
    "rom": "Biluochun (Sanxia)",
    "temp": 75,
    "tempRange": "70~80℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-fruit b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-refresh",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "台灣"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 건조. 나선형으로 곱게 꼬아 말립니다.",
        "대만 신베이 삼협 지역은 1940년대 이후 중국식 녹차를 만들어 온 곳입니다. 이름은 장쑤 둥팅의 벽라춘에서 왔습니다."
      ],
      "en": [
        "Fired, rolled into fine spirals, dried.",
        "Sanxia, in New Taipei, has made Chinese-style green tea since the 1940s; the name comes from Biluochun of Dongting, Jiangsu."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 干燥，揉成细螺状。",
        "新北三峡自1940年代起制作中国式绿茶，名字源自江苏洞庭碧螺春。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 乾燥，揉成細螺狀。",
        "新北三峽自1940年代起製作中國式綠茶，名字源自江蘇洞庭碧螺春。"
      ]
    },
    "ko": {
      "name": "벽라춘 (삼협)",
      "oneLine": "대만에서 이어 온 중국식 녹차 — 달콤한 나선 잎.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "75도에서 1분, 2포 30초, 3포 45초.",
      "origin": "신베이시 삼협구 일대, 해발 200~600m의 구릉.",
      "process": "살청 → 유념 → 건조. 잎을 가는 나선으로 꼬아 말립니다.",
      "story": "1940년대 이후 삼협 지역에서 중국식 녹차 제법이 자리 잡았고, ‘벽라춘’이라는 이름은 1998년에 붙었습니다.",
      "flavor": "풋풀 향과 옅은 과일 단맛, 떫음이 적고 물색이 맑습니다.",
      "pairing": "담백한 중식, 흰살생선, 가벼운 디저트.",
      "brewTip": "75도. 잎이 곱게 꼬여 1분이면 충분합니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "삼협 벽라춘 대만 신베이 녹차 나선"
    },
    "en": {
      "name": "Biluochun (Sanxia)",
      "oneLine": "Taiwan's Chinese-style green tea — sweet spiral leaf.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "75 °C: 1 minute, then 30 seconds, then 45.",
      "origin": "Sanxia district, New Taipei, hills at 200–600 m.",
      "process": "Fired, rolled into fine spirals, dried.",
      "story": "Chinese green-tea methods took root in Sanxia from the 1940s; the name Biluochun was adopted in 1998.",
      "flavor": "Green-grass aroma, faint fruit sweetness, low astringency, clear liquor.",
      "pairing": "Light Chinese dishes, white fish, simple desserts.",
      "brewTip": "75 °C; the fine spiral gives up its flavour in a minute.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Sanxia Biluochun Taiwan New Taipei green tea spiral"
    },
    "zh-CN": {
      "name": "三峡碧螺春",
      "oneLine": "台湾延续的中国式绿茶，甜润的螺旋形叶片。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "75度泡1分钟，第二泡30秒，第三泡45秒。",
      "origin": "新北市三峡区，海拔200~600米丘陵。",
      "process": "炒青 → 揉捻 → 干燥，揉成细螺状。",
      "story": "1940年代起三峡引入中国式绿茶制法，“碧螺春”之名于1998年采用。",
      "flavor": "清草香与淡果甜，涩味轻，汤色清亮。",
      "pairing": "清淡中餐、白肉鱼、简单甜点。",
      "brewTip": "75度，一分钟即可。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "三峡碧螺春 台湾 新北 绿茶 螺形"
    },
    "zh-TW": {
      "name": "三峽碧螺春",
      "oneLine": "臺灣延續的中國式綠茶，甜潤的螺旋形葉片。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "75度泡1分鐘，第二泡30秒，第三泡45秒。",
      "origin": "新北市三峽區，海拔200~600米丘陵。",
      "process": "炒青 → 揉捻 → 乾燥，揉成細螺狀。",
      "story": "1940年代起三峽引入中國式綠茶製法，「碧螺春」之名於1998年採用。",
      "flavor": "清草香與淡果甜，澀味輕，湯色清亮。",
      "pairing": "清淡中餐、白肉魚、簡單甜點。",
      "brewTip": "75度，一分鐘即可。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "三峽碧螺春 臺灣 新北 綠茶 螺形"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "green-kabusecha",
    "group": "green",
    "kind": "tea",
    "hanja": "冠",
    "sub": "Kabusecha",
    "alias": [
      "카부세차",
      "관차"
    ],
    "hz": "冠茶",
    "hs": "冠茶",
    "rom": "Kabusecha",
    "temp": 70,
    "tempRange": "60~75℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      90,
      30,
      60
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-herb b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
    "originCountry": {
      "ko": "일본",
      "en": "Japan",
      "zh-CN": "日本",
      "zh-TW": "日本"
    },
    "x": {
      "ko": [
        "증청 → 유념 → 건조. 차광으로 아미노산이 늘고 카테킨이 줄어 감칠맛이 올라갑니다.",
        "수확 전 1~2주만 차광막을 덮는 방식이라, 옥로(20일 안팎)와 센차(차광 없음) 사이에 놓입니다."
      ],
      "en": [
        "Steamed, rolled, dried. Shading raises amino acids and lowers catechins, so umami goes up.",
        "Covered for only one to two weeks before harvest — between gyokuro (about 20 days) and sencha (no cover)."
      ],
      "zh-CN": [
        "蒸青 → 揉捻 → 干燥，遮光提高氨基酸、降低儿茶素。",
        "采前只遮光1~2周，介于玉露（约20天）与煎茶（不遮光）之间。"
      ],
      "zh-TW": [
        "蒸青 → 揉捻 → 乾燥，遮光提高胺基酸、降低兒茶素。",
        "採前只遮光1~2周，介於玉露（約20天）與煎茶（不遮光）之間。"
      ]
    },
    "ko": {
      "name": "카부세",
      "oneLine": "수확 전 짧게 가린 잎 — 센차와 옥로 사이의 감칠맛.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "65~70도에서 1분 30초, 2포 30초, 3포 1분.",
      "origin": "일본 미에현이 최대 산지이고 규슈 등지에서도 만듭니다. 수확 1~2주 전 차광막을 덮은 잎.",
      "process": "차광 → 증청 → 유념 → 건조.",
      "story": "차광 기간을 달리해 센차·카부세차·옥로의 등급을 나누는 관행이 일본에서 자리 잡았습니다.",
      "flavor": "감칠맛이 진하고 떫음이 적습니다. 해조류와 단맛이 겹칩니다.",
      "pairing": "회, 달걀 요리, 밥.",
      "brewTip": "60~70도. 뜨거운 물이면 감칠맛보다 떫음이 앞섭니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "카부세차 관차 일본 차광 증청 감칠맛"
    },
    "en": {
      "name": "Kabusecha",
      "oneLine": "Briefly shaded leaf — the umami between sencha and gyokuro.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "65–70 °C: 1½ minutes, then 30 seconds, then 1 minute.",
      "origin": "Mie is the largest producer, with Kyushu and elsewhere in Japan; leaf shaded one or two weeks before picking.",
      "process": "Shaded, steamed, rolled, dried.",
      "story": "Japan grades sencha, kabusecha and gyokuro partly by how long the bushes are covered.",
      "flavor": "Deep umami, little astringency, seaweed and sweetness together.",
      "pairing": "Sashimi, egg dishes, rice.",
      "brewTip": "60–70 °C; hotter water turns umami into astringency.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Kabusecha Japan shaded green tea umami"
    },
    "zh-CN": {
      "name": "冠茶",
      "oneLine": "采前短期遮光，介于煎茶与玉露之间的鲜味。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "65~70度泡1分30秒，第二泡30秒，第三泡1分钟。",
      "origin": "日本三重县为最大产地，九州等地也有，采前1~2周遮光。",
      "process": "遮光 → 蒸青 → 揉捻 → 干燥。",
      "story": "日本以遮光时间区分煎茶、冠茶与玉露。",
      "flavor": "鲜味浓、涩味轻，海藻气与甜味并存。",
      "pairing": "生鱼片、蛋类料理、米饭。",
      "brewTip": "60~70度，水温高则涩味盖过鲜味。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "冠茶 日本 遮光 蒸青 鲜味"
    },
    "zh-TW": {
      "name": "冠茶",
      "oneLine": "採前短期遮光，介於煎茶與玉露之間的鮮味。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "65~70度泡1分30秒，第二泡30秒，第三泡1分鐘。",
      "origin": "日本三重縣為最大產地，九州等地也有，採前1~2周遮光。",
      "process": "遮光 → 蒸青 → 揉捻 → 乾燥。",
      "story": "日本以遮光時間區分煎茶、冠茶與玉露。",
      "flavor": "鮮味濃、澀味輕，海藻氣與甜味並存。",
      "pairing": "生魚片、蛋類料理、米飯。",
      "brewTip": "60~70度，水溫高則澀味蓋過鮮味。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "冠茶 日本 遮光 蒸青 鮮味"
    },
    "originCountryCode": "jp"
  },
  {
    "id": "green-kamairicha",
    "group": "green",
    "kind": "tea",
    "hanja": "釜",
    "sub": "Kamairicha",
    "alias": [
      "카마이리차",
      "솥덖음 일본차"
    ],
    "hz": "釜炒茶",
    "hs": "釜炒茶",
    "rom": "Kamairicha",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-roast a-grass b-medium k-sweet r-clean s-hot s-iced w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "일본",
      "en": "Japan",
      "zh-CN": "日本",
      "zh-TW": "日本"
    },
    "x": {
      "ko": [
        "살청(솥 덖음) → 유념 → 건조. 찌지 않아 해조류 향 대신 구수한 향이 납니다.",
        "일본 녹차는 대부분 증청이지만, 규슈 우레시노 등에서는 솥에 덖는 중국식 제법이 남아 있습니다."
      ],
      "en": [
        "Pan-fired, rolled, dried: no steaming, so the cup is toasty rather than seaweed-like.",
        "Most Japanese green tea is steamed, but wok-firing survives in Kyushu, notably Ureshino."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 干燥，不蒸，香气偏炒米而非海藻。",
        "日本绿茶多为蒸青，九州嬉野等地仍保留锅炒的中国式做法。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 乾燥，不蒸，香氣偏炒米而非海藻。",
        "日本綠茶多為蒸青，九州嬉野等地仍保留鍋炒的中國式做法。"
      ]
    },
    "ko": {
      "name": "카마이리",
      "oneLine": "일본에서 드물게 솥에 덖는 녹차 — 구수함이 남는 잎.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분 15초, 2포 30초, 3포 45초.",
      "origin": "규슈 사가현 우레시노 등, 솥덖음 제법이 남은 산지.",
      "process": "살청(솥 덖음) → 유념 → 건조.",
      "story": "에도 시대에 중국식 덖음 제법이 규슈로 들어와 지금까지 이어졌다고 전합니다.",
      "flavor": "볶은 곡물 같은 고소함과 가벼운 단맛, 해조류 향이 적습니다.",
      "pairing": "구운 생선, 밥, 튀김.",
      "brewTip": "80도. 차가운 물에 오래 우리는 물출수도 잘 맞습니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "카마이리차 솥덖음 규슈 우레시노 일본 녹차"
    },
    "en": {
      "name": "Kamairicha",
      "oneLine": "Japan's rare wok-fired green tea — toasty rather than seaweedy.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1¼ minutes, then 30 seconds, then 45.",
      "origin": "Ureshino, Saga and other Kyushu sites where wok-firing survived.",
      "process": "Pan-fired, rolled, dried.",
      "story": "Chinese-style firing is said to have reached Kyushu in the Edo period and stayed.",
      "flavor": "Roasted-grain sweetness, mild, with little seaweed character.",
      "pairing": "Grilled fish, rice, fried food.",
      "brewTip": "80 °C; it also cold-brews well.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Kamairicha pan-fired Japanese green tea Ureshino Kyushu"
    },
    "zh-CN": {
      "name": "釜炒茶",
      "oneLine": "日本少见的锅炒绿茶，偏炒香而非海藻气。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "九州佐贺嬉野等保留锅炒工艺的产地。",
      "process": "炒青 → 揉捻 → 干燥。",
      "story": "相传江户时代中国式炒青传入九州并延续至今。",
      "flavor": "炒米般的香与轻甜，海藻气少。",
      "pairing": "烤鱼、米饭、油炸物。",
      "brewTip": "80度，也适合冷泡。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "釜炒茶 日本 九州 嬉野 炒青"
    },
    "zh-TW": {
      "name": "釜炒茶",
      "oneLine": "日本少見的鍋炒綠茶，偏炒香而非海藻氣。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "九州佐賀嬉野等保留鍋炒工藝的產地。",
      "process": "炒青 → 揉捻 → 乾燥。",
      "story": "相傳江戶時代中國式炒青傳入九州並延續至今。",
      "flavor": "炒米般的香與輕甜，海藻氣少。",
      "pairing": "烤魚、米飯、油炸物。",
      "brewTip": "80度，也適合冷泡。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "釜炒茶 日本 九州 嬉野 炒青"
    },
    "originCountryCode": "jp"
  },
  {
    "id": "green-dafo-longjing",
    "group": "green",
    "kind": "tea",
    "hanja": "佛",
    "sub": "Dafo Longjing",
    "alias": [
      "대불용정",
      "신창용정"
    ],
    "hz": "大佛龍井",
    "hs": "大佛龙井",
    "rom": "Dafo Longjing",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-roast a-grass b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 압압 → 건조. 손바닥으로 눌러 납작하게 만듭니다.",
        "저장성 신창현에서 만드는 용정 계열 녹차입니다. 시후 용정보다 채취가 이르고 가격이 낮은 편입니다."
      ],
      "en": [
        "Fired, rolled, pressed flat by hand, dried.",
        "A Longjing-style green made in Xinchang, Zhejiang: picked earlier and cheaper than West Lake Longjing."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 压扁 → 干燥。",
        "浙江新昌的龙井类绿茶，采摘比西湖龙井早，价格更亲民。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 壓扁 → 乾燥。",
        "浙江新昌的龍井類綠茶，採摘比西湖龍井早，價格更親民。"
      ]
    },
    "ko": {
      "name": "대불용정",
      "oneLine": "시후 용정보다 이르게 나오는, 눌러 편 저장의 녹차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분, 2포 30초, 3포 45초.",
      "origin": "저장성 신창현, 해발 300~700m.",
      "process": "살청 → 유념 → 압압 → 건조. 손으로 눌러 납작하게 만듭니다.",
      "story": "신창의 대불사 이름을 딴 차로, 1980년대 이후 생산이 크게 늘었습니다.",
      "flavor": "볶은 콩 같은 고소함과 가벼운 단맛. 시후 용정보다 향이 조금 거칩니다.",
      "pairing": "볶음 요리, 새우, 두부.",
      "brewTip": "80도에서 1분. 잎이 납작해 금방 우러납니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "대불용정 신창 저장 용정 납작 녹차"
    },
    "en": {
      "name": "Dafo Longjing",
      "oneLine": "An earlier, everyday Longjing-style leaf from Zhejiang.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1 minute, then 30 seconds, then 45.",
      "origin": "Xinchang county, Zhejiang, 300–700 m.",
      "process": "Fired, rolled, pressed flat by hand, dried.",
      "story": "Named for the Dafo temple in Xinchang; output grew sharply from the 1980s.",
      "flavor": "Roasted-soy sweetness, a little rougher aromatically than West Lake Longjing.",
      "pairing": "Stir-fries, shrimp, tofu.",
      "brewTip": "One minute at 80 °C; the flat leaf gives up quickly.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Dafo Longjing Xinchang Zhejiang flat green tea"
    },
    "zh-CN": {
      "name": "大佛龙井",
      "oneLine": "比西湖龙井上市更早的日常龙井。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分钟，第二泡30秒，第三泡45秒。",
      "origin": "浙江新昌，海拔300~700米。",
      "process": "炒青 → 揉捻 → 压扁 → 干燥。",
      "story": "因新昌大佛寺得名，1980年代后产量大增。",
      "flavor": "炒豆香与轻甜，香气比西湖龙井略粗。",
      "pairing": "小炒、虾仁、豆腐。",
      "brewTip": "80度一分钟即出。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "大佛龙井 新昌 浙江 扁形绿茶"
    },
    "zh-TW": {
      "name": "大佛龍井",
      "oneLine": "比西湖龍井上市更早的日常龍井。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分鐘，第二泡30秒，第三泡45秒。",
      "origin": "浙江新昌，海拔300~700米。",
      "process": "炒青 → 揉捻 → 壓扁 → 乾燥。",
      "story": "因新昌大佛寺得名，1980年代後產量大增。",
      "flavor": "炒豆香與輕甜，香氣比西湖龍井略粗。",
      "pairing": "小炒、蝦仁、豆腐。",
      "brewTip": "80度一分鐘即出。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "大佛龍井 新昌 浙江 扁形綠茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "green-laoshan",
    "group": "green",
    "kind": "tea",
    "hanja": "嶗",
    "sub": "Green Tea (Laoshan)",
    "alias": [
      "노산녹차",
      "라오산 녹차"
    ],
    "hz": "嶗山綠茶",
    "hs": "崂山绿茶",
    "rom": "Lucha (Laoshan)",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      75,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "산둥 칭다오의 노산은 중국 차 산지 가운데 북쪽 끝입니다. 바닷바람과 화강암 토양에서 잎이 두껍게 자랍니다.",
        "1959년 남방 차나무를 옮겨 심어 재배가 시작되었다는 기록이 있습니다."
      ],
      "en": [
        "Laoshan, near Qingdao in Shandong, is about as far north as Chinese tea is grown: sea wind and granite soil give a thicker leaf.",
        "Records date the planting of southern bushes here to 1959."
      ],
      "zh-CN": [
        "山东青岛崂山是中国最北的茶区之一，海风与花岗岩土让叶质更厚。",
        "据记载1959年从南方引种茶苗开始栽培。"
      ],
      "zh-TW": [
        "山東青島嶗山是中國最北的茶區之一，海風與花崗巖土讓葉質更厚。",
        "據記載1959年從南方引種茶苗開始栽培。"
      ]
    },
    "ko": {
      "name": "녹차 (노산)",
      "oneLine": "중국 차 산지의 북쪽 끝, 바닷바람이 만든 두꺼운 잎.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "80도에서 1분 15초, 2포 30초, 3포 45초.",
      "origin": "산둥성 칭다오 노산, 해발 200~600m.",
      "process": "살청 → 유념 → 건조. 잎이 두꺼워 덖는 시간이 조금 깁니다.",
      "story": "1959년 남쪽에서 차나무를 옮겨 심어 재배가 시작되었다고 기록되어 있습니다.",
      "flavor": "구수한 볶음 향과 진한 단맛, 잎이 두꺼워 우린 횟수가 깁니다.",
      "pairing": "해산물, 만두, 볶음 요리.",
      "brewTip": "80도에서 1분 15초. 3포까지도 향이 남습니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "노산녹차 라오산 녹차 칭다오 산둥 북방 차밭"
    },
    "en": {
      "name": "Green Tea (Laoshan)",
      "oneLine": "Northern edge of Chinese tea: thick leaf grown in sea wind.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "80 °C: 1¼ minutes, then 30 seconds, then 45.",
      "origin": "Laoshan, Qingdao, Shandong, 200–600 m.",
      "process": "Fired, rolled, dried — a little longer, for a thicker leaf.",
      "story": "Planting of southern bushes here is recorded from 1959.",
      "flavor": "Toasty roast and solid sweetness; the thick leaf lasts several infusions.",
      "pairing": "Seafood, dumplings, stir-fries.",
      "brewTip": "1¼ minutes at 80 °C; aroma still there in the third infusion.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Laoshan green tea Qingdao Shandong northern tea"
    },
    "zh-CN": {
      "name": "崂山绿茶",
      "oneLine": "中国茶区北缘，海风养出的厚叶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "山东青岛崂山，海拔200~600米。",
      "process": "炒青 → 揉捻 → 干燥，叶厚，炒制稍久。",
      "story": "据记载1959年由南方引种开始栽培。",
      "flavor": "炒香与厚实的甘甜，耐泡。",
      "pairing": "海鲜、饺子、家常小炒。",
      "brewTip": "80度一分十五秒，第三泡仍有香。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "崂山绿茶 青岛 山东 北方茶区"
    },
    "zh-TW": {
      "name": "嶗山綠茶",
      "oneLine": "中國茶區北緣，海風養出的厚葉。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "80度泡1分15秒，第二泡30秒，第三泡45秒。",
      "origin": "山東青島嶗山，海拔200~600米。",
      "process": "炒青 → 揉捻 → 乾燥，葉厚，炒制稍久。",
      "story": "據記載1959年由南方引種開始栽培。",
      "flavor": "炒香與厚實的甘甜，耐泡。",
      "pairing": "海鮮、餃子、家常小炒。",
      "brewTip": "80度一分十五秒，第三泡仍有香。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "嶗山綠茶 青島 山東 北方茶區"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "white-xingongyi",
    "group": "white",
    "kind": "tea",
    "hanja": "新",
    "sub": "New Craft White Tea",
    "alias": [
      "신공예 백차",
      "신공예백차"
    ],
    "hz": "新工藝白茶",
    "hs": "新工艺白茶",
    "rom": "Xin Gongyi Bai Cha",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      120,
      60,
      90
    ],
    "maxSteep": 3,
    "oxidationValue": 20,
    "traits": "t-morning t-afternoon a-floral a-fruit b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 약한 유념 → 건조. 유념으로 잎 가장자리가 조금 산화해 붉은 테가 생깁니다.",
        "1968년 푸젠 푸딩에서 전통 백차의 위조 시간을 늘리고 가볍게 유념해 만든 방식입니다."
      ],
      "en": [
        "Withered, lightly rolled, dried; the roll oxidises the leaf edges a little and leaves a red rim.",
        "Devised in Fuding, Fujian in 1968: a longer wither and a light roll, which takes white tea partway toward oolong."
      ],
      "zh-CN": [
        "萎凋 → 轻揉 → 干燥，揉捻使叶缘微氧化、带红边。",
        "1968年福建福鼎创制，延长萎凋并轻度揉捻。"
      ],
      "zh-TW": [
        "萎凋 → 輕揉 → 乾燥，揉捻使葉緣微氧化、帶紅邊。",
        "1968年福建福鼎創製，延長萎凋並輕度揉捻。"
      ]
    },
    "ko": {
      "name": "신공예 백차",
      "oneLine": "전통 백차에 가벼운 유념을 더해 향을 끌어올린 방식.",
      "oxidation": "약 20%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "85도에서 2분, 2포 1분, 3포 1분 30초.",
      "origin": "푸젠성 푸딩, 해발 500~800m.",
      "process": "위조 → 가벼운 유념 → 건조. 유념으로 잎 가장자리가 조금 산화합니다.",
      "story": "1968년 푸딩에서 만들기 시작한 방식으로, 백차의 부드러움에 우롱의 향을 조금 더했습니다.",
      "flavor": "백차의 부드러운 단맛에 꽃 향과 살짝 구운 향이 겹칩니다.",
      "pairing": "말린 과일, 견과, 달지 않은 구운 과자.",
      "brewTip": "85도. 전통 백차보다 향이 빨리 열려 2분이면 충분합니다.",
      "keep": "서늘하고 건조하게. 오래 두면 향이 부드러워집니다.",
      "keywords": "신공예 백차 푸딩 유념 반발효"
    },
    "en": {
      "name": "New Craft White Tea",
      "oneLine": "Traditional white with a light roll — more aroma, a little oxidation.",
      "oxidation": "about 20%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "85 °C: 2 minutes, then 1 minute, then 1½ minutes.",
      "origin": "Fuding, Fujian, 500–800 m.",
      "process": "Withered, lightly rolled, dried; the roll oxidises the edges slightly.",
      "story": "Introduced in Fuding in 1968, adding a little oolong-like aroma to white tea's softness.",
      "flavor": "Gentle white-tea sweetness with flowers and a faint toast.",
      "pairing": "Dried fruit, nuts, plain biscuits.",
      "brewTip": "85 °C; aroma opens faster than traditional white — two minutes is enough.",
      "keep": "Cool and dry; the aroma softens with age.",
      "keywords": "new craft white tea Fuding light roll semi-oxidised"
    },
    "zh-CN": {
      "name": "新工艺白茶",
      "oneLine": "传统白茶加轻度揉捻，香气更外放。",
      "oxidation": "约20%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡2分钟，第二泡1分钟，第三泡1分30秒。",
      "origin": "福建福鼎，海拔500~800米。",
      "process": "萎凋 → 轻揉 → 干燥，叶缘微氧化。",
      "story": "1968年福鼎创制，在白茶的柔和中添一点乌龙香。",
      "flavor": "白茶柔甜之上叠着花香与轻焙火气。",
      "pairing": "果干、坚果、原味饼干。",
      "brewTip": "85度，两分钟即可出香。",
      "keep": "阴凉干燥，久存香气转柔。",
      "keywords": "新工艺白茶 福鼎 轻揉 半发酵"
    },
    "zh-TW": {
      "name": "新工藝白茶",
      "oneLine": "傳統白茶加輕度揉捻，香氣更外放。",
      "oxidation": "約20%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡2分鐘，第二泡1分鐘，第三泡1分30秒。",
      "origin": "福建福鼎，海拔500~800米。",
      "process": "萎凋 → 輕揉 → 乾燥，葉緣微氧化。",
      "story": "1968年福鼎創製，在白茶的柔和中添一點烏龍香。",
      "flavor": "白茶柔甜之上疊著花香與輕焙火氣。",
      "pairing": "果乾、堅果、原味餅乾。",
      "brewTip": "85度，兩分鐘即可出香。",
      "keep": "陰涼乾燥，久存香氣轉柔。",
      "keywords": "新工藝白茶 福鼎 輕揉 半發酵"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "white-yueguangbai",
    "group": "white",
    "kind": "tea",
    "hanja": "月",
    "sub": "Moonlight White",
    "alias": [
      "월광백",
      "달빛백차"
    ],
    "hz": "月光白",
    "hs": "月光白",
    "rom": "Yueguang Bai",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "4g",
    "water": "150ml",
    "steeps": [
      60,
      30,
      45
    ],
    "maxSteep": 4,
    "oxidationValue": 15,
    "traits": "t-afternoon t-night a-fruit a-floral b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-low m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "윈난 대엽종으로 만드는 백차입니다. 잎 한 면은 희고 다른 면은 검게 마르는 모습이 달빛과 그림자 같아 이름이 붙었습니다.",
        "실내에서 그늘져 위조합니다. 윈난의 건조한 공기와 큰 잎이 이 모양을 만듭니다."
      ],
      "en": [
        "A white tea from Yunnan large-leaf bushes; one side of the leaf dries pale, the other dark, like moonlight and shadow — hence the name.",
        "Shade-withered indoors; Yunnan's dry air and big leaf produce the two-tone look."
      ],
      "zh-CN": [
        "用云南大叶种制作的白茶，叶面一黑一白如月影，故名。",
        "室内遮阴萎凋，云南干燥空气与大叶种形成黑白两色。"
      ],
      "zh-TW": [
        "用雲南大葉種製作的白茶，葉面一黑一白如月影，故名。",
        "室內遮陰萎凋，雲南乾燥空氣與大葉種形成黑白兩色。"
      ]
    },
    "ko": {
      "name": "월광백",
      "oneLine": "한 면은 희고 한 면은 검은 잎 — 윈난의 달빛 백차.",
      "oxidation": "약 15%",
      "ratioNote": "150ml에 4g",
      "rounds": "4회",
      "steepBasis": "85도에서 1분, 2포 30초, 3포 45초. 이후 15초씩 늘립니다.",
      "origin": "윈난성 푸얼·시마오 일대, 해발 1,200~1,800m의 대엽종 차밭.",
      "process": "실내 그늘 위조 → 건조. 잎을 비비지 않아 모양이 크게 남습니다.",
      "story": "이름은 잎의 흑백이 달빛과 그림자를 닮은 데서 왔습니다.",
      "flavor": "말린 과일과 꿀 같은 단맛, 부드러운 몸통. 물색은 연한 살구빛입니다.",
      "pairing": "말린 살구, 대추, 견과, 밤 디저트.",
      "brewTip": "85도에서 짧게 여러 번. 3포부터 단맛이 올라옵니다.",
      "keep": "서늘하고 건조하게. 습기를 피하면 몇 해 두고 마실 수 있습니다.",
      "keywords": "월광백 윈난 대엽종 백차 달빛 그늘위조"
    },
    "en": {
      "name": "Moonlight White",
      "oneLine": "One side pale, one side dark — Yunnan's moonlight white tea.",
      "oxidation": "about 15%",
      "ratioNote": "4 g to 150 ml",
      "rounds": "4 infusions",
      "steepBasis": "85 °C: 1 minute, then 30 seconds, then 45; add 15 seconds after that.",
      "origin": "Pu'er and Simao, Yunnan, 1,200–1,800 m, large-leaf bushes.",
      "process": "Shade-withered indoors, dried; the leaf is not rolled, so it stays whole.",
      "story": "The name comes from the pale and dark faces of the leaf, like moonlight and shadow.",
      "flavor": "Dried fruit and honey sweetness, soft body, pale apricot liquor.",
      "pairing": "Dried apricot, jujube, nuts, chestnut desserts.",
      "brewTip": "Short, repeated infusions at 85 °C; sweetness rises from the third.",
      "keep": "Cool and dry; kept from damp it will hold for years.",
      "keywords": "Moonlight White Yunnan large leaf white tea shade withered"
    },
    "zh-CN": {
      "name": "月光白",
      "oneLine": "一面白一面黑，云南的月光白茶。",
      "oxidation": "约15%",
      "ratioNote": "150毫升配4克",
      "rounds": "4泡",
      "steepBasis": "85度泡1分钟，第二泡30秒，第三泡45秒，其后每泡加15秒。",
      "origin": "云南普洱、思茅一带，海拔1200~1800米大叶种。",
      "process": "室内遮阴萎凋 → 干燥，不揉捻，叶片完整。",
      "story": "名字来自叶面黑白相间，如同月光与影子。",
      "flavor": "果干与蜜甜，汤体柔和，汤色浅杏黄。",
      "pairing": "杏干、红枣、坚果、栗子甜点。",
      "brewTip": "85度短泡多道，第三泡起甜味上来。",
      "keep": "阴凉干燥，避潮可存放数年。",
      "keywords": "月光白 云南 大叶种 白茶 阴干"
    },
    "zh-TW": {
      "name": "月光白",
      "oneLine": "一面白一面黑，雲南的月光白茶。",
      "oxidation": "約15%",
      "ratioNote": "150毫升配4克",
      "rounds": "4泡",
      "steepBasis": "85度泡1分鐘，第二泡30秒，第三泡45秒，其後每泡加15秒。",
      "origin": "雲南普洱、思茅一帶，海拔1200~1800米大葉種。",
      "process": "室內遮陰萎凋 → 乾燥，不揉捻，葉片完整。",
      "story": "名字來自葉面黑白相間，如同月光與影子。",
      "flavor": "果乾與蜜甜，湯體柔和，湯色淺杏黃。",
      "pairing": "杏幹、紅棗、堅果、慄子甜點。",
      "brewTip": "85度短泡多道，第三泡起甜味上來。",
      "keep": "陰涼乾燥，避潮可存放數年。",
      "keywords": "月光白 雲南 大葉種 白茶 陰乾"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "white-lingyun-baihao",
    "group": "white",
    "kind": "tea",
    "hanja": "毫",
    "sub": "Lingyun Baihao",
    "alias": [
      "능운백호",
      "광서백호"
    ],
    "hz": "凌雲白毫",
    "hs": "凌云白毫",
    "rom": "Lingyun Baihao",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      90,
      45,
      60
    ],
    "maxSteep": 3,
    "oxidationValue": 10,
    "traits": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 건조의 기본을 지키되, 잎이 두꺼워 건조를 길게 잡습니다.",
        "광시 링윈의 산지에서 나는 백호가 많은 잎으로 만듭니다. 백차로도 녹차로도 가공합니다."
      ],
      "en": [
        "Withered and dried, with a longer dry for a thick leaf.",
        "Made in Lingyun, Guangxi from a bush whose buds carry heavy white down; the same leaf is also made into green tea."
      ],
      "zh-CN": [
        "萎凋 → 干燥，叶厚，干燥时间较长。",
        "广西凌云的白毫茶树，可制白茶也可制绿茶。"
      ],
      "zh-TW": [
        "萎凋 → 乾燥，葉厚，乾燥時間較長。",
        "廣西凌雲的白毫茶樹，可制白茶也可制綠茶。"
      ]
    },
    "ko": {
      "name": "능운백호",
      "oneLine": "흰 솜털이 많은 잎으로 만든 광시의 백차.",
      "oxidation": "약 10%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "85도에서 1분 30초, 2포 45초, 3포 1분.",
      "origin": "광시 좡족자치구 링윈현, 해발 800~1,200m.",
      "process": "위조 → 건조. 잎이 두꺼워 건조를 길게 합니다.",
      "story": "링윈 지역은 백호가 많은 차나무로 알려져 있습니다.",
      "flavor": "부드러운 꽃 향과 옅은 풀 향, 가벼운 단맛.",
      "pairing": "담백한 디저트, 견과, 과일.",
      "brewTip": "85도에서 1분 30초. 잎이 두꺼워 3포까지 우러납니다.",
      "keep": "서늘하고 건조하게, 밀봉 보관.",
      "keywords": "능운백호 광시 백차 백호"
    },
    "en": {
      "name": "Lingyun Baihao",
      "oneLine": "A downy-leaf white tea from Guangxi.",
      "oxidation": "about 10%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "85 °C: 1½ minutes, then 45 seconds, then 1 minute.",
      "origin": "Lingyun county, Guangxi, 800–1,200 m.",
      "process": "Withered, dried; a thick leaf needs a longer dry.",
      "story": "Lingyun is known for bushes whose buds carry heavy white down.",
      "flavor": "Soft flowers, faint grass, light sweetness.",
      "pairing": "Plain desserts, nuts, fruit.",
      "brewTip": "1½ minutes at 85 °C; the thick leaf lasts three infusions.",
      "keep": "Cool, dry, sealed.",
      "keywords": "Lingyun Baihao Guangxi white tea downy buds"
    },
    "zh-CN": {
      "name": "凌云白毫",
      "oneLine": "白毫浓密的广西白茶。",
      "oxidation": "约10%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分30秒，第二泡45秒，第三泡1分钟。",
      "origin": "广西凌云县，海拔800~1200米。",
      "process": "萎凋 → 干燥，叶厚，干燥时间较长。",
      "story": "凌云以白毫浓密的茶树闻名。",
      "flavor": "柔和花香与淡草气，轻甜。",
      "pairing": "清淡甜点、坚果、水果。",
      "brewTip": "85度一分半，可泡三泡。",
      "keep": "阴凉干燥，密封保存。",
      "keywords": "凌云白毫 广西 白茶 白毫"
    },
    "zh-TW": {
      "name": "凌雲白毫",
      "oneLine": "白毫濃密的廣西白茶。",
      "oxidation": "約10%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分30秒，第二泡45秒，第三泡1分鐘。",
      "origin": "廣西凌雲縣，海拔800~1200米。",
      "process": "萎凋 → 乾燥，葉厚，乾燥時間較長。",
      "story": "凌雲以白毫濃密的茶樹聞名。",
      "flavor": "柔和花香與淡草氣，輕甜。",
      "pairing": "清淡甜點、堅果、水果。",
      "brewTip": "85度一分半，可泡三泡。",
      "keep": "陰涼乾燥，密封保存。",
      "keywords": "凌雲白毫 廣西 白茶 白毫"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "yellow-beigang-maojian",
    "group": "yellow",
    "kind": "tea",
    "hanja": "北",
    "sub": "Beigang Maojian",
    "alias": [
      "북항모첨",
      "악양북항"
    ],
    "hz": "北港毛尖",
    "hs": "北港毛尖",
    "rom": "Beigang Maojian",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      90,
      60,
      90
    ],
    "maxSteep": 3,
    "oxidationValue": 12,
    "traits": "t-morning t-afternoon a-roast a-grass b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 민황(黃湯) → 건조. 덖은 뒤 뭉쳐 두어 스스로 노랗게 익게 합니다.",
        "후난 웨양 북항 일대에서 만드는 작은 황차입니다. 둥팅호 서쪽 물가의 차밭입니다."
      ],
      "en": [
        "Fired, then 'men huang' — piled and wrapped so the leaf yellows itself — then dried.",
        "A small yellow tea from Beigang near Yueyang, Hunan, west of Dongting Lake."
      ],
      "zh-CN": [
        "炒青 → 闷黄 → 干燥，趁热堆闷使叶色转黄。",
        "湖南岳阳北港一带的小宗黄茶，位于洞庭湖西岸。"
      ],
      "zh-TW": [
        "炒青 → 悶黃 → 乾燥，趁熱堆悶使葉色轉黃。",
        "湖南岳陽北港一帶的小宗黃茶，位於洞庭湖西岸。"
      ]
    },
    "ko": {
      "name": "북항모첨",
      "oneLine": "둥팅호 서쪽 물가의 작은 황차 — 뭉쳐 두어 노랗게 익힌 잎.",
      "oxidation": "약 12%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "85도에서 1분 30초, 2포 1분, 3포 1분 30초.",
      "origin": "후난성 웨양시 북항 일대, 해발 100~300m.",
      "process": "살청 → 민황 → 건조.",
      "story": "명·청 시대부터 이어졌다고 전하는 후난의 소규모 황차입니다.",
      "flavor": "부드러운 곡물 향과 단맛, 녹차보다 떫음이 적습니다.",
      "pairing": "죽, 나물, 밥 반찬.",
      "brewTip": "85도에서 1분 30초. 민황한 잎은 2포에서 향이 가장 좋습니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "북항모첨 후난 악양 황차 민황"
    },
    "en": {
      "name": "Beigang Maojian",
      "oneLine": "A small yellow tea from the west shore of Dongting Lake.",
      "oxidation": "about 12%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "85 °C: 1½ minutes, then 1 minute, then 1½ minutes.",
      "origin": "Beigang, Yueyang, Hunan, 100–300 m.",
      "process": "Fired, then piled warm so the leaf yellows itself ('men huang'), then dried.",
      "story": "A minor Hunan yellow tea said to go back to the Ming and Qing.",
      "flavor": "Soft grain sweetness, less astringent than green tea.",
      "pairing": "Congee, vegetables, everyday rice dishes.",
      "brewTip": "1½ minutes at 85 °C; the piled leaf peaks in the second infusion.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Beigang Maojian Hunan Yueyang yellow tea men huang"
    },
    "zh-CN": {
      "name": "北港毛尖",
      "oneLine": "洞庭湖西岸的小宗黄茶，趁热堆闷转黄。",
      "oxidation": "约12%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分30秒，第二泡1分钟，第三泡1分30秒。",
      "origin": "湖南岳阳北港一带，海拔100~300米。",
      "process": "炒青 → 闷黄 → 干燥。",
      "story": "据传明清已有制作，属湖南小宗黄茶。",
      "flavor": "柔和的谷物香与甘甜，比绿茶少涩。",
      "pairing": "粥、蔬菜、家常饭。",
      "brewTip": "85度一分半，第二泡香最好。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "北港毛尖 湖南 岳阳 黄茶 闷黄"
    },
    "zh-TW": {
      "name": "北港毛尖",
      "oneLine": "洞庭湖西岸的小宗黃茶，趁熱堆悶轉黃。",
      "oxidation": "約12%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分30秒，第二泡1分鐘，第三泡1分30秒。",
      "origin": "湖南岳陽北港一帶，海拔100~300米。",
      "process": "炒青 → 悶黃 → 乾燥。",
      "story": "據傳明清已有製作，屬湖南小宗黃茶。",
      "flavor": "柔和的穀物香與甘甜，比綠茶少澀。",
      "pairing": "粥、蔬菜、家常飯。",
      "brewTip": "85度一分半，第二泡香最好。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "北港毛尖 湖南 嶽陽 黃茶 悶黃"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "yellow-weishan-maojian",
    "group": "yellow",
    "kind": "tea",
    "hanja": "溈",
    "sub": "Weishan Maojian",
    "alias": [
      "위산모첨",
      "영향위산"
    ],
    "hz": "溈山毛尖",
    "hs": "沩山毛尖",
    "rom": "Weishan Maojian",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      90,
      60,
      90
    ],
    "maxSteep": 3,
    "oxidationValue": 15,
    "traits": "t-morning t-afternoon a-roast a-floral b-medium k-sweet r-smoke s-hot w-quick p-meal c-mid m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 민황 → 훈연 건조. 잎에 옅은 솔 연기 향이 남습니다.",
        "후난 닝샹 위산에서 나는 황차로, 마지막 건조에 연기를 조금 쬐는 방식이 특징입니다."
      ],
      "en": [
        "Fired, piled to yellow, then smoke-dried; a faint pine note stays in the leaf.",
        "A Hunan yellow tea from Weishan, Ningxiang, unusual for a light smoking at the final dry."
      ],
      "zh-CN": [
        "炒青 → 闷黄 → 烟熏干燥，叶带淡松烟香。",
        "湖南宁乡沩山黄茶，最后干燥略经烟熏。"
      ],
      "zh-TW": [
        "炒青 → 悶黃 → 煙燻乾燥，葉帶淡松煙香。",
        "湖南寧鄉溈山黃茶，最後乾燥略經煙燻。"
      ]
    },
    "ko": {
      "name": "위산모첨",
      "oneLine": "마지막에 연기를 살짝 쬐어, 황차에 옅은 솔 향이 남는 차.",
      "oxidation": "약 15%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "85도에서 1분 30초, 2포 1분, 3포 1분 30초.",
      "origin": "후난성 닝샹시 위산 일대, 해발 300~800m.",
      "process": "살청 → 민황 → 훈연 건조.",
      "story": "위산의 사찰 차밭에서 시작되었다는 이야기가 전합니다.",
      "flavor": "곡물 단맛에 옅은 솔 연기, 떫음이 적습니다.",
      "pairing": "훈제 요리, 구운 생선, 밥.",
      "brewTip": "85도에서 1분 30초. 연기 향은 2포에서 부드러워집니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장. 연기 향이 다른 차로 옮지 않게 따로 둡니다.",
      "keywords": "위산모첨 후난 영향 황차 훈연"
    },
    "en": {
      "name": "Weishan Maojian",
      "oneLine": "A yellow tea finished over smoke — a faint pine note in the leaf.",
      "oxidation": "about 15%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "85 °C: 1½ minutes, then 1 minute, then 1½ minutes.",
      "origin": "Weishan, Ningxiang, Hunan, 300–800 m.",
      "process": "Fired, piled to yellow, smoke-dried.",
      "story": "Said to have started in the temple tea plots on Weishan.",
      "flavor": "Grain sweetness with light pine smoke, low astringency.",
      "pairing": "Smoked food, grilled fish, rice.",
      "brewTip": "1½ minutes at 85 °C; the smoke softens by the second infusion.",
      "keep": "Within a month of opening, sealed and cold, away from other teas.",
      "keywords": "Weishan Maojian Hunan yellow tea smoke dried"
    },
    "zh-CN": {
      "name": "沩山毛尖",
      "oneLine": "最后略经烟熏，叶里带一点松烟香的黄茶。",
      "oxidation": "约15%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分30秒，第二泡1分钟，第三泡1分30秒。",
      "origin": "湖南宁乡沩山一带，海拔300~800米。",
      "process": "炒青 → 闷黄 → 烟熏干燥。",
      "story": "相传始于沩山寺院茶山。",
      "flavor": "谷物甜配淡松烟，涩味轻。",
      "pairing": "熏制食物、烤鱼、米饭。",
      "brewTip": "85度一分半，第二泡烟香转柔。",
      "keep": "开封后一个月内，密封冷藏，避免串味。",
      "keywords": "沩山毛尖 湖南 黄茶 烟熏"
    },
    "zh-TW": {
      "name": "溈山毛尖",
      "oneLine": "最後略經煙燻，葉裡帶一點松煙香的黃茶。",
      "oxidation": "約15%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分30秒，第二泡1分鐘，第三泡1分30秒。",
      "origin": "湖南寧鄉溈山一帶，海拔300~800米。",
      "process": "炒青 → 悶黃 → 煙燻乾燥。",
      "story": "相傳始於溈山寺院茶山。",
      "flavor": "穀物甜配淡松煙，澀味輕。",
      "pairing": "燻制食物、烤魚、米飯。",
      "brewTip": "85度一分半，第二泡煙香轉柔。",
      "keep": "開封後一個月內，密封冷藏，避免串味。",
      "keywords": "溈山毛尖 湖南 黃茶 煙燻"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "yellow-wenzhou-huangtang",
    "group": "yellow",
    "kind": "tea",
    "hanja": "黃",
    "sub": "Pingyang Huangtang",
    "alias": [
      "평양황탕",
      "온주황탕"
    ],
    "hz": "溫州黃湯",
    "hs": "温州黄汤",
    "rom": "Wenzhou Huangtang",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      90,
      60,
      90
    ],
    "maxSteep": 3,
    "oxidationValue": 12,
    "traits": "t-morning t-afternoon a-roast a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 민황 → 건조. 민황 시간을 짧게 잡아 녹차에 가까운 색을 냅니다.",
        "저장 남부 핑양 일대에서 만드는 황차로, 청대에 공차로 올라갔다는 기록이 있습니다."
      ],
      "en": [
        "Fired, piled briefly to yellow, dried — the short pile keeps it close to green.",
        "A yellow tea from Pingyang in southern Zhejiang, recorded as tribute tea in the Qing."
      ],
      "zh-CN": [
        "炒青 → 短时闷黄 → 干燥，色泽接近绿茶。",
        "浙江南部平阳一带的黄茶，清代曾为贡茶。"
      ],
      "zh-TW": [
        "炒青 → 短時悶黃 → 乾燥，色澤接近綠茶。",
        "浙江南部平陽一帶的黃茶，清代曾為貢茶。"
      ]
    },
    "ko": {
      "name": "평양황탕",
      "oneLine": "민황을 짧게 잡아 색이 연한, 저장 남부의 황차.",
      "oxidation": "약 12%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "85도에서 1분 20초, 2포 1분, 3포 1분 20초.",
      "origin": "저장성 원저우 핑양현, 해발 300~700m.",
      "process": "살청 → 짧은 민황 → 건조.",
      "story": "청대에 공차로 올라갔다고 전합니다.",
      "flavor": "부드러운 곡물 향과 옅은 꽃 향, 가벼운 단맛.",
      "pairing": "죽, 담백한 생선, 나물.",
      "brewTip": "85도에서 1분 20초. 녹차에 가까워 짧게 우립니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "평양황탕 온주황탕 저장 황차 공차"
    },
    "en": {
      "name": "Pingyang Huangtang",
      "oneLine": "A pale southern-Zhejiang yellow tea with a short yellowing.",
      "oxidation": "about 12%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "85 °C: 1 minute 20, then 1 minute, then 1 minute 20.",
      "origin": "Pingyang, Wenzhou, Zhejiang, 300–700 m.",
      "process": "Fired, a short warm pile to yellow, dried.",
      "story": "Recorded as tribute tea in the Qing dynasty.",
      "flavor": "Soft grain, faint flowers, light sweetness.",
      "pairing": "Congee, light fish, vegetables.",
      "brewTip": "1 minute 20 at 85 °C — close to green tea, so keep it short.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Pingyang Huangtang Wenzhou Zhejiang yellow tea tribute"
    },
    "zh-CN": {
      "name": "平阳黄汤",
      "oneLine": "闷黄时间短、色泽偏浅的浙南黄茶。",
      "oxidation": "约12%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分20秒，第二泡1分钟，第三泡1分20秒。",
      "origin": "浙江温州平阳，海拔300~700米。",
      "process": "炒青 → 短闷黄 → 干燥。",
      "story": "清代曾列为贡茶。",
      "flavor": "柔和谷物香与淡花香，轻甜。",
      "pairing": "粥、清蒸鱼、蔬菜。",
      "brewTip": "85度一分二十秒，接近绿茶，宜短泡。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "平阳黄汤 温州 浙江 黄茶 贡茶"
    },
    "zh-TW": {
      "name": "平陽黃湯",
      "oneLine": "悶黃時間短、色澤偏淺的浙南黃茶。",
      "oxidation": "約12%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分20秒，第二泡1分鐘，第三泡1分20秒。",
      "origin": "浙江溫州平陽，海拔300~700米。",
      "process": "炒青 → 短悶黃 → 乾燥。",
      "story": "清代曾列為貢茶。",
      "flavor": "柔和穀物香與淡花香，輕甜。",
      "pairing": "粥、清蒸魚、蔬菜。",
      "brewTip": "85度一分二十秒，接近綠茶，宜短泡。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "平陽黃湯 溫州 浙江 黃茶 貢茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "yellow-wanxi-huangdacha",
    "group": "yellow",
    "kind": "tea",
    "hanja": "皖",
    "sub": "Wanxi Huangda Tea",
    "alias": [
      "환서황대차",
      "안후이황대차"
    ],
    "hz": "皖西黃大茶",
    "hs": "皖西黄大茶",
    "rom": "Wanxi Huangda Cha",
    "temp": 95,
    "tempRange": "90~100℃",
    "leaf": "5g",
    "water": "200ml",
    "steeps": [
      180,
      120,
      180
    ],
    "maxSteep": 3,
    "oxidationValue": 20,
    "traits": "t-morning t-afternoon a-roast b-full k-grain r-clean s-hot s-milk w-quick p-meal c-mid m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 민황 → 건조. 잎이 굵어 민황을 길게 잡고, 냄비에 끓이듯 우려 마시기도 합니다.",
        "안후이 서부의 굵은 잎으로 만드는 대형 황차입니다. ‘대차(大茶)’라는 이름처럼 잎이 크고 실합니다."
      ],
      "en": [
        "Fired, piled long to yellow, dried; often boiled in a pot rather than infused.",
        "A coarse-leaf yellow tea from western Anhui; 'da cha' (big tea) says it plainly — large leaf, strong brew."
      ],
      "zh-CN": [
        "炒青 → 长时闷黄 → 干燥，民间常煮饮。",
        "皖西一带用较粗老叶做成的大宗黄茶，故名“大茶”。"
      ],
      "zh-TW": [
        "炒青 → 長時悶黃 → 乾燥，民間常煮飲。",
        "皖西一帶用較粗老葉做成的大宗黃茶，故名「大茶」。"
      ]
    },
    "ko": {
      "name": "환서황대",
      "oneLine": "잎이 크고 굵은 안후이의 대형 황차 — 끓여 마시는 차.",
      "oxidation": "약 20%",
      "ratioNote": "200ml에 5g",
      "rounds": "3회",
      "steepBasis": "95도에서 3분, 2포 2분. 주전자에 끓이면 더 구수합니다.",
      "origin": "안후이성 루안·진자이 일대, 해발 300~800m.",
      "process": "살청 → 긴 민황 → 건조.",
      "story": "잎이 굵은 여름잎까지 쓰기 때문에 값이 낮고, 농가에서 주전자로 끓여 마시는 차로 자리했습니다.",
      "flavor": "구수한 볶음 향과 진한 단맛, 우유를 넣어도 향이 남습니다.",
      "pairing": "매운 요리, 국, 아침 식사.",
      "brewTip": "95~100도에서 길게. 주전자에 넣고 끓여도 좋습니다.",
      "keep": "개봉 후 두 달 안, 서늘하고 건조하게.",
      "keywords": "환서황대차 안후이 황차 대차 끓인차"
    },
    "en": {
      "name": "Wanxi Huangda Tea",
      "oneLine": "Western Anhui's coarse-leaf yellow tea — made to be boiled.",
      "oxidation": "about 20%",
      "ratioNote": "5 g to 200 ml",
      "rounds": "3 infusions",
      "steepBasis": "95 °C: 3 minutes, then 2 minutes. Boiling in a pot makes it rounder.",
      "origin": "Lu'an and Jinzhai, Anhui, 300–800 m.",
      "process": "Fired, given a long warm pile to yellow, dried.",
      "story": "It takes coarser summer leaf, so it has long been a cheap pot-boiled farmhouse tea.",
      "flavor": "Toasty roast, strong sweetness, and it holds up with milk.",
      "pairing": "Spicy food, soup, breakfast.",
      "brewTip": "95–100 °C and give it time; it also boils well in a pot.",
      "keep": "Within two months of opening, cool and dry.",
      "keywords": "Wanxi Huangda Anhui yellow tea boiled coarse leaf"
    },
    "zh-CN": {
      "name": "皖西黄大茶",
      "oneLine": "皖西粗老叶做成的大宗黄茶，适合煮饮。",
      "oxidation": "约20%",
      "ratioNote": "200毫升配5克",
      "rounds": "3泡",
      "steepBasis": "95度泡3分钟，第二泡2分钟，煮饮更醇。",
      "origin": "安徽六安、金寨一带，海拔300~800米。",
      "process": "炒青 → 长时闷黄 → 干燥。",
      "story": "用夏秋粗叶，价廉，农家常以壶煮饮。",
      "flavor": "炒香厚实、甘甜明显，加奶也不失香。",
      "pairing": "辛香菜肴、汤、早餐。",
      "brewTip": "95~100度久泡，或直接煮。",
      "keep": "开封后两个月内，阴凉干燥。",
      "keywords": "皖西黄大茶 安徽 黄茶 大茶 煮茶"
    },
    "zh-TW": {
      "name": "皖西黃大茶",
      "oneLine": "皖西粗老葉做成的大宗黃茶，適合煮飲。",
      "oxidation": "約20%",
      "ratioNote": "200毫升配5克",
      "rounds": "3泡",
      "steepBasis": "95度泡3分鐘，第二泡2分鐘，煮飲更醇。",
      "origin": "安徽六安、金寨一帶，海拔300~800米。",
      "process": "炒青 → 長時悶黃 → 乾燥。",
      "story": "用夏秋粗葉，價廉，農家常以壺煮飲。",
      "flavor": "炒香厚實、甘甜明顯，加奶也不失香。",
      "pairing": "辛香菜餚、湯、早餐。",
      "brewTip": "95~100度久泡，或直接煮。",
      "keep": "開封後兩個月內，陰涼乾燥。",
      "keywords": "皖西黃大茶 安徽 黃茶 大茶 煮茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "yellow-yuanan-luyuan",
    "group": "yellow",
    "kind": "tea",
    "hanja": "鹿",
    "sub": "Yu'an Luyuan",
    "alias": [
      "원안녹원차",
      "원안녹원",
      "녹원차"
    ],
    "hz": "遠安鹿苑茶",
    "hs": "远安鹿苑茶",
    "rom": "Yuan'an Luyuan Cha",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      90,
      60,
      90
    ],
    "maxSteep": 3,
    "oxidationValue": 15,
    "traits": "t-morning t-afternoon a-roast a-floral b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 민황 → 건조. 잎을 가늘게 꼬아 말립니다.",
        "후베이 위안안의 루위안사 주변에서 시작된 황차로, 청대 건륭 연간 기록이 남아 있습니다."
      ],
      "en": [
        "Fired, piled to yellow, rolled into fine strands, dried.",
        "A Hubei yellow tea from around Luyuan temple in Yuan'an, recorded in the Qianlong era of the Qing."
      ],
      "zh-CN": [
        "炒青 → 闷黄 → 揉成细条 → 干燥。",
        "湖北远安鹿苑寺一带的黄茶，清代乾隆年间已有记载。"
      ],
      "zh-TW": [
        "炒青 → 悶黃 → 揉成細條 → 乾燥。",
        "湖北遠安鹿苑寺一帶的黃茶，清代乾隆年間已有記載。"
      ]
    },
    "ko": {
      "name": "원안녹원",
      "oneLine": "청대 기록이 남은 후베이 황차 — 가늘게 꼰 잎.",
      "oxidation": "약 15%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "85도에서 1분 30초, 2포 1분, 3포 1분 30초.",
      "origin": "후베이성 위안안현 루위안사 일대, 해발 300~700m.",
      "process": "살청 → 민황 → 유념 → 건조.",
      "story": "남송 때 세워진 녹원사 차밭에서 시작되었고, 청 건륭 연간에 공차로 선정되었습니다.",
      "flavor": "부드러운 곡물 향과 꽃 향, 깨끗한 단맛.",
      "pairing": "죽, 나물, 담백한 국.",
      "brewTip": "85도에서 1분 30초. 잎이 가늘어 2포면 충분합니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "원안녹원차 후베이 황차 사찰차"
    },
    "en": {
      "name": "Yu'an Luyuan Tea",
      "oneLine": "A Hubei yellow tea with Qing records and a fine rolled leaf.",
      "oxidation": "about 15%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "85 °C: 1½ minutes, then 1 minute, then 1½ minutes.",
      "origin": "Around Luyuan temple, Yuan'an county, Hubei, 300–700 m.",
      "process": "Fired, piled to yellow, rolled into fine strands, dried.",
      "story": "It began in the plots of Luyuan temple, founded in the Southern Song, and was chosen as tribute tea in the Qianlong era.",
      "flavor": "Soft grain and flowers, a clean sweetness.",
      "pairing": "Congee, vegetables, light soup.",
      "brewTip": "1½ minutes at 85 °C; two infusions are enough for this thin leaf.",
      "keep": "Within a month of opening, sealed and cold.",
      "keywords": "Yu'an Luyuan Hubei yellow tea temple tea"
    },
    "zh-CN": {
      "name": "远安鹿苑茶",
      "oneLine": "清代已有记载的湖北黄茶，条索细紧。",
      "oxidation": "约15%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分30秒，第二泡1分钟，第三泡1分30秒。",
      "origin": "湖北远安鹿苑寺一带，海拔300~700米。",
      "process": "炒青 → 闷黄 → 揉捻 → 干燥。",
      "story": "始于南宋创立的鹿苑寺茶山，乾隆年间被选为贡茶。",
      "flavor": "谷物香与花香，回甘干净。",
      "pairing": "粥、蔬菜、清汤。",
      "brewTip": "85度一分半，两泡足够。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "远安鹿苑茶 湖北 黄茶 寺茶"
    },
    "zh-TW": {
      "name": "遠安鹿苑茶",
      "oneLine": "清代已有記載的湖北黃茶，條索細緊。",
      "oxidation": "約15%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡1分30秒，第二泡1分鐘，第三泡1分30秒。",
      "origin": "湖北遠安鹿苑寺一帶，海拔300~700米。",
      "process": "炒青 → 悶黃 → 揉捻 → 乾燥。",
      "story": "始於南宋創立的鹿苑寺茶山，乾隆年間被選為貢茶。",
      "flavor": "穀物香與花香，回甘乾淨。",
      "pairing": "粥、蔬菜、清湯。",
      "brewTip": "85度一分半，兩泡足夠。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "遠安鹿苑茶 湖北 黃茶 寺茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-rougui",
    "group": "oolong",
    "kind": "tea",
    "hanja": "桂",
    "sub": "Wuyi Rougui",
    "alias": [
      "육계",
      "무이육계"
    ],
    "hz": "武夷肉桂",
    "hs": "武夷肉桂",
    "rom": "Wuyi Rougui",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 8,
    "oxidationValue": 50,
    "traits": "t-afternoon t-night a-roast a-floral b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-energy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 숯불 배화. 배화를 여러 번 나누어 올립니다.",
        "계피나무 껍질 향이 나서 ‘육계’라는 이름이 붙었습니다. 무이산 암차 가운데 대홍포와 함께 가장 많이 심는 품종입니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, then charcoal-baked in several rounds.",
        "Named for a cinnamon-bark note; along with Da Hong Pao it is the most planted bush among the Wuyi rock teas."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 炭焙，焙火分多次。",
        "因带桂皮香而得名，与大红袍同为武夷岩茶种植最多的品种。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 炭焙，焙火分多次。",
        "因帶桂皮香而得名，與大紅袍同為武夷巖茶種植最多的品種。"
      ]
    },
    "ko": {
      "name": "무이육계",
      "oneLine": "계피 껍질을 닮은 향 — 무이 암차의 또 다른 기둥.",
      "oxidation": "약 50%",
      "ratioNote": "개완 110ml에 7g",
      "rounds": "8회 이상",
      "steepBasis": "98도에서 30초, 2포 20초, 3포 25초. 이후 5초씩 늘립니다.",
      "origin": "푸젠성 우이산, 해발 300~600m의 사암 협곡.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 숯불 배화.",
      "story": "청대에 이미 무이산에서 재배되었다는 기록이 있으며, 1980년대 이후 단일 품종 차로 널리 팔리기 시작했습니다.",
      "flavor": "계피·정향 같은 향신료 향, 구운 곡물 향, 진한 단맛과 긴 여운.",
      "pairing": "구운 고기, 훈제 오리, 진한 중식.",
      "brewTip": "98도 이상. 첫 물은 세차로 버리고, 2포부터 마십니다.",
      "keep": "밀봉해 서늘한 곳에. 배화한 차는 1~2년 두면 향이 둥글어집니다.",
      "keywords": "무이육계 육계 무이암차 우롱 배화 계피향"
    },
    "en": {
      "name": "Wuyi Rougui",
      "oneLine": "Cinnamon-bark aroma — the other pillar of Wuyi rock oolong.",
      "oxidation": "about 50%",
      "ratioNote": "7 g in a 110 ml gaiwan",
      "rounds": "8+ infusions",
      "steepBasis": "98 °C: 30 seconds, then 20, then 25; add 5 seconds after that.",
      "origin": "Wuyi Mountains, Fujian, sandstone gorges at 300–600 m.",
      "process": "Withered, shaken, fired, rolled, dried, charcoal-baked.",
      "story": "Rougui was recorded on Wuyi in the Qing; single-cultivar Rougui spread widely from the 1980s.",
      "flavor": "Cinnamon and clove spice, roast grain, deep sweetness, a long finish.",
      "pairing": "Grilled meat, smoked duck, rich Chinese dishes.",
      "brewTip": "98 °C or above. Rinse the first pour away and start from the second.",
      "keep": "Sealed and cool; baked oolong rounds out over a year or two.",
      "keywords": "Wuyi Rougui rock oolong cinnamon charcoal baked"
    },
    "zh-CN": {
      "name": "武夷肉桂",
      "oneLine": "似桂皮的辛香，武夷岩茶的另一根柱子。",
      "oxidation": "约50%",
      "ratioNote": "110毫升盖碗配7克",
      "rounds": "8泡以上",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒，其后每泡加5秒。",
      "origin": "福建武夷山，海拔300~600米砂岩峡谷。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 炭焙。",
      "story": "清代武夷已有栽培记载，1980年代后单品种肉桂广泛流行。",
      "flavor": "桂皮、丁香的辛香，焙火谷香，甜厚回甘长。",
      "pairing": "烤肉、熏鸭、味浓中餐。",
      "brewTip": "98度以上，头汤洗茶，从第二泡喝起。",
      "keep": "密封阴凉，焙火茶放一两年香气更圆。",
      "keywords": "武夷肉桂 岩茶 乌龙 炭焙 桂皮香"
    },
    "zh-TW": {
      "name": "武夷肉桂",
      "oneLine": "似桂皮的辛香，武夷巖茶的另一根柱子。",
      "oxidation": "約50%",
      "ratioNote": "110毫升蓋碗配7克",
      "rounds": "8泡以上",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒，其後每泡加5秒。",
      "origin": "福建武夷山，海拔300~600米砂巖峽谷。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 炭焙。",
      "story": "清代武夷已有栽培記載，1980年代後單品種肉桂廣泛流行。",
      "flavor": "桂皮、丁香的辛香，焙火谷香，甜厚回甘長。",
      "pairing": "烤肉、燻鴨、味濃中餐。",
      "brewTip": "98度以上，頭湯洗茶，從第二泡喝起。",
      "keep": "密封陰涼，焙火茶放一兩年香氣更圓。",
      "keywords": "武夷肉桂 巖茶 烏龍 炭焙 桂皮香"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-shuixian",
    "group": "oolong",
    "kind": "tea",
    "hanja": "仙",
    "sub": "Wuyi Shuixian",
    "alias": [
      "수선",
      "무이수선",
      "노총수선"
    ],
    "hz": "武夷水仙",
    "hs": "武夷水仙",
    "rom": "Wuyi Shuixian",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 9,
    "oxidationValue": 50,
    "traits": "t-afternoon t-night a-roast a-floral b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 잎이 커 배화를 오래 잡습니다.",
        "나무 나이가 많은 ‘노총(老叢)’일수록 이끼·목질 향이 깊어져 따로 높이 칩니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, baked; the large leaf takes a long bake.",
        "Old bushes ('lao cong') are prized separately for a mossy, woody depth."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火，叶大焙火时间长。",
        "树龄越老（老丛）苔藓气与木质香越深，单独高价。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火，葉大焙火時間長。",
        "樹齡越老（老叢）苔蘚氣與木質香越深，單獨高價。"
      ]
    },
    "ko": {
      "name": "무이수선",
      "oneLine": "큰 잎과 깊은 배화 — 나무가 늙을수록 이끼 향이 짙어지는 차.",
      "oxidation": "약 50%",
      "ratioNote": "개완 110ml에 7g",
      "rounds": "9회 이상",
      "steepBasis": "98도에서 30초, 2포 20초, 3포 25초. 이후 5초씩 늘립니다.",
      "origin": "푸젠성 우이산 일대, 해발 300~700m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "무이산에서 오래 재배된 품종으로, 나이 든 나무의 잎을 ‘노총수선’으로 따로 칩니다.",
      "flavor": "난초 향에 목질·이끼 향이 겹치고, 배화한 차는 단맛이 깁니다.",
      "pairing": "구운 생선, 버섯 요리, 진한 차 자리.",
      "brewTip": "98도. 노총은 2포부터 이끼 향이 열립니다.",
      "keep": "밀봉해 서늘하게. 배화 향은 시간이 지나며 부드러워집니다.",
      "keywords": "무이수선 노총수선 우롱 암차 목질향"
    },
    "en": {
      "name": "Wuyi Shuixian",
      "oneLine": "Big leaf, deep bake — and the older the bush, the mossier the cup.",
      "oxidation": "about 50%",
      "ratioNote": "7 g in a 110 ml gaiwan",
      "rounds": "9+ infusions",
      "steepBasis": "98 °C: 30 seconds, then 20, then 25; add 5 seconds after that.",
      "origin": "Wuyi Mountains, Fujian, 300–700 m.",
      "process": "Withered, shaken, fired, rolled, dried, baked.",
      "story": "Long grown on Wuyi; leaf from old bushes is sold separately as lao cong shuixian.",
      "flavor": "Orchid over wood and moss; the baked version keeps a long sweetness.",
      "pairing": "Grilled fish, mushroom dishes, a long tea session.",
      "brewTip": "98 °C. The mossy side of an old bush opens from the second infusion.",
      "keep": "Sealed and cool; the bake softens with time.",
      "keywords": "Wuyi Shuixian lao cong old bush rock oolong"
    },
    "zh-CN": {
      "name": "武夷水仙",
      "oneLine": "叶大焙足，树越老苔藓气越深。",
      "oxidation": "约50%",
      "ratioNote": "110毫升盖碗配7克",
      "rounds": "9泡以上",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒，其后每泡加5秒。",
      "origin": "福建武夷山一带，海拔300~700米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火。",
      "story": "武夷传统品种，老树所制单称“老丛水仙”。",
      "flavor": "兰花香叠木质与苔藓气，焙火后回甘长。",
      "pairing": "烤鱼、菌菇菜、长茶席。",
      "brewTip": "98度，老丛从第二泡起出苔藓气。",
      "keep": "密封阴凉，焙火香随年份转柔。",
      "keywords": "武夷水仙 老丛 岩茶 乌龙"
    },
    "zh-TW": {
      "name": "武夷水仙",
      "oneLine": "葉大焙足，樹越老苔蘚氣越深。",
      "oxidation": "約50%",
      "ratioNote": "110毫升蓋碗配7克",
      "rounds": "9泡以上",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒，其後每泡加5秒。",
      "origin": "福建武夷山一帶，海拔300~700米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火。",
      "story": "武夷傳統品種，老樹所制單稱「老叢水仙」。",
      "flavor": "蘭花香疊木質與苔蘚氣，焙火後回甘長。",
      "pairing": "烤魚、菌菇菜、長茶席。",
      "brewTip": "98度，老叢從第二泡起出苔蘚氣。",
      "keep": "密封陰涼，焙火香隨年份轉柔。",
      "keywords": "武夷水仙 老叢 巖茶 烏龍"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dayuling",
    "group": "oolong",
    "kind": "tea",
    "hanja": "嶺",
    "sub": "High Mountain Oolong (Dayuling)",
    "alias": [
      "대우령 고산우롱",
      "대우령",
      "대우령 고산차"
    ],
    "hz": "大禹嶺",
    "hs": "大禹岭",
    "rom": "Dayuling",
    "temp": 95,
    "tempRange": "90~98℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      50,
      25,
      35
    ],
    "maxSteep": 8,
    "oxidationValue": 20,
    "traits": "t-morning t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-refresh",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "台灣"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념(구형) → 건조. 낮은 온도로 잎이 두껍고 천천히 자랍니다.",
        "해발 2,300m를 넘는 대만에서 가장 높은 차밭 중 하나로, 겨울에 눈이 오는 곳도 있습니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled into balls, dried; the cold makes thick, slow-grown leaf.",
        "One of Taiwan's highest tea areas, above 2,300 m, where it sometimes snows."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉成球 → 干燥，低温使叶厚而生长慢。",
        "海拔2300米以上，是台湾最高茶区之一，冬季偶有降雪。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉成球 → 乾燥，低溫使葉厚而生長慢。",
        "海拔2300米以上，是臺灣最高茶區之一，冬季偶有降雪。"
      ]
    },
    "ko": {
      "name": "고산우롱 (대우령)",
      "oneLine": "해발 2,300m, 대만에서 가장 높은 차밭의 늦고 두꺼운 잎.",
      "oxidation": "약 20%",
      "ratioNote": "150ml에 6g",
      "rounds": "8회",
      "steepBasis": "95도에서 50초, 2포 25초, 3포 35초.",
      "origin": "난터우·타이중 경계 대우령, 해발 2,300~2,600m.",
      "process": "위조 → 요청 → 살청 → 구형 유념 → 건조.",
      "story": "고도가 높아 생산량이 적고, 해마다 기상에 따라 품질 차이가 크게 나는 산지입니다.",
      "flavor": "맑은 꽃 향과 청량한 단맛, 떫음이 거의 없습니다. 물색은 연한 금빛입니다.",
      "pairing": "가벼운 디저트, 과일, 단독 음용.",
      "brewTip": "90~95도. 잎을 많이 넣고 짧게 여러 번 우리는 방식이 향을 지킵니다.",
      "keep": "밀봉 냉동 보관이 향을 오래 지킵니다. 개봉 후 한 달 안에.",
      "keywords": "대우령 고산차 대만 우롱 해발 2300"
    },
    "en": {
      "name": "High Mountain Oolong (Dayuling)",
      "oneLine": "Above 2,300 m — Taiwan's highest tea, thick slow-grown leaf.",
      "oxidation": "about 20%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "8 infusions",
      "steepBasis": "95 °C: 50 seconds, then 25, then 35.",
      "origin": "Dayuling on the Nantou–Taichung border, 2,300–2,600 m.",
      "process": "Withered, shaken, fired, rolled into balls, dried.",
      "story": "Altitude keeps yields small and makes quality swing with each season's weather.",
      "flavor": "Clear flowers, cool sweetness, almost no astringency; pale gold liquor.",
      "pairing": "Light desserts, fruit, or on its own.",
      "brewTip": "90–95 °C, plenty of leaf, short repeated infusions.",
      "keep": "Sealed in the freezer holds the aroma; use within a month of opening.",
      "keywords": "Dayuling high mountain oolong Taiwan 2300 m"
    },
    "zh-CN": {
      "name": "大禹岭高山乌龙",
      "oneLine": "海拔2300米以上，台湾最高茶区的厚叶。",
      "oxidation": "约20%",
      "ratioNote": "150毫升配6克",
      "rounds": "8泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。",
      "origin": "南投与台中交界大禹岭，海拔2300~2600米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉球 → 干燥。",
      "story": "高海拔产量少，品质随当年气候起伏大。",
      "flavor": "清扬花香与凉甜，几乎不涩，汤色浅金。",
      "pairing": "清淡甜点、水果，或单独品饮。",
      "brewTip": "90~95度，多投茶、短泡多道。",
      "keep": "密封冷冻保香，开封后一个月内用完。",
      "keywords": "大禹岭 高山乌龙 台湾 海拔2300"
    },
    "zh-TW": {
      "name": "大禹嶺高山烏龍",
      "oneLine": "海拔2300米以上，臺灣最高茶區的厚葉。",
      "oxidation": "約20%",
      "ratioNote": "150毫升配6克",
      "rounds": "8泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。",
      "origin": "南投與臺中交界大禹嶺，海拔2300~2600米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉球 → 乾燥。",
      "story": "高海拔產量少，品質隨當年氣候起伏大。",
      "flavor": "清揚花香與涼甜，幾乎不澀，湯色淺金。",
      "pairing": "清淡甜點、水果，或單獨品飲。",
      "brewTip": "90~95度，多投茶、短泡多道。",
      "keep": "密封冷凍保香，開封後一個月內用完。",
      "keywords": "大禹嶺 高山烏龍 臺灣 海拔2300"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "oolong-shanlinxi",
    "group": "oolong",
    "kind": "tea",
    "hanja": "杉",
    "sub": "High Mountain Oolong (Shanlinxi)",
    "alias": [
      "삼림계 고산우롱",
      "삼림계",
      "산림계"
    ],
    "hz": "杉林溪",
    "hs": "杉林溪",
    "rom": "Shanlinxi",
    "temp": 95,
    "tempRange": "90~98℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      50,
      25,
      35
    ],
    "maxSteep": 7,
    "oxidationValue": 20,
    "traits": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-calm",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "台灣"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 구형 유념 → 건조. 숲 그늘과 안개로 향이 맑습니다.",
        "난터우 주지 일대, 해발 1,600~1,800m의 삼나무 숲 사이 차밭에서 나는 고산차입니다."
      ],
      "en": [
        "Withered, shaken, fired, ball-rolled, dried; forest shade and fog keep the aroma clean.",
        "High-mountain tea from cedar-forest plots at 1,600–1,800 m in Zhushan, Nantou."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉球 → 干燥，林荫与雾气使香气清扬。",
        "南投竹山杉林溪一带，海拔1600~1800米柳杉林间的茶田。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉球 → 乾燥，林蔭與霧氣使香氣清揚。",
        "南投竹山杉林溪一帶，海拔1600~1800米柳杉林間的茶田。"
      ]
    },
    "ko": {
      "name": "고산우롱 (삼림계)",
      "oneLine": "삼나무 숲 사이 차밭의 고산차 — 맑고 서늘한 향.",
      "oxidation": "약 20%",
      "ratioNote": "150ml에 6g",
      "rounds": "7회",
      "steepBasis": "95도에서 50초, 2포 25초, 3포 35초.",
      "origin": "난터우현 주산, 해발 1,600~1,800m.",
      "process": "위조 → 요청 → 살청 → 구형 유념 → 건조.",
      "story": "삼림계는 아리산 옆 고산 지대로, 숲과 안개가 많은 환경으로 알려져 있습니다.",
      "flavor": "맑은 꽃 향과 옅은 풀 향, 깨끗한 단맛.",
      "pairing": "과일, 가벼운 디저트.",
      "brewTip": "90~95도에서 짧게 여러 번.",
      "keep": "밀봉 냉장 또는 냉동.",
      "keywords": "삼림계 산림계 대만 고산우롱 주산"
    },
    "en": {
      "name": "High Mountain Oolong (Shanlinxi)",
      "oneLine": "High-mountain tea from cedar-forest plots — clean and cool.",
      "oxidation": "about 20%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "7 infusions",
      "steepBasis": "95 °C: 50 seconds, then 25, then 35.",
      "origin": "Zhushan, Nantou, 1,600–1,800 m.",
      "process": "Withered, shaken, fired, ball-rolled, dried.",
      "story": "Shanlinxi sits beside Alishan; its forest and fog are the region's signature.",
      "flavor": "Clear flowers, a little grass, clean sweetness.",
      "pairing": "Fruit, light desserts.",
      "brewTip": "Short infusions at 90–95 °C.",
      "keep": "Sealed, refrigerated or frozen.",
      "keywords": "Shanlinxi oolong Taiwan Zhushan high mountain"
    },
    "zh-CN": {
      "name": "杉林溪高山乌龙",
      "oneLine": "柳杉林间茶田的高山茶，清冷干净。",
      "oxidation": "约20%",
      "ratioNote": "150毫升配6克",
      "rounds": "7泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。",
      "origin": "南投竹山，海拔1600~1800米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉球 → 干燥。",
      "story": "杉林溪紧邻阿里山，以林荫与雾气著称。",
      "flavor": "清扬花香带一点草气，甘净。",
      "pairing": "水果、清淡甜点。",
      "brewTip": "90~95度短泡多道。",
      "keep": "密封冷藏或冷冻。",
      "keywords": "杉林溪 高山乌龙 台湾 竹山"
    },
    "zh-TW": {
      "name": "杉林溪高山烏龍",
      "oneLine": "柳杉林間茶田的高山茶，清冷乾淨。",
      "oxidation": "約20%",
      "ratioNote": "150毫升配6克",
      "rounds": "7泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。",
      "origin": "南投竹山，海拔1600~1800米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉球 → 乾燥。",
      "story": "杉林溪緊鄰阿里山，以林蔭與霧氣著稱。",
      "flavor": "清揚花香帶一點草氣，甘淨。",
      "pairing": "水果、清淡甜點。",
      "brewTip": "90~95度短泡多道。",
      "keep": "密封冷藏或冷凍。",
      "keywords": "杉林溪 高山烏龍 臺灣 竹山"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "oolong-lishan",
    "group": "oolong",
    "kind": "tea",
    "hanja": "梨",
    "sub": "High Mountain Oolong (Lishan)",
    "alias": [
      "이산 고산우롱",
      "이산",
      "이산 고산차"
    ],
    "hz": "梨山",
    "hs": "梨山",
    "rom": "Lishan",
    "temp": 95,
    "tempRange": "90~98℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      50,
      25,
      35
    ],
    "maxSteep": 8,
    "oxidationValue": 20,
    "traits": "t-morning t-afternoon a-fruit a-floral b-light k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-refresh",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "台灣"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 구형 유념 → 건조. 밤낮 온도차가 커 잎이 두껍습니다.",
        "타이중 허핑 일대, 해발 2,000m 안팎의 과수원 사이에서 자라는 고산차입니다."
      ],
      "en": [
        "Withered, shaken, fired, ball-rolled, dried; wide day-night swings thicken the leaf.",
        "Grown among orchards near Heping, Taichung, at around 2,000 m."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉球 → 干燥，日夜温差大，叶质厚。",
        "台中和平一带，海拔约2000米的果园之间。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉球 → 乾燥，日夜溫差大，葉質厚。",
        "臺中和平一帶，海拔約2000米的果園之間。"
      ]
    },
    "ko": {
      "name": "고산우롱 (이산)",
      "oneLine": "과수원 사이 해발 2,000m, 과일 향이 도는 고산차.",
      "oxidation": "약 20%",
      "ratioNote": "150ml에 6g",
      "rounds": "8회",
      "steepBasis": "95도에서 50초, 2포 25초, 3포 35초.",
      "origin": "타이중시 허핑구 이산 일대, 해발 1,800~2,600m.",
      "process": "위조 → 요청 → 살청 → 구형 유념 → 건조.",
      "story": "이산은 배·사과 과수원으로도 이름난 고산 지대이며, 차밭이 그 사이에 있습니다.",
      "flavor": "잘 익은 과일 향과 꽃 향, 부드러운 단맛.",
      "pairing": "배, 사과, 견과, 가벼운 디저트.",
      "brewTip": "90~95도에서 짧게. 3포부터 과일 향이 올라옵니다.",
      "keep": "밀봉 냉장. 개봉 후 한 달 안.",
      "keywords": "이산 고산차 대만 우롱 허핑 과수원"
    },
    "en": {
      "name": "High Mountain Oolong (Lishan)",
      "oneLine": "Ripened-fruit high mountain tea from among the orchards at 2,000 m.",
      "oxidation": "about 20%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "8 infusions",
      "steepBasis": "95 °C: 50 seconds, then 25, then 35.",
      "origin": "Lishan, Heping district, Taichung, 1,800–2,600 m.",
      "process": "Withered, shaken, fired, ball-rolled, dried.",
      "story": "Lishan is orchard country — pears and apples — with tea plots in between.",
      "flavor": "Ripe fruit and flowers, soft sweetness.",
      "pairing": "Pear, apple, nuts, light desserts.",
      "brewTip": "Short infusions at 90–95 °C; fruit arrives in the third.",
      "keep": "Sealed and refrigerated; use within a month of opening.",
      "keywords": "Lishan oolong Taiwan Taichung Heping fruit"
    },
    "zh-CN": {
      "name": "梨山高山乌龙",
      "oneLine": "果园之间海拔两千米，熟果香的高山茶。",
      "oxidation": "约20%",
      "ratioNote": "150毫升配6克",
      "rounds": "8泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。",
      "origin": "台中和平梨山一带，海拔1800~2600米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉球 → 干燥。",
      "story": "梨山以梨、苹果果园闻名，茶园散布其间。",
      "flavor": "熟果香与花香，甜柔。",
      "pairing": "梨、苹果、坚果、清淡甜点。",
      "brewTip": "90~95度短泡，第三泡起出果香。",
      "keep": "密封冷藏，开封后一个月内用完。",
      "keywords": "梨山 高山乌龙 台湾 和平 果园"
    },
    "zh-TW": {
      "name": "梨山高山烏龍",
      "oneLine": "果園之間海拔兩千米，熟果香的高山茶。",
      "oxidation": "約20%",
      "ratioNote": "150毫升配6克",
      "rounds": "8泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。",
      "origin": "臺中和平梨山一帶，海拔1800~2600米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉球 → 乾燥。",
      "story": "梨山以梨、蘋果果園聞名，茶園散布其間。",
      "flavor": "熟果香與花香，甜柔。",
      "pairing": "梨、蘋果、堅果、清淡甜點。",
      "brewTip": "90~95度短泡，第三泡起出果香。",
      "keep": "密封冷藏，開封後一個月內用完。",
      "keywords": "梨山 高山烏龍 臺灣 和平 果園"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "oolong-huangjingui",
    "group": "oolong",
    "kind": "tea",
    "hanja": "桂",
    "sub": "Huang Jin Gui",
    "alias": [
      "황금계",
      "황단"
    ],
    "hz": "黃金桂",
    "hs": "黄金桂",
    "rom": "Huang Jin Gui",
    "temp": 95,
    "tempRange": "90~98℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 6,
    "oxidationValue": 35,
    "traits": "t-morning t-afternoon a-floral a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조. 산화가 가벼워 꽃 향이 앞섭니다.",
        "안시의 황단(黃旦) 품종으로 만드는 차입니다. 향이 세차게 퍼져 ‘투천향(透天香)’이라는 별명이 있습니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried; light oxidation keeps the flowers up front.",
        "Made from the Huangdan cultivar of Anxi; its aroma is so forward the tea is nicknamed 'heaven-piercing fragrance'."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥，氧化轻，花香突出。",
        "用安溪黄旦品种制成，香气高扬，俗称“透天香”。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥，氧化輕，花香突出。",
        "用安溪黃旦品種製成，香氣高揚，俗稱「透天香」。"
      ]
    },
    "ko": {
      "name": "황금계",
      "oneLine": "향이 하늘을 뚫는다는 별명을 가진, 안시의 가벼운 우롱.",
      "oxidation": "약 35%",
      "ratioNote": "개완 110ml에 7g",
      "rounds": "6회",
      "steepBasis": "95도에서 30초, 2포 20초, 3포 25초.",
      "origin": "푸젠성 안시, 해발 400~800m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조.",
      "story": "황단 품종의 누런 잎에서 ‘황단’이라는 이름이 왔고, ‘황금계’는 황금빛 찻물과 계화 같은 향에서 붙은 이름이라고 전합니다.",
      "flavor": "밀크티 같은 크림 향과 꽃 향, 가벼운 단맛. 철관음보다 산화가 가볍습니다.",
      "pairing": "가벼운 디저트, 과일, 단독 음용.",
      "brewTip": "95도에서 짧게. 향이 세므로 2포부터 마시면 좋습니다.",
      "keep": "밀봉 냉장. 향이 날아가기 쉬워 개봉 후 빨리 마십니다.",
      "keywords": "황금계 황단 안시 우롱 투천향"
    },
    "en": {
      "name": "Huang Jin Gui",
      "oneLine": "Anxi's lighter oolong, nicknamed 'heaven-piercing fragrance'.",
      "oxidation": "about 35%",
      "ratioNote": "7 g in a 110 ml gaiwan",
      "rounds": "6 infusions",
      "steepBasis": "95 °C: 30 seconds, then 20, then 25.",
      "origin": "Anxi, Fujian, 400–800 m.",
      "process": "Withered, shaken, fired, rolled, dried.",
      "story": "The bush's yellowish leaf gives the name Huangdan; 'golden cassia' is said to name the golden liquor and osmanthus-like scent.",
      "flavor": "Creamy, milk-tea-like aroma with flowers and light sweetness; lighter than Tieguanyin.",
      "pairing": "Light desserts, fruit, or alone.",
      "brewTip": "Short at 95 °C; start from the second infusion to let the aroma settle.",
      "keep": "Sealed and cold; the aroma fades fast once opened.",
      "keywords": "Huang Jin Gui Huangdan Anxi oolong fragrant"
    },
    "zh-CN": {
      "name": "黄金桂",
      "oneLine": "香气高扬、号称“透天香”的安溪轻发酵乌龙。",
      "oxidation": "约35%",
      "ratioNote": "110毫升盖碗配7克",
      "rounds": "6泡",
      "steepBasis": "95度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "福建安溪，海拔400~800米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥。",
      "story": "黄旦之名源于叶色偏黄；“黄金桂”则指汤色金黄、香气如桂。",
      "flavor": "奶香与花香，轻甜，比铁观音氧化更轻。",
      "pairing": "清淡甜点、水果，或单独品饮。",
      "brewTip": "95度短泡，从第二泡喝起。",
      "keep": "密封冷藏，开封后尽快喝完。",
      "keywords": "黄金桂 黄旦 安溪 乌龙 透天香"
    },
    "zh-TW": {
      "name": "黃金桂",
      "oneLine": "香氣高揚、號稱「透天香」的安溪輕發酵烏龍。",
      "oxidation": "約35%",
      "ratioNote": "110毫升蓋碗配7克",
      "rounds": "6泡",
      "steepBasis": "95度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "福建安溪，海拔400~800米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥。",
      "story": "黃旦之名源於葉色偏黃；「黃金桂」則指湯色金黃、香氣如桂。",
      "flavor": "奶香與花香，輕甜，比鐵觀音氧化更輕。",
      "pairing": "清淡甜點、水果，或單獨品飲。",
      "brewTip": "95度短泡，從第二泡喝起。",
      "keep": "密封冷藏，開封後儘快喝完。",
      "keywords": "黃金桂 黃旦 安溪 烏龍 透天香"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-benshan",
    "group": "oolong",
    "kind": "tea",
    "hanja": "本",
    "sub": "Benshan Oolong",
    "alias": [
      "본산",
      "안시본산"
    ],
    "hz": "本山",
    "hs": "本山",
    "rom": "Benshan",
    "temp": 95,
    "tempRange": "90~98℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 7,
    "oxidationValue": 35,
    "traits": "t-morning t-afternoon a-floral a-grass b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조. 잎을 덜 비벼 향을 가볍게 남깁니다.",
        "철관음과 같은 안시 지역에서 나지만 향이 가볍고 값이 낮아 ‘철관음의 동생’으로 불립니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled less, dried, which keeps the aroma light.",
        "From the same Anxi area as Tieguanyin but lighter and cheaper — often called Tieguanyin's younger sibling."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 轻揉 → 干燥。",
        "与铁观音同产安溪，香气较轻、价格更低，俗称“铁观音的弟弟”。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 輕揉 → 乾燥。",
        "與鐵觀音同產安溪，香氣較輕、價格更低，俗稱「鐵觀音的弟弟」。"
      ]
    },
    "ko": {
      "name": "본산",
      "oneLine": "철관음의 동생이라 불리는, 가볍고 깨끗한 안시 우롱.",
      "oxidation": "약 35%",
      "ratioNote": "개완 110ml에 7g",
      "rounds": "7회",
      "steepBasis": "95도에서 30초, 2포 20초, 3포 25초.",
      "origin": "푸젠성 안시, 해발 500~900m.",
      "process": "위조 → 요청 → 살청 → 가벼운 유념 → 건조.",
      "story": "안시의 옛 재배 품종으로, 철관음보다 향이 얇고 값이 낮아 일상차로 많이 마십니다.",
      "flavor": "옅은 난초 향과 풀 향, 가벼운 단맛. 철관음보다 힘이 적습니다.",
      "pairing": "밥 반찬, 가벼운 중식.",
      "brewTip": "95도에서 짧게. 잎이 얇아 5포를 넘기면 힘이 빠집니다.",
      "keep": "밀봉 냉장.",
      "keywords": "본산 안시 우롱 철관음 동생"
    },
    "en": {
      "name": "Benshan Oolong",
      "oneLine": "The lighter, cheaper Anxi oolong — Tieguanyin's younger sibling.",
      "oxidation": "about 35%",
      "ratioNote": "7 g in a 110 ml gaiwan",
      "rounds": "7 infusions",
      "steepBasis": "95 °C: 30 seconds, then 20, then 25.",
      "origin": "Anxi, Fujian, 500–900 m.",
      "process": "Withered, shaken, fired, lightly rolled, dried.",
      "story": "An old Anxi cultivar, thinner in aroma than Tieguanyin and priced for everyday drinking.",
      "flavor": "Faint orchid and grass, light sweetness; less body than Tieguanyin.",
      "pairing": "Rice dishes and light Chinese food.",
      "brewTip": "Short at 95 °C; it thins out past the fifth infusion.",
      "keep": "Sealed and cold.",
      "keywords": "Benshan oolong Anxi lighter Tieguanyin"
    },
    "zh-CN": {
      "name": "本山",
      "oneLine": "铁观音的“弟弟”，安溪轻香型乌龙。",
      "oxidation": "约35%",
      "ratioNote": "110毫升盖碗配7克",
      "rounds": "7泡",
      "steepBasis": "95度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "福建安溪，海拔500~900米。",
      "process": "萎凋 → 摇青 → 炒青 → 轻揉 → 干燥。",
      "story": "安溪传统品种，香薄价低，多做日常口粮茶。",
      "flavor": "淡兰香与草气，轻甜，力道弱于铁观音。",
      "pairing": "家常饭菜、清淡中餐。",
      "brewTip": "95度短泡，五泡后转淡。",
      "keep": "密封冷藏。",
      "keywords": "本山 安溪 乌龙 铁观音"
    },
    "zh-TW": {
      "name": "本山",
      "oneLine": "鐵觀音的「弟弟」，安溪輕香型烏龍。",
      "oxidation": "約35%",
      "ratioNote": "110毫升蓋碗配7克",
      "rounds": "7泡",
      "steepBasis": "95度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "福建安溪，海拔500~900米。",
      "process": "萎凋 → 搖青 → 炒青 → 輕揉 → 乾燥。",
      "story": "安溪傳統品種，香薄價低，多做日常口糧茶。",
      "flavor": "淡蘭香與草氣，輕甜，力道弱於鐵觀音。",
      "pairing": "家常飯菜、清淡中餐。",
      "brewTip": "95度短泡，五泡後轉淡。",
      "keep": "密封冷藏。",
      "keywords": "本山 安溪 烏龍 鐵觀音"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-foshou",
    "group": "oolong",
    "kind": "tea",
    "hanja": "佛",
    "sub": "Yongchun Foshou",
    "alias": [
      "불수",
      "영춘불수"
    ],
    "hz": "永春佛手",
    "hs": "永春佛手",
    "rom": "Yongchun Foshou",
    "temp": 95,
    "tempRange": "90~98℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 7,
    "oxidationValue": 40,
    "traits": "t-afternoon t-night a-fruit a-floral b-full k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조. 잎이 두꺼워 향이 진하고 7포까지 갑니다.",
        "잎이 커서 부처손(佛手)을 닮았다고 해서 이름이 붙었습니다. 푸젠 융춘 지역의 차입니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried; the thick leaf holds aroma through many infusions.",
        "Named for leaves as big as a Buddha's-hand citron; it comes from Yongchun, Fujian."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥，叶厚耐泡。",
        "叶片大如佛手，故名，产自福建永春。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥，葉厚耐泡。",
        "葉片大如佛手，故名，產自福建永春。"
      ]
    },
    "ko": {
      "name": "영춘불수",
      "oneLine": "손바닥만 한 잎에서 나오는 배 같은 향 — 푸젠 융춘의 차.",
      "oxidation": "약 40%",
      "ratioNote": "개완 110ml에 7g",
      "rounds": "7회",
      "steepBasis": "95도에서 30초, 2포 20초, 3포 25초.",
      "origin": "푸젠성 융춘현이 주산지, 해발 500~900m. 품종 원산은 안계입니다.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조.",
      "story": "잎이 불수감(佛手柑)을 닮아 이름이 붙었고, 안계에서 융춘으로 전해져 민국 시기에 이미 이름이 알려졌습니다.",
      "flavor": "배·감 같은 달콤한 과일 향, 부드러운 몸통, 떫음이 적습니다.",
      "pairing": "배, 구운 과자, 견과.",
      "brewTip": "95도. 잎이 두꺼워 2포부터 향이 열리고 7포까지 갑니다.",
      "keep": "밀봉 냉장, 개봉 후 한 달 안.",
      "keywords": "영춘불수 불수 우롱 푸젠 배향"
    },
    "en": {
      "name": "Yongchun Foshou",
      "oneLine": "Pear-like sweetness from leaves as broad as a hand.",
      "oxidation": "about 40%",
      "ratioNote": "7 g in a 110 ml gaiwan",
      "rounds": "7 infusions",
      "steepBasis": "95 °C: 30 seconds, then 20, then 25.",
      "origin": "Chiefly Yongchun, Fujian, 500–900 m; the cultivar itself comes from Anxi.",
      "process": "Withered, shaken, fired, rolled, dried.",
      "story": "Named for a leaf shaped like a Buddha's-hand citron; carried from Anxi to Yongchun and already noted in the Republican era.",
      "flavor": "Sweet pear and persimmon fruit, soft body, little astringency.",
      "pairing": "Pear, baked sweets, nuts.",
      "brewTip": "95 °C; the thick leaf opens from the second infusion and lasts to the seventh.",
      "keep": "Sealed and cold; use within a month of opening.",
      "keywords": "Yongchun Foshou oolong Fujian pear aroma"
    },
    "zh-CN": {
      "name": "永春佛手",
      "oneLine": "叶片大如佛手，带梨子般甜香。",
      "oxidation": "约40%",
      "ratioNote": "110毫升盖碗配7克",
      "rounds": "7泡",
      "steepBasis": "95度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "主产福建永春，海拔500~900米，品种原产安溪。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥。",
      "story": "叶形似佛手柑而得名，由安溪传入永春，民国时期已见名气。",
      "flavor": "梨、柿般的熟果甜，汤体柔，涩轻。",
      "pairing": "梨、烤点心、坚果。",
      "brewTip": "95度，叶厚，第二泡起香，可到七泡。",
      "keep": "密封冷藏，开封后一个月内用完。",
      "keywords": "永春佛手 佛手 乌龙 福建 梨香"
    },
    "zh-TW": {
      "name": "永春佛手",
      "oneLine": "葉片大如佛手，帶梨子般甜香。",
      "oxidation": "約40%",
      "ratioNote": "110毫升蓋碗配7克",
      "rounds": "7泡",
      "steepBasis": "95度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "主產福建永春，海拔500~900米，品種原產安溪。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥。",
      "story": "葉形似佛手柑而得名，由安溪傳入永春，民國時期已見名氣。",
      "flavor": "梨、柿般的熟果甜，湯體柔，澀輕。",
      "pairing": "梨、烤點心、堅果。",
      "brewTip": "95度，葉厚，第二泡起香，可到七泡。",
      "keep": "密封冷藏，開封後一個月內用完。",
      "keywords": "永春佛手 佛手 烏龍 福建 梨香"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-muzha-tieguanyin",
    "group": "oolong",
    "kind": "tea",
    "hanja": "木",
    "sub": "Tieguanyin (Muzha)",
    "alias": [
      "목책 철관음",
      "타이베이 철관음"
    ],
    "hz": "木柵鐵觀音",
    "hs": "木栅铁观音",
    "rom": "Tieguanyin (Muzha)",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      35,
      20,
      25
    ],
    "maxSteep": 8,
    "oxidationValue": 45,
    "traits": "t-afternoon t-night a-roast a-fruit b-full k-sweet r-clean s-hot w-gongfu p-dessert c-high m-cozy",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "台灣"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념(구형) → 건조 → 숯불 배화. 배화를 여러 번 반복합니다.",
        "타이베이 무자 지역에서 19세기 말부터 만들어진 철관음입니다. 오랫동안 숯불에 배화해 두는 방식이 특징입니다."
      ],
      "en": [
        "Withered, shaken, fired, ball-rolled, dried, then baked over charcoal in repeated rounds.",
        "Tieguanyin made in Muzha, Taipei since the late 19th century, and known for long charcoal baking."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉球 → 干燥 → 炭焙，多次复焙。",
        "台北木栅自清末制作铁观音，以长时间炭焙著称。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉球 → 乾燥 → 炭焙，多次復焙。",
        "臺北木柵自清末製作鐵觀音，以長時間炭焙著稱。"
      ]
    },
    "ko": {
      "name": "철관음 (목책)",
      "oneLine": "숯불에 오래 배화한 타이베이의 철관음 — 구운 과일 향.",
      "oxidation": "약 45%",
      "ratioNote": "개완 110ml에 7g",
      "rounds": "8회",
      "steepBasis": "98도에서 35초, 2포 20초, 3포 25초.",
      "origin": "타이베이시 원산·무자 일대, 해발 300~500m.",
      "process": "위조 → 요청 → 살청 → 구형 유념 → 건조 → 숯불 배화.",
      "story": "1919년 장내묘·장내건 형제가 푸젠 안계에서 철관음 묘목을 들여와 무자에 심은 것이 시작으로, 총독부 공진회에서 1등을 받으며 이름이 알려졌습니다. 지금도 소규모 농가가 숯불 배화를 이어갑니다.",
      "flavor": "구운 과일과 캐러멜, 진한 단맛, 끝에 옅은 탄 향.",
      "pairing": "구운 견과, 캐러멜 디저트, 진한 중식.",
      "brewTip": "98도에서 세차 후 마십니다. 배화한 차는 2포부터 단맛이 살아납니다.",
      "keep": "밀봉해 서늘하게. 배화 향은 몇 해 두면 더 둥글어집니다.",
      "keywords": "목책 철관음 무자 타이베이 숯불배화"
    },
    "en": {
      "name": "Tieguanyin (Muzha)",
      "oneLine": "Long charcoal-baked Tieguanyin from Taipei — roasted fruit and caramel.",
      "oxidation": "about 45%",
      "ratioNote": "7 g in a 110 ml gaiwan",
      "rounds": "8 infusions",
      "steepBasis": "98 °C: 35 seconds, then 20, then 25.",
      "origin": "Wenshan and Muzha, Taipei, 300–500 m.",
      "process": "Withered, shaken, fired, ball-rolled, dried, charcoal-baked.",
      "story": "In 1919 the Zhang brothers brought Tieguanyin cuttings from Anxi in Fujian and planted them in Muzha; the tea took first prize at a governor-general's exhibition and made its name. Small farms still bake over charcoal.",
      "flavor": "Roasted fruit, caramel, deep sweetness, a light char at the end.",
      "pairing": "Roasted nuts, caramel desserts, rich Chinese food.",
      "brewTip": "98 °C, rinse first; sweetness comes from the second infusion.",
      "keep": "Sealed and cool; the bake rounds out over a few years.",
      "keywords": "Muzha Tieguanyin Taipei charcoal baked oolong"
    },
    "zh-CN": {
      "name": "木栅铁观音",
      "oneLine": "台北木栅长时间炭焙的铁观音，带烤果与焦糖香。",
      "oxidation": "约45%",
      "ratioNote": "110毫升盖碗配7克",
      "rounds": "8泡",
      "steepBasis": "98度泡35秒，第二泡20秒，第三泡25秒。",
      "origin": "台北文山、木栅一带，海拔300~500米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉球 → 干燥 → 炭焙。",
      "story": "1919年张乃妙、张乃干兄弟从福建安溪引入铁观音苗木种于木栅，在总督府共进会获一等奖而成名；如今仍有小农以炭火慢焙。",
      "flavor": "烤果与焦糖，甜厚，尾端微带焙火气。",
      "pairing": "烤坚果、焦糖甜点、味浓中餐。",
      "brewTip": "98度洗茶后饮用，第二泡起出甜。",
      "keep": "密封阴凉，焙火香随年份转圆。",
      "keywords": "木栅铁观音 台北 炭焙 乌龙"
    },
    "zh-TW": {
      "name": "木柵鐵觀音",
      "oneLine": "臺北木柵長時間炭焙的鐵觀音，帶烤果與焦糖香。",
      "oxidation": "約45%",
      "ratioNote": "110毫升蓋碗配7克",
      "rounds": "8泡",
      "steepBasis": "98度泡35秒，第二泡20秒，第三泡25秒。",
      "origin": "臺北文山、木柵一帶，海拔300~500米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉球 → 乾燥 → 炭焙。",
      "story": "1919年張乃妙、張乃干兄弟從福建安溪引入鐵觀音苗木種於木柵，在總督府共進會獲一等獎而成名；如今仍有小農以炭火慢焙。",
      "flavor": "烤果與焦糖，甜厚，尾端微帶焙火氣。",
      "pairing": "烤堅果、焦糖甜點、味濃中餐。",
      "brewTip": "98度洗茶後飲用，第二泡起出甜。",
      "keep": "密封陰涼，焙火香隨年份轉圓。",
      "keywords": "木柵鐵觀音 臺北 炭焙 烏龍"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "oolong-dancong-milan",
    "group": "oolong",
    "kind": "tea",
    "hanja": "蘭",
    "sub": "Mi Lan Xiang Dancong",
    "alias": [
      "밀란향",
      "밀란향 단총"
    ],
    "hz": "蜜蘭香",
    "hs": "蜜兰香",
    "rom": "Mi Lan Xiang",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      25,
      15,
      20
    ],
    "maxSteep": 10,
    "oxidationValue": 45,
    "traits": "t-afternoon t-night a-floral a-fruit b-full k-sweet r-clean s-hot w-gongfu p-dessert c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화. 나무 한 그루에서 한 향을 냅니다.",
        "광둥 차오저우 봉황산의 단총 가운데 가장 널리 퍼진 향형입니다. 꿀과 난초 향이 겹칩니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, lightly baked; each old bush gives its own aroma.",
        "The most widely planted aroma type among the Phoenix dancong of Chaozhou, Guangdong: honey over orchid."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火，一树一香。",
        "潮州凤凰单丛中最普及的香型，蜜香叠兰香。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火，一樹一香。",
        "潮州鳳凰單叢中最普及的香型，蜜香疊蘭香。"
      ]
    },
    "ko": {
      "name": "밀란향 단총",
      "oneLine": "꿀과 난초가 겹치는, 봉황단총의 대표 향형.",
      "oxidation": "약 45%",
      "ratioNote": "개완 110ml에 7g",
      "rounds": "10회 이상",
      "steepBasis": "98도에서 25초, 2포 15초, 3포 20초. 이후 5초씩 늘립니다.",
      "origin": "광둥성 차오저우 펑황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
      "story": "봉황산에서는 나무마다 향이 달라 나무에 이름을 붙여 따로 만드는 관행이 이어집니다.",
      "flavor": "꿀 같은 단맛과 난초 향, 진한 몸통, 여운이 깁니다.",
      "pairing": "과일, 꿀 디저트, 진한 중식.",
      "brewTip": "98도. 잎을 많이 넣고 짧게 여러 번. 4포부터 꿀 향이 짙어집니다.",
      "keep": "밀봉해 서늘하게. 향이 날아가지 않게 소분합니다.",
      "keywords": "밀란향 봉황단총 차오저우 우롱 꿀향"
    },
    "en": {
      "name": "Mi Lan Xiang Dancong",
      "oneLine": "Honey over orchid — the most planted Phoenix dancong aroma.",
      "oxidation": "about 45%",
      "ratioNote": "7 g in a 110 ml gaiwan",
      "rounds": "10+ infusions",
      "steepBasis": "98 °C: 25 seconds, then 15, then 20; add 5 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, lightly baked.",
      "story": "On Phoenix Mountain each old bush has its own aroma and is picked and made separately.",
      "flavor": "Honeyed sweetness, orchid, full body, a long finish.",
      "pairing": "Fruit, honey desserts, rich Chinese dishes.",
      "brewTip": "98 °C, lots of leaf, short repeated infusions; honey deepens from the fourth.",
      "keep": "Sealed and cool; split into small lots so the aroma stays.",
      "keywords": "Mi Lan Xiang dancong Phoenix oolong Chaozhou honey orchid"
    },
    "zh-CN": {
      "name": "蜜兰香单丛",
      "oneLine": "蜜香叠兰香，凤凰单丛最常见的香型。",
      "oxidation": "约45%",
      "ratioNote": "110毫升盖碗配7克",
      "rounds": "10泡以上",
      "steepBasis": "98度泡25秒，第二泡15秒，第三泡20秒，其后每泡加5秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙。",
      "story": "凤凰山一树一香，老丛单独采制并各取其名。",
      "flavor": "蜜甜与兰香，汤体厚，余韵长。",
      "pairing": "水果、蜂蜜甜点、味浓中餐。",
      "brewTip": "98度多投茶短泡，第四泡起蜜香更浓。",
      "keep": "密封阴凉，小包分装保香。",
      "keywords": "蜜兰香 单丛 潮州 凤凰 乌龙"
    },
    "zh-TW": {
      "name": "蜜蘭香單叢",
      "oneLine": "蜜香疊蘭香，鳳凰單叢最常見的香型。",
      "oxidation": "約45%",
      "ratioNote": "110毫升蓋碗配7克",
      "rounds": "10泡以上",
      "steepBasis": "98度泡25秒，第二泡15秒，第三泡20秒，其後每泡加5秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙。",
      "story": "鳳凰山一樹一香，老叢單獨採制並各取其名。",
      "flavor": "蜜甜與蘭香，湯體厚，餘韻長。",
      "pairing": "水果、蜂蜜甜點、味濃中餐。",
      "brewTip": "98度多投茶短泡，第四泡起蜜香更濃。",
      "keep": "密封陰涼，小包分裝保香。",
      "keywords": "蜜蘭香 單叢 潮州 鳳凰 烏龍"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-yashixiang",
    "group": "oolong",
    "kind": "tea",
    "hanja": "香",
    "sub": "Ya Shi Xiang Dancong",
    "alias": [
      "압시향",
      "은화향"
    ],
    "hz": "鴨屎香",
    "hs": "鸭屎香",
    "rom": "Ya Shi Xiang",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      25,
      15,
      20
    ],
    "maxSteep": 10,
    "oxidationValue": 45,
    "traits": "t-afternoon t-night a-floral a-fruit b-full k-sweet r-clean s-hot w-gongfu p-dessert c-high m-energy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
        "이름은 거칠지만 향은 은은한 꽃 향이라 ‘은화향(銀花香)’으로도 부릅니다. 원래 이름은 재배지 흙 이름에서 왔다는 이야기가 전합니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, lightly baked.",
        "The rough name hides a silvery floral aroma, so it is also sold as 'Yin Hua Xiang' (silver flower)."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙。",
        "名字粗俗，香气却是清雅银花香，故又称“银花香”。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙。",
        "名字粗俗，香氣卻是清雅銀花香，故又稱「銀花香」。"
      ]
    },
    "ko": {
      "name": "압시 우롱",
      "oneLine": "거친 이름 뒤에 은은한 꽃 향이 있는 봉황단총.",
      "oxidation": "약 45%",
      "ratioNote": "개완 110ml에 7g",
      "rounds": "10회 이상",
      "steepBasis": "98도에서 25초, 2포 15초, 3포 20초.",
      "origin": "광둥성 차오저우 펑황산, 해발 800~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
      "story": "흙이 오리 똥처럼 보여 ‘압시향’이라 불렀다는 설과, 좋은 차나무를 숨기려 일부러 거친 이름을 붙였다는 설이 전합니다. 2014년에는 공식 이름이 ‘은화향(銀花香)’으로 바뀌었습니다.",
      "flavor": "은방울꽃 같은 청량한 꽃 향, 산뜻한 단맛, 여운이 깁니다.",
      "pairing": "가벼운 디저트, 과일, 단독 음용.",
      "brewTip": "98도에서 짧게. 2포에서 꽃 향이 가장 맑습니다.",
      "keep": "밀봉해 서늘하게, 소분 보관.",
      "keywords": "압시향 은화향 봉황단총 차오저우"
    },
    "en": {
      "name": "Ya Shi Xiang",
      "oneLine": "A rough name for a silvery, cool floral dancong.",
      "oxidation": "about 45%",
      "ratioNote": "7 g in a 110 ml gaiwan",
      "rounds": "10+ infusions",
      "steepBasis": "98 °C: 25 seconds, then 15, then 20.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 800–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, lightly baked.",
      "story": "The name is said to come from soil that looked like duck droppings — or to be a deliberately coarse name hiding a fine bush. In 2014 it was officially renamed Yin Hua Xiang (silver flower fragrance).",
      "flavor": "Cool lily-of-the-valley florals, bright sweetness, a long finish.",
      "pairing": "Light desserts, fruit, or alone.",
      "brewTip": "Short at 98 °C; the clearest flowers are in the second infusion.",
      "keep": "Sealed, cool, in small lots.",
      "keywords": "Ya Shi Xiang duck shit aroma dancong silver flower oolong"
    },
    "zh-CN": {
      "name": "鸭屎香",
      "oneLine": "名字粗俗，香却是清冷的银花香。",
      "oxidation": "约45%",
      "ratioNote": "110毫升盖碗配7克",
      "rounds": "10泡以上",
      "steepBasis": "98度泡25秒，第二泡15秒，第三泡20秒。",
      "origin": "广东潮州凤凰山，海拔800~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙。",
      "story": "相传因土色像鸭屎得名，也有一说是故意取粗名藏好树。2014年正式更名为“银花香”。",
      "flavor": "铃兰般的清花香，甜爽，余韵长。",
      "pairing": "清淡甜点、水果，或单独品饮。",
      "brewTip": "98度短泡，第二泡花香最清。",
      "keep": "密封阴凉，小包分装。",
      "keywords": "鸭屎香 银花香 凤凰单丛 潮州"
    },
    "zh-TW": {
      "name": "鴨屎香",
      "oneLine": "名字粗俗，香卻是清冷的銀花香。",
      "oxidation": "約45%",
      "ratioNote": "110毫升蓋碗配7克",
      "rounds": "10泡以上",
      "steepBasis": "98度泡25秒，第二泡15秒，第三泡20秒。",
      "origin": "廣東潮州鳳凰山，海拔800~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙。",
      "story": "相傳因土色像鴨屎得名，也有一說是故意取粗名藏好樹。2014年正式更名為「銀花香」。",
      "flavor": "鈴蘭般的清花香，甜爽，餘韻長。",
      "pairing": "清淡甜點、水果，或單獨品飲。",
      "brewTip": "98度短泡，第二泡花香最清。",
      "keep": "密封陰涼，小包分裝。",
      "keywords": "鴨屎香 銀花香 鳳凰單叢 潮州"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-hongshui",
    "group": "oolong",
    "kind": "tea",
    "hanja": "紅",
    "sub": "Hong Shui Oolong",
    "alias": [
      "홍수우롱",
      "전통 홍수"
    ],
    "hz": "紅水烏龍",
    "hs": "红水乌龙",
    "rom": "Hong Shui Oolong",
    "temp": 95,
    "tempRange": "90~98℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      40,
      25,
      30
    ],
    "maxSteep": 7,
    "oxidationValue": 60,
    "traits": "t-afternoon t-night a-fruit a-roast b-full k-sweet r-clean s-hot w-gongfu p-dessert c-high m-cozy",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "台灣"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 산화가 깊어 물색이 붉습니다.",
        "산화를 60% 안팎까지 올리고 배화한 대만의 전통식 우롱입니다. 1970년대 이후 가벼운 우롱에 밀려 줄었습니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, baked; deeper oxidation gives the red liquor its name.",
        "Taiwan's older style, oxidised to around 60% and baked; it lost ground to light oolong from the 1970s."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火，氧化深，汤色偏红。",
        "台湾传统式乌龙，氧化约60%并焙火，1970年代后为轻发酵乌龙取代。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火，氧化深，湯色偏紅。",
        "臺灣傳統式烏龍，氧化約60%並焙火，1970年代後為輕發酵烏龍取代。"
      ]
    },
    "ko": {
      "name": "홍수우롱",
      "oneLine": "산화를 깊게 올린 대만의 옛 방식 — 붉은 물색의 우롱.",
      "oxidation": "약 60%",
      "ratioNote": "150ml에 6g",
      "rounds": "7회",
      "steepBasis": "95도에서 40초, 2포 25초, 3포 30초.",
      "origin": "난터우·자이 일대, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "1970년대 이후 가볍게 만든 고산 우롱이 인기를 얻으면서 생산이 크게 줄었습니다.",
      "flavor": "잘 익은 과일과 꿀, 구운 향. 홍차에 가까운 진한 물색입니다.",
      "pairing": "구운 과자, 말린 과일, 치즈.",
      "brewTip": "95도에서 40초. 진하게 우려도 떫음이 적습니다.",
      "keep": "밀봉해 서늘하게. 배화한 차는 오래 둘수록 부드러워집니다.",
      "keywords": "홍수우롱 대만 전통 우롱 배화 진산"
    },
    "en": {
      "name": "Hong Shui Oolong",
      "oneLine": "Taiwan's older deep-oxidised style — an oolong with red liquor.",
      "oxidation": "about 60%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "7 infusions",
      "steepBasis": "95 °C: 40 seconds, then 25, then 30.",
      "origin": "Nantou and Chiayi, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, baked.",
      "story": "Production fell sharply after the 1970s as light, high-mountain oolong took over the market.",
      "flavor": "Ripe fruit, honey, a baked note; the liquor is nearly as dark as black tea.",
      "pairing": "Baked sweets, dried fruit, cheese.",
      "brewTip": "40 seconds at 95 °C; it stays soft even when strong.",
      "keep": "Sealed and cool; baked tea softens with years.",
      "keywords": "Hong Shui oolong Taiwan traditional deep oxidation baked"
    },
    "zh-CN": {
      "name": "红水乌龙",
      "oneLine": "深氧化的台湾传统乌龙，汤色近红。",
      "oxidation": "约60%",
      "ratioNote": "150毫升配6克",
      "rounds": "7泡",
      "steepBasis": "95度泡40秒，第二泡25秒，第三泡30秒。",
      "origin": "南投、嘉义一带，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火。",
      "story": "1970年代后轻发酵高山乌龙兴起，产量大减。",
      "flavor": "熟果、蜜香与焙火气，汤色接近红茶。",
      "pairing": "烤点心、果干、奶酪。",
      "brewTip": "95度40秒，浓泡也不涩。",
      "keep": "密封阴凉，久存转柔。",
      "keywords": "红水乌龙 台湾 传统乌龙 焙火"
    },
    "zh-TW": {
      "name": "紅水烏龍",
      "oneLine": "深氧化的臺灣傳統烏龍，湯色近紅。",
      "oxidation": "約60%",
      "ratioNote": "150毫升配6克",
      "rounds": "7泡",
      "steepBasis": "95度泡40秒，第二泡25秒，第三泡30秒。",
      "origin": "南投、嘉義一帶，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火。",
      "story": "1970年代後輕發酵高山烏龍興起，產量大減。",
      "flavor": "熟果、蜜香與焙火氣，湯色接近紅茶。",
      "pairing": "烤點心、果乾、奶酪。",
      "brewTip": "95度40秒，濃泡也不澀。",
      "keep": "密封陰涼，久存轉柔。",
      "keywords": "紅水烏龍 臺灣 傳統烏龍 焙火"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "oolong-thai-doi",
    "group": "oolong",
    "kind": "tea",
    "hanja": "泰",
    "sub": "Oolong (Doi Mae Salong)",
    "alias": [
      "도이매살롱 우롱",
      "도이매살롱",
      "태국 우롱"
    ],
    "hz": "泰北烏龍",
    "hs": "泰北乌龙",
    "rom": "Oolong (Doi Mae Salong)",
    "temp": 95,
    "tempRange": "90~95℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      45,
      25,
      30
    ],
    "maxSteep": 6,
    "oxidationValue": 25,
    "traits": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot s-iced w-gongfu p-dessert c-mid m-refresh",
    "originCountry": {
      "ko": "태국",
      "en": "Thailand",
      "zh-CN": "泰国",
      "zh-TW": "泰國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 구형 유념 → 건조. 태국 북부의 서늘한 고도에서 자랍니다.",
        "타이북 치앙라이 도이매살롱 일대에서 만드는 우롱입니다. 20세기 후반 대만의 제법과 묘목이 들어와 자리 잡았습니다."
      ],
      "en": [
        "Withered, shaken, fired, ball-rolled, dried, at cool northern Thai altitudes.",
        "Oolong from Doi Mae Salong in Chiang Rai, northern Thailand, where Taiwanese methods and seedlings arrived in the late 20th century."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉球 → 干燥。",
        "泰国北部清莱美斯乐一带的乌龙，20世纪后期引入台湾工艺与茶苗。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉球 → 乾燥。",
        "泰國北部清萊美斯樂一帶的烏龍，20世紀後期引入臺灣工藝與茶苗。"
      ]
    },
    "ko": {
      "name": "우롱 (도이매살롱)",
      "oneLine": "대만 제법이 건너가 자리 잡은 태국 북부의 우롱.",
      "oxidation": "약 25%",
      "ratioNote": "150ml에 6g",
      "rounds": "6회",
      "steepBasis": "95도에서 45초, 2포 25초, 3포 30초.",
      "origin": "태국 치앙라이 도이매살롱, 해발 1,000~1,400m.",
      "process": "위조 → 요청 → 살청 → 구형 유념 → 건조.",
      "story": "20세기 후반 대만에서 묘목과 제법이 들어와 북부 산지에 우롱 재배가 자리 잡았습니다.",
      "flavor": "가벼운 꽃 향과 단맛, 대만 고산차보다 힘이 부드럽습니다.",
      "pairing": "태국 요리, 과일, 아이스티.",
      "brewTip": "90~95도에서 짧게. 차갑게 우려도 향이 살아 있습니다.",
      "keep": "밀봉 냉장.",
      "keywords": "도이매살롱 태국 우롱 치앙라이"
    },
    "en": {
      "name": "Oolong (Doi Mae Salong)",
      "oneLine": "Thai highland oolong grown from Taiwanese methods and seedlings.",
      "oxidation": "about 25%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "6 infusions",
      "steepBasis": "95 °C: 45 seconds, then 25, then 30.",
      "origin": "Doi Mae Salong, Chiang Rai, Thailand, 1,000–1,400 m.",
      "process": "Withered, shaken, fired, ball-rolled, dried.",
      "story": "Seedlings and methods came from Taiwan in the late 20th century and took root in the north.",
      "flavor": "Light flowers and sweetness, softer in body than Taiwan high-mountain oolong.",
      "pairing": "Thai food, fruit, iced tea.",
      "brewTip": "Short at 90–95 °C; it also keeps its aroma cold-brewed.",
      "keep": "Sealed and refrigerated.",
      "keywords": "Doi Mae Salong Thai oolong Chiang Rai highland"
    },
    "zh-CN": {
      "name": "美斯乐乌龙",
      "oneLine": "台湾工艺与茶苗在泰北落地生根的乌龙。",
      "oxidation": "约25%",
      "ratioNote": "150毫升配6克",
      "rounds": "6泡",
      "steepBasis": "95度泡45秒，第二泡25秒，第三泡30秒。",
      "origin": "泰国清莱美斯乐，海拔1000~1400米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉球 → 干燥。",
      "story": "20世纪后期台湾茶苗与工艺传入，泰北山区发展出乌龙茶产业。",
      "flavor": "轻花香与甜，茶体比台湾高山茶柔。",
      "pairing": "泰式料理、水果、冰茶。",
      "brewTip": "90~95度短泡，冷泡也香。",
      "keep": "密封冷藏。",
      "keywords": "美斯乐 泰国 乌龙 清莱 高山"
    },
    "zh-TW": {
      "name": "美斯樂烏龍",
      "oneLine": "臺灣工藝與茶苗在泰北落地生根的烏龍。",
      "oxidation": "約25%",
      "ratioNote": "150毫升配6克",
      "rounds": "6泡",
      "steepBasis": "95度泡45秒，第二泡25秒，第三泡30秒。",
      "origin": "泰國清萊美斯樂，海拔1000~1400米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉球 → 乾燥。",
      "story": "20世紀後期臺灣茶苗與工藝傳入，泰北山區發展出烏龍茶產業。",
      "flavor": "輕花香與甜，茶體比臺灣高山茶柔。",
      "pairing": "泰式料理、水果、冰茶。",
      "brewTip": "90~95度短泡，冷泡也香。",
      "keep": "密封冷藏。",
      "keywords": "美斯樂 泰國 烏龍 清萊 高山"
    },
    "originCountryCode": "th"
  },
  {
    "id": "oolong-vietnam-mocchau",
    "group": "oolong",
    "kind": "tea",
    "hanja": "越",
    "sub": "Oolong (Moc Chau)",
    "alias": [
      "목쩌우 우롱",
      "목쩌우",
      "베트남 우롱"
    ],
    "hz": "木州烏龍",
    "hs": "木州乌龙",
    "rom": "Oolong (Moc Chau)",
    "temp": 90,
    "tempRange": "85~95℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      45,
      25,
      30
    ],
    "maxSteep": 5,
    "oxidationValue": 30,
    "traits": "t-morning t-afternoon a-grass a-floral b-medium k-sweet r-clean s-hot s-iced w-gongfu p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "베트남",
      "en": "Vietnam",
      "zh-CN": "越南",
      "zh-TW": "越南"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조. 해발 1,000m 안팎의 서늘한 고원에서 자랍니다.",
        "베트남 선라성 목쩌우 고원의 차입니다. 20세기 초 프랑스가 차 재배를 들여왔고, 이후 대만식 우롱 제법도 들어왔습니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried at around 1,000 m.",
        "Tea from the Moc Chau plateau in Son La, Vietnam. The French introduced tea growing in the early 20th century; Taiwanese oolong methods came later."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥，海拔约1000米。",
        "越南山罗省木州高原的茶。20世纪初法国引入茶树栽培，后来也引进台湾乌龙工艺。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥，海拔約1000米。",
        "越南山羅省木州高原的茶。20世紀初法國引入茶樹栽培，後來也引進臺灣烏龍工藝。"
      ]
    },
    "ko": {
      "name": "우롱 (목쩌우)",
      "oneLine": "프랑스가 차를 들여온 베트남 고원의 우롱.",
      "oxidation": "약 30%",
      "ratioNote": "150ml에 6g",
      "rounds": "5회",
      "steepBasis": "90도에서 45초, 2포 25초, 3포 30초.",
      "origin": "베트남 선라성 목쩌우 고원, 해발 900~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조.",
      "story": "20세기 초 프랑스가 차 재배를 들여왔고, 이후 대만식 우롱 제법이 더해졌습니다.",
      "flavor": "풀 향과 가벼운 꽃 향, 깨끗한 단맛. 대만 우롱보다 산뜻합니다.",
      "pairing": "베트남 요리, 쌀국수, 아이스티.",
      "brewTip": "90도에서 짧게. 진하게 우리면 떫음이 빨리 나옵니다.",
      "keep": "밀봉 냉장.",
      "keywords": "목쩌우 베트남 우롱 선라 고원"
    },
    "en": {
      "name": "Oolong (Moc Chau)",
      "oneLine": "Vietnamese highland oolong from a plateau the French first planted.",
      "oxidation": "about 30%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "5 infusions",
      "steepBasis": "90 °C: 45 seconds, then 25, then 30.",
      "origin": "Moc Chau plateau, Son La, Vietnam, 900–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried.",
      "story": "The French brought tea growing in the early 20th century; Taiwanese oolong methods followed.",
      "flavor": "Grass and light flowers, clean sweetness — fresher than Taiwan oolong.",
      "pairing": "Vietnamese food, pho, iced tea.",
      "brewTip": "Short at 90 °C; brewed strong it turns astringent quickly.",
      "keep": "Sealed and refrigerated.",
      "keywords": "Moc Chau oolong Vietnam Son La highland"
    },
    "zh-CN": {
      "name": "木州乌龙",
      "oneLine": "法国人最早引种、越南高原上的乌龙茶。",
      "oxidation": "约30%",
      "ratioNote": "150毫升配6克",
      "rounds": "5泡",
      "steepBasis": "90度泡45秒，第二泡25秒，第三泡30秒。",
      "origin": "越南山罗省木州高原，海拔900~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥。",
      "story": "20世纪初法国引入茶树，其后又引入台湾乌龙工艺。",
      "flavor": "青草与淡花香，甘净，比台湾乌龙更清爽。",
      "pairing": "越南菜、河粉、冰茶。",
      "brewTip": "90度短泡，久泡易涩。",
      "keep": "密封冷藏。",
      "keywords": "木州乌龙 越南 山罗 高原"
    },
    "zh-TW": {
      "name": "木州烏龍",
      "oneLine": "法國人最早引種、越南高原上的烏龍茶。",
      "oxidation": "約30%",
      "ratioNote": "150毫升配6克",
      "rounds": "5泡",
      "steepBasis": "90度泡45秒，第二泡25秒，第三泡30秒。",
      "origin": "越南山羅省木州高原，海拔900~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥。",
      "story": "20世紀初法國引入茶樹，其後又引入臺灣烏龍工藝。",
      "flavor": "青草與淡花香，甘淨，比臺灣烏龍更清爽。",
      "pairing": "越南菜、河粉、冰茶。",
      "brewTip": "90度短泡，久泡易澀。",
      "keep": "密封冷藏。",
      "keywords": "木州烏龍 越南 山羅 高原"
    },
    "originCountryCode": "vn"
  },
  {
    "id": "black-lapsang-unsmoked",
    "group": "black",
    "kind": "tea",
    "hanja": "山",
    "sub": "Zhengshan Xiaozhong (unsmoked)",
    "alias": [
      "정산소종 무연",
      "무연 정산소종"
    ],
    "hz": "正山小種",
    "hs": "正山小种",
    "rom": "Zhengshan Xiaozhong",
    "temp": 90,
    "tempRange": "85~95℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      150,
      120,
      150
    ],
    "maxSteep": 3,
    "oxidationValue": 90,
    "traits": "t-morning t-afternoon a-fruit a-malt b-medium k-sweet r-clean s-hot s-milk p-dessert c-mid m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 마지막 건조를 숯불에만 해 연기를 쐬지 않습니다.",
        "정산소종 가운데 소나무 연기로 건조하지 않은 쪽입니다. 잎과 물색이 연기 없이 깨끗합니다."
      ],
      "en": [
        "Withered, rolled, oxidised, dried over charcoal only — no smoking.",
        "The branch of Zhengshan Xiaozhong that is not smoke-dried: leaf and liquor are clean, without pine smoke."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 炭焙，不熏烟。",
        "正山小种中不经松烟熏焙的一路，叶与汤都不带烟味。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 炭焙，不燻煙。",
        "正山小種中不經松煙燻焙的一路，葉與湯都不帶煙味。"
      ]
    },
    "ko": {
      "name": "정산소종 (무연)",
      "oneLine": "연기 없이 만든 정산소종 — 꽃과 말린 과일이 그대로.",
      "oxidation": "약 90%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "90도에서 2분 30초, 2포 2분, 3포 2분 30초.",
      "origin": "푸젠성 우이산 퉁무관 일대, 해발 800~1,500m.",
      "process": "위조 → 유념 → 산화 → 숯불 건조. 연기를 쐬지 않습니다.",
      "story": "정산소종은 세계에서 가장 오래된 홍차로 꼽히며, 17세기 유럽에 ‘랍상 소총’으로 수출되었습니다. 무연 제품은 20세기 후반 소비 취향에 맞춰 따로 만들어집니다.",
      "flavor": "말린 과일·꿀·꽃 향, 부드러운 몸통. 연기 향이 없어 홍차의 본래 향이 잘 드러납니다.",
      "pairing": "과일 타르트, 훈제하지 않은 구운 고기, 디저트.",
      "brewTip": "90도에서 2분 30초. 우유를 넣어도 향이 남습니다.",
      "keep": "밀봉해 서늘하고 건조하게.",
      "keywords": "정산소종 무연 랍상소총 우이산 홍차"
    },
    "en": {
      "name": "Zhengshan Xiaozhong (unsmoked)",
      "oneLine": "The smoke-free branch — flowers and dried fruit left in plain view.",
      "oxidation": "about 90%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "90 °C: 2½ minutes, then 2, then 2½.",
      "origin": "Tongmuguan, Wuyi Mountains, Fujian, 800–1,500 m.",
      "process": "Withered, rolled, oxidised, charcoal-dried without smoking.",
      "story": "Zhengshan Xiaozhong is often called the oldest black tea and reached Europe as Lapsang Souchong in the 17th century; unsmoked versions were developed for modern taste.",
      "flavor": "Dried fruit, honey, flowers, soft body — the base tea without smoke.",
      "pairing": "Fruit tarts, un-smoked roast meat, desserts.",
      "brewTip": "2½ minutes at 90 °C; it also holds up with milk.",
      "keep": "Sealed, cool and dry.",
      "keywords": "Zhengshan Xiaozhong unsmoked Lapsang Wuyi black tea"
    },
    "zh-CN": {
      "name": "正山小种（无烟）",
      "oneLine": "不熏烟的正山小种，花果香原样呈现。",
      "oxidation": "约90%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "90度泡2分30秒，第二泡2分钟，第三泡2分30秒。",
      "origin": "福建武夷山桐木关一带，海拔800~1500米。",
      "process": "萎凋 → 揉捻 → 发酵 → 炭焙，不熏烟。",
      "story": "正山小种被视为最早的红茶，17世纪以“Lapsang Souchong”之名进入欧洲；无烟型为适应现代口味而制。",
      "flavor": "果干、蜂蜜与花香，汤体柔，无烟味。",
      "pairing": "水果挞、非熏制烤肉、甜点。",
      "brewTip": "90度两分半，加奶亦香。",
      "keep": "密封阴凉干燥。",
      "keywords": "正山小种 无烟 武夷山 红茶"
    },
    "zh-TW": {
      "name": "正山小種（無煙）",
      "oneLine": "不燻煙的正山小種，花果香原樣呈現。",
      "oxidation": "約90%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "90度泡2分30秒，第二泡2分鐘，第三泡2分30秒。",
      "origin": "福建武夷山桐木關一帶，海拔800~1500米。",
      "process": "萎凋 → 揉捻 → 發酵 → 炭焙，不燻煙。",
      "story": "正山小種被視為最早的紅茶，17世紀以「Lapsang Souchong」之名進入歐洲；無煙型為適應現代口味而制。",
      "flavor": "果乾、蜂蜜與花香，湯體柔，無煙味。",
      "pairing": "水果撻、非燻制烤肉、甜點。",
      "brewTip": "90度兩分半，加奶亦香。",
      "keep": "密封陰涼乾燥。",
      "keywords": "正山小種 無煙 武夷山 紅茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "black-yingde",
    "group": "black",
    "kind": "tea",
    "hanja": "英",
    "sub": "Black Tea (Yingde)",
    "alias": [
      "잉더 홍차",
      "영덕홍차(광둥)",
      "잉더홍차"
    ],
    "hz": "英德紅茶",
    "hs": "英德红茶",
    "rom": "Hongcha (Yingde)",
    "temp": 95,
    "tempRange": "90~100℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      180,
      180,
      240
    ],
    "maxSteep": 3,
    "oxidationValue": 95,
    "traits": "t-morning t-afternoon a-malt a-fruit b-full k-sweet r-clean s-hot s-milk p-meal c-high m-energy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 잎이 커 산화가 오래 걸립니다.",
        "광둥 영덕의 대엽종으로 만드는 홍차입니다. 진하고 밝은 물색으로 밀크티 베이스로도 씁니다."
      ],
      "en": [
        "Withered, rolled, oxidised, dried — the big leaf needs a long oxidation.",
        "A Guangdong black tea from large-leaf bushes at Yingde; strong and bright, and used as a milk-tea base."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥，叶大发酵时间长。",
        "广东英德大叶种红茶，浓强明亮，常作奶茶基底。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥，葉大發酵時間長。",
        "廣東英德大葉種紅茶，濃強明亮，常作奶茶基底。"
      ]
    },
    "ko": {
      "name": "영덕홍차 (광둥)",
      "oneLine": "광둥 대엽종의 힘 — 진하고 밝은 홍차.",
      "oxidation": "약 95%",
      "ratioNote": "200ml에 3g, 밀크티는 150ml에 5g",
      "rounds": "3회",
      "steepBasis": "95도에서 3분, 2포 3분, 3포 4분.",
      "origin": "광둥성 영덕시 일대, 해발 200~800m.",
      "process": "위조 → 유념 → 산화 → 건조.",
      "story": "1959년에 만들어지기 시작해 중국 남부의 대표 홍차로 자리 잡았습니다.",
      "flavor": "몰트와 꿀, 붉은 과일 향. 진한 물색에 우유를 넣어도 향이 남습니다.",
      "pairing": "아침 식사, 밀크티, 구운 고기.",
      "brewTip": "95도에서 3분. 밀크티로 마시려면 잎을 두 배로.",
      "keep": "밀봉해 서늘하고 건조하게.",
      "keywords": "영덕홍차 잉더 홍차 광둥 대엽종 밀크티"
    },
    "en": {
      "name": "Black Tea (Yingde)",
      "oneLine": "Guangdong large-leaf strength — dark and bright.",
      "oxidation": "about 95%",
      "ratioNote": "3 g to 200 ml; 5 g to 150 ml for milk tea",
      "rounds": "3 infusions",
      "steepBasis": "95 °C: 3 minutes, then 3, then 4.",
      "origin": "Yingde, Guangdong, 200–800 m.",
      "process": "Withered, rolled, oxidised, dried.",
      "story": "Production began in 1959 and it became southern China's standard black tea.",
      "flavor": "Malt, honey, red fruit; dark liquor that keeps its aroma with milk.",
      "pairing": "Breakfast, milk tea, roast meat.",
      "brewTip": "3 minutes at 95 °C; double the leaf for milk tea.",
      "keep": "Sealed, cool and dry.",
      "keywords": "Yingde black tea Guangdong large leaf milk tea"
    },
    "zh-CN": {
      "name": "英德红茶",
      "oneLine": "广东大叶种的力度，浓强明亮。",
      "oxidation": "约95%",
      "ratioNote": "200毫升配3克，奶茶用150毫升配5克",
      "rounds": "3泡",
      "steepBasis": "95度泡3分钟，第二泡3分钟，第三泡4分钟。",
      "origin": "广东英德一带，海拔200~800米。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥。",
      "story": "1959年开始生产，成为华南代表红茶。",
      "flavor": "麦芽、蜂蜜与红果香，汤浓，加奶仍香。",
      "pairing": "早餐、奶茶、烤肉。",
      "brewTip": "95度三分钟；做奶茶投茶加倍。",
      "keep": "密封阴凉干燥。",
      "keywords": "英德红茶 广东 大叶种 奶茶"
    },
    "zh-TW": {
      "name": "英德紅茶",
      "oneLine": "廣東大葉種的力度，濃強明亮。",
      "oxidation": "約95%",
      "ratioNote": "200毫升配3克，奶茶用150毫升配5克",
      "rounds": "3泡",
      "steepBasis": "95度泡3分鐘，第二泡3分鐘，第三泡4分鐘。",
      "origin": "廣東英德一帶，海拔200~800米。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥。",
      "story": "1959年開始生產，成為華南代表紅茶。",
      "flavor": "麥芽、蜂蜜與紅果香，湯濃，加奶仍香。",
      "pairing": "早餐、奶茶、烤肉。",
      "brewTip": "95度三分鐘；做奶茶投茶加倍。",
      "keep": "密封陰涼乾燥。",
      "keywords": "英德紅茶 廣東 大葉種 奶茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "black-rize",
    "group": "black",
    "kind": "tea",
    "hanja": "茶",
    "sub": "Rize Cay",
    "alias": [
      "리제 차",
      "터키 홍차"
    ],
    "hz": "里澤紅茶",
    "hs": "里泽红茶",
    "rom": "Rize Cay",
    "temp": 95,
    "tempRange": "90~100℃",
    "leaf": "4g",
    "water": "150ml",
    "steeps": [
      300,
      300
    ],
    "maxSteep": 2,
    "oxidationValue": 95,
    "traits": "t-morning t-afternoon a-malt b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
    "originCountry": {
      "ko": "튀르키예",
      "en": "Türkiye",
      "zh-CN": "土耳其",
      "zh-TW": "土耳其"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 대부분 CTC에 가까운 잘게 부순 잎으로 만듭니다.",
        "흑해 연안 리제는 튀르키예 차 생산의 중심입니다. 작은 유리잔(차이 바르다)에 진하게 우려 마십니다."
      ],
      "en": [
        "Withered, rolled, oxidised, dried; mostly finely broken leaf, close to CTC.",
        "Rize on the Black Sea coast is the centre of Turkish tea; it is brewed strong and served in small tulip glasses."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥，多为细碎叶。",
        "黑海沿岸里泽是土耳其茶叶主产区，浓泡后用小郁金香杯饮用。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥，多為細碎葉。",
        "黑海沿岸裡澤是土耳其茶葉主產區，濃泡後用小鬱金香杯飲用。"
      ]
    },
    "ko": {
      "name": "리제",
      "oneLine": "작은 유리잔에 진하게 — 흑해 연안의 매일 차.",
      "oxidation": "약 95%",
      "ratioNote": "150ml에 4g",
      "rounds": "2회",
      "steepBasis": "95도에서 5분 진하게. 두 번 우리는 차(çaydanlık) 방식이 일반적입니다.",
      "origin": "튀르키예 리제주 흑해 연안, 해발 200~1,000m.",
      "process": "위조 → 유념 → 산화 → 건조. 잘게 부순 잎이 많습니다.",
      "story": "1924년 이후 흑해 연안에서 차 재배가 국가 사업으로 시작되어 지금은 국민 음료가 되었습니다.",
      "flavor": "몰트와 구운 빵, 진한 붉은 물색. 각설탕을 곁들이는 방식이 흔합니다.",
      "pairing": "아침 식사, 빵, 단 과자.",
      "brewTip": "5분 진하게. 두 겹 찻주전자(차이단륵)로 우려 농도를 맞춥니다.",
      "keep": "밀봉해 건조하게.",
      "keywords": "리제 차 튀르키예 흑해 홍차 차이"
    },
    "en": {
      "name": "Rize Cay",
      "oneLine": "Strong tea in a small tulip glass — the Black Sea everyday cup.",
      "oxidation": "about 95%",
      "ratioNote": "4 g to 150 ml",
      "rounds": "2 infusions",
      "steepBasis": "95 °C for 5 minutes, brewed strong; the double-pot çaydanlık is standard.",
      "origin": "Rize province on the Black Sea, 200–1,000 m.",
      "process": "Withered, rolled, oxidised, dried; mostly finely broken leaf.",
      "story": "Tea growing along the Black Sea began as a state programme after 1924 and became the national drink.",
      "flavor": "Malt and baked bread, deep red liquor; usually served with sugar cubes.",
      "pairing": "Breakfast, bread, sweet pastries.",
      "brewTip": "A strong five-minute brew; the double pot lets you dilute to taste.",
      "keep": "Sealed and dry.",
      "keywords": "Rize cay Turkish tea Black Sea"
    },
    "zh-CN": {
      "name": "里泽红茶",
      "oneLine": "小郁金香杯里的浓红茶，黑海沿岸的日常。",
      "oxidation": "约95%",
      "ratioNote": "150毫升配4克",
      "rounds": "2泡",
      "steepBasis": "95度泡5分钟，常用双层茶壶浓泡后兑水。",
      "origin": "土耳其里泽省黑海沿岸，海拔200~1000米。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥，多为细碎叶。",
      "story": "1924年后黑海沿岸茶叶种植成为国家项目，如今是国民饮料。",
      "flavor": "麦芽与烤面包香，汤色深红，常配方糖。",
      "pairing": "早餐、面包、甜点。",
      "brewTip": "浓泡五分钟，双层壶调节浓淡。",
      "keep": "密封干燥。",
      "keywords": "里泽红茶 土耳其 黑海 红茶"
    },
    "zh-TW": {
      "name": "裡澤紅茶",
      "oneLine": "小鬱金香杯裡的濃紅茶，黑海沿岸的日常。",
      "oxidation": "約95%",
      "ratioNote": "150毫升配4克",
      "rounds": "2泡",
      "steepBasis": "95度泡5分鐘，常用雙層茶壺濃泡後兌水。",
      "origin": "土耳其裡澤省黑海沿岸，海拔200~1000米。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥，多為細碎葉。",
      "story": "1924年後黑海沿岸茶葉種植成為國家項目，如今是國民飲料。",
      "flavor": "麥芽與烤麵包香，湯色深紅，常配方糖。",
      "pairing": "早餐、麵包、甜點。",
      "brewTip": "濃泡五分鐘，雙層壺調節濃淡。",
      "keep": "密封乾燥。",
      "keywords": "裡澤紅茶 土耳其 黑海 紅茶"
    },
    "originCountryCode": "tr"
  },
  {
    "id": "black-cameron",
    "group": "black",
    "kind": "tea",
    "hanja": "金",
    "sub": "Black Tea (Cameron Highlands)",
    "alias": [
      "캐머런 하이랜드 홍차",
      "캐머런 하이랜드",
      "말레이시아 홍차"
    ],
    "hz": "金馬倫高原紅茶",
    "hs": "金马伦高原红茶",
    "rom": "Black Tea (Cameron Highlands)",
    "temp": 95,
    "tempRange": "90~100℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      180,
      180
    ],
    "maxSteep": 2,
    "oxidationValue": 95,
    "traits": "t-morning t-afternoon a-malt a-roast b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
    "originCountry": {
      "ko": "말레이시아",
      "en": "Malaysia",
      "zh-CN": "马来西亚",
      "zh-TW": "馬來西亞"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 대부분 CTC 방식으로 잘게 부숴 만듭니다.",
        "말레이시아 캐머런 하이랜드의 해발 1,500m 고원 차밭에서 나는 홍차입니다. 1929년부터 이어진 농장이 유명합니다."
      ],
      "en": [
        "Withered, rolled, oxidised, dried; mostly CTC, finely broken.",
        "Black tea from the Cameron Highlands in Malaysia, at around 1,500 m; one estate has been growing tea since 1929."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥，多为CTC碎叶。",
        "马来西亚金马伦高原海拔约1500米的红茶，有1929年开园的茶园。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥，多為CTC碎葉。",
        "馬來西亞金馬倫高原海拔約1500米的紅茶，有1929年開園的茶園。"
      ]
    },
    "ko": {
      "name": "홍차 (캐머런 하이랜드)",
      "oneLine": "적도 고원의 차밭에서 나는 진하고 둥근 홍차.",
      "oxidation": "약 95%",
      "ratioNote": "200ml에 3g",
      "rounds": "2회",
      "steepBasis": "95도에서 3분, 2포 3분.",
      "origin": "말레이시아 파항주 캐머런 하이랜드, 해발 1,400~1,600m.",
      "process": "위조 → 유념 → 산화 → 건조 (CTC).",
      "story": "1929년 영국인이 차밭을 열어 지금까지 이어지는 농장이 이 지역의 상징입니다.",
      "flavor": "몰트와 구운 향, 진한 물색. 우유와 잘 어울립니다.",
      "pairing": "아침 식사, 밀크티, 스콘.",
      "brewTip": "95도에서 3분. 진하게 우려 우유를 더하는 방식이 현지식입니다.",
      "keep": "밀봉해 건조하게.",
      "keywords": "캐머런 하이랜드 말레이시아 홍차 고원"
    },
    "en": {
      "name": "Black Tea (Cameron Highlands)",
      "oneLine": "Strong, round tea from an equatorial highland estate.",
      "oxidation": "about 95%",
      "ratioNote": "3 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "95 °C: 3 minutes, then 3.",
      "origin": "Cameron Highlands, Pahang, Malaysia, 1,400–1,600 m.",
      "process": "Withered, rolled, oxidised, dried (CTC).",
      "story": "An estate planted in 1929 is still the region's landmark.",
      "flavor": "Malt and toast, a dark liquor that takes milk well.",
      "pairing": "Breakfast, milk tea, scones.",
      "brewTip": "Three minutes at 95 °C; brew strong and add milk, as locally done.",
      "keep": "Sealed and dry.",
      "keywords": "Cameron Highlands Malaysia black tea highland estate"
    },
    "zh-CN": {
      "name": "金马伦高原红茶",
      "oneLine": "赤道高原茶园的浓圆红茶。",
      "oxidation": "约95%",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "95度泡3分钟，第二泡3分钟。",
      "origin": "马来西亚彭亨州金马伦高原，海拔1400~1600米。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥（CTC）。",
      "story": "1929年开园的茶园至今仍是当地地标。",
      "flavor": "麦芽与烤香，汤浓，宜加奶。",
      "pairing": "早餐、奶茶、司康。",
      "brewTip": "95度三分钟，浓泡加奶。",
      "keep": "密封干燥。",
      "keywords": "金马伦高原 马来西亚 红茶 高山"
    },
    "zh-TW": {
      "name": "金馬倫高原紅茶",
      "oneLine": "赤道高原茶園的濃圓紅茶。",
      "oxidation": "約95%",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "95度泡3分鐘，第二泡3分鐘。",
      "origin": "馬來西亞彭亨州金馬倫高原，海拔1400~1600米。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥（CTC）。",
      "story": "1929年開園的茶園至今仍是當地地標。",
      "flavor": "麥芽與烤香，湯濃，宜加奶。",
      "pairing": "早餐、奶茶、司康。",
      "brewTip": "95度三分鐘，濃泡加奶。",
      "keep": "密封乾燥。",
      "keywords": "金馬倫高原 馬來西亞 紅茶 高山"
    },
    "originCountryCode": "my"
  },
  {
    "id": "black-rwanda",
    "group": "black",
    "kind": "tea",
    "hanja": "盧",
    "sub": "Black Tea (Rwanda)",
    "alias": [
      "르완다 홍차",
      "루케리"
    ],
    "hz": "盧旺達紅茶",
    "hs": "卢旺达红茶",
    "rom": "Rwanda Black",
    "temp": 95,
    "tempRange": "90~100℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      180,
      180
    ],
    "maxSteep": 2,
    "oxidationValue": 95,
    "traits": "t-morning t-afternoon a-malt b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
    "originCountry": {
      "ko": "르완다",
      "en": "Rwanda",
      "zh-CN": "卢旺达",
      "zh-TW": "盧安達"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 대부분 CTC로 가공됩니다.",
        "르완다는 아프리카 동부의 고지대 차 생산국입니다. 해발 1,600~2,000m의 안개 낀 산지에서 잎이 천천히 자랍니다."
      ],
      "en": [
        "Withered, rolled, oxidised, dried; mostly CTC.",
        "Rwanda is an East African highland producer; leaf grows slowly in misty hills at 1,600–2,000 m."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥，多为CTC。",
        "卢旺达是东非高地茶产国，海拔1550~2500米雾山，叶生长慢。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥，多為CTC。",
        "盧安達是東非高地茶產國，海拔1550~2500米霧山，葉生長慢。"
      ]
    },
    "ko": {
      "name": "홍차 (르완다)",
      "oneLine": "동아프리카 고지대의 맑고 밝은 홍차.",
      "oxidation": "약 95%",
      "ratioNote": "200ml에 3g",
      "rounds": "2회",
      "steepBasis": "95도에서 3분, 2포 3분.",
      "origin": "르완다 서부·북부 고지대, 해발 1,550~2,500m.",
      "process": "위조 → 유념 → 산화 → 건조 (CTC).",
      "story": "1950년대 이후 차 재배가 국가 산업으로 자리 잡았고, 지금은 주요 수출품입니다.",
      "flavor": "몰트에 밝은 산미, 진한 붉은 물색. 케냐 차보다 부드럽습니다.",
      "pairing": "아침 식사, 밀크티, 빵.",
      "brewTip": "95도에서 3분. 우유를 넣으면 산미가 둥글어집니다.",
      "keep": "밀봉해 건조하게.",
      "keywords": "르완다 홍차 동아프리카 고지대 CTC"
    },
    "en": {
      "name": "Black Tea (Rwanda)",
      "oneLine": "Bright, clean black tea from East African highlands.",
      "oxidation": "about 95%",
      "ratioNote": "3 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "95 °C: 3 minutes, then 3.",
      "origin": "Western and northern highlands of Rwanda, 1,550–2,500 m.",
      "process": "Withered, rolled, oxidised, dried (CTC).",
      "story": "Tea became a national industry after the 1950s and is now a major export.",
      "flavor": "Malt with a bright edge, deep red liquor, softer than Kenyan tea.",
      "pairing": "Breakfast, milk tea, bread.",
      "brewTip": "Three minutes at 95 °C; milk rounds off the brightness.",
      "keep": "Sealed and dry.",
      "keywords": "Rwanda black tea East Africa highland CTC"
    },
    "zh-CN": {
      "name": "卢旺达红茶",
      "oneLine": "东非高地明亮干净的红茶。",
      "oxidation": "约95%",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "95度泡3分钟，第二泡3分钟。",
      "origin": "卢旺达西部与北部高地，海拔1550~2500米。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥（CTC）。",
      "story": "1950年代后茶业成为国家产业，现为主要出口品。",
      "flavor": "麦芽带明亮酸度，汤色深红，比肯尼亚茶更柔。",
      "pairing": "早餐、奶茶、面包。",
      "brewTip": "95度三分钟，加奶更圆润。",
      "keep": "密封干燥。",
      "keywords": "卢旺达红茶 东非 高地 CTC"
    },
    "zh-TW": {
      "name": "盧安達紅茶",
      "oneLine": "東非高地明亮乾淨的紅茶。",
      "oxidation": "約95%",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "95度泡3分鐘，第二泡3分鐘。",
      "origin": "盧安達西部與北部高地，海拔1550~2500米。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥（CTC）。",
      "story": "1950年代後茶業成為國家產業，現為主要出口品。",
      "flavor": "麥芽帶明亮酸度，湯色深紅，比肯亞茶更柔。",
      "pairing": "早餐、奶茶、麵包。",
      "brewTip": "95度三分鐘，加奶更圓潤。",
      "keep": "密封乾燥。",
      "keywords": "盧安達紅茶 東非 高地 CTC"
    },
    "originCountryCode": "rw"
  },
  {
    "id": "black-dooars",
    "group": "black",
    "kind": "tea",
    "hanja": "杜",
    "sub": "Black Tea (Dooars)",
    "alias": [
      "두아르 홍차",
      "두아르"
    ],
    "hz": "杜阿爾斯紅茶",
    "hs": "杜阿尔斯红茶",
    "rom": "Black Tea (Dooars)",
    "temp": 95,
    "tempRange": "90~100℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      180,
      180
    ],
    "maxSteep": 2,
    "oxidationValue": 92,
    "traits": "t-morning t-afternoon a-malt a-roast b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
    "originCountry": {
      "ko": "인도",
      "en": "India",
      "zh-CN": "印度",
      "zh-TW": "印度"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 평원의 진한 잎이라 아침 블렌드에 자주 들어갑니다.",
        "인도 서벵골 북부, 다즐링 남쪽의 평원 지대입니다. 아쌈과 다즐링 사이에 놓인 산지로 알려져 있습니다."
      ],
      "en": [
        "Withered, rolled, oxidised, dried; a strong plain-grown leaf often used in breakfast blends.",
        "The plains of northern West Bengal, south of Darjeeling and east of Assam — the belt between the two famous regions."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥，浓强，常用于早餐拼配。",
        "印度西孟加拉北部平原，位于大吉岭以南、阿萨姆以东。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥，濃強，常用於早餐拼配。",
        "印度西孟加拉北部平原，位於大吉嶺以南、阿薩姆以東。"
      ]
    },
    "ko": {
      "name": "홍차 (두아르)",
      "oneLine": "다즐링과 아쌈 사이 평원의 진한 홍차.",
      "oxidation": "약 92%",
      "ratioNote": "200ml에 3g",
      "rounds": "2회",
      "steepBasis": "95도에서 3분, 2포 3분.",
      "origin": "인도 서벵골 두아르 지대, 해발 100~300m.",
      "process": "위조 → 유념 → 산화 → 건조.",
      "story": "다즐링과 아쌈 사이에 있어 두 산지의 성격을 나눠 갖는다고 설명됩니다.",
      "flavor": "몰트와 구운 향, 진하고 떫음이 적당해 우유와 잘 맞습니다.",
      "pairing": "아침 식사, 밀크티.",
      "brewTip": "95도에서 3분. 아침 블렌드에 섞어도 좋습니다.",
      "keep": "밀봉해 건조하게.",
      "keywords": "두아르 인도 서벵골 홍차 아침"
    },
    "en": {
      "name": "Black Tea (Dooars)",
      "oneLine": "The strong plain-grown tea between Darjeeling and Assam.",
      "oxidation": "about 92%",
      "ratioNote": "3 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "95 °C: 3 minutes, then 3.",
      "origin": "The Dooars, northern West Bengal, India, 100–300 m.",
      "process": "Withered, rolled, oxidised, dried.",
      "story": "Sitting between Darjeeling and Assam, it is often described as sharing something of both.",
      "flavor": "Malt and toast, strong with a fair grip — good with milk.",
      "pairing": "Breakfast, milk tea.",
      "brewTip": "Three minutes at 95 °C; it blends well into breakfast mixtures.",
      "keep": "Sealed and dry.",
      "keywords": "Dooars tea India West Bengal breakfast"
    },
    "zh-CN": {
      "name": "杜阿尔斯红茶",
      "oneLine": "大吉岭与阿萨姆之间平原的浓强红茶。",
      "oxidation": "约92%",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "95度泡3分钟，第二泡3分钟。",
      "origin": "印度西孟加拉杜阿尔斯地区，海拔100~300米。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥。",
      "story": "地处大吉岭与阿萨姆之间，常被说兼具两地性格。",
      "flavor": "麦芽与烤香，浓强微涩，宜加奶。",
      "pairing": "早餐、奶茶。",
      "brewTip": "95度三分钟，适合早晨拼配。",
      "keep": "密封干燥。",
      "keywords": "杜阿尔斯 印度 西孟加拉 红茶"
    },
    "zh-TW": {
      "name": "杜阿爾斯紅茶",
      "oneLine": "大吉嶺與阿薩姆之間平原的濃強紅茶。",
      "oxidation": "約92%",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "95度泡3分鐘，第二泡3分鐘。",
      "origin": "印度西孟加拉杜阿爾斯地區，海拔100~300米。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥。",
      "story": "地處大吉嶺與阿薩姆之間，常被說兼具兩地性格。",
      "flavor": "麥芽與烤香，濃強微澀，宜加奶。",
      "pairing": "早餐、奶茶。",
      "brewTip": "95度三分鐘，適合早晨拼配。",
      "keep": "密封乾燥。",
      "keywords": "杜阿爾斯 印度 西孟加拉 紅茶"
    },
    "originCountryCode": "in"
  },
  {
    "id": "black-yeongdeok",
    "group": "black",
    "kind": "tea",
    "hanja": "盈",
    "sub": "Black Tea (Yeongdeok)",
    "alias": [
      "영덕 홍차",
      "동해안 홍차"
    ],
    "hz": "盈德紅茶",
    "hs": "盈德红茶",
    "rom": "Yeongdeok Hongcha",
    "temp": 90,
    "tempRange": "85~95℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      180,
      120,
      150
    ],
    "maxSteep": 3,
    "oxidationValue": 90,
    "traits": "t-morning t-afternoon a-malt a-floral b-medium k-sweet r-clean s-hot s-milk p-dessert c-mid m-cozy",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 여름잎을 완전 산화시켜 만듭니다.",
        "경북 영덕은 동해 바람이 부는 곳으로, 소규모 농가가 재배한 잎으로 홍차를 만듭니다. 생산량이 적어 지역 안에서 주로 소비됩니다."
      ],
      "en": [
        "Withered, rolled, fully oxidised, dried — summer leaf.",
        "Yeongdeok, on Korea's east coast, has small farms making black tea from locally grown leaf; volumes are small and mostly sold locally."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 全发酵 → 干燥，多用夏叶。",
        "韩国庆北盈德受东海海风影响，小农以本地鲜叶制红茶，产量少，多在当地销售。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 全發酵 → 乾燥，多用夏葉。",
        "韓國慶北盈德受東海海風影響，小農以本地鮮葉制紅茶，產量少，多在當地銷售。"
      ]
    },
    "ko": {
      "name": "홍차 (영덕)",
      "oneLine": "동해 바람 맞은 소규모 차밭의 한국 홍차.",
      "oxidation": "약 90%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "90도에서 3분, 2포 2분, 3포 2분 30초.",
      "origin": "경상북도 영덕군 일대, 해발 100~300m의 동해안 구릉.",
      "process": "위조 → 유념 → 산화 → 건조.",
      "story": "생산량이 적어 전국 유통보다 지역 소비와 관광 판매 중심으로 나옵니다.",
      "flavor": "몰트에 옅은 꽃 향, 부드러운 단맛. 잭살 (하동)보다 가볍습니다.",
      "pairing": "담백한 디저트, 말린 과일, 아침 차.",
      "brewTip": "90도에서 3분. 잎이 여려 두 번이면 충분합니다.",
      "keep": "밀봉해 서늘하고 건조하게.",
      "keywords": "영덕 홍차 경북 동해안 한국 홍차"
    },
    "en": {
      "name": "Black Tea (Yeongdeok)",
      "oneLine": "A small Korean black tea from the east-coast hills.",
      "oxidation": "about 90%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "90 °C: 3 minutes, then 2, then 2½.",
      "origin": "Yeongdeok county, Gyeongsangbuk-do, 100–300 m on the east coast.",
      "process": "Withered, rolled, oxidised, dried.",
      "story": "Output is small, so it sells locally and to visitors rather than nationwide.",
      "flavor": "Malt with a faint floral note, soft sweetness; lighter than Hadong black tea.",
      "pairing": "Plain desserts, dried fruit, morning tea.",
      "brewTip": "Three minutes at 90 °C; the tender leaf gives two good infusions.",
      "keep": "Sealed, cool and dry.",
      "keywords": "Yeongdeok black tea Korea east coast"
    },
    "zh-CN": {
      "name": "盈德红茶",
      "oneLine": "东海海风里的小规模韩国红茶。",
      "oxidation": "约90%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "90度泡3分钟，第二泡2分钟，第三泡2分30秒。",
      "origin": "韩国庆尚北道盈德郡，海拔100~300米的东海丘陵。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥。",
      "story": "产量小，主要在当地与游客渠道销售。",
      "flavor": "麦芽香带淡花香，甜柔，比河东红茶轻。",
      "pairing": "清淡甜点、果干、晨间茶。",
      "brewTip": "90度三分钟，两泡足够。",
      "keep": "密封阴凉干燥。",
      "keywords": "盈德红茶 韩国 庆北 东海"
    },
    "zh-TW": {
      "name": "盈德紅茶",
      "oneLine": "東海海風裡的小規模韓國紅茶。",
      "oxidation": "約90%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "90度泡3分鐘，第二泡2分鐘，第三泡2分30秒。",
      "origin": "韓國慶尚北道盈德郡，海拔100~300米的東海丘陵。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥。",
      "story": "產量小，主要在當地與遊客渠道銷售。",
      "flavor": "麥芽香帶淡花香，甜柔，比河東紅茶輕。",
      "pairing": "清淡甜點、果乾、晨間茶。",
      "brewTip": "90度三分鐘，兩泡足夠。",
      "keep": "密封陰涼乾燥。",
      "keywords": "盈德紅茶 韓國 慶北 東海"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "dark-fuzhuan",
    "group": "dark",
    "kind": "tea",
    "hanja": "茯",
    "sub": "Fu Brick Tea",
    "alias": [
      "복전차",
      "금화복전"
    ],
    "hz": "茯磚茶",
    "hs": "茯砖茶",
    "rom": "Fu Zhuan Cha",
    "temp": 100,
    "tempRange": "100℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 8,
    "oxidationValue": 100,
    "traits": "t-afternoon t-night a-herb a-roast b-full k-grain r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 악퇴 → 압착 → 발화(發花) 건조. 발화 단계에서 금화가 생깁니다.",
        "차砖 안쪽에 ‘금화(金花)’라 부르는 누런 균사가 피는 것으로 유명합니다. 습도와 온도를 맞춰 두면 이 균이 자랍니다."
      ],
      "en": [
        "Fired, rolled, piled, pressed, then dried in a 'flowering' stage where the golden flowers develop.",
        "Famous for the yellow 'golden flowers' that bloom inside the brick — a mould encouraged by controlled warmth and humidity."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 渥堆 → 压砖 → 发花干燥，发花阶段生成金花。",
        "以砖内长出“金花”（黄色菌花）闻名，靠温湿度控制培育。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 渥堆 → 壓磚 → 發花乾燥，發花階段生成金花。",
        "以磚內長出「金花」（黃色菌花）聞名，靠溫溼度控制培育。"
      ]
    },
    "ko": {
      "name": "복전차",
      "oneLine": "차 벽돌 안에 피는 노란 ‘금화’ — 복전차의 표식.",
      "oxidation": "후발효",
      "ratioNote": "150ml에 5g, 세차 1회",
      "rounds": "8회",
      "steepBasis": "100도에서 30초, 2포 20초, 3포 25초. 이후 10초씩 늘립니다.",
      "origin": "섬서성 징양에서 시작 — 원료는 후난 안화의 흑모차. 1953년부터 안화에서도 생산합니다.",
      "process": "살청 → 유념 → 악퇴 → 압착 → 발화 건조.",
      "story": "명나라 때 징양에서 후난 흑모차를 압착·발화해 만들기 시작했고, 실크로드와 차마무역으로 서북 변방에 공급됐습니다.",
      "flavor": "버섯·흙·곡물 향, 부드럽고 둥근 단맛. 금화가 많은 차일수록 향이 부드럽습니다.",
      "pairing": "기름진 고기, 중식, 유제품.",
      "brewTip": "100도 끓는 물. 첫 물은 세차로 버리고, 끓여 마셔도 좋습니다.",
      "keep": "습도 60% 안팎, 냄새 없는 곳. 금화는 보관 중에도 자랍니다.",
      "keywords": "복전차 금화 안화 흑차 후발효"
    },
    "en": {
      "name": "Fu Brick Tea",
      "oneLine": "Yellow 'golden flowers' inside the brick — the mark of Fu brick tea.",
      "oxidation": "post-fermented",
      "ratioNote": "5 g to 150 ml; rinse once",
      "rounds": "8 infusions",
      "steepBasis": "100 °C: 30 seconds, then 20, then 25; add 10 seconds after that.",
      "origin": "Born in Jingyang, Shaanxi, from Anhua dark leaf; Anhua itself has made it since 1953.",
      "process": "Fired, rolled, piled, pressed, then dried through a 'flowering' stage.",
      "story": "It began in Ming times in Jingyang, pressed and 'flowered' from Hunan dark leaf, and travelled the Silk Road and tea-horse routes to the northwestern frontier.",
      "flavor": "Mushroom, earth, grain; soft round sweetness, smoother the more golden flowers.",
      "pairing": "Fatty meat, Chinese food, dairy.",
      "brewTip": "Boiling water; rinse once, and it can also be boiled.",
      "keep": "Around 60% humidity, away from smells — the flowers keep developing.",
      "keywords": "Fu brick tea golden flowers Anhua dark tea"
    },
    "zh-CN": {
      "name": "茯砖茶",
      "oneLine": "砖内长出的黄色“金花”，茯砖茶的标志。",
      "oxidation": "后发酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "8泡",
      "steepBasis": "100度泡30秒，第二泡20秒，第三泡25秒，其后每泡加10秒。",
      "origin": "源于陕西泾阳，原料为湖南安化黑毛茶；1953年起安化也开始生产。",
      "process": "炒青 → 揉捻 → 渥堆 → 压砖 → 发花干燥。",
      "story": "明代起在泾阳以湖南黑毛茶压制发花，经丝绸之路与茶马贸易供往西北边疆。",
      "flavor": "菌香、土香与谷香，甜圆；金花越多越柔。",
      "pairing": "油腻肉类、中餐、乳制品。",
      "brewTip": "沸水，洗茶一次，也可煮饮。",
      "keep": "湿度约六成、无异味处，金花可继续生长。",
      "keywords": "茯砖茶 金花 安化 黑茶 后发酵"
    },
    "zh-TW": {
      "name": "茯磚茶",
      "oneLine": "磚內長出的黃色「金花」，茯磚茶的標誌。",
      "oxidation": "後發酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "8泡",
      "steepBasis": "100度泡30秒，第二泡20秒，第三泡25秒，其後每泡加10秒。",
      "origin": "源於陝西涇陽，原料為湖南安化黑毛茶；1953年起安化也開始生產。",
      "process": "炒青 → 揉捻 → 渥堆 → 壓磚 → 發花乾燥。",
      "story": "明代起在涇陽以湖南黑毛茶壓製發花，經絲綢之路與茶馬貿易供往西北邊疆。",
      "flavor": "菌香、土香與谷香，甜圓；金花越多越柔。",
      "pairing": "油膩肉類、中餐、乳製品。",
      "brewTip": "沸水，洗茶一次，也可煮飲。",
      "keep": "溼度約六成、無異味處，金花可繼續生長。",
      "keywords": "茯磚茶 金花 安化 黑茶 後發酵"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "dark-qianliang",
    "group": "dark",
    "kind": "tea",
    "hanja": "兩",
    "sub": "Qianliang Tea",
    "alias": [
      "천량차",
      "화권차"
    ],
    "hz": "千兩茶",
    "hs": "千两茶",
    "rom": "Qianliang Cha",
    "temp": 100,
    "tempRange": "100℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 8,
    "oxidationValue": 100,
    "traits": "t-afternoon t-night a-herb a-roast b-full k-grain r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 악퇴 → 대나무 통에 압착 → 장기 건조. 통째로 두고 필요할 때 잘라 씁니다.",
        "대나무 껍질로 감아 압착한 긴 통차입니다. 옛 무게 단위로 1,000냥(약 36kg)에 해당해 이름이 붙었습니다."
      ],
      "en": [
        "Fired, rolled, piled, pressed into bamboo, then dried for months; cut as needed.",
        "A long log of tea compressed inside bamboo sheath; the name comes from its old weight of 1,000 liang, about 36 kg."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 渥堆 → 竹篾压制成柱 → 长期干燥，饮用时锯取。",
        "用竹篾捆压成长柱形，旧制重千两（约36公斤），故名。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 渥堆 → 竹篾壓製成柱 → 長期乾燥，飲用時鋸取。",
        "用竹篾捆壓成長柱形，舊制重千兩（約36公斤），故名。"
      ]
    },
    "ko": {
      "name": "천량차",
      "oneLine": "대나무에 감아 압착한 긴 통차 — 필요할 때 잘라 마십니다.",
      "oxidation": "후발효",
      "ratioNote": "150ml에 5g, 세차 1회",
      "rounds": "8회",
      "steepBasis": "100도에서 30초, 2포 20초, 3포 25초.",
      "origin": "후난성 안화 일대, 해발 200~700m.",
      "process": "살청 → 유념 → 악퇴 → 꽃격 대나무 광주리(멱루)에 압착 → 볕과 이슬에 말리는 일쇄야로 건조.",
      "story": "도광 연간 백량차에서 이어져 동치 연간에 천량차가 되었습니다. 말과 배로 먼 곳까지 운반하기 좋게 만든 압착차입니다.",
      "flavor": "대나무 향과 흙 향, 진한 단맛. 오래 둘수록 부드러워집니다.",
      "pairing": "기름진 식사, 중식, 유제품.",
      "brewTip": "100도. 단단히 압착되어 있어 첫 우림은 짧게, 이후 길게.",
      "keep": "건조하고 통풍되는 곳. 대나무 껍질을 벗기지 않고 둡니다.",
      "keywords": "천량차 화권차 안화 흑차 대나무 압착"
    },
    "en": {
      "name": "Qianliang Tea",
      "oneLine": "A log of tea pressed in bamboo, cut as you need it.",
      "oxidation": "post-fermented",
      "ratioNote": "5 g to 150 ml; rinse once",
      "rounds": "8 infusions",
      "steepBasis": "100 °C: 30 seconds, then 20, then 25.",
      "origin": "Anhua, Hunan, 200–700 m.",
      "process": "Fired, rolled, piled, pressed into a latticed bamboo basket, then dried by sun and dew.",
      "story": "It grew out of the hundred-liang tea of the Daoguang era and took its thousand-liang form under Tongzhi, made to travel by horse and boat.",
      "flavor": "Bamboo and earth, deep sweetness; softer the longer it is kept.",
      "pairing": "Fatty meals, Chinese food, dairy.",
      "brewTip": "Boiling water; short first infusion because the log is dense.",
      "keep": "Dry and airy, bamboo sheath left on.",
      "keywords": "Qianliang tea Anhua bamboo pressed dark tea"
    },
    "zh-CN": {
      "name": "千两茶",
      "oneLine": "竹篾压成的长柱茶，喝时锯取。",
      "oxidation": "后发酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "8泡",
      "steepBasis": "100度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "湖南安化一带，海拔200~700米。",
      "process": "炒青 → 揉捻 → 渥堆 → 花格竹篾篓压柱 → 日晒夜露干燥。",
      "story": "源于道光年间的百两茶，同治年间成千两茶，为便于马帮船运而制。",
      "flavor": "竹香与土香，甜厚，越陈越柔。",
      "pairing": "油腻餐食、中餐、乳制品。",
      "brewTip": "沸水，压得紧，首泡宜短。",
      "keep": "干燥通风，保留竹篾。",
      "keywords": "千两茶 花卷茶 安化 黑茶 竹压"
    },
    "zh-TW": {
      "name": "千兩茶",
      "oneLine": "竹篾壓成的長柱茶，喝時鋸取。",
      "oxidation": "後發酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "8泡",
      "steepBasis": "100度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "湖南安化一帶，海拔200~700米。",
      "process": "炒青 → 揉捻 → 渥堆 → 花格竹篾簍壓柱 → 日曬夜露乾燥。",
      "story": "源於道光年間的百兩茶，同治年間成千兩茶，為便於馬幫船運而製。",
      "flavor": "竹香與土香，甜厚，越陳越柔。",
      "pairing": "油膩餐食、中餐、乳製品。",
      "brewTip": "沸水，壓得緊，首泡宜短。",
      "keep": "乾燥通風，保留竹篾。",
      "keywords": "千兩茶 花卷茶 安化 黑茶 竹壓"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "dark-kangzhuan",
    "group": "dark",
    "kind": "tea",
    "hanja": "康",
    "sub": "Kangzhuan Tea",
    "alias": [
      "강전차",
      "남로변차"
    ],
    "hz": "康磚茶",
    "hs": "康砖茶",
    "rom": "Kang Zhuan Cha",
    "temp": 100,
    "tempRange": "100℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      30,
      25,
      30
    ],
    "maxSteep": 7,
    "oxidationValue": 100,
    "traits": "t-afternoon t-night a-herb a-roast b-full k-grain r-clean s-hot s-milk w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 악퇴 → 압착 → 건조. 굵은 잎과 줄기를 섞어 단단히 누릅니다.",
        "쓰촨 야안에서 만드는 압착 흑차로, 티베트로 가는 ‘남로변차’ 계열입니다. 티베트에서는 우유와 소금을 더해 마십니다."
      ],
      "en": [
        "Fired, rolled, piled, pressed, dried; coarse leaf and stem pressed hard.",
        "A pressed dark tea from Ya'an, Sichuan, part of the 'southern route' brick tea trade to Tibet, where it is boiled with milk and salt."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 渥堆 → 压制 → 干燥，粗叶带梗压紧。",
        "四川雅安产的紧压黑茶，属销往西藏的“南路边茶”。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 渥堆 → 壓制 → 乾燥，粗葉帶梗壓緊。",
        "四川雅安產的緊壓黑茶，屬銷往西藏的「南路邊茶」。"
      ]
    },
    "ko": {
      "name": "강전차",
      "oneLine": "티베트로 가던 쓰촨의 압착차 — 버터(수유)와 소금을 더해 마시는 차.",
      "oxidation": "후발효",
      "ratioNote": "150ml에 5g, 세차 1회",
      "rounds": "7회",
      "steepBasis": "100도에서 30초, 2포 25초, 3포 30초. 끓여 마셔도 좋습니다.",
      "origin": "쓰촨성 야안 일대, 해발 600~1,200m.",
      "process": "살청 → 유념 → 악퇴 → 압착 → 건조.",
      "story": "청대에 티베트로 가는 차 무역의 주요 품목이었고, 지금도 그 지역에서 같은 방식으로 마십니다.",
      "flavor": "흙과 곡물 향, 진하고 거친 단맛. 우유·버터와 만나면 부드러워집니다.",
      "pairing": "육류, 유제품, 기름진 식사.",
      "brewTip": "100도에서 길게. 우유와 소금을 더하는 티베트식도 좋습니다.",
      "keep": "건조하고 통풍되는 곳.",
      "keywords": "강전차 남로변차 쓰촨 흑차 티베트"
    },
    "en": {
      "name": "Kangzhuan Tea",
      "oneLine": "Sichuan's pressed brick for Tibet — boiled with butter and salt there.",
      "oxidation": "post-fermented",
      "ratioNote": "5 g to 150 ml; rinse once",
      "rounds": "7 infusions",
      "steepBasis": "100 °C: 30 seconds, then 25, then 30. It also boils well.",
      "origin": "Ya'an, Sichuan, 600–1,200 m.",
      "process": "Fired, rolled, piled, pressed, dried.",
      "story": "A main item of the Qing-era tea trade to Tibet, where it is still drunk the same way.",
      "flavor": "Earth and grain, strong and slightly rough; milk or butter softens it.",
      "pairing": "Meat, dairy, rich meals.",
      "brewTip": "Long at 100 °C; the Tibetan style adds milk and salt.",
      "keep": "Dry and airy.",
      "keywords": "Kangzhuan Sichuan brick tea Tibet dark tea"
    },
    "zh-CN": {
      "name": "康砖茶",
      "oneLine": "销往西藏的四川紧压黑茶，当地加酥油加盐煮饮。",
      "oxidation": "后发酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "7泡",
      "steepBasis": "100度泡30秒，第二泡25秒，第三泡30秒，也可煮饮。",
      "origin": "四川雅安一带，海拔600~1200米。",
      "process": "炒青 → 揉捻 → 渥堆 → 压制 → 干燥。",
      "story": "清代销藏茶贸易的主要品类，当地至今沿用同样喝法。",
      "flavor": "土香与谷香，浓而略粗，加奶或酥油后转柔。",
      "pairing": "肉类、乳制品、油腻餐食。",
      "brewTip": "100度久泡，也可加奶加盐。",
      "keep": "干燥通风。",
      "keywords": "康砖茶 南路边茶 四川 黑茶 西藏"
    },
    "zh-TW": {
      "name": "康磚茶",
      "oneLine": "銷往西藏的四川緊壓黑茶，當地加酥油加鹽煮飲。",
      "oxidation": "後發酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "7泡",
      "steepBasis": "100度泡30秒，第二泡25秒，第三泡30秒，也可煮飲。",
      "origin": "四川雅安一帶，海拔600~1200米。",
      "process": "炒青 → 揉捻 → 渥堆 → 壓制 → 乾燥。",
      "story": "清代銷藏茶貿易的主要品類，當地至今沿用同樣喝法。",
      "flavor": "土香與谷香，濃而略粗，加奶或酥油後轉柔。",
      "pairing": "肉類、乳製品、油膩餐食。",
      "brewTip": "100度久泡，也可加奶加鹽。",
      "keep": "乾燥通風。",
      "keywords": "康磚茶 南路邊茶 四川 黑茶 西藏"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "dark-tibetan",
    "group": "dark",
    "kind": "tea",
    "hanja": "酥",
    "sub": "Tibetan Butter Tea",
    "alias": [
      "쑤유차",
      "티베트 버터차",
      "장차",
      "버터차",
      "포차"
    ],
    "hz": "酥油茶",
    "hs": "酥油茶",
    "rom": "Suyou Cha",
    "temp": 100,
    "tempRange": "100℃",
    "leaf": "8g",
    "water": "500ml",
    "steeps": [
      600
    ],
    "maxSteep": 1,
    "oxidationValue": 100,
    "traits": "t-morning t-afternoon a-roast a-herb b-full k-grain r-clean s-hot p-meal c-high m-energy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "티베트의 일상 음료입니다. 압착 흑차를 오래 끓여 진하게 우린 뒤 버터와 소금을 넣고 통에 넣어 섞습니다.",
        "차를 끓여 농축한 ‘차고’를 만들어 두고, 마실 때마다 버터·소금과 함께 젓습니다."
      ],
      "en": [
        "Tibet's everyday drink: brick tea boiled down to a strong concentrate, then churned with butter and salt.",
        "The tea is boiled to a concentrate ('chaku') and kept; each serving is churned with butter and salt."
      ],
      "zh-CN": [
        "西藏日常饮品：砖茶久熬成浓汁，加酥油与盐在茶桶中打匀。",
        "先把茶熬成“茶膏”备用，喝时与酥油、盐一起打制。"
      ],
      "zh-TW": [
        "西藏日常飲品：磚茶久熬成濃汁，加酥油與鹽在茶桶中打勻。",
        "先把茶熬成「茶膏」備用，喝時與酥油、鹽一起打制。"
      ]
    },
    "ko": {
      "name": "수유차",
      "oneLine": "진하게 끓인 흑차에 버터와 소금 — 티베트의 하루.",
      "oxidation": "후발효",
      "ratioNote": "물 500ml에 차 8g, 버터·소금은 취향껏",
      "rounds": "1회 (농축액을 나눠 마심)",
      "steepBasis": "100도에서 10분 이상 끓여 농축한 뒤 버터와 소금을 넣고 섞습니다.",
      "origin": "티베트·칭하이·쓰촨 서부. 압착 흑차(강전차 등)를 씁니다.",
      "process": "압착 흑차를 오래 끓여 농축 → 버터·소금과 함께 젓기.",
      "story": "고지대에서 수분·열량·염분을 한 번에 얻기 위한 방식으로 자리 잡았습니다.",
      "flavor": "버터의 고소함과 소금기, 흑차의 흙 향. 처음엔 낯설지만 몸이 데워집니다.",
      "pairing": "츠ampa(볶은 보릿가루), 육류, 아침.",
      "brewTip": "차를 진하게 끓이는 것이 핵심입니다. 버터는 무염을 씁니다.",
      "keep": "농축액은 냉장 보관하고 데워 마십니다.",
      "keywords": "수유차 쑤유차 버터차 티베트 장차 흑차"
    },
    "en": {
      "name": "Tibetan Butter Tea",
      "oneLine": "Strong brick tea churned with butter and salt — a Tibetan day.",
      "oxidation": "post-fermented",
      "ratioNote": "8 g to 500 ml water; butter and salt to taste",
      "rounds": "1 brew, drunk as a concentrate",
      "steepBasis": "Boil 10+ minutes at 100 °C to a concentrate, then churn with butter and salt.",
      "origin": "Tibet, Qinghai and western Sichuan, using pressed dark tea.",
      "process": "Pressed dark tea boiled down, then churned with butter and salt.",
      "story": "A way to take water, calories and salt at once at altitude.",
      "flavor": "Buttery and salty over dark tea's earth; strange at first, warming after.",
      "pairing": "Tsampa (roasted barley flour), meat, breakfast.",
      "brewTip": "The key is boiling the tea strong; use unsalted butter.",
      "keep": "Refrigerate the concentrate and reheat to serve.",
      "keywords": "Tibetan butter tea suyou cha brick tea Tibet"
    },
    "zh-CN": {
      "name": "酥油茶",
      "oneLine": "砖茶浓熬，加酥油与盐，西藏的一天。",
      "oxidation": "后发酵",
      "ratioNote": "500毫升水配8克茶，酥油与盐随口味",
      "rounds": "煮1次，分次饮用",
      "steepBasis": "100度煮10分钟以上成浓汁，再与酥油、盐打匀。",
      "origin": "西藏、青海、川西，多用紧压黑茶。",
      "process": "砖茶久煮浓缩 → 与酥油、盐同打。",
      "story": "高原上一次补充水分、热量与盐分的饮法。",
      "flavor": "酥油香与咸味压着黑茶的土香，初尝陌生，喝下暖身。",
      "pairing": "糌粑、肉类、早餐。",
      "brewTip": "关键在把茶熬浓；酥油用无盐的。",
      "keep": "浓汁冷藏，饮前加热。",
      "keywords": "酥油茶 藏茶 砖茶 西藏"
    },
    "zh-TW": {
      "name": "酥油茶",
      "oneLine": "磚茶濃熬，加酥油與鹽，西藏的一天。",
      "oxidation": "後發酵",
      "ratioNote": "500毫升水配8克茶，酥油與鹽隨口味",
      "rounds": "煮1次，分次飲用",
      "steepBasis": "100度煮10分鐘以上成濃汁，再與酥油、鹽打勻。",
      "origin": "西藏、青海、川西，多用緊壓黑茶。",
      "process": "磚茶久煮濃縮 → 與酥油、鹽同打。",
      "story": "高原上一次補充水分、熱量與鹽分的飲法。",
      "flavor": "酥油香與鹹味壓著黑茶的土香，初嘗陌生，喝下暖身。",
      "pairing": "糌粑、肉類、早餐。",
      "brewTip": "關鍵在把茶熬濃；酥油用無鹽的。",
      "keep": "濃汁冷藏，飲前加熱。",
      "keywords": "酥油茶 藏茶 磚茶 西藏"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "dark-laoqingzhuan",
    "group": "dark",
    "kind": "tea",
    "hanja": "青",
    "sub": "Lao Qingzhuan",
    "alias": [
      "노청전",
      "조리교청전"
    ],
    "hz": "老青磚",
    "hs": "老青砖",
    "rom": "Lao Qingzhuan",
    "temp": 100,
    "tempRange": "100℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      30,
      25,
      30
    ],
    "maxSteep": 7,
    "oxidationValue": 100,
    "traits": "t-afternoon t-night a-herb a-roast b-full k-grain r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 악퇴 → 압착 → 건조. 잎과 줄기를 섞어 단단히 누릅니다.",
        "후베이 자오리차오의 청전차입니다. 오래 묵힌 것을 ‘노청전’이라 부르며, 몽골·러시아로 가던 차 계열입니다."
      ],
      "en": [
        "Fired, rolled, piled, pressed, dried; leaf and stem pressed hard.",
        "The green-brick dark tea of Zhaoliqiao, Hubei; aged bricks are called lao qingzhuan and this is the family that once travelled to Mongolia and Russia."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 渥堆 → 压制 → 干燥。",
        "湖北赵李桥的青砖茶，陈放者称“老青砖”，曾销往蒙古与俄罗斯。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 渥堆 → 壓制 → 乾燥。",
        "湖北趙李橋的青磚茶，陳放者稱「老青磚」，曾銷往蒙古與俄羅斯。"
      ]
    },
    "ko": {
      "name": "노청전",
      "oneLine": "몽골과 러시아로 가던 후베이의 압착 흑차.",
      "oxidation": "후발효",
      "ratioNote": "150ml에 5g, 세차 1회",
      "rounds": "7회",
      "steepBasis": "100도에서 30초, 2포 25초, 3포 30초.",
      "origin": "후베이성 츠비 자오리차오 일대, 해발 100~500m.",
      "process": "살청 → 유념 → 악퇴 → 압착 → 건조.",
      "story": "17세기 이후 몽골·러시아로 가는 차 무역의 주요 품목이었습니다.",
      "flavor": "흙과 곡물 향, 부드러운 단맛. 오래 묵은 차는 향이 더 차분합니다.",
      "pairing": "기름진 고기, 유제품, 중식.",
      "brewTip": "100도에서 길게. 끓여 마시면 단맛이 올라옵니다.",
      "keep": "건조하고 통풍되는 곳.",
      "keywords": "노청전 청전차 후베이 자오리차오 흑차"
    },
    "en": {
      "name": "Lao Qingzhuan",
      "oneLine": "Hubei's pressed dark tea that once travelled to Mongolia and Russia.",
      "oxidation": "post-fermented",
      "ratioNote": "5 g to 150 ml; rinse once",
      "rounds": "7 infusions",
      "steepBasis": "100 °C: 30 seconds, then 25, then 30.",
      "origin": "Zhaoliqiao, Chibi, Hubei, 100–500 m.",
      "process": "Fired, rolled, piled, pressed, dried.",
      "story": "From the 17th century it was a main item in the overland tea trade north.",
      "flavor": "Earth and grain, soft sweetness; older bricks are calmer.",
      "pairing": "Fatty meat, dairy, Chinese food.",
      "brewTip": "Long at 100 °C; boiling brings out sweetness.",
      "keep": "Dry and airy.",
      "keywords": "Lao Qingzhuan Hubei Zhaoliqiao dark tea brick"
    },
    "zh-CN": {
      "name": "老青砖",
      "oneLine": "曾销往蒙古与俄罗斯的湖北紧压黑茶。",
      "oxidation": "后发酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "7泡",
      "steepBasis": "100度泡30秒，第二泡25秒，第三泡30秒。",
      "origin": "湖北赤壁赵李桥一带，海拔100~500米。",
      "process": "炒青 → 揉捻 → 渥堆 → 压制 → 干燥。",
      "story": "17世纪以后是北向陆路茶贸易的主要品类。",
      "flavor": "土香与谷香，甜柔，陈放后更沉。",
      "pairing": "油腻肉类、乳制品、中餐。",
      "brewTip": "100度久泡，煮饮更甜。",
      "keep": "干燥通风。",
      "keywords": "老青砖 青砖茶 湖北 赵李桥 黑茶"
    },
    "zh-TW": {
      "name": "老青磚",
      "oneLine": "曾銷往蒙古與俄羅斯的湖北緊壓黑茶。",
      "oxidation": "後發酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "7泡",
      "steepBasis": "100度泡30秒，第二泡25秒，第三泡30秒。",
      "origin": "湖北赤壁趙李橋一帶，海拔100~500米。",
      "process": "炒青 → 揉捻 → 渥堆 → 壓制 → 乾燥。",
      "story": "17世紀以後是北向陸路茶貿易的主要品類。",
      "flavor": "土香與谷香，甜柔，陳放後更沉。",
      "pairing": "油膩肉類、乳製品、中餐。",
      "brewTip": "100度久泡，煮飲更甜。",
      "keep": "乾燥通風。",
      "keywords": "老青磚 青磚茶 湖北 趙李橋 黑茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "dark-tianjian",
    "group": "dark",
    "kind": "tea",
    "hanja": "尖",
    "sub": "Tianjian Tea",
    "alias": [
      "천첨",
      "상첨"
    ],
    "hz": "天尖茶",
    "hs": "天尖茶",
    "rom": "Tianjian Cha",
    "temp": 100,
    "tempRange": "100℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      25,
      15,
      20
    ],
    "maxSteep": 8,
    "oxidationValue": 100,
    "traits": "t-afternoon t-night a-herb a-roast b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "살청 → 유념 → 악퇴 → 건조 → 용기에 담아 숙성. 압착하지 않아 잎 모양이 남습니다.",
        "안화 흑차의 ‘상첨(湘尖)’ 가운데 가장 높은 등급입니다. 압착하지 않고 느슨하게 두는 흑차입니다."
      ],
      "en": [
        "Fired, rolled, piled, dried, then aged loose in containers.",
        "The top grade of Anhua's 'Xiangjian' dark teas, and unusual in not being pressed — the leaf stays loose."
      ],
      "zh-CN": [
        "炒青 → 揉捻 → 渥堆 → 干燥 → 装篓陈放。",
        "安化“湘尖”中等级最高者，不经压制，保持散叶。"
      ],
      "zh-TW": [
        "炒青 → 揉捻 → 渥堆 → 乾燥 → 裝簍陳放。",
        "安化「湘尖」中等級最高者，不經壓制，保持散葉。"
      ]
    },
    "ko": {
      "name": "천첨",
      "oneLine": "압착하지 않은 안화 흑차의 최상급 — 잎 모양이 살아 있습니다.",
      "oxidation": "후발효",
      "ratioNote": "150ml에 5g, 세차 1회",
      "rounds": "8회",
      "steepBasis": "100도에서 25초, 2포 15초, 3포 20초.",
      "origin": "후난성 안화 일대, 해발 300~800m.",
      "process": "살청 → 유념 → 악퇴 → 건조 → 느슨하게 담아 숙성.",
      "story": "청대에 ‘천첨’이라는 이름으로 공차에 올랐다는 기록이 있습니다.",
      "flavor": "연기와 흙, 대추 같은 단맛. 압착 흑차보다 향이 가볍고 산뜻합니다.",
      "pairing": "기름진 식사, 중식, 말린 과일.",
      "brewTip": "100도에서 짧게 여러 번. 3포부터 단맛이 올라옵니다.",
      "keep": "건조하고 통풍되는 곳, 냄새가 배지 않게.",
      "keywords": "천첨 안화 흑차 상첨 산차"
    },
    "en": {
      "name": "Tianjian Tea",
      "oneLine": "Top-grade Anhua dark tea, left loose — the leaf shape survives.",
      "oxidation": "post-fermented",
      "ratioNote": "5 g to 150 ml; rinse once",
      "rounds": "8 infusions",
      "steepBasis": "100 °C: 25 seconds, then 15, then 20.",
      "origin": "Anhua, Hunan, 300–800 m.",
      "process": "Fired, rolled, piled, dried, then aged loose.",
      "story": "Qing records list 'Tianjian' among the teas sent to court.",
      "flavor": "Smoke and earth, date-like sweetness; lighter and fresher than pressed dark tea.",
      "pairing": "Fatty meals, Chinese food, dried fruit.",
      "brewTip": "Short, repeated infusions at 100 °C; sweetness from the third.",
      "keep": "Dry and airy, away from strong smells.",
      "keywords": "Tianjian Anhua dark tea loose Xiangjian"
    },
    "zh-CN": {
      "name": "天尖茶",
      "oneLine": "不压制的安化黑茶上品，叶片完整。",
      "oxidation": "后发酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "8泡",
      "steepBasis": "100度泡25秒，第二泡15秒，第三泡20秒。",
      "origin": "湖南安化一带，海拔300~800米。",
      "process": "炒青 → 揉捻 → 渥堆 → 干燥 → 装篓陈放。",
      "story": "清代曾以“天尖”之名入贡。",
      "flavor": "烟香、土香与枣甜，比紧压黑茶清轻。",
      "pairing": "油腻餐食、中餐、果干。",
      "brewTip": "100度短泡多道，第三泡起出甜。",
      "keep": "干燥通风，避免串味。",
      "keywords": "天尖茶 安化 黑茶 湘尖 散茶"
    },
    "zh-TW": {
      "name": "天尖茶",
      "oneLine": "不壓制的安化黑茶上品，葉片完整。",
      "oxidation": "後發酵",
      "ratioNote": "150毫升配5克，洗茶一次",
      "rounds": "8泡",
      "steepBasis": "100度泡25秒，第二泡15秒，第三泡20秒。",
      "origin": "湖南安化一帶，海拔300~800米。",
      "process": "炒青 → 揉捻 → 渥堆 → 乾燥 → 裝簍陳放。",
      "story": "清代曾以「天尖」之名入貢。",
      "flavor": "煙香、土香與棗甜，比緊壓黑茶清輕。",
      "pairing": "油膩餐食、中餐、果乾。",
      "brewTip": "100度短泡多道，第三泡起出甜。",
      "keep": "乾燥通風，避免串味。",
      "keywords": "天尖茶 安化 黑茶 湘尖 散茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "blend-guihua",
    "group": "oolong",
    "kind": "tea",
    "hanja": "桂",
    "sub": "Osmanthus Tea",
    "alias": [
      "계화차",
      "목서차"
    ],
    "hz": "桂花茶",
    "hs": "桂花茶",
    "rom": "Guihua Cha",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      150,
      90,
      120
    ],
    "maxSteep": 3,
    "oxidationValue": 60,
    "traits": "t-morning t-afternoon a-floral a-fruit b-medium k-sweet r-clean s-hot w-quick p-dessert c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "가을에 피는 계화(목서) 꽃을 차잎에 겹쳐 향을 옮깁니다. 광시 구이린과 푸젠이 대표 산지입니다.",
        "차잎과 꽃을 층층이 쌓아 향을 옮기는 인향(窨制)을 몇 번 반복한 뒤 꽃을 골라냅니다."
      ],
      "en": [
        "Autumn osmanthus blossom is layered with tea leaf to transfer its scent; Guilin in Guangxi and Fujian are the classic sources.",
        "Leaf and blossom are stacked in layers to scent the tea, repeated a few times, then the blossom is picked out."
      ],
      "zh-CN": [
        "用秋季桂花与茶坯窨制，广西桂林与福建为传统产区。",
        "茶花层层堆窨数次，最后筛去花，只留茶。"
      ],
      "zh-TW": [
        "用秋季桂花與茶坯窨制，廣西桂林與福建為傳統產區。",
        "茶花層層堆窨數次，最後篩去花，只留茶。"
      ]
    },
    "ko": {
      "name": "계화우롱",
      "oneLine": "가을 계화 꽃 향을 차잎에 옮긴, 살구빛 단맛의 차.",
      "oxidation": "약 60% (베이스에 따름)",
      "ratioNote": "200ml에 3g",
      "rounds": "3회",
      "steepBasis": "85도에서 2분 30초, 2포 1분 30초, 3포 2분.",
      "origin": "광시 구이린, 푸젠. 베이스는 녹차나 가벼운 우롱·홍차를 씁니다.",
      "process": "차잎과 계화를 층층이 쌓아 향을 옮기는 인향을 반복한 뒤 꽃을 골라냅니다.",
      "story": "계화는 중국에서 ‘가을의 향’으로 불리며, 꽃으로 차에 향을 옮기는 인향법은 명대 《다보(茶譜)》에 기록이 있습니다.",
      "flavor": "살구·복숭아 같은 달콤한 꽃 향, 부드러운 단맛. 꽃잎이 많으면 향이 더 진합니다.",
      "pairing": "달지 않은 구운 과자, 견과, 과일.",
      "brewTip": "85도. 끓는 물이면 꽃 향이 날아가고 떫음만 남습니다.",
      "keep": "밀봉해 서늘하게. 꽃 향은 개봉 후 빠르게 줄어듭니다.",
      "keywords": "계화차 목서차 구이린 인향 화차"
    },
    "en": {
      "name": "Osmanthus Tea",
      "oneLine": "Autumn osmanthus layered into the leaf — apricot-sweet.",
      "oxidation": "about 60% (depends on base)",
      "ratioNote": "3 g to 200 ml",
      "rounds": "3 infusions",
      "steepBasis": "85 °C: 2½ minutes, then 1½, then 2.",
      "origin": "Guilin in Guangxi and Fujian; the base is green, light oolong or black tea.",
      "process": "Leaf and blossom are stacked repeatedly to transfer scent, then the blossom is removed.",
      "story": "Osmanthus is called autumn's fragrance in China; scenting tea with flowers is set down in the Ming-dynasty Cha Pu (Tea Manual).",
      "flavor": "Apricot and peach-like florals, soft sweetness; more petals, more scent.",
      "pairing": "Plain baked sweets, nuts, fruit.",
      "brewTip": "85 °C; boiling water drives the flowers off and leaves tannin.",
      "keep": "Sealed and cool — the flower scent fades quickly once opened.",
      "keywords": "osmanthus tea guihua Guilin scented tea"
    },
    "zh-CN": {
      "name": "桂花茶",
      "oneLine": "把秋桂的香窨进茶里，甜似杏子。",
      "oxidation": "约60%（随茶坯）",
      "ratioNote": "200毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡2分30秒，第二泡1分30秒，第三泡2分钟。",
      "origin": "广西桂林、福建，茶坯用绿茶、轻乌龙或红茶。",
      "process": "茶花层叠窨制数次后筛去花。",
      "story": "桂花被称作秋天的香，窨花制茶在明代《茶谱》已有明确记载。",
      "flavor": "杏、桃般的甜花香，柔甜；花多则香浓。",
      "pairing": "原味烤点心、坚果、水果。",
      "brewTip": "85度，沸水会冲散花香只剩涩。",
      "keep": "密封阴凉，开封后花香易散。",
      "keywords": "桂花茶 桂林 窨制 花茶"
    },
    "zh-TW": {
      "name": "桂花茶",
      "oneLine": "把秋桂的香窨進茶裡，甜似杏子。",
      "oxidation": "約60%（隨茶坯）",
      "ratioNote": "200毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85度泡2分30秒，第二泡1分30秒，第三泡2分鐘。",
      "origin": "廣西桂林、福建，茶坯用綠茶、輕烏龍或紅茶。",
      "process": "茶花層疊窨制數次後篩去花。",
      "story": "桂花被稱作秋天的香，窨花制茶在明代《茶譜》已有明確記載。",
      "flavor": "杏、桃般的甜花香，柔甜；花多則香濃。",
      "pairing": "原味烤點心、堅果、水果。",
      "brewTip": "85度，沸水會衝散花香只剩澀。",
      "keep": "密封陰涼，開封後花香易散。",
      "keywords": "桂花茶 桂林 窨制 花茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "blend-rose",
    "group": "black",
    "kind": "tea",
    "hanja": "玫",
    "sub": "Rose Tea",
    "alias": [
      "장미차",
      "매괴홍차"
    ],
    "hz": "玫瑰花茶",
    "hs": "玫瑰花茶",
    "rom": "Meigui Cha",
    "temp": 90,
    "tempRange": "85~95℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      150,
      90,
      120
    ],
    "maxSteep": 3,
    "oxidationValue": 85,
    "traits": "t-afternoon t-night a-floral a-fruit b-medium k-sweet r-clean s-hot w-quick p-dessert c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "말린 장미 꽃봉오리를 홍차나 녹차에 섞거나, 꽃만 우려 마시기도 합니다.",
        "차잎과 말린 꽃을 섞어 두거나, 진한 차에 장미 향을 입혀 만듭니다."
      ],
      "en": [
        "Dried rose buds are blended with black or green tea — or brewed on their own.",
        "Leaf and dried blossom are blended, or a strong tea is scented with rose."
      ],
      "zh-CN": [
        "干玫瑰花蕾与红茶或绿茶拼配，也可单用花冲泡。",
        "茶坯与干花拼合，或以浓茶窨玫瑰香。"
      ],
      "zh-TW": [
        "幹玫瑰花蕾與紅茶或綠茶拼配，也可單用花衝泡。",
        "茶坯與乾花拼合，或以濃茶窨玫瑰香。"
      ]
    },
    "ko": {
      "name": "장미차",
      "oneLine": "말린 장미 봉오리의 향 — 홍차에 얹으면 더 진해집니다.",
      "oxidation": "약 85% (홍차 베이스)",
      "ratioNote": "200ml에 3g",
      "rounds": "3회",
      "steepBasis": "90도에서 2분 30초, 2포 1분 30초. 꽃만 우리면 3분.",
      "origin": "중국·이란 등. 홍차 베이스는 인도·스리랑카 차를 씁니다.",
      "process": "말린 장미 봉오리를 홍차잎과 섞거나 차에 향을 입힙니다.",
      "story": "장미는 중동과 중국에서 오래 차에 섞어 온 꽃입니다.",
      "flavor": "장미 향과 꿀 같은 단맛, 홍차의 몰트가 뒤를 받칩니다.",
      "pairing": "초콜릿, 견과, 과일 디저트.",
      "brewTip": "90도에서 2분 30초. 꽃이 많으면 향이 비누처럼 느껴질 수 있어 짧게.",
      "keep": "밀봉해 서늘하게. 꽃잎 색이 바래면 향도 줄어듭니다.",
      "keywords": "장미차 매괴홍차 로즈티 꽃차"
    },
    "en": {
      "name": "Rose Tea",
      "oneLine": "Dried rose buds over black tea — deeper than the flower alone.",
      "oxidation": "about 85% (black base)",
      "ratioNote": "3 g to 200 ml",
      "rounds": "3 infusions",
      "steepBasis": "90 °C: 2½ minutes, then 1½; 3 minutes if brewing buds alone.",
      "origin": "China and Iran; the base tea comes from India and Sri Lanka.",
      "process": "Dried rose buds blended with black leaf, or the tea scented with rose.",
      "story": "Rose has been blended into tea in the Middle East and China for centuries.",
      "flavor": "Rose and honey sweetness with malt behind.",
      "pairing": "Chocolate, nuts, fruit desserts.",
      "brewTip": "2½ minutes at 90 °C; too many petals turns it soapy, so keep it short.",
      "keep": "Sealed and cool; faded petals mean faded scent.",
      "keywords": "rose tea meigui scented black tea"
    },
    "zh-CN": {
      "name": "玫瑰花茶",
      "oneLine": "干玫瑰花蕾拼红茶，香比单花更厚。",
      "oxidation": "约85%（红茶坯）",
      "ratioNote": "200毫升配3克",
      "rounds": "3泡",
      "steepBasis": "90度泡2分30秒，第二泡1分30秒；单冲花则3分钟。",
      "origin": "中国、伊朗等地，茶坯多用印度、斯里兰卡红茶。",
      "process": "干玫瑰花蕾与红茶拼合，或以浓茶窨玫瑰香。",
      "story": "玫瑰入茶在中东与中国都有长久历史。",
      "flavor": "玫瑰香与蜜甜，后段是红茶的麦芽味。",
      "pairing": "巧克力、坚果、水果甜点。",
      "brewTip": "90度两分半，花多易显皂感，宜短泡。",
      "keep": "密封阴凉，花色褪则香减。",
      "keywords": "玫瑰花茶 玫瑰红茶 花茶"
    },
    "zh-TW": {
      "name": "玫瑰花茶",
      "oneLine": "幹玫瑰花蕾拼紅茶，香比單花更厚。",
      "oxidation": "約85%（紅茶坯）",
      "ratioNote": "200毫升配3克",
      "rounds": "3泡",
      "steepBasis": "90度泡2分30秒，第二泡1分30秒；單衝花則3分鐘。",
      "origin": "中國、伊朗等地，茶坯多用印度、斯裡蘭卡紅茶。",
      "process": "幹玫瑰花蕾與紅茶拼合，或以濃茶窨玫瑰香。",
      "story": "玫瑰入茶在中東與中國都有長久歷史。",
      "flavor": "玫瑰香與蜜甜，後段是紅茶的麥芽味。",
      "pairing": "巧克力、堅果、水果甜點。",
      "brewTip": "90度兩分半，花多易顯皂感，宜短泡。",
      "keep": "密封陰涼，花色褪則香減。",
      "keywords": "玫瑰花茶 玫瑰紅茶 花茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "blend-lychee",
    "group": "black",
    "kind": "tea",
    "hanja": "荔",
    "sub": "Lychee Black Tea",
    "alias": [
      "여지홍차",
      "리치홍차"
    ],
    "hz": "荔枝紅茶",
    "hs": "荔枝红茶",
    "rom": "Lizhi Hongcha",
    "temp": 90,
    "tempRange": "85~95℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      150,
      120,
      150
    ],
    "maxSteep": 3,
    "oxidationValue": 90,
    "traits": "t-morning t-afternoon a-fruit a-floral b-medium k-sweet r-clean s-hot s-iced p-dessert c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "광둥의 홍차에 여지 향을 입힌 차입니다. 여지는 광둥·푸젠 남부의 과일입니다.",
        "홍차잎에 여지 향을 흡착시키거나 말린 여지를 섞어 만듭니다."
      ],
      "en": [
        "Cantonese black tea scented with lychee, a fruit of southern Guangdong and Fujian.",
        "Black leaf is scented with lychee, or dried fruit is blended in."
      ],
      "zh-CN": [
        "广东红茶窨荔枝香，荔枝为粤闽南部水果。",
        "茶坯吸附荔枝香，或拼入干果。"
      ],
      "zh-TW": [
        "廣東紅茶窨荔枝香，荔枝為粵閩南部水果。",
        "茶坯吸附荔枝香，或拼入乾果。"
      ]
    },
    "ko": {
      "name": "여지홍차",
      "oneLine": "여지의 향이 홍차 위에 얹힌, 광둥의 과일 홍차.",
      "oxidation": "약 90%",
      "ratioNote": "200ml에 3g",
      "rounds": "3회",
      "steepBasis": "90도에서 2분 30초, 2포 2분, 3포 2분 30초. 차갑게 마셔도 좋습니다.",
      "origin": "광둥·푸젠 남부. 베이스는 중국 홍차.",
      "process": "홍차잎에 여지 향을 입히거나 말린 여지를 섞습니다.",
      "story": "여지는 광둥의 대표 과일로, 6~7월에 익습니다.",
      "flavor": "여지의 달콤한 향과 홍차의 몰트. 얼음을 넣어도 향이 남습니다.",
      "pairing": "과일 디저트, 아이스티.",
      "brewTip": "90도에서 2분 30초. 아이스티는 두 배로 진하게 우립니다.",
      "keep": "밀봉해 서늘하게.",
      "keywords": "여지홍차 리치홍차 광둥 과일홍차"
    },
    "en": {
      "name": "Lychee Black Tea",
      "oneLine": "Lychee laid over black tea — Guangdong's fruit cup.",
      "oxidation": "about 90%",
      "ratioNote": "3 g to 200 ml",
      "rounds": "3 infusions",
      "steepBasis": "90 °C: 2½ minutes, then 2, then 2½. Good over ice.",
      "origin": "Southern Guangdong and Fujian; the base is Chinese black tea.",
      "process": "Black leaf scented with lychee, or dried fruit blended in.",
      "story": "Lychee is Guangdong's signature fruit, ripe in June and July.",
      "flavor": "Sweet lychee over malt; the aroma survives ice.",
      "pairing": "Fruit desserts, iced tea.",
      "brewTip": "2½ minutes at 90 °C; brew double strength for iced tea.",
      "keep": "Sealed and cool.",
      "keywords": "lychee black tea lizhi Guangdong fruit tea"
    },
    "zh-CN": {
      "name": "荔枝红茶",
      "oneLine": "荔枝香叠在红茶上，广东的果香茶。",
      "oxidation": "约90%",
      "ratioNote": "200毫升配3克",
      "rounds": "3泡",
      "steepBasis": "90度泡2分30秒，第二泡2分钟，第三泡2分30秒，冷饮亦佳。",
      "origin": "广东、闽南，茶坯为中国红茶。",
      "process": "茶坯吸香或拼入干荔枝。",
      "story": "荔枝是广东代表水果，六七月成熟。",
      "flavor": "荔枝甜香与麦芽味，加冰仍香。",
      "pairing": "水果甜点、冰茶。",
      "brewTip": "90度两分半；做冰茶投茶加倍。",
      "keep": "密封阴凉。",
      "keywords": "荔枝红茶 广东 果香红茶"
    },
    "zh-TW": {
      "name": "荔枝紅茶",
      "oneLine": "荔枝香疊在紅茶上，廣東的果香茶。",
      "oxidation": "約90%",
      "ratioNote": "200毫升配3克",
      "rounds": "3泡",
      "steepBasis": "90度泡2分30秒，第二泡2分鐘，第三泡2分30秒，冷飲亦佳。",
      "origin": "廣東、閩南，茶坯為中國紅茶。",
      "process": "茶坯吸香或拼入幹荔枝。",
      "story": "荔枝是廣東代表水果，六七月成熟。",
      "flavor": "荔枝甜香與麥芽味，加冰仍香。",
      "pairing": "水果甜點、冰茶。",
      "brewTip": "90度兩分半；做冰茶投茶加倍。",
      "keep": "密封陰涼。",
      "keywords": "荔枝紅茶 廣東 果香紅茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "blend-thaitea",
    "group": "black",
    "kind": "tea",
    "hanja": "泰",
    "sub": "Thai Tea (Cha Yen)",
    "alias": [
      "차옌",
      "타이 밀크티"
    ],
    "hz": "泰式奶茶",
    "hs": "泰式奶茶",
    "rom": "Cha Yen",
    "temp": 95,
    "tempRange": "95~100℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      300
    ],
    "maxSteep": 1,
    "oxidationValue": 95,
    "traits": "t-morning t-afternoon a-malt a-roast b-full k-sweet r-clean s-iced s-milk p-dessert c-high m-energy",
    "originCountry": {
      "ko": "태국",
      "en": "Thailand",
      "zh-CN": "泰国",
      "zh-TW": "泰國"
    },
    "x": {
      "ko": [
        "진하게 우린 홍차에 연유와 설탕을 더하고 얼음을 채운 태국의 차입니다. 붉은 주황색이 특징입니다.",
        "잘게 부순 홍차를 진하게 우리고 연유·설탕을 더한 뒤 얼음 위에 붓습니다."
      ],
      "en": [
        "Strong black tea with condensed milk and sugar, poured over ice — the bright orange Thai street drink.",
        "Finely broken black tea brewed strong, sweetened with condensed milk, poured over ice."
      ],
      "zh-CN": [
        "浓红茶加炼乳与糖，倒在冰上，呈橘红色。",
        "碎红茶浓泡，加炼乳与糖，浇在冰块上。"
      ],
      "zh-TW": [
        "濃紅茶加煉乳與糖，倒在冰上，呈橘紅色。",
        "碎紅茶濃泡，加煉乳與糖，澆在冰塊上。"
      ]
    },
    "ko": {
      "name": "차옌",
      "oneLine": "진한 홍차에 연유와 얼음 — 태국 거리의 주황색 잔.",
      "oxidation": "약 95%",
      "ratioNote": "150ml에 5g, 연유·설탕은 취향껏",
      "rounds": "1회",
      "steepBasis": "95도에서 5분 진하게. 연유와 설탕을 더한 뒤 얼음 위에 붓습니다.",
      "origin": "태국 전역. 베이스는 실론·아쌈 계열의 잘게 부순 홍차.",
      "process": "잘게 부순 홍차를 진하게 우리고 연유·설탕을 더합니다.",
      "story": "태국에서 차는 20세기 이후 재배가 늘었고, 차옌은 길거리 음료로 자리 잡았습니다.",
      "flavor": "아주 진한 몰트와 단맛, 연유의 크림감. 얼음이 녹으면 부드러워집니다.",
      "pairing": "매운 태국 요리, 디저트.",
      "brewTip": "5분 진하게. 연유 양으로 단맛을 조절합니다.",
      "keep": "밀봉해 건조하게.",
      "keywords": "차옌 태국 밀크티 연유 아이스티"
    },
    "en": {
      "name": "Cha Yen",
      "oneLine": "Strong tea, condensed milk and ice — the orange glass of Thailand.",
      "oxidation": "about 95%",
      "ratioNote": "5 g to 150 ml; condensed milk and sugar to taste",
      "rounds": "1 brew",
      "steepBasis": "95 °C for 5 minutes, strong; sweeten and pour over ice.",
      "origin": "Thailand; the base is finely broken Ceylon or Assam-type black tea.",
      "process": "Finely broken leaf brewed strong, then condensed milk and sugar added.",
      "story": "Tea growing expanded in Thailand in the 20th century and cha yen became a street staple.",
      "flavor": "Very strong malt and sugar, creamy from the condensed milk; softer as the ice melts.",
      "pairing": "Spicy Thai food, desserts.",
      "brewTip": "Brew five minutes strong; control sweetness with the condensed milk.",
      "keep": "Sealed and dry.",
      "keywords": "cha yen Thai iced tea condensed milk"
    },
    "zh-CN": {
      "name": "泰式奶茶",
      "oneLine": "浓茶加炼乳与冰，泰国街头的橘色一杯。",
      "oxidation": "约95%",
      "ratioNote": "150毫升配5克，炼乳与糖随口味",
      "rounds": "1次",
      "steepBasis": "95度泡5分钟至浓，加炼乳与糖后浇在冰上。",
      "origin": "泰国全境，茶坯多为锡兰或阿萨姆型碎红茶。",
      "process": "碎红茶浓泡后加炼乳与糖。",
      "story": "泰国茶叶种植在20世纪扩大，泰式奶茶成为街头饮品。",
      "flavor": "浓麦芽与甜，炼乳带来奶油感，冰化后转柔。",
      "pairing": "泰式辛香料理、甜点。",
      "brewTip": "泡足五分钟，甜度用炼乳调节。",
      "keep": "密封干燥。",
      "keywords": "泰式奶茶 炼乳 冰茶 泰国"
    },
    "zh-TW": {
      "name": "泰式奶茶",
      "oneLine": "濃茶加煉乳與冰，泰國街頭的橘色一杯。",
      "oxidation": "約95%",
      "ratioNote": "150毫升配5克，煉乳與糖隨口味",
      "rounds": "1次",
      "steepBasis": "95度泡5分鐘至濃，加煉乳與糖後澆在冰上。",
      "origin": "泰國全境，茶坯多為錫蘭或阿薩姆型碎紅茶。",
      "process": "碎紅茶濃泡後加煉乳與糖。",
      "story": "泰國茶葉種植在20世紀擴大，泰式奶茶成為街頭飲品。",
      "flavor": "濃麥芽與甜，煉乳帶來奶油感，冰化後轉柔。",
      "pairing": "泰式辛香料理、甜點。",
      "brewTip": "泡足五分鐘，甜度用煉乳調節。",
      "keep": "密封乾燥。",
      "keywords": "泰式奶茶 煉乳 冰茶 泰國"
    },
    "originCountryCode": "th"
  },
  {
    "id": "blend-moroccan-mint",
    "group": "green",
    "kind": "tea",
    "hanja": "薄",
    "sub": "Maghrebi Mint Tea",
    "alias": [
      "모로코 민트티",
      "마그레브 민트차"
    ],
    "hz": "薄荷綠茶",
    "hs": "薄荷绿茶",
    "rom": "Maghrebi Mint Tea",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "4g",
    "water": "200ml",
    "steeps": [
      120,
      90,
      120
    ],
    "maxSteep": 3,
    "oxidationValue": 5,
    "traits": "t-morning t-afternoon a-herb a-grass b-light k-sweet r-clean s-hot s-iced p-dessert c-mid m-refresh",
    "originCountry": {
      "ko": "모로코",
      "en": "Morocco",
      "zh-CN": "摩洛哥",
      "zh-TW": "摩洛哥"
    },
    "x": {
      "ko": [
        "모로코를 비롯한 마그레브 지역의 민트차입니다. 중국 건차(군피우더)에 신선한 박하와 설탕을 넣고 높이 부어 마십니다.",
        "군피우더 녹차를 짧게 우리고 박하 잎과 설탕을 넣은 뒤, 주전자를 높이 들어 부어 거품을 냅니다."
      ],
      "en": [
        "The mint tea of Morocco and the wider Maghreb: Chinese gunpowder green with fresh spearmint and sugar, poured from a height.",
        "Gunpowder green brewed briefly, spearmint and sugar added, then poured high to aerate."
      ],
      "zh-CN": [
        "摩洛哥及马格里布地区的薄荷茶：中国珠茶加鲜薄荷与糖，高举茶壶冲注。",
        "珠茶短泡，加薄荷与糖，高冲起泡。"
      ],
      "zh-TW": [
        "摩洛哥及馬格里布地區的薄荷茶：中國珠茶加鮮薄荷與糖，高舉茶壺衝注。",
        "珠茶短泡，加薄荷與糖，高衝起泡。"
      ]
    },
    "ko": {
      "name": "모로코 민트",
      "oneLine": "중국 건차에 신선한 박하와 설탕 — 높이 부어 마시는 차.",
      "oxidation": "약 5% (녹차 베이스)",
      "ratioNote": "200ml에 4g, 박하 한 줌·설탕은 취향껏",
      "rounds": "3회",
      "steepBasis": "85도에서 2분, 박하와 설탕을 넣고 다시 1분. 주전자를 높이 들어 부어 거품을 냅니다.",
      "origin": "모로코·알제리·튀니지. 베이스는 중국 저장성의 군피우더 녹차.",
      "process": "군피우더를 짧게 우리고 박하·설탕을 더한 뒤 높이 부어 섞습니다.",
      "story": "19세기 이후 유럽을 거쳐 들어온 중국 녹차가 모로코의 민트차로 자리 잡았습니다.",
      "flavor": "박하의 청량함과 진한 단맛, 녹차의 풀 향. 뜨거워도 청량합니다.",
      "pairing": "단 과자, 쿠스쿠스, 식후.",
      "brewTip": "85도에서 짧게. 박하는 마지막에 넣어야 향이 살아 있습니다.",
      "keep": "차잎은 밀봉해 건조하게. 박하는 그때그때 신선한 잎을 씁니다.",
      "keywords": "모로코 민트티 박하 군피우더 마그레브"
    },
    "en": {
      "name": "Maghrebi Mint Tea",
      "oneLine": "Gunpowder green with fresh mint and sugar, poured from a height.",
      "oxidation": "about 5% (green base)",
      "ratioNote": "4 g to 200 ml; a handful of mint and sugar to taste",
      "rounds": "3 infusions",
      "steepBasis": "85 °C for 2 minutes, then mint and sugar for another minute; pour high to froth.",
      "origin": "Morocco, Algeria and Tunisia, on a Chinese gunpowder base.",
      "process": "Gunpowder brewed briefly, mint and sugar added, then poured from a height.",
      "story": "Chinese green tea arrived via Europe from the 19th century and became Morocco's mint tea.",
      "flavor": "Cool mint, deep sugar, green-tea grass — refreshing even hot.",
      "pairing": "Sweet pastries, couscous, after meals.",
      "brewTip": "Short at 85 °C; add the mint last so the oil survives.",
      "keep": "Leaf sealed and dry; use fresh mint each time.",
      "keywords": "Moroccan mint tea gunpowder Maghreb spearmint"
    },
    "zh-CN": {
      "name": "摩洛哥薄荷茶",
      "oneLine": "中国珠茶加鲜薄荷与糖，高举冲注。",
      "oxidation": "约5%（绿茶坯）",
      "ratioNote": "200毫升配4克，薄荷一把、糖随口味",
      "rounds": "3泡",
      "steepBasis": "85度泡2分钟，加薄荷与糖再泡1分钟，高冲起泡。",
      "origin": "摩洛哥、阿尔及利亚、突尼斯，茶坯为中国浙江珠茶。",
      "process": "珠茶短泡后加薄荷与糖，再高冲混合。",
      "story": "19世纪后经欧洲传入的中国绿茶，成为摩洛哥的薄荷茶。",
      "flavor": "薄荷清凉、甜度高、绿茶草香。",
      "pairing": "甜点心、库斯库斯、餐后。",
      "brewTip": "85度短泡，薄荷最后放。",
      "keep": "茶叶密封干燥，薄荷现取现用。",
      "keywords": "摩洛哥薄荷茶 珠茶 马格里布 薄荷"
    },
    "zh-TW": {
      "name": "摩洛哥薄荷茶",
      "oneLine": "中國珠茶加鮮薄荷與糖，高舉衝注。",
      "oxidation": "約5%（綠茶坯）",
      "ratioNote": "200毫升配4克，薄荷一把、糖隨口味",
      "rounds": "3泡",
      "steepBasis": "85度泡2分鐘，加薄荷與糖再泡1分鐘，高衝起泡。",
      "origin": "摩洛哥、阿爾及利亞、突尼西亞，茶坯為中國浙江珠茶。",
      "process": "珠茶短泡後加薄荷與糖，再高衝混合。",
      "story": "19世紀後經歐洲傳入的中國綠茶，成為摩洛哥的薄荷茶。",
      "flavor": "薄荷清涼、甜度高、綠茶草香。",
      "pairing": "甜點心、庫斯庫斯、餐後。",
      "brewTip": "85度短泡，薄荷最後放。",
      "keep": "茶葉密封乾燥，薄荷現取現用。",
      "keywords": "摩洛哥薄荷茶 珠茶 馬格里布 薄荷"
    },
    "originCountryCode": "ma"
  },  {
    "id": "blend-irish-breakfast",
    "group": "black",
    "kind": "tea",
    "hanja": "愛",
    "sub": "Irish Breakfast",
    "alias": [
      "아일랜드 브렉퍼스트",
      "아이리시 블렌드"
    ],
    "hz": "愛爾蘭早餐茶",
    "hs": "爱尔兰早餐茶",
    "rom": "Irish Breakfast",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "4g",
    "water": "200ml",
    "steeps": [
      240,
      210,
      240
    ],
    "maxSteep": 3,
    "oxidationValue": 95,
    "traits": "t-morning a-malt b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
    "originCountry": {
      "ko": "아일랜드",
      "en": "Ireland",
      "zh-CN": "爱尔兰",
      "zh-TW": "愛爾蘭"
    },
    "x": {
      "ko": [
        "아쌈 비중을 높여 진하게 만든 아침 블렌드입니다. 잉글리쉬 브렉퍼스트보다 색이 짙고 힘이 있습니다.",
        "아쌈을 중심으로 실론·케냐를 섞어 진한 몰트와 색을 냅니다."
      ],
      "en": [
        "A breakfast blend weighted toward Assam: darker and stronger than English Breakfast.",
        "Mostly Assam with Ceylon and Kenyan leaf for malt and colour."
      ],
      "zh-CN": [
        "以阿萨姆为主的浓强早餐拼配，比英式早餐更深更强。",
        "以阿萨姆为主，拼锡兰与肯尼亚茶提色提味。"
      ],
      "zh-TW": [
        "以阿薩姆為主的濃強早餐拼配，比英式早餐更深更強。",
        "以阿薩姆為主，拼錫蘭與肯亞茶提色提味。"
      ]
    },
    "ko": {
      "name": "아일랜드 브렉퍼스트",
      "oneLine": "아쌈을 앞세운, 아침을 위한 가장 진한 블렌드.",
      "oxidation": "약 95%",
      "ratioNote": "200ml에 4g",
      "rounds": "3회",
      "steepBasis": "98도에서 4분, 2포 3분 30초, 3포 4분.",
      "origin": "아일랜드의 차 문화에서 나온 블렌드. 베이스는 아쌈·실론.",
      "process": "아쌈을 중심으로 실론·케냐를 섞습니다.",
      "story": "아일랜드에서는 오래 진하고 우유를 넣은 홍차를 마셔 왔고, 그 취향이 블렌드로 굳어졌습니다.",
      "flavor": "진한 몰트와 색, 우유를 넣으면 크림 같은 질감이 됩니다.",
      "pairing": "아침 식사, 검은 빵, 버터.",
      "brewTip": "98도에서 4분. 우유를 넣을 것이라면 잎을 조금 더.",
      "keep": "밀봉해 건조하게.",
      "keywords": "아일랜드 브렉퍼스트 아쌈 아침 블렌드"
    },
    "en": {
      "name": "Irish Breakfast",
      "oneLine": "Assam-forward — the strongest of the breakfast blends.",
      "oxidation": "about 95%",
      "ratioNote": "4 g to 200 ml",
      "rounds": "3 infusions",
      "steepBasis": "98 °C: 4 minutes, then 3½, then 4.",
      "origin": "A blend from Irish tea culture, on Assam and Ceylon.",
      "process": "Assam leading, with Ceylon and Kenyan leaf.",
      "story": "Strong tea with milk has long been the Irish habit, and the blend settled around it.",
      "flavor": "Deep malt and colour; milk turns it creamy.",
      "pairing": "Breakfast, dark bread, butter.",
      "brewTip": "Four minutes at 98 °C; add a little more leaf if you take milk.",
      "keep": "Sealed and dry.",
      "keywords": "Irish breakfast Assam blend strong"
    },
    "zh-CN": {
      "name": "爱尔兰早餐茶",
      "oneLine": "阿萨姆为主，早餐拼配里最浓的一支。",
      "oxidation": "约95%",
      "ratioNote": "200毫升配4克",
      "rounds": "3泡",
      "steepBasis": "98度泡4分钟，第二泡3分30秒，第三泡4分钟。",
      "origin": "源自爱尔兰饮茶习惯，茶坯为阿萨姆与锡兰。",
      "process": "以阿萨姆为主，拼锡兰与肯尼亚。",
      "story": "爱尔兰长年喝浓红茶加奶，这份口味固化成拼配。",
      "flavor": "麦芽浓，汤色深，加奶后呈奶油质感。",
      "pairing": "早餐、黑面包、黄油。",
      "brewTip": "98度四分钟，加奶可多投茶。",
      "keep": "密封干燥。",
      "keywords": "爱尔兰早餐茶 阿萨姆 拼配"
    },
    "zh-TW": {
      "name": "愛爾蘭早餐茶",
      "oneLine": "阿薩姆為主，早餐拼配裡最濃的一支。",
      "oxidation": "約95%",
      "ratioNote": "200毫升配4克",
      "rounds": "3泡",
      "steepBasis": "98度泡4分鐘，第二泡3分30秒，第三泡4分鐘。",
      "origin": "源自愛爾蘭飲茶習慣，茶坯為阿薩姆與錫蘭。",
      "process": "以阿薩姆為主，拼錫蘭與肯亞。",
      "story": "愛爾蘭長年喝濃紅茶加奶，這份口味固化成拼配。",
      "flavor": "麥芽濃，湯色深，加奶後呈奶油質感。",
      "pairing": "早餐、黑麵包、黃油。",
      "brewTip": "98度四分鐘，加奶可多投茶。",
      "keep": "密封乾燥。",
      "keywords": "愛爾蘭早餐茶 阿薩姆 拼配"
    },
    "originCountryCode": "ie"
  },
  {
    "id": "herb-cassia-seed",
    "group": "everyday",
    "kind": "tea",
    "hanja": "決",
    "sub": "Cassia Seed Tea",
    "alias": [
      "결명자차",
      "결명자"
    ],
    "hz": "決明子茶",
    "hs": "决明子茶",
    "rom": "Gyeolmyeongja-cha",
    "temp": 95,
    "tempRange": "90~100℃",
    "leaf": "5g",
    "water": "200ml",
    "steeps": [
      300,
      300
    ],
    "maxSteep": 2,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon t-night a-roast a-roast b-medium k-grain r-clean s-hot p-meal c-none m-calm",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "결명자(決明子) 씨를 볶아 우린 차입니다. 카페인이 없어 밤에도 마십니다.",
        "씨를 볶아 향을 낸 뒤 5분 이상 우립니다. 볶은 정도에 따라 고소함과 쌉쌀함이 달라집니다."
      ],
      "en": [
        "Roasted cassia seed, brewed without caffeine, so it suits the evening.",
        "The seed is roasted for aroma, then steeped five minutes or more; roast level sets the balance of nutty and bitter."
      ],
      "zh-CN": [
        "炒决明子冲泡，不含咖啡因，晚上也能喝。",
        "炒香后冲泡五分钟以上，焙炒程度决定香与苦的比例。"
      ],
      "zh-TW": [
        "炒決明子衝泡，不含咖啡因，晚上也能喝。",
        "炒香後衝泡五分鐘以上，焙炒程度決定香與苦的比例。"
      ]
    },
    "ko": {
      "name": "결명자차",
      "oneLine": "볶은 씨의 구수함 — 카페인 없이 밤에 마시는 차.",
      "oxidation": "무산화 · 카페인 없음",
      "ratioNote": "200ml에 5g",
      "rounds": "2회",
      "steepBasis": "95도에서 5분. 끓이면 더 구수해집니다.",
      "origin": "한국 전역. 결명자 씨를 볶아 씁니다.",
      "process": "씨를 볶아 향을 낸 뒤 뜨거운 물에 우립니다.",
      "story": "한국에서는 오래전부터 볶은 결명자를 물처럼 달여 마셨습니다.",
      "flavor": "볶은 곡물의 고소함과 옅은 쌉쌀함, 끝에 약간의 단맛.",
      "pairing": "식사, 기름진 음식, 밤.",
      "brewTip": "5분 이상. 씨가 단단해 끓이면 맛이 더 납니다.",
      "keep": "밀봉해 서늘하고 건조하게. 볶은 씨는 냄새를 잘 흡수합니다.",
      "keywords": "결명자차 결명자 볶은차 무카페인"
    },
    "en": {
      "name": "Cassia Seed Tea",
      "oneLine": "Roasted seed sweetness — a caffeine-free evening cup.",
      "oxidation": "none · caffeine-free",
      "ratioNote": "5 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "95 °C for 5 minutes; boiling makes it rounder.",
      "origin": "Korea; the seed is sold roasted.",
      "process": "The seed is roasted, then brewed.",
      "story": "Roasted cassia seed has long been boiled as an everyday drink in Korea.",
      "flavor": "Roasted grain, a faint bitterness, a little sweetness at the end.",
      "pairing": "Meals, rich food, evening.",
      "brewTip": "Five minutes or more; the hard seed benefits from boiling.",
      "keep": "Sealed, cool and dry — roasted seed takes on smells.",
      "keywords": "cassia seed tea gyeolmyeongja Korea caffeine free"
    },
    "zh-CN": {
      "name": "决明子茶",
      "oneLine": "炒籽的焦香，不含咖啡因的夜间茶。",
      "oxidation": "不发酵·无咖啡因",
      "ratioNote": "200毫升配5克",
      "rounds": "2泡",
      "steepBasis": "95度泡5分钟，煮后更醇。",
      "origin": "韩国全境，用炒决明子。",
      "process": "炒香后热水冲泡。",
      "story": "韩国自古把炒决明子当日常饮品熬煮。",
      "flavor": "炒谷香、微苦，尾端略甜。",
      "pairing": "餐食、油腻食物、夜间。",
      "brewTip": "五分钟以上，煮更出味。",
      "keep": "密封阴凉干燥，易吸味。",
      "keywords": "决明子茶 韩国 无咖啡因 炒制"
    },
    "zh-TW": {
      "name": "決明子茶",
      "oneLine": "炒籽的焦香，不含咖啡因的夜間茶。",
      "oxidation": "不發酵·無咖啡因",
      "ratioNote": "200毫升配5克",
      "rounds": "2泡",
      "steepBasis": "95度泡5分鐘，煮後更醇。",
      "origin": "韓國全境，用炒決明子。",
      "process": "炒香後熱水衝泡。",
      "story": "韓國自古把炒決明子當日常飲品熬煮。",
      "flavor": "炒谷香、微苦，尾端略甜。",
      "pairing": "餐食、油膩食物、夜間。",
      "brewTip": "五分鐘以上，煮更出味。",
      "keep": "密封陰涼乾燥，易吸味。",
      "keywords": "決明子茶 韓國 無咖啡因 炒制"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "herb-burdock",
    "group": "everyday",
    "kind": "tea",
    "hanja": "牛",
    "sub": "Burdock Tea",
    "alias": [
      "우엉차",
      "우엉뿌리차"
    ],
    "hz": "牛蒡茶",
    "hs": "牛蒡茶",
    "rom": "Ueong-cha",
    "temp": 95,
    "tempRange": "90~100℃",
    "leaf": "5g",
    "water": "200ml",
    "steeps": [
      300,
      300
    ],
    "maxSteep": 2,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon t-night a-roast a-roast b-medium k-sweet r-clean s-hot p-meal c-none m-cozy",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "우엉 뿌리를 얇게 썰어 말린 뒤 볶아 우린 차입니다. 카페인이 없습니다.",
        "말린 우엉을 볶아 갈색이 돌면 뜨거운 물에 5분 이상 우립니다."
      ],
      "en": [
        "Sliced burdock root, dried and roasted; caffeine-free.",
        "Dried root is roasted until brown, then steeped five minutes or more."
      ],
      "zh-CN": [
        "牛蒡根切片晾干后炒制，不含咖啡因。",
        "干根炒至褐色后冲泡五分钟以上。"
      ],
      "zh-TW": [
        "牛蒡根切片晾乾後炒制，不含咖啡因。",
        "幹根炒至褐色後衝泡五分鐘以上。"
      ]
    },
    "ko": {
      "name": "우엉차",
      "oneLine": "볶은 우엉 뿌리의 구수한 단맛 — 카페인 없는 차.",
      "oxidation": "무산화 · 카페인 없음",
      "ratioNote": "200ml에 5g",
      "rounds": "2회",
      "steepBasis": "95도에서 5분. 끓이면 단맛이 올라옵니다.",
      "origin": "한국·일본. 우엉 뿌리를 말려 볶아 씁니다.",
      "process": "우엉을 얇게 썰어 말린 뒤 볶아 우립니다.",
      "story": "한국에서는 우엉을 차로 볶아 마시는 방식이 오래 이어졌습니다.",
      "flavor": "볶은 뿌리의 고소함과 은은한 단맛, 끝에 약한 쌉쌀함.",
      "pairing": "식사, 기름진 음식, 밤.",
      "brewTip": "5분 이상. 끓이면 단맛이 더 살아납니다.",
      "keep": "밀봉해 건조하게. 습기를 먹으면 곰팡이가 생깁니다.",
      "keywords": "우엉차 우엉 뿌리 볶은차 무카페인"
    },
    "en": {
      "name": "Burdock Tea",
      "oneLine": "Roasted burdock root — sweet, earthy, caffeine-free.",
      "oxidation": "none · caffeine-free",
      "ratioNote": "5 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "95 °C for 5 minutes; boiling brings out sweetness.",
      "origin": "Korea and Japan; the root is dried and roasted.",
      "process": "Thin-sliced root is dried, roasted and brewed.",
      "story": "Roasted burdock has long been drunk as a tea in Korea.",
      "flavor": "Roasted earthiness with quiet sweetness and a mild bitter end.",
      "pairing": "Meals, fatty food, evening.",
      "brewTip": "Five minutes or more; boiling lifts the sweetness.",
      "keep": "Sealed and dry — damp root moulds.",
      "keywords": "burdock tea ueong Korea caffeine free roasted root"
    },
    "zh-CN": {
      "name": "牛蒡茶",
      "oneLine": "炒牛蒡根的焦甜，不含咖啡因。",
      "oxidation": "不发酵·无咖啡因",
      "ratioNote": "200毫升配5克",
      "rounds": "2泡",
      "steepBasis": "95度泡5分钟，煮后更甜。",
      "origin": "韩国、日本，用干炒牛蒡根。",
      "process": "切薄片晾干后炒制冲泡。",
      "story": "韩国长期把牛蒡炒后当茶喝。",
      "flavor": "烤根香、微甜，尾端轻苦。",
      "pairing": "餐食、油腻食物、夜间。",
      "brewTip": "五分钟以上，煮饮更甜。",
      "keep": "密封干燥，受潮易霉。",
      "keywords": "牛蒡茶 韩国 无咖啡因 炒根"
    },
    "zh-TW": {
      "name": "牛蒡茶",
      "oneLine": "炒牛蒡根的焦甜，不含咖啡因。",
      "oxidation": "不發酵·無咖啡因",
      "ratioNote": "200毫升配5克",
      "rounds": "2泡",
      "steepBasis": "95度泡5分鐘，煮後更甜。",
      "origin": "韓國、日本，用幹炒牛蒡根。",
      "process": "切薄片晾乾後炒制衝泡。",
      "story": "韓國長期把牛蒡炒後當茶喝。",
      "flavor": "烤根香、微甜，尾端輕苦。",
      "pairing": "餐食、油膩食物、夜間。",
      "brewTip": "五分鐘以上，煮飲更甜。",
      "keep": "密封乾燥，受潮易黴。",
      "keywords": "牛蒡茶 韓國 無咖啡因 炒根"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "herb-gugija",
    "group": "traditional",
    "kind": "tea",
    "hanja": "枸",
    "sub": "Goji Berry Tea",
    "alias": [
      "구기자차",
      "구기차"
    ],
    "hz": "枸杞茶",
    "hs": "枸杞茶",
    "rom": "Gugija-cha",
    "temp": 90,
    "tempRange": "85~95℃",
    "leaf": "5g",
    "water": "200ml",
    "steeps": [
      300,
      300
    ],
    "maxSteep": 2,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon t-night a-fruit a-herb b-light k-sweet r-clean s-hot p-dessert c-none m-calm",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "말린 구기자 열매를 우린 차입니다. 한국에서는 청양, 중국에서는 닝샤의 구기자가 유명합니다.",
        "말린 열매를 5분 이상 우리거나, 대추·감초와 함께 끓이기도 합니다."
      ],
      "en": [
        "Dried goji berries steeped in hot water; Cheongyang in Korea and Ningxia in China are the noted sources.",
        "Dried berries steeped five minutes or more, or boiled with jujube and licorice."
      ],
      "zh-CN": [
        "干枸杞冲泡，韩国青阳与中国宁夏所产著名。",
        "干果冲泡五分钟以上，或与红枣、甘草同煮。"
      ],
      "zh-TW": [
        "幹枸杞衝泡，韓國青陽與中國寧夏所產著名。",
        "乾果衝泡五分鐘以上，或與紅棗、甘草同煮。"
      ]
    },
    "ko": {
      "name": "구기자차",
      "oneLine": "말린 구기자 열매의 옅은 단맛 — 노랗게 우러나는 차.",
      "oxidation": "무산화 · 카페인 없음",
      "ratioNote": "200ml에 5g",
      "rounds": "2회",
      "steepBasis": "90도에서 5분. 씨를 터뜨리듯 끓이면 더 진해집니다.",
      "origin": "한국 충남 청양, 중국 닝샤. 말린 열매를 씁니다.",
      "process": "말린 열매를 그대로 우리거나 대추·감초와 함께 끓입니다.",
      "story": "구기자는 한국과 중국에서 오래 약재 겸 차 재료로 쓰였습니다.",
      "flavor": "옅은 단맛과 약간의 쌉쌀함, 말린 과일 향. 물색은 연한 노랑입니다.",
      "pairing": "대추, 감초, 견과.",
      "brewTip": "90도에서 5분 이상. 열매를 씹어 먹어도 됩니다.",
      "keep": "밀봉해 냉장. 당분이 있어 습기에 약합니다.",
      "keywords": "구기자차 구기자 청양 열매차"
    },
    "en": {
      "name": "Goji Berry Tea",
      "oneLine": "Dried goji berries — pale sweetness, a yellow cup.",
      "oxidation": "none · caffeine-free",
      "ratioNote": "5 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "90 °C for 5 minutes; boiling makes it stronger.",
      "origin": "Cheongyang in Korea, Ningxia in China; dried berries.",
      "process": "Dried berries steeped as they are, or boiled with jujube and licorice.",
      "story": "Goji has long been used as both medicine and tea material in Korea and China.",
      "flavor": "Light sweetness, a little bitterness, dried-fruit aroma; pale yellow liquor.",
      "pairing": "Jujube, licorice, nuts.",
      "brewTip": "Five minutes or more at 90 °C; the berries can be eaten after.",
      "keep": "Sealed and refrigerated — the sugar makes them sensitive to damp.",
      "keywords": "goji berry tea gugija Korea Ningxia"
    },
    "zh-CN": {
      "name": "枸杞茶",
      "oneLine": "干枸杞泡出的浅甜，汤色淡黄。",
      "oxidation": "不发酵·无咖啡因",
      "ratioNote": "200毫升配5克",
      "rounds": "2泡",
      "steepBasis": "90度泡5分钟，煮后更浓。",
      "origin": "韩国青阳、中国宁夏，用干果。",
      "process": "干果直接冲泡，或与红枣、甘草同煮。",
      "story": "枸杞在韩中两地长期兼作药材与茶料。",
      "flavor": "淡甜微苦，带果干香，汤色浅黄。",
      "pairing": "红枣、甘草、坚果。",
      "brewTip": "90度五分钟以上，果可嚼食。",
      "keep": "密封冷藏，含糖易受潮。",
      "keywords": "枸杞茶 青阳 宁夏 果茶"
    },
    "zh-TW": {
      "name": "枸杞茶",
      "oneLine": "幹枸杞泡出的淺甜，湯色淡黃。",
      "oxidation": "不發酵·無咖啡因",
      "ratioNote": "200毫升配5克",
      "rounds": "2泡",
      "steepBasis": "90度泡5分鐘，煮後更濃。",
      "origin": "韓國青陽、中國寧夏，用乾果。",
      "process": "乾果直接衝泡，或與紅棗、甘草同煮。",
      "story": "枸杞在韓中兩地長期兼作藥材與茶料。",
      "flavor": "淡甜微苦，帶果乾香，湯色淺黃。",
      "pairing": "紅棗、甘草、堅果。",
      "brewTip": "90度五分鐘以上，果可嚼食。",
      "keep": "密封冷藏，含糖易受潮。",
      "keywords": "枸杞茶 青陽 寧夏 果茶"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "herb-cornus",
    "group": "traditional",
    "kind": "tea",
    "hanja": "茱",
    "sub": "Cornus Fruit Tea",
    "alias": [
      "산수유차",
      "산수유"
    ],
    "hz": "山茱萸茶",
    "hs": "山茱萸茶",
    "rom": "Sansuyu-cha",
    "temp": 90,
    "tempRange": "85~95℃",
    "leaf": "5g",
    "water": "200ml",
    "steeps": [
      300,
      300
    ],
    "maxSteep": 2,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-fruit a-herb b-medium k-crisp r-clean s-hot p-dessert c-none m-cozy",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "산수유나무의 붉은 열매를 말려 우린 차입니다. 신맛이 강해 꿀이나 대추를 곁들이기도 합니다.",
        "말린 열매를 5분 이상 우리거나 대추와 함께 끓입니다."
      ],
      "en": [
        "Dried red cornus fruit steeped as tea; sharply sour, often softened with honey or jujube.",
        "Dried fruit steeped five minutes or more, or boiled with jujube."
      ],
      "zh-CN": [
        "山茱萸的红色果实晒干冲泡，酸味强，常加蜂蜜或红枣。",
        "干果泡五分钟以上，或与红枣同煮。"
      ],
      "zh-TW": [
        "山茱萸的紅色果實曬乾衝泡，酸味強，常加蜂蜜或紅棗。",
        "乾果泡五分鐘以上，或與紅棗同煮。"
      ]
    },
    "ko": {
      "name": "산수유차",
      "oneLine": "붉은 열매의 강한 신맛 — 꿀을 곁들이는 차.",
      "oxidation": "무산화 · 카페인 없음",
      "ratioNote": "200ml에 5g",
      "rounds": "2회",
      "steepBasis": "90도에서 5분. 신맛이 강해 꿀이나 대추를 더하기도 합니다.",
      "origin": "한국 전역, 특히 전남 구례·경남 산청. 말린 열매를 씁니다.",
      "process": "붉게 익은 열매를 말려 우리거나 대추와 함께 끓입니다.",
      "story": "산수유는 한국에서 오래 약재로 쓰였고, 열매를 차로 달이는 방식도 이어졌습니다.",
      "flavor": "강한 신맛과 옅은 쓴맛, 붉은 물색. 꿀을 더하면 부드러워집니다.",
      "pairing": "대추, 꿀, 견과.",
      "brewTip": "90도에서 5분 이상. 신맛이 부담되면 대추를 함께 넣습니다.",
      "keep": "밀봉해 냉장. 습기를 피합니다.",
      "keywords": "산수유차 산수유 구례 열매차"
    },
    "en": {
      "name": "Cornus Fruit Tea",
      "oneLine": "Sharp red fruit — usually softened with honey.",
      "oxidation": "none · caffeine-free",
      "ratioNote": "5 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "90 °C for 5 minutes; honey or jujube is often added.",
      "origin": "Korea, notably Gurye and Sancheong; dried fruit.",
      "process": "Ripe red fruit is dried, then steeped or boiled with jujube.",
      "story": "Cornus has long been used as medicine in Korea, and the fruit was also brewed as tea.",
      "flavor": "Strong sourness, a little bitterness, red liquor; honey softens it.",
      "pairing": "Jujube, honey, nuts.",
      "brewTip": "Five minutes or more at 90 °C; add jujube if the sourness is too much.",
      "keep": "Sealed and refrigerated.",
      "keywords": "cornus fruit tea sansuyu Korea sour"
    },
    "zh-CN": {
      "name": "山茱萸茶",
      "oneLine": "红色果实的强酸味，常配蜂蜜。",
      "oxidation": "不发酵·无咖啡因",
      "ratioNote": "200毫升配5克",
      "rounds": "2泡",
      "steepBasis": "90度泡5分钟，酸强可加蜂蜜或红枣。",
      "origin": "韩国全境，求礼、山清等地，用干果。",
      "process": "红果晒干后冲泡，或与红枣同煮。",
      "story": "山茱萸在韩国长期入药，果实煮茶也相沿成习。",
      "flavor": "酸味明显、微苦，汤色红，加蜜转柔。",
      "pairing": "红枣、蜂蜜、坚果。",
      "brewTip": "90度五分钟以上，可加红枣。",
      "keep": "密封冷藏。",
      "keywords": "山茱萸茶 求礼 果实茶"
    },
    "zh-TW": {
      "name": "山茱萸茶",
      "oneLine": "紅色果實的強酸味，常配蜂蜜。",
      "oxidation": "不發酵·無咖啡因",
      "ratioNote": "200毫升配5克",
      "rounds": "2泡",
      "steepBasis": "90度泡5分鐘，酸強可加蜂蜜或紅棗。",
      "origin": "韓國全境，求禮、山清等地，用乾果。",
      "process": "紅果曬乾後衝泡，或與紅棗同煮。",
      "story": "山茱萸在韓國長期入藥，果實煮茶也相沿成習。",
      "flavor": "酸味明顯、微苦，湯色紅，加蜜轉柔。",
      "pairing": "紅棗、蜂蜜、堅果。",
      "brewTip": "90度五分鐘以上，可加紅棗。",
      "keep": "密封冷藏。",
      "keywords": "山茱萸茶 求禮 果實茶"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "herb-dandelion",
    "group": "everyday",
    "kind": "tea",
    "hanja": "蒲",
    "sub": "Dandelion Tea",
    "alias": [
      "민들레차",
      "민들레잎차"
    ],
    "hz": "蒲公英茶",
    "hs": "蒲公英茶",
    "rom": "Mindulle-cha",
    "temp": 90,
    "tempRange": "85~95℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      300,
      300
    ],
    "maxSteep": 2,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-herb a-roast b-light k-crisp r-clean s-hot p-meal c-none m-refresh",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "민들레 잎이나 뿌리를 말려 우린 차입니다. 잎은 쌉쌀하고 뿌리는 볶으면 고소해집니다.",
        "말린 잎은 3분, 볶은 뿌리는 5분 이상 우립니다."
      ],
      "en": [
        "Dried dandelion leaf or root: the leaf is bitter, the roasted root nutty.",
        "Leaf steeps three minutes; roasted root five minutes or more."
      ],
      "zh-CN": [
        "蒲公英叶或根晒干冲泡，叶苦，炒根香。",
        "叶泡三分钟，炒根泡五分钟以上。"
      ],
      "zh-TW": [
        "蒲公英葉或根曬乾衝泡，葉苦，炒根香。",
        "葉泡三分鐘，炒根泡五分鐘以上。"
      ]
    },
    "ko": {
      "name": "민들레차",
      "oneLine": "봄 민들레의 쌉쌀함 — 뿌리를 볶으면 고소해집니다.",
      "oxidation": "무산화 · 카페인 없음",
      "ratioNote": "200ml에 3g",
      "rounds": "2회",
      "steepBasis": "90도에서 3분, 볶은 뿌리는 5분.",
      "origin": "한국 전역. 봄에 잎과 뿌리를 채취해 말립니다.",
      "process": "잎은 그늘에 말리고, 뿌리는 씻어 말린 뒤 볶습니다.",
      "story": "한국에서는 민들레를 나물로도 차로도 오래 써 왔습니다.",
      "flavor": "잎은 쌉쌀하고 풀 향이, 볶은 뿌리는 구수함과 옅은 단맛이 납니다.",
      "pairing": "식후, 기름진 음식 뒤.",
      "brewTip": "3g이면 충분합니다. 많으면 쌉쌀함이 강해집니다.",
      "keep": "밀봉해 서늘하고 건조하게.",
      "keywords": "민들레차 민들레 뿌리 볶은차"
    },
    "en": {
      "name": "Dandelion Tea",
      "oneLine": "Spring dandelion's bitterness — and a nutty roasted root.",
      "oxidation": "none · caffeine-free",
      "ratioNote": "3 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "90 °C: 3 minutes for leaf, 5 for roasted root.",
      "origin": "Korea; leaf and root gathered in spring and dried.",
      "process": "Leaves shade-dried; roots washed, dried and roasted.",
      "story": "Dandelion has long been eaten as a spring green and drunk as tea in Korea.",
      "flavor": "Leaf is bitter and grassy; roasted root is toasty with light sweetness.",
      "pairing": "After meals, after rich food.",
      "brewTip": "3 g is enough; more turns sharply bitter.",
      "keep": "Sealed, cool and dry.",
      "keywords": "dandelion tea mindulle Korea roasted root"
    },
    "zh-CN": {
      "name": "蒲公英茶",
      "oneLine": "春日蒲公英的苦，炒根则带焦香。",
      "oxidation": "不发酵·无咖啡因",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "90度：叶泡3分钟，炒根泡5分钟。",
      "origin": "韩国全境，春季采叶与根晒干。",
      "process": "叶阴干，根洗净晒干后炒制。",
      "story": "韩国自古把蒲公英当春菜也当茶饮。",
      "flavor": "叶苦带草香，炒根焦香微甜。",
      "pairing": "餐后、油腻饮食之后。",
      "brewTip": "3克足够，多则苦。",
      "keep": "密封阴凉干燥。",
      "keywords": "蒲公英茶 韩国 炒根"
    },
    "zh-TW": {
      "name": "蒲公英茶",
      "oneLine": "春日蒲公英的苦，炒根則帶焦香。",
      "oxidation": "不發酵·無咖啡因",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "90度：葉泡3分鐘，炒根泡5分鐘。",
      "origin": "韓國全境，春季採葉與根曬乾。",
      "process": "葉陰乾，根洗淨曬乾後炒制。",
      "story": "韓國自古把蒲公英當春菜也當茶飲。",
      "flavor": "葉苦帶草香，炒根焦香微甜。",
      "pairing": "餐後、油膩飲食之後。",
      "brewTip": "3克足夠，多則苦。",
      "keep": "密封陰涼乾燥。",
      "keywords": "蒲公英茶 韓國 炒根"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "herb-cornsilk",
    "group": "everyday",
    "kind": "tea",
    "hanja": "玉",
    "sub": "Corn Silk Tea",
    "alias": [
      "옥수수수염차",
      "옥수수대차"
    ],
    "hz": "玉米鬚茶",
    "hs": "玉米须茶",
    "rom": "Oksusu-suyeom-cha",
    "temp": 95,
    "tempRange": "90~100℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      300,
      300
    ],
    "maxSteep": 2,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-roast a-roast b-light k-sweet r-clean s-hot s-iced p-meal c-none m-refresh",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "옥수수 수염을 말려 볶아 우린 차입니다. 여름에 옥수수를 삶은 물과 비슷한 구수한 맛이 납니다.",
        "수염을 말려 볶은 뒤 5분 이상 우립니다. 끓이면 더 구수합니다."
      ],
      "en": [
        "Dried corn silk, roasted and steeped — much like the water corn has been boiled in.",
        "Silk dried and roasted, then steeped five minutes or more; boiling makes it rounder."
      ],
      "zh-CN": [
        "玉米须晒干炒制后冲泡，味道近似煮玉米的水。",
        "须晒干炒后泡五分钟以上，煮更香。"
      ],
      "zh-TW": [
        "玉米須曬乾炒制後衝泡，味道近似煮玉米的水。",
        "須曬乾炒後泡五分鐘以上，煮更香。"
      ]
    },
    "ko": {
      "name": "옥수수수염차",
      "oneLine": "옥수수를 삶은 물 같은 구수함 — 여름의 차.",
      "oxidation": "무산화 · 카페인 없음",
      "ratioNote": "200ml에 3g",
      "rounds": "2회",
      "steepBasis": "95도에서 5분. 끓이면 구수함이 올라옵니다.",
      "origin": "한국 전역. 옥수수 수염을 말려 볶아 씁니다.",
      "process": "수염을 말려 볶은 뒤 뜨거운 물에 우립니다.",
      "story": "한국에서는 옥수수를 삶은 물을 마시던 습관이 차로 정리되었습니다.",
      "flavor": "구수한 곡물 향과 옅은 단맛, 깔끔한 뒷맛.",
      "pairing": "식사, 여름, 아이스티.",
      "brewTip": "5분 이상. 차갑게 우려도 구수합니다.",
      "keep": "밀봉해 건조하게.",
      "keywords": "옥수수수염차 옥수수 수염 구수한차"
    },
    "en": {
      "name": "Corn Silk Tea",
      "oneLine": "The comfort of corn-boiling water — a summer cup.",
      "oxidation": "none · caffeine-free",
      "ratioNote": "3 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "95 °C for 5 minutes; boiling deepens it.",
      "origin": "Korea; corn silk dried and roasted.",
      "process": "Silk dried, roasted, then brewed.",
      "story": "The Korean habit of drinking the water corn was boiled in became a tea of its own.",
      "flavor": "Toasty grain, light sweetness, a clean finish.",
      "pairing": "Meals, summer, iced tea.",
      "brewTip": "Five minutes or more; it cold-brews well too.",
      "keep": "Sealed and dry.",
      "keywords": "corn silk tea oksusu Korea summer"
    },
    "zh-CN": {
      "name": "玉米须茶",
      "oneLine": "像煮玉米水一样的焦香，夏天的茶。",
      "oxidation": "不发酵·无咖啡因",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "95度泡5分钟，煮后更香。",
      "origin": "韩国全境，用晒干炒制的玉米须。",
      "process": "玉米须晒干炒后冲泡。",
      "story": "韩国原本喝煮玉米的水，后来整理成玉米须茶。",
      "flavor": "谷香、微甜，收尾干净。",
      "pairing": "餐食、夏季、冰茶。",
      "brewTip": "五分钟以上，冷泡亦香。",
      "keep": "密封干燥。",
      "keywords": "玉米须茶 韩国 夏季"
    },
    "zh-TW": {
      "name": "玉米須茶",
      "oneLine": "像煮玉米水一樣的焦香，夏天的茶。",
      "oxidation": "不發酵·無咖啡因",
      "ratioNote": "200毫升配3克",
      "rounds": "2泡",
      "steepBasis": "95度泡5分鐘，煮後更香。",
      "origin": "韓國全境，用曬乾炒制的玉米須。",
      "process": "玉米須曬乾炒後衝泡。",
      "story": "韓國原本喝煮玉米的水，後來整理成玉米須茶。",
      "flavor": "谷香、微甜，收尾乾淨。",
      "pairing": "餐食、夏季、冰茶。",
      "brewTip": "五分鐘以上，冷泡亦香。",
      "keep": "密封乾燥。",
      "keywords": "玉米須茶 韓國 夏季"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "green-chunseol",
    "group": "green",
    "kind": "tea",
    "hanja": "雪",
    "sub": "Chunseol",
    "alias": [
      "춘설차",
      "춘설녹차",
      "무등산 춘설",
      "春雪"
    ],
    "hz": "春雪",
    "hs": "春雪",
    "rom": "Chunseol",
    "temp": 75,
    "tempRange": "70~80℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      90,
      30,
      60
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-solo c-mid m-calm",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "솥덖음 → 유념 → 건조. 이른 봄 여린 잎을 덖어 만드는 한국 녹차입니다.",
        "화가 허백련이 무등산 춘설헌에서 차밭을 일구며 이름 붙였다고 전하며, 삼애다원과 인연이 깊습니다."
      ],
      "en": [
        "Pan-fired → rolled → dried. A Korean green tea made from tender early-spring leaves.",
        "Named, it is said, by painter Heo Baek-ryeon at his Chunseolheon studio on Mt. Mudeung; closely linked to Samae Dawon."
      ],
      "zh-CN": [
        "锅炒杀青 → 揉捻 → 干燥。用早春嫩叶炒制的韩国绿茶。",
        "传为画家许百鍊在无等山春雪轩开辟茶园时所命名，与三爱茶园渊源深厚。"
      ],
      "zh-TW": [
        "鍋炒殺青 → 揉捻 → 乾燥。用早春嫩葉炒製的韓國綠茶。",
        "傳為畫家許百鍊在無等山春雪軒開闢茶園時所命名，與三愛茶園淵源深厚。"
      ]
    },
    "ko": {
      "name": "춘설",
      "oneLine": "무등산 증심사 계곡의 야생 차밭에서 이른 봄에 딴 덖음 녹차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "75도에서 1분 30초, 이후 30초, 45초. 뜨거운 물에서는 풋내와 떫은맛이 도드라집니다.",
      "origin": "전라남도 광주광역시 무등산 증심사 계곡 일대의 야생 차밭.",
      "process": "솥덖음 → 유념 → 건조. 이른 봄 여린 잎을 솥에서 덖어 만듭니다.",
      "story": "의재 허백련이 무등산에 춘설헌을 짓고 차밭을 일구며 '춘설'이라 이름 붙였다고 전합니다. 삼애다원과 인연이 깊습니다.",
      "flavor": "봄눈처럼 여린 잎에서 오는 풋향과 은은한 단맛, 맑고 가벼운 물색.",
      "pairing": "담백한 한식, 나물, 떡. 향이 섬세해 강한 양념 음식과는 부딪힙니다.",
      "brewTip": "70~75도. 끓인 물을 식혀서 쓰면 여린 잎의 단맛이 살아납니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "춘설 무등산 증심사 허백련 삼애다원 덖음녹차"
    },
    "en": {
      "name": "Chunseol",
      "oneLine": "A pan-fired green tea picked in early spring from wild bushes by the Jeungsimsa valley on Mt. Mudeung.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "75 °C: 90 seconds, then 30 and 45. Hotter water turns it grassy and bitter.",
      "origin": "Wild tea fields around the Jeungsimsa valley, Mt. Mudeung, Gwangju.",
      "process": "Pan-firing, rolling, drying — tender early-spring leaves fired in a cauldron.",
      "story": "Named, it is said, by painter Heo Baek-ryeon, who built his Chunseolheon studio on Mt. Mudeung and tended the tea field; closely tied to Samae Dawon.",
      "flavor": "Fresh green scent, gentle sweetness, a clear and light liquor.",
      "pairing": "Light Korean dishes, namul, rice cakes. Strong seasoning overwhelms it.",
      "brewTip": "70–75 °C; let boiled water cool a little to keep the sweetness.",
      "keep": "Within a month of opening, sealed and refrigerated.",
      "keywords": "Chunseol Mudeung Jeungsimsa Korean green tea pan-fired"
    },
    "zh-CN": {
      "name": "春雪",
      "oneLine": "无等山证心寺溪谷野生茶园的早春炒青绿茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "75度泡1分30秒，其后30秒、45秒。水太烫会突出青气与涩味。",
      "origin": "全罗南道光州无等山证心寺溪谷一带的野生茶园。",
      "process": "锅炒杀青 → 揉捻 → 干燥，早春嫩叶入锅炒制。",
      "story": "传为画家许百鍊在无等山建春雪轩、开辟茶园时所命名，与三爱茶园渊源深厚。",
      "flavor": "嫩叶的清香与淡淡回甘，汤色清亮轻盈。",
      "pairing": "清淡韩餐、野菜、年糕。重口味调味会相冲。",
      "brewTip": "70~75度，沸水稍晾后再冲，甜味更明显。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "春雪 无等山 证心寺 许百鍊 韩国绿茶"
    },
    "zh-TW": {
      "name": "春雪",
      "oneLine": "無等山證心寺溪谷野生茶園的早春炒青綠茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "75度泡1分30秒，其後30秒、45秒。水太燙會突出青氣與澀味。",
      "origin": "全羅南道光州無等山證心寺溪谷一帶的野生茶園。",
      "process": "鍋炒殺青 → 揉捻 → 乾燥，早春嫩葉入鍋炒製。",
      "story": "傳為畫家許百鍊在無等山建春雪軒、開闢茶園時所命名，與三愛茶園淵源深厚。",
      "flavor": "嫩葉的清香與淡淡回甘，湯色清亮輕盈。",
      "pairing": "清淡韓餐、野菜、年糕。重口味調味會相衝。",
      "brewTip": "70~75度，沸水稍晾後再沖，甜味更明顯。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "春雪 無等山 證心寺 許百鍊 韓國綠茶"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "green-tencha",
    "group": "green",
    "kind": "tea",
    "hanja": "碾",
    "sub": "Tencha",
    "alias": [
      "텐차",
      "碾茶",
      "てんちゃ"
    ],
    "hz": "碾茶",
    "hs": "碾茶",
    "rom": "Tencha",
    "temp": 70,
    "tempRange": "60~70℃",
    "leaf": "3g",
    "water": "100ml",
    "steeps": [
      60,
      30,
      45
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass a-herb b-light k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    "originCountry": {
      "ko": "일본",
      "en": "Japan",
      "zh-CN": "日本",
      "zh-TW": "日本"
    },
    "x": {
      "ko": [
        "차광 재배 → 증청 → 건조 → 줄기·잎맥 제거. 비비지 않고 말린 말차의 원료 잎입니다.",
        "이 잎을 석구로 곱게 갈면 말차가 됩니다. 원료 상태 그대로 우려 마시기도 합니다."
      ],
      "en": [
        "Shaded → steamed → dried → stems and veins removed. The unrolled leaf that becomes matcha.",
        "Ground slowly on a stone mill, it turns into matcha; the leaf itself is also brewed as is."
      ],
      "zh-CN": [
        "遮光栽培 → 蒸青 → 干燥 → 去茎去叶脉。不揉捻、直接干燥的抹茶原料叶。",
        "用石磨磨细即成抹茶，原料叶本身也可直接冲泡。"
      ],
      "zh-TW": [
        "遮光栽培 → 蒸青 → 乾燥 → 去莖去葉脈。不揉捻、直接乾燥的抹茶原料葉。",
        "用石磨磨細即成抹茶，原料葉本身也可直接沖泡。"
      ]
    },
    "ko": {
      "name": "텐차",
      "oneLine": "차광 재배한 잎을 증청해, 말차로 갈기 전의 원료가 되는 차.",
      "oxidation": "0%",
      "ratioNote": "100ml에 3g",
      "rounds": "3회",
      "steepBasis": "70도에서 1분, 이후 30초, 45초. 말차의 원료라 감칠맛이 진합니다.",
      "origin": "일본 교토부 우지 등지의 차밭.",
      "process": "차광 재배(수확 전 2~3주) → 증청 → 건조 → 줄기와 잎맥 제거. 비비지 않고 말립니다.",
      "story": "이 잎을 맷돌(석구)로 곱게 갈면 말차가 됩니다. 원료 상태 그대로 우려 마시기도 합니다.",
      "flavor": "차광 재배 특유의 진한 감칠맛과 해조류 같은 향, 짙은 녹색.",
      "pairing": "와가시, 초밥. 감칠맛이 강해 담백한 음식과 맞습니다.",
      "brewTip": "60~70도. 뜨거우면 쓴맛이 도드라집니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장. 빛과 다른 향을 피합니다.",
      "keywords": "텐차 말차 원료 차광재배 증청 우지"
    },
    "en": {
      "name": "Tencha",
      "oneLine": "Shaded, steamed leaf — the raw material that is milled into matcha.",
      "oxidation": "0%",
      "ratioNote": "3 g to 100 ml",
      "rounds": "3 infusions",
      "steepBasis": "70 °C: 60 seconds, then 30 and 45. As matcha's base leaf it is rich in umami.",
      "origin": "Tea fields around Uji, Kyoto, and other Japanese tea regions.",
      "process": "Shaded for about two to three weeks before picking, steamed, dried without rolling, then destemmed and deveined.",
      "story": "Ground on a stone mill, this leaf becomes matcha. It is also brewed as a leaf tea in its own right.",
      "flavor": "Deep umami from shading, a seaweed edge, vivid green color.",
      "pairing": "Wagashi and sushi; its umami suits plain food.",
      "brewTip": "60–70 °C; hotter water brings out bitterness.",
      "keep": "Within a month of opening, sealed and refrigerated, away from light and odors.",
      "keywords": "Tencha matcha base shaded steamed Uji"
    },
    "zh-CN": {
      "name": "碾茶",
      "oneLine": "遮光栽培后蒸青干燥、磨成抹茶之前的原料茶。",
      "oxidation": "0%",
      "ratioNote": "100毫升配3克",
      "rounds": "3泡",
      "steepBasis": "70度泡1分钟，其后30秒、45秒。作为抹茶原料，鲜味浓厚。",
      "origin": "日本京都府宇治等地的茶园。",
      "process": "采摘前遮光2~3周 → 蒸青 → 干燥 → 去除茎与叶脉，不揉捻。",
      "story": "此叶用石磨磨细即成抹茶，原料叶本身也可直接冲泡饮用。",
      "flavor": "遮光带来的浓厚鲜味与海藻香，叶色深绿。",
      "pairing": "和果子、寿司。鲜味强，宜配清淡食物。",
      "brewTip": "60~70度，水太烫会突出苦味。",
      "keep": "开封后一个月内，密封冷藏，避光避异味。",
      "keywords": "碾茶 抹茶原料 遮光 蒸青 宇治"
    },
    "zh-TW": {
      "name": "碾茶",
      "oneLine": "遮光栽培後蒸青乾燥、磨成抹茶之前的原料茶。",
      "oxidation": "0%",
      "ratioNote": "100毫升配3克",
      "rounds": "3泡",
      "steepBasis": "70度泡1分鐘，其後30秒、45秒。作為抹茶原料，鮮味濃厚。",
      "origin": "日本京都府宇治等地的茶園。",
      "process": "採摘前遮光2~3週 → 蒸青 → 乾燥 → 去除莖與葉脈，不揉捻。",
      "story": "此葉用石磨磨細即成抹茶，原料葉本身也可直接沖泡飲用。",
      "flavor": "遮光帶來的濃厚鮮味與海藻香，葉色深綠。",
      "pairing": "和果子、壽司。鮮味強，宜配清淡食物。",
      "brewTip": "60~70度，水太燙會突出苦味。",
      "keep": "開封後一個月內，密封冷藏，避光避異味。",
      "keywords": "碾茶 抹茶原料 遮光 蒸青 宇治"
    },
    "originCountryCode": "jp"
  },
  {
    "id": "green-funmatsu",
    "group": "green",
    "kind": "tea",
    "hanja": "末",
    "sub": "Funmatsu (Powdered Sencha)",
    "alias": [
      "훈마츠차",
      "분말차",
      "분말 센차",
      "粉末茶"
    ],
    "hz": "粉末茶",
    "hs": "粉末茶",
    "rom": "Funmatsu-cha",
    "temp": 80,
    "tempRange": "75~85℃",
    "leaf": "1.5g",
    "water": "150ml",
    "steeps": [
      60
    ],
    "maxSteep": 1,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass b-medium k-crisp r-clean s-hot s-iced w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "일본",
      "en": "Japan",
      "zh-CN": "日本",
      "zh-TW": "日本"
    },
    "x": {
      "ko": [
        "센차를 분쇄한 가루차. 우려내지 않고 물에 풀어 현탁 상태로 마십니다.",
        "차광 재배하지 않은 센차가 원료라 말차와 다릅니다. 회전초밥집 등에서 흔히 씁니다."
      ],
      "en": [
        "Powdered sencha, stirred into water and drunk as a suspension rather than an infusion.",
        "Made from unshaded sencha, unlike matcha; a staple of conveyor-belt sushi shops."
      ],
      "zh-CN": [
        "把煎茶磨成粉，冲水调匀成悬浊状饮用，不经浸泡过滤。",
        "原料是未经遮光的煎茶，与抹茶不同，常见于回转寿司店。"
      ],
      "zh-TW": [
        "把煎茶磨成粉，沖水調勻成懸濁狀飲用，不經浸泡過濾。",
        "原料是未經遮光的煎茶，與抹茶不同，常見於迴轉壽司店。"
      ]
    },
    "ko": {
      "name": "훈마츠",
      "oneLine": "센차를 곱게 갈아 물에 타 마시는 가루녹차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 1.5g",
      "rounds": "1회",
      "steepBasis": "80도 물에 가루를 풀어 바로 마십니다. 우려내는 차가 아니라 현탁 상태로 마십니다.",
      "origin": "일본 전역. 센차를 만드는 산지에서 함께 생산합니다.",
      "process": "센차를 분쇄해 가루로 만듭니다. 차광 재배를 하지 않은 잎이 원료입니다.",
      "story": "회전초밥집 등에서 흔히 내는 가루녹차로, 말차보다 저렴하고 간편해 널리 쓰입니다.",
      "flavor": "센차의 풋향과 쌉쌀함이 그대로 느껴지고, 잎 성분을 통째로 섭취합니다.",
      "pairing": "초밥, 회. 기름진 음식의 느끼함을 씻어줍니다.",
      "brewTip": "가루가 가라앉으니 마시기 전에 저어줍니다. 냉수에도 잘 풀립니다.",
      "keep": "밀봉 냉장. 가루차는 산화가 빠릅니다.",
      "keywords": "훈마츠 분말차 가루녹차 센차 초밥집"
    },
    "en": {
      "name": "Funmatsu (Powdered Sencha)",
      "oneLine": "Sencha ground to a powder and stirred straight into water.",
      "oxidation": "0%",
      "ratioNote": "1.5 g to 150 ml",
      "rounds": "1 serving",
      "steepBasis": "Stir the powder into 80 °C water and drink at once — it is a suspension, not an infusion.",
      "origin": "Made across Japan wherever sencha is produced.",
      "process": "Finished sencha is milled into powder; the leaf is unshaded, unlike matcha.",
      "story": "The everyday powdered tea of conveyor-belt sushi shops — cheaper and quicker than matcha.",
      "flavor": "Sencha's green, slightly bitter taste in full; the whole leaf is consumed.",
      "pairing": "Sushi and sashimi; cuts the richness of oily fish.",
      "brewTip": "Stir before drinking, as the powder settles. It also dissolves in cold water.",
      "keep": "Sealed and refrigerated; powdered tea oxidizes fast.",
      "keywords": "Funmatsu powdered sencha green tea powder sushi"
    },
    "zh-CN": {
      "name": "粉末茶",
      "oneLine": "把煎茶磨成粉、冲水即饮的粉末绿茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配1.5克",
      "rounds": "1次",
      "steepBasis": "用80度水把茶粉调匀直接饮用，是悬浊饮法而非浸泡。",
      "origin": "日本各地，煎茶产地多有生产。",
      "process": "把煎茶粉碎成粉，原料为未经遮光的茶叶。",
      "story": "回转寿司店常见的粉末绿茶，比抹茶便宜、方便，用途广泛。",
      "flavor": "煎茶的青香与微苦原样呈现，茶叶成分整片摄入。",
      "pairing": "寿司、生鱼片，可解油腻。",
      "brewTip": "茶粉会沉淀，饮用前搅拌一下，冷水也能冲开。",
      "keep": "密封冷藏，粉茶氧化快。",
      "keywords": "粉末茶 煎茶粉 绿茶粉 寿司店"
    },
    "zh-TW": {
      "name": "粉末茶",
      "oneLine": "把煎茶磨成粉、沖水即飲的粉末綠茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配1.5克",
      "rounds": "1次",
      "steepBasis": "用80度水把茶粉調勻直接飲用，是懸濁飲法而非浸泡。",
      "origin": "日本各地，煎茶產地多有生產。",
      "process": "把煎茶粉碎成粉，原料為未經遮光的茶葉。",
      "story": "迴轉壽司店常見的粉末綠茶，比抹茶便宜、方便，用途廣泛。",
      "flavor": "煎茶的青香與微苦原樣呈現，茶葉成分整片攝入。",
      "pairing": "壽司、生魚片，可解油膩。",
      "brewTip": "茶粉會沉澱，飲用前攪拌一下，冷水也能沖開。",
      "keep": "密封冷藏，粉茶氧化快。",
      "keywords": "粉末茶 煎茶粉 綠茶粉 壽司店"
    },
    "originCountryCode": "jp"
  },
  {
    "id": "green-konacha",
    "group": "green",
    "kind": "tea",
    "hanja": "粉",
    "sub": "Konacha",
    "alias": [
      "코나차",
      "粉茶",
      "아가리"
    ],
    "hz": "粉茶",
    "hs": "粉茶",
    "rom": "Konacha",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      30,
      20,
      30
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-afternoon a-grass b-medium k-crisp r-clean s-hot w-quick p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "일본",
      "en": "Japan",
      "zh-CN": "日本",
      "zh-TW": "日本"
    },
    "x": {
      "ko": [
        "교쿠로·센차 제다 과정에서 떨어져 나온 싹과 잎 조각을 모은 차입니다.",
        "초밥집에서 내는 진한 차 '아가리'로 유명하고, 티백 원료로도 많이 씁니다."
      ],
      "en": [
        "Made from the buds and leaf fragments sifted out during gyokuro and sencha making.",
        "Famous as the strong 'agari' served in sushi shops; also widely used for tea bags."
      ],
      "zh-CN": [
        "收集玉露、煎茶制作时筛出的芽头与碎叶制成。",
        "是寿司店里浓茶'上がり'的原料，也常用作茶包原料。"
      ],
      "zh-TW": [
        "收集玉露、煎茶製作時篩出的芽頭與碎葉製成。",
        "是壽司店裡濃茶「上がり」的原料，也常用作茶包原料。"
      ]
    },
    "ko": {
      "name": "코나차",
      "oneLine": "교쿠로·센차를 만들 때 나온 부스러기 잎으로 만든 차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "85~90도에서 30초로 짧게. 부스러기라 성분이 빨리 우러납니다.",
      "origin": "일본 전역의 센차·교쿠로 산지.",
      "process": "제다 과정에서 떨어져 나온 싹과 작은 잎 조각을 모아 만듭니다.",
      "story": "초밥집에서 내는 진한 차 '아가리'로 유명합니다. 티백 원료로도 많이 쓰입니다.",
      "flavor": "색이 짙고 맛이 강하며 쌉쌀한 여운. 빨리 진하게 우러납니다.",
      "pairing": "초밥, 회. 기름진 생선의 비린 맛을 잡아줍니다.",
      "brewTip": "짧게 우리는 것이 핵심. 오래 두면 지나치게 씁니다.",
      "keep": "개봉 후 한 달 안, 밀봉 냉장.",
      "keywords": "코나차 아가리 초밥집 부스러기 티백"
    },
    "en": {
      "name": "Konacha",
      "oneLine": "A tea of the buds and fragments left over from making gyokuro and sencha.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "85–90 °C for just 30 seconds — the small pieces release their flavor fast.",
      "origin": "Sencha and gyokuro regions across Japan.",
      "process": "Buds and small leaf fragments sifted out during tea making are collected and finished.",
      "story": "Known as the strong 'agari' poured in sushi shops, and a common tea-bag material.",
      "flavor": "Dark color, strong taste, a bitter edge; brews up quickly and boldly.",
      "pairing": "Sushi and sashimi; cuts the oiliness of fatty fish.",
      "brewTip": "Keep it short — left too long it turns harshly bitter.",
      "keep": "Within a month of opening, sealed and refrigerated.",
      "keywords": "Konacha agari sushi tea fragments tea bag"
    },
    "zh-CN": {
      "name": "粉茶",
      "oneLine": "用制作玉露、煎茶时筛出的碎叶制成的茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85~90度只泡30秒，碎叶出味快。",
      "origin": "日本各地的煎茶、玉露产地。",
      "process": "收集制茶时掉落的芽头与小叶碎片制成。",
      "story": "是寿司店里所供浓茶'上がり'的原料，也常用作茶包原料。",
      "flavor": "汤色深、味道浓、略带苦涩，出汤快而浓烈。",
      "pairing": "寿司、生鱼片，可去油腻鱼腥。",
      "brewTip": "关键在短泡，久浸会过苦。",
      "keep": "开封后一个月内，密封冷藏。",
      "keywords": "粉茶 寿司店 碎叶 茶包"
    },
    "zh-TW": {
      "name": "粉茶",
      "oneLine": "用製作玉露、煎茶時篩出的碎葉製成的茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "85~90度只泡30秒，碎葉出味快。",
      "origin": "日本各地的煎茶、玉露產地。",
      "process": "收集製茶時掉落的芽頭與小葉碎片製成。",
      "story": "是壽司店裡所供濃茶「上がり」的原料，也常用作茶包原料。",
      "flavor": "湯色深、味道濃、略帶苦澀，出湯快而濃烈。",
      "pairing": "壽司、生魚片，可去油膩魚腥。",
      "brewTip": "關鍵在短泡，久浸會過苦。",
      "keep": "開封後一個月內，密封冷藏。",
      "keywords": "粉茶 壽司店 碎葉 茶包"
    },
    "originCountryCode": "jp"
  },
  {
    "id": "green-eunjeong",
    "group": "green",
    "kind": "tea",
    "hanja": "恩",
    "sub": "Eunjeong Tea",
    "alias": [
      "은정차",
      "恩情茶",
      "강령 은정차"
    ],
    "hz": "恩情茶",
    "hs": "恩情茶",
    "rom": "Eunjeong-cha",
    "temp": 75,
    "tempRange": "70~80℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      90,
      30,
      60
    ],
    "maxSteep": 3,
    "oxidationValue": 0,
    "traits": "t-morning t-afternoon a-grass b-light k-sweet r-clean s-hot w-quick p-solo c-mid m-calm",
    "originCountry": {
      "ko": "북한",
      "en": "North Korea",
      "zh-CN": "朝鲜",
      "zh-TW": "北韓"
    },
    "x": {
      "ko": [
        "황해남도 강령군 은정리에서 나는 녹차로, 북한에서 가장 알려진 차입니다.",
        "김일성·김정일이 베푼 '은정(恩情)'에서 이름이 붙었다고 하며, 한랭한 기후 탓에 생산량은 적습니다."
      ],
      "en": [
        "A green tea from Eunjeong-ri, Kangryong County, South Hwanghae — the best-known tea of North Korea.",
        "Named, it is said, for the 'eunjeong' (benevolence) of Kim Il-sung and Kim Jong-il; the cold climate keeps output small."
      ],
      "zh-CN": [
        "产于黄海南道康翎郡恩情里的绿茶，是朝鲜最知名的茶。",
        "传因金日成、金正日所施'恩情'而得名，气候寒冷，产量不多。"
      ],
      "zh-TW": [
        "產於黃海南道康翎郡恩情里的綠茶，是北韓最知名的茶。",
        "傳因金日成、金正日所施「恩情」而得名，氣候寒冷，產量不多。"
      ]
    },
    "ko": {
      "name": "은정차",
      "oneLine": "북한 황해남도 강령에서 나는, 북한에서 가장 알려진 녹차.",
      "oxidation": "0%",
      "ratioNote": "150ml에 3g",
      "rounds": "3회",
      "steepBasis": "75도에서 1분 30초, 이후 30초, 45초. 한국 녹차와 비슷한 방식으로 우립니다.",
      "origin": "북한 황해남도 강령군 일대.",
      "process": "어린 잎을 따서 덖거나 쪄서 만드는 녹차로 전합니다.",
      "story": "김일성·김정일이 베푼 '은정(恩情)'에서 이름이 붙었다고 하며, 평양에는 은정찻집이 있습니다. 한랭한 기후 탓에 생산량은 적습니다.",
      "flavor": "남한 녹차와 비슷한 풋향과 담백한 맛으로 전합니다.",
      "pairing": "담백한 음식. 정보가 적어 일반적인 녹차 기준을 따릅니다.",
      "brewTip": "70~75도. 자료가 제한적이라 한국 녹차 우림법을 기준으로 합니다.",
      "keep": "밀봉해 서늘한 곳에.",
      "keywords": "은정차 북한 강령 은정찻집 녹차"
    },
    "en": {
      "name": "Eunjeong Tea",
      "oneLine": "A green tea from Kangryong, South Hwanghae — the best-known tea of North Korea.",
      "oxidation": "0%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 infusions",
      "steepBasis": "75 °C: 90 seconds, then 30 and 45 — brewed much like South Korean green tea.",
      "origin": "Kangryong County, South Hwanghae Province, North Korea.",
      "process": "Reported to be a green tea of young leaves, pan-fired or steamed.",
      "story": "Named, it is said, for the 'eunjeong' (benevolence) bestowed by Kim Il-sung and Kim Jong-il; Pyongyang has an Eunjeong teahouse. The cold climate keeps production small.",
      "flavor": "Reported as a fresh, plain green-tea taste similar to South Korean greens.",
      "pairing": "Plain food; with little information available, general green-tea guidance applies.",
      "brewTip": "70–75 °C; sources are limited, so South Korean green-tea brewing is the reference.",
      "keep": "Sealed, in a cool place.",
      "keywords": "Eunjeong tea North Korea Kangryong green tea"
    },
    "zh-CN": {
      "name": "恩情茶",
      "oneLine": "产于朝鲜黄海南道康翎的绿茶，是朝鲜最知名的茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "75度泡1分30秒，其后30秒、45秒，与韩国绿茶泡法相近。",
      "origin": "朝鲜黄海南道康翎郡一带。",
      "process": "据称为采摘嫩叶后炒青或蒸青制成的绿茶。",
      "story": "传因金日成、金正日所施'恩情'而得名，平壤设有恩情茶馆。气候寒冷，产量较少。",
      "flavor": "据称与韩国绿茶相近，清香淡雅。",
      "pairing": "清淡食物。资料有限，参照一般绿茶即可。",
      "brewTip": "70~75度。资料有限，以韩国绿茶泡法为准。",
      "keep": "密封置于阴凉处。",
      "keywords": "恩情茶 朝鲜 康翎 绿茶"
    },
    "zh-TW": {
      "name": "恩情茶",
      "oneLine": "產於北韓黃海南道康翎的綠茶，是北韓最知名的茶。",
      "oxidation": "0%",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡",
      "steepBasis": "75度泡1分30秒，其後30秒、45秒，與韓國綠茶泡法相近。",
      "origin": "北韓黃海南道康翎郡一帶。",
      "process": "據稱為採摘嫩葉後炒青或蒸青製成的綠茶。",
      "story": "傳因金日成、金正日所施「恩情」而得名，平壤設有恩情茶館。氣候寒冷，產量較少。",
      "flavor": "據稱與韓國綠茶相近，清香淡雅。",
      "pairing": "清淡食物。資料有限，參照一般綠茶即可。",
      "brewTip": "70~75度。資料有限，以韓國綠茶泡法為準。",
      "keep": "密封置於陰涼處。",
      "keywords": "恩情茶 北韓 康翎 綠茶"
    },
    "originCountryCode": "kp"
  },
  {
    "id": "white-darjeeling",
    "group": "white",
    "kind": "tea",
    "hanja": "白",
    "sub": "Darjeeling White Tea",
    "alias": [
      "다즐링 화이트티",
      "다즐링 백차",
      "Darjeeling White"
    ],
    "hz": "大吉嶺白茶",
    "hs": "大吉岭白茶",
    "rom": "Darjeeling White",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "2.5g",
    "water": "200ml",
    "steeps": [
      150,
      180
    ],
    "maxSteep": 2,
    "oxidationValue": 8,
    "traits": "t-morning t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
    "originCountry": {
      "ko": "인도",
      "en": "India",
      "zh-CN": "印度",
      "zh-TW": "印度"
    },
    "x": {
      "ko": [
        "위조 → 건조. 비비거나 덖지 않고 여린 싹을 그대로 말리는 백차입니다.",
        "다즐링의 중국종·클로널 품종으로 소량 만들며, 머스캣 뉘앙스가 특징입니다."
      ],
      "en": [
        "Withered → dried, with no rolling or firing — a white tea of tender buds dried as they are.",
        "Made in small lots from China and clonal bushes in Darjeeling, with a muscatel note."
      ],
      "zh-CN": [
        "萎凋 → 干燥。不揉不炒，嫩芽原样干燥的白茶。",
        "大吉岭用中国种与无性系品种少量制作，带麝香葡萄气息。"
      ],
      "zh-TW": [
        "萎凋 → 乾燥。不揉不炒，嫩芽原樣乾燥的白茶。",
        "大吉嶺用中國種與無性系品種少量製作，帶麝香葡萄氣息。"
      ]
    },
    "ko": {
      "name": "다즐링 화이트",
      "oneLine": "다즐링 고산 다원의 여린 싹으로 만든, 머스캣 뉘앙스의 백차.",
      "oxidation": "약 8%",
      "ratioNote": "200ml에 2.5g",
      "rounds": "2회",
      "steepBasis": "제품 설명서나 회사 홈페이지의 우림법이 가장 좋습니다. 일반적으로 2.5g(약 1티스푼)을 80~90도 물에 2~4분 길게 우립니다. 백호은침처럼 5g을 넣고 짧게 반복해 우려도 좋습니다.",
      "origin": "인도 서벵골 다즐링, 해발 1,000~2,000m의 고산 다원.",
      "process": "위조 → 건조. 여린 싹과 첫 잎을 따서 시들린 뒤 그대로 말립니다.",
      "story": "다즐링은 홍차로 유명하지만, 중국종·클로널 품종의 어린 싹으로 소량의 백차도 만듭니다.",
      "flavor": "은은한 꽃향과 다즐링 특유의 머스캣 뉘앙스, 가볍고 맑은 단맛.",
      "pairing": "담백한 디저트, 과일. 단독으로 마시기 좋습니다.",
      "brewTip": "두 가지 방식 모두 좋습니다. ① 2.5g을 80~90도에 2~4분 길게, ② 5g을 넣고 짧게 여러 번. 제품 설명서가 있으면 그 방법을 우선합니다.",
      "keep": "밀봉해 서늘하고 건조한 곳에. 백차는 향 흡수가 빠릅니다.",
      "keywords": "다즐링 화이트 백차 인도 머스캣 고산"
    },
    "en": {
      "name": "Darjeeling White Tea",
      "oneLine": "A white tea of tender buds from Darjeeling's high gardens, with a muscatel hint.",
      "oxidation": "About 8%",
      "ratioNote": "2.5 g to 200 ml",
      "rounds": "2 infusions",
      "steepBasis": "The maker's instructions — on the packet or the company website — are best. Generally, steep 2.5 g (about 1 teaspoon) in 80–90 °C water for a long 2–4 minutes. Brewing it like Bai Hao Yin Zhen, with 5 g and short repeated steeps, also works well.",
      "origin": "Darjeeling, West Bengal, India — gardens at 1,000–2,000 m.",
      "process": "Withering and drying only; tender buds and first leaves are picked, withered and dried with minimal handling.",
      "story": "Darjeeling is famed for black tea, but small lots of white tea are also made from the young buds of China and clonal cultivars.",
      "flavor": "Soft florals, Darjeeling's muscatel note, a light and clean sweetness.",
      "pairing": "Plain desserts and fruit; best enjoyed on its own.",
      "brewTip": "Either way works: 2.5 g steeped long at 80–90 °C for 2–4 minutes, or 5 g in short repeated steeps. If the maker gives instructions, follow those first.",
      "keep": "Sealed, cool and dry; white tea picks up odors quickly.",
      "keywords": "Darjeeling white tea India muscatel high mountain"
    },
    "zh-CN": {
      "name": "大吉岭白茶",
      "oneLine": "用大吉岭高山茶园的嫩芽制成、带麝香葡萄气息的白茶。",
      "oxidation": "约8%",
      "ratioNote": "200毫升配2.5克",
      "rounds": "2泡",
      "steepBasis": "以产品说明书或公司官网的方法为准。一般用2.5克（约1茶匙）在80~90度水中泡2~4分钟。也可像白毫银针那样用5克短泡多次，味道也好。",
      "origin": "印度西孟加拉大吉岭，海拔1000~2000米的高山茶园。",
      "process": "萎凋 → 干燥。采摘嫩芽与初叶，萎凋后直接干燥。",
      "story": "大吉岭以红茶闻名，也用中国种与无性系品种的嫩芽少量制作白茶。",
      "flavor": "淡淡花香与大吉岭特有的麝香葡萄气息，滋味轻盈清甜。",
      "pairing": "清淡甜点、水果。适合单独品饮。",
      "brewTip": "两种方式皆可：2.5克在80~90度泡2~4分钟，或5克短泡多次。有说明书时优先照说明书。",
      "keep": "密封置于阴凉干燥处，白茶容易吸味。",
      "keywords": "大吉岭白茶 印度 麝香葡萄 高山"
    },
    "zh-TW": {
      "name": "大吉嶺白茶",
      "oneLine": "用大吉嶺高山茶園的嫩芽製成、帶麝香葡萄氣息的白茶。",
      "oxidation": "約8%",
      "ratioNote": "200毫升配2.5克",
      "rounds": "2泡",
      "steepBasis": "以產品說明書或公司官網的方法為準。一般用2.5克（約1茶匙）在80~90度水中泡2~4分鐘。也可像白毫銀針那樣用5克短泡多次，味道也好。",
      "origin": "印度西孟加拉大吉嶺，海拔1000~2000米的高山茶園。",
      "process": "萎凋 → 乾燥。採摘嫩芽與初葉，萎凋後直接乾燥。",
      "story": "大吉嶺以紅茶聞名，也用中國種與無性系品種的嫩芽少量製作白茶。",
      "flavor": "淡淡花香與大吉嶺特有的麝香葡萄氣息，滋味輕盈清甜。",
      "pairing": "清淡甜點、水果。適合單獨品飲。",
      "brewTip": "兩種方式皆可：2.5克在80~90度泡2~4分鐘，或5克短泡多次。有說明書時優先照說明書。",
      "keep": "密封置於陰涼乾燥處，白茶容易吸味。",
      "keywords": "大吉嶺白茶 印度 麝香葡萄 高山"
    },
    "originCountryCode": "in"
  },
  {
    "id": "oolong-qilai",
    "group": "oolong",
    "kind": "tea",
    "hanja": "奇",
    "sub": "Qilai Shan Gaoshan",
    "alias": [
      "기래산 고산차",
      "기래산",
      "치라이산",
      "奇萊山高山茶"
    ],
    "hz": "奇萊山高山茶",
    "hs": "奇莱山高山茶",
    "rom": "Qilai High Mountain Oolong",
    "temp": 95,
    "tempRange": "90~95℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      50,
      25,
      35
    ],
    "maxSteep": 7,
    "oxidationValue": 20,
    "traits": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot s-iced w-gongfu p-solo c-mid m-refresh",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "臺灣"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조. 천으로 싸서 둥글게 마는 구형 제법을 씁니다.",
        "화롄현과 난터우현 경계의 기래산, 해발 2,000m가 넘는 고지에서 나옵니다. 대만 고산차 산지 가운데서도 늦게 알려진 편입니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying, using the cloth-ball rolling of Taiwanese gaoshan.",
        "From Mt. Qilai on the Hualien–Nantou border, above 2,000 m — one of the later-known of Taiwan's high-mountain areas."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥，采用包布球形揉捻。",
        "产自花莲县与南投县交界的奇莱山，海拔2000米以上，在台湾高山茶产区中较晚为人所知。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥，採用包布球形揉捻。",
        "產自花蓮縣與南投縣交界的奇萊山，海拔2,000公尺以上，在台灣高山茶產區中較晚為人所知。"
      ]
    },
    "ko": {
      "name": "고산우롱 (기래산)",
      "oneLine": "해발 1,400~2,000m 기래산의 운무 속에서 자란 대만 고산 우롱.",
      "oxidation": "20%",
      "ratioNote": "150ml에 6g",
      "rounds": "6~7회",
      "steepBasis": "95도에서 50초, 2포 25초, 3포 35초. 첫 포는 잎이 풀리는 시간까지 봅니다.",
      "origin": "대만 난터우현 런아이향의 기래산 남봉 일대, 해발 1,400~2,060m.",
      "process": "위조 → 요청 → 살청 → 유념(천으로 싸서 둥글게) → 건조.",
      "story": "아리산·리산·대우령·삼림계와 함께 대만 고산차의 주요 산지로 꼽힙니다. 고도가 높고 일교차가 커서 늦게 알려졌지만, 향이 맑다는 평을 받습니다.",
      "flavor": "고산 특유의 맑은 꽃향과 크림 같은 부드러움, 시원한 단맛. 물색은 밝은 황록색입니다.",
      "pairing": "가벼운 디저트, 과일. 진한 양념 음식과는 부딪힙니다.",
      "brewTip": "95도. 잎이 완전히 풀린 뒤부터 시간을 세면 향이 안정됩니다.",
      "keep": "개봉 후 2~3개월 안, 밀봉해 서늘하고 건조하게.",
      "keywords": "기래산 고산우롱 대만 고산차 화롄"
    },
    "en": {
      "name": "Qilai High Mountain Oolong",
      "oneLine": "A Taiwanese high-mountain oolong from Mt. Qilai, at 1,400–2,000 m.",
      "oxidation": "20%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "6–7 infusions",
      "steepBasis": "95 °C: 50 seconds, then 25, then 35. Give the first steep time for the ball to open.",
      "origin": "The southern peak of Mt. Qilai in Ren'ai Township, Nantou, Taiwan, at 1,400–2,060 m.",
      "process": "Withering → bruising → firing → cloth-ball rolling → drying.",
      "story": "Counted with Alishan, Lishan, Dayuling and Shanlinxi among Taiwan's high-mountain tea areas; its altitude kept it less known for longer.",
      "flavor": "Clear floral aroma, a creamy softness and cool sweetness. Bright yellow-green liquor.",
      "pairing": "Light desserts and fruit. Heavy seasoning clashes.",
      "brewTip": "95 °C. Start timing once the leaves have opened.",
      "keep": "Sealed, cool and dry; best within 2–3 months of opening.",
      "keywords": "Qilai high mountain oolong Taiwan gaoshan Hualien"
    },
    "zh-CN": {
      "name": "奇莱山高山乌龙",
      "oneLine": "产自海拔1400~2000米奇莱山的台湾高山乌龙。",
      "oxidation": "20%",
      "ratioNote": "150毫升配6克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。第一泡要等球形叶展开。",
      "origin": "台湾南投县仁爱乡奇莱山南峰一带，海拔1400~2060米。",
      "process": "萎凋 → 摇青 → 杀青 → 布球揉捻 → 干燥。",
      "story": "与阿里山、梨山、大禹岭、杉林溪并列为台湾高山茶产区，因海拔高而较晚为人所知。",
      "flavor": "高山特有的清扬花香与奶油般的柔顺，带清凉的甜。汤色黄绿明亮。",
      "pairing": "清淡甜点、水果。浓重调味相冲。",
      "brewTip": "95度，叶片完全展开后再计时，香气更稳定。",
      "keep": "开封后2~3个月内，密封置于阴凉干燥处。",
      "keywords": "奇莱山 高山乌龙 台湾 花莲"
    },
    "zh-TW": {
      "name": "奇萊山高山烏龍",
      "oneLine": "產自海拔1,400~2,000公尺奇萊山的台灣高山烏龍。",
      "oxidation": "20%",
      "ratioNote": "150毫升配6公克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。第一泡要等球形葉展開。",
      "origin": "台灣南投縣仁愛鄉奇萊山南峰一帶，海拔1,400~2,060公尺。",
      "process": "萎凋 → 搖菁 → 殺菁 → 布球揉捻 → 乾燥。",
      "story": "與阿里山、梨山、大禹嶺、杉林溪並列為台灣高山茶產區，因海拔高而較晚為人所知。",
      "flavor": "高山特有的清揚花香與奶油般的柔順，帶清涼的甜。湯色黃綠明亮。",
      "pairing": "清淡甜點、水果。濃重調味相衝。",
      "brewTip": "95度，葉片完全展開後再計時，香氣更穩定。",
      "keep": "開封後2~3個月內，密封置於陰涼乾燥處。",
      "keywords": "奇萊山 高山烏龍 台灣 花蓮"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "oolong-honey",
    "group": "oolong",
    "kind": "tea",
    "hanja": "蜜",
    "sub": "Honey-Scented Oolong",
    "alias": [
      "밀향 우롱",
      "꿀향 우롱",
      "미샹우롱",
      "蜜香烏龍"
    ],
    "hz": "蜜香烏龍",
    "hs": "蜜香乌龙",
    "rom": "Mixiang Oolong (Honey-Scented)",
    "temp": 90,
    "tempRange": "85~90℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      60,
      30,
      45
    ],
    "maxSteep": 6,
    "oxidationValue": 50,
    "traits": "t-afternoon a-floral a-fruit a-malt b-medium k-sweet r-clean s-hot s-iced w-gongfu p-dessert c-mid m-calm",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "臺灣"
    },
    "x": {
      "ko": [
        "소록엽선에 물린 잎을 위조·발효시킨 뒤 천으로 싸서 구형으로 맙니다. 동방미인과 달리 잎을 둥글게 마는 것이 차이입니다.",
        "벌레가 물면 잎이 스스로 방어 물질을 내어 꿀과 잘 익은 과일 같은 향이 생깁니다. 농약을 치지 않은 차밭에서만 가능한 제법입니다."
      ],
      "en": [
        "Leafhopper-bitten leaves are withered and oxidized, then cloth-rolled into balls — unlike Oriental Beauty, which keeps a loose strip shape.",
        "Bitten leaves release defensive compounds that read as honey and ripe fruit. The tea can only be made in unsprayed gardens."
      ],
      "zh-CN": [
        "被小绿叶蝉咬过的叶子萎凋发酵后，包布揉成球形。与东方美人不同，差别在叶形。",
        "叶子被咬后会分泌防御物质，形成蜂蜜与熟果般的香气。只能在不喷农药的茶园制作。"
      ],
      "zh-TW": [
        "被小綠葉蟬咬過的葉子萎凋發酵後，包布揉成球形。與東方美人不同，差別在葉形。",
        "葉子被咬後會分泌防禦物質，形成蜂蜜與熟果般的香氣。只能在不噴農藥的茶園製作。"
      ]
    },
    "ko": {
      "name": "밀향오룡",
      "oneLine": "차잎벌레가 물어 꿀향이 밴 잎을 구형으로 만 대만 우롱.",
      "oxidation": "50%",
      "ratioNote": "150ml에 6g",
      "rounds": "5~6회",
      "steepBasis": "90도에서 1분, 2포 30초, 3포 45초. 너무 뜨거우면 꿀향이 달아납니다.",
      "origin": "대만 화롄 루이수이 등 동부 일대와 신주·먀오리 등지.",
      "process": "채엽(벌레 물린 잎) → 위조 → 요청·발효 → 살청 → 구형 유념 → 건조.",
      "story": "동방미인과 향이 생기는 원리는 같지만, 동방미인이 줄기째 늘어진 잎(조형)인 데 비해 밀향오룡은 잎을 둥글게 말아 만듭니다. 농약을 쓰지 않는 차밭에서 여름에 만듭니다.",
      "flavor": "꿀과 잘 익은 복숭아, 꽃향. 단맛이 길게 남고 물색은 밝은 호박색입니다.",
      "pairing": "마들렌, 카스텔라 같은 담백한 구움과자.",
      "brewTip": "90도. 첫 포를 짧게 하면 향이, 길게 하면 단맛이 도드라집니다.",
      "keep": "개봉 후 2개월 안, 밀봉해 건조하게. 향이 빠지기 쉬운 차입니다.",
      "keywords": "밀향오룡 꿀향 우롱 대만 소록엽선"
    },
    "en": {
      "name": "Honey-Scented Oolong",
      "oneLine": "A Taiwanese ball-rolled oolong from leafhopper-bitten leaves, scented with honey.",
      "oxidation": "50%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "5–6 infusions",
      "steepBasis": "90 °C: 1 minute, then 30 seconds, then 45. Overly hot water flattens the honey note.",
      "origin": "Eastern Taiwan — Ruisui in Hualien above all — and Hsinchu and Miaoli.",
      "process": "Bitten leaf → withering → bruising and oxidation → firing → ball rolling → drying.",
      "story": "The honey scent arises the same way as in Oriental Beauty, but where Beauty keeps a loose strip shape, this tea is rolled into balls. It can only be made in unsprayed gardens in summer.",
      "flavor": "Honey, ripe peach and flowers; a long sweetness and bright amber liquor.",
      "pairing": "Plain baked goods such as madeleines and castella.",
      "brewTip": "90 °C. A shorter first steep favors aroma, a longer one sweetness.",
      "keep": "Sealed and dry; best within two months of opening, as the scent fades.",
      "keywords": "honey-scented oolong Taiwan leafhopper mixiang"
    },
    "zh-CN": {
      "name": "蜜香乌龙",
      "oneLine": "用被小绿叶蝉咬过的叶子揉成球形的台湾乌龙。",
      "oxidation": "50%",
      "ratioNote": "150毫升配6克",
      "rounds": "5~6泡",
      "steepBasis": "90度泡1分钟，第二泡30秒，第三泡45秒。水太烫蜜香会散。",
      "origin": "台湾花莲瑞穗等东部一带及新竹、苗栗等地。",
      "process": "采摘被咬的叶 → 萎凋 → 摇青发酵 → 杀青 → 球形揉捻 → 干燥。",
      "story": "香气来源与东方美人相同，但东方美人是条索形，蜜香乌龙则揉成球形。只能在不喷农药的茶园、夏季制作。",
      "flavor": "蜂蜜、熟桃与花香，甜味悠长，汤色明亮琥珀。",
      "pairing": "玛德琳、长崎蛋糕等清淡烤点。",
      "brewTip": "90度。第一泡短则香显，长则甜显。",
      "keep": "开封后两个月内，密封干燥保存，香气易散。",
      "keywords": "蜜香乌龙 台湾 小绿叶蝉 蜂蜜香"
    },
    "zh-TW": {
      "name": "蜜香烏龍",
      "oneLine": "用被小綠葉蟬咬過的葉子揉成球形的台灣烏龍。",
      "oxidation": "50%",
      "ratioNote": "150毫升配6公克",
      "rounds": "5~6泡",
      "steepBasis": "90度泡1分鐘，第二泡30秒，第三泡45秒。水太燙蜜香會散。",
      "origin": "台灣花蓮瑞穗等東部一帶及新竹、苗栗等地。",
      "process": "採摘被咬的葉 → 萎凋 → 搖菁發酵 → 殺菁 → 球形揉捻 → 乾燥。",
      "story": "香氣來源與東方美人相同，但東方美人是條索形，蜜香烏龍則揉成球形。只能在不噴農藥的茶園、夏季製作。",
      "flavor": "蜂蜜、熟桃與花香，甜味悠長，湯色明亮琥珀。",
      "pairing": "瑪德琳、長崎蛋糕等清淡烤點。",
      "brewTip": "90度。第一泡短則香顯，長則甜顯。",
      "keep": "開封後兩個月內，密封乾燥保存，香氣易散。",
      "keywords": "蜜香烏龍 台灣 小綠葉蟬 蜂蜜香"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "oolong-red",
    "group": "oolong",
    "kind": "tea",
    "hanja": "紅",
    "sub": "Red Oolong",
    "alias": [
      "레드 우롱",
      "타이둥 홍오룡",
      "홍오롱",
      "紅烏龍"
    ],
    "hz": "紅烏龍",
    "hs": "红乌龙",
    "rom": "Hong Oolong (Red Oolong)",
    "temp": 95,
    "tempRange": "90~95℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      40,
      25,
      30
    ],
    "maxSteep": 7,
    "oxidationValue": 75,
    "traits": "t-afternoon t-night a-fruit a-malt b-full k-sweet r-clean s-hot s-iced w-gongfu p-dessert c-mid m-cozy",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "臺灣"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 장시간 발효 → 살청 → 구형 유념 → 건조. 산화도를 홍차 가까이까지 끌어올린 제법입니다.",
        "2000년대 대만 타이둥 루예에서 개발된 비교적 새로운 차입니다. 전통 제법의 홍수우롱과는 태어난 배경도, 향의 결도 다릅니다."
      ],
      "en": [
        "Withering → bruising → long oxidation → firing → ball rolling → drying, with oxidation pushed close to black-tea level.",
        "A relatively new tea developed in Luye, Taitung in the 2000s. Its background and aroma differ from the traditional Hongshui oolong."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 长时间发酵 → 杀青 → 球形揉捻 → 干燥，把发酵度推到接近红茶。",
        "2000年代在台湾台东鹿野开发的较新茶类，与传统制法的红水乌龙出身和香气都不同。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 長時間發酵 → 殺菁 → 球形揉捻 → 乾燥，把發酵度推到接近紅茶。",
        "2000年代在台灣台東鹿野開發的較新茶類，與傳統製法的紅水烏龍出身和香氣都不同。"
      ]
    },
    "ko": {
      "name": "홍오룡",
      "oneLine": "홍차 가까이 발효시켜 구형으로 만 타이둥의 새 우롱.",
      "oxidation": "약 75%",
      "ratioNote": "150ml에 6g",
      "rounds": "6~7회",
      "steepBasis": "95도에서 40초, 2포 25초, 3포 30초. 냉침으로도 단맛이 잘 우러납니다.",
      "origin": "대만 타이둥현 루예 일대.",
      "process": "위조 → 요청 → 장시간 발효 → 살청 → 구형 유념 → 건조.",
      "story": "2000년대 타이둥 루예에서, 여름철 찻잎의 판로를 넓히려고 개발된 비교적 새로운 제법입니다. 전통 방식의 홍수우롱과 이름이 비슷하지만, 홍오룡은 산화도를 처음부터 홍차 가까이 높여 설계한 별개의 차입니다.",
      "flavor": "잘 익은 과일과 꿀, 볶은 곡물의 단맛. 떫은맛이 적고 물색은 붉은 호박색입니다.",
      "pairing": "치즈케이크, 건과일, 견과류.",
      "brewTip": "95도. 차갑게 식혀도 단맛이 무너지지 않아 냉침에도 좋습니다.",
      "keep": "개봉 후 3개월 안, 밀봉해 서늘하게.",
      "keywords": "홍오룡 레드 우롱 타이둥 루예 고발효"
    },
    "en": {
      "name": "Red Oolong",
      "oneLine": "A new Taitung oolong oxidized nearly to black-tea level and rolled into balls.",
      "oxidation": "about 75%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "6–7 infusions",
      "steepBasis": "95 °C: 40 seconds, then 25, then 30. Cold brewing brings out the sweetness too.",
      "origin": "Luye, Taitung County, Taiwan.",
      "process": "Withering → bruising → long oxidation → firing → ball rolling → drying.",
      "story": "Developed in Luye in the 2000s to find a use for summer leaf. Despite the similar name, it is distinct from the traditional Hongshui oolong: Red Oolong is designed from the start for near-black-tea oxidation.",
      "flavor": "Ripe fruit, honey and roasted grain; little astringency, red-amber liquor.",
      "pairing": "Cheesecake, dried fruit, nuts.",
      "brewTip": "95 °C. The sweetness holds up cold, so it suits cold brewing.",
      "keep": "Sealed and cool; best within three months of opening.",
      "keywords": "red oolong Taitung Luye high oxidation"
    },
    "zh-CN": {
      "name": "红乌龙",
      "oneLine": "发酵到接近红茶、揉成球形的台东新派乌龙。",
      "oxidation": "约75%",
      "ratioNote": "150毫升配6克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡40秒，第二泡25秒，第三泡30秒。冷泡也能泡出甜味。",
      "origin": "台湾台东县鹿野一带。",
      "process": "萎凋 → 摇青 → 长时间发酵 → 杀青 → 球形揉捻 → 干燥。",
      "story": "2000年代在台东鹿野开发的新工艺，为的是消化夏季茶叶。与传统制法的红水乌龙名字相近，但红乌龙是从一开始就按接近红茶的发酵度设计的另一种茶。",
      "flavor": "熟果、蜂蜜与焙谷的甜，涩感低，汤色红琥珀。",
      "pairing": "芝士蛋糕、果干、坚果。",
      "brewTip": "95度。放凉后甜味不散，也适合冷泡。",
      "keep": "开封后三个月内，密封阴凉保存。",
      "keywords": "红乌龙 台东 鹿野 高发酵"
    },
    "zh-TW": {
      "name": "紅烏龍",
      "oneLine": "發酵到接近紅茶、揉成球形的台東新派烏龍。",
      "oxidation": "約75%",
      "ratioNote": "150毫升配6公克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡40秒，第二泡25秒，第三泡30秒。冷泡也能泡出甜味。",
      "origin": "台灣台東縣鹿野一帶。",
      "process": "萎凋 → 搖菁 → 長時間發酵 → 殺菁 → 球形揉捻 → 乾燥。",
      "story": "2000年代在台東鹿野開發的新工藝，為的是消化夏季茶葉。與傳統製法的紅水烏龍名字相近，但紅烏龍是從一開始就按接近紅茶的發酵度設計的另一種茶。",
      "flavor": "熟果、蜂蜜與焙穀的甜，澀感低，湯色紅琥珀。",
      "pairing": "起司蛋糕、果乾、堅果。",
      "brewTip": "95度。放涼後甜味不散，也適合冷泡。",
      "keep": "開封後三個月內，密封陰涼保存。",
      "keywords": "紅烏龍 台東 鹿野 高發酵"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "oolong-qilan",
    "group": "oolong",
    "kind": "tea",
    "hanja": "奇",
    "sub": "Qilan",
    "alias": [
      "치란",
      "기란차",
      "奇蘭"
    ],
    "hz": "奇蘭",
    "hs": "奇兰",
    "rom": "Qilan",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 8,
    "oxidationValue": 45,
    "traits": "t-afternoon t-night a-floral a-herb b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 무이암차의 조형(늘어진 잎) 제법을 따릅니다.",
        "이름의 蘭은 난초 향에서 왔습니다. 무이산에서 나온 품종이지만 민남에서도 널리 심어 양쪽 스타일로 다 만듭니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying → roasting, in the strip style of Wuyi rock tea.",
        "The lan in its name means orchid. The cultivar comes from Wuyi but is widely planted in southern Fujian too, and made in both styles."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火，采用武夷岩茶的条索做法。",
        "名字中的“兰”来自兰花香。品种源于武夷山，闽南也广为种植，两种风格都有制作。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火，採用武夷岩茶的條索做法。",
        "名字中的「蘭」來自蘭花香。品種源於武夷山，閩南也廣為種植，兩種風格都有製作。"
      ]
    },
    "ko": {
      "name": "기란",
      "oneLine": "난초 향을 이름에 단, 무이와 민남 양쪽의 품종 우롱.",
      "oxidation": "45%",
      "ratioNote": "110ml에 7g",
      "rounds": "7~8회",
      "steepBasis": "98도에서 30초, 2포 20초, 3포 25초. 뜨거운 물로 향을 끌어올립니다.",
      "origin": "중국 푸젠성 무이산 일대, 민남 지역에서도 재배.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "무이산에서 선발된 품종으로, 난초(蘭) 같은 향이 난다고 해서 기란(奇蘭)이라 불립니다. 품종이 튼튼해 민남의 안계 일대에도 퍼져, 암차식과 청향식 양쪽으로 만들어집니다.",
      "flavor": "난초와 허브의 맑은 향, 가벼운 배화향과 단맛. 물색은 밝은 황색입니다.",
      "pairing": "해산물, 담백한 딤섬.",
      "brewTip": "98도. 첫 포는 향, 세 번째 포부터는 단맛을 봅니다.",
      "keep": "개봉 후 3개월 안, 밀봉해 건조하게.",
      "keywords": "기란 무이암차 난초향 푸젠"
    },
    "en": {
      "name": "Qilan",
      "oneLine": "An orchid-scented cultivar oolong made in both Wuyi and southern Fujian.",
      "oxidation": "45%",
      "ratioNote": "7 g to 110 ml",
      "rounds": "7–8 infusions",
      "steepBasis": "98 °C: 30 seconds, then 20, then 25. Near-boiling water lifts the aroma.",
      "origin": "Wuyi Mountains, Fujian; also grown in southern Fujian.",
      "process": "Withering → bruising → firing → rolling → drying → roasting.",
      "story": "A cultivar selected in the Wuyi Mountains, named Qilan for its orchid-like scent. Being hardy, it spread to Anxi in southern Fujian and is made in both rock-tea and greener styles.",
      "flavor": "Clean orchid and herb notes over light roast and sweetness. Bright yellow liquor.",
      "pairing": "Seafood and light dim sum.",
      "brewTip": "98 °C. Read the first steep for aroma, later ones for sweetness.",
      "keep": "Sealed and dry; best within three months of opening.",
      "keywords": "Qilan Wuyi rock tea orchid Fujian"
    },
    "zh-CN": {
      "name": "奇兰",
      "oneLine": "以兰花香得名，武夷与闽南两地都产的品种乌龙。",
      "oxidation": "45%",
      "ratioNote": "110毫升配7克",
      "rounds": "7~8泡",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒。用高温把香气提起来。",
      "origin": "中国福建武夷山一带，闽南地区也有栽培。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火。",
      "story": "选育自武夷山的品种，因有兰花香而得名奇兰。品种适应性强，也传入闽南安溪一带，岩茶式与清香式两种做法都有。",
      "flavor": "兰花与草本的清香，轻焙火与回甘。汤色明黄。",
      "pairing": "海鲜、清淡点心。",
      "brewTip": "98度。第一泡看香，第三泡起看甜。",
      "keep": "开封后三个月内，密封干燥保存。",
      "keywords": "奇兰 武夷岩茶 兰花香 福建"
    },
    "zh-TW": {
      "name": "奇蘭",
      "oneLine": "以蘭花香得名，武夷與閩南兩地都產的品種烏龍。",
      "oxidation": "45%",
      "ratioNote": "110毫升配7公克",
      "rounds": "7~8泡",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒。用高溫把香氣提起來。",
      "origin": "中國福建武夷山一帶，閩南地區也有栽培。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火。",
      "story": "選育自武夷山的品種，因有蘭花香而得名奇蘭。品種適應性強，也傳入閩南安溪一帶，岩茶式與清香式兩種做法都有。",
      "flavor": "蘭花與草本的清香，輕焙火與回甘。湯色明黃。",
      "pairing": "海鮮、清淡點心。",
      "brewTip": "98度。第一泡看香，第三泡起看甜。",
      "keep": "開封後三個月內，密封乾燥保存。",
      "keywords": "奇蘭 武夷岩茶 蘭花香 福建"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-meizhan",
    "group": "oolong",
    "kind": "tea",
    "hanja": "梅",
    "sub": "Meizhan",
    "alias": [
      "메이잔",
      "매점차",
      "梅占"
    ],
    "hz": "梅占",
    "hs": "梅占",
    "rom": "Meizhan",
    "temp": 95,
    "tempRange": "90~98℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 7,
    "oxidationValue": 40,
    "traits": "t-afternoon a-floral a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 산지마다 배화 정도가 다릅니다.",
        "푸젠의 오래된 품종으로, 우롱뿐 아니라 홍차와 녹차로도 가공되는 폭이 넓은 차나무입니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying → roasting; the roast level varies by area.",
        "An old Fujian cultivar with a wide range — it is processed into black and green teas as well as oolong."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火，焙火程度因产地而异。",
        "福建的老品种，用途广，除了乌龙也可加工成红茶、绿茶。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火，焙火程度因產地而異。",
        "福建的老品種，用途廣，除了烏龍也可加工成紅茶、綠茶。"
      ]
    },
    "ko": {
      "name": "매점",
      "oneLine": "매화 향이 난다고 전하는 푸젠의 고전 품종 우롱.",
      "oxidation": "40%",
      "ratioNote": "110ml에 7g",
      "rounds": "6~7회",
      "steepBasis": "95도에서 30초, 2포 20초, 3포 25초.",
      "origin": "중국 푸젠성 무이산과 안계 일대.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "푸젠에서 오래 재배해 온 품종으로, 꽃향이 매화를 닮았다고 해서 매점(梅占)이라 불린다고 전합니다. 무이산에서는 암차로, 안계에서는 민남 우롱으로 만들며, 홍차와 녹차로 가공되기도 합니다.",
      "flavor": "매화 같은 꽃향과 가벼운 과일향, 부드러운 단맛. 물색은 황금빛입니다.",
      "pairing": "담백한 볶음 요리, 두부 요리.",
      "brewTip": "95도. 배화가 약한 제품은 90도부터 시작해 보세요.",
      "keep": "개봉 후 3개월 안, 밀봉해 건조하게.",
      "keywords": "매점 푸젠 품종 매화향 무이 안계"
    },
    "en": {
      "name": "Meizhan",
      "oneLine": "A classic Fujian cultivar oolong said to smell of plum blossom.",
      "oxidation": "40%",
      "ratioNote": "7 g to 110 ml",
      "rounds": "6–7 infusions",
      "steepBasis": "95 °C: 30 seconds, then 20, then 25.",
      "origin": "Wuyi Mountains and Anxi, Fujian.",
      "process": "Withering → bruising → firing → rolling → drying → roasting.",
      "story": "A long-grown Fujian cultivar, said to be named Meizhan for a plum-blossom-like scent. It is made as rock tea in Wuyi and as southern-Fujian oolong in Anxi, and is also processed into black and green teas.",
      "flavor": "Plum-blossom florals, light fruit and soft sweetness. Golden liquor.",
      "pairing": "Light stir-fries and tofu dishes.",
      "brewTip": "95 °C; for lightly roasted lots, start at 90 °C.",
      "keep": "Sealed and dry; best within three months of opening.",
      "keywords": "Meizhan Fujian cultivar plum blossom Wuyi Anxi"
    },
    "zh-CN": {
      "name": "梅占",
      "oneLine": "相传带梅花香的福建老品种乌龙。",
      "oxidation": "40%",
      "ratioNote": "110毫升配7克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "中国福建武夷山与安溪一带。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火。",
      "story": "福建栽培已久的品种，相传花香似梅花而得名梅占。在武夷山做岩茶，在安溪做闽南乌龙，也可加工成红茶、绿茶。",
      "flavor": "梅花般的花香与轻果香，柔和的甜。汤色金黄。",
      "pairing": "清淡炒菜、豆腐菜。",
      "brewTip": "95度。焙火轻的可以从90度试起。",
      "keep": "开封后三个月内，密封干燥保存。",
      "keywords": "梅占 福建 品种 梅花香 武夷 安溪"
    },
    "zh-TW": {
      "name": "梅占",
      "oneLine": "相傳帶梅花香的福建老品種烏龍。",
      "oxidation": "40%",
      "ratioNote": "110毫升配7公克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "中國福建武夷山與安溪一帶。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火。",
      "story": "福建栽培已久的品種，相傳花香似梅花而得名梅占。在武夷山做岩茶，在安溪做閩南烏龍，也可加工成紅茶、綠茶。",
      "flavor": "梅花般的花香與輕果香，柔和的甜。湯色金黃。",
      "pairing": "清淡炒菜、豆腐菜。",
      "brewTip": "95度。焙火輕的可以從90度試起。",
      "keep": "開封後三個月內，密封乾燥保存。",
      "keywords": "梅占 福建 品種 梅花香 武夷 安溪"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-tieluohan",
    "group": "oolong",
    "kind": "tea",
    "hanja": "鐵",
    "sub": "Tie Luohan",
    "alias": [
      "톄뤄한",
      "무이 명총",
      "鐵羅漢"
    ],
    "hz": "鐵羅漢",
    "hs": "铁罗汉",
    "rom": "Tie Luo Han",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 8,
    "oxidationValue": 55,
    "traits": "t-afternoon t-night a-herb a-roast b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 무이 명총의 전통 제법을 따릅니다.",
        "무이 4대 명총(대홍포·철라한·백계관·수금귀) 중 하나로, 명총 가운데서도 오래된 품종으로 꼽힙니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying → roasting, in the traditional mingcong manner.",
        "One of the four great Wuyi mingcong — Da Hong Pao, Tie Luo Han, Bai Ji Guan, Shui Jin Gui — and among the oldest of them."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火，采用武夷名丛的传统做法。",
        "武夷四大名丛（大红袍、铁罗汉、白鸡冠、水金龟）之一，也是名丛中历史最久的品种之一。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火，採用武夷名欉的傳統做法。",
        "武夷四大名欉（大紅袍、鐵羅漢、白雞冠、水金龜）之一，也是名欉中歷史最久的品種之一。"
      ]
    },
    "ko": {
      "name": "철라한",
      "oneLine": "무이 4대 명총, 약재 향이 도는 진하고 깊은 암차.",
      "oxidation": "55%",
      "ratioNote": "110ml에 7g",
      "rounds": "7~8회",
      "steepBasis": "98도에서 30초, 2포 20초, 3포 25초. 첫 포의 약향이 이 차의 얼굴입니다.",
      "origin": "중국 푸젠성 무이산 암벽 지대.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "무이 4대 명총 중 하나로, 명총 가운데 가장 오래된 품종 중 하나로 꼽힙니다. 병을 고쳤다는 승려(나한)에게서 이름이 왔다는 전설이 전합니다.",
      "flavor": "약재와 광물, 볶은 곡물의 진한 향. 바디가 두껍고 단맛이 묵직하게 남습니다.",
      "pairing": "기름진 고기 요리, 진한 양념의 중식.",
      "brewTip": "98도. 포를 거듭할수록 약향이 풀리고 단맛이 올라옵니다.",
      "keep": "개봉 후 3개월 안, 밀봉해 건조하게. 배화차는 상온 보관도 무난합니다.",
      "keywords": "철라한 무이 명총 암차 약향 푸젠"
    },
    "en": {
      "name": "Tie Luo Han",
      "oneLine": "One of Wuyi's four great mingcong — a deep rock tea with a medicinal edge.",
      "oxidation": "55%",
      "ratioNote": "7 g to 110 ml",
      "rounds": "7–8 infusions",
      "steepBasis": "98 °C: 30 seconds, then 20, then 25. The first steep's herbal note is its signature.",
      "origin": "The rocky cliffs of the Wuyi Mountains, Fujian.",
      "process": "Withering → bruising → firing → rolling → drying → roasting.",
      "story": "One of the four great Wuyi mingcong (with Da Hong Pao, Bai Ji Guan and Shui Jin Gui), and among the oldest of them. Legend ties the name to a monk — a luohan — whose illness it cured.",
      "flavor": "Medicinal herbs, minerals and roasted grain; a thick body and weighty sweetness.",
      "pairing": "Rich meat dishes and strongly seasoned Chinese food.",
      "brewTip": "98 °C. The herbal note opens up and sweetness grows over the steeps.",
      "keep": "Sealed and dry; roasted tea keeps well at room temperature.",
      "keywords": "Tie Luo Han Wuyi mingcong rock tea Fujian"
    },
    "zh-CN": {
      "name": "铁罗汉",
      "oneLine": "武夷四大名丛之一，带药香、滋味浓醇的岩茶。",
      "oxidation": "55%",
      "ratioNote": "110毫升配7克",
      "rounds": "7~8泡",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒。第一泡的药香是它的标志。",
      "origin": "中国福建武夷山岩壁地带。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火。",
      "story": "武夷四大名丛之一，也是名丛中历史最久的品种之一。相传因治好一位僧人（罗汉）的病而得名。",
      "flavor": "药材、矿物与焙谷的浓香，汤感厚重，回甘沉稳。",
      "pairing": "油腻肉菜、浓味中餐。",
      "brewTip": "98度。泡数越多，药香越舒展，甜味越明显。",
      "keep": "开封后三个月内，密封干燥保存。",
      "keywords": "铁罗汉 武夷 名丛 岩茶 药香"
    },
    "zh-TW": {
      "name": "鐵羅漢",
      "oneLine": "武夷四大名欉之一，帶藥香、滋味濃醇的岩茶。",
      "oxidation": "55%",
      "ratioNote": "110毫升配7公克",
      "rounds": "7~8泡",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒。第一泡的藥香是它的標誌。",
      "origin": "中國福建武夷山岩壁地帶。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火。",
      "story": "武夷四大名欉之一，也是名欉中歷史最久的品種之一。相傳因治好一位僧人（羅漢）的病而得名。",
      "flavor": "藥材、礦物與焙穀的濃香，湯感厚重，回甘沉穩。",
      "pairing": "油膩肉菜、濃味中餐。",
      "brewTip": "98度。泡數越多，藥香越舒展，甜味越明顯。",
      "keep": "開封後三個月內，密封乾燥保存。",
      "keywords": "鐵羅漢 武夷 名欉 岩茶 藥香"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-baijiguan",
    "group": "oolong",
    "kind": "tea",
    "hanja": "白",
    "sub": "Bai Jiguan",
    "alias": [
      "바이지관",
      "백계관차",
      "白雞冠"
    ],
    "hz": "白雞冠",
    "hs": "白鸡冠",
    "rom": "Bai Ji Guan",
    "temp": 95,
    "tempRange": "90~98℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      25,
      20,
      25
    ],
    "maxSteep": 7,
    "oxidationValue": 40,
    "traits": "t-morning t-afternoon a-floral a-herb b-light k-crisp r-clean s-hot w-gongfu p-solo c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 약한 배화. 연한 잎색을 살리려고 배화를 가볍게 합니다.",
        "새싹이 연한 황백색으로 돋아 다른 차나무들 사이에서 한눈에 띄는 품종입니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying → light roasting, kept gentle to preserve the pale leaf.",
        "Its buds flush pale yellow-white, standing out at a glance among the other bushes."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 轻焙火，为保留淡色叶而焙得轻。",
        "新芽呈淡黄白色，在其他茶树中一眼就能认出。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 輕焙火，為保留淡色葉而焙得輕。",
        "新芽呈淡黃白色，在其他茶樹中一眼就能認出。"
      ]
    },
    "ko": {
      "name": "백계관",
      "oneLine": "연한 황백색 새싹이 특징인, 맑고 가벼운 무이 명총.",
      "oxidation": "40%",
      "ratioNote": "110ml에 7g",
      "rounds": "6~7회",
      "steepBasis": "95도에서 25초, 2포 20초, 3포 25초. 다른 암차보다 가볍게 봅니다.",
      "origin": "중국 푸젠성 무이산 일대.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 약한 배화.",
      "story": "무이 4대 명총 중 하나입니다. 새싹이 연한 황백색이라 짙은 녹색의 다른 차나무들 사이에서 유난히 눈에 띄고, 그 모습이 흰 볏(雞冠)을 닮았다고 이름 붙었다고 전합니다.",
      "flavor": "가볍고 맑은 꽃향과 은은한 약향, 시원한 단맛. 물색은 다른 암차보다 밝은 황색입니다.",
      "pairing": "담백한 생선 요리, 샐러드.",
      "brewTip": "95도. 배화가 약하니 오래 우리면 향이 무너집니다. 짧게 여러 번이 좋습니다.",
      "keep": "개봉 후 2~3개월 안, 밀봉해 건조하게.",
      "keywords": "백계관 무이 명총 암차 황백색 새싹"
    },
    "en": {
      "name": "Bai Ji Guan",
      "oneLine": "A light, clear Wuyi mingcong known for its pale yellow-white buds.",
      "oxidation": "40%",
      "ratioNote": "7 g to 110 ml",
      "rounds": "6–7 infusions",
      "steepBasis": "95 °C: 25 seconds, then 20, then 25. Treat it more gently than other rock teas.",
      "origin": "Wuyi Mountains, Fujian.",
      "process": "Withering → bruising → firing → rolling → drying → light roasting.",
      "story": "One of the four great Wuyi mingcong. Its buds flush pale yellow-white, standing out among dark-green bushes; the name — white cockscomb — is said to come from that look.",
      "flavor": "Light, clear florals with a faint herbal note and cool sweetness. A paler yellow liquor than other rock teas.",
      "pairing": "Plain fish dishes and salads.",
      "brewTip": "95 °C. The roast is light, so long steeps break the aroma; keep them short and many.",
      "keep": "Sealed and dry; best within 2–3 months of opening.",
      "keywords": "Bai Ji Guan Wuyi mingcong rock tea pale buds"
    },
    "zh-CN": {
      "name": "白鸡冠",
      "oneLine": "芽叶呈淡黄白色、滋味清淡的武夷名丛。",
      "oxidation": "40%",
      "ratioNote": "110毫升配7克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡25秒，第二泡20秒，第三泡25秒。比其他岩茶更轻柔对待。",
      "origin": "中国福建武夷山一带。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 轻焙火。",
      "story": "武夷四大名丛之一。芽叶呈淡黄白色，在深绿的茶丛中格外显眼，相传因形似白色鸡冠而得名。",
      "flavor": "清淡的花香与淡淡的药香，清凉的甜。汤色比其他岩茶更浅黄。",
      "pairing": "清淡鱼菜、沙拉。",
      "brewTip": "95度。焙火轻，久泡香气会散，宜短泡多泡。",
      "keep": "开封后2~3个月内，密封干燥保存。",
      "keywords": "白鸡冠 武夷 名丛 岩茶 黄白芽"
    },
    "zh-TW": {
      "name": "白雞冠",
      "oneLine": "芽葉呈淡黃白色、滋味清淡的武夷名欉。",
      "oxidation": "40%",
      "ratioNote": "110毫升配7公克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡25秒，第二泡20秒，第三泡25秒。比其他岩茶更輕柔對待。",
      "origin": "中國福建武夷山一帶。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 輕焙火。",
      "story": "武夷四大名欉之一。芽葉呈淡黃白色，在深綠的茶叢中格外顯眼，相傳因形似白色雞冠而得名。",
      "flavor": "清淡的花香與淡淡的藥香，清涼的甜。湯色比其他岩茶更淺黃。",
      "pairing": "清淡魚菜、沙拉。",
      "brewTip": "95度。焙火輕，久泡香氣會散，宜短泡多泡。",
      "keep": "開封後2~3個月內，密封乾燥保存。",
      "keywords": "白雞冠 武夷 名欉 岩茶 黃白芽"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-shuijingui",
    "group": "oolong",
    "kind": "tea",
    "hanja": "水",
    "sub": "Shui Jingui",
    "alias": [
      "수금구",
      "쉐이진구이",
      "水金龜"
    ],
    "hz": "水金龜",
    "hs": "水金龟",
    "rom": "Shui Jin Gui",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 8,
    "oxidationValue": 50,
    "traits": "t-afternoon a-floral a-roast b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 무이 명총의 전통 제법을 따릅니다.",
        "홍수에 떠내려간 차나무의 잎이 거북 등껍질을 닮았다는 전설에서 이름이 왔습니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying → roasting, in the traditional mingcong manner.",
        "The name comes from a legend: a flood-washed bush whose leaves were patterned like a tortoise shell."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火，采用武夷名丛的传统做法。",
        "名字源于传说：被洪水冲走的茶树，叶纹像龟背。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火，採用武夷名欉的傳統做法。",
        "名字源於傳說：被洪水沖走的茶樹，葉紋像龜背。"
      ]
    },
    "ko": {
      "name": "수금귀",
      "oneLine": "거북 등껍질 전설을 가진, 부드럽고 단 무이 명총.",
      "oxidation": "50%",
      "ratioNote": "110ml에 7g",
      "rounds": "7~8회",
      "steepBasis": "98도에서 30초, 2포 20초, 3포 25초.",
      "origin": "중국 푸젠성 무이산 일대.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "무이 4대 명총 중 하나입니다. 큰비에 차나무가 골짜기로 떠내려갔는데, 그 잎 무늬가 거북 등껍질 같았다는 전설에서 수금귀(水金龜)라는 이름이 붙었다고 전합니다.",
      "flavor": "부드러운 꽃향과 배화향, 둥글고 단 맛. 명총 가운데 가장 온화한 인상입니다.",
      "pairing": "볶음 요리, 구운 고기.",
      "brewTip": "98도. 중반 포에서 단맛이 가장 둥글게 나옵니다.",
      "keep": "개봉 후 3개월 안, 밀봉해 건조하게.",
      "keywords": "수금귀 무이 명총 암차 거북 전설"
    },
    "en": {
      "name": "Shui Jin Gui",
      "oneLine": "A gentle, sweet Wuyi mingcong named for a tortoise-shell legend.",
      "oxidation": "50%",
      "ratioNote": "7 g to 110 ml",
      "rounds": "7–8 infusions",
      "steepBasis": "98 °C: 30 seconds, then 20, then 25.",
      "origin": "Wuyi Mountains, Fujian.",
      "process": "Withering → bruising → firing → rolling → drying → roasting.",
      "story": "One of the four great Wuyi mingcong. Legend says a flood washed a tea bush down the valley, and its leaves — patterned like a tortoise shell — gave Shui Jin Gui, the 'golden water tortoise', its name.",
      "flavor": "Soft florals and roast over a round sweetness; the mildest impression among the mingcong.",
      "pairing": "Stir-fries and grilled meats.",
      "brewTip": "98 °C. The middle steeps show the roundest sweetness.",
      "keep": "Sealed and dry; best within three months of opening.",
      "keywords": "Shui Jin Gui Wuyi mingcong rock tea tortoise"
    },
    "zh-CN": {
      "name": "水金龟",
      "oneLine": "源于龟壳传说的武夷名丛，滋味柔和甘甜。",
      "oxidation": "50%",
      "ratioNote": "110毫升配7克",
      "rounds": "7~8泡",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "中国福建武夷山一带。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火。",
      "story": "武夷四大名丛之一。相传大雨把茶树冲到谷中，其叶纹像龟背，因而得名水金龟。",
      "flavor": "柔和的花香与焙火香，滋味圆润甘甜，是名丛中最温和的一款。",
      "pairing": "炒菜、烤肉。",
      "brewTip": "98度。中间几泡甜味最圆润。",
      "keep": "开封后三个月内，密封干燥保存。",
      "keywords": "水金龟 武夷 名丛 岩茶 龟背"
    },
    "zh-TW": {
      "name": "水金龜",
      "oneLine": "源於龜殼傳說的武夷名欉，滋味柔和甘甜。",
      "oxidation": "50%",
      "ratioNote": "110毫升配7公克",
      "rounds": "7~8泡",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒。",
      "origin": "中國福建武夷山一帶。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火。",
      "story": "武夷四大名欉之一。相傳大雨把茶樹沖到谷中，其葉紋像龜背，因而得名水金龜。",
      "flavor": "柔和的花香與焙火香，滋味圓潤甘甜，是名欉中最溫和的一款。",
      "pairing": "炒菜、烤肉。",
      "brewTip": "98度。中間幾泡甜味最圓潤。",
      "keep": "開封後三個月內，密封乾燥保存。",
      "keywords": "水金龜 武夷 名欉 岩茶 龜背"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-bantianyao",
    "group": "oolong",
    "kind": "tea",
    "hanja": "半",
    "sub": "Bantian Yao",
    "alias": [
      "반톈야오",
      "반천요차",
      "半天腰"
    ],
    "hz": "半天腰",
    "hs": "半天腰",
    "rom": "Ban Tian Yao",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "7g",
    "water": "110ml",
    "steeps": [
      30,
      20,
      25
    ],
    "maxSteep": 8,
    "oxidationValue": 50,
    "traits": "t-afternoon t-night a-roast a-herb b-full k-sweet r-smoke s-hot w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 무이 명총의 전통 제법을 따릅니다.",
        "절벽 중간, 하늘과 땅 사이의 '허리'에 자라는 나무에서 왔다는 이름입니다. 암운(바위 맛)이 뚜렷한 편입니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying → roasting, in the traditional mingcong manner.",
        "The name comes from bushes growing midway up a cliff — the 'waist' between sky and earth. Its rock character is pronounced."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火，采用武夷名丛的传统做法。",
        "名字源于茶树长在悬崖中间、天与地之间的“腰”上，岩韵特别分明。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火，採用武夷名欉的傳統做法。",
        "名字源於茶樹長在懸崖中間、天與地之間的「腰」上，岩韻特別分明。"
      ]
    },
    "ko": {
      "name": "반천요",
      "oneLine": "절벽의 솔개 전설을 품은, 암운이 뚜렷한 무이 명총.",
      "oxidation": "50%",
      "ratioNote": "110ml에 7g",
      "rounds": "7~8회",
      "steepBasis": "98도에서 30초, 2포 20초, 3포 25초. 바위의 광물감이 포마다 이어집니다.",
      "origin": "중국 푸젠성 무이산 절벽 지대.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "무이 5대 명총 중 하나입니다. 이름에는 솔개(鹞)가 절벽에 씨앗을 떨어뜨렸다는 전설이 얽혀 있고, '腰'는 '鹞'의 오기(誤記)로 전합니다. 채엽 자체가 어려웠던 절벽의 차로 전합니다.",
      "flavor": "뚜렷한 광물감(암운)과 배화향, 진한 단맛. 여운이 길게 남습니다.",
      "pairing": "훈제 요리, 진한 소스의 고기 요리.",
      "brewTip": "98도. 포가 쌓일수록 광물감이 또렷해지니 5포 이후도 버리지 마세요.",
      "keep": "개봉 후 3개월 안, 밀봉해 건조하게.",
      "keywords": "반천요 무이 명총 암차 암운 절벽"
    },
    "en": {
      "name": "Ban Tian Yao",
      "oneLine": "A Wuyi mingcong from mid-cliff bushes, with a pronounced rock character.",
      "oxidation": "50%",
      "ratioNote": "7 g to 110 ml",
      "rounds": "7–8 infusions",
      "steepBasis": "98 °C: 30 seconds, then 20, then 25. The mineral note runs through every steep.",
      "origin": "The cliffs of the Wuyi Mountains, Fujian.",
      "process": "Withering → bruising → firing → rolling → drying → roasting.",
      "story": "One of the five great Wuyi mingcong. The name is tied to a legend of a kite dropping a seed onto the cliff; the 'waist' character is a later miswriting of 'kite' — leaf that was hard even to pick.",
      "flavor": "Clear minerality (rock rhyme), roast and a deep sweetness with a long finish.",
      "pairing": "Smoked dishes and richly sauced meats.",
      "brewTip": "98 °C. The minerality sharpens with later steeps; don't stop before the fifth.",
      "keep": "Sealed and dry; best within three months of opening.",
      "keywords": "Ban Tian Yao Wuyi mingcong rock tea cliff"
    },
    "zh-CN": {
      "name": "半天腰",
      "oneLine": "长在悬崖半腰的武夷名丛，岩韵分明。",
      "oxidation": "50%",
      "ratioNote": "110毫升配7克",
      "rounds": "7~8泡",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒。矿物感贯穿每一泡。",
      "origin": "中国福建武夷山悬崖地带。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥 → 焙火。",
      "story": "武夷五大名丛之一。名字源于鹞子把种子落在悬崖的传说，“腰”为“鹞”的误写，相传采摘本身就十分不易。",
      "flavor": "分明的矿物感（岩韵）与焙火香，甜味浓，余韵长。",
      "pairing": "烟熏菜、浓汁肉菜。",
      "brewTip": "98度。泡数越多矿物感越清晰，第五泡之后也不要倒掉。",
      "keep": "开封后三个月内，密封干燥保存。",
      "keywords": "半天腰 武夷 名丛 岩茶 岩韵"
    },
    "zh-TW": {
      "name": "半天腰",
      "oneLine": "長在懸崖半腰的武夷名欉，岩韻分明。",
      "oxidation": "50%",
      "ratioNote": "110毫升配7公克",
      "rounds": "7~8泡",
      "steepBasis": "98度泡30秒，第二泡20秒，第三泡25秒。礦物感貫穿每一泡。",
      "origin": "中國福建武夷山懸崖地帶。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥 → 焙火。",
      "story": "武夷五大名欉之一。名字源於鷂子把種子落在懸崖的傳說，「腰」為「鷂」的誤寫，相傳採摘本身就十分不易。",
      "flavor": "分明的礦物感（岩韻）與焙火香，甜味濃，餘韻長。",
      "pairing": "煙燻菜、濃汁肉菜。",
      "brewTip": "98度。泡數越多礦物感越清晰，第五泡之後也不要倒掉。",
      "keep": "開封後三個月內，密封乾燥保存。",
      "keywords": "半天腰 武夷 名欉 岩茶 岩韻"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-zhangping",
    "group": "oolong",
    "kind": "tea",
    "hanja": "漳",
    "sub": "Zhangping Shuixian",
    "alias": [
      "장평 수선",
      "장핑수이셴",
      "漳平水仙"
    ],
    "hz": "漳平水仙",
    "hs": "漳平水仙",
    "rom": "Zhangping Shuixian",
    "temp": 95,
    "tempRange": "90~95℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      45,
      25,
      35
    ],
    "maxSteep": 7,
    "oxidationValue": 30,
    "traits": "t-afternoon a-floral b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념한 잎을 사각 틀에 넣어 압축하고 종이에 싸서 건조합니다. 우롱차 중 드문 압축형입니다.",
        "같은 수선 품종이지만 무이수선처럼 늘어진 잎으로 만들지 않고 떡 모양으로 굳히는 것이 장평만의 방식입니다."
      ],
      "en": [
        "Withered, bruised, fired and rolled leaf is pressed in square molds, wrapped in paper and dried — a rare pressed form among oolongs.",
        "Same Shuixian cultivar, but unlike the loose strips of Wuyi Shuixian, Zhangping sets the leaf into cakes."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻后入方形模压制，包纸干燥，是乌龙茶中罕见的压制型。",
        "同是水仙品种，但不像武夷水仙做成条索，压成饼形是漳平独有的做法。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻後入方形模壓製，包紙乾燥，是烏龍茶中罕見的壓製型。",
        "同是水仙品種，但不像武夷水仙做成條索，壓成餅形是漳平獨有的做法。"
      ]
    },
    "ko": {
      "name": "장평수선",
      "oneLine": "사각 떡 모양으로 압축해 종이에 싸는, 드문 압축형 우롱.",
      "oxidation": "30%",
      "ratioNote": "150ml에 6g",
      "rounds": "6~7회",
      "steepBasis": "95도에서 45초, 2포 25초, 3포 35초. 압축이 풀리는 첫 포는 조금 길게 봅니다.",
      "origin": "중국 푸젠성 장평시 일대.",
      "process": "위조 → 요청 → 살청 → 유념 → 사각형 압축 → 종이 포장 → 건조.",
      "story": "수선 품종을 쓰지만, 늘어진 잎으로 만드는 무이수선과 달리 장평에서는 잎을 사각형 떡 모양으로 압축해 종이에 싸서 만듭니다. 우롱차 가운데 거의 유일한 압축형으로, 운반과 보관을 쉽게 하던 방식이 전통이 됐습니다.",
      "flavor": "난향과 청량한 풀 향, 맑은 단맛. 물색은 밝은 황금빛입니다.",
      "pairing": "담백한 딤섬, 볶은 채소.",
      "brewTip": "95도. 한 덩이를 통째로 우리거나, 반으로 나눠 양을 조절합니다.",
      "keep": "종이 포장 그대로, 밀봉해 건조하게. 압축형이라 보관에 강한 편입니다.",
      "keywords": "장평수선 압축차 수선 푸젠 떡차"
    },
    "en": {
      "name": "Zhangping Shuixian",
      "oneLine": "A rare pressed oolong — Shuixian leaf compressed into paper-wrapped squares.",
      "oxidation": "30%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "6–7 infusions",
      "steepBasis": "95 °C: 45 seconds, then 25, then 35. Give the first steep time for the cake to loosen.",
      "origin": "Zhangping, Fujian.",
      "process": "Withering → bruising → firing → rolling → pressing into square cakes → paper wrapping → drying.",
      "story": "It uses the Shuixian cultivar, but unlike the loose strips of Wuyi Shuixian, Zhangping presses the leaf into square cakes wrapped in paper — nearly the only pressed oolong. The form began for easier transport and storage and became the tradition.",
      "flavor": "Orchid and a cool green note with clear sweetness. Bright golden liquor.",
      "pairing": "Light dim sum and stir-fried vegetables.",
      "brewTip": "95 °C. Brew a whole cake, or split one to adjust strength.",
      "keep": "Keep the paper wrap on, sealed and dry; the pressed form stores well.",
      "keywords": "Zhangping Shuixian pressed oolong Fujian cake"
    },
    "zh-CN": {
      "name": "漳平水仙",
      "oneLine": "压成方形茶饼、包上纸的罕见压制乌龙。",
      "oxidation": "30%",
      "ratioNote": "150毫升配6克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡45秒，第二泡25秒，第三泡35秒。第一泡要等茶饼松开，稍长一些。",
      "origin": "中国福建漳平市一带。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 压成方形 → 纸包 → 干燥。",
      "story": "用的是水仙品种，但与做成条索的武夷水仙不同，漳平把茶叶压成方形茶饼再包纸，是乌龙茶中几乎唯一的压制型。起初为方便运输保存，后来成了传统。",
      "flavor": "兰花香与清凉的草香，甜味清爽。汤色明亮金黄。",
      "pairing": "清淡点心、炒青菜。",
      "brewTip": "95度。可以整块冲泡，也可以掰半调整分量。",
      "keep": "连纸包一起密封干燥保存，压制型较耐放。",
      "keywords": "漳平水仙 压制茶 水仙 福建 茶饼"
    },
    "zh-TW": {
      "name": "漳平水仙",
      "oneLine": "壓成方形茶餅、包上紙的罕見壓製烏龍。",
      "oxidation": "30%",
      "ratioNote": "150毫升配6公克",
      "rounds": "6~7泡",
      "steepBasis": "95度泡45秒，第二泡25秒，第三泡35秒。第一泡要等茶餅鬆開，稍長一些。",
      "origin": "中國福建漳平市一帶。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 壓成方形 → 紙包 → 乾燥。",
      "story": "用的是水仙品種，但與做成條索的武夷水仙不同，漳平把茶葉壓成方形茶餅再包紙，是烏龍茶中幾乎唯一的壓製型。起初為方便運輸保存，後來成了傳統。",
      "flavor": "蘭花香與清涼的草香，甜味清爽。湯色明亮金黃。",
      "pairing": "清淡點心、炒青菜。",
      "brewTip": "95度。可以整塊沖泡，也可以掰半調整份量。",
      "keep": "連紙包一起密封乾燥保存，壓製型較耐放。",
      "keywords": "漳平水仙 壓製茶 水仙 福建 茶餅"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-yunnan",
    "group": "oolong",
    "kind": "tea",
    "hanja": "雲",
    "sub": "Yunnan Oolong",
    "alias": [
      "윈난 우롱",
      "윈난우롱",
      "雲南烏龍"
    ],
    "hz": "雲南烏龍",
    "hs": "云南乌龙",
    "rom": "Yunnan Oolong",
    "temp": 95,
    "tempRange": "90~95℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      50,
      25,
      35
    ],
    "maxSteep": 6,
    "oxidationValue": 30,
    "traits": "t-afternoon a-floral a-malt b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "윈난 대엽종 찻잎을 위조 → 요청 → 살청한 뒤 대만식으로 천에 싸서 구형으로 맙니다.",
        "보이차와 전홍의 고향인 윈난에서, 대엽종의 진한 바디에 고산 우롱의 향을 입히려는 시도에서 나온 차입니다."
      ],
      "en": [
        "Yunnan large-leaf tea is withered, bruised and fired, then cloth-rolled into balls in the Taiwanese manner.",
        "From the home of pu'er and Dianhong — an attempt to give the large leaf's heavy body a high-mountain oolong aroma."
      ],
      "zh-CN": [
        "云南大叶种茶叶萎凋 → 摇青 → 杀青后，按台湾做法包布揉成球形。",
        "出自普洱与滇红的故乡云南，想把大叶种的浓厚汤感与高山乌龙的香气结合起来。"
      ],
      "zh-TW": [
        "雲南大葉種茶葉萎凋 → 搖菁 → 殺菁後，按台灣做法包布揉成球形。",
        "出自普洱與滇紅的故鄉雲南，想把大葉種的濃厚湯感與高山烏龍的香氣結合起來。"
      ]
    },
    "ko": {
      "name": "운남 우롱",
      "oneLine": "윈난 대엽종에 대만식 구형 제법을 입힌 우롱.",
      "oxidation": "30%",
      "ratioNote": "150ml에 6g",
      "rounds": "5~6회",
      "steepBasis": "95도에서 50초, 2포 25초, 3포 35초. 대엽종이라 뒤 포까지 바디가 유지됩니다.",
      "origin": "중국 윈난성 고산 차구 일대.",
      "process": "위조 → 요청 → 살청 → 구형 유념 → 건조.",
      "story": "보이차와 전홍으로 유명한 윈난에서 대엽종 찻잎에 대만식 구형 우롱 제법을 적용해 만든 차입니다. 대엽종 특유의 진한 바디와 고산 우롱의 맑은 향을 함께 노린, 비교적 최근에 자리 잡은 스타일입니다.",
      "flavor": "진한 맥아와 꿀의 단맛 위에 꽃향. 대만 고산 우롱보다 바디가 두껍습니다.",
      "pairing": "구운 고기, 진한 양념 요리.",
      "brewTip": "95도. 잎이 완전히 풀린 뒤의 포에서 바디와 향이 함께 나옵니다.",
      "keep": "개봉 후 2~3개월 안, 밀봉해 건조하게.",
      "keywords": "운남 우롱 대엽종 구형 윈난"
    },
    "en": {
      "name": "Yunnan Oolong",
      "oneLine": "Yunnan large-leaf tea made in the Taiwanese ball-rolled oolong style.",
      "oxidation": "30%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "5–6 infusions",
      "steepBasis": "95 °C: 50 seconds, then 25, then 35. The large leaf holds its body into later steeps.",
      "origin": "The high-mountain tea areas of Yunnan, China.",
      "process": "Withering → bruising → firing → ball rolling → drying.",
      "story": "From the home of pu'er and Dianhong, this tea applies Taiwanese ball-rolling to Yunnan large-leaf material — a relatively recent style aiming to combine the large leaf's heavy body with high-mountain oolong aroma.",
      "flavor": "Deep malt and honey sweetness under florals; a thicker body than Taiwanese gaoshan.",
      "pairing": "Grilled meats and strongly seasoned dishes.",
      "brewTip": "95 °C. Body and aroma arrive together once the balls have fully opened.",
      "keep": "Sealed and dry; best within 2–3 months of opening.",
      "keywords": "Yunnan oolong large leaf ball rolled"
    },
    "zh-CN": {
      "name": "云南乌龙",
      "oneLine": "用云南大叶种配台湾球形工艺做的乌龙。",
      "oxidation": "30%",
      "ratioNote": "150毫升配6克",
      "rounds": "5~6泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。大叶种后几泡仍有汤感。",
      "origin": "中国云南高山茶区一带。",
      "process": "萎凋 → 摇青 → 杀青 → 球形揉捻 → 干燥。",
      "story": "在普洱与滇红的故乡云南，把台湾式球形乌龙工艺用在大叶种原料上，是较新成形的风格，意在兼得大叶种的浓厚汤感与高山乌龙的清香。",
      "flavor": "浓麦芽与蜂蜜的甜之上带花香，汤感比台湾高山乌龙更厚。",
      "pairing": "烤肉、浓味菜。",
      "brewTip": "95度。球形完全展开后的几泡，汤感与香气一起出来。",
      "keep": "开封后2~3个月内，密封干燥保存。",
      "keywords": "云南乌龙 大叶种 球形 云南"
    },
    "zh-TW": {
      "name": "雲南烏龍",
      "oneLine": "用雲南大葉種配台灣球形工藝做的烏龍。",
      "oxidation": "30%",
      "ratioNote": "150毫升配6公克",
      "rounds": "5~6泡",
      "steepBasis": "95度泡50秒，第二泡25秒，第三泡35秒。大葉種後幾泡仍有湯感。",
      "origin": "中國雲南高山茶區一帶。",
      "process": "萎凋 → 搖菁 → 殺菁 → 球形揉捻 → 乾燥。",
      "story": "在普洱與滇紅的故鄉雲南，把台灣式球形烏龍工藝用在大葉種原料上，是較新成形的風格，意在兼得大葉種的濃厚湯感與高山烏龍的清香。",
      "flavor": "濃麥芽與蜂蜜的甜之上帶花香，湯感比台灣高山烏龍更厚。",
      "pairing": "烤肉、濃味菜。",
      "brewTip": "95度。球形完全展開後的幾泡，湯感與香氣一起出來。",
      "keep": "開封後2~3個月內，密封乾燥保存。",
      "keywords": "雲南烏龍 大葉種 球形 雲南"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-darjeeling",
    "group": "oolong",
    "kind": "tea",
    "hanja": "烏",
    "sub": "Darjeeling Oolong",
    "alias": [
      "다즐링 우롱차",
      "大吉嶺烏龍"
    ],
    "hz": "大吉嶺烏龍",
    "hs": "大吉岭乌龙",
    "rom": "Darjeeling Oolong",
    "temp": 90,
    "tempRange": "85~90℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      60,
      30,
      45
    ],
    "maxSteep": 5,
    "oxidationValue": 40,
    "traits": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-quick p-solo c-mid m-refresh",
    "originCountry": {
      "ko": "인도",
      "en": "India",
      "zh-CN": "印度",
      "zh-TW": "印度"
    },
    "x": {
      "ko": [
        "홍차 제법에 쓰던 잎을 반발효에서 멈추고 가볍게 비벼 말립니다. 다즐링 다원에서 소량만 만드는 스타일입니다.",
        "다즐링 특유의 머스캣(청포도) 향에 우롱의 꽃향이 겹치는 것이 특징입니다."
      ],
      "en": [
        "Leaf destined for black tea is stopped at partial oxidation, lightly rolled and dried — a small-lot style in Darjeeling gardens.",
        "Its character is Darjeeling's muscatel grape note layered with oolong florals."
      ],
      "zh-CN": [
        "把做红茶的叶子停在半发酵，轻揉后干燥，是大吉岭茶园的小批量风格。",
        "特征是大吉岭特有的麝香葡萄香之上，叠着乌龙的花香。"
      ],
      "zh-TW": [
        "把做紅茶的葉子停在半發酵，輕揉後乾燥，是大吉嶺茶園的小批量風格。",
        "特徵是大吉嶺特有的麝香葡萄香之上，疊著烏龍的花香。"
      ]
    },
    "ko": {
      "name": "다즐링 우롱",
      "oneLine": "다즐링 다원에서 반발효로 만드는 우롱 스타일 차.",
      "oxidation": "40%",
      "ratioNote": "150ml에 5g",
      "rounds": "4~5회",
      "steepBasis": "90도에서 1분, 2포 30초, 3포 45초. 홍차보다 낮은 온도에서 향이 맑게 나옵니다.",
      "origin": "인도 서벵골 다즐링 고산 다원.",
      "process": "위조 → 가벼운 유념 → 반발효 → 건조.",
      "story": "홍차로 유명한 다즐링의 일부 다원에서, 산화를 중간에서 멈춘 우롱 스타일로 소량 만드는 차입니다. 다즐링 차밭의 중국종·클로널 품종이 재료라 홍차와는 다른 결의 꽃향이 납니다.",
      "flavor": "머스캣(청포도)과 살구, 꽃향. 가볍고 맑으며 물색은 밝은 황동색입니다.",
      "pairing": "과일 타르트, 가벼운 샌드위치.",
      "brewTip": "90도. 끓는 물을 그대로 쓰면 머스캣 향이 달아나니 조금 식혀 쓰세요.",
      "keep": "개봉 후 1~2개월 안, 밀봉해 서늘하게. 향이 생명인 차입니다.",
      "keywords": "다즐링 우롱 인도 반발효 머스캣"
    },
    "en": {
      "name": "Darjeeling Oolong",
      "oneLine": "An oolong-style tea made by partial oxidation in Darjeeling gardens.",
      "oxidation": "40%",
      "ratioNote": "5 g to 150 ml",
      "rounds": "4–5 infusions",
      "steepBasis": "90 °C: 1 minute, then 30 seconds, then 45. Cooler than black-tea brewing keeps the aroma clear.",
      "origin": "High-elevation gardens of Darjeeling, West Bengal, India.",
      "process": "Withering → light rolling → partial oxidation → drying.",
      "story": "A small-lot style from some Darjeeling gardens famous for black tea, stopping oxidation midway. Made from the China and clonal cultivars of Darjeeling, it shows a floral register its black teas do not.",
      "flavor": "Muscatel grape, apricot and flowers; light and clear, with a bright brass-colored liquor.",
      "pairing": "Fruit tarts and light sandwiches.",
      "brewTip": "90 °C. Straight boiling water drives off the muscatel note; let it cool a little.",
      "keep": "Sealed and cool; best within 1–2 months of opening — aroma is everything here.",
      "keywords": "Darjeeling oolong India semi-oxidized muscatel"
    },
    "zh-CN": {
      "name": "大吉岭乌龙",
      "oneLine": "大吉岭茶园以半发酵方式做的乌龙风格茶。",
      "oxidation": "40%",
      "ratioNote": "150毫升配5克",
      "rounds": "4~5泡",
      "steepBasis": "90度泡1分钟，第二泡30秒，第三泡45秒。比红茶低的水温能让香气更清。",
      "origin": "印度西孟加拉大吉岭高山茶园。",
      "process": "萎凋 → 轻揉捻 → 半发酵 → 干燥。",
      "story": "以红茶闻名的大吉岭，部分茶园把发酵停在中间，做成乌龙风格的小批量茶。原料是大吉岭的中国种与克隆品种，花香与红茶不同。",
      "flavor": "麝香葡萄、杏子与花香，轻盈清爽，汤色明亮黄铜色。",
      "pairing": "水果挞、清淡三明治。",
      "brewTip": "90度。直接用沸水会让麝香葡萄香散掉，先稍放凉。",
      "keep": "开封后1~2个月内，密封阴凉保存，香气是它的生命。",
      "keywords": "大吉岭乌龙 印度 半发酵 麝香葡萄"
    },
    "zh-TW": {
      "name": "大吉嶺烏龍",
      "oneLine": "大吉嶺茶園以半發酵方式做的烏龍風格茶。",
      "oxidation": "40%",
      "ratioNote": "150毫升配5公克",
      "rounds": "4~5泡",
      "steepBasis": "90度泡1分鐘，第二泡30秒，第三泡45秒。比紅茶低的水溫能讓香氣更清。",
      "origin": "印度西孟加拉大吉嶺高山茶園。",
      "process": "萎凋 → 輕揉捻 → 半發酵 → 乾燥。",
      "story": "以紅茶聞名的大吉嶺，部分茶園把發酵停在中間，做成烏龍風格的小批量茶。原料是大吉嶺的中國種與克隆品種，花香與紅茶不同。",
      "flavor": "麝香葡萄、杏子與花香，輕盈清爽，湯色明亮黃銅色。",
      "pairing": "水果塔、清淡三明治。",
      "brewTip": "90度。直接用沸水會讓麝香葡萄香散掉，先稍放涼。",
      "keep": "開封後1~2個月內，密封陰涼保存，香氣是它的生命。",
      "keywords": "大吉嶺烏龍 印度 半發酵 麝香葡萄"
    },
    "originCountryCode": "in"
  },
  {
    "id": "oolong-dancong-huangzhi",
    "group": "oolong",
    "kind": "tea",
    "hanja": "黃",
    "sub": "Huangzhi Xiang Dancong",
    "alias": [
      "황지향",
      "黃枝香",
      "황즈샹 단총",
      "황지향단총"
    ],
    "hz": "黃枝香單叢",
    "hs": "黄枝香单丛",
    "rom": "Huangzhi Xiang Dancong",
    "temp": 95,
    "tempRange": "95~100℃",
    "leaf": "6g",
    "water": "120ml",
    "steeps": [
      20,
      15,
      20
    ],
    "maxSteep": 9,
    "oxidationValue": 40,
    "traits": "t-afternoon t-night a-floral a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-high m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화. 단일 나무의 잎만으로 따로 만듭니다.",
        "찻잎에서 치자꽃(황지꽃) 같은 향이 나 붙은 향형입니다. 꽃을 섞은 가향이 아닙니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, lightly baked — made from a single bush only.",
        "Named for a gardenia-like scent that comes from the leaf itself, not from added flowers."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火，单株采制。",
        "因茶香似黄枝花（栀子花）而得名，并非掺花窨制。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火，單株採製。",
        "因茶香似黃枝花（梔子花）而得名，並非摻花窨製。"
      ]
    },
    "ko": {
      "name": "황지향 단총",
      "oneLine": "치자꽃 같은 달콤한 향이 또렷한 봉황단총 향형.",
      "oxidation": "약 40%",
      "ratioNote": "개완 120ml에 6g",
      "rounds": "9회 안팎",
      "steepBasis": "95도에서 20초, 2포 15초, 3포 20초. 이후 5초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
      "story": "봉황단총의 향형 하나. 찻잎 자체에서 치자꽃을 닮은 향이 나서 붙은 이름으로, 꽃을 섞어 향을 입힌 차가 아닙니다.",
      "flavor": "치자꽃과 잘 익은 과일을 닮은 달콤한 향, 부드러운 단맛과 맑은 여운. 물색은 밝은 황금빛입니다.",
      "pairing": "가벼운 과일 디저트, 담백한 월병. 향이 섬세해 강한 양념 음식과는 부딪힙니다.",
      "brewTip": "95도. 향이 달아 오래 우리면 무거워지니 짧게 여러 번 우리는 편이 좋습니다.",
      "keep": "밀봉해 서늘하게. 향이 생명이라 소분해 둡니다.",
      "keywords": "황지향 봉황단총 차오저우 우롱 치자향"
    },
    "en": {
      "name": "Huangzhi Xiang Dancong",
      "oneLine": "A Phoenix dancong with a clear, sweet gardenia-like scent.",
      "oxidation": "about 40%",
      "ratioNote": "6 g in a 120 ml gaiwan",
      "rounds": "around 9 infusions",
      "steepBasis": "95 °C: 20 seconds, then 15, then 20; add 5 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, lightly baked.",
      "story": "One of the dancong aroma types, named because the leaf itself smells like gardenia blossom — no flowers are added.",
      "flavor": "Sweet gardenia and ripe-fruit notes, soft sweetness, a clean finish. Bright golden liquor.",
      "pairing": "Light fruit desserts, plain mooncakes. Strong seasoning overwhelms it.",
      "brewTip": "95 °C, short repeated infusions; long steeps make the sweet aroma heavy.",
      "keep": "Sealed and cool; split into small lots so the aroma stays.",
      "keywords": "Huangzhi Xiang dancong Phoenix oolong Chaozhou gardenia"
    },
    "zh-CN": {
      "name": "黄枝香单丛",
      "oneLine": "香气似栀子花、清甜分明的凤凰单丛香型。",
      "oxidation": "约40%",
      "ratioNote": "120毫升盖碗配6克",
      "rounds": "9泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡20秒，其后每泡加5秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火。",
      "story": "凤凰单丛香型之一，因茶叶本身带黄枝花（栀子花）般的香气得名，并非掺花窨制。",
      "flavor": "栀子花与熟果般的甜香，回甘柔和，余韵清爽，汤色明亮金黄。",
      "pairing": "清淡水果甜点、原味月饼。重口味菜肴相冲。",
      "brewTip": "95度短泡多冲，久浸会让甜香发闷。",
      "keep": "密封阴凉，分小包装保香。",
      "keywords": "黄枝香 单丛 潮州 凤凰 乌龙 栀子香"
    },
    "zh-TW": {
      "name": "黃枝香單叢",
      "oneLine": "香氣似梔子花、清甜分明的鳳凰單叢香型。",
      "oxidation": "約40%",
      "ratioNote": "120毫升蓋碗配6克",
      "rounds": "9泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡20秒，其後每泡加5秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火。",
      "story": "鳳凰單叢香型之一，因茶葉本身帶黃枝花（梔子花）般的香氣得名，並非摻花窨製。",
      "flavor": "梔子花與熟果般的甜香，回甘柔和，餘韻清爽，湯色明亮金黃。",
      "pairing": "清淡水果甜點、原味月餅。重口味菜餚相衝。",
      "brewTip": "95度短泡多沖，久浸會讓甜香發悶。",
      "keep": "密封陰涼，分小包裝保香。",
      "keywords": "黃枝香 單叢 潮州 鳳凰 烏龍 梔子香"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-xingren",
    "group": "oolong",
    "kind": "tea",
    "hanja": "杏",
    "sub": "Xingren Xiang Dancong",
    "alias": [
      "행인향",
      "杏仁香",
      "싱런샹 단총",
      "행인향단총"
    ],
    "hz": "杏仁香單叢",
    "hs": "杏仁香单丛",
    "rom": "Xingren Xiang Dancong",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "6g",
    "water": "120ml",
    "steeps": [
      25,
      20,
      25
    ],
    "maxSteep": 8,
    "oxidationValue": 45,
    "traits": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-gongfu p-solo c-mid m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 단일 나무의 잎만으로 따로 만듭니다.",
        "볶은 아몬드 같은 고소한 향에서 이름이 왔습니다. 차오저우에서는 목이 편안한 느낌으로 알려져 즐겨 마십니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, baked — made from a single bush only.",
        "Named for a roasted-almond aroma; in Chaozhou it is also favoured for how soothing it feels on the throat."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火，单株采制。",
        "因带炒杏仁般的坚果香得名，潮州人也爱它入口润喉的感觉。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火，單株採製。",
        "因帶炒杏仁般的堅果香得名，潮州人也愛它入口潤喉的感覺。"
      ]
    },
    "ko": {
      "name": "행인향 단총",
      "oneLine": "볶은 아몬드 같은 고소함이 감도는 봉황단총 향형.",
      "oxidation": "약 45%",
      "ratioNote": "개완 120ml에 6g",
      "rounds": "8회 안팎",
      "steepBasis": "98도에서 25초, 2포 20초, 3포 25초. 이후 5~10초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "행인(아몬드)을 닮은 고소한 향 때문에 붙은 이름입니다. 차오저우에서는 목 넘김이 편안하다고 알려져, 목이 답답할 때 찾는 차로도 통합니다.",
      "flavor": "아몬드와 구운 견과의 고소함. 첫맛에 살짝 쌉싸래한 기운이 돌다 단맛으로 넘어가고, 목 넘김이 부드럽습니다.",
      "pairing": "견과류, 담백한 찹쌀 과자. 향이 고소해 디저트 없이 단독으로 마시기 좋습니다.",
      "brewTip": "98도. 고소한 향은 중간 포부터 또렷해지니 3~4포를 천천히 즐기세요.",
      "keep": "밀봉해 서늘하게. 배화 향이 날아가지 않게 소분합니다.",
      "keywords": "행인향 봉황단총 차오저우 우롱 아몬드향"
    },
    "en": {
      "name": "Xingren Xiang Dancong",
      "oneLine": "A Phoenix dancong with a toasty roasted-almond aroma.",
      "oxidation": "about 45%",
      "ratioNote": "6 g in a 120 ml gaiwan",
      "rounds": "around 8 infusions",
      "steepBasis": "98 °C: 25 seconds, then 20, then 25; add 5–10 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, baked.",
      "story": "Named for its almond-like nuttiness. In Chaozhou it is also known as a tea that feels comfortable on the throat.",
      "flavor": "Roasted almond and toasted nuts, a brief bitter edge turning sweet, a smooth swallow.",
      "pairing": "Nuts, plain glutinous-rice cakes. Good on its own without dessert.",
      "brewTip": "98 °C; the nutty note firms up from the third or fourth infusion.",
      "keep": "Sealed and cool; split into small lots to hold the baked aroma.",
      "keywords": "Xingren Xiang dancong Phoenix oolong Chaozhou almond"
    },
    "zh-CN": {
      "name": "杏仁香单丛",
      "oneLine": "带炒杏仁坚果香的凤凰单丛香型。",
      "oxidation": "约45%",
      "ratioNote": "120毫升盖碗配6克",
      "rounds": "8泡左右",
      "steepBasis": "98度泡25秒，第二泡20秒，第三泡25秒，其后每泡加5~10秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火。",
      "story": "因香气似杏仁得名。潮州人觉得它入口润喉，喉咙不适时也爱喝。",
      "flavor": "杏仁与烤坚果的香气，入口微苦随即回甘，喉韵顺滑。",
      "pairing": "坚果、清淡糯米点心。适合单独品饮。",
      "brewTip": "98度冲泡，坚果香在三四泡后更明显。",
      "keep": "密封阴凉，分小包装保香。",
      "keywords": "杏仁香 单丛 潮州 凤凰 乌龙 润喉"
    },
    "zh-TW": {
      "name": "杏仁香單叢",
      "oneLine": "帶炒杏仁堅果香的鳳凰單叢香型。",
      "oxidation": "約45%",
      "ratioNote": "120毫升蓋碗配6克",
      "rounds": "8泡左右",
      "steepBasis": "98度泡25秒，第二泡20秒，第三泡25秒，其後每泡加5~10秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火。",
      "story": "因香氣似杏仁得名。潮州人覺得它入口潤喉，喉嚨不適時也愛喝。",
      "flavor": "杏仁與烤堅果的香氣，入口微苦隨即回甘，喉韻順滑。",
      "pairing": "堅果、清淡糯米點心。適合單獨品飲。",
      "brewTip": "98度沖泡，堅果香在三四泡後更明顯。",
      "keep": "密封陰涼，分小包裝保香。",
      "keywords": "杏仁香 單叢 潮州 鳳凰 烏龍 潤喉"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-rougui",
    "group": "oolong",
    "kind": "tea",
    "hanja": "肉",
    "sub": "Rougui Xiang Dancong",
    "alias": [
      "육계향",
      "肉桂香",
      "러우구이샹 단총",
      "육계향단총"
    ],
    "hz": "肉桂香單叢",
    "hs": "肉桂香单丛",
    "rom": "Rougui Xiang Dancong",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "6g",
    "water": "120ml",
    "steeps": [
      25,
      20,
      30
    ],
    "maxSteep": 9,
    "oxidationValue": 50,
    "traits": "t-night a-herb a-roast b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 단일 나무의 잎만으로 따로 만듭니다.",
        "계피(육계) 같은 따뜻한 향이 나는 봉황산 향형입니다. 푸젠 무이산의 육계 품종차와는 산지도 품종도 다른 차입니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, baked — made from a single bush only.",
        "A Phoenix Mountain aroma type with a warm cinnamon note; not the Rougui cultivar oolong of Wuyi in Fujian."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火，单株采制。",
        "带肉桂般暖香的凤凰山香型，与福建武夷山的肉桂品种茶是两种茶。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火，單株採製。",
        "帶肉桂般暖香的鳳凰山香型，與福建武夷山的肉桂品種茶是兩種茶。"
      ]
    },
    "ko": {
      "name": "육계향 단총",
      "oneLine": "계피 같은 따뜻한 향신 향이 도는 봉황단총 향형.",
      "oxidation": "약 50%",
      "ratioNote": "개완 120ml에 6g",
      "rounds": "9회 안팎",
      "steepBasis": "98도에서 25초, 2포 20초, 3포 30초. 이후 10초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "찻잎에서 계피(육계)를 닮은 따뜻한 향이 나서 붙은 향형 이름입니다. 푸젠성 무이산의 육계 품종으로 만드는 우롱차와는 산지도 품종도 다른 차입니다.",
      "flavor": "계피와 따뜻한 향신료 향, 배화에서 오는 은은한 구수함, 진한 몸통과 긴 여운.",
      "pairing": "기름진 중식, 구운 고기. 따뜻한 향이 느끼함을 잡아 줍니다.",
      "brewTip": "98도. 배화가 있는 편이라 첫 포는 짧게, 뒤로 갈수록 향신 향이 깊어집니다.",
      "keep": "밀봉해 서늘하게. 향신 향이 다른 차에 배지 않게 따로 보관합니다.",
      "keywords": "육계향 봉황단총 차오저우 우롱 계피향"
    },
    "en": {
      "name": "Rougui Xiang Dancong",
      "oneLine": "A Phoenix dancong with a warm, cinnamon-like spice note.",
      "oxidation": "about 50%",
      "ratioNote": "6 g in a 120 ml gaiwan",
      "rounds": "around 9 infusions",
      "steepBasis": "98 °C: 25 seconds, then 20, then 30; add 10 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, baked.",
      "story": "An aroma type named for the cinnamon-like warmth in the leaf. It is a different tea from the Rougui cultivar oolong of Wuyi, Fujian — different mountain, different plant.",
      "flavor": "Cinnamon and warm spice over a light roast, full body, a long finish.",
      "pairing": "Rich Chinese dishes, roasted meats; the warm spice cuts grease.",
      "brewTip": "98 °C. Keep the first infusion short; the spice deepens in later steeps.",
      "keep": "Sealed and cool, stored apart so the spice scent does not travel.",
      "keywords": "Rougui Xiang dancong Phoenix oolong Chaozhou cinnamon"
    },
    "zh-CN": {
      "name": "肉桂香单丛",
      "oneLine": "带肉桂暖香的凤凰单丛香型。",
      "oxidation": "约50%",
      "ratioNote": "120毫升盖碗配6克",
      "rounds": "9泡左右",
      "steepBasis": "98度泡25秒，第二泡20秒，第三泡30秒，其后每泡加10秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火。",
      "story": "因茶香似肉桂得名。与福建武夷山以肉桂品种制成的乌龙茶不同，产地与品种都不一样。",
      "flavor": "肉桂与暖香料气，带焙火的微香，汤体厚，余韵长。",
      "pairing": "油腻中餐、烤肉，暖香能解腻。",
      "brewTip": "98度，第一泡宜短，香料感随后几泡渐深。",
      "keep": "密封阴凉，单独存放以免串味。",
      "keywords": "肉桂香 单丛 潮州 凤凰 乌龙"
    },
    "zh-TW": {
      "name": "肉桂香單叢",
      "oneLine": "帶肉桂暖香的鳳凰單叢香型。",
      "oxidation": "約50%",
      "ratioNote": "120毫升蓋碗配6克",
      "rounds": "9泡左右",
      "steepBasis": "98度泡25秒，第二泡20秒，第三泡30秒，其後每泡加10秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火。",
      "story": "因茶香似肉桂得名。與福建武夷山以肉桂品種製成的烏龍茶不同，產地與品種都不一樣。",
      "flavor": "肉桂與暖香料氣，帶焙火的微香，湯體厚，餘韻長。",
      "pairing": "油膩中餐、烤肉，暖香能解膩。",
      "brewTip": "98度，第一泡宜短，香料感隨後幾泡漸深。",
      "keep": "密封陰涼，單獨存放以免串味。",
      "keywords": "肉桂香 單叢 潮州 鳳凰 烏龍"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-guihua",
    "group": "oolong",
    "kind": "tea",
    "hanja": "桂",
    "sub": "Guihua Xiang Dancong",
    "alias": [
      "계화향",
      "桂花香",
      "구이화샹 단총",
      "계화향단총"
    ],
    "hz": "桂花香單叢",
    "hs": "桂花香单丛",
    "rom": "Guihua Xiang Dancong",
    "temp": 95,
    "tempRange": "95~100℃",
    "leaf": "5g",
    "water": "120ml",
    "steeps": [
      20,
      15,
      20
    ],
    "maxSteep": 8,
    "oxidationValue": 35,
    "traits": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화. 단일 나무의 잎만으로 따로 만듭니다.",
        "금목서(계화) 꽃 같은 향이 찻잎 자체에서 나는 천연 향형입니다. 계화꽃을 섞어 가향한 블렌딩 '계화우롱'과는 다른 차입니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, lightly baked — made from a single bush only.",
        "A natural aroma type: the osmanthus scent is in the leaf itself, unlike scented 'osmanthus oolong' blends made with real flowers."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火，单株采制。",
        "桂花香来自茶叶本身，是天然香型，与掺桂花窨制的“桂花乌龙”拼配茶不同。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火，單株採製。",
        "桂花香來自茶葉本身，是天然香型，與摻桂花窨製的「桂花烏龍」拼配茶不同。"
      ]
    },
    "ko": {
      "name": "계화향 단총",
      "oneLine": "금목서 꽃 같은 향이 찻잎에서 저절로 나는 봉황단총 향형.",
      "oxidation": "약 35%",
      "ratioNote": "개완 120ml에 5g",
      "rounds": "8회 안팎",
      "steepBasis": "95도에서 20초, 2포 15초, 3포 20초. 이후 5초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
      "story": "계화꽃을 섞어 향을 입힌 블렌딩 '계화우롱'과 달리, 계화향 단총은 꽃을 전혀 넣지 않고 찻잎 자체에서 금목서 같은 향이 나는 향형입니다.",
      "flavor": "금목서의 달콤한 꽃향에 살구 같은 과일 향이 겹치고, 몸통은 가벼우며 여운이 맑습니다.",
      "pairing": "계화 떡 같은 담백한 꽃 디저트, 가벼운 과일. 진한 음식과는 향이 묻힙니다.",
      "brewTip": "95도. 배화가 가벼워 향이 섬세하니 너무 뜨겁거나 길게 우리지 마세요.",
      "keep": "밀봉해 서늘하게. 꽃향은 냄새를 잘 흡수하니 향신료와 떨어뜨려 둡니다.",
      "keywords": "계화향 봉황단총 차오저우 우롱 금목서향"
    },
    "en": {
      "name": "Guihua Xiang Dancong",
      "oneLine": "A Phoenix dancong whose osmanthus scent comes from the leaf itself.",
      "oxidation": "about 35%",
      "ratioNote": "5 g in a 120 ml gaiwan",
      "rounds": "around 8 infusions",
      "steepBasis": "95 °C: 20 seconds, then 15, then 20; add 5 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, lightly baked.",
      "story": "Unlike blended 'osmanthus oolong', which is scented with real flowers, this dancong carries its osmanthus-like aroma naturally in the leaf — no flowers are added.",
      "flavor": "Sweet osmanthus blossom over an apricot note, light body, a clean finish.",
      "pairing": "Plain osmanthus cakes, light fruit. Heavy food buries the scent.",
      "brewTip": "95 °C; the bake is light and the aroma delicate, so avoid very long steeps.",
      "keep": "Sealed and cool, away from spices — floral leaf absorbs odours easily.",
      "keywords": "Guihua Xiang dancong Phoenix oolong Chaozhou osmanthus"
    },
    "zh-CN": {
      "name": "桂花香单丛",
      "oneLine": "桂花香出自茶叶本身的凤凰单丛香型。",
      "oxidation": "约35%",
      "ratioNote": "120毫升盖碗配5克",
      "rounds": "8泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡20秒，其后每泡加5秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火。",
      "story": "与掺桂花窨制的拼配茶“桂花乌龙”不同，桂花香单丛不加一朵花，香气全在茶叶本身。",
      "flavor": "桂花甜香叠着杏果香，汤体轻，余韵清爽。",
      "pairing": "清淡桂花糕、轻盈水果。重口味食物会盖过花香。",
      "brewTip": "95度，焙火轻、花香细，忌久浸。",
      "keep": "密封阴凉，远离香料以免吸味。",
      "keywords": "桂花香 单丛 潮州 凤凰 乌龙"
    },
    "zh-TW": {
      "name": "桂花香單叢",
      "oneLine": "桂花香出自茶葉本身的鳳凰單叢香型。",
      "oxidation": "約35%",
      "ratioNote": "120毫升蓋碗配5克",
      "rounds": "8泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡20秒，其後每泡加5秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火。",
      "story": "與摻桂花窨製的拼配茶「桂花烏龍」不同，桂花香單叢不加一朵花，香氣全在茶葉本身。",
      "flavor": "桂花甜香疊著杏果香，湯體輕，餘韻清爽。",
      "pairing": "清淡桂花糕、輕盈水果。重口味食物會蓋過花香。",
      "brewTip": "95度，焙火輕、花香細，忌久浸。",
      "keep": "密封陰涼，遠離香料以免吸味。",
      "keywords": "桂花香 單叢 潮州 鳳凰 烏龍"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-zhilan",
    "group": "oolong",
    "kind": "tea",
    "hanja": "芝",
    "sub": "Zhilan Xiang Dancong",
    "alias": [
      "지란향",
      "芝蘭香",
      "즈란샹 단총",
      "지란향단총"
    ],
    "hz": "芝蘭香單叢",
    "hs": "芝兰香单丛",
    "rom": "Zhilan Xiang Dancong",
    "temp": 95,
    "tempRange": "95~100℃",
    "leaf": "5g",
    "water": "120ml",
    "steeps": [
      15,
      15,
      20
    ],
    "maxSteep": 10,
    "oxidationValue": 40,
    "traits": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화. 단일 나무의 잎만으로 따로 만듭니다.",
        "지란(난초의 일종) 같은 우아한 향의 향형으로, 단총 향형 가운데서도 고급으로 꼽힙니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, lightly baked — made from a single bush only.",
        "An elegant orchid-like aroma type, counted among the finer dancong aromas."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火，单株采制。",
        "香似芝兰，清雅高洁，在单丛香型中属上品。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火，單株採製。",
        "香似芝蘭，清雅高潔，在單叢香型中屬上品。"
      ]
    },
    "ko": {
      "name": "지란향 단총",
      "oneLine": "지란 난초 같은 우아한 향, 고급으로 꼽히는 봉황단총 향형.",
      "oxidation": "약 40%",
      "ratioNote": "개완 120ml에 5g",
      "rounds": "10회 안팎",
      "steepBasis": "95도에서 15초, 2포 15초, 3포 20초. 이후 5초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
      "story": "지초와 난초를 아울러 이르는 '지란'은 예부터 고결한 향의 대명사였습니다. 그 향을 닮은 이 향형은 단총 가운데서도 고급으로 꼽힙니다.",
      "flavor": "난초의 청아한 향이 맑게 퍼지고, 단맛이 섬세하며 여운이 길고 깨끗합니다.",
      "pairing": "담백한 떡, 가벼운 과일. 향이 우아해 단독으로 천천히 마시는 편이 어울립니다.",
      "brewTip": "95도. 향을 살리려면 첫 포부터 짧게, 잔을 코에 가까이 대고 향을 먼저 맡으세요.",
      "keep": "밀봉해 서늘하게. 향이 섬세해 소분 보관이 좋습니다.",
      "keywords": "지란향 봉황단총 차오저우 우롱 난초향"
    },
    "en": {
      "name": "Zhilan Xiang Dancong",
      "oneLine": "An elegant orchid-scented dancong, ranked among the finer aroma types.",
      "oxidation": "about 40%",
      "ratioNote": "5 g in a 120 ml gaiwan",
      "rounds": "around 10 infusions",
      "steepBasis": "95 °C: 15 seconds, then 15, then 20; add 5 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, lightly baked.",
      "story": "Zhilan — a pairing of two orchid-family plants — has long stood for noble fragrance in Chinese letters; this aroma type is counted among the finer dancong.",
      "flavor": "Clear, refined orchid aroma, delicate sweetness, a long clean finish.",
      "pairing": "Plain rice cakes, light fruit. Best sipped slowly on its own.",
      "brewTip": "95 °C, short steeps from the first; smell the cup before sipping.",
      "keep": "Sealed and cool; small lots protect the fine aroma.",
      "keywords": "Zhilan Xiang dancong Phoenix oolong Chaozhou orchid"
    },
    "zh-CN": {
      "name": "芝兰香单丛",
      "oneLine": "香似芝兰、清雅高洁的凤凰单丛上品香型。",
      "oxidation": "约40%",
      "ratioNote": "120毫升盖碗配5克",
      "rounds": "10泡左右",
      "steepBasis": "95度泡15秒，第二泡15秒，第三泡20秒，其后每泡加5秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火。",
      "story": "芝兰自古是高洁之香的代称，此香型香似芝兰，在单丛中属上品。",
      "flavor": "兰香清雅，回甘细腻，余韵悠长干净。",
      "pairing": "清淡糕点、轻盈水果。宜单独慢品。",
      "brewTip": "95度短泡，先闻杯香再入口。",
      "keep": "密封阴凉，分小包装保香。",
      "keywords": "芝兰香 单丛 潮州 凤凰 乌龙"
    },
    "zh-TW": {
      "name": "芝蘭香單叢",
      "oneLine": "香似芝蘭、清雅高潔的鳳凰單叢上品香型。",
      "oxidation": "約40%",
      "ratioNote": "120毫升蓋碗配5克",
      "rounds": "10泡左右",
      "steepBasis": "95度泡15秒，第二泡15秒，第三泡20秒，其後每泡加5秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火。",
      "story": "芝蘭自古是高潔之香的代稱，此香型香似芝蘭，在單叢中屬上品。",
      "flavor": "蘭香清雅，回甘細膩，餘韻悠長乾淨。",
      "pairing": "清淡糕點、輕盈水果。宜單獨慢品。",
      "brewTip": "95度短泡，先聞杯香再入口。",
      "keep": "密封陰涼，分小包裝保香。",
      "keywords": "芝蘭香 單叢 潮州 鳳凰 烏龍"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-yelai",
    "group": "oolong",
    "kind": "tea",
    "hanja": "夜",
    "sub": "Yelai Xiang Dancong",
    "alias": [
      "야래향",
      "夜來香",
      "예라이샹 단총",
      "야래향단총"
    ],
    "hz": "夜來香單叢",
    "hs": "夜来香单丛",
    "rom": "Yelai Xiang Dancong",
    "temp": 95,
    "tempRange": "95~100℃",
    "leaf": "6g",
    "water": "120ml",
    "steeps": [
      20,
      15,
      25
    ],
    "maxSteep": 9,
    "oxidationValue": 40,
    "traits": "t-night a-floral b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-high m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화. 단일 나무의 잎만으로 따로 만듭니다.",
        "밤에 향이 짙어지는 야래향 꽃처럼, 달콤한 향이 유난히 짙게 감도는 향형입니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, lightly baked — made from a single bush only.",
        "Named after the night-blooming yelai flower; the sweet scent is unusually dense."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火，单株采制。",
        "如夜来香入夜转浓，此香型甜香格外浓郁。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火，單株採製。",
        "如夜來香入夜轉濃，此香型甜香格外濃郁。"
      ]
    },
    "ko": {
      "name": "야래향 단총",
      "oneLine": "밤꽃처럼 달콤한 향이 짙게 감도는 봉황단총 향형.",
      "oxidation": "약 40%",
      "ratioNote": "개완 120ml에 6g",
      "rounds": "9회 안팎",
      "steepBasis": "95도에서 20초, 2포 15초, 3포 25초. 이후 5~10초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
      "story": "야래향 꽃이 해가 지면 향을 짙게 뿜듯, 이 향형도 달콤한 꽃향이 유난히 짙어 붙은 이름입니다.",
      "flavor": "달콤한 밤꽃 향과 꿀 같은 여운, 중간 몸통. 향이 짙지만 뒷맛은 맑습니다.",
      "pairing": "달콤한 디저트, 열대과일. 저녁 시간에 천천히 마시기 좋습니다.",
      "brewTip": "95도. 향이 짙어 첫 포를 길게 우리면 향에 눌리니 짧게 시작하세요.",
      "keep": "밀봉해 서늘하게. 소분해 두면 짙은 향이 오래갑니다.",
      "keywords": "야래향 봉황단총 차오저우 우롱 밤꽃향"
    },
    "en": {
      "name": "Yelai Xiang Dancong",
      "oneLine": "A Phoenix dancong with a dense, sweet night-flower scent.",
      "oxidation": "about 40%",
      "ratioNote": "6 g in a 120 ml gaiwan",
      "rounds": "around 9 infusions",
      "steepBasis": "95 °C: 20 seconds, then 15, then 25; add 5–10 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, lightly baked.",
      "story": "Named after the yelai flower, whose scent thickens after dark; this aroma type is likewise marked by an unusually dense sweetness.",
      "flavor": "Sweet night-blossom aroma with a honeyed finish, medium body, a clean aftertaste.",
      "pairing": "Sweet desserts, tropical fruit. Suited to slow evening drinking.",
      "brewTip": "95 °C; the scent is strong, so start short rather than steeping long.",
      "keep": "Sealed and cool; small lots keep the dense aroma.",
      "keywords": "Yelai Xiang dancong Phoenix oolong Chaozhou night flower"
    },
    "zh-CN": {
      "name": "夜来香单丛",
      "oneLine": "甜香浓郁如夜来香的凤凰单丛香型。",
      "oxidation": "约40%",
      "ratioNote": "120毫升盖碗配6克",
      "rounds": "9泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡25秒，其后每泡加5~10秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火。",
      "story": "夜来香入夜后香气转浓，此香型甜香格外浓郁，故得此名。",
      "flavor": "甜花香带蜜韵，汤体适中，浓香之后回味干净。",
      "pairing": "甜点、热带水果。适合夜晚慢饮。",
      "brewTip": "95度，香浓宜短泡起步，久浸会被香气压住。",
      "keep": "密封阴凉，分小包装保香。",
      "keywords": "夜来香 单丛 潮州 凤凰 乌龙"
    },
    "zh-TW": {
      "name": "夜來香單叢",
      "oneLine": "甜香濃郁如夜來香的鳳凰單叢香型。",
      "oxidation": "約40%",
      "ratioNote": "120毫升蓋碗配6克",
      "rounds": "9泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡25秒，其後每泡加5~10秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火。",
      "story": "夜來香入夜後香氣轉濃，此香型甜香格外濃郁，故得此名。",
      "flavor": "甜花香帶蜜韻，湯體適中，濃香之後回味乾淨。",
      "pairing": "甜點、熱帶水果。適合夜晚慢飲。",
      "brewTip": "95度，香濃宜短泡起步，久浸會被香氣壓住。",
      "keep": "密封陰涼，分小包裝保香。",
      "keywords": "夜來香 單叢 潮州 鳳凰 烏龍"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-tongtian",
    "group": "oolong",
    "kind": "tea",
    "hanja": "通",
    "sub": "Tongtian Xiang Dancong",
    "alias": [
      "통천향",
      "通天香",
      "퉁톈샹 단총",
      "통천향단총"
    ],
    "hz": "通天香單叢",
    "hs": "通天香单丛",
    "rom": "Tongtian Xiang Dancong",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "5g",
    "water": "120ml",
    "steeps": [
      15,
      10,
      15
    ],
    "maxSteep": 10,
    "oxidationValue": 35,
    "traits": "t-afternoon a-floral b-medium k-crisp r-clean s-hot w-gongfu p-solo c-high m-energy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화. 단일 나무의 잎만으로 따로 만듭니다.",
        "'하늘에 닿는다'고 할 만큼 향이 높고 강하게 솟는 향형이라 붙은 이름입니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, lightly baked — made from a single bush only.",
        "Named 'reaching the sky' for an aroma that rises unusually high and strong."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火，单株采制。",
        "香气高扬冲天，故名通天香。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火，單株採製。",
        "香氣高揚衝天，故名通天香。"
      ]
    },
    "ko": {
      "name": "통천향 단총",
      "oneLine": "향이 하늘까지 솟는다고 할 만큼 높고 강한 봉황단총 향형.",
      "oxidation": "약 35%",
      "ratioNote": "개완 120ml에 5g",
      "rounds": "10회 안팎",
      "steepBasis": "98도에서 15초, 2포 10초, 3포 15초. 이후 5초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
      "story": "향이 어찌나 높고 강하게 치솟는지 '하늘에 닿는다'는 뜻의 통천(通天)이라는 이름이 붙은 향형입니다.",
      "flavor": "첫 포부터 꽃향이 강하게 치고 오르고, 맛은 또렷하고 상쾌하며 여운이 맑습니다.",
      "pairing": "담백한 과자, 가벼운 과일. 향이 강해 음식 없이 향 자체를 즐기는 편이 낫습니다.",
      "brewTip": "98도. 향이 강하니 첫 포는 특히 짧게. 뚜껑 잔에 코를 대면 솟는 향이 또렷합니다.",
      "keep": "밀봉해 서늘하게. 높은 향은 휘발이 빠르니 소분합니다.",
      "keywords": "통천향 봉황단총 차오저우 우롱 고향"
    },
    "en": {
      "name": "Tongtian Xiang Dancong",
      "oneLine": "A Phoenix dancong whose aroma rises high and strong — 'reaching the sky'.",
      "oxidation": "about 35%",
      "ratioNote": "5 g in a 120 ml gaiwan",
      "rounds": "around 10 infusions",
      "steepBasis": "98 °C: 15 seconds, then 10, then 15; add 5 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, lightly baked.",
      "story": "The name Tongtian, 'reaching the sky', was given because the aroma leaps up higher and stronger than other aroma types.",
      "flavor": "Floral aroma surging from the first infusion, a bright crisp taste, a clean finish.",
      "pairing": "Plain cakes, light fruit. The aroma is the main event — best with little or no food.",
      "brewTip": "98 °C; keep the first steep especially short, and smell the gaiwan lid for the rising scent.",
      "keep": "Sealed and cool; high aromatics fade fast, so store in small lots.",
      "keywords": "Tongtian Xiang dancong Phoenix oolong Chaozhou high aroma"
    },
    "zh-CN": {
      "name": "通天香单丛",
      "oneLine": "香气高扬冲天的凤凰单丛香型。",
      "oxidation": "约35%",
      "ratioNote": "120毫升盖碗配5克",
      "rounds": "10泡左右",
      "steepBasis": "98度泡15秒，第二泡10秒，第三泡15秒，其后每泡加5秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火。",
      "story": "因香气高扬强劲、仿佛直通天际而得名。",
      "flavor": "第一泡花香即冲鼻，滋味鲜爽，余韵干净。",
      "pairing": "清淡糕点、轻盈水果。香气为主角，宜少配食物。",
      "brewTip": "98度，第一泡尤其要短，闻盖香最能感受其高扬。",
      "keep": "密封阴凉，高香易散，分小包装保存。",
      "keywords": "通天香 单丛 潮州 凤凰 乌龙 高香"
    },
    "zh-TW": {
      "name": "通天香單叢",
      "oneLine": "香氣高揚衝天的鳳凰單叢香型。",
      "oxidation": "約35%",
      "ratioNote": "120毫升蓋碗配5克",
      "rounds": "10泡左右",
      "steepBasis": "98度泡15秒，第二泡10秒，第三泡15秒，其後每泡加5秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火。",
      "story": "因香氣高揚強勁、彷彿直通天際而得名。",
      "flavor": "第一泡花香即衝鼻，滋味鮮爽，餘韻乾淨。",
      "pairing": "清淡糕點、輕盈水果。香氣為主角，宜少配食物。",
      "brewTip": "98度，第一泡尤其要短，聞蓋香最能感受其高揚。",
      "keep": "密封陰涼，高香易散，分小包裝保存。",
      "keywords": "通天香 單叢 潮州 鳳凰 烏龍 高香"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-youhua",
    "group": "oolong",
    "kind": "tea",
    "hanja": "柚",
    "sub": "Youhua Xiang Dancong",
    "alias": [
      "유화향",
      "柚花香",
      "유화샹 단총",
      "유화향단총"
    ],
    "hz": "柚花香單叢",
    "hs": "柚花香单丛",
    "rom": "Youhua Xiang Dancong",
    "temp": 95,
    "tempRange": "95~100℃",
    "leaf": "5g",
    "water": "120ml",
    "steeps": [
      20,
      15,
      20
    ],
    "maxSteep": 8,
    "oxidationValue": 35,
    "traits": "t-morning t-afternoon a-floral a-fruit b-light k-crisp r-clean s-hot w-gongfu p-solo c-mid m-refresh",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화. 단일 나무의 잎만으로 따로 만듭니다.",
        "봄에 피는 유자꽃 같은 상큼한 꽃향에서 이름이 온 향형입니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, lightly baked — made from a single bush only.",
        "Named for a fresh pomelo-blossom scent, like the flowers that open in spring."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火，单株采制。",
        "香似春天柚花，清新爽朗，故得名。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火，單株採製。",
        "香似春天柚花，清新爽朗，故得名。"
      ]
    },
    "ko": {
      "name": "유화향 단총",
      "oneLine": "유자꽃 같은 상큼한 꽃향의 봉황단총 향형.",
      "oxidation": "약 35%",
      "ratioNote": "개완 120ml에 5g",
      "rounds": "8회 안팎",
      "steepBasis": "95도에서 20초, 2포 15초, 3포 20초. 이후 5초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
      "story": "봄에 피는 유자꽃의 맑고 상큼한 향을 닮아 붙은 이름입니다. 단총 향형 가운데 가볍고 산뜻한 축에 듭니다.",
      "flavor": "유자꽃과 감귤꽃 같은 상큼한 꽃향, 가벼운 몸통과 또렷한 단맛, 맑은 여운.",
      "pairing": "감귤류 디저트, 가벼운 과일. 상큼한 향이 달지 않은 과자와도 잘 맞습니다.",
      "brewTip": "95도. 상큼한 향이 위에 뜨니 짧게 우리고, 식으면 향이 처지니 따뜻할 때 마시세요.",
      "keep": "밀봉해 서늘하게. 꽃향 보존을 위해 소분합니다.",
      "keywords": "유화향 봉황단총 차오저우 우롱 유자꽃향"
    },
    "en": {
      "name": "Youhua Xiang Dancong",
      "oneLine": "A Phoenix dancong with a fresh pomelo-blossom scent.",
      "oxidation": "about 35%",
      "ratioNote": "5 g in a 120 ml gaiwan",
      "rounds": "around 8 infusions",
      "steepBasis": "95 °C: 20 seconds, then 15, then 20; add 5 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, lightly baked.",
      "story": "Named for its likeness to pomelo blossom, the clear, citrusy flower of spring; one of the lighter, brighter dancong aroma types.",
      "flavor": "Pomelo and citrus blossom, light body, a distinct sweetness and a clean finish.",
      "pairing": "Citrus desserts, light fruit; the fresh scent also suits unsweetened cakes.",
      "brewTip": "95 °C, short steeps; drink it warm, as the bright top notes sink as it cools.",
      "keep": "Sealed and cool; small lots protect the floral aroma.",
      "keywords": "Youhua Xiang dancong Phoenix oolong Chaozhou pomelo blossom"
    },
    "zh-CN": {
      "name": "柚花香单丛",
      "oneLine": "香似柚花、清新爽朗的凤凰单丛香型。",
      "oxidation": "约35%",
      "ratioNote": "120毫升盖碗配5克",
      "rounds": "8泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡20秒，其后每泡加5秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火。",
      "story": "因香似春天盛开的柚花而得名，在单丛香型中属轻盈清爽一类。",
      "flavor": "柚花与柑橘花般的清新花香，汤体轻，甜味分明，余韵干净。",
      "pairing": "柑橘类甜点、轻盈水果，也配不甜的糕点。",
      "brewTip": "95度短泡，趁热饮，凉后清香会下沉。",
      "keep": "密封阴凉，分小包装保香。",
      "keywords": "柚花香 单丛 潮州 凤凰 乌龙"
    },
    "zh-TW": {
      "name": "柚花香單叢",
      "oneLine": "香似柚花、清新爽朗的鳳凰單叢香型。",
      "oxidation": "約35%",
      "ratioNote": "120毫升蓋碗配5克",
      "rounds": "8泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡20秒，其後每泡加5秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火。",
      "story": "因香似春天盛開的柚花而得名，在單叢香型中屬輕盈清爽一類。",
      "flavor": "柚花與柑橘花般的清新花香，湯體輕，甜味分明，餘韻乾淨。",
      "pairing": "柑橘類甜點、輕盈水果，也配不甜的糕點。",
      "brewTip": "95度短泡，趁熱飲，涼後清香會下沉。",
      "keep": "密封陰涼，分小包裝保香。",
      "keywords": "柚花香 單叢 潮州 鳳凰 烏龍"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-songzhong",
    "group": "oolong",
    "kind": "tea",
    "hanja": "宋",
    "sub": "Song Zhong Dancong",
    "alias": [
      "송종",
      "宋種",
      "동방홍 단총",
      "쑹중 단총",
      "송종단총"
    ],
    "hz": "宋種單叢",
    "hs": "宋种单丛",
    "rom": "Song Zhong Dancong",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "6g",
    "water": "120ml",
    "steeps": [
      25,
      20,
      25
    ],
    "maxSteep": 10,
    "oxidationValue": 45,
    "traits": "t-afternoon t-night a-floral a-roast b-full k-sweet r-clean s-hot w-gongfu p-solo c-high m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 오래된 모수 계통의 잎으로 만듭니다.",
        "송나라 때부터 이어졌다고 전하는 노수 계통으로, 한때 '동방홍(東方紅)'이라는 이름으로도 불렸습니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, baked — made from an old mother-bush lineage.",
        "Said to descend from plantings of the Song dynasty; it was also once called Dongfang Hong, 'the East is Red'."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火，取老母树系的茶青制作。",
        "相传源自宋代栽种的老丛，曾一度改称“东方红”。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火，取老母樹系的茶青製作。",
        "相傳源自宋代栽種的老叢，曾一度改稱「東方紅」。"
      ]
    },
    "ko": {
      "name": "송종 단총",
      "oneLine": "송대부터 이어졌다고 전하는 노수 계통의 봉황단총.",
      "oxidation": "약 45%",
      "ratioNote": "개완 120ml에 6g",
      "rounds": "10회 안팎",
      "steepBasis": "98도에서 25초, 2포 20초, 3포 25초. 이후 10초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산 오동 일대, 해발 1,000m 안팎의 고지.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "송나라 때 봉황산에 심긴 차나무에서 이어졌다고 전하는 오래된 모수 계통입니다. 한때 '동방홍(東方紅)'이라는 이름으로도 불렸고, 수령 높은 나무에서 나오는 차라 생산량이 적습니다.",
      "flavor": "깊은 꽃향 아래 묵직한 단맛과 노수 특유의 진한 몸통이 깔리고, 여운이 깁니다.",
      "pairing": "담백한 과자, 견과류. 향과 몸통이 진해 단독으로 천천히 마시기 좋습니다.",
      "brewTip": "98도. 노수 잎은 뒤 포까지 힘이 남으니 10포 안팎으로 길게 즐기세요.",
      "keep": "밀봉해 서늘하게. 귀한 차라 소분해 두고 향을 지킵니다.",
      "keywords": "송종 봉황단총 차오저우 우롱 노수 동방홍"
    },
    "en": {
      "name": "Song Zhong Dancong",
      "oneLine": "An old-bush dancong lineage said to reach back to the Song dynasty.",
      "oxidation": "about 45%",
      "ratioNote": "6 g in a 120 ml gaiwan",
      "rounds": "around 10 infusions",
      "steepBasis": "98 °C: 25 seconds, then 20, then 25; add 10 seconds after that.",
      "origin": "Wudong area of Phoenix Mountain, Chaozhou, Guangdong, around 1,000 m.",
      "process": "Withered, shaken, fired, rolled, dried, baked.",
      "story": "A mother-bush lineage said to descend from tea planted on Phoenix Mountain in the Song dynasty. It was also once called Dongfang Hong; yields from such old trees are small.",
      "flavor": "Deep floral aroma over a weighty sweetness and the full body of old-bush leaf, with a long finish.",
      "pairing": "Plain cakes, nuts. Rich enough to drink slowly on its own.",
      "brewTip": "98 °C; old-bush leaf keeps its strength late, so take it to about ten infusions.",
      "keep": "Sealed and cool; store this scarce tea in small lots.",
      "keywords": "Song Zhong dancong Phoenix oolong Chaozhou old bush Dongfang Hong"
    },
    "zh-CN": {
      "name": "宋种单丛",
      "oneLine": "相传源自宋代的老丛系凤凰单丛。",
      "oxidation": "约45%",
      "ratioNote": "120毫升盖碗配6克",
      "rounds": "10泡左右",
      "steepBasis": "98度泡25秒，第二泡20秒，第三泡25秒，其后每泡加10秒。",
      "origin": "广东潮州凤凰山乌岽一带，海拔1000米上下。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火。",
      "story": "相传源自宋代在凤凰山栽种的茶树母系，曾一度改称“东方红”，老树产量稀少。",
      "flavor": "花香深沉，甜味厚重，带老丛的饱满汤体，余韵悠长。",
      "pairing": "清淡糕点、坚果。适合单独慢品。",
      "brewTip": "98度，老丛耐泡，可冲至十泡上下。",
      "keep": "密封阴凉，分小包装珍藏保香。",
      "keywords": "宋种 单丛 潮州 凤凰 乌龙 老丛 东方红"
    },
    "zh-TW": {
      "name": "宋種單叢",
      "oneLine": "相傳源自宋代的老叢系鳳凰單叢。",
      "oxidation": "約45%",
      "ratioNote": "120毫升蓋碗配6克",
      "rounds": "10泡左右",
      "steepBasis": "98度泡25秒，第二泡20秒，第三泡25秒，其後每泡加10秒。",
      "origin": "廣東潮州鳳凰山烏崬一帶，海拔1000米上下。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火。",
      "story": "相傳源自宋代在鳳凰山栽種的茶樹母系，曾一度改稱「東方紅」，老樹產量稀少。",
      "flavor": "花香深沉，甜味厚重，帶老叢的飽滿湯體，餘韻悠長。",
      "pairing": "清淡糕點、堅果。適合單獨慢品。",
      "brewTip": "98度，老叢耐泡，可沖至十泡上下。",
      "keep": "密封陰涼，分小包裝珍藏保香。",
      "keywords": "宋種 單叢 潮州 鳳凰 烏龍 老叢 東方紅"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-baxian",
    "group": "oolong",
    "kind": "tea",
    "hanja": "八",
    "sub": "Baxian Dancong",
    "alias": [
      "팔선",
      "八仙",
      "빠셴 단총",
      "팔선단총"
    ],
    "hz": "八仙單叢",
    "hs": "八仙单丛",
    "rom": "Baxian Dancong",
    "temp": 95,
    "tempRange": "95~100℃",
    "leaf": "6g",
    "water": "120ml",
    "steeps": [
      20,
      15,
      20
    ],
    "maxSteep": 9,
    "oxidationValue": 40,
    "traits": "t-afternoon a-floral b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화. 잎이 크고 부드러운 품종으로 만듭니다.",
        "여덟 신선(八仙) 전설에서 이름이 왔다고 전하는 향형입니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, lightly baked — from a large, soft-leaved bush type.",
        "The name is said to come from the legend of the Eight Immortals."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火，叶片大而柔软。",
        "名字相传来自八仙的传说。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火，葉片大而柔軟。",
        "名字相傳來自八仙的傳說。"
      ]
    },
    "ko": {
      "name": "팔선 단총",
      "oneLine": "잎이 크고 부드러운, 여덟 신선 전설을 이름에 단 봉황단총.",
      "oxidation": "약 40%",
      "ratioNote": "개완 120ml에 6g",
      "rounds": "9회 안팎",
      "steepBasis": "95도에서 20초, 2포 15초, 3포 20초. 이후 5초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 가벼운 배화.",
      "story": "잎이 크고 부드러운 품종으로, 이름은 여덟 신선(八仙) 전설에서 왔다고 전합니다. 봉황산에서 널리 심는 향형 가운데 하나입니다.",
      "flavor": "부드럽고 맑은 꽃향, 잎이 커서 넉넉하게 우러나고 맛이 순하며 단맛이 고르게 갑니다.",
      "pairing": "가벼운 디저트, 담백한 찹쌀떡. 순한 맛이라 다양한 간식과 무난합니다.",
      "brewTip": "95도. 잎이 커 개완에 넉넉히 차니 물을 부을 때 잎이 잠기게 하세요.",
      "keep": "밀봉해 서늘하게. 소분해 두면 꽃향이 오래갑니다.",
      "keywords": "팔선 봉황단총 차오저우 우롱 팔선과해"
    },
    "en": {
      "name": "Baxian Dancong",
      "oneLine": "A large, soft-leaved dancong named for the Eight Immortals.",
      "oxidation": "about 40%",
      "ratioNote": "6 g in a 120 ml gaiwan",
      "rounds": "around 9 infusions",
      "steepBasis": "95 °C: 20 seconds, then 15, then 20; add 5 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, lightly baked.",
      "story": "A large, soft-leaved type whose name is said to come from the legend of the Eight Immortals; widely planted on Phoenix Mountain.",
      "flavor": "Soft, clear floral aroma; the big leaves give generously, with an even, gentle sweetness.",
      "pairing": "Light desserts, plain glutinous-rice cakes. Its mildness suits most snacks.",
      "brewTip": "95 °C; the large leaves fill the gaiwan, so pour to submerge them fully.",
      "keep": "Sealed and cool; small lots keep the floral scent.",
      "keywords": "Baxian dancong Phoenix oolong Chaozhou Eight Immortals"
    },
    "zh-CN": {
      "name": "八仙单丛",
      "oneLine": "叶片大而柔软、名字源于八仙传说的凤凰单丛。",
      "oxidation": "约40%",
      "ratioNote": "120毫升盖碗配6克",
      "rounds": "9泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡20秒，其后每泡加5秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 轻焙火。",
      "story": "此品种叶片大而柔软，名字相传来自八仙传说，是凤凰山广植的香型之一。",
      "flavor": "花香柔和清亮，叶片大、出汤足，滋味温润，甜味均匀。",
      "pairing": "轻盈甜点、清淡糯米糕。味道温和，百搭。",
      "brewTip": "95度，叶片大占碗，注水要没过茶叶。",
      "keep": "密封阴凉，分小包装保香。",
      "keywords": "八仙 单丛 潮州 凤凰 乌龙"
    },
    "zh-TW": {
      "name": "八仙單叢",
      "oneLine": "葉片大而柔軟、名字源於八仙傳說的鳳凰單叢。",
      "oxidation": "約40%",
      "ratioNote": "120毫升蓋碗配6克",
      "rounds": "9泡左右",
      "steepBasis": "95度泡20秒，第二泡15秒，第三泡20秒，其後每泡加5秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 輕焙火。",
      "story": "此品種葉片大而柔軟，名字相傳來自八仙傳說，是鳳凰山廣植的香型之一。",
      "flavor": "花香柔和清亮，葉片大、出湯足，滋味溫潤，甜味均勻。",
      "pairing": "輕盈甜點、清淡糯米糕。味道溫和，百搭。",
      "brewTip": "95度，葉片大佔碗，注水要沒過茶葉。",
      "keep": "密封陰涼，分小包裝保香。",
      "keywords": "八仙 單叢 潮州 鳳凰 烏龍"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-dancong-dawuye",
    "group": "oolong",
    "kind": "tea",
    "hanja": "大",
    "sub": "Da Wu Ye Dancong",
    "alias": [
      "대오엽",
      "大烏葉",
      "다우예 단총",
      "대오엽단총"
    ],
    "hz": "大烏葉單叢",
    "hs": "大乌叶单丛",
    "rom": "Da Wu Ye Dancong",
    "temp": 98,
    "tempRange": "95~100℃",
    "leaf": "6g",
    "water": "120ml",
    "steeps": [
      25,
      20,
      30
    ],
    "maxSteep": 10,
    "oxidationValue": 50,
    "traits": "t-afternoon t-night a-floral a-roast b-full k-sweet r-clean s-hot s-iced w-gongfu p-meal c-high m-energy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조 → 배화. 잎이 크고 짙은 오엽 계통으로 만듭니다.",
        "향과 맛이 진해 차오저우에서는 진하게 우린 농차로, 또 차게 식혀 마시기도 합니다."
      ],
      "en": [
        "Withered, shaken, fired, rolled, dried, baked — from the large, dark-leaved Wuye line.",
        "Strong in aroma and body; in Chaozhou it is also brewed thick and strong, or drunk cold."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火，取大乌叶系茶青制作。",
        "香气与滋味都浓，潮州人也爱泡成浓茶，或放凉冷饮。"
      ],
      "zh-TW": [
        "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火，取大烏葉系茶青製作。",
        "香氣與滋味都濃，潮州人也愛泡成濃茶，或放涼冷飲。"
      ]
    },
    "ko": {
      "name": "대오엽 단총",
      "oneLine": "잎이 크고 짙은 오엽 계통, 진한 향과 강한 바디의 봉황단총.",
      "oxidation": "약 50%",
      "ratioNote": "개완 120ml에 6g",
      "rounds": "10회 안팎",
      "steepBasis": "98도에서 25초, 2포 20초, 3포 30초. 이후 10초씩 늘립니다.",
      "origin": "광둥성 차오저우 봉황산, 해발 600~1,200m.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조 → 배화.",
      "story": "잎이 크고 색이 짙어 '검을 오(烏)'를 붙여 대오엽이라 부르는 계통입니다. 향과 맛이 진해 차오저우에서는 진하게 우려 마시는 농차의 재료로도 즐깁니다.",
      "flavor": "진한 꽃향과 묵직한 몸통, 쓴맛 뒤에 오는 강한 단맛의 회감. 진하게 우린 뒤 얼음을 타도 향이 무너지지 않습니다.",
      "pairing": "기름진 중식, 진한 간식. 강한 맛이 음식에 밀리지 않습니다.",
      "brewTip": "98도. 진하게 즐기려면 잎을 넉넉히 넣고 짧게, 아이스로는 농차로 우린 뒤 얼음에 붓습니다.",
      "keep": "밀봉해 서늘하게. 배화 향 보존을 위해 소분합니다.",
      "keywords": "대오엽 봉황단총 차오저우 우롱 농차"
    },
    "en": {
      "name": "Da Wu Ye Dancong",
      "oneLine": "A big, dark-leaved dancong line with strong aroma and body.",
      "oxidation": "about 50%",
      "ratioNote": "6 g in a 120 ml gaiwan",
      "rounds": "around 10 infusions",
      "steepBasis": "98 °C: 25 seconds, then 20, then 30; add 10 seconds after that.",
      "origin": "Phoenix Mountain, Chaozhou, Guangdong, 600–1,200 m.",
      "process": "Withered, shaken, fired, rolled, dried, baked.",
      "story": "Named Da Wu Ye, 'big dark leaf', for its large, deep-coloured leaves. Its strength also makes it a Chaozhou favourite for thick, strong brews.",
      "flavor": "Dense floral aroma, heavy body, a strong sweet return after the bitter edge; brewed thick, it holds up over ice.",
      "pairing": "Rich Chinese dishes, hearty snacks; its strength stands up to food.",
      "brewTip": "98 °C. For a strong cup use plenty of leaf and short steeps; for iced tea, brew thick and pour over ice.",
      "keep": "Sealed and cool; small lots protect the baked aroma.",
      "keywords": "Da Wu Ye dancong Phoenix oolong Chaozhou strong brew"
    },
    "zh-CN": {
      "name": "大乌叶单丛",
      "oneLine": "叶片大而色深、香浓体强的凤凰单丛品系。",
      "oxidation": "约50%",
      "ratioNote": "120毫升盖碗配6克",
      "rounds": "10泡左右",
      "steepBasis": "98度泡25秒，第二泡20秒，第三泡30秒，其后每泡加10秒。",
      "origin": "广东潮州凤凰山，海拔600~1200米。",
      "process": "萎凋 → 摇青 → 炒青 → 揉捻 → 干燥 → 焙火。",
      "story": "因叶片大、色泽深乌而得名。香气滋味浓烈，也是潮州人泡浓茶的常用茶。",
      "flavor": "花香浓郁，汤体厚重，苦后回甘强；泡浓后加冰香气也不散。",
      "pairing": "油腻中餐、浓味小食，茶味不输食物。",
      "brewTip": "98度，多投茶短泡出浓汤；冷饮先泡浓再倒冰上。",
      "keep": "密封阴凉，分小包装保焙火香。",
      "keywords": "大乌叶 单丛 潮州 凤凰 乌龙 浓茶"
    },
    "zh-TW": {
      "name": "大烏葉單叢",
      "oneLine": "葉片大而色深、香濃體強的鳳凰單叢品系。",
      "oxidation": "約50%",
      "ratioNote": "120毫升蓋碗配6克",
      "rounds": "10泡左右",
      "steepBasis": "98度泡25秒，第二泡20秒，第三泡30秒，其後每泡加10秒。",
      "origin": "廣東潮州鳳凰山，海拔600~1200米。",
      "process": "萎凋 → 搖青 → 炒青 → 揉捻 → 乾燥 → 焙火。",
      "story": "因葉片大、色澤深烏而得名。香氣滋味濃烈，也是潮州人泡濃茶的常用茶。",
      "flavor": "花香濃郁，湯體厚重，苦後回甘強；泡濃後加冰香氣也不散。",
      "pairing": "油膩中餐、濃味小食，茶味不輸食物。",
      "brewTip": "98度，多投茶短泡出濃湯；冷飲先泡濃再倒冰上。",
      "keep": "密封陰涼，分小包裝保焙火香。",
      "keywords": "大烏葉 單叢 潮州 鳳凰 烏龍 濃茶"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "oolong-assam",
    "group": "oolong",
    "kind": "tea",
    "hanja": "烏",
    "sub": "Assam Oolong",
    "alias": [
      "아삼 우롱",
      "아쌈 우롱",
      "Assam Oolong",
      "阿薩姆烏龍"
    ],
    "hz": "阿薩姆烏龍",
    "hs": "阿萨姆乌龙",
    "rom": "Assam Oolong",
    "temp": 95,
    "tempRange": "90~95℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      60,
      45,
      60
    ],
    "maxSteep": 5,
    "oxidationValue": 40,
    "traits": "t-morning t-afternoon a-malt a-roast b-full k-sweet r-clean s-hot s-milk w-gongfu p-meal c-high m-energy",
    "originCountry": {
      "ko": "인도",
      "en": "India",
      "zh-CN": "印度",
      "zh-TW": "印度"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조. 홍차용 대엽종을 반발효에서 멈춘 우롱입니다.",
        "아쌈의 다원들이 대엽종의 향을 살리려 소량으로 만들기 시작한 비교적 새로운 스타일입니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying — black-tea leaf stopped at half oxidation.",
        "A newer style made in small lots by Assam gardens to show what the large leaf can do."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥。红茶用大叶种停在半发酵的乌龙。",
        "阿萨姆茶园为了展现大叶种香气而少量制作的新式乌龙。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥。紅茶用大葉種停在半發酵的烏龍。",
        "阿薩姆茶園為了展現大葉種香氣而少量製作的新式烏龍。"
      ]
    },
    "ko": {
      "name": "아삼 우롱",
      "oneLine": "아삼 대엽종에 우롱 제법을 입힌 차 — 몰트감 위에 우롱의 향.",
      "oxidation": "약 40%",
      "ratioNote": "150ml에 5g",
      "rounds": "5회",
      "steepBasis": "95도에서 1분, 2포 45초, 3포 1분. 잎이 커서 첫 포를 짧게 잡지 않습니다.",
      "origin": "인도 아쌈, 브라마푸트라강 유역의 대엽종 차밭.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조. 홍차로 만들 잎을 반발효에서 멈춰 우롱으로 만듭니다.",
      "story": "아쌈은 홍차와 CTC의 본고장이지만, 대엽종의 향을 살리려는 다원에서 반발효 우롱도 소량 만듭니다.",
      "flavor": "몰트와 꿀, 구운 곡물에 우롱 특유의 꽃향이 겹칩니다. 바디는 두껍습니다.",
      "pairing": "버터 토스트, 구운 고기, 진한 치즈.",
      "brewTip": "95도. 우유를 조금 넣어도 몰트감이 남습니다.",
      "keep": "밀봉해 서늘하고 건조하게. 개봉 후 두 달 안.",
      "keywords": "아삼 우롱 인도 대엽종 반발효 몰트"
    },
    "en": {
      "name": "Assam Oolong",
      "oneLine": "Assamica leaf made as oolong — malt under an oolong aroma.",
      "oxidation": "About 40%",
      "ratioNote": "5 g to 150 ml",
      "rounds": "5 infusions",
      "steepBasis": "95 °C for 1 minute, then 45 seconds, then 1 minute. The big leaf needs a full first steep.",
      "origin": "Assam, India — large-leaf gardens along the Brahmaputra.",
      "process": "Withering → bruising → firing → rolling → drying; leaf bound for black tea is stopped at half oxidation.",
      "story": "Assam is the home of black tea and CTC, but some gardens make small lots of half-oxidised oolong to show the leaf's aroma.",
      "flavor": "Malt, honey and roasted grain with an oolong floral lift; a thick body.",
      "pairing": "Buttered toast, grilled meat, strong cheese.",
      "brewTip": "95 °C. A little milk still leaves the malt standing.",
      "keep": "Sealed, cool and dry; within two months of opening.",
      "keywords": "Assam oolong India assamica half-oxidised malt"
    },
    "zh-CN": {
      "name": "阿萨姆乌龙",
      "oneLine": "阿萨姆大叶种按乌龙工艺制作——麦芽香里带乌龙的香气。",
      "oxidation": "约40%",
      "ratioNote": "150毫升配5克",
      "rounds": "5泡",
      "steepBasis": "95度泡1分钟，第二泡45秒，第三泡1分钟。叶片大，第一泡不要太短。",
      "origin": "印度阿萨姆，布拉马普特拉河流域的大叶种茶园。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥。把做红茶的叶子停在半发酵做成乌龙。",
      "story": "阿萨姆是红茶与CTC的故乡，也有茶园少量制作半发酵乌龙，展现大叶种的香气。",
      "flavor": "麦芽、蜂蜜与烤谷物，叠着乌龙的花香，汤体厚。",
      "pairing": "黄油吐司、烤肉、浓味奶酪。",
      "brewTip": "95度。加一点牛奶也压不住麦芽香。",
      "keep": "密封、阴凉干燥，开封后两个月内。",
      "keywords": "阿萨姆乌龙 印度 大叶种 半发酵 麦芽"
    },
    "zh-TW": {
      "name": "阿薩姆烏龍",
      "oneLine": "阿薩姆大葉種按烏龍工藝製作——麥芽香裡帶烏龍的香氣。",
      "oxidation": "約40%",
      "ratioNote": "150毫升配5公克",
      "rounds": "5泡",
      "steepBasis": "95度泡1分鐘，第二泡45秒，第三泡1分鐘。葉片大，第一泡不要太短。",
      "origin": "印度阿薩姆，布拉馬普特拉河流域的大葉種茶園。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥。把做紅茶的葉子停在半發酵做成烏龍。",
      "story": "阿薩姆是紅茶與CTC的故鄉，也有茶園少量製作半發酵烏龍，展現大葉種的香氣。",
      "flavor": "麥芽、蜂蜜與烤穀物，疊著烏龍的花香，湯體厚。",
      "pairing": "奶油吐司、烤肉、濃味起司。",
      "brewTip": "95度。加一點牛奶也壓不住麥芽香。",
      "keep": "密封、陰涼乾燥，開封後兩個月內。",
      "keywords": "阿薩姆烏龍 印度 大葉種 半發酵 麥芽"
    },
    "originCountryCode": "in"
  },
  {
    "id": "oolong-ceylon",
    "group": "oolong",
    "kind": "tea",
    "hanja": "烏",
    "sub": "Ceylon Oolong",
    "alias": [
      "실론티 우롱",
      "Ceylon Oolong",
      "錫蘭烏龍"
    ],
    "hz": "錫蘭烏龍",
    "hs": "锡兰乌龙",
    "rom": "Ceylon Oolong",
    "temp": 90,
    "tempRange": "85~90℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      60,
      45,
      60
    ],
    "maxSteep": 5,
    "oxidationValue": 30,
    "traits": "t-morning t-afternoon a-floral b-light k-crisp r-clean s-hot s-iced w-gongfu p-dessert c-mid m-refresh",
    "originCountry": {
      "ko": "스리랑카",
      "en": "Sri Lanka",
      "zh-CN": "斯里兰卡",
      "zh-TW": "斯里蘭卡"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조. 실론 홍차용 고산 잎을 반발효로 만든 우롱입니다.",
        "우바 등 고산 다원에서 홍차와 함께 소량 생산되는, 스리랑카의 새로운 얼굴입니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying — high-grown Ceylon leaf made as a half-oxidised oolong.",
        "Produced in small lots alongside black tea in Uva and other high-grown gardens."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥。锡兰红茶用高山叶做的半发酵乌龙。",
        "乌瓦等高山茶园与红茶一起少量生产，是斯里兰卡的新面孔。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥。錫蘭紅茶用高山葉做的半發酵烏龍。",
        "烏瓦等高山茶園與紅茶一起少量生產，是斯里蘭卡的新面孔。"
      ]
    },
    "ko": {
      "name": "실론 우롱",
      "oneLine": "스리랑카 고산 잎을 반발효로 — 실론의 맑은 향에 우롱의 꽃향.",
      "oxidation": "약 30%",
      "ratioNote": "150ml에 5g",
      "rounds": "5회",
      "steepBasis": "90도에서 1분, 2포 45초, 3포 1분.",
      "origin": "스리랑카 중부 고산지, 우바를 비롯한 해발 1,200m 안팎의 다원.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조. 홍차로 만들 잎을 중간 산화에서 멈춥니다.",
      "story": "홍차의 나라 스리랑카에서 우롱 수요에 맞춰 고산 다원들이 반발효로 만들기 시작한 차입니다.",
      "flavor": "맑은 감귤·꽃 향과 가벼운 꿀맛. 실론 홍차의 산뜻한 골격이 남습니다.",
      "pairing": "과일 타르트, 샐러드, 흰살생선.",
      "brewTip": "85~90도. 너무 뜨거우면 꽃향이 묻힙니다.",
      "keep": "밀봉해 서늘하고 건조하게. 개봉 후 두 달 안.",
      "keywords": "실론 우롱 스리랑카 우바 반발효 고산"
    },
    "en": {
      "name": "Ceylon Oolong",
      "oneLine": "High-grown Sri Lankan leaf, half oxidised — Ceylon brightness with oolong flowers.",
      "oxidation": "About 30%",
      "ratioNote": "5 g to 150 ml",
      "rounds": "5 infusions",
      "steepBasis": "90 °C for 1 minute, then 45 seconds, then 1 minute.",
      "origin": "Sri Lanka's central highlands, gardens around 1,200 m including Uva.",
      "process": "Withering → bruising → firing → rolling → drying; black-tea leaf stopped mid-oxidation.",
      "story": "In a black-tea country, high-grown gardens began half-oxidising leaf as oolong demand grew.",
      "flavor": "Clear citrus and flowers with light honey, over the bright frame of Ceylon black tea.",
      "pairing": "Fruit tarts, salads, white fish.",
      "brewTip": "85–90 °C; hotter water buries the flowers.",
      "keep": "Sealed, cool and dry; within two months of opening.",
      "keywords": "Ceylon oolong Sri Lanka Uva half-oxidised high-grown"
    },
    "zh-CN": {
      "name": "锡兰乌龙",
      "oneLine": "斯里兰卡高山叶半发酵——锡兰的清亮里带乌龙花香。",
      "oxidation": "约30%",
      "ratioNote": "150毫升配5克",
      "rounds": "5泡",
      "steepBasis": "90度泡1分钟，第二泡45秒，第三泡1分钟。",
      "origin": "斯里兰卡中部高山，乌瓦等地海拔1200米上下的茶园。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥。把红茶叶停在半发酵。",
      "story": "在红茶之国斯里兰卡，高山茶园应乌龙需求开始做半发酵茶。",
      "flavor": "清亮的柑橘与花香、淡淡蜜味，底下是锡兰红茶的明快骨架。",
      "pairing": "水果塔、沙拉、白身鱼。",
      "brewTip": "85~90度，水太烫会盖住花香。",
      "keep": "密封、阴凉干燥，开封后两个月内。",
      "keywords": "锡兰乌龙 斯里兰卡 乌瓦 半发酵 高山"
    },
    "zh-TW": {
      "name": "錫蘭烏龍",
      "oneLine": "斯里蘭卡高山葉半發酵——錫蘭的清亮裡帶烏龍花香。",
      "oxidation": "約30%",
      "ratioNote": "150毫升配5公克",
      "rounds": "5泡",
      "steepBasis": "90度泡1分鐘，第二泡45秒，第三泡1分鐘。",
      "origin": "斯里蘭卡中部高山，烏瓦等地海拔1200米上下的茶園。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥。把紅茶葉停在半發酵。",
      "story": "在紅茶之國斯里蘭卡，高山茶園應烏龍需求開始做半發酵茶。",
      "flavor": "清亮的柑橘與花香、淡淡蜜味，底下是錫蘭紅茶的明快骨架。",
      "pairing": "水果塔、沙拉、白身魚。",
      "brewTip": "85~90度，水太燙會蓋住花香。",
      "keep": "密封、陰涼乾燥，開封後兩個月內。",
      "keywords": "錫蘭烏龍 斯里蘭卡 烏瓦 半發酵 高山"
    },
    "originCountryCode": "lk"
  },
  {
    "id": "oolong-ruby",
    "group": "oolong",
    "kind": "tea",
    "hanja": "紅",
    "sub": "Ruby Oolong",
    "alias": [
      "루비우롱",
      "태국 루비 우롱",
      "Ruby Oolong",
      "紅寶石烏龍"
    ],
    "hz": "紅寶石烏龍",
    "hs": "红宝石乌龙",
    "rom": "Ruby Oolong",
    "temp": 95,
    "tempRange": "90~95℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      60,
      45,
      60,
      90
    ],
    "maxSteep": 6,
    "oxidationValue": 50,
    "traits": "t-afternoon t-night a-roast a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-cozy",
    "originCountry": {
      "ko": "태국",
      "en": "Thailand",
      "zh-CN": "泰国",
      "zh-TW": "泰國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 구형 유념 → 건조 → 진한 배화. 산화와 배화가 모두 깊은 태국식 우롱입니다.",
        "도이매살롱 등 치앙라이 고산에서 대만식 제다로 만들며, 붉은 수색이 이름의 유래입니다."
      ],
      "en": [
        "Withering → bruising → firing → ball rolling → drying → heavy roasting; deep in both oxidation and roast.",
        "Made with Taiwanese craft in the Chiang Rai highlands around Doi Mae Salong; named for its red liquor."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 球形揉捻 → 干燥 → 重焙火。发酵与焙火都深的泰国式乌龙。",
        "清莱美斯乐一带以台湾工艺制作，红亮的汤色是名字的由来。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 球形揉捻 → 乾燥 → 重焙火。發酵與焙火都深的泰國式烏龍。",
        "清萊美斯樂一帶以台灣工藝製作，紅亮的湯色是名字的由來。"
      ]
    },
    "ko": {
      "name": "루비 우롱",
      "oneLine": "태국 고산의 진하게 배화한 구형 우롱 — 루비빛 수색과 건과일의 단맛.",
      "oxidation": "약 50%",
      "ratioNote": "150ml에 6g",
      "rounds": "6회",
      "steepBasis": "95도에서 1분, 2포 45초, 3포 1분. 뭉친 잎이 풀리며 향이 깊어집니다.",
      "origin": "태국 치앙라이, 도이매살롱 일대 해발 1,200m 안팎의 고산 차밭.",
      "process": "위조 → 요청 → 살청 → 단단히 뭉쳐 유념 → 건조 → 진한 배화. 산화를 깊게 하고 불을 세게 입힙니다.",
      "story": "대만에서 건너간 차나무와 제다 기술이 태국 북부 고산에 자리 잡으며 생긴 스타일로, 붉은 수색에서 루비라는 이름이 붙었습니다.",
      "flavor": "건자두·건포도 같은 건과일 단맛과 구운 견과의 고소함, 붉은 수색.",
      "pairing": "건과일, 다크초콜릿, 견과류 디저트.",
      "brewTip": "95도. 첫 포는 잎을 깨우는 린스로 짧게 버려도 좋습니다.",
      "keep": "밀봉해 서늘하고 건조하게. 배화향은 습기에 약합니다.",
      "keywords": "루비 우롱 태국 치앙라이 도이매살롱 배화 구형"
    },
    "en": {
      "name": "Ruby Oolong",
      "oneLine": "A dark-roasted ball oolong from Thailand's highlands — ruby liquor, dried-fruit sweetness.",
      "oxidation": "About 50%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "6 infusions",
      "steepBasis": "95 °C for 1 minute, then 45 seconds, then 1 minute; the flavour deepens as the ball opens.",
      "origin": "Around Doi Mae Salong, Chiang Rai, Thailand, at about 1,200 m.",
      "process": "Withering → bruising → firing → tight ball rolling → drying → heavy roasting, with deep oxidation.",
      "story": "Taiwanese bushes and craft settled in Thailand's northern highlands; the name comes from the red liquor.",
      "flavor": "Dried plum and raisin sweetness, roasted nuts, a red liquor.",
      "pairing": "Dried fruit, dark chocolate, nut desserts.",
      "brewTip": "95 °C. A quick rinse to wake the ball is fine.",
      "keep": "Sealed, cool and dry; roast aroma hates humidity.",
      "keywords": "Ruby oolong Thailand Chiang Rai Doi Mae Salong roasted ball"
    },
    "zh-CN": {
      "name": "红宝石乌龙",
      "oneLine": "泰国高山重焙火的球形乌龙——红宝石汤色与干果甜。",
      "oxidation": "约50%",
      "ratioNote": "150毫升配6克",
      "rounds": "6泡",
      "steepBasis": "95度泡1分钟，第二泡45秒，第三泡1分钟。团揉的叶展开后香气变深。",
      "origin": "泰国清莱美斯乐一带，海拔1200米上下。",
      "process": "萎凋 → 摇青 → 杀青 → 紧团揉 → 干燥 → 重焙火。发酵深、火功足。",
      "story": "台湾茶苗与制茶技术落脚泰国北部高山，汤色红亮而得名红宝石。",
      "flavor": "梅干、葡萄干般的干果甜与烤坚果香，汤色红。",
      "pairing": "干果、黑巧克力、坚果甜点。",
      "brewTip": "95度。第一泡可快速润茶倒掉。",
      "keep": "密封、阴凉干燥，焙火香怕潮。",
      "keywords": "红宝石乌龙 泰国 清莱 美斯乐 焙火 球形"
    },
    "zh-TW": {
      "name": "紅寶石烏龍",
      "oneLine": "泰國高山重焙火的球形烏龍——紅寶石湯色與乾果甜。",
      "oxidation": "約50%",
      "ratioNote": "150毫升配6公克",
      "rounds": "6泡",
      "steepBasis": "95度泡1分鐘，第二泡45秒，第三泡1分鐘。團揉的葉展開後香氣變深。",
      "origin": "泰國清萊美斯樂一帶，海拔1200米上下。",
      "process": "萎凋 → 搖菁 → 殺菁 → 緊團揉 → 乾燥 → 重焙火。發酵深、火功足。",
      "story": "台灣茶苗與製茶技術落腳泰國北部高山，湯色紅亮而得名紅寶石。",
      "flavor": "梅乾、葡萄乾般的乾果甜與烤堅果香，湯色紅。",
      "pairing": "乾果、黑巧克力、堅果甜點。",
      "brewTip": "95度。第一泡可快速潤茶倒掉。",
      "keep": "密封、陰涼乾燥，焙火香怕潮。",
      "keywords": "紅寶石烏龍 泰國 清萊 美斯樂 焙火 球形"
    },
    "originCountryCode": "th"
  },
  {
    "id": "oolong-jeju",
    "group": "oolong",
    "kind": "tea",
    "hanja": "濟",
    "sub": "Jeju Volcanic Rock Tea",
    "alias": [
      "제주 화산암차",
      "제주 우롱",
      "Jeju Volcanic Rock Tea",
      "濟州火山岩茶"
    ],
    "hz": "濟州火山岩茶",
    "hs": "济州火山岩茶",
    "rom": "Jeju Volcanic Rock Tea",
    "temp": 90,
    "tempRange": "85~90℃",
    "leaf": "5g",
    "water": "150ml",
    "steeps": [
      60,
      45,
      60
    ],
    "maxSteep": 5,
    "oxidationValue": 30,
    "traits": "t-morning t-afternoon a-floral a-herb b-light k-sweet r-clean s-hot w-gongfu p-meal c-mid m-refresh",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 유념 → 건조. 제주 잎을 반발효로 만든 한국 우롱입니다.",
        "화산암(현무암) 토양에서 자란 잎의 미네랄감을 앞세운, 제주 차밭의 우롱 시도입니다."
      ],
      "en": [
        "Withering → bruising → firing → rolling → drying — Jeju leaf made as a half-oxidised oolong.",
        "An oolong experiment from Jeju's gardens, built on the mineral character of basalt soil."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥。济州叶做的半发酵韩国乌龙。",
        "主打火山岩（玄武岩）土壤矿物感的济州茶园乌龙尝试。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥。濟州葉做的半發酵韓國烏龍。",
        "主打火山岩（玄武岩）土壤礦物感的濟州茶園烏龍嘗試。"
      ]
    },
    "ko": {
      "name": "제주화산암차",
      "oneLine": "제주 화산토에서 기른 잎의 한국 우롱 — 미네랄감 도는 맑은 맛.",
      "oxidation": "약 30%",
      "ratioNote": "150ml에 5g",
      "rounds": "5회",
      "steepBasis": "90도에서 1분, 2포 45초, 3포 1분.",
      "origin": "제주도 화산토 차밭. 현무암 토양과 해풍, 큰 일교차가 잎을 기릅니다.",
      "process": "위조 → 요청 → 살청 → 유념 → 건조. 제주 잎에 우롱의 반발효 제법을 적용합니다.",
      "story": "녹차 중심이던 제주 차밭에서 제법을 넓히려는 시도로 만든 한국 우롱으로, 화산암 토양의 개성을 내세웁니다.",
      "flavor": "맑은 꽃향과 풀 향, 화산토에서 오는 듯한 미네랄감과 깔끔한 단맛.",
      "pairing": "해산물, 나물, 가벼운 한식.",
      "brewTip": "85~90도. 제주 녹차보다 길게 우려도 떫음이 적습니다.",
      "keep": "밀봉 냉장. 개봉 후 한 달 안.",
      "keywords": "제주화산암차 제주 우롱 한국 화산토 미네랄"
    },
    "en": {
      "name": "Jeju Volcanic Rock Tea",
      "oneLine": "Korean oolong from Jeju's volcanic fields — a clean cup with a mineral edge.",
      "oxidation": "About 30%",
      "ratioNote": "5 g to 150 ml",
      "rounds": "5 infusions",
      "steepBasis": "90 °C for 1 minute, then 45 seconds, then 1 minute.",
      "origin": "Jeju Island's volcanic-soil gardens, raised on basalt, sea wind and wide day–night swings.",
      "process": "Withering → bruising → firing → rolling → drying; oolong half-oxidation applied to Jeju leaf.",
      "story": "An experiment from Jeju's green-tea gardens to widen the island's craft, named for its volcanic rock soil.",
      "flavor": "Clean flowers and grass, a mineral note from the volcanic soil, neat sweetness.",
      "pairing": "Seafood, namul, light Korean dishes.",
      "brewTip": "85–90 °C. It takes a longer steep than Jeju green tea without turning harsh.",
      "keep": "Sealed and refrigerated; within a month of opening.",
      "keywords": "Jeju volcanic rock tea Korean oolong volcanic soil mineral"
    },
    "zh-CN": {
      "name": "济州火山岩茶",
      "oneLine": "济州火山土茶园的韩国乌龙——带矿物感的清爽滋味。",
      "oxidation": "约30%",
      "ratioNote": "150毫升配5克",
      "rounds": "5泡",
      "steepBasis": "90度泡1分钟，第二泡45秒，第三泡1分钟。",
      "origin": "济州岛火山土茶园，玄武岩土壤、海风与大昼夜温差养叶。",
      "process": "萎凋 → 摇青 → 杀青 → 揉捻 → 干燥。把乌龙的半发酵工艺用在济州叶上。",
      "story": "以绿茶为主的济州茶园拓展工艺的尝试之作，主打火山岩土壤的个性。",
      "flavor": "清亮的花香与青草香，像来自火山土的矿物感，甜味干净。",
      "pairing": "海鲜、凉拌野菜、清淡韩餐。",
      "brewTip": "85~90度。比济州绿茶泡久也不太涩。",
      "keep": "密封冷藏，开封后一个月内。",
      "keywords": "济州火山岩茶 济州乌龙 韩国 火山土 矿物感"
    },
    "zh-TW": {
      "name": "濟州火山岩茶",
      "oneLine": "濟州火山土茶園的韓國烏龍——帶礦物感的清爽滋味。",
      "oxidation": "約30%",
      "ratioNote": "150毫升配5公克",
      "rounds": "5泡",
      "steepBasis": "90度泡1分鐘，第二泡45秒，第三泡1分鐘。",
      "origin": "濟州島火山土茶園，玄武岩土壤、海風與大晝夜溫差養葉。",
      "process": "萎凋 → 搖菁 → 殺菁 → 揉捻 → 乾燥。把烏龍的半發酵工藝用在濟州葉上。",
      "story": "以綠茶為主的濟州茶園拓展工藝的嘗試之作，主打火山岩土壤的個性。",
      "flavor": "清亮的花香與青草香，像來自火山土的礦物感，甜味乾淨。",
      "pairing": "海鮮、涼拌野菜、清淡韓餐。",
      "brewTip": "85~90度。比濟州綠茶泡久也不太澀。",
      "keep": "密封冷藏，開封後一個月內。",
      "keywords": "濟州火山岩茶 濟州烏龍 韓國 火山土 礦物感"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "oolong-cheong",
    "group": "oolong",
    "kind": "tea",
    "hanja": "靑",
    "sub": "Cheong Oolong (Korean Light Oolong)",
    "alias": [
      "청차",
      "한국 청우롱",
      "Cheong Oolong",
      "靑烏龍"
    ],
    "hz": "靑烏龍",
    "hs": "青乌龙",
    "rom": "Cheong Oolong (Korean Light Oolong)",
    "temp": 90,
    "tempRange": "85~90℃",
    "leaf": "6g",
    "water": "150ml",
    "steeps": [
      45,
      30,
      45
    ],
    "maxSteep": 6,
    "oxidationValue": 20,
    "traits": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot s-iced w-gongfu p-solo c-mid m-refresh",
    "originCountry": {
      "ko": "한국",
      "en": "South Korea",
      "zh-CN": "韩国",
      "zh-TW": "韓國"
    },
    "x": {
      "ko": [
        "위조 → 요청 → 살청 → 구형 유념 → 건조. 대만식 경발효 청차를 한국 잎으로 만듭니다.",
        "특정 다원이 아닌 제법의 이름으로, 제주·보성·하동 등지에서 생산됩니다."
      ],
      "en": [
        "Withering → bruising → firing → ball rolling → drying — Taiwanese light-oxidation qingcha from Korean leaf.",
        "A style name rather than a garden, produced in Jeju, Boseong, Hadong and elsewhere in Korea."
      ],
      "zh-CN": [
        "萎凋 → 摇青 → 杀青 → 球形揉捻 → 干燥。用韩国叶做台湾式轻发酵青茶。",
        "是工艺的名字而非茶园，济州、宝城、河东等地都有生产。"
      ],
      "zh-TW": [
        "萎凋 → 搖菁 → 殺菁 → 球形揉捻 → 乾燥。用韓國葉做台灣式輕發酵青茶。",
        "是工藝的名字而非茶園，濟州、寶城、河東等地都有生產。"
      ]
    },
    "ko": {
      "name": "청우롱",
      "oneLine": "한국 산지에서 대만식으로 가볍게 발효한 우롱 — 맑은 꽃향의 청차.",
      "oxidation": "약 20%",
      "ratioNote": "150ml에 6g",
      "rounds": "6회",
      "steepBasis": "90도에서 45초, 2포 30초, 3포 45초.",
      "origin": "한국의 차 산지(제주·보성·하동 등)에서 대만식 청차 제법으로 만듭니다.",
      "process": "위조 → 요청 → 살청 → 구형 유념 → 건조. 발효를 가볍게 멈추는 대만식 경발효(청차) 방식입니다.",
      "story": "청우롱은 특정 다원의 이름이 아니라, 한국에서 대만식 경발효 우롱을 가리키는 이름으로 쓰입니다.",
      "flavor": "맑은 난초·풀꽃 향과 가벼운 단맛. 녹차와 우롱의 사이에 있는 산뜻한 맛.",
      "pairing": "과일, 가벼운 디저트, 샐러드.",
      "brewTip": "85~90도. 짧게 여러 번 우리면 꽃향이 또렷합니다.",
      "keep": "밀봉 냉장. 개봉 후 한 달 안.",
      "keywords": "청우롱 한국 우롱 청차 경발효 대만식"
    },
    "en": {
      "name": "Cheong Oolong",
      "oneLine": "Taiwanese-style light oolong made in Korea — a clear, floral qingcha.",
      "oxidation": "About 20%",
      "ratioNote": "6 g to 150 ml",
      "rounds": "6 infusions",
      "steepBasis": "90 °C for 45 seconds, then 30, then 45.",
      "origin": "Korean tea regions such as Jeju, Boseong and Hadong, made by the Taiwanese light-oxidation method.",
      "process": "Withering → bruising → firing → ball rolling → drying; the light oxidation of Taiwanese qingcha.",
      "story": "Cheong oolong is not one garden's brand but the name used in Korea for Taiwanese-style lightly oxidised oolong.",
      "flavor": "Clear orchid and meadow flowers, light sweetness — between green tea and oolong.",
      "pairing": "Fruit, light desserts, salads.",
      "brewTip": "85–90 °C, short and often, keeps the flowers clear.",
      "keep": "Sealed and refrigerated; within a month of opening.",
      "keywords": "Cheong oolong Korean oolong qingcha light oxidation Taiwanese style"
    },
    "zh-CN": {
      "name": "青乌龙",
      "oneLine": "韩国产地按台湾方式轻发酵的乌龙——花香清亮的青茶。",
      "oxidation": "约20%",
      "ratioNote": "150毫升配6克",
      "rounds": "6泡",
      "steepBasis": "90度泡45秒，第二泡30秒，第三泡45秒。",
      "origin": "韩国茶产区（济州、宝城、河东等）按台湾青茶工艺制作。",
      "process": "萎凋 → 摇青 → 杀青 → 球形揉捻 → 干燥。台湾式轻发酵（青茶）做法。",
      "story": "青乌龙不是某个茶园的名字，而是韩国对台湾式轻发酵乌龙的称呼。",
      "flavor": "清亮的兰花与野花香、轻盈的甜，介于绿茶与乌龙之间。",
      "pairing": "水果、清淡甜点、沙拉。",
      "brewTip": "85~90度，短泡多泡花香更清楚。",
      "keep": "密封冷藏，开封后一个月内。",
      "keywords": "青乌龙 韩国乌龙 青茶 轻发酵 台湾式"
    },
    "zh-TW": {
      "name": "青烏龍",
      "oneLine": "韓國產地按台灣方式輕發酵的烏龍——花香清亮的青茶。",
      "oxidation": "約20%",
      "ratioNote": "150毫升配6公克",
      "rounds": "6泡",
      "steepBasis": "90度泡45秒，第二泡30秒，第三泡45秒。",
      "origin": "韓國茶產區（濟州、寶城、河東等）按台灣青茶工藝製作。",
      "process": "萎凋 → 搖菁 → 殺菁 → 球形揉捻 → 乾燥。台灣式輕發酵（青茶）做法。",
      "story": "青烏龍不是某個茶園的名字，而是韓國對台灣式輕發酵烏龍的稱呼。",
      "flavor": "清亮的蘭花與野花香、輕盈的甜，介於綠茶與烏龍之間。",
      "pairing": "水果、清淡甜點、沙拉。",
      "brewTip": "85~90度，短泡多泡花香更清楚。",
      "keep": "密封冷藏，開封後一個月內。",
      "keywords": "青烏龍 韓國烏龍 青茶 輕發酵 台灣式"
    },
    "originCountryCode": "kr"
  },
  {
    "id": "black-chuanhong",
    "group": "black",
    "kind": "tea",
    "hanja": "川",
    "sub": "Sichuan Black Tea",
    "alias": [
      "천홍공부",
      "사천홍차",
      "촨홍",
      "Chuanhong",
      "川紅",
      "川红工夫"
    ],
    "hz": "川紅",
    "hs": "川红",
    "rom": "Chuanhong",
    "temp": 85,
    "tempRange": "80~90℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      150,
      180
    ],
    "maxSteep": 2,
    "oxidationValue": 90,
    "traits": "t-morning t-afternoon a-floral a-malt b-full k-sweet r-clean s-hot w-quick p-meal c-high m-energy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 기문·전홍과 나란히 서는 쓰촨의 공부홍차입니다.",
        "이빈에서 1950년대에 정리된 비교적 젊은 홍차로, 싹만 모은 사천금아가 대표 등급입니다."
      ],
      "en": [
        "Withering → rolling → oxidation → drying — Sichuan's gongfu black tea, standing with Keemun and Dianhong.",
        "Settled in Yibin in the 1950s, a relatively young black tea; its all-bud Sichuan Jinya is the flagship grade."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥。与祁红、滇红并列的四川工夫红茶。",
        "1950年代在宜宾定型，较年轻的红茶，只采芽头的四川金芽是代表等级。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥。與祁紅、滇紅並列的四川工夫紅茶。",
        "1950年代在宜賓定型，較年輕的紅茶，只採芽頭的四川金芽是代表等級。"
      ]
    },
    "ko": {
      "name": "천홍",
      "oneLine": "쓰촨 이빈의 공부홍차 — 장미 향과 진한 바디, 뒤에 오는 단맛.",
      "oxidation": "90%",
      "ratioNote": "150ml에 3g",
      "rounds": "1~2회",
      "steepBasis": "85도에서 2분 30초. 홍차치고 낮은 온도에서 우려야 떫은맛이 덜합니다.",
      "origin": "쓰촨성 이빈 일대. 온난다습한 분지 기후에서 자란 잎으로 만듭니다.",
      "process": "위조 → 유념 → 산화 → 건조. 기문·전홍과 함께 공부(工夫) 제법을 쓰는 홍차입니다.",
      "story": "기홍(기문)·전홍과 함께 중국의 3대 공부홍차로 꼽힙니다. 싹만 모아 만든 '사천금아'가 유명합니다.",
      "flavor": "장미 같은 꽃향, 진한 바디감, 마신 뒤에 밀려오는 단맛(회감).",
      "pairing": "중식, 훈제 요리, 다크초콜릿.",
      "brewTip": "85℃ 안팎이 핵심. 끓는 물을 바로 부으면 떫은맛이 도드라집니다.",
      "keep": "밀봉해 서늘하고 건조하게. 개봉 후 두 달 안.",
      "keywords": "천홍 쓰촨 이빈 공부홍차 사천금아 장미향"
    },
    "en": {
      "name": "Chuanhong",
      "oneLine": "Sichuan's gongfu black tea from Yibin — rose aroma, a full body, sweetness that follows.",
      "oxidation": "90%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "1–2 infusions",
      "steepBasis": "85 °C for 2½ minutes. Cooler than most black teas, or the astringency jumps out.",
      "origin": "Around Yibin in Sichuan, from leaf grown in the warm, humid basin climate.",
      "process": "Withering → rolling → oxidation → drying, in the gongfu method shared with Keemun and Dianhong.",
      "story": "Counted with Keemun and Dianhong among China's three great gongfu black teas; its all-bud grade is Sichuan Jinya.",
      "flavor": "Rose-like flowers, a full body, and a sweetness that rolls in afterwards — huigan.",
      "pairing": "Chinese food, smoked dishes, dark chocolate.",
      "brewTip": "Around 85 °C is the point; straight boiling water makes it harsh.",
      "keep": "Sealed, cool and dry; within two months of opening.",
      "keywords": "Chuanhong Sichuan Yibin gongfu black tea Sichuan Jinya rose"
    },
    "zh-CN": {
      "name": "川红",
      "oneLine": "四川宜宾的工夫红茶——玫瑰香、浓厚汤体与随后的回甘。",
      "oxidation": "90%",
      "ratioNote": "150毫升配3克",
      "rounds": "1~2泡",
      "steepBasis": "85度泡2分30秒。比一般红茶温度低，才不显涩。",
      "origin": "四川宜宾一带，温暖潮湿的盆地气候养叶。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥。与祁红、滇红同为工夫制法。",
      "story": "与祁红、滇红并称中国三大工夫红茶。只采芽头制成的“四川金芽”有名。",
      "flavor": "玫瑰般的花香、浓厚的汤体，饮后涌上的回甘。",
      "pairing": "中餐、熏制料理、黑巧克力。",
      "brewTip": "85度上下是关键，沸水直冲会发涩。",
      "keep": "密封、阴凉干燥，开封后两个月内。",
      "keywords": "川红 四川 宜宾 工夫红茶 四川金芽 玫瑰香"
    },
    "zh-TW": {
      "name": "川紅",
      "oneLine": "四川宜賓的工夫紅茶——玫瑰香、濃厚湯體與隨後的回甘。",
      "oxidation": "90%",
      "ratioNote": "150毫升配3公克",
      "rounds": "1~2泡",
      "steepBasis": "85度泡2分30秒。比一般紅茶溫度低，才不顯澀。",
      "origin": "四川宜賓一帶，溫暖潮濕的盆地氣候養葉。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥。與祁紅、滇紅同為工夫製法。",
      "story": "與祁紅、滇紅並稱中國三大工夫紅茶。只採芽頭製成的「四川金芽」有名。",
      "flavor": "玫瑰般的花香、濃厚的湯體，飲後湧上的回甘。",
      "pairing": "中餐、燻製料理、黑巧克力。",
      "brewTip": "85度上下是關鍵，沸水直沖會發澀。",
      "keep": "密封、陰涼乾燥，開封後兩個月內。",
      "keywords": "川紅 四川 宜賓 工夫紅茶 四川金芽 玫瑰香"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "black-yixing",
    "group": "black",
    "kind": "tea",
    "hanja": "宜",
    "sub": "Yixing Black Tea",
    "alias": [
      "양선홍차",
      "이싱 홍차",
      "Yixing Black Tea",
      "宜興紅茶",
      "陽羨紅茶"
    ],
    "hz": "宜興紅茶",
    "hs": "宜兴红茶",
    "rom": "Yixing Black Tea",
    "temp": 90,
    "tempRange": "90~95℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      150,
      180
    ],
    "maxSteep": 2,
    "oxidationValue": 90,
    "traits": "t-morning t-afternoon a-floral b-medium k-sweet r-clean s-hot w-quick p-dessert c-mid m-calm",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 당대의 명차 산지 양선의 잎으로 만든 홍차입니다.",
        "자사호의 고장으로 더 알려진 이싱에서, 자사호와 잘 맞는 차로 현지에서 즐깁니다."
      ],
      "en": [
        "Withering → rolling → oxidation → drying — black tea from Yangxian leaf, a famed district since the Tang era.",
        "Better known for zisha pots, Yixing drinks this as the tea that suits those pots best."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥。唐代名茶产地阳羡的叶做的红茶。",
        "宜兴以紫砂壶闻名，本地人认为这款红茶与紫砂壶最相配。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥。唐代名茶產地陽羨的葉做的紅茶。",
        "宜興以紫砂壺聞名，本地人認為這款紅茶與紫砂壺最相配。"
      ]
    },
    "ko": {
      "name": "의흥 홍차",
      "oneLine": "자사호의 고장 이싱(양선)의 홍차 — 도자기 고향에서 나는 부드러운 홍차.",
      "oxidation": "90%",
      "ratioNote": "150ml에 3g",
      "rounds": "1~2회",
      "steepBasis": "90도에서 2분 30초, 2포 3분.",
      "origin": "장쑤성 이싱, 옛 이름 양선(陽羨). 당대부터 이름난 차 산지입니다.",
      "process": "위조 → 유념 → 산화 → 건조. 자사호와 궁합이 좋다고 알려진 홍차입니다.",
      "story": "양선은 당대부터 공차로 이름난 산지이고, 그 잎으로 만든 홍차가 의흥 홍차(양선홍차)입니다. 자사호 제작지로도 같은 고장입니다.",
      "flavor": "부드러운 꽃향과 꿀맛, 자극적이지 않은 둥근 바디.",
      "pairing": "딤섬, 가벼운 중식, 구운 과자.",
      "brewTip": "자사호에 우려 마시는 것이 현지의 즐김. 90도에서 2분 30초.",
      "keep": "밀봉해 서늘하고 건조하게. 개봉 후 두 달 안.",
      "keywords": "의흥 홍차 양선홍차 이싱 자사호 장쑤"
    },
    "en": {
      "name": "Yixing Black Tea",
      "oneLine": "Black tea from Yixing (Yangxian), home of zisha pots — a soft, rounded cup.",
      "oxidation": "90%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "1–2 infusions",
      "steepBasis": "90 °C for 2½ minutes, then 3.",
      "origin": "Yixing in Jiangsu, once called Yangxian — a tea district famed since the Tang dynasty.",
      "process": "Withering → rolling → oxidation → drying; known locally as the black tea that suits zisha pots.",
      "story": "Yangxian leaf was tribute tea in the Tang era; its black tea is Yixing hongcha, also called Yangxian hongcha, from the same town as the zisha pot.",
      "flavor": "Soft flowers and honey, a round body with no harsh edges.",
      "pairing": "Dim sum, light Chinese dishes, baked sweets.",
      "brewTip": "Brew it in a zisha pot, the local way: 90 °C for 2½ minutes.",
      "keep": "Sealed, cool and dry; within two months of opening.",
      "keywords": "Yixing black tea Yangxian hongcha zisha Jiangsu"
    },
    "zh-CN": {
      "name": "宜兴红茶",
      "oneLine": "紫砂壶之乡宜兴（阳羡）的红茶——陶都出产的柔和红茶。",
      "oxidation": "90%",
      "ratioNote": "150毫升配3克",
      "rounds": "1~2泡",
      "steepBasis": "90度泡2分30秒，第二泡3分钟。",
      "origin": "江苏宜兴，古称阳羡，唐代已是名茶产地。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥。本地认为与紫砂壶最相配的红茶。",
      "story": "阳羡唐代已是贡茶产地，其叶做的红茶叫宜兴红茶（阳羡红茶），与紫砂壶同乡。",
      "flavor": "柔和的花香与蜜味，汤体圆润不刺激。",
      "pairing": "点心、清淡中餐、烤点心。",
      "brewTip": "用紫砂壶泡是本地喝法，90度2分30秒。",
      "keep": "密封、阴凉干燥，开封后两个月内。",
      "keywords": "宜兴红茶 阳羡红茶 紫砂壶 江苏"
    },
    "zh-TW": {
      "name": "宜興紅茶",
      "oneLine": "紫砂壺之鄉宜興（陽羨）的紅茶——陶都出產的柔和紅茶。",
      "oxidation": "90%",
      "ratioNote": "150毫升配3公克",
      "rounds": "1~2泡",
      "steepBasis": "90度泡2分30秒，第二泡3分鐘。",
      "origin": "江蘇宜興，古稱陽羨，唐代已是名茶產地。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥。本地認為與紫砂壺最相配的紅茶。",
      "story": "陽羨唐代已是貢茶產地，其葉做的紅茶叫宜興紅茶（陽羨紅茶），與紫砂壺同鄉。",
      "flavor": "柔和的花香與蜜味，湯體圓潤不刺激。",
      "pairing": "點心、清淡中餐、烤點心。",
      "brewTip": "用紫砂壺泡是本地喝法，90度2分30秒。",
      "keep": "密封、陰涼乾燥，開封後兩個月內。",
      "keywords": "宜興紅茶 陽羨紅茶 紫砂壺 江蘇"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "black-jiuqu",
    "group": "black",
    "kind": "tea",
    "hanja": "九",
    "sub": "Jiuqu Hongmei",
    "alias": [
      "구곡 홍매",
      "항저우 홍차",
      "Jiuqu Hongmei",
      "九曲紅梅"
    ],
    "hz": "九曲紅梅",
    "hs": "九曲红梅",
    "rom": "Jiuqu Hongmei",
    "temp": 90,
    "tempRange": "85~90℃",
    "leaf": "3g",
    "water": "150ml",
    "steeps": [
      120,
      150
    ],
    "maxSteep": 2,
    "oxidationValue": 85,
    "traits": "t-afternoon a-fruit a-floral b-medium k-sweet r-clean s-hot w-quick p-dessert c-mid m-cozy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 서호용정과 같은 계통의 잎을 홍차로 만듭니다.",
        "항저우의 또 다른 얼굴인 홍차로, 잎 모양이 붉은 매화를 닮아 '홍매'라 불립니다."
      ],
      "en": [
        "Withering → rolling → oxidation → drying — Longjing-family leaf made into black tea.",
        "Hangzhou's other face: a black tea named hongmei, red plum, for its blossom-like leaf."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥。西湖龙井同源的叶做的红茶。",
        "杭州的另一面，叶形似红色梅花而得名“红梅”。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥。西湖龍井同源的葉做的紅茶。",
        "杭州的另一面，葉形似紅色梅花而得名「紅梅」。"
      ]
    },
    "ko": {
      "name": "구곡홍매",
      "oneLine": "항저우의 홍차 — 용정과 같은 잎에서 나는 카카오 같은 단맛.",
      "oxidation": "약 85%",
      "ratioNote": "150ml에 3g",
      "rounds": "1~2회",
      "steepBasis": "90도에서 2분, 2포 2분 30초.",
      "origin": "저장성 항저우, 서호 일대의 차밭. 서호용정으로 유명한 고장입니다.",
      "process": "위조 → 유념 → 산화 → 건조. '홍매'는 우린 찻물 빛이 붉은 매화를 닮은 데서 왔습니다.",
      "story": "녹차 용정의 고장에서 같은 계통의 잎으로 만드는 홍차입니다. '구곡'은 푸젠에서 이주한 사람들이 고향 무이산의 구곡계(九曲溪)를 따서 붙였고, '홍매'는 찻물 빛이 붉은 매화 같다는 데서 왔습니다.",
      "flavor": "카카오 같은 뉘앙스와 말린 과일의 단맛, 부드러운 꽃향.",
      "pairing": "초콜릿, 견과류, 구운 과자.",
      "brewTip": "85~90도에서 2분. 길게 우리면 카카오 향보다 떫음이 앞섭니다.",
      "keep": "밀봉해 서늘하고 건조하게. 개봉 후 두 달 안.",
      "keywords": "구곡홍매 항저우 서호 용정 홍차 카카오"
    },
    "en": {
      "name": "Jiuqu Hongmei",
      "oneLine": "Hangzhou's black tea — a cacao-like sweetness from the same leaf family as Longjing.",
      "oxidation": "About 85%",
      "ratioNote": "3 g to 150 ml",
      "rounds": "1–2 infusions",
      "steepBasis": "90 °C for 2 minutes, then 2½.",
      "origin": "Hangzhou, Zhejiang, in the West Lake tea country famed for Longjing.",
      "process": "Withering → rolling → oxidation → drying; hongmei, 'red plum', names the red-plum colour of the brew.",
      "story": "The black tea of the Longjing homeland, made from the same leaf stock. 'Jiuqu' was named by Fujian migrants after the Nine-Bend Stream of their Wuyi homeland; hongmei, 'red plum', names the brew's colour.",
      "flavor": "A cacao note, dried-fruit sweetness and soft flowers.",
      "pairing": "Chocolate, nuts, baked sweets.",
      "brewTip": "85–90 °C for 2 minutes; longer and astringency steps ahead of the cacao.",
      "keep": "Sealed, cool and dry; within two months of opening.",
      "keywords": "Jiuqu Hongmei Hangzhou West Lake Longjing black tea cacao"
    },
    "zh-CN": {
      "name": "九曲红梅",
      "oneLine": "杭州的红茶——与龙井同源的叶，带可可般的甜。",
      "oxidation": "约85%",
      "ratioNote": "150毫升配3克",
      "rounds": "1~2泡",
      "steepBasis": "90度泡2分钟，第二泡2分30秒。",
      "origin": "浙江杭州西湖一带的茶园，西湖龙井的故乡。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥。“红梅”指茶汤色如红梅，故名。",
      "story": "龙井故乡以同源的叶做的红茶。“九曲”源于福建移民怀念家乡武夷山的九曲溪，“红梅”指茶汤红如梅花。",
      "flavor": "可可般的韵味、干果的甜与柔和花香。",
      "pairing": "巧克力、坚果、烤点心。",
      "brewTip": "85~90度泡2分钟，泡久了涩味会盖过可可香。",
      "keep": "密封、阴凉干燥，开封后两个月内。",
      "keywords": "九曲红梅 杭州 西湖 龙井 红茶 可可"
    },
    "zh-TW": {
      "name": "九曲紅梅",
      "oneLine": "杭州的紅茶——與龍井同源的葉，帶可可般的甜。",
      "oxidation": "約85%",
      "ratioNote": "150毫升配3公克",
      "rounds": "1~2泡",
      "steepBasis": "90度泡2分鐘，第二泡2分30秒。",
      "origin": "浙江杭州西湖一帶的茶園，西湖龍井的故鄉。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥。「紅梅」指茶湯色如紅梅，故名。",
      "story": "龍井故鄉以同源的葉做的紅茶。「九曲」源於福建移民懷念家鄉武夷山的九曲溪，「紅梅」指茶湯紅如梅花。",
      "flavor": "可可般的韻味、乾果的甜與柔和花香。",
      "pairing": "巧克力、堅果、烤點心。",
      "brewTip": "85~90度泡2分鐘，泡久了澀味會蓋過可可香。",
      "keep": "密封、陰涼乾燥，開封後兩個月內。",
      "keywords": "九曲紅梅 杭州 西湖 龍井 紅茶 可可"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "black-mizhuan",
    "group": "black",
    "kind": "tea",
    "hanja": "米",
    "sub": "Mizhuan Brick Tea",
    "alias": [
      "미전",
      "홍차전",
      "Mizhuan",
      "米磚茶"
    ],
    "hz": "米磚茶",
    "hs": "米砖茶",
    "rom": "Mizhuan (Rice Brick Tea)",
    "temp": 100,
    "tempRange": "95~100℃",
    "leaf": "5g",
    "water": "300ml",
    "steeps": [
      300,
      300
    ],
    "maxSteep": 2,
    "oxidationValue": 95,
    "traits": "t-morning a-malt b-full k-blend r-clean s-hot s-milk w-quick p-meal c-high m-energy",
    "originCountry": {
      "ko": "중국",
      "en": "China",
      "zh-CN": "中国",
      "zh-TW": "中國"
    },
    "x": {
      "ko": [
        "홍차 말차를 증기로 쪄 틀에 압착 → 건조. 벽돌로 굳힌 긴압 홍차입니다.",
        "후난에서 만들어 신장 등 서북으로 나가는 일상차로, 기관차 문양의 조리교차창 제품이 대표적입니다."
      ],
      "en": [
        "Black-tea dust steamed and pressed in a mould → dried: a compressed brick black tea.",
        "Made in Hunan for Xinjiang and the northwest; Zhaoliqiao's locomotive-stamped brick is the emblem."
      ],
      "zh-CN": [
        "红茶末蒸后入模压制 → 干燥。压成砖的紧压红茶。",
        "湖南制作、销往新疆等西北地区的日常茶，赵李桥茶厂火车头图案的砖最具代表。"
      ],
      "zh-TW": [
        "紅茶末蒸後入模壓製 → 乾燥。壓成磚的緊壓紅茶。",
        "湖南製作、銷往新疆等西北地區的日常茶，趙李橋茶廠火車頭圖案的磚最具代表。"
      ]
    },
    "ko": {
      "name": "미전차",
      "oneLine": "홍차 가루를 벽돌처럼 찍어 굳힌 후베이의 긴압 홍차 — 오래 두고 마시는 일상차.",
      "oxidation": "95%",
      "ratioNote": "300ml에 5g (덩어리를 부숴서)",
      "rounds": "1~2회",
      "steepBasis": "끓는 물에서 5분. 부순 조각을 오래 우려 진하게 냅니다.",
      "origin": "후베이성 츠비(赤壁) 양러우둥·자오리차오 일대에서 홍차 말차(末茶)를 틀에 찍어 만듭니다.",
      "process": "홍차 가루를 증기로 쪄서 틀에 넣고 압착 → 건조. 벽돌 모양으로 굳혀 장기 보관과 운송에 맞춥니다.",
      "story": "주로 신장 등 서북 지역으로 나가는 저렴한 일상차로, 보이차처럼 오래 두고 마실 수 있습니다. 조리교차창(趙李橋茶廠)의 기관차 문양 제품이 알려졌습니다.",
      "flavor": "진한 몰트와 흙내음 가까운 구수함. 우유나 소금과도 섞어 마십니다.",
      "pairing": "기름진 음식, 양고기, 유제품.",
      "brewTip": "덩어리를 5g쯤 부숴 끓는 물에 5분. 냄비에 끓여도 됩니다.",
      "keep": "통풍이 되는 건조한 곳. 벽돌차는 장기 보관이 전제입니다.",
      "keywords": "미전차 후난 벽돌차 긴압 홍차 말차 조리교"
    },
    "en": {
      "name": "Mizhuan",
      "oneLine": "Hubei black-tea dust pressed into a brick — a keep-for-years everyday tea.",
      "oxidation": "95%",
      "ratioNote": "5 g (broken from the brick) to 300 ml",
      "rounds": "1–2 infusions",
      "steepBasis": "Boiling water for 5 minutes; steep the broken pieces long and strong.",
      "origin": "Chibi, Hubei (Yangloudong–Zhaoliqiao), pressed from black-tea dust in moulds.",
      "process": "Black-tea dust is steamed, pressed in a mould and dried into a brick built for storage and transport.",
      "story": "A cheap everyday tea shipped mainly to Xinjiang and the northwest, kept for years like pu'er; the locomotive-stamped bricks of Zhaoliqiao Tea Factory are the famous ones.",
      "flavor": "Strong malt and an earthy savouriness; also drunk with milk or salt.",
      "pairing": "Greasy food, lamb, dairy.",
      "brewTip": "Break off about 5 g and give it 5 minutes in boiling water; it can also be simmered.",
      "keep": "Dry and ventilated — brick tea is made to keep.",
      "keywords": "Mizhuan Hunan brick tea compressed black tea Zhaoliqiao"
    },
    "zh-CN": {
      "name": "米砖茶",
      "oneLine": "红茶末压成砖的湖北紧压红茶——能久存的日常茶。",
      "oxidation": "95%",
      "ratioNote": "300毫升配5克（从砖上掰下）",
      "rounds": "1~2泡",
      "steepBasis": "沸水泡5分钟。掰碎后久泡出浓味。",
      "origin": "湖北赤壁羊楼洞·赵李桥一带，用红茶末茶入模压制。",
      "process": "红茶末蒸后入模压紧 → 干燥。压成砖形便于长期保存与运输。",
      "story": "主要销往新疆等西北地区的廉价日常茶，可像普洱一样久存。赵李桥茶厂的火车头图案产品有名。",
      "flavor": "浓麦芽香与近乎泥土的醇厚，也有人加奶或盐喝。",
      "pairing": "油腻食物、羊肉、奶制品。",
      "brewTip": "掰下约5克，沸水泡5分钟，也可以在锅里煮。",
      "keep": "放在通风干燥处，砖茶本就为久存而制。",
      "keywords": "米砖茶 湖南 砖茶 紧压红茶 赵李桥"
    },
    "zh-TW": {
      "name": "米磚茶",
      "oneLine": "紅茶末壓成磚的湖北緊壓紅茶——能久存的日常茶。",
      "oxidation": "95%",
      "ratioNote": "300毫升配5公克（從磚上掰下）",
      "rounds": "1~2泡",
      "steepBasis": "沸水泡5分鐘。掰碎後久泡出濃味。",
      "origin": "湖北赤壁羊樓洞·趙李橋一帶，用紅茶末茶入模壓製。",
      "process": "紅茶末蒸後入模壓緊 → 乾燥。壓成磚形便於長期保存與運輸。",
      "story": "主要銷往新疆等西北地區的廉價日常茶，可像普洱一樣久存。趙李橋茶廠的火車頭圖案產品有名。",
      "flavor": "濃麥芽香與近乎泥土的醇厚，也有人加奶或鹽喝。",
      "pairing": "油膩食物、羊肉、奶製品。",
      "brewTip": "掰下約5公克，沸水泡5分鐘，也可以在鍋裡煮。",
      "keep": "放在通風乾燥處，磚茶本就為久存而製。",
      "keywords": "米磚茶 湖南 磚茶 緊壓紅茶 趙李橋"
    },
    "originCountryCode": "cn"
  },
  {
    "id": "black-hongyun",
    "group": "black",
    "kind": "tea",
    "hanja": "韻",
    "sub": "Hongyun",
    "alias": [
      "홍운 홍차",
      "대차21호",
      "타이차21호",
      "Hong Yun",
      "紅韻",
      "台茶21號"
    ],
    "hz": "紅韻",
    "hs": "红韵",
    "rom": "Hong Yun (TTES No.21)",
    "temp": 95,
    "tempRange": "90~95℃",
    "leaf": "5g",
    "water": "200ml",
    "steeps": [
      180,
      210
    ],
    "maxSteep": 2,
    "oxidationValue": 95,
    "traits": "t-morning t-afternoon a-fruit a-floral b-full k-sweet r-clean s-hot s-milk w-quick p-meal c-high m-energy",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "臺灣"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 아삼종과 기문종의 교잡 품종 홍운(대차21호)의 일월담 홍차입니다.",
        "홍옥(대차18호)과 나란히 일월담을 대표하지만, 유자·꽃 향의 새콤달콤한 결은 홍운만의 것입니다."
      ],
      "en": [
        "Withering → rolling → oxidation → drying — Sun Moon Lake black tea from Hong Yun (TTES No.21), assamica × Keemun.",
        "It shares Sun Moon Lake with Hong Yu (No.18), but the pomelo-and-flower sweet-sour line is Hong Yun's alone."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥。阿萨姆种与祁门种杂交品种红韵（台茶21号）的日月潭红茶。",
        "与红玉（台茶18号）同为日月潭代表，但柚香花香的酸甜是红韵独有的。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥。阿薩姆種與祁門種雜交品種紅韻（台茶21號）的日月潭紅茶。",
        "與紅玉（台茶18號）同為日月潭代表，但柚香花香的酸甜是紅韻獨有的。"
      ]
    },
    "ko": {
      "name": "홍운",
      "oneLine": "일월담의 대차21호 — 유자 향과 꽃향, 새콤달콤한 홍차.",
      "oxidation": "95%",
      "ratioNote": "200ml에 5g",
      "rounds": "1~2회",
      "steepBasis": "95도에서 3분, 2포 3분 30초.",
      "origin": "대만 난터우 위츠, 일월담 일대 해발 600~800m.",
      "process": "위조 → 유념 → 산화 → 건조. 아삼종과 기문종을 교잡한 품종 홍운(대차21호)으로 만듭니다.",
      "story": "대만 농업부 차 및 음료작물 개량장(구 차업개량장) 위츠분장에서 아삼종과 기문종을 교잡해 낸 품종이 홍운(紅韻, 대차21호)입니다. 기존 '일월담' 항목이 홍옥(대차18호) 중심인 데 비해, 홍운은 유자·꽃 향과 새콤달콤함이 앞서는 다른 품종입니다.",
      "flavor": "유자(柚) 향과 꽃향, 새콤달콤한 과일 맛. 홍옥의 계피·멘솔 계열과는 결이 다릅니다.",
      "pairing": "과일 디저트, 중식, 가벼운 케이크.",
      "brewTip": "95도에서 3분. 홍옥보다 향이 섬세해 우유 없이 마시는 쪽이 낫습니다.",
      "keep": "밀봉해 서늘하고 건조하게. 개봉 후 두 달 안.",
      "keywords": "홍운 일월담 대차21호 유자향 대만 홍차"
    },
    "en": {
      "name": "Hong Yun",
      "oneLine": "Sun Moon Lake's TTES No.21 — pomelo and flowers, sweet-and-sour black tea.",
      "oxidation": "95%",
      "ratioNote": "5 g to 200 ml",
      "rounds": "1–2 infusions",
      "steepBasis": "95 °C for 3 minutes, then 3½.",
      "origin": "Around Sun Moon Lake in Yuchi, Nantou, Taiwan, at 600–800 m.",
      "process": "Withering → rolling → oxidation → drying, from Hong Yun (TTES No.21), a cross of assamica and Keemun stock.",
      "story": "Hong Yun (紅韻, TTES No.21) was bred at the Yuchi branch of Taiwan's Tea and Beverage Crops Improvement Station from assamica × Keemun. Where the existing Sun Moon Lake entry centres on Hong Yu (No.18), Hong Yun is a different cultivar led by pomelo, flowers and a sweet-sour palate.",
      "flavor": "Pomelo and floral notes with a sweet-sour fruit palate — a different line from Hong Yu's cinnamon and menthol.",
      "pairing": "Fruit desserts, Chinese food, light cakes.",
      "brewTip": "95 °C for 3 minutes; its aroma is finer than Hong Yu's, so skip the milk.",
      "keep": "Sealed, cool and dry; within two months of opening.",
      "keywords": "Hong Yun Sun Moon Lake TTES No.21 pomelo Taiwan black tea"
    },
    "zh-CN": {
      "name": "红韵",
      "oneLine": "日月潭的台茶21号——柚香与花香，酸甜的红茶。",
      "oxidation": "95%",
      "ratioNote": "200毫升配5克",
      "rounds": "1~2泡",
      "steepBasis": "95度泡3分钟，第二泡3分30秒。",
      "origin": "台湾南投鱼池，日月潭一带海拔600~800米。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥。用阿萨姆种与祁门种杂交的红韵（台茶21号）制作。",
      "story": "红韵（台茶21号）是台湾茶及饮料作物改良场鱼池分场用阿萨姆种与祁门种杂交育成的品种。与以红玉（台茶18号）为主的“日月潭”条目不同，红韵以柚香、花香与酸甜见长，是另一个品种。",
      "flavor": "柚香与花香、酸甜的果味，与红玉的肉桂、薄荷系完全不同。",
      "pairing": "水果甜点、中餐、清淡蛋糕。",
      "brewTip": "95度3分钟。香气比红玉细，不加奶更好。",
      "keep": "密封、阴凉干燥，开封后两个月内。",
      "keywords": "红韵 日月潭 台茶21号 柚香 台湾红茶"
    },
    "zh-TW": {
      "name": "紅韻",
      "oneLine": "日月潭的台茶21號——柚香與花香，酸甜的紅茶。",
      "oxidation": "95%",
      "ratioNote": "200毫升配5公克",
      "rounds": "1~2泡",
      "steepBasis": "95度泡3分鐘，第二泡3分30秒。",
      "origin": "台灣南投魚池，日月潭一帶海拔600~800米。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥。用阿薩姆種與祁門種雜交的紅韻（台茶21號）製作。",
      "story": "紅韻（台茶21號）是台灣茶及飲料作物改良場魚池分場用阿薩姆種與祁門種雜交育成的品種。與以紅玉（台茶18號）為主的「日月潭」條目不同，紅韻以柚香、花香與酸甜見長，是另一個品種。",
      "flavor": "柚香與花香、酸甜的果味，與紅玉的肉桂、薄荷系完全不同。",
      "pairing": "水果甜點、中餐、清淡蛋糕。",
      "brewTip": "95度3分鐘。香氣比紅玉細，不加奶更好。",
      "keep": "密封、陰涼乾燥，開封後兩個月內。",
      "keywords": "紅韻 日月潭 台茶21號 柚香 台灣紅茶"
    },
    "originCountryCode": "tw"
  },
  {
    "id": "black-ziya",
    "group": "black",
    "kind": "tea",
    "hanja": "紫",
    "sub": "Ziya Shancha",
    "alias": [
      "대만 산차",
      "자아 산차",
      "Ziya Shancha",
      "紫芽山茶",
      "臺灣山茶"
    ],
    "hz": "紫芽山茶",
    "hs": "紫芽山茶",
    "rom": "Ziya Shancha (Taiwan Wild Mountain Tea)",
    "temp": 90,
    "tempRange": "85~90℃",
    "leaf": "3g",
    "water": "200ml",
    "steeps": [
      120,
      150,
      180
    ],
    "maxSteep": 3,
    "oxidationValue": 90,
    "traits": "t-afternoon a-herb a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    "originCountry": {
      "ko": "대만",
      "en": "Taiwan",
      "zh-CN": "台湾",
      "zh-TW": "臺灣"
    },
    "x": {
      "ko": [
        "위조 → 유념 → 산화 → 건조. 야생화한 아삼 노수와 자생 산차의 잎으로 만든 홍차입니다.",
        "일월담 홍차의 원류에 가까운 차로, 수령 높은 나무가 많고 생산량이 적어 귀하게 취급됩니다."
      ],
      "en": [
        "Withering → rolling → oxidation → drying — black tea from naturalised old assamica and native mountain stock.",
        "Close to the source of Sun Moon Lake tea: many high-aged trees, little leaf, and a prized status."
      ],
      "zh-CN": [
        "萎凋 → 揉捻 → 发酵 → 干燥。野生化阿萨姆老树与原生山茶的红茶。",
        "接近日月潭红茶源头的一款，老树多、产量少，备受珍视。"
      ],
      "zh-TW": [
        "萎凋 → 揉捻 → 發酵 → 乾燥。野生化阿薩姆老樹與原生山茶的紅茶。",
        "接近日月潭紅茶源頭的一款，老樹多、產量少，備受珍視。"
      ]
    },
    "ko": {
      "name": "자아산차",
      "oneLine": "대만 자생 산차의 자색 싹으로 만드는 홍차 — 적고 귀한 일월담의 또 다른 얼굴.",
      "oxidation": "약 90%",
      "ratioNote": "200ml에 3g",
      "rounds": "3회",
      "steepBasis": "90도에서 2분, 2포 2분 30초, 3포 3분.",
      "origin": "대만 난터우 일월담 일대. 대만 자생 산차(山茶) 가운데 자줏빛 싹이 도는 나무에서 땁니다.",
      "process": "위조 → 유념 → 산화 → 건조. 자색 싹을 골라 소량씩 모아 만듭니다.",
      "story": "자아산차(紫芽山茶)는 대만 자생 산차의 자줏빛 어린 싹을 가리키는 이름입니다. 일월담 일대에서 소량 만들어지며, 산차 특유의 야성적인 향과 진한 맛으로 고급으로 취급됩니다.",
      "flavor": "야생 꿀과 허브, 말린 과일의 깊은 단맛. 재배 품종보다 거칠고 긴 여운.",
      "pairing": "견과류, 말린 과일, 숙성 치즈.",
      "brewTip": "90도에서 2분. 노수 잎은 뒤로 갈수록 단맛이 깊어집니다.",
      "keep": "밀봉해 서늘하고 건조하게. 개봉 후 두 달 안.",
      "keywords": "자아산차 대만 산차 일월담 야생 노수 홍차"
    },
    "en": {
      "name": "Ziya Shancha",
      "oneLine": "Black tea from the purple buds of Taiwan's native mountain tea — Sun Moon Lake's rarer face.",
      "oxidation": "About 90%",
      "ratioNote": "3 g to 200 ml",
      "rounds": "3 infusions",
      "steepBasis": "90 °C for 2 minutes, then 2½, then 3.",
      "origin": "Around Sun Moon Lake, Nantou — picked from native Taiwanese mountain tea (Camellia formosensis) trees that flush purple buds.",
      "process": "Withering → rolling → oxidation → drying, gathered in small lots from purple-flushing trees.",
      "story": "Ziya Shancha (紫芽山茶) names the purple young buds of Taiwan's native mountain tea. Made in small lots around Sun Moon Lake, it is prized for its wild, deep character.",
      "flavor": "Wild honey, herbs and dried fruit in a deep sweetness — rougher and longer than planted cultivars.",
      "pairing": "Nuts, dried fruit, aged cheese.",
      "brewTip": "90 °C for 2 minutes; old-tree leaf sweetens as the infusions go on.",
      "keep": "Sealed, cool and dry; within two months of opening.",
      "keywords": "Ziya Shancha Taiwan wild mountain tea Sun Moon Lake old tree black tea"
    },
    "zh-CN": {
      "name": "紫芽山茶",
      "oneLine": "台湾原生山茶的紫芽红茶——日月潭产量稀少的另一面。",
      "oxidation": "约90%",
      "ratioNote": "200毫升配3克",
      "rounds": "3泡",
      "steepBasis": "90度泡2分钟，第二泡2分30秒，第三泡3分钟。",
      "origin": "台湾南投日月潭一带，采自会发紫芽的台湾原生山茶。",
      "process": "萎凋 → 揉捻 → 发酵 → 干燥。挑选紫芽少量收集制作。",
      "story": "紫芽山茶指台湾原生山茶的紫色嫩芽。日月潭一带少量制作，以山茶特有的野性香气与浓厚滋味被视为高级茶。",
      "flavor": "野蜂蜜、草本与干果的深甜，比栽培品种更粗犷、余韵更长。",
      "pairing": "坚果、干果、熟成奶酪。",
      "brewTip": "90度2分钟。老树叶越泡到后面越甜。",
      "keep": "密封、阴凉干燥，开封后两个月内。",
      "keywords": "紫芽山茶 台湾山茶 日月潭 野生 老树 红茶"
    },
    "zh-TW": {
      "name": "紫芽山茶",
      "oneLine": "台灣原生山茶的紫芽紅茶——日月潭產量稀少的另一面。",
      "oxidation": "約90%",
      "ratioNote": "200毫升配3公克",
      "rounds": "3泡",
      "steepBasis": "90度泡2分鐘，第二泡2分30秒，第三泡3分鐘。",
      "origin": "台灣南投日月潭一帶，採自會發紫芽的台灣原生山茶。",
      "process": "萎凋 → 揉捻 → 發酵 → 乾燥。挑選紫芽少量收集製作。",
      "story": "紫芽山茶指台灣原生山茶的紫色嫩芽。日月潭一帶少量製作，以山茶特有的野性香氣與濃厚滋味被視為高級茶。",
      "flavor": "野蜂蜜、草本與乾果的深甜，比栽培品種更粗獷、餘韻更長。",
      "pairing": "堅果、乾果、熟成起司。",
      "brewTip": "90度2分鐘。老樹葉越泡到後面越甜。",
      "keep": "密封、陰涼乾燥，開封後兩個月內。",
      "keywords": "紫芽山茶 台灣山茶 日月潭 野生 老樹 紅茶"
    },
    "originCountryCode": "tw"
  },
  {
    "alias": [
      "자스민용주",
      "말리용주",
      "자스민 우롱",
      "茉莉龍珠",
      "말리우롱"
    ],
    "en": {
      "brewTip": "Brew in glass to watch the pearls unfurl; give the first steep time to open.",
      "flavor": "Clear jasmine floral over a gentle vegetal sweetness. Pale cream liquor.",
      "keep": "Sealed and cool — the scent fades fast; finish within two to three months of opening.",
      "keywords": "jasmine dragon pearls oolong Taiwan scented",
      "name": "Jasmine Dragon Pearls Oolong",
      "oneLine": "Lightly oxidised oolong rolled into pearls and scented with jasmine.",
      "origin": "Produced in Taiwan from lightly oxidised oolong rolled into pearls.",
      "oxidation": "About 20%",
      "pairing": "Dim sum, light desserts, fruit. Heavy food overwhelms its delicacy.",
      "process": "Withering, light oxidation, rolling leaf and bud into pearls, drying, then scenting with fresh jasmine blossom.",
      "ratioNote": "3 g to 150 ml",
      "rounds": "3 or more infusions",
      "steepBasis": "85–90 °C: 2 minutes, then 1½, then 2. The pearls open slowly and the scent blooms with them.",
      "story": "Jasmine dragon pearls made their name in Fujian on a green-tea base; the Taiwanese kind is made on a lightly oxidised oolong base, so a soft oolong body carries the jasmine."
    },
    "group": "oolong",
    "hanja": "珠",
    "hs": "茉莉龍珠",
    "hz": "茉莉龙珠",
    "id": "oolong-jasmine",
    "kind": "tea",
    "ko": {
      "brewTip": "유리 다구로 우리면 구슬이 풀리는 모습까지 즐길 수 있습니다. 첫 포는 구슬이 열리는 시간이 필요합니다.",
      "flavor": "맑은 자스민 꽃향과 은은한 풀 내음, 부드러운 단맛. 물색은 옅은 크림빛입니다.",
      "keep": "향이 날아가기 쉬워 밀봉해 서늘하게, 개봉 후 두세 달 안에 드세요.",
      "keywords": "자스민 용주 우롱 말리 대만 구슬차",
      "name": "자스민 용주",
      "oneLine": "가볍게 산화시킨 우롱을 구슬처럼 말아 자스민 향을 입힌 차.",
      "origin": "대만에서 생산됩니다. 가볍게 산화시킨 우롱 찻잎을 구슬처럼 말아 만듭니다.",
      "oxidation": "약 20%",
      "pairing": "딤섬, 가벼운 디저트, 과일. 향이 섬세해 진한 음식과는 부딪힙니다.",
      "process": "위조 → 가벼운 산화 → 잎과 싹을 구슬 모양으로 말기 → 건조 → 생자스민 꽃으로 흡향.",
      "ratioNote": "150ml에 3g",
      "rounds": "3회 이상",
      "steepBasis": "85~90도에서 1포 2분, 2포 1분 30초, 3포 2분. 구슬이 천천히 풀리며 향이 번집니다.",
      "story": "자스민 용주는 원래 푸젠에서 녹차를 말아 만든 차로 이름났지만, 대만의 용주는 우롱을 소차로 써서, 자스민 향 아래로 우롱의 부드러움이 받쳐 주는 것이 다릅니다."
    },
    "leaf": "3g",
    "maxSteep": 3,
    "originCountry": {
      "en": "Taiwan",
      "ko": "대만",
      "zh-CN": "台湾",
      "zh-TW": "台灣"
    },
    "originCountryCode": "tw",
    "oxidationValue": 20,
    "rom": "Moli Longzhu Oolong",
    "steeps": [
      120,
      90,
      120
    ],
    "sub": "Jasmine Dragon Pearls Oolong",
    "temp": 90,
    "tempRange": "85~90℃",
    "traits": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    "water": "150ml",
    "x": {
      "en": [
        "A lightly oxidised oolong rolled into pearls and scented with fresh jasmine blossom.",
        "Jasmine dragon pearls are usually green-tea based (Fujian); the Taiwanese kind uses an oolong base, which is rarer."
      ],
      "ko": [
        "가볍게 산화시킨 우롱을 구슬 모양으로 말아, 생자스민 꽃으로 향을 입힌(흡향) 차입니다.",
        "자스민 용주는 보통 푸젠의 녹차 소차가 유명하지만, 대만의 것은 우롱 소차를 쓴 드문 경우입니다."
      ],
      "zh-CN": [
        "轻发酵乌龙揉成龙珠形，再以新鲜茉莉花窨制。",
        "茉莉龙珠多以福建绿茶为茶坯，台湾的这一款则以乌龙为坯，较为少见。"
      ],
      "zh-TW": [
        "輕發酵烏龍揉成龍珠形，再以新鮮茉莉花窨製。",
        "茉莉龍珠多以福建綠茶為茶坯，臺灣的這一款則以烏龍為坯，較為少見。"
      ]
    },
    "zh-CN": {
      "brewTip": "用玻璃茶具冲泡，可欣赏龙珠舒展。第一泡要留足展开的时间。",
      "flavor": "茉莉花香清雅，带淡淡青甜，汤色浅乳白。",
      "keep": "花香易散，密封阴凉保存，开封后两三个月内喝完。",
      "keywords": "茉莉龙珠 乌龙 台湾 窨花",
      "name": "茉莉龙珠乌龙",
      "oneLine": "轻发酵乌龙揉成龙珠，再窨入茉莉花香。",
      "origin": "产于台湾，以轻发酵乌龙揉成龙珠。",
      "oxidation": "约20%",
      "pairing": "点心、清淡甜品、水果。味道浓重的食物会盖过它的细腻。",
      "process": "萎凋 → 轻发酵 → 把叶芽揉成龙珠 → 干燥 → 以新鲜茉莉花窨制。",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡以上",
      "steepBasis": "85~90度，第一泡2分钟，第二泡1分半，第三泡2分钟。龙珠慢慢舒展，花香随之散开。",
      "story": "茉莉龙珠原以福建绿茶茶坯闻名，台湾的这一款则以轻发酵乌龙为坯，茉莉香之下多了乌龙的柔润。"
    },
    "zh-TW": {
      "brewTip": "用玻璃茶具沖泡，可欣賞龍珠舒展。第一泡要留足展開的時間。",
      "flavor": "茉莉花香清雅，帶淡淡青甜，湯色淺乳白。",
      "keep": "花香易散，密封陰涼保存，開封後兩三個月內喝完。",
      "keywords": "茉莉龍珠 烏龍 臺灣 窨花",
      "name": "茉莉龍珠烏龍",
      "oneLine": "輕發酵烏龍揉成龍珠，再窨入茉莉花香。",
      "origin": "產於臺灣，以輕發酵烏龍揉成龍珠。",
      "oxidation": "約20%",
      "pairing": "點心、清淡甜品、水果。味道濃重的食物會蓋過它的細膩。",
      "process": "萎凋 → 輕發酵 → 把葉芽揉成龍珠 → 乾燥 → 以新鮮茉莉花窨製。",
      "ratioNote": "150毫升配3克",
      "rounds": "3泡以上",
      "steepBasis": "85~90度，第一泡2分鐘，第二泡1分半，第三泡2分鐘。龍珠慢慢舒展，花香隨之散開。",
      "story": "茉莉龍珠原以福建綠茶茶坯聞名，臺灣的這一款則以輕發酵烏龍為坯，茉莉香之下多了烏龍的柔潤。"
    }
  }
];
  TEAS = TEAS.concat(EXTRA_TEAS);

  /* ── BEGIN 나무위키 보강 (2026-11-24) ── */
  var NAMU_TEAS = [
 {
  "id": "herb-nurungji",
  "group": "everyday",
  "kind": "tea",
  "hanja": "鍋",
  "sub": "Scorched Rice Tea",
  "alias": [
   "숭늉",
   "누룽지"
  ],
  "hz": "鍋巴",
  "hs": "锅巴",
  "rom": "Nurungji-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-light k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "누룽지차",
   "솥바닥에 눌은 밥을 말려 끓인 구수한 차 — 밥알의 단맛이 오래 남습니다.",
   "무산화 · 카페인 없음",
   "300ml에 5g",
   "2회",
   "95도에서 5분. 끓이면 더 구수해집니다.",
   "한국. 밥을 지은 뒤 솥에 눌은 누룽지를 말려 씁니다.",
   "볶은 밥의 고소함과 옅은 단맛, 끝에 아주 가벼운 탄 향.",
   "아침, 식후, 담백한 죽이나 나물.",
   "누룽지를 뜨거운 물에 잠깐 불린 뒤 끓이면 국물이 맑고 구수합니다."
  ],
  "en": [
   "Scorched Rice Tea",
   "Dried crust of cooked rice simmered in water — a warm, nutty cup with the sweetness of toasted grain.",
   "None · caffeine-free",
   "5 g to 300 ml",
   "2 infusions",
   "95 °C for 5 minutes; simmering brings out more of the roast.",
   "Korea. The golden crust left in the rice pot is dried and kept for tea.",
   "Toasted rice, light sweetness, a faint char at the end.",
   "Breakfast, after meals, with plain porridge or namul.",
   "Soak the crust briefly, then simmer — the broth stays clear and nutty."
  ],
  "zh-CN": [
   "锅巴茶",
   "把锅底结成的饭锅巴晒干煮水——带米饭焦香的暖茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克",
   "2泡",
   "95度煮5分钟，煮久更香。",
   "韩国。煮饭后把锅底的锅巴晒干保存。",
   "焙米的香与淡甜，尾端一点焦香。",
   "早餐、饭后、配清淡的粥或小菜。",
   "锅巴先用热水泡软再煮，汤色更清。"
  ],
  "zh-TW": [
   "鍋巴茶",
   "把鍋底結成的飯鍋巴曬乾煮水——帶米飯焦香的暖茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克",
   "2泡",
   "95度煮5分鐘，煮久更香。",
   "韓國。煮飯後把鍋底的鍋巴曬乾保存。",
   "焙米的香與淡甜，尾端一點焦香。",
   "早餐、飯後、配清淡的粥或小菜。",
   "鍋巴先用熱水泡軟再煮，湯色更清。"
  ],
  "x": {
   "ko": [
    "밥을 지은 뒤 솥에 눌은 부분을 말려 두었다가 물에 끓입니다.",
    "밥솥 바닥의 누룽지를 아껴 물에 끓여 마신 데서 왔고, 숭늉이라고도 부릅니다."
   ],
   "en": [
    "The crust left at the bottom of the rice pot is dried, then simmered in water.",
    "It comes from saving the scorched layer of rice and boiling it in water; it is also called sungnyung."
   ],
   "zh-CN": [
    "把煮饭后锅底结成的锅巴晒干，再加水煮开。",
    "源于珍惜锅底的锅巴、加水煮成汤喝的习惯，也叫“숭늉”。"
   ],
   "zh-TW": [
    "把煮飯後鍋底結成的鍋巴曬乾，再加水煮開。",
    "源於珍惜鍋底的鍋巴、加水煮成湯喝的習慣，也叫「숭늉」。"
   ]
  }
 },
 {
  "id": "herb-corn",
  "group": "everyday",
  "kind": "tea",
  "hanja": "玉",
  "sub": "Corn Tea",
  "alias": [
   "옥수수수염차와 다른 옥수수 알차"
  ],
  "hz": "玉米",
  "hs": "玉米",
  "rom": "Oksusu-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast a-grass b-light k-sweet r-clean s-hot s-iced w-quick p-meal c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "옥수수차",
   "볶은 옥수수 알을 끓인 노란 차 — 구수함과 옅은 단맛.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "95도에서 5분. 알을 볶아 두면 향이 살아납니다.",
   "한국·중국 동북. 잘 익은 옥수수 알을 말려 볶습니다.",
   "볶은 옥수수의 고소함과 단맛, 가벼운 곡물 향.",
   "식후, 아이 간식, 매운 음식.",
   "볶은 알을 반으로 갈아 끓이면 속까지 우러납니다."
  ],
  "en": [
   "Corn Tea",
   "Roasted corn kernels boiled into a golden, gently sweet cup.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "95 °C for 5 minutes; roasting the kernels first keeps the aroma.",
   "Korea and northeast China. Ripe kernels are dried and roasted.",
   "Toasted corn, sweetness, a light grain aroma.",
   "After meals, for children, with spicy food.",
   "Crack the roasted kernels before boiling so the inside infuses too."
  ],
  "zh-CN": [
   "玉米茶",
   "把炒过的玉米粒煮成金黄色的茶，带焙香与淡甜。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "95度煮5分钟，先把玉米粒炒过更香。",
   "韩国与中国东北。成熟玉米粒晒干后炒制。",
   "焙玉米的香与甜，清淡的谷物气息。",
   "饭后、孩子、配辛辣食物。",
   "炒过的玉米粒掰开再煮，里面也容易出味。"
  ],
  "zh-TW": [
   "玉米茶",
   "把炒過的玉米粒煮成金黃色的茶，帶焙香與淡甜。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "95度煮5分鐘，先把玉米粒炒過更香。",
   "韓國與中國東北。成熟玉米粒曬乾後炒製。",
   "焙玉米的香與甜，清淡的穀物氣息。",
   "飯後、孩子、配辛辣食物。",
   "炒過的玉米粒掰開再煮，裡面也容易出味。"
  ],
  "x": {
   "ko": [
    "옥수수 알을 말려 볶은 뒤 물에 끓입니다. 옥수수수염을 넣으면 더 맑은 단맛이 납니다.",
    "한국에서는 식당의 보리차 항아리에 옥수수차를 함께 넣는 집이 많습니다."
   ],
   "en": [
    "Dried kernels are roasted and simmered; a few corn silks add a cleaner sweetness.",
    "In Korea it often shares the barley-tea jar at restaurants."
   ],
   "zh-CN": [
    "玉米粒晒干炒香后加水煮开；加一点玉米须，甜味更清爽。",
    "在韩国，餐馆的麦茶桶里常会一起放玉米茶。"
   ],
   "zh-TW": [
    "玉米粒曬乾炒香後加水煮開；加一點玉米鬚，甜味更清爽。",
    "在韓國，餐館的麥茶桶裡常會一起放玉米茶。"
   ]
  }
 },
 {
  "id": "herb-sorghum",
  "group": "everyday",
  "kind": "tea",
  "hanja": "高",
  "sub": "Sorghum Tea",
  "alias": [
   "수수"
  ],
  "hz": "高粱",
  "hs": "高粱",
  "rom": "Susu-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-light k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "수수차",
   "붉은 수수 알을 볶아 끓인 차 — 구수하고 살짝 떫습니다.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "95도에서 5분. 볶은 알을 갈아 넣으면 진합니다.",
   "한국. 붉은 수수 알을 말려 볶습니다.",
   "볶은 곡물의 고소함과 수수 특유의 옅은 떫음.",
   "식후, 겨울, 나물밥.",
   "수수는 떫은맛이 있어 첫 물을 버리고 두 번째 물을 마시면 부드럽습니다."
  ],
  "en": [
   "Sorghum Tea",
   "Roasted red sorghum simmered into a nutty cup with a faint astringency.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "95 °C for 5 minutes; grind the roasted grain for a stronger cup.",
   "Korea. Red sorghum grain is dried and roasted.",
   "Toasted grain, sorghum's own light astringency.",
   "After meals, in winter, with vegetable rice.",
   "Sorghum can be astringent: discard the first water and drink the second."
  ],
  "zh-CN": [
   "高粱茶",
   "把红高粱炒过后煮成的茶，焙香里带一点涩。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "95度煮5分钟，把炒过的米粒磨碎更浓。",
   "韩国。红高粱晒干后炒制。",
   "焙谷物的香与高粱特有的淡涩。",
   "饭后、冬天、配野菜饭。",
   "高粱有涩味，倒掉第一遍水喝第二遍会更柔。"
  ],
  "zh-TW": [
   "高粱茶",
   "把紅高粱炒過後煮成的茶，焙香裡帶一點澀。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "95度煮5分鐘，把炒過的米粒磨碎更濃。",
   "韓國。紅高粱曬乾後炒製。",
   "焙穀物的香與高粱特有的淡澀。",
   "飯後、冬天、配野菜飯。",
   "高粱有澀味，倒掉第一遍水喝第二遍會更柔。"
  ],
  "x": {
   "ko": [
    "수수 알을 말려 볶은 뒤 끓입니다. 좁쌀·기장과 섞어 끓이기도 합니다.",
    "보릿고개에 쌀을 아끼려 수수를 볶아 물에 우려 마신 데서 널리 퍼졌습니다."
   ],
   "en": [
    "Sorghum grain is dried, roasted and simmered, sometimes with millet.",
    "It spread as a way to stretch rice in lean years, roasted and steeped in water."
   ],
   "zh-CN": [
    "高粱粒晒干炒香后煮水，也会和小米、黍米一起煮。",
    "过去为了省米，把高粱炒过泡水喝，就这样传开。"
   ],
   "zh-TW": [
    "高粱粒曬乾炒香後煮水，也會和小米、黍米一起煮。",
    "過去為了省米，把高粱炒過泡水喝，就這樣傳開。"
   ]
  }
 },
 {
  "id": "herb-coix",
  "group": "everyday",
  "kind": "tea",
  "hanja": "薏",
  "sub": "Job's Tears Tea",
  "alias": [
   "율무",
   "의이인차"
  ],
  "hz": "薏苡",
  "hs": "薏苡",
  "rom": "Yulmu-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "10g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "율무차",
   "율무를 볶아 끓인 걸쭉한 곡물차 — 고소함과 부드러운 단맛.",
   "무산화 · 카페인 없음",
   "400ml에 10g",
   "2회",
   "95도에서 5분. 갈아 넣으면 죽처럼 걸쭉해집니다.",
   "한국·중국. 율무 알을 말려 볶습니다.",
   "볶은 곡물의 고소함과 은은한 단맛, 걸쭉한 질감.",
   "아침, 식후, 붓기 걱정하는 날.",
   "볶은 율무를 갈아 넣으면 물에 잘 풀리고 속이 편합니다."
  ],
  "en": [
   "Job's Tears Tea",
   "Roasted Job's tears simmered into a smooth, lightly thick grain tea.",
   "None · caffeine-free",
   "10 g to 400 ml",
   "2 infusions",
   "95 °C for 5 minutes; grind the roasted grain for a porridge-like body.",
   "Korea and China. The grains are dried and roasted.",
   "Roasted grain, gentle sweetness, a soft body.",
   "Breakfast, after meals, on days you feel puffy.",
   "Grind the roasted grain so it disperses and sits easily."
  ],
  "zh-CN": [
   "薏米茶",
   "把薏米炒过后煮成的浓稠谷物茶，香而柔甜。",
   "不发酵 · 无咖啡因",
   "400毫升配10克",
   "2泡",
   "95度煮5分钟，磨碎后会有粥一样的口感。",
   "韩国与中国。薏米晒干后炒制。",
   "焙谷物的香与淡淡甜味，口感浓稠。",
   "早餐、饭后、觉得身体浮肿的日子。",
   "把炒过的薏米磨碎再煮，容易化开也更温和。"
  ],
  "zh-TW": [
   "薏米茶",
   "把薏米炒過後煮成的濃稠穀物茶，香而柔甜。",
   "不發酵 · 無咖啡因",
   "400毫升配10公克",
   "2泡",
   "95度煮5分鐘，磨碎後會有粥一樣的口感。",
   "韓國與中國。薏米曬乾後炒製。",
   "焙穀物的香與淡淡甜味，口感濃稠。",
   "早餐、飯後、覺得身體浮腫的日子。",
   "把炒過的薏米磨碎再煮，容易化開也更溫和。"
  ],
  "x": {
   "ko": [
    "율무 알을 말려 볶은 뒤 끓이거나 갈아 넣습니다.",
    "예부터 여름철 붓기를 빼는 곡물로 여겨 율무죽과 함께 율무차를 마셨습니다."
   ],
   "en": [
    "The grains are dried, roasted and simmered, sometimes ground in.",
    "Long valued in summer for puffiness, it was drunk alongside Job's tears porridge."
   ],
   "zh-CN": [
    "薏米晒干炒香后煮水，也可以磨碎加入。",
    "自古夏天用来祛湿，常和薏米粥一起喝。"
   ],
   "zh-TW": [
    "薏米曬乾炒香後煮水，也可以磨碎加入。",
    "自古夏天用來祛濕，常和薏米粥一起喝。"
   ]
  }
 },
 {
  "id": "herb-mungbean",
  "group": "everyday",
  "kind": "tea",
  "hanja": "綠",
  "sub": "Mung Bean Tea",
  "alias": [
   "녹두"
  ],
  "hz": "綠豆",
  "hs": "绿豆",
  "rom": "Nokdu-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "10g",
  "water": "500ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "녹두차",
   "녹두를 삶아 우린 맑고 서늘한 차 — 여름에 마시는 곡물차.",
   "무산화 · 카페인 없음",
   "500ml에 10g",
   "2회",
   "95도에서 10분. 삶은 물을 그대로 마십니다.",
   "한국·중국. 녹두를 씻어 삶아 물만 마십니다.",
   "삶은 콩의 담백함과 옅은 떫음, 서늘한 끝맛.",
   "더운 날, 기름진 식사 뒤.",
   "녹두는 껍질째 삶아야 맛이 납니다. 차게 식혀 마셔도 좋습니다."
  ],
  "en": [
   "Mung Bean Tea",
   "Mung beans boiled and strained — a clear, cooling grain tea for hot days.",
   "None · caffeine-free",
   "10 g to 500 ml",
   "2 infusions",
   "95 °C for 10 minutes; drink the cooking water.",
   "Korea and China. Beans are washed and boiled, and the water is drunk.",
   "Clean bean flavour, a faint astringency, a cool finish.",
   "Hot days, after rich meals.",
   "Boil the beans whole; it is good chilled too."
  ],
  "zh-CN": [
   "绿豆茶",
   "把绿豆煮开后的清汤——夏天喝的清凉谷物茶。",
   "不发酵 · 无咖啡因",
   "500毫升配10克",
   "2泡",
   "95度煮10分钟，直接喝煮豆的水。",
   "韩国与中国。绿豆洗净煮熟，取汤饮用。",
   "煮豆的清淡味，尾端一点涩，入口凉爽。",
   "炎热的日子、油腻饭后。",
   "绿豆带皮煮才香，放凉喝也好。"
  ],
  "zh-TW": [
   "綠豆茶",
   "把綠豆煮開後清湯——夏天喝的清涼穀物茶。",
   "不發酵 · 無咖啡因",
   "500毫升配10公克",
   "2泡",
   "95度煮10分鐘，直接喝煮豆的水。",
   "韓國與中國。綠豆洗淨煮熟，取湯飲用。",
   "煮豆的清淡味，尾端一點澀，入口涼爽。",
   "炎熱的日子、油膩飯後。",
   "綠豆帶皮煮才香，放涼喝也好。"
  ],
  "x": {
   "ko": [
    "녹두를 씻어 껍질째 삶고, 물만 따라 마십니다.",
    "중국에서는 녹두탕으로 더위를 식혔고, 한국에서는 삶은 물을 차로 마셨습니다."
   ],
   "en": [
    "Beans are washed, boiled whole and the water poured off to drink.",
    "In China mung bean soup cools the summer; in Korea the cooking water is drunk as tea."
   ],
   "zh-CN": [
    "绿豆洗净带皮煮熟，只取汤喝。",
    "中国夏天喝绿豆汤消暑，韩国则把煮豆水当茶喝。"
   ],
   "zh-TW": [
    "綠豆洗淨帶皮煮熟，只取湯喝。",
    "中國夏天喝綠豆湯消暑，韓國則把煮豆水當茶喝。"
   ]
  }
 },
 {
  "id": "herb-redbean",
  "group": "everyday",
  "kind": "tea",
  "hanja": "紅",
  "sub": "Red Bean Tea",
  "alias": [
   "팥",
   "적두차"
  ],
  "hz": "紅豆",
  "hs": "红豆",
  "rom": "Pat-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "10g",
  "water": "500ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "팥차",
   "팥을 삶아 우린 붉고 부드러운 곡물차 — 은은한 단맛.",
   "무산화 · 카페인 없음",
   "500ml에 10g",
   "2회",
   "95도에서 15분. 팥알이 터지면 충분합니다.",
   "한국·일본. 붉은 팥을 씻어 삶습니다.",
   "삶은 팥의 고소함과 밤 같은 단맛, 가벼운 떫음.",
   "추운 날, 식후, 단 디저트와.",
   "팥은 첫 물을 버리고 다시 삶으면 떫음이 줄고 맛이 맑습니다."
  ],
  "en": [
   "Red Bean Tea",
   "Adzuki beans simmered into a warm red cup with a soft, chestnut-like sweetness.",
   "None · caffeine-free",
   "10 g to 500 ml",
   "2 infusions",
   "95 °C for 15 minutes, until the beans split.",
   "Korea and Japan. Red adzuki beans are washed and simmered.",
   "Toasted bean, chestnut sweetness, a light astringency.",
   "Cold days, after meals, with sweets.",
   "Discard the first water and simmer again for a cleaner taste."
  ],
  "zh-CN": [
   "红豆茶",
   "把红豆煮开的红褐色谷物茶，带柔和的栗子甜。",
   "不发酵 · 无咖啡因",
   "500毫升配10克",
   "2泡",
   "95度煮15分钟，豆子裂开即可。",
   "韩国与日本。红豆洗净后煮熟。",
   "煮豆的香与栗子般的甜，轻微涩味。",
   "寒冷的日子、饭后、配甜点。",
   "倒掉第一遍水再煮，涩味会少，味道更清。"
  ],
  "zh-TW": [
   "紅豆茶",
   "把紅豆煮開的紅褐色穀物茶，帶柔和的栗子甜。",
   "不發酵 · 無咖啡因",
   "500毫升配10公克",
   "2泡",
   "95度煮15分鐘，豆子裂開即可。",
   "韓國與日本。紅豆洗淨後煮熟。",
   "煮豆的香與栗子般的甜，輕微澀味。",
   "寒冷的日子、飯後、配甜點。",
   "倒掉第一遍水再煮，澀味會少，味道更清。"
  ],
  "x": {
   "ko": [
    "붉은 팥을 씻어 삶고, 물을 따라 마십니다. 팥알을 함께 넣기도 합니다.",
    "일본에서는 팥차를 추위를 이기는 차로, 한국에서는 팥죽의 물을 차로 마셨습니다."
   ],
   "en": [
    "Red adzuki beans are washed, simmered and the liquid drunk, sometimes with the beans.",
    "In Japan it warms the winter; in Korea the liquid from red bean porridge was drunk as tea."
   ],
   "zh-CN": [
    "红豆洗净煮熟，取汤喝，也会连豆一起。",
    "日本把它当作驱寒茶，韩国则把红豆粥的汤当茶喝。"
   ],
   "zh-TW": [
    "紅豆洗淨煮熟，取湯喝，也會連豆一起。",
    "日本把它當作驅寒茶，韓國則把紅豆粥的湯當茶喝。"
   ]
  }
 },
 {
  "id": "herb-perilla",
  "group": "everyday",
  "kind": "tea",
  "hanja": "紫",
  "sub": "Perilla Seed Tea",
  "alias": [
   "들깨",
   "자소자차"
  ],
  "hz": "紫蘇子",
  "hs": "紫苏子",
  "rom": "Deulkkae-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "들깨차",
   "들깨를 갈아 끓인 고소하고 걸쭉한 차 — 겨울의 한 잔.",
   "무산화 · 카페인 없음",
   "300ml에 8g",
   "2회",
   "95도에서 5분. 갈아 넣으면 물에 풀려 걸쭉해집니다.",
   "한국. 들깨를 볶아 갈아 씁니다.",
   "볶은 들깨의 진한 고소함과 부드러운 단맛.",
   "아침, 추운 날, 나물밥.",
   "들깨는 갈아야 향이 나고, 끓이면서 저어야 가라앉지 않습니다."
  ],
  "en": [
   "Perilla Seed Tea",
   "Ground perilla seeds simmered into a nutty, creamy cup for winter.",
   "None · caffeine-free",
   "8 g to 300 ml",
   "2 infusions",
   "95 °C for 5 minutes; ground seeds disperse into the water.",
   "Korea. Perilla seeds are roasted and ground.",
   "Deep roasted-seed richness and a soft sweetness.",
   "Breakfast, cold days, with vegetable rice.",
   "Grind the seeds to release the aroma and stir while simmering."
  ],
  "zh-CN": [
   "紫苏子茶",
   "把紫苏子磨碎煮成的浓香茶——冬天的一杯。",
   "不发酵 · 无咖啡因",
   "300毫升配8克",
   "2泡",
   "95度煮5分钟，磨碎后能融入水中。",
   "韩国。紫苏子炒香后磨碎使用。",
   "焙籽的浓香与柔和的甜。",
   "早餐、寒冷的日子、配野菜饭。",
   "紫苏子要磨碎才出香，煮时要搅拌免得沉底。"
  ],
  "zh-TW": [
   "紫蘇子茶",
   "把紫蘇子磨碎煮成的濃香茶——冬天的一杯。",
   "不發酵 · 無咖啡因",
   "300毫升配8公克",
   "2泡",
   "95度煮5分鐘，磨碎後能融入水中。",
   "韓國。紫蘇子炒香後磨碎使用。",
   "焙籽的濃香與柔和的甜。",
   "早餐、寒冷的日子、配野菜飯。",
   "紫蘇子要磨碎才出香，煮時要攪拌免得沉底。"
  ],
  "x": {
   "ko": [
    "들깨를 볶아 곱게 갈고 물에 풀어 끓입니다.",
    "한국에서는 들깨죽과 함께 겨울 보양 음식으로 들깨차를 마셨습니다."
   ],
   "en": [
    "Perilla seeds are roasted, finely ground and simmered in water.",
    "In Korea it was drunk with perilla porridge as winter nourishment."
   ],
   "zh-CN": [
    "紫苏子炒香磨细，加水煮开。",
    "韩国冬天把它和紫苏粥一起当补养食品。"
   ],
   "zh-TW": [
    "紫蘇子炒香磨細，加水煮開。",
    "韓國冬天把它和紫蘇粥一起當補養食品。"
   ]
  }
 },
 {
  "id": "herb-peanut",
  "group": "everyday",
  "kind": "tea",
  "hanja": "花",
  "sub": "Peanut Tea",
  "alias": [
   "땅콩",
   "낙화생차"
  ],
  "hz": "花生",
  "hs": "花生",
  "rom": "Ttangkong-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "10g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "땅콩차",
   "볶은 땅콩을 끓인 고소하고 고소한 차.",
   "무산화 · 카페인 없음",
   "400ml에 10g",
   "2회",
   "95도에서 7분. 볶은 땅콩을 반으로 갈아 넣습니다.",
   "한국·중국. 땅콩을 볶아 껍질을 벗겨 씁니다.",
   "볶은 땅콩의 진한 고소함과 옅은 단맛.",
   "아침, 겨울, 단 과자.",
   "볶은 땅콩의 얇은 껍질을 벗겨야 쓴맛이 없습니다."
  ],
  "en": [
   "Peanut Tea",
   "Roasted peanuts simmered into a rich, savoury-sweet cup.",
   "None · caffeine-free",
   "10 g to 400 ml",
   "2 infusions",
   "95 °C for 7 minutes; split the roasted nuts first.",
   "Korea and China. Peanuts are roasted and skinned.",
   "Deep roasted peanut, a light sweetness.",
   "Breakfast, winter, with sweet snacks.",
   "Skin the roasted peanuts or the cup turns bitter."
  ],
  "zh-CN": [
   "花生茶",
   "把炒花生煮成的浓香茶。",
   "不发酵 · 无咖啡因",
   "400毫升配10克",
   "2泡",
   "95度煮7分钟，炒花生掰开再煮。",
   "韩国与中国。花生炒熟去皮。",
   "焙花生的浓香与淡甜。",
   "早餐、冬天、配甜点。",
   "炒花生要去掉薄皮，不然会苦。"
  ],
  "zh-TW": [
   "花生茶",
   "把炒花生煮成的濃香茶。",
   "不發酵 · 無咖啡因",
   "400毫升配10公克",
   "2泡",
   "95度煮7分鐘，炒花生掰開再煮。",
   "韓國與中國。花生炒熟去皮。",
   "焙花生的濃香與淡甜。",
   "早餐、冬天、配甜點。",
   "炒花生要去掉薄皮，不然會苦。"
  ],
  "x": {
   "ko": [
    "땅콩을 볶아 껍질을 벗기고 반으로 갈라 물에 끓입니다.",
    "한국에서는 땅콩을 볶아 두고 겨울에 차로 끓여 마셨습니다."
   ],
   "en": [
    "Peanuts are roasted, skinned and split, then simmered.",
    "In Korea roasted peanuts were kept and boiled into tea in winter."
   ],
   "zh-CN": [
    "花生炒熟去皮，掰开后加水煮。",
    "韩国家家冬天会把炒花生煮成茶。"
   ],
   "zh-TW": [
    "花生炒熟去皮，掰開後加水煮。",
    "韓國家家冬天會把炒花生煮成茶。"
   ]
  }
 },
 {
  "id": "herb-walnut",
  "group": "everyday",
  "kind": "tea",
  "hanja": "核",
  "sub": "Walnut Tea",
  "alias": [
   "호두",
   "호도차"
  ],
  "hz": "核桃",
  "hs": "核桃",
  "rom": "Hodu-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "15g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "호두차",
   "볶은 호두를 갈아 끓인 진한 견과차 — 쌉쌀한 고소함.",
   "무산화 · 카페인 없음",
   "400ml에 15g",
   "2회",
   "95도에서 7분. 갈아 넣으면 물에 풀립니다.",
   "한국·중국. 호두 속살을 볶아 씁니다.",
   "볶은 호두의 진한 고소함과 껍질의 가벼운 쌉쌀함.",
   "아침, 겨울, 꿀과 함께.",
   "호두 속껍질이 쌉쌀하므로 살짝 볶아 벗기면 부드럽습니다."
  ],
  "en": [
   "Walnut Tea",
   "Ground roasted walnuts simmered into a deep, faintly bitter nut tea.",
   "None · caffeine-free",
   "15 g to 400 ml",
   "2 infusions",
   "95 °C for 7 minutes; ground nuts disperse in the water.",
   "Korea and China. Walnut kernels are roasted.",
   "Deep roasted nut, a slight bitterness from the skin.",
   "Breakfast, winter, with honey.",
   "The inner skin is bitter; roast and rub it off for a softer cup."
  ],
  "zh-CN": [
   "核桃茶",
   "把炒核桃磨碎煮成的浓坚果茶，香里带一点苦。",
   "不发酵 · 无咖啡因",
   "400毫升配15克",
   "2泡",
   "95度煮7分钟，磨碎后能融入水中。",
   "韩国与中国。核桃仁炒香后使用。",
   "焙核桃的浓香与薄皮的微苦。",
   "早餐、冬天、加蜂蜜。",
   "核桃薄皮发苦，稍微炒过去皮会更柔。"
  ],
  "zh-TW": [
   "核桃茶",
   "把炒核桃磨碎煮成的濃堅果茶，香裡帶一點苦。",
   "不發酵 · 無咖啡因",
   "400毫升配15公克",
   "2泡",
   "95度煮7分鐘，磨碎後能融入水中。",
   "韓國與中國。核桃仁炒香後使用。",
   "焙核桃的濃香與薄皮的微苦。",
   "早餐、冬天、加蜂蜜。",
   "核桃薄皮發苦，稍微炒過去皮會更柔。"
  ],
  "x": {
   "ko": [
    "호두 속살을 볶아 갈고 물에 풀어 끓입니다.",
    "한국에서는 호두를 갈아 죽처럼 끓여 겨울 보양차로 마셨습니다."
   ],
   "en": [
    "Walnut kernels are roasted, ground and simmered in water.",
    "In Korea it was simmered thick like porridge as a winter tonic."
   ],
   "zh-CN": [
    "核桃仁炒香磨碎，加水煮开。",
    "韩国冬天把它煮得像粥一样当补养茶。"
   ],
   "zh-TW": [
    "核桃仁炒香磨碎，加水煮開。",
    "韓國冬天把它煮得像粥一樣當補養茶。"
   ]
  }
 },
 {
  "id": "herb-ginkgo",
  "group": "everyday",
  "kind": "tea",
  "hanja": "銀",
  "sub": "Ginkgo Tea",
  "alias": [
   "은행",
   "백과차"
  ],
  "hz": "銀杏",
  "hs": "银杏",
  "rom": "Eunhaeng-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "10알",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "은행차",
   "볶은 은행알을 끓인 노란 차 — 고소하고 살짝 쌉쌀합니다.",
   "무산화 · 카페인 없음",
   "400ml에 10알",
   "2회",
   "95도에서 10분. 은행알은 볶아 껍질을 벗겨 씁니다.",
   "한국·중국. 은행알을 볶아 씁니다.",
   "볶은 은행의 고소함과 특유의 쌉쌀한 끝맛.",
   "가을, 오후, 담백한 간식.",
   "은행알은 하루 10알을 넘기지 말고, 반드시 익혀 쓰라는 것이 일반적인 권고입니다."
  ],
  "en": [
   "Ginkgo Tea",
   "Roasted ginkgo nuts simmered into a golden, nutty cup with a faint bitterness.",
   "None · caffeine-free",
   "10 nuts to 400 ml",
   "2 infusions",
   "95 °C for 10 minutes; the nuts are roasted and shelled.",
   "Korea and China. Ginkgo nuts are roasted.",
   "Roasted nut, a characteristic bitter edge.",
   "Autumn, afternoon, with plain snacks.",
   "General advice is to keep to ten nuts a day and always cook them."
  ],
  "zh-CN": [
   "银杏茶",
   "把炒白果煮成的金黄色茶，香里带一点苦。",
   "不发酵 · 无咖啡因",
   "400毫升配10粒",
   "2泡",
   "95度煮10分钟，白果炒熟去壳。",
   "韩国与中国。白果炒制后使用。",
   "焙白果的香与特有的微苦。",
   "秋天、下午、配清淡点心。",
   "一般建议每天不超过十粒，并且一定要煮熟。"
  ],
  "zh-TW": [
   "銀杏茶",
   "把炒白果煮成的金黃色茶，香裡帶一點苦。",
   "不發酵 · 無咖啡因",
   "400毫升配10粒",
   "2泡",
   "95度煮10分鐘，白果炒熟去殼。",
   "韓國與中國。白果炒製後使用。",
   "焙白果的香與特有的微苦。",
   "秋天、下午、配清淡點心。",
   "一般建議每天不超過十粒，並且一定要煮熟。"
  ],
  "x": {
   "ko": [
    "은행알을 볶아 껍질을 벗기고 물에 끓입니다.",
    "가을에 은행을 주워 볶아 두고 차로 끓여 마신 데서 왔습니다."
   ],
   "en": [
    "Nuts are roasted, shelled and simmered in water.",
    "It comes from gathering autumn ginkgo, roasting them and boiling a tea."
   ],
   "zh-CN": [
    "白果炒熟去壳，加水煮开。",
    "秋天捡白果炒好，用来煮茶喝。"
   ],
   "zh-TW": [
    "白果炒熟去殼，加水煮開。",
    "秋天撿白果炒好，用來煮茶喝。"
   ]
  }
 },
 {
  "id": "herb-kelp",
  "group": "everyday",
  "kind": "tea",
  "hanja": "昆",
  "sub": "Kelp Tea",
  "alias": [
   "다시마",
   "곤부차"
  ],
  "hz": "昆布",
  "hs": "昆布",
  "rom": "Dasima-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "400ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "일본",
   "en": "Japan",
   "zh-CN": "日本",
   "zh-TW": "日本"
  },
  "originCountryCode": "jp",
  "ko": [
   "다시마차",
   "말린 다시마를 우린 짭짤하고 감칠맛 나는 차 — 일본의 곤부차.",
   "무산화 · 카페인 없음",
   "400ml에 5g",
   "2회",
   "90도에서 3분. 오래 우리면 미끈하고 짭니다.",
   "일본·한국. 다시마를 말려 얇게 썰어 씁니다.",
   "해조의 감칠맛과 옅은 짠맛, 깨끗한 끝맛.",
   "아침, 일본식 아침상, 밥.",
   "다시마는 3분이면 충분합니다. 짠맛이 강하면 물을 늘리세요."
  ],
  "en": [
   "Kelp Tea",
   "Dried kelp steeped into a savoury, gently salty cup — Japan's kombu-cha.",
   "None · caffeine-free",
   "5 g to 400 ml",
   "2 infusions",
   "90 °C for 3 minutes; longer makes it slippery and salty.",
   "Japan and Korea. Kelp is dried and sliced thin.",
   "Seaweed umami, a light saltiness, a clean finish.",
   "Morning, a Japanese breakfast, with rice.",
   "Three minutes is enough; if it is too salty, add water."
  ],
  "zh-CN": [
   "昆布茶",
   "把干海带泡出的鲜咸茶——日本的昆布茶。",
   "不发酵 · 无咖啡因",
   "400毫升配5克",
   "2泡",
   "90度泡3分钟，泡久会滑且咸。",
   "日本与韩国。海带晒干切细使用。",
   "海带的鲜味与淡淡咸味，收口干净。",
   "早晨、日式早餐、配米饭。",
   "三分钟就够；太咸就多加水。"
  ],
  "zh-TW": [
   "昆布茶",
   "把乾海帶泡出的鮮鹹茶——日本的昆布茶。",
   "不發酵 · 無咖啡因",
   "400毫升配5公克",
   "2泡",
   "90度泡3分鐘，泡久會滑且鹹。",
   "日本與韓國。海帶曬乾切細使用。",
   "海帶的鮮味與淡淡鹹味，收口乾淨。",
   "早晨、日式早餐、配米飯。",
   "三分鐘就夠；太鹹就多加水。"
  ],
  "x": {
   "ko": [
    "다시마를 말려 얇게 썰어 뜨거운 물에 우립니다.",
    "일본에서는 곤부차를 아침 국물처럼 마시고, 한국에서는 다시마를 우린 물을 국물로 썼습니다."
   ],
   "en": [
    "Dried kelp is sliced thin and steeped in hot water.",
    "In Japan kombu-cha is drunk like morning broth; in Korea kelp water was used as stock."
   ],
   "zh-CN": [
    "海带晒干切细，用热水泡开。",
    "日本把昆布茶当早上的汤喝，韩国则用海带水做高汤。"
   ],
   "zh-TW": [
    "海帶曬乾切細，用熱水泡開。",
    "日本把昆布茶當早上的湯喝，韓國則用海帶水做高湯。"
   ]
  }
 },
 {
  "id": "herb-chicory",
  "group": "everyday",
  "kind": "tea",
  "hanja": "菊",
  "sub": "Chicory Tea",
  "alias": [
   "치커리",
   "엔다이브차"
  ],
  "hz": "菊苣",
  "hs": "菊苣",
  "rom": "Chicory-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "6g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot s-milk w-quick p-meal c-low m-cozy",
  "originCountry": {
   "ko": "프랑스",
   "en": "France",
   "zh-CN": "法国",
   "zh-TW": "法國"
  },
  "originCountryCode": "fr",
  "ko": [
   "치커리차",
   "치커리 뿌리를 볶아 끓인 진하고 쌉쌀한 차 — 커피 대용.",
   "무산화 · 카페인 없음",
   "300ml에 6g",
   "2회",
   "95도에서 5분. 끓이면 더 진해집니다.",
   "프랑스·벨기에. 치커리 뿌리를 볶아 씁니다.",
   "볶은 뿌리의 진한 향과 쌉쌀한 단맛.",
   "아침, 식후, 우유와 함께.",
   "볶은 치커리 뿌리는 5분 이상 우려야 진한 맛이 납니다."
  ],
  "en": [
   "Chicory Tea",
   "Roasted chicory root simmered into a deep, bittersweet cup — a coffee stand-in.",
   "None · caffeine-free",
   "6 g to 300 ml",
   "2 infusions",
   "95 °C for 5 minutes; simmering deepens it.",
   "France and Belgium. Chicory root is roasted.",
   "Deep roasted root, bittersweet.",
   "Morning, after meals, with milk.",
   "Roasted root needs five minutes or more."
  ],
  "zh-CN": [
   "菊苣茶",
   "把炒菊苣根煮成的浓苦茶，可代替咖啡。",
   "不发酵 · 无咖啡因",
   "300毫升配6克",
   "2泡",
   "95度煮5分钟，煮久更浓。",
   "法国、比利时。菊苣根炒制后使用。",
   "焙根的浓香与苦中带甜。",
   "早餐、饭后、加牛奶。",
   "炒过的根要泡五分钟以上才浓。"
  ],
  "zh-TW": [
   "菊苣茶",
   "把炒菊苣根煮成的濃苦茶，可代替咖啡。",
   "不發酵 · 無咖啡因",
   "300毫升配6公克",
   "2泡",
   "95度煮5分鐘，煮久更濃。",
   "法國、比利時。菊苣根炒製後使用。",
   "焙根的濃香與苦中帶甜。",
   "早餐、飯後、加牛奶。",
   "炒過的根要泡五分鐘以上才濃。"
  ],
  "x": {
   "ko": [
    "치커리 뿌리를 썰어 볶은 뒤 물에 끓입니다.",
    "프랑스에서는 커피에 치커리를 섞어 마셨고, 그 맛을 그대로 차로 즐깁니다."
   ],
   "en": [
    "Chicory root is sliced, roasted and simmered.",
    "In France it was blended into coffee; here the same roast is brewed as tea."
   ],
   "zh-CN": [
    "菊苣根切片炒香，加水煮开。",
    "法国人把菊苣混进咖啡，也把同样的焙香当茶喝。"
   ],
   "zh-TW": [
    "菊苣根切片炒香，加水煮開。",
    "法國人把菊苣混進咖啡，也把同樣的焙香當茶喝。"
   ]
  }
 },
 {
  "id": "everyday-hovenia",
  "group": "everyday",
  "kind": "tea",
  "hanja": "枳",
  "sub": "Hovenia Tea",
  "alias": [
   "헛개나무",
   "지구자차"
  ],
  "hz": "枳椇子",
  "hs": "枳椇子",
  "rom": "Heotgae-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "헛개차",
   "헛개나무 열매와 가지를 끓인 구수하고 달콤한 차.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "95도에서 7분. 열매를 쪼개 넣으면 더 진합니다.",
   "한국. 헛개나무 열매를 말려 씁니다.",
   "볶은 곡물 같은 고소함과 대추 비슷한 단맛.",
   "술자리 다음 날, 식후.",
   "헛개는 열매보다 잘게 쪼갠 가지를 함께 끓이면 맛이 깊습니다."
  ],
  "en": [
   "Hovenia Tea",
   "Dried hovenia fruit and twigs boiled into a nutty, raisin-like cup.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "95 °C for 7 minutes; crack the fruit for a deeper cup.",
   "Korea. The fruit of the hovenia tree is dried.",
   "Toasted grain and a date-like sweetness.",
   "The morning after drinking, after meals.",
   "Split twigs along with the fruit for more depth."
  ],
  "zh-CN": [
   "枳椇子茶",
   "把枳椇子与枝条煮成的香而甜的茶。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "95度煮7分钟，果实敲开更浓。",
   "韩国。枳椇子晒干使用。",
   "焙谷般的香与红枣似的甜。",
   "饮酒后的第二天、饭后。",
   "把枝条劈细和果实一起煮，味道更深。"
  ],
  "zh-TW": [
   "枳椇子茶",
   "把枳椇子與枝條煮成的香而甜的茶。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "95度煮7分鐘，果實敲開更濃。",
   "韓國。枳椇子曬乾使用。",
   "焙穀般的香與紅棗似的甜。",
   "飲酒後的第二天、飯後。",
   "把枝條劈細和果實一起煮，味道更深。"
  ]
 },
 {
  "id": "everyday-kudzu",
  "group": "everyday",
  "kind": "tea",
  "hanja": "葛",
  "sub": "Kudzu Tea",
  "alias": [
   "칡",
   "갈근차"
  ],
  "hz": "葛根",
  "hs": "葛根",
  "rom": "Chik-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "칡차",
   "칡뿌리를 말려 끓인 구수하고 살짝 쌉쌀한 차.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "95도에서 10분. 말린 뿌리는 오래 끓일수록 진합니다.",
   "한국. 칡뿌리를 말려 씁니다.",
   "구수한 뿌리 향과 옅은 단맛, 끝의 가벼운 쌉쌀함.",
   "식후, 숙취, 여름.",
   "칡은 전분이 많아 물이 걸쭉해집니다. 차게 마셔도 좋습니다."
  ],
  "en": [
   "Kudzu Tea",
   "Dried kudzu root boiled into a nutty, faintly bitter cup.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "95 °C for 10 minutes; the longer it simmers the stronger it gets.",
   "Korea. Kudzu root is dried.",
   "Nutty root, light sweetness, a gentle bitterness.",
   "After meals, hangovers, summer.",
   "Kudzu is starchy and thickens the water; good chilled too."
  ],
  "zh-CN": [
   "葛根茶",
   "把干葛根煮成的香而微苦的茶。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "95度煮10分钟，煮越久越浓。",
   "韩国。葛根晒干使用。",
   "焙根香与淡甜，尾端微苦。",
   "饭后、宿醉、夏天。",
   "葛根淀粉多，汤会变稠，放凉喝也好。"
  ],
  "zh-TW": [
   "葛根茶",
   "把乾葛根煮成的香而微苦的茶。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "95度煮10分鐘，煮越久越濃。",
   "韓國。葛根曬乾使用。",
   "焙根香與淡甜，尾端微苦。",
   "飯後、宿醉、夏天。",
   "葛根澱粉多，湯會變稠，放涼喝也好。"
  ]
 },
 {
  "id": "herb-yam",
  "group": "everyday",
  "kind": "tea",
  "hanja": "山",
  "sub": "Yam Tea",
  "alias": [
   "산약",
   "마차(산약)"
  ],
  "hz": "山藥",
  "hs": "山药",
  "rom": "Sanyak-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "산약차",
   "말린 마 뿌리를 끓인 담백하고 부드러운 차.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "95도에서 10분. 말린 뿌리를 불려 끓입니다.",
   "한국·중국. 마 뿌리를 말려 씁니다.",
   "담백한 뿌리 향과 옅은 단맛, 부드러운 질감.",
   "아침, 식후, 기운이 없을 때.",
   "마는 말린 뒤 불려 끓여야 속까지 부드럽게 우러납니다."
  ],
  "en": [
   "Yam Tea",
   "Dried Chinese yam simmered into a mild, softly sweet cup.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "95 °C for 10 minutes; soak the dried root first.",
   "Korea and China. The yam root is dried.",
   "Mild root, faint sweetness, a soft body.",
   "Morning, after meals, when feeling run down.",
   "Soak the dried root before simmering so it softens through."
  ],
  "zh-CN": [
   "山药茶",
   "把干山药煮成的清淡柔甜的茶。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "95度煮10分钟，干山药先泡软。",
   "韩国与中国。山药根晒干使用。",
   "清淡的根香与淡甜，口感柔。",
   "早餐、饭后、疲倦时。",
   "山药先泡软再煮，里面才会透。"
  ],
  "zh-TW": [
   "山藥茶",
   "把乾山藥煮成的清淡柔甜的茶。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "95度煮10分鐘，乾山藥先泡軟。",
   "韓國與中國。山藥根曬乾使用。",
   "清淡的根香與淡甜，口感柔。",
   "早餐、飯後、疲倦時。",
   "山藥先泡軟再煮，裡面才會透。"
  ]
 },
 {
  "id": "herb-purple-corn",
  "group": "everyday",
  "kind": "tea",
  "hanja": "紫",
  "sub": "Purple Corn Tea",
  "alias": [
   "자색옥수수",
   "퍼플콘차"
  ],
  "hz": "紫玉米",
  "hs": "紫玉米",
  "rom": "Jasaek-oksusu-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast a-fruit b-light k-sweet r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "페루",
   "en": "Peru",
   "zh-CN": "秘鲁",
   "zh-TW": "秘魯"
  },
  "originCountryCode": "pe",
  "ko": [
   "자색옥수수차",
   "안토시아닌이 많은 자색옥수수를 끓인 보랏빛 차.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "95도에서 7분. 알을 볶거나 말려 씁니다.",
   "페루 안데스. 자색옥수수를 말려 씁니다.",
   "옥수수의 구수함과 베리 같은 옅은 단맛.",
   "아침, 식후, 차게.",
   "자색옥수수는 물이 보랏빛으로 우러납니다. 레몬을 넣으면 색이 더 짙어집니다."
  ],
  "en": [
   "Purple Corn Tea",
   "Purple corn simmered into a violet cup rich in anthocyanins.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "95 °C for 7 minutes; the kernels are dried or roasted.",
   "The Peruvian Andes. Purple corn is dried.",
   "Sweet corn with a faint berry note.",
   "Morning, after meals, chilled.",
   "The liquor turns violet; a squeeze of lemon deepens the colour."
  ],
  "zh-CN": [
   "紫玉米茶",
   "把富含花青素的紫玉米煮成的紫色茶。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "95度煮7分钟，玉米粒晒干或炒过。",
   "秘鲁安第斯。紫玉米晒干使用。",
   "玉米的甜香与淡淡的莓果味。",
   "早餐、饭后、放凉喝。",
   "汤色会变紫，加一点柠檬颜色更深。"
  ],
  "zh-TW": [
   "紫玉米茶",
   "把富含花青素的紫玉米煮成的紫色茶。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "95度煮7分鐘，玉米粒曬乾或炒過。",
   "秘魯安地斯。紫玉米曬乾使用。",
   "玉米的甜香與淡淡的莓果味。",
   "早餐、飯後、放涼喝。",
   "湯色會變紫，加一點檸檬顏色更深。"
  ]
 },
 {
  "id": "herb-ginseng",
  "group": "traditional",
  "kind": "tea",
  "hanja": "人",
  "sub": "Ginseng Tea",
  "alias": [
   "인삼",
   "수삼차"
  ],
  "hz": "人參",
  "hs": "人参",
  "rom": "Insam-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-energy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "인삼차",
   "인삼을 얇게 썰어 끓인 쌉쌀하고 단맛 도는 차.",
   "무산화 · 카페인 없음",
   "300ml에 5g",
   "2회",
   "90도에서 10분. 대추를 넣으면 부드러워집니다.",
   "한국. 4~6년근 인삼을 썰어 말려 씁니다.",
   "인삼 특유의 쌉쌀함과 은은한 단맛, 따뜻한 여운.",
   "아침, 기운이 없을 때, 겨울.",
   "인삼은 얇게 썰어야 맛이 빨리 나고, 대추·생강을 더하면 덜 씁니다."
  ],
  "en": [
   "Ginseng Tea",
   "Sliced ginseng simmered into a bitter-sweet, warming cup.",
   "None · caffeine-free",
   "5 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; a jujube softens it.",
   "Korea. Four- to six-year ginseng is sliced and dried.",
   "Ginseng's bitterness, a quiet sweetness, a warm finish.",
   "Morning, when low, winter.",
   "Slice it thin; jujube or ginger makes it less bitter."
  ],
  "zh-CN": [
   "人参茶",
   "把人参切片煮成的微苦回甜的暖茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克",
   "2泡",
   "90度煮10分钟，加红枣会更柔。",
   "韩国。四到六年根人参切片晒干。",
   "人参特有的苦与淡甜，尾韵温暖。",
   "早晨、疲倦时、冬天。",
   "人参切薄片才容易出味，加红枣或姜可减苦。"
  ],
  "zh-TW": [
   "人參茶",
   "把人參切片煮成的微苦回甜的暖茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克",
   "2泡",
   "90度煮10分鐘，加紅棗會更柔。",
   "韓國。四到六年根人參切片曬乾。",
   "人參特有的苦與淡甜，尾韻溫暖。",
   "早晨、疲倦時、冬天。",
   "人參切薄片才容易出味，加紅棗或薑可減苦。"
  ]
 },
 {
  "id": "herb-redginseng",
  "group": "traditional",
  "kind": "tea",
  "hanja": "紅",
  "sub": "Red Ginseng Tea",
  "alias": [
   "홍삼",
   "증삼차"
  ],
  "hz": "紅參",
  "hs": "红参",
  "rom": "Hongsam-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-energy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "홍삼차",
   "인삼을 쪄서 말린 홍삼을 끓인 진하고 단맛 도는 차.",
   "무산화 · 카페인 없음",
   "300ml에 5g",
   "2회",
   "90도에서 10분. 홍삼 절편이나 농축액을 씁니다.",
   "한국. 인삼을 쪄 말린 홍삼을 씁니다.",
   "구수한 인삼 향과 진한 단맛, 쌉쌀한 여운.",
   "아침, 겨울, 기운이 없을 때.",
   "홍삼은 이미 익혀 말린 것이라 오래 끓이지 않아도 맛이 납니다."
  ],
  "en": [
   "Red Ginseng Tea",
   "Steamed and dried ginseng simmered into a deep, sweet, warming cup.",
   "None · caffeine-free",
   "5 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; use slices or extract.",
   "Korea. Ginseng is steamed and dried into red ginseng.",
   "Roasted ginseng, deep sweetness, a bitter finish.",
   "Morning, winter, when low.",
   "Red ginseng is already cooked, so it needs no long boil."
  ],
  "zh-CN": [
   "红参茶",
   "把蒸制后晒干的红参煮成的浓甜暖茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克",
   "2泡",
   "90度煮10分钟，用红参片或浓缩液。",
   "韩国。人参蒸后晒干成红参。",
   "焙人参的香与浓甜，尾端微苦。",
   "早晨、冬天、疲倦时。",
   "红参已经蒸熟，不必久煮。"
  ],
  "zh-TW": [
   "紅參茶",
   "把蒸製後曬乾的紅參煮成的濃甜暖茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克",
   "2泡",
   "90度煮10分鐘，用紅參片或濃縮液。",
   "韓國。人參蒸後曬乾成紅參。",
   "焙人參的香與濃甜，尾端微苦。",
   "早晨、冬天、疲倦時。",
   "紅參已經蒸熟，不必久煮。"
  ]
 },
 {
  "id": "herb-sesame",
  "group": "everyday",
  "kind": "tea",
  "hanja": "芝",
  "sub": "Sesame Tea",
  "alias": [
   "참깨",
   "호마차"
  ],
  "hz": "芝麻",
  "hs": "芝麻",
  "rom": "Chamkkae-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "참깨차",
   "볶은 참깨를 갈아 끓인 진하고 고소한 차.",
   "무산화 · 카페인 없음",
   "300ml에 8g",
   "2회",
   "95도에서 5분. 갈아 넣고 저어 마십니다.",
   "한국·중국. 참깨를 볶아 갈아 씁니다.",
   "볶은 참깨의 진한 고소함과 옅은 단맛.",
   "아침, 겨울, 죽.",
   "참깨는 볶은 뒤 갈아야 기름과 향이 나옵니다."
  ],
  "en": [
   "Sesame Tea",
   "Roasted sesame ground and simmered into a rich, nutty cup.",
   "None · caffeine-free",
   "8 g to 300 ml",
   "2 infusions",
   "95 °C for 5 minutes; grind and stir.",
   "Korea and China. Sesame is roasted and ground.",
   "Deep toasted sesame, light sweetness.",
   "Breakfast, winter, with porridge.",
   "Roast then grind the seeds so the oil and aroma come out."
  ],
  "zh-CN": [
   "芝麻茶",
   "把炒芝麻磨碎煮成的浓香茶。",
   "不发酵 · 无咖啡因",
   "300毫升配8克",
   "2泡",
   "95度煮5分钟，磨碎边煮边搅。",
   "韩国与中国。芝麻炒香后磨碎。",
   "焙芝麻的浓香与淡甜。",
   "早餐、冬天、配粥。",
   "芝麻炒过再磨，油和香气才会出来。"
  ],
  "zh-TW": [
   "芝麻茶",
   "把炒芝麻磨碎煮成的濃香茶。",
   "不發酵 · 無咖啡因",
   "300毫升配8公克",
   "2泡",
   "95度煮5分鐘，磨碎邊煮邊攪。",
   "韓國與中國。芝麻炒香後磨碎。",
   "焙芝麻的濃香與淡甜。",
   "早餐、冬天、配粥。",
   "芝麻炒過再磨，油和香氣才會出來。"
  ]
 },
 {
  "id": "herb-jerusalemartichoke",
  "group": "everyday",
  "kind": "tea",
  "hanja": "菊",
  "sub": "Jerusalem Artichoke Tea",
  "alias": [
   "돼지감자",
   "뚱딴지차"
  ],
  "hz": "菊芋",
  "hs": "菊芋",
  "rom": "Dwaejigamja-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "6g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "돼지감자차",
   "돼지감자 뿌리를 볶아 끓인 달고 구수한 차.",
   "무산화 · 카페인 없음",
   "300ml에 6g",
   "2회",
   "95도에서 5분. 말린 뿌리를 볶아 씁니다.",
   "한국·북미 원산. 뿌리를 말려 볶습니다.",
   "볶은 뿌리의 구수함과 특유의 달콤함.",
   "아침, 식후, 차게.",
   "이눌린이 많아 처음엔 배가 살짝 불 수 있습니다."
  ],
  "en": [
   "Jerusalem Artichoke Tea",
   "Roasted Jerusalem artichoke root — sweet, nutty and caffeine-free.",
   "None · caffeine-free",
   "6 g to 300 ml",
   "2 infusions",
   "95 °C for 5 minutes; the dried root is roasted.",
   "Korea; native to North America. Root dried and roasted.",
   "Roasted root with the tuber's sweetness.",
   "Morning, after meals, chilled.",
   "High in inulin, which can feel gassy at first."
  ],
  "zh-CN": [
   "菊芋茶",
   "把炒菊芋根煮成的香甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配6克",
   "2泡",
   "95度煮5分钟，根晒干炒制。",
   "韩国；原产北美。根晒干后炒。",
   "焙根的香与菊芋的甜。",
   "早餐、饭后、放凉。",
   "菊粉较多，初喝可能胀气。"
  ],
  "zh-TW": [
   "菊芋茶",
   "把炒菊芋根煮成的香甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配6公克",
   "2泡",
   "95度煮5分鐘，根曬乾炒製。",
   "韓國；原產北美。根曬乾後炒。",
   "焙根的香與菊芋的甜。",
   "早餐、飯後、放涼。",
   "菊粉較多，初喝可能脹氣。"
  ]
 },
 {
  "id": "herb-deodeok",
  "group": "traditional",
  "kind": "tea",
  "hanja": "沙",
  "sub": "Codonopsis Tea",
  "alias": [
   "더덕",
   "사삼차"
  ],
  "hz": "沙參",
  "hs": "沙参",
  "rom": "Deodeok-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "6g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "더덕차",
   "더덕 뿌리를 말려 끓인 쌉쌀하고 구수한 차.",
   "무산화 · 카페인 없음",
   "300ml에 6g",
   "2회",
   "90도에서 10분. 말린 뿌리를 볶으면 더 구수합니다.",
   "한국. 더덕 뿌리를 말려 씁니다.",
   "쌉쌀한 뿌리 향과 옅은 단맛.",
   "아침, 기침이 잦을 때, 겨울.",
   "더덕은 껍질을 벗겨 말려야 쓴맛이 덜합니다."
  ],
  "en": [
   "Codonopsis Tea",
   "Dried codonopsis root simmered into a lightly bitter, nutty cup.",
   "None · caffeine-free",
   "6 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; roasting the dried root adds depth.",
   "Korea. The root is dried.",
   "Bitter root, a light sweetness.",
   "Morning, cough season, winter.",
   "Peel before drying to soften the bitterness."
  ],
  "zh-CN": [
   "沙参茶",
   "把干沙参煮成的微苦香茶。",
   "不发酵 · 无咖啡因",
   "300毫升配6克",
   "2泡",
   "90度煮10分钟，炒过更香。",
   "韩国。沙参根晒干使用。",
   "微苦的根香与淡甜。",
   "早晨、咳嗽时、冬天。",
   "去皮再晒，苦味会少。"
  ],
  "zh-TW": [
   "沙參茶",
   "把乾沙參煮成的微苦香茶。",
   "不發酵 · 無咖啡因",
   "300毫升配6公克",
   "2泡",
   "90度煮10分鐘，炒過更香。",
   "韓國。沙參根曬乾使用。",
   "微苦的根香與淡甜。",
   "早晨、咳嗽時、冬天。",
   "去皮再曬，苦味會少。"
  ]
 },
 {
  "id": "herb-adenophora",
  "group": "traditional",
  "kind": "tea",
  "hanja": "輪",
  "sub": "Adenophora Tea",
  "alias": [
   "잔대",
   "사삼"
  ],
  "hz": "輪葉沙參",
  "hs": "轮叶沙参",
  "rom": "Jandae-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "6g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-light k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "잔대차",
   "잔대 뿌리를 말려 끓인 담백하고 살짝 단 차.",
   "무산화 · 카페인 없음",
   "300ml에 6g",
   "2회",
   "90도에서 10분.",
   "한국. 잔대 뿌리를 말려 씁니다.",
   "담백한 뿌리 향과 옅은 단맛.",
   "아침, 목이 마를 때.",
   "잔대는 더덕보다 순한 맛이라 오래 끓여도 쓴맛이 적습니다."
  ],
  "en": [
   "Adenophora Tea",
   "Dried adenophora root — mild, faintly sweet, gentle on the throat.",
   "None · caffeine-free",
   "6 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes.",
   "Korea. The root is dried.",
   "Mild root, light sweetness.",
   "Morning, when thirsty.",
   "Milder than codonopsis, so it stays soft even with a long simmer."
  ],
  "zh-CN": [
   "轮叶沙参茶",
   "把干轮叶沙参煮成的清淡微甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配6克",
   "2泡",
   "90度煮10分钟。",
   "韩国。轮叶沙参根晒干使用。",
   "清淡的根香与淡甜。",
   "早晨、口渴时。",
   "比沙参温和，久煮也不易发苦。"
  ],
  "zh-TW": [
   "輪葉沙參茶",
   "把乾輪葉沙參煮成的清淡微甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配6公克",
   "2泡",
   "90度煮10分鐘。",
   "韓國。輪葉沙參根曬乾使用。",
   "清淡的根香與淡甜。",
   "早晨、口渴時。",
   "比沙參溫和，久煮也不易發苦。"
  ]
 },
 {
  "id": "herb-astragalus",
  "group": "traditional",
  "kind": "tea",
  "hanja": "黃",
  "sub": "Astragalus Tea",
  "alias": [
   "황기",
   "황기차"
  ],
  "hz": "黃芪",
  "hs": "黄芪",
  "rom": "Hwanggi-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "6g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-energy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "황기차",
   "황기 뿌리를 말려 끓인 구수하고 살짝 단 차.",
   "무산화 · 카페인 없음",
   "300ml에 6g",
   "2회",
   "90도에서 10분. 얇게 썬 뿌리를 씁니다.",
   "한국·중국. 황기 뿌리를 말려 씁니다.",
   "구수한 뿌리 향과 옅은 단맛, 부드러운 여운.",
   "아침, 기운이 없을 때.",
   "황기는 얇게 썰어야 우러나고, 대추를 더하면 맛이 둥글어집니다."
  ],
  "en": [
   "Astragalus Tea",
   "Dried astragalus root simmered into a nutty, lightly sweet cup.",
   "None · caffeine-free",
   "6 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; use thin slices.",
   "Korea and China. The root is dried.",
   "Nutty root, light sweetness, a soft finish.",
   "Morning, when low.",
   "Slice thin; a jujube rounds out the taste."
  ],
  "zh-CN": [
   "黄芪茶",
   "把干黄芪煮成的香而微甜的茶。",
   "不发酵 · 无咖啡因",
   "300毫升配6克",
   "2泡",
   "90度煮10分钟，用薄片。",
   "韩国与中国。黄芪根晒干使用。",
   "焙根香与淡甜，收口柔。",
   "早晨、疲倦时。",
   "切薄片才出味，加红枣更圆润。"
  ],
  "zh-TW": [
   "黃芪茶",
   "把乾黃芪煮成的香而微甜的茶。",
   "不發酵 · 無咖啡因",
   "300毫升配6公克",
   "2泡",
   "90度煮10分鐘，用薄片。",
   "韓國與中國。黃芪根曬乾使用。",
   "焙根香與淡甜，收口柔。",
   "早晨、疲倦時。",
   "切薄片才出味，加紅棗更圓潤。"
  ]
 },
 {
  "id": "herb-angelica",
  "group": "traditional",
  "kind": "tea",
  "hanja": "當",
  "sub": "Angelica Tea",
  "alias": [
   "당귀",
   "당귀차"
  ],
  "hz": "當歸",
  "hs": "当归",
  "rom": "Danggwi-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "당귀차",
   "당귀 뿌리를 말려 끓인 진하고 달콤한 한약차.",
   "무산화 · 카페인 없음",
   "300ml에 5g",
   "2회",
   "90도에서 10분. 대추·생강을 함께 넣습니다.",
   "한국·중국. 당귀 뿌리를 말려 씁니다.",
   "진한 약재 향과 달콤함, 끝의 쌉쌀함.",
   "오후, 몸이 찰 때, 생리 전후.",
   "당귀는 향이 강해 대추·생강과 함께 끓여야 부드럽습니다."
  ],
  "en": [
   "Angelica Tea",
   "Dried angelica root — deep, sweet and medicinal.",
   "None · caffeine-free",
   "5 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; add jujube and ginger.",
   "Korea and China. The root is dried.",
   "Deep herbal sweetness with a bitter edge.",
   "Afternoon, when cold, around menstruation.",
   "Its strong aroma softens with jujube and ginger."
  ],
  "zh-CN": [
   "当归茶",
   "把干当归煮成的浓甜药茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克",
   "2泡",
   "90度煮10分钟，加红枣与姜。",
   "韩国与中国。当归根晒干使用。",
   "浓郁药香与甜，尾端微苦。",
   "下午、身体发冷时、经期前后。",
   "当归味重，和红枣、姜一起煮更柔。"
  ],
  "zh-TW": [
   "當歸茶",
   "把乾當歸煮成的濃甜藥茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克",
   "2泡",
   "90度煮10分鐘，加紅棗與薑。",
   "韓國與中國。當歸根曬乾使用。",
   "濃郁藥香與甜，尾端微苦。",
   "下午、身體發冷時、經期前後。",
   "當歸味重，和紅棗、薑一起煮更柔。"
  ]
 },
 {
  "id": "herb-rehmannia",
  "group": "traditional",
  "kind": "tea",
  "hanja": "地",
  "sub": "Rehmannia Tea",
  "alias": [
   "지황",
   "생지황차"
  ],
  "hz": "地黃",
  "hs": "地黄",
  "rom": "Jihwang-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "6g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "지황차",
   "지황 뿌리를 말려 끓인 검고 달콤한 한약차.",
   "무산화 · 카페인 없음",
   "300ml에 6g",
   "2회",
   "90도에서 10분. 말린 뿌리를 씁니다.",
   "한국·중국. 지황 뿌리를 말려 씁니다.",
   "구수한 약재 향과 진한 단맛, 검은 물색.",
   "오후, 몸이 마를 때, 겨울.",
   "지황은 단맛이 강해 오래 끓이면 더 진해집니다."
  ],
  "en": [
   "Rehmannia Tea",
   "Dried rehmannia root — dark, sweet and deeply medicinal.",
   "None · caffeine-free",
   "6 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; use the dried root.",
   "Korea and China. The root is dried.",
   "Roasted herbal sweetness, a dark liquor.",
   "Afternoon, when dry, winter.",
   "Its sweetness deepens with a longer simmer."
  ],
  "zh-CN": [
   "地黄茶",
   "把干地黄煮成的色深味甜的汉方茶。",
   "不发酵 · 无咖啡因",
   "300毫升配6克",
   "2泡",
   "90度煮10分钟，用干根。",
   "韩国与中国。地黄根晒干使用。",
   "焙药香与浓甜，汤色深。",
   "下午、口干时、冬天。",
   "地黄甜味强，煮久更浓。"
  ],
  "zh-TW": [
   "地黃茶",
   "把乾地黃煮成的色深味甜的漢方茶。",
   "不發酵 · 無咖啡因",
   "300毫升配6公克",
   "2泡",
   "90度煮10分鐘，用乾根。",
   "韓國與中國。地黃根曬乾使用。",
   "焙藥香與濃甜，湯色深。",
   "下午、口乾時、冬天。",
   "地黃甜味強，煮久更濃。"
  ]
 },
 {
  "id": "herb-eucommia",
  "group": "traditional",
  "kind": "tea",
  "hanja": "杜",
  "sub": "Eucommia Tea",
  "alias": [
   "두충",
   "두충차"
  ],
  "hz": "杜仲",
  "hs": "杜仲",
  "rom": "Duchung-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "두충차",
   "두충나무 껍질을 말려 끓인 구수하고 살짝 쌉쌀한 차.",
   "무산화 · 카페인 없음",
   "300ml에 5g",
   "2회",
   "90도에서 10분. 껍질을 잘게 썰어 씁니다.",
   "한국·중국. 두충 껍질을 말려 씁니다.",
   "구수한 나무 껍질 향과 옅은 단맛, 가벼운 떫음.",
   "아침, 허리가 시릴 때.",
   "두충은 껍질을 잘게 썰어야 우러나고, 끓이면 거품이 생깁니다."
  ],
  "en": [
   "Eucommia Tea",
   "Dried eucommia bark — nutty, faintly bitter and astringent.",
   "None · caffeine-free",
   "5 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; slice the bark fine.",
   "Korea and China. The bark is dried.",
   "Nutty bark, light sweetness, a soft astringency.",
   "Morning, when the back feels cold.",
   "Slice fine; it foams a little as it simmers."
  ],
  "zh-CN": [
   "杜仲茶",
   "把干杜仲皮煮成的香而微苦的茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克",
   "2泡",
   "90度煮10分钟，树皮切细。",
   "韩国与中国。杜仲皮晒干使用。",
   "焙树皮香与淡甜，轻微涩。",
   "早晨、腰膝发冷时。",
   "树皮切细才出味，煮时会起泡。"
  ],
  "zh-TW": [
   "杜仲茶",
   "把乾杜仲皮煮成的香而微苦的茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克",
   "2泡",
   "90度煮10分鐘，樹皮切細。",
   "韓國與中國。杜仲皮曬乾使用。",
   "焙樹皮香與淡甜，輕微澀。",
   "早晨、腰膝發冷時。",
   "樹皮切細才出味，煮時會起泡。"
  ]
 },
 {
  "id": "herb-poria",
  "group": "traditional",
  "kind": "tea",
  "hanja": "茯",
  "sub": "Poria Tea",
  "alias": [
   "복령",
   "복령차"
  ],
  "hz": "茯苓",
  "hs": "茯苓",
  "rom": "Bokryeong-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "복령차",
   "복령 버섯을 말려 끓인 담백하고 살짝 단 차.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "95도에서 15분. 말린 복령을 잘게 썰어 씁니다.",
   "한국·중국. 소나무 뿌리에 자라는 복령을 말립니다.",
   "담백한 버섯 향과 옅은 단맛, 깨끗한 끝맛.",
   "아침, 몸이 무거울 때.",
   "복령은 잘게 썰어야 우러나고, 오래 끓여도 맛이 변하지 않습니다."
  ],
  "en": [
   "Poria Tea",
   "Dried poria simmered into a clean, mild, faintly sweet cup.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "95 °C for 15 minutes; slice the dried fungus fine.",
   "Korea and China. Poria grows on pine roots and is dried.",
   "Mild mushroom, light sweetness, a clean finish.",
   "Morning, when feeling heavy.",
   "Slice fine; it holds up to a long simmer."
  ],
  "zh-CN": [
   "茯苓茶",
   "把干茯苓煮成的清淡微甜茶。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "95度煮15分钟，茯苓切小块。",
   "韩国与中国。寄生松根的茯苓晒干。",
   "清淡菌香与淡甜，收口干净。",
   "早晨、身体沉重时。",
   "切小块才出味，久煮也不变味。"
  ],
  "zh-TW": [
   "茯苓茶",
   "把乾茯苓煮成的清淡微甜茶。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "95度煮15分鐘，茯苓切小塊。",
   "韓國與中國。寄生松根的茯苓曬乾。",
   "清淡菌香與淡甜，收口乾淨。",
   "早晨、身體沉重時。",
   "切小塊才出味，久煮也不變味。"
  ]
 },
 {
  "id": "herb-reishi",
  "group": "traditional",
  "kind": "tea",
  "hanja": "靈",
  "sub": "Reishi Tea",
  "alias": [
   "영지",
   "영지버섯차"
  ],
  "hz": "靈芝",
  "hs": "灵芝",
  "rom": "Yeongji-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "5g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "영지차",
   "영지버섯을 얇게 썰어 끓인 쌉쌀하고 구수한 차.",
   "무산화 · 카페인 없음",
   "400ml에 5g",
   "2회",
   "95도에서 20분. 말린 버섯을 썰어 씁니다.",
   "한국·중국. 영지버섯을 말려 씁니다.",
   "쌉쌀한 버섯 향과 옅은 단맛, 깊은 여운.",
   "저녁, 잠들기 전, 기운이 없을 때.",
   "영지는 오래 끓여야 맛이 나고, 대추를 더하면 쓴맛이 줄어듭니다."
  ],
  "en": [
   "Reishi Tea",
   "Sliced reishi mushroom simmered into a bitter, savoury cup.",
   "None · caffeine-free",
   "5 g to 400 ml",
   "2 infusions",
   "95 °C for 20 minutes; slice the dried mushroom.",
   "Korea and China. Reishi is dried.",
   "Bitter mushroom, light sweetness, a long finish.",
   "Evening, before bed, when low.",
   "It needs a long simmer; a jujube cuts the bitterness."
  ],
  "zh-CN": [
   "灵芝茶",
   "把灵芝切薄片煮成的微苦香茶。",
   "不发酵 · 无咖啡因",
   "400毫升配5克",
   "2泡",
   "95度煮20分钟，灵芝切片。",
   "韩国与中国。灵芝晒干使用。",
   "微苦菌香与淡甜，余味长。",
   "晚上、睡前、疲倦时。",
   "要久煮才出味，加红枣可减苦。"
  ],
  "zh-TW": [
   "靈芝茶",
   "把靈芝切薄片煮成的微苦香茶。",
   "不發酵 · 無咖啡因",
   "400毫升配5公克",
   "2泡",
   "95度煮20分鐘，靈芝切片。",
   "韓國與中國。靈芝曬乾使用。",
   "微苦菌香與淡甜，餘味長。",
   "晚上、睡前、疲倦時。",
   "要久煮才出味，加紅棗可減苦。"
  ]
 },
 {
  "id": "herb-swordbean",
  "group": "traditional",
  "kind": "tea",
  "hanja": "刀",
  "sub": "Sword Bean Tea",
  "alias": [
   "작두콩",
   "도두차"
  ],
  "hz": "刀豆",
  "hs": "刀豆",
  "rom": "Jakdukong-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "작두콩차",
   "작두콩을 볶아 끓인 구수하고 살짝 단 차.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "95도에서 10분. 볶은 콩을 씁니다.",
   "한국. 작두콩을 볶아 씁니다.",
   "볶은 콩의 고소함과 옅은 단맛.",
   "아침, 식후, 목이 칼칼할 때.",
   "작두콩은 볶아야 비린 맛이 없고, 반으로 갈아 끓이면 더 진합니다."
  ],
  "en": [
   "Sword Bean Tea",
   "Roasted sword beans simmered into a nutty, lightly sweet cup.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "95 °C for 10 minutes; use roasted beans.",
   "Korea. Sword beans are roasted.",
   "Roasted bean, light sweetness.",
   "Morning, after meals, when the throat feels raw.",
   "Roast to remove the raw taste; split the beans for a deeper cup."
  ],
  "zh-CN": [
   "刀豆茶",
   "把炒刀豆煮成的香而微甜的茶。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "95度煮10分钟，用炒刀豆。",
   "韩国。刀豆炒制后使用。",
   "焙豆的香与淡甜。",
   "早晨、饭后、喉咙不适时。",
   "炒过才没有生味，掰开煮更浓。"
  ],
  "zh-TW": [
   "刀豆茶",
   "把炒刀豆煮成的香而微甜的茶。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "95度煮10分鐘，用炒刀豆。",
   "韓國。刀豆炒製後使用。",
   "焙豆的香與淡甜。",
   "早晨、飯後、喉嚨不適時。",
   "炒過才沒有生味，掰開煮更濃。"
  ]
 },
 {
  "id": "herb-licorice",
  "group": "traditional",
  "kind": "tea",
  "hanja": "甘",
  "sub": "Licorice Tea",
  "alias": [
   "감초",
   "감초차"
  ],
  "hz": "甘草",
  "hs": "甘草",
  "rom": "Gamcho-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "감초차",
   "감초 뿌리를 끓인 달고 쌉쌀한 차 — 다른 차에 섞어도 좋습니다.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "90도에서 7분. 3g을 넘기지 않습니다.",
   "중국·한국. 감초 뿌리를 말려 씁니다.",
   "달콤함 뒤에 오는 쌉쌀함, 뿌리 향.",
   "식후, 목이 아플 때.",
   "감초는 하루 3g 안팎이 적당합니다. 많이 마시면 몸이 붓거나 혈압이 오를 수 있습니다."
  ],
  "en": [
   "Licorice Tea",
   "Licorice root brewed sweet and bitter — good alone or to round out other teas.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; keep to about 3 g.",
   "China and Korea. The root is dried.",
   "Sweetness with a bitter tail and a root aroma.",
   "After meals, for a sore throat.",
   "Around 3 g a day is the usual limit; large amounts can raise blood pressure or cause swelling."
  ],
  "zh-CN": [
   "甘草茶",
   "把甘草根煮成的甜中带苦的茶，也可与其他茶拼配。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "90度煮7分钟，不要超过3克。",
   "中国与韩国。甘草根晒干使用。",
   "甜后回苦，带根香。",
   "饭后、喉咙痛时。",
   "每天约3克为宜，喝太多可能水肿或升高血压。"
  ],
  "zh-TW": [
   "甘草茶",
   "把甘草根煮成的甜中帶苦的茶，也可與其他茶拼配。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "90度煮7分鐘，不要超過3克。",
   "中國與韓國。甘草根曬乾使用。",
   "甜後回苦，帶根香。",
   "飯後、喉嚨痛時。",
   "每天約3公克為宜，喝太多可能水腫或升高血壓。"
  ]
 },
 {
  "id": "herb-cinnamon",
  "group": "traditional",
  "kind": "tea",
  "hanja": "肉",
  "sub": "Cinnamon Tea",
  "alias": [
   "계피",
   "육계차"
  ],
  "hz": "肉桂",
  "hs": "肉桂",
  "rom": "Gyepi-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   300,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "계피차",
   "계피 껍질을 끓인 향이 강하고 달콤한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "90도에서 7분. 대추·생강과 잘 어울립니다.",
   "한국·중국·스리랑카. 계피 껍질을 말려 씁니다.",
   "따뜻한 나무 껍질 향과 알싸한 단맛.",
   "겨울, 식후, 대추와 함께.",
   "계피는 3g이면 충분합니다. 오래 끓이면 쓴맛이 올라옵니다."
  ],
  "en": [
   "Cinnamon Tea",
   "Cinnamon bark brewed into a warm, sweet, spicy cup.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; pairs well with jujube and ginger.",
   "Korea, China and Sri Lanka. The bark is dried.",
   "Warm bark aroma, a pungent sweetness.",
   "Winter, after meals, with jujube.",
   "Three grams is plenty; a long boil turns it bitter."
  ],
  "zh-CN": [
   "肉桂茶",
   "把肉桂皮煮成的温暖辛甜的茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "90度煮7分钟，和红枣、姜很搭。",
   "韩国、中国、斯里兰卡。肉桂皮晒干使用。",
   "温暖树皮香与辛甜。",
   "冬天、饭后、配红枣。",
   "3克就够，煮太久会发苦。"
  ],
  "zh-TW": [
   "肉桂茶",
   "把肉桂皮煮成的溫暖辛甜的茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "90度煮7分鐘，和紅棗、薑很搭。",
   "韓國、中國、斯里蘭卡。肉桂皮曬乾使用。",
   "溫暖樹皮香與辛甜。",
   "冬天、飯後、配紅棗。",
   "3公克就夠，煮太久會發苦。"
  ]
 },
 {
  "id": "herb-cinnamon-twig",
  "group": "traditional",
  "kind": "tea",
  "hanja": "桂",
  "sub": "Cassia Twig Tea",
  "alias": [
   "계지",
   "육계지차"
  ],
  "hz": "桂枝",
  "hs": "桂枝",
  "rom": "Gyeji-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-cozy",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "계지차",
   "계피나무의 어린 가지를 끓인 향긋하고 알싸한 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 7분. 가지를 잘게 썰어 씁니다.",
   "중국. 계피나무 어린 가지를 말려 씁니다.",
   "계피보다 가볍고 풋풋한 나무 향, 알싸한 단맛.",
   "겨울, 식후, 몸이 으슬으슬할 때.",
   "계지는 계피보다 향이 가벼워 4g 정도면 충분합니다."
  ],
  "en": [
   "Cassia Twig Tea",
   "Young cassia twigs brewed into a lighter, greener cinnamon cup.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; slice the twigs fine.",
   "China. Young cassia twigs are dried.",
   "Lighter than bark, greener, with a pungent sweetness.",
   "Winter, after meals, when chilled.",
   "Lighter than cinnamon bark, so 4 g is enough."
  ],
  "zh-CN": [
   "桂枝茶",
   "把肉桂树的嫩枝煮成的清香辛甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮7分钟，枝条切细。",
   "中国。肉桂嫩枝晒干使用。",
   "比肉桂皮更轻、更青的枝香与辛甜。",
   "冬天、饭后、发冷时。",
   "比肉桂皮轻，4克就够。"
  ],
  "zh-TW": [
   "桂枝茶",
   "把肉桂樹的嫩枝煮成的清香辛甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮7分鐘，枝條切細。",
   "中國。肉桂嫩枝曬乾使用。",
   "比肉桂皮更輕、更青的枝香與辛甜。",
   "冬天、飯後、發冷時。",
   "比肉桂皮輕，4公克就夠。"
  ]
 },
 {
  "id": "herb-tangerine-peel",
  "group": "traditional",
  "kind": "tea",
  "hanja": "陳",
  "sub": "Dried Tangerine Peel Tea",
  "alias": [
   "진피",
   "귤피차",
   "진피차"
  ],
  "hz": "陳皮",
  "hs": "陈皮",
  "rom": "Jinpi-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "진피차",
   "귤 껍질을 오래 말린 진피를 끓인 향긋하고 쌉쌀한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "3회",
   "95도에서 5분. 오래 묵은 진피일수록 향이 좋습니다.",
   "중국 광둥. 귤 껍질을 말려 3년 이상 묵힙니다.",
   "귤 껍질의 상큼한 향과 쌉쌀한 단맛.",
   "식후, 기름진 식사 뒤, 겨울.",
   "진피는 흰 속을 긁어내고 끓이면 쓴맛이 덜합니다."
  ],
  "en": [
   "Dried Tangerine Peel Tea",
   "Aged tangerine peel brewed into a citrusy, faintly bitter cup.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "3 infusions",
   "95 °C for 5 minutes; older peel smells better.",
   "Guangdong, China. Peel is dried and aged three years or more.",
   "Bright citrus peel with a bitter sweetness.",
   "After meals, after rich food, winter.",
   "Scrape the white pith for a less bitter cup."
  ],
  "zh-CN": [
   "陈皮茶",
   "把陈年橘皮煮成的清香微苦的茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "3泡",
   "95度煮5分钟，陈皮越陈越香。",
   "中国广东。橘皮晒干后陈放三年以上。",
   "橘皮的清香与苦甜。",
   "饭后、油腻之后、冬天。",
   "刮掉内层白瓤再煮，苦味会少。"
  ],
  "zh-TW": [
   "陳皮茶",
   "把陳年橘皮煮成的清香微苦的茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "3泡",
   "95度煮5分鐘，陳皮越陳越香。",
   "中國廣東。橘皮曬乾後陳放三年以上。",
   "橘皮的清香與苦甜。",
   "飯後、油膩之後、冬天。",
   "刮掉內層白瓤再煮，苦味會少。"
  ]
 },
 {
  "id": "herb-tangerine-blossom",
  "group": "traditional",
  "kind": "tea",
  "hanja": "橘",
  "sub": "Citrus Flower Tea",
  "alias": [
   "귤화",
   "귤꽃차"
  ],
  "hz": "橘花",
  "hs": "橘花",
  "rom": "Gyulhwa-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "귤화차",
   "귤나무 꽃을 말려 우린 향긋하고 달콤한 꽃차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "85도에서 2분. 오래 우리면 쌉쌀합니다.",
   "중국·한국 남부. 귤꽃을 따 말려 씁니다.",
   "귤꽃의 맑은 단 향과 옅은 단맛.",
   "오후, 디저트와, 손님상.",
   "꽃은 85도에서 2분이면 충분합니다. 끓는 물은 향을 태웁니다."
  ],
  "en": [
   "Citrus Flower Tea",
   "Dried citrus blossom — clean, sweet and floral.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "85 °C for 2 minutes; longer turns it bitter.",
   "Southern China and Korea. Blossoms are picked and dried.",
   "Clear sweet citrus blossom with a light sweetness.",
   "Afternoon, with dessert, for guests.",
   "Two minutes at 85 °C is enough; boiling water scorches the aroma."
  ],
  "zh-CN": [
   "橘花茶",
   "把干橘花泡出的清甜花茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "85度泡2分钟，久泡会苦。",
   "中国南方与韩国。橘花采下晒干。",
   "清甜的橘花香与淡甜。",
   "下午、配甜点、待客。",
   "85度泡两分钟就够，沸水会烫掉香气。"
  ],
  "zh-TW": [
   "橘花茶",
   "把乾橘花泡出的清甜花茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "85度泡2分鐘，久泡會苦。",
   "中國南方與韓國。橘花採下曬乾。",
   "清甜的橘花香與淡甜。",
   "下午、配甜點、待客。",
   "85度泡兩分鐘就夠，沸水會燙掉香氣。"
  ]
 },
 {
  "id": "herb-plumblossom",
  "group": "traditional",
  "kind": "tea",
  "hanja": "梅",
  "sub": "Plum Blossom Tea",
  "alias": [
   "매화",
   "매화차"
  ],
  "hz": "梅花",
  "hs": "梅花",
  "rom": "Maehwa-cha",
  "temp": 85,
  "tempRange": "80~85℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "매화차",
   "매화 꽃봉오리를 말려 우린 향긋하고 은은한 꽃차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "80도에서 2분. 꽃이 열리면 충분합니다.",
   "한국·중국. 이른 봄 매화 꽃봉오리를 말립니다.",
   "은은한 꽃 향과 옅은 단맛, 깨끗한 여운.",
   "오후, 봄, 손님상.",
   "매화는 물이 너무 뜨거우면 향이 날아갑니다. 80도에서 짧게."
  ],
  "en": [
   "Plum Blossom Tea",
   "Dried plum buds steeped into a quiet, delicate floral cup.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "80 °C for 2 minutes, until the buds open.",
   "Korea and China. Early-spring plum buds are dried.",
   "Delicate blossom, light sweetness, a clean finish.",
   "Afternoon, spring, for guests.",
   "Water that is too hot drives off the aroma; 80 °C, briefly."
  ],
  "zh-CN": [
   "梅花茶",
   "把干梅花苞泡出的清雅花茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "80度泡2分钟，花苞打开即可。",
   "韩国与中国。早春梅花苞晒干。",
   "清雅花香与淡甜，余味干净。",
   "下午、春天、待客。",
   "水温太高香气会跑掉，80度短泡。"
  ],
  "zh-TW": [
   "梅花茶",
   "把乾梅花苞泡出的清雅花茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "80度泡2分鐘，花苞打開即可。",
   "韓國與中國。早春梅花苞曬乾。",
   "清雅花香與淡甜，餘味乾淨。",
   "下午、春天、待客。",
   "水溫太高香氣會跑掉，80度短泡。"
  ]
 },
 {
  "id": "herb-peachblossom",
  "group": "traditional",
  "kind": "tea",
  "hanja": "桃",
  "sub": "Peach Blossom Tea",
  "alias": [
   "도화",
   "복숭아꽃차"
  ],
  "hz": "桃花",
  "hs": "桃花",
  "rom": "Dohwa-cha",
  "temp": 85,
  "tempRange": "80~85℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "도화차",
   "복숭아꽃을 말려 우린 부드럽고 달콤한 꽃차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "80도에서 2분.",
   "한국·중국. 봄 복숭아꽃을 말려 씁니다.",
   "부드러운 꽃 향과 옅은 복숭아 같은 단맛.",
   "오후, 디저트, 봄.",
   "도화는 색이 연해 오래 우리면 쌉쌀해집니다. 2분을 넘기지 마세요."
  ],
  "en": [
   "Peach Blossom Tea",
   "Dried peach blossom — soft, sweet and gently floral.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "80 °C for 2 minutes.",
   "Korea and China. Spring peach blossoms are dried.",
   "Soft blossom with a peach-like sweetness.",
   "Afternoon, dessert, spring.",
   "Pale petals turn bitter if steeped long; keep it to two minutes."
  ],
  "zh-CN": [
   "桃花茶",
   "把干桃花泡出的柔甜花茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "80度泡2分钟。",
   "韩国与中国。春天桃花晒干使用。",
   "柔和的桃花香与淡淡的桃甜。",
   "下午、甜点、春天。",
   "花瓣薄，泡久会苦，别超过两分钟。"
  ],
  "zh-TW": [
   "桃花茶",
   "把乾桃花泡出的柔甜花茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "80度泡2分鐘。",
   "韓國與中國。春天桃花曬乾使用。",
   "柔和的桃花香與淡淡的桃甜。",
   "下午、甜點、春天。",
   "花瓣薄，泡久會苦，別超過兩分鐘。"
  ]
 },
 {
  "id": "herb-cherryblossom",
  "group": "traditional",
  "kind": "tea",
  "hanja": "櫻",
  "sub": "Cherry Blossom Tea",
  "alias": [
   "벚꽃",
   "앵화차"
  ],
  "hz": "櫻花",
  "hs": "樱花",
  "rom": "Beotkkot-cha",
  "temp": 85,
  "tempRange": "80~85℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
  "originCountry": {
   "ko": "일본",
   "en": "Japan",
   "zh-CN": "日本",
   "zh-TW": "日本"
  },
  "originCountryCode": "jp",
  "ko": [
   "벚꽃차",
   "소금에 절인 벚꽃을 우린 향긋하고 짭짤한 꽃차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "80도에서 2분. 소금기는 첫 물로 헹굽니다.",
   "일본·한국. 벚꽃을 소금에 절여 말립니다.",
   "꽃 향과 옅은 소금기, 깨끗한 단맛.",
   "봄, 디저트, 손님상.",
   "소금에 절인 꽃은 먼저 뜨거운 물로 살짝 헹궈야 짜지 않습니다."
  ],
  "en": [
   "Cherry Blossom Tea",
   "Salt-pickled cherry blossom steeped into a floral, gently salty cup.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "80 °C for 2 minutes; rinse off the salt first.",
   "Japan and Korea. Blossoms are salted and dried.",
   "Blossom aroma, a light saltiness, clean sweetness.",
   "Spring, dessert, for guests.",
   "Rinse salt-pickled blossoms briefly first or the cup turns briny."
  ],
  "zh-CN": [
   "樱花茶",
   "把盐渍樱花泡出的清香微咸花茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "80度泡2分钟，先冲掉盐分。",
   "日本与韩国。樱花盐渍后晒干。",
   "花香与淡淡咸味，清甜收口。",
   "春天、甜点、待客。",
   "盐渍花先用热水略冲，不然会太咸。"
  ],
  "zh-TW": [
   "櫻花茶",
   "把鹽漬櫻花泡出的清香微鹹花茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "80度泡2分鐘，先沖掉鹽分。",
   "日本與韓國。櫻花鹽漬後曬乾。",
   "花香與淡淡鹹味，清甜收口。",
   "春天、甜點、待客。",
   "鹽漬花先用熱水略沖，不然會太鹹。"
  ]
 },
 {
  "id": "herb-camellia",
  "group": "traditional",
  "kind": "tea",
  "hanja": "山",
  "sub": "Camellia Flower Tea",
  "alias": [
   "동백",
   "동백꽃차"
  ],
  "hz": "山茶花",
  "hs": "山茶花",
  "rom": "Dongbaek-cha",
  "temp": 85,
  "tempRange": "80~85℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "동백차",
   "동백꽃을 말려 우린 은은하고 부드러운 꽃차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "80도에서 2분.",
   "한국·일본. 겨울에 핀 동백꽃을 말려 씁니다.",
   "은은한 꽃 향과 옅은 단맛, 부드러운 질감.",
   "겨울, 오후, 디저트.",
   "동백꽃은 수분이 많아 잘 말려야 하고, 우릴 때는 2분이면 충분합니다."
  ],
  "en": [
   "Camellia Flower Tea",
   "Dried camellia blossom — soft, quiet and faintly sweet.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "80 °C for 2 minutes.",
   "Korea and Japan. Winter camellia blossoms are dried.",
   "Quiet blossom, light sweetness, a soft body.",
   "Winter, afternoon, dessert.",
   "The petals hold water; dry them well and steep only two minutes."
  ],
  "zh-CN": [
   "山茶花茶",
   "把干山茶花泡出的柔和花茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "80度泡2分钟。",
   "韩国与日本。冬天山茶花晒干使用。",
   "清雅花香与淡甜，口感柔。",
   "冬天、下午、甜点。",
   "花瓣水分多，要晒透，泡两分钟就够。"
  ],
  "zh-TW": [
   "山茶花茶",
   "把乾山茶花泡出的柔和花茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "80度泡2分鐘。",
   "韓國與日本。冬天山茶花曬乾使用。",
   "清雅花香與淡甜，口感柔。",
   "冬天、下午、甜點。",
   "花瓣水分多，要曬透，泡兩分鐘就夠。"
  ]
 },
 {
  "id": "herb-magnolia",
  "group": "traditional",
  "kind": "tea",
  "hanja": "木",
  "sub": "Magnolia Flower Tea",
  "alias": [
   "목련",
   "목련꽃차"
  ],
  "hz": "木蘭",
  "hs": "木兰",
  "rom": "Mokryeon-cha",
  "temp": 85,
  "tempRange": "80~85℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "목련차",
   "목련 꽃봉오리를 말려 우린 향이 강한 꽃차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "80도에서 2분. 봉오리를 반으로 갈라 우립니다.",
   "한국·중국. 이른 봄 목련 봉오리를 말립니다.",
   "진한 꽃 향과 쌉쌀한 끝맛.",
   "봄, 오후.",
   "목련은 향이 강해 2g이면 충분하고, 오래 우리면 씁니다."
  ],
  "en": [
   "Magnolia Flower Tea",
   "Dried magnolia buds — a strong floral cup with a bitter edge.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "80 °C for 2 minutes; split the buds.",
   "Korea and China. Early-spring magnolia buds are dried.",
   "Strong blossom with a bitter finish.",
   "Spring, afternoon.",
   "The aroma is strong: 2 g is plenty, and long steeping turns it bitter."
  ],
  "zh-CN": [
   "木兰花茶",
   "把干木兰花花苞泡出的浓香花茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "80度泡2分钟，花苞掰开。",
   "韩国与中国。早春木兰苞晒干。",
   "浓郁花香与微苦收口。",
   "春天、下午。",
   "香气强，2克就够，泡久会苦。"
  ],
  "zh-TW": [
   "木蘭花茶",
   "把乾木蘭花苞泡出的濃香花茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "80度泡2分鐘，花苞掰開。",
   "韓國與中國。早春木蘭苞曬乾。",
   "濃郁花香與微苦收口。",
   "春天、下午。",
   "香氣強，2公克就夠，泡久會苦。"
  ]
 },
 {
  "id": "herb-pinepollen",
  "group": "traditional",
  "kind": "tea",
  "hanja": "松",
  "sub": "Pine Pollen Tea",
  "alias": [
   "송화",
   "송화밀수"
  ],
  "hz": "松花",
  "hs": "松花",
  "rom": "Songhwa-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "송화차",
   "소나무 꽃가루를 꿀물에 풀어 마시는 달콤한 전통차.",
   "무산화 · 카페인 없음",
   "300ml에 5g, 꿀은 취향껏",
   "1회",
   "85도에서 꿀물에 개어 마십니다. 끓이지 않습니다.",
   "한국. 소나무 꽃가루를 체로 쳐 모읍니다.",
   "고소한 꽃가루 향과 꿀의 단맛, 부드러운 목넘김.",
   "여름, 손님상, 명절.",
   "송화는 끓이지 말고 미지근한 물에 꿀로 개어 마십니다."
  ],
  "en": [
   "Pine Pollen Tea",
   "Pine pollen stirred into honey water — a sweet Korean traditional cup.",
   "None · caffeine-free",
   "5 g to 300 ml, honey to taste",
   "One serving",
   "Mix into warm honey water at about 85 °C; do not boil.",
   "Korea. Pine pollen is sieved and collected.",
   "Nutty pollen, honey sweetness, a smooth finish.",
   "Summer, for guests, holidays.",
   "Do not boil it: stir the pollen into warm honey water."
  ],
  "zh-CN": [
   "松花茶",
   "把松花粉调进蜂蜜水里的韩国传统甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克，蜂蜜随意",
   "1次",
   "用85度蜂蜜水调开，不要煮。",
   "韩国。松花粉过筛收集。",
   "松花粉的香与蜂蜜的甜，入口柔。",
   "夏天、待客、节日。",
   "松花粉不要煮，用温水加蜂蜜调开。"
  ],
  "zh-TW": [
   "松花茶",
   "把松花粉調進蜂蜜水裡的韓國傳統甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克，蜂蜜隨意",
   "1次",
   "用85度蜂蜜水調開，不要煮。",
   "韓國。松花粉過篩收集。",
   "松花粉的香與蜂蜜的甜，入口柔。",
   "夏天、待客、節日。",
   "松花粉不要煮，用溫水加蜂蜜調開。"
  ]
 },
 {
  "id": "herb-pineneedle",
  "group": "traditional",
  "kind": "tea",
  "hanja": "松",
  "sub": "Pine Needle Tea",
  "alias": [
   "솔잎",
   "송엽차"
  ],
  "hz": "松葉",
  "hs": "松叶",
  "rom": "Sollip-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-grass a-roast b-light k-crisp r-clean s-hot w-quick p-solo c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "솔잎차",
   "솔잎을 말려 우린 소나무 향이 짙은 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "90도에서 3분. 솔잎을 잘게 썰어 씁니다.",
   "한국. 솔잎을 말려 씁니다.",
   "짙은 송진 향과 쌉쌀한 맛, 개운한 끝맛.",
   "아침, 환절기, 식후.",
   "솔잎은 3분 이상 우리면 쓴맛이 강해집니다."
  ],
  "en": [
   "Pine Needle Tea",
   "Dried pine needles steeped into a resinous, brisk cup.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "90 °C for 3 minutes; chop the needles.",
   "Korea. Pine needles are dried.",
   "Resinous pine, a bitter edge, a clean finish.",
   "Morning, changing seasons, after meals.",
   "Beyond three minutes it turns sharply bitter."
  ],
  "zh-CN": [
   "松叶茶",
   "把干松针泡出的松香浓茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "90度泡3分钟，松针切细。",
   "韩国。松针晒干使用。",
   "浓郁松脂香与微苦，收口清爽。",
   "早晨、换季、饭后。",
   "泡超过三分钟会明显发苦。"
  ],
  "zh-TW": [
   "松葉茶",
   "把乾松針泡出的松香濃茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "90度泡3分鐘，松針切細。",
   "韓國。松針曬乾使用。",
   "濃郁松脂香與微苦，收口清爽。",
   "早晨、換季、飯後。",
   "泡超過三分鐘會明顯發苦。"
  ]
 },
 {
  "id": "herb-bamboo",
  "group": "traditional",
  "kind": "tea",
  "hanja": "竹",
  "sub": "Bamboo Leaf Tea",
  "alias": [
   "대나무",
   "죽엽차"
  ],
  "hz": "竹葉",
  "hs": "竹叶",
  "rom": "Daenamu-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-solo c-low m-refresh",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "대나무차",
   "대나무 잎을 말려 우린 풀 향이 맑은 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "85도에서 3분. 어린 잎을 씁니다.",
   "중국·한국 남부. 대나무 잎을 말려 씁니다.",
   "맑은 풀 향과 옅은 단맛, 서늘한 끝맛.",
   "더운 날, 식후, 차게.",
   "죽엽은 차게 우려도 좋습니다. 냉침하면 쓴맛이 적습니다."
  ],
  "en": [
   "Bamboo Leaf Tea",
   "Dried bamboo leaf — clean, green and cooling.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "85 °C for 3 minutes; use young leaves.",
   "China and southern Korea. Bamboo leaves are dried.",
   "Clean green grass, light sweetness, a cool finish.",
   "Hot days, after meals, chilled.",
   "Cold-brewing the leaves keeps the bitterness low."
  ],
  "zh-CN": [
   "竹叶茶",
   "把干竹叶泡出的清爽青草茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "85度泡3分钟，用嫩叶。",
   "中国与韩国南部。竹叶晒干使用。",
   "清爽的青草香与淡甜，收口凉。",
   "炎热的日子、饭后、放凉喝。",
   "冷泡的话苦味更少。"
  ],
  "zh-TW": [
   "竹葉茶",
   "把乾竹葉泡出的清爽青草茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "85度泡3分鐘，用嫩葉。",
   "中國與韓國南部。竹葉曬乾使用。",
   "清爽的青草香與淡甜，收口涼。",
   "炎熱的日子、飯後、放涼喝。",
   "冷泡的話苦味更少。"
  ]
 },
 {
  "id": "herb-honeysuckle",
  "group": "traditional",
  "kind": "tea",
  "hanja": "金",
  "sub": "Honeysuckle Tea",
  "alias": [
   "인동",
   "금은화차"
  ],
  "hz": "金銀花",
  "hs": "金银花",
  "rom": "Indong-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-floral b-light k-sweet r-clean s-hot s-iced w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "인동차",
   "인동꽃을 말려 우린 향긋하고 살짝 쓴 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "85도에서 3분. 꽃봉오리를 씁니다.",
   "중국·한국. 인동 꽃봉오리를 말려 씁니다.",
   "달콤한 꽃 향과 옅은 쌉쌀함.",
   "목이 아플 때, 더운 날, 식후.",
   "인동은 꽃봉오리가 가장 좋고, 끓는 물보다 85도가 향에 좋습니다."
  ],
  "en": [
   "Honeysuckle Tea",
   "Dried honeysuckle buds — floral, sweet and lightly bitter.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "85 °C for 3 minutes; use the buds.",
   "China and Korea. Honeysuckle buds are dried.",
   "Sweet blossom with a faint bitterness.",
   "Sore throat, hot days, after meals.",
   "Buds are best, and 85 °C keeps the aroma."
  ],
  "zh-CN": [
   "金银花茶",
   "把干金银花泡出的清香微苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "85度泡3分钟，用花苞。",
   "中国与韩国。金银花苞晒干使用。",
   "甜花香与淡淡苦味。",
   "喉咙痛、炎热的日子、饭后。",
   "花苞最好，85度比沸水更能留住香气。"
  ],
  "zh-TW": [
   "金銀花茶",
   "把乾金銀花泡出的清香微苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "85度泡3分鐘，用花苞。",
   "中國與韓國。金銀花苞曬乾使用。",
   "甜花香與淡淡苦味。",
   "喉嚨痛、炎熱的日子、飯後。",
   "花苞最好，85度比沸水更能留住香氣。"
  ]
 },
 {
  "id": "herb-gardenia",
  "group": "traditional",
  "kind": "tea",
  "hanja": "梔",
  "sub": "Gardenia Tea",
  "alias": [
   "치자",
   "치자차"
  ],
  "hz": "梔子",
  "hs": "栀子",
  "rom": "Chija-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "치자차",
   "말린 치자 열매를 끓인 노랗고 쌉쌀한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "90도에서 7분. 열매를 쪼개 넣습니다.",
   "중국·한국. 치자 열매를 말려 씁니다.",
   "쌉쌀한 열매 향과 옅은 단맛, 노란 물색.",
   "식후, 몸에 열이 있을 때.",
   "치자는 쌉쌀해 3g을 넘기지 말고, 꿀을 조금 더하면 부드럽습니다."
  ],
  "en": [
   "Gardenia Tea",
   "Dried gardenia fruit — yellow, bitter and faintly sweet.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; crack the fruit.",
   "China and Korea. Gardenia fruit is dried.",
   "Bitter fruit, light sweetness, a yellow liquor.",
   "After meals, when feeling heated.",
   "It is bitter: keep to 3 g and a little honey softens it."
  ],
  "zh-CN": [
   "栀子茶",
   "把干栀子煮成的黄色微苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "90度煮7分钟，果实敲开。",
   "中国与韩国。栀子果实晒干使用。",
   "微苦果香与淡甜，汤色黄。",
   "饭后、觉得上火时。",
   "栀子偏苦，别超过3克，加一点蜂蜜更柔。"
  ],
  "zh-TW": [
   "梔子茶",
   "把乾梔子煮成的黃色微苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "90度煮7分鐘，果實敲開。",
   "中國與韓國。梔子果實曬乾使用。",
   "微苦果香與淡甜，湯色黃。",
   "飯後、覺得上火時。",
   "梔子偏苦，別超過3公克，加一點蜂蜜更柔。"
  ]
 },
 {
  "id": "herb-safflower",
  "group": "traditional",
  "kind": "tea",
  "hanja": "紅",
  "sub": "Safflower Tea",
  "alias": [
   "잇꽃",
   "홍화차"
  ],
  "hz": "紅花",
  "hs": "红花",
  "rom": "Itchot-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-floral b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "잇꽃차",
   "잇꽃(홍화) 꽃잎을 우린 노랗고 살짝 쓴 차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "85도에서 2분. 꽃잎을 씁니다.",
   "중국·인도. 홍화 꽃잎을 말려 씁니다.",
   "옅은 꽃 향과 쌉쌀한 끝맛, 노란 물색.",
   "오후, 식후.",
   "잇꽃은 임신 중에는 피하는 것이 좋다고 알려져 있습니다. 2g을 넘기지 마세요."
  ],
  "en": [
   "Safflower Tea",
   "Safflower petals steeped into a yellow, faintly bitter cup.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "85 °C for 2 minutes; use the petals.",
   "China and India. Safflower petals are dried.",
   "Light floral, a bitter finish, yellow liquor.",
   "Afternoon, after meals.",
   "It is traditionally avoided in pregnancy; keep to 2 g."
  ],
  "zh-CN": [
   "红花茶",
   "把红花花瓣泡出的黄色微苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "85度泡2分钟，用花瓣。",
   "中国与印度。红花花瓣晒干使用。",
   "淡花香与微苦收口，汤色黄。",
   "下午、饭后。",
   "传统上孕妇避免饮用，别超过2克。"
  ],
  "zh-TW": [
   "紅花茶",
   "把紅花花瓣泡出的黃色微苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "85度泡2分鐘，用花瓣。",
   "中國與印度。紅花花瓣曬乾使用。",
   "淡花香與微苦收口，湯色黃。",
   "下午、飯後。",
   "傳統上孕婦避免飲用，別超過2公克。"
  ]
 },
 {
  "id": "trad-eonggeongkwi",
  "group": "traditional",
  "kind": "tea",
  "hanja": "大",
  "sub": "Thistle Tea",
  "alias": [
   "엉겅퀴",
   "대계차"
  ],
  "hz": "大薊",
  "hs": "大蓟",
  "rom": "Eonggeongkwi-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "엉겅퀴차",
   "엉겅퀴 잎과 줄기를 말려 끓인 쌉쌀하고 구수한 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 5분. 말린 잎을 씁니다.",
   "한국. 엉겅퀴를 말려 씁니다.",
   "쌉쌀한 풀 향과 옅은 단맛.",
   "식후, 간이 피곤한 날.",
   "엉겅퀴는 가시를 다듬고 말려야 하고, 쓴맛이 강하면 대추를 더하세요."
  ],
  "en": [
   "Thistle Tea",
   "Dried thistle leaf and stem — bitter, grassy and lightly nutty.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 5 minutes; use dried leaves.",
   "Korea. Thistle is dried.",
   "Bitter green, a light sweetness.",
   "After meals, when the liver feels tired.",
   "Trim the spines before drying; a jujube softens the bitterness."
  ],
  "zh-CN": [
   "大蓟茶",
   "把干大蓟叶与茎煮成的微苦香茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮5分钟，用干叶。",
   "韩国。大蓟晒干使用。",
   "微苦青草香与淡甜。",
   "饭后、觉得肝累的时候。",
   "去刺再晒，太苦可以加红枣。"
  ],
  "zh-TW": [
   "大薊茶",
   "把乾大薊葉與莖煮成的微苦香茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮5分鐘，用乾葉。",
   "韓國。大薊曬乾使用。",
   "微苦青草香與淡甜。",
   "飯後、覺得肝累的時候。",
   "去刺再曬，太苦可以加紅棗。"
  ]
 },
 {
  "id": "herb-butterbur",
  "group": "traditional",
  "kind": "tea",
  "hanja": "蜂",
  "sub": "Butterbur Tea",
  "alias": [
   "머위",
   "관동화차"
  ],
  "hz": "蜂斗菜",
  "hs": "蜂斗菜",
  "rom": "Meowi-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass a-roast b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "머위차",
   "머위 줄기와 잎을 말려 끓인 쌉쌀하고 구수한 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 5분. 말린 줄기를 씁니다.",
   "한국·일본. 머위 줄기를 말려 씁니다.",
   "쌉쌀한 풀 향과 옅은 단맛.",
   "식후, 봄, 기침이 잦을 때.",
   "머위는 데쳐 말려야 쓴맛이 줄고, 줄기를 잘게 썰면 우러나기 쉽습니다."
  ],
  "en": [
   "Butterbur Tea",
   "Dried butterbur stem and leaf — bitter, grassy and warming.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 5 minutes; use dried stems.",
   "Korea and Japan. Butterbur stems are dried.",
   "Bitter green, a light sweetness.",
   "After meals, spring, cough season.",
   "Blanch before drying to cut the bitterness, and slice the stems fine."
  ],
  "zh-CN": [
   "蜂斗菜茶",
   "把干蜂斗菜茎叶煮成的微苦香茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮5分钟，用干茎。",
   "韩国与日本。蜂斗菜茎晒干使用。",
   "微苦青草香与淡甜。",
   "饭后、春天、常咳时。",
   "先焯水再晒可减苦，茎切细更易出味。"
  ],
  "zh-TW": [
   "蜂斗菜茶",
   "把乾蜂斗菜莖葉煮成的微苦香茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮5分鐘，用乾莖。",
   "韓國與日本。蜂斗菜莖曬乾使用。",
   "微苦青草香與淡甜。",
   "飯後、春天、常咳時。",
   "先焯水再曬可減苦，莖切細更易出味。"
  ]
 },
 {
  "id": "herb-lotusroot",
  "group": "traditional",
  "kind": "tea",
  "hanja": "蓮",
  "sub": "Lotus Root Tea",
  "alias": [
   "연근",
   "연근차"
  ],
  "hz": "蓮藕",
  "hs": "莲藕",
  "rom": "Yeongeun-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "연근차",
   "말린 연근을 끓인 담백하고 살짝 단 차.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "95도에서 10분. 말린 연근을 불려 씁니다.",
   "한국·중국. 연근을 말려 씁니다.",
   "담백한 뿌리 향과 옅은 단맛, 부드러운 질감.",
   "아침, 식후, 기침이 잦을 때.",
   "연근은 불려 끓여야 속까지 부드럽고, 갈아 넣으면 걸쭉해집니다."
  ],
  "en": [
   "Lotus Root Tea",
   "Dried lotus root simmered into a mild, softly sweet cup.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "95 °C for 10 minutes; soak the dried root first.",
   "Korea and China. Lotus root is dried.",
   "Mild root, light sweetness, a soft body.",
   "Morning, after meals, cough season.",
   "Soak first; grated root makes it creamy."
  ],
  "zh-CN": [
   "莲藕茶",
   "把干莲藕煮成的清淡微甜茶。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "95度煮10分钟，干藕先泡软。",
   "韩国与中国。莲藕晒干使用。",
   "清淡根香与淡甜，口感柔。",
   "早晨、饭后、常咳时。",
   "先泡软再煮，磨碎会变浓稠。"
  ],
  "zh-TW": [
   "蓮藕茶",
   "把乾蓮藕煮成的清淡微甜茶。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "95度煮10分鐘，乾藕先泡軟。",
   "韓國與中國。蓮藕曬乾使用。",
   "清淡根香與淡甜，口感柔。",
   "早晨、飯後、常咳時。",
   "先泡軟再煮，磨碎會變濃稠。"
  ]
 },
 {
  "id": "herb-achyranthes",
  "group": "traditional",
  "kind": "tea",
  "hanja": "牛",
  "sub": "Achyranthes Tea",
  "alias": [
   "우슬",
   "토우슬차"
  ],
  "hz": "牛膝",
  "hs": "牛膝",
  "rom": "Useul-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "우슬차",
   "우슬 뿌리를 말려 끓인 구수하고 살짝 쓴 차.",
   "무산화 · 카페인 없음",
   "300ml에 5g",
   "2회",
   "90도에서 10분. 말린 뿌리를 씁니다.",
   "중국·한국. 우슬 뿌리를 말려 씁니다.",
   "구수한 뿌리 향과 옅은 쓴맛.",
   "오후, 무릎이 시릴 때.",
   "우슬은 기름에 볶아 말리면 맛이 부드러워집니다."
  ],
  "en": [
   "Achyranthes Tea",
   "Dried achyranthes root — nutty, slightly bitter and warming.",
   "None · caffeine-free",
   "5 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; use the dried root.",
   "China and Korea. The root is dried.",
   "Nutty root, a light bitterness.",
   "Afternoon, when knees feel cold.",
   "Toasting the root in a little oil first softens the taste."
  ],
  "zh-CN": [
   "牛膝茶",
   "把干牛膝煮成的香而微苦的茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克",
   "2泡",
   "90度煮10分钟，用干根。",
   "中国与韩国。牛膝根晒干使用。",
   "焙根香与轻微苦味。",
   "下午、膝头发冷时。",
   "用少许油炒过再晒，味道更柔。"
  ],
  "zh-TW": [
   "牛膝茶",
   "把乾牛膝煮成的香而微苦的茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克",
   "2泡",
   "90度煮10分鐘，用乾根。",
   "中國與韓國。牛膝根曬乾使用。",
   "焙根香與輕微苦味。",
   "下午、膝頭發冷時。",
   "用少許油炒過再曬，味道更柔。"
  ]
 },
 {
  "id": "herb-polygala",
  "group": "traditional",
  "kind": "tea",
  "hanja": "遠",
  "sub": "Polygala Tea",
  "alias": [
   "원지",
   "원지차"
  ],
  "hz": "遠志",
  "hs": "远志",
  "rom": "Wonji-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "원지차",
   "원지 뿌리를 말려 끓인 쌉쌀하고 특이한 향의 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 7분. 말린 뿌리를 씁니다.",
   "중국·한국. 원지 뿌리를 말려 씁니다.",
   "쌉쌀한 뿌리 향과 옅은 단맛.",
   "저녁, 잠이 얕을 때.",
   "원지는 향이 강해 4g이면 충분하고, 꿀을 더하면 부드럽습니다."
  ],
  "en": [
   "Polygala Tea",
   "Dried polygala root — bitter, earthy and distinctly aromatic.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; use the dried root.",
   "China and Korea. The root is dried.",
   "Bitter root with a light sweetness.",
   "Evening, when sleep is shallow.",
   "Its aroma is strong: 4 g is enough, and honey softens it."
  ],
  "zh-CN": [
   "远志茶",
   "把干远志煮成的微苦、气味独特的茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮7分钟，用干根。",
   "中国与韩国。远志根晒干使用。",
   "微苦根香与淡甜。",
   "晚上、睡不沉时。",
   "气味强，4克就够，加蜂蜜更柔。"
  ],
  "zh-TW": [
   "遠志茶",
   "把乾遠志煮成的微苦、氣味獨特的茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮7分鐘，用乾根。",
   "中國與韓國。遠志根曬乾使用。",
   "微苦根香與淡甜。",
   "晚上、睡不沉時。",
   "氣味強，4公克就夠，加蜂蜜更柔。"
  ]
 },
 {
  "id": "herb-sophora",
  "group": "traditional",
  "kind": "tea",
  "hanja": "苦",
  "sub": "Sophora Tea",
  "alias": [
   "고삼",
   "너삼차"
  ],
  "hz": "苦參",
  "hs": "苦参",
  "rom": "Gosam-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "고삼차",
   "고삼 뿌리를 말려 끓인 몹시 쓴 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "90도에서 7분. 말린 뿌리를 씁니다.",
   "중국·한국. 고삼 뿌리를 말려 씁니다.",
   "강한 쓴맛과 뿌리 향, 끝의 옅은 단맛.",
   "식후, 더운 날.",
   "고삼은 쓴맛이 강해 3g을 넘기지 말고, 꿀을 조금 더하세요."
  ],
  "en": [
   "Sophora Tea",
   "Dried sophora root — famously bitter, with an earthy root aroma.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; use the dried root.",
   "China and Korea. The root is dried.",
   "Strong bitterness, root aroma, a faint sweetness at the end.",
   "After meals, hot days.",
   "Very bitter: keep to 3 g and add a little honey."
  ],
  "zh-CN": [
   "苦参茶",
   "把干苦参煮成的极苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "90度煮7分钟，用干根。",
   "中国与韩国。苦参根晒干使用。",
   "强烈苦味与根香，尾端淡甜。",
   "饭后、炎热的日子。",
   "苦味强，别超过3克，可加少许蜂蜜。"
  ],
  "zh-TW": [
   "苦參茶",
   "把乾苦參煮成的極苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "90度煮7分鐘，用乾根。",
   "中國與韓國。苦參根曬乾使用。",
   "強烈苦味與根香，尾端淡甜。",
   "飯後、炎熱的日子。",
   "苦味強，別超過3公克，可加少許蜂蜜。"
  ]
 },
 {
  "id": "herb-agastache",
  "group": "traditional",
  "kind": "tea",
  "hanja": "藿",
  "sub": "Agastache Tea",
  "alias": [
   "곽향",
   "곽향차"
  ],
  "hz": "藿香",
  "hs": "藿香",
  "rom": "Gwakhyang-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "곽향차",
   "곽향 잎을 말려 우린 향이 강하고 서늘한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "85도에서 3분. 말린 잎을 씁니다.",
   "중국·한국. 곽향 잎을 말려 씁니다.",
   "박하를 닮은 강한 향과 서늘한 끝맛.",
   "여름, 식후, 속이 더부룩할 때.",
   "곽향은 향이 강해 3분 이상 우리면 씁니다."
  ],
  "en": [
   "Agastache Tea",
   "Dried agastache leaf — strong, mint-like and cooling.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "85 °C for 3 minutes; use the dried leaf.",
   "China and Korea. Agastache leaves are dried.",
   "Strong mint-like aroma, a cooling finish.",
   "Summer, after meals, when bloated.",
   "The aroma is strong; beyond three minutes it turns bitter."
  ],
  "zh-CN": [
   "藿香茶",
   "把干藿香叶泡出的强烈清凉茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "85度泡3分钟，用干叶。",
   "中国与韩国。藿香叶晒干使用。",
   "近似薄荷的强香与清凉收口。",
   "夏天、饭后、腹胀时。",
   "香气强，泡超过三分钟会苦。"
  ],
  "zh-TW": [
   "藿香茶",
   "把乾藿香葉泡出的強烈清涼茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "85度泡3分鐘，用乾葉。",
   "中國與韓國。藿香葉曬乾使用。",
   "近似薄荷的強香與清涼收口。",
   "夏天、飯後、腹脹時。",
   "香氣強，泡超過三分鐘會苦。"
  ]
 },
 {
  "id": "herb-schizonepeta",
  "group": "traditional",
  "kind": "tea",
  "hanja": "荊",
  "sub": "Schizonepeta Tea",
  "alias": [
   "형개",
   "형개차"
  ],
  "hz": "荊芥",
  "hs": "荆芥",
  "rom": "Hyeonggae-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-solo c-low m-refresh",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "형개차",
   "형개 잎과 꽃대를 말려 우린 향이 강한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "85도에서 3분.",
   "중국·한국. 형개를 말려 씁니다.",
   "약재 향과 약간의 매운 향, 서늘한 끝맛.",
   "식후, 감기 기운이 있을 때.",
   "형개는 향이 날아가기 쉬워 밀봉 보관하고, 3분만 우립니다."
  ],
  "en": [
   "Schizonepeta Tea",
   "Dried schizonepeta — a pungent, aromatic herbal cup.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "85 °C for 3 minutes.",
   "China and Korea. Schizonepeta is dried.",
   "Herbal and slightly pungent, with a cooling finish.",
   "After meals, when a cold is coming on.",
   "Keep it sealed; the aroma escapes, so steep only three minutes."
  ],
  "zh-CN": [
   "荆芥茶",
   "把干荆芥泡出的辛香药茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "85度泡3分钟。",
   "中国与韩国。荆芥晒干使用。",
   "药香带一点辛，收口清凉。",
   "饭后、有感冒征兆时。",
   "香气易散，密封保存，泡三分钟就好。"
  ],
  "zh-TW": [
   "荊芥茶",
   "把乾荊芥泡出的辛香藥茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "85度泡3分鐘。",
   "中國與韓國。荊芥曬乾使用。",
   "藥香帶一點辛，收口清涼。",
   "飯後、有感冒徵兆時。",
   "香氣易散，密封保存，泡三分鐘就好。"
  ]
 },
 {
  "id": "herb-bangpung",
  "group": "traditional",
  "kind": "tea",
  "hanja": "防",
  "sub": "Saposhnikovia Tea",
  "alias": [
   "방풍",
   "방풍차"
  ],
  "hz": "防風",
  "hs": "防风",
  "rom": "Bangpung-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "방풍차",
   "방풍 뿌리를 말려 끓인 구수하고 살짝 매운 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 7분. 말린 뿌리를 씁니다.",
   "중국·한국. 방풍 뿌리를 말려 씁니다.",
   "구수한 뿌리 향과 옅은 매운맛.",
   "식후, 바람을 쐬고 몸이 으슬으슬할 때.",
   "방풍은 4g이면 충분하고, 생강을 더하면 따뜻해집니다."
  ],
  "en": [
   "Saposhnikovia Tea",
   "Dried saposhnikovia root — nutty with a faint warmth.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; use the dried root.",
   "China and Korea. The root is dried.",
   "Nutty root with a light pungency.",
   "After meals, after being out in the wind.",
   "Four grams is enough; ginger adds warmth."
  ],
  "zh-CN": [
   "防风茶",
   "把干防风煮成的香而微辛的茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮7分钟，用干根。",
   "中国与韩国。防风根晒干使用。",
   "焙根香与轻微辛味。",
   "饭后、吹风后发冷时。",
   "4克就够，加姜更暖。"
  ],
  "zh-TW": [
   "防風茶",
   "把乾防風煮成的香而微辛的茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮7分鐘，用乾根。",
   "中國與韓國。防風根曬乾使用。",
   "焙根香與輕微辛味。",
   "飯後、吹風後發冷時。",
   "4公克就夠，加薑更暖。"
  ]
 },
 {
  "id": "herb-bupleurum",
  "group": "traditional",
  "kind": "tea",
  "hanja": "柴",
  "sub": "Bupleurum Tea",
  "alias": [
   "시호",
   "시호차"
  ],
  "hz": "柴胡",
  "hs": "柴胡",
  "rom": "Siho-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "시호차",
   "시호 뿌리를 말려 끓인 쌉쌀하고 구수한 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 7분. 말린 뿌리를 씁니다.",
   "중국·한국. 시호 뿌리를 말려 씁니다.",
   "쌉쌀한 뿌리 향과 옅은 단맛.",
   "오후, 열이 오를 때.",
   "시호는 4g이면 충분하고, 대추를 더하면 부드럽습니다."
  ],
  "en": [
   "Bupleurum Tea",
   "Dried bupleurum root — bitter, nutty and cooling.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; use the dried root.",
   "China and Korea. The root is dried.",
   "Bitter root with a light sweetness.",
   "Afternoon, when feverish.",
   "Four grams is enough; a jujube softens it."
  ],
  "zh-CN": [
   "柴胡茶",
   "把干柴胡煮成的微苦香茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮7分钟，用干根。",
   "中国与韩国。柴胡根晒干使用。",
   "微苦根香与淡甜。",
   "下午、发热时。",
   "4克就够，加红枣更柔。"
  ],
  "zh-TW": [
   "柴胡茶",
   "把乾柴胡煮成的微苦香茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮7分鐘，用乾根。",
   "中國與韓國。柴胡根曬乾使用。",
   "微苦根香與淡甜。",
   "下午、發熱時。",
   "4公克就夠，加紅棗更柔。"
  ]
 },
 {
  "id": "herb-sokdan",
  "group": "traditional",
  "kind": "tea",
  "hanja": "續",
  "sub": "Dipsacus Tea",
  "alias": [
   "속단",
   "속단차"
  ],
  "hz": "續斷",
  "hs": "续断",
  "rom": "Sokdan-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "속단차",
   "속단 뿌리를 말려 끓인 구수하고 살짝 쓴 차.",
   "무산화 · 카페인 없음",
   "300ml에 5g",
   "2회",
   "90도에서 10분. 말린 뿌리를 씁니다.",
   "중국·한국. 속단 뿌리를 말려 씁니다.",
   "구수한 뿌리 향과 옅은 쓴맛.",
   "오후, 허리와 무릎이 시릴 때.",
   "속단은 잘게 썰어 끓여야 우러나고, 대추를 더하면 부드럽습니다."
  ],
  "en": [
   "Dipsacus Tea",
   "Dried dipsacus root — nutty, faintly bitter and warming.",
   "None · caffeine-free",
   "5 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; use the dried root.",
   "China and Korea. The root is dried.",
   "Nutty root, a light bitterness.",
   "Afternoon, when the back and knees ache.",
   "Slice it fine; a jujube softens the cup."
  ],
  "zh-CN": [
   "续断茶",
   "把干续断煮成的香而微苦的茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克",
   "2泡",
   "90度煮10分钟，用干根。",
   "中国与韩国。续断根晒干使用。",
   "焙根香与轻微苦味。",
   "下午、腰膝酸痛时。",
   "切细才出味，加红枣更柔。"
  ],
  "zh-TW": [
   "續斷茶",
   "把乾續斷煮成的香而微苦的茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克",
   "2泡",
   "90度煮10分鐘，用乾根。",
   "中國與韓國。續斷根曬乾使用。",
   "焙根香與輕微苦味。",
   "下午、腰膝痠痛時。",
   "切細才出味，加紅棗更柔。"
  ]
 },
 {
  "id": "herb-calamus",
  "group": "traditional",
  "kind": "tea",
  "hanja": "菖",
  "sub": "Calamus Tea",
  "alias": [
   "창포",
   "석창포차"
  ],
  "hz": "菖蒲",
  "hs": "菖蒲",
  "rom": "Changpo-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-solo c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "창포차",
   "창포 뿌리줄기를 말려 우린 향이 강하고 쌉쌀한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "85도에서 3분. 말린 뿌리줄기를 씁니다.",
   "한국·중국. 창포 뿌리줄기를 말려 씁니다.",
   "강한 약초 향과 쌉쌀한 끝맛.",
   "단오, 식후.",
   "창포는 향이 강해 3g이면 충분하고, 생으로는 쓰지 않습니다."
  ],
  "en": [
   "Calamus Tea",
   "Dried calamus rhizome — strongly aromatic and bitter.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "85 °C for 3 minutes; use the dried rhizome.",
   "Korea and China. The rhizome is dried.",
   "Strong herbal aroma, a bitter finish.",
   "Dano, after meals.",
   "Very aromatic: 3 g is enough, and it is not used raw."
  ],
  "zh-CN": [
   "菖蒲茶",
   "把干菖蒲根茎泡出的浓香微苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "85度泡3分钟，用干根茎。",
   "韩国与中国。菖蒲根茎晒干使用。",
   "浓烈药草香与微苦收口。",
   "端午、饭后。",
   "香气强，3克就够，不用生品。"
  ],
  "zh-TW": [
   "菖蒲茶",
   "把乾菖蒲根莖泡出的濃香微苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "85度泡3分鐘，用乾根莖。",
   "韓國與中國。菖蒲根莖曬乾使用。",
   "濃烈藥草香與微苦收口。",
   "端午、飯後。",
   "香氣強，3公克就夠，不用生品。"
  ]
 },
 {
  "id": "herb-wasong",
  "group": "traditional",
  "kind": "tea",
  "hanja": "瓦",
  "sub": "Orostachys Tea",
  "alias": [
   "와송",
   "바위솔차"
  ],
  "hz": "瓦松",
  "hs": "瓦松",
  "rom": "Wasong-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-solo c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "와송차",
   "바위솔(와송)을 말려 우린 서늘하고 살짝 쓴 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "85도에서 3분. 말린 잎을 씁니다.",
   "한국·중국. 바위솔을 말려 씁니다.",
   "풀 향과 옅은 쓴맛, 서늘한 끝맛.",
   "여름, 식후.",
   "와송은 3분이면 충분하고, 차게 마시면 더 개운합니다."
  ],
  "en": [
   "Orostachys Tea",
   "Dried orostachys — cooling, green and slightly bitter.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "85 °C for 3 minutes; use the dried leaf.",
   "Korea and China. Orostachys is dried.",
   "Green herb, light bitterness, a cooling finish.",
   "Summer, after meals.",
   "Three minutes is enough; it is more refreshing chilled."
  ],
  "zh-CN": [
   "瓦松茶",
   "把干瓦松泡出的清凉微苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "85度泡3分钟，用干叶。",
   "韩国与中国。瓦松晒干使用。",
   "青草香与微苦，收口凉。",
   "夏天、饭后。",
   "三分钟就够，放凉更清爽。"
  ],
  "zh-TW": [
   "瓦松茶",
   "把乾瓦松泡出的清涼微苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "85度泡3分鐘，用乾葉。",
   "韓國與中國。瓦松曬乾使用。",
   "青草香與微苦，收口涼。",
   "夏天、飯後。",
   "三分鐘就夠，放涼更清爽。"
  ]
 },
 {
  "id": "herb-magnolia-bark",
  "group": "traditional",
  "kind": "tea",
  "hanja": "厚",
  "sub": "Magnolia Bark Tea",
  "alias": [
   "후박",
   "후박차"
  ],
  "hz": "厚朴",
  "hs": "厚朴",
  "rom": "Hubak-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "후박차",
   "후박나무 껍질을 말려 끓인 쌉쌀하고 향이 강한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "90도에서 7분. 껍질을 잘게 썰어 씁니다.",
   "중국·한국. 후박 껍질을 말려 씁니다.",
   "강한 나무 향과 쌉쌀한 맛, 옅은 단맛.",
   "식후, 속이 더부룩할 때.",
   "후박은 향이 강해 3g이면 충분하고, 오래 끓이면 쓴맛이 강해집니다."
  ],
  "en": [
   "Magnolia Bark Tea",
   "Dried magnolia bark — strongly aromatic and bitter.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; slice the bark fine.",
   "China and Korea. The bark is dried.",
   "Strong wood aroma, bitterness, a light sweetness.",
   "After meals, when bloated.",
   "Very aromatic: 3 g is enough; a long boil turns it harsh."
  ],
  "zh-CN": [
   "厚朴茶",
   "把干厚朴皮煮成的浓香微苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "90度煮7分钟，树皮切细。",
   "中国与韩国。厚朴皮晒干使用。",
   "浓烈木香与苦味，带淡甜。",
   "饭后、腹胀时。",
   "香气强，3克就够，煮久会苦。"
  ],
  "zh-TW": [
   "厚朴茶",
   "把乾厚朴皮煮成的濃香微苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "90度煮7分鐘，樹皮切細。",
   "中國與韓國。厚朴皮曬乾使用。",
   "濃烈木香與苦味，帶淡甜。",
   "飯後、腹脹時。",
   "香氣強，3公克就夠，煮久會苦。"
  ]
 },
 {
  "id": "herb-costus",
  "group": "traditional",
  "kind": "tea",
  "hanja": "木",
  "sub": "Costus Tea",
  "alias": [
   "목향",
   "목향차"
  ],
  "hz": "木香",
  "hs": "木香",
  "rom": "Mokhyang-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "목향차",
   "목향 뿌리를 말려 끓인 향이 강하고 쌉쌀한 차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "90도에서 5분. 말린 뿌리를 씁니다.",
   "중국·인도. 목향 뿌리를 말려 씁니다.",
   "강한 약재 향과 쌉쌀한 맛.",
   "식후, 속이 답답할 때.",
   "목향은 향이 매우 강해 2g이면 충분합니다."
  ],
  "en": [
   "Costus Tea",
   "Dried costus root — intensely aromatic and bitter.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "90 °C for 5 minutes; use the dried root.",
   "China and India. The root is dried.",
   "Intense herbal aroma, bitterness.",
   "After meals, when the stomach feels tight.",
   "Extremely aromatic: 2 g is plenty."
  ],
  "zh-CN": [
   "木香茶",
   "把干木香煮成的浓香微苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "90度煮5分钟，用干根。",
   "中国与印度。木香根晒干使用。",
   "浓烈药香与苦味。",
   "饭后、胃部闷胀时。",
   "香气极强，2克就够。"
  ],
  "zh-TW": [
   "木香茶",
   "把乾木香煮成的濃香微苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "90度煮5分鐘，用乾根。",
   "中國與印度。木香根曬乾使用。",
   "濃烈藥香與苦味。",
   "飯後、胃部悶脹時。",
   "香氣極強，2公克就夠。"
  ]
 },
 {
  "id": "herb-cuscuta",
  "group": "traditional",
  "kind": "tea",
  "hanja": "菟",
  "sub": "Dodder Tea",
  "alias": [
   "새삼",
   "토사자차"
  ],
  "hz": "菟絲子",
  "hs": "菟丝子",
  "rom": "Saesam-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "새삼차",
   "새삼 씨를 볶아 끓인 구수하고 살짝 단 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 7분. 볶은 씨를 씁니다.",
   "한국·중국. 새삼 씨를 볶아 씁니다.",
   "볶은 씨의 고소함과 옅은 단맛.",
   "오후, 기운이 없을 때.",
   "새삼 씨는 볶아야 고소하고, 갈아 넣으면 더 진합니다."
  ],
  "en": [
   "Dodder Tea",
   "Roasted dodder seeds — nutty, faintly sweet and warming.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; use roasted seeds.",
   "Korea and China. Dodder seeds are roasted.",
   "Roasted seed, light sweetness.",
   "Afternoon, when low.",
   "Roast the seeds; grinding them makes a deeper cup."
  ],
  "zh-CN": [
   "菟丝子茶",
   "把炒菟丝子煮成的香而微甜的茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮7分钟，用炒过的种子。",
   "韩国与中国。菟丝子炒制后使用。",
   "焙籽的香与淡甜。",
   "下午、疲倦时。",
   "炒过才香，磨碎更浓。"
  ],
  "zh-TW": [
   "菟絲子茶",
   "把炒菟絲子煮成的香而微甜的茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮7分鐘，用炒過的種子。",
   "韓國與中國。菟絲子炒製後使用。",
   "焙籽的香與淡甜。",
   "下午、疲倦時。",
   "炒過才香，磨碎更濃。"
  ]
 },
 {
  "id": "herb-raisintree",
  "group": "traditional",
  "kind": "tea",
  "hanja": "鹼",
  "sub": "Suaeda Tea",
  "alias": [
   "수유",
   "나문재차"
  ],
  "hz": "鹼蓬",
  "hs": "碱蓬",
  "rom": "Suyu-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "5g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "수유차",
   "바닷가 나문재(수유)를 말려 끓인 짭짤하고 구수한 차.",
   "무산화 · 카페인 없음",
   "400ml에 5g",
   "2회",
   "95도에서 10분. 말린 잎을 씁니다.",
   "한국 서해안. 염생식물 나문재를 말려 씁니다.",
   "짭짤한 풀 향과 옅은 단맛, 미네랄 같은 여운.",
   "식후, 여름.",
   "수유는 소금기가 있어 5g이면 충분하고, 다른 차에 섞어도 좋습니다."
  ],
  "en": [
   "Suaeda Tea",
   "Dried sea-blite from the tidal flats — savoury, lightly salty and green.",
   "None · caffeine-free",
   "5 g to 400 ml",
   "2 infusions",
   "95 °C for 10 minutes; use the dried leaf.",
   "Korea's west coast. The salt-marsh plant suaeda is dried.",
   "Salty green herb, light sweetness, a mineral finish.",
   "After meals, summer.",
   "It carries salt: 5 g is plenty, and it blends well with other teas."
  ],
  "zh-CN": [
   "碱蓬茶",
   "把海边碱蓬晒干煮成的微咸香茶。",
   "不发酵 · 无咖啡因",
   "400毫升配5克",
   "2泡",
   "95度煮10分钟，用干叶。",
   "韩国西海岸。盐生植物碱蓬晒干使用。",
   "微咸青草香与淡甜，带矿物感。",
   "饭后、夏天。",
   "本身带盐分，5克就够，也可拼配。"
  ],
  "zh-TW": [
   "鹼蓬茶",
   "把海邊鹼蓬曬乾煮成的微鹹香茶。",
   "不發酵 · 無咖啡因",
   "400毫升配5公克",
   "2泡",
   "95度煮10分鐘，用乾葉。",
   "韓國西海岸。鹽生植物鹼蓬曬乾使用。",
   "微鹹青草香與淡甜，帶礦物感。",
   "飯後、夏天。",
   "本身帶鹽分，5公克就夠，也可拼配。"
  ]
 },
 {
  "id": "herb-mallow",
  "group": "traditional",
  "kind": "tea",
  "hanja": "冬",
  "sub": "Mallow Tea",
  "alias": [
   "아욱",
   "동규자차"
  ],
  "hz": "冬葵",
  "hs": "冬葵",
  "rom": "Ayuk-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "아욱차",
   "아욱 잎을 말려 끓인 부드럽고 살짝 미끈한 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 4분. 말린 잎을 씁니다.",
   "한국·중국. 아욱 잎을 말려 씁니다.",
   "부드러운 풀 향과 옅은 단맛, 가벼운 미끈함.",
   "식후, 속이 불편할 때.",
   "아욱은 4분이면 충분하고, 오래 우리면 미끈함이 강해집니다."
  ],
  "en": [
   "Mallow Tea",
   "Dried mallow leaf — soft, green and slightly silky.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 4 minutes; use the dried leaf.",
   "Korea and China. Mallow leaves are dried.",
   "Soft green herb, light sweetness, a silky body.",
   "After meals, when the stomach is uneasy.",
   "Four minutes is enough; longer makes it very slippery."
  ],
  "zh-CN": [
   "冬葵茶",
   "把干冬葵叶煮成的柔滑微甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮4分钟，用干叶。",
   "韩国与中国。冬葵叶晒干使用。",
   "柔和青草香与淡甜，口感滑。",
   "饭后、肠胃不适时。",
   "四分钟就够，泡久会太滑。"
  ],
  "zh-TW": [
   "冬葵茶",
   "把乾冬葵葉煮成的柔滑微甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮4分鐘，用乾葉。",
   "韓國與中國。冬葵葉曬乾使用。",
   "柔和青草香與淡甜，口感滑。",
   "飯後、腸胃不適時。",
   "四分鐘就夠，泡久會太滑。"
  ]
 },
 {
  "id": "herb-radishleaf",
  "group": "traditional",
  "kind": "tea",
  "hanja": "蘿",
  "sub": "Radish Leaf Tea",
  "alias": [
   "무잎",
   "무청차"
  ],
  "hz": "蘿蔔葉",
  "hs": "萝卜叶",
  "rom": "Muip-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "무잎차",
   "무청을 말려 끓인 구수하고 살짝 쓴 차.",
   "무산화 · 카페인 없음",
   "400ml에 5g",
   "2회",
   "95도에서 5분. 말린 무청을 씁니다.",
   "한국. 무청을 말려 씁니다.",
   "구수한 채소 향과 옅은 쓴맛.",
   "식후, 겨울.",
   "무청은 잘 말려야 하고, 볶으면 구수함이 살아납니다."
  ],
  "en": [
   "Radish Leaf Tea",
   "Dried radish greens — savoury, green and faintly bitter.",
   "None · caffeine-free",
   "5 g to 400 ml",
   "2 infusions",
   "95 °C for 5 minutes; use dried leaves.",
   "Korea. Radish greens are dried.",
   "Savoury green, a light bitterness.",
   "After meals, winter.",
   "Dry them well; roasting brings out a nutty note."
  ],
  "zh-CN": [
   "萝卜叶茶",
   "把干萝卜缨煮成的香而微苦的茶。",
   "不发酵 · 无咖啡因",
   "400毫升配5克",
   "2泡",
   "95度煮5分钟，用干叶。",
   "韩国。萝卜缨晒干使用。",
   "焙菜香与轻微苦味。",
   "饭后、冬天。",
   "要晒透，炒过更香。"
  ],
  "zh-TW": [
   "蘿蔔葉茶",
   "把乾蘿蔔纓煮成的香而微苦的茶。",
   "不發酵 · 無咖啡因",
   "400毫升配5公克",
   "2泡",
   "95度煮5分鐘，用乾葉。",
   "韓國。蘿蔔纓曬乾使用。",
   "焙菜香與輕微苦味。",
   "飯後、冬天。",
   "要曬透，炒過更香。"
  ]
 },
 {
  "id": "herb-eggplant",
  "group": "traditional",
  "kind": "tea",
  "hanja": "茄",
  "sub": "Eggplant Tea",
  "alias": [
   "가지",
   "가지말린차"
  ],
  "hz": "茄子",
  "hs": "茄子",
  "rom": "Gaji-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "가지차",
   "말린 가지를 볶아 끓인 구수하고 살짝 단 차.",
   "무산화 · 카페인 없음",
   "400ml에 5g",
   "2회",
   "95도에서 7분. 말린 가지를 씁니다.",
   "한국. 가지를 말려 볶습니다.",
   "볶은 채소의 구수함과 옅은 단맛.",
   "식후, 겨울.",
   "가지는 잘 말려 볶아야 하고, 기름에 볶으면 향이 더 좋습니다."
  ],
  "en": [
   "Eggplant Tea",
   "Dried eggplant, roasted and simmered — savoury with a light sweetness.",
   "None · caffeine-free",
   "5 g to 400 ml",
   "2 infusions",
   "95 °C for 7 minutes; use dried eggplant.",
   "Korea. Eggplant is dried and roasted.",
   "Roasted vegetable, light sweetness.",
   "After meals, winter.",
   "Dry it well before roasting; a little oil deepens the aroma."
  ],
  "zh-CN": [
   "茄子茶",
   "把晒干的茄子炒过再煮的香茶。",
   "不发酵 · 无咖啡因",
   "400毫升配5克",
   "2泡",
   "95度煮7分钟，用干茄子。",
   "韩国。茄子晒干后炒制。",
   "焙菜的香与淡甜。",
   "饭后、冬天。",
   "要晒透再炒，用少许油炒更香。"
  ],
  "zh-TW": [
   "茄子茶",
   "把曬乾的茄子炒過再煮的香茶。",
   "不發酵 · 無咖啡因",
   "400毫升配5公克",
   "2泡",
   "95度煮7分鐘，用乾茄子。",
   "韓國。茄子曬乾後炒製。",
   "焙菜的香與淡甜。",
   "飯後、冬天。",
   "要曬透再炒，用少許油炒更香。"
  ]
 },
 {
  "id": "herb-green-onion",
  "group": "traditional",
  "kind": "tea",
  "hanja": "蔥",
  "sub": "Scallion Tea",
  "alias": [
   "대파",
   "파뿌리차"
  ],
  "hz": "蔥白",
  "hs": "葱白",
  "rom": "Daepa-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "대파차",
   "대파 뿌리와 흰 줄기를 끓인 알싸하고 따뜻한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "1회",
   "95도에서 5분. 흰 줄기를 씁니다.",
   "한국. 대파 흰 부분을 말려 씁니다.",
   "알싸한 파 향과 옅은 단맛.",
   "감기 기운이 있을 때, 저녁.",
   "대파차는 감기 기운이 있을 때 한 번 마시는 민간차입니다. 많이 마시면 속이 쓰릴 수 있습니다."
  ],
  "en": [
   "Scallion Tea",
   "Dried scallion white simmered into a pungent, warming cup.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "One brew",
   "95 °C for 5 minutes; use the white part.",
   "Korea. The white of scallion is dried.",
   "Pungent scallion, faint sweetness.",
   "When a cold is coming on, evening.",
   "A folk cup for the first sign of a cold; too much can upset the stomach."
  ],
  "zh-CN": [
   "葱白茶",
   "把干葱白煮出的辛香暖茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "1次",
   "95度煮5分钟，用葱白。",
   "韩国。葱白晒干使用。",
   "辛香葱味与淡甜。",
   "有感冒征兆时、晚上。",
   "这是感冒初起时喝的民间茶，喝多可能伤胃。"
  ],
  "zh-TW": [
   "蔥白茶",
   "把乾蔥白煮出的辛香暖茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "1次",
   "95度煮5分鐘，用蔥白。",
   "韓國。蔥白曬乾使用。",
   "辛香蔥味與淡甜。",
   "有感冒徵兆時、晚上。",
   "這是感冒初起時喝的民間茶，喝多可能傷胃。"
  ]
 },
 {
  "id": "herb-garlic",
  "group": "traditional",
  "kind": "tea",
  "hanja": "大",
  "sub": "Garlic Tea",
  "alias": [
   "마늘",
   "대산차"
  ],
  "hz": "大蒜",
  "hs": "大蒜",
  "rom": "Maneul-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-crisp r-smoke s-hot w-quick p-solo c-high m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "마늘차",
   "마늘을 얇게 썰어 끓인 톡 쏘고 따뜻한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "1회",
   "95도에서 5분. 꿀을 더하면 부드럽습니다.",
   "한국·중국. 마늘을 썰어 말려 씁니다.",
   "톡 쏘는 마늘 향과 단맛, 따뜻한 여운.",
   "감기 기운이 있을 때, 저녁.",
   "마늘차는 향이 강해 한 번에 3g 이하로 끓이고, 공복에는 피하세요."
  ],
  "en": [
   "Garlic Tea",
   "Thin-sliced garlic simmered into a pungent, warming cup.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "One brew",
   "95 °C for 5 minutes; honey softens it.",
   "Korea and China. Garlic is sliced and dried.",
   "Sharp garlic, sweetness, a warm finish.",
   "When a cold is coming on, evening.",
   "Very pungent: keep to 3 g and avoid it on an empty stomach."
  ],
  "zh-CN": [
   "大蒜茶",
   "把蒜片煮出的辛香暖茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "1次",
   "95度煮5分钟，加蜂蜜更柔。",
   "韩国与中国。大蒜切片晒干。",
   "辛香蒜味与甜，尾韵暖。",
   "有感冒征兆时、晚上。",
   "气味强，一次不超过3克，空腹别喝。"
  ],
  "zh-TW": [
   "大蒜茶",
   "把蒜片煮出的辛香暖茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "1次",
   "95度煮5分鐘，加蜂蜜更柔。",
   "韓國與中國。大蒜切片曬乾。",
   "辛香蒜味與甜，尾韻暖。",
   "有感冒徵兆時、晚上。",
   "氣味強，一次不超過3公克，空腹別喝。"
  ]
 },
 {
  "id": "herb-taro",
  "group": "traditional",
  "kind": "tea",
  "hanja": "芋",
  "sub": "Taro Stem Tea",
  "alias": [
   "토란",
   "토란대차"
  ],
  "hz": "芋梗",
  "hs": "芋梗",
  "rom": "Toran-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "토란차",
   "말린 토란대를 끓인 담백하고 살짝 미끈한 차.",
   "무산화 · 카페인 없음",
   "300ml에 5g",
   "1회",
   "95도에서 7분. 말린 줄기를 씁니다.",
   "한국. 토란대를 말려 씁니다.",
   "담백한 채소 향과 옅은 단맛.",
   "식후, 속이 불편할 때.",
   "토란대는 잘 말려야 하고, 생것은 쓰지 않습니다."
  ],
  "en": [
   "Taro Stem Tea",
   "Dried taro stem — plain, green and gently silky.",
   "None · caffeine-free",
   "5 g to 300 ml",
   "One brew",
   "95 °C for 7 minutes; use dried stems.",
   "Korea. Taro stems are dried.",
   "Plain green, light sweetness.",
   "After meals, when the stomach is uneasy.",
   "Dry it thoroughly; the raw stem is not used."
  ],
  "zh-CN": [
   "芋梗茶",
   "把干芋梗煮成的清淡微甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克",
   "1次",
   "95度煮7分钟，用干茎。",
   "韩国。芋梗晒干使用。",
   "清淡菜香与淡甜。",
   "饭后、肠胃不适时。",
   "要晒透，不用生品。"
  ],
  "zh-TW": [
   "芋梗茶",
   "把乾芋梗煮成的清淡微甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克",
   "1次",
   "95度煮7分鐘，用乾莖。",
   "韓國。芋梗曬乾使用。",
   "清淡菜香與淡甜。",
   "飯後、腸胃不適時。",
   "要曬透，不用生品。"
  ]
 },
 {
  "id": "herb-waxgourd",
  "group": "traditional",
  "kind": "tea",
  "hanja": "冬",
  "sub": "Wax Gourd Tea",
  "alias": [
   "동아",
   "동과차"
  ],
  "hz": "冬瓜",
  "hs": "冬瓜",
  "rom": "Donga-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "10g",
  "water": "500ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "동아차",
   "큰 동아를 말려 끓인 맑고 서늘한 차.",
   "무산화 · 카페인 없음",
   "500ml에 10g",
   "2회",
   "95도에서 15분. 말린 동아를 씁니다.",
   "중국·한국. 동아를 말려 씁니다.",
   "맑은 채소 향과 옅은 단맛, 서늘한 끝맛.",
   "더운 날, 식후, 차게.",
   "동아는 잘 말려야 하고, 차게 마시면 더 시원합니다."
  ],
  "en": [
   "Wax Gourd Tea",
   "Dried wax gourd simmered into a clear, cooling cup.",
   "None · caffeine-free",
   "10 g to 500 ml",
   "2 infusions",
   "95 °C for 15 minutes; use dried gourd.",
   "China and Korea. Wax gourd is dried.",
   "Clean vegetable, light sweetness, a cool finish.",
   "Hot days, after meals, chilled.",
   "Dry it well; it is most refreshing cold."
  ],
  "zh-CN": [
   "冬瓜茶",
   "把干冬瓜煮成的清爽茶。",
   "不发酵 · 无咖啡因",
   "500毫升配10克",
   "2泡",
   "95度煮15分钟，用干冬瓜。",
   "中国与韩国。冬瓜晒干使用。",
   "清爽菜香与淡甜，收口凉。",
   "炎热的日子、饭后、放凉。",
   "要晒透，放凉喝更清爽。"
  ],
  "zh-TW": [
   "冬瓜茶",
   "把乾冬瓜煮成的清爽茶。",
   "不發酵 · 無咖啡因",
   "500毫升配10公克",
   "2泡",
   "95度煮15分鐘，用乾冬瓜。",
   "中國與韓國。冬瓜曬乾使用。",
   "清爽菜香與淡甜，收口涼。",
   "炎熱的日子、飯後、放涼。",
   "要曬透，放涼喝更清爽。"
  ]
 },
 {
  "id": "herb-watercaltrop",
  "group": "traditional",
  "kind": "tea",
  "hanja": "菱",
  "sub": "Water Caltrop Tea",
  "alias": [
   "마름",
   "능각차"
  ],
  "hz": "菱角",
  "hs": "菱角",
  "rom": "Mareum-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "10g",
  "water": "500ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "마름차",
   "말린 마름 열매를 끓인 고소하고 밤 같은 단맛의 차.",
   "무산화 · 카페인 없음",
   "500ml에 10g",
   "2회",
   "95도에서 20분. 말린 열매를 씁니다.",
   "중국·한국. 마름 열매를 말려 씁니다.",
   "고소한 견과 향과 밤 같은 단맛.",
   "가을, 식후.",
   "마름은 단단해 오래 끓여야 하고, 반으로 갈라 넣으면 빨리 우러납니다."
  ],
  "en": [
   "Water Caltrop Tea",
   "Dried water caltrop simmered into a nutty, chestnut-sweet cup.",
   "None · caffeine-free",
   "10 g to 500 ml",
   "2 infusions",
   "95 °C for 20 minutes; crack the dried nuts.",
   "China and Korea. Water caltrop is dried.",
   "Nutty aroma, chestnut-like sweetness.",
   "Autumn, after meals.",
   "They are hard: simmer long, or crack them first."
  ],
  "zh-CN": [
   "菱角茶",
   "把干菱角煮成的香而带栗子甜的茶。",
   "不发酵 · 无咖啡因",
   "500毫升配10克",
   "2泡",
   "95度煮20分钟，干菱角敲开。",
   "中国与韩国。菱角晒干使用。",
   "焙坚果香与栗子般的甜。",
   "秋天、饭后。",
   "菱角硬，要久煮，敲开更快出味。"
  ],
  "zh-TW": [
   "菱角茶",
   "把乾菱角煮成的香而帶栗子甜的茶。",
   "不發酵 · 無咖啡因",
   "500毫升配10公克",
   "2泡",
   "95度煮20分鐘，乾菱角敲開。",
   "中國與韓國。菱角曬乾使用。",
   "焙堅果香與栗子般的甜。",
   "秋天、飯後。",
   "菱角硬，要久煮，敲開更快出味。"
  ]
 },
 {
  "id": "trad-sunchae",
  "group": "traditional",
  "kind": "tea",
  "hanja": "蓴",
  "sub": "Water Shield Tea",
  "alias": [
   "순채",
   "순채차"
  ],
  "hz": "蓴菜",
  "hs": "莼菜",
  "rom": "Sunchae-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "순채차",
   "순채 잎을 말려 우린 담백하고 살짝 미끈한 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "85도에서 3분. 말린 잎을 씁니다.",
   "중국·한국. 순채 잎을 말려 씁니다.",
   "담백한 수초 향과 옅은 단맛, 매끈한 질감.",
   "여름, 식후.",
   "순채는 3분이면 충분하고, 오래 우리면 미끈함이 강해집니다."
  ],
  "en": [
   "Water Shield Tea",
   "Dried water shield leaf — plain, green and faintly silky.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "85 °C for 3 minutes; use the dried leaf.",
   "China and Korea. Water shield leaves are dried.",
   "Plain aquatic green, light sweetness, a silky body.",
   "Summer, after meals.",
   "Three minutes is enough; longer gets slippery."
  ],
  "zh-CN": [
   "莼菜茶",
   "把干莼菜叶泡出的清淡微甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "85度泡3分钟，用干叶。",
   "中国与韩国。莼菜叶晒干使用。",
   "清淡水草香与淡甜，口感滑。",
   "夏天、饭后。",
   "三分钟就够，泡久会太滑。"
  ],
  "zh-TW": [
   "蓴菜茶",
   "把乾蓴菜葉泡出的清淡微甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "85度泡3分鐘，用乾葉。",
   "中國與韓國。蓴菜葉曬乾使用。",
   "清淡水草香與淡甜，口感滑。",
   "夏天、飯後。",
   "三分鐘就夠，泡久會太滑。"
  ]
 },
 {
  "id": "herb-maesil",
  "group": "traditional",
  "kind": "tea",
  "hanja": "青",
  "sub": "Green Plum Tea",
  "alias": [
   "매실",
   "청매실차"
  ],
  "hz": "青梅",
  "hs": "青梅",
  "rom": "Maesil-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3큰술",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit b-medium k-sweet k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "매실차",
   "설탕에 절인 매실청을 물에 풀어 마시는 새콤달콤한 차.",
   "무산화 · 카페인 없음",
   "300ml에 매실청 3큰술",
   "1회",
   "찬물이나 미지근한 물에 풀어 마십니다.",
   "한국·일본. 덜 익은 매실을 설탕에 절여 청을 만듭니다.",
   "새콤한 매실 향과 진한 단맛, 깔끔한 끝맛.",
   "식후, 기름진 식사 뒤, 여름.",
   "매실청은 뜨거운 물에 풀면 향이 날아갑니다. 찬물이나 미지근한 물에 푸세요."
  ],
  "en": [
   "Green Plum Tea",
   "Sweet-sour green plum syrup stirred into water.",
   "None · caffeine-free",
   "3 tbsp syrup to 300 ml",
   "One glass",
   "Stir into cold or lukewarm water.",
   "Korea and Japan. Unripe plums are packed in sugar to make a syrup.",
   "Bright sour plum, deep sweetness, a clean finish.",
   "After meals, after rich food, summer.",
   "Hot water drives off the aroma; use cold or lukewarm water."
  ],
  "zh-CN": [
   "青梅茶",
   "把糖渍青梅露兑水喝的酸甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升加青梅露3大勺",
   "1次",
   "用冷水或温水调开。",
   "韩国与日本。青梅加糖腌成糖浆。",
   "清酸梅香与浓甜，收口干净。",
   "饭后、油腻之后、夏天。",
   "热水会冲掉香气，用冷水或温水调。"
  ],
  "zh-TW": [
   "青梅茶",
   "把糖漬青梅露兌水喝的酸甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升加青梅露3大匙",
   "1次",
   "用冷水或溫水調開。",
   "韓國與日本。青梅加糖醃成糖漿。",
   "清酸梅香與濃甜，收口乾淨。",
   "飯後、油膩之後、夏天。",
   "熱水會沖掉香氣，用冷水或溫水調。"
  ]
 },
 {
  "id": "herb-cherry",
  "group": "traditional",
  "kind": "tea",
  "hanja": "櫻",
  "sub": "Cherry Tea",
  "alias": [
   "앵두",
   "앵도차"
  ],
  "hz": "櫻桃",
  "hs": "樱桃",
  "rom": "Aengdu-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "5알",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit b-light k-sweet k-crisp r-clean s-iced w-quick p-dessert c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "앵두차",
   "앵두를 설탕에 절여 우린 붉고 새콤한 차.",
   "무산화 · 카페인 없음",
   "300ml에 앵두 5알",
   "1회",
   "85도에서 3분. 절인 앵두를 으깨 넣습니다.",
   "한국. 앵두를 설탕에 절여 씁니다.",
   "새콤한 앵두 향과 옅은 단맛, 붉은 물색.",
   "여름, 디저트, 차게.",
   "앵두는 씨를 빼고 으깨면 색과 맛이 잘 우러납니다."
  ],
  "en": [
   "Cherry Tea",
   "Sugar-preserved sour cherries steeped into a red, tangy cup.",
   "None · caffeine-free",
   "5 cherries to 300 ml",
   "One brew",
   "85 °C for 3 minutes; crush the preserved fruit.",
   "Korea. Sour cherries are preserved in sugar.",
   "Tangy cherry, light sweetness, a red liquor.",
   "Summer, dessert, chilled.",
   "Stone and crush the fruit so colour and flavour come out."
  ],
  "zh-CN": [
   "樱桃茶",
   "把糖渍樱桃泡出的红色酸甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5颗",
   "1次",
   "85度泡3分钟，把渍樱桃压碎。",
   "韩国。樱桃加糖腌渍。",
   "酸甜樱桃香与淡甜，汤色红。",
   "夏天、甜点、放凉。",
   "去核压碎，颜色和味道更容易出来。"
  ],
  "zh-TW": [
   "櫻桃茶",
   "把糖漬櫻桃泡出的紅色酸甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5顆",
   "1次",
   "85度泡3分鐘，把漬櫻桃壓碎。",
   "韓國。櫻桃加糖醃漬。",
   "酸甜櫻桃香與淡甜，湯色紅。",
   "夏天、甜點、放涼。",
   "去核壓碎，顏色和味道更容易出來。"
  ]
 },
 {
  "id": "herb-plum",
  "group": "traditional",
  "kind": "tea",
  "hanja": "李",
  "sub": "Plum Tea",
  "alias": [
   "자두",
   "자도차"
  ],
  "hz": "李子",
  "hs": "李子",
  "rom": "Jadu-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "5알",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit b-medium k-sweet k-crisp r-clean s-hot s-iced w-quick p-dessert c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "자두차",
   "말린 자두를 끓여 우린 새콤달콤한 차.",
   "무산화 · 카페인 없음",
   "300ml에 말린 자두 5알",
   "2회",
   "90도에서 10분. 말린 자두를 씁니다.",
   "한국·중국. 자두를 말려 씁니다.",
   "새콤한 자두 향과 진한 단맛, 부드러운 질감.",
   "식후, 겨울, 차게.",
   "말린 자두는 오래 끓일수록 단맛이 진해집니다."
  ],
  "en": [
   "Plum Tea",
   "Dried plums simmered into a sweet-sour, softly thick cup.",
   "None · caffeine-free",
   "5 dried plums to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; use dried fruit.",
   "Korea and China. Plums are dried.",
   "Tangy plum, deep sweetness, a soft body.",
   "After meals, winter, chilled.",
   "The longer it simmers, the deeper the sweetness."
  ],
  "zh-CN": [
   "李子茶",
   "把干李子煮成的酸甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5颗",
   "2泡",
   "90度煮10分钟，用干果。",
   "韩国与中国。李子晒干使用。",
   "酸甜李香与浓甜，口感柔。",
   "饭后、冬天、放凉。",
   "煮越久甜味越浓。"
  ],
  "zh-TW": [
   "李子茶",
   "把乾李子煮成的酸甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5顆",
   "2泡",
   "90度煮10分鐘，用乾果。",
   "韓國與中國。李子曬乾使用。",
   "酸甜李香與濃甜，口感柔。",
   "飯後、冬天、放涼。",
   "煮越久甜味越濃。"
  ]
 },
 {
  "id": "herb-pomegranate",
  "group": "traditional",
  "kind": "tea",
  "hanja": "石",
  "sub": "Pomegranate Tea",
  "alias": [
   "석류",
   "석류차"
  ],
  "hz": "石榴",
  "hs": "石榴",
  "rom": "Seokryu-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3큰술",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit b-medium k-sweet k-crisp r-clean s-hot s-iced w-quick p-dessert c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "석류차",
   "석류 즙이나 말린 껍질을 우린 붉고 떫은 차.",
   "무산화 · 카페인 없음",
   "300ml에 석류즙 3큰술",
   "1회",
   "85도에서 3분. 말린 껍질은 10분 끓입니다.",
   "한국·중국. 석류 즙이나 말린 껍질을 씁니다.",
   "새콤한 석류 향과 가벼운 떫음, 붉은 물색.",
   "식후, 가을, 차게.",
   "석류 껍질은 떫으므로 3g 이하로 쓰고, 즙을 쓰면 부드럽습니다."
  ],
  "en": [
   "Pomegranate Tea",
   "Pomegranate juice or dried peel — red, tangy and lightly astringent.",
   "None · caffeine-free",
   "3 tbsp juice to 300 ml",
   "One glass",
   "85 °C for 3 minutes; dried peel needs 10 minutes.",
   "Korea and China. Juice or dried peel is used.",
   "Tangy pomegranate, a light astringency, a red liquor.",
   "After meals, autumn, chilled.",
   "Peel is astringent: keep to 3 g, or use juice for a softer cup."
  ],
  "zh-CN": [
   "石榴茶",
   "用石榴汁或干石榴皮泡出的红色微涩茶。",
   "不发酵 · 无咖啡因",
   "300毫升加石榴汁3大勺",
   "1次",
   "85度泡3分钟，干皮要煮10分钟。",
   "韩国与中国。用果汁或干皮。",
   "酸甜石榴香与轻微涩味，汤色红。",
   "饭后、秋天、放凉。",
   "石榴皮涩，别超过3克；用果汁更柔。"
  ],
  "zh-TW": [
   "石榴茶",
   "用石榴汁或乾石榴皮泡出的紅色微澀茶。",
   "不發酵 · 無咖啡因",
   "300毫升加石榴汁3大匙",
   "1次",
   "85度泡3分鐘，乾皮要煮10分鐘。",
   "韓國與中國。用果汁或乾皮。",
   "酸甜石榴香與輕微澀味，湯色紅。",
   "飯後、秋天、放涼。",
   "石榴皮澀，別超過3公克；用果汁更柔。"
  ]
 },
 {
  "id": "herb-loquat",
  "group": "traditional",
  "kind": "tea",
  "hanja": "枇",
  "sub": "Loquat Tea",
  "alias": [
   "비파",
   "비파엽차"
  ],
  "hz": "枇杷",
  "hs": "枇杷",
  "rom": "Bipa-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit a-floral b-light k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "비파차",
   "비파 잎이나 말린 열매를 끓인 향긋하고 살짝 단 차.",
   "무산화 · 카페인 없음",
   "300ml에 5g",
   "2회",
   "85도에서 5분. 말린 잎을 씁니다.",
   "한국·중국. 비파 잎과 열매를 말려 씁니다.",
   "살구를 닮은 과일 향과 옅은 단맛, 가벼운 쌉쌀함.",
   "목이 칼칼할 때, 가을.",
   "비파 잎은 솜털을 긁어내고 말려야 목에 부드럽습니다."
  ],
  "en": [
   "Loquat Tea",
   "Dried loquat leaf or fruit — fruity, sweet and gently bitter.",
   "None · caffeine-free",
   "5 g to 300 ml",
   "2 infusions",
   "85 °C for 5 minutes; use dried leaves.",
   "Korea and China. Loquat leaf and fruit are dried.",
   "Apricot-like fruit, light sweetness, a soft bitterness.",
   "When the throat is raw, autumn.",
   "Scrape the fuzz off the leaves before drying."
  ],
  "zh-CN": [
   "枇杷茶",
   "把干枇杷叶或果实煮出的果香微甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配5克",
   "2泡",
   "85度煮5分钟，用干叶。",
   "韩国与中国。枇杷叶与果实晒干使用。",
   "似杏的果香与淡甜，轻微苦。",
   "喉咙不适时、秋天。",
   "叶背绒毛要刷掉再晒，喉咙才舒服。"
  ],
  "zh-TW": [
   "枇杷茶",
   "把乾枇杷葉或果實煮出的果香微甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配5公克",
   "2泡",
   "85度煮5分鐘，用乾葉。",
   "韓國與中國。枇杷葉與果實曬乾使用。",
   "似杏的果香與淡甜，輕微苦。",
   "喉嚨不適時、秋天。",
   "葉背絨毛要刷掉再曬，喉嚨才舒服。"
  ]
 },
 {
  "id": "fruit-dolbae",
  "group": "traditional",
  "kind": "tea",
  "hanja": "野",
  "sub": "Wild Pear Tea",
  "alias": [
   "돌배",
   "산돌배차"
  ],
  "hz": "野梨",
  "hs": "野梨",
  "rom": "Dolbae-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5쪽",
  "water": "400ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit a-roast b-light k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "돌배차",
   "말린 돌배를 끓인 달콤하고 부드러운 차.",
   "무산화 · 카페인 없음",
   "400ml에 5쪽",
   "2회",
   "90도에서 15분. 말린 돌배를 씁니다.",
   "한국. 돌배를 썰어 말려 씁니다.",
   "배의 달콤함과 옅은 떫음, 부드러운 질감.",
   "기침이 잦을 때, 가을, 겨울.",
   "돌배는 말려야 단맛이 진해지고, 대추를 더하면 더 부드럽습니다."
  ],
  "en": [
   "Wild Pear Tea",
   "Dried wild pear simmered into a soft, sweet cup.",
   "None · caffeine-free",
   "5 slices to 400 ml",
   "2 infusions",
   "90 °C for 15 minutes; use dried pear.",
   "Korea. Wild pears are sliced and dried.",
   "Pear sweetness, a faint astringency, a soft body.",
   "Cough season, autumn, winter.",
   "Drying deepens the sweetness; a jujube makes it softer."
  ],
  "zh-CN": [
   "野梨茶",
   "把干野梨煮成的柔甜茶。",
   "不发酵 · 无咖啡因",
   "400毫升配5片",
   "2泡",
   "90度煮15分钟，用干梨。",
   "韩国。野梨切片晒干。",
   "梨的甜与轻微涩，口感柔。",
   "常咳时、秋天、冬天。",
   "晒干甜味更浓，加红枣更柔。"
  ],
  "zh-TW": [
   "野梨茶",
   "把乾野梨煮成的柔甜茶。",
   "不發酵 · 無咖啡因",
   "400毫升配5片",
   "2泡",
   "90度煮15分鐘，用乾梨。",
   "韓國。野梨切片曬乾。",
   "梨的甜與輕微澀，口感柔。",
   "常咳時、秋天、冬天。",
   "曬乾甜味更濃，加紅棗更柔。"
  ]
 },
 {
  "id": "herb-trifoliateorange",
  "group": "traditional",
  "kind": "tea",
  "hanja": "枳",
  "sub": "Trifoliate Orange Tea",
  "alias": [
   "탱자",
   "지실차"
  ],
  "hz": "枳",
  "hs": "枳",
  "rom": "Taengja-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit a-roast b-medium k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "탱자차",
   "말린 탱자를 끓인 새콤하고 쌉쌀한 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "90도에서 7분. 말린 열매를 씁니다.",
   "한국·중국. 탱자 열매를 말려 씁니다.",
   "새콤한 귤 껍질 향과 쌉쌀한 맛.",
   "식후, 속이 더부룩할 때.",
   "탱자는 씨를 빼고 말려야 하고, 꿀을 더하면 부드럽습니다."
  ],
  "en": [
   "Trifoliate Orange Tea",
   "Dried trifoliate orange — tart, bitter and citrusy.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "90 °C for 7 minutes; use dried fruit.",
   "Korea and China. The fruit is dried.",
   "Tart citrus peel, a bitter edge.",
   "After meals, when bloated.",
   "Remove the seeds before drying; honey softens it."
  ],
  "zh-CN": [
   "枳茶",
   "把干枳实煮成的酸苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "90度煮7分钟，用干果。",
   "韩国与中国。枳实晒干使用。",
   "酸橘皮香与苦味。",
   "饭后、腹胀时。",
   "去籽再晒，加蜂蜜更柔。"
  ],
  "zh-TW": [
   "枳茶",
   "把乾枳實煮成的酸苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "90度煮7分鐘，用乾果。",
   "韓國與中國。枳實曬乾使用。",
   "酸橘皮香與苦味。",
   "飯後、腹脹時。",
   "去籽再曬，加蜂蜜更柔。"
  ]
 },
 {
  "id": "herb-hallabong",
  "group": "traditional",
  "kind": "tea",
  "hanja": "漢",
  "sub": "Hallabong Tea",
  "alias": [
   "한라봉",
   "한라봉차"
  ],
  "hz": "漢拿峰",
  "hs": "汉拿峰",
  "rom": "Hallabong-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3큰술",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit b-light k-sweet k-crisp r-clean s-hot s-iced w-quick p-dessert c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "한라봉차",
   "한라봉 껍질을 설탕에 절여 만든 청을 물에 푼 향긋한 차.",
   "무산화 · 카페인 없음",
   "300ml에 청 3큰술",
   "1회",
   "미지근한 물에 풀어 마십니다.",
   "한국 제주. 한라봉 껍질과 과육을 설탕에 절입니다.",
   "한라봉의 맑은 산뜻함과 꿀 같은 단맛.",
   "아침, 디저트, 차게.",
   "껍질을 얇게 저며 절이면 향이 살고 쓴맛이 줄어듭니다."
  ],
  "en": [
   "Hallabong Tea",
   "A Hallabong citrus preserve stirred into water — bright and honeyed.",
   "None · caffeine-free",
   "3 tbsp preserve to 300 ml",
   "One glass",
   "Stir into lukewarm water.",
   "Jeju, Korea. Hallabong peel and flesh are preserved in sugar.",
   "Bright Hallabong citrus with honeyed sweetness.",
   "Morning, dessert, chilled.",
   "Slice the peel thin when preserving: more aroma, less bitterness."
  ],
  "zh-CN": [
   "汉拿峰茶",
   "把汉拿峰柑橘糖渍兑水喝的清香茶。",
   "不发酵 · 无咖啡因",
   "300毫升加糖渍3大勺",
   "1次",
   "用温水调开。",
   "韩国济州。汉拿峰果皮果肉加糖腌渍。",
   "汉拿峰的清爽柑橘香与蜜甜。",
   "早晨、甜点、放凉。",
   "果皮切薄再腌，香气足、苦味少。"
  ],
  "zh-TW": [
   "漢拿峰茶",
   "把漢拿峰柑橘糖漬兌水喝的清香茶。",
   "不發酵 · 無咖啡因",
   "300毫升加糖漬3大匙",
   "1次",
   "用溫水調開。",
   "韓國濟州。漢拿峰果皮果肉加糖醃漬。",
   "漢拿峰的清爽柑橘香與蜜甜。",
   "早晨、甜點、放涼。",
   "果皮切薄再醃，香氣足、苦味少。"
  ]
 },
 {
  "id": "herb-grapefruit",
  "group": "traditional",
  "kind": "tea",
  "hanja": "西",
  "sub": "Grapefruit Tea",
  "alias": [
   "자몽",
   "그레이프프루트차"
  ],
  "hz": "西柚",
  "hs": "西柚",
  "rom": "Jamong-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3큰술",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-fruit b-light k-crisp k-sweet r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "미국",
   "en": "United States",
   "zh-CN": "美国",
   "zh-TW": "美國"
  },
  "originCountryCode": "us",
  "ko": [
   "자몽차",
   "자몽 껍질과 과육을 절인 청을 물에 푼 쌉싸름한 차.",
   "무산화 · 카페인 없음",
   "300ml에 청 3큰술",
   "1회",
   "미지근한 물에 풀어 마십니다.",
   "미국·카리브. 자몽을 설탕에 절여 청을 만듭니다.",
   "자몽의 쌉싸름함과 단맛, 산뜻한 끝맛.",
   "아침, 식후, 차게.",
   "자몽 껍질의 흰 부분을 많이 남기면 쌉싸름합니다. 취향껏 덜어내세요."
  ],
  "en": [
   "Grapefruit Tea",
   "Grapefruit peel and flesh preserved in sugar, stirred into water.",
   "None · caffeine-free",
   "3 tbsp preserve to 300 ml",
   "One glass",
   "Stir into lukewarm water.",
   "The United States and the Caribbean. Grapefruit is preserved in sugar.",
   "Grapefruit bitterness with sweetness, a bright finish.",
   "Morning, after meals, chilled.",
   "Keep the white pith if you like the bitter edge; trim it if not."
  ],
  "zh-CN": [
   "西柚茶",
   "把西柚皮肉糖渍兑水喝的苦甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升加糖渍3大勺",
   "1次",
   "用温水调开。",
   "美国与加勒比。西柚加糖腌渍。",
   "西柚的苦甜与清爽收口。",
   "早晨、饭后、放凉。",
   "白瓤留得多会苦，按口味修掉。"
  ],
  "zh-TW": [
   "西柚茶",
   "把西柚皮肉糖漬兌水喝的苦甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升加糖漬3大匙",
   "1次",
   "用溫水調開。",
   "美國與加勒比。西柚加糖醃漬。",
   "西柚的苦甜與清爽收口。",
   "早晨、飯後、放涼。",
   "白瓤留得多會苦，按口味修掉。"
  ]
 },
 {
  "id": "fruit-orange",
  "group": "traditional",
  "kind": "tea",
  "hanja": "橙",
  "sub": "Orange Tea",
  "alias": [
   "오렌지",
   "오렌지차"
  ],
  "hz": "橙子",
  "hs": "橙子",
  "rom": "Orange-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "3큰술",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-fruit b-light k-crisp k-sweet r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "미국",
   "en": "United States",
   "zh-CN": "美国",
   "zh-TW": "美國"
  },
  "originCountryCode": "us",
  "ko": [
   "오렌지차",
   "오렌지 껍질과 과육을 절인 청을 물에 푼 상큼한 차.",
   "무산화 · 카페인 없음",
   "300ml에 청 3큰술",
   "1회",
   "미지근한 물에 풀어 마십니다.",
   "미국·지중해. 오렌지를 설탕에 절여 청을 만듭니다.",
   "오렌지의 상큼함과 꿀 같은 단맛.",
   "아침, 디저트, 차게.",
   "껍질을 얇게 저며 절이면 향이 좋고 쓴맛이 적습니다."
  ],
  "en": [
   "Orange Tea",
   "Orange peel and flesh preserved in sugar, stirred into water.",
   "None · caffeine-free",
   "3 tbsp preserve to 300 ml",
   "One glass",
   "Stir into lukewarm water.",
   "The United States and the Mediterranean. Oranges are preserved in sugar.",
   "Bright orange with honeyed sweetness.",
   "Morning, dessert, chilled.",
   "Slice the peel thin for aroma without bitterness."
  ],
  "zh-CN": [
   "橙子茶",
   "把橙皮果肉糖渍兑水喝的清爽茶。",
   "不发酵 · 无咖啡因",
   "300毫升加糖渍3大勺",
   "1次",
   "用温水调开。",
   "美国与地中海。橙子加糖腌渍。",
   "橙子的清爽与蜜甜。",
   "早晨、甜点、放凉。",
   "果皮切薄再腌，香而不苦。"
  ],
  "zh-TW": [
   "橙子茶",
   "把橙皮果肉糖漬兌水喝的清爽茶。",
   "不發酵 · 無咖啡因",
   "300毫升加糖漬3大匙",
   "1次",
   "用溫水調開。",
   "美國與地中海。橙子加糖醃漬。",
   "橙子的清爽與蜜甜。",
   "早晨、甜點、放涼。",
   "果皮切薄再醃，香而不苦。"
  ]
 },
 {
  "id": "herb-strawberry",
  "group": "traditional",
  "kind": "tea",
  "hanja": "草",
  "sub": "Strawberry Tea",
  "alias": [
   "딸기",
   "딸기차"
  ],
  "hz": "草莓",
  "hs": "草莓",
  "rom": "Ttalgi-cha",
  "temp": 85,
  "tempRange": "80~85℃",
  "leaf": "3큰술",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit b-light k-sweet k-crisp r-clean s-hot s-iced w-quick p-dessert c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "딸기차",
   "딸기를 설탕에 절인 청을 물에 푼 달콤하고 새콤한 차.",
   "무산화 · 카페인 없음",
   "300ml에 청 3큰술",
   "1회",
   "미지근한 물에 풀어 마십니다.",
   "한국. 딸기를 설탕에 절여 청을 만듭니다.",
   "잘 익은 딸기의 새콤달콤함과 향.",
   "디저트, 오후, 차게.",
   "딸기청은 향이 약해지기 쉬워 차게 마시는 편이 좋습니다."
  ],
  "en": [
   "Strawberry Tea",
   "Strawberry preserved in sugar, stirred into water.",
   "None · caffeine-free",
   "3 tbsp preserve to 300 ml",
   "One glass",
   "Stir into lukewarm water.",
   "Korea. Strawberries are preserved in sugar.",
   "Ripe strawberry, sweet and tart.",
   "Dessert, afternoon, chilled.",
   "The aroma fades in heat, so serve it cool."
  ],
  "zh-CN": [
   "草莓茶",
   "把糖渍草莓兑水喝的酸甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升加糖渍3大勺",
   "1次",
   "用温水调开。",
   "韩国。草莓加糖腌渍。",
   "熟草莓的酸甜与香气。",
   "甜点、下午、放凉。",
   "香气怕热，放凉喝更好。"
  ],
  "zh-TW": [
   "草莓茶",
   "把糖漬草莓兌水喝的酸甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升加糖漬3大匙",
   "1次",
   "用溫水調開。",
   "韓國。草莓加糖醃漬。",
   "熟草莓的酸甜與香氣。",
   "甜點、下午、放涼。",
   "香氣怕熱，放涼喝更好。"
  ]
 },
 {
  "id": "herb-bittermelon",
  "group": "traditional",
  "kind": "tea",
  "hanja": "苦",
  "sub": "Bitter Melon Tea",
  "alias": [
   "여주",
   "고과차"
  ],
  "hz": "苦瓜",
  "hs": "苦瓜",
  "rom": "Yeoju-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-grass a-roast b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "여주차",
   "말린 여주(쓴오이)를 끓인 쌉쌀하고 구수한 차.",
   "무산화 · 카페인 없음",
   "400ml에 5g",
   "2회",
   "95도에서 10분. 말린 여주를 씁니다.",
   "한국·인도. 여주를 썰어 말려 씁니다.",
   "여주 특유의 쌉쌀함과 옅은 단맛.",
   "식후, 더운 날.",
   "여주는 쓴맛이 강해 5g이면 충분하고, 차게 마시면 덜 씁니다."
  ],
  "en": [
   "Bitter Melon Tea",
   "Dried bitter melon simmered into a bitter, savoury cup.",
   "None · caffeine-free",
   "5 g to 400 ml",
   "2 infusions",
   "95 °C for 10 minutes; use dried slices.",
   "Korea and India. Bitter melon is sliced and dried.",
   "Bitter melon's bite with a light sweetness.",
   "After meals, hot days.",
   "Very bitter: 5 g is enough, and it is milder cold."
  ],
  "zh-CN": [
   "苦瓜茶",
   "把干苦瓜煮成的微苦香茶。",
   "不发酵 · 无咖啡因",
   "400毫升配5克",
   "2泡",
   "95度煮10分钟，用干片。",
   "韩国与印度。苦瓜切片晒干。",
   "苦瓜特有的苦与淡甜。",
   "饭后、炎热的日子。",
   "苦味强，5克就够，放凉更柔。"
  ],
  "zh-TW": [
   "苦瓜茶",
   "把乾苦瓜煮成的微苦香茶。",
   "不發酵 · 無咖啡因",
   "400毫升配5公克",
   "2泡",
   "95度煮10分鐘，用乾片。",
   "韓國與印度。苦瓜切片曬乾。",
   "苦瓜特有的苦與淡甜。",
   "飯後、炎熱的日子。",
   "苦味強，5公克就夠，放涼更柔。"
  ]
 },
 {
  "id": "herb-pumpkin",
  "group": "traditional",
  "kind": "tea",
  "hanja": "南",
  "sub": "Pumpkin Tea",
  "alias": [
   "호박",
   "늙은호박차"
  ],
  "hz": "南瓜",
  "hs": "南瓜",
  "rom": "Hobak-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "10g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "호박차",
   "말린 늙은 호박을 끓인 달콤하고 구수한 차.",
   "무산화 · 카페인 없음",
   "400ml에 10g",
   "2회",
   "95도에서 15분. 말린 호박을 씁니다.",
   "한국. 늙은 호박을 썰어 말립니다.",
   "구수한 호박 향과 진한 단맛.",
   "겨울, 식후, 붓기 걱정하는 날.",
   "늙은 호박은 잘 말려야 단맛이 진해지고, 대추를 더하면 좋습니다."
  ],
  "en": [
   "Pumpkin Tea",
   "Dried mature pumpkin simmered into a sweet, warming cup.",
   "None · caffeine-free",
   "10 g to 400 ml",
   "2 infusions",
   "95 °C for 15 minutes; use dried pumpkin.",
   "Korea. Mature pumpkin is sliced and dried.",
   "Roasted pumpkin sweetness, deep and soft.",
   "Winter, after meals, on puffy days.",
   "Dry it well to deepen the sweetness; a jujube helps."
  ],
  "zh-CN": [
   "南瓜茶",
   "把干老南瓜煮成的香甜茶。",
   "不发酵 · 无咖啡因",
   "400毫升配10克",
   "2泡",
   "95度煮15分钟，用干南瓜。",
   "韩国。老南瓜切片晒干。",
   "焙南瓜的香与浓甜。",
   "冬天、饭后、容易浮肿时。",
   "晒透甜味更浓，加红枣更好。"
  ],
  "zh-TW": [
   "南瓜茶",
   "把乾老南瓜煮成的香甜茶。",
   "不發酵 · 無咖啡因",
   "400毫升配10公克",
   "2泡",
   "95度煮15分鐘，用乾南瓜。",
   "韓國。老南瓜切片曬乾。",
   "焙南瓜的香與濃甜。",
   "冬天、飯後、容易浮腫時。",
   "曬透甜味更濃，加紅棗更好。"
  ]
 },
 {
  "id": "fruit-noni",
  "group": "traditional",
  "kind": "tea",
  "hanja": "諾",
  "sub": "Noni Tea",
  "alias": [
   "노니",
   "노니차"
  ],
  "hz": "諾麗",
  "hs": "诺丽",
  "rom": "Noni-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "5g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-fruit b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-refresh",
  "originCountry": {
   "ko": "폴리네시아",
   "en": "Polynesia",
   "zh-CN": "波利尼西亚",
   "zh-TW": "玻里尼西亞"
  },
  "originCountryCode": "pf",
  "ko": [
   "노니차",
   "노니 열매를 말려 끓인 독특한 향과 신맛의 차.",
   "무산화 · 카페인 없음",
   "400ml에 5g",
   "2회",
   "95도에서 7분. 말린 열매를 씁니다.",
   "폴리네시아·동남아. 노니 열매를 말려 씁니다.",
   "발효된 과일 같은 향과 신맛, 옅은 단맛.",
   "아침, 식후.",
   "노니는 향이 강해 5g이면 충분하고, 꿀을 더하면 마시기 쉽습니다."
  ],
  "en": [
   "Noni Tea",
   "Dried noni fruit — pungent, tart and distinctive.",
   "None · caffeine-free",
   "5 g to 400 ml",
   "2 infusions",
   "95 °C for 7 minutes; use dried fruit.",
   "Polynesia and Southeast Asia. Noni fruit is dried.",
   "Fermented-fruit aroma, tartness, light sweetness.",
   "Morning, after meals.",
   "Strong stuff: 5 g is enough, and honey makes it easier."
  ],
  "zh-CN": [
   "诺丽茶",
   "把干诺丽果煮成的气味独特、微酸的茶。",
   "不发酵 · 无咖啡因",
   "400毫升配5克",
   "2泡",
   "95度煮7分钟，用干果。",
   "波利尼西亚与东南亚。诺丽果晒干使用。",
   "发酵果香与酸味，带淡甜。",
   "早晨、饭后。",
   "气味强，5克就够，加蜂蜜更好入口。"
  ],
  "zh-TW": [
   "諾麗茶",
   "把乾諾麗果煮成的氣味獨特、微酸的茶。",
   "不發酵 · 無咖啡因",
   "400毫升配5公克",
   "2泡",
   "95度煮7分鐘，用乾果。",
   "玻里尼西亞與東南亞。諾麗果曬乾使用。",
   "發酵果香與酸味，帶淡甜。",
   "早晨、飯後。",
   "氣味強，5公克就夠，加蜂蜜更好入口。"
  ]
 },
 {
  "id": "fruit-guava",
  "group": "traditional",
  "kind": "tea",
  "hanja": "芭",
  "sub": "Guava Tea",
  "alias": [
   "구아바",
   "구아바잎차"
  ],
  "hz": "芭樂",
  "hs": "芭乐",
  "rom": "Guaba-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "400ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-fruit a-grass b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "대만",
   "en": "Taiwan",
   "zh-CN": "台湾",
   "zh-TW": "台灣"
  },
  "originCountryCode": "tw",
  "ko": [
   "구아바차",
   "구아바 잎을 말려 우린 과일 향과 살짝 떫은 차.",
   "무산화 · 카페인 없음",
   "400ml에 4g",
   "2회",
   "90도에서 5분. 말린 잎을 씁니다.",
   "대만·동남아. 구아바 잎을 말려 씁니다.",
   "구아바 특유의 과일 향과 옅은 떫음, 단맛.",
   "식후, 더운 날.",
   "구아바 잎은 5분이면 충분하고, 오래 우리면 떫어집니다."
  ],
  "en": [
   "Guava Tea",
   "Dried guava leaf — fruity, faintly astringent and sweet.",
   "None · caffeine-free",
   "4 g to 400 ml",
   "2 infusions",
   "90 °C for 5 minutes; use dried leaves.",
   "Taiwan and Southeast Asia. Guava leaves are dried.",
   "Guava aroma, light astringency, sweetness.",
   "After meals, hot days.",
   "Five minutes is enough; longer turns it astringent."
  ],
  "zh-CN": [
   "芭乐茶",
   "把干芭乐叶泡出的果香微涩茶。",
   "不发酵 · 无咖啡因",
   "400毫升配4克",
   "2泡",
   "90度泡5分钟，用干叶。",
   "台湾与东南亚。芭乐叶晒干使用。",
   "芭乐特有的果香与轻微涩，带甜。",
   "饭后、炎热的日子。",
   "五分钟就够，泡久会涩。"
  ],
  "zh-TW": [
   "芭樂茶",
   "把乾芭樂葉泡出的果香微澀茶。",
   "不發酵 · 無咖啡因",
   "400毫升配4公克",
   "2泡",
   "90度泡5分鐘，用乾葉。",
   "台灣與東南亞。芭樂葉曬乾使用。",
   "芭樂特有的果香與輕微澀，帶甜。",
   "飯後、炎熱的日子。",
   "五分鐘就夠，泡久會澀。"
  ]
 },
 {
  "id": "fruit-cacao",
  "group": "traditional",
  "kind": "tea",
  "hanja": "可",
  "sub": "Cacao Tea",
  "alias": [
   "카카오",
   "카카오닙스차"
  ],
  "hz": "可可",
  "hs": "可可",
  "rom": "Kakao-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "8g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot s-milk w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "미국",
   "en": "United States",
   "zh-CN": "美国",
   "zh-TW": "美國"
  },
  "originCountryCode": "us",
  "ko": [
   "카카오차",
   "카카오 껍질(카카오닙스 껍질)을 우린 초콜릿 향의 차.",
   "무산화 · 카페인 적음",
   "300ml에 8g",
   "2회",
   "95도에서 6분. 껍질을 씁니다.",
   "카리브·서아프리카 원산. 카카오 껍질을 말려 씁니다.",
   "다크초콜릿 같은 향과 옅은 쌉쌀함, 가벼운 단맛.",
   "오후, 디저트, 우유와 함께.",
   "카카오차는 카페인이 조금 있어 저녁 늦게는 피하는 편이 좋습니다."
  ],
  "en": [
   "Cacao Tea",
   "Cacao husk steeped into a chocolate-scented cup.",
   "None · low caffeine",
   "8 g to 300 ml",
   "2 infusions",
   "95 °C for 6 minutes; use the husks.",
   "Native to the Caribbean and West Africa. Cacao husks are dried.",
   "Dark chocolate aroma, a gentle bitterness, light sweetness.",
   "Afternoon, dessert, with milk.",
   "It carries a little caffeine, so go easy late in the day."
  ],
  "zh-CN": [
   "可可茶",
   "把可可果壳泡出的巧克力香茶。",
   "不发酵 · 咖啡因低",
   "300毫升配8克",
   "2泡",
   "95度泡6分钟，用果壳。",
   "原产加勒比与西非。可可壳晒干使用。",
   "黑巧克力香与轻微苦，带淡甜。",
   "下午、甜点、加牛奶。",
   "含少量咖啡因，晚上少喝。"
  ],
  "zh-TW": [
   "可可茶",
   "把可可果殼泡出的巧克力香茶。",
   "不發酵 · 咖啡因低",
   "300毫升配8公克",
   "2泡",
   "95度泡6分鐘，用果殼。",
   "原產加勒比與西非。可可殼曬乾使用。",
   "黑巧克力香與輕微苦，帶淡甜。",
   "下午、甜點、加牛奶。",
   "含少量咖啡因，晚上少喝。"
  ]
 },
 {
  "id": "herb-lemon",
  "group": "traditional",
  "kind": "tea",
  "hanja": "檸",
  "sub": "Lemon Tea",
  "alias": [
   "레몬",
   "레몬차"
  ],
  "hz": "檸檬",
  "hs": "柠檬",
  "rom": "Lemon-cha",
  "temp": 85,
  "tempRange": "80~85℃",
  "leaf": "2쪽",
  "water": "300ml",
  "steeps": [
   180,
   180
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-fruit b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "지중해",
   "en": "Mediterranean",
   "zh-CN": "地中海",
   "zh-TW": "地中海"
  },
  "originCountryCode": "eu",
  "ko": [
   "레몬차",
   "레몬을 설탕에 절인 청이나 생레몬을 물에 푼 상큼한 차.",
   "무산화 · 카페인 없음",
   "300ml에 레몬 2쪽",
   "1회",
   "80도에서 3분. 껍질을 함께 넣으면 향이 좋습니다.",
   "지중해 원산. 레몬을 절이거나 생으로 씁니다.",
   "상큼한 레몬 향과 신맛, 옅은 단맛.",
   "아침, 식후, 목이 아플 때.",
   "껍질의 흰 부분을 넣으면 씁니다. 노란 껍질만 쓰세요."
  ],
  "en": [
   "Lemon Tea",
   "Lemon preserve or fresh lemon in water — bright and clean.",
   "None · caffeine-free",
   "2 slices to 300 ml",
   "One glass",
   "80 °C for 3 minutes; a little peel adds aroma.",
   "Native to the Mediterranean. Lemon is preserved or used fresh.",
   "Bright lemon aroma, sourness, light sweetness.",
   "Morning, after meals, for a sore throat.",
   "The white pith is bitter; use only the yellow zest."
  ],
  "zh-CN": [
   "柠檬茶",
   "用柠檬糖渍或鲜柠檬兑水的清爽茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2片",
   "1次",
   "80度泡3分钟，带一点果皮更香。",
   "原产地中海。柠檬糖渍或鲜用。",
   "清爽柠檬香与酸味，带淡甜。",
   "早晨、饭后、喉咙痛时。",
   "白色果皮会苦，只用黄色表皮。"
  ],
  "zh-TW": [
   "檸檬茶",
   "用檸檬糖漬或鮮檸檬兌水的清爽茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2片",
   "1次",
   "80度泡3分鐘，帶一點果皮更香。",
   "原產地中海。檸檬糖漬或鮮用。",
   "清爽檸檬香與酸味，帶淡甜。",
   "早晨、飯後、喉嚨痛時。",
   "白色果皮會苦，只用黃色表皮。"
  ]
 },
 {
  "id": "herb-cucumber",
  "group": "traditional",
  "kind": "tea",
  "hanja": "黃",
  "sub": "Cucumber Tea",
  "alias": [
   "오이",
   "오이차"
  ],
  "hz": "黃瓜",
  "hs": "黄瓜",
  "rom": "Oi-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "5g",
  "water": "400ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "오이차",
   "말린 오이를 우린 서늘하고 담백한 차.",
   "무산화 · 카페인 없음",
   "400ml에 5g",
   "2회",
   "85도에서 3분. 말린 오이를 씁니다.",
   "한국. 오이를 썰어 말려 씁니다.",
   "서늘한 오이 향과 옅은 단맛, 깨끗한 끝맛.",
   "더운 날, 식후, 차게.",
   "오이차는 차게 마시면 가장 시원하고, 오래 우리면 쌉쌀합니다."
  ],
  "en": [
   "Cucumber Tea",
   "Dried cucumber steeped into a cool, clean cup.",
   "None · caffeine-free",
   "5 g to 400 ml",
   "2 infusions",
   "85 °C for 3 minutes; use dried slices.",
   "Korea. Cucumber is sliced and dried.",
   "Cool cucumber, light sweetness, a clean finish.",
   "Hot days, after meals, chilled.",
   "Best cold; long steeping turns it bitter."
  ],
  "zh-CN": [
   "黄瓜茶",
   "把干黄瓜泡出的清凉淡茶。",
   "不发酵 · 无咖啡因",
   "400毫升配5克",
   "2泡",
   "85度泡3分钟，用干片。",
   "韩国。黄瓜切片晒干。",
   "清凉黄瓜香与淡甜，收口干净。",
   "炎热的日子、饭后、放凉。",
   "放凉最清爽，泡久会苦。"
  ],
  "zh-TW": [
   "黃瓜茶",
   "把乾黃瓜泡出的清涼淡茶。",
   "不發酵 · 無咖啡因",
   "400毫升配5公克",
   "2泡",
   "85度泡3分鐘，用乾片。",
   "韓國。黃瓜切片曬乾。",
   "清涼黃瓜香與淡甜，收口乾淨。",
   "炎熱的日子、飯後、放涼。",
   "放涼最清爽，泡久會苦。"
  ]
 },
 {
  "id": "herb-hazel",
  "group": "everyday",
  "kind": "tea",
  "hanja": "榛",
  "sub": "Hazelnut Tea",
  "alias": [
   "개암",
   "진자차"
  ],
  "hz": "榛子",
  "hs": "榛子",
  "rom": "Gaeam-cha",
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "10g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "개암차",
   "볶은 개암을 갈아 끓인 고소하고 달콤한 차.",
   "무산화 · 카페인 없음",
   "400ml에 10g",
   "2회",
   "95도에서 7분. 볶아 간 개암을 씁니다.",
   "한국·유럽. 개암을 볶아 씁니다.",
   "볶은 견과의 진한 고소함과 옅은 단맛.",
   "아침, 겨울, 디저트.",
   "개암은 볶아 갈아야 기름과 향이 나오고, 끓일 때 저어야 가라앉지 않습니다."
  ],
  "en": [
   "Hazelnut Tea",
   "Roasted hazelnuts ground and simmered into a rich, sweet cup.",
   "None · caffeine-free",
   "10 g to 400 ml",
   "2 infusions",
   "95 °C for 7 minutes; use roasted, ground nuts.",
   "Korea and Europe. Hazelnuts are roasted.",
   "Deep roasted nut, light sweetness.",
   "Breakfast, winter, dessert.",
   "Roast and grind for the oil and aroma; stir while simmering."
  ],
  "zh-CN": [
   "榛子茶",
   "把炒榛子磨碎煮成的浓香茶。",
   "不发酵 · 无咖啡因",
   "400毫升配10克",
   "2泡",
   "95度煮7分钟，用炒过磨碎的榛子。",
   "韩国与欧洲。榛子炒制后使用。",
   "焙坚果的浓香与淡甜。",
   "早餐、冬天、甜点。",
   "炒过再磨才有油香，煮时要搅拌。"
  ],
  "zh-TW": [
   "榛子茶",
   "把炒榛子磨碎煮成的濃香茶。",
   "不發酵 · 無咖啡因",
   "400毫升配10公克",
   "2泡",
   "95度煮7分鐘，用炒過磨碎的榛子。",
   "韓國與歐洲。榛子炒製後使用。",
   "焙堅果的濃香與淡甜。",
   "早餐、冬天、甜點。",
   "炒過再磨才有油香，煮時要攪拌。"
  ]
 },
 {
  "id": "herb-aged-cucumber",
  "group": "traditional",
  "kind": "tea",
  "hanja": "老",
  "sub": "Overripe Cucumber Tea",
  "alias": [
   "노각",
   "늙은오이차"
  ],
  "hz": "老黃瓜",
  "hs": "老黄瓜",
  "rom": "Nogak-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "8g",
  "water": "400ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "노각차",
   "말린 노각(늙은 오이)을 끓인 담백하고 서늘한 차.",
   "무산화 · 카페인 없음",
   "400ml에 8g",
   "2회",
   "90도에서 7분. 말린 노각을 씁니다.",
   "한국. 늙은 오이를 썰어 말립니다.",
   "담백한 오이 향과 옅은 단맛, 시원한 끝맛.",
   "여름, 식후, 차게.",
   "노각은 씨를 빼고 말려야 하고, 차게 마시면 가장 시원합니다."
  ],
  "en": [
   "Overripe Cucumber Tea",
   "Dried mature cucumber — plain, cool and gently sweet.",
   "None · caffeine-free",
   "8 g to 400 ml",
   "2 infusions",
   "90 °C for 7 minutes; use dried slices.",
   "Korea. Mature cucumbers are sliced and dried.",
   "Plain cucumber, light sweetness, a cool finish.",
   "Summer, after meals, chilled.",
   "Remove the seeds before drying; best served cold."
  ],
  "zh-CN": [
   "老黄瓜茶",
   "把干老黄瓜煮成的清淡清凉茶。",
   "不发酵 · 无咖啡因",
   "400毫升配8克",
   "2泡",
   "90度煮7分钟，用干片。",
   "韩国。老黄瓜切片晒干。",
   "清淡黄瓜香与淡甜，收口凉。",
   "夏天、饭后、放凉。",
   "去籽再晒，放凉最清爽。"
  ],
  "zh-TW": [
   "老黃瓜茶",
   "把乾老黃瓜煮成的清淡清涼茶。",
   "不發酵 · 無咖啡因",
   "400毫升配8公克",
   "2泡",
   "90度煮7分鐘，用乾片。",
   "韓國。老黃瓜切片曬乾。",
   "清淡黃瓜香與淡甜，收口涼。",
   "夏天、飯後、放涼。",
   "去籽再曬，放涼最清爽。"
  ]
 },
 {
  "id": "trad-cascara",
  "group": "traditional",
  "kind": "tea",
  "hanja": "鼠",
  "sub": "Cascara Tea",
  "alias": [
   "카스카라",
   "카스카라사그라다차"
  ],
  "hz": "鼠李皮",
  "hs": "鼠李皮",
  "rom": "Kaseukara-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning a-roast a-fruit b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-energy",
  "originCountry": {
   "ko": "미국",
   "en": "United States",
   "zh-CN": "美国",
   "zh-TW": "美國"
  },
  "originCountryCode": "us",
  "ko": [
   "카스카라차",
   "카스카라나무 껍질을 말려 우린 과일 향의 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "90도에서 5분. 말린 껍질을 씁니다.",
   "미국 북서부. 카스카라 껍질을 말려 씁니다.",
   "말린 자두 같은 과일 향과 가벼운 쓴맛, 단맛.",
   "아침, 식후.",
   "카스카라는 완하 성분이 있어 하루 3g을 넘기지 말라는 것이 일반적입니다."
  ],
  "en": [
   "Cascara Tea",
   "Dried cascara bark — fruity, lightly bitter and sweet.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "90 °C for 5 minutes; use dried bark.",
   "The Pacific Northwest of the United States. Cascara bark is dried.",
   "Dried-fruit aroma with a light bitterness and sweetness.",
   "Morning, after meals.",
   "It contains a laxative compound, so about 3 g a day is the usual limit."
  ],
  "zh-CN": [
   "鼠李皮茶",
   "把干鼠李皮泡出的果香微苦茶。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "90度泡5分钟，用干皮。",
   "美国西北部。鼠李皮晒干使用。",
   "干果香与轻微苦、甜。",
   "早晨、饭后。",
   "含缓泻成分，一般建议每天不超过3克。"
  ],
  "zh-TW": [
   "鼠李皮茶",
   "把乾鼠李皮泡出的果香微苦茶。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "90度泡5分鐘，用乾皮。",
   "美國西北部。鼠李皮曬乾使用。",
   "乾果香與輕微苦、甜。",
   "早晨、飯後。",
   "含緩瀉成分，一般建議每天不超過3公克。"
  ]
 },
 {
  "id": "herb-oregano",
  "group": "everyday",
  "kind": "tea",
  "hanja": "牛",
  "sub": "Oregano Tea",
  "alias": [
   "오레가노",
   "오레가노차"
  ],
  "hz": "牛至",
  "hs": "牛至",
  "rom": "Oregano-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass a-roast b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
  "originCountry": {
   "ko": "지중해",
   "en": "Mediterranean",
   "zh-CN": "地中海",
   "zh-TW": "地中海"
  },
  "originCountryCode": "eu",
  "ko": [
   "오레가노차",
   "말린 오레가노를 우린 향이 강하고 살짝 쓴 허브차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "85도에서 3분. 말린 잎을 씁니다.",
   "지중해. 오레가노 잎을 말려 씁니다.",
   "강한 허브 향과 옅은 쓴맛, 따뜻한 여운.",
   "식후, 겨울, 감기 기운이 있을 때.",
   "오레가노는 향이 강해 2g이면 충분하고, 꿀을 더하면 부드럽습니다."
  ],
  "en": [
   "Oregano Tea",
   "Dried oregano — pungent, herbal and slightly bitter.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "85 °C for 3 minutes; use dried leaves.",
   "The Mediterranean. Oregano leaves are dried.",
   "Strong herbal aroma, light bitterness, a warm finish.",
   "After meals, winter, when a cold is coming on.",
   "Very aromatic: 2 g is enough, and honey softens it."
  ],
  "zh-CN": [
   "牛至茶",
   "把干牛至泡出的浓香微苦草本茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "85度泡3分钟，用干叶。",
   "地中海。牛至叶晒干使用。",
   "浓烈草本香与轻微苦，尾韵暖。",
   "饭后、冬天、有感冒征兆时。",
   "香气强，2克就够，加蜂蜜更柔。"
  ],
  "zh-TW": [
   "牛至茶",
   "把乾牛至泡出的濃香微苦草本茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "85度泡3分鐘，用乾葉。",
   "地中海。牛至葉曬乾使用。",
   "濃烈草本香與輕微苦，尾韻暖。",
   "飯後、冬天、有感冒徵兆時。",
   "香氣強，2公克就夠，加蜂蜜更柔。"
  ]
 },
 {
  "id": "white-baiya",
  "group": "white",
  "kind": "tea",
  "hanja": "白",
  "sub": "Yunnan White Bud Tea",
  "alias": [
   "백아차",
   "운남 백아차"
  ],
  "hz": "白芽茶",
  "hs": "白芽茶",
  "rom": "Baek-a-cha",
  "temp": 85,
  "tempRange": "80~90℃",
  "leaf": "4g",
  "water": "150ml",
  "steeps": [
   20,
   15,
   20,
   30
  ],
  "maxSteep": 6,
  "oxidationValue": 5,
  "traits": "t-afternoon t-night a-floral a-fruit b-light k-sweet r-clean s-hot w-gongfu p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "백아차 (운남)",
   "운남의 큰잎 차나무 싹만으로 만든 백차 — 향이 또렷합니다.",
   "약 5%",
   "150ml에 4g",
   "6회",
   "85도에서 20초부터, 회차마다 5초씩 늘립니다.",
   "중국 윈난. 보이차용 자생종 싹을 백호은침 방식으로 만듭니다.",
   "꽃 향과 과일 향, 진한 단맛, 부드러운 질감.",
   "오후, 손님상, 디저트.",
   "운남 백아차는 복정 백호은침보다 향이 또렷합니다. 85도에서 짧게 우리세요."
  ],
  "en": [
   "Yunnan White Bud Tea",
   "Bud-only white tea from Yunnan's large-leaf trees — more overtly aromatic than Fujian silver needle.",
   "About 5%",
   "4 g to 150 ml",
   "6 infusions",
   "85 °C, 20 seconds first, adding 5 seconds each round.",
   "Yunnan, China. Buds of the local assamica variety are made in the silver-needle style.",
   "Floral and fruity, deep sweetness, a soft body.",
   "Afternoon, for guests, dessert.",
   "More aromatic than Fujian silver needle; keep the water at 85 °C."
  ],
  "zh-CN": [
   "云南白芽茶",
   "用云南大叶种茶芽做的白茶，香气比福鼎银针更明显。",
   "约5%",
   "150毫升配4克",
   "6泡",
   "85度起泡20秒，每泡加5秒。",
   "中国云南。用当地野生大叶种芽头按银针工艺制作。",
   "花香与果香，甜度高，口感柔。",
   "下午、待客、甜点。",
   "比福鼎银针更香，85度短泡。"
  ],
  "zh-TW": [
   "雲南白芽茶",
   "用雲南大葉種茶芽做的白茶，香氣比福鼎銀針更明顯。",
   "約5%",
   "150毫升配4公克",
   "6泡",
   "85度起泡20秒，每泡加5秒。",
   "中國雲南。用當地野生大葉種芽頭按銀針工藝製作。",
   "花香與果香，甜度高，口感柔。",
   "下午、待客、甜點。",
   "比福鼎銀針更香，85度短泡。"
  ]
 },
 {
  "id": "white-taiwan",
  "group": "white",
  "kind": "tea",
  "hanja": "台",
  "sub": "Taiwanese White Tea",
  "alias": [
   "대만 백차",
   "홍옥 백차"
  ],
  "hz": "台灣白茶",
  "hs": "台湾白茶",
  "rom": "Daeman baekcha",
  "temp": 85,
  "tempRange": "80~90℃",
  "leaf": "4g",
  "water": "150ml",
  "steeps": [
   20,
   15,
   20,
   30
  ],
  "maxSteep": 6,
  "oxidationValue": 8,
  "traits": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-gongfu p-solo c-low m-calm",
  "originCountry": {
   "ko": "대만",
   "en": "Taiwan",
   "zh-CN": "台湾",
   "zh-TW": "台灣"
  },
  "originCountryCode": "tw",
  "ko": [
   "백차 (대만)",
   "대만의 우롱·홍차 품종으로 만든 백차 — 화려한 꽃 향.",
   "약 8%",
   "150ml에 4g",
   "6회",
   "85도에서 20초부터, 회차마다 5초씩 늘립니다.",
   "대만. 홍옥·청심오룡 등 대만 품종을 백차 방식으로 만듭니다.",
   "품종에 따라 꽃 향과 과일 향이 화려하게 납니다.",
   "오후, 손님상.",
   "대만 백차는 제품마다 달라 생산자의 안내를 따르는 것이 가장 좋습니다."
  ],
  "en": [
   "Taiwanese White Tea",
   "White tea made from Taiwan's oolong and black tea cultivars — exuberantly floral.",
   "About 8%",
   "4 g to 150 ml",
   "6 infusions",
   "85 °C, 20 seconds first, adding 5 seconds each round.",
   "Taiwan. Cultivars such as Hongyu and Qingxin are made in the white tea style.",
   "Vivid floral and fruit aromas that vary by cultivar.",
   "Afternoon, for guests.",
   "Each maker differs: the producer's brewing note is the best guide."
  ],
  "zh-CN": [
   "台湾白茶",
   "用台湾乌龙、红茶品种做的白茶，花香华丽。",
   "约8%",
   "150毫升配4克",
   "6泡",
   "85度起泡20秒，每泡加5秒。",
   "台湾。红玉、青心乌龙等品种按白茶工艺制作。",
   "依品种呈现华丽花香与果香。",
   "下午、待客。",
   "每款不同，最好照生产者的建议冲泡。"
  ],
  "zh-TW": [
   "台灣白茶",
   "用台灣烏龍、紅茶品種做的白茶，花香華麗。",
   "約8%",
   "150毫升配4公克",
   "6泡",
   "85度起泡20秒，每泡加5秒。",
   "台灣。紅玉、青心烏龍等品種按白茶工藝製作。",
   "依品種呈現華麗花香與果香。",
   "下午、待客。",
   "每款不同，最好照生產者的建議沖泡。"
  ]
 },
 {
  "id": "herb-akebia",
  "group": "traditional",
  "kind": "tea",
  "hanja": "木",
  "sub": "Akebia Tea",
  "alias": [
   "으름",
   "목통차"
  ],
  "hz": "木通",
  "hs": "木通",
  "rom": "Eureum-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   240,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "으름차",
   "으름 덩굴줄기를 말려 끓인 쌉쌀하고 구수한 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 10분. 말린 줄기를 씁니다.",
   "한국·중국. 으름 덩굴을 말려 씁니다.",
   "쌉쌀한 줄기 향과 옅은 단맛.",
   "식후, 몸이 무거울 때.",
   "으름 줄기는 잘게 썰어 끓여야 우러나고, 많이 쓰면 쓸 수 있습니다."
  ],
  "en": [
   "Akebia Tea",
   "Dried akebia vine — bitter, woody and lightly sweet.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; use dried vine.",
   "Korea and China. Akebia vine is dried.",
   "Bitter woody aroma, a light sweetness.",
   "After meals, when feeling heavy.",
   "Slice the vine fine; it can taste bitter in quantity."
  ],
  "zh-CN": [
   "木通茶",
   "把干木通藤煮成的微苦香茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮10分钟，用干藤。",
   "韩国与中国。木通藤晒干使用。",
   "微苦木香与淡甜。",
   "饭后、身体沉重时。",
   "藤切细才出味，放多会苦。"
  ],
  "zh-TW": [
   "木通茶",
   "把乾木通藤煮成的微苦香茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮10分鐘，用乾藤。",
   "韓國與中國。木通藤曬乾使用。",
   "微苦木香與淡甜。",
   "飯後、身體沉重時。",
   "藤切細才出味，放多會苦。"
  ]
 },
 {
  "id": "herb-peony",
  "group": "traditional",
  "kind": "tea",
  "hanja": "芍",
  "sub": "Peony Root Tea",
  "alias": [
   "작약",
   "작약근차"
  ],
  "hz": "芍藥",
  "hs": "芍药",
  "rom": "Jakyak-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "4g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "작약차",
   "작약 뿌리를 말려 끓인 쌉쌀하고 살짝 단 차.",
   "무산화 · 카페인 없음",
   "300ml에 4g",
   "2회",
   "90도에서 10분. 말린 뿌리를 씁니다.",
   "중국·한국. 작약 뿌리를 말려 씁니다.",
   "쌉쌀한 뿌리 향과 옅은 단맛.",
   "오후, 몸이 뻣뻣할 때.",
   "작약은 얇게 썰어 끓이고, 대추를 더하면 부드럽습니다."
  ],
  "en": [
   "Peony Root Tea",
   "Dried peony root — bitter, starchy and lightly sweet.",
   "None · caffeine-free",
   "4 g to 300 ml",
   "2 infusions",
   "90 °C for 10 minutes; use dried root.",
   "China and Korea. The root is dried.",
   "Bitter root, a light sweetness.",
   "Afternoon, when the body feels stiff.",
   "Slice it thin; a jujube softens it."
  ],
  "zh-CN": [
   "芍药茶",
   "把干芍药根煮成的微苦微甜茶。",
   "不发酵 · 无咖啡因",
   "300毫升配4克",
   "2泡",
   "90度煮10分钟，用干根。",
   "中国与韩国。芍药根晒干使用。",
   "微苦根香与淡甜。",
   "下午、身体僵硬时。",
   "切薄片煮，加红枣更柔。"
  ],
  "zh-TW": [
   "芍藥茶",
   "把乾芍藥根煮成的微苦微甜茶。",
   "不發酵 · 無咖啡因",
   "300毫升配4公克",
   "2泡",
   "90度煮10分鐘，用乾根。",
   "中國與韓國。芍藥根曬乾使用。",
   "微苦根香與淡甜。",
   "下午、身體僵硬時。",
   "切薄片煮，加紅棗更柔。"
  ]
 },
 {
  "id": "herb-purple-perilla",
  "group": "everyday",
  "kind": "tea",
  "hanja": "紫",
  "sub": "Perilla Leaf Tea",
  "alias": [
   "자소",
   "자소엽차"
  ],
  "hz": "紫蘇",
  "hs": "紫苏",
  "rom": "Jaso-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-grass a-floral b-light k-crisp r-clean s-hot w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "자소차",
   "자소(차조기) 잎을 말려 우린 향이 강하고 살짝 매운 차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "85도에서 3분. 말린 잎을 씁니다.",
   "한국·중국. 자소 잎을 말려 씁니다.",
   "독특한 잎 향과 옅은 매운맛, 서늘한 끝맛.",
   "식후, 감기 기운이 있을 때.",
   "자소는 향이 강해 2g이면 충분하고, 3분 이상 우리면 씁니다."
  ],
  "en": [
   "Perilla Leaf Tea",
   "Dried perilla leaf — aromatic with a faint peppery edge.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "85 °C for 3 minutes; use dried leaves.",
   "Korea and China. Perilla leaves are dried.",
   "Distinct leaf aroma, light pungency, a cool finish.",
   "After meals, when a cold is coming on.",
   "Very aromatic: 2 g is enough, and beyond three minutes it turns bitter."
  ],
  "zh-CN": [
   "紫苏茶",
   "把干紫苏叶泡出的浓香微辛茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "85度泡3分钟，用干叶。",
   "韩国与中国。紫苏叶晒干使用。",
   "独特叶香与轻微辛，收口凉。",
   "饭后、有感冒征兆时。",
   "香气强，2克就够，泡久会苦。"
  ],
  "zh-TW": [
   "紫蘇茶",
   "把乾紫蘇葉泡出的濃香微辛茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "85度泡3分鐘，用乾葉。",
   "韓國與中國。紫蘇葉曬乾使用。",
   "獨特葉香與輕微辛，收口涼。",
   "飯後、有感冒徵兆時。",
   "香氣強，2公克就夠，泡久會苦。"
  ]
 },
 {
  "id": "herb-sunflower",
  "group": "everyday",
  "kind": "tea",
  "hanja": "向",
  "sub": "Sunflower Tea",
  "alias": [
   "해바라기",
   "규화차"
  ],
  "hz": "向日葵",
  "hs": "向日葵",
  "rom": "Haebaragi-cha",
  "temp": 90,
  "tempRange": "85~90℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon a-floral b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
  "originCountry": {
   "ko": "한국",
   "en": "Korea",
   "zh-CN": "韩国",
   "zh-TW": "韓國"
  },
  "originCountryCode": "kr",
  "ko": [
   "해바라기차",
   "해바라기 꽃잎을 말려 우린 옅고 은은한 꽃차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "85도에서 2분. 꽃잎을 씁니다.",
   "한국·북미 원산. 꽃잎을 말려 씁니다.",
   "은은한 꽃 향과 옅은 단맛, 깨끗한 끝맛.",
   "오후, 여름, 디저트.",
   "해바라기 꽃잎은 향이 약해 2분 이상 우리면 풀 맛이 강해집니다."
  ],
  "en": [
   "Sunflower Tea",
   "Dried sunflower petals — pale, gentle and quietly floral.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "85 °C for 2 minutes; use the petals.",
   "Korea; native to North America. Petals are dried.",
   "Soft floral, light sweetness, a clean finish.",
   "Afternoon, summer, dessert.",
   "The aroma is delicate; beyond two minutes it turns grassy."
  ],
  "zh-CN": [
   "向日葵茶",
   "把干向日葵花瓣泡出的淡雅花茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "85度泡2分钟，用花瓣。",
   "韩国；原产北美。花瓣晒干使用。",
   "淡雅花香与淡甜，收口干净。",
   "下午、夏天、甜点。",
   "香气淡，泡久会出草味。"
  ],
  "zh-TW": [
   "向日葵茶",
   "把乾向日葵花瓣泡出的淡雅花茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "85度泡2分鐘，用花瓣。",
   "韓國；原產北美。花瓣曬乾使用。",
   "淡雅花香與淡甜，收口乾淨。",
   "下午、夏天、甜點。",
   "香氣淡，泡久會出草味。"
  ]
 },
 {
  "id": "blend-lemonblack",
  "group": "black",
  "kind": "tea",
  "hanja": "檸",
  "sub": "Lemon Black Tea",
  "alias": [
   "레몬홍차",
   "레몬 티"
  ],
  "hz": "檸檬紅茶",
  "hs": "柠檬红茶",
  "rom": "Lemon Black Tea",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   180,
   210,
   240
  ],
  "maxSteep": 3,
  "oxidationValue": 95,
  "traits": "t-morning t-afternoon a-fruit a-malt b-full k-crisp r-clean s-hot s-iced s-milk w-quick p-meal c-high m-refresh",
  "originCountry": {
   "ko": "영국",
   "en": "United Kingdom",
   "zh-CN": "英国",
   "zh-TW": "英國"
  },
  "originCountryCode": "uk",
  "ko": [
   "레몬홍차",
   "홍차에 레몬 향과 껍질을 더한 상큼한 블렌드.",
   "약 95%",
   "300ml에 3g",
   "3회",
   "95도에서 3분. 레몬 껍질을 함께 넣으면 향이 살아납니다.",
   "영국. 홍차에 레몬 오일이나 껍질을 더합니다.",
   "홍차의 몰트 향과 레몬의 상큼함, 가벼운 떫음.",
   "아침, 식후, 아이스티.",
   "레몬홍차는 우린 뒤 레몬을 넣어야 쓴맛이 적습니다. 함께 끓이면 씁니다."
  ],
  "en": [
   "Lemon Black Tea",
   "Black tea blended with lemon peel and oil — brisk and bright.",
   "About 95%",
   "3 g to 300 ml",
   "3 infusions",
   "95 °C for 3 minutes; a strip of peel lifts the aroma.",
   "The United Kingdom. Black tea is blended with lemon oil or peel.",
   "Malt tea with bright lemon and a light astringency.",
   "Morning, after meals, iced.",
   "Add lemon after brewing; boiling it with the tea turns it bitter."
  ],
  "zh-CN": [
   "柠檬红茶",
   "红茶加柠檬皮与柠檬油的清爽拼配。",
   "约95%",
   "300毫升配3克",
   "3泡",
   "95度泡3分钟，加一片柠檬皮更香。",
   "英国。红茶拼配柠檬油或果皮。",
   "麦芽红茶香与柠檬的清爽，轻微涩。",
   "早晨、饭后、冰茶。",
   "泡好后再加柠檬，一起煮会苦。"
  ],
  "zh-TW": [
   "檸檬紅茶",
   "紅茶加檸檬皮與檸檬油的清爽拼配。",
   "約95%",
   "300毫升配3公克",
   "3泡",
   "95度泡3分鐘，加一片檸檬皮更香。",
   "英國。紅茶拼配檸檬油或果皮。",
   "麥芽紅茶香與檸檬的清爽，輕微澀。",
   "早晨、飯後、冰茶。",
   "泡好後再加檸檬，一起煮會苦。"
  ]
 },
 {
  "id": "blend-peachblack",
  "group": "black",
  "kind": "tea",
  "hanja": "蜜",
  "sub": "Peach Black Tea",
  "alias": [
   "복숭아홍차",
   "피치 티",
   "썸머 피치",
   "Summer Peach"
  ],
  "hz": "蜜桃紅茶",
  "hs": "蜜桃红茶",
  "rom": "Boksunga Black Tea",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   180,
   210,
   240
  ],
  "maxSteep": 3,
  "oxidationValue": 95,
  "traits": "t-afternoon a-fruit a-floral b-full k-sweet r-clean s-hot s-iced s-milk w-quick p-dessert c-high m-cozy",
  "originCountry": {
   "ko": "영국",
   "en": "United Kingdom",
   "zh-CN": "英国",
   "zh-TW": "英國"
  },
  "originCountryCode": "uk",
  "ko": [
   "복숭아홍차",
   "홍차에 복숭아 향을 더한 달콤하고 향긋한 블렌드.",
   "약 95%",
   "300ml에 3g",
   "3회",
   "95도에서 3분.",
   "영국. 홍차에 복숭아 향과 꽃잎을 더합니다.",
   "복숭아의 달콤한 향과 홍차의 몰트, 부드러운 단맛.",
   "오후, 디저트, 아이스티.",
   "복숭아홍차는 우유를 더하면 향이 부드러워지고, 아이스로 마시면 향이 살아납니다."
  ],
  "en": [
   "Peach Black Tea",
   "Black tea scented with peach — sweet and softly floral.",
   "About 95%",
   "3 g to 300 ml",
   "3 infusions",
   "95 °C for 3 minutes.",
   "The United Kingdom. Black tea is scented with peach and petals.",
   "Sweet peach over malty tea, a soft sweetness.",
   "Afternoon, dessert, iced.",
   "Milk softens the perfume; served iced it stays brightest."
  ],
  "zh-CN": [
   "蜜桃红茶",
   "红茶加蜜桃香的甜美拼配。",
   "约95%",
   "300毫升配3克",
   "3泡",
   "95度泡3分钟。",
   "英国。红茶加蜜桃香与花瓣。",
   "蜜桃甜香与麦芽红茶，甜度柔。",
   "下午、甜点、冰茶。",
   "加牛奶香气更柔，冰饮最香。"
  ],
  "zh-TW": [
   "蜜桃紅茶",
   "紅茶加蜜桃香的甜美拼配。",
   "約95%",
   "300毫升配3公克",
   "3泡",
   "95度泡3分鐘。",
   "英國。紅茶加蜜桃香與花瓣。",
   "蜜桃甜香與麥芽紅茶，甜度柔。",
   "下午、甜點、冰茶。",
   "加牛奶香氣更柔，冰飲最香。"
  ]
 },
 {
  "id": "blend-leicha",
  "group": "everyday",
  "kind": "tea",
  "hanja": "擂",
  "sub": "Lei Cha",
  "alias": [
   "뇌차",
   "뢰차"
  ],
  "hz": "擂茶",
  "hs": "擂茶",
  "rom": "Noe-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "15g",
  "water": "300ml",
  "steeps": [
   120,
   120
  ],
  "maxSteep": 1,
  "oxidationValue": 0,
  "traits": "t-morning a-roast a-grass b-full k-sweet r-clean s-hot w-quick p-meal c-low m-energy",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "뇌차",
   "찻잎과 곡물·견과를 함께 갈아 뜨거운 물에 푼 객가의 차.",
   "무산화 · 카페인 적음",
   "300ml에 15g",
   "1회",
   "90도 물에 갈아둔 가루를 풀고 저어 마십니다.",
   "중국 광둥·푸젠과 대만의 객가 문화권.",
   "볶은 곡물·견과의 고소함과 찻잎의 풀 향, 걸쭉한 질감.",
   "아침, 간식, 손님상.",
   "뇌차는 가루를 먼저 소량의 물에 개어 풀어야 덩어리지지 않습니다."
  ],
  "en": [
   "Lei Cha",
   "Hakka pounded tea with grains and nuts, whisked into hot water.",
   "None · low caffeine",
   "15 g to 300 ml",
   "One bowl",
   "Whisk the ground mix into 90 °C water and stir.",
   "Hakka communities of Guangdong, Fujian and Taiwan.",
   "Roasted grains and nuts with green tea, thick and savoury.",
   "Breakfast, snack, for guests.",
   "Paste the powder with a little water first so it does not clump."
  ],
  "zh-CN": [
   "擂茶",
   "把茶叶与谷物、坚果一起研磨后冲水的客家茶。",
   "不发酵 · 咖啡因低",
   "300毫升配15克",
   "1次",
   "用90度水把粉调开搅匀。",
   "中国广东、福建与台湾客家地区。",
   "焙谷物坚果的香与茶叶青香，口感浓稠。",
   "早餐、点心、待客。",
   "先用少量水调成糊，再冲水才不结块。"
  ],
  "zh-TW": [
   "擂茶",
   "把茶葉與穀物、堅果一起研磨後沖水的客家茶。",
   "不發酵 · 咖啡因低",
   "300毫升配15公克",
   "1次",
   "用90度水把粉調開攪勻。",
   "中國廣東、福建與台灣客家地區。",
   "焙穀物堅果的香與茶葉青香，口感濃稠。",
   "早餐、點心、待客。",
   "先用少量水調成糊，再沖水才不結塊。"
  ]
 },
 {
  "id": "blend-palbocha",
  "group": "everyday",
  "kind": "tea",
  "hanja": "八",
  "sub": "Eight Treasure Tea",
  "alias": [
   "팔보차",
   "삼포차"
  ],
  "hz": "八寶茶",
  "hs": "八宝茶",
  "rom": "Palbo-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "10g",
  "water": "300ml",
  "steeps": [
   180,
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-fruit a-floral b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "팔보차",
   "찻잎에 대추·구기자·용안·건포도 등을 넣고 우린 중국의 단 차.",
   "무산화 · 카페인 적음",
   "300ml에 10g",
   "2회",
   "90도에서 5분. 재료를 함께 넣고 우립니다.",
   "중국 닝샤·간쑤의 회족 문화권.",
   "대추와 건과의 단맛, 찻잎의 옅은 쌉쌀함, 향신료 향.",
   "손님상, 겨울, 명절.",
   "팔보차는 끓는 물을 부어 뚜껑을 덮고 우려야 향이 잡힙니다. 설탕은 취향껏."
  ],
  "en": [
   "Eight Treasure Tea",
   "Chinese tea with jujube, goji, longan and raisins — sweet and warming.",
   "None · low caffeine",
   "10 g to 300 ml",
   "2 infusions",
   "90 °C for 5 minutes; steep the ingredients together.",
   "Hui communities of Ningxia and Gansu, China.",
   "Date and dried-fruit sweetness, light tea astringency, spice.",
   "For guests, winter, holidays.",
   "Pour on boiling water and keep the lid on; sweeten to taste."
  ],
  "zh-CN": [
   "八宝茶",
   "茶叶加红枣、枸杞、桂圆、葡萄干等冲泡的甜茶。",
   "不发酵 · 咖啡因低",
   "300毫升配10克",
   "2泡",
   "90度泡5分钟，材料一起泡。",
   "中国宁夏、甘肃回族地区。",
   "红枣干果的甜、茶叶淡涩与香料香。",
   "待客、冬天、节日。",
   "冲入沸水盖盖子泡，甜度随意。"
  ],
  "zh-TW": [
   "八寶茶",
   "茶葉加紅棗、枸杞、桂圓、葡萄乾等沖泡的甜茶。",
   "不發酵 · 咖啡因低",
   "300毫升配10公克",
   "2泡",
   "90度泡5分鐘，材料一起泡。",
   "中國寧夏、甘肅回族地區。",
   "紅棗乾果的甜、茶葉淡澀與香料香。",
   "待客、冬天、節日。",
   "沖入沸水蓋蓋子泡，甜度隨意。"
  ]
 },
 {
  "id": "herb-honeybush",
  "group": "everyday",
  "kind": "tea",
  "hanja": "蜜",
  "sub": "Honeybush Tea",
  "alias": [
   "허니부쉬",
   "허니부시"
  ],
  "hz": "蜜樹",
  "hs": "蜜树",
  "rom": "Honeybush-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "3g",
  "water": "300ml",
  "steeps": [
   240,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-morning t-afternoon t-night a-floral a-fruit b-medium k-sweet r-clean s-hot s-iced s-milk w-quick p-dessert c-low m-cozy",
  "originCountry": {
   "ko": "남아프리카 공화국",
   "en": "South Africa",
   "zh-CN": "南非",
   "zh-TW": "南非"
  },
  "originCountryCode": "za",
  "ko": [
   "허니부쉬",
   "남아공 케이프의 허니부쉬를 우린 꿀 같은 단 향의 차.",
   "무산화 · 카페인 없음",
   "300ml에 3g",
   "2회",
   "95도에서 5분. 오래 우리면 더 달콤합니다.",
   "남아프리카 케이프주. 허니부쉬 잎과 줄기를 말려 씁니다.",
   "꿀과 살구를 닮은 향, 부드러운 단맛, 카페인 없음.",
   "밤, 디저트, 우유와 함께.",
   "허니부쉬는 카페인이 없어 밤에도 좋고, 우유를 더해도 향이 살아 있습니다."
  ],
  "en": [
   "Honeybush Tea",
   "South African honeybush — honeyed, soft and caffeine-free.",
   "None · caffeine-free",
   "3 g to 300 ml",
   "2 infusions",
   "95 °C for 5 minutes; longer steeping sweetens it.",
   "The Western Cape, South Africa. Honeybush leaf and stem are dried.",
   "Honey and apricot, a soft sweetness, no caffeine.",
   "Night, dessert, with milk.",
   "Caffeine-free, so it suits the evening, and it keeps its aroma with milk."
  ],
  "zh-CN": [
   "蜜树茶",
   "南非开普的蜜树茶，蜜香柔和、无咖啡因。",
   "不发酵 · 无咖啡因",
   "300毫升配3克",
   "2泡",
   "95度泡5分钟，泡久更甜。",
   "南非西开普。蜜树叶与茎晒干使用。",
   "蜜与杏的香，柔和的甜，无咖啡因。",
   "夜晚、甜点、加牛奶。",
   "无咖啡因，晚上也能喝，加奶香气仍在。"
  ],
  "zh-TW": [
   "蜜樹茶",
   "南非開普的蜜樹茶，蜜香柔和、無咖啡因。",
   "不發酵 · 無咖啡因",
   "300毫升配3公克",
   "2泡",
   "95度泡5分鐘，泡久更甜。",
   "南非西開普。蜜樹葉與莖曬乾使用。",
   "蜜與杏的香，柔和的甜，無咖啡因。",
   "夜晚、甜點、加牛奶。",
   "無咖啡因，晚上也能喝，加奶香氣仍在。"
  ]
 },
 {
  "id": "herb-spearmint",
  "group": "everyday",
  "kind": "tea",
  "hanja": "留",
  "sub": "Spearmint Tea",
  "alias": [
   "스피아민트",
   "녹박하차"
  ],
  "hz": "留蘭香",
  "hs": "留兰香",
  "rom": "Spearmint-cha",
  "temp": 95,
  "tempRange": "90~95℃",
  "leaf": "2g",
  "water": "300ml",
  "steeps": [
   180,
   240
  ],
  "maxSteep": 2,
  "oxidationValue": 0,
  "traits": "t-afternoon t-night a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
  "originCountry": {
   "ko": "지중해",
   "en": "Mediterranean",
   "zh-CN": "地中海",
   "zh-TW": "地中海"
  },
  "originCountryCode": "eu",
  "ko": [
   "스피아민트",
   "페퍼민트보다 부드럽고 달콤한 민트 — 식후에 좋은 허브차.",
   "무산화 · 카페인 없음",
   "300ml에 2g",
   "2회",
   "90도에서 3분. 말린 잎을 씁니다.",
   "지중해·유럽. 스피아민트 잎을 말려 씁니다.",
   "부드러운 민트 향과 옅은 단맛, 깨끗한 끝맛.",
   "식후, 저녁, 아이스티.",
   "스피아민트는 페퍼민트보다 순해 밤에도 부담이 적고, 차게 마셔도 좋습니다."
  ],
  "en": [
   "Spearmint Tea",
   "Softer and sweeter than peppermint — a gentle after-meal herb.",
   "None · caffeine-free",
   "2 g to 300 ml",
   "2 infusions",
   "90 °C for 3 minutes; use dried leaves.",
   "The Mediterranean and Europe. Spearmint leaves are dried.",
   "Soft mint, light sweetness, a clean finish.",
   "After meals, evening, iced.",
   "Gentler than peppermint, so it suits the evening; good chilled too."
  ],
  "zh-CN": [
   "留兰香茶",
   "比薄荷更柔甜的绿薄荷，饭后喝的温和草本茶。",
   "不发酵 · 无咖啡因",
   "300毫升配2克",
   "2泡",
   "90度泡3分钟，用干叶。",
   "地中海与欧洲。留兰香叶晒干使用。",
   "柔和薄荷香与淡甜，收口干净。",
   "饭后、晚上、冰茶。",
   "比薄荷温和，晚上喝也轻松，放凉也好。"
  ],
  "zh-TW": [
   "留蘭香茶",
   "比薄荷更柔甜的綠薄荷，飯後喝的溫和草本茶。",
   "不發酵 · 無咖啡因",
   "300毫升配2公克",
   "2泡",
   "90度泡3分鐘，用乾葉。",
   "地中海與歐洲。留蘭香葉曬乾使用。",
   "柔和薄荷香與淡甜，收口乾淨。",
   "飯後、晚上、冰茶。",
   "比薄荷溫和，晚上喝也輕鬆，放涼也好。"
  ]
 },
 {
  "id": "blend-yuenyeung",
  "group": "black",
  "kind": "tea",
  "hanja": "鴛",
  "sub": "Yuenyeung",
  "alias": [
   "얀여엉",
   "원앙차"
  ],
  "hz": "鴛鴦",
  "hs": "鸳鸯",
  "rom": "Yuenyeung",
  "temp": 95,
  "tempRange": "95~100℃",
  "leaf": "6g",
  "water": "150ml",
  "steeps": [
   300
  ],
  "maxSteep": 1,
  "oxidationValue": 95,
  "traits": "t-morning t-afternoon a-malt a-roast b-full k-sweet r-clean s-hot s-milk p-meal c-high m-energy",
  "originCountry": {
   "ko": "홍콩",
   "en": "Hong Kong",
   "zh-CN": "香港",
   "zh-TW": "香港"
  },
  "x": {
   "ko": [
    "홍콩 차찬텡의 단골 메뉴로, 진한 홍차와 커피를 7:3 안팎으로 섞고 연유나 우유를 더합니다.",
    "홍차를 진하게 우리고 커피를 섞은 뒤 연유·우유로 농도를 맞춥니다."
   ],
   "en": [
    "A cha chaan teng staple: strong milk tea blended with coffee, roughly seven to three, sweetened with condensed milk.",
    "Strong black tea mixed with coffee, then adjusted with condensed or evaporated milk."
   ],
   "zh-CN": [
    "茶餐厅常见饮品，浓奶茶与咖啡约七三混合，加炼乳调味。",
    "浓红茶混咖啡，再用炼乳或淡奶调浓度。"
   ],
   "zh-TW": [
    "茶餐廳常見飲品，濃奶茶與咖啡約七三混合，加煉乳調味。",
    "濃紅茶混咖啡，再用煉乳或淡奶調濃度。"
   ]
  },
  "ko": {
   "name": "윈영",
   "oneLine": "홍차와 커피를 섞은 홍콩 차찬텡의 잔.",
   "oxidation": "약 95%",
   "ratioNote": "150ml에 6g, 커피·연유는 취향껏",
   "rounds": "1회",
   "steepBasis": "95도에서 5분 진하게 우리고 커피를 7:3 정도로 섞습니다.",
   "origin": "홍콩 차찬텡. 베이스는 세일론·아쌈 블렌드.",
   "process": "진한 홍차에 커피를 섞고 연유나 우유로 농도를 맞춥니다.",
   "story": "이름은 두 마리 새가 한 몸처럼 붙어 있는 원앙에서 왔습니다. 차와 커피가 섞인 모습을 빗댄 것입니다.",
   "flavor": "홍차의 몰트와 커피의 쓴맛, 연유의 단맛이 겹칩니다.",
   "pairing": "홍콩식 토스트, 계란 요리, 아침.",
   "brewTip": "차를 진하게 우리는 것이 핵심입니다. 커피는 진한 에스프레소를 조금.",
   "keep": "차잎은 밀봉해 건조하게.",
   "keywords": "윈영 얀여엉 원앙차 홍콩 커피 홍차"
  },
  "en": {
   "name": "Yuenyeung",
   "oneLine": "Black tea and coffee in one Hong Kong cup.",
   "oxidation": "about 95%",
   "ratioNote": "6 g to 150 ml; coffee and condensed milk to taste",
   "rounds": "1 brew",
   "steepBasis": "Brew strong for 5 minutes at 95 °C, then mix with coffee about 7:3.",
   "origin": "Hong Kong cha chaan teng, on a Ceylon–Assam base.",
   "process": "Strong milk tea mixed with coffee, adjusted with condensed or evaporated milk.",
   "story": "The name comes from the mandarin duck, a pair joined as one — tea and coffee in a single cup.",
   "flavor": "Malt, coffee bitterness and condensed-milk sweetness together.",
   "pairing": "Hong Kong toast, egg dishes, breakfast.",
   "brewTip": "Brew the tea strong; add a little strong espresso.",
   "keep": "Keep the leaf sealed and dry.",
   "keywords": "yuenyeung Hong Kong coffee milk tea cha chaan teng"
  },
  "zh-CN": {
   "name": "鸳鸯",
   "oneLine": "红茶与咖啡同在一杯，香港茶餐厅的味道。",
   "oxidation": "约95%",
   "ratioNote": "150毫升配6克，咖啡与炼乳随口味",
   "rounds": "1次",
   "steepBasis": "95度泡5分钟至浓，再与咖啡约七三混合。",
   "origin": "香港茶餐厅，茶坯为锡兰与阿萨姆拼配。",
   "process": "浓奶茶混入咖啡，用炼乳或淡奶调浓淡。",
   "story": "名字取自鸳鸯——两只鸟合为一体，喻茶与咖啡同杯。",
   "flavor": "麦芽、咖啡的苦与炼乳的甜叠在一起。",
   "pairing": "港式多士、蛋类料理、早餐。",
   "brewTip": "茶要浓，咖啡用少量浓缩。",
   "keep": "茶叶密封干燥。",
   "keywords": "鸳鸯 香港 咖啡 奶茶 茶餐厅"
  },
  "zh-TW": {
   "name": "鴛鴦",
   "oneLine": "紅茶與咖啡同在一杯，香港茶餐廳的味道。",
   "oxidation": "約95%",
   "ratioNote": "150毫升配6克，咖啡與煉乳隨口味",
   "rounds": "1次",
   "steepBasis": "95度泡5分鐘至濃，再與咖啡約七三混合。",
   "origin": "香港茶餐廳，茶坯為錫蘭與阿薩姆拼配。",
   "process": "濃奶茶混入咖啡，用煉乳或淡奶調濃淡。",
   "story": "名字取自鴛鴦——兩隻鳥合為一體，喻茶與咖啡同杯。",
   "flavor": "麥芽、咖啡的苦與煉乳的甜疊在一起。",
   "pairing": "港式多士、蛋類料理、早餐。",
   "brewTip": "茶要濃，咖啡用少量濃縮。",
   "keep": "茶葉密封乾燥。",
   "keywords": "鴛鴦 香港 咖啡 奶茶 茶餐廳"
  },
  "originCountryCode": "hk"
 }
];
  TEAS = TEAS.concat(NAMU_TEAS);

  /* ── 타바론 잎차 브랜드 블렌드 4종 (2026-11-24) ── */
  var BRAND_TEAS = [
 {
  "id": "blend-kamachai",
  "group": "black",
  "kind": "tea",
  "h": "荳",
  "hanja": "荳",
  "hz": "卡瑪柴蘇特拉",
  "hs": "卡玛柴苏特拉",
  "rom": "Kama Chai Sutra",
  "sub": "Kama Chai Sutra",
  "alias": [
   "카마 차이",
   "차이 수트라",
   "타바론 카마 차이 수트라",
   "Kama Chai"
  ],
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "6g",
  "water": "300ml",
  "steeps": [
   300
  ],
  "maxSteep": 1,
  "oxidationValue": 95,
  "originCountry": {
   "ko": "인도",
   "en": "India",
   "zh-CN": "印度",
   "zh-TW": "印度"
  },
  "originCountryCode": "in",
  "ko": [
   "카마 차이 수트라",
   "홍차에 카다몸·계피·생강·정향·바닐라를 더한 인도식 밀크티 블렌드.",
   "95%",
   "300ml에 6g, 우유를 반쯤 섞어",
   "1회",
   "100도에서 5분 우린 뒤 우유와 설탕을 넣고 한 번 끓입니다.",
   "인도. 타바론이 인도 홍차에 향신료를 블렌딩한 제품입니다.",
   "홍차를 진하게 우려 카다몸·계피·생강·정향·바닐라를 더합니다. 향신료가 따뜻하고 우유를 만나 둥글어집니다.",
   "향신료의 따뜻함과 진한 홍차, 우유의 둥근 단맛.",
   "사모사, 파라타, 아침 빵, 매운 커리.",
   "우유와 함께 끓여야 향신료가 열립니다. 설탕은 취향껏."
  ],
  "en": [
   "Kama Chai Sutra",
   "An Indian-style milk-tea blend: black tea with cardamom, cinnamon, ginger, clove and vanilla.",
   "95%",
   "6 g to 300 ml, then half milk",
   "One boil",
   "Steep 5 minutes at 100 °C, then add milk and sugar and bring to one boil.",
   "India. Tavalon blends Indian black tea with whole spices.",
   "Strong black tea with cardamom, cinnamon, ginger, clove and vanilla; the spice turns round and warm once milk goes in.",
   "Warm spice, strong black tea, round milk sweetness.",
   "Samosa, paratha, morning bread, spicy curry.",
   "Boil with the milk so the spice opens. Sugar to taste."
  ],
  "zh-CN": [
   "卡玛柴苏特拉",
   "加入小豆蔻、肉桂、生姜、丁香和香草的红茶奶茶拼配。",
   "95%",
   "300毫升配6克，再加半份牛奶",
   "1次",
   "100度泡5分钟，加牛奶和糖再煮开一次。",
   "印度。塔巴隆以印度红茶拼配整粒香料。",
   "浓红茶加小豆蔻、肉桂、生姜、丁香和香草，遇牛奶后香料变得圆润温暖。",
   "香料的暖意、浓红茶的力度、牛奶的圆甜。",
   "萨莫萨、帕拉塔、早餐面包、辛辣咖喱。",
   "与牛奶同煮才能逼出香气，糖按口味。"
  ],
  "zh-TW": [
   "卡瑪柴蘇特拉",
   "加入小豆蔻、肉桂、生薑、丁香和香草的紅茶奶茶拼配。",
   "95%",
   "300毫升配6克，再加半份牛奶",
   "1次",
   "100度泡5分鐘，加牛奶和糖再煮開一次。",
   "印度。塔巴隆以印度紅茶拼配整粒香料。",
   "濃紅茶加小豆蔻、肉桂、生薑、丁香和香草，遇牛奶後香料變得圓潤溫暖。",
   "香料的暖意、濃紅茶的力度、牛奶的圓甜。",
   "薩莫薩、帕拉塔、早餐麵包、辛辣咖哩。",
   "與牛奶同煮才能逼出香氣，糖按口味。"
  ]
 },
 {
  "id": "blend-mangomelange",
  "group": "black",
  "kind": "tea",
  "h": "芒",
  "hanja": "芒",
  "hz": "芒果美朗紅茶",
  "hs": "芒果美朗红茶",
  "rom": "Mango Melange",
  "sub": "Mango Melange",
  "alias": [
   "망고 멜랑",
   "타바론 망고 멜랑",
   "망고 홍차"
  ],
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 95,
  "originCountry": {
   "ko": "인도",
   "en": "India",
   "zh-CN": "印度",
   "zh-TW": "印度"
  },
  "originCountryCode": "in",
  "ko": [
   "망고 멜랑",
   "홍차에 말린 망고와 해바라기 꽃잎을 더한 향긋한 가향 홍차.",
   "95%",
   "300ml에 5g",
   "2회",
   "100도에서 4분. 망고 조각이 함께 우러나 향이 살아납니다.",
   "인도 홍차에 망고 조각과 망고 오일, 해바라기 꽃잎을 블렌딩했습니다.",
   "천연 망고 오일과 말린 망고 조각, 해바라기 꽃잎을 홍차에 더해 부드럽고 달콤한 향을 냅니다.",
   "익은 망고의 달콤함, 홍차의 몰트, 꽃잎의 가벼운 향.",
   "아이스티, 디저트, 과일 타르트.",
   "차게 우려도 향이 살아 아이스티로 좋습니다."
  ],
  "en": [
   "Mango Melange",
   "An aromatic black tea with dried mango and sunflower petals.",
   "95%",
   "5 g to 300 ml",
   "2 infusions",
   "Four minutes at 100 °C; the mango pieces steep along with the leaf.",
   "Indian black tea blended with mango pieces, mango oil and sunflower petals.",
   "Natural mango oil, dried mango pieces and sunflower petals are blended into black tea for a soft, sweet aroma.",
   "Ripe mango sweetness, black-tea malt, a light floral top note.",
   "Iced tea, desserts, fruit tarts.",
   "Good cold-brewed too — the aroma holds."
  ],
  "zh-CN": [
   "芒果美朗红茶",
   "加入芒果干与向日葵花瓣的香气红茶。",
   "95%",
   "300毫升配5克",
   "2泡",
   "100度泡4分钟，芒果干一同释出香气。",
   "印度红茶拼配芒果干、芒果油与向日葵花瓣。",
   "天然芒果油、芒果干与向日葵花瓣加入红茶，香气温和甜美。",
   "熟芒果的甜、红茶的麦芽香、花瓣的轻香。",
   "冰茶、甜点、水果塔。",
   "冷泡也能留住香气。"
  ],
  "zh-TW": [
   "芒果美朗紅茶",
   "加入芒果乾與向日葵花瓣的香氣紅茶。",
   "95%",
   "300毫升配5克",
   "2泡",
   "100度泡4分鐘，芒果乾一同釋出香氣。",
   "印度紅茶拼配芒果乾、芒果油與向日葵花瓣。",
   "天然芒果油、芒果乾與向日葵花瓣加入紅茶，香氣溫和甜美。",
   "熟芒果的甜、紅茶的麥芽香、花瓣的輕香。",
   "冰茶、甜點、水果塔。",
   "冷泡也能留住香氣。"
  ]
 },
 {
  "id": "blend-nycbreakfast",
  "group": "black",
  "kind": "tea",
  "h": "早",
  "hanja": "早",
  "hz": "紐約早餐紅茶",
  "hs": "纽约早餐红茶",
  "rom": "NYC Breakfast",
  "sub": "NYC Breakfast",
  "alias": [
   "NYC 브렉퍼스트",
   "타바론 NYC 브렉퍼스트",
   "뉴욕 브렉퍼스트"
  ],
  "temp": 100,
  "tempRange": "95~100℃",
  "leaf": "5g",
  "water": "300ml",
  "steeps": [
   300,
   300
  ],
  "maxSteep": 2,
  "oxidationValue": 95,
  "originCountry": {
   "ko": "스리랑카",
   "en": "Sri Lanka",
   "zh-CN": "斯里兰卡",
   "zh-TW": "斯里蘭卡"
  },
  "originCountryCode": "lk",
  "ko": [
   "NYC 브렉퍼스트",
   "실론·아쌈·자바를 섞은 뉴욕식 아침 홍차 — 부드럽고 달콤한 진한 잔.",
   "95%",
   "300ml에 5g",
   "2회",
   "100도에서 4~5분. 우유를 넣어도 힘이 남습니다.",
   "스리랑카 실론을 중심으로 인도 아쌈과 인도네시아 자바를 블렌딩했습니다.",
   "실론·아쌈·자바 세 산지의 홍차를 섞어 아침에 마시는 진한 홍차로 만들었습니다.",
   "달콤하고 부드러운 몰트, 진한 색, 우유를 넣으면 둥글어집니다.",
   "토스트, 베이글, 계란 요리, 아침 식사.",
   "진하게 우리고 우유를 더하면 아침 밀크티가 됩니다."
  ],
  "en": [
   "NYC Breakfast",
   "A New York breakfast blend of Ceylon, Assam and Java — soft, sweet and strong.",
   "95%",
   "5 g to 300 ml",
   "2 infusions",
   "Four to five minutes at 100 °C; it still stands up to milk.",
   "Ceylon from Sri Lanka at the centre, with Assam from India and Java from Indonesia.",
   "Black teas from three origins — Ceylon, Assam and Java — blended for a strong morning cup.",
   "Sweet, soft malt, a deep colour, rounder with milk.",
   "Toast, bagels, eggs, breakfast.",
   "Steep strong and add milk for a morning milk tea."
  ],
  "zh-CN": [
   "纽约早餐红茶",
   "锡兰、阿萨姆与爪哇拼配的纽约式早餐红茶，柔和甜润而有力度。",
   "95%",
   "300毫升配5克",
   "2泡",
   "100度泡4~5分钟，加牛奶仍有力度。",
   "以斯里兰卡锡兰为主，拼配印度阿萨姆与印尼爪哇。",
   "三个产地的红茶拼在一起，做成早晨喝的浓红茶。",
   "甜而柔和的麦芽香、深色茶汤，加牛奶更圆润。",
   "吐司、贝果、蛋料理、早餐。",
   "泡浓一点再加牛奶，就是早餐奶茶。"
  ],
  "zh-TW": [
   "紐約早餐紅茶",
   "錫蘭、阿薩姆與爪哇拼配的紐約式早餐紅茶，柔和甜潤而有力度。",
   "95%",
   "300毫升配5克",
   "2泡",
   "100度泡4~5分鐘，加牛奶仍有力度。",
   "以斯里蘭卡錫蘭為主，拼配印度阿薩姆與印尼爪哇。",
   "三個產地的紅茶拼在一起，做成早晨喝的濃紅茶。",
   "甜而柔和的麥芽香、深色茶湯，加牛奶更圓潤。",
   "吐司、貝果、蛋料理、早餐。",
   "泡濃一點再加牛奶，就是早餐奶茶。"
  ]
 },
 {
  "id": "white-cocopeony",
  "group": "white",
  "kind": "tea",
  "h": "椰",
  "hanja": "椰",
  "hz": "椰香白牡丹",
  "hs": "椰香白牡丹",
  "rom": "Coco Peony",
  "sub": "Coco Peony",
  "alias": [
   "코코 피오니",
   "타바론 코코 피오니",
   "코코넛 백차"
  ],
  "temp": 85,
  "tempRange": "80~90℃",
  "leaf": "4g",
  "water": "250ml",
  "steeps": [
   90,
   60,
   90
  ],
  "maxSteep": 3,
  "oxidationValue": 10,
  "originCountry": {
   "ko": "중국",
   "en": "China",
   "zh-CN": "中国",
   "zh-TW": "中國"
  },
  "originCountryCode": "cn",
  "ko": [
   "코코 피오니",
   "백차 60%에 코코넛 40%를 더한 달콤하고 부드러운 백차 블렌드.",
   "약 10%",
   "250ml에 4g",
   "3회",
   "85도에서 1분 30초. 끓는 물은 백차의 섬세함을 덮습니다.",
   "중국. 백모단 계열 백차에 코코넛을 블렌딩했습니다.",
   "백차에 코코넛을 더해 우유 없이도 둥글고 달콤한 잔이 됩니다.",
   "백차의 건초·꽃 향에 코코넛의 고소한 단맛이 겹칩니다.",
   "오후, 디저트, 코코넛 과자.",
   "물 온도를 낮게 유지하고 오래 우리지 마세요. 코코넛이 단맛을 냅니다."
  ],
  "en": [
   "Coco Peony",
   "A soft white-tea blend: 60% white tea with 40% coconut.",
   "About 10%",
   "4 g to 250 ml",
   "3 infusions",
   "90 seconds at 85 °C; boiling water buries the delicacy of white tea.",
   "China. White peony–style white tea blended with coconut.",
   "White tea with coconut turns round and sweet without any milk.",
   "The hay and flower of white tea over the warm sweetness of coconut.",
   "Afternoon, desserts, coconut pastries.",
   "Keep the water cool and do not oversteep; the coconut carries the sweetness."
  ],
  "zh-CN": [
   "椰香白牡丹",
   "60%白茶的柔和拼配，加入40%椰子的甜香。",
   "约10%",
   "250毫升配4克",
   "3泡",
   "85度泡1分30秒，沸水会盖住白茶的细致。",
   "中国。白牡丹类白茶拼配椰子。",
   "白茶加上椰子，不加牛奶也圆润甘甜。",
   "白茶的干草花香上叠着椰子的甘甜。",
   "下午、甜点、椰子糕点。",
   "水温低一些，不要久泡；甜味来自椰子。"
  ],
  "zh-TW": [
   "椰香白牡丹",
   "60%白茶的柔和拼配，加入40%椰子的甜香。",
   "約10%",
   "250毫升配4克",
   "3泡",
   "85度泡1分30秒，沸水會蓋住白茶的細緻。",
   "中國。白牡丹類白茶拼配椰子。",
   "白茶加上椰子，不加牛奶也圓潤甘甜。",
   "白茶的乾草花香上疊著椰子的甘甜。",
   "下午、甜點、椰子糕點。",
   "水溫低一些，不要久泡；甜味來自椰子。"
  ]
 }
];
  TEAS = TEAS.concat(BRAND_TEAS);
  /* ── END 나무위키 보강 ── */

  /* ── 신규 65종 취향 태그 ── */
  Object.assign(TRAITS, {
  "green-zhuyeqing": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
  "green-enshi-yulu": "t-morning t-afternoon a-grass a-herb b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
    "oolong-jasmine": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    "oolong-assam": "t-morning t-afternoon a-malt a-roast b-full k-sweet r-clean s-hot s-milk w-gongfu p-meal c-high m-energy",
    "oolong-ceylon": "t-morning t-afternoon a-floral b-light k-crisp r-clean s-hot s-iced w-gongfu p-dessert c-mid m-refresh",
    "oolong-ruby": "t-afternoon t-night a-roast a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-cozy",
    "oolong-jeju": "t-morning t-afternoon a-floral a-herb b-light k-sweet r-clean s-hot w-gongfu p-meal c-mid m-refresh",
    "oolong-cheong": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot s-iced w-gongfu p-solo c-mid m-refresh",
    "black-chuanhong": "t-morning t-afternoon a-floral a-malt b-full k-sweet r-clean s-hot w-quick p-meal c-high m-energy",
    "black-yixing": "t-morning t-afternoon a-floral b-medium k-sweet r-clean s-hot w-quick p-dessert c-mid m-calm",
    "black-jiuqu": "t-afternoon a-fruit a-floral b-medium k-sweet r-clean s-hot w-quick p-dessert c-mid m-cozy",
    "black-mizhuan": "t-morning a-malt b-full k-blend r-clean s-hot s-milk w-quick p-meal c-high m-energy",
    "black-hongyun": "t-morning t-afternoon a-fruit a-floral b-full k-sweet r-clean s-hot s-milk w-quick p-meal c-high m-energy",
    "black-ziya": "t-afternoon a-herb a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    "oolong-dancong-huangzhi": "t-afternoon t-night a-floral a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-high m-refresh",
    "oolong-dancong-xingren": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-gongfu p-solo c-mid m-cozy",
    "oolong-dancong-rougui": "t-night a-herb a-roast b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "oolong-dancong-guihua": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-refresh",
    "oolong-dancong-zhilan": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    "oolong-dancong-yelai": "t-night a-floral b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-high m-cozy",
    "oolong-dancong-tongtian": "t-afternoon a-floral b-medium k-crisp r-clean s-hot w-gongfu p-solo c-high m-energy",
    "oolong-dancong-youhua": "t-morning t-afternoon a-floral a-fruit b-light k-crisp r-clean s-hot w-gongfu p-solo c-mid m-refresh",
    "oolong-dancong-songzhong": "t-afternoon t-night a-floral a-roast b-full k-sweet r-clean s-hot w-gongfu p-solo c-high m-calm",
    "oolong-dancong-baxian": "t-afternoon a-floral b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-calm",
    "oolong-dancong-dawuye": "t-afternoon t-night a-floral a-roast b-full k-sweet r-clean s-hot s-iced w-gongfu p-meal c-high m-energy",
    "oolong-qilai": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot s-iced w-gongfu p-solo c-mid m-refresh",
    "oolong-honey": "t-afternoon a-floral a-fruit a-malt b-medium k-sweet r-clean s-hot s-iced w-gongfu p-dessert c-mid m-calm",
    "oolong-red": "t-afternoon t-night a-fruit a-malt b-full k-sweet r-clean s-hot s-iced w-gongfu p-dessert c-mid m-cozy",
    "oolong-qilan": "t-afternoon t-night a-floral a-herb b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-calm",
    "oolong-meizhan": "t-afternoon a-floral a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-calm",
    "oolong-tieluohan": "t-afternoon t-night a-herb a-roast b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "oolong-baijiguan": "t-morning t-afternoon a-floral a-herb b-light k-crisp r-clean s-hot w-gongfu p-solo c-mid m-refresh",
    "oolong-shuijingui": "t-afternoon a-floral a-roast b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-cozy",
    "oolong-bantianyao": "t-afternoon t-night a-roast a-herb b-full k-sweet r-smoke s-hot w-gongfu p-meal c-high m-cozy",
    "oolong-zhangping": "t-afternoon a-floral b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-refresh",
    "oolong-yunnan": "t-afternoon a-floral a-malt b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
    "oolong-darjeeling": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-quick p-solo c-mid m-refresh",
    "green-chunseol": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-solo c-mid m-calm",
        "green-tencha": "t-morning t-afternoon a-grass a-herb b-light k-sweet r-clean s-hot w-gongfu p-solo c-mid m-calm",
    "green-funmatsu": "t-morning t-afternoon a-grass b-medium k-crisp r-clean s-hot s-iced w-quick p-meal c-mid m-refresh",
    "green-konacha": "t-afternoon a-grass b-medium k-crisp r-clean s-hot w-quick p-meal c-mid m-refresh",
    "green-eunjeong": "t-morning t-afternoon a-grass b-light k-sweet r-clean s-hot w-quick p-solo c-mid m-calm",
    "white-darjeeling": "t-morning t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
  "green-anji-baipian": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-refresh",
  "green-gougunao": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
  "green-wuyuan-mingmei": "t-morning t-afternoon a-grass a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
  "green-mengding-ganlu": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "green-hanzhong-xianhao": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
  "green-huiming": "t-morning t-afternoon a-grass a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
  "green-boseong": "t-morning t-afternoon a-grass a-roast b-medium k-sweet r-clean s-hot s-iced w-quick p-meal c-mid m-refresh",
  "green-sanxia-biluochun": "t-morning t-afternoon a-grass a-fruit b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-refresh",
  "green-kabusecha": "t-morning t-afternoon a-grass a-herb b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
  "green-kamairicha": "t-morning t-afternoon a-roast a-grass b-medium k-sweet r-clean s-hot s-iced w-quick p-meal c-mid m-refresh",
  "green-dafo-longjing": "t-morning t-afternoon a-roast a-grass b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
  "green-laoshan": "t-morning t-afternoon a-grass a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-refresh",
  "white-xingongyi": "t-morning t-afternoon a-floral a-fruit b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
  "white-yueguangbai": "t-afternoon t-night a-fruit a-floral b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-low m-cozy",
  "white-lingyun-baihao": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
  "yellow-beigang-maojian": "t-morning t-afternoon a-roast a-grass b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
  "yellow-weishan-maojian": "t-morning t-afternoon a-roast a-floral b-medium k-sweet r-smoke s-hot w-quick p-meal c-mid m-cozy",
  "yellow-wenzhou-huangtang": "t-morning t-afternoon a-roast a-floral b-light k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
  "yellow-wanxi-huangdacha": "t-morning t-afternoon a-roast b-full k-grain r-clean s-hot s-milk w-quick p-meal c-mid m-cozy",
  "yellow-yuanan-luyuan": "t-morning t-afternoon a-roast a-floral b-medium k-sweet r-clean s-hot w-quick p-meal c-mid m-calm",
  "oolong-rougui": "t-afternoon t-night a-roast a-floral b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-energy",
  "oolong-shuixian": "t-afternoon t-night a-roast a-floral b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
  "oolong-dayuling": "t-morning t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-refresh",
  "oolong-shanlinxi": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-calm",
  "oolong-lishan": "t-morning t-afternoon a-fruit a-floral b-light k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-refresh",
  "oolong-huangjingui": "t-morning t-afternoon a-floral a-fruit b-medium k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-refresh",
  "oolong-benshan": "t-morning t-afternoon a-floral a-grass b-medium k-sweet r-clean s-hot w-gongfu p-meal c-mid m-calm",
  "oolong-foshou": "t-afternoon t-night a-fruit a-floral b-full k-sweet r-clean s-hot w-gongfu p-dessert c-mid m-cozy",
  "oolong-muzha-tieguanyin": "t-afternoon t-night a-roast a-fruit b-full k-sweet r-clean s-hot w-gongfu p-dessert c-high m-cozy",
  "oolong-dancong-milan": "t-afternoon t-night a-floral a-fruit b-full k-sweet r-clean s-hot w-gongfu p-dessert c-high m-cozy",
  "oolong-dancong-yashixiang": "t-afternoon t-night a-floral a-fruit b-full k-sweet r-clean s-hot w-gongfu p-dessert c-high m-energy",
  "oolong-hongshui": "t-afternoon t-night a-fruit a-roast b-full k-sweet r-clean s-hot w-gongfu p-dessert c-high m-cozy",
  "oolong-thai-doi": "t-morning t-afternoon a-floral a-grass b-light k-sweet r-clean s-hot s-iced w-gongfu p-dessert c-mid m-refresh",
  "oolong-vietnam-mocchau": "t-morning t-afternoon a-grass a-floral b-medium k-sweet r-clean s-hot s-iced w-gongfu p-meal c-mid m-refresh",
  "black-lapsang-unsmoked": "t-morning t-afternoon a-fruit a-malt b-medium k-sweet r-clean s-hot s-milk p-dessert c-mid m-cozy",
  "black-yingde": "t-morning t-afternoon a-malt a-fruit b-full k-sweet r-clean s-hot s-milk p-meal c-high m-energy",
  "black-rize": "t-morning t-afternoon a-malt b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
  "black-cameron": "t-morning t-afternoon a-malt a-roast b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
  "black-rwanda": "t-morning t-afternoon a-malt b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
  "black-dooars": "t-morning t-afternoon a-malt a-roast b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
  "black-yeongdeok": "t-morning t-afternoon a-malt a-floral b-medium k-sweet r-clean s-hot s-milk p-dessert c-mid m-cozy",
  "dark-fuzhuan": "t-afternoon t-night a-herb a-roast b-full k-grain r-clean s-hot w-gongfu p-meal c-high m-cozy",
  "dark-qianliang": "t-afternoon t-night a-herb a-roast b-full k-grain r-clean s-hot w-gongfu p-meal c-high m-cozy",
  "dark-kangzhuan": "t-afternoon t-night a-herb a-roast b-full k-grain r-clean s-hot s-milk w-gongfu p-meal c-high m-cozy",
  "dark-tibetan": "t-morning t-afternoon a-roast a-herb b-full k-grain r-clean s-hot p-meal c-high m-energy",
  "dark-laoqingzhuan": "t-afternoon t-night a-herb a-roast b-full k-grain r-clean s-hot w-gongfu p-meal c-high m-cozy",
  "dark-tianjian": "t-afternoon t-night a-herb a-roast b-full k-sweet r-clean s-hot w-gongfu p-meal c-high m-cozy",
  "blend-guihua": "t-morning t-afternoon a-floral a-fruit b-medium k-sweet r-clean s-hot w-quick p-dessert c-mid m-calm",
  "blend-rose": "t-afternoon t-night a-floral a-fruit b-medium k-sweet r-clean s-hot w-quick p-dessert c-mid m-calm",
  "blend-lychee": "t-morning t-afternoon a-fruit a-floral b-medium k-sweet r-clean s-hot s-iced p-dessert c-mid m-refresh",
  "blend-thaitea": "t-morning t-afternoon a-malt a-roast b-full k-sweet r-clean s-iced s-milk p-dessert c-high m-energy",
  "blend-moroccan-mint": "t-morning t-afternoon a-herb a-grass b-light k-sweet r-clean s-hot s-iced p-dessert c-mid m-refresh",
    "blend-irish-breakfast": "t-morning a-malt b-full k-crisp r-clean s-hot s-milk p-meal c-high m-energy",
  "herb-cassia-seed": "t-morning t-afternoon t-night a-roast a-roast b-medium k-grain r-clean s-hot p-meal c-none m-calm",
  "herb-burdock": "t-morning t-afternoon t-night a-roast a-roast b-medium k-sweet r-clean s-hot p-meal c-none m-cozy",
  "herb-gugija": "t-morning t-afternoon t-night a-fruit a-herb b-light k-sweet r-clean s-hot p-dessert c-none m-calm",
  "herb-cornus": "t-morning t-afternoon a-fruit a-herb b-medium k-crisp r-clean s-hot p-dessert c-none m-cozy",
  "herb-dandelion": "t-morning t-afternoon a-herb a-roast b-light k-crisp r-clean s-hot p-meal c-none m-refresh",
  "herb-cornsilk": "t-morning t-afternoon a-roast a-roast b-light k-sweet r-clean s-hot s-iced p-meal c-none m-refresh"
});

  /* ── 162종 실물 사진 (tea_fai_research/tea_photos_map.json) ──
     f=파일(images/teas/), m=exact|family, cr=저작자, lic=라이선스, lu=라이선스 주소, pg=원본 페이지 */
  var PHOTOS = {
  "green-longjing": {
    "f": "green-longjing.jpg",
    "m": "exact",
    "cr": "teain.ru",
    "lic": "",
    "lu": "",
    "pg": "https://teain.ru/product/chaj-kitaj/lunczzin/"
  },
  "green-biluochun": {
    "f": "green-biluochun.jpg",
    "m": "exact",
    "cr": "indonesian.alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://indonesian.alibaba.com/product-detail/early-spring-High-quality-Single-Buds-1787593731.html"
  },
  "green-maofeng": {
    "f": "green-maofeng.jpg",
    "m": "exact",
    "cr": "domtea.ru",
    "lic": "",
    "lu": "",
    "pg": "https://domtea.ru/catalog/green-tea/tproduct/490575267-572332362081-huan-shan-mao-fen-vorsistie-piki-s-zhelt"
  },
  "green-sencha": {
    "f": "green-sencha.jpg",
    "m": "exact",
    "cr": "El mosati",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:00122615-Sencha-tea-Leaves.jpg"
  },
  "green-gyokuro": {
    "f": "green-gyokuro.jpg",
    "m": "exact",
    "cr": "www.51miz.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bc84tz_z&e3Bv54AzdH3Fp7rtwgAzdH3F8mannbc_z&e3Bip4s"
  },
  "green-matcha": {
    "f": "green-matcha.jpg",
    "m": "exact",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/product-detail/High-Quality-Matcha-Powder-Smooth-Rich_1601818787592.html"
  },
  "green-jeju": {
    "f": "green-jeju.jpg",
    "m": "family",
    "cr": "Jessie csz",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Longjing_tea_15.jpg"
  },
  "white-silverneedle": {
    "f": "white-silverneedle.jpg",
    "m": "exact",
    "cr": "tealao.com",
    "lic": "",
    "lu": "",
    "pg": "https://tealao.com/ru/tea/baihao-yinzhen"
  },
  "white-peony": {
    "f": "white-peony.jpg",
    "m": "exact",
    "cr": "shop.teaworks.ru",
    "lic": "",
    "lu": "",
    "pg": "https://shop.teaworks.ru/bai-mu-dan-2026-iii/"
  },
  "white-shoumei": {
    "f": "white-shoumei.jpg",
    "m": "exact",
    "cr": "teain.ru",
    "lic": "",
    "lu": "",
    "pg": "https://teain.ru/product/chaj-kitaj/fudin-shou-mej/"
  },
  "white-aged": {
    "f": "white-aged.jpg",
    "m": "family",
    "cr": "WJ Houtman",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Meepitiya-White_tea-Silver_Tips.jpg"
  },
  "white-gongmei": {
    "f": "white-gongmei.jpg",
    "m": "exact",
    "cr": "domtea.ru",
    "lic": "",
    "lu": "",
    "pg": "https://domtea.ru/catalog/white-tea/tproduct/491302852-110871838781-gun-mei-podarochnie-brovi"
  },
  "green-luanguapian": {
    "f": "green-luanguapian.jpg",
    "m": "exact",
    "cr": "roll.sohu.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3F65ss_z&e3Bf5i7_z&e3Bv54AzdH3FwAzdH3Fb98dc8nmm_8d8bm9dm0"
  },
  "green-houkui": {
    "f": "green-houkui.jpg",
    "m": "family",
    "cr": "Difference engine",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Longjing_tea.jpg"
  },
  "green-maojian": {
    "f": "green-maojian.jpg",
    "m": "family",
    "cr": "Difference engine",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:2018_Uji_lightly_steamed_sencha.jpg"
  },
  "green-lushan": {
    "f": "green-lushan.jpg",
    "m": "exact",
    "cr": "joom.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.joom.com/ru-ua/products/65409e990f2f0b019c1f3a27"
  },
  "green-hojicha": {
    "f": "green-hojicha.jpg",
    "m": "exact",
    "cr": "Francois Mathieu",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Hojicha_Dark_Roast.jpg"
  },
  "green-genmaicha": {
    "f": "green-genmaicha.jpg",
    "m": "exact",
    "cr": "ru.teaandwhisk.com",
    "lic": "",
    "lu": "",
    "pg": "https://ru.teaandwhisk.com/collections/sale/products/77-shizuoka-royal-genmaicha-green-tea"
  },
  "green-hadong": {
    "f": "green-hadong.jpg",
    "m": "family",
    "cr": "Rama",
    "lic": "CC BY-SA 2.0 fr",
    "lu": "https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en",
    "pg": "https://commons.wikimedia.org/wiki/File:Bancha_img_0594.jpg"
  },
  "green-sejak": {
    "f": "green-sejak.jpg",
    "m": "family",
    "cr": "User:USAGI-WRP",
    "lic": "CC BY 3.0",
    "lu": "https://creativecommons.org/licenses/by/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Chakan_aracha_kesencha_yabukita_2009.jpg"
  },
  "green-jungjak": {
    "f": "green-jungjak.jpg",
    "m": "exact",
    "cr": "teamania.ch",
    "lic": "",
    "lu": "",
    "pg": "https://teamania.ch/en/green-tea/chinese-green-tea/"
  },
  "green-daejak": {
    "f": "green-daejak.jpg",
    "m": "exact",
    "cr": "steepster.com",
    "lic": "",
    "lu": "",
    "pg": "https://steepster.com/teas/what-cha/55465-korea-dong-cheon-daejak-semi-wild-green-tea"
  },
  "green-jukro": {
    "f": "green-jukro.jpg",
    "m": "family",
    "cr": "Difference engine",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:2017_Kagoshima_sencha.jpg"
  },
  "yellow-junshan": {
    "f": "yellow-junshan.jpg",
    "m": "exact",
    "cr": "shop.teaworks.ru",
    "lic": "",
    "lu": "",
    "pg": "https://shop.teaworks.ru/tsziun-shan-in-chzhen-khuan-chzhen-i/"
  },
  "yellow-mengding": {
    "f": "yellow-mengding.jpg",
    "m": "exact",
    "cr": "teatrekker.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.teatrekker.com/product/mengding-mountain-snow-buds/"
  },
  "yellow-huoshan": {
    "f": "yellow-huoshan.jpg",
    "m": "exact",
    "cr": "shop.teaworks.ru",
    "lic": "",
    "lu": "",
    "pg": "https://shop.teaworks.ru/khuan-shan-mao-fen-2025-p/"
  },
  "oolong-tieguanyin": {
    "f": "oolong-tieguanyin.jpg",
    "m": "family",
    "cr": "teajewel.com",
    "lic": "",
    "lu": "",
    "pg": "https://teajewel.com/products/hong-shui-red-water-oolong"
  },
  "oolong-dahongpao": {
    "f": "oolong-dahongpao.jpg",
    "m": "exact",
    "cr": "www.51miz.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bc84tz_z&e3Bv54AzdH3Ff5-p7rtwgAzdH3F99c9cd9_z&e3Bip4s"
  },
  "oolong-dancong": {
    "f": "oolong-dancong.jpg",
    "m": "exact",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/product-detail/Wholesale-Direct-From-Manufacturer-Phoenix-Dancong_1601702295765.html"
  },
  "oolong-dongding": {
    "f": "oolong-dongding.jpg",
    "m": "exact",
    "cr": "teain.ru",
    "lic": "",
    "lu": "",
    "pg": "https://teain.ru/product/chaj-tajvan/dundin-ulun-chen-cha/"
  },
  "oolong-alishan": {
    "f": "oolong-alishan.jpg",
    "m": "exact",
    "cr": "tealevel.ru",
    "lic": "",
    "lu": "",
    "pg": "https://tealevel.ru/oolong-about"
  },
  "oolong-beauty": {
    "f": "oolong-beauty.jpg",
    "m": "family",
    "cr": "Mx. Granger",
    "lic": "CC0",
    "lu": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "pg": "https://commons.wikimedia.org/wiki/File:Duck_shit_aroma_tea_1.jpg"
  },
  "oolong-si-ji-chun": {
    "f": "oolong-si-ji-chun.jpg",
    "m": "family",
    "cr": "Peaceeverywhere",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Huang_Jin_Gui_Tea.jpeg"
  },
  "oolong-jin-xuan": {
    "f": "oolong-jin-xuan.jpg",
    "m": "exact",
    "cr": "evergreen-teashop.de",
    "lic": "",
    "lu": "",
    "pg": "https://evergreen-teashop.de/en/blogs/tee-geschichten/der-mythos-jin-xuan-milky-oolong-warum-ist-dieser-tee-so-beliebt-bei-teeliebhabern-taiwanesischer-teesorten"
  },
  "oolong-pouchong": {
    "f": "oolong-pouchong.jpg",
    "m": "family",
    "cr": "User Iateasquirrel on en.wikipedia",
    "lic": "CC BY-SA 3.0",
    "lu": "http://creativecommons.org/licenses/by-sa/3.0/",
    "pg": "https://commons.wikimedia.org/wiki/File:Ban_Tian_Yao_Oolong_tea_leaf_close.jpg"
  },
  "black-darjeeling-first": {
    "f": "black-darjeeling-first.jpg",
    "m": "exact",
    "cr": "www.veer.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bejj6_z&e3Bv54AzdH3Fri5p5AzdH3F9nc9naldl"
  },
  "black-assam": {
    "f": "black-assam.jpg",
    "m": "exact",
    "cr": "tw.iherb.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fpo_z&e3Btij6k_z&e3Bv54AzdH3Fr6AzdH3FF65gptj6-Nwp76ws-P6517vpf-O62wgtv-Fwt6-T6w1j-Affw4-Tjw-Ttrry-G5s1jg-FOP-8m-5z-9cn-2AzdH3Fn8daa"
  },
  "black-nilgiri": {
    "f": "black-nilgiri.jpg",
    "m": "family",
    "cr": "Oraola",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Assam-mangalam.jpg"
  },
  "black-nuwaraeliya": {
    "f": "black-nuwaraeliya.jpg",
    "m": "family",
    "cr": "Brigade Piron",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Ceylon_Pettiagalla_Tea.jpg"
  },
  "black-udapussellawa": {
    "f": "black-udapussellawa.jpg",
    "m": "family",
    "cr": "Oraola",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Ceylon-amba.jpg"
  },
  "black-uva": {
    "f": "black-uva.jpg",
    "m": "family",
    "cr": "User:Iateasquirrel",
    "lic": "CC BY-SA 3.0",
    "lu": "http://creativecommons.org/licenses/by-sa/3.0/",
    "pg": "https://commons.wikimedia.org/wiki/File:Jin_Fo_Oolong_tea_leaf.jpg"
  },
  "black-dimbula": {
    "f": "black-dimbula.jpg",
    "m": "family",
    "cr": "HeroidShehu",
    "lic": "CC BY 3.0",
    "lu": "https://creativecommons.org/licenses/by/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Ceylon_tea_Leafs.JPG"
  },
  "black-sabaragamuwa": {
    "f": "black-sabaragamuwa.jpg",
    "m": "family",
    "cr": "Gogerr",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Assam_tea_(2).jpg"
  },
  "black-kandy": {
    "f": "black-kandy.jpg",
    "m": "family",
    "cr": "Oraola",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Ceylon-lumbini.jpg"
  },
  "black-ruhuna": {
    "f": "black-ruhuna.jpg",
    "m": "family",
    "cr": "Patrick Kolencherry",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Ceylon_black_tea_leaves.jpg"
  },
  "black-keemun": {
    "f": "black-keemun.jpg",
    "m": "exact",
    "cr": "Whiteness",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Keemun_FOP_(2).JPG"
  },
  "black-lapsang": {
    "f": "black-lapsang.jpg",
    "m": "exact",
    "cr": "mbd.baidu.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3F4k1_z&e3Bkwt17_z&e3Bv54AzdH3Fgjofrw2jAzdH3F1wpwAzdH3F1pswg1tg2f7rj6?gt1=1p_ca9bdbn9m98d0nbbdna"
  },
  "black-jinjunmei": {
    "f": "black-jinjunmei.jpg",
    "m": "exact",
    "cr": "<a href=\"//commons.wikimedia.org/wiki/User:Difference_engine\" title=\"User:Difference engine\">Difference engine</a>",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/",
    "pg": "https://commons.wikimedia.org/wiki/File:Jin_Jun_Mei.jpg"
  },
  "black-dianhong": {
    "f": "black-dianhong.jpg",
    "m": "exact",
    "cr": "Fumikas Sagisavas",
    "lic": "CC0",
    "lu": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "pg": "https://commons.wikimedia.org/wiki/File:Dianhong-Jinluo_tea.jpg"
  },
  "blend-masala": {
    "f": "blend-masala.jpg",
    "m": "exact",
    "cr": "smithtea.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.smithtea.com/collections/subscribe-and-save/products/masala-chai"
  },
  "black-sikkim": {
    "f": "black-sikkim.jpg",
    "m": "family",
    "cr": "No machine-readable author provided. Green assumed (based on copyright claims).",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Bancha_tea_yoshino-nikkan.jpg"
  },
  "black-nepal": {
    "f": "black-nepal.jpg",
    "m": "exact",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/product-detail/FRESH-2024-BPS-BLACK-TEA-ORTHODOX_10000015101147.html"
  },
  "black-kenya": {
    "f": "black-kenya.jpg",
    "m": "exact",
    "cr": "oregoncoffeeandtea.com",
    "lic": "",
    "lu": "",
    "pg": "https://oregoncoffeeandtea.com/shop-1-black-teas/golden-dragon"
  },
  "black-jaksal": {
    "f": "black-jaksal.jpg",
    "m": "exact",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/product-detail/Famous-Chinese-tea-High-grade-rock_11000017686670.html"
  },
  "black-ruby18": {
    "f": "black-ruby18.jpg",
    "m": "family",
    "cr": "tbvl.ru",
    "lic": "",
    "lu": "",
    "pg": "https://tbvl.ru/tao/124360005/17890754881.html"
  },
  "dark-sheng": {
    "f": "dark-sheng.jpg",
    "m": "family",
    "cr": "Jason Fasi.",
    "lic": "CC BY 2.5",
    "lu": "https://creativecommons.org/licenses/by/2.5",
    "pg": "https://commons.wikimedia.org/wiki/File:Haiwan_bingcha.jpg"
  },
  "dark-shou": {
    "f": "dark-shou.jpg",
    "m": "exact",
    "cr": "britishtea.com",
    "lic": "",
    "lu": "",
    "pg": "https://britishtea.com/en-au/collections/organic-pu-erh/products/organic-pu-erh"
  },
  "dark-anhua": {
    "f": "dark-anhua.jpg",
    "m": "family",
    "cr": "ru.teaandwhisk.com",
    "lic": "",
    "lu": "",
    "pg": "https://ru.teaandwhisk.com/collections/pu-erh-and-hei-cha/products/2006-mini-brick-shou-puerh"
  },
  "dark-liubao": {
    "f": "dark-liubao.jpg",
    "m": "exact",
    "cr": "detail.youzan.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3F1jpwts_z&e3By57zwg_z&e3Bv54AzdH3Ffi5oAzdH3F2551f?u654_f576vj=2k5x_fj5&wstwf=dxkt323pfics40l"
  },
  "dark-cheongtaejeon": {
    "f": "dark-cheongtaejeon.jpg",
    "m": "exact",
    "cr": "thetea.ua",
    "lic": "",
    "lu": "",
    "pg": "https://thetea.ua/ru/product/portsiynyy-shu-puer-puerna-krykhta-mini-tocha-5-h"
  },
  "blend-earlgrey": {
    "f": "blend-earlgrey.jpg",
    "m": "exact",
    "cr": "WJ Houtman",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Earl_Grey_FBOP-Wilson_Ceylon_Teas.jpg"
  },
  "blend-ladygrey": {
    "f": "blend-ladygrey.jpg",
    "m": "exact",
    "cr": "commons.wikimedia.org",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "blend-englishbreakfast": {
    "f": "blend-englishbreakfast.jpg",
    "m": "family",
    "cr": "soultea.de/André Helbig",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Assam-Tee_SFTGFOP1.jpg"
  },
    "blend-jasmine": {
    "f": "blend-jasmine.jpg",
    "m": "exact",
    "cr": "Fumikas Sagisavas",
    "lic": "CC0",
    "lu": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "pg": "https://commons.wikimedia.org/wiki/File:Dried_jasmine_tea.jpg"
  },
  "blend-hongkong": {
    "f": "blend-hongkong.jpg",
    "m": "exact",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/product-detail/Chinese-black-tea-Leaves-Loose-Bulk_1600795782252.html"
  },
  "fruit-daechu": {
    "f": "fruit-daechu.jpg",
    "m": "family",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/product-detail/2021-Superfood-Certified-Organic-Dry-Red_1600162046351.html"
  },
  "herb-ginger": {
    "f": "herb-ginger.jpg",
    "m": "exact",
    "cr": "commons.wikimedia.org",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "fruit-yuja": {
    "f": "fruit-yuja.jpg",
    "m": "exact",
    "cr": "wellingtonbakehouse.com",
    "lic": "",
    "lu": "",
    "pg": "https://wellingtonbakehouse.com/2018/05/31/candied-yuzu-peel/"
  },
  "fruit-omija": {
    "f": "fruit-omija.jpg",
    "m": "exact",
    "cr": "Korea.net",
    "lic": "CC BY-SA 2.0",
    "lu": "https://creativecommons.org/licenses/by-sa/2.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Schisandra_sinensis_dried_berries.jpg"
  },
  "herb-ssanghwa": {
    "f": "herb-ssanghwa.jpg",
    "m": "family",
    "cr": "Alina Zienowicz Ala z",
    "lic": "CC BY-SA 3.0",
    "lu": "http://creativecommons.org/licenses/by-sa/3.0/",
    "pg": "https://commons.wikimedia.org/wiki/File:Herb_001.JPG"
  },
  "herb-dunggulle": {
    "f": "herb-dunggulle.jpg",
    "m": "exact",
    "cr": "zybb.njucm.edu.cn",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fzykk_z&e3Bg37v4_z&e3Bj17_z&e3BvgAzdH3F4AzdH3Fyw5vwt_tgu5_z&e3Bwfr?7gt1=9ma"
  },
  "herb-buckwheat": {
    "f": "herb-buckwheat.jpg",
    "m": "exact",
    "cr": "www.veer.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bejj6_z&e3Bv54AzdH3Fri5p5AzdH3F90n8lbcbc_z&e3Bip4s"
  },
  "herb-barley": {
    "f": "herb-barley.jpg",
    "m": "exact",
    "cr": "www.veer.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bejj6_z&e3Bv54AzdH3Fri5p5AzdH3F9ncb0l98c"
  },
  "herb-brownrice": {
    "f": "herb-brownrice.jpg",
    "m": "exact",
    "cr": "baijiahao.baidu.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fkwt3twiw5_z&e3Bkwt17_z&e3Bv54AzdH3Ff?t1=8b9nn990anb8cdc98d8&ou6=frt1j6&u56=rv"
  },
  "herb-persimmon": {
    "f": "herb-persimmon.jpg",
    "m": "exact",
    "cr": "lapsangstore.com",
    "lic": "",
    "lu": "",
    "pg": "https://lapsangstore.com/ja/pages/tea-origin-hunan"
  },
  "herb-mulberry": {
    "f": "herb-mulberry.jpg",
    "m": "exact",
    "cr": "François Nguyen",
    "lic": "CC BY 2.0",
    "lu": "https://creativecommons.org/licenses/by/2.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Dried_mulberry_leaves.jpg"
  },
  "herb-lotus": {
    "f": "herb-lotus.jpg",
    "m": "exact",
    "cr": "Fumikas Sagisavas",
    "lic": "CC0",
    "lu": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "pg": "https://commons.wikimedia.org/wiki/File:Dried_lotus_leaf_tea.jpg"
  },
  "herb-balloonflower": {
    "f": "herb-balloonflower.jpg",
    "m": "exact",
    "cr": "commons.wikimedia.org",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "herb-mugwort": {
    "f": "herb-mugwort.jpg",
    "m": "exact",
    "cr": "xoteas.com.au",
    "lic": "",
    "lu": "",
    "pg": "https://xoteas.com.au/product/mugwort-tea-certified-organic/"
  },
  "herb-tteokcha": {
    "f": "herb-tteokcha.jpg",
    "m": "exact",
    "cr": "taooftea.com",
    "lic": "",
    "lu": "",
    "pg": "https://taooftea.com/product/2011-burma-border-sheng/"
  },
  "herb-chamomile": {
    "f": "herb-chamomile.jpg",
    "m": "exact",
    "cr": "es.valleyoftea.com",
    "lic": "",
    "lu": "",
    "pg": "https://es.valleyoftea.com/collections/italian-cuisine-1"
  },
  "herb-peppermint": {
    "f": "herb-peppermint.jpg",
    "m": "exact",
    "cr": "www.hellorf.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bijss56u_z&e3Bv54AzdH3Ft4w2jAzdH3Ffi5oAzdH3F809ammb8dm"
  },
  "herb-hibiscus": {
    "f": "herb-hibiscus.jpg",
    "m": "family",
    "cr": "heavenlytealeaves.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.heavenlytealeaves.com/collections/recommended-products-seguno/products/hibiscus-herbal-tea"
  },
  "herb-rooibos": {
    "f": "herb-rooibos.jpg",
    "m": "exact",
    "cr": "porterhill.co.uk",
    "lic": "",
    "lu": "",
    "pg": "https://porterhill.co.uk/products/fruit-rooibos"
  },
  "herb-mate": {
    "f": "herb-mate.jpg",
    "m": "exact",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/product-detail/Vanilla-chocolate-black-tea-dried-fruit_1601029817132.html"
  },
  "herb-lavender": {
    "f": "herb-lavender.jpg",
    "m": "exact",
    "cr": "mbd.baidu.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3F4k1_z&e3Bkwt17_z&e3Bv54AzdH3Fgjofrw2jAzdH3F1wpwAzdH3F1pswg1tg2f7rj6?gt1=1p_90dc0l8mbmbmanc0cam"
  },
  "herb-lemongrass": {
    "f": "herb-lemongrass.jpg",
    "m": "exact",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/product-detail/Premium-Quality-Spring-Tea-China-Famous_1601115000185.html"
  },
  "herb-chrysanthemum": {
    "f": "herb-chrysanthemum.jpg",
    "m": "exact",
    "cr": "www.tradewheel.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bp6w1joijjs_z&e3Bv54AzdH3Fv5AzdH3F27wg2xt-tgg5e-sp1-88nccclAzdH3F"
  },
  "fruit-mogwa": {
    "f": "fruit-mogwa.jpg",
    "m": "exact",
    "cr": "redmall.ru",
    "lic": "",
    "lu": "",
    "pg": "https://redmall.ru/taobao/dlya-zdorovya/produkti-pitaniya/dobavki-k-blyudam/myaso-kategoriya-suhoyi-tovari/sushenie-produkti/drugie-sushenie-produkti/_l093275496844.html"
  },
  "green-zhuyeqing": {
    "f": "green-zhuyeqing.jpg",
    "m": "family",
    "cr": "othertea.ru",
    "lic": "",
    "lu": "",
    "pg": "https://othertea.ru/chaj/japonskij-chaj/japonskij-chaj-hodzicha"
  },
  "green-enshi-yulu": {
    "f": "green-enshi-yulu.jpg",
    "m": "exact",
    "cr": "www.51miz.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bc84tz_z&e3Bv54AzdH3Ff5-f7vwtAzdH3F99ndb8cAzdH3Fr_caAzdH3F"
  },
  "oolong-jasmine":   {
    "f": "oolong-jasmine.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-assam":   {
    "f": "oolong-assam.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-ceylon":   {
    "f": "oolong-ceylon.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-ruby":   {
    "f": "oolong-ruby.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-jeju":   {
    "f": "oolong-jeju.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-cheong":   {
    "f": "oolong-cheong.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "black-chuanhong":   {
    "f": "black-chuanhong.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "black-yixing":   {
    "f": "black-yixing.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "black-jiuqu":   {
    "f": "black-jiuqu.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "black-mizhuan":   {
    "f": "black-mizhuan.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "black-hongyun":   {
    "f": "black-hongyun.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "black-ziya":   {
    "f": "black-ziya.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-huangzhi":   {
    "f": "oolong-dancong-huangzhi.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-xingren":   {
    "f": "oolong-dancong-xingren.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-rougui":   {
    "f": "oolong-dancong-rougui.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-guihua":   {
    "f": "oolong-dancong-guihua.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-zhilan":   {
    "f": "oolong-dancong-zhilan.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-yelai":   {
    "f": "oolong-dancong-yelai.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-tongtian":   {
    "f": "oolong-dancong-tongtian.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-youhua":   {
    "f": "oolong-dancong-youhua.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-songzhong":   {
    "f": "oolong-dancong-songzhong.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-baxian":   {
    "f": "oolong-dancong-baxian.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-dancong-dawuye":   {
    "f": "oolong-dancong-dawuye.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-qilai":   {
    "f": "oolong-qilai.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-honey":   {
    "f": "oolong-honey.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-red":   {
    "f": "oolong-red.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-qilan":   {
    "f": "oolong-qilan.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-meizhan":   {
    "f": "oolong-meizhan.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-tieluohan":   {
    "f": "oolong-tieluohan.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-baijiguan":   {
    "f": "oolong-baijiguan.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-shuijingui":   {
    "f": "oolong-shuijingui.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-bantianyao":   {
    "f": "oolong-bantianyao.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-zhangping":   {
    "f": "oolong-zhangping.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-yunnan":   {
    "f": "oolong-yunnan.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "oolong-darjeeling":   {
    "f": "oolong-darjeeling.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "green-chunseol":   {
    "f": "green-chunseol.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
    "green-tencha":   {
    "f": "green-tencha.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "green-funmatsu":   {
    "f": "green-funmatsu.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "green-konacha":   {
    "f": "green-konacha.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "green-eunjeong":   {
    "f": "green-eunjeong.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "white-darjeeling":   {
    "f": "white-darjeeling.jpg",
    "m": "family",
    "cr": "",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "green-anji-baipian": {
    "f": "green-anji-baipian.jpg",
    "m": "exact",
    "cr": "fineteachina.com",
    "lic": "",
    "lu": "",
    "pg": "https://fineteachina.com/product/anji-bai-cha-a/"
  },
  "green-gougunao": {
    "f": "green-gougunao.jpg",
    "m": "exact",
    "cr": "baijiahao.baidu.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fkwt3twiw5_z&e3Bkwt17_z&e3Bv54AzdH3Ff?t1=8bdcda0md9cc8dnb9cn&ou6=frt1j6&u56=rv"
  },
  "green-wuyuan-mingmei": {
    "f": "green-wuyuan-mingmei.jpg",
    "m": "family",
    "cr": "François Nguyen",
    "lic": "CC BY 2.0",
    "lu": "https://creativecommons.org/licenses/by/2.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Longjing_tea_(dried).jpg"
  },
  "green-mengding-ganlu": {
    "f": "green-mengding-ganlu.jpg",
    "m": "exact",
    "cr": "loopteas.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.loopteas.com/sipology-blooming-tea/"
  },
  "green-hanzhong-xianhao": {
    "f": "green-hanzhong-xianhao.jpg",
    "m": "exact",
    "cr": "commons.wikimedia.org",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "green-huiming": {
    "f": "green-huiming.jpg",
    "m": "family",
    "cr": "Benoy",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Darjeeling_Oolong_Tea.jpg"
  },
  "green-boseong": {
    "f": "green-boseong.jpg",
    "m": "exact",
    "cr": "russian.alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://russian.alibaba.com/product-detail/China-Manufacturer-Good-Quality-Jasmine-Green-1600588553575.html"
  },
  "green-sanxia-biluochun": {
    "f": "green-sanxia-biluochun.jpg",
    "m": "family",
    "cr": "Handmade Ming Qian Dong Ting East Mountain Bi Luo Chun Green Tea",
    "lic": "",
    "lu": "",
    "pg": "https://www.teavivre.com/tea/ming-qian-dong-ting-bi-luo-chun-green-tea.html"
  },
  "green-kabusecha": {
    "f": "green-kabusecha.jpg",
    "m": "exact",
    "cr": "oldteashop.fi",
    "lic": "",
    "lu": "",
    "pg": "https://oldteashop.fi/en/products/kabusecha-asuka-luomu-25-g-vihrea-tee"
  },
  "green-kamairicha": {
    "f": "green-kamairicha.jpg",
    "m": "exact",
    "cr": "teegschwendner.de",
    "lic": "",
    "lu": "",
    "pg": "https://www.teegschwendner.de/en/Japan-Kamairicha-organic/100719"
  },
  "green-dafo-longjing": {
    "f": "green-dafo-longjing.jpg",
    "m": "family",
    "cr": "http://www.chah.co.uk",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Dragon_Well_A.jpg"
  },
  "green-laoshan": {
    "f": "green-laoshan.jpg",
    "m": "exact",
    "cr": "commons.wikimedia.org",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "white-xingongyi": {
    "f": "white-xingongyi.jpg",
    "m": "family",
    "cr": "Pannet",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:%D0%91%D0%B0%D0%B9%D1%85%D0%B0%D0%BE_%D0%98%D0%BD%D1%8C%D1%87%D0%B6%D1%8D%D0%BD%D1%8C.jpg"
  },
  "white-yueguangbai": {
    "f": "white-yueguangbai.jpg",
    "m": "exact",
    "cr": "curioustea.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.curioustea.com/tea/white-tea/yue-guang-bai-white-moonlight/"
  },
  "white-lingyun-baihao": {
    "f": "white-lingyun-baihao.jpg",
    "m": "exact",
    "cr": "tdragon.ru",
    "lic": "",
    "lu": "",
    "pg": "https://tdragon.ru/white_tea"
  },
  "yellow-beigang-maojian": {
    "f": "yellow-beigang-maojian.jpg",
    "m": "family",
    "cr": "Huoshan Huangya tea leaves.jpg",
    "lic": "CC BY-SA 3.0",
    "lu": "http://creativecommons.org/licenses/by-sa/3.0/",
    "pg": "https://commons.wikimedia.org/wiki/File:Huoshan_Huangya_tea_leaves.jpg"
  },
  "yellow-weishan-maojian": {
    "f": "yellow-weishan-maojian.jpg",
    "m": "family",
    "cr": "Whiteness",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Yellow-Tea-Hunan_(1).JPG"
  },
  "yellow-wenzhou-huangtang": {
    "f": "yellow-wenzhou-huangtang.jpg",
    "m": "family",
    "cr": "Whiteness",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Yellow-Tea-Hunan_(2).JPG"
  },
  "yellow-wanxi-huangdacha": {
    "f": "yellow-wanxi-huangdacha.jpg",
    "m": "family",
    "cr": "Vypij.cz",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Huo_Shan_Huang_Ya_-_%C5%BElut%C3%BD_%C4%8Daj.jpg"
  },
  "yellow-yuanan-luyuan": {
    "f": "yellow-yuanan-luyuan.jpg",
    "m": "family",
    "cr": "Commonsenses at Japanese Wikipedia",
    "lic": "CC BY-SA 3.0",
    "lu": "http://creativecommons.org/licenses/by-sa/3.0/",
    "pg": "https://commons.wikimedia.org/wiki/File:Kunzanginshin(1).jpg"
  },
  "oolong-rougui": {
    "f": "oolong-rougui.jpg",
    "m": "family",
    "cr": "globalteahut.org",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3F2s5kwspjwi7p_z&e3B562AzdH3Fv5ssjvpt5gfAzdH3Fgjo-pjw-pjwow6jAzdH3Fr6517vpfAzdH3Fiwsvy5g"
  },
  "oolong-shuixian": {
    "f": "oolong-shuixian.jpg",
    "m": "family",
    "cr": "User Iateasquirrel on en.wikipedia",
    "lic": "CC BY-SA 3.0",
    "lu": "http://creativecommons.org/licenses/by-sa/3.0/",
    "pg": "https://commons.wikimedia.org/wiki/File:Ban_Tian_Yao_Oolong_tea_leaf.jpg"
  },
  "oolong-dayuling": {
    "f": "oolong-dayuling.jpg",
    "m": "family",
    "cr": "Iateasquirrel at English Wikipedia",
    "lic": "CC BY-SA 3.0",
    "lu": "http://creativecommons.org/licenses/by-sa/3.0/",
    "pg": "https://commons.wikimedia.org/wiki/File:HGY_Oolong_tea_leaf_close.jpg"
  },
  "oolong-shanlinxi": {
    "f": "oolong-shanlinxi.jpg",
    "m": "family",
    "cr": "David Spáčil",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Tieguanyin3.jpg"
  },
  "oolong-lishan": {
    "f": "oolong-lishan.jpg",
    "m": "family",
    "cr": "Francesc Fort",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:T%C3%A9_Tieguanyin.jpg"
  },
  "oolong-huangjingui": {
    "f": "oolong-huangjingui.jpg",
    "m": "exact",
    "cr": "curioustea.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.curioustea.com/tea/oolong-tea/huang-jin-gui-golden-osmanthus-oolong/"
  },
  "oolong-benshan": {
    "f": "oolong-benshan.jpg",
    "m": "family",
    "cr": "Iateasquirrel at English Wikipedia",
    "lic": "CC BY-SA 3.0",
    "lu": "http://creativecommons.org/licenses/by-sa/3.0/",
    "pg": "https://commons.wikimedia.org/wiki/File:Fo_Shou_Oolong_tea_leaf.jpg"
  },
  "oolong-foshou": {
    "f": "oolong-foshou.jpg",
    "m": "exact",
    "cr": "teamania.ch",
    "lic": "",
    "lu": "",
    "pg": "https://teamania.ch/en/fo-shou/"
  },
  "oolong-muzha-tieguanyin": {
    "f": "oolong-muzha-tieguanyin.jpg",
    "m": "exact",
    "cr": "curioustea.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.curioustea.com/tea/oolong-tea/muzha-tie-guan-yin-oolong/"
  },
  "oolong-dancong-milan": {
    "f": "oolong-dancong-milan.jpg",
    "m": "exact",
    "cr": "teasenz.eu",
    "lic": "",
    "lu": "",
    "pg": "https://teasenz.eu/collections/chinese-tea"
  },
  "oolong-dancong-yashixiang": {
    "f": "oolong-dancong-yashixiang.jpg",
    "m": "exact",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/product-detail/_1600588583359.html"
  },
  "oolong-hongshui": {
    "f": "oolong-hongshui.jpg",
    "m": "exact",
    "cr": "tearoma.ee",
    "lic": "",
    "lu": "",
    "pg": "https://tearoma.ee/et/product/shui-xian"
  },
  "oolong-thai-doi": {
    "f": "oolong-thai-doi.jpg",
    "m": "exact",
    "cr": "krasnoyarsk.domcoffee.ru",
    "lic": "",
    "lu": "",
    "pg": "https://www.krasnoyarsk.domcoffee.ru/catalog/chay/travyanoy/chay_ronnefeldt_teastar_mae_salong_oolong_mae_salong_oolong_100_g/"
  },
  "oolong-vietnam-mocchau": {
    "f": "oolong-vietnam-mocchau.jpg",
    "m": "exact",
    "cr": "curioustea.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.curioustea.com/tea/oolong-tea/moc-chau-green-heart-oolong/"
  },
  "black-lapsang-unsmoked": {
    "f": "black-lapsang-unsmoked.jpg",
    "m": "family",
    "cr": "Mx. Granger",
    "lic": "CC0",
    "lu": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "pg": "https://commons.wikimedia.org/wiki/File:Duck_shit_aroma_tea_2.jpg"
  },
  "black-yingde": {
    "f": "black-yingde.jpg",
    "m": "exact",
    "cr": "domtea.ru",
    "lic": "",
    "lu": "",
    "pg": "https://domtea.ru/catalog/red-tea/tproduct/491303244-323700043461-dyan-hun-krasnii-chai-iz-yunnani"
  },
  "black-rize": {
    "f": "black-rize.jpg",
    "m": "family",
    "cr": "USAGI-WRP",
    "lic": "CC BY 3.0",
    "lu": "https://creativecommons.org/licenses/by/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Assam_CTC_Hanamizuki_2009.JPG"
  },
  "black-cameron": {
    "f": "black-cameron.jpg",
    "m": "exact",
    "cr": "nutsaboutlife.com.au",
    "lic": "",
    "lu": "",
    "pg": "https://www.nutsaboutlife.com.au/collections/all/products/organic-black-tea"
  },
  "black-rwanda": {
    "f": "black-rwanda.jpg",
    "m": "exact",
    "cr": "zdrowesmaczki.pl",
    "lic": "",
    "lu": "",
    "pg": "https://zdrowesmaczki.pl/en_US/p/Black-tea-Rwanda-OP-100g-Bio-Flavo/364"
  },
  "black-dooars": {
    "f": "black-dooars.jpg",
    "m": "family",
    "cr": "Oraola",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Assam-hajua.jpg"
  },
  "black-yeongdeok": {
    "f": "black-yeongdeok.jpg",
    "m": "exact",
    "cr": "alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "https://www.alibaba.com/showroom/black-tea-pakistan.html"
  },
  "dark-fuzhuan": {
    "f": "dark-fuzhuan.jpg",
    "m": "exact",
    "cr": "Kasuga",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Anhua_Fuzhuan_Fermented_Tea.jpg"
  },
  "dark-qianliang": {
    "f": "dark-qianliang.jpg",
    "m": "family",
    "cr": "xgtea.shop",
    "lic": "",
    "lu": "",
    "pg": "https://xgtea.shop/products/2005-xiaguan-ye-sheng-tuo-raw-pu-erh-tea"
  },
  "dark-kangzhuan": {
    "f": "dark-kangzhuan.jpg",
    "m": "family",
    "cr": "Atoutibet",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Briques_de_th%C3%A9_tib%C3%A9tain.jpg"
  },
  "dark-tibetan": {
    "f": "dark-tibetan.jpg",
    "m": "family",
    "cr": "Jason Fasi.",
    "lic": "CC BY-SA 2.5",
    "lu": "https://creativecommons.org/licenses/by-sa/2.5",
    "pg": "https://commons.wikimedia.org/wiki/File:Fang_cha.jpg"
  },
  "dark-laoqingzhuan": {
    "f": "dark-laoqingzhuan.jpg",
    "m": "exact",
    "cr": "commons.wikimedia.org",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "dark-tianjian": {
    "f": "dark-tianjian.jpg",
    "m": "family",
    "cr": "No machine-readable author provided. WildBoar assumed (based on copyright claims).",
    "lic": "Public domain",
    "lu": "",
    "pg": "https://commons.wikimedia.org/wiki/File:BergeniaDriedLeaves.jpg"
  },
  "blend-guihua": {
    "f": "blend-guihua.jpg",
    "m": "exact",
    "cr": "joom.ru",
    "lic": "",
    "lu": "",
    "pg": "https://www.joom.ru/ru/products/60754e2e2f5898017cec5767"
  },
  "blend-rose": {
    "f": "blend-rose.jpg",
    "m": "exact",
    "cr": "www.51miz.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bc84tz_z&e3Bv54AzdH3Ff5-f7vwtAzdH3Fdb8dmddAzdH3Fr_8AzdH3F"
  },
  "blend-lychee": {
    "f": "blend-lychee.jpg",
    "m": "family",
    "cr": "PanShiBo",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Black_Tea_sold_in_JianYang.JPG"
  },
  "blend-thaitea": {
    "f": "blend-thaitea.jpg",
    "m": "family",
    "cr": "Naresh.limbu at English Wikipedia",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:CTC_tea.jpg"
  },
  "blend-moroccan-mint": {
    "f": "blend-moroccan-mint.jpg",
    "m": "exact",
    "cr": "Fumikas Sagisavas",
    "lic": "CC0",
    "lu": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "pg": "https://commons.wikimedia.org/wiki/File:Dried_mint_leaves_tea.jpg"
  },
    "blend-irish-breakfast": {
    "f": "blend-irish-breakfast.jpg",
    "m": "family",
    "cr": "Gogerr",
    "lic": "CC BY-SA 4.0",
    "lu": "https://creativecommons.org/licenses/by-sa/4.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Assam_tea_(3).jpg"
  },
  "herb-cassia-seed": {
    "f": "herb-cassia-seed.jpg",
    "m": "exact",
    "cr": "Fumikas Sagisavas",
    "lic": "CC0",
    "lu": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "pg": "https://commons.wikimedia.org/wiki/File:Cassia_seed_(20240131).jpg"
  },
  "herb-burdock": {
    "f": "herb-burdock.jpg",
    "m": "exact",
    "cr": "www.alibaba.com",
    "lic": "",
    "lu": "",
    "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3Bwstkwkw_z&e3Bv54AzdH3Fr6517vp-1jpwtsAzdH3Fit2i-q7wstpy-16tj1-655p-k7615vh-655p_8maadl9nldddb_z&e3Bip4s"
  },
  "herb-gugija": {
    "f": "herb-gugija.jpg",
    "m": "exact",
    "cr": "GiryaGirl",
    "lic": "CC BY-SA 3.0",
    "lu": "https://creativecommons.org/licenses/by-sa/3.0",
    "pg": "https://commons.wikimedia.org/wiki/File:Goji_Berries.jpg"
  },
  "herb-cornus": {
    "f": "herb-cornus.jpg",
    "m": "exact",
    "cr": "commons.wikimedia.org",
    "lic": "",
    "lu": "",
    "pg": ""
  },
  "herb-dandelion": {
    "f": "herb-dandelion.jpg",
    "m": "exact",
    "cr": "Fumikas Sagisavas",
    "lic": "CC0",
    "lu": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "pg": "https://commons.wikimedia.org/wiki/File:Dandelion_leaf_tea.jpg"
  },
  "herb-cornsilk": {
    "f": "herb-cornsilk.jpg",
    "m": "exact",
    "cr": "The original uploader was Pollinator at English Wikipedia.",
    "lic": "CC BY-SA 3.0",
    "lu": "http://creativecommons.org/licenses/by-sa/3.0/",
    "pg": "https://commons.wikimedia.org/wiki/File:Cornsilk_7091.jpg"
  }
};

  /* ── 162종 원산지 국가 ── */
  var ORIGIN = {
  "green-longjing": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-biluochun": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-maofeng": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-sencha": {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-gyokuro": {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-matcha": {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-jeju": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "white-silverneedle": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "white-peony": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "white-shoumei": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "white-aged": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "white-gongmei": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-luanguapian": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-houkui": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-maojian": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-lushan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-hojicha": {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-genmaicha": {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-hadong": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "green-sejak": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "green-jungjak": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "green-daejak": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "green-jukro": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "yellow-junshan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "yellow-mengding": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "yellow-huoshan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-tieguanyin": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dahongpao": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dongding": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-alishan": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-beauty": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-si-ji-chun": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-jin-xuan": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-pouchong": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "black-darjeeling-first": {
    "ko": "인도",
    "en": "India",
    "zh-CN": "印度",
    "zh-TW": "印度",
    "yue": "印度",
    "ja": "インド",
    "code": "in"
  },
  "black-assam": {
    "ko": "인도",
    "en": "India",
    "zh-CN": "印度",
    "zh-TW": "印度",
    "yue": "印度",
    "ja": "インド",
    "code": "in"
  },
  "black-nilgiri": {
    "ko": "인도",
    "en": "India",
    "zh-CN": "印度",
    "zh-TW": "印度",
    "yue": "印度",
    "ja": "インド",
    "code": "in"
  },
  "black-nuwaraeliya": {
    "ko": "스리랑카",
    "en": "Sri Lanka",
    "zh-CN": "斯里兰卡",
    "zh-TW": "斯里蘭卡",
    "yue": "斯里蘭卡",
    "ja": "スリランカ",
    "code": "lk"
  },
  "black-udapussellawa": {
    "ko": "스리랑카",
    "en": "Sri Lanka",
    "zh-CN": "斯里兰卡",
    "zh-TW": "斯里蘭卡",
    "yue": "斯里蘭卡",
    "ja": "スリランカ",
    "code": "lk"
  },
  "black-uva": {
    "ko": "스리랑카",
    "en": "Sri Lanka",
    "zh-CN": "斯里兰卡",
    "zh-TW": "斯里蘭卡",
    "yue": "斯里蘭卡",
    "ja": "スリランカ",
    "code": "lk"
  },
  "black-dimbula": {
    "ko": "스리랑카",
    "en": "Sri Lanka",
    "zh-CN": "斯里兰卡",
    "zh-TW": "斯里蘭卡",
    "yue": "斯里蘭卡",
    "ja": "スリランカ",
    "code": "lk"
  },
  "black-sabaragamuwa": {
    "ko": "스리랑카",
    "en": "Sri Lanka",
    "zh-CN": "斯里兰卡",
    "zh-TW": "斯里蘭卡",
    "yue": "斯里蘭卡",
    "ja": "スリランカ",
    "code": "lk"
  },
  "black-kandy": {
    "ko": "스리랑카",
    "en": "Sri Lanka",
    "zh-CN": "斯里兰卡",
    "zh-TW": "斯里蘭卡",
    "yue": "斯里蘭卡",
    "ja": "スリランカ",
    "code": "lk"
  },
  "black-ruhuna": {
    "ko": "스리랑카",
    "en": "Sri Lanka",
    "zh-CN": "斯里兰卡",
    "zh-TW": "斯里蘭卡",
    "yue": "斯里蘭卡",
    "ja": "スリランカ",
    "code": "lk"
  },
  "black-keemun": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "black-lapsang": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "black-jinjunmei": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "black-dianhong": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "blend-masala": {
    "ko": "인도",
    "en": "India",
    "zh-CN": "印度",
    "zh-TW": "印度",
    "yue": "印度",
    "ja": "インド",
    "code": "in"
  },
  "black-sikkim": {
    "ko": "인도",
    "en": "India",
    "zh-CN": "印度",
    "zh-TW": "印度",
    "yue": "印度",
    "ja": "インド",
    "code": "in"
  },
  "black-nepal": {
    "ko": "네팔",
    "en": "Nepal",
    "zh-CN": "尼泊尔",
    "zh-TW": "尼泊爾",
    "yue": "尼泊爾",
    "ja": "ネパール",
    "code": "np"
  },
  "black-kenya": {
    "ko": "케냐",
    "en": "Kenya",
    "zh-CN": "肯尼亚",
    "zh-TW": "肯亞",
    "yue": "肯雅",
    "ja": "ケニア",
    "code": "ke"
  },
  "black-jaksal": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "black-ruby18": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "dark-sheng": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "dark-shou": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "dark-anhua": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "dark-liubao": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "dark-cheongtaejeon": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "blend-earlgrey": {
    "ko": "영국",
    "en": "United Kingdom",
    "zh-CN": "英国",
    "zh-TW": "英國",
    "yue": "英國",
    "ja": "イギリス",
    "code": "uk"
  },
  "blend-ladygrey": {
    "ko": "영국",
    "en": "United Kingdom",
    "zh-CN": "英国",
    "zh-TW": "英國",
    "yue": "英國",
    "ja": "イギリス",
    "code": "uk"
  },
  "blend-englishbreakfast": {
    "ko": "영국",
    "en": "United Kingdom",
    "zh-CN": "英国",
    "zh-TW": "英國",
    "yue": "英國",
    "ja": "イギリス",
    "code": "uk"
  },
    "blend-jasmine": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "blend-hongkong": {
    "ko": "홍콩",
    "en": "Hong Kong",
    "zh-CN": "香港",
    "zh-TW": "香港",
    "yue": "香港",
    "ja": "香港",
    "code": "hk"
  },
  "fruit-daechu": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-ginger": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "fruit-yuja": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "fruit-omija": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-ssanghwa": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-dunggulle": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-buckwheat": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-barley": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-brownrice": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-persimmon": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-mulberry": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-lotus": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-balloonflower": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-mugwort": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-tteokcha": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-chamomile": {
    "ko": "이집트",
    "en": "Egypt",
    "zh-CN": "埃及",
    "zh-TW": "埃及",
    "yue": "埃及",
    "ja": "エジプト",
    "code": "eg"
  },
  "herb-peppermint": {
    "ko": "영국",
    "en": "United Kingdom",
    "zh-CN": "英国",
    "zh-TW": "英國",
    "yue": "英國",
    "ja": "イギリス",
    "code": "uk"
  },
  "herb-hibiscus": {
    "ko": "수단",
    "en": "Sudan",
    "zh-CN": "苏丹",
    "zh-TW": "蘇丹",
    "yue": "蘇丹",
    "ja": "スーダン",
    "code": "sd"
  },
  "herb-rooibos": {
    "ko": "남아프리카공화국",
    "en": "South Africa",
    "zh-CN": "南非",
    "zh-TW": "南非",
    "yue": "南非",
    "ja": "南アフリカ",
    "code": "za"
  },
  "herb-mate": {
    "ko": "아르헨티나",
    "en": "Argentina",
    "zh-CN": "阿根廷",
    "zh-TW": "阿根廷",
    "yue": "阿根廷",
    "ja": "アルゼンチン",
    "code": "ar"
  },
  "herb-lavender": {
    "ko": "프랑스",
    "en": "France",
    "zh-CN": "法国",
    "zh-TW": "法國",
    "yue": "法國",
    "ja": "フランス",
    "code": "fr"
  },
  "herb-lemongrass": {
    "ko": "태국",
    "en": "Thailand",
    "zh-CN": "泰国",
    "zh-TW": "泰國",
    "yue": "泰國",
    "ja": "タイ",
    "code": "th"
  },
  "herb-chrysanthemum": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "fruit-mogwa": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "green-zhuyeqing": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-enshi-yulu": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-jasmine":   {
    "code": "tw",
    "en": "Taiwan",
    "ja": "台湾",
    "ko": "대만",
    "yue": "台灣",
    "zh-CN": "台湾",
    "zh-TW": "台灣"
  },
  "oolong-assam":   {
    "ko": "인도",
    "en": "India",
    "zh-CN": "印度",
    "zh-TW": "印度",
    "yue": "印度",
    "ja": "インド",
    "code": "in"
  },
  "oolong-ceylon":   {
    "ko": "스리랑카",
    "en": "Sri Lanka",
    "zh-CN": "斯里兰卡",
    "zh-TW": "斯里蘭卡",
    "yue": "斯里蘭卡",
    "ja": "スリランカ",
    "code": "lk"
  },
  "oolong-ruby":   {
    "ko": "태국",
    "en": "Thailand",
    "zh-CN": "泰国",
    "zh-TW": "泰國",
    "yue": "泰國",
    "ja": "タイ",
    "code": "th"
  },
  "oolong-jeju":   {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "oolong-cheong":   {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "black-chuanhong":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "black-yixing":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "black-jiuqu":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "black-mizhuan":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "black-hongyun":   {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "臺灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "black-ziya":   {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "臺灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-dancong-huangzhi":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-xingren":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-rougui":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-guihua":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-zhilan":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-yelai":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-tongtian":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-youhua":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-songzhong":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-baxian":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-dawuye":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-qilai":   {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "臺灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-honey":   {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "臺灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-red":   {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "臺灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-qilan":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-meizhan":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-tieluohan":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-baijiguan":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-shuijingui":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-bantianyao":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-zhangping":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-yunnan":   {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-darjeeling":   {
    "ko": "인도",
    "en": "India",
    "zh-CN": "印度",
    "zh-TW": "印度",
    "yue": "印度",
    "ja": "インド",
    "code": "in"
  },
  "green-chunseol":   {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
    "green-tencha":   {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-funmatsu":   {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-konacha":   {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-eunjeong":   {
    "ko": "북한",
    "en": "North Korea",
    "zh-CN": "朝鲜",
    "zh-TW": "北韓",
    "yue": "北韓",
    "ja": "北朝鮮",
    "code": "kp"
  },
  "white-darjeeling":   {
    "ko": "인도",
    "en": "India",
    "zh-CN": "印度",
    "zh-TW": "印度",
    "yue": "印度",
    "ja": "インド",
    "code": "in"
  },
  "green-anji-baipian": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-gougunao": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-wuyuan-mingmei": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-mengding-ganlu": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-hanzhong-xianhao": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-huiming": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-boseong": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "green-sanxia-biluochun": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "green-kabusecha": {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-kamairicha": {
    "ko": "일본",
    "en": "Japan",
    "zh-CN": "日本",
    "zh-TW": "日本",
    "yue": "日本",
    "ja": "日本",
    "code": "jp"
  },
  "green-dafo-longjing": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "green-laoshan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "white-xingongyi": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "white-yueguangbai": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "white-lingyun-baihao": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "yellow-beigang-maojian": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "yellow-weishan-maojian": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "yellow-wenzhou-huangtang": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "yellow-wanxi-huangdacha": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "yellow-yuanan-luyuan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-rougui": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-shuixian": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dayuling": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-shanlinxi": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-lishan": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-huangjingui": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-benshan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-foshou": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-muzha-tieguanyin": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-dancong-milan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-dancong-yashixiang": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "oolong-hongshui": {
    "ko": "대만",
    "en": "Taiwan",
    "zh-CN": "台湾",
    "zh-TW": "台灣",
    "yue": "台灣",
    "ja": "台湾",
    "code": "tw"
  },
  "oolong-thai-doi": {
    "ko": "태국",
    "en": "Thailand",
    "zh-CN": "泰国",
    "zh-TW": "泰國",
    "yue": "泰國",
    "ja": "タイ",
    "code": "th"
  },
  "oolong-vietnam-mocchau": {
    "ko": "베트남",
    "en": "Vietnam",
    "zh-CN": "越南",
    "zh-TW": "越南",
    "yue": "越南",
    "ja": "ベトナム",
    "code": "vn"
  },
  "black-lapsang-unsmoked": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "black-yingde": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "black-rize": {
    "ko": "튀르키예",
    "en": "Türkiye",
    "zh-CN": "土耳其",
    "zh-TW": "土耳其",
    "yue": "土耳其",
    "ja": "トルコ",
    "code": "tr"
  },
  "black-cameron": {
    "ko": "말레이시아",
    "en": "Malaysia",
    "zh-CN": "马来西亚",
    "zh-TW": "馬來西亞",
    "yue": "馬來西亞",
    "ja": "マレーシア",
    "code": "my"
  },
  "black-rwanda": {
    "ko": "르완다",
    "en": "Rwanda",
    "zh-CN": "卢旺达",
    "zh-TW": "盧安達",
    "yue": "盧安達",
    "ja": "ルワンダ",
    "code": "rw"
  },
  "black-dooars": {
    "ko": "인도",
    "en": "India",
    "zh-CN": "印度",
    "zh-TW": "印度",
    "yue": "印度",
    "ja": "インド",
    "code": "in"
  },
  "black-yeongdeok": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "dark-fuzhuan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "dark-qianliang": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "dark-kangzhuan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "dark-tibetan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "dark-laoqingzhuan": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "dark-tianjian": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "blend-guihua": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "blend-rose": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "blend-lychee": {
    "ko": "중국",
    "en": "China",
    "zh-CN": "中国",
    "zh-TW": "中國",
    "yue": "中國",
    "ja": "中国",
    "code": "cn"
  },
  "blend-thaitea": {
    "ko": "태국",
    "en": "Thailand",
    "zh-CN": "泰国",
    "zh-TW": "泰國",
    "yue": "泰國",
    "ja": "タイ",
    "code": "th"
  },
  "blend-moroccan-mint": {
    "ko": "모로코",
    "en": "Morocco",
    "zh-CN": "摩洛哥",
    "zh-TW": "摩洛哥",
    "yue": "摩洛哥",
    "ja": "モロッコ",
    "code": "ma"
  },
    "blend-irish-breakfast": {
    "ko": "아일랜드",
    "en": "Ireland",
    "zh-CN": "爱尔兰",
    "zh-TW": "愛爾蘭",
    "yue": "愛爾蘭",
    "ja": "アイルランド",
    "code": "ie"
  },
  "herb-cassia-seed": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-burdock": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-gugija": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-cornus": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-dandelion": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  },
  "herb-cornsilk": {
    "ko": "한국",
    "en": "South Korea",
    "zh-CN": "韩国",
    "zh-TW": "韓國",
    "yue": "韓國",
    "ja": "韓国",
    "code": "kr"
  }
};
  /* ── END generated: research ── */

  var links = {
    bookstore: "https://rotroka.upaper.kr",
    blog: "https://blog.naver.com/hongkongtea_kr"
  };

  /* ---------------- 언어별 데이터 조립 ---------------- */
  /* 품종 데이터는 짧은 배열로도 적을 수 있습니다.
     0 name, 1 oneLine, 2 oxidation, 3 ratioNote, 4 rounds, 5 steepBasis,
     6 origin, 7 process, 8 story, 9 flavor, 10 pairing, 11 brewTip, 12 keep, 13 keywords */
  /* 짧은 배열(10칸)로 적은 대용차·허브차·과일차용 필드 순서 */
  var SHORT_FIELDS = [
    "name",
    "oneLine",
    "oxidation",
    "ratioNote",
    "rounds",
    "steepBasis",
    "origin",
    "flavor",
    "pairing",
    "brewTip"
  ];

  var FIELDS = [
    "name",
    "oneLine",
    "oxidation",
    "ratioNote",
    "rounds",
    "steepBasis",
    "origin",
    "process",
    "story",
    "flavor",
    "pairing",
    "brewTip",
    "keep",
    "keywords"
  ];

  function isArray(v) {
    return Object.prototype.toString.call(v) === "[object Array]";
  }

  function normText(raw) {
    if (!raw) return {};
    if (isArray(raw)) {
      /* 짧은 배열은 [이름, 한 줄, 산화, 비율, 회차, 우림 기준, 산지, 향미, 페어링, 우림 팁] 순서입니다 */
      var keys = raw.length <= SHORT_FIELDS.length ? SHORT_FIELDS : FIELDS;
      var o = {};
      for (var i = 0; i < raw.length && i < keys.length; i++) if (raw[i] != null) o[keys[i]] = raw[i];
      return o;
    }
    return raw;
  }

  /* x(추가 문구)는 [process, story] 순서의 짧은 배열로 적을 수 있습니다 */
  function normExtra(raw) {
    if (!raw) return {};
    if (isArray(raw)) {
      var o = {};
      var X = ["process", "story"];
      for (var i = 0; i < raw.length && i < X.length; i++) if (raw[i] != null) o[X[i]] = raw[i];
      return o;
    }
    return raw;
  }

  function num(a, b, fallback) {
    if (a != null) return a;
    if (b != null) return b;
    return fallback;
  }

  function textFor(entry, lang) {
    if (!entry) return {};
    var chain = LANG_CHAIN[lang] || [lang, "ko"];
    for (var i = 0; i < chain.length; i++) {
      if (entry[chain[i]]) return normText(entry[chain[i]]);
    }
    return {};
  }

  function extraFor(entry, lang) {
    if (!entry || !entry.x) return {};
    var chain = LANG_CHAIN[lang] || [lang, "ko"];
    for (var i = 0; i < chain.length; i++) {
      if (entry.x[chain[i]]) return normExtra(entry.x[chain[i]]);
    }
    return {};
  }

  function groupPost(g, lang) {
    var text = textFor(g, lang);
    if (lang === "ja" && JA_GROUPS[g.id]) {
      var jaName = JA_GROUPS[g.id];
      if (!text || !text.name) text = { name: jaName };
      else text.name = jaName;
      if (JA_GROUP_LINES[g.id]) text.oneLine = JA_GROUP_LINES[g.id];
    }
    var o = {};
    var k;
    for (k in g) {
      if (k === "ko" || k === "en" || k === "zh-CN" || k === "zh-TW") continue;
      o[k] = g[k];
    }
    for (k in text) o[k] = text[k];
    o.kind = "group";
    o.group = g.id;
    o.count = 0;
    return o;
  }

  function teaPost(entry, group, lang) {
    var text = textFor(entry, lang);
    /* 일본어는 아직 차별 문구를 다 옮기지 않았습니다. 이름만은 한자(원어)로 보여 주고,
       나머지 설명은 영어 문구로 내려갑니다. */
    if (lang === "ja") {
      var kanji = entry.hz || entry.hs || "";
      if (kanji) text = { name: kanji, oneLine: text && text.oneLine };
    }
    var extra = extraFor(entry, lang);
    var o = {
      id: entry.id,
      group: entry.group,
      kind: "tea",
      hanja: entry.h || entry.hanja || group.hanja,
      hz: entry.hz || "",
      hs: entry.hs || "",
      rom: entry.rom || "",
      sub: entry.sub || group.sub,
      alias: entry.alias || [],
      temp: num(entry.t, entry.temp, group.temp),
      tempRange: entry.tr || entry.tempRange || group.tempRange,
      leaf: entry.l || entry.leaf || group.leaf,
      water: entry.w || entry.water || group.water,
      steeps: entry.s || entry.steeps || group.steeps,
      maxSteep: num(entry.m, entry.maxSteep, group.maxSteep),
      oxidationValue: num(entry.ox, entry.oxidationValue, group.oxidationValue),
      accent: group.accent,
      accentSoft: group.accentSoft,
      groupName: group.name,
      /* 실물 사진 · 원산지 — 카드와 상세에 함께 씁니다 */
      photo: typeof PHOTOS !== "undefined" ? PHOTOS[entry.id] || null : null,
      country: typeof ORIGIN !== "undefined" ? ORIGIN[entry.id] || null : null,
      traits: (TRAITS && TRAITS[entry.id]) || ""
    };
    var k;
    for (k in text) o[k] = text[k];
    for (k in extra) o[k] = extra[k];
    return o;
  }

  var groupIndex = {};
  var i;
  for (i = 0; i < GROUPS.length; i++) groupIndex[GROUPS[i].id] = GROUPS[i];

  var cache = {};
  var api = {
    LANGS: LANGS,
    GROUPS: GROUPS,
    TEAS: TEAS,
    MOODS: MOODS,
    links: links,
    photos: typeof PHOTOS !== "undefined" ? PHOTOS : {},
    origin: typeof ORIGIN !== "undefined" ? ORIGIN : {},
    lang: "ko",
    groups: [],
    teas: [],
    items: [],
    moods: [],
    use: use,
    byId: byId,
    groupOf: groupOf,
    teasOf: teasOf,
    searchText: searchText,
    nativeOf: nativeOf,
    traits: TRAITS
  };

  function build(lang) {
    var groups = GROUPS.map(function (g) {
      return groupPost(g, lang);
    });
    var gi = {};
    groups.forEach(function (g) {
      gi[g.id] = g;
    });

    var teas = [];
    TEAS.forEach(function (t) {
      var g = gi[t.group] || groups[0];
      teas.push(teaPost(t, g, lang));
      g.count += 1;
    });

    var items = [];
    groups.forEach(function (g) {
      items.push(g);
      for (var n = 0; n < teas.length; n++) if (teas[n].group === g.id) items.push(teas[n]);
    });

    return { groups: groups, teas: teas, items: items };
  }

  function use(lang) {
    var key = LANGS.indexOf(lang) >= 0 ? lang : "ko";
    if (!cache[key]) cache[key] = build(key);
    var b = cache[key];
    api.lang = key;
    api.groups = b.groups;
    api.teas = b.teas;
    api.items = b.items;
    api.moods = MOODS.map(function (m) {
      var text = normText(m[key] || m.ko);
      var o = { id: m.id, icon: m.icon, teaId: m.teaId, alt: m.alt };
      for (var k in text) o[k] = text[k];
      return o;
    });
    return api;
  }

  function byId(id) {
    var list = api.items;
    for (var n = 0; n < list.length; n++) if (list[n].id === id) return list[n];
    return list[0];
  }

  function groupOf(id) {
    var t = byId(id);
    return groupIndex[t.group] || groupIndex.green;
  }

  function teasOf(groupId) {
    var out = [];
    for (var n = 0; n < api.teas.length; n++) if (api.teas[n].group === groupId) out.push(api.teas[n]);
    return out;
  }

  /* 중국어는 간체를, 그 밖의 언어는 정체(원어) 표기를 씁니다 */
  function nativeOf(tea, lang) {
    if (!tea) return "";
    if (lang === "zh-CN") return tea.hs || tea.hz || tea.rom || "";
    return tea.hz || tea.hs || tea.rom || "";
  }

  /* 언어와 상관없이 이름·향·산지를 모두 담아 검색이 넓게 걸리도록 */
  function searchText(id) {
    var parts = [];
    var push = function (entry) {
      if (!entry) return;
      if (isArray(entry)) entry = normText(entry);
      parts.push(entry.name || "");
      parts.push(entry.sub || "");
      parts.push(entry.oneLine || "");
      parts.push(entry.origin || entry.process || "");
      parts.push(entry.process || "");
      parts.push(entry.story || "");
      parts.push(entry.flavor || "");
      parts.push(entry.pairing || "");
      parts.push(entry.keywords || "");
      if (entry.alias) parts.push(entry.alias.join(" "));
      if (entry.varieties) parts.push(entry.varieties.join(" "));
    };
    var all = GROUPS.concat(TEAS);
    for (var n = 0; n < all.length; n++) {
      if (all[n].id !== id) continue;
      parts.push(all[n].hz || "", all[n].hs || "", all[n].rom || "", all[n].sub || "");
      for (var l = 0; l < LANGS.length; l++) push(all[n][LANGS[l]]);
    }
    return parts.join(" ").toLowerCase();
  }


  /* ── BEGIN 나무위키 보강 메타 (2026-11-24) ── */
  Object.assign(PHOTOS, {
 "herb-nurungji": {
  "f": "herb-nurungji.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-corn": {
  "f": "herb-corn.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-sorghum": {
  "f": "herb-sorghum.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-coix": {
  "f": "herb-coix.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-mungbean": {
  "f": "herb-mungbean.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-redbean": {
  "f": "herb-redbean.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-perilla": {
  "f": "herb-perilla.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-peanut": {
  "f": "herb-peanut.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-walnut": {
  "f": "herb-walnut.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-ginkgo": {
  "f": "herb-ginkgo.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-kelp": {
  "f": "herb-kelp.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-chicory": {
  "f": "herb-chicory.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "everyday-hovenia": {
  "f": "everyday-hovenia.jpg",
  "m": "exact",
  "cr": "京东",
  "lic": "",
  "lu": "",
  "pg": "ippr_z2C$qAzdH3FAzdH3Ftpj4_z&e3B4_z&e3B31_z&e3Bv54AzdH3Fr6517vpAzdH3F8ad80990nl0acd_z&e3Bip4s?v7=p67j&7p4_f576vj=kwt17-37ij&7p4_4j1t74=h5g2&7p4_vw4rwt2g=p_8aaa8c8dna_37ij"
 },
 "everyday-kudzu": {
  "f": "everyday-kudzu.jpg",
  "m": "exact",
  "cr": "indonesian.alibaba.com",
  "lic": "",
  "lu": "",
  "pg": "https://indonesian.alibaba.com/product-detail/Kudzu-starch-Arrowroot-vermicelli-noodles-84-50043035002.html"
 },
 "herb-yam": {
  "f": "herb-yam.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-purple-corn": {
  "f": "herb-purple-corn.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-ginseng": {
  "f": "herb-ginseng.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-redginseng": {
  "f": "herb-redginseng.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-sesame": {
  "f": "herb-sesame.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-jerusalemartichoke": {
  "f": "herb-jerusalemartichoke.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-deodeok": {
  "f": "herb-deodeok.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-adenophora": {
  "f": "herb-adenophora.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-astragalus": {
  "f": "herb-astragalus.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-angelica": {
  "f": "herb-angelica.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-rehmannia": {
  "f": "herb-rehmannia.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-eucommia": {
  "f": "herb-eucommia.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-poria": {
  "f": "herb-poria.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-reishi": {
  "f": "herb-reishi.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-swordbean": {
  "f": "herb-swordbean.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-licorice": {
  "f": "herb-licorice.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-cinnamon": {
  "f": "herb-cinnamon.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-cinnamon-twig": {
  "f": "herb-cinnamon-twig.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-tangerine-peel": {
  "f": "herb-tangerine-peel.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-tangerine-blossom": {
  "f": "herb-tangerine-blossom.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-plumblossom": {
  "f": "herb-plumblossom.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-peachblossom": {
  "f": "herb-peachblossom.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-cherryblossom": {
  "f": "herb-cherryblossom.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-camellia": {
  "f": "herb-camellia.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-magnolia": {
  "f": "herb-magnolia.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-pinepollen": {
  "f": "herb-pinepollen.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-pineneedle": {
  "f": "herb-pineneedle.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-bamboo": {
  "f": "herb-bamboo.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-honeysuckle": {
  "f": "herb-honeysuckle.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-gardenia": {
  "f": "herb-gardenia.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-safflower": {
  "f": "herb-safflower.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "trad-eonggeongkwi": {
  "f": "trad-eonggeongkwi.jpg",
  "m": "exact",
  "cr": "europeanfoodexpress.com",
  "lic": "",
  "lu": "",
  "pg": "https://europeanfoodexpress.com/product/milk-thistle-tea/"
 },
 "herb-butterbur": {
  "f": "herb-butterbur.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-lotusroot": {
  "f": "herb-lotusroot.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-achyranthes": {
  "f": "herb-achyranthes.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-polygala": {
  "f": "herb-polygala.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-sophora": {
  "f": "herb-sophora.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-agastache": {
  "f": "herb-agastache.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-schizonepeta": {
  "f": "herb-schizonepeta.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-bangpung": {
  "f": "herb-bangpung.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-bupleurum": {
  "f": "herb-bupleurum.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-sokdan": {
  "f": "herb-sokdan.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-calamus": {
  "f": "herb-calamus.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-wasong": {
  "f": "herb-wasong.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-magnolia-bark": {
  "f": "herb-magnolia-bark.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-costus": {
  "f": "herb-costus.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-cuscuta": {
  "f": "herb-cuscuta.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-raisintree": {
  "f": "herb-raisintree.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-mallow": {
  "f": "herb-mallow.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-radishleaf": {
  "f": "herb-radishleaf.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-eggplant": {
  "f": "herb-eggplant.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-green-onion": {
  "f": "herb-green-onion.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-garlic": {
  "f": "herb-garlic.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-taro": {
  "f": "herb-taro.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-waxgourd": {
  "f": "herb-waxgourd.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-watercaltrop": {
  "f": "herb-watercaltrop.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "trad-sunchae": {
  "f": "trad-sunchae.jpg",
  "m": "exact",
  "cr": "baijiahao.baidu.com",
  "lic": "",
  "lu": "",
  "pg": "ippr_z2C$qAzdH3FAzdH3Fkwt3twiw5_z&e3Bkwt17_z&e3Bv54AzdH3Ff?t1=8bnmca0mdacn90nblc0&ou6=frt1j6&u56=rv"
 },
 "herb-maesil": {
  "f": "herb-maesil.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-cherry": {
  "f": "herb-cherry.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-plum": {
  "f": "herb-plum.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-pomegranate": {
  "f": "herb-pomegranate.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-loquat": {
  "f": "herb-loquat.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "fruit-dolbae": {
  "f": "fruit-dolbae.jpg",
  "m": "exact",
  "cr": "tealao.com",
  "lic": "",
  "lu": "",
  "pg": "https://tealao.com/ru/tea/yame-no-hana-hoshino"
 },
 "herb-trifoliateorange": {
  "f": "herb-trifoliateorange.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-hallabong": {
  "f": "herb-hallabong.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-grapefruit": {
  "f": "herb-grapefruit.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "fruit-orange": {
  "f": "fruit-orange.jpg",
  "m": "exact",
  "cr": "mbd.baidu.com",
  "lic": "",
  "lu": "",
  "pg": "ippr_z2C$qAzdH3FAzdH3F4k1_z&e3Bkwt17_z&e3Bv54AzdH3Fgjofrw2jAzdH3F1wpwAzdH3F1pswg1tg2f7rj6?gt1=1p_9anccnnl0dab8mb8dm9"
 },
 "herb-strawberry": {
  "f": "herb-strawberry.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-bittermelon": {
  "f": "herb-bittermelon.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-pumpkin": {
  "f": "herb-pumpkin.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "fruit-noni": {
  "f": "fruit-noni.jpg",
  "m": "exact",
  "cr": "mobile.yangkeduo.com",
  "lic": "",
  "lu": "",
  "pg": "ipprf_z2C$qAzdH3FAzdH3F45ktsj_z&e3Bywg2hj175_z&e3Bv54AzdH3F2551f_z&e3Bip4s?2551f_t1=dbmdnbdd9nbc"
 },
 "fruit-guava": {
  "f": "fruit-guava.jpg",
  "m": "exact",
  "cr": "oem-fgc.com",
  "lic": "",
  "lu": "",
  "pg": "https://oem-fgc.com/product/pink-guava-tea/"
 },
 "fruit-cacao": {
  "f": "fruit-cacao.jpg",
  "m": "exact",
  "cr": "tokyotreat.com",
  "lic": "",
  "lu": "",
  "pg": "https://tokyotreat.com/minimart/products/cacao-black-tea-can"
 },
 "herb-lemon": {
  "f": "herb-lemon.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-cucumber": {
  "f": "herb-cucumber.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-hazel": {
  "f": "herb-hazel.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-aged-cucumber": {
  "f": "herb-aged-cucumber.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "trad-cascara": {
  "f": "trad-cascara.jpg",
  "m": "exact",
  "cr": "karmacoffee.com.np",
  "lic": "",
  "lu": "",
  "pg": "https://karmacoffee.com.np/product/karma-coffee/"
 },
 "herb-oregano": {
  "f": "herb-oregano.jpg",
  "m": "exact",
  "cr": "babyone.at",
  "lic": "",
  "lu": "",
  "pg": "https://www.babyone.at/eigenmarken?start=48&sz=48"
 },
 "white-baiya": {
  "f": "white-baiya.jpg",
  "m": "exact",
  "cr": "www.douyin.com",
  "lic": "",
  "lu": "",
  "pg": "ippr_z2C$qAzdH3FAzdH3Fooo_z&e3B157ytg_z&e3Bv54AzdH3Fg5pjAzdH3F0n09dnn9d0add099b9d"
 },
 "white-taiwan": {
  "f": "white-taiwan.jpg",
  "m": "exact",
  "cr": "curioustea.com",
  "lic": "",
  "lu": "",
  "pg": "https://www.curioustea.com/tea/white-tea/red-jade-white-2022/"
 },
 "herb-akebia": {
  "f": "herb-akebia.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-peony": {
  "f": "herb-peony.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-purple-perilla": {
  "f": "herb-purple-perilla.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "herb-sunflower": {
  "f": "herb-sunflower.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 },
 "blend-lemonblack": {
  "f": "blend-lemonblack.jpg",
  "m": "exact",
  "cr": "aredi.ru",
  "lic": "",
  "lu": "",
  "pg": "https://aredi.ru/chay_chernyy_english_tea_lemon_black_tea_15kh2g_10767458160.html"
 },
 "blend-peachblack": {
  "f": "blend-peachblack.jpg",
  "m": "exact",
  "cr": "bbs.foodmate.net",
  "lic": "",
  "lu": "",
  "pg": "ippr_z2C$qAzdH3FAzdH3Fkkf_z&e3Bu5514wpj_z&e3BgjpAzdH3Fpi6jw1-8d89099-8-8_z&e3Bip4s"
 },
 "blend-leicha": {
  "f": "blend-leicha.jpg",
  "m": "exact",
  "cr": "news.sohu.com",
  "lic": "",
  "lu": "",
  "pg": "ippr_z2C$qAzdH3FAzdH3Fgjof_z&e3Bf5i7_z&e3Bv54AzdH3FwAzdH3Fbb9dl8mbc_8m80l9"
 },
 "blend-palbocha": {
  "f": "blend-palbocha.jpg",
  "m": "exact",
  "cr": "greenforest.ee",
  "lic": "",
  "lu": "",
  "pg": "https://www.greenforest.ee/toode/piduriga-ratas-4rattalisele-konteinerile/"
 },
 "herb-honeybush": {
  "f": "herb-honeybush.jpg",
  "m": "exact",
  "cr": "indocha.in",
  "lic": "",
  "lu": "",
  "pg": "https://indocha.in/product/south-african-honeybush-tea-naturally-caffeine-50g-each-pack-of-2/"
 },
 "herb-spearmint": {
  "f": "herb-spearmint.jpg",
  "m": "exact",
  "cr": "rippletea.com",
  "lic": "",
  "lu": "",
  "pg": "https://www.rippletea.com/collections/flavoured-tea/products/green-tea-with-natural-spearmint-flavour-100-g"
 },
 "blend-yuenyeung": {
  "f": "blend-yuenyeung.jpg",
  "m": "exact",
  "cr": "",
  "lic": "",
  "lu": "",
  "pg": ""
 }
});
  Object.assign(ORIGIN, {
 "herb-nurungji": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-corn": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-sorghum": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-coix": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-mungbean": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-redbean": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-perilla": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-peanut": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-walnut": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-ginkgo": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-kelp": {
  "ko": "일본",
  "en": "Japan",
  "zh-CN": "日本",
  "zh-TW": "日本",
  "yue": "日本",
  "ja": "日本",
  "code": "jp"
 },
 "herb-chicory": {
  "ko": "프랑스",
  "en": "France",
  "zh-CN": "法国",
  "zh-TW": "法國",
  "yue": "法國",
  "ja": "法国",
  "code": "fr"
 },
 "everyday-hovenia": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "everyday-kudzu": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-yam": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-purple-corn": {
  "ko": "페루",
  "en": "Peru",
  "zh-CN": "秘鲁",
  "zh-TW": "秘魯",
  "yue": "秘魯",
  "ja": "秘魯",
  "code": "pe"
 },
 "herb-ginseng": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-redginseng": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-sesame": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-jerusalemartichoke": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-deodeok": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-adenophora": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-astragalus": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-angelica": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-rehmannia": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-eucommia": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-poria": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-reishi": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-swordbean": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-licorice": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-cinnamon": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-cinnamon-twig": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-tangerine-peel": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-tangerine-blossom": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-plumblossom": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-peachblossom": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-cherryblossom": {
  "ko": "일본",
  "en": "Japan",
  "zh-CN": "日本",
  "zh-TW": "日本",
  "yue": "日本",
  "ja": "日本",
  "code": "jp"
 },
 "herb-camellia": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-magnolia": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-pinepollen": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-pineneedle": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-bamboo": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-honeysuckle": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-gardenia": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-safflower": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "trad-eonggeongkwi": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-butterbur": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-lotusroot": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-achyranthes": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-polygala": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-sophora": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-agastache": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-schizonepeta": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-bangpung": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-bupleurum": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-sokdan": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-calamus": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-wasong": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-magnolia-bark": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-costus": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-cuscuta": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-raisintree": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-mallow": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-radishleaf": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-eggplant": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-green-onion": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-garlic": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-taro": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-waxgourd": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-watercaltrop": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "trad-sunchae": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-maesil": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-cherry": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-plum": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-pomegranate": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-loquat": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "fruit-dolbae": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-trifoliateorange": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-hallabong": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-grapefruit": {
  "ko": "미국",
  "en": "United States",
  "zh-CN": "美国",
  "zh-TW": "美國",
  "yue": "美國",
  "ja": "美国",
  "code": "us"
 },
 "fruit-orange": {
  "ko": "미국",
  "en": "United States",
  "zh-CN": "美国",
  "zh-TW": "美國",
  "yue": "美國",
  "ja": "美国",
  "code": "us"
 },
 "herb-strawberry": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-bittermelon": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-pumpkin": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "fruit-noni": {
  "ko": "폴리네시아",
  "en": "Polynesia",
  "zh-CN": "波利尼西亚",
  "zh-TW": "玻里尼西亞",
  "yue": "玻里尼西亞",
  "ja": "玻里尼西亞",
  "code": "pf"
 },
 "fruit-guava": {
  "ko": "대만",
  "en": "Taiwan",
  "zh-CN": "台湾",
  "zh-TW": "台灣",
  "yue": "台灣",
  "ja": "台灣",
  "code": "tw"
 },
 "fruit-cacao": {
  "ko": "미국",
  "en": "United States",
  "zh-CN": "美国",
  "zh-TW": "美國",
  "yue": "美國",
  "ja": "美国",
  "code": "us"
 },
 "herb-lemon": {
  "ko": "지중해",
  "en": "Mediterranean",
  "zh-CN": "地中海",
  "zh-TW": "地中海",
  "yue": "地中海",
  "ja": "地中海",
  "code": "eu"
 },
 "herb-cucumber": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-hazel": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-aged-cucumber": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "trad-cascara": {
  "ko": "미국",
  "en": "United States",
  "zh-CN": "美国",
  "zh-TW": "美國",
  "yue": "美國",
  "ja": "美国",
  "code": "us"
 },
 "herb-oregano": {
  "ko": "지중해",
  "en": "Mediterranean",
  "zh-CN": "地中海",
  "zh-TW": "地中海",
  "yue": "地中海",
  "ja": "地中海",
  "code": "eu"
 },
 "white-baiya": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "white-taiwan": {
  "ko": "대만",
  "en": "Taiwan",
  "zh-CN": "台湾",
  "zh-TW": "台灣",
  "yue": "台灣",
  "ja": "台灣",
  "code": "tw"
 },
 "herb-akebia": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-peony": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-purple-perilla": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "herb-sunflower": {
  "ko": "한국",
  "en": "Korea",
  "zh-CN": "韩国",
  "zh-TW": "韓國",
  "yue": "韓國",
  "ja": "韓国",
  "code": "kr"
 },
 "blend-lemonblack": {
  "ko": "영국",
  "en": "United Kingdom",
  "zh-CN": "英国",
  "zh-TW": "英國",
  "yue": "英國",
  "ja": "英国",
  "code": "uk"
 },
 "blend-peachblack": {
  "ko": "영국",
  "en": "United Kingdom",
  "zh-CN": "英国",
  "zh-TW": "英國",
  "yue": "英國",
  "ja": "英国",
  "code": "uk"
 },
 "blend-leicha": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "blend-palbocha": {
  "ko": "중국",
  "en": "China",
  "zh-CN": "中国",
  "zh-TW": "中國",
  "yue": "中國",
  "ja": "中国",
  "code": "cn"
 },
 "herb-honeybush": {
  "ko": "남아프리카 공화국",
  "en": "South Africa",
  "zh-CN": "南非",
  "zh-TW": "南非",
  "yue": "南非",
  "ja": "南非",
  "code": "za"
 },
 "herb-spearmint": {
  "ko": "지중해",
  "en": "Mediterranean",
  "zh-CN": "地中海",
  "zh-TW": "地中海",
  "yue": "地中海",
  "ja": "地中海",
  "code": "eu"
 },
 "blend-yuenyeung": {
  "ko": "홍콩",
  "en": "Hong Kong",
  "zh-CN": "香港",
  "zh-TW": "香港",
  "yue": "香港",
  "ja": "香港",
  "code": "hk"
 }
});
  Object.assign(TRAITS, {
 "herb-nurungji": "t-morning t-afternoon a-roast b-light k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
 "herb-corn": "t-morning t-afternoon a-roast a-grass b-light k-sweet r-clean s-hot s-iced w-quick p-meal c-low m-cozy",
 "herb-sorghum": "t-afternoon a-roast b-light k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
 "herb-coix": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
 "herb-mungbean": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "herb-redbean": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
 "herb-perilla": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-peanut": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
 "herb-walnut": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
 "herb-ginkgo": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-kelp": "t-morning a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-refresh",
 "herb-chicory": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot s-milk w-quick p-meal c-low m-cozy",
 "everyday-hovenia": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
 "everyday-kudzu": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
 "herb-yam": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-purple-corn": "t-morning t-afternoon a-roast a-fruit b-light k-sweet r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "herb-ginseng": "t-morning a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-energy",
 "herb-redginseng": "t-morning a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-energy",
 "herb-sesame": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
 "herb-jerusalemartichoke": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
 "herb-deodeok": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-adenophora": "t-morning t-afternoon a-roast b-light k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-astragalus": "t-morning a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-energy",
 "herb-angelica": "t-afternoon t-night a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-rehmannia": "t-afternoon t-night a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-eucommia": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-poria": "t-morning t-afternoon a-roast b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-reishi": "t-afternoon t-night a-roast b-full k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-swordbean": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-licorice": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-cinnamon": "t-afternoon t-night a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
 "herb-cinnamon-twig": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-cozy",
 "herb-tangerine-peel": "t-afternoon a-fruit a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-tangerine-blossom": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
 "herb-plumblossom": "t-afternoon t-night a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
 "herb-peachblossom": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
 "herb-cherryblossom": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
 "herb-camellia": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
 "herb-magnolia": "t-afternoon a-floral b-light k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
 "herb-pinepollen": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-calm",
 "herb-pineneedle": "t-morning t-afternoon a-grass a-roast b-light k-crisp r-clean s-hot w-quick p-solo c-low m-refresh",
 "herb-bamboo": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-solo c-low m-refresh",
 "herb-honeysuckle": "t-afternoon a-floral b-light k-sweet r-clean s-hot s-iced w-quick p-solo c-low m-calm",
 "herb-gardenia": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-safflower": "t-afternoon a-floral b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
 "trad-eonggeongkwi": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-butterbur": "t-afternoon a-grass a-roast b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-lotusroot": "t-morning t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-achyranthes": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-polygala": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-sophora": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-agastache": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-refresh",
 "herb-schizonepeta": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-solo c-low m-refresh",
 "herb-bangpung": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-bupleurum": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-sokdan": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-calamus": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-solo c-low m-refresh",
 "herb-wasong": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-solo c-low m-refresh",
 "herb-magnolia-bark": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-costus": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-cuscuta": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-raisintree": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-mallow": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-radishleaf": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-eggplant": "t-afternoon a-roast b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-green-onion": "t-afternoon a-roast b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-garlic": "t-afternoon a-roast b-medium k-crisp r-smoke s-hot w-quick p-solo c-high m-calm",
 "herb-taro": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-waxgourd": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "herb-watercaltrop": "t-afternoon a-roast b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-cozy",
 "trad-sunchae": "t-afternoon a-grass b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-maesil": "t-afternoon a-fruit b-medium k-sweet k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "herb-cherry": "t-afternoon a-fruit b-light k-sweet k-crisp r-clean s-iced w-quick p-dessert c-low m-refresh",
 "herb-plum": "t-afternoon a-fruit b-medium k-sweet k-crisp r-clean s-hot s-iced w-quick p-dessert c-low m-refresh",
 "herb-pomegranate": "t-afternoon a-fruit b-medium k-sweet k-crisp r-clean s-hot s-iced w-quick p-dessert c-low m-refresh",
 "herb-loquat": "t-afternoon a-fruit a-floral b-light k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "fruit-dolbae": "t-afternoon a-fruit a-roast b-light k-sweet r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-trifoliateorange": "t-afternoon a-fruit a-roast b-medium k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
 "herb-hallabong": "t-afternoon a-fruit b-light k-sweet k-crisp r-clean s-hot s-iced w-quick p-dessert c-low m-refresh",
 "herb-grapefruit": "t-morning t-afternoon a-fruit b-light k-crisp k-sweet r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "fruit-orange": "t-morning t-afternoon a-fruit b-light k-crisp k-sweet r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "herb-strawberry": "t-afternoon a-fruit b-light k-sweet k-crisp r-clean s-hot s-iced w-quick p-dessert c-low m-refresh",
 "herb-bittermelon": "t-morning t-afternoon a-grass a-roast b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "herb-pumpkin": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
 "fruit-noni": "t-morning t-afternoon a-fruit b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-refresh",
 "fruit-guava": "t-afternoon a-fruit a-grass b-medium k-sweet r-clean s-hot w-quick p-meal c-low m-refresh",
 "fruit-cacao": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot s-milk w-quick p-dessert c-low m-cozy",
 "herb-lemon": "t-morning t-afternoon a-fruit b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "herb-cucumber": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "herb-hazel": "t-morning t-afternoon a-roast b-full k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
 "herb-aged-cucumber": "t-afternoon a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "trad-cascara": "t-morning a-roast a-fruit b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-energy",
 "herb-oregano": "t-afternoon a-grass a-roast b-light k-crisp r-clean s-hot w-quick p-meal c-low m-calm",
 "white-baiya": "t-afternoon t-night a-floral a-fruit b-light k-sweet r-clean s-hot w-gongfu p-solo c-low m-calm",
 "white-taiwan": "t-afternoon a-floral a-fruit b-light k-sweet r-clean s-hot w-gongfu p-solo c-low m-calm",
 "herb-akebia": "t-afternoon a-roast b-medium k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-peony": "t-afternoon t-night a-roast b-medium k-sweet r-clean s-hot w-quick p-solo c-low m-calm",
 "herb-purple-perilla": "t-afternoon a-grass a-floral b-light k-crisp r-clean s-hot w-quick p-meal c-low m-refresh",
 "herb-sunflower": "t-afternoon a-floral b-light k-crisp r-clean s-hot w-quick p-solo c-low m-calm",
 "blend-lemonblack": "t-morning t-afternoon a-fruit a-malt b-full k-crisp r-clean s-hot s-iced s-milk w-quick p-meal c-high m-refresh",
 "blend-peachblack": "t-afternoon a-fruit a-floral b-full k-sweet r-clean s-hot s-iced s-milk w-quick p-dessert c-high m-cozy",
 "blend-leicha": "t-morning a-roast a-grass b-full k-sweet r-clean s-hot w-quick p-meal c-low m-energy",
 "blend-palbocha": "t-afternoon t-night a-fruit a-floral b-medium k-sweet r-clean s-hot w-quick p-dessert c-low m-cozy",
 "herb-honeybush": "t-morning t-afternoon t-night a-floral a-fruit b-medium k-sweet r-clean s-hot s-iced s-milk w-quick p-dessert c-low m-cozy",
 "herb-spearmint": "t-afternoon t-night a-grass b-light k-crisp r-clean s-hot s-iced w-quick p-meal c-low m-refresh",
 "blend-yuenyeung": "t-morning t-afternoon a-malt a-roast b-full k-sweet r-clean s-hot s-milk p-meal c-high m-energy"
});
  /* ── END 나무위키 보강 메타 ── */

  Object.assign(PHOTOS, {"blend-kamachai": {"f": "blend-kamachai.jpg", "m": "exact", "cr": "", "lic": "", "lu": "", "pg": ""}, "blend-mangomelange": {"f": "blend-mangomelange.jpg", "m": "exact", "cr": "", "lic": "", "lu": "", "pg": ""}, "blend-nycbreakfast": {"f": "blend-nycbreakfast.jpg", "m": "exact", "cr": "", "lic": "", "lu": "", "pg": ""}, "white-cocopeony": {"f": "white-cocopeony.jpg", "m": "exact", "cr": "", "lic": "", "lu": "", "pg": ""}});
  Object.assign(ORIGIN, {"blend-kamachai": {"ko": "인도", "en": "India", "zh-CN": "印度", "zh-TW": "印度", "yue": "印度", "ja": "インド", "code": "in"}, "blend-mangomelange": {"ko": "인도", "en": "India", "zh-CN": "印度", "zh-TW": "印度", "yue": "印度", "ja": "インド", "code": "in"}, "blend-nycbreakfast": {"ko": "스리랑카", "en": "Sri Lanka", "zh-CN": "斯里兰卡", "zh-TW": "斯里蘭卡", "yue": "斯里蘭卡", "ja": "スリランカ", "code": "lk"}, "white-cocopeony": {"ko": "중국", "en": "China", "zh-CN": "中国", "zh-TW": "中國", "yue": "中國", "ja": "中国", "code": "cn"}});
  Object.assign(TRAITS, {"blend-kamachai": "t-morning a-malt a-spice b-full k-sweet s-milk w-quick p-dessert c-high m-cozy", "blend-mangomelange": "t-morning t-afternoon a-fruit a-malt b-medium k-sweet s-hot s-iced w-quick p-dessert c-mid m-refresh", "blend-nycbreakfast": "t-morning a-malt b-full k-sweet s-hot s-milk w-quick p-meal c-high m-energy", "white-cocopeony": "t-afternoon a-floral a-roast b-light k-sweet s-hot w-quick p-dessert c-low m-calm"});
  Object.assign(PHOTOS, {"trad-cascara": {"f": "trad-cascara.jpg", "m": "exact", "cr": "ecrater.co.uk", "lic": "", "lu": "", "pg": "https://www.ecrater.co.uk/p/30610086/1-oz-cascara-sagrada-bark-frangula"}, "fruit-dolbae": {"f": "fruit-dolbae.jpg", "m": "exact", "cr": "alibaba.com", "lic": "", "lu": "", "pg": "https://www.alibaba.com/product-detail/_1600629746627.html"}, "fruit-orange": {"f": "fruit-orange.jpg", "m": "exact", "cr": "korean.alibaba.com", "lic": "", "lu": "", "pg": "https://korean.alibaba.com/product-detail/Natural-Chinese-Dried-Fruits-products-detox-1600530190648.html"}, "fruit-noni": {"f": "fruit-noni.jpg", "m": "exact", "cr": "alibaba.com", "lic": "", "lu": "", "pg": "https://www.alibaba.com/product-detail/noni-powder-vietnam-price-dried-noni_50045284767.html"}, "herb-honeybush": {"f": "herb-honeybush.jpg", "m": "exact", "cr": "russian.alibaba.com", "lic": "", "lu": "", "pg": "https://russian.alibaba.com/product-detail/China-Manufacturer-Good-Quality-Jasmine-Green-1600588553575.html"}, "blend-peachblack": {"f": "blend-peachblack.jpg", "m": "exact", "cr": "alibaba.com", "lic": "", "lu": "", "pg": "https://www.alibaba.com/product-detail/Hubei-Enshi-Natural-and-Organic-Black_1601708513481.html"}, "blend-leicha": {"f": "blend-leicha.jpg", "m": "exact", "cr": "english.visitkorea.or.kr", "lic": "", "lu": "", "pg": "https://english.visitkorea.or.kr/svc/contents/contentsView.do?vcontsId=231676"}, "fruit-cacao": {"f": "fruit-cacao.jpg", "m": "exact", "cr": "Yandex Market", "lic": "", "lu": "", "pg": "https://market.yandex.ru/product--aromatizator-naturalnyi-zhidkii-shokolad-s-ekstr-kakao-bobov-mr-flavor-10-ml/1770524366?text=%D0%B6%D0%B8%D0%B4%D0%BA%D0%B0%D1%8F+%D1%88%D0%BE%D0%BA%D0%BE%D0%BB%D0%B0%D0%B4%D0%BA%D0%B0&sku=101514641017&do-waremd5=A4PwQDM-8O-Wyj-2TmSTXQ&utm_source_service=img&icookie=Z%2F1ME%2BX2OBAk1V7OWmMTxgeZ4vygxk6p0vRkFUp4HPFjS2ZiJBSNFYcrGOMqkfA3nHC01VXv1r%2BPn4AWaE8hhzHha5g%3D&wprid=1795463441319145-16790466353642055855-svrlmbet2zcoaemg-BAL&src_pof=972"}, "blend-lemonblack": {"f": "blend-lemonblack.jpg", "m": "exact", "cr": "russian.alibaba.com", "lic": "", "lu": "", "pg": "https://russian.alibaba.com/product-detail/Premium-Quality-Loose-Leaf-Lemon-Black-1601666397608.html"}, "trad-eonggeongkwi": {"f": "trad-eonggeongkwi.jpg", "m": "exact", "cr": "russian.alibaba.com", "lic": "", "lu": "", "pg": "https://russian.alibaba.com/product-detail/high-quality-dried-good-scents-whole-costus-roots-for-sale-60746258026.html"}, "blend-kamachai": {"f": "blend-kamachai.jpg", "m": "exact", "cr": "etsy.com", "lic": "", "lu": "", "pg": "https://www.etsy.com/listing/120690683/diy-chai-tea-kit-with-organic-and-fair?ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=fascino+di+chai"}, "blend-mangomelange": {"f": "blend-mangomelange.jpg", "m": "exact", "cr": "alibaba.com", "lic": "", "lu": "", "pg": "https://www.alibaba.com/product-detail/Mango-Black-Tea-Caffeinated-Fruity-Tropical_11000000877559.html"}, "blend-nycbreakfast": {"f": "blend-nycbreakfast.jpg", "m": "exact", "cr": "fusionteas.com", "lic": "", "lu": "", "pg": "https://www.fusionteas.com/ceylon-black-tea-extra-fancy?sku=BLK-CYLN-6&source=buy_button"}, "white-cocopeony": {"f": "white-cocopeony.jpg", "m": "exact", "cr": "etsy.com", "lic": "", "lu": "", "pg": "https://www.etsy.com/market/%D1%81%D0%BC%D0%B5%D1%81%D1%8C_%D0%B1%D0%B5%D0%BB%D0%BE%D0%B3%D0%BE_%D1%87%D0%B0%D1%8F"}});
  api.use("ko");
  return api;
})();
