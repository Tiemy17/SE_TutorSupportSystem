-- SQL Server script to create the SE_TutorSupportSystem database and core tables
-- Run this in SQL Server Management Studio (SSMS) 20 connected to your SQL Server instance

SET NOCOUNT ON;

IF DB_ID(N'SE_TutorSupportSystem') IS NULL
BEGIN
    CREATE DATABASE [SE_TutorSupportSystem];
END

GO

USE [SE_TutorSupportSystem];
GO

-- Users table (simple authentication placeholder)
CREATE TABLE [Users] (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(256) NOT NULL,
    Role NVARCHAR(50) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- Students and Tutors reference Users (one-to-one extension)
CREATE TABLE [Students] (
    StudentId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    FullName NVARCHAR(200),
    Email NVARCHAR(200),
    CONSTRAINT FK_Students_Users FOREIGN KEY (UserId) REFERENCES [Users](UserId) ON DELETE CASCADE
);

CREATE TABLE [Tutors] (
    TutorId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL UNIQUE,
    FullName NVARCHAR(200),
    Email NVARCHAR(200),
    Bio NVARCHAR(MAX),
    CONSTRAINT FK_Tutors_Users FOREIGN KEY (UserId) REFERENCES [Users](UserId) ON DELETE CASCADE
);

CREATE TABLE [Subjects] (
    SubjectId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Code NVARCHAR(50) NULL
);

CREATE TABLE [Semesters] (
    SemesterId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    StartDate DATE NULL,
    EndDate DATE NULL
);

CREATE TABLE [Classes] (
    ClassId INT IDENTITY(1,1) PRIMARY KEY,
    SubjectId INT NOT NULL,
    SemesterId INT NOT NULL,
    TutorId INT NULL,
    Title NVARCHAR(300),
    CONSTRAINT FK_Classes_Subjects FOREIGN KEY (SubjectId) REFERENCES [Subjects](SubjectId),
    CONSTRAINT FK_Classes_Semesters FOREIGN KEY (SemesterId) REFERENCES [Semesters](SemesterId),
    CONSTRAINT FK_Classes_Tutors FOREIGN KEY (TutorId) REFERENCES [Tutors](TutorId)
);

CREATE TABLE [Requests] (
    RequestId INT IDENTITY(1,1) PRIMARY KEY,
    StudentId INT NOT NULL,
    TutorId INT NULL,
    ClassId INT NULL,
    Message NVARCHAR(MAX),
    Status NVARCHAR(50) DEFAULT 'Pending',
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Requests_Students FOREIGN KEY (StudentId) REFERENCES [Students](StudentId),
    CONSTRAINT FK_Requests_Tutors FOREIGN KEY (TutorId) REFERENCES [Tutors](TutorId),
    CONSTRAINT FK_Requests_Classes FOREIGN KEY (ClassId) REFERENCES [Classes](ClassId)
);

GO

-- Indexes for common lookups
CREATE INDEX IX_Users_Username ON [Users](Username);
CREATE INDEX IX_Subjects_Name ON [Subjects](Name);

GO

PRINT 'Database and core tables created successfully.';
