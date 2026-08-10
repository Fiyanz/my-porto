'use client';
import { useEffect, useState, useRef } from 'react';
import { adminFetch } from '@/lib/admin';
import AvatarUploadModal from '@/components/AvatarUploadModal';

export default function AdminProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({ name: '', title: '', bio: '', avatar_url: '', github_url: '', linkedin_url: '', instagram_url: '', email: '', location: '', status: '', cv_url: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    adminFetch('/admin/profile').then(r => r.json()).then(p => {
      setProfile(p);
      setForm({ name: p.name || '', title: p.title || '', bio: p.bio || '', avatar_url: p.avatar_url || '', github_url: p.github_url || '', linkedin_url: p.linkedin_url || '', instagram_url: p.instagram_url || '', email: p.email || '', location: p.location || '', status: p.status || '', cv_url: p.cv_url || '' });
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

  const handleCVUpload = async () => {
    if (!cvFile) return;
    setUploading(true);
    setUploadSuccess(false);
    
    const formData = new FormData();
    formData.append('file', cvFile);

    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/files/cv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      if (res.ok) {
        setUploadSuccess(true);
        setCvFile(null);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        alert('Failed to upload CV');
      }
    } catch (err) {
      alert('Error uploading CV');
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setAvatarSrc(reader.result?.toString() || null));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setAvatarSrc(null); // close modal
    
    const formData = new FormData();
    formData.append('file', croppedBlob, 'avatar.jpg');

    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch('/api/files/avatar', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        // update form with new URL (append timestamp to bust cache)
        setForm({ ...form, avatar_url: `/api/files/avatar?t=${Date.now()}` });
      } else {
        alert('Failed to upload avatar');
      }
    } catch (err) {
      alert('Error uploading avatar');
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
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div><label className="text-xs font-bold text-gray-600 block mb-1">GitHub URL</label><input value={form.github_url} onChange={e => setForm({ ...form, github_url: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
              <div><label className="text-xs font-bold text-gray-600 block mb-1">LinkedIn URL</label><input value={form.linkedin_url} onChange={e => setForm({ ...form, linkedin_url: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
              <div><label className="text-xs font-bold text-gray-600 block mb-1">Instagram URL</label><input value={form.instagram_url} onChange={e => setForm({ ...form, instagram_url: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" /></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Avatar URL</label>
                <div className="flex gap-2">
                  <input value={form.avatar_url} onChange={e => setForm({ ...form, avatar_url: e.target.value })} className="flex-1 border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="https://..." />
                  <button onClick={() => avatarInputRef.current?.click()} className="px-3 border-2 border-black rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold">
                    Upload
                  </button>
                  <input type="file" accept="image/*" ref={avatarInputRef} onChange={handleAvatarFileChange} className="hidden" />
                </div>
              </div>
              <div><label className="text-xs font-bold text-gray-600 block mb-1">Status</label><input value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="Available for Internship" /></div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleSave} disabled={saving} className="bg-gray-900 text-white px-5 py-2.5 text-sm font-bold border-2 border-black hover:bg-gray-700 disabled:opacity-50 flex items-center gap-2">
                {saving ? <><span className="mono text-gray-400 text-xs">$</span> saving…</> : saved ? <><i className="fa-solid fa-check text-xs"></i> Saved!</> : <><span className="mono text-gray-400 text-xs">$</span> save changes</>}
              </button>
              {saved && <span className="text-xs text-green-600 font-bold">✓ Profile updated</span>}
            </div>
          </div>
          
          <div className="border-2 border-black bg-white p-5 mt-5">
            <h3 className="font-black text-sm mb-4 border-b-2 border-black pb-2">Curriculum Vitae (CV) Settings</h3>
            
            <div className="mb-5">
              <label className="text-xs font-bold text-gray-600 block mb-1">Option 1: Use External Link (Google Drive, Dropbox, etc.)</label>
              <div className="flex gap-3">
                <input value={form.cv_url} onChange={e => setForm({ ...form, cv_url: e.target.value })} className="flex-1 border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" placeholder="https://drive.google.com/..." />
                <button onClick={handleSave} disabled={saving} className="bg-gray-900 text-white px-4 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700 disabled:opacity-50 whitespace-nowrap">
                  Save Link
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">If this is filled, the Download CV button will open this link.</p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <label className="text-xs font-bold text-gray-600 block mb-2">Option 2: Upload File Directly to Database</label>
            <div className="flex items-center gap-3">
              <input 
                type="file" 
                accept="application/pdf"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                className="text-xs font-bold file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-2 file:border-black file:text-xs file:font-bold file:bg-gray-100 hover:file:bg-gray-200"
              />
              <button 
                onClick={handleCVUpload} 
                disabled={!cvFile || uploading} 
                className="bg-gray-900 text-white px-5 py-2 text-sm font-bold border-2 border-black hover:bg-gray-700 disabled:opacity-50 flex items-center gap-2"
              >
                {uploading ? <><i className="fa-solid fa-spinner fa-spin text-xs"></i> Uploading...</> : <><i className="fa-solid fa-upload text-xs"></i> Upload CV</>}
              </button>
              {uploadSuccess && <span className="text-xs text-green-600 font-bold">✓ Uploaded successfully!</span>}
            </div>
            <p className="text-xs text-gray-500 mt-3">This file will be stored in the database. Used only if Option 1 is empty.</p>
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
      
      {avatarSrc && (
        <AvatarUploadModal 
          imageSrc={avatarSrc} 
          onClose={() => {
            setAvatarSrc(null);
            if (avatarInputRef.current) avatarInputRef.current.value = '';
          }} 
          onCropComplete={handleCropComplete} 
        />
      )}
    </>
  );
}
