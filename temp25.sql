-- Query #25: mn_summary_detail [Screen #15 Manager Summary Detail]
DROP PROCEDURE IF EXISTS mn_summary_detail;
DELIMITER //
CREATE PROCEDURE mn_summary_detail(IN i_managerUsername VARCHAR(50), IN i_foodTruckName VARCHAR(50))
BEGIN
    DROP TABLE IF EXISTS mn_summary_detail_result;
    CREATE TABLE mn_summary_detail_result(`date` date, customerName varchar(100), totalPurchase DECIMAL(6, 2),
        orderCount int, foodNames text);

    DROP TABLE IF EXISTS orderIDCost;
CREATE TABLE orderIDCost  (orderID int, orderCost DECIMAL(6,2));
insert into orderIDCost (orderID, orderCost)
select orderdetail.orderID, sum(orderdetail.purchaseQuantity * menuitem.price) from orderdetail INNER JOIN menuitem on orderdetail.foodTruckName = menuitem.foodTruckName and orderdetail.foodName = menuitem.foodName GROUP BY orderID;

select * from orderIDCost; #orderID, and the total cost associated with that order.

DROP TABLE IF EXISTS orderIDDateCusFood; #orderID, the date of the order, the customerUsername, and the foods they ordered. The unique key is orderID.
CREATE TABLE orderIDDateCusFood (orderID int, `date` date, customerUsername VARCHAR(55), foods VARCHAR(120));
insert into orderIDDateCusFood
select orders.orderID, orders.date, orders.customerUsername, GROUP_CONCAT(foodName SEPARATOR ', ') "foods"
from orderdetail INNER JOIN orders on orders.orderID = orderdetail.orderID
WHERE foodTruckName in (SELECT foodTruckName from foodtruck WHERE managerUsername = i_managerUsername and foodTruckName = i_foodTruckName)
GROUP BY orderID;

select `date`, customerUsername,  GROUP_CONCAT(foods SEPARATOR ', ') "foods", COUNT(orderID) "numOrders" from orderIDDateCusFood GROUP BY customerUsername; #this is all except for total cost.

DROP TABLE IF EXISTS customer_date_cost;
CREATE TABLE customer_date_cost (netCost DECIMAL(6,2), `date` date, customerUsername VARCHAR(55));
INSERT INTO customer_date_cost
select SUM(orderCost) "netCost", `date`, customerUsername from orderIDCost INNER JOIN orderIDDateCusFood on orderIDCOst.orderID = orderIDDateCusFood.orderID GROUP BY `date`, customerUsername;

select * from customer_date_cost;

DROP TABLE IF EXISTS customer_2;
CREATE TABLE customer_2 (`date` date, customerUsername VARCHAR(55), foods VARCHAR(120), numOrders int);
insert into customer_2
select `date`, customerUsername,  GROUP_CONCAT(foods SEPARATOR ', ') "foods", COUNT(orderID) "numOrders" from orderIDDateCusFood GROUP BY customerUsername;

INSERT INTO mn_summary_detail_result
select customer_2.date "Date", customer_2.customerUsername "Customer", customer_date_cost.netCost "Total Purchase", customer_2.numOrders "# Orders", customer_2.foods "Food (s)" from customer_2 INNER JOIN customer_date_cost on customer_2.customerUsername = customer_date_cost.CustomerUsername and customer_2.date = customer_date_cost.date ORDER BY customer_date_cost.date desc;


END //
DELIMITER ;
