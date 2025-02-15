"use client";

import Link from "next/link";

export default function Navbar() {
  let currentUser = localStorage.getItem("currentUser");

  if (currentUser != "None") {
    currentUser = JSON.parse(currentUser);
  }

  const handleLogOut = () => {
    localStorage.setItem("stanje", 0);
  };

  return (
    <div className="navbar bg-base-100 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <details className="dropdown">
            <summary className="btn m-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li>
                {currentUser != "None" && (
                  <Link
                    href={currentUser.rola === "taxi" ? "/taxi" : "/korisnik"}
                    onClick={() =>
                      (window.location.href =
                        currentUser.rola === "taxi" ? "/taxi" : "/korisnik")
                    }
                  >
                    Glavni ekran
                  </Link>
                )}
                {currentUser === "None" && (
                  <Link href="/korisnik">Glavni ekran</Link>
                )}
              </li>
              {currentUser != "None" && currentUser.rola === "putnik" && (
                <li>
                  <Link
                    href="/korisnik/putnik-profil"
                    onClick={() =>
                      (window.location.href = "/korisnik/putnik-profil")
                    }
                  >
                    Profil
                  </Link>
                </li>
              )}

              <li>
                <Link
                  href="/korisnik/korisnicka-podrska"
                  onClick={() =>
                    (window.location.href = "/korisnik/korisnicka-podrska")
                  }
                >
                  Korisnicka podrška
                </Link>
              </li>

              <li>
                <Link
                  href="/korisnik/korisnicka-podrska"
                  onClick={() => (window.location.href = "/korisnik/faq")}
                >
                  Često postavljena pitanja
                </Link>
              </li>

              <li>
                <Link href="/korisnik/login" onClick={handleLogOut}>
                  {currentUser === "None" ? "Prijavi se" : "Odjavi se"}
                </Link>
              </li>
            </ul>
          </details>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">JaBiHTaxi</a>
      </div>
      <div className="navbar-end">
        {/* <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg> */}
        {/* </button> */}
        {/* <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button> */}
      </div>
    </div>
  );
}
