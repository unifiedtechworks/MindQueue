import TicketForm from "../components/organisms/TicketForm";

export default function CreateTicket({ onCreate }) {
  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-semibold mb-4">Create Ticket</h1>
      <TicketForm onCreate={onCreate} />
    </div>
  );
}
