import React, { useState, useEffect } from 'react';
import { GraduationCap, Database, Plus, Medal, CheckCircle2, XCircle, Clock, Gauge } from 'lucide-react';

const API_BASE = "https://localhost:7094/api";

const DucTraining = () => {
  const [courses, setCourses] = useState([]);
  
  // State Form Thêm Khóa
  const [newCourse, setNewCourse] = useState({ name: "", price: 0, durationHours: 0, requiredKm: 0 });
  
  // State Form Chấm Điểm
  const [scoreForm, setScoreForm] = useState({ studentId: "", score: "" });
  const [resultMsg, setResultMsg] = useState(null);

  // 1. Lấy dữ liệu Khóa học từ C#
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE}/Course`);
      if(res.ok) setCourses(await res.json());
    } catch (err) { console.log("Đợi kết nối Backend C#..."); }
  };

  useEffect(() => { fetchCourses(); }, []);

  // 2. Xử lý Thêm Khóa Học
  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.name) return alert("Nhập tên khóa học!");
    try {
      const res = await fetch(`${API_BASE}/Course/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse)
      });
      const data = await res.json();
      alert(data.message);
      setNewCourse({ name: "", price: 0, durationHours: 0, requiredKm: 0 });
      fetchCourses(); // Cập nhật lại danh sách bên dưới
    } catch { alert("Lỗi kết nối Backend C#"); }
  };

  // 3. Xử lý Chấm Điểm (Gửi lên C# tính toán)
  const handleSubmitScore = async (e) => {
    e.preventDefault();
    if (!scoreForm.studentId || !scoreForm.score) return alert("Nhập đủ ID học viên và Điểm!");
    try {
      const res = await fetch(`${API_BASE}/Result/submit-score`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: parseInt(scoreForm.studentId), score: parseInt(scoreForm.score) })
      });
      const data = await res.json();
      setResultMsg(data); // Hiện kết quả Đỗ/Trượt
      setScoreForm({ studentId: "", score: "" });
    } catch { alert("Lỗi kết nối Backend C#"); }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans text-slate-800 p-8 bg-slate-50 min-h-screen">
      
      {/* HEADER CỦA ĐỨC */}
      <header className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Đào Tạo & Kết Quả</h2>
        <p className="text-slate-500 font-medium mt-1">Quản lý khóa học lái xe và xét duyệt kết quả thi thực hành.</p>
      </header>

      <div className="bg-purple-50 text-purple-700 p-4 rounded-2xl font-bold flex items-center gap-3">
        <GraduationCap /> Khu vực Quản lý Đào Tạo (Đức)
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* === KHU VỰC 1: FORM THÊM KHÓA HỌC === */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-700">
            <Database size={20}/> Khởi Tạo Khóa Học Mới
          </h3>
          <form onSubmit={handleAddCourse} className="space-y-4">
            <input type="text" value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})} placeholder="Tên khóa (VD: Đào tạo B2 Cấp tốc)" className="w-full bg-slate-50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-bold" />
            
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400">GIÁ TIỀN (VNĐ)</label>
                <input type="number" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: parseInt(e.target.value)})} className="w-full bg-slate-50 p-3 rounded-xl outline-none font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400">GIỜ HỌC</label>
                <input type="number" value={newCourse.durationHours} onChange={e => setNewCourse({...newCourse, durationHours: parseInt(e.target.value)})} className="w-full bg-slate-50 p-3 rounded-xl outline-none font-bold" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400">KM YÊU CẦU</label>
                <input type="number" value={newCourse.requiredKm} onChange={e => setNewCourse({...newCourse, requiredKm: parseInt(e.target.value)})} className="w-full bg-slate-50 p-3 rounded-xl outline-none font-bold" />
              </div>
            </div>
            
            <button type="submit" className="w-full bg-purple-600 text-white p-4 rounded-xl font-bold hover:bg-purple-700 transition">
              <Plus size={18} className="inline mr-2"/> LƯU KHÓA HỌC
            </button>
          </form>
        </div>

        {/* === KHU VỰC 2: FORM CHẤM ĐIỂM (LOGIC) === */}
        <div className="bg-slate-900 p-6 rounded-3xl shadow-lg shadow-slate-900/20 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Medal size={200} />
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-2 flex items-center gap-2 text-yellow-400">
              <Medal size={24}/> Hội Đồng Xét Duyệt
            </h3>
            <p className="text-sm text-slate-400 mb-6 w-3/4">
              Nhập điểm thi thực hành. Hệ thống tự động xét: Điểm <span className="text-green-400 font-bold">&ge; 80</span> là ĐỖ, <span className="text-red-400 font-bold">&lt; 80</span> là TRƯỢT.
            </p>
          </div>
          
          <div className="relative z-10">
            <form onSubmit={handleSubmitScore} className="flex gap-3 mb-4">
              <input type="number" value={scoreForm.studentId} onChange={e => setScoreForm({...scoreForm, studentId: e.target.value})} placeholder="ID Học viên..." className="w-32 bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 font-bold" />
              <input type="number" value={scoreForm.score} onChange={e => setScoreForm({...scoreForm, score: e.target.value})} placeholder="Điểm (0-100)..." className="w-32 bg-slate-800 p-4 rounded-xl outline-none focus:ring-2 focus:ring-yellow-500 font-bold" />
              <button type="submit" className="flex-1 bg-yellow-500 text-slate-900 font-black p-4 rounded-xl hover:bg-yellow-400 transition shadow-lg shadow-yellow-500/20">
                XÉT DUYỆT
              </button>
            </form>

            {/* BẢNG KẾT QUẢ HIỂN THỊ */}
            {resultMsg && (
              <div className={`p-4 rounded-xl border animate-in zoom-in-95 duration-300 ${resultMsg.status === 'Passed' ? 'bg-green-500/20 border-green-500/50 text-green-100' : 'bg-red-500/20 border-red-500/50 text-red-100'}`}>
                <div className="flex items-center gap-3 mb-1">
                  {resultMsg.status === 'Passed' ? <CheckCircle2 className="text-green-400" size={24}/> : <XCircle className="text-red-400" size={24}/>}
                  <span className="font-black text-xl">
                    {resultMsg.status === 'Passed' ? 'ĐẠT (PASSED)' : 'TRƯỢT (FAILED)'} - {resultMsg.score} Điểm
                  </span>
                </div>
                <p className="text-sm opacity-90 pl-9 font-medium">{resultMsg.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* === KHU VỰC 3: DANH SÁCH KHÓA HỌC === */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
          <GraduationCap className="text-purple-600"/> Danh Mục Khóa Học
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.length > 0 ? courses.map(c => (
            <div key={c.id} className="bg-slate-50 p-6 rounded-2xl hover:bg-purple-50 transition border border-transparent hover:border-purple-100 group">
              <h4 className="text-xl font-black text-slate-800 mb-2 truncate group-hover:text-purple-700 transition-colors">{c.name}</h4>
              <div className="flex items-center gap-2 text-purple-600 font-black text-xl mb-4">
                {(c.price || 0).toLocaleString()} VNĐ
              </div>
              <div className="flex gap-4 text-[11px] font-black text-slate-400 uppercase">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg shadow-sm"><Clock size={14} className="text-blue-500"/> {c.durationHours} Giờ</span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg shadow-sm"><Gauge size={14} className="text-orange-500"/> {c.requiredKm} Km</span>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
              <p className="text-slate-400 font-medium">Chưa có dữ liệu khóa học từ Backend. Khởi tạo ngay bên trên!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DucTraining;