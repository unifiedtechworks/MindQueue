import TicketCard from "../molecules/TicketCard";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { useEffect, useState } from "react";
import { client } from "../../App";

type Ticket = Schema['Ticket']['type'];

function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

// ✅ Update ticket in state based on edited ticket data
const handleEditTicket = (updatedTicket: Ticket) => {
  setTickets(prev =>
    prev.map(t => (t.id === updatedTicket.id ? updatedTicket : t))
  );
};
  useEffect(() => {
    async function fetchTickets() {
      try{
      const result = await client.models.Ticket.list();
      if (result?.data) setTickets(result.data);
       } catch (err) {
      console.error("Error fetching tickets:", err);
    }
    }

    fetchTickets();
  }, []);

  return (
    <section className="p-4 rounded shadow bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-white">Tickets</h2>
      {tickets.map(ticket => (
  <TicketCard
    key={ticket.id}
    ticket={ticket}
    onEdit={handleEditTicket} // ✅ matches expected prop
  />
))}
    </section>
  );
}

export default TicketList;
