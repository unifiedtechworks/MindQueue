import TicketCard from "../molecules/TicketCard";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
type Ticket = Schema['Ticket']['type'];
import { useEffect, useState } from "react";
import { client } from "../../App";


function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

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
      {tickets.length === 0 ? (
        <p className="text-gray-400">No tickets found.</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} onEdit={undefined} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TicketList;
