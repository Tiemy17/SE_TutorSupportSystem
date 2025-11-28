-- Sample seed data for SE_TutorSupportSystem database
USE [SE_TutorSupportSystem];
GO

-- Insert an admin user (store a real hash in production)
INSERT INTO [Users] (Username, PasswordHash, Role)
VALUES (N'admin', N'<replace_with_hashed_password>', N'Admin');

-- Example students/tutors (link to users)
INSERT INTO [Users] (Username, PasswordHash, Role) VALUES (N'student1', N'<hash>', N'Student');
INSERT INTO [Users] (Username, PasswordHash, Role) VALUES (N'tutor1', N'<hash>', N'Tutor');

-- Map to Students/Tutors
DECLARE @stuUserId INT = (SELECT UserId FROM [Users] WHERE Username = N'student1');
DECLARE @tutUserId INT = (SELECT UserId FROM [Users] WHERE Username = N'tutor1');

INSERT INTO [Students] (UserId, FullName, Email) VALUES (@stuUserId, N'Student One', N'student1@example.com');
INSERT INTO [Tutors] (UserId, FullName, Email, Bio) VALUES (@tutUserId, N'Tutor One', N'tutor1@example.com', N'Experienced tutor.');

-- Sample subject and semester
INSERT INTO [Subjects] (Name, Code) VALUES (N'Introduction to Programming', N'CS101');
INSERT INTO [Semesters] (Name, StartDate, EndDate) VALUES (N'Fall 2025', '2025-09-01', '2025-12-31');

-- Link a class
DECLARE @subjectId INT = (SELECT TOP 1 SubjectId FROM [Subjects] WHERE Code = N'CS101');
DECLARE @semesterId INT = (SELECT TOP 1 SemesterId FROM [Semesters] WHERE Name = N'Fall 2025');
DECLARE @tutorId INT = (SELECT TOP 1 TutorId FROM [Tutors] WHERE FullName = N'Tutor One');

INSERT INTO [Classes] (SubjectId, SemesterId, TutorId, Title)
VALUES (@subjectId, @semesterId, @tutorId, N'CS101 - Basics of Programming');

GO

PRINT 'Seed data inserted. Replace placeholder password hashes before production use.';
