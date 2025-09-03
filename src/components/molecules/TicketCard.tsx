import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { Schema } from "../../../amplify/data/resource";

type Ticket = Schema['Ticket']['type'];

type TicketCardProps = {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
};


function TicketCard({ ticket, onEdit }: TicketCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState(ticket);
  const toggleCard = () => setIsOpen(prev => !prev);
  const handleEditToggle = () => setIsEditing(prev => !prev);

  const handleSave = () => {
    onEdit(editedTicket);
    setIsEditing(false);
  };

  const navigate = useNavigate(); // ⬅️ INSIDE your component

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTicket({ ...editedTicket, [name]: value });
  };

  return (
    
    <div className="bg-gray-800 text-white rounded-md shadow-md p-4 mb-4">
<div
  onClick={() => navigate(`/ticket/${ticket.id}`)}
  className="text-xl font-bold text-indigo-400 cursor-pointer hover:underline"
>
  {ticket.title}
</div>

      {isOpen && (
        <div className="mt-4 space-y-3">
          {isEditing ? (
            <>
              <div className="bg-gray-700 p-3 rounded">
                <label className="block text-sm text-gray-300 mb-1">Title</label>
                <input
                  className="w-full bg-gray-800 p-2 rounded"
                  name="title"
                  value={editedTicket.title ?? ""}
                  onChange={handleChange}
                />
              </div>

              <div className="bg-gray-700 p-3 rounded">
                <label className="block text-sm text-gray-300 mb-1">Description</label>
                <textarea
                  className="w-full bg-gray-800 p-2 rounded"
                  name="description"
                  rows={3}
                  value={editedTicket.description ?? ""}
                  onChange={handleChange}
                />
              </div>

              <div className="bg-gray-700 p-3 rounded">
                <label className="block text-sm text-gray-300 mb-1">Priority</label>
                <select
                  className="w-full bg-gray-800 p-2 rounded"
                  name="priority"
                  value={editedTicket.priority ?? ""}
                  onChange={handleChange}
                >
                  <option value="">Select priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="bg-gray-700 p-3 rounded">
                <label className="block text-sm text-gray-300 mb-1">Due Date</label>
                <input
                  type="date"
                  className="w-full bg-gray-800 p-2 rounded"
                  name="dueDate"
                  value={editedTicket.dueDate ?? ""}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button onClick={handleSave} className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
                  Save
                </button>
                <button onClick={handleEditToggle} className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-600">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-gray-700 p-3 rounded">
                <p className="text-sm text-gray-300">📄 <strong>Title:</strong> {ticket.title}</p>
              </div>

              <div className="bg-gray-700 p-3 rounded">
                <p className="text-sm text-gray-300">📝 <strong>Description:</strong> {ticket.description}</p>
              </div>

              <div className="bg-gray-700 p-3 rounded grid grid-cols-2 gap-4">
                <p className="text-sm text-gray-300">🚩 <strong>Priority:</strong> {ticket.priority ?? ""}</p>
                <p className="text-sm text-gray-300">📅 <strong>Due:</strong> {ticket.dueDate ?? ""}</p>
              </div>

              <div className="bg-gray-700 p-3 rounded">
                <p className="text-sm text-gray-400">
                   {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : "Unknown"}
                </p>
              </div>

              <button onClick={handleEditToggle} className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
            </>
          )}

          {/* Chatter */}
{/*          <div className="mt-4 bg-gray-700 p-3 rounded">
            <h4 className="text-indigo-300 font-semibold mb-2">Chatter</h4>
            <div className="space-y-2 mb-2 max-h-40 overflow-auto pr-1">
              {chatter.map((msg, i) => (
                <div key={i} className="bg-gray-800 p-2 rounded border border-gray-600 text-sm">
                  {msg}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-gray-800 p-2 rounded"
                placeholder="Add comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={handleAddComment} className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                Post
              </button>
            </div>
          </div>*/}
        </div>
      )}
    </div>
  );
}

export default TicketCard;
