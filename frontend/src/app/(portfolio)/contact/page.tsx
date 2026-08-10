'use client';
import { useState } from 'react';

export default function Contact() {
  const [purpose, setPurpose] = useState('Internship');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState<React.ReactNode>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus(<span className="text-red-500">Please fill all required fields.</span>);
      return;
    }

    setIsSending(true);
    setStatus(null);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const res = await fetch(`${API_URL}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message, purpose }),
      });

      if (!res.ok) {
        throw new Error('Failed to send message');
      }

      setIsSent(true);
      setStatus(<span className="text-green-600">✓ Message sent — reply within 24h</span>);
      
      // Reset form after 5 seconds to allow another message
      setTimeout(() => {
        setIsSent(false);
        setStatus(null);
        setName('');
        setEmail('');
        setMessage('');
        setPurpose('Internship');
      }, 5000);
      
    } catch (err) {
      setStatus(<span className="text-red-500">✗ Failed to send. Please try again.</span>);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Get In Touch</h1>
          <p className="text-sm text-gray-500 mt-1">Open to internships, collaborations, and interesting side projects.</p>
        </div>
        <div className="flex items-center gap-2 border-2 border-black bg-white px-4 py-2">
          <div className="w-2.5 h-2.5 bg-gray-800 animate-pulse rounded-full"></div>
          <span className="text-xs font-black">Available for Internship</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* LEFT: Contact form + channels */}
        <div className="col-span-2 flex flex-col gap-4">
          <div id="channels-row" className="grid grid-cols-2 gap-3">
            <div className="border-2 border-black bg-white p-4 flex items-center gap-3 group cursor-pointer hover:bg-gray-50">
              <div className="w-10 h-10 bg-gray-900 border-2 border-black flex items-center justify-center shrink-0">
                <i className="fa-brands fa-github text-white text-lg"></i>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 font-medium">GitHub</div>
                <div className="text-sm font-black">@bagusalfiyan</div>
                <div className="text-xs text-gray-400 mono mt-0.5">36 repos · 84 stars</div>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-400"></i>
            </div>

            <div className="border-2 border-black bg-white p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50">
              <div className="w-10 h-10 bg-gray-700 border-2 border-black flex items-center justify-center shrink-0">
                <i className="fa-brands fa-linkedin text-white text-lg"></i>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 font-medium">LinkedIn</div>
                <div className="text-sm font-black">Bagus Alfiyan Yusuf</div>
                <div className="text-xs text-gray-400 mono mt-0.5">Fastest response</div>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-400"></i>
            </div>

            <div className="border-2 border-black bg-white p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50">
              <div className="w-10 h-10 bg-gray-500 border-2 border-black flex items-center justify-center shrink-0">
                <i className="fa-solid fa-envelope text-white text-lg"></i>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 font-medium">Email</div>
                <div className="text-sm font-black">bagus@example.com</div>
                <div className="text-xs text-gray-400 mono mt-0.5">Reply within 24h</div>
              </div>
              <i className="fa-solid fa-copy text-xs text-gray-400"></i>
            </div>

            <div className="border-2 border-black bg-white p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50">
              <div className="w-10 h-10 bg-gray-300 border-2 border-black flex items-center justify-center shrink-0">
                <i className="fa-brands fa-medium text-gray-900 text-lg"></i>
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 font-medium">Medium</div>
                <div className="text-sm font-black">@bagusalfiyan</div>
                <div className="text-xs text-gray-400 mono mt-0.5">Dev articles & notes</div>
              </div>
              <i className="fa-solid fa-arrow-up-right-from-square text-xs text-gray-400"></i>
            </div>
          </div>

          <div id="contact-form" className="border-2 border-black bg-white p-5">
            <h3 className="font-black text-sm mb-4 flex items-center gap-2 border-b-2 border-black pb-3">
              <i className="fa-solid fa-paper-plane text-gray-500"></i>
              Send a Message
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Name</label>
                <input 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" 
                  placeholder="Your name" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Email</label>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black" 
                  placeholder="your@email.com" 
                  type="email"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="text-xs font-bold text-gray-600 block mb-1">Purpose</label>
              <div className="flex border-2 border-black overflow-hidden text-xs font-bold">
                {['Internship', 'Collaboration', 'Just Saying Hi', 'Other'].map((p, idx) => (
                  <button
                    key={p}
                    onClick={() => setPurpose(p)}
                    className={`flex-1 py-2 text-center ${idx !== 0 ? 'border-l-2 border-black' : ''} ${purpose === p ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-bold text-gray-600 block mb-1">Message</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border-2 border-black bg-gray-50 px-3 py-2 text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-black" 
                placeholder="What's on your mind? Tell me about the role, project, or just say hi."
              ></textarea>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSubmit}
                disabled={isSending || isSent}
                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 text-sm font-bold border-2 border-black hover:bg-gray-700 disabled:opacity-50"
              >
                {!isSending && !isSent && (
                  <>
                    <span className="mono text-gray-400 text-xs">$</span>
                    <span>send message</span>
                    <i className="fa-solid fa-paper-plane text-xs"></i>
                  </>
                )}
                {isSending && (
                  <>
                    <span className="mono text-gray-400 text-xs">$</span>
                    <span>sending…</span>
                  </>
                )}
                {isSent && (
                  <>
                    <i className="fa-solid fa-check text-xs"></i>
                    <span>Sent!</span>
                  </>
                )}
              </button>
              <span className="text-xs text-gray-700 mono">{status}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Info sidebar */}
        <div className="flex flex-col gap-4">
          <div id="availability-card" className="border-2 border-black bg-white p-4">
            <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">Availability</h3>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-medium">Internship</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gray-800 animate-pulse rounded-full"></div>
                  <span className="text-xs font-black">Open</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-xs text-gray-600 font-medium">Freelance</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-xs font-bold text-gray-500">Limited</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-xs text-gray-600 font-medium">Open Source</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gray-800 animate-pulse rounded-full"></div>
                  <span className="text-xs font-black">Always</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="text-xs text-gray-600 font-medium">Full-time</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <span className="text-xs font-bold text-gray-400">After S1</span>
                </div>
              </div>
            </div>
          </div>

          <div id="quick-links" className="border-2 border-black bg-white p-4">
            <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a className="flex items-center justify-between border-2 border-black px-3 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <span className="text-xs font-bold">Download CV</span>
                <i className="fa-solid fa-download text-xs"></i>
              </a>
              <a className="flex items-center justify-between border-2 border-black px-3 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <span className="text-xs font-bold">GitHub Profile</span>
                <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
              <a className="flex items-center justify-between border-2 border-black px-3 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <span className="text-xs font-bold">View Projects</span>
                <i className="fa-solid fa-folder-open text-xs"></i>
              </a>
              <a className="flex items-center justify-between border-2 border-black px-3 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                <span className="text-xs font-bold">Medium Articles</span>
                <i className="fa-brands fa-medium text-xs"></i>
              </a>
            </div>
          </div>

          <div id="response-card" className="border-2 border-black bg-white p-4">
            <h3 className="font-black text-sm mb-3 border-b-2 border-black pb-2">Response Time</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">LinkedIn</span>
                  <span className="font-black">&lt; 4h</span>
                </div>
                <div className="w-full h-2 bg-gray-200 border border-gray-300">
                  <div className="h-full bg-gray-800" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Email</span>
                  <span className="font-black">&lt; 24h</span>
                </div>
                <div className="w-full h-2 bg-gray-200 border border-gray-300">
                  <div className="h-full bg-gray-600" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">This form</span>
                  <span className="font-black">&lt; 48h</span>
                </div>
                <div className="w-full h-2 bg-gray-200 border border-gray-300">
                  <div className="h-full bg-gray-400" style={{ width: '55%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div id="terminal-hint" className="border-2 border-black bg-gray-900 p-4">
            <div className="mono text-xs text-gray-400 mb-2">
              <span style={{ color: '#7aa2f7' }}>bagus@hyprland ~ $</span>
            </div>
            <div className="mono text-xs text-gray-300 leading-relaxed">
              Or just open the Kitty terminal below and type <span style={{ color: '#9ece6a' }}>'sudo hire'</span> — it's faster 😄
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
