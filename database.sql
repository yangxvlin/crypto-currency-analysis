CREATE TABLE `crypto_currency`.`main` (
  `Currency` VARCHAR(45) NOT NULL,
  `Date` datetime NOT NULL,
  `Open` decimal(15, 4) NULL,
  `High` Decimal(15, 4) NULL,
  `Low` Decimal(15, 4) NULL,
  `Close` Decimal(15, 4) NULL,
  `Volume` Decimal(15, 4) NULL,
  `Market_Cap` Decimal(30, 4) NULL,
  PRIMARY KEY (`Currency`, `Date`));

select * from main
     where Date = DATE("2019-11-01");

select TODAY.Currency, TODAY.Volume - YESTERDAY.Volume as volume_24h_difference, TODAY.Market_Cap from
(select today.Currency, today.Volume, today.Market_Cap from main today
     where Date = DATE("2019-11-01") ) as TODAY
INNER JOIN 
(select yesterday.Currency, yesterday.Volume from main yesterday
			where Date = DATE("2019-11-01") - INTERVAL 1 DAY) as YESTERDAY
on YESTERDAY.Currency = TODAY.Currency

