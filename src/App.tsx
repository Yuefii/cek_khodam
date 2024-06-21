import { useState, useRef } from "react";
import { request } from "./utils"

function App() {
  const [data, setData] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const contentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (contentRef.current) {
      setLoading(true);
      try {
        const ai = await request(contentRef.current.value);
        setData(ai);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData('Terjadi kesalahan saat memeriksa khodam.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl my-20 mx-auto items-center min-h-screen">
      <form className="flex flex-col gap-4">
        <h1 className='text-2xl text-stone-800 font-bold'>CEK KHODAM ONLINE</h1>
        <input
          ref={contentRef}
          id="content"
          className="p-2 border border-stone-800 rounded"
          type="text"
          placeholder="Masukan Nama Kamu"
        />
        <button type="button" onClick={handleSubmit} className="p-2 bg-stone-800 rounded text-white">
          {loading ? 'Memeriksa...' : 'Cek Sekarang'}
        </button>
      </form>
      <div className="pt-5 text-lg text-slate-800">
        {loading ? <div className="loading-spinner" /> : data}
      </div>
    </div>
  );
}

export default App;
