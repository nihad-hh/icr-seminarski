"use client";

import Navbar from "../../../components/Navbar";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Navbar />
      {/* Feedback */}{" "}
      <h1 className="flex justify-center py-6 text-2xl">O nama</h1>
      <p className="flex justify-center px-8 py-6 text-lg">
        Naša taxi aplikacija pruža brz, siguran i pouzdan način prijevoza za
        putnike i vozače. Bilo da ste registrirani korisnik ili gost,
        omogućavamo vam jednostavno naručivanje vožnje u samo nekoliko klikova.
        Naš cilj je povezati vozače i putnike uz maksimalnu udobnost,
        transparentnost i sigurnost. Uz fleksibilne opcije plaćanja, praćenje
        vožnje u realnom vremenu i ocjenjivanje usluga, nastojimo poboljšati
        vaše iskustvo putovanja svaki dan.
      </p>
      <div className="flex justify-center">
        <Image src="/taxi_slika.png" width={300} height={300} />
      </div>
    </>
  );
}
