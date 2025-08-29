import TicketList from "../components/organisms/TicketList";

export default function Queue({ tickets }) {
  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-semibold mb-4">Ticket Queue</h1>
      <TicketList tickets={tickets} />
    </div>
  );
}
