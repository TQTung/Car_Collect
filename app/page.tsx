"use client";

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { CarProps } from "@/types";
import { fetchCars } from "@/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //search states
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");

  //filter states
  const [fuel, setFuel] = useState<string>("");
  const [year, setYear] = useState<number>(2022);

  //pagination states
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    setLoading(true);
    fetchCars({
      manufacturer: manufacturer || "",
      year: year || 2022,
      fuel: fuel || "",
      limit: limit || 10,
      model: model || "",
    })
      .then((res) => {
        if (res) {
          setAllCars(res);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [year, fuel, limit, model, manufacturer]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalouge</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter options={fuels} setFilter={setFuel} />
            <CustomFilter options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, i) => (
                <CarCard key={i} car={car} />
              ))}
            </div>
            {loading && (
              <div className="mt-16 w-full flex-center">
                <Image
                  src="/loader.svg"
                  alt="loader"
                  className="object-contain"
                  width={50}
                  height={50}
                />
              </div>
            )}
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
