import React, { useState } from 'react';
import { client } from '../../App'; // wherever you declared createClient
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

function TicketForm({ onCreate }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignee: '',
    tags: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

const { title, description } = form;

const newTicket = {
  title,
  description,
  status: 'open',
  createdBy: 'dev-user',
};


  const result = await await client.models.Ticket.create(newTicket);

  if (result?.data) {
    console.log("Ticket created:", result.data);
    // optionally notify parent component to refresh ticket list
  }
};


  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded shadow-md space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Ticket Title"
        value={form.title}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows={3}
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <input
          type="text"
          name="assignee"
          placeholder="Assignee"
          value={form.assignee}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
        />
      </div>

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded font-semibold"
      >
         Create Ticket
      </button>
    </form>
  );
}

export default TicketForm;
