# [Anubandh.com](https://www.anubandh.com) Data Collection Scripts

## Prerequisites:
1. MySQL
2. Python3

## Setup Steps:
1. Create database in MySQL
2. Run below scripts
```
db/schema.sql
db/static-data.sql
```
3. Create .env file in root folder from env-sample
```
cp env-sample .env
```
4. Configure .env file
5. Create virtual python environment
```
python3 -m venv .venv
```
6. Activate virtual environment
```
source .venv/bin/activate
```
7. Install packages
```
pip install -r requirements.txt
```
8. Run data_loader.py to download & upsert data into DB
```
python data_loader.py
```
9. Run mark_is_deleted.py to set users.is_deleted flag if user account is deleted.
```
python mark_is_deleted.py
```