import type { StaticImageData } from "next/image";
import algeriaSaharaDroneImage from "@/public/algeria-sahara-drone-1920.jpg";
import algeriaElMerkRigImage from "@/public/algeria-el-merk-rig-1280.jpg";
import algeriaElMerkRigNightImage from "@/public/algeria-el-merk-rig-night-1280.jpg";
import flareStackImage from "@/public/flare-stack-1280.jpg";
import grandErgCamelImage from "@/public/grand-erg-camel-4608.jpg";
import hassiMessaoudDesertImage from "@/public/hassi-messaoud-desert-768.jpg";
import heroWellheadImage from "@/public/hero-wellhead.webp";
import naturalGasWellImage from "@/public/natural-gas-wellhead-1280.jpg";
import oilPumpjackPermianImage from "@/public/oil-pumpjack-permian-1280.jpg";
import oilWellheadChristmasTreeImage from "@/public/oil-wellhead-christmas-tree-1280.jpg";
import roughnecksImage from "@/public/roughnecks-1600.jpg";
import tassiliDunesImage from "@/public/tassili-dunes-4032.jpg";
import unsplashOilfieldRigImage from "@/public/unsplash-oilfield-rig-1920.jpg";

export type SiteMediaKey =
  | "hero"
  | "roughnecks"
  | "flareStack"
  | "algeriaElMerkRig"
  | "algeriaElMerkRigNight"
  | "naturalGasWell"
  | "oilPumpjackPermian"
  | "oilWellheadChristmasTree"
  | "unsplashOilfieldRig"
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
  algeriaElMerkRig: {
    alt: "Rig 810 at the El Merk oil field in the Algerian Sahara",
    image: algeriaElMerkRigImage,
  },
  algeriaElMerkRigNight: {
    alt: "Rig 810 at night in the El Merk oil field in Algeria",
    image: algeriaElMerkRigNightImage,
  },
  naturalGasWell: {
    alt: "Natural gas wellhead equipment in an oil and gas field",
    image: naturalGasWellImage,
  },
  oilPumpjackPermian: {
    alt: "Oil pumpjack operating in a dry field environment",
    image: oilPumpjackPermianImage,
  },
  oilWellheadChristmasTree: {
    alt: "Oil wellhead Christmas tree with red valves",
    image: oilWellheadChristmasTreeImage,
  },
  unsplashOilfieldRig: {
    alt: "Oil drilling rig standing in a field under a clear sky",
    image: unsplashOilfieldRigImage,
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
