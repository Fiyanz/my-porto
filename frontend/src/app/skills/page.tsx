export default function Skills() {
  return (
    <>
      <div className="flex items-end justify-between mb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Skills & Stack</h1>
          <p className="text-sm text-gray-500 mt-1">Tools, languages, and frameworks I use daily or have shipped with.</p>
        </div>
        <div className="flex gap-3">
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">28+</div>
            <div className="text-xs text-gray-500">Technologies</div>
          </div>
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">5</div>
            <div className="text-xs text-gray-500">Domains</div>
          </div>
          <div className="border-2 border-black bg-white px-4 py-2 text-center">
            <div className="text-xl font-black">3+</div>
            <div className="text-xs text-gray-500">Yrs Coding</div>
          </div>
        </div>
      </div>

      {/* TOP ROW: Proficiency Radar + Top Languages */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div id="proficiency-card" className="col-span-2 border-2 border-black bg-white p-5">
          <h3 className="font-black text-sm mb-4 flex items-center gap-2">
            <i className="fa-solid fa-chart-bar text-gray-500"></i> Domain Proficiency
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-brain text-sm text-gray-600"></i>
                  <span className="text-sm font-bold">Machine Learning / AI</span>
                </div>
                <span className="text-xs font-black mono">82%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 border border-gray-300">
                <div className="h-full bg-gray-800 transition-all duration-500" style={{ width: '82%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-server text-sm text-gray-600"></i>
                  <span className="text-sm font-bold">Backend / API</span>
                </div>
                <span className="text-xs font-black mono">88%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 border border-gray-300">
                <div className="h-full bg-gray-800 transition-all duration-500" style={{ width: '88%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-microchip text-sm text-gray-600"></i>
                  <span className="text-sm font-bold">IoT / Embedded</span>
                </div>
                <span className="text-xs font-black mono">70%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 border border-gray-300">
                <div className="h-full bg-gray-800 transition-all duration-500" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-mobile-screen text-sm text-gray-600"></i>
                  <span className="text-sm font-bold">Mobile (Flutter)</span>
                </div>
                <span className="text-xs font-black mono">65%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 border border-gray-300">
                <div className="h-full bg-gray-800 transition-all duration-500" style={{ width: '65%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-cube text-sm text-gray-600"></i>
                  <span className="text-sm font-bold">Web3 / Smart Contracts</span>
                </div>
                <span className="text-xs font-black mono">58%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 border border-gray-300">
                <div className="h-full bg-gray-800 transition-all duration-500" style={{ width: '58%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div id="learning-card" className="border-2 border-black bg-white p-4 flex flex-col gap-3">
          <h3 className="font-black text-sm flex items-center gap-2">
            <i className="fa-solid fa-bolt text-gray-500"></i> Currently Learning
          </h3>
          <div className="flex flex-col gap-2">
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-xs font-black mb-0.5">Rust</div>
              <div className="text-xs text-gray-500">Systems + WASM targets</div>
              <div className="w-full h-1.5 bg-gray-200 mt-2"><div className="h-full bg-gray-600" style={{ width: '30%' }}></div></div>
            </div>
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-xs font-black mb-0.5">Kubernetes</div>
              <div className="text-xs text-gray-500">Orchestrating ML pipelines</div>
              <div className="w-full h-1.5 bg-gray-200 mt-2"><div className="h-full bg-gray-600" style={{ width: '45%' }}></div></div>
            </div>
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-xs font-black mb-0.5">LangChain</div>
              <div className="text-xs text-gray-500">RAG + agent pipelines</div>
              <div className="w-full h-1.5 bg-gray-200 mt-2"><div className="h-full bg-gray-600" style={{ width: '55%' }}></div></div>
            </div>
            <div className="border-2 border-black p-3 bg-gray-50">
              <div className="text-xs font-black mb-0.5">eBPF</div>
              <div className="text-xs text-gray-500">Linux observability</div>
              <div className="w-full h-1.5 bg-gray-200 mt-2"><div className="h-full bg-gray-600" style={{ width: '20%' }}></div></div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-black mb-3">Technology Stack</h2>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div id="lang-card" className="border-2 border-black bg-white p-4">
          <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
            <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center">
              <i className="fa-solid fa-terminal text-sm"></i>
            </div>
            <span className="font-black text-sm">Languages</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="border-2 border-black px-2 py-1 text-xs font-black mono bg-gray-900 text-white">Python</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">TypeScript</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Go</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Dart</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Solidity</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">C / C++</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">MicroPython</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Bash</span>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">Most used:</span>
            <span className="text-xs font-black mono">Python · Go</span>
          </div>
        </div>

        <div id="ml-card" className="border-2 border-black bg-white p-4">
          <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
            <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center">
              <i className="fa-solid fa-brain text-sm"></i>
            </div>
            <span className="font-black text-sm">ML / Data</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="border-2 border-black px-2 py-1 text-xs font-black mono bg-gray-900 text-white">TensorFlow</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">PyTorch</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Scikit-learn</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">MLflow</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Pandas</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">NumPy</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">OpenCV</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Streamlit</span>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">Most used:</span>
            <span className="text-xs font-black mono">TensorFlow · sklearn</span>
          </div>
        </div>

        <div id="be-card" className="border-2 border-black bg-white p-4">
          <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
            <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center">
              <i className="fa-solid fa-server text-sm"></i>
            </div>
            <span className="font-black text-sm">Backend / Infra</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="border-2 border-black px-2 py-1 text-xs font-black mono bg-gray-900 text-white">FastAPI</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">PostgreSQL</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Redis</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Docker</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Nginx</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">SQLAlchemy</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">RabbitMQ</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Celery</span>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">Most used:</span>
            <span className="text-xs font-black mono">FastAPI · Docker</span>
          </div>
        </div>

        <div id="iot-card" className="border-2 border-black bg-white p-4">
          <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
            <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center">
              <i className="fa-solid fa-microchip text-sm"></i>
            </div>
            <span className="font-black text-sm">IoT / Embedded</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="border-2 border-black px-2 py-1 text-xs font-black mono bg-gray-900 text-white">ESP32-C3</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">MQTT</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">I2C / SPI</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">FreeRTOS</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Arduino</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Raspberry Pi</span>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">Most used:</span>
            <span className="text-xs font-black mono">ESP32 · MQTT</span>
          </div>
        </div>

        <div id="mob-card" className="border-2 border-black bg-white p-4">
          <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
            <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center">
              <i className="fa-solid fa-mobile-screen text-sm"></i>
            </div>
            <span className="font-black text-sm">Mobile / Web3</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="border-2 border-black px-2 py-1 text-xs font-black mono bg-gray-900 text-white">Flutter</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Riverpod</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Solidity</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Hardhat</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">ethers.js</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">IPFS</span>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">Most used:</span>
            <span className="text-xs font-black mono">Flutter · Hardhat</span>
          </div>
        </div>

        <div id="tools-card" className="border-2 border-black bg-white p-4">
          <div className="flex items-center gap-2 mb-3 border-b-2 border-black pb-2">
            <div className="w-8 h-8 bg-gray-200 border-2 border-black flex items-center justify-center">
              <i className="fa-solid fa-screwdriver-wrench text-sm"></i>
            </div>
            <span className="font-black text-sm">Tooling / OS</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="border-2 border-black px-2 py-1 text-xs font-black mono bg-gray-900 text-white">Arch Linux</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Hyprland</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Kitty</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Neovim</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Git</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">GitHub Actions</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Postman</span>
            <span className="border-2 border-black px-2 py-1 text-xs font-bold mono bg-gray-100">Locust</span>
          </div>
          <div className="mt-3 border-t border-gray-200 pt-2 flex items-center gap-2">
            <span className="text-xs text-gray-400">Daily driver:</span>
            <span className="text-xs font-black mono">Arch + Hyprland</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-black mb-3">Certifications & Bootcamps</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="border-2 border-black bg-white p-4 flex items-start gap-3">
          <div className="w-9 h-9 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
            <i className="fa-solid fa-certificate text-sm"></i>
          </div>
          <div>
            <div className="font-black text-sm">AI/ML Bootcamp</div>
            <div className="text-xs text-gray-500 mt-0.5">Agrikultur domain · TensorFlow · Scikit-learn</div>
            <div className="text-xs font-mono text-gray-400 mt-1.5 border border-gray-200 px-2 py-0.5 inline-block">2024</div>
          </div>
        </div>
        <div className="border-2 border-black bg-white p-4 flex items-start gap-3">
          <div className="w-9 h-9 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
            <i className="fa-solid fa-certificate text-sm"></i>
          </div>
          <div>
            <div className="font-black text-sm">Backend Engineering</div>
            <div className="text-xs text-gray-500 mt-0.5">FastAPI · PostgreSQL · System Design</div>
            <div className="text-xs font-mono text-gray-400 mt-1.5 border border-gray-200 px-2 py-0.5 inline-block">2023</div>
          </div>
        </div>
        <div className="border-2 border-black bg-white p-4 flex items-start gap-3">
          <div className="w-9 h-9 bg-gray-200 border-2 border-black flex items-center justify-center shrink-0">
            <i className="fa-solid fa-graduation-cap text-sm"></i>
          </div>
          <div>
            <div className="font-black text-sm">Computer Science — S1</div>
            <div className="text-xs text-gray-500 mt-0.5">6th Semester · Active Student</div>
            <div className="text-xs font-mono text-gray-400 mt-1.5 border border-gray-200 px-2 py-0.5 inline-block">2022 – now</div>
          </div>
        </div>
      </div>
    </>
  );
}
