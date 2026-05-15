import type { StaticImageData } from "next/image";
import gpsField01Image from "@/public/gps/gps-field-01.jpeg";
import gpsField02Image from "@/public/gps/gps-field-02.jpeg";
import gpsField03Image from "@/public/gps/gps-field-03.jpeg";
import gpsField04Image from "@/public/gps/gps-field-04.jpeg";
import gpsField05Image from "@/public/gps/gps-field-05.jpeg";
import gpsField06Image from "@/public/gps/gps-field-06.jpeg";
import gpsMainImage from "@/public/gps/gps-main.jpeg";
import algeriaElMerkRigImage from "@/public/algeria-el-merk-rig-1280.jpg";
import algeriaSaharaDroneImage from "@/public/algeria-sahara-drone-1920.jpg";
import heroWellheadImage from "@/public/hero-wellhead.webp";
import naturalGasWellImage from "@/public/natural-gas-wellhead-1280.jpg";
import oilPumpjackPermianImage from "@/public/oil-pumpjack-permian-1280.jpg";
import oilWellheadChristmasTreeImage from "@/public/oil-wellhead-christmas-tree-1280.jpg";

export type SiteMediaKey =
  | "gpsMain"
  | "gpsField01"
  | "gpsField02"
  | "gpsField03"
  | "gpsField04"
  | "gpsField05"
  | "gpsField06"
  | "desertAerial"
  | "fieldWellheadHero"
  | "gasWell"
  | "industryRig"
  | "pumpjackField"
  | "wellheadDetail";

export type SiteMediaEntry = {
  alt: string;
  image: StaticImageData;
};

export const siteMedia: Record<SiteMediaKey, SiteMediaEntry> = {
  gpsMain: {
    alt: "Technicien GPS Energy sur une installation wellhead",
    image: gpsMainImage,
  },
  gpsField01: {
    alt: "Equipe GPS Energy en intervention terrain oil and gas",
    image: gpsField01Image,
  },
  gpsField02: {
    alt: "Technicien GPS Energy sur site industriel",
    image: gpsField02Image,
  },
  gpsField03: {
    alt: "Operation GPS Energy sur equipement de production",
    image: gpsField03Image,
  },
  gpsField04: {
    alt: "Installation et support terrain GPS Energy",
    image: gpsField04Image,
  },
  gpsField05: {
    alt: "Equipe GPS Energy autour d'un equipement wellhead",
    image: gpsField05Image,
  },
  gpsField06: {
    alt: "Support operationnel GPS Energy sur site",
    image: gpsField06Image,
  },
  desertAerial: {
    alt: "Vue aerienne du Sahara algerien",
    image: algeriaSaharaDroneImage,
  },
  fieldWellheadHero: {
    alt: "Operation oil and gas sur equipement wellhead",
    image: heroWellheadImage,
  },
  gasWell: {
    alt: "Equipement de tete de puits gaz naturel",
    image: naturalGasWellImage,
  },
  industryRig: {
    alt: "Rig industriel dans le Sahara algerien",
    image: algeriaElMerkRigImage,
  },
  pumpjackField: {
    alt: "Pompe de production dans un champ petrolier",
    image: oilPumpjackPermianImage,
  },
  wellheadDetail: {
    alt: "Detail d'un equipement wellhead oil and gas",
    image: oilWellheadChristmasTreeImage,
  },
};
