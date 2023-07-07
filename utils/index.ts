import { FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, fuel, limit, model } = filters;
  const headers = {
    "X-RapidAPI-Key": "556a6ab2ddmsh8c67b1c18927fe9p15a77cjsn474991023aa9",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=${model}&make=${manufacturer}&year=${year}&limit=${limit}&fuel_type=${fuel}`,
    { headers: headers }
  );

  const result = await response.json();

  return result;
}

// export function generateCarImageUrl(car: CarProps, angle?: string): string {
//   const url = new URL("https://cdn.imagin.studio/getimage");

//   const { make, model, year } = car;

//   url.searchParams.append("customer", "hrjavascript-mastery");
//   url.searchParams.append("make", make);
//   url.searchParams.append("modelYear", `${year}`);
//   url.searchParams.append("modelFamily", model.split(" ")[0]);
//   url.searchParams.append("zoomType", "fullscreen");
//   url.searchParams.append("angle", `${angle}`);

//   return `${url}`;
// }

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string): string => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.search}?${searchParams.toString()}`;

  return newPathname;
};
