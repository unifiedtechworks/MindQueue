import TicketCard from "../molecules/TicketCard";

function TicketList({ tickets }) {
  return (
    <section className="p-4 rounded shadow bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-white">Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-400">No tickets found.</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TicketList;
