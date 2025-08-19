// import { useEffect, useState } from "react";

// /* --- MOCK API FUNCTIONS --- */
// // NOTE: To fix the compilation error, I've included mock API functions here.
// // This makes the component self-contained and runnable in this environment.
// // In your actual project, you should remove these and use your real import:
// // import { applyLeave, getLeaveBalance, getEmployeeLeaves } from "../api";

// const mockLeaveBalance = { leaveBalance: 18 };
// const mockEmployeeLeaves = [
//   {
//     id: 1,
//     startDate: "2024-07-10T00:00:00.000Z",
//     endDate: "2024-07-12T00:00:00.000Z",
//     status: "Approved",
//   },
//   {
//     id: 2,
//     startDate: "2024-08-01T00:00:00.000Z",
//     endDate: "2024-08-01T00:00:00.000Z",
//     status: "Rejected",
//   },
//   {
//     id: 3,
//     startDate: "2024-09-15T00:00:00.000Z",
//     endDate: "2024-09-20T00:00:00.000Z",
//     status: "Pending",
//   },
// ];

// const getLeaveBalance = async (userId) => {
//   console.log(`Fetching leave balance for user ${userId} (mock)...`);
//   await new Promise((resolve) => setTimeout(resolve, 600));
//   return { data: mockLeaveBalance };
// };

// const getEmployeeLeaves = async (userId) => {
//   console.log(`Fetching leaves for user ${userId} (mock)...`);
//   await new Promise((resolve) => setTimeout(resolve, 600));
//   return { data: mockEmployeeLeaves };
// };

// const applyLeave = async (leaveData) => {
//   console.log("Applying for leave (mock):", leaveData);
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const newLeave = {
//     id: Math.random(),
//     ...leaveData,
//     status: "Pending",
//   };
//   mockEmployeeLeaves.push(newLeave);
//   const leaveDays =
//     (new Date(leaveData.endDate) - new Date(leaveData.startDate)) /
//       (1000 * 60 * 60 * 24) +
//     1;
//   mockLeaveBalance.leaveBalance -= leaveDays;
//   return { success: true };
// };
// /* --- END OF MOCK API FUNCTIONS --- */

// export default function EmployeeDashboard({ user }) {
//   const [balance, setBalance] = useState(0);
//   const [leaves, setLeaves] = useState([]);
//   const [form, setForm] = useState({ startDate: "", endDate: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (user && user.id) {
//       fetchAllData();
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   const fetchAllData = async () => {
//     try {
//       setLoading(true);
//       const [balanceRes, leavesRes] = await Promise.all([
//         getLeaveBalance(user.id),
//         getEmployeeLeaves(user.id),
//       ]);
//       setBalance(balanceRes.data.leaveBalance);
//       setLeaves(leavesRes.data);
//     } catch (err) {
//       console.error("Failed to fetch employee data:", err);
//       setError("Could not load your data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApply = async (e) => {
//     e.preventDefault();
//     if (!form.startDate || !form.endDate) {
//       alert("Please select both a start and end date.");
//       return;
//     }
//     try {
//       await applyLeave({ employeeId: user.id, ...form });
//       alert("✅ Leave applied successfully!");
//       fetchAllData();
//       setForm({ startDate: "", endDate: "" });
//     } catch (err) {
//       console.error("Failed to apply for leave:", err);
//       alert("❌ Failed to apply for leave. Please try again.");
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center text-green-400 text-2xl">
//         Please log in to see your dashboard.
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center text-green-400 text-2xl">
//         Loading Dashboard...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500 text-2xl">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-green-200 p-4 sm:p-6 lg:p-8 font-sans">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <h1 className="text-4xl font-extrabold text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.8)]">
//           Welcome {user.name}
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="bg-gray-900/95 border border-green-600 shadow-[0_0_12px_rgba(0,255,0,0.3)] p-6 rounded-2xl flex flex-col justify-center items-center text-center">
//             <h2 className="text-2xl font-bold text-green-400 mb-2">
//               Leave Balance
//             </h2>
//             <p className="text-6xl font-extrabold text-green-300 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">
//               {balance}
//             </p>
//             <p className="text-lg text-green-400">days remaining</p>
//           </div>
//           <form
//             onSubmit={handleApply}
//             className="bg-gray-900/95 border border-green-600 shadow-[0_0_12px_rgba(0,255,0,0.3)] p-6 rounded-2xl space-y-4"
//           >
//             <h2 className="text-2xl font-bold text-green-400">
//               Apply for Leave
//             </h2>
//             <div className="space-y-2">
//               <label className="font-semibold block">Start Date</label>
//               <input
//                 type="date"
//                 value={form.startDate}
//                 className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 onChange={(e) =>
//                   setForm({ ...form, startDate: e.target.value })
//                 }
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="font-semibold block">End Date</label>
//               <input
//                 type="date"
//                 value={form.endDate}
//                 className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//                 onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold px-4 py-3 rounded-lg shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all"
//             >
//               Submit Application
//             </button>
//           </form>
//         </div>

//         <div className="bg-gray-900/95 border border-green-600 shadow-[0_0_12px_rgba(0,255,0,0.3)] p-6 rounded-2xl">
//           <h2 className="text-2xl font-bold text-green-400 mb-4">
//             Your Leave History
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-800 border-b-2 border-green-500">
//                   <th className="p-3 font-bold uppercase text-green-400">
//                     Start Date
//                   </th>
//                   <th className="p-3 font-bold uppercase text-green-400">
//                     End Date
//                   </th>
//                   <th className="p-3 font-bold uppercase text-green-400">
//                     Status
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {leaves.map((l) => (
//                   <tr
//                     key={l.id}
//                     className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
//                   >
//                     <td className="p-3">{l.startDate.substring(0, 10)}</td>
//                     <td className="p-3">{l.endDate.substring(0, 10)}</td>
//                     <td className="p-3">
//                       <span
//                         className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                           l.status === "Approved"
//                             ? "bg-green-500/20 text-green-400"
//                             : l.status === "Rejected"
//                             ? "bg-red-500/20 text-red-400"
//                             : "bg-yellow-500/20 text-yellow-400"
//                         }`}
//                       >
//                         {l.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
// This now imports the REAL API functions from your api.js file
import { applyLeave, getLeaveBalance, getEmployeeLeaves } from "../api";

export default function EmployeeDashboard({ user }) {
  const [balance, setBalance] = useState(0);
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ startDate: "", endDate: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      fetchAllData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [balanceRes, leavesRes] = await Promise.all([
        getLeaveBalance(user.id),
        getEmployeeLeaves(user.id),
      ]);
      setBalance(balanceRes.data.leaveBalance);
      setLeaves(leavesRes.data);
    } catch (err) {
      console.error("Failed to fetch employee data:", err);
      setError("Could not load your data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate) {
      alert("Please select both a start and end date.");
      return;
    }
    try {
      // This will now send the leave application to your server
      await applyLeave({ employeeId: user.id, ...form });
      alert("✅ Leave applied successfully!");
      fetchAllData(); // Refreshes data from the server
      setForm({ startDate: "", endDate: "" });
    } catch (err) {
      console.error("Failed to apply for leave:", err);
      alert("❌ Failed to apply for leave. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-green-400 text-2xl">
        Please log in to see your dashboard.
      </div>
    );
  }

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
          Welcome {user.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900/95 border border-green-600 shadow-[0_0_12px_rgba(0,255,0,0.3)] p-6 rounded-2xl flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              Leave Balance
            </h2>
            <p className="text-6xl font-extrabold text-green-300 drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">
              {balance}
            </p>
            <p className="text-lg text-green-400">days remaining</p>
          </div>
          <form
            onSubmit={handleApply}
            className="bg-gray-900/95 border border-green-600 shadow-[0_0_12px_rgba(0,255,0,0.3)] p-6 rounded-2xl space-y-4"
          >
            <h2 className="text-2xl font-bold text-green-400">
              Apply for Leave
            </h2>
            <div className="space-y-2">
              <label className="font-semibold block">Start Date</label>
              <input
                type="date"
                value={form.startDate}
                className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label className="font-semibold block">End Date</label>
              <input
                type="date"
                value={form.endDate}
                className="bg-gray-800 border border-green-500 text-green-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold px-4 py-3 rounded-lg shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 transition-all"
            >
              Submit Application
            </button>
          </form>
        </div>

        <div className="bg-gray-900/95 border border-green-600 shadow-[0_0_12px_rgba(0,255,0,0.3)] p-6 rounded-2xl">
          <h2 className="text-2xl font-bold text-green-400 mb-4">
            Your Leave History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 border-b-2 border-green-500">
                  <th className="p-3 font-bold uppercase text-green-400">
                    Start Date
                  </th>
                  <th className="p-3 font-bold uppercase text-green-400">
                    End Date
                  </th>
                  <th className="p-3 font-bold uppercase text-green-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((l) => (
                  <tr
                    key={l.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
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
