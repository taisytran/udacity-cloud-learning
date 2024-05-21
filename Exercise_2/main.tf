provider "aws" {
  region = "us-east-1"
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "greet_lambda.py"
  output_path = "greet_lambda.zip"
}

resource "aws_lambda_function" "lambda_func" {
  function_name = var.lambda_name
  role          = aws_iam_role.lambda_iam_role.arn
  handler       = "greet_lambda.lambda_handler"
  runtime       = "python3.8"
  filename      = data.archive_file.lambda_zip.output_path

  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  depends_on = [data.archive_file.lambda_zip]

  environment {
    variables = {
      greeting = "Hello world!!!"
    }
  }
}

resource "aws_iam_role" "lambda_iam_role" {
  name = "lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com",
      },
    }],
  })
}


resource "aws_iam_policy" "lambda_iam_policy" {
  name   = "lambda_logs_policy"
  path   = "/"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name = "/aws/lambda/${aws_lambda_function.lambda_func.function_name}"
}

resource "aws_iam_role_policy_attachment" "lambda_iam_role_attachment" {
  role       = aws_iam_role.lambda_iam_role.name
  policy_arn = aws_iam_policy.lambda_iam_policy.arn
}
