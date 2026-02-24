using System;
using System.ComponentModel.DataAnnotations;

namespace BTL_Backend_Nhom6.Models
{
    // --- 1. MODEL CỦA HÙNG (USER & BOOKING) ---
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // "Admin", "Student", "Instructor"
        public string FullName { get; set; } = string.Empty;
    }

    public class Booking
    {
        [Key]
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int InstructorId { get; set; }
        public int VehicleId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; } = "Pending";
    }

    // --- 2. MODEL CỦA MẠNH (XE & GIÁO VIÊN) ---
    public class Vehicle
    {
        [Key]
        public int Id { get; set; }
        public string LicensePlate { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // B1, B2
        public double Odo { get; set; } // Số Km đã chạy
        public string Status { get; set; } = "Ready"; // Ready, Maintenance
    }

    public class Instructor
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? AssignedVehicleId { get; set; }
    }

    // --- 3. MODEL CỦA ĐỨC (KHÓA HỌC & TIẾN ĐỘ) ---
    public class Course
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int DurationHours { get; set; }
        public double RequiredKm { get; set; }
    }

    public class Enrollment
    {
        [Key]
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public DateTime? ExamDate { get; set; }
        public double CurrentKm { get; set; }
        public int CurrentHours { get; set; }

        public Course? Course { get; set; }
    }

    public class TrainingResult
    {
        [Key]
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string Type { get; set; } = string.Empty;
        public double Score { get; set; }
        public bool IsPassed { get; set; }
    }
}