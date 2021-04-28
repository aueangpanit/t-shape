resource "aws_db_instance" "default" {
  identifier = var.name
  allocated_storage    = 10
  engine               = "mysql"
  engine_version       = "5.7"
  instance_class       = "db.t3.micro"
  name                 = var.db_name
  username             = var.master_username
  password             = var.master_password
  parameter_group_name = "default.mysql5.7"
  publicly_accessible  = true
  port                 = 3306
  db_subnet_group_name = var.subnet_group_name
  skip_final_snapshot  = true

  tags = {
    Name: var.name
  }
}