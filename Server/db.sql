create table user (
    id integer primary key auto_increment,
    firstName varchar(50),
    lastName varchar(50),
    email varchar(50),
    password varchar(100),
    profileImage varchar(100),
    createdTime timestamp default CURRENT_TIMESTAMP, 
    role varchar(10)
);

create table feedback (
    fid integer primary key auto_increment,
    uid integer,
    type varchar(50),
    course varchar(50),
    sdate date,
    edate date
);