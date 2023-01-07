#!/usr/bin/env bash

PROJECT_ID="fucking-around-278908"
REGION="us-central1"
SERVICE_NAME="mbb"

gcloud builds submit --tag gcr.io/$PROJECT_ID/mbb --project $PROJECT_ID

gcloud run deploy $SERVICE_NAME --image=gcr.io/$PROJECT_ID/mbb --platform managed --project $PROJECT_ID --region $REGION

