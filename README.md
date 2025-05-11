# Full Stack Web Application on AWS

This project is a secure, scalable full-stack web application deployed entirely on **Amazon Web Services (AWS)**. It features user authentication, CRUD operations, file/image uploads, and cloud infrastructure with best security practices.

##  Tech Stack

- **Frontend**: React / Angular / Vue
- **Backend**: Node.js / Flask / Django (Dockerized)
- **Database**: Amazon RDS (PostgreSQL/MySQL) or DynamoDB
- **Storage**: Amazon S3
- **Deployment**:
  - Frontend on AWS Elastic Beanstalk
  - Backend on AWS EC2 with Docker
- **Security**: IAM Roles, Security Groups, HTTPS (ACM), Private/Public Subnets

---

##  Features

-  User Authentication (JWT/Session-based)
-  CRUD Operations (e.g., Posts/Tasks/Products)
-  File & Image Uploads via AWS S3
-  Persistent Data Storage using Amazon RDS or DynamoDB
-  Secure IAM Roles & Policies
-  VPC with Private/Public Subnets and Route Tables
-  Optional: Route 53 custom domain + ACM HTTPS support

---

##  Architecture Overview

See the `architecture.pdf` for the full AWS infrastructure layout.

Key Components:
- EC2 inside VPC with limited access
- RDS/DynamoDB for backend persistence
- S3 for media/file storage (private/public policy separation)
- Elastic Beanstalk for frontend deployment

---

## ⚙️ Deployment Guide

### 1. **Frontend Deployment (Elastic Beanstalk)**

```bash
eb init -p <platform> your-app-name
eb create your-env-name
eb deploy
