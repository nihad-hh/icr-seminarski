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
  function loadData(key) {
    let data = localStorage.getItem(key);

    if (data) {
      data = data.replace(/"/g, "");
      return data;
    } else {
      return "";
    }
  }

  return (
    <>
      <Navbar />
      {/* Adresa polazišta */}
      <div className="w-full flex justify-center">
        <div className="flex space-x-4 p-4">
          <span className="bg-black text-yellow-500 px-4 py-2 rounded">
            Adresa polazišta:
          </span>
          <span className="bg-yellow-500 text-black px-4 py-2 rounded min-w-24">
            {loadData("polaziste")}
          </span>
        </div>
      </div>
      {/* Adresa odredišta */}
      <div className="w-full flex justify-center">
        <div className="flex space-x-4 p-4">
          <span className="bg-black text-yellow-500 px-4 py-2 rounded">
            Adresa odredišta:
          </span>
          <span className="bg-yellow-500 text-black px-4 py-2 rounded min-w-24">
            {loadData("odrediste")}
          </span>
        </div>
      </div>
      {/* dijeljenje voznje */}
      <div className="w-full flex justify-center">
        <div className="flex space-x-4 p-4">
          <span className="bg-black text-yellow-500 px-4 py-2 rounded">
            Dijeljenje vožnje:
          </span>

          <input
            type="radio"
            name="radio-6"
            className="radio radio-warning"
            id="Ne"
            disabled={true}
            defaultChecked
          />
          <label htmlFor="Ne">Ne</label>
          <input
            type="radio"
            id="Da"
            name="radio-6"
            className="radio radio-warning"
            disabled={true}
          />
          <label htmlFor="Da">Da</label>
        </div>
      </div>
      {/* Procijenjeno vrijeme dolaska taxija */}
      <div className="w-full flex justify-center">
        <div className="flex space-x-4 p-4">
          <span className="bg-black text-yellow-500 px-4 py-2 rounded">
            Procijenjeno vrijeme dolaska:
          </span>
          <span className="bg-yellow-500 text-black px-4 py-2 rounded">
            5 minuta
          </span>
        </div>
      </div>
      {/* Procijenjeno vrijeme do odredišta */}
      <div className="w-full flex justify-center">
        <div className="flex space-x-4 p-4">
          <span className="bg-black text-yellow-500 px-4 py-2 rounded">
            Procijenjeno vrijeme do odredišta:
          </span>
          <span className="bg-yellow-500 text-black px-4 py-2 rounded">
            20 minuta
          </span>
        </div>
      </div>
      {/* Otkazi voznju */}
      <>
        <Link href="/taxi">
          <div className="w-full flex justify-center">
            <button className="my-5 btn btn-warning ">Otkaži vožnju</button>
          </div>
        </Link>
      </>
      {/* Trenutna lokacija taxija button */}
      <div className="w-full flex justify-center">
        <Link href="/korisnik/pokazi-voznju">
          <button className="my-5 btn btn-warning ">Pokaži lokaciju</button>
        </Link>
      </div>
      {/* Zavrsi voznju i odabir placanja */}
      <>
        <div className="w-full flex justify-center">
          <Link href="/korisnik/taxi-feedback">
            <button className="my-5 btn btn-warning">Završi vožnju</button>
          </Link>
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
