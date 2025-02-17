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
          <span className="border-2 border-yellow-500 px-4 py-2 rounded min-w-32 text-yellow-500">
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
          <span className="border-2 border-yellow-500 px-4 py-2 rounded min-w-32 text-yellow-500">
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
          <label className="text-yellow-500" htmlFor="Ne">
            Ne
          </label>
          <input
            type="radio"
            id="Da"
            name="radio-6"
            className="radio radio-warning"
            disabled={true}
          />
          <label className="text-yellow-500" htmlFor="Da">
            Da
          </label>
        </div>
      </div>
      {/* Procijenjeno vrijeme dolaska taxija */}
      <div className="w-full flex justify-center">
        <div className="flex space-x-2 p-2">
          <span className="bg-black text-yellow-500 px-4 py-2 rounded">
            Procijenjeno vrijeme dolaska:
          </span>
          <span className="text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
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
          <span className="text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
            20 minuta
          </span>
        </div>
      </div>
      {/* Otkazi voznju */}
      <>
        <Link href="/taxi">
          <div className="w-full flex justify-center">
            <button className="my-5 btn btn-error ">Otkaži vožnju</button>
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
