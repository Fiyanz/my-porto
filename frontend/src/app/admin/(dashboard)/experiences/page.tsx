'use client';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin';

interface Exp { id: number; type: string; title: string; institution: string; location: string | null; time_range: string; status: string; description: string; outcome: string | null; tags: string[]; icon: string; icon_bg: string; display_order: number; }

const TYPES = ['education', 'bootcamp', 'program', 'work', 'oss', 'milestone'];
const STATUSES = ['Current', 'Completed', 'Ongoing'];

export default function AdminExperiences() {
  const [exps, setExps] = useState<Exp[]>([]);
  const [editing, setEditing] = useState<Exp | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'education', title: '', institution: '', location: '', time_range: '', status: 'Completed', description: '', outcome: '', tags: '', icon: 'fa-briefcase', icon_bg: 'bg-gray-700', display_order: 0 });

  const load = () => adminFetch('/experiences/').then(r => r.json()).then(setExps).catch(() => {});
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ type: 'education', title: '', institution: '', location: '', time_range: '', status: 'Completed', description: '', outcome: '', tags: '', icon: 'fa-briefcase', icon_bg: 'bg-gray-700', display_order: 0 }); setEditing(null); setShowForm(false); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    const body = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    if (editing) {
      await adminFetch(`/experiences/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) });
    } else {
      await adminFetch('/experiences/', { method: 'POST', body: JSON.stringify(body) });
    }
    resetForm(); load();
  };

  const handleEdit = (e: Exp) => { setEditing(e); setForm({ type: e.type, title: e.title, institution: e.institution, location: e.location || '', time_range: e.time_range, status: e.status, description: e.description, outcome: e.outcome || '', tags: (e.tags || []).join(', '), icon: e.icon, icon_bg: e.icon_bg, display_order: e.display_order }); setShowForm(true); };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this experience?')) return;
    await adminFetch(`/experiences/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Manage Experience</h1>
          <p className="text-sm text-gray-500 mt-1">{exps.length} entries in your timeline.</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700">
          <i className="fa-solid fa-plus text-xs"></i> Add Experience
        </button>
      </div>

      {showForm && (
        <div className="border-2 border-black bg-white p-5 mb-5">
          <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">{editing ? 'Edit Experience' : 'New Experience'}</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Institution</label><input value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Time Range</label><input value={form.time_range} onChange={e => setForm({ ...form, time_range: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="2022 – Present" /></div>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Type</label><select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm">{TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Status</label><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm">{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Icon</label><input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm" placeholder="fa-graduation-cap" /></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Order</label><input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm" /></div>
          </div>
          <div className="mb-3"><label className="text-xs font-bold text-gray-600 block mb-1">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm h-20 resize-none" /></div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Outcome</label><input value={form.outcome} onChange={e => setForm({ ...form, outcome: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm" /></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Tags (comma-separated)</label><input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm" placeholder="TensorFlow, Pandas" /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-gray-900 text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700">{editing ? 'Update' : 'Create'}</button>
            <button onClick={resetForm} className="bg-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="border-2 border-black bg-white">
        {exps.map((exp, i) => (
          <div key={exp.id} className={`flex items-center justify-between px-4 py-3 ${i !== exps.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${exp.icon_bg} border-2 border-black flex items-center justify-center shrink-0`}>
                <i className={`fa-solid ${exp.icon} text-white text-xs`}></i>
              </div>
              <div>
                <div className="text-sm font-black">{exp.title}</div>
                <div className="text-xs text-gray-500">{exp.institution} · {exp.time_range}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs border-2 border-black px-2 py-0.5 font-bold ${exp.status === 'Current' || exp.status === 'Ongoing' ? 'bg-gray-900 text-white' : 'bg-white'}`}>{exp.status}</span>
              <button onClick={() => handleEdit(exp)} className="w-7 h-7 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-50 text-xs"><i className="fa-solid fa-pen"></i></button>
              <button onClick={() => handleDelete(exp.id)} className="w-7 h-7 border-2 border-black bg-white flex items-center justify-center hover:bg-red-50 text-xs text-red-500"><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        ))}
        {exps.length === 0 && <div className="px-4 py-6 text-center text-sm text-gray-500">No experiences yet.</div>}
      </div>
    </>
  );
}
