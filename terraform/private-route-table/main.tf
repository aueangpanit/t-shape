resource "aws_route_table" "route-table" {
  vpc_id = var.vpc_id

  tags = {
    Name = var.name
  }
}