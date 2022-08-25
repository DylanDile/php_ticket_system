-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2022 at 02:35 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ticket_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
                           `id` int(11) UNSIGNED NOT NULL,
                           `title` varchar(120) NOT NULL,
                           `description` text DEFAULT NULL,
                           `user_id` varchar(120) DEFAULT NULL,
                           `status` varchar(20) NOT NULL,
                           `date_submitted` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `title`, `description`, `user_id`, `status`, `date_submitted`) VALUES
                                                                                                (17, 'Doloremque ea pariat', 'Nostrum exercitation', '1', 'closed', '2022-08-25'),
                                                                                                (18, 'Sit enim voluptas cu', 'Commodo enim consect', '1', 'open', '2022-08-25'),
                                                                                                (19, 'Suscipit vero conseq', 'Ut in aut adipisci n', '2', 'open', '2022-08-25'),
                                                                                                (20, 'Dolor ipsum adipisic', 'Voluptatum nulla aut', '2', 'open', '2022-08-25'),
                                                                                                (21, 'Consequatur Officii', 'Eiusmod qui rerum mi', '2', 'open', '2022-08-25');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
                         `id` int(10) UNSIGNED NOT NULL,
                         `name` varchar(50) NOT NULL,
                         `surname` varchar(50) DEFAULT NULL,
                         `username` varchar(50) NOT NULL,
                         `password` text NOT NULL,
                         `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `username`, `password`, `created_at`) VALUES
                                                                                        (1, 'James', 'Peters', 'admin', 'password', '2022-08-24'),
                                                                                        (2, 'John', 'Doe', 'user', 'password', '2022-08-24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
    MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
