
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
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
    UserID VARCHAR(15) NOT NULL UNIQUE,
    Name VARCHAR(50) NOT NULL CHECK (Name NOT LIKE '%[^a-zA-Z ]%'),
    Email VARCHAR(100) NOT NULL UNIQUE CHECK (Email LIKE '%@%'),
    Address VARCHAR(200) NOT NULL,
    ContactNumber VARCHAR(12) NOT NULL CHECK (ContactNumber LIKE '0%' OR ContactNumber LIKE '+84%'),
    ProfilePictureURL VARCHAR(255),
    DOB DATE NOT NULL DEFAULT '1990-01-01',
    Gender gender_enum NOT NULL,
    Department department_enum NOT NULL,
    StudentID VARCHAR(50) NOT NULL,
    Major VARCHAR(100) NOT NULL CHECK (Major NOT LIKE '%[^a-zA-Z ]%'),
    Class VARCHAR(50) NOT NULL,
    Password VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID)
);

-- Create Posts Table
CREATE TABLE IF NOT EXISTS Posts (
    PostID VARCHAR(10) NOT NULL UNIQUE,
    Title VARCHAR(50) NOT NULL,
    Category post_category_enum DEFAULT NULL,
    ShortDescription VARCHAR(100) NOT NULL,
    Content TEXT NOT NULL,
    ThumbnailImageURL VARCHAR(255),
    CreatedDate DATE NOT NULL DEFAULT CURRENT_DATE,
    UpdatedDate DATE DEFAULT NULL,
    Source VARCHAR(255) NOT NULL,
    Visible visibility_enum NOT NULL DEFAULT 'No',
    ViewCount INT DEFAULT 0,
    PRIMARY KEY (PostID)
);

-- Create Activities Table
CREATE TABLE IF NOT EXISTS Activities (
    ActivityID VARCHAR(50) NOT NULL UNIQUE, -- Format: AC + UUID
    ActivityName VARCHAR(300) NOT NULL,
    ActivityType activity_type_enum NOT NULL,
    Description VARCHAR(500),
    Status activity_status_enum NOT NULL,
    ThumbnailImageURL VARCHAR(255) NOT NULL,
    StartDate DATE NOT NULL DEFAULT CURRENT_DATE,
    EndDate DATE NOT NULL DEFAULT CURRENT_DATE,
    Visible BOOLEAN NOT NULL DEFAULT FALSE,
    SponsoredBudget INT DEFAULT NULL,
    ActualExpenses INT DEFAULT NULL,
    Scale INT DEFAULT NULL,
    PRIMARY KEY (ActivityID)
);

ALTER TABLE activities ADD COLUMN activityid SERIAL PRIMARY KEY ;
ALTER TABLE activities DROP COLUMN activityid;

CREATE OR REPLACE FUNCTION add_prefix_to_serial_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.activityid := 'AC' || LPAD(NEW.activityid::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_prefix_to_activityid
BEFORE INSERT ON activities
FOR EACH ROW
EXECUTE FUNCTION add_prefix_to_serial_id();
-- 1. Tạo Sequence để tự động tăng giá trị
CREATE SEQUENCE activity_id_seq START 1;

-- 2. Chỉnh sửa cột `ActivityID` để sử dụng sequence
ALTER TABLE Activities
    ALTER COLUMN ActivityID SET DATA TYPE VARCHAR(50);

-- 3. Đặt mặc định cho `ActivityID` bằng cách kết hợp tiền tố "AC" và giá trị từ sequence
ALTER TABLE Activities
    ALTER COLUMN ActivityID SET DEFAULT 'AC' || LPAD(nextval('activity_id_seq')::TEXT, 3, '0');

