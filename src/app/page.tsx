import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import UpcomingEvents from "@/components/home/upcoming-events";
import ImpactSection from "@/components/home/impact-section";
import GallerySection from "@/components/home/gallery-section";
import NewsletterSection from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <UpcomingEvents />
      <ImpactSection />
      <GallerySection />
      <NewsletterSection />
    </>
  );
}