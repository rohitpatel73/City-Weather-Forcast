"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCityData } from "../utils/api";
import { CityData } from "../utils/types";

const CityTable = () => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof CityData>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchCities = async () => {
      const data = await getCityData();
      setCities(data);
      setFilteredCities(data);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const filtered = cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchTerm, cities]);

  const sortData = (field: keyof CityData) => {
    const order = field === sortField && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...filteredCities].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setSortField(field);
    setSortOrder(order);
    setFilteredCities(sorted);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search cities..."
        className="mb-4 p-3 w-full border-2 rounded-lg shadow-md placeholder:text-blue-400 placeholder:italic bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {searchTerm && (
        <ul className="bg-white border border-gray-300 rounded-lg shadow-lg mb-4 divide-y divide-gray-200 max-h-60 overflow-y-auto transition-all duration-300">
          {filteredCities.slice(0, 5).map((city) => (
            <li key={city.geonameid}>
              <Link
                href={`/weather/${encodeURIComponent(city.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
              >
                {city.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-500">
          <thead className="bg-gray-200">
            <tr>
              <th
                className="px-4 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                onClick={() => sortData("name")}
              >
                City{" "}
                {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="px-4 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                onClick={() => sortData("country")}
              >
                Country{" "}
                {sortField === "country"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                className="px-4 py-2 cursor-pointer text-gray-700 hover:text-gray-900"
                onClick={() => sortData("timezone")}
              >
                Timezone{" "}
                {sortField === "timezone"
                  ? sortOrder === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city) => (
              <tr key={city.geonameid}>
                <td className="px-4 py-2">
                  <a
                    href={`/weather/${encodeURIComponent(city.name)}`}
                    className="text-orange-600 hover:text-orange-800 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {city.name}
                  </a>
                </td>

                <td className="px-4 py-2 text-green-600 hover:text-green-800">
                  {city.country}
                </td>
                <td className="px-4 py-2 text-purple-600 hover:text-purple-800">
                  {city.timezone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CityTable;
