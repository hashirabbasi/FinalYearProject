import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [pendingWorkers, setPendingWorkers] = useState([]);
  const [approvedWorkers, setApprovedWorkers] = useState([]);
  const [viewApproved, setViewApproved] = useState(false);

  useEffect(() => {
    fetchPendingWorkers();
    // eslint-disable-next-line
  }, []);

  const fetchPendingWorkers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/pending-workers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingWorkers(res.data);
    } catch (error) {
      console.error('Error fetching pending workers:', error);
    }
  };

  const fetchApprovedWorkers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/admin/approved-workers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApprovedWorkers(res.data);
    } catch (error) {
      console.error('Error fetching approved workers:', error);
    }
  };

  const handleApproval = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BASE_URL}/admin/${status}-worker/${id}`;
      await axios.put(url, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingWorkers();
      fetchApprovedWorkers();
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
    }
  };

  const workersToDisplay = viewApproved ? approvedWorkers : pendingWorkers;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-20 md:w-72 bg-[#1e293b] text-white flex flex-col py-6 md:py-8 px-2 md:px-6 shadow-2xl">
        <div className="flex items-center mb-8 md:mb-10">
          <img src="/image.png" alt="Logo" className="w-10 h-10 md:w-12 md:h-12 mr-2 md:mr-3 rounded-full shadow" />
          <span className="hidden md:inline text-xl md:text-2xl font-bold tracking-wide">Sahulat Admin</span>
        </div>
        <nav className="flex flex-col gap-2 md:gap-4 flex-1">
          <button
            onClick={() => setViewApproved(false)}
            className={`text-left px-2 md:px-4 py-2 rounded transition text-base md:text-lg ${!viewApproved ? 'bg-blue-600' : 'hover:bg-blue-800'}`}
          >
            Pending Workers
          </button>
          <button
            onClick={() => { setViewApproved(true); fetchApprovedWorkers(); }}
            className={`text-left px-2 md:px-4 py-2 rounded transition text-base md:text-lg ${viewApproved ? 'bg-blue-600' : 'hover:bg-blue-800'}`}
          >
            Approved Workers
          </button>
          <Link to="/settings" className="px-2 md:px-4 py-2 rounded hover:bg-blue-800 transition text-base md:text-lg">Settings</Link>
        </nav>
        <div className="mt-8 md:mt-10">
          <Link to="/userLogin" className="block text-center bg-red-500 hover:bg-red-600 px-2 md:px-4 py-2 rounded font-semibold transition text-base md:text-lg">
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10">
        <header className="mb-6 md:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
            {viewApproved ? 'Approved Workers' : 'Pending Worker Approvals'}
          </h2>
          <span className="text-gray-500 font-medium text-sm md:text-base mt-2 md:mt-0">
            {new Date().toLocaleDateString()}
          </span>
        </header>

        {workersToDisplay.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <img src="/image.png" alt="No Data" className="w-16 md:w-20 mb-4 opacity-60" />
            <p className="text-gray-500 text-base md:text-lg">
              No {viewApproved ? 'approved' : 'pending'} workers at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 md:gap-x-8">
            {workersToDisplay.map((worker) => (
              <div
                key={worker._id}
                className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <div className="bg-blue-100 rounded-full h-10 w-10 md:h-14 md:w-14 flex items-center justify-center mr-3 md:mr-4">
                    <span className="text-xl md:text-2xl font-bold text-blue-700">
                      {worker.fullname.firstname[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                      {worker.fullname.firstname} {worker.fullname.lastname}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400">{worker.email}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs md:text-sm text-gray-600 mb-1"><strong>Service:</strong> {worker.serviceType}</p>
                  <p className="text-xs md:text-sm text-gray-600 mb-1"><strong>Experience:</strong> {worker.experience} years</p>
                  <p className="text-xs md:text-sm text-gray-600 mb-1"><strong>Status:</strong> <span className={`font-semibold ${worker.status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>{worker.status}</span></p>
                </div>
                {!viewApproved && (
                  <div className="mt-4 md:mt-6 flex gap-2 md:gap-3">
                    <button
                      onClick={() => handleApproval(worker._id, 'approve')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-2 md:px-4 py-2 rounded shadow font-semibold transition text-base md:text-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(worker._id, 'disapprove')}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-2 md:px-4 py-2 rounded shadow font-semibold transition text-base md:text-lg"
                    >
                      Disapprove
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
