CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `age` varchar(255) NULL,
  `annual_income` int(11) NULL,
  `birth_name` varchar(255) NULL,
  `birth_place` varchar(255) NULL,
  `birth_time` varchar(255) NULL,
  `blood_group` varchar(255) NULL,
  `brother_details` varchar(255) NULL,
  `caste` varchar(255) NULL,
  `children` int(11) NULL,
  `complexion` varchar(255) NULL,
  `dob` varchar(255) DEFAULT NULL,
  `education_area` int(11) NULL,
  `education_details` varchar(255) NULL,
  `education_title` int(11) NULL,
  `email_id` varchar(255) NULL,
  `father_name` varchar(255) NULL,
  `father_occupation` varchar(255) NULL,
  `first_gotra` varchar(255) NULL,
  `first_name` varchar(255) NULL,
  `gender` varchar(255) NULL,
  `height` int(11) NULL,
  `hobbies` text NULL,
  `last_name` varchar(255) NULL,
  `marital_status` int(11) NULL,
  `mother_name` varchar(255) NULL,
  `mother_occupation` varchar(255) NULL,
  `mother_tongue` varchar(255) NULL,
  `no_of_brothers` int(11) NULL,
  `no_of_sisters` int(11) NULL,
  `occupation` varchar(255) NULL,
  `per_address` varchar(255) NULL,
  `per_city` varchar(255) NULL,
  `per_contact_number` varchar(255) NULL,
  `per_country` varchar(255) NULL,
  `per_state` varchar(255) NULL,
  `photo` varchar(255) NULL,
  `prtnr_Occupation` varchar(255) NULL,
  `prtnr_age_max` int(11) NULL,
  `prtnr_age_min` int(11) NULL,
  `prtnr_city` varchar(255) NULL,
  `prtnr_complexion` varchar(255) NULL,
  `prtnr_height` int(11) NULL,
  `prtnr_income` int(11) NULL,
  `prtnr_qualification` varchar(255) NULL,
  `religion` varchar(255) NULL,
  `res_address` varchar(255) NULL,
  `res_city` varchar(255) NULL,
  `res_contact_number` varchar(255) NULL,
  `res_country` varchar(255) NULL,
  `res_state` varchar(255) NULL,
  `res_status` varchar(255) NULL,
  `second_gotra` int(11) NULL,
  `sister_details` varchar(255) NULL,
  `special_cases` int(11) NULL,
  `sub_caste` varchar(255) NULL,
  `is_deleted` tinyint(1) NULL DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `annual_incomes` (
  `id` int(11) NOT NULL,
  `value` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `heights` (
  `id` int(11) NOT NULL,
  `value` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user_sessions` (
    `session_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `selected_gender` VARCHAR(1) NOT NULL,
    `profile_filters` JSON,
    `row_created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `row_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user_actions` (
    `session_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `action` ENUM('LIKE', 'DISLIKE', 'SAVE') NOT NULL,
    `row_created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `row_updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`session_id`, `user_id`, `action`),
    FOREIGN KEY (`session_id`) REFERENCES USER_SESSIONS(`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `education_areas` (
    `id` INT PRIMARY KEY,
    `value` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;