// File: src/pages/TicketDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../App";
import ChatterForm from "../components/molecules/ChatterForm";

// 👇 [TKT-DETAILS-01] Define types
type Ticket = {
  id: string;
  title: string;
  status: string;
  description?: string;
};

type Chatter = {
  id: string;
  message: string;
  createdAt: number;
  ticketId: string;
};

export default function TicketDetails() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null); // [TKT-DETAILS-02]
  const [chatters, setChatters] = useState<Chatter[]>([]);

  // 👇 [TKT-DETAILS-03] Fetch Ticket
  useEffect(() => {
    const fetchTicket = async () => {
      if (!ticketId) return;
      const result = await client.models.Ticket.get({ id: ticketId });
      if (result?.data) setTicket(result.data as Ticket);
    };
    fetchTicket();
  }, [ticketId]);

// 👇 [TKT-DETAILS-05] Add logging and fallback
useEffect(() => {
  const fetchTicket = async () => {
    if (!ticketId) {
      console.error("[TKT-DETAILS-05] No ticketId from URL");
      return;
    }

    try {
      const result = await client.models.Ticket.get({ id: ticketId });
      if (result?.data) {
        console.log("[TKT-DETAILS-05] Ticket loaded:", result.data);
        setTicket(result.data as Ticket);
      } else {
        console.warn("[TKT-DETAILS-05] No ticket data found for ID:", ticketId);
        setTicket(null);
      }
    } catch (err) {
      console.error("[TKT-DETAILS-05] Error loading ticket:", err);
    }
  };

  fetchTicket();
}, [ticketId]);

  if (!ticket) {
  return (
    <div className="p-4 text-red-600">
      <h2 className="text-xl font-bold">Ticket not found</h2>
      <p>No ticket with ID: {ticketId}</p>
    </div>
  );
};

  return (
    <div id="ticket-detail-container" className="p-4">
      <h1 id="ticket-title" className="text-2xl font-bold mb-4">
        {ticket.title}
      </h1>
      <p id="ticket-status" className="mb-2">
        Status: {ticket.status}
      </p>
      <p id="ticket-description" className="mb-4">
        {ticket.description}
      </p>

      <div id="chatter-form-wrapper" className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Add a Message</h3>
        <ChatterForm
          ticketId={ticket.id}
          onMessagePosted={() => {
            client.models.Chatter.list({
              filter: { ticketId: { eq: ticket.id } },
            }).then(res => setChatters(res.data as Chatter[] ?? []));
          }}
        />
      </div>

      <div id="chatter-messages-wrapper" className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Messages</h3>
        <div
          id="chatter-messages-scroll"
          className="space-y-2 max-h-60 overflow-y-auto pr-2"
        >
          {chatters.map((msg) => (
            <div
              key={msg.id}
              id={`chatter-msg-${msg.id}`}
              className="bg-gray-100 border border-gray-300 p-2 rounded shadow-sm"
            >
              <div className="text-xs text-gray-500 mb-1">
                {new Date(msg.createdAt * 1000).toLocaleString()}
              </div>
              <div className="text-sm">{msg.message}</div>
            </div>
          ))}
          {chatters.length === 0 && (
            <div className="text-gray-400 italic">No messages yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
