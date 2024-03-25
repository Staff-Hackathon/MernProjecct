npm -v   
10.2.3
node -v
v20.10.0

mysql -u root -pmanager

use staffhackathon;
show tables;


CREATE TABLEuser (
    id integer primary key auto_increment,
    firstName varchar(50),
    lastName varchar(50),
    email varchar(50),
    password varchar(100),
    profileImage varchar(100),
    createdTime timestamp default CURRENT_TIMESTAMP, 
    role varchar(10),
    course varchar(20)
);

CREATE TABLEfeedback (
    fid integer primary key auto_increment,
    uid integer,
    type varchar(50),
    course varchar(50),
    sdate date,
    edate date,
    rating float(3, 2),
    FOREIGN KEY (uid) REFERENCES user(id)
);

CREATE TABLETfeedback (
    tid integer primary key auto_increment,
    fid integer,
    sid integer,
    Punctuality integer,
    queries_solved integer,
    Initiative integer,
    responsiveness integer,
    total float(3, 2),
    FOREIGN KEY (fid) REFERENCES feedback(fid),
    FOREIGN KEY (sid) REFERENCES user(id)
);

CREATE TABLE course (
    cid integer primary key auto_increment,
    cname varchar(50)
);
INSERT INTO course values(1, 'OM-58'), (2, 'PH-27'), (3, 'PM-30');

DELIMITER //
CREATE TRIGGER after_tfeedback_insert
AFTER INSERT ON tfeedback
FOR EACH ROW
BEGIN
    DECLARE avg_rating DECIMAL(10,2);
    SELECT AVG(total) INTO avg_rating FROM tfeedback;

    UPDATE feedback SET rating = avg_rating WHERE fid = NEW.fid;
END;
//
DELIMITER ;


-- To clear mysql terminal screen \! cls

-- npm install bootstrap@5.3.3


