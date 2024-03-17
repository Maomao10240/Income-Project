import React from "react";
import Header from "../Header/Header";

const HomePage = () => {
  return (
    <>
      <section className="py-24 bg-white overflow-hidden">
        <div className="container px-4 mx-auto">
          <div>
            <h1 className="text-center  text-green-800 bg-green-100 text-5xl uppercase rounded-full shadow-sm space-y-8">
              INCOME & EXPENSES TRACKER
            </h1>

            <p className="text-center md:text-xl text-coolGray-500 font-medium  py-24">
              Manage your money more effectively and make better financial
              decisions with this easy-to-use software.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
