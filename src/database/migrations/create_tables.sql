--Create ENUM types for CV_type, major, faculty, personel_type, system_role, post_category, post_topic, department/applied_department, faqs_category, personel_position
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cv_type_enum') THEN
        CREATE TYPE cv_type_enum AS ENUM ('CV mẫu', 'CV tự thiết kế');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'personnel_type_enum') THEN
        CREATE TYPE personnel_type_enum AS ENUM (
            'Đang hoạt động',
            'Cựu thành viên',
            'Ứng viên'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'system_role_enum') THEN
        CREATE TYPE system_role_enum AS ENUM (
            'Quản trị viên',
            'Trưởng ban Tech',
            'Trưởng ban PR',
            'Trưởng ban HR',
            'Trưởng ban EV',
            'Trưởng ban FER',
            'CTV/TV'
            );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'activity_category_enum') THEN
        CREATE TYPE activity_category_enum AS ENUM (
            'Talkshow/Workshop',
            'Cuộc thi',
            'Game',
            'Hoạt động truyền thông',
            'Hoạt động nội bộ'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'etnews_category_enum') THEN
        CREATE TYPE etnews_category_enum AS ENUM (
            'Công nghệ Việt Nam',
            'Công nghệ thế giới',
            'Chính phủ số',
            'Khác'
        );
    END IF;    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'faqs_category_enum') THEN
        CREATE TYPE faqs_category_enum AS ENUM (
            'Về ET Club',
            'Về hoạt động và sự kiện',
            'Về quy trình tham gia',
            'Khác'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'department_enum') THEN
        CREATE TYPE department_enum AS ENUM (
            'Ban Kỹ thuật - Công nghệ',
            'Ban Truyền thông',
            'Ban Nhân sự - Tổ chức',
            'Ban Sự kiện',
            'Ban Tài chính - Đối ngoại'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'personnel_position_enum') THEN
        CREATE TYPE personnel_position_enum AS ENUM (
            'Chủ nhiệm',
            'Phó chủ nhiệm',
            'Thành viên ban chủ nhiệm',
            'Trưởng ban',
            'Phó ban',
            'Thành viên',
            'Cộng tác viên'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'genders_enum') THEN
        CREATE TYPE genders_enum AS ENUM (
            'Nam',
            'Nữ',
            'Khác'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'partner_category_enum') THEN
        CREATE TYPE partner_category_enum AS ENUM (
            'Experts',
            'Brand',
            'KOL'
        );
    END IF;
END $$;

--Create tables
CREATE TABLE IF NOT EXISTS system_roles (
    sysroleID CHAR(6) NOT NULL PRIMARY KEY,
    system_role system_role_enum NOT NULL
);

CREATE TABLE IF NOT EXISTS accounts (
    accountID CHAR(6) PRIMARY KEY,
    sysroleID CHAR(6) NOT NULL REFERENCES system_roles(sysroleID),
    username VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    profileID CHAR(7) PRIMARY KEY,
    profile_name VARCHAR(30) NOT NULL CHECK (profile_name !~ '[0-9]'),
    phone_number VARCHAR(10) CHECK (phone_number ~ '^0[0-9]{9}$'),
    email VARCHAR(320) CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    DOB DATE NOT NULL,
    gender genders_enum NOT NULL,
    address VARCHAR(263),
    studentID VARCHAR(20) NOT NULL,
    major VARCHAR(100) NOT NULL,
    class VARCHAR(10),
    accountID CHAR(6) NOT NULL REFERENCES accounts(accountID)
);

CREATE TABLE IF NOT EXISTS personnel_positions (
    positionID CHAR(6) PRIMARY KEY,
    position personnel_position_enum NOT NULL
);
CREATE TABLE IF NOT EXISTS departments (
    departmentID CHAR(6) PRIMARY KEY,
    department_name VARCHAR(40) NOT NULL CHECK (department_name !~ '[0-9]') --CHECK
);
CREATE TABLE IF NOT EXISTS personnel (
    personnelID CHAR(6) PRIMARY KEY,
    personnel_name VARCHAR(30) NOT NULL CHECK (personnel_name !~ '[0-9]'),
    phone_number VARCHAR(10) CHECK (phone_number ~ '^0[0-9]{9}$'),
    positionID CHAR(6) NOT NULL REFERENCES personnel_positions(positionID),
    personnel_type personnel_type_enum NOT NULL,
    email VARCHAR(320) CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    DOB DATE NOT NULL,
    gender genders_enum NOT NULL,
    address VARCHAR(263),
    student_ID VARCHAR(20) NOT NULL,
    university VARCHAR(50) NOT NULL,
    faculty VARCHAR(100) NOT NULL,
    major VARCHAR(100) NOT NULL,
    class VARCHAR(10) NOT NULL,
    departmentID CHAR(6) REFERENCES departments(departmentID),
    cv_type cv_type_enum,
    cv_file TEXT
);
CREATE TABLE IF NOT EXISTS courses (
    courseID CHAR(6) PRIMARY KEY,
    course_name VARCHAR(10) NOT NULL CHECK (course_name !~ '[0-9]')
);
CREATE TABLE IF NOT EXISTS term (
    termID CHAR(6) PRIMARY KEY,
    term_name VARCHAR(20) NOT NULL CHECK (term_name !~ '[0-9]')
); 
CREATE TABLE IF NOT EXISTS active_in (
    termID CHAR(6) NOT NULL REFERENCES term(termID),
    personnelID CHAR(6) NOT NULL,
    departmentID CHAR(6) REFERENCES departments(departmentID),
    positionID CHAR(6) REFERENCES personnel_positions(positionID),
    start_date DATE,
    end_date DATE,
    PRIMARY KEY (termID, personnelID)
); --CHECK
CREATE TABLE IF NOT EXISTS achievements (
    achievementID CHAR(6) PRIMARY KEY,
    achievement_name VARCHAR(30) NOT NULL CHECK (achievement_name !~ '[0-9]'),
    highlight_number VARCHAR(10) NOT NULL,
    visible BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS banners (
    bannerID TEXT PRIMARY KEY,
    banner_name VARCHAR(30) NOT NULL,
    image TEXT NOT NULL,
    visible BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS faqs (
    faqsID CHAR(10) PRIMARY KEY,
    faqs_category faqs_category_enum NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    visible BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS activities (
    activityID CHAR(6) PRIMARY KEY,
    title VARCHAR(100) NOT NULL CHECK (title !~ '^[0-9]'),
    activity_category activity_category_enum NOT NULL,
    meta_description TEXT,
    content TEXT NOT NULL CHECK (length(content) >= 50),
    thumbnail_image TEXT NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL DEFAULT CURRENT_DATE,
    register_number INT NOT NULL DEFAULT 0,
    participated_number INT NOT NULL DEFAULT 0,
    expense_money DECIMAL(10,2) NOT NULL DEFAULT 0,
    visible BOOLEAN NOT NULL,
    view_count INT NOT NULL DEFAULT 0,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS blogs (
    blogID CHAR(6) PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    meta_description TEXT NOT NULL,
    content TEXT NOT NULL CHECK (length(content) >= 50),
    thumbnail_image TEXT NOT NULL,
    blog_author VARCHAR(60) NOT NULL,
    visible BOOLEAN NOT NULL,
    view_count INT DEFAULT 0,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS collaborators (
    collaboratorID CHAR(6) PRIMARY KEY,
    collaborator_name VARCHAR(30) NOT NULL CHECK (collaborator_name !~ '[0-9]'),
    email VARCHAR(320) CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    phone_number VARCHAR(15) NOT NULL CHECK (phone_number ~ '^0[0-9]{9,14}$'),
    university VARCHAR(50) NOT NULL,
    student_ID VARCHAR(20) NOT NULL,
    course VARCHAR(10) NOT NULL,
    faculty VARCHAR(100) NOT NULL,
    major_class VARCHAR(50) NOT NULL,
    applied_department department_enum NOT NULL,
    cv_type cv_type_enum NOT NULL,
    cv_file TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS partner_category (
    partner_categoryID CHAR(6) PRIMARY KEY, 
    partner_category_name partner_category_enum NOT NULL
);
CREATE TABLE IF NOT EXISTS partners (
    partnerID CHAR(8) PRIMARY KEY,
    partner_name VARCHAR(100) NOT NULL,
    partner_categoryID CHAR(6) NOT NULL REFERENCES partner_category(partner_categoryID),
    avatar TEXT,
    short_description VARCHAR(50),
    email VARCHAR(320) CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    phone_number VARCHAR(10) CHECK (phone_number ~ '^0[0-9]{9}$'),
    visible BOOLEAN NOT NULL,
    note TEXT,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE etnews (
    etnewsID CHAR(6) PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    etnews_category etnews_category_enum NOT NULL,
    thumbnail_image TEXT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source TEXT NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT TRUE,
    view_count INT DEFAULT 0,
    content TEXT NOT NULL CHECK (LENGTH(content) >= 50),
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Create sequences
CREATE SEQUENCE IF NOT EXISTS account_id_seq START 1;
ALTER TABLE accounts
    ALTER COLUMN accountID SET DEFAULT 'ACC' || LPAD(nextval('account_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS department_id_seq START 1;
ALTER TABLE departments
    ALTER COLUMN departmentID SET DEFAULT 'DEPT' || LPAD(nextval('department_id_seq')::TEXT, 2, '0');

CREATE SEQUENCE IF NOT EXISTS personnel_id_seq START 1;
ALTER TABLE personnel
    ALTER COLUMN personnelID SET DEFAULT 'MEM' || LPAD(nextval('personnel_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS term_id_seq START 1;
ALTER TABLE term
    ALTER COLUMN termID SET DEFAULT 'TERM' || LPAD(nextval('term_id_seq')::TEXT, 2, '0');

CREATE SEQUENCE IF NOT EXISTS course_id_seq START 1;
ALTER TABLE courses
    ALTER COLUMN courseID SET DEFAULT 'COURSE' || LPAD(nextval('course_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS achievement_id_seq START 1;
ALTER TABLE achievements
    ALTER COLUMN achievementID SET DEFAULT 'ACHV' || LPAD(nextval('achievement_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS banner_id_seq START 1;
ALTER TABLE banners
    ALTER COLUMN bannerID SET DEFAULT 'BRN' || LPAD(nextval('banner_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS faqs_id_seq START 1;
ALTER TABLE faqs
    ALTER COLUMN faqsID SET DEFAULT 'QUEST' || LPAD(nextval('faqs_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS activity_id_seq START 1;
ALTER TABLE activities
    ALTER COLUMN activityID SET DEFAULT 'ACT' || LPAD(nextval('activity_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS etnews_id_seq START 1;
ALTER TABLE etnews
    ALTER COLUMN etnewsID SET DEFAULT 'EN' || LPAD(nextval('etnews_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS blog_id_seq START 1;
ALTER TABLE blogs
    ALTER COLUMN blogID SET DEFAULT 'EBLG' || LPAD(nextval('blog_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS collaborator_id_seq START 1;
ALTER TABLE collaborators
    ALTER COLUMN collaboratorID SET DEFAULT 'COLLAB' || LPAD(nextval('collaborator_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS partner_id_seq START 1;
ALTER TABLE partners
    ALTER COLUMN partnerID SET DEFAULT 'PRTNR' || LPAD(nextval('partner_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS partner_category_id_seq START 1;
ALTER TABLE partner_category
    ALTER COLUMN partner_categoryID SET DEFAULT 'PC' || LPAD(nextval('partner_category_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS system_role_id_seq START 1;
ALTER TABLE system_roles
    ALTER COLUMN sysroleID SET DEFAULT 'SR' || LPAD(nextval('system_role_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS profile_id_seq START 1;
ALTER TABLE profiles
    ALTER COLUMN profileID SET DEFAULT 'PF' || LPAD(nextval('profile_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS position_id_seq START 1;
ALTER TABLE personnel_positions
    ALTER COLUMN positionID SET DEFAULT 'PO' || LPAD(nextval('position_id_seq')::TEXT, 3, '0');

--Create trigger
CREATE OR REPLACE FUNCTION update_last_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_modified_on = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON partners
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();

CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();

CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON accounts
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();
 
CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON etnews
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();

CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON activities
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();