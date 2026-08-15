export const translations = {
  en: {
    nav: {
      home: "Home",
      bhajans: "Bhajans",
      kirtans: "Kirtans",
      learn: "Learn",
      calm: "Calm",
      about: "About Us",
      login: "Login",
      language: "Language"
    },
    hero: {
      tag: "Authentic Devotional Hub",
      title1: "SWAR",
      title2: "GIRI",
      subtitle: "Your digital gateway to divine melodies. Experience peace through kirtans, bhajans, and spiritual learning."
    },
    pillars: {
      streamTitle: "Stream Devotion",
      streamDesc: "Audio and video library with lyrics, playlists, and offline cache.",
      learnTitle: "Learn Traditions",
      learnDesc: "Structured courses for kirtan, instruments, and devotional theory.",
      createTitle: "Create and Grow",
      createDesc: "Creator tools, analytics, and community engagement for kirtankars."
    }
  },
  hi: {
    nav: {
      home: "होम",
      bhajans: "भजन",
      kirtans: "कीर्तन",
      learn: "सीखें",
      calm: "शांति",
      about: "हमारे बारे में",
      login: "लॉग इन",
      language: "भाषा"
    },
    hero: {
      tag: "प्रामाणिक भक्ति केंद्र",
      title1: "स्वर",
      title2: "गिरी",
      subtitle: "दिव्य धुनों का आपका डिजिटल द्वार। कीर्तन, भजन और आध्यात्मिक शिक्षा के माध्यम से शांति का अनुभव करें।"
    },
    pillars: {
      streamTitle: "भक्ति स्ट्रीम करें",
      streamDesc: "धुनों, प्लेलिस्ट और ऑफलाइन कैशे के साथ ऑडियो और वीडियो लाइब्रेरी।",
      learnTitle: "परंपराओं को सीखें",
      learnDesc: "कीर्तन, वाद्ययंत्र और भक्ति सिद्धांत के लिए संरचित पाठ्यक्रम।",
      createTitle: "बनाएं और बढ़ें",
      createDesc: "कीर्तनकारों के लिए क्रिएटर उपकरण, एनालिटिक्स और सामुदायिक जुड़ाव।"
    }
  },
  mr: {
    nav: {
      home: "मुखपृष्ठ",
      bhajans: "भजन",
      kirtans: "कीर्तन",
      learn: "शिका",
      calm: "शांतता",
      about: "आमच्याबद्दल",
      login: "लॉगिन",
      language: "भाषा"
    },
    hero: {
      tag: "प्रामाणिक भक्ति केंद्र",
      title1: "स्वर",
      title2: "गिरी",
      subtitle: "दिव्य संगीताचे तुमचे डिजिटल प्रवेशद्वार. कीर्तन, भजन आणि आध्यात्मिक शिक्षणाद्वारे शांती अनुभवा."
    },
    pillars: {
      streamTitle: "भक्ती प्रवाहित करा",
      streamDesc: "गीते, प्लेलिस्ट आणि ऑफलाइन कॅशेसह ऑडिओ आणि व्हिडिओ लायब्ररी.",
      learnTitle: "परंपरा शिका",
      learnDesc: "कीर्तन, वाद्ये आणि भक्ती सिद्धांतांसाठी संरचित अभ्यासक्रम.",
      createTitle: "तयार करा आणि वाढवा",
      createDesc: "कीर्तनकारांसाठी क्रिएटर टूल्स, विश्लेषणे आणि समुदाय सहभाग."
    }
  }
};

export type LanguageCode = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function getTranslation(lang: string, category: TranslationKey, key: string): string {
  const language = (translations as any)[lang] || translations.en;
  if (language[category] && language[category][key]) {
    return language[category][key];
  }
  // Fallback to English
  return translations.en[category]?.[key as keyof typeof translations.en[typeof category]] || key;
}
