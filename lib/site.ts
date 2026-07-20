// Endereço absoluto do site — as miniaturas de compartilhamento exigem URL
// completa. Defina NEXT_PUBLIC_SITE_URL quando houver domínio próprio.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://palestra-bni.vercel.app";

// Declarar openGraph numa página substitui o objeto inteiro do layout, então a
// imagem precisa ser repetida em cada página — senão o preview sai sem ela.
export const OG_IMAGE = {
  url: "/brand/og-elev.png",
  width: 1080,
  height: 1080,
  alt: "Elev",
};

export function shareMetadata(
  title: string,
  description: string,
  path: string,
) {
  return {
    title,
    description,
    openGraph: {
      type: "website" as const,
      locale: "pt_BR",
      siteName: "Elev",
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
