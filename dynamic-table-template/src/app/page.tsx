"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

const API_URL = "https://jsonplaceholder.typicode.com/users";

interface TableData {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export default function Home() {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [sortOrder, setSortOrder] = useState<{ column: keyof TableData; order: "asc" | "desc" }>({ column: "id", order: "desc" });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setTableData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setIsLoading(false);
      });
  }, []);

  const sortTable = (column: keyof TableData) => {
    const order = sortOrder.column === column && sortOrder.order === "asc" ? "desc" : "asc";
    const sortedData = [...tableData].sort((a, b) =>
      order === "asc" ? (a[column] > b[column] ? 1 : -1) : (a[column] < b[column] ? 1 : -1)
    );
    setTableData(sortedData);
    setSortOrder({ column, order });
  };

  const filteredData = tableData.filter((data) =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="w-full flex flex-col items-center justify-center bg-gray-600 min-h-screen py-[10%]">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-white rounded w-1/2 outline-none text-white "
      />
      <table className="table-auto border-separate border-spacing-y-3 bg-white">
        <thead className="bg-white">
          <tr className="border-[1px] border-[#000] text-[#31591F]">
            <th className="w-[100px] px-6 py-4 flex flex-row items-center justify-center gap-1 text-center border-b border-gray-100 cursor-pointer" onClick={() => sortTable("id")}>ID {sortOrder.column === "id" ? (sortOrder.order === "asc" ? <FaArrowUp /> : <FaArrowDown />) : null}</th>
            <th className="min-w-[203px] px-6 py-4 text-center border-b border-gray-100 cursor-pointer" onClick={() => sortTable("name")}>Name</th>
            <th className="min-w-[203px] px-6 py-4 text-center border-b border-gray-100 cursor-pointer" onClick={() => sortTable("username")}>Username</th>
            <th className="min-w-[203px] px-6 py-4 text-center border-b border-gray-100 cursor-pointer" onClick={() => sortTable("email")}>Email</th>
            <th className="min-w-[203px] px-6 py-4 text-center border-b border-gray-100">Phone</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="text-center">
                <div className="w-full flex flex-col gap-2 items-center justify-center">
                  <div className="w-8 h-8 border-4 border-t-[white] rounded-full animate-spin"></div>
                </div>
              </td>
            </tr>
          ) : (
            paginatedData.map((data) => (
              <tr key={data.id}>
                <td className="px-6 py-4 text-center border-b border-gray-100">{data.id}</td>
                <td className="px-6 py-4 text-center border-b border-gray-100">{data.name}</td>
                <td className="px-6 py-4 text-center border-b border-gray-100">{data.username}</td>
                <td className="px-6 py-4 text-center border-b border-gray-100">{data.email}</td>
                <td className="px-6 py-4 text-center border-b border-gray-100">{data.phone}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="mt-4 flex gap-2">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">Prev</button>
        <span className="px-4 py-2 bg-gray-200 rounded">Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50">Next</button>
      </div>
    </section>
  );
}
