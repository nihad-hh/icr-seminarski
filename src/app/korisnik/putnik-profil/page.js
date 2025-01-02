"use client";

import Navbar from "../../../components/Navbar.jsx";
import Link from "next/link";

import { loadDataFromJson, createVoznje } from "../../../utils/utils.js";

export default function PutnikProfil() {
  let krediti = localStorage.getItem("krediti");

  let zavrseneVoznje = JSON.parse(localStorage.getItem("zavrseneVoznje"));

  let rezervisaneVoznje = JSON.parse(localStorage.getItem("rezervisaneVoznje"));

  let zavrseneVoznjeJSX = createVoznje(zavrseneVoznje);

  let rezervisaneVoznjeJSX = createVoznje(rezervisaneVoznje);

  return (
    <div>
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="flex space-x-4 p-4">
          <span className="bg-black text-yellow-500 px-4 py-2 rounded">
            Dostupni krediti:
          </span>
          <span className="border-2 border-yellow-500 px-4 py-2 rounded">
            {krediti} KM
          </span>
          <Link
            href={{
              pathname: "/korisnik/uplati",
            }}
          >
            <button className="btn btn-warning ">Uplati</button>
          </Link>
        </div>
      </div>
      <h1 className="h-10 m-5 text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
        Prethodno završene vožnje:
      </h1>
      <div className="max-h-56 overflow-auto">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Datum i vrijeme</th>
              <th>Polazište</th>
              <th>Odredište</th>
              <th>Trajanje</th>
              <th>Cijena</th>
            </tr>
          </thead>
          {zavrseneVoznjeJSX}
        </table>
      </div>
      <h1 className="h-10 m-5 text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
        Rezervisane vožnje:
      </h1>
      <div className="max-h-56 overflow-auto">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Datum i vrijeme</th>
              <th>Polazište</th>
              <th>Odredište</th>
              <th>Trajanje</th>
              <th>Cijena</th>
            </tr>
          </thead>
          {rezervisaneVoznjeJSX}
        </table>
      </div>
    </div>
  );
}
