--Create ENUM types
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sysrole_enum') THEN
        CREATE TYPE sysrole_enum AS ENUM (
            'Administrator',
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
            'Cựu thành viên'
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
            'ET Club',
            'Hoạt động và sự kiện',
            'Quy trình tham gia',
            'Khác'
        );
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'department_enum') THEN
        CREATE TYPE department_enum AS ENUM (
            'Ban Chuyên môn',
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
            'Đối tác doanh nghiệp',
            'Đối tác chuyên gia',
            'Đối tác Truyền thông',
            'Nghệ sĩ khách mời'
        );
    END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status_enum') THEN
        CREATE TYPE application_status_enum AS ENUM (
            'Pending',
            'Approved',
            'Rejected'
        );
    END IF;
END $$;

--Create tables
CREATE TABLE IF NOT EXISTS system_role (
    sysrole_id UUID NOT NULL  PRIMARY KEY DEFAULT gen_random_uuid(),
    sysrole_name sysrole_enum NOT NULL DEFAULT 'CTV/TV'
);

CREATE TABLE IF NOT EXISTS personnel (
    personnel_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    personnel_name TEXT NOT NULL CHECK (personnel_name !~ '[0-9]') DEFAULT 'Nguyễn Văn A',
    phone_number VARCHAR(10) CHECK (phone_number ~ '^0[0-9]{9}$'),
    email VARCHAR(320) UNIQUE NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$') DEFAULT 'example@gmail.com',
    dob DATE NOT NULL DEFAULT '1990-01-01',
    gender gender_enum NOT NULL DEFAULT 'Nam',
    address VARCHAR,
    student_id VARCHAR NOT NULL DEFAULT '3123XXXXXXX',
    university VARCHAR NOT NULL DEFAULT 'Đại học Kinh tế TP.HCM',
    faculty VARCHAR NOT NULL DEFAULT 'Công nghệ thông tin kinh doanh',
    major VARCHAR NOT NULL DEFAULT 'Công nghệ thông tin',
    class VARCHAR NOT NULL DEFAULT 'ET0001',
    avatar_url TEXT,
    cv_type cv_type_enum,
    cv_link TEXT,
    cohort_name VARCHAR(10) NOT NULL DEFAULT 'K49'
);

CREATE TABLE IF NOT EXISTS account (
    account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sysrole_id UUID NOT NULL REFERENCES system_role(sysrole_id),
    username VARCHAR UNIQUE NOT NULL CHECK(username ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    password TEXT NOT NULL,
    personnel_id UUID NOT NULL REFERENCES personnel(personnel_id),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS term (
    term_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term_name VARCHAR(20) NOT NULL,
    start_date DATE, 
    end_date DATE
); 

CREATE TABLE IF NOT EXISTS personnel_status (
    term_id UUID NOT NULL REFERENCES term(term_id),
    personnel_id UUID NOT NULL REFERENCES personnel(personnel_id),
    department_name department_enum NOT NULL,
    position_name position_enum NOT NULL,
    personnel_status personnel_status_enum NOT NULL, 
    PRIMARY KEY (term_id, personnel_id)
);

CREATE TABLE IF NOT EXISTS banner (
    banner_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    banner_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    hypertext_link TEXT,
    visible BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS achievement (
    achievement_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    achievement_name TEXT NOT NULL,
    highlight_number INT NOT NULL,
    visible BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS faq (
    faq_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faq_category faq_category_enum NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    visible BOOLEAN NOT NULL
);
CREATE TABLE IF NOT EXISTS activity (
    activity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(250) NOT NULL,
    activity_category activity_category_enum NOT NULL,
    meta_description VARCHAR(160),
    thumbnail_image_url TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
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
    etnews_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(250) NOT NULL,
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
    blog_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(250) NOT NULL,
    thumbnail_image_url TEXT NOT NULL,
    blog_author VARCHAR(60) NOT NULL,
    meta_description TEXT NOT NULL,
    visible BOOLEAN NOT NULL,
    content TEXT NOT NULL CHECK (length(content) >= 50),
    view_count INT DEFAULT 0,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS partner (
    partner_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_name TEXT NOT NULL,
    partner_category_name partner_category_enum NOT NULL DEFAULT 'Đối tác doanh nghiệp',
    avatar_url TEXT,
    short_description TEXT,
    email VARCHAR(320) NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    phone_number VARCHAR(11) CHECK (phone_number ~ '^0[0-9]{9}$'),
    visible BOOLEAN NOT NULL,
    note TEXT,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS application (
    application_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone_number VARCHAR(11) CHECK (phone_number ~ '^0[0-9]{9}$'),
    email VARCHAR(320) NOT NULL CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
    dob DATE NOT NULL DEFAULT '1990-01-01',
    gender gender_enum NOT NULL DEFAULT 'Nam',
    student_id VARCHAR NOT NULL DEFAULT '3123XXXXXXX',
    university VARCHAR NOT NULL DEFAULT 'Đại học Kinh tế TP.HCM',
    faculty VARCHAR NOT NULL DEFAULT 'Công nghệ thông tin kinh doanh',
    major VARCHAR NOT NULL DEFAULT 'Công nghệ thông tin',
    class VARCHAR NOT NULL DEFAULT 'ET0001',
    cv_type cv_type_enum NOT NULL,
    cv_link TEXT NOT NULL CHECK (cv_link ~* '^(https?|ftp)://[^\s/$.?#].[^\s]*$'),
    apply_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    round INT CHECK (round BETWEEN 1 AND 3) DEFAULT 1,
    application_status application_status_enum NOT NULL DEFAULT 'Pending',
    department_name department_enum NOT NULL,
    note TEXT,
    cohort_name VARCHAR(10) NOT NULL DEFAULT 'K49',
    reviewed_by UUID REFERENCES personnel(personnel_id) DEFAULT NULL,
    reviewed_on TIMESTAMP DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS recruitment (
    recruitment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_open BOOLEAN NOT NULL DEFAULT TRUE,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--Create trigger
CREATE OR REPLACE FUNCTION update_last_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_modified_on = CURRENT_TIMESTAMP;
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

CREATE TRIGGER update_last_modified_on
BEFORE UPDATE ON recruitment
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_column();