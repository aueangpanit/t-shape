resource "aws_subnet" "subnet" {
  vpc_id                  = var.vpc_id
  cidr_block              = var.cidr
  availability_zone       = var.av_zone
  map_public_ip_on_launch = true

  tags = {
    Name = var.name
  }
}