
// 장안대학교 주변 병원 찾기
// 5개 언어 / 개별 마커 / PC·모바일

const $ = id => document.getElementById(id);

const university = {
  name: "장안대학교",
  lat: 37.2132,
  lng: 126.94728
};

// 주소별 대표 좌표: 시연용
const baseCoords = {
  "상리2길 55": [37.21710,126.95180],
  "상리2길 51": [37.21735,126.95215],
  "상리중심상가길 6-4": [37.21670,126.95005],
  "상리중심상가길 28-8": [37.21635,126.95105],
  "상리중심상가길 28-18": [37.21605,126.95070],
  "상리1길 72": [37.21895,126.95205],
  "상리1길 109": [37.21995,126.95245],
  "상리3길 43-12": [37.21835,126.95080],
  "동화길 81-10": [37.21920,126.95600],
  "동화길 81-16": [37.21935,126.95618],
  "동화길 85": [37.21980,126.95655],
  "동화길 89": [37.22000,126.95700],
  "동화길 91": [37.22010,126.95720],
  "동화길 93-2": [37.22040,126.95778],
  "동화길 93-9": [37.22058,126.95795],
  "와우로73번길 6": [37.22295,126.96225],
  "참샘길 2": [37.22345,126.96055],
  "삼천병마로 1344": [37.21680,126.94580],
  "삼천병마로 1283": [37.22290,126.94485],
  "삼천병마로 1276": [37.22255,126.94430],
  "삼천병마로 1273": [37.22220,126.94405],
  "삼천병마로 1316": [37.21965,126.94560],
  "샘마을길 31": [37.21980,126.94412],
  "매봉로 443": [37.22060,126.95050],
  "상리중심상가길 25": [37.21702,126.95010],
  "상리중심상가길 19": [37.21728,126.95018],
  "동화리 598": [37.21830,126.95420]
};

// 기존 병원 36곳
const hospitalRows = [
  ["가온이비인후과의원","이비인후과","상리2길 55","031-293-8922"],
  ["눈애안과의원","안과","상리2길 51","031-295-1888"],
  ["리멤버피부과의원","피부과","상리2길 51",""],
  ["미즈여성의원","산부인과","동화길 89","031-297-8787"],
  ["봄소아청소년과의원","소아청소년과","참샘길 2","031-223-6554"],
  ["봉담21세기정형외과의원","정형외과","와우로73번길 6",""],
  ["성모내과의원","내과","동화길 91","031-298-7434"],
  ["365온가족치과","치과","상리중심상가길 6-4",""],
  ["삼성위드유비뇨의학과의원","비뇨의학과","상리2길 51","031-895-4270"],
  ["고려힐링정신건강의학과의원","정신건강의학과","동화길 85",""],
  ["화성이엠365의원","내과","상리중심상가길 28-8","031-293-0911"],
  ["밝은성모안과의원","안과","동화길 93-2",""],
  ["김남윤통증의학과의원","마취통증의학과","동화길 85","031-307-7588"],
  ["미엔느의원","성형외과","상리2길 55","031-893-4520"],
  ["온가족소아청소년과의원","소아청소년과","상리중심상가길 28-18","031-293-1275"],
  ["지엠산부인과의원","산부인과","삼천병마로 1344","031-278-7373"],
  ["봉담센트럴내과의원","내과","상리2길 55",""],
  ["봉담숲정신건강의학과의원","정신건강의학과","상리2길 51",""],
  ["봉담정형외과의원","정형외과","상리2길 51",""],
  ["봉담장항외과의원","외과","상리2길 55",""],
  ["봉담척마디의원","정형외과","상리2길 55",""],
  ["봉담정성치과의원","치과","상리2길 55",""],
  ["봉담은혜내과의원","내과","상리3길 43-12",""],
  ["봉담이룸내과의원","내과","상리1길 109",""],
  ["봉담제일안과의원","안과","동화길 85",""],
  ["봉담튼튼정형외과의원","정형외과","동화길 81-10",""],
  ["수아산부인과의원","산부인과","동화길 81-10",""],
  ["나이스병원","정형외과","삼천병마로 1283",""],
  ["팔복내과가정의학과의원","내과","동화길 85",""],
  ["봉담메디본정형외과의원","정형외과","동화길 91",""],
  ["봉담맑은이비인후과의원","이비인후과","와우로73번길 6",""],
  ["봉담감동한의원","한의원","상리중심상가길 28-8",""],
  ["광명한의원","한의원","동화길 93-2",""],
  ["명치과의원","치과","동화길 93-2",""],
  ["유앤아이의원 화성봉담점","피부과","상리중심상가길 28-8",""],
  ["미라보의원","피부과","상리중심상가길 28-18",""]
];

// 약국 19곳
const pharmacyRows = [
  ["봉담매일온누리약국","상리2길 55","031-298-8757"],
  ["봉담남문약국","상리2길 51","031-296-0365"],
  ["튼튼별약국","상리중심상가길 28-18",""],
  ["365진약국","상리중심상가길 28-8",""],
  ["스타온누리약국","상리1길 72",""],
  ["채움약국","상리3길 43-12",""],
  ["이룸미소약국","상리1길 109",""],
  ["맑은약국","매봉로 443",""],
  ["봉담약국","삼천병마로 1276","031-227-5329"],
  ["엘타워약국","삼천병마로 1283","031-297-9685"],
  ["신세계약국","샘마을길 31","031-298-1118"],
  ["솔약국","삼천병마로 1273",""],
  ["봉담메디컬약국","동화길 81-10",""],
  ["하나로약국","동화길 81-16",""],
  ["믿음약국","동화길 85",""],
  ["파란하늘약국","동화길 89",""],
  ["다은약국","동화길 91",""],
  ["큰사랑온누리약국","동화길 93-2",""],
  ["종로약국","삼천병마로 1316",""]
];

// 주차장 4곳
const parkingRows = [
  ["봉담상리1공영주차장","상리중심상가길 25"],
  ["봉담상리2공영주차장","상리중심상가길 19"],
  ["동화중심주차타워","동화길 93-9"],
  ["봉담공영주차장","동화리 598"]
];

// 5개 언어 사전
const messages = {
  ko: {
    title:"장안대학교 주변 병원 찾기",
    subtitle:"주변 병원, 약국, 주차장을 편리하게 찾아보세요.",
    language:"언어 선택",
    searchTitle:"병원 · 약국 검색",
    searchPlaceholder:"병원 이름, 진료과, 약국 검색",
    search:"검색",
    nearest:"가까운 순", nameSort:"이름순",
    openSort:"운영 중 우선",
    openOnly:"운영 중만 보기 (예시)",
    favoriteOnly:"즐겨찾기만 보기",
    symptomTitle:"증상으로 진료과 찾기",
    symptomDescription:"증상을 입력하면 관련 진료과를 안내합니다.",
    symptomPlaceholder:"예: 배가 아파요",
    recommend:"진료과 추천",
    medicalNotice:"증상 추천은 참고용이며 의학적 진단이 아닙니다.",
    listTitle:"병원 · 약국 목록",
    dataNotice:"위치와 운영시간 일부는 시연용 정보입니다.",
    mapTitle:"주변 지도",
    resetMap:"장안대학교로 이동",
    showHospital:"병원 표시",
    showPharmacy:"약국 표시",
    showParking:"주차장 표시",
    mapNotice:"같은 건물의 마커는 구분을 위해 벌려 표시합니다. 정확한 위치는 외부 지도에서 확인하세요.",
    parkingTitle:"주변 주차장",
    footer:"장안대학교 주변 병원 찾기 · JavaScript 웹앱 프로젝트",
    result:"검색 결과", places:"곳",
    noResults:"검색 결과가 없습니다.",
    phone:"전화번호", address:"주소",
    distance:"학교에서 거리",
    demoDistance:"예시 좌표 기준 직선거리",
    parking:"주차", parkingUnknown:"주차 정보 확인 필요",
    discount:"주차 할인", unknown:"확인 필요",
    open:"운영 중 (시연용)", closed:"운영 종료 (시연용)",
    unverified:"운영시간 확인 필요",
    details:"상세보기", mapView:"지도 보기",
    favorite:"즐겨찾기", saved:"저장됨",
    mapSearch:"정확한 위치 검색",
    type:"진료과 / 종류",
    hours:"운영시간",
    sampleHours:"예시 운영시간",
    close:"닫기",
    parkingFee:"이용요금 확인 필요",
    noSymptom:"증상을 입력해주세요.",
    noDepartment:"관련 진료과를 찾지 못했습니다.",
    recommended:"추천 진료과",
    emergency:"응급 증상일 수 있습니다. 119에 연락하세요.",
    campus:"장안대학교",
    markerDemo:"마커 위치는 시연용입니다."
  },
  en: {
    title:"Hospitals Near Jangan University",
    subtitle:"Find nearby hospitals, pharmacies, and parking.",
    language:"Language",
    searchTitle:"Hospital & Pharmacy Search",
    searchPlaceholder:"Search by name or department",
    search:"Search",
    nearest:"Nearest", nameSort:"Name",
    openSort:"Open first",
    openOnly:"Open only (demo)",
    favoriteOnly:"Favorites only",
    symptomTitle:"Find a Medical Department",
    symptomDescription:"Enter symptoms to find a relevant department.",
    symptomPlaceholder:"e.g. stomach pain",
    recommend:"Recommend",
    medicalNotice:"Keyword-based guidance only, not a medical diagnosis.",
    listTitle:"Hospitals & Pharmacies",
    dataNotice:"Some coordinates and operating hours are demonstration data.",
    mapTitle:"Nearby Map",
    resetMap:"Back to Jangan University",
    showHospital:"Show hospitals",
    showPharmacy:"Show pharmacies",
    showParking:"Show parking",
    mapNotice:"Markers at the same address are spread apart for visibility. Verify actual locations on an external map.",
    parkingTitle:"Nearby Parking",
    footer:"Jangan University Hospital Finder · JavaScript Project",
    result:"Results", places:"places",
    noResults:"No matching places found.",
    phone:"Phone", address:"Address",
    distance:"Distance from university",
    demoDistance:"Straight-line distance from demo coordinates",
    parking:"Parking", parkingUnknown:"Check parking with the facility",
    discount:"Parking discount", unknown:"Not verified",
    open:"Open (demo)", closed:"Closed (demo)",
    unverified:"Hours not verified",
    details:"Details", mapView:"View on map",
    favorite:"Favorite", saved:"Saved",
    mapSearch:"Verify location",
    type:"Department / Type",
    hours:"Hours", sampleHours:"Sample hours",
    close:"Close", parkingFee:"Fees not verified",
    noSymptom:"Please enter symptoms.",
    noDepartment:"No matching department found.",
    recommended:"Recommended department",
    emergency:"Possible emergency. Contact emergency services.",
    campus:"Jangan University",
    markerDemo:"Marker location is for demonstration."
  },
  ja: {
    title:"長安大学周辺の病院検索",
    subtitle:"近くの病院・薬局・駐車場を探せます。",
    language:"言語選択",
    searchTitle:"病院・薬局を検索",
    searchPlaceholder:"病院名・診療科・薬局名",
    search:"検索",
    nearest:"距離が近い順", nameSort:"名前順",
    openSort:"営業中を優先",
    openOnly:"営業中のみ（デモ）",
    favoriteOnly:"お気に入りのみ",
    symptomTitle:"症状から診療科を探す",
    symptomDescription:"症状を入力すると関連する診療科を案内します。",
    symptomPlaceholder:"例：お腹が痛い",
    recommend:"診療科を検索",
    medicalNotice:"症状の案内は参考情報であり、診断ではありません。",
    listTitle:"病院・薬局一覧",
    dataNotice:"一部の位置と営業時間はデモ用データです。",
    mapTitle:"周辺地図",
    resetMap:"大学に戻る",
    showHospital:"病院を表示",
    showPharmacy:"薬局を表示",
    showParking:"駐車場を表示",
    mapNotice:"同じ住所のマーカーは見やすくするために分けています。実際の位置を確認してください。",
    parkingTitle:"周辺駐車場",
    footer:"長安大学周辺病院検索 · JavaScriptプロジェクト",
    result:"検索結果", places:"件",
    noResults:"検索結果がありません。",
    phone:"電話番号", address:"住所",
    distance:"大学からの距離",
    demoDistance:"デモ座標による直線距離",
    parking:"駐車場", parkingUnknown:"施設に確認が必要",
    discount:"駐車割引", unknown:"要確認",
    open:"営業中（デモ）", closed:"営業終了（デモ）",
    unverified:"営業時間は未確認",
    details:"詳細を見る", mapView:"地図を見る",
    favorite:"お気に入り", saved:"保存済み",
    mapSearch:"正確な位置を検索",
    type:"診療科・種類",
    hours:"営業時間", sampleHours:"例示営業時間",
    close:"閉じる", parkingFee:"料金は要確認",
    noSymptom:"症状を入力してください。",
    noDepartment:"関連する診療科が見つかりません。",
    recommended:"おすすめの診療科",
    emergency:"緊急の可能性があります。救急サービスに連絡してください。",
    campus:"長安大学",
    markerDemo:"マーカーの位置はデモ用です。"
  },
  zh: {
    title:"长安大学附近医院查询",
    subtitle:"查找附近的医院、药店和停车场。",
    language:"选择语言",
    searchTitle:"搜索医院和药店",
    searchPlaceholder:"搜索医院名称、科室或药店",
    search:"搜索",
    nearest:"距离最近", nameSort:"按名称",
    openSort:"营业中优先",
    openOnly:"仅营业中（演示）",
    favoriteOnly:"仅显示收藏",
    symptomTitle:"根据症状查找科室",
    symptomDescription:"输入症状即可查看相关科室。",
    symptomPlaceholder:"例如：肚子疼",
    recommend:"推荐科室",
    medicalNotice:"仅供参考，不属于医学诊断。",
    listTitle:"医院和药店列表",
    dataNotice:"部分位置与营业时间为演示数据。",
    mapTitle:"附近地图",
    resetMap:"返回长安大学",
    showHospital:"显示医院",
    showPharmacy:"显示药店",
    showParking:"显示停车场",
    mapNotice:"同一地址的标记已分开以便查看，请在外部地图核实实际位置。",
    parkingTitle:"附近停车场",
    footer:"长安大学附近医院查询 · JavaScript项目",
    result:"搜索结果", places:"处",
    noResults:"没有找到结果。",
    phone:"电话", address:"地址",
    distance:"距大学",
    demoDistance:"基于演示坐标的直线距离",
    parking:"停车", parkingUnknown:"请向医疗机构确认",
    discount:"停车优惠", unknown:"待确认",
    open:"营业中（演示）", closed:"已结束营业（演示）",
    unverified:"营业时间待确认",
    details:"详细信息", mapView:"查看地图",
    favorite:"收藏", saved:"已收藏",
    mapSearch:"核实准确位置",
    type:"科室 / 类型",
    hours:"营业时间", sampleHours:"示例营业时间",
    close:"关闭", parkingFee:"费用待确认",
    noSymptom:"请输入症状。",
    noDepartment:"未找到相关科室。",
    recommended:"推荐科室",
    emergency:"可能存在紧急情况，请联系急救服务。",
    campus:"长安大学",
    markerDemo:"标记位置仅供演示。"
  },
  vi: {
    title:"Tìm bệnh viện gần Đại học Jangan",
    subtitle:"Tìm bệnh viện, nhà thuốc và bãi đỗ xe gần đây.",
    language:"Chọn ngôn ngữ",
    searchTitle:"Tìm bệnh viện và nhà thuốc",
    searchPlaceholder:"Tên bệnh viện, chuyên khoa hoặc nhà thuốc",
    search:"Tìm kiếm",
    nearest:"Gần nhất", nameSort:"Theo tên",
    openSort:"Đang mở trước",
    openOnly:"Chỉ đang mở (mô phỏng)",
    favoriteOnly:"Chỉ mục yêu thích",
    symptomTitle:"Tìm chuyên khoa theo triệu chứng",
    symptomDescription:"Nhập triệu chứng để xem chuyên khoa phù hợp.",
    symptomPlaceholder:"Ví dụ: đau bụng",
    recommend:"Gợi ý",
    medicalNotice:"Chỉ để tham khảo, không phải chẩn đoán y khoa.",
    listTitle:"Danh sách bệnh viện và nhà thuốc",
    dataNotice:"Một số vị trí và giờ mở cửa là dữ liệu mô phỏng.",
    mapTitle:"Bản đồ xung quanh",
    resetMap:"Về Đại học Jangan",
    showHospital:"Hiện bệnh viện",
    showPharmacy:"Hiện nhà thuốc",
    showParking:"Hiện bãi đỗ xe",
    mapNotice:"Các điểm cùng địa chỉ được tách để dễ nhìn. Hãy xác minh vị trí thực tế trên bản đồ ngoài.",
    parkingTitle:"Bãi đỗ xe gần đây",
    footer:"Tìm bệnh viện gần Đại học Jangan · Dự án JavaScript",
    result:"Kết quả", places:"địa điểm",
    noResults:"Không tìm thấy kết quả.",
    phone:"Điện thoại", address:"Địa chỉ",
    distance:"Khoảng cách từ trường",
    demoDistance:"Đường thẳng theo tọa độ mô phỏng",
    parking:"Đỗ xe", parkingUnknown:"Cần xác nhận với cơ sở",
    discount:"Ưu đãi đỗ xe", unknown:"Chưa xác minh",
    open:"Đang mở (mô phỏng)", closed:"Đã đóng (mô phỏng)",
    unverified:"Chưa xác minh giờ mở cửa",
    details:"Chi tiết", mapView:"Xem bản đồ",
    favorite:"Yêu thích", saved:"Đã lưu",
    mapSearch:"Xác minh vị trí",
    type:"Chuyên khoa / Loại",
    hours:"Giờ mở cửa", sampleHours:"Giờ mẫu",
    close:"Đóng", parkingFee:"Chưa xác minh phí",
    noSymptom:"Vui lòng nhập triệu chứng.",
    noDepartment:"Không tìm thấy chuyên khoa phù hợp.",
    recommended:"Chuyên khoa gợi ý",
    emergency:"Có thể là tình trạng khẩn cấp. Hãy liên hệ dịch vụ cấp cứu.",
    campus:"Đại học Jangan",
    markerDemo:"Vị trí đánh dấu chỉ để mô phỏng."
  }
};

// 진료과 번역 및 다국어 검색
const categories = {
  "전체": ["All","すべて","全部","Tất cả"],
  "내과": ["Internal Medicine","内科","内科","Nội khoa"],
  "외과": ["Surgery","外科","外科","Ngoại khoa"],
  "정형외과": ["Orthopedics","整形外科","骨科","Chấn thương chỉnh hình"],
  "신경외과": ["Neurosurgery","脳神経外科","神经外科","Ngoại thần kinh"],
  "이비인후과": ["ENT","耳鼻咽喉科","耳鼻喉科","Tai mũi họng"],
  "피부과": ["Dermatology","皮膚科","皮肤科","Da liễu"],
  "안과": ["Ophthalmology","眼科","眼科","Nhãn khoa"],
  "산부인과": ["OB/GYN","産婦人科","妇产科","Sản phụ khoa"],
  "소아청소년과": ["Pediatrics","小児科","儿科","Nhi khoa"],
  "치과": ["Dentistry","歯科","牙科","Nha khoa"],
  "비뇨의학과": ["Urology","泌尿器科","泌尿科","Tiết niệu"],
  "정신건강의학과": ["Psychiatry","精神科","精神科","Tâm thần"],
  "마취통증의학과": ["Pain Medicine","ペインクリニック","疼痛科","Điều trị đau"],
  "성형외과": ["Plastic Surgery","美容外科","整形外科","Phẫu thuật thẩm mỹ"],
  "가정의학과": ["Family Medicine","家庭医療科","全科医学","Y học gia đình"],
  "흉부외과": ["Thoracic Surgery","胸部外科","胸外科","Ngoại lồng ngực"],
  "한의원": ["Korean Medicine","韓方医院","韩医诊所","Y học cổ truyền Hàn Quốc"],
  "약국": ["Pharmacy","薬局","药店","Nhà thuốc"],
  "주차장": ["Parking","駐車場","停车场","Bãi đỗ xe"]
};

const colorMap = {
  "내과":"#51b97b",
  "외과":"#6d8ec9",
  "정형외과":"#4d82f3",
  "신경외과":"#6177d9",
  "이비인후과":"#9a73d5",
  "피부과":"#ea8dac",
  "안과":"#42c0d6",
  "산부인과":"#f0a65d",
  "소아청소년과":"#d7b53a",
  "치과":"#e36456",
  "비뇨의학과":"#20a39b",
  "정신건강의학과":"#66749b",
  "마취통증의학과":"#8d755d",
  "성형외과":"#d37ea6",
  "한의원":"#7ca55b",
  "약국":"#16a085",
  "주차장":"#3e77c8"
};

let language = "ko";
let selectedCategory = "전체";
let selectedSymptom = "";
let map = null;
let markerLayer = null;
let markerRefs = new Map();
let currentPlaces = [];
let filteredPlaces = [];
let activeDetail = null;

function t(key) {
  return messages[language][key] || messages.ko[key] || key;
}

function categoryText(name) {
  if (language === "ko") return name;
  const data = categories[name];
  const index = {en:0,ja:1,zh:2,vi:3}[language];
  return data ? data[index] : name;
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .trim();
}

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#39;"
  }[c]));
}

function haversine(a,b,c,d) {
  const R = 6371;
  const x = (c-a)*Math.PI/180;
  const y = (d-b)*Math.PI/180;
  const z = Math.sin(x/2)**2 +
    Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*
    Math.sin(y/2)**2;
  return 2*R*Math.atan2(Math.sqrt(z),Math.sqrt(1-z));
}

// 십자가를 불규칙하게 배치
// 항상 같은 모습이 나오도록 고정 난수 사용
function makeCrossDecor() {
  const container = $("crossDecor");
  container.innerHTML = "";

  let seed = 52719;
  function random() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }

  for (let i=0; i<34; i++) {
    const cross = document.createElement("span");
    cross.className = "tiny-cross";

    if (i % 9 === 0) {
      cross.classList.add("circle");
    }

    const x = 1 + random()*98;
    const y = 5 + random()*90;
    const size = 7 + random()*15;
    const angle = -28 + random()*56;
    const opacity = .15 + random()*.30;

    cross.style.left = x + "%";
    cross.style.top = y + "%";
    cross.style.setProperty("--cross-size",size+"px");
    cross.style.setProperty("--cross-angle",angle+"deg");
    cross.style.setProperty("--cross-opacity",opacity);

    container.appendChild(cross);
  }
}

// 병원, 약국, 주차장 생성
function createPlace(row,index,type) {
  const road = type==="hospital" ? row[2] : row[1];
  const base = baseCoords[road];

  return {
    id:type+"_"+index,
    name:row[0],
    type:type,
    category:type==="hospital" ? row[1] :
      type==="pharmacy" ? "약국" : "주차장",
    road:road,
    address:"경기도 화성시 봉담읍 "+road,
    phone:type==="hospital" ? row[3]||"" :
          type==="pharmacy" ? row[2]||"" : "",
    baseLat:base ? base[0] : null,
    baseLng:base ? base[1] : null,
    lat:base ? base[0] : null,
    lng:base ? base[1] : null,
    distance:null
  };
}

const hospitals = hospitalRows.map((r,i)=>
  createPlace(r,i,"hospital")
);
const pharmacies = pharmacyRows.map((r,i)=>
  createPlace(r,i,"pharmacy")
);
const parkingPlaces = parkingRows.map((r,i)=>
  createPlace(r,i,"parking")
);

currentPlaces = [...hospitals,...pharmacies];

// 같은 건물의 병원도 하나씩 보이게 배치
// 동심원 두 겹까지 사용하여 모두 구별
function spreadMarkerPositions() {
  const groups = {};

  currentPlaces.forEach(place => {
    if (!groups[place.road]) groups[place.road]=[];
    groups[place.road].push(place);
  });

  Object.values(groups).forEach(group => {
    // 병원부터 배치해 약국이 병원을 가리지 않도록
    group.sort((a,b)=>
      (a.type==="hospital" ? 0 : 1) -
      (b.type==="hospital" ? 0 : 1)
    );

    group.forEach((place,i) => {
      if (place.baseLat===null) return;

      const count=group.length;

      if (count===1) {
        place.lat=place.baseLat;
        place.lng=place.baseLng;
      } else {
        const perRing=8;
        const ring=Math.floor(i/perRing);
        const index=i%perRing;
        const ringCount=Math.min(perRing,count-ring*perRing);
        const angle=2*Math.PI*index/ringCount + .28 + ring*.15;
        const radius=.00024 + ring*.00021;

        place.lat=place.baseLat+
          Math.sin(angle)*radius;

        place.lng=place.baseLng+
          Math.cos(angle)*radius;
      }
    });
  });

  [...currentPlaces,...parkingPlaces].forEach(place => {
    if (place.lat!==null) {
      place.distance=haversine(
        university.lat,university.lng,
        place.lat,place.lng
      );
    }
  });
}

spreadMarkerPositions();

// 시연용 운영 상태. 실제 영업 여부가 아님.
function isDemoOpen(place) {
  const now=new Date();
  const day=now.getDay();
  if (day===0) return false;

  const minute=now.getHours()*60+now.getMinutes();
  const start=9*60;
  const end=place.type==="pharmacy" ? 20*60 : 18*60;

  if (day===6) return minute>=start && minute<13*60;
  return minute>=start && minute<end;
}

function statusHTML(place) {
  const open=isDemoOpen(place);
  return `<span class="${open?"status-open":"status-closed"}">
    ● ${open?t("open"):t("closed")}
  </span>`;
}

// 즐겨찾기
function getFavorites() {
  try {
    return JSON.parse(
      localStorage.getItem("janganFavorites")||"[]"
    );
  } catch(e) {
    return [];
  }
}

function toggleFavorite(id) {
  let favorites=getFavorites();

  if (favorites.includes(id)) {
    favorites=favorites.filter(x=>x!==id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem(
    "janganFavorites",JSON.stringify(favorites)
  );

  updateAll();
  if (activeDetail && activeDetail.id===id) {
    showDetail(activeDetail);
  }
}

// 카테고리 버튼
function createCategoryButtons() {
  const box=$("categoryButtons");
  box.innerHTML="";

  Object.keys(categories)
    .filter(name=>name!=="주차장")
    .forEach(category => {
      const btn=document.createElement("button");
      btn.className="category-btn";
      btn.textContent=categoryText(category);

      if (category===selectedCategory) {
        btn.classList.add("active");
      }

      btn.addEventListener("click",()=>{
        selectedCategory=category;
        selectedSymptom="";
        $("searchInput").value="";
        $("symptomResult").textContent="";
        createCategoryButtons();
        updateAll();
      });

      box.appendChild(btn);
    });
}

// 검색 / 정렬
function getFilteredPlaces() {
  const keyword=normalize($("searchInput").value);
  const favorites=getFavorites();

  const result=currentPlaces.filter(place => {
    const aliases=categories[place.category]||[];

    const searchable=[
      place.name,place.category,place.address,...aliases
    ].some(value=>normalize(value).includes(keyword));

    const categoryMatch=
      selectedCategory==="전체" ||
      place.category===selectedCategory;

    const symptomMatch=
      !selectedSymptom ||
      place.category===selectedSymptom;

    const openMatch=
      !$("openOnly").checked || isDemoOpen(place);

    const favoriteMatch=
      !$("favoriteOnly").checked ||
      favorites.includes(place.id);

    return searchable && categoryMatch &&
      symptomMatch && openMatch && favoriteMatch;
  });

  const sort=$("sortSelect").value;

  if(sort==="distance") {
    result.sort((a,b)=>
      (a.distance??9999)-(b.distance??9999)
    );
  } else if(sort==="name") {
    result.sort((a,b)=>a.name.localeCompare(b.name,"ko"));
  } else {
    result.sort((a,b)=>
      Number(isDemoOpen(b))-Number(isDemoOpen(a)) ||
      (a.distance??9999)-(b.distance??9999)
    );
  }

  return result;
}

// 목록 표시
function renderList() {
  const box=$("hospitalList");
  box.innerHTML="";
  $("resultCount").textContent=
    `${t("result")} ${filteredPlaces.length} ${t("places")}`;

  if(filteredPlaces.length===0) {
    box.textContent=t("noResults");
    return;
  }

  const favorites=getFavorites();

  filteredPlaces.forEach(place => {
    const saved=favorites.includes(place.id);
    const card=document.createElement("div");
    card.className="place-card";

    card.innerHTML=`
      <span class="type-badge ${
        place.type==="pharmacy"?"pharmacy":""
      }">${safe(categoryText(place.category))}</span>

      <h3>${safe(place.name)}</h3>

      <p>🩺 ${safe(categoryText(place.category))}</p>
      <p>${statusHTML(place)}</p>
      <p>📍 ${safe(place.address)}</p>
      <p>☎ ${safe(place.phone||t("unknown"))}</p>
      <p>🚗 ${t("parking")}: ${t("parkingUnknown")}</p>
      <p>🚶 ${t("distance")}:
        ${place.distance===null?t("unknown"):
          place.distance.toFixed(1)+" km"}
        <small>(${t("demoDistance")})</small>
      </p>

      <div class="card-btn-row">
        <button class="detail-btn">${t("details")}</button>
        <button class="soft-btn map-btn">${t("mapView")}</button>
        <button class="favorite-btn ${saved?"saved":""}">
          ${saved?"★":"☆"} ${t("favorite")}
        </button>
      </div>
    `;

    card.querySelector(".detail-btn")
      .addEventListener("click",()=>showDetail(place));

    card.querySelector(".map-btn")
      .addEventListener("click",()=>moveToPlace(place));

    card.querySelector(".favorite-btn")
      .addEventListener("click",()=>toggleFavorite(place.id));

    box.appendChild(card);
  });
}

// 상세보기
function showDetail(place) {
  activeDetail=place;
  const saved=getFavorites().includes(place.id);

  $("modalBody").innerHTML=`
    <h2>${safe(place.name)}</h2>

    <div class="detail-box">
      <strong>${t("type")}</strong>
      <div>${safe(categoryText(place.category))}</div>
    </div>

    <div class="detail-box">
      <strong>${t("hours")}</strong>
      <div>${statusHTML(place)}</div>
      <small>${t("sampleHours")}: 09:00–${
        place.type==="pharmacy"?"20:00":"18:00"
      } (Mon–Fri)</small>
    </div>

    <div class="detail-box">
      <strong>${t("address")}</strong>
      <div>${safe(place.address)}</div>
    </div>

    <div class="detail-box">
      <strong>${t("phone")}</strong>
      <div>${safe(place.phone||t("unknown"))}</div>
    </div>

    <div class="detail-box">
      <strong>${t("parking")}</strong>
      <div>${t("parkingUnknown")}</div>
    </div>

    <div class="detail-box">
      <strong>${t("discount")}</strong>
      <div>${t("unknown")}</div>
    </div>

    <div class="detail-box">
      <strong>${t("distance")}</strong>
      <div>${place.distance===null?t("unknown"):
        place.distance.toFixed(1)+" km"}</div>
      <small>${t("demoDistance")}</small>
    </div>

    <div class="detail-actions">
      <button id="detailMap">${t("mapView")}</button>
      <button id="detailSearch" class="soft-btn">
        ${t("mapSearch")}
      </button>
      <button id="detailFavorite" class="favorite-btn">
        ${saved?"★":"☆"} ${t("favorite")}
      </button>
    </div>
  `;

  $("detailMap").addEventListener("click",()=>{
    $("detailModal").style.display="none";
    moveToPlace(place);
  });

  $("detailSearch").addEventListener("click",()=>{
    openGoogleMap(place);
  });

  $("detailFavorite").addEventListener("click",()=>{
    toggleFavorite(place.id);
  });

  $("detailModal").style.display="flex";
}

function openGoogleMap(place) {
  const query=place.name+" "+place.address;
  window.open(
    "https://www.google.com/maps/search/?api=1&query="+
      encodeURIComponent(query),
    "_blank","noopener,noreferrer"
  );
}

// 개별 병원 마커를 큰 + 로 표시
function markerIcon(place) {
  if(place.type==="parking") {
    return L.divIcon({
      className:"",
      html:'<div class="map-parking-pin">P</div>',
      iconSize:[29,29],
      iconAnchor:[14,14]
    });
  }

  if(place.type==="pharmacy") {
    return L.divIcon({
      className:"",
      html:'<div class="map-pharmacy-pin">약</div>',
      iconSize:[29,29],
      iconAnchor:[14,14]
    });
  }

  const color=colorMap[place.category]||"#6eae83";

  return L.divIcon({
    className:"",
    html:`<div class="map-hospital-pin"
      style="background:${color}">+</div>`,
    iconSize:[29,29],
    iconAnchor:[14,14]
  });
}

// 지도 생성
function makeMap() {
  if(typeof L==="undefined") {
    $("map").textContent="Map library failed to load.";
    return;
  }

  map=L.map("map",{
    preferCanvas:false
  }).setView(
    [university.lat,university.lng],15
  );

  L.tileLayer(
    "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
    {
      maxZoom:18,
      attribution:"&copy; OpenStreetMap contributors"
    }
  ).addTo(map);

  // 병원이 약국 뒤에 가려지지 않도록 우선순위 지정
  map.createPane("parkingPane");
  map.createPane("pharmacyPane");
  map.createPane("hospitalPane");

  map.getPane("parkingPane").style.zIndex=610;
  map.getPane("pharmacyPane").style.zIndex=620;
  map.getPane("hospitalPane").style.zIndex=630;

  // 병원 우선 클릭
  map.getPane("hospitalPane").style.pointerEvents="auto";

  const campusIcon=L.divIcon({
    className:"",
    html:`<div class="university-pin">🎓 ${t("campus")}</div>`,
    iconSize:[115,30],
    iconAnchor:[57,15]
  });

  L.marker(
    [university.lat,university.lng],
    {icon:campusIcon,zIndexOffset:1000}
  ).addTo(map).bindPopup(t("campus"));

  markerLayer=L.layerGroup().addTo(map);

  window.addEventListener("resize",()=>{
    map.invalidateSize();
  });
}

// 마커 전부 개별 표시
function updateMarkers() {
  if(!markerLayer) return;

  markerLayer.clearLayers();
  markerRefs.clear();

  const showHospital=$("showHospital").checked;
  const showPharmacy=$("showPharmacy").checked;
  const showParking=$("showParking").checked;

  const visible=[...filteredPlaces];

  if(showParking) {
    visible.push(...parkingPlaces);
  }

  // 약국을 먼저 그리고 병원을 나중에 그려 가려짐 방지
  visible.sort((a,b)=>{
    const order={parking:0,pharmacy:1,hospital:2};
    return order[a.type]-order[b.type];
  });

  visible.forEach(place=>{
    if(place.lat===null||place.lng===null) return;

    if(place.type==="hospital"&&!showHospital) return;
    if(place.type==="pharmacy"&&!showPharmacy) return;

    const pane=place.type==="hospital"?"hospitalPane":
      place.type==="pharmacy"?"pharmacyPane":"parkingPane";

    const marker=L.marker(
      [place.lat,place.lng],
      {
        icon:markerIcon(place),
        pane:pane,
        zIndexOffset:place.type==="hospital"?200:
          place.type==="pharmacy"?100:0,
        title:place.name,
        riseOnHover:true
      }
    );

    const popup=document.createElement("div");
    popup.style.minWidth="190px";

    const heading=document.createElement("strong");
    heading.textContent=place.name;

    const department=document.createElement("p");
    department.textContent=categoryText(place.category);

    const address=document.createElement("p");
    address.textContent=place.address;

    const note=document.createElement("small");
    note.textContent=t("markerDemo");

    const button=document.createElement("button");
    button.textContent=place.type==="parking" ?
      t("mapSearch") : t("details");

    button.addEventListener("click",()=>{
      if(place.type==="parking") {
        openGoogleMap(place);
      } else {
        showDetail(place);
      }
    });

    popup.append(heading,department,address,note);
    popup.appendChild(document.createElement("div"));
    popup.appendChild(button);

    marker.bindPopup(popup);
    marker.addTo(markerLayer);

    markerRefs.set(place.id,marker);
  });
}

function moveToPlace(place) {
  if(!map||place.lat===null) {
    openGoogleMap(place);
    return;
  }

  if(place.type==="hospital") {
    $("showHospital").checked=true;
  }

  if(place.type==="pharmacy") {
    $("showPharmacy").checked=true;
  }

  if(place.type==="parking") {
    $("showParking").checked=true;
  }

  updateMarkers();

  map.setView([place.lat,place.lng],17);

  const marker=markerRefs.get(place.id);
  if(marker) marker.openPopup();

  if(window.innerWidth<=600) {
    document.querySelector(".map-panel")
      .scrollIntoView({behavior:"smooth",block:"start"});
  }
}

// 주차장 목록
function renderParking() {
  const box=$("parkingList");
  box.innerHTML="";

  $("parkingCount").textContent=
    parkingPlaces.length+" "+t("places");

  parkingPlaces.forEach(place=>{
    const card=document.createElement("div");
    card.className="parking-card";

    const name=document.createElement("strong");
    name.textContent="🅿 "+place.name;

    const address=document.createElement("div");
    address.textContent="📍 "+place.address;

    const fee=document.createElement("div");
    fee.textContent=t("parkingFee");

    const button=document.createElement("button");
    button.textContent=t("mapView");
    button.addEventListener("click",()=>moveToPlace(place));

    const search=document.createElement("button");
    search.className="soft-btn";
    search.style.marginLeft="7px";
    search.textContent=t("mapSearch");
    search.addEventListener("click",()=>openGoogleMap(place));

    card.append(name,address,fee,button,search);
    box.appendChild(card);
  });
}

function renderLegend() {
  const box=$("legend");
  box.innerHTML="";

  const types=[
    "내과","정형외과","이비인후과",
    "피부과","안과","산부인과",
    "소아청소년과","치과","한의원",
    "약국","주차장"
  ];

  types.forEach(name=>{
    const item=document.createElement("div");
    item.className="legend-item";

    const dot=document.createElement("span");
    dot.className="map-legend-dot";
    dot.style.background=colorMap[name];

    const label=document.createElement("span");
    label.textContent=categoryText(name);

    item.append(dot,label);
    box.appendChild(item);
  });
}

// 증상 단어: 5개 언어 지원
const symptomRules=[
  {
    category:"내과",
    words:[
      "배","복통","소화","속쓰림","stomach","abdominal",
      "お腹","腹痛","胃痛","肚子","腹痛","胃痛",
      "đau bụng","dạ dày","da day"
    ]
  },
  {
    category:"정형외과",
    words:[
      "허리","무릎","관절","발목",
      "back pain","knee","joint",
      "腰","膝","関節","腰痛","膝盖","关节",
      "đau lưng","đầu gối","khớp"
    ]
  },
  {
    category:"이비인후과",
    words:[
      "코막힘","콧물","편도","귀","목감기",
      "ear pain","runny nose","sore throat",
      "耳","鼻水","喉","耳朵","鼻塞","喉咙",
      "đau tai","nghẹt mũi","đau họng"
    ]
  },
  {
    category:"안과",
    words:[
      "눈","충혈","시야","eye","vision",
      "目が","充血","眼睛","眼红",
      "đau mắt","mắt đỏ","thị lực"
    ]
  },
  {
    category:"피부과",
    words:[
      "피부","여드름","발진","가려움",
      "skin","acne","rash","皮膚","ニキビ",
      "皮肤","痘痘","đau da","mụn","ngứa"
    ]
  },
  {
    category:"치과",
    words:[
      "치아","잇몸","충치","이빨","tooth","teeth","gum",
      "歯","虫歯","牙齿","牙疼","đau răng","sâu răng"
    ]
  },
  {
    category:"산부인과",
    words:[
      "생리","임신","질염","period","pregnant",
      "生理","妊娠","月経","怀孕","月经",
      "kinh nguyệt","mang thai"
    ]
  },
  {
    category:"소아청소년과",
    words:[
      "아기","유아","소아","baby","child",
      "赤ちゃん","子供","婴儿","儿童",
      "em bé","trẻ em"
    ]
  },
  {
    category:"비뇨의학과",
    words:[
      "소변","방광","urine","bladder",
      "尿","膀胱","小便","tiểu buốt","bàng quang"
    ]
  },
  {
    category:"정신건강의학과",
    words:[
      "불안","우울","불면","anxiety","depression",
      "insomnia","不安","うつ","不眠",
      "焦虑","抑郁","失眠","lo âu","trầm cảm","mất ngủ"
    ]
  }
];

const emergencyWords=[
  "흉통","가슴 통증","호흡곤란",
  "chest pain","difficulty breathing",
  "胸の痛み","呼吸困難","胸痛","呼吸困难",
  "đau ngực","khó thở"
];

function recommendDepartment() {
  const input=normalize($("symptomInput").value);

  if(!input) {
    $("symptomResult").textContent=t("noSymptom");
    return;
  }

  if(emergencyWords.some(word=>
    input.includes(normalize(word))
  )) {
    $("symptomResult").textContent=t("emergency");
    return;
  }

  const match=symptomRules.find(rule=>
    rule.words.some(word=>
      input.includes(normalize(word))
    )
  );

  if(!match) {
    $("symptomResult").textContent=t("noDepartment");
    return;
  }

  selectedCategory=match.category;
  selectedSymptom=match.category;
  $("searchInput").value="";

  $("symptomResult").textContent=
    t("recommended")+": "+categoryText(match.category);

  createCategoryButtons();
  updateAll();
}

// 언어 전환: 모든 화면 구성 다시 출력
function changeLanguage() {
  language=$("language").value;
  document.documentElement.lang=language;

  document.querySelectorAll("[data-i18n]")
    .forEach(element=>{
      const key=element.dataset.i18n;
      element.textContent=t(key);
    });

  document.querySelectorAll("[data-placeholder]")
    .forEach(element=>{
      element.placeholder=t(element.dataset.placeholder);
    });

  $("sortSelect").options[0].textContent=t("nearest");
  $("sortSelect").options[1].textContent=t("nameSort");
  $("sortSelect").options[2].textContent=t("openSort");

  if(selectedSymptom) {
    $("symptomResult").textContent=
      t("recommended")+": "+categoryText(selectedSymptom);
  }

  createCategoryButtons();
  renderLegend();
  renderParking();
  updateAll();

  if(activeDetail && $("detailModal").style.display==="flex") {
    showDetail(activeDetail);
  }
}

function updateAll() {
  filteredPlaces=getFilteredPlaces();
  renderList();
  updateMarkers();
}

// 이벤트 연결
$("searchBtn").addEventListener("click",()=>{
  updateAll();
});

$("searchInput").addEventListener("input",updateAll);

$("searchInput").addEventListener("keydown",e=>{
  if(e.key==="Enter") updateAll();
});

$("symptomBtn").addEventListener("click",recommendDepartment);

$("symptomInput").addEventListener("keydown",e=>{
  if(e.key==="Enter") recommendDepartment();
});

$("sortSelect").addEventListener("change",updateAll);
$("openOnly").addEventListener("change",updateAll);
$("favoriteOnly").addEventListener("change",updateAll);

["showHospital","showPharmacy","showParking"]
  .forEach(id=>{
    $(id).addEventListener("change",updateMarkers);
  });

$("resetMapBtn").addEventListener("click",()=>{
  if(map) {
    map.setView([university.lat,university.lng],15);
  }
});

$("language").addEventListener("change",changeLanguage);

$("closeModal").addEventListener("click",()=>{
  $("detailModal").style.display="none";
  activeDetail=null;
});

$("detailModal").addEventListener("click",e=>{
  if(e.target===$("detailModal")) {
    $("detailModal").style.display="none";
    activeDetail=null;
  }
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") {
    $("detailModal").style.display="none";
    activeDetail=null;
  }
});

// 최초 실행
makeCrossDecor();
createCategoryButtons();
renderLegend();
renderParking();
makeMap();
updateAll();

setInterval(updateAll,60000);
