'use client'

import { AppConfig } from "@/components/landing/AppConfig";
import { Banner } from "@/components/landing/Banner";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Meta } from "@/components/landing/Meta";
import { VerticalFeatures } from "@/components/landing/VerticalFeatures";
import "./global.css";

export default function Home() {
  return (
    <div className="text-gray-600 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <VerticalFeatures />
    <Banner />
    <Footer />
  </div>
  );
}
