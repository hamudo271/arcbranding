export const BRAND = {
  name: "아크브랜딩",
  nameEn: "Arc Branding",
  logoType: "text" as "text" | "image",
  logoPath: {
    black: "/images/logo/arcbranding-logo-black.svg",
    white: "/images/logo/arcbranding-logo-white.svg",
  },
  copyright: "ⓒ아크브랜딩. ALL RIGHTS RESERVED.",
  address: "서울시 강남구 강남대로 308",
  phone: "+82-2-0000-0000",
  email: "contact@arcbranding.com",
  sns: {
    instagram: "https://instagram.com/arcbranding",
    youtube: "",
    facebook: "",
    blog: "",
  },
} as const;

export type BrandSns = keyof typeof BRAND.sns;
