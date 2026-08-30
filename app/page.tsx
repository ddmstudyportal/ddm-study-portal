import Header from "../components/Header";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import ClassSection from "../components/ClassSection";
import SubjectSection from "../components/SubjectSection";
import FeaturedNotes from "../components/FeaturedNotes";
import WhyChoose from "../components/WhyChoose";
import HeroSearch from "../components/HeroSearch";
import ClassesGrid from "../components/ClassesGrid";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <StatsSection />
      <ClassSection />
      <SubjectSection />
      <FeaturedNotes />
      <WhyChoose />
      <HeroSearch />
      <ClassesGrid />
    </>
  );
}