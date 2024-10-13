#!/bin/bash

# Define AWS configuration variables
AWS_ACCESS_KEY_ID="AKIAQHYPL3GS3OJ7O27V"
AWS_SECRET_ACCESS_KEY="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"
AWS_DEFAULT_REGION="us-east-1"
AWS_OUTPUT_FORMAT="json" # Options: json, text, table

# Configure AWS CLI using the provided values
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
aws configure set region $AWS_DEFAULT_REGION
aws configure set output $AWS_OUTPUT_FORMAT

echo "AWS CLI has been configured successfully!"
