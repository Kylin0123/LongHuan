SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS longhuan;
USE longhuan;
SHOW DATABASES;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `openid` varchar(32) NOT NULL,		  	/* 用户openid */
  `username` varchar(32) DEFAULT NULL,      /* 用户名 */
  `age` int DEFAULT NULL,          			/* 用户年龄 */
  `gender` bool DEFAULT NULL,      			/* 用户性别，true表示男，false表示女 */
  `phone` varchar(32) DEFAULT NULL, 		/* 用户电话 */
  `wx_id` varchar(32) DEFAULT NULL, 		/* 用户微信id */
  `email` varchar(32) DEFAULT NULL, 		/* 用户电子邮箱 */
  `personal_info` varchar(200) ,            /* 自我描述 */
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

SHOW TABLES;

INSERT INTO `user`(openid, username, age, gender, phone, wx_id, email, personal_info) 
VALUES ('1', '管理员1', 100, true, '12345678901', "wx_id_0001", "12345678@sample.com", "我是管理员1"),
('2', '管理员2', 100, true, '12345678902', "wx_id_0002", "12345678@sample.com", "我是管理员2"),
('3', '管理员3', 100, true, '12345678903', "wx_id_0003", "12345678@sample.com", "我是管理员3");

DROP TABLE IF EXISTS `lesson`;

CREATE TABLE `lesson` (
  `id` int NOT NULL AUTO_INCREMENT,  	/* 课程id */
  `name` varchar(32) NOT NULL,       	/* 课程名称 */
  `residual_num` int NOT NULL,        	/* 课程剩余人数 */
  `total_num` int NOT NULL,          	/* 课程总人数 */
  `price` varchar(32) NOT NULL,      	/* 课程价格 */
  `desc_info` varchar(200) NOT NULL,    /* 课程描述 */
  `title` varchar(32) NOT NULL,      	/* 新品、火热 */
  `image` varchar(50) NOT NULL,      	/* 图片 */
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

INSERT INTO `lesson`(id, `name`, residual_num, total_num, price, desc_info, title, image)
VALUES (1,'咖啡培训1', 100, 100, '免费', '咖啡培训的介绍和描述在此', '新品', ''),
(2,'家政培训1', 100, 100, '免费', '家政培训的介绍和描述在此', '火热', ''),
(3,'糕点培训1', 100, 100, '免费', '糕点培训的介绍和描述在此', '火热', ''),
(4,'糕点培训2', 100, 100, '免费', '糕点培训的介绍和描述在此', '火热', ''),
(5,'糕点培训3', 100, 100, '免费', '糕点培训的介绍和描述在此', '火热', '');


SELECT * FROM user;

DROP TABLE IF EXISTS `user_join_lesson`;

CREATE TABLE `user_join_lesson` (
    `user_openid` varchar(32) REFERENCES `user`(openid),
    `lesson_id` int REFERENCES `lesson`(id),
    PRIMARY KEY (`user_openid`, `lesson_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_join_lesson`(user_openid, lesson_id)
VALUES(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1),
(2, 2);

SELECT * from `user_join_lesson`;

SELECT * FROM user_join_lesson u LEFT JOIN lesson l ON u.lesson_id=l.id;