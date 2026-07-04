import type { Activity, Category } from "./types";

export const categories: Category[] = [
  { id: "sport", icon: "🏆", name: { ru: "Спорт", uk: "Спорт", cs: "Sport", en: "Sport" } },
  { id: "activities", icon: "🎉", name: { ru: "Активности", uk: "Активності", cs: "Aktivity", en: "Activities" } },
  { id: "party", icon: "🍻", name: { ru: "Вечеринки", uk: "Вечірки", cs: "Večírky", en: "Parties" } },
  { id: "nature", icon: "🌿", name: { ru: "Природа", uk: "Природа", cs: "Příroda", en: "Nature" } },
  { id: "social", icon: "❤️", name: { ru: "Общение", uk: "Спілкування", cs: "Setkání", en: "Social" } },
  { id: "creativity", icon: "🎨", name: { ru: "Творчество", uk: "Творчість", cs: "Tvorba", en: "Creativity" } },
];

export const activityOptions: Record<string, Array<{ icon: string; name: Category["name"] }>> = {
  sport: [
    { icon: "🏐", name: { ru: "Волейбол", uk: "Волейбол", cs: "Volejbal", en: "Volleyball" } },
    { icon: "⚽", name: { ru: "Футбол", uk: "Футбол", cs: "Fotbal", en: "Football" } },
    { icon: "🏀", name: { ru: "Баскетбол", uk: "Баскетбол", cs: "Basketbal", en: "Basketball" } },
    { icon: "🎾", name: { ru: "Теннис", uk: "Теніс", cs: "Tenis", en: "Tennis" } },
    { icon: "🏃", name: { ru: "Бег", uk: "Біг", cs: "Běh", en: "Running" } },
    { icon: "🏋️", name: { ru: "Тренажёрный зал", uk: "Тренажерний зал", cs: "Posilovna", en: "Gym" } },
    { icon: "🧘", name: { ru: "Йога", uk: "Йога", cs: "Jóga", en: "Yoga" } },
  ],
  activities: [
    { icon: "☕", name: { ru: "Кофе", uk: "Кава", cs: "Káva", en: "Coffee" } },
    { icon: "🎬", name: { ru: "Кино", uk: "Кіно", cs: "Kino", en: "Cinema" } },
    { icon: "🎳", name: { ru: "Боулинг", uk: "Боулінг", cs: "Bowling", en: "Bowling" } },
    { icon: "🎲", name: { ru: "Настольные игры", uk: "Настільні ігри", cs: "Deskové hry", en: "Board games" } },
    { icon: "🎤", name: { ru: "Караоке", uk: "Караоке", cs: "Karaoke", en: "Karaoke" } },
    { icon: "🛼", name: { ru: "Ролики", uk: "Ролики", cs: "Inline bruslení", en: "Inline skating" } },
  ],
  party: [
    { icon: "🍺", name: { ru: "PIVO", uk: "PIVO", cs: "PIVO", en: "Beer" } },
    { icon: "🍻", name: { ru: "Бар", uk: "Бар", cs: "Bar", en: "Bar" } },
    { icon: "🍷", name: { ru: "Вино", uk: "Вино", cs: "Víno", en: "Wine" } },
    { icon: "🎵", name: { ru: "Концерт", uk: "Концерт", cs: "Koncert", en: "Concert" } },
    { icon: "🎪", name: { ru: "Фестиваль", uk: "Фестиваль", cs: "Festival", en: "Festival" } },
  ],
  nature: [
    { icon: "🥾", name: { ru: "Поход", uk: "Похід", cs: "Výlet", en: "Hike" } },
    { icon: "🧺", name: { ru: "Пикник", uk: "Пікнік", cs: "Piknik", en: "Picnic" } },
    { icon: "⛺", name: { ru: "Кемпинг", uk: "Кемпінг", cs: "Kempování", en: "Camping" } },
    { icon: "🎣", name: { ru: "Рыбалка", uk: "Риболовля", cs: "Rybaření", en: "Fishing" } },
    { icon: "🛶", name: { ru: "Каяки", uk: "Каяки", cs: "Kajaky", en: "Kayaking" } },
  ],
  social: [
    { icon: "🚶", name: { ru: "Прогулка", uk: "Прогулянка", cs: "Procházka", en: "Walk" } },
    { icon: "🍽️", name: { ru: "Ужин", uk: "Вечеря", cs: "Večeře", en: "Dinner" } },
    { icon: "🗣️", name: { ru: "Языковой обмен", uk: "Мовний обмін", cs: "Jazyková výměna", en: "Language exchange" } },
    { icon: "💻", name: { ru: "Коворкинг", uk: "Коворкінг", cs: "Coworking", en: "Coworking" } },
    { icon: "🤝", name: { ru: "Новые знакомства", uk: "Нові знайомства", cs: "Nová seznámení", en: "Meet new people" } },
  ],
  creativity: [
    { icon: "🎨", name: { ru: "Рисование", uk: "Малювання", cs: "Malování", en: "Drawing" } },
    { icon: "📸", name: { ru: "Фотопрогулка", uk: "Фотопрогулянка", cs: "Fotoprocházka", en: "Photo walk" } },
    { icon: "🏺", name: { ru: "Керамика", uk: "Кераміка", cs: "Keramika", en: "Ceramics" } },
    { icon: "🎸", name: { ru: "Музыкальный джем", uk: "Музичний джем", cs: "Hudební jam", en: "Music jam" } },
    { icon: "🧶", name: { ru: "Мастерская", uk: "Майстерня", cs: "Dílna", en: "Workshop" } },
  ],
};

export const seedActivities: Activity[] = [];
