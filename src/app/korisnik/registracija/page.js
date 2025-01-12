"use client";

import path from "path";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import Navbar from "../../../components/Navbar";
import Link from "next/link";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import { useRouter } from "next/router";

let timeoutPrihvatanjeVoznje;

export default function Home() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleRegistration = () => {
    if (email === "") {
      setEmailValid(false);
      return;
    } else {
      setEmailValid(true);
    }

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

    window.location.href = "/korisnik/login";
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
            <div className="w-full flex justify-center my-5">
              <div className="w-full flex justify-center">
                <span ctext-white-500>
                  Već imate račun ?{" "}
                  <Link className="text-blue-500" href="/korisnik/login">
                    Prijavite se
                  </Link>
                </span>
              </div>
            </div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(event) => handleInput(event, setEmail)}
              />
            </label>

            {!emailValid && (
              <span className="text-red-500">
                Molimo unesite ispravnu email adresu.
              </span>
            )}

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
                Molimo unesite ispravnu lozinku.
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <button className="my-5 btn btn-warning" onClick={handleRegistration}>
            Registriraj se
          </button>
        </div>
      </div>
    </>
  );
}
