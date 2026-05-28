import React, { useState, useEffect } from 'react';
import { 
  PieChart, CalendarCheck, ShieldHalf, GraduationCap, 
  Map, LineChart, Settings, Car, 
  BadgeDollarSign, Clock, UserCheck, Flag, MapPin, Navigation, TrafficCone, ParkingSquare, 
  ArrowRightLeft, TrainTrack, GaugeCircle, CheckSquare,
  ArrowUpRight, Users, CheckCircle2, AlertCircle, FileText,
  Bell, RefreshCw, Wallet, Receipt, TrendingUp, BarChart3, ChevronRight, BookOpen,
  Lock, Mail, ArrowRight, LogOut
} from 'lucide-react';

// 👉 QUAN TRỌNG: Kiểm tra lại cổng này có đúng với cổng Swagger C# của ông không nhé!
const API_BASE = import.meta.env.VITE_API_URL;

// =========================================================================
// COMPONENT: MÀN HÌNH LOGIN 
// =========================================================================
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // BƯỚC 1: Xử lý chuỗi nhập vào (Cắt dấu cách thừa và tự in hoa username)
    const cleanUsername = username.trim().toUpperCase();
    const cleanPassword = password.trim();

    // KIỂM TRA TÀI KHOẢN ƯU TIÊN (HARDCODE)
    if (cleanUsername === 'ADMINHUNG' && cleanPassword === 'Phamhung880') {
      onLogin('ADMINHUNG');
      setIsLoading(false);
      return; // Dừng luôn, không gọi xuống C# nữa
    }

    // BƯỚC 2: Code Login thật (Gọi API C# cho các tài khoản khác)
    try {
      const response = await fetch(`${API_BASE}/Auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Chú ý: Gửi tên và pass chưa bị thay đổi hoa/thường xuống C#
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });
      
      if (response.ok) {
        onLogin(username.trim());
      } else {
        setError('Tài khoản hoặc mật khẩu không có trong CSDL!');
      }
    } catch (err) {
      console.warn("Lỗi kết nối Backend.");
      setError('Lỗi kết nối Server. Vui lòng bật Backend C#!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Trang trí */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-2xl shadow-blue-900/10 p-10 relative z-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-600/30 mb-6 transform -rotate-3">
            <Car size={36} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">PHMCAR <span className="text-blue-600">DNU</span></h1>
          <p className="text-sm font-medium text-slate-500 mt-2">Hệ thống Quản lý Đào tạo Lái xe</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3 text-red-600 text-sm font-bold animate-in slide-in-from-top-2">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tên đăng nhập</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <UserCheck size={18} />
              </div>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 transition-all"
                placeholder="........"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mật khẩu</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 transition-all"
                placeholder="........"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm font-bold pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              Ghi nhớ
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Quên mật khẩu?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <RefreshCw className="animate-spin" size={24} /> : 'ĐĂNG NHẬP'} <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};


// =========================================================================
// COMPONENT: SIDEBAR
// =========================================================================
const Sidebar = ({ activeTab, setActiveTab, onLogout, currentUser }) => {
  const NavItem = ({ id, icon: Icon, label, badge }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-4 px-5 py-3 rounded-2xl transition-all ${
          isActive 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/50 transform scale-[1.02]' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }`}
      >
        <Icon size={20} className={isActive ? 'text-blue-100' : ''} />
        <span className="text-sm font-semibold">{label}</span>
        {badge && (
          <span className="ml-auto bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-20 relative overflow-hidden flex-shrink-0">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/20 to-transparent pointer-events-none"></div>
      
      <div className="p-8 relative z-10 border-b border-slate-800/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
            <Car className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">PHMCAR<span className="text-blue-400"> DNU</span></h1>
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Trung Tâm Đào Tạo</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 relative z-10 overflow-y-auto">
        <p className="px-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-2">Tổng quan</p>
        <NavItem id="dashboard" icon={PieChart} label="Bảng Điều Khiển" />

        <p className="px-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-6">Nghiệp vụ Đào tạo</p>
        <NavItem id="booking" icon={CalendarCheck} label="Quản Lý Lịch Tập" />
        <NavItem id="training" icon={GraduationCap} label="Khóa Học & Xét Duyệt" />
        <NavItem id="finance" icon={BadgeDollarSign} label="Học Phí & Công Nợ" badge="Live" />

        <p className="px-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-6">Tài nguyên & Thiết bị</p>
        <NavItem id="resources" icon={ShieldHalf} label="Đội Xe & Giảng Viên" />
        <NavItem id="facilities" icon={Map} label="Sân Tập & Sa Hình" />

        <p className="px-5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-6">Hệ thống</p>
        <NavItem id="reports" icon={BarChart3} label="Báo Cáo Thống Kê" />
        <NavItem id="settings" icon={Settings} label="Cài Đặt Hệ Thống" />
      </nav>

      <div className="p-6 border-t border-slate-800 relative z-10">
        <div className="bg-slate-800/50 p-4 rounded-2xl flex items-center justify-between border border-slate-700/50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20 shrink-0 uppercase">
              {currentUser.substring(0, 2)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate capitalize">{currentUser}</p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Trực tuyến</p>
            </div>
          </div>
          {/* Nút Đăng Xuất */}
          <button onClick={onLogout} className="text-slate-500 hover:text-red-400 transition-colors p-2" title="Đăng xuất">
             <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

// =========================================================================
// 2. DASHBOARD (ĐÃ ĐƯỢC LÀM CHO ĐẦY ĐẶN & ĐẸP MẮT HƠN)
// =========================================================================
const Dashboard = ({ data }) => {
  const realRevenue = data.tuitions?.reduce((sum, item) => sum + item.paidAmount, 0) || 0;

  // Mock dữ liệu hoạt động gần đây để demo
  const activities = [
    { id: 1, icon: BadgeDollarSign, color: 'text-emerald-500', bg: 'bg-emerald-100', text: 'Học viên Nguyễn Trường Anh vừa đóng học phí', time: '10 phút trước' },
    { id: 2, icon: CalendarCheck, color: 'text-blue-500', bg: 'bg-blue-100', text: 'Lịch tập mới được xếp cho xe 30A-999.99', time: '1 giờ trước' },
    { id: 3, icon: ShieldHalf, color: 'text-orange-500', bg: 'bg-orange-100', text: 'Hệ thống cảnh báo: Xe 29A-666.66 cần bảo dưỡng', time: '3 giờ trước' },
    { id: 4, icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-100', text: 'Đức đã cập nhật kết quả thi sát hạch B2', time: 'Hôm qua' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* HÀNG 1: 3 THẺ THỐNG KÊ (Giữ nguyên từ trước) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="bg-emerald-100 text-emerald-600 p-4 rounded-2xl"><BadgeDollarSign size={24} /></div>
            <span className="bg-emerald-50 text-emerald-600 text-xs font-black px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1"><ArrowUpRight size={12}/> Thực thu</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 relative z-10">Tổng Doanh Thu CSDL</p>
          <p className="text-4xl font-black text-slate-800 tracking-tighter relative z-10">{(realRevenue / 1000000).toFixed(1)}<span className="text-xl text-slate-400 font-bold ml-1">Tr</span></p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl"><CalendarCheck size={24} /></div>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 relative z-10">Tổng Số Lịch Tập</p>
          <p className="text-4xl font-black text-slate-800 tracking-tighter relative z-10">{data.bookings?.length || 0}</p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl"><Car size={24} /></div>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 relative z-10">Tổng Số Xe Đang Có</p>
          <p className="text-4xl font-black text-slate-800 tracking-tighter relative z-10">{data.vehicles?.length || 0}</p>
        </div>
      </div>

      {/* HÀNG 2: THÊM CÁC WIDGET CHO ĐỠ TRỐNG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget: Tiến độ các khóa học (Cột lớn) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2"><TrendingUp className="text-blue-600" size={24}/> Tình Trạng Khóa Học</h3>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition">Xem tất cả</button>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                <span>Hạng B2 - Số sàn (Khóa K50)</span>
                <span className="text-blue-600">85% Kín chỗ</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                <span>Hạng B1 - Số tự động (Khóa K51)</span>
                <span className="text-emerald-600">45% Kín chỗ</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-emerald-500 h-3 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
                <span>Hạng C - Tải nặng (Khóa C12)</span>
                <span className="text-orange-500">92% Sắp khai giảng</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-orange-500 h-3 rounded-full transition-all duration-1000" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget: Hoạt động gần đây (Cột nhỏ) */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-xl text-slate-800 mb-8 flex items-center gap-2"><Bell className="text-amber-500" size={24}/> Hoạt Động Gần Đây</h3>
          <div className="space-y-6">
            {activities.map(act => (
              <div key={act.id} className="flex gap-4 items-start group">
                <div className={`p-2.5 rounded-xl ${act.bg} ${act.color} shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                  <act.icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 leading-tight group-hover:text-blue-600 transition-colors">{act.text}</p>
                  <p className="text-xs font-medium text-slate-400 mt-1.5 flex items-center gap-1"><Clock size={10}/> {act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-slate-50 text-slate-500 font-bold text-sm py-3 rounded-xl hover:bg-slate-100 transition">Xem thêm log</button>
        </div>

      </div>
    </div>
  );
};

// =========================================================================
// 3. BOOKING (LỊCH TẬP)
// =========================================================================
const BookingTab = ({ data, refreshMain }) => {
  const [newBooking, setNewBooking] = useState({
    studentName: "", // Cập nhật sang dùng Tên thay vì ID cứng
    vehicleId: "",
    instructorId: "",
    startTime: "",
    endTime: ""
  });

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!newBooking.studentName || !newBooking.vehicleId || !newBooking.instructorId || !newBooking.startTime || !newBooking.endTime) {
      return alert("Vui lòng điền tên học viên và chọn đầy đủ thông tin Xe, Thầy!");
    }

    try {
      const response = await fetch(`${API_BASE}/Booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: newBooking.studentName, // Đã khớp với BookingRequest ở C#
          vehicleId: parseInt(newBooking.vehicleId),
          instructorId: parseInt(newBooking.instructorId),
          startTime: newBooking.startTime,
          endTime: newBooking.endTime
        })
      });

      if (response.ok) {
        alert("Đặt lịch thành công!");
        setNewBooking({ ...newBooking, studentName: "", vehicleId: "", instructorId: "", startTime: "", endTime: "" });
        refreshMain(); // Cập nhật lại danh sách ngay lập tức
      } else {
        const errText = await response.text();
        alert("Lỗi: " + errText); // Hiện lỗi check trùng từ C#
      }
    } catch (err) {
      alert("Lỗi kết nối Backend C#");
    }
  };

  // Hàm helper để lấy tên thật của Xe và Thầy thay vì ID
  const getVehicleName = (id) => { const v = data.vehicles?.find(v => v.id === id); return v ? `${v.licensePlate} (${v.type})` : `Xe #${id}`; };
  const getInstructorName = (id) => { const i = data.instructors?.find(inst => inst.id === id); return i ? i.name : `Thầy #${id}`; };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-1 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm h-fit">
        <h3 className="font-bold text-xl mb-6 text-blue-600 flex items-center gap-2"><CalendarCheck size={24} /> Tạo Lịch Mới</h3>
        
        <form onSubmit={handleCreateBooking} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tên Học Viên</label>
            <input 
              type="text" 
              value={newBooking.studentName} 
              onChange={e => setNewBooking({...newBooking, studentName: e.target.value})} 
              className="w-full bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm"
              placeholder="Nhập tên (VD: Phạm Hùng)" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Chọn Xe</label>
            <select value={newBooking.vehicleId} onChange={e => setNewBooking({...newBooking, vehicleId: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm">
              <option value="">-- Chọn Xe --</option>
              {data.vehicles?.map(v => <option key={v.id} value={v.id}>{v.licensePlate} ({v.type})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Chọn Giáo Viên</label>
            <select value={newBooking.instructorId} onChange={e => setNewBooking({...newBooking, instructorId: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm">
              <option value="">-- Chọn Thầy --</option>
              {data.instructors?.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Giờ Bắt Đầu</label>
            <input type="datetime-local" value={newBooking.startTime} onChange={e => setNewBooking({...newBooking, startTime: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Giờ Kết Thúc</label>
            <input type="datetime-local" value={newBooking.endTime} onChange={e => setNewBooking({...newBooking, endTime: e.target.value})} className="w-full bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 mt-2">
            XÁC NHẬN ĐẶT LỊCH
          </button>
        </form>

      </div>
      <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">Danh sách Lịch tập (Từ SQL Server)</h3>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Học Viên / Mã</th>
              <th className="px-6 py-4">Thời Gian</th>
              <th className="px-6 py-4">Xe & Thầy</th>
              <th className="px-6 py-4">Trạng Thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {data.bookings?.map(b => (
              <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-5 font-bold text-slate-700">
                  <span className="text-xs text-slate-400">#{b.id}</span>
                  <div className="text-blue-600 font-black mt-1">{b.studentName || "Đang cập nhật..."}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-600"><CalendarCheck size={14} className="text-blue-500"/> {new Date(b.startTime).toLocaleDateString('vi-VN')}</div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs"><Clock size={14}/> {new Date(b.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(b.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold flex items-center gap-2 text-slate-700"><Car size={14} className="text-slate-400"/> {getVehicleName(b.vehicleId)}</span>
                    <span className="font-medium flex items-center gap-2 text-slate-500 text-xs"><UserCheck size={14} className="text-slate-400"/> {getInstructorName(b.instructorId)}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide flex w-max items-center gap-1.5 shadow-sm ${b.status === 'Graded' ? 'bg-purple-100 text-purple-700 border-purple-200 border' : 'bg-amber-100 text-amber-700 border-amber-200 border'}`}>
                    {b.status === 'Graded' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                    {b.status === 'Graded' ? 'Đã Chấm Điểm' : b.status}
                  </span>
                </td>
              </tr>
            ))}
            {(!data.bookings || data.bookings.length === 0) && <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400 font-medium">Chưa có dữ liệu từ Database. Hãy điền form bên trái để đặt lịch!</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// =========================================================================
// 4. TÀI NGUYÊN (MẠNH)
// =========================================================================
const ResourceTab = ({ data, refreshMain }) => {
  const [formCar, setFormCar] = useState({ plate: "", type: "B2" });
  const [newInstructorName, setNewInstructorName] = useState("");

  const handleAddCar = async (e) => {
    e.preventDefault();
    if (!formCar.plate) return alert("Nhập biển số!");
    try {
      const response = await fetch(`${API_BASE}/Vehicle/add`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ licensePlate: formCar.plate, type: formCar.type }) });
      if (response.ok) {
        setFormCar({ ...formCar, plate: "" }); 
        refreshMain(); 
      } else {
        alert("Lỗi khi thêm xe");
      }
    } catch { alert("Lỗi kết nối Máy chủ"); }
  };

  const handleAddInstructor = async (e) => {
    e.preventDefault();
    if (!newInstructorName) return alert("Nhập tên giảng viên!");
    try {
      const response = await fetch(`${API_BASE}/Instructor/add`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newInstructorName }) });
      if (response.ok) {
        setNewInstructorName(""); 
        refreshMain();
      } else {
        alert("Lỗi khi thêm giáo viên");
      }
    } catch { alert("Lỗi kết nối Máy chủ"); }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-xl mb-6 text-emerald-600 flex items-center gap-2"><Car size={24}/> Khai Báo Xe Mới</h3>
          <form onSubmit={handleAddCar} className="flex flex-col sm:flex-row gap-3">
            <input type="text" value={formCar.plate} onChange={e => setFormCar({...formCar, plate: e.target.value})} placeholder="Biển số (VD: 30A-123.45)" className="flex-1 bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm" />
            <select value={formCar.type} onChange={e => setFormCar({...formCar, type: e.target.value})} className="bg-slate-50 p-4 rounded-2xl outline-none font-bold text-sm w-full sm:w-32">
              <option value="B1">Hạng B1</option><option value="B2">Hạng B2</option><option value="C">Hạng C</option>
            </select>
            <button type="submit" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition">LƯU</button>
          </form>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-xl mb-6 text-emerald-600 flex items-center gap-2"><UserCheck size={24}/> Khai Báo Giảng Viên</h3>
          <form onSubmit={handleAddInstructor} className="flex flex-col sm:flex-row gap-3">
            <input type="text" value={newInstructorName} onChange={e => setNewInstructorName(e.target.value)} placeholder="Tên giảng viên..." className="flex-1 bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm" />
            <button type="submit" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition">LƯU</button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 max-h-[400px] overflow-y-auto">
          <h3 className="font-bold text-lg mb-6 text-slate-800">Đội Xe Quản Lý ({data.vehicles.length})</h3>
          <div className="space-y-3">
            {data.vehicles.map(v => (
              <div key={v.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-emerald-50 transition">
                <div><p className="font-bold text-slate-800">{v.licensePlate}</p><span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold text-slate-600">Hạng {v.type}</span></div>
                <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-full ${v.status === 'Maintenance' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{v.status === 'Ready' ? 'Sẵn sàng' : 'Bảo trì'}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 max-h-[400px] overflow-y-auto">
          <h3 className="font-bold text-lg mb-6 text-slate-800">Danh Sách Giảng Viên ({data.instructors.length})</h3>
          <div className="space-y-3">
            {data.instructors.map(i => (
              <div key={i.id} className="flex items-center gap-4 p-4 border border-slate-50 rounded-2xl hover:bg-emerald-50 transition">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-black text-slate-600">{i.name ? i.name[0] : "?"}</div>
                <p className="font-bold text-slate-700">{i.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 5. ĐÀO TẠO & XÉT DUYỆT (ĐỨC)
// =========================================================================
const TrainingTab = ({ data, refreshMain }) => {
  const [scoreForm, setScoreForm] = useState({ bookingId: "", score: "" });
  const [newCourse, setNewCourse] = useState({ name: "", price: "", durationHours: "", requiredKm: "" });
  const [resultMsg, setResultMsg] = useState(null);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.price) return alert("Vui lòng nhập tên và giá khóa học!");
    try {
      const response = await fetch(`${API_BASE}/Course/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCourse.name,
          price: parseFloat(newCourse.price),
          durationHours: parseInt(newCourse.durationHours) || 0,
          requiredKm: parseFloat(newCourse.requiredKm) || 0
        })
      });
      if (response.ok) {
        alert("Tạo khóa học thành công!");
        setNewCourse({ name: "", price: "", durationHours: "", requiredKm: "" });
        refreshMain();
      } else {
        alert("Có lỗi khi tạo khóa học.");
      }
    } catch (err) {
      alert("Lỗi kết nối Máy chủ C#");
    }
  };

  const handleSubmitScore = async (e) => {
    e.preventDefault();
    if (!scoreForm.bookingId || !scoreForm.score) return alert("Vui lòng chọn lịch và nhập điểm!");
    try {
      const response = await fetch(`${API_BASE}/Result/submit-score`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ bookingId: parseInt(scoreForm.bookingId), score: parseInt(scoreForm.score) }) 
      });
      
      if (response.ok) {
        const resultData = await response.json();
        // Cập nhật trạng thái hiển thị kết quả Đạt/Trượt
        setResultMsg(resultData);
        setScoreForm({ bookingId: "", score: "" });
        refreshMain();
      } else {
        const errText = await response.text();
        alert("Lỗi: " + errText);
      }
    } catch { 
      alert("Lỗi kết nối Máy chủ"); 
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Form Thêm Khóa Học Mới */}
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-xl mb-6 text-purple-600 flex items-center gap-2"><BookOpen size={24} /> Khởi Tạo Khóa Học Mới</h3>
          <form onSubmit={handleAddCourse} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tên Khóa Học</label>
              <input type="text" value={newCourse.name} onChange={e => setNewCourse({...newCourse, name: e.target.value})} placeholder="VD: Hạng B2 Tiêu Chuẩn" className="w-full bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-bold text-sm" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Giá Tiền (VNĐ)</label>
                <input type="number" value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} placeholder="15000000" className="w-full bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-bold text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Giờ TH</label>
                <input type="number" value={newCourse.durationHours} onChange={e => setNewCourse({...newCourse, durationHours: e.target.value})} placeholder="20" className="w-full bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-bold text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">KM Yêu Cầu</label>
                <input type="number" value={newCourse.requiredKm} onChange={e => setNewCourse({...newCourse, requiredKm: e.target.value})} placeholder="800" className="w-full bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 font-bold text-sm" />
              </div>
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white p-4 rounded-xl font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-200 mt-2">
              LƯU KHÓA HỌC
            </button>
          </form>
        </div>

        {/* Form Hội Đồng Xét Duyệt & Kết quả */}
        <div className="bg-slate-900 p-8 rounded-[32px] shadow-sm text-white relative overflow-hidden flex flex-col">
          <div className="absolute -right-6 -bottom-6 opacity-10"><GraduationCap size={150} /></div>
          <h3 className="font-bold text-xl mb-3 text-yellow-400 flex items-center gap-2 relative z-10">Hội Đồng Xét Duyệt</h3>
          <p className="text-xs text-slate-400 mb-6 relative z-10">Chấm điểm bài thi thực hành. Điểm &ge; 80 là ĐỖ, &lt; 80 là TRƯỢT.</p>
          
          <form onSubmit={handleSubmitScore} className="flex flex-col gap-3 relative z-10 mb-6">
            <select value={scoreForm.bookingId} onChange={e => setScoreForm({...scoreForm, bookingId: e.target.value})} className="w-full bg-slate-800 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-500 font-bold text-sm text-slate-200">
              <option value="">-- Chọn mã lịch tập --</option>
              {data.bookings.filter(b => b.status !== 'Graded').map(b => (
                <option key={b.id} value={b.id}>Mã Đơn #{b.id} - {b.studentName || "Đang cập nhật"} - {new Date(b.startTime).toLocaleDateString()}</option>
              ))}
            </select>
            <div className="flex gap-3">
              <input type="number" value={scoreForm.score} onChange={e => setScoreForm({...scoreForm, score: e.target.value})} placeholder="Nhập Điểm (0-100)" className="flex-1 bg-slate-800 p-4 rounded-2xl outline-none text-center font-bold text-sm" />
              <button type="submit" className="bg-yellow-500 text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-yellow-400 transition">CHẤM ĐIỂM</button>
            </div>
          </form>

          {/* Kết quả chấm điểm ĐẠT/TRƯỢT */}
          {resultMsg && (
            <div className={`relative z-10 p-5 rounded-2xl border animate-in zoom-in-95 duration-300 ${resultMsg.status === 'Passed' ? 'bg-green-500/20 border-green-500/50 text-green-100' : 'bg-red-500/20 border-red-500/50 text-red-100'}`}>
              <div className="flex items-center gap-3 mb-2">
                {resultMsg.status === 'Passed' ? <CheckCircle2 className="text-green-400" size={28}/> : <AlertCircle className="text-red-400" size={28}/>}
                <span className="font-black text-2xl uppercase">{resultMsg.status === 'Passed' ? 'ĐẠT (PASSED)' : 'TRƯỢT (FAILED)'}</span>
              </div>
              <div className="pl-10">
                <p className="text-sm font-bold opacity-90">Điểm số: {resultMsg.score} / 100</p>
                <p className="text-sm opacity-80 mt-1">{resultMsg.note || resultMsg.message || "Hệ thống đã lưu kết quả."}</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Danh sách Khóa Học */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8">
        <h3 className="font-bold text-lg mb-6 text-slate-800 flex items-center gap-2"><BookOpen className="text-purple-600"/> Danh Mục Khóa Học Hiện Hành ({data.courses.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.courses.map(c => (
            <div key={c.id} className="p-6 border border-slate-100 rounded-[24px] bg-slate-50 hover:border-purple-200 hover:shadow-md transition-all group">
              <h4 className="font-bold text-slate-800 group-hover:text-purple-700 transition">{c.name}</h4>
              <p className="text-purple-600 font-black text-xl mt-2">{(c.price || 0).toLocaleString()} VNĐ</p>
              <p className="text-xs text-slate-500 mt-3 flex items-center gap-1"><Clock size={14}/> Yêu cầu: {c.durationHours} giờ thực hành | {c.requiredKm} km</p>
            </div>
          ))}
          {data.courses.length === 0 && (
             <div className="col-span-3 text-center py-8 text-slate-400 font-medium">Chưa có khóa học nào trong hệ thống. Hãy tạo khóa học ở bên trên!</div>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 6. SÂN TẬP (CỨNG)
// =========================================================================
const FacilitiesTab = () => {
  const [licenseType, setLicenseType] = useState('B2');
  const saHinhSteps = [
    { id: 1, name: "Xuất phát", icon: Flag, desc: "Bật xi nhan trái, nhả côn từ từ khởi hành." },
    { id: 2, name: "Dừng nhường đường", icon: MapPin, desc: "Cách vạch tối đa 50cm." },
    { id: 3, name: "Dừng và khởi hành dốc", icon: Navigation, desc: "Không tụt dốc quá 50cm." },
    { id: 4, name: "Qua vệt bánh xe", icon: TrafficCone, desc: "Đi qua đúng hình vệt." },
    { id: 5, name: "Qua ngã tư", icon: AlertCircle, desc: "Tuân thủ đèn tín hiệu." },
    { id: 6, name: "Đường vòng quanh co", icon: ArrowRightLeft, desc: "Tiến bám lưng, lùi bám bụng." },
    { id: 7, name: "Ghép xe dọc", icon: ParkingSquare, desc: "Lùi xe vào chuồng dọc." },
    { id: 8, name: "Dừng tại đường sắt", icon: TrainTrack, desc: "Dừng cách vạch 50cm." },
    { id: 9, name: "Tăng tốc đường bằng", icon: GaugeCircle, desc: "Tăng số và tốc độ." },
    { id: 10, name: "Ghép xe ngang", icon: ParkingSquare, desc: "Đỗ song song lề." },
    { id: 11, name: "Kết thúc", icon: CheckSquare, desc: "Xi nhan phải về đích." }
  ];
  const currentSteps = licenseType === 'C' ? saHinhSteps.filter(step => step.id !== 10) : saHinhSteps;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-bold text-xl text-slate-800">Sơ Đồ Sa Hình Liên Hoàn</h3>
          <p className="text-sm text-slate-500 mt-1">Hệ thống sa hình đạt chuẩn ISO 9001 - Bộ GTVT</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          {['B1', 'B2', 'C'].map(type => (
            <button key={type} onClick={() => setLicenseType(type)} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${licenseType === type ? 'bg-white text-orange-600 shadow-md transform scale-105' : 'text-slate-500 hover:text-slate-700'}`}>Hạng {type}</button>
          ))}
        </div>
      </div>
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative mt-4">
          {currentSteps.map((step, index) => (
            <div key={step.id} className="p-6 border-2 border-slate-50 rounded-3xl bg-slate-50 hover:bg-white hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl shrink-0">{index + 1}</div>
                <h5 className="font-bold text-slate-800 leading-tight">{step.name}</h5>
              </div>
              <div className="mt-auto bg-slate-100 text-slate-600 p-3 rounded-xl text-xs font-medium flex items-start gap-2">
                <step.icon size={16} className="shrink-0 mt-0.5" />
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 7. TÀI CHÍNH (GỌI API)
// =========================================================================
const FinanceTab = ({ data, refreshMain }) => {
  const [payAmount, setPayAmount] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const tuitions = data.tuitions || [];
  const totalRevenue = tuitions.reduce((sum, item) => sum + item.paidAmount, 0);
  const debtorCount = tuitions.filter(item => item.status === 'Đang nợ').length;

  const handlePay = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !payAmount) return alert("Chọn học viên và nhập số tiền!");
    try {
      const response = await fetch(`${API_BASE}/Finance/pay/${selectedStudent}`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parseFloat(payAmount))
      });
      if (response.ok) {
        alert("Thu tiền thành công!"); setPayAmount(""); setSelectedStudent(null); refreshMain(); 
      } else alert("Có lỗi xảy ra");
    } catch (err) { alert("Lỗi kết nối Backend C#"); }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 rounded-[32px] shadow-lg text-white">
          <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest mb-1">Tổng Thực Thu (Đã nộp)</p>
          <p className="text-4xl font-black">{totalRevenue.toLocaleString()}<span className="text-xl font-medium ml-1">đ</span></p>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Học Viên Đang Nợ</p>
          <p className="text-4xl font-black text-slate-800">{debtorCount}<span className="text-xl text-slate-400 font-medium ml-1">người</span></p>
        </div>
      </div>
      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <h3 className="font-bold text-xl mb-6 text-emerald-600 flex items-center gap-2"><BadgeDollarSign size={24} /> Thu Tiền Học Viên</h3>
        <form onSubmit={handlePay} className="flex flex-col sm:flex-row gap-4">
          <select value={selectedStudent || ""} onChange={(e) => setSelectedStudent(e.target.value)} className="flex-1 bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm">
            <option value="">-- Chọn Học Viên Đang Nợ --</option>
            {tuitions.filter(t => t.status === "Đang nợ").map(t => (
              <option key={t.id} value={t.id}>{t.studentName} - Còn nợ: {(t.totalAmount - t.paidAmount).toLocaleString()} VNĐ</option>
            ))}
          </select>
          <input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} placeholder="Số tiền thu (VNĐ)..." className="w-full sm:w-64 bg-slate-50 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-sm" />
          <button type="submit" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition">THU TIỀN</button>
        </form>
      </div>
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-6">
        <h3 className="font-bold text-lg mb-6 text-slate-800">Danh Sách Công Nợ (Từ SQL Server)</h3>
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <tr><th className="px-4 py-3">Học Viên</th><th className="px-4 py-3">Tiến Độ</th><th className="px-4 py-3">Trạng Thái</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tuitions.length === 0 && <tr><td colSpan="3" className="px-8 py-8 text-center text-slate-400">Chưa có dữ liệu học phí</td></tr>}
            {tuitions.map((item) => {
              const percent = Math.round((item.paidAmount / item.totalAmount) * 100) || 0;
              let statusColor = item.status === 'Hoàn thành' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-amber-100 text-amber-700 border-amber-200';
              return (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 font-bold text-slate-800">{item.studentName} <p className="text-xs text-slate-500 font-normal">{item.courseName}</p></td>
                  <td className="px-4 py-4 w-1/2">
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1"><span>{item.paidAmount.toLocaleString()}đ</span><span>{percent}%</span></div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5"><div className={`${item.status === 'Hoàn thành' ? 'bg-emerald-500' : 'bg-amber-500'} h-2.5 rounded-full`} style={{ width: `${percent}%` }}></div></div>
                  </td>
                  <td className="px-4 py-4"><span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${statusColor}`}>{item.status}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// =========================================================================
// 8. BÁO CÁO (CỨNG)
// =========================================================================
const ReportsTab = () => {
  const monthlyRevenue = [
    { month: 'T10', value: 40, label: '450M' }, { month: 'T11', value: 50, label: '520M' },
    { month: 'T12', value: 85, label: '850M' }, { month: 'T01', value: 60, label: '600M' },
    { month: 'T02', value: 45, label: '480M' }, { month: 'T03', value: 70, label: '700M' },
  ];
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-xl text-slate-800 flex items-center gap-2 mb-8"><TrendingUp className="text-blue-600"/> Biểu Đồ Doanh Thu 6 Tháng Gần Nhất</h3>
          <div className="h-64 flex items-end justify-between gap-4 border-b border-slate-100 pb-2 relative mt-12">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-slate-100/50 w-full h-0"></div><div className="border-t border-slate-100/50 w-full h-0"></div><div className="border-t border-slate-100/50 w-full h-0"></div>
            </div>
            {monthlyRevenue.map((item, idx) => (
              <div key={idx} className="w-1/6 flex flex-col items-center group relative z-10">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-lg mb-2 absolute -top-8 whitespace-nowrap">{item.label}</div>
                <div className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-xl transition-all duration-700" style={{ height: `${item.value}%` }}></div>
                <span className="text-xs font-bold text-slate-500 mt-3">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-xl text-slate-800 mb-8 flex items-center gap-2"><PieChart className="text-purple-600"/> Tỷ Lệ Sát Hạch</h3>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-2"><span>Đạt Yêu Cầu</span><span className="text-emerald-600">85%</span></div>
              <div className="w-full bg-slate-100 rounded-full h-4"><div className="bg-emerald-500 h-4 rounded-full" style={{ width: '85%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-2"><span>Thi Trượt</span><span className="text-red-500">15%</span></div>
              <div className="w-full bg-slate-100 rounded-full h-4"><div className="bg-red-500 h-4 rounded-full" style={{ width: '15%' }}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// MAIN APP COMPONENT (ĐIỀU HƯỚNG LOGIN -> DASHBOARD)
// =========================================================================
const App = () => {
  // Trạng thái Quản lý Đăng nhập
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // Trạng thái Dashboard
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ vehicles: [], instructors: [], courses: [], bookings: [], tuitions: [] });

  // Hàm gọi API lấy toàn bộ dữ liệu (Chỉ chạy khi đã Login)
  const refreshData = async () => {
    setLoading(true);
    try {
      const [v, i, c, b, t] = await Promise.all([
        fetch(`${API_BASE}/Vehicle`).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE}/Instructor`).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE}/Course`).then(r => r.ok ? r.json() : []),
        // Đã sửa lại đường dẫn này để lấy TẤT CẢ các lịch (API mới bên C# của Hùng)
        fetch(`${API_BASE}/Booking/all`).then(r => r.ok ? r.json() : []),
        fetch(`${API_BASE}/Finance`).then(r => r.ok ? r.json() : [])
      ]);
      setData({ vehicles: v || [], instructors: i || [], courses: c || [], bookings: b || [], tuitions: t || [] });
    } catch (err) { console.log("Lỗi kết nối Backend C#"); }
    setLoading(false);
  };

  // Tự động load dữ liệu khi Login thành công
  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  // Handle Login & Logout
  const handleLoginSuccess = (username) => {
    setCurrentUser(username);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    setActiveTab('dashboard'); // Reset tab
  };

  // NẾU CHƯA ĐĂNG NHẬP -> Hiện màn hình Login
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLoginSuccess} />;
  }

  // NẾU ĐÃ ĐĂNG NHẬP -> Hiện Dashboard
  const headerInfo = {
    'dashboard': { title: 'Bảng Điều Khiển', desc: 'Chỉ số tổng quan của Trung tâm' },
    'finance': { title: 'Học Phí & Công Nợ', desc: 'Dữ liệu được lấy trực tiếp từ SQL Server' },
    'booking': { title: 'Quản Lý Lịch Tập', desc: 'Theo dõi thời gian thực hành' },
    'training': { title: 'Khóa Học & Xét Duyệt', desc: 'Chấm điểm và kết quả' },
    'resources': { title: 'Đội Xe & Giảng Viên', desc: 'Quản lý tài nguyên' },
    'facilities': { title: 'Sân Tập & Sa Hình', desc: 'Hệ thống bài thi chuẩn Bộ GTVT' },
    'reports': { title: 'Báo Cáo Thống Kê', desc: 'Đồ thị doanh thu và chất lượng' },
    'settings': { title: 'Cài Đặt Hệ Thống', desc: 'Phân quyền và bảo mật' },
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} currentUser={currentUser} />
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        <header className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50 px-10 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{headerInfo[activeTab].title}</h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">{headerInfo[activeTab].desc}</p>
          </div>
          <button onClick={refreshData} className="bg-white text-slate-600 px-5 py-2.5 rounded-xl shadow-sm border border-slate-200 hover:text-blue-600 font-bold flex items-center gap-2">
            <RefreshCw size={16} className={loading ? 'animate-spin text-blue-600' : ''} /> 
            {loading ? 'Đang tải...' : 'Làm mới Database'}
          </button>
        </header>
        <div className="p-10">
          {activeTab === 'dashboard' && <Dashboard data={data} />}
          {activeTab === 'booking' && <BookingTab data={data} refreshMain={refreshData} />}
          {activeTab === 'training' && <TrainingTab data={data} refreshMain={refreshData} />}
          {activeTab === 'finance' && <FinanceTab data={data} refreshMain={refreshData} />}
          {activeTab === 'resources' && <ResourceTab data={data} refreshMain={refreshData} />}
          {activeTab === 'facilities' && <FacilitiesTab />}
          {activeTab === 'reports' && <ReportsTab />}
          {activeTab === 'settings' && (
            <div className="bg-white p-16 rounded-[32px] border border-slate-100 shadow-sm text-center">
              <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">Cài Đặt Hệ Thống</h3>
              <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">Khu vực yêu cầu quyền Root Admin.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;