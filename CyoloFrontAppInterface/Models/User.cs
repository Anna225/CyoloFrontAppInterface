﻿namespace CyoloFrontAppInterface.Models
{
    public class User
    {
        public int ID { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? Delete_at { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }
}