import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { AiReceptionist } from "@/components/sections/ai-receptionist";
import { CaseStudies } from "@/components/sections/case-studies";
import { Closing } from "@/components/sections/closing";
import { ContextAvatar } from "@/components/sections/context-avatar";
import { Founder } from "@/components/sections/founder";
import { Hero } from "@/components/sections/hero";
import { Innovations } from "@/components/sections/innovations";
import { Platform } from "@/components/sections/platform";
import { PmsIntegrations } from "@/components/sections/pms-integrations";
import { Pricing } from "@/components/sections/pricing";
import { Proof } from "@/components/sections/proof";
import { SayStatement } from "@/components/sections/say-statement";
import { Team } from "@/components/sections/team";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Proof />
        <Founder />
        <AiReceptionist />
        <Team />
        <Pricing />
        <Platform />
        <PmsIntegrations />
        <SayStatement />
        <Innovations />
        <CaseStudies />
        <Closing />
        <ContextAvatar />
      </main>
      <Footer />
    </>
  );
}
