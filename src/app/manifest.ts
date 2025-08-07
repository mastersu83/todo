import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Планировщик задач",
    short_name: "ToDo",
    description: "ToDo - приложение для планирования",
    start_url: "/",
    lang: "ru-RU",
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
    orientation: "portrait",
    icons: [
      {
        purpose: "any",
        src: "/images/DK.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        purpose: "any",
        src: "/images/DK.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        purpose: "maskable",
        src: "/images/DK.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
