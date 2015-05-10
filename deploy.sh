#!/usr/bin/env bash
DEFAULT="jenkins"
PROFILE=${AWS_PROFILE:-$DEFAULT}
BUCKET=phubo
DIR=dist/
aws  s3  sync $DIR s3://$BUCKET/ --profile "$PROFILE"
