import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import CreateTicket from "./pages/CreateTicket";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import TicketList from "./components/organisms/TicketList";
import TicketDetails from "./pages/TicketDetails.tsx";

type Ticket = Schema['Ticket']['type'];

export const client = generateClient<Schema>();




export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

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
          <Route path="/" element={<TicketList />} />
          <Route path="/create" element={<CreateTicket onCreate={createTicket} />} />
          <Route path="/ticket/:ticketId" element={<TicketDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
