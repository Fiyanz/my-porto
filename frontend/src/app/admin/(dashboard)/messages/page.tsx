'use client';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin';

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = () => adminFetch('/contact/').then(r => r.json()).then(setMessages).catch(() => {});
  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    await adminFetch(`/contact/${id}`, { method: 'PUT', body: JSON.stringify({ is_read: true }) });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    await adminFetch(`/contact/${id}`, { method: 'DELETE' });
    load();
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Messages</h1>
          <p className="text-sm text-gray-500 mt-1">{messages.length} total · {unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <div className="border-2 border-black bg-gray-900 text-white px-3 py-1.5 text-xs font-bold">
            {unreadCount} Unread
          </div>
        )}
      </div>

      <div className="border-2 border-black bg-white">
        {messages.map((msg, i) => (
          <div key={msg.id} className={`${i !== messages.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div
              onClick={() => { setExpanded(expanded === msg.id ? null : msg.id); if (!msg.is_read) markRead(msg.id); }}
              className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 ${!msg.is_read ? 'bg-gray-50' : ''}`}
            >
              <div className="flex items-center gap-3">
                {!msg.is_read && <div className="w-2.5 h-2.5 bg-gray-900 rounded-full shrink-0"></div>}
                <div>
                  <div className={`text-sm ${!msg.is_read ? 'font-black' : 'font-bold'}`}>{msg.name}</div>
                  <div className="text-xs text-gray-500">{msg.email}{msg.purpose ? ` · ${msg.purpose}` : ''}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 mono">{new Date(msg.created_at).toLocaleDateString()}</span>
                <i className={`fa-solid fa-chevron-${expanded === msg.id ? 'up' : 'down'} text-xs text-gray-400`}></i>
              </div>
            </div>
            {expanded === msg.id && (
              <div className="px-4 pb-4 border-t border-dashed border-gray-200 pt-3">
                <p className="text-sm text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap">{msg.message}</p>
                <div className="flex gap-2">
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1 border-2 border-black bg-gray-900 text-white px-3 py-1.5 text-xs font-bold hover:bg-gray-700">
                    <i className="fa-solid fa-reply text-xs"></i> Reply via Email
                  </a>
                  <button onClick={() => handleDelete(msg.id)} className="flex items-center gap-1 border-2 border-black bg-white px-3 py-1.5 text-xs font-bold hover:bg-red-50 text-red-500">
                    <i className="fa-solid fa-trash text-xs"></i> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && <div className="px-4 py-8 text-center text-sm text-gray-500">No messages yet.</div>}
      </div>
    </>
  );
}
