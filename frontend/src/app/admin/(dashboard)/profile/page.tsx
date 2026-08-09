'use client';
import { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin';

export default function AdminProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({ name: '', title: '', bio: '', avatar_url: '', github_url: '', linkedin_url: '', email: '', location: '', status: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminFetch('/admin/profile').then(r => r.json()).then(p => {
      setProfile(p);
      setForm({ name: p.name || '', title: p.title || '', bio: p.bio || '', avatar_url: p.avatar_url || '', github_url: p.github_url || '', linkedin_url: p.linkedin_url || '', email: p.email || '', location: p.location || '', status: p.status || '' });
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await adminFetch('/admin/profile', { method: 'PUT', body: JSON.stringify(form) });
      const data = await res.json();
      setProfile(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mb-5">
        <h1 className="text-3xl font-black tracking-tight">Profile Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your portfolio profile information.</p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Form */}
        <div className="col-span-2">
          <div className="border-2 border-black bg-white p-5">
            <h3 className="font-black text-sm mb-4 border-b-2 border-black pb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><label className="text-xs font-bold text-gray-600 block mb-1">Full Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
              <div><label className="text-xs font-bold text-gray-600 block mb-1">Title / Tagline</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
            </div>
            <div className="mb-3"><label className="text-xs font-bold text-gray-600 block mb-1">Bio</label><textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-black" /></div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><label className="text-xs font-bold text-gray-600 block mb-1">Email</label><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
              <div><label className="text-xs font-bold text-gray-600 block mb-1">Location</label><input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div><label className="text-xs font-bold text-gray-600 block mb-1">GitHub URL</label><input value={form.github_url} onChange={e => setForm({ ...form, github_url: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
              <div><label className="text-xs font-bold text-gray-600 block mb-1">LinkedIn URL</label><input value={form.linkedin_url} onChange={e => setForm({ ...form, linkedin_url: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div><label className="text-xs font-bold text-gray-600 block mb-1">Avatar URL</label><input value={form.avatar_url} onChange={e => setForm({ ...form, avatar_url: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="https://..." /></div>
              <div><label className="text-xs font-bold text-gray-600 block mb-1">Status</label><input value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Available for Internship" /></div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleSave} disabled={saving} className="bg-gray-900 text-white px-5 py-2.5 text-sm font-bold border-2 border-black hover:bg-gray-700 disabled:opacity-50 flex items-center gap-2">
                {saving ? <><span className="mono text-gray-400 text-xs">$</span> saving…</> : saved ? <><i className="fa-solid fa-check text-xs"></i> Saved!</> : <><span className="mono text-gray-400 text-xs">$</span> save changes</>}
              </button>
              {saved && <span className="text-xs text-green-600 font-bold">✓ Profile updated</span>}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div className="border-2 border-black bg-white p-4">
            <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">Preview</h3>
            <div className="text-center">
              {form.avatar_url ? (
                <img src={form.avatar_url} alt="Avatar" className="w-20 h-20 border-2 border-black mx-auto mb-3 object-cover" />
              ) : (
                <div className="w-20 h-20 bg-gray-200 border-2 border-black mx-auto mb-3 flex items-center justify-center">
                  <i className="fa-solid fa-user text-2xl text-gray-400"></i>
                </div>
              )}
              <div className="font-black text-lg">{form.name || 'Your Name'}</div>
              <div className="text-xs text-gray-500 mt-1">{form.title || 'Your Title'}</div>
              {form.location && <div className="text-xs text-gray-400 mt-1"><i className="fa-solid fa-location-dot mr-1"></i>{form.location}</div>}
              {form.status && (
                <div className="mt-3 border-2 border-black px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gray-800 animate-pulse rounded-full"></div>
                  {form.status}
                </div>
              )}
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
