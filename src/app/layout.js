import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "../lib/registry";
import MobileNavigationShell from "@/components/MobileNavigationShell";

const mobileNavItems = [
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
        imageSrc: "/images/products/grunt.png",
        variant: "production",
        heroImageSrc: "/images/products/grunt.png",
        heroImageAlt: "Грунт",
        description:
          "Грунт ВКУ применяется при возведении насыпей и благоустройстве территорий. Поддерживает стабильность оснований даже при сложных погодных условиях.",
        specifications: [
          { label: "Влажность", value: "5,0%" },
          { label: "Плотность", value: "1,65 т/м³" },
          { label: "Фракция", value: "0-20 мм" },
        ],
        highlights: [
          "Паспорт качества № 12/24",
          "Соответствует ГОСТ 25100-2020",
        ],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-grunt",
      },
      {
        key: "product-pesok",
        label: "Песок",
        price: "от 210 р./м³",
        imageSrc: "/images/products/pesok.png",
        variant: "production",
        heroImageSrc: "/images/products/pesok.png",
        heroImageAlt: "Песок",
        description:
          "Речной песок для строительства и благоустройства. Подходит для приготовления растворов и устройства подушек под фундамент.",
        specifications: [
          { label: "Модуль крупности", value: "1,2" },
          { label: "Содержание пыли", value: "до 3%" },
          { label: "Влажность", value: "4,5%" },
        ],
        highlights: [
          "Испытано лабораторией ВКУ",
          "Документ качества в комплекте",
        ],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-pesok",
      },
      {
        key: "product-graviy",
        label: "Гравий",
        price: "от 600 р./м³",
        imageSrc: "/images/products/graviy.png",
        variant: "production",
        heroImageSrc: "/images/products/graviy.png",
        heroImageAlt: "Гравий",
        description:
          "Прочный гравий из местных месторождений для дорожных и бетонных работ.",
        specifications: [
          { label: "Фракция", value: "5-20 мм" },
          { label: "Марка по прочности", value: "М800" },
          { label: "Содержание примесей", value: "до 1%" },
        ],
        highlights: [
          "Партия сертифицирована",
        ],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-graviy",
      },
      {
        key: "product-buty",
        label: "Бутовый камень",
        price: "от 210 р./м³",
        imageSrc: "/images/products/prirodny-kamen.png",
        variant: "production",
        heroImageSrc: "/images/products/prirodny-kamen.png",
        heroImageAlt: "Бутовый камень",
        description:
          "Бутовый камень для подпорных стен и декоративных работ.",
        specifications: [
          { label: "Размер камня", value: "150-400 мм" },
          { label: "Прочность", value: "М1000" },
        ],
        highlights: ["Поставляется навалом или в биг-бэгах"],
        ctaLabel: "Запросить цену",
        ctaHref: "/order?product=product-buty",
      },
      {
        key: "product-scheben",
        label: "Щебень",
        price: "от 800 р./м³",
        imageSrc: "/images/products/scheben.png",
        variant: "production",
        heroImageSrc: "/images/products/scheben.png",
        heroImageAlt: "Щебень",
        description:
          "Гранитный щебень для бетонирования и устройства оснований дорог.",
        specifications: [
          { label: "Фракция", value: "20-40 мм" },
          { label: "Пористость", value: "до 1,2%" },
          { label: "Лещадность", value: "до 15%" },
        ],
        highlights: ["Производство ВКУ"],
        ctaLabel: "В заказ",
        ctaHref: "/order?product=product-scheben",
      },
      {
        key: "product-prirodny",
        label: "Природный камень",
        price: "от 500 р./м³",
        imageSrc: "/images/products/prirodny-kamen.png",
        variant: "production",
        heroImageSrc: "/images/products/prirodny-kamen.png",
        heroImageAlt: "Природный камень",
        description:
          "Природный камень для ландшафтного дизайна и облицовки.",
        specifications: [
          { label: "Форма", value: "плитняк" },
          { label: "Средняя толщина", value: "30-70 мм" },
        ],
        highlights: ["Разнообразие оттенков на складе"],
        ctaLabel: "Уточнить наличие",
        ctaHref: "/order?product=product-prirodny",
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
