"use client";

import path from "path";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import Navbar from "../../../components/Navbar.jsx";
import Link from "next/link";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import { useRouter } from "next/router";

import { loadDataFromJson } from "../../../utils/utils.js";

let timeoutPrihvatanjeVoznje;

let korisnici = [
  {
    email: "nihad@gmail.com",
    username: "Nihad Hodzic",
    password: "password123",
    krediti: "12",
    rola: "korisnik",
  },
  {
    email: "edin@gmail.com",
    username: "Edin Avdukic",
    password: "password321",
    krediti: "12",
    rola: "taxi",
  },
];

let dostupneVoznje = [
  {
    id: "1",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
  },
  {
    id: "2",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
  },
  {
    id: "3",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
  },
  {
    id: "4",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
  },
];

let rezervisaneVoznje = [
  {
    id: "1",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
    trajanje: "18 min",
    cijena: "10KM",
  },
  {
    id: "2",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
    trajanje: "18 min",
    cijena: "10KM",
  },
  {
    id: "3",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
    trajanje: "18 min",
    cijena: "10KM",
  },
  {
    id: "4",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
    trajanje: "18 min",
    cijena: "10KM",
  },
];

let zavrseneVoznje = [
  {
    id: "1",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
    trajanje: "18 min",
    cijena: "10KM",
  },
  {
    id: "2",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
    trajanje: "18 min",
    cijena: "10KM",
  },
  {
    id: "3",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
    trajanje: "18 min",
    cijena: "10KM",
  },
  {
    id: "4",
    datum: "27.12.2024",
    vrijeme: "15:00",
    polaziste: "Bulevar Meše Selimovića 12",
    odrediste: "Drvenija 13",
    trajanje: "18 min",
    cijena: "10KM",
  },
];

export default function Home() {
  localStorage.setItem("dostupneVoznje", JSON.stringify(dostupneVoznje));
  localStorage.setItem("krediti", 12);
  localStorage.setItem("rezervisaneVoznje", JSON.stringify(rezervisaneVoznje));
  localStorage.setItem("zavrseneVoznje", JSON.stringify(zavrseneVoznje));

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [users, setUsers] = useState(korisnici);

  // useEffect(() => {
  //   let objectData = loadDataFromJson("korisnici");

  //   objectData
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // });

  const handleRegistration = async () => {
    if (username === "") {
      setUsernameValid(false);
      return;
    } else {
      setUsernameValid(true);
    }

    if (password === "") {
      setPasswordValid(false);
      return;
    } else {
      setPasswordValid(true);
    }

    let user;

    if (users.length != 0) {
      user = users.find(
        (user) => user.username === username && user.password === password
      );
    }

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("polaziste", "Najcesce polaziste");
      localStorage.setItem("odrediste", "Najcesce odrediste");

      if (user.rola === "korisnik") {
        window.location.href = "/korisnik";
      } else if (user.rola === "taxi") {
        window.location.href = "/taxi";
      }
    } else {
      setPasswordValid(false);
    }
  };

  const handleInput = (event, setFn) => {
    event.preventDefault();
    setFn(event.target.value);
  };

  return (
    <>
      <div className="h-full flex flex-col justify-center">
        <div className="w-full flex justify-center">
          <div className="flex flex-col w-96 gap-6">
            <div className="w-full flex justify-center">
              <a className="btn btn-ghost text-xl">JaBiHTaxi</a>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Korisničko ime"
                value={username}
                onChange={(event) => handleInput(event, setUsername)}
              />
            </label>

            {!usernameValid && (
              <span className="text-red-500">
                Molimo unesite ispravno korisničko ime.
              </span>
            )}

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                value={password}
                onChange={(event) => handleInput(event, setPassword)}
              />
            </label>

            {!passwordValid && (
              <span className="text-red-500">
                Molimo unesite ispravne podatke.
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center my-5">
          <span ctext-white-500>
            Nemate račun ?{" "}
            <Link className="text-blue-500" href="/korisnik/registracija">
              Registrirajte se
            </Link>
          </span>
        </div>
        <div className="w-full flex justify-center">
          <button className="my-5 btn btn-warning" onClick={handleRegistration}>
            Prijavi se
          </button>
        </div>
      </div>
    </>
  );
}
