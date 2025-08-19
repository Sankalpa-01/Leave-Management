// import { useEffect, useState } from "react";
// import { getEmployees, getAllLeaves, updateLeaveStatus } from "../api";

// export default function HRDashboard({ user }) {
//   const [employees, setEmployees] = useState([]);
//   const [leaves, setLeaves] = useState([]);

//   useEffect(() => {
//     fetchEmployees();
//     fetchLeaves();
//   }, []);

//   const fetchEmployees = async () => {
//     const res = await getEmployees();
//     setEmployees(res.data);
//   };

//   const fetchLeaves = async () => {
//     const res = await getAllLeaves();
//     setLeaves(res.data);
//   };

//   const handleUpdate = async (id, status) => {
//     await updateLeaveStatus(id, { status });
//     fetchLeaves();
//     alert(`Leave ${status}`);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold">Welcome {user.name} (HR)</h1>

//       {/* Employee List */}
//       <div className="bg-white p-4 shadow rounded">
//         <h2 className="font-semibold mb-2">All Employees</h2>
//         <ul className="list-disc pl-6">
//           {employees.map((e) => (
//             <li key={e.id}>
//               {e.name} ({e.email}) - Balance: {e.leaveBalance}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Leave Requests */}
//       <div className="bg-white p-4 shadow rounded">
//         <h2 className="font-semibold mb-2">Leave Requests</h2>
//         <table className="w-full border">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2">Employee</th>
//               <th className="p-2">Start</th>
//               <th className="p-2">End</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaves.map((l) => (
//               <tr key={l.id} className="border-t">
//                 <td className="p-2">{l.Employee?.name}</td>
//                 <td className="p-2">{l.startDate.substring(0, 10)}</td>
//                 <td className="p-2">{l.endDate.substring(0, 10)}</td>
//                 <td className="p-2">{l.status}</td>
//                 <td className="p-2 space-x-2">
//                   <button
//                     onClick={() => handleUpdate(l.id, "Approved")}
//                     className="bg-green-600 text-white px-2 py-1 rounded"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleUpdate(l.id, "Rejected")}
//                     className="bg-red-600 text-white px-2 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getEmployees, getAllLeaves, updateLeaveStatus } from "../api.js";

export default function HRDashboard({ user = { name: "Admin" } }) {
  const [employees, setEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        // Fetch employees and leaves in parallel for efficiency
        const [employeesRes, leavesRes] = await Promise.all([
          getEmployees(),
          getAllLeaves(),
        ]);
        setEmployees(employeesRes.data);
        setLeaves(leavesRes.data);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load data. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await getAllLeaves();
      setLeaves(res.data);
    } catch (err) {
      console.error("Failed to refetch leaves:", err);
      alert("Error: Could not update the leave list.");
    }
  };

  const handleUpdate = async (id, status) => {
    try {
      await updateLeaveStatus(id, { status });
      alert(`Leave has been ${status}`);
      fetchLeaves(); // Refetch to show the updated status
    } catch (err) {
      console.error(`Failed to update leave status for ID ${id}:`, err);
      alert("Error: Could not update leave status.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-green-400 text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-200 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]">
          Welcome {user.name} (HR Dashboard)
        </h1>

        {/* Employee List */}
        <div className="bg-gray-900/95 border border-green-600 shadow-[0_0_12px_rgba(0,255,0,0.3)] p-6 rounded-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            All Employees
          </h2>
          <ul className="space-y-3">
            {employees.map((e) => (
              <li
                key={e.id}
                className="bg-gray-800 p-4 rounded-lg border border-green-500/50 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{e.name}</p>
                  <p className="text-sm text-green-300">{e.email}</p>
                </div>
                <p className="font-bold text-xl text-green-400">
                  {e.leaveBalance}{" "}
                  <span className="text-sm font-normal">days</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Leave Requests */}
        <div className="bg-gray-900/95 border border-green-600 shadow-[0_0_12px_rgba(0,255,0,0.3)] p-6 rounded-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            Leave Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 border-b-2 border-green-500">
                  <th className="p-3 font-bold uppercase text-green-400">
                    Employee
                  </th>
                  <th className="p-3 font-bold uppercase text-green-400">
                    Start Date
                  </th>
                  <th className="p-3 font-bold uppercase text-green-400">
                    End Date
                  </th>
                  <th className="p-3 font-bold uppercase text-green-400">
                    Status
                  </th>
                  <th className="p-3 font-bold uppercase text-green-400 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((l) => (
                  <tr
                    key={l.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-3">{l.Employee?.name}</td>
                    <td className="p-3">{l.startDate.substring(0, 10)}</td>
                    <td className="p-3">{l.endDate.substring(0, 10)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          l.status === "Approved"
                            ? "bg-green-500/20 text-green-400"
                            : l.status === "Rejected"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {l.status}
                      </span>
                    </td>
                    <td className="p-3 flex justify-center items-center space-x-2">
                      <button
                        onClick={() => handleUpdate(l.id, "Approved")}
                        className="bg-green-500 hover:bg-green-600 text-gray-900 font-bold px-3 py-1 rounded-lg shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all disabled:opacity-50"
                        disabled={l.status !== "Pending"}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdate(l.id, "Rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded-lg shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all disabled:opacity-50"
                        disabled={l.status !== "Pending"}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
