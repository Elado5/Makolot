
--create the table

--Addresses


create table Addresses (
	address_id int IDENTITY(1,1) not null primary key, 
	street nvarchar(150) not null,
	other_data nvarchar(150),
	zip_code int not null,
	isActive bit default 1
)
go

create proc add_address 
	@street nvarchar(150),
	@other_data nvarchar(150),
	@zip_code int
as
	insert into [dbo].Addresses([street], [other_data], [zip_code], [isActive])
		VALUES(@street, @other_data, @zip_code, 'TRUE')
go

exec add_address "kokbo", "yho", 14234
go

create proc select_address_by_id
	@address_id int
as
	select * from Addresses where [address_id] = @address_id
go


create proc update_address
	@address_id int,
	@street nvarchar(150),
	@other_data nvarchar(150),
	@zip_code int
as
	UPDATE [dbo].Addresses
		set [street] = @street,
			[other_data] = @other_data,
			[zip_code] = @zip_code
		where [address_id] = @address_id
go

create proc activate_address
	@address_id int
as
	UPDATE [dbo].Addresses
		set [isActive] = 1
		where [address_id] = @address_id
go

create proc deactivate_address
	@address_id int
as
	UPDATE [dbo].Addresses
		set [isActive] = 0
		where [address_id] = @address_id
go

create proc delete_address
	@address_id int
as
	delete from [dbo].Addresses
	WHERE [address_id] = @address_id
go


--Credit Cards


create table CreditCards (

	credit_card_id int IDENTITY(1,1) primary key not null, --id of card holder or unique card id for system?
	credit_card_number varchar(16) not null,
	credit_card_date nvarchar(5) not null,
	credit_card_cvv varchar(4) not null,
	credit_card_name nvarchar(150) not null
	--credit_card_password ?
)
go

create proc get_all_credit_cards
as
	select * from CreditCards
go

create proc get_credit_card_by_id
@credit_card_id int
as
	select * from CreditCards where credit_card_id = @credit_card_id
go

create proc add_credit_card
	@credit_card_number varchar(16),
	@credit_card_date nvarchar(5),
	@credit_card_cvv varchar(4),
	@credit_card_name nvarchar(150)
AS
	insert into [dbo].CreditCards([credit_card_number], [credit_card_date], [credit_card_cvv], [credit_card_name])
	values (@credit_card_number, @credit_card_date, @credit_card_cvv, @credit_card_name)
go

EXEC add_credit_card 1234123412341234, '04/21', 221, 'Elad Koko'
go

create proc get_credit_card_by_id
	@credit_card_id int
as
	select * from CreditCards where [credit_card_id] = @credit_card_id
go

create proc update_credit_card
	@credit_card_id int,
	@credit_card_number varchar(16),
	@credit_card_date nvarchar(5),
	@credit_card_cvv varchar(4),
	@credit_card_name nvarchar(150)
as
	UPDATE [dbo].CreditCards
		set [credit_card_number] = @credit_card_number,
			[credit_card_date] = @credit_card_date,
			[credit_card_cvv] = @credit_card_cvv,
			[credit_card_name] = @credit_card_name
		where [credit_card_id] = @credit_card_id
GO

create proc delete_credit_card
	@credit_card_id int
as
	delete from [dbo].CreditCards
	WHERE [credit_card_id] = @credit_card_id
go


--Customers


create table Customers (
	customer_id int IDENTITY(1,1) not null primary key,
	customer_first_name nvarchar(150) not null,
	customer_last_name nvarchar(150) not null,
	customer_email nvarchar(150) not null,
	customer_phone_number varchar(10) not null,
	customer_birthdate datetime not null,
	customer_password nvarchar(50) not null,
	customer_city nvarchar(50) not null,
	address_id int not null foreign key references Addresses(address_id),
	credit_card_id int foreign key references CreditCards(credit_card_id)
)
go


-- returns the new customer's id
create proc add_customer
	@customer_first_name nvarchar(150),
	@customer_last_name nvarchar(150),
	@customer_email nvarchar(150),
	@customer_phone_number varchar(10),
	@customer_birthdate datetime,
	@customer_password nvarchar(50),
	@customer_city nvarchar(50),
	@address_id int,
	@credit_card_id int
AS
	insert into [dbo].Customers([customer_first_name], [customer_last_name], [customer_email], [customer_phone_number],[customer_birthdate],[customer_password],[customer_city], [address_id], [credit_card_id])
	values (@customer_first_name, @customer_last_name, @customer_email, @customer_phone_number, @customer_birthdate, @customer_password, @customer_city, @address_id, @credit_card_id)
go

--how to i check?
create proc login_customer

	@customer_email nvarchar(150),
	@customer_password nvarchar(50)
AS
	Select * from Customers where customer_email = @customer_email and customer_password = @customer_password
go

create proc get_customer_by_id
	@customer_id int
as
	select * from customers where [customer_id] = @customer_id
go

create proc update_customer
	@customer_id int,
	@customer_phone_number varchar(10),
	@customer_password nvarchar(50),
	@customer_city nvarchar(50),
	@address_id int
AS
	update [dbo].[Customers]
		set
			[customer_phone_number] = @customer_phone_number,
			[customer_password] = @customer_password,
			[customer_city] = @customer_city,
			[address_id] = @address_id -- להתייחס לשדות זהות כמו רגילים?
		where [customer_id] = @customer_id
go

create proc delete_customer
	@customer_id int
as
	delete from [dbo].[Customers]
	WHERE [customer_id] = @customer_id
go


--Retail Managers


create table Retail_Managers (

	retailer_id int IDENTITY(1,1) not null primary key,
	retailer_first_name nvarchar(150) not null,
	retailer_last_name nvarchar(150) not null,
	retailer_email nvarchar(150) not null,
	retailer_phone_number varchar(10) not null,
	retailer_birthdate datetime not null,
	retailer_password nvarchar(50) not null,
	retailer_city nvarchar(50) not null,
	retailer_address_id int not null foreign key references Addresses(address_id)
)
go

create proc get_all_managers
AS
	select * from Retail_Managers
go

create proc add_retail_manager 

	@retailer_first_name nvarchar(150),
	@retailer_last_name nvarchar(150),
	@retailer_email nvarchar(150),
	@retailer_phone_number varchar(10),
	@retailer_birthdate datetime,
	@retailer_password nvarchar(50),
	@retailer_city nvarchar(50),
	@retailer_address_id int
AS
	insert into [dbo].[Retail_Managers]([retailer_first_name], [retailer_last_name],[retailer_email],[retailer_phone_number],[retailer_birthdate],[retailer_password],[retailer_city],[retailer_address_id])
	values (@retailer_first_name, @retailer_last_name, @retailer_email,@retailer_phone_number,@retailer_birthdate,@retailer_password,@retailer_city,@retailer_address_id)
GO

create proc login_retail_manager

	@retailer_email nvarchar(150),
	@retailer_password nvarchar(50)
AS
	Select * from Retail_Managers where retailer_email = @retailer_email and retailer_password = @retailer_password
go

create proc get_retail_manager_by_id
	@retailer_id int
as
	select * from retail_managers where [retailer_id] = @retailer_id
go

create proc update_retail_manager
	@retailer_id int,
	@retailer_email nvarchar(150),
	@retailer_phone_number varchar(10),
	@retailer_password nvarchar(50),
	@retailer_city nvarchar(50),
	@retailer_address_id int
as
	update [dbo].[Retail_Managers]
		set
			[retailer_email] = @retailer_email,
			[retailer_phone_number] = @retailer_phone_number,
			[retailer_password] = @retailer_password,
			[retailer_city] = @retailer_city,
			[retailer_address_id] = @retailer_address_id
		where [retailer_id] = @retailer_id
go


create proc delete_retail_manager
	@retailer_id int
as
	delete from [dbo].[Retail_Managers]
	WHERE [retailer_id] = @retailer_id
go


--Categories

create table Categories (

	category_id int IDENTITY(1,1) not null primary key,
	category_name nvarchar(150) not null,
	category_info nvarchar(150) not null,
	category_image image not null,
	isActive bit default 1
)
go

create proc add_category

	@category_name nvarchar(150),
	@category_info nvarchar(150),
	@category_image image
AS
	insert into [dbo].[Categories]([category_name],[category_info],[category_image])
	values (@category_name, @category_info, @category_image)
GO

create proc get_all_categories
as
	select * from categories
go

create proc get_category_by_id
	@category_id int
as
	select * from categories where [category_id] = @category_id
go

create proc update_category
	@category_id int,
	@category_name nvarchar(150),
	@category_info nvarchar(150),
	@category_image Image
as
	update [dbo].[Categories]
		set [category_name] = @category_name,
			[category_info] = @category_info,
			[category_image] = @category_image
		where [category_id] = @category_id
go

create proc deactivate_category
@category_id int
as
	update [dbo].[Categories]
		set [isActive] = 0
	WHERE [category_id] = @category_id
go

create proc activate_category
@category_id int
as
	update [dbo].[Categories]
		set [isActive] = 1
	WHERE [category_id] = @category_id
go


create proc delete_category
	@category_id int
as
	delete from [dbo].[Categories]
	WHERE [category_id] = @category_id
go


--Products


create table Products (

	product_id int IDENTITY(1,1) not null primary key,
	category_id int not null foreign key references Category(category_id),
	product_name nvarchar(150) not null,
	product_price float(10) not null,
	product_details nvarchar(150),
	product_description nvarchar(150),
	product_image Image not null,
	product_suppliers nvarchar(150),
	isActive bit default 1
)
go

create proc add_product
	@category_id int,
	@product_name nvarchar(150),
	@product_price float(10),
	@product_details nvarchar(150),
	@product_description nvarchar(150),
	@product_image Image,
	@product_suppliers nvarchar(150)
AS
	insert into [dbo].[Products]([product_name],[product_price], [product_details],[product_description], [product_image], [product_suppliers])
	values (@product_name, @product_price, @product_details, @product_description, @product_image, @product_suppliers)
GO

create proc get_all_products
as
	select * from Products
go

create proc get_product_by_id
	@product_id int
as
	select * from Products where [product_id] = product_id
go

create proc update_product
	@product_id int,
	@category_id int,
	@product_name nvarchar(150),
	@product_price float(10),
	@product_details nvarchar(150),
	@product_description nvarchar(150),
	@product_image Image,
	@product_suppliers nvarchar(150)
as
	update [dbo].[Products]
		set [category_id] = @category_id,
			[product_name] = @product_name,
			[product_price] = @product_price,
			[product_details] = @product_details,
			[product_description] = @product_description,
			[product_image] = @product_image,
			[product_suppliers] = @product_suppliers
		where [product_id] = @product_id
go

create proc deactivate_product
@product_id int
as
	update [dbo].[Products]
		set [isActive] = 0
	WHERE [product_id] = @product_id
go

create proc activate_product
@product_id int
as
	update [dbo].[Products]
		set [isActive] = 1
	WHERE [product_id] = @product_id
go

create proc delete_product
	@product_id int
AS
	delete from [dbo].[Products]
	WHERE [product_id] = @product_id
go


--Grocery Shop


create table Grocery_Shops (

	grocery_shop_id int IDENTITY(1,1) not null primary key,
	grocery_shop_name nvarchar(150) not null,
	retailer_id int not null foreign key references Retail_Managers(retailer_id),
	grocery_shop_city nvarchar(150) not null,
	address_id int not null foreign key references Addresses(address_id),
	grocery_shop_opening_times nvarchar(150) not null,
	grocery_shop_radius float(10) not null,
	grocery_shop_phone_number varchar(10) not null,
	grocery_shop_contact_name nvarchar(150),
	isActive bit default 1
)
go

create proc add_grocery_shop
	@grocery_shop_name nvarchar(150),
	@grocery_shop_city nvarchar(150),
	@grocery_shop_radius float(10),
	@grocery_shop_opening_times nvarchar(150),
	@grocery_shop_phone_number varchar(10),
	@grocery_shop_contact_name nvarchar(150),
	@retailer_id int,
	@address_id int
as
	insert into [dbo].[Grocery_Shops]([grocery_shop_name],[grocery_shop_city],[grocery_shop_radius],[grocery_shop_opening_times],[grocery_shop_phone_number],[grocery_shop_contact_name],[retailer_id],[address_id])
	values (@grocery_shop_name, @grocery_shop_city, @grocery_shop_radius, @grocery_shop_opening_times, @grocery_shop_phone_number, @grocery_shop_contact_name, @retailer_id, @address_id)
go

create proc get_all_grocery_shops
as
	select * from Grocery_Shops
go

create proc get_grocery_shop_by_id
	@grocery_shop_id int
as
	select * from Grocery_Shops where [grocery_shop_id] = grocery_shop_id
go


create proc update_grocery_shop
	@grocery_shop_id int,
	@grocery_shop_name nvarchar(150),
	@grocery_shop_city nvarchar(150),
	@grocery_shop_radius float(10),
	@grocery_shop_opening_times nvarchar(150),
	@grocery_shop_phone_number varchar(10),
	@grocery_shop_contact_name nvarchar(150),
	@retailer_id int,
	@address_id int
as
	update [dbo].[Grocery_Shops]
		set [grocery_shop_name] = @grocery_shop_name,
			[retailer_id] = @retailer_id,
			[grocery_shop_city] = @grocery_shop_city,
			[address_id] = @address_id,
			[grocery_shop_radius] = @grocery_shop_radius,
			[grocery_shop_opening_times] = @grocery_shop_opening_times,
			[grocery_shop_phone_number] = @grocery_shop_phone_number,
			[grocery_shop_contact_name] = @grocery_shop_contact_name
		where [grocery_shop_id] = @grocery_shop_id
go

create proc deactivate_grocery_shop
@grocery_shop_id int
as
	update [dbo].[Grocery_Shops]
		set [isActive] = 0
	WHERE [grocery_shop_id] = @grocery_shop_id
go

create proc activate_grocery_shop
@grocery_shop_id int
as
	update [dbo].[Grocery_Shops]
		set [isActive] = 1
	WHERE [grocery_shop_id] = @grocery_shop_id
go


create proc delete_grocery_shop
	@grocery_shop_id int
as
	delete from [dbo].[Grocery_Shops]
	where [grocery_shop_id] = @grocery_shop_id
go


--Orders


create table Orders (

	order_id int IDENTITY(1,1) primary key not null,
	order_status nvarchar(20),
	order_discount float(10),
	order_total_price float(10) not null,
	order_details nvarchar(150),
	order_date datetime not null,
	customer_id int not null foreign key references Customers(customer_id),
	order_ship_date_preference datetime not null,
	grocery_shop_id int not null foreign key references Grocery_Shop(grocery_shop_id)
	
)
go

create proc get_all_orders
as
	select * from Orders
go

create proc get_order_by_id
	@order_id int
as
	select * from Orders where [order_id] = @order_id
go

create proc add_order

	@order_status nvarchar(20),
	@order_discount float(10),
	@order_total_price float(10),
	@order_details nvarchar(150),
	@order_date datetime,
	@customer_id int,
	@order_ship_date_preference datetime,
	@grocery_shop_id int
as
	insert into [dbo].[Orders]([order_status], [order_discount], [order_total_price],[order_details],[order_date],[order_ship_date_preference], [customer_id], [grocery_shop_id])
	values (@order_status,@order_discount,@order_total_price,@order_details,@order_date,@order_ship_date_preference, @customer_id, @grocery_shop_id)
go

create proc update_order

	@order_status nvarchar(20),
	@order_total_price float(10),
	@order_details nvarchar(150),
	@grocery_shop_id int

as
	update [dbo].[Orders]
	set
	[order_status] = @order_status,
	[order_total_price] = @order_total_price,
	[order_details] = @order_details,
	[grocery_shop_id] = @grocery_shop_id
go

--update order - not needed? (only delete)

create proc delete_order
	@order_id int
as
	delete from [dbo].[Orders] where [order_id] = @order_id
go

--Payment Transactions

create table Payment_Transactions (

	transaction_id int IDENTITY(1,1) not null primary key,
	customer_id int not null foreign key references Customers(customer_id),
	amount_total float(10) not null,
	payment_date datetime not null,
	order_id int not null foreign key references Orders(order_id),
	payment_status nvarchar(20),
	credit_card_id int not null foreign key references CreditCards(credit_card_id)
)
go

create proc add_transaction
	@customer_id int,
	@amount_total float(10),
	@payment_date datetime,
	@order_id int,
	@payment_status nvarchar(20),
	@credit_card_id int
AS
	insert into [dbo].[Payment_Transactions]([customer_id],[amount_total],[payment_date], [order_id], [payment_status],  [credit_card_id])
	values (@customer_id, @amount_total, @payment_date, @order_id, @payment_status, @credit_card_id)
go

create proc get_all_transactions
as
	select * from Payment_Transactions
go

create proc get_transaction_by_id
	@transaction_id int
as
	select * from Payment_Transactions where [transaction_id] = transaction_id
go

--update transaction - not needed? (only delete)
create proc update_transaction
	@transaction_id int,
	@amount_total float(10),
	@payment_date datetime,
	@order_id int,
	@payment_status nvarchar(20),
	@credit_card_id int
AS
	update [dbo].[Payment_Transactions]
		set 
		[amount_total] = @amount_total,
		[payment_date] = @payment_date,
		[order_id] = @order_id,
		[payment_status] = @payment_status,
		[credit_card_id] = @credit_card_id
		where [transaction_id] = @transaction_id
go

create proc delete_transaction
	@transaction_id int 
	as 
	delete from [dbo].[Payment_Transactions] where [transaction_id] = @transaction_id
go


--Invoices

create table Invoices (

	invoices_id int IDENTITY(1,1) not null,
	transaction_id int not null foreign key references Payment_Transactions(transaction_id),
	customer_id int not null foreign key references Customers(customer_id),
	amount_total float(10) not null,
	invoice_date datetime not null,
	invoice_status nvarchar(20)
)
go

create proc add_invoice
	@transaction_id int output,
	@customer_id int output,
	@amount_total float(10),
	@invoice_date datetime
AS
	insert into [dbo].[Invoices] ([amount_total], [invoice_date])
	values (@amount_total, @invoice_date)
	set @transaction_id = @@IDENTITY
	set @customer_id = @@IDENTITY
GO

create proc get_invoice_by_id
	@invoice_id int
as
	select * from invoices where [invoice_id] = invoice_id
go

create proc update_invoice
	@invoices_id int,
	@transaction_id int,
	@customer_id int,
	@amount_total float(10),
	@invoice_date datetime
as
	update [dbo].[Invoices]
		set [transaction_id] = @transaction_id,
			[customer_id] = @customer_id,
			[amount_total] = @amount_total,
			[invoice_date] = @invoice_date
		where [invoices_id] = @invoices_id
go


create proc delete_invoice
	@invoices_id int
as
	delete from [dbo].[Invoices]
	where [invoice_id] = @invoice_id
go


--Order Details -DO WE NEED THAT? We already have orders table

create table Order_Details (

	order_id int IDENTITY(1,1) not null foreign key references Orders(order_id),
	order_quantity smallint not null,
	order_price float(10) not null,
	order_promocode nvarchar(20),
	product_id int not null foreign key references Products(product_id)
)
go

create proc add_order_details
	@order_id int output,
	@order_quantity smallint,
	@order_price float(10),
	@order_promocode nvarchar(20),
	@product_id int output
AS
	insert into [dbo].[Order_Details]([order_quantity], [order_price], [order_promocode])
	values (@order_quantity, @order_price, @order_promocode)
	set @order_id = @@IDENTITY
	set @product_id = @@IDENTITY
go

create proc get_order_by_id
	@order_id int
as
	select * from orders where [order_id] = order_id
go

create proc update_order_details
	@order_id int,
	@order_quantity smallint,
	@order_price float(10),
	@order_promocode nvarchar(20),
	@product_id int
as
	update [dbo].[Order_Details]
		set 
			[order_quantity] = @order_quantity,
			[order_price] = @order_price,
			[order_promocode] = @order_promocode,
			[product_id] = @product_id
		where [order_id] = @order_id
go


create proc delete_order_details
	@order_id int
as
	delete from [dbo].[order_details]
	where [order_id] = @order_id
go