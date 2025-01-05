-- Create ENUM types for Gender, Department, Post Category, Activity Type, Status, Visibility
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Others');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'department_enum') THEN
        CREATE TYPE department_enum AS ENUM (
            'Administrator', 
            'Head of Technical Department', 
            'Head of HR Department', 
            'Head of PR Department', 
            'Head of FER Department', 
            'Head of Event Department', 
            'Collaborator'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'post_category_enum') THEN
        CREATE TYPE post_category_enum AS ENUM (
            'Tin chính phủ số', 
            'Tin công nghệ thế giới', 
            'Tin công nghệ Việt Nam', 
            'Tin tạo sự ảnh hưởng'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_type_enum') THEN
        CREATE TYPE activity_type_enum AS ENUM (
            'Talkshow/Workshop', 
            'Cuộc thi', 
            'Game', 
            'Hoạt động truyền thông', 
            'Hoạt động nội bộ'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_status_enum') THEN
        CREATE TYPE activity_status_enum AS ENUM (
            'Đã diễn ra', 
            'Đang diễn ra', 
            'Nội bộ', 
            'Sắp diễn ra'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'visibility_enum') THEN
        CREATE TYPE visibility_enum AS ENUM ('Yes', 'No');
    END IF;
END $$;

-- Create Users Table
CREATE TABLE IF NOT EXISTS Users (
    UserID VARCHAR(15) NOT NULL UNIQUE, -- Format USERXXYYY
    Name VARCHAR(50) NOT NULL CHECK (Name NOT LIKE '%[^a-zA-Z ]%'), -- No numbers or special characters
    Email VARCHAR(100) NOT NULL UNIQUE CHECK (Email LIKE '%@%'), -- Must contain "@"
    Address VARCHAR(200) NOT NULL,
    ContactNumber VARCHAR(12) NOT NULL CHECK (ContactNumber LIKE '0%' OR ContactNumber LIKE '+84%'), -- Must begin with '0' or '+84'
    ProfilePictureURL VARCHAR(255), -- Optional URL for profile picture
    DOB DATE NOT NULL DEFAULT '1990-01-01', -- Mandatory with default value
    Gender gender_enum NOT NULL, -- ENUM for gender
    Department department_enum NOT NULL, -- ENUM for department
    StudentID VARCHAR(50) NOT NULL,
    Major VARCHAR(100) NOT NULL CHECK (Major NOT LIKE '%[^a-zA-Z ]%'), -- No numbers or special characters
    Class VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- For tracking creation date
    PRIMARY KEY (UserID)
);

-- Create Posts Table
CREATE TABLE IF NOT EXISTS Posts (
    PostID VARCHAR(10) NOT NULL UNIQUE, -- Format: ENXXX
    Title VARCHAR(50) NOT NULL, -- Max 50 characters
    Category post_category_enum DEFAULT NULL, -- Optional, ENUM for category
    ShortDescription VARCHAR(100) NOT NULL, -- Max 100 characters
    Content TEXT NOT NULL, -- Multiple lines of text
    ThumbnailImageURL VARCHAR(255), -- Optional, URL for thumbnail image
    CreatedDate DATE NOT NULL DEFAULT CURRENT_DATE, -- Mandatory, defaults to current date
    UpdatedDate DATE DEFAULT NULL, -- Optional, for tracking updates
    Source VARCHAR(255) NOT NULL, -- Mandatory
    Visible visibility_enum NOT NULL DEFAULT 'No', -- ENUM for visibility, defaults to "No"
    ViewCount INT DEFAULT 0, -- Optional, starts at 0
    PRIMARY KEY (PostID)
);

-- Create Activities Table
CREATE TABLE IF NOT EXISTS Activities (
    ActivityID VARCHAR(10) NOT NULL UNIQUE, -- Format: ACXXX
    ActivityName VARCHAR(300) NOT NULL, -- Max 300 characters
    ActivityType activity_type_enum NOT NULL, -- ENUM for activity type
    Description VARCHAR(500), -- Optional
    Status activity_status_enum NOT NULL, -- ENUM for activity status
    ThumbnailImageURL VARCHAR(255) NOT NULL, -- Mandatory URL for thumbnail image
    StartDate DATE NOT NULL DEFAULT CURRENT_DATE, -- Mandatory, defaults to today
    EndDate DATE NOT NULL DEFAULT CURRENT_DATE, -- Mandatory, defaults to today
    Visible BOOLEAN NOT NULL DEFAULT FALSE, -- Mandatory, defaults to "No"
    SponsoredBudget INT DEFAULT NULL, -- Optional
    ActualExpenses INT DEFAULT NULL, -- Optional
    Scale INT DEFAULT NULL, -- Optional
    PRIMARY KEY (ActivityID)
);
