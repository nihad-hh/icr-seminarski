"use client";

import Navbar from "../../../components/Navbar";
import Link from "next/link";

export default function Faq() {
  let currentUser = localStorage.getItem("currentUser");

  currentUser = JSON.parse(currentUser);

  return (
    <>
      <Navbar />
      {/* Feedback */}{" "}
      <>
        <h1 className="flex justify-center py-6 text-2xl">
          Često postavljena pitanja
        </h1>
        <div className="px-4">
          <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse bg-base-200">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
