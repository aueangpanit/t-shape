variable "ami_id" {
  type        = string
  default     = "ami-08bac620dc84221eb"
  description = "ec2 ami id"
}

variable "instance_type" {
  type        = string
  default     = "t2.micro"
  description = "ec2 instance type"
}

variable "key_name" {
  default = "terraformKey"
}

variable subnet_id {
}

variable "security_group" {
  default = "sg-099081f114933fcb9"
}

variable "name" {
}

