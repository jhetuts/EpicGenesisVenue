$(function () {
  const translations = [
    {
      en: "Please rotate your device",
      id: "Silakan putar perangkat Anda.",
      jp: "画面の向きにデバイスを合わせてください",
      kh: "សូមបង្វិលឧបករណ៍របស់អ្នក។",
      kr: "디바이스를 회전 시켜주세요.",
      zh: "請旋轉您的設備",
      th: "กรุณาหมุนอุปกรณ์ของคุณ",
      vn: "Vui lòng xoay thiết bị của bạn.",
    },
    {
      en: "Herbalife Nutrition Privacy Policy",
      id: "Kebijakan Pribadi Herbalife Nutrition",
      jp: "ハーバライフ ニュートリション プライバシーポリシー",
      kh: "គោលការណ៍ឯកជនភាពបស់ក្រុមហ៊ុន Herbalife Nutrition",
      kr: "허벌라이프 뉴트리션 개인정보보호정책",
      zh: "賀寶芙 隱私政策",
      th: "นโยบายความเป็นส่วนตัวของเฮอร์บาไลฟ์ นิวทริชั่น",
      vn: "Chính sách bảo mật của Herbalife",
    },
    {
      en: "FAQ",
      id: "FAQ",
      jp: "よくあるご質問と回答",
      kh: "សំណួរគេសួរញឹកញាប់",
      kr: "자주 묻는 질문",
      zh: "常見問與答",
      th: "คำถามที่พบบ่อย",
      vn: "Câu hỏi thường gặp",
    },
    {
      en: "Home",
      id: "Halaman Utama",
      jp: "ホーム",
      kh: "គេហទំព័រ",
      kr: "홈",
      zh: "主頁",
      th: "หน้าหลัก",
      vn: "Trang chủ",
    },
    {
      en: "Arena",
      id: "Arena",
      jp: "アリーナ",
      kh: "Arena",
      kr: "아레나",
      zh: "場館",
      th: "ห้องประชุมหลัก",
      vn: "Hội trường",
    },
    {
      en: "Expo",
      id: "Expo",
      jp: "エキスポ",
      kh: "ពិព័រណ៍",
      kr: "엑스포",
      zh: "博覽會",
      th: "เอ็กซ์โป",
      vn: "Khu vực triển lãm",
    },
    {
      en: "Agenda",
      id: "Agenda",
      jp: "アジェンダ",
      kh: "របៀបវារៈ",
      kr: "아젠다",
      zh: "議程表",
      th: "ตารางการประชุม",
      vn: "Lịch sự kiện",
    },
    {
      en: "Information",
      id: "Informasi",
      jp: "インフォメーション",
      kh: "ព័ត៌មាន",
      kr: "정보",
      zh: "資訊",
      th: "ข้อมูล",
      vn: "Quầy thông tin",
    },
    {
      en: "President's Team Lounge",
      id: "President's Team Lounge",
      jp: "プレジデントチーム ラウンジ",
      kh: "ទីកន្លែងក្រុម President's Team",
      kr: "프레지던트팀 라운지",
      zh: "總裁組休息室",
      th: "เพรสซิเด้นท์ ทีมเลาจ์",
      vn: "Phòng dành riêng cho Thành Viên Nhóm Chủ Tịch",
    },
    {
      en: "HIM Virtual Tour",
      id: "Tour Virtual HIM",
      jp: "HIMバーチャルツアー",
      kh: "ដំណើរទេសចរណ៍និម្មិត HIM",
      kr: "HIM 버추얼 투어",
      zh: "HIM 線上之旅",
      th: "HIM Virtual Tour",
      vn: "Tham quan trực tuyến Nhà máy H.I.M",
    },
    {
      en: "Recognition",
      id: "Rekognisi",
      jp: "レコグニション",
      kh: "ការទទួលស្គាល់",
      kr: "레커니션",
      zh: "表揚",
      th: "การประกาศเกียรติคุณ",
      vn: "Tuyên dương",
    },
    {
      en: "Breakout Session",
      id: "Breakout Session",
      jp: "ブレイクアウトルーム",
      kh: "បន្ទប់សម្រាក",
      kr: "브레이크아웃 룸",
      zh: "分組討論",
      th: "ห้องประชุมย่อย",
      vn: "Phòng Thảo luận",
    },
    {
      en: "Games",
      id: "Game",
      jp: "ゲーム",
      kh: "ល្បែងកំសាន្ត",
      kr: "게임",
      zh: "遊戲",
      th: "เกมส์",
      vn: "Trò chơi",
    },
    {
      en: "HNF",
      id: "HNF",
      jp: "HNF",
      kh: "HNF",
      kr: "HNF",
      zh: "賀寶芙慈善基金會",
      th: "HNF",
      vn: "Quỹ Herbalife Nutrition Foundation (HNF)",
    },
    {
      en: "Future Chairman's Club Forum",
      id: "Future Chairman's Club Forum",
      jp: "フューチャー チェアマンズクラブ フォーラム",
      kh: "វេទិកាអនាគតChairman's Club",
      kr: "퓨처 체어맨스 클럽 포럼",
      zh: "未來主席俱樂部",
      th: "งานประชุม Future Chairman's Club",
      vn: "Diễn đàn  Câu Lạc Bộ Chủ Tịch Tương Lai",
    },
    {
      en: "Training",
      id: "Training",
      jp: "トレーニング",
      kh: "ការបណ្តុះបណ្តាល",
      kr: "트레이닝",
      zh: "訓練",
      th: "เทรนนิ่ง",
      vn: "Huấn luyện",
    },
  ];

  const languages = ["en", "id", "jp", "kh", "kr", "zh", "th", "vn"];

  const windowURL = window.location.href.split("showcases")[1].split("/")[1];
  const splitPath = windowURL.split("-");
  const lgInURL = splitPath[splitPath.length - 1];
  const selectedLanguage =
    splitPath.length > 2
      ? lgInURL
      : window.localStorage.getItem("language") || "en";

  $("#detectLang").addClass("en");

  if (languages.includes(selectedLanguage)) {
    $("#detectLang").removeAttr("class");
    $("#detectLang").addClass(selectedLanguage);
    window.localStorage.setItem("language", selectedLanguage);
  } else {
    window.localStorage.setItem("language", "en");
  }

  function isEmptyOrSpaces(str) {
    if (typeof str === "string")
      return str === null || str.match(/^ *$/) !== null;
  }

  function translate(language) {
    const elCollection = [
      document.querySelector('span[id="navHome"]'),
      document.querySelector('span[id="navInfo"]'),
      document.querySelector('span[id="navHvt"]'),
      document.querySelector('span[id="navPres"]'),
      document.querySelector('span[id="navFuture"]'),
      document.querySelector('span[id="navBout"]'),
      document.querySelector('span[id="navHnf"]'),
      document.querySelector('span[id="navSurvey"]'),
      document.querySelector('span[id="navAgenda"]'),
      document.querySelector('span[id="navExpo"]'),
      document.querySelector('span[id="navTraining"]'),
      document.querySelector('span[id="navRecognition"]'),
      document.querySelector('span[id="navGames"]'),
    ];

    if (elCollection.length) {
      for (var el = 0; el < elCollection.length; el++) {
        if (
          elCollection[el] &&
          elCollection[el]?.textContent &&
          translations.filter(
            (e) =>
              Object.values(e).filter(
                (i) =>
                  i.toLowerCase() ===
                  elCollection[el]?.textContent?.toLowerCase()
              ).length && e
          ).length
        ) {
          elCollection[el].textContent = translations.filter(
            (e) =>
              Object.values(e).filter(
                (i) =>
                  i.toLowerCase() ===
                  elCollection[el]?.textContent?.toLowerCase()
              ).length && e
          )[0][language];
        }
      }
    }
  }

  translate(selectedLanguage);

  $("#language-list a").on("click", function (e) {
    e.preventDefault();
    var language = $(this).data("language");
    $(".langugae-list a").removeClass("active");
    $(this).addClass("active");

    window.localStorage.setItem("language", language);
    const baseURL = "https://www.gevme.com/page/";
    const windowURL = window.location.href.split("showcases")[1].split("/")[1];
    const splitPath = windowURL.split("-");
    const lgInURL =
      splitPath.length > 2 && splitPath.length < 4
        ? splitPath[splitPath.length - 1]
        : null;

    if (!lgInURL) {
      translate(language);
      return window.localStorage.setItem("language", language);
    }

    if (
      languages.includes(language) &&
      languages.includes(lgInURL) &&
      language !== lgInURL
    ) {
      if (splitPath.length > 2) {
        window.open(
          `${baseURL}${windowURL.slice(0, windowURL.length - 3)}-${language}`,
          "_top"
        );
      } else {
        window.open(`${baseURL}${windowURL}-${language}`, "_top");
      }
    }
  });
});
