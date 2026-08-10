import { getServerApiUrl } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getCertificates() {
  try {
    const res = await fetch(`${getServerApiUrl()}/certificates/`, { next: { revalidate: 0 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    return [];
  }
}

export default async function Certificates() {
  const certificates = await getCertificates();

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Certificates & Bootcamps</h1>
          <p className="text-sm text-gray-500 mt-1">Formal achievements, courses, and certifications.</p>
        </div>
        <div className="flex gap-3">
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">{certificates.length}</div>
            <div className="text-xs text-gray-500">Credentials</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert: any) => (
          <div key={cert.id} className="border-2 border-black bg-white p-4 flex flex-col items-start gap-3 justify-between">
            <div className="flex items-start gap-3 w-full">
              <div className="w-10 h-10 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
                <i className={`fa-solid ${cert.icon || 'fa-certificate'} text-sm`}></i>
              </div>
              <div>
                <div className="font-black text-sm leading-tight">{cert.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{cert.issuer}</div>
                {cert.date && (
                  <div className="text-xs font-mono text-gray-400 mt-1.5 border border-gray-200 px-2 py-0.5 inline-block">
                    {cert.date}
                  </div>
                )}
              </div>
            </div>
            
            {cert.credential_url && (
              <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="mt-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 border-2 border-black px-3 py-1.5 w-full text-center transition-colors">
                View Credential <i className="fa-solid fa-arrow-up-right-from-square ml-1"></i>
              </a>
            )}
          </div>
        ))}
        {certificates.length === 0 && (
          <div className="col-span-full p-4 border-2 border-dashed border-gray-400 text-center text-sm text-gray-500 bg-white">
            No certificates added yet.
          </div>
        )}
      </div>
    </>
  );
}
