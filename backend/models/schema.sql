CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    age INT,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    image_doctor VARCHAR(255) NOT NULL,
    specialization_doctor INT,  
    deletedAt DATE NULL,
    role_id INT,
    FOREIGN KEY (specialization_doctor) REFERENCES specialization(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

 CREATE TABLE roles (
id SERIAL PRIMARY KEY,
name_role VARCHAR(255) NOT NULL
);

CREATE TABLE specialization (
    id SERIAL PRIMARY KEY,
    name_specialization VARCHAR(255) NOT NULL,
    image_specialization VARCHAR(255) NOT NULL
);


CREATE TABLE clinics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_clinic VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    long_description VARCHAR(255) NOT NULL,
    time_open TIME NOT NULL,
    time_close TIME NOT NULL,
    specialization INT NOT NULL,
    open_days VARCHAR(255)[], 
    doctor_id INT,
    FOREIGN KEY (specialization) REFERENCES specialization(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);


CREATE TABLE appointment (
    id SERIAL PRIMARY KEY,
    date_time TIMESTAMP,
    status VARCHAR(255),
    user_id INT, 
    clinic_id INT, 
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(id)
);

CREATE TABLE diagnostics (
    id SERIAL PRIMARY KEY,
    diagnostics VARCHAR(255),
    image_diagnostics VARCHAR(255),
    user_id INT,  
    doctor_id INT,
    clinic_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(id)
);
 
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    rating SMALLINT,
    comment TEXT,
    rating_date TIMESTAMP,
    clinic_id INT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (clinic_id) REFERENCES clinics(id)
);

CREATE TABLE contactus (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    comment VARCHAR(255) NOT NULL
);
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


------
-- changes 
-- status == urgent page http://localhost:5173/appointment/5
-----------
-- <form id="workingDaysForm">
--     <input type="checkbox" name="days[]" value="Saturday"> Saturday<br>
--     <input type="checkbox" name="days[]" value="Sunday"> Sunday<br>
--     <input type="checkbox" name="days[]" value="Monday"> Monday<br>
--     <input type="checkbox" name="days[]" value="Tuesday"> Tuesday<br>
--     <input type="checkbox" name="days[]" value="Wednesday"> Wednesday<br>
--     <input type="checkbox" name="days[]" value="Thursday"> Thursday<br>
--     <input type="checkbox" name="days[]" value="Friday"> Friday<br>
--     <button type="submit">Save</button>
-- </form>
-------------