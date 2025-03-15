"use client";

import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";

import ReactStars from "react-stars";

let timeoutPrihvatanjeVoznje = null;

export default function Home() {
  const stanjeFromLocal = localStorage.getItem("stanje");

  const [stanje, setStanje] = useState(stanjeFromLocal ? stanjeFromLocal : 0);

  const [vrijeme, setVrijeme] = useState("");

  const [inputValid, setInputValid] = useState(true);

  const [statusTaxija, setStatusTaxija] = useState(
    stanje == 2 || stanje == 1.5
      ? "Taxi je prihvatio vožnju"
      : "Čeka se odgovor taxija"
  );

  /*Callcack tip voznje*/
  const [tipVoznje, setTipVoznje] = useState(
    localStorage.getItem("tipVoznje") || "Odmah"
  );
  const handleChangeTip = (event) => {
    console.log(tipVoznje);
    setTipVoznje(event.target.value);
    localStorage.setItem("tipVoznje", event.target.value);
  };

  /*Callback dijeljenje voznje*/
  const [dijeljenjeVoznje, setDijeljenjeVoznje] = useState(
    localStorage.getItem("dijeljenjeVoznje") || "Ne"
  );
  const handleChangeDijeljenje = (event) => {
    console.log(dijeljenjeVoznje);
    setDijeljenjeVoznje(event.target.value);
    localStorage.setItem("dijeljenjeVoznje", event.target.value);
  };


  function loadData(key) {
    let data = localStorage.getItem(key);

    if (data) {
      data = data.replace(/"/g, "");
      return data;
    } else {
      return "";
    }
  }

  const stateToOne = () => {
    if (
      localStorage.getItem("polaziste") == '""' ||
      localStorage.getItem("odrediste") == '""' ||
      (tipVoznje === "Rezervacija" && vrijeme == "")
    ) {
      setInputValid(false);
      return;
    } else {
      setInputValid(true);
    }
    localStorage.setItem("stanje", 1);
    setStanje(1);

    if (!timeoutPrihvatanjeVoznje) {
      timeoutPrihvatanjeVoznje = setTimeout(() => {
        localStorage.setItem("stanje", 1.5);
        setStatusTaxija("Taxi je prihvatio vožnju");
        setStanje(1.5);
      }, 5000);
    }
  };
  const stateToZero = () => {
    if (timeoutPrihvatanjeVoznje) {
      clearTimeout(timeoutPrihvatanjeVoznje);
      timeoutPrihvatanjeVoznje = null;
    }
    localStorage.setItem("stanje", 0);
    setStanje(0);
    setStatusTaxija("Čeka se odgovor taxija");
  };

  const stateToPlacanje = () => {
    localStorage.setItem("stanje", 3);
    setStanje(3);
  };

  const stateToTwo = () => {
    localStorage.setItem("stanje", 2);
    setStanje(2);

    if (tipVoznje === "Odmah") {
      setStatusTaxija("Taxi je krenuo prema vama");
    }
  };

  // date picker
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <button className={className} onClick={onClick} ref={ref}>
        {value}
      </button>
    )
  );

  const [odabirPlacanja, setOdabirPlacanja] = useState("gotovina");

  const handleOdabirPlacanja = (nacinPlacanja) => {
    setOdabirPlacanja(nacinPlacanja);
    stateToPlacanje();
  };

  const handlePlacanje = () => {
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

    window.location.href = "/korisnik";

    localStorage.setItem("stanje", 0);
    localStorage.setItem("polaziste", "Najcesce polaziste");
    localStorage.setItem("odrediste", "Najcesce odrediste");
    setStanje(0);
  };

  const handlePovratak = () => {
    window.location.href = "/korisnik";

    localStorage.setItem("stanje", 0);
    localStorage.setItem("polaziste", "Najcesce polaziste");
    localStorage.setItem("odrediste", "Najcesce odrediste");
    setStanje(0);
  };

  const [brojKartice, setBrojKartice] = useState("");
  const [datumIsteka, setDatumIsteka] = useState("");
  const [cvc, setCvc] = useState("");

  const [brojKarticeValid, setBrojKarticeValid] = useState(true);
  const [datumIstekaValid, setDatumIstekaValid] = useState(true);
  const [cvcValid, setCvcValid] = useState(true);

  const handleInput = (event, setFn) => {
    event.preventDefault();
    setFn(event.target.value);
  };

  const [initialLoad, setInitalLoad] = useState(
    localStorage.getItem("initialLoad")
  );
  const [handledLocation, setHandledLocation] = useState(
    localStorage.getItem("handledLocation")
  );

  useEffect(() => {
    if (initialLoad === "false") {
      document.getElementById("my_modal_4").showModal();

      setInitalLoad("true");
      localStorage.setItem("initialLoad", "true");
    }
  }, []);

  const handleDozvoliLokaciju = () => {
    localStorage.setItem("polaziste", "Trenutna lokacija");
    if (handledLocation === "false") {
      console.log("Vani");
      if (document.getElementById("my_modal_4")) {
        console.log("Usao");
        document.getElementById("my_modal_4").removeChild();
        setHandledLocation("true");
        localStorage.setItem("handledLocation", "true");
      }
    }
  };

  const handleOdbijeLokaciju = () => {
    if (handledLocation === "false") {
      console.log("Vani");
      if (document.getElementById("my_modal_4")) {
        console.log("Usao");
        document.getElementById("my_modal_4").removeChild();
        setHandledLocation("true");
        localStorage.setItem("handledLocation", "true");
      }
    }
  };


  return (
    <>
      <Navbar />
      {/* allow location access  */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-[450px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <span className="w-full flex justify-center text-yellow-500 px-2 py-2 rounded">
            Aplikacija želi pristup lokaciji na Vašem uređaju
          </span>

          <div className="w-full flex justify-center">
            <form method="dialog">
              <button
                className="my-5 mx-3 btn btn-warning"
                // onClick={handleDozvoliLokaciju}
              >
                Dozvoli
              </button>
            </form>
            <form method="dialog">
              <button
                className="my-5 mx-3 btn btn-warning"
                // onClick={handleOdbijeLokaciju}
              >
                Odbij
              </button>
            </form>
          </div>
        </div>
      </dialog>
    <div style={{ marginTop: '1cm' }}>
      {/* Odabir polazišta */}
      {stanje == 0 ? (
        <div className="w-full flex justify-center">
          <Link
            href={{
              pathname: "/korisnik/polaziste",
            }}
          >
            <button className="my-5">Odaberi polazište</button>
          </Link>
        </div>
      ) : null}

      {/* Adresa polazišta */}
      {stanje < 3 && (
        <div className="w-full flex justify-center">
          <div className="flex space-x-4 p-4">
            <span className="bg-black text-yellow-400 px-4 py-2 rounded bg-gray-800">
              Polazište:
            </span>
            <span className="px-4 py-2 rounded min-w-32 text-white bg-gray-800">
              {loadData("polaziste")}
            </span>
          </div>
        </div>
      )}
      {/* Odabir odredišta */}
      {stanje == 0 ? (
        <div className="w-full flex justify-center">
          <Link
            href={{
              pathname: "/korisnik/odrediste",
            }}
          >
            <button className="my-5">Odaberi odredište</button>
          </Link>
        </div>
      ) : null}
      {/* Adresa odredišta */}
      {stanje < 3 && (
        <div className="w-full flex justify-center">
          <div className="flex space-x-4 p-4">
            <span className="bg-black text-yellow-400 px-4 py-2 rounded bg-gray-800">
              Odredište:
            </span>
            <span className="px-4 py-2 rounded min-w-32 max-w-48 text-wrap text-white bg-gray-800">
              {loadData("odrediste")}
            </span>
          </div>
          {stanje == 2 && (
            <Link
              href={{
                pathname: "/korisnik/odrediste",
              }}
            >
              <button className="my-4 btn btn-warning ">Promijeni</button>
            </Link>
          )}
        </div>
      )}
      {/* Dijeljenje vožnje */}
      {stanje < 1 && (
        <div className="w-full flex pl-[60px]">
          <div className="flex items-center space-x-4 p-4">
            <span className="bg-black text-yellow-400 px-4 py-2 rounded bg-gray-800 text-center">
              Dijeljenje vožnje:
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="Ne" className="text-white">Ne</label>
              <input
                type="radio"
                name="radio-6"
                className="radio radio-warning"
                id="Ne"
                onChange={handleChangeDijeljenje}
                disabled={stanje > 2} 
                defaultChecked
                value="Ne"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="Da" className="text-white">Da</label>
              <input
                type="radio"
                id="Da"
                name="radio-6"
                className="radio radio-warning"
                disabled={stanje > 2} 
                onChange={handleChangeDijeljenje}
                value="Da"
              />
            </div>
          </div>
        </div>
      )}
      {/* Tip vožnje */}
      {stanje < 1 && (
        <div className="w-full flex pl-[60px]">
          <div className="flex items-center space-x-4 p-4">
            <span className="bg-black text-yellow-400 px-4 py-2 rounded bg-gray-800 text-center">
              Tip vožnje:
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="Odmah" className="text-white">Odmah</label>
              <input
                type="radio"
                name="radio-tip"
                className="radio radio-warning"
                id="Odmah"
                onChange={handleChangeTip}
                disabled={stanje > 2} 
                defaultChecked
                value="Odmah"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="Rezervacija" className="text-white">Rezervacija</label>
              <input
                type="radio"
                id="Rezervacija"
                name="radio-tip"
                className="radio radio-warning"
                disabled={stanje > 2} 
                onChange={handleChangeTip}
                value="Rezervacija"
              />
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center p-4">
        {(stanje == 1 || stanje == 1.5) && (
          <div className="flex items-center space-x-4 mr-10 mb-4"> {/* Added mb-4 here */}
            <span className="bg-black text-yellow-400 px-4 py-2 rounded bg-gray-800">
              Dijeljenje:
            </span>
            <span className="px-4 py-2 rounded min-w-20 text-white bg-gray-800">
              {dijeljenjeVoznje}
            </span>
          </div>
        )}
        {(stanje == 1 || stanje == 1.5) && (
          <div className="flex items-center space-x-4">
            <span className="bg-black text-yellow-400 px-4 py-2 rounded bg-gray-800">
              Tip:
            </span>
            <span className="px-4 py-2 rounded min-w-20 text-white bg-gray-800">
              {tipVoznje}
            </span>
          </div>
        )}
      </div>
      {/* date picker */}
      {tipVoznje === "Rezervacija" && (
        <>
          <div className="w-full flex pl-[180px] z-10">
            <div className="flex space-x-4 p-4">
              <span className="bg-black text-yellow-400 px-4 py-2 rounded bg-gray-800">
                Datum:
              </span>
              <DatePicker
                className="bg-yellow"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                disabled={stanje != 0}
                customInput={
                  <ExampleCustomInput className="example-custom-input" />
                }
              />
            </div>
          </div>
          <div className="w-full flex pl-[180px]">
            <div className="flex space-x-4 p-4">
              <span className="text-yellow-400 px-4 py-2 rounded bg-gray-800">
                Vrijeme:
              </span>
              <input
                disabled={stanje != 0}
                className="bg-gray-800 text-white"
                aria-label="Time"
                type="time"
                value={vrijeme}
                onChange={(event) => {
                  console.log(event.target.value);
                  setVrijeme(event.target.value);
                }}
              />
            </div>
          </div>
        </>
      )}
      {/* Status taxija */}
      {(stanje == 2 || stanje == 1.5 || stanje == 1) && (
        <>
          <div className="mt-4">
            <div className="w-full flex justify-center">
              <span className="bg-black text-yellow-400 px-4 py-2 rounded">
                Status:
              </span>
              <span className="text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
                {statusTaxija}
              </span>
            </div>
          </div>
        </>
      )}
      {/* Reg. oznake i cijena vožnje*/}
      {(stanje == 2 || stanje == 1.5) && (
        <div className="w-full flex justify-center py-4">
          {tipVoznje == "Odmah" && (
            <div className="flex p-2">
              <span className="bg-black text-yellow-500 px-2 py-2 rounded">
                Reg. oznake:
              </span>
              <span className="text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
                A02-K-521
              </span>
            </div>
          )}
          {tipVoznje == "Rezervacija" && (
            <div className="flex p-2">
              <span className="bg-black text-yellow-500 px-2 py-2 rounded">
                Trajanje vožnje:
              </span>
              <span className="text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
                15 min
              </span>
            </div>
          )}
          <div className="flex p-2">
            <span className="bg-black text-yellow-500 px-2 py-2 rounded">
              Procijenjena cijena:
            </span>
            <span className="text-yellow-500 border-2 border-yellow-500 px-4 py-2 rounded">
              21 KM
            </span>
          </div>
        </div>
      )}
      {/* Procijenjeno vrijeme dolaska taxija */}
      {(stanje == 2 || stanje == 1.5) && tipVoznje == "Odmah" && (
        <div className="w-full flex px-10">
          <div className="flex space-x-4 p-2">
            <span className="text-yellow-500 px-4 py-2 rounded bg-gray-800">
              Procijenjeno vrijeme dolaska:
            </span>
            <span className="text-yellow-500 border-1 border-yellow-500 px-4 py-2 rounded bg-gray-800">
              5 minuta
            </span>
          </div>
        </div>
      )}
      {/* Procijenjeno vrijeme do odredišta */}
      {(stanje == 2 || stanje == 1.5) && tipVoznje == "Odmah" && (
        <div className="w-full flex justify-center">
          <div className="flex space-x-4 p-4">
            <span className="text-yellow-500 px-4 py-2 rounded bg-gray-800">
              Procijenjeno vrijeme do odredišta:
            </span>
            <span className="text-yellow-500 border-1 border-yellow-400 px-4 py-2 rounded bg-gray-800">
              20 minuta
            </span>
          </div>
        </div>
      )}
      {/* Naruci taxi button */}
      {stanje == 0 && (
        <div className="w-full flex justify-center mt-[20px]">
          <button className="" onClick={stateToOne}>
            Nađi taxi
          </button>
        </div>
      )}
      {/* Tekst o neispravnom unosu */}
      {stanje == 0 && !inputValid && (
        <div className="w-full flex justify-center py-4">
          <span className="text-red-500">Molimo unesite podatke.</span>
        </div>
      )}
      {/* Otkazi voznju */}
      {stanje == 1 && (
        <>
          <div className="w-full flex justify-center">
            <button className="my-5 error-button" onClick={stateToZero}>
              Otkaži vožnju
            </button>
          </div>
        </>
      )}
      {/* Prihvati voznju konačno*/}
      {stanje == 1.5 && (
        <>
          <div className="w-full flex justify-center">
            <div
              className="my-4 tooltip tooltip-open tooltip-error tooltip-bottom z-0"
              data-tip="Prihvatanje vožnje plaćate sa 2 kredita"
            >
              <button className="my-5" onClick={stateToTwo}>
                Prihvati vožnju
              </button>
            </div>
            <button className="mx-5 my-9 error-button" onClick={stateToZero}>
              Otkaži vožnju
            </button>
          </div>
        </>
      )}
      {/* Trenutna lokacija taxija button */}
      {stanje == 2 && tipVoznje == "Odmah" && (
        <div className="w-full flex justify-center">
          <Link href="/korisnik/taxi-trenutna-lokacija">
            <button className="my-5 btn btn-warning ">
              Trenutna lokacija taxija
            </button>
          </Link>
        </div>
      )}
      {/* Zavrsi voznju i odabir placanja */}
      {stanje == 2 && tipVoznje == "Odmah" && (
        <>
          <div className="w-full flex justify-center">
            <button
              className="my-5 btn btn-warning"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Završi vožnju
            </button>
            <button className="mx-5 my-5 btn btn-error " onClick={stateToZero}>
              Otkaži taxi
            </button>
          </div>
          <dialog id="my_modal_3" className="modal ">
            <div className="modal-box w-[450px]">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <span className="w-full flex justify-center text-yellow-500 px-2 py-2 rounded">
                Odaberi način plaćanja:
              </span>

              <div className="w-full flex justify-center">
                <button
                  className="my-5 mx-3 btn btn-success"
                  onClick={() => {
                    handleOdabirPlacanja("gotovina");
                  }}
                >
                  Gotovina
                </button>

                {localStorage.getItem("currentUser") === "None" ? (
                  " "
                ) : (
                  <button
                    className="my-5 mx-3 btn btn-warning"
                    onClick={() => {
                      handleOdabirPlacanja("krediti");
                    }}
                  >
                    Krediti u aplikaciji
                  </button>
                )}

                <button
                  className="my-5 mx-3 btn btn-info"
                  onClick={() => {
                    handleOdabirPlacanja("kartica");
                  }}
                >
                  Kartica
                </button>
              </div>
            </div>
          </dialog>
        </>
      )}
      {/* Povratak na glavni ekran rezervacija */}
      {stanje == 2 && tipVoznje == "Rezervacija" && (
        <div className="w-full flex justify-center">
          <Link href="/korisnik">
            <button className="my-5 btn btn-warning" onClick={handlePovratak}>
              Povratak na glavni ekran
            </button>
          </Link>
        </div>
      )}
      {/* Feedback */}
      {stanje == 3 && (
        <>
          <div className="w-full flex justify-center my-4">
            <h1>Hvala što ste koristili JaBiHTaxi!</h1>
          </div>
          <div className="w-full flex justify-center my-4">
            Ocijenite vaše iskustvo:
          </div>
          <div className="w-full flex justify-center my-4">
            <ReactStars count={5} size={24} color2={"#ffd700"} />
          </div>
        </>
      )}
      {/* divider */}
      {stanje == 3 && (
        <div className="flex w-full flex-col">
          <div className="divider"></div>
        </div>
      )}
      {/* Plaćanje karticom */}
      {stanje == 3 && odabirPlacanja == "kartica" && (
        <>
          <div className="w-full flex justify-center flex-col">
            <div className="flex space-x-4 p-4">
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
          </div>
          <div className="w-full flex justify-center flex-col">
            <div className="flex space-x-4 p-4">
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
            <div className="flex space-x-4 p-4">
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
                  Molimo unesite ispravan CVC. (3 broja)
                </span>
              </div>
            )}
          </div>
          <div className="w-full flex justify-center">
            <Link href="/korisnik">
              <button className="my-5 btn btn-warning" onClick={handlePlacanje}>
                Uplati
              </button>
            </Link>
          </div>
        </>
      )}
      {/* Plaćanje gotovinom ili kreditima */}
      {stanje == 3 &&
        (odabirPlacanja == "gotovina" || odabirPlacanja == "krediti") && (
          <>
            <div className="w-full flex justify-center">
              <Link href="/korisnik">
                <button
                  className="my-5 btn btn-warning"
                  onClick={handlePovratak}
                >
                  Povratak na glavni ekran
                </button>
              </Link>
            </div>
          </>
        )}
        </div>
    </>
  );
}