"use client";

import Navbar from "../../../components/Navbar.jsx";
import Link from "next/link";

import { loadDataFromJson, createVoznje } from "../../../utils/utils.js";

export default function PutnikProfil() {
  let krediti = localStorage.getItem("krediti");

  let zavrseneVoznje = JSON.parse(localStorage.getItem("zavrseneVoznje"));

  let rezervisaneVoznje = JSON.parse(localStorage.getItem("rezervisaneVoznje"));

  let zavrseneVoznjeJSX = createVoznje(zavrseneVoznje);

  let rezervisaneVoznjeJSX = createRezervisaneVoznje(rezervisaneVoznje);

  function createRezervisaneVoznje(voznje) {
    return (
      <>
        <tbody>
          {voznje.map((row) => (
            <tr key={row.id}>
              <td>
                {row.datum} <br /> {row.vrijeme}
              </td>
              <td>{row.polaziste}</td>
              <td>{row.odrediste}</td>
              <td>{row.cijena}</td>
              <td
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="rgb(255, 204, 0)"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>

        <dialog id="my_modal_4" className="modal">
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
                  (window.location.href = "/korisnik/putnik-profil")
                }
              >
                Potvrdi brisanje
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
              <th>Cijena</th>
              <th>Izbriši</th>
            </tr>
          </thead>
          {rezervisaneVoznjeJSX}
        </table>
      </div>
    </div>
  );
}
