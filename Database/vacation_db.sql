-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2023 at 03:12 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_db`
--
CREATE DATABASE IF NOT EXISTS `vacation_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation_db`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `linkId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`linkId`, `userId`, `vacationId`) VALUES
(49, 3, 3),
(50, 3, 4),
(51, 8, 4),
(52, 8, 6),
(61, 3, 48),
(62, 3, 40),
(65, 3, 46),
(73, 9, 42),
(74, 9, 45),
(75, 9, 5),
(76, 9, 4);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleDescription` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleDescription`) VALUES
(1, 'User'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `mailAddress` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `mailAddress`, `password`, `roleId`) VALUES
(3, 'Bart', 'Simpson', 'ed37a0ee76b6fdc4b0aa488fc3501ba1320b4aed844afc4b664aea158821d2eb638f2a3f4d5648394338329307c79a580bffed9bfa44b306060f4ec529ec1a1c', '7f8b7ca3ddac8fdb1cd6e7f6971fc0b311d4b855d4c4f7408c190f8887b01b559e048144caf753985a5e56ccbe28f954ccb4b8815623c9eeaee35b3e1b00474d', 1),
(4, 'Lisa', 'Simpson', '5bfa3b87f3107298604f8f93fa8d63de2fdd2a13b25fb995d3ddb4cd9d34b0e32334f6588c0e4db157fbf26932aba60775de0e2c8f294b81969216ad77e46f90', '4979c95a0ef2ee1a97e5686a85f908b9a475a1b1144b98ee8940e7a77708d33ce9f54f32dab5b94b9ac4a3885640868348715cbb566f27fbde38463d964b6bb3', 2),
(8, 'Homer', 'Simpson', 'b2c3f4e68a9a9a0bd9993c9715fda057a123796cb634758447f328507748fb2df9a15046369d93c5cb199c3fc39d14f092d7c005a7fae14b9aacec22966b3793', 'c6fd30b4c6cf62b2409c7edfbad41a2454dc0230280463fddc8321fcec059b8c13876646a2f967a89c1af536e85f062e9b422bb29ba895b12e8ad1632ac8528c', 1),
(9, 'Marge', 'Simpson', '925ae4423774fd580c09d2ef488de8b7087c4d6ca5ee63ea685e5711568c718776ce7c795e215793ddb23847feeab16588c1e7083efece914e05ad84161a8838', 'bee2853252b460c9f38e88f04ae7dd94e675bc5523b3d87a2887075bb59af3d5a5c8fe0f6b361048bf319a23c53f99de424858091125985e787c07994f56bd54', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(3, 'Antalya', 'The Waterworld resort is a 5-star all-inclusive resort. It is located near the beach of the clear waters of the Mediterranean Sea, in the city of Bogazkent, and hence its name, the site offers a large, colorful, special and other water park. Slides, pools and water amusements, the water park is designed to surprise and amaze you.... From the culinary point of view, the hotel redefines the concept of all inclusive - for the ultimate all inclusive! The vacation begins with a sweet treat, continues with endless food and beverage services in a wide variety of styles of Latin, Asian, Italian, Turkish and seafood food. The best location is reserved for the spa, due to its importance. Wonderful massages, extraordinary treatments, and a commitment to the beauty and relaxation of the guests. The vacation at Waterworld offers a huge variety of stimuli, options and treats. You won\'t want to leave....12 km from Serik 40 km from Antalya Airport 50 km from Antalya city center', '2023-08-27', '2023-08-31', '662.00', 'f615ca2a-835f-4f02-97d7-2820ba27cd83.jpg'),
(4, 'Batumi', 'Hotel Monarch is a Georgian brand of four-star business hotel. Multinational rooms, allowing the guest to easily choose the desired room, also, guests can organize business meetings on the spot, the conference room is available for 60-80 people. It is suitable for business travel as well as leisure travel. A continental buffet breakfast is served at the hotel. Monarch Hotel is located in the central historical part of Batumi, the 60-room hotel is surrounded by natural beauty, narrow cube-shaped streets and 19th century houses, Batumi International Airport is 6 km away.', '2023-07-30', '2023-08-03', '651.00', '8e937ee8-e395-4c39-b693-cdcdcb0d18bc.jpg'),
(5, 'Crete', 'A family owned and managed hotel that offers high standards combined with traditional Cretan hospitality and a friendly atmosphere. The hotel has two swimming pools, a health center, two restaurants and a modern meeting room. The hotel is especially suitable for couples and families with children. 20 meters from the beach. Choronissos at a 5-minute walk from the hotel. The nearest bus stop is 350 m away. 35 km from Heraklion airport.', '2023-08-01', '2023-08-04', '700.00', '46ffb629-b7f0-4018-a1f3-fc578f939046.jpg'),
(6, 'Rhodes', 'The Lydia Maris Hotel is nestled among green gardens and places special emphasis on peace, tranquility and guest comfort. The hotel underwent an extensive renovation and upgrade in 2006, offering more facilities, services and activities, and at a particularly high level. The professional hotel staff is at the service of the guests and will make sure that every stay at the hotel is engraved in the memory. 28 km to the airport. 25 km to the seaport. 25 km to the old city. 7 km to the golf course (Afadou Golf). 4 km to Tsambika beach.', '2023-08-01', '2023-08-05', '925.00', '639fdf8e-ebb3-4098-90ff-58fabe85f7aa.jpg'),
(40, 'Budapest', 'The hotel lies in a central location in the heart of Budapest, just minutes away from the pedestrian area of V?ci utca. Plenty of shopping venues, delightful restaurants and bars are all to be found in the hotel\'s vicinity. The nearest underground station, Ferenciek Tere, and the famous Elisabeth Bridge lie only 100 metres away from the hotel. The airport is reached within 30 minutes with the convenient public transport links.FacilitiesThe hotel features 85 accommodation units. Guests of the hotel are welcomed in the lobby, which has a 24-hour reception and a 24-hour check-out service. A lift provides easy access to the upper floors. Amenities include a baggage storage service and a safe. Internet access and wireless internet access are available in the public areas. Gastronomic options include a restaurant and a bar. Parking facilities available to guests include a garage and a car park. Bicycles can be left in the bicycle storage area. Other services include a laundry. Active guests can make use of the bicycle hire service to explore the surrounding area. In addition, a business centre and a fax machine are also available.RoomsAll rooms feature air conditioning, central heating and a bathroom. A minibar is also available. The accommodation units offer a range of amenities, including a fridge. A telephone, a TV, a radio and wireless internet access are provided as standard. In each of the bathrooms, guests will find a shower, a bathtub and a hairdryer.', '2023-06-13', '2023-05-17', '536.00', '284cb6b0-54a1-4adc-b57a-f053dfdb1746.jpeg'),
(42, 'Bucharest', 'A stay at Centre Ville Aparthotel places you in the heart of Bucharest, walking distance from National Museum of Art of Romania and Romanian Athenaeum. This 4-star hotel is within close proximity of Central University Library and Yeshua Tova Synagogue.\r\n', '2023-05-20', '2023-05-23', '731.00', 'be9d5f3c-bf45-44c0-96e6-ed32c9c31db8.jpg'),
(43, 'Slovenia', 'Located 3.1 mi from Kamnik Slovenia Eco resort features a barbecue children\'s playground and sun terrace. Cable car to Velika Planina mountain is 4.3 mi away. Free WiFi is provided throughout the property. All units include a dining area and/or patio. In the bungalow there is also a kitchen equipped with a dishwasher and fridge. Towels and bed linen are featured. Guests can enjoy a drink at the on-site bar. The property offers free on-site parking. Slovenia Eco resort features a garden with vegetables produce. Free use of bicycles is available at the property in this area popular for cycling skiing and hiking. Krvavec Ski Center can be reached in 12 mi. The nearest airport is Ljubljana Jo?e Pu?nik Airport 7.5 mi from Slovenia Eco resort.\r\n', '2023-05-16', '2023-05-23', '884.00', '668d3fe0-5607-4c35-85e8-42cc7ae1c5ba.jpg'),
(45, 'Istanbul', 'Combining elegance and luxury, this is a comfortable Istanbul hotel with newly renovated rooms and suites to offer a unique and unforgettable Istanbul experience. Free WiFi is accessible in all areas.\r\nThe rooms are the ideal place to rest after a day visiting the city and the bathrooms are equally luxurious and spacious. Each unit has a minibar and air conditioning.\r\n\r\nYou can also relax and unwind at our health club which offers a sauna, Turkish bath, spa bath and massage facilities.\r\n\r\nRoof Restaurant, located on the top floor, serves classic international selections and the creations from modern Turkish cuisine. The menu also includes grilled dishes, pastas, sandwiches, salads and a plenty of delicious entrees. Roof Bar and lobby bar serve stylish cocktails and drinks. Room service is also available.\r\n\r\nA 10-minute or less walk will take you to the Blue Mosque, Hagia Sophia and Topkapi Palace. Ataturk Airport is within 20 km of the property.Istanbul Airport is 57 km away.', '2023-07-06', '2023-07-09', '1143.00', 'ac26232b-0bad-4f25-810f-ed654bba2ab4.jpg'),
(46, 'Tbilisi', 'Located in the heart of Old Tbilisi city, 2.2 km from Freedom Square, iconic Sheraton Grand Tbilisi Metechi Palace features accommodation with a restaurant, free private parking, a seasonal outdoor swimming pool and a bar.\r\nGuests can enjoy dinner at Ati - Rooftop Restaurant and have drinks at on-site bar. Buffet breakfast is served every morning at the accommodation.\r\n\r\nEach elegant room at Sheraton Grand Tbilisi Metechi Palace feature city or mountain views. Certain rooms come with a balcony. All soundproofed units include a sitting area, wardrobe, flat-screen TV, N’espresso machine as well as a minibar. Private bathroom offers free toiletries as well as a bathrobe. Linen and towels are also provided. Guest can make an use of ironing facilities and a safety deposit box.\r\n\r\nThe accommodation offers a 24-hour front desk, room service and a wake-up service for guests.\r\n\r\nSheraton Grand Tbilisi Metechi Palace features a comfortable business centre. Daily complimentary newspaper is provided for guests staying at the property.\r\n\r\nRustaveli Theatre is 2.7 km from Sheraton Grand Tbilisi Metechi Palace, while Tbilisi Opera and Ballet Theatre is 3 km from the property. The nearest airport is Tbilisi International, 14 km from the hotel, and the property offers a paid airport shuttle service.', '2023-05-21', '2023-05-23', '757.00', 'e020b52f-8b4f-4f04-b754-a39645437584.jpg'),
(47, 'Dubai', 'Offering a year-round outdoor pool and terrace, Hilton Dubai Al Habtoor City is located in the Sheikh Zayed Road district in Dubai, at the Dubai Water Canal, 2.5 km from Burj Khalifa. The hotel is also directly connected to La Perle by Dragone water theater, the region’s first permanent show inspired by the spirit of Dubai.\r\nEvery room is equipped with a flat-screen TV. Some units are interconnecting, some feature a seating area to relax in after a busy day. You will find a coffee machine in the room. Every room is fitted with a private bathroom with a bath and bidet, with free toiletries provided.\r\n\r\nYou will find a 24-hour front desk, a business centre, a hairdresser and a free kids\' club at the property. The hotel has a spa center and sauna where guests be energized. Indulge in additionally eleven delicious restaurants with cuisines from all around the world - designed to ensure an enlivening stay.\r\n\r\nFree WiFi is provided and free private parking is available on site.\r\n\r\nThe Dubai Fountain is 2.6 km from Hilton Dubai Al Habtoor City, while Museum of the Future is 7.6 km from the property from the property and Al Faroow Omar Bin Al Khattab Mosque is 5.6 km away. Dubai International Airport is 13 km away. The hotel offers a free shuttle bus to various beach locations and Dubai Mall.', '2023-05-24', '2023-05-29', '1539.00', '2f2d01e7-fa54-4eef-8109-9ed24c3809c0.jpg'),
(48, 'Andalusia', 'Join a fascinating trip through the tunnel of time, where we will get to know medieval Spain up close, about its magnificent palaces, gypsy caves, historic alleys and more... We will visit the cities of southern Spain (Andalusia) located in the heart of romantic landscapes, picturesque white cities and ancient fortresses. For about 800 years, the region was under Muslim rule and was characterized by the cultural and economic flourishing of the Jews (the \"Golden Age\") and the growth of science, art and architecture, as is evident in the beauty of the cities and sites we will visit on the trip. It is a perfect trip of nature, history and entertainment.', '2023-05-23', '2023-05-30', '1299.00', '30905dd8-8d4b-4f6d-ad21-f130e9618b01.jpg'),
(49, 'Rome', '\r\nLocated in Termini Central Station, Hotel Lazio is a perfect starting point from which to explore Rome. The hotel offers a high standard of service and amenities to suit the individual needs of all travelers. Free Wi-Fi in all rooms, 24-hour front desk, facilities for disabled guests, luggage storage, elevator are on the list of things guests can enjoy. Designed for comfort, selected guestrooms offer air conditioning, heating, wake-up service, desk, telephone to ensure a restful night. The hotel offers various recreational opportunities. Hotel Lazio combines warm hospitality with a lovely ambiance to make your stay in Rome unforgettable.\r\n', '2023-05-21', '2023-05-25', '783.00', 'e1f6eb02-436d-440f-9b12-930f86c1507a.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`linkId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `linkId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`VacationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
