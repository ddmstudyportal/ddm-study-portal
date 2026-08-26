import Header from "../components/Header";
import Hero from "../components/Hero";
import ClassSection from "../components/ClassSection";
import SubjectSection from "../components/SubjectSection";
import FeaturedNotes from "../components/FeaturedNotes";
import HeroSearch from "../components/HeroSearch";
import ClassesGrid from "../components/ClassesGrid";
import WhyChoose from "../components/WhyChoose";
import StatsSection from "../components/StatsSection";

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
      
      <main
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
            background: "white",
            padding: "50px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            maxWidth: "700px",
          }}
        >
          <h1
            style={{
              color: "#2563eb",
              fontSize: "48px",
            }}
          >
            DDM
          </h1>

          <h2>Dream • Discover • Master</h2>

          <p
            style={{
              fontSize: "22px",
              color: "#555",
              marginTop: "20px",
            }}
          >
            Learn Smarter, Score Better
          </p>

          <button
            style={{
              marginTop: "30px",
              padding: "15px 35px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Start Learning
          </button>
        </div>
      </main>
    </>
  );
}