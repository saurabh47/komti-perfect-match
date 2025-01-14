INSERT INTO users (user_id,first_name , photo, is_deleted)
VALUES (-1,'anonymous', 'https://static.vecteezy.com/system/resources/previews/007/907/039/non_2x/handsome-man-character-wearing-hoodie-in-flat-cartoon-style-free-vector.jpg',TRUE);

INSERT INTO annual_incomes (id, value) VALUES (0, '-');
INSERT INTO annual_incomes (id, value) VALUES (1, 'Under Rs.50,000');
INSERT INTO annual_incomes (id, value) VALUES (2, 'Rs.50,001 - 1,00,000');
INSERT INTO annual_incomes (id, value) VALUES (3, 'Rs.1,00,001 - 2,00,000');
INSERT INTO annual_incomes (id, value) VALUES (4, 'Rs.2,00,001 - 3,00,000');
INSERT INTO annual_incomes (id, value) VALUES (5, 'Rs.3,00,001 - 4,00,000');
INSERT INTO annual_incomes (id, value) VALUES (6, 'Rs.4,00,001 - 5,00,000');
INSERT INTO annual_incomes (id, value) VALUES (7, 'Rs.5,00,001 - 6,00,000');
INSERT INTO annual_incomes (id, value) VALUES (8, 'Rs.6,00,001 - 7,00,000');
INSERT INTO annual_incomes (id, value) VALUES (9, 'Rs.7,00,001 - 8,00,000');
INSERT INTO annual_incomes (id, value) VALUES (10, 'Rs.8,00,001 - 9,00,000');
INSERT INTO annual_incomes (id, value) VALUES (11, 'Rs.9,00,001 - 10,00,000');
INSERT INTO annual_incomes (id, value) VALUES (12, 'Rs.10,00,001 - 12,00,000');
INSERT INTO annual_incomes (id, value) VALUES (13, 'Rs.12,00,001 - 15,00,000');
INSERT INTO annual_incomes (id, value) VALUES (14, 'Rs.15,00,001 - 20,00,000');
INSERT INTO annual_incomes (id, value) VALUES (15, 'Rs.20,00,001 - 25,00,000');
INSERT INTO annual_incomes (id, value) VALUES (16, 'Rs.25,00,001 - 30,00,000');
INSERT INTO annual_incomes (id, value) VALUES (17, 'Rs.30,00,001 and above');
INSERT INTO annual_incomes (id, value) VALUES (25, 'Under $25,000');
INSERT INTO annual_incomes (id, value) VALUES (26, '$25,001 - 50,000');
INSERT INTO annual_incomes (id, value) VALUES (27, '$50,001 - 75,000');
INSERT INTO annual_incomes (id, value) VALUES (28, '$75,001 - 100,000');
INSERT INTO annual_incomes (id, value) VALUES (29, '$100,001 - 125,000');
INSERT INTO annual_incomes (id, value) VALUES (30, '$125,001 - 150,000');
INSERT INTO annual_incomes (id, value) VALUES (31, '$150,001 - 175,000');
INSERT INTO annual_incomes (id, value) VALUES (32, '$175,001 - 200,000');
INSERT INTO annual_incomes (id, value) VALUES (33, '$200,001 and above');


INSERT INTO heights (id, value) VALUES
(0, 'Select'),
(1, '4\' 5" (1.35 mts)'),
(2, '4\' 6" (1.37 mts)'),
(3, '4\' 7" (1.40 mts)'),
(4, '4\' 8" (1.42 mts)'),
(5, '4\' 9" (1.45 mts)'),
(6, '4\' 10" (1.47 mts)'),
(7, '4\' 11" (1.50 mts)'),
(8, '5\' 0" (1.52 mts)'),
(9, '5\' 1" (1.55 mts)'),
(10, '5\' 2" (1.58 mts)'),
(11, '5\' 3" (1.60 mts)'),
(12, '5\' 4" (1.63 mts)'),
(13, '5\' 5" (1.65 mts)'),
(14, '5\' 6" (1.68 mts)'),
(15, '5\' 7" (1.70 mts)'),
(16, '5\' 8" (1.73 mts)'),
(17, '5\' 9" (1.75 mts)'),
(18, '5\' 10" (1.78 mts)'),
(19, '5\' 11" (1.80 mts)'),
(20, '6\' 0" (1.83 mts)'),
(21, '6\' 1" (1.85 mts)'),
(22, '6\' 2" (1.88 mts)'),
(23, '6\' 3" (1.91 mts)'),
(24, '6\' 4" (1.93 mts)'),
(25, '6\' 5" (1.96 mts)'),
(26, '6\' 6" (1.98 mts)'),
(27, '6\' 7" (2.01 mts)'),
(28, '6\' 8" (2.03 mts)'),
(29, '6\' 9" (2.06 mts)'),
(30, '6\' 10" (2.08 mts)'),
(31, '6\' 11" (2.11 mts)'),
(32, '7\' (2.13 mts) plus');

UPDATE heights 
SET height_cm = CASE id
	WHEN 0 THEN 0
    WHEN 1 THEN 135
    WHEN 2 THEN 137
    WHEN 3 THEN 140
    WHEN 4 THEN 142
    WHEN 5 THEN 145
    WHEN 6 THEN 147
    WHEN 7 THEN 150
    WHEN 8 THEN 152
    WHEN 9 THEN 155
    WHEN 10 THEN 158
    WHEN 11 THEN 160
    WHEN 12 THEN 163
    WHEN 13 THEN 165
    WHEN 14 THEN 168
    WHEN 15 THEN 170
    WHEN 16 THEN 173
    WHEN 17 THEN 175
    WHEN 18 THEN 178
    WHEN 19 THEN 180
    WHEN 20 THEN 183
    WHEN 21 THEN 185
    WHEN 22 THEN 188
    WHEN 23 THEN 191
    WHEN 24 THEN 193
    WHEN 25 THEN 196
    WHEN 26 THEN 198
    WHEN 27 THEN 201
    WHEN 28 THEN 203
    WHEN 29 THEN 206
    WHEN 30 THEN 208
    WHEN 31 THEN 211
    WHEN 32 THEN 213
END;

INSERT INTO education_areas (id, value) VALUES
(0, 'Select'),
(1, 'Advertising/ Marketing'),
(2, 'Administrative services'),
(3, 'Architecture'),
(4, 'Armed Forces'),
(5, 'Arts'),
(6, 'Commerce'),
(7, 'Computers/ IT'),
(8, 'Education'),
(9, 'Engineering/ Technology'),
(10, 'Fashion'),
(11, 'Finance'),
(12, 'Fine Arts'),
(13, 'Home Science'),
(14, 'Law'),
(15, 'Management'),
(16, 'Medicine'),
(17, 'Nursing/ Health Sciences'),
(18, 'Office administration'),
(19, 'Science'),
(20, 'Shipping'),
(21, 'Travel & Tourism'),
(22, 'Design');