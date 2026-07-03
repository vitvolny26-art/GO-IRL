import type { Activity, Category } from "./types";

export const categories: Category[] = [
  { id: "sport", icon: "🏆", name: { ru: "Спорт", cs: "Sport" } },
  { id: "activities", icon: "🎉", name: { ru: "Активности", cs: "Aktivity" } },
  { id: "party", icon: "🍻", name: { ru: "Вечеринки", cs: "Večírky" } },
  { id: "nature", icon: "🌿", name: { ru: "Природа", cs: "Příroda" } },
  { id: "social", icon: "❤️", name: { ru: "Общение", cs: "Setkání" } },
  { id: "creativity", icon: "🎨", name: { ru: "Творчество", cs: "Tvorba" } },
];

export const activityOptions: Record<string, Array<{ icon: string; name: { ru: string; cs: string } }>> = {
  sport: [
    { icon: "🏐", name: { ru: "Волейбол", cs: "Volejbal" } },
    { icon: "⚽", name: { ru: "Футбол", cs: "Fotbal" } },
    { icon: "🏀", name: { ru: "Баскетбол", cs: "Basketbal" } },
    { icon: "🎾", name: { ru: "Теннис", cs: "Tenis" } },
    { icon: "🏃", name: { ru: "Бег", cs: "Běh" } },
    { icon: "🏋️", name: { ru: "Тренажёрный зал", cs: "Posilovna" } },
    { icon: "🧘", name: { ru: "Йога", cs: "Jóga" } },
  ],
  activities: [
    { icon: "☕", name: { ru: "Кофе", cs: "Káva" } },
    { icon: "🎬", name: { ru: "Кино", cs: "Kino" } },
    { icon: "🎳", name: { ru: "Боулинг", cs: "Bowling" } },
    { icon: "🎲", name: { ru: "Настольные игры", cs: "Deskové hry" } },
    { icon: "🎤", name: { ru: "Караоке", cs: "Karaoke" } },
  ],
  party: [
    { icon: "🍺", name: { ru: "PIVO", cs: "PIVO" } },
    { icon: "🍻", name: { ru: "Бар", cs: "Bar" } },
    { icon: "🍷", name: { ru: "Вино", cs: "Víno" } },
    { icon: "🎵", name: { ru: "Концерт", cs: "Koncert" } },
    { icon: "🎪", name: { ru: "Фестиваль", cs: "Festival" } },
  ],
  nature: [
    { icon: "🥾", name: { ru: "Поход", cs: "Výlet" } },
    { icon: "🧺", name: { ru: "Пикник", cs: "Piknik" } },
    { icon: "⛺", name: { ru: "Кемпинг", cs: "Kempování" } },
    { icon: "🎣", name: { ru: "Рыбалка", cs: "Rybaření" } },
    { icon: "🛶", name: { ru: "Каяки", cs: "Kajaky" } },
  ],
  social: [
    { icon: "🚶", name: { ru: "Прогулка", cs: "Procházka" } },
    { icon: "🍽️", name: { ru: "Ужин", cs: "Večeře" } },
    { icon: "🗣️", name: { ru: "Языковой обмен", cs: "Jazyková výměna" } },
    { icon: "💻", name: { ru: "Коворкинг", cs: "Coworking" } },
    { icon: "🤝", name: { ru: "Новые знакомства", cs: "Nová seznámení" } },
  ],
  creativity: [
    { icon: "🎨", name: { ru: "Рисование", cs: "Malování" } },
    { icon: "📸", name: { ru: "Фотопрогулка", cs: "Fotoprocházka" } },
    { icon: "🏺", name: { ru: "Керамика", cs: "Keramika" } },
    { icon: "🎸", name: { ru: "Музыкальный джем", cs: "Hudební jam" } },
    { icon: "🧶", name: { ru: "Мастерская", cs: "Dílna" } },
  ],
};

export const seedActivities: Activity[] = [];
