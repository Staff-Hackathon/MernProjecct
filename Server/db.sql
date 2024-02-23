npm -v   
10.2.3
node -v
v20.10.0

mysql -u root -pmanager

use staffhackathon;
show tables;


create table user (
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

create table feedback (
    fid integer primary key auto_increment,
    uid integer,
    type varchar(50),
    course varchar(50),
    sdate date,
    edate date,
    rating float(3, 2)
);

create table Tfeedback (
    tid integer primary key auto_increment,
    fid integer,
    sid integer,
    Punctuality integer,
    queries_solved integer,
    Initiative integer,
    responsiveness integer,
    FOREIGN KEY (fid) REFERENCES feedback(fid),
    FOREIGN KEY (sid) REFERENCES user(id)
);


-- To clear mysql terminal screen \! cls

-- npm install bootstrap@5.3.3


