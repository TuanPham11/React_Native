-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 03, 2025 lúc 04:06 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `example05`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `addresses`
--

CREATE TABLE `addresses` (
  `address_id` bigint(20) NOT NULL,
  `building_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `pincode` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `addresses`
--

INSERT INTO `addresses` (`address_id`, `building_name`, `city`, `country`, `pincode`, `state`, `street`) VALUES
(1, 'string', 'string', 'string', 'string', 'string', 'string'),
(5, 'Default Building', 'Default City', 'Default Country', '000000', 'Default State', 'Default Street');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `cart_id` bigint(20) NOT NULL,
  `total_price` double DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`cart_id`, `total_price`, `user_id`) VALUES
(1, 0, 1),
(2, 0, 2),
(13, 0, 20),
(14, 0, 21);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_item_id` bigint(20) NOT NULL,
  `discount` double NOT NULL,
  `product_price` double NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `cart_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'Winter special'),
(2, 'Decaff'),
(3, 'Chocolate'),
(4, 'Black Coffee'),
(5, 'New Category'),
(6, 'New  cat');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `order_date` date DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `email`, `order_date`, `order_status`, `total_amount`, `payment_id`) VALUES
(10, 'test1@gmail.com', '2024-11-05', 'Order Accepted !', 5.9399999999999995, 10),
(11, 'admin@gmail.com', '2024-11-05', 'Order Accepted !', 49.401, 11),
(12, 'admin@gmail.com', '2024-11-05', 'Order Accepted !', 16.731, 12),
(13, 'test1@gmail.com', '2024-11-05', 'Order Accepted !', 4.950000000000001, 13),
(14, 'test1@gmail.com', '2024-11-13', 'Order Accepted !', 4.950000000000001, 14),
(15, 'john@gmail.com', '2024-11-14', 'Order Accepted !', 7.92, 15),
(16, 'john@gmail.com', '2024-11-14', 'Order Accepted !', 5.94, 16),
(17, 'john@gmail.com', '2024-11-14', 'Order Accepted !', 7.92, 17);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` bigint(20) NOT NULL,
  `discount` double NOT NULL,
  `ordered_product_price` double NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `order_id` bigint(20) DEFAULT NULL,
  `product_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `discount`, `ordered_product_price`, `quantity`, `order_id`, `product_id`) VALUES
(12, 1, 5.94, 1, 10, 2),
(13, 1, 4.95, 3, 11, 1),
(14, 1, 6.93, 1, 11, 5),
(15, 1, 5.94, 2, 11, 2),
(16, 1, 4.95, 1, 11, 3),
(17, 1, 5.94, 1, 12, 2),
(18, 1, 4.95, 1, 13, 1),
(19, 1, 4.95, 1, 14, 1),
(20, 1, 7.92, 1, 15, 6),
(21, 1, 5.94, 1, 16, 4),
(22, 1, 7.92, 1, 17, 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments` (
  `payment_id` bigint(20) NOT NULL,
  `payment_method` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `payments`
--

INSERT INTO `payments` (`payment_id`, `payment_method`) VALUES
(1, 'credit_card'),
(2, 'credit_card'),
(3, 'credit_card'),
(4, 'credit_card'),
(5, 'credit_card'),
(6, 'credit_card'),
(7, 'credit_card'),
(8, 'credit_card'),
(9, 'credit_card'),
(10, 'credit_card'),
(11, 'credit_card'),
(12, 'credit_card'),
(13, 'credit_card'),
(14, 'credit_card'),
(15, 'credit_card'),
(16, 'credit_card'),
(17, 'credit_card');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `discount` double NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `special_price` double NOT NULL,
  `category_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `description`, `discount`, `image`, `price`, `product_name`, `quantity`, `special_price`, `category_id`) VALUES
(1, 'Black Coffee', 1, '0dd5d878-c426-48f8-aef7-d05b7741bc8b.jpg', 5, 'Black Coffee', 2, 4.95, 4),
(2, 'CAPPUCINO LATTE', 1, '3a90fecb-1861-41f7-ab26-e6aee17a314c.jpg', 6, 'CAPPUCINO LATTE', 3, 5.94, 1),
(3, 'SILKY CAFE AU LAIT ', 1, 'cba00af4-8fcd-43b7-be11-7556f955ac60.jpg', 5, 'SILKY CAFE AU LAIT ', 2, 4.95, 2),
(4, 'Iced Chocolate', 1, 'df11635b-c108-41cd-a0e1-7b15f375dfe4.jpg', 6, 'Iced Chocolate', 9, 5.94, 3),
(5, 'CAPPUCINO LATTEddcsv', 1, '33c5d397-69ff-44c6-b531-3f674e26d434.png', 7, 'CAPPUCINO LATTEddcsv', 8, 6.93, 4),
(6, 'Iced Chocolatezdv', 1, '07c48af8-09f0-487e-bca4-14da0b19525d.jpg', 8, 'Iced Chocolatezdv', 7, 7.92, 4),
(52, 'Latest model smartphone', 10, '7097f7db-75c2-432e-bf98-a80c8570813e.jpg', 499.99, 'Smartphone', 10, 449.991, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products_seq`
--

CREATE TABLE `products_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products_seq`
--

INSERT INTO `products_seq` (`next_val`) VALUES
(151);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `role_id` bigint(20) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(0, 'USER'),
(101, 'ADMIN'),
(102, 'USER');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `mobile_number` varchar(10) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `email`, `first_name`, `last_name`, `mobile_number`, `password`) VALUES
(1, 'admin@gmail.com', 'string', 'string', '1234567890', '$2a$10$5EQ9OIjLWCPZnOFboJhAdenpiTE9Pio98/ORK7M6UaACPfGho1Nf6'),
(2, 'viet@gmail.com', 'string', 'string', '1234567890', '$2a$10$WZj0nHfF90ty31RsrxR.fOl5NW0mirw8hFDmktrGj3TommC97P7Xi'),
(20, 'test1@gmail.com', 'nguyen', 'tester', '1234567890', '$2a$10$0/fUQT/L0cvTO0KShIRKEeBNkdX4SoGxMtdaPsAK8CBrke.zkEuC6'),
(21, 'john@gmail.com', 'johnn', 'deppt', '1234567899', '$2a$10$dw93JD71nbnsKY2jK22voe66DEObwFbNdxORhUt.FbC2nUvbmch0q');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_address`
--

CREATE TABLE `user_address` (
  `user_id` bigint(20) NOT NULL,
  `address_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_address`
--

INSERT INTO `user_address` (`user_id`, `address_id`) VALUES
(1, 1),
(2, 1),
(20, 5),
(21, 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_role`
--

CREATE TABLE `user_role` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user_role`
--

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES
(1, 101),
(2, 102),
(20, 102),
(21, 102);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`address_id`);

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `UK64t7ox312pqal3p7fg9o503c2` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD KEY `FKpcttvuq4mxppo8sxggjtn5i2c` (`cart_id`),
  ADD KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `UKhaujdjk1ohmeixjhnhslchrp1` (`payment_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  ADD KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Chỉ mục cho bảng `user_address`
--
ALTER TABLE `user_address`
  ADD KEY `FKpv7y2l6mvly37lngi3doarqhd` (`address_id`),
  ADD KEY `FKrmincuqpi8m660j1c57xj7twr` (`user_id`);

--
-- Chỉ mục cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKt7e7djp752sqn6w22i6ocqy6q` (`role_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `addresses`
--
ALTER TABLE `addresses`
  MODIFY `address_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  ADD CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK8aol9f99s97mtyhij0tvfj41f` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`payment_id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Các ràng buộc cho bảng `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `FKpv7y2l6mvly37lngi3doarqhd` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`),
  ADD CONSTRAINT `FKrmincuqpi8m660j1c57xj7twr` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FKj345gk1bovqvfame88rcx7yyx` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `FKt7e7djp752sqn6w22i6ocqy6q` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
