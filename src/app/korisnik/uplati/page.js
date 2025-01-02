"use client";

import Navbar from "../../../components/Navbar";
import Link from "next/link";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";

import ReactStars from "react-stars";

let timeoutPrihvatanjeVoznje;

export default function Home() {
  const [krediti, setKrediti] = useState(localStorage.getItem("krediti"));

  const [brojKartice, setBrojKartice] = useState("");
  const [datumIsteka, setDatumIsteka] = useState("");
  const [cvc, setCvc] = useState("");
  const [iznos, setIznos] = useState("");

  const [brojKarticeValid, setBrojKarticeValid] = useState(true);
  const [datumIstekaValid, setDatumIstekaValid] = useState(true);
  const [cvcValid, setCvcValid] = useState(true);
  const [iznosValid, setIznosValid] = useState(true);

  const handlePlacanje = () => {
    if (iznos === "" || isNaN(iznos)) {
      setIznosValid(false);
      return;
    } else {
      setIznosValid(true);
    }

    if (brojKartice.length !== 9 || isNaN(brojKartice)) {
      setBrojKarticeValid(false);
      return;
    } else {
      setBrojKarticeValid(true);
    }

    if (isNaN(new Date(datumIsteka))) {
      setDatumIstekaValid(false);
      return;
    } else {
      setDatumIstekaValid(true);
    }

    if (cvc.length !== 3) {
      setCvcValid(false);
      return;
    } else {
      setCvcValid(true);
    }

    let krediti = localStorage.getItem("krediti");
    krediti = Number(krediti) + Number(iznos);

    localStorage.setItem("krediti", krediti);

    window.location.href = "/korisnik/putnik-profil";
  };

  const handleInput = (event, setFn) => {
    event.preventDefault();
    setFn(event.target.value);
  };

  return (
    <>
      <Navbar />

      {/* Plaćanje karticom */}
      <>
        <div className="w-full flex justify-center flex-col">
          <div className="flex space-x-2 py-4 px-12">
            <span className="bg-black text-yellow-500 px-4 py-2 rounded w-32">
              Iznos:
            </span>
            <span className="">
              <input
                type="text"
                placeholder="Unesi ovdje"
                className="input input-bordered input-warning w-full max-w-xs"
                value={iznos}
                onChange={(event) => handleInput(event, setIznos)}
              />
            </span>
          </div>

          {!iznosValid && (
            <div className="flex space-x-4 px-24">
              <span className="text-red-500">
                Molimo unesite ispravan iznos.
              </span>
            </div>
          )}
        </div>

        <div className="flex space-x-2 py-4 px-12">
          <span className="bg-black text-yellow-500 px-4 py-2 rounded w-32">
            Broj kartice:
          </span>
          <span className="">
            <input
              type="text"
              placeholder="Unesi ovdje"
              className="input input-bordered input-warning w-full max-w-xs"
              value={brojKartice}
              onChange={(event) => handleInput(event, setBrojKartice)}
            />
          </span>
        </div>

        {!brojKarticeValid && (
          <div className="flex space-x-4 px-24">
            <span className="text-red-500">
              Molimo unesite ispravan broj kartice. (9 brojeva)
            </span>
          </div>
        )}

        <div className="w-full flex justify-center flex-col">
          <div className="flex space-x-2 py-4 px-12">
            <span className="bg-black text-yellow-500 px-4 py-2 rounded w-32">
              Datum isteka:
            </span>
            <span className="">
              <input
                type="text"
                placeholder="Unesi ovdje"
                className="input input-bordered input-warning w-full max-w-xs"
                value={datumIsteka}
                onChange={(event) => handleInput(event, setDatumIsteka)}
              />
            </span>
          </div>

          {!datumIstekaValid && (
            <div className="flex space-x-4 px-24">
              <span className="text-red-500">
                Molimo unesite ispravan datum isteka. (YYYY/MM/DD format)
              </span>
            </div>
          )}
        </div>

        <div className="w-full flex justify-center flex-col">
          <div className="flex space-x-2 py-4 px-12">
            <span className="bg-black text-yellow-500 px-4 py-2 rounded w-32">
              CVC:
            </span>
            <span className="">
              <input
                type="text"
                placeholder="Unesi ovdje"
                className="input input-bordered input-warning w-full max-w-xs"
                value={cvc}
                onChange={(event) => handleInput(event, setCvc)}
              />
            </span>
          </div>

          {!cvcValid && (
            <div className="flex space-x-4 px-24">
              <span className="text-red-500">
                Molimo unesite ispravan CVC broj. (3 broja)
              </span>
            </div>
          )}
        </div>

        <div className="w-full flex justify-center">
          <button className="my-5 btn btn-warning" onClick={handlePlacanje}>
            Uplati
          </button>
        </div>
      </>
    </>
  );
}

// const dataFilePath = path.join(process.cwd(), 'db/data.json');

// const jsonData = await fsPromises.readFile(dataFilePath);
// const objectData = JSON.parse(jsonData);

// console.log(objectData);

// const newData = {
//   Name: "Ermina",
//   ID: 2
// };

// objectData.push(newData)

// const updatedData = JSON.stringify(objectData);

// await fsPromises.writeFile(dataFilePath, updatedData);
