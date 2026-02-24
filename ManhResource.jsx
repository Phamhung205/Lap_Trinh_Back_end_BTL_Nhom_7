import React, { useState } from 'react';
import { Car, Save, Settings, Wrench } from 'lucide-react';

const API_BASE = "https://localhost:7094/api/Vehicle";

const ManhResource = () => {
  const [form, setForm] = useState({ plate: "", type: "B2" });
  const [testId, setTestId] = useState("");

  const handleAddCar = async (e) => {
    e.preventDefault();
    if (!form.plate) return alert("Nhập biển số!");

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licensePlate: form.plate, type: form.type })
      });
      const data = await res.json();
      alert(data.message);
      setForm({ ...form, plate: "" });
    } catch { alert("Lỗi Backend C#"); }
  };

  const handleTestOdo = async () => {
    if (!testId) return alert("Nhập ID xe");
    try {
      const res = await fetch(`${API_BASE}/${testId}/update-odo`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(2000) // Test cộng 2000km/lần
      });
      const data = await res.json();
      alert(res.ok ? data.message : "ID sai");
    } catch { alert("Lỗi Backend C#"); }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* KHU VỰC 1: THÊM XE */}
      <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-slate-800">
          <Car className="text-blue-600"/> Thêm Xe Mới
        </h3>
        <form onSubmit={handleAddCar} className="space-y-4">
          <input 
            type="text" 
            value={form.plate} 
            onChange={e => setForm({...form, plate: e.target.value})} 
            placeholder="Biển số (VD: 29A-123.45)" 
            className="w-full bg-slate-50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold" 
          />
          <select 
            value={form.type} 
            onChange={e => setForm({...form, type: e.target.value})} 
            className="w-full bg-slate-50 p-4 rounded-xl outline-none font-bold"
          >
            <option value="B1">Hạng B1 (Tự động)</option>
            <option value="B2">Hạng B2 (Số sàn)</option>
            <option value="C">Hạng C (Tải)</option>
          </select>
          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold flex justify-center gap-2 hover:bg-blue-700">
            <Save size={20}/> THÊM VÀO CSDL
          </button>
        </form>
      </div>

      {/* KHU VỰC 2: TEST BẢO TRÌ */}
      <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-sm">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Wrench className="text-orange-400"/> Test ODO & Bảo Trì
        </h3>
        <p className="text-sm text-slate-400 mb-6">Nhập ID xe để cộng 2000km. Vượt 5000km xe sẽ chuyển trạng thái Maintenance.</p>
        <div className="flex gap-4">
          <input 
            type="number" 
            value={testId} 
            onChange={e => setTestId(e.target.value)} 
            placeholder="ID Xe..." 
            className="w-24 bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 text-center font-bold" 
          />
          <button onClick={handleTestOdo} type="button" className="flex-1 bg-orange-500 text-white p-4 rounded-xl font-bold hover:bg-orange-600">
            CHẠY +2000 KM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManhResource;