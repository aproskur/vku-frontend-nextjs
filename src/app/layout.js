import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import MobileNavigationShell from "@/components/MobileNavigationShell";

export const mobileNavItems = [
  { key: "about", label: "О компании", href: "/about" },
  { key: "sites", label: "Площадки", href: "/locations" },
  {
    key: "products",
    label: "Продукция",
    children: [
      {
        key: "product-grunt",
        label: "Грунт",
        price: "от 1000 р./м³",
        imageSrc: "/images/products/grunt.webp",
        variant: "production",
        heroImageSrc: "/images/products/grunt.webp",
        heroImageAlt: "Грунт",
        description:
          "Грунт ВКУ применяется при возведении насыпей и благоустройстве территорий. Поддерживает стабильность оснований даже при сложных погодных условиях.",
        specifications: [
          { label: "Влажность", value: "5,0%" },
          { label: "Плотность", value: "1,65 т/м³" },
          { label: "Фракция", value: "0–20 мм" },
        ],
        highlights: ["Паспорт качества № 12/24", "Соответствует ГОСТ 25100-2020"],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-grunt",
      },
      {
        key: "product-pesok",
        label: "Песок",
        price: "от 210 р./м³",
        imageSrc: "/images/products/pesok.webp",
        variant: "production",
        heroImageSrc: "/images/products/pesok.webp",
        heroImageAlt: "Песок",
        description:
          "Речной песок для строительства и благоустройства. Подходит для приготовления растворов и устройства подушек под фундамент.",
        specifications: [
          { label: "Модуль крупности", value: "1,2" },
          { label: "Содержание пыли", value: "до 3%" },
          { label: "Влажность", value: "4,5%" },
        ],
        highlights: ["Испытано лабораторией ВКУ", "Документ качества в комплекте"],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-pesok",
      },
      {
        key: "product-mytyi-pesok",
        label: "Мытый песок",
        price: "по запросу",
        imageSrc: "/images/products/mytyi-pesok.webp",
        variant: "production",
        heroImageSrc: "/images/products/mytyi-pesok.webp",
        heroImageAlt: "Мытый песок",
        description:
          "Очищенный мытый песок для бетонов, стяжек и кладочных растворов.",
        specifications: [
          { label: "Модуль крупности", value: "1,5–2,0" },
          { label: "Содержание примесей", value: "≤ 1%" },
        ],
        highlights: ["Повышенная чистота"],
        ctaLabel: "Уточнить цену",
        ctaHref: "/order?product=product-mytyi-pesok",
      },
      {
        key: "product-graviy",
        label: "Гравий",
        price: "от 600 р./м³",
        imageSrc: "/images/products/graviy.webp",
        variant: "production",
        heroImageSrc: "/images/products/graviy.webp",
        heroImageAlt: "Гравий",
        description:
          "Прочный гравий из местных месторождений для дорожных и бетонных работ.",
        specifications: [
          { label: "Фракция", value: "5–20 мм" },
          { label: "Марка по прочности", value: "М800" },
          { label: "Содержание примесей", value: "до 1%" },
        ],
        highlights: ["Партия сертифицирована"],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-graviy",
      },
      {
        key: "product-scheben",
        label: "Щебень",
        price: "от 800 р./м³",
        imageSrc: "/images/products/scheben.webp",
        variant: "production",
        heroImageSrc: "/images/products/scheben.webp",
        heroImageAlt: "Щебень",
        description:
          "Гранитный щебень для бетонирования и устройства оснований дорог.",
        specifications: [
          { label: "Фракция", value: "20–40 мм" },
          { label: "Пористость", value: "до 1,2%" },
          { label: "Лещадность", value: "до 15%" },
        ],
        highlights: ["Производство ВКУ"],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-scheben",
      },
      {
        key: "product-otsev",
        label: "Отсев",
        price: "по запросу",
        imageSrc: "/images/products/otsev.webp",
        variant: "production",
        heroImageSrc: "/images/products/otsev.webp",
        heroImageAlt: "Отсев",
        description:
          "Минеральный отсев для подсыпки, выравнивания и приготовления сухих смесей.",
        specifications: [
          { label: "Фракция", value: "0–5 мм" },
          { label: "Содержание пыли", value: "до 10%" },
        ],
        highlights: ["Стабильная фракция"],
        ctaLabel: "Уточнить цену",
        ctaHref: "/order?product=product-otsev",
      },
      {
        key: "product-otsev-drobleniya",
        label: "Отсев дробления",
        price: "по запросу",
        imageSrc: "/images/products/otsev-drobleniya.webp",
        variant: "production",
        heroImageSrc: "/images/products/otsev-drobleniya.webp",
        heroImageAlt: "Отсев дробления",
        description:
          "Технологический продукт дробления для подушек и подготовки оснований.",
        specifications: [
          { label: "Фракция", value: "0–10 мм" },
          { label: "Тип породы", value: "гранит/известняк" },
        ],
        highlights: ["Высокая сыпучесть"],
        ctaLabel: "Уточнить цену",
        ctaHref: "/order?product=product-otsev-drobleniya",
      },
      {
        key: "product-shps",
        label: "ЩПС (щебеночно-песчаная смесь)",
        price: "по запросу",
        imageSrc: "/images/products/schebenochno-peschanaya-smes.webp",
        variant: "production",
        heroImageSrc: "/images/products/schebenochno-peschanaya-smes.webp",
        heroImageAlt: "Щебеночно-песчаная смесь",
        description:
          "Смесь для устройства оснований и выравнивающих слоёв дорожных покрытий.",
        specifications: [
          { label: "Состав", value: "щебень + песок" },
          { label: "Фракция щебня", value: "5–20 мм" },
        ],
        highlights: ["Оптимальное зерновое распределение"],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-shps",
      },
      {
        key: "product-pgs",
        label: "ПГС (песчано-гравийная смесь)",
        price: "по запросу",
        imageSrc: "/images/products/pgs.webp",
        variant: "production",
        heroImageSrc: "/images/products/pgs.webp",
        heroImageAlt: "Песчано-гравийная смесь",
        description:
          "Натуральная смесь для подсыпки, подушек и малоответственных бетонов.",
        specifications: [
          { label: "Гравий", value: "до 30%" },
          { label: "Фракция гравия", value: "5–20 мм" },
        ],
        highlights: ["Доступно круглый год"],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-pgs",
      },
      {
        key: "product-prirodny-kamen",
        label: "Природный камень",
        price: "от 500 р./м³",
        imageSrc: "/images/products/prirodniy-kamen.webp",
        variant: "production",
        heroImageSrc: "/images/products/prirodniy-kamen.webp",
        heroImageAlt: "Природный камень",
        description:
          "Природный камень для ландшафтного дизайна и облицовки.",
        specifications: [
          { label: "Форма", value: "плитняк" },
          { label: "Средняя толщина", value: "30–70 мм" },
        ],
        highlights: ["Разнообразие оттенков на складе"],
        ctaLabel: "Уточнить наличие",
        ctaHref: "/order?product=product-prirodny-kamen",
      },
      {
        key: "product-beton",
        label: "Бетон",
        price: "по запросу",
        imageSrc: "/images/products/beton.webp",
        variant: "production",
        heroImageSrc: "/images/products/beton.webp",
        heroImageAlt: "Бетон",
        description:
          "Товарный бетон для монолитных работ. Подача автобетоносмесителем.",
        specifications: [
          { label: "Класс прочности", value: "B15–B30" },
          { label: "Подвижность", value: "П2–П4" },
        ],
        highlights: ["Паспорта и протоколы испытаний"],
        ctaLabel: "Запросить цену",
        ctaHref: "/order?product=product-beton",
      },
    ],
  },
];


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata = {
  title: "Вологодское карьерное управление",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} ${ubuntu.variable}`}>
        <StyledComponentsRegistry>
          <MobileNavigationShell items={mobileNavItems} />
          <main className="app-main-hidden-on-mobile">{children}</main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
