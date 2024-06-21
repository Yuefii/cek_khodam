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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <div className="max-w-xl my-20 mx-5 md:mx-auto items-center min-h-screen">
      <form className="flex flex-col gap-4" onSubmit={handleSubmitForm}>
        <h1 className='text-2xl text-stone-800 font-bold'>CEK KHODAM ONLINE</h1>
        <input
          ref={contentRef}
          onKeyPress={handleKeyPress}
          id="content"
          className="p-2 border border-stone-800 rounded"
          type="text"
          placeholder="Masukan Nama Kamu"
        />
        <button type="submit" className="p-2 bg-stone-800 rounded text-white">
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
