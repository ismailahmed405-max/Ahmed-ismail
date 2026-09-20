import { Language } from '../context/LanguageContext';

// Cultural Character Images
import seniorArabImg from '../assets/images/senior_arab_care_1789914054679.jpg';
import seniorAsianImg from '../assets/images/senior_asian_care_1789914069957.jpg';
import seniorWesternImg from '../assets/images/senior_western_care_1789914082090.jpg';
import seniorLatinoImg from '../assets/images/senior_latino_care_1789914094027.jpg';
import elderlyHandCareImg from '../assets/images/elderly_hand_care_1789911673516.jpg';

export interface CultureAssetConfig {
  heroCharacterImg: string;
  handCareImg: string;
  heroCharacterAlt: string;
  characterTitle: string;
  cultureGreeting: string;
}

export const CULTURE_ASSETS: Record<Language, CultureAssetConfig> = {
  ar: {
    heroCharacterImg: seniorArabImg,
    handCareImg: elderlyHandCareImg,
    heroCharacterAlt: 'كبير السن في بيئة عائلية دافئة ومحترمة',
    characterTitle: 'الوالد / الوالدة • برٌّ ورعاية في الوطن العربي',
    cultureGreeting: 'رعاية الوالدين وكبار السن بركة بيوتنا وأعظم أمانة'
  },
  en: {
    heroCharacterImg: seniorWesternImg,
    handCareImg: elderlyHandCareImg,
    heroCharacterAlt: 'Senior elder surrounded by warm family care and dignity',
    characterTitle: 'Beloved Senior • Dignified Family Care',
    cultureGreeting: 'Caring for our elders with devotion, dignity and tenderness'
  },
  fr: {
    heroCharacterImg: seniorWesternImg,
    handCareImg: elderlyHandCareImg,
    heroCharacterAlt: 'Personne âgée entourée de soins bienveillants',
    characterTitle: 'Nos Aînés • Respect et Douceur de Vivre',
    cultureGreeting: 'Prendre soin de nos aînés avec bienveillance et humanité'
  },
  es: {
    heroCharacterImg: seniorLatinoImg,
    handCareImg: elderlyHandCareImg,
    heroCharacterAlt: 'Adulto mayor con cálido apoyo y amor familiar',
    characterTitle: 'Nuestros Abuelos y Padres • Cariño Familiar',
    cultureGreeting: 'El cuidado con amor, respeto y dignidad para nuestros mayores'
  },
  de: {
    heroCharacterImg: seniorWesternImg,
    handCareImg: elderlyHandCareImg,
    heroCharacterAlt: 'Senior in herzlicher und respektvoller Familienumgebung',
    characterTitle: 'Unsere Senioren • Würdevolle Fürsorge',
    cultureGreeting: 'Liebevolle und verlässliche Fürsorge für die ältere Generation'
  },
  tr: {
    heroCharacterImg: seniorLatinoImg,
    handCareImg: elderlyHandCareImg,
    heroCharacterAlt: 'Şefkat ve hürmetle bakılan değerli aile büyüğü',
    characterTitle: 'Değerli Büyüklerimiz • Aile Şefkati',
    cultureGreeting: 'Büyüklerimize hürmet, sevgi ve merhametle kol kanat germek'
  },
  ja: {
    heroCharacterImg: seniorAsianImg,
    handCareImg: elderlyHandCareImg,
    heroCharacterAlt: '敬愛と思いやりに包まれた穏やかな高齢者',
    characterTitle: '敬愛するシニア • 尊厳ある家族ケア',
    cultureGreeting: '長寿を尊び、深い思いやりと敬愛の心で寄り添う介護'
  }
};

export function getCultureAsset(lang: Language): CultureAssetConfig {
  return CULTURE_ASSETS[lang] || CULTURE_ASSETS.ar;
}
