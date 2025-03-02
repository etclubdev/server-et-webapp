--Create ENUM types
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sysrole_enum') THEN
        CREATE TYPE sysrole_enum AS ENUM (
            'Quản trị viên',
            'Trưởng ban Tech',
            'Trưởng ban PR',
            'Trưởng ban HR',
            'Trưởng ban EV',
            'Trưởng ban FER',
            'CTV/TV'
            );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cv_type_enum') THEN
        CREATE TYPE cv_type_enum AS ENUM ('CV mẫu', 'CV tự thiết kế');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'personnel_status_enum') THEN
        CREATE TYPE personnel_status_enum AS ENUM (
            'Đang hoạt động',
            'Cựu thành viên',
            'Ứng viên'
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
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'faq_category_enum') THEN
        CREATE TYPE faq_category_enum AS ENUM (
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
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'position_enum') THEN
        CREATE TYPE position_enum AS ENUM (
            'Chủ nhiệm',
            'Phó chủ nhiệm',
            'Thành viên ban chủ nhiệm',
            'Trưởng ban',
            'Phó ban',
            'Thành viên',
            'Cộng tác viên'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'gender_enum') THEN
        CREATE TYPE gender_enum AS ENUM (
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
CREATE TABLE IF NOT EXISTS system_role (
    sysrole_id CHAR(7) NOT NULL PRIMARY KEY,
    sysrole_name sysrole_enum NOT NULL DEFAULT 'CTV/TV'
);

CREATE TABLE IF NOT EXISTS account (
    account_id CHAR(7) PRIMARY KEY,
    sysrole_id CHAR(7) NOT NULL REFERENCES system_role(sysrole_id),
    username VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
    profile_id CHAR(7) PRIMARY KEY,
    profile_name VARCHAR(30) NOT NULL CHECK (profile_name !~ '[0-9]'),
    phone_number VARCHAR(10) CHECK (phone_number ~ '^0[0-9]{9}$'), 
    email VARCHAR(320) NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    dob DATE NOT NULL,
    gender gender_enum NOT NULL,
    address VARCHAR(263),
    student_id VARCHAR(20) NOT NULL,
    major VARCHAR(100) NOT NULL,
    class VARCHAR(10) NOT NULL,
    account_id CHAR(10) NOT NULL REFERENCES account(account_id)
);

CREATE TABLE IF NOT EXISTS course (
    course_id CHAR(7) PRIMARY KEY,
    course_name VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS personnel (
    personnel_id CHAR(7) PRIMARY KEY,
    personnel_name VARCHAR(30) NOT NULL CHECK (personnel_name !~ '[0-9]'),
    phone_number VARCHAR(10) CHECK (phone_number ~ '^0[0-9]{9}$'),
    email VARCHAR(320) NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    dob DATE NOT NULL,
    gender gender_enum NOT NULL,
    address VARCHAR(263),
    student_id VARCHAR(20) NOT NULL,
    university VARCHAR(50) NOT NULL DEFAULT 'Đại học Kinh tế TP.HCM',
    faculty VARCHAR(100) NOT NULL DEFAULT 'Công nghệ thông tin kinh doanh',
    major VARCHAR(100) NOT NULL,
    class VARCHAR(10) NOT NULL,
    cv_type cv_type_enum,
    cv_link TEXT,
    course_id char(7) NOT NULL REFERENCES course(course_id)
);

CREATE TABLE IF NOT EXISTS term (
    term_id CHAR(7) PRIMARY KEY,
    term_name VARCHAR(20) NOT NULL,
    start_date DATE, 
    end_date DATE
); 

CREATE TABLE IF NOT EXISTS position (
    position_id CHAR(7) PRIMARY KEY,
    position_name position_enum NOT NULL
);

CREATE TABLE IF NOT EXISTS department (
    department_id CHAR(7) PRIMARY KEY,
    department_name department_enum NOT NULL
);

CREATE TABLE IF NOT EXISTS personnel_status (
    term_id CHAR(7) NOT NULL REFERENCES term(term_id),
    personnel_id CHAR(7) NOT NULL,
    department_id CHAR(7) REFERENCES department(department_id),
    position_id CHAR(7) REFERENCES position(position_id),
    personnel_status personnel_status_enum NOT NULL, 
    PRIMARY KEY (term_id, personnel_id)
);

CREATE TABLE IF NOT EXISTS banner (
    banner_id CHAR(7) PRIMARY KEY,
    banner_name VARCHAR(30) NOT NULL,
    image_url TEXT NOT NULL,
    visible BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS achievement (
    achievement_id CHAR(7) PRIMARY KEY,
    achievement_name VARCHAR(30) NOT NULL,
    highlight_number VARCHAR(10) NOT NULL,
    visible BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS faq (
    faq_id CHAR(7) PRIMARY KEY,
    faq_category faq_category_enum NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    visible BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS activity (
    activity_id CHAR(7) PRIMARY KEY,
    title VARCHAR(60) NOT NULL CHECK (title ~ '^[A-Za-z].*'),
    activity_category activity_category_enum NOT NULL,
    meta_description VARCHAR(160),
    thumbnail_image_url TEXT NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL DEFAULT CURRENT_DATE,
    register_number INT DEFAULT 0,
    participated_number INT DEFAULT 0,
    expense_money DECIMAL(10,2) DEFAULT 0,
    visible BOOLEAN NOT NULL,
    content TEXT NOT NULL CHECK (length(content) >= 50),
    view_count INT NOT NULL DEFAULT 0,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS et_news (
    etnews_id CHAR(7) PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    etnews_category etnews_category_enum NOT NULL,
    meta_description VARCHAR(160),
    thumbnail_image_url TEXT NOT NULL,
    source TEXT NOT NULL,
    visible BOOLEAN NOT NULL DEFAULT TRUE,
    content TEXT NOT NULL CHECK (LENGTH(content) >= 50),
    view_count INT DEFAULT 0,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS et_blog (
    blog_id CHAR(7) PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    thumbnail_image_url TEXT NOT NULL,
    blog_author VARCHAR(60) NOT NULL,
    meta_description TEXT NOT NULL,
    visible BOOLEAN NOT NULL,
    content TEXT NOT NULL CHECK (length(content) >= 50),
    view_count INT DEFAULT 0,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS partner_category (
    partner_category_id CHAR(7) PRIMARY KEY, 
    partner_category_name partner_category_enum NOT NULL
);
CREATE TABLE IF NOT EXISTS partner (
    partner_id CHAR(7) PRIMARY KEY,
    partner_name VARCHAR(100) NOT NULL,
    partner_category_id CHAR(7) NOT NULL REFERENCES partner_category(partner_category_id),
    avatar_url TEXT,
    short_description VARCHAR(50),
    email VARCHAR(320) NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    phone_number VARCHAR(10) CHECK (phone_number ~ '^0[0-9]{9}$'),
    visible BOOLEAN NOT NULL,
    note TEXT,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--Create sequences
CREATE SEQUENCE IF NOT EXISTS system_role_id_seq START 1;
ALTER TABLE system_role
    ALTER COLUMN sysrole_id SET DEFAULT 'SRLE' || LPAD(nextval('system_role_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS account_id_seq START 1;
ALTER TABLE account
    ALTER COLUMN account_id SET DEFAULT 'ACCT' || LPAD(nextval('account_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS profile_id_seq START 1;
ALTER TABLE profile
    ALTER COLUMN profile_id SET DEFAULT 'PROF' || LPAD(nextval('profile_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS personnel_id_seq START 1;
ALTER TABLE personnel
    ALTER COLUMN personnel_id SET DEFAULT 'PERS' || LPAD(nextval('personnel_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS course_id_seq START 1;
ALTER TABLE course
    ALTER COLUMN course_id SET DEFAULT 'CORS' || LPAD(nextval('course_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS term_id_seq START 1;
ALTER TABLE term
    ALTER COLUMN term_id SET DEFAULT 'TERM' || LPAD(nextval('term_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS position_id_seq START 1;
ALTER TABLE position
    ALTER COLUMN position_id SET DEFAULT 'PSTN' || LPAD(nextval('position_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS department_id_seq START 1;
ALTER TABLE department
    ALTER COLUMN department_id SET DEFAULT 'DEPT' || LPAD(nextval('department_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS banner_id_seq START 1;
ALTER TABLE banner
    ALTER COLUMN banner_id SET DEFAULT 'BANR' || LPAD(nextval('banner_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS achievement_id_seq START 1;
ALTER TABLE achievement
    ALTER COLUMN achievement_id SET DEFAULT 'ACHV' || LPAD(nextval('achievement_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS faq_id_seq START 1;
ALTER TABLE faq
    ALTER COLUMN faq_id SET DEFAULT 'FAQS' || LPAD(nextval('faq_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS activity_id_seq START 1;
ALTER TABLE activity
    ALTER COLUMN activity_id SET DEFAULT 'ACTI' || LPAD(nextval('activity_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS etnews_id_seq START 1;
ALTER TABLE et_news
    ALTER COLUMN etnews_id SET DEFAULT 'ENEW' || LPAD(nextval('etnews_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS blog_id_seq START 1;

ALTER TABLE et_blog 
    ALTER COLUMN blog_id SET DEFAULT 'EBLG' || LPAD(nextval('blog_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS partner_id_seq START 1;
ALTER TABLE partner
    ALTER COLUMN partner_id SET DEFAULT 'PTNR' || LPAD(nextval('partner_id_seq')::TEXT, 3, '0');

CREATE SEQUENCE IF NOT EXISTS partner_category_id_seq START 1;
ALTER TABLE partner_category
    ALTER COLUMN partner_category_id SET DEFAULT 'PNCT' || LPAD(nextval('partner_category_id_seq')::TEXT, 3, '0');

--Create trigger
CREATE OR REPLACE FUNCTION update_last_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_modified_on = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON partner
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();

CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON et_blog
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();

CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON account
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();
 
CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON et_news
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();

CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON activity
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();