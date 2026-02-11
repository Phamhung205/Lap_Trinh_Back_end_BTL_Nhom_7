using BTL_Backend_Nhom6.Data;
using BTL_Backend_Nhom6.Models; // Thêm dòng này để dùng được Model Course
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// --- 1. Đăng ký kết nối SQL Server ---
// Lấy chuỗi kết nối từ file appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));
// -------------------------------------

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- 2. SEED DATA: Tự động thêm khóa học giá 150.000 (Xử lý yêu cầu về giá tiền) ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        // Kiểm tra nếu chưa có khóa học nào trong Database thì mới thêm mới
        if (!context.Courses.Any())
        {
            context.Courses.Add(new Course
            {
                Name = "Khóa Bổ Túc Tay Lái (Nâng cao)",
                Price = 150000, // Giá tiền chuẩn 150.000 VNĐ
                DurationHours = 5,
                RequiredKm = 100
            });
            context.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        // Ghi log lỗi vào Console nếu quá trình tạo dữ liệu mẫu thất bại
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Lỗi khi tạo dữ liệu mẫu trong quá trình khởi động ứng dụng.");
    }
}
// -----------------------------------------------------------------

// Cấu hình Pipeline xử lý yêu cầu HTTP
if (app.Environment.IsDevelopment())
{
    // Bật giao diện Swagger trong môi trường Development
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();