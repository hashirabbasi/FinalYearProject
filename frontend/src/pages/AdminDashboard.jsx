import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [pendingWorkers, setPendingWorkers] = useState([]);
  const [approvedWorkers, setApprovedWorkers] = useState([]);
  const [viewApproved, setViewApproved] = useState(false);

  // Load pending workers by default
  useEffect(() => {
    fetchPendingWorkers();
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] text-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-4">
          <button onClick={() => setViewApproved(false)} className="block w-full text-left hover:text-gray-300">Pending Workers</button>
          <button onClick={() => { setViewApproved(true); fetchApprovedWorkers(); }} className="block w-full text-left hover:text-gray-300">Approved Workers</button>
          <Link to="/settings" className="block hover:text-gray-300">Settings</Link>
          <Link to="/userLogin" className="block hover:text-red-400">Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {viewApproved ? 'Approved Workers' : 'Pending Worker Approvals'}
        </h2>

        {workersToDisplay.length === 0 ? (
          <p className="text-gray-600">No {viewApproved ? 'approved' : 'pending'} workers at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workersToDisplay.map((worker) => (
              <div
                key={worker._id}
                className="bg-white rounded-xl shadow-lg p-6 border hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {worker.fullname.firstname} {worker.fullname.lastname}
                </h3>
                <p className="text-sm text-gray-600"><strong>Email:</strong> {worker.email}</p>
                <p className="text-sm text-gray-600"><strong>Service:</strong> {worker.serviceType}</p>
                <p className="text-sm text-gray-600"><strong>Experience:</strong> {worker.experience} years</p>
                <p className="text-sm text-gray-600"><strong>Status:</strong> {worker.status}</p>
                {!viewApproved && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => handleApproval(worker._id, 'approve')}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(worker._id, 'disapprove')}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
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
