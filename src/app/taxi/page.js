"use client";

import Navbar from "../../components/Navbar.jsx";
import Link from "next/link";

import { loadDataFromJson, createVoznje } from "../../utils/utils.js";

import { useEffect, useState } from "react";

export default function PutnikProfil() {
  // const [zavrseneVoznje, setZavrseneVoznje] = useState();

  let zavrseneVoznje = JSON.parse(localStorage.getItem("zavrseneVoznje"));
  let rezervisaneVoznje = JSON.parse(localStorage.getItem("rezervisaneVoznje"));
  let dostupneVoznje = JSON.parse(localStorage.getItem("dostupneVoznje"));

  let zavrseneVoznjeJSX = createVoznje(zavrseneVoznje);
  let rezervisaneVoznjeJSX = createVoznje(rezervisaneVoznje);
  let dostupneVoznjeJSX = createDostupneVoznje(rezervisaneVoznje);

  const handlePreuzimanje = () => {};

  function createDostupneVoznje(voznje) {
    return (
      <>
        <tbody>
          {voznje.map((row) => (
            <tr key={row.id}>
              <td>{row.datum}</td>
              <td>{row.polaziste}</td>
              <td>{row.odrediste}</td>
              <button
                className="my-5 btn btn-warning"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Preuzmi vožnju
              </button>
            </tr>
          ))}
        </tbody>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="w-full flex justify-center">
              <button
                className="my-5 btn btn-warning"
                onClick={() =>
                  (window.location.href = "/korisnik/taxi-trenutna-voznja")
                }
              >
                Potvrdi preuzimanje
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="w-full flex justify-center"></div>

      <h1 className="h-10 m-5 text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
        Dostupne vožnje
      </h1>
      <div className="max-h-56 overflow-auto">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Datum i vrijeme</th>
              <th>Polazište</th>
              <th>Odredište</th>
              <th>Akcija</th>
            </tr>
          </thead>
          {dostupneVoznjeJSX}
        </table>
      </div>

      <h1 className="h-10 m-5 text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
        Rezervisane vožnje
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

      <h1 className="h-10 m-5 text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
        Završene vožnje
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
    </div>
  );
}
