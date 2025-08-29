import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Queue from "./pages/Queue";
import CreateTicket from "./pages/CreateTicket";

export default function App() {
  const [tickets, setTickets] = useState([]);

  const createTicket = (ticketData) => {
    const newTicket = {
      id: Date.now().toString(),
      createdDate: new Date().toISOString(),
      ...ticketData,
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <nav className="mb-6 space-x-4">
          <a href="/" className="text-indigo-400 hover:underline">Queue</a>
          <a href="/create" className="text-indigo-400 hover:underline">Create Ticket</a>
        </nav>

        <Routes>
          <Route path="/" element={<Queue tickets={tickets} />} />
          <Route path="/create" element={<CreateTicket onCreate={createTicket} />} />
        </Routes>
      </div>
    </Router>
  );
}
