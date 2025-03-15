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

  const [ime, setIme] = useState(
    JSON.parse(localStorage.getItem("currentUser")).username
  );

  let zavrseneVoznjeJSX = createVoznje(zavrseneVoznje);
  let rezervisaneVoznjeJSX = createRezervisaneVoznje(rezervisaneVoznje);
  let dostupneVoznjeJSX = createDostupneVoznje(dostupneVoznje);

  const handlePreuzimanje = () => {};

  function createDostupneVoznje(voznje) {
    return (
      <>
        <tbody
        className="text-white">
          
          {voznje.map((row) => (
            <tr key={row.id}>
              <td>
                {row.datum} <br /> {row.vrijeme}
              </td>
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
          <div className="modal-box w-[450px]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="w-full flex justify-center flex-col">
              <table className="table table-pin-rows z-0 my-6">
                <thead>
                  <tr>
                    <th>Datum i vrijeme</th>
                    <th>Polazište</th>
                    <th>Odredište</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      13.02.2025. <br /> 15:00
                    </td>
                    <td>Bulevar Meše Selimovića 12</td>
                    <td>Drvenija 13</td>
                  </tr>
                </tbody>
              </table>
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

  function createRezervisaneVoznje(voznje) {
    return (
      <>
        <tbody
        className="text-white">
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
                  className="size-6 w-[40px]"
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
          <div className="modal-box w-[450px]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="w-full flex justify-center flex-col">
              <table className="table table-pin-rows z-0 my-6">
                <thead>
                  <tr>
                    <th>Datum i vrijeme</th>
                    <th>Polazište</th>
                    <th>Odredište</th>
                    <th>Cijena</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      27.3.2025. <br /> 13:25
                    </td>
                    <td>Humska 4</td>
                    <td>Bolnička 12</td>
                    <td>12 KM</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="my-5 btn btn-warning"
                onClick={() => (window.location.href = "/taxi")}
              >
                Potvrdi otkazivanje
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
  }

  const [initialLoad, setInitalLoad] = useState(
    localStorage.getItem("initialLoad")
  );
  const [handledLocation, setHandledLocation] = useState(
    localStorage.getItem("handledLocation")
  );

  useEffect(() => {
    if (initialLoad === "false") {
      console.log(initialLoad);
      document.getElementById("my_modal_5").showModal();

      setInitalLoad(true);
      localStorage.setItem("initialLoad", "true");
    }
  }, []);

  const handleDozvoliLokaciju = () => {
    localStorage.setItem("polaziste", "Trenutna lokacija");
    if (handledLocation === "false") {
      document.getElementById("my_modal_5").remove();

      setHandledLocation(true);
      localStorage.setItem("handledLocation", "true");
    }
  };

  const handleOdbijeLokaciju = () => {
    if (handledLocation === "false") {
      document.getElementById("my_modal_5").remove();

      setHandledLocation(true);
      localStorage.setItem("handledLocation", "true");
    }
  };
  return (
    <div>
      <Navbar />

      {/* allow location access  */}
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-[450px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <span className="w-full flex justify-center text-yellow-500 px-2 py-2 rounded">
            Aplikacija želi pristup vašoj lokaciji
          </span>

          <div className="w-full flex justify-center">
            <button
              className="my-5 mx-3 btn btn-warning"
              onClick={handleDozvoliLokaciju}
            >
              Dozvoli
            </button>

            <button
              className="my-5 mx-3 btn btn-warning"
              onClick={handleOdbijeLokaciju}
            >
              Odbij
            </button>
          </div>
        </div>
      </dialog>

      <div className="w-full flex justify-center h-12">
        <div className="flex space-x-4 px-4 py-6 text-yellow-500">
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="rgb(255, 204, 0)"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
            />
          </svg>
          <p>{ime} </p>
        </div>
      </div>

      <div className="flex w-full flex-col h-6">
        <div className="divider"></div>
      </div>
      <div className="w-full flex justify-center"></div>

      <h1 className="h-10 m-5 text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded z-0">
        Dostupne vožnje
      </h1>
      <div className="max-h-56 overflow-auto z-0">
        <table className="table table-pin-rows z-0">
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
      <div className="max-h-56 overflow-auto ">
        <table className="table table-pin-rows">
          <thead className="">
            <tr>
              <th className="w-[5px]">
                Datum <br /> Vrijeme
              </th>
              <th>Polazište</th>
              <th>Odredište</th>
              <th>Cijena</th>
              <th className="w-[40px]">Otkaži</th>
              <th></th>
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
              <th>Cijena</th>
            </tr>
          </thead>
          {zavrseneVoznjeJSX}
        </table>
      </div>
    </div>
  );
}
