import type { StaticImageData } from "next/image";
import algeriaSaharaDroneImage from "@/public/algeria-sahara-drone-1920.jpg";
import flareStackImage from "@/public/flare-stack-1280.jpg";
import grandErgCamelImage from "@/public/grand-erg-camel-4608.jpg";
import hassiMessaoudDesertImage from "@/public/hassi-messaoud-desert-768.jpg";
import heroWellheadImage from "@/public/hero-wellhead.webp";
import roughnecksImage from "@/public/roughnecks-1600.jpg";
import tassiliDunesImage from "@/public/tassili-dunes-4032.jpg";

export type SiteMediaKey =
  | "hero"
  | "roughnecks"
  | "flareStack"
  | "saharaDrone"
  | "tassiliDunes"
  | "grandErgCamel"
  | "hassiMessaoud";

export type SiteMediaEntry = {
  alt: string;
  image: StaticImageData;
};

export const siteMedia: Record<SiteMediaKey, SiteMediaEntry> = {
  hero: {
    alt: "Oil and gas wellhead operation at field level",
    image: heroWellheadImage,
  },
  roughnecks: {
    alt: "Roughnecks working on a drilling rig",
    image: roughnecksImage,
  },
  flareStack: {
    alt: "Gas flare stack at an oil refinery",
    image: flareStackImage,
  },
  saharaDrone: {
    alt: "Aerial view of dunes in the Algerian Sahara",
    image: algeriaSaharaDroneImage,
  },
  tassiliDunes: {
    alt: "Dunes and rock formations at Tassili n'Ajjer in the Algerian Sahara",
    image: tassiliDunesImage,
  },
  grandErgCamel: {
    alt: "Camel and large dune in the Grand Erg Oriental in Algeria",
    image: grandErgCamelImage,
  },
  hassiMessaoud: {
    alt: "Desert landscape near Hassi Messaoud, Algeria",
    image: hassiMessaoudDesertImage,
  },
};
