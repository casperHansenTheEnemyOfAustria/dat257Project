import os
from bs4 import BeautifulSoup
import sqlite3

# Connect to the database
conn = sqlite3.connect('app/sverige-appen/database.db')

cursor = conn.cursor()

kommuner = conn.execute('select distinct Kommun from emissions;').fetchall()

kommuner = [kommun[0] for kommun in kommuner]

print(kommuner)