provider "aws" {
  shared_credentials_file = "~/.aws/credentials"
  region                  = "eu-west-1"
}

# create vpcs
module "ticketer-vpc" {
  source = "./vpc"
  name   = "ticketer-vpc"
}

# create security groups
module "ticketer-security-group" {
  source = "./security-group"
  name   = "ticketer-security-group"
  vpc_id = module.ticketer-vpc.id
}

# create subnets
module "ticketer-public-subnet-1" {
  source = "./subnet"
  name   = "ticketer-public-subnet-1"
  vpc_id = module.ticketer-vpc.id
  cidr   = "10.0.1.0/24"
}

module "ticketer-private-subnet-1" {
  source = "./subnet"
  name   = "ticketer-private-subnet-1"
  vpc_id = module.ticketer-vpc.id
  cidr   = "10.0.2.0/24"
}

module "ticketer-private-subnet-2" {
  source  = "./subnet"
  name    = "ticketer-private-subnet-2"
  vpc_id  = module.ticketer-vpc.id
  cidr    = "10.0.3.0/24"
  av_zone = "eu-west-1b"
}

# create internet gateways
module "ticketer-internet-gateway" {
  source = "./internet-gateway"
  name   = "ticketer-internet-gateway"
  vpc_id = module.ticketer-vpc.id
}

# create route tables
module "ticketer-public-route-table" {
  source              = "./public-route-table"
  name                = "ticketer-public-route-table"
  vpc_id              = module.ticketer-vpc.id
  internet_gateway_id = module.ticketer-internet-gateway.id
}

module "ticketer-private-route-table" {
  source = "./private-route-table"
  name   = "ticketer-public-route-table"
  vpc_id = module.ticketer-vpc.id
}

# assign subnets to route tables
resource "aws_route_table_association" "a" {
  subnet_id      = module.ticketer-public-subnet-1.id
  route_table_id = module.ticketer-public-route-table.id
}

resource "aws_route_table_association" "b" {
  subnet_id      = module.ticketer-private-subnet-1.id
  route_table_id = module.ticketer-private-route-table.id
}

resource "aws_route_table_association" "c" {
  subnet_id      = module.ticketer-private-subnet-2.id
  route_table_id = module.ticketer-private-route-table.id
}

# create EC2 instances
module "ticketer-jenkins" {
  source         = "./EC2"
  name           = "ticketer-jenkins"
  security_group = module.ticketer-security-group.id
  subnet_id      = module.ticketer-public-subnet-1.id
}

module "ticketer-web" {
  source         = "./EC2"
  name           = "ticketer-web"
  security_group = module.ticketer-security-group.id
  subnet_id      = module.ticketer-public-subnet-1.id
}

# create RDS
resource "aws_db_subnet_group" "ticketer-rds-subnet-group" {
  name       = "main"
  subnet_ids = [module.ticketer-public-subnet-1.id, module.ticketer-private-subnet-1.id, module.ticketer-private-subnet-2.id]

  tags = {
    Name = "My DB subnet group"
  }
}

module "ticketer-rds" {
  source            = "./RDS"
  name              = "ticketer-rds"
  master_username   = var.rds_username
  master_password   = var.rds_password
  subnet_group_name = aws_db_subnet_group.ticketer-rds-subnet-group.name
}