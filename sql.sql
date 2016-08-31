-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `miyv2`
--

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `blog`
--

CREATE TABLE IF NOT EXISTS `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` mediumtext COLLATE utf8_unicode_ci,
  `status` int(11) DEFAULT NULL,
  `post_by` int(11) DEFAULT NULL,
  `cat_by` int(11) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_by` (`post_by`),
  KEY `cat_by` (`cat_by`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=17 ;

--
-- dump ตาราง `blog`
--


-- --------------------------------------------------------

--
-- โครงสร้างตาราง `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=11 ;

--
-- dump ตาราง `category`
--

INSERT INTO `category` (`id`, `name`, `status`) VALUES
(1, 'ทั่วไป ', 1),
(9, 'test', 1),
(10, 'test2', 1);

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `group`
--

CREATE TABLE IF NOT EXISTS `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `color` varchar(8) COLLATE utf8_unicode_ci DEFAULT NULL,
  `img` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- dump ตาราง `group`
--

INSERT INTO `group` (`id`, `name`, `color`, `img`) VALUES
(1, 'Administrator', '#000', ' '),
(2, 'Moderator', '#000', ' '),
(3, 'Member', '#000', ' '),
(4, 'Ban', '#000', ' ');

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `member`
--

CREATE TABLE IF NOT EXISTS `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `sesLogin` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `log` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=9 ;

--
-- dump ตาราง `member`
--

INSERT INTO `member` (`id`, `username`, `password`, `email`, `group_id`, `sesLogin`, `log`) VALUES
(1, 'Admin', 'c6f057b86584942e415435ffb1fa93d4', 'test@test.com', 1, '9235626', 'tb7dt48rnft5jceih2eea0uh43'),

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `reply`
--

CREATE TABLE IF NOT EXISTS `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `post_by` int(11) DEFAULT NULL,
  `reply_to` int(11) DEFAULT NULL,
  `blog_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_by` (`post_by`),
  KEY `reply_to` (`reply_to`),
  KEY `blog_id` (`blog_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- โครงสร้างตาราง `setting`
--

CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tag` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `switch` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- dump ตาราง `setting`
--

INSERT INTO `setting` (`id`, `title`, `tag`, `switch`) VALUES
(1, 'ทดสอบหัวเว็บไซต์', 'แท็ก1,แท็ก1,แท็ก1,แท็ก1,แท็ก1', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`post_by`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `blog_ibfk_2` FOREIGN KEY (`cat_by`) REFERENCES `category` (`id`);

--
-- Constraints for table `member`
--
ALTER TABLE `member`
  ADD CONSTRAINT `member_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);

--
-- Constraints for table `reply`
--
ALTER TABLE `reply`
  ADD CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`post_by`) REFERENCES `member` (`id`),
  ADD CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`reply_to`) REFERENCES `reply` (`id`),
  ADD CONSTRAINT `reply_ibfk_3` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
