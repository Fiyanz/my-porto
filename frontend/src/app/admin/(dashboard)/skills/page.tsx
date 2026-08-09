'use client';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin';

interface Skill { id: number; category: string; name: string; level: number; icon: string | null; is_primary: boolean; display_order: number; }

const CATEGORIES = ['Languages', 'ML / Data', 'Backend / Infra', 'IoT / Embedded', 'Mobile / Web3', 'Tooling / OS'];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: 'Languages', name: '', level: 50, is_primary: false, display_order: 0 });

  const load = () => adminFetch('/skills/').then(r => r.json()).then(setSkills).catch(() => {});
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ category: 'Languages', name: '', level: 50, is_primary: false, display_order: 0 }); setEditing(null); setShowForm(false); };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    if (editing) {
      await adminFetch(`/skills/${editing.id}`, { method: 'PUT', body: JSON.stringify(form) });
    } else {
      await adminFetch('/skills/', { method: 'POST', body: JSON.stringify(form) });
    }
    resetForm(); load();
  };

  const handleEdit = (s: Skill) => { setEditing(s); setForm({ category: s.category, name: s.name, level: s.level, is_primary: s.is_primary, display_order: s.display_order }); setShowForm(true); };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this skill?')) return;
    await adminFetch(`/skills/${id}`, { method: 'DELETE' });
    load();
  };

  const grouped = CATEGORIES.map(cat => ({ cat, items: skills.filter(s => s.category === cat) }));

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Manage Skills</h1>
          <p className="text-sm text-gray-500 mt-1">{skills.length} skills across {CATEGORIES.length} categories.</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700">
          <i className="fa-solid fa-plus text-xs"></i> Add Skill
        </button>
      </div>

      {showForm && (
        <div className="border-2 border-black bg-white p-5 mb-5">
          <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">{editing ? 'Edit Skill' : 'New Skill'}</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">Name</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="e.g. Python" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">Level ({form.level}%)</label>
              <input type="range" min={0} max={100} value={form.level} onChange={e => setForm({ ...form, level: parseInt(e.target.value) })} className="w-full" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">Display Order</label>
              <input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_primary} onChange={e => setForm({ ...form, is_primary: e.target.checked })} className="w-4 h-4 border-2 border-black" />
                <span className="text-xs font-bold text-gray-600">Primary (Most Used)</span>
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-gray-900 text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700">
              {editing ? 'Update' : 'Create'}
            </button>
            <button onClick={resetForm} className="bg-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      {grouped.map(({ cat, items }) => (
        <div key={cat} className="mb-4">
          <h3 className="font-black text-sm mb-2">{cat} <span className="text-gray-400 font-normal">({items.length})</span></h3>
          <div className="border-2 border-black bg-white">
            {items.length > 0 ? items.map((s, i) => (
              <div key={s.id} className={`flex items-center justify-between px-4 py-3 ${i !== items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex items-center gap-3 flex-1">
                  <span className={`border-2 border-black px-2 py-0.5 text-xs font-bold mono ${s.is_primary ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>{s.name}</span>
                  <div className="w-32 h-2 bg-gray-200 border border-gray-300">
                    <div className="h-full bg-gray-800" style={{ width: `${s.level}%` }}></div>
                  </div>
                  <span className="text-xs mono text-gray-500">{s.level}%</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(s)} className="w-7 h-7 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-50 text-xs"><i className="fa-solid fa-pen"></i></button>
                  <button onClick={() => handleDelete(s.id)} className="w-7 h-7 border-2 border-black bg-white flex items-center justify-center hover:bg-red-50 text-xs text-red-500"><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            )) : <div className="px-4 py-3 text-xs text-gray-500">No skills in this category.</div>}
          </div>
        </div>
      ))}
    </>
  );
}
