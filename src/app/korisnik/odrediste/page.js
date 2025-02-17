"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";

const Map = dynamic(
  () => import("../../../components/Map").then((component) => component.Map),
  { ssr: false }
);

const HomePage = () => {
  const [stanje, setStanje] = useState(localStorage.getItem("stanje"));
  const [ispravanUnos, setIspravanUnos] = useState(true);

  const [location, setLocation] = useState({});

  const generateRandomNumber = () => {
    const min = -0.01;
    const max = 0.01;
    const number = min + (max - min) * Math.random();
    return number; // Format to 3 decimal places
  };

  if (Object.keys(location).length === 0) {
    setLocation({
      id: "550e8400-e29b-41d4-a716-446655440000",
      lat: 43.8663,
      lng: 18.4331,
    });
  }

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const lat_step = generateRandomNumber();
      const lng_step = generateRandomNumber();

      const newLat = location["lat"] + lat_step;
      const newLng = location["lng"] + lng_step;

      console.log(newLat);
      console.log(newLng);

      setLocation({ id: location["id"], lat: newLat, lng: newLng });

      console.log(
        `I can see you're not typing. I can use "${inputValue}" now!`
      );
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const performAction = (event) => {
    event.preventDefault();
    if (stanje === "2" && inputValue.length < 5) {
      setIspravanUnos(false);
    } else {
      setIspravanUnos(true);

      const lat_step = generateRandomNumber();
      const lng_step = generateRandomNumber();

      const newLat = location["lat"] + lat_step;
      const newLng = location["lng"] + lng_step;

      setLocation({ id: location["id"], lat: newLat, lng: newLng });

      localStorage.setItem("odrediste", JSON.stringify(inputValue));
      window.location.href = "/korisnik";

      setInputValue("");
    }
  };

  return (
    <>
      <Link href="/korisnik">
        <button className="my-5 mx-5 btn btn-warning">Nazad</button>
      </Link>
      <div className="w-full flex justify-center h-12 my-2">
        <input
          className="border-2 border-yellow-500 mx-4 rounded-lg"
          type="text"
          value={inputValue}
          onChange={handleOnChange}
          placeholder="Unesi adresu"
        />
        <Link href="/korisnik">
          <button className="btn btn-warning" onClick={performAction}>
            Potvrdi
          </button>
        </Link>
      </div>

      {!ispravanUnos && (
        <div className="w-full flex justify-center h-12 my-2">
          <span className="text-red-500">Molimo unesite ispravnu adresu.</span>
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          maxHeight: "70%",
          width: "100%",
        }}
      >
        <Map center={{ lat: 43.8563, lng: 18.4131 }} locations={[location]} />
      </div>
    </>
  );
};

export default HomePage;
