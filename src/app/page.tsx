import {
  About,
  Contact,
  Experience,
  Expertise,
  Hero,
  Process,
  Projects,
  Skills,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Skills />
      <Process />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
