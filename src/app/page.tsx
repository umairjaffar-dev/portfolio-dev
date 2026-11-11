import {
  About,
  Contact,
  Experience,
  Expertise,
  Hero,
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
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
