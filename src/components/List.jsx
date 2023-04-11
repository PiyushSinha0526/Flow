import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List() {
  const [wfData, setWfData] = useState([]);
  useEffect(() => {
    fetch("https://64307b10d4518cfb0e50e555.mockapi.io/workflow")
      .then((res) => res.json())
      .then((data) => setWfData(data));
  }, []);
  return (
    <div>
      <h2 className="font-bold px-8 py-3 border-2 border-[#4472c4]">
        Workflows
      </h2>

      <div className="relative overflow-x-auto mt-6 w-3/4 mx-20">
        <table className="text-white text-left w-full">
          <thead className="bg-[#4472c4] ">
            <tr>
              <th scope="col" className="px-6 py-3 border-2">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border-2">
                Input Type
              </th>
              <th scope="col" className="px-6 py-3 border-2">
                Created at
              </th>
            </tr>
          </thead>
          <tbody>
            {wfData.slice(0, 3).map((wf) => (
              <tr key={wf.name} className="text-black bg-[#c3c8dc]">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium border-2 border-white underline"
                >
                  <Link to={`/${wf.id}`}>{wf.name}</Link>
                </th>
                <td className="px-6 py-4 border-2 border-white">
                  {wf.input_type}
                </td>
                <td className="px-6 py-4 border-2 border-white">
                  {wf.createdAt.split("T")[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
