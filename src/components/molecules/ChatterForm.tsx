// File: src/components/molecules/ChatterForm.tsx

import { useState } from 'react';
import { client } from '../../App';
import { type Schema } from '../../../amplify/data/resource';

type Chatter = Schema['Chatter']['type'];

type ChatterFormProps = {
  ticketId: string;
  onMessagePosted?: () => void;  // <-- 🆕 Optional callback prop
};

export default function ChatterForm({ ticketId, onMessagePosted }: ChatterFormProps) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!message.trim()) return;

  setLoading(true);

  try {
    await client.models.Chatter.create({
      message,
      createdAt: Date.now(),
      createdBy: 'guest',
      ticketId,
    });

    setMessage('');

    if (onMessagePosted) {
      onMessagePosted(); // ✅ Trigger parent reload
    }

  } catch (error) {
    console.error('Error adding chatter:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        className="border p-2 rounded resize-none"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Add a message..."
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
