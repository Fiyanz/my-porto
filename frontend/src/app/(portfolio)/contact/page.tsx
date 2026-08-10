import ContactClient from './ContactClient';
import { getServerApiUrl } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getProfile() {
  try {
    const res = await fetch(`${getServerApiUrl()}/admin/profile`, {
      next: { revalidate: 0 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export default async function Contact() {
  const profile = await getProfile();
  
  return <ContactClient profile={profile} />;
}
