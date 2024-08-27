-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_locked BOOLEAN DEFAULT FALSE,
    lock_until DATETIME,
    failed_attempts INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'tokens' table
CREATE TABLE IF NOT EXISTS tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'one_time_links' table
CREATE TABLE IF NOT EXISTS one_time_links (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'config' table
CREATE TABLE IF NOT EXISTS config (
    `key` VARCHAR(255) PRIMARY KEY,
    value VARCHAR(255) NOT NULL
);

-- Insert initial configuration data into the 'config' table
INSERT INTO config (`key`, value) VALUES
    ('LOCK_ATTEMPTS', '5'),
    ('LINK_VALIDITY', '15')
ON DUPLICATE KEY UPDATE value = VALUES(value);
