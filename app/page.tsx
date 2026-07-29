import { Hero } from "@/components/Hero";
import { Invitation } from "@/components/Invitation";
import { Parents } from "@/components/Parents";
import { DateSection } from "@/components/DateSection";
import { Countdown } from "@/components/Countdown";
import { Location } from "@/components/Location";
import { RSVP } from "@/components/RSVP";
import { Footer } from "@/components/Footer";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Petals } from "@/components/Petals";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Petals />
      <MusicPlayer />
      <main>
        <Hero />
        <Invitation />
        <Parents />
        <DateSection />
        <Countdown />
        <Location />
        <RSVP />
      </main>
      <Footer />
    </>
  );
}
