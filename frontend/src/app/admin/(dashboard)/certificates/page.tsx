'use client';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin';

interface Cert { id: number; title: string; issuer: string; date: string | null; credential_url: string | null; icon: string; display_order: number; }

export default function AdminCertificates() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [editing, setEditing] = useState<Cert | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', issuer: '', date: '', credential_url: '', icon: 'fa-certificate', display_order: 0 });

  const load = () => adminFetch('/certificates/').then(r => r.json()).then(setCerts).catch(() => {});
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ title: '', issuer: '', date: '', credential_url: '', icon: 'fa-certificate', display_order: 0 }); setEditing(null); setShowForm(false); };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    if (editing) {
      await adminFetch(`/certificates/${editing.id}`, { method: 'PUT', body: JSON.stringify(form) });
    } else {
      await adminFetch('/certificates/', { method: 'POST', body: JSON.stringify(form) });
    }
    resetForm(); load();
  };

  const handleEdit = (c: Cert) => { setEditing(c); setForm({ title: c.title, issuer: c.issuer, date: c.date || '', credential_url: c.credential_url || '', icon: c.icon, display_order: c.display_order }); setShowForm(true); };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this certificate?')) return;
    await adminFetch(`/certificates/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Manage Certificates</h1>
          <p className="text-sm text-gray-500 mt-1">{certs.length} certificates added.</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700">
          <i className="fa-solid fa-plus text-xs"></i> Add Certificate
        </button>
      </div>

      {showForm && (
        <div className="border-2 border-black bg-white p-5 mb-5">
          <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">{editing ? 'Edit Certificate' : 'New Certificate'}</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="AI/ML Bootcamp" /></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Issuer</label><input value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Dicoding" /></div>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Date</label><input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="2024" /></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Credential URL</label><input value={form.credential_url} onChange={e => setForm({ ...form, credential_url: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="https://..." /></div>
            <div><label className="text-xs font-bold text-gray-600 block mb-1">Icon</label><input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm" placeholder="fa-certificate" /></div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-gray-900 text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700">{editing ? 'Update' : 'Create'}</button>
            <button onClick={resetForm} className="bg-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-50">Cancel</button>
          </div>
        </div>
      )}

      <div className="border-2 border-black bg-white">
        {certs.map((cert, i) => (
          <div key={cert.id} className={`flex items-center justify-between px-4 py-3 ${i !== certs.length - 1 ? 'border-b border-gray-200' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 border-2 border-black flex items-center justify-center shrink-0">
                <i className={`fa-solid ${cert.icon} text-gray-800 text-xs`}></i>
              </div>
              <div>
                <div className="text-sm font-black">{cert.title}</div>
                <div className="text-xs text-gray-500">{cert.issuer} {cert.date ? `· ${cert.date}` : ''}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleEdit(cert)} className="w-7 h-7 border-2 border-black bg-white flex items-center justify-center hover:bg-gray-50 text-xs"><i className="fa-solid fa-pen"></i></button>
              <button onClick={() => handleDelete(cert.id)} className="w-7 h-7 border-2 border-black bg-white flex items-center justify-center hover:bg-red-50 text-xs text-red-500"><i className="fa-solid fa-trash"></i></button>
            </div>
          </div>
        ))}
        {certs.length === 0 && <div className="px-4 py-6 text-center text-sm text-gray-500">No certificates yet.</div>}
      </div>
    </>
  );
}
