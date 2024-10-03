CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,  
    user_name VARCHAR(100),
    user_secondName VARCHAR(100),
    user_email VARCHAR(255) UNIQUE,
    user_phone BIGINT,
    user_password VARCHAR(255),
    user_role VARCHAR(50),
    cloudinaryPublicId VARCHAR(255),
    user_address VARCHAR(255),
    user_pinCode INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_images (
    userId INT, 
    imageUrl TEXT,
    imgPublicId VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(user_id) ON DELETE CASCADE 
);

CREATE TABLE cartAdded (
    userId INT,  
    cartItemId VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(user_id) ON DELETE CASCADE  );
