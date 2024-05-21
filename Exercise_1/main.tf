provider "aws" {
  region = "us-east-1"
}

data "aws_ami" "amazon_linux_2" {
  most_recent = true

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-ebs"]
  }
}

resource "aws_instance" "udacity_t2" {
  count = 4

  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = "t2.micro"

  tags = {
    Name = "Udacity T2"
  }
}

resource "aws_instance" "udacity_t4" {
  count = 2

  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = "m4.large"

  tags = {
    Name = "Udacity M4"
  }
}
