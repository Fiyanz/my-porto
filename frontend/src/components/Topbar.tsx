export default function Topbar() {
  return (
    <header id="topbar" className="flex items-center justify-end mb-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border-2 border-black rounded-lg px-3 py-1.5 bg-white w-56">
          <i className="fa-solid fa-magnifying-glass text-gray-400 text-xs"></i>
          <input type="text" placeholder="Search projects, skills…" className="text-xs text-gray-700 outline-none w-full" />
        </div>
        <button className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center bg-white hover:bg-gray-50" title="Dark Mode">
          <i className="fa-solid fa-moon text-xs"></i>
        </button>
        <button className="w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center bg-white hover:bg-gray-50" title="Notifications">
          <i className="fa-solid fa-bell text-xs"></i>
        </button>
      </div>
    </header>
  );
}
