-- Crear la base de datos
CREATE DATABASE YouPark;
GO

-- Usar la base de datos
USE YouPark;
GO

-- Tabla de tipos de vehículos
CREATE TABLE Vehicles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    type VARCHAR(10) NOT NULL UNIQUE CHECK (type IN ('Moto', 'Carro'))
);
GO

-- Tabla de roles
CREATE TABLE Roles (
    id INT IDENTITY(1,1) PRIMARY KEY,
    description VARCHAR(50) NOT NULL UNIQUE CHECK (description IN ('Administrator', 'Resident'))
);
GO

-- Tabla de usuarios
CREATE TABLE Users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    identification_number VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    apartment_number VARCHAR(10) NOT NULL,
    tower VARCHAR(10) NULL,
    password_hash VARCHAR(255) NOT NULL,
    active BIT DEFAULT 1,
    vehicle1_id INT NULL,
    vehicle2_id INT NULL,
    FOREIGN KEY (vehicle1_id) REFERENCES Vehicles(id),
    FOREIGN KEY (vehicle2_id) REFERENCES Vehicles(id)
);
GO

-- Tabla de invitados
CREATE TABLE Guests (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,  
    name VARCHAR(100) NOT NULL,
    identification_number VARCHAR(20) NOT NULL,
    vehicle_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(id)
);
GO

-- Tabla de estados de reservas
CREATE TABLE ReservationStatus (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE CHECK (name IN ('Active', 'Cancelled', 'Expired', 'Completed'))
);
GO

-- Tabla de celdas de parqueadero
CREATE TABLE ParkingSlot (
    id INT IDENTITY(1,1) PRIMARY KEY,
    slot_number VARCHAR(10) NOT NULL UNIQUE,
    vehicle_type_id INT NOT NULL,  -- Relación con VehicleTypes
    location VARCHAR(50) NOT NULL,
    status BIT NOT NULL DEFAULT 1,  -- 1 = Active, 0 = Inactive
    FOREIGN KEY (vehicle_type_id) REFERENCES Vehicles(id)
);
GO

-- Tabla de reservas
CREATE TABLE Reservations (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NULL, 
    guest_id INT NULL, 
    slot_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    reservation_date DATETIME DEFAULT GETDATE(),
    check_in DATETIME NULL,
    check_out DATETIME NULL,
    status_id INT NOT NULL, -- Relación con ReservationStatuses
    grace_period DATETIME DEFAULT DATEADD(HOUR, 2, GETDATE()), -- 2 horas de gracia
    qr_code VARCHAR(255) UNIQUE NULL, 
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (guest_id) REFERENCES Guests(id),
    FOREIGN KEY (slot_id) REFERENCES ParkingSlot(id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(id),
    FOREIGN KEY (status_id) REFERENCES ReservationStatus(id)
);
GO

-- Agregar la relación entre usuarios y roles
ALTER TABLE Users
ADD role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Roles(id);
GO
