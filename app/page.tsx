import Hero from "./components/sections/Hero";
import Courses from "./components/sections/Courses";
import Parcours from "./components/sections/Parcours";
import Patrimoine from "./components/sections/Patrimoine";
import Festival from "./components/sections/Festival";
import Entrainement from "./components/sections/Entrainement";
import Benevoles from "./components/sections/Benevoles";
import Partenaires from "./components/sections/Partenaires";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Courses />
      <Parcours />
      <Patrimoine />
      <Festival />
      <Entrainement />
      <Benevoles />
      <Partenaires />
      <Footer />
    </>
  );
}
