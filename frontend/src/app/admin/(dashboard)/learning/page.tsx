'use client';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin';

interface Learning { id: number; title: string; description: string; progress: number; display_order: number; }

export default function AdminLearning() {
  const [items, setItems] = useState<Learning[]>([]);
  const [editing, setEditing] = useState<Learning | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', progress: 0, display_order: 0 });

  const load = () => adminFetch('/learning/').then(r => r.json()).then(setItems).catch(() => {});
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ title: '', description: '', progress: 0, display_order: 0 }); setEditing(null); setShowForm(false); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    if (editing) {
      await adminFetch(`/learning/${editing.id}`, { method: 'PUT', body: JSON.stringify(form) });
    } else {
      await adminFetch('/learning/', { method: 'POST', body: JSON.stringify(form) });
    }
    resetForm(); load();
  };

  const handleEdit = (c: Learning) => { setEditing(c); setForm({ title: c.title, description: c.description || '', progress: c.progress || 0, display_order: c.display_order }); setShowForm(true); };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this learning item?')) return;
    await adminFetch(`/learning/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Currently Learning</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} items active.</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700">
          <i className="fa-solid fa-plus text-xs"></i> Add Item
        </button>
      </div>

      {showForm && (
        <div className="border-2 border-black bg-white p-5 mb-5">
          <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">{editing ? 'Edit Item' : 'New Item'}</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Rust" /></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Description</label><input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Systems + WASM targets" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Progress (%)</label><input type="number" min="0" max="100" value={form.progress} onChange={e => setForm({ ...form, progress: parseInt(e.target.value) || 0 })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Display Order</label><input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-gray-900 text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700">{editing ? 'Update' : 'Create'}</button>
            <button onClick={resetForm} className="bg-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="border-2 border-black bg-white">
        {items.map((item, i) => (
          <div key={item.id} className={`flex flex-col gap-2 px-4 py-3 ${i !== items.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-black mb-0.5">{item.title}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold mr-2">{item.progress}%</span>
                <button onClick={() => handleEdit(item)} className="w-7 h-7 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-50 text-xs"><i className="fa-solid fa-pen"></i></button>
                <button onClick={() => handleDelete(item.id)} className="w-7 h-7 border-2 border-black bg-white flex items-center justify-center hover:bg-red-50 text-xs text-red-500"><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
            <div className="w-full h-1.5 bg-gray-200 mt-1">
              <div className="h-full bg-gray-600" style={{ width: `${item.progress}%` }}></div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="px-4 py-6 text-center text-sm text-gray-500">No learning items yet.</div>}
      </div>
    </>
  );
}
