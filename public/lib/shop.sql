-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 11, 2019 at 08:59 AM
-- Server version: 5.7.24
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `client_data`
--

CREATE TABLE `client_data` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `class` int(11) NOT NULL DEFAULT '1',
  `fav_char` varchar(255) NOT NULL,
  `reg_time` date NOT NULL,
  `login_time` int(11) DEFAULT NULL,
  `last_login_time` date DEFAULT NULL,
  `last_purchase_time` date DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `client_data`
--

INSERT INTO `client_data` (`id`, `email`, `password`, `client_name`, `birthday`, `address`, `class`, `fav_char`, `reg_time`, `login_time`, `last_login_time`, `last_purchase_time`, `remark`) VALUES
(1, 'pete(10)@gmail.com', '1234', '黃彼得(10)', '1997-05-10', 'asdsgsdgvasdg', 10, 'Pooh', '2019-10-10', 1, NULL, NULL, NULL),
(2, 'pete(11)@gmail.com', '1234', '黃彼得(11)', '1997-05-11', 'asdsgsdgvasdg', 11, 'Pooh', '2019-10-11', 1, NULL, NULL, NULL),
(3, 'pete(12)@gmail.com', '1234', '黃彼得(12)', '1997-05-12', 'asdsgsdgvasdg', 12, 'Pooh', '2019-10-12', 1, NULL, NULL, NULL),
(4, 'pete(13)@gmail.com', '1234', '黃彼得(13)', '1997-05-13', 'asdsgsdgvasdg', 13, 'Pooh', '2019-10-13', 1, NULL, NULL, NULL),
(5, 'pete(14)@gmail.com', '1234', '黃彼得(14)', '1997-05-14', 'asdsgsdgvasdg', 14, 'Pooh', '2019-10-14', 1, NULL, NULL, NULL),
(6, 'pete(15)@gmail.com', '1234', '黃彼得(15)', '1997-05-15', 'asdsgsdgvasdg', 15, 'Pooh', '2019-10-15', 1, NULL, NULL, NULL),
(7, 'pete(16)@gmail.com', '1234', '黃彼得(16)', '1997-05-16', 'asdsgsdgvasdg', 16, 'Pooh', '2019-10-16', 1, NULL, NULL, NULL),
(8, 'pete(17)@gmail.com', '1234', '黃彼得(17)', '1997-05-17', 'asdsgsdgvasdg', 17, 'Pooh', '2019-10-17', 1, NULL, NULL, NULL),
(9, 'pete(18)@gmail.com', '1234', '黃彼得(18)', '1997-05-18', 'asdsgsdgvasdg', 18, 'Pooh', '2019-10-18', 1, NULL, NULL, NULL),
(10, 'pete(19)@gmail.com', '1234', '黃彼得(19)', '1997-05-19', 'asdsgsdgvasdg', 19, 'Pooh', '2019-10-19', 1, NULL, NULL, NULL),
(11, 'aaa@gmail.com', 'aaaaaaaa', 'Chuan-Hsin', '2019-10-30', 'Taipei, Taiwan, Min-Chuan East Rd. Sec. 3 No.25XinYi110', 1, 'none', '2019-11-11', NULL, NULL, NULL, NULL),
(12, 'aaa4@gmail.com', 'kkkkkkkk', 'Chuan-Hsin', '2019-10-28', 'Taipei, Taiwan, Min-Chuan East Rd. Sec. 3 No.25Min-Chuan East Rd. Sec. 3 No.25XinYi110', 1, 'none', '2019-11-11', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `good`
--

CREATE TABLE `good` (
  `id` int(10) NOT NULL,
  `good_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `whole_price` varchar(255) NOT NULL,
  `vendor_price` varchar(255) NOT NULL,
  `create_time` date NOT NULL,
  `stock` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `character_on` varchar(255) NOT NULL,
  `intro` text NOT NULL,
  `pic_out` varchar(255) DEFAULT NULL,
  `pic_in1` varchar(255) DEFAULT NULL,
  `pic_in2` varchar(255) DEFAULT NULL,
  `pic_in3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `good`
--

INSERT INTO `good` (`id`, `good_id`, `product_name`, `whole_price`, `vendor_price`, `create_time`, `stock`, `category`, `character_on`, `intro`, `pic_out`, `pic_in1`, `pic_in2`, `pic_in3`) VALUES
(1, 10000, '阿爾卑斯山 H2 小牛皮維尼零錢袋', '100', '200', '2019-11-01', '12', 'doll', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/poohCoinPurse.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg'),
(2, 10001, '維尼愛地球環保飲料提袋', '300', '500', '2019-11-02', '105', 'bag', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/poohCupBag.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg'),
(3, 10002, '輕巧隨身維尼雜物包', '15', '15', '2019-11-11', '10', 'None', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/poohKeyBag.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg'),
(4, 10003, '維尼大洪水方舟濕紙巾', '10', '10', '2019-11-11', '10', 'None', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/poohWetWipes.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg'),
(5, 10004, 'TSUM 陶瓷異鞍環填料 杯墊', '20', '20', '2019-11-11', '10', 'None', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/tsumCoaster.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg'),
(6, 10005, '玉山 H9 小牛皮維尼零錢袋', '30', '30', '2019-11-11', '10', 'None', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/poohCoinPurse.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg'),
(7, 10006, '維尼愛地球環保飲料提袋', '40', '40', '2019-11-11', '10', 'None', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/poohCupBag.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg'),
(8, 10007, '隨身維尼鑰匙包', '50', '50', '2019-11-11', '10', 'None', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/poohKeyBag.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg'),
(9, 10008, '維尼大瀑布方舟濕紙巾', '60', '60', '2019-11-11', '10', 'None', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/poohWetWipes.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg'),
(10, 10009, 'TSUM 玻璃陶瓷杯墊', '70', '70', '2019-11-11', '10', 'None', 'Pooh', '超級可愛的，而且也很軟很Q很好摸！8種百變表情，轉出好心情！ 360度旋轉指環x超質感詢問度NO.1精品! 合金鑄造的指環，結實耐用! 精緻壓克力硬殼面結合TPU軟邊，防護更細緻! 迪士尼經典影星，精緻支架殼!', '/images/good/tsumCoaster.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg', '/images/good/pic123.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_record`
--

CREATE TABLE `purchase_record` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `good_id` int(11) NOT NULL,
  `purchase_quantity` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `purchase_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `purchase_record`
--

INSERT INTO `purchase_record` (`id`, `client_id`, `good_id`, `purchase_quantity`, `address`, `purchase_time`) VALUES
(1, 10, 10000, 10, 'asdsgxchfdh', '2019-08-10'),
(2, 10, 10000, 11, 'asdsgxchfdh', '2019-08-11'),
(3, 10, 10000, 12, 'asdsgxchfdh', '2019-08-12'),
(4, 10, 10000, 13, 'asdsgxchfdh', '2019-08-13'),
(5, 10, 10000, 14, 'asdsgxchfdh', '2019-08-14'),
(6, 10, 10001, 15, 'asdsgxchfdh', '2019-08-15'),
(7, 10, 10001, 16, 'asdsgxchfdh', '2019-08-16'),
(8, 10, 10001, 17, 'asdsgxchfdh', '2019-08-17'),
(9, 10, 10000, 18, 'asdsgxchfdh', '2019-08-18'),
(10, 10, 10000, 19, 'asdsgxchfdh', '2019-08-19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client_data`
--
ALTER TABLE `client_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `good`
--
ALTER TABLE `good`
  ADD PRIMARY KEY (`id`),
  ADD KEY `good_id` (`good_id`);

--
-- Indexes for table `purchase_record`
--
ALTER TABLE `purchase_record`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client_data`
--
ALTER TABLE `client_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `good`
--
ALTER TABLE `good`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `purchase_record`
--
ALTER TABLE `purchase_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
