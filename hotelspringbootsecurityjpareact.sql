CREATE USER IF NOT EXISTS jwduser IDENTIFIED BY 'pass';

DROP DATABASE IF EXISTS hotelspringbootsecurityjpareact;
CREATE DATABASE hotelspringbootsecurityjpareact DEFAULT CHARACTER SET utf8;

USE hotelspringbootsecurityjpareact;

GRANT ALL ON hotelspringbootsecurityjpareact.* TO 'jwduser'@'%';

FLUSH PRIVILEGES;