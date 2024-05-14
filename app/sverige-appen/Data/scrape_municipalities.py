from bs4 import BeautifulSoup
import sqlite3
import requests
import re


#
# TBH Not sure we need to do THIS
#
#



# Connect to the database
conn = sqlite3.connect('app/sverige-appen/database.db')

kommuner = conn.execute('select distinct Kommun from emissions;').fetchall()

kommuner = [kommun[0] for kommun in kommuner]
kommuner.remove('Alla')


urls = [f'https://en.wikipedia.org/wiki/{kommun}_Municipality' for kommun in kommuner]

is_valid = True
sites = []
# takes long time
#for i, url in enumerate(urls):
#    print(i)
#    html = requests.get(url).text
#    sites.append(BeautifulSoup(html, 'html.parser'))
#    pattern = re.compile(r"https://sv.wikipedia.org/wiki/.*_kommun")
#    a_tags = site.find("a", href=pattern)




html = requests.get(urls[0]).text
site = BeautifulSoup(html, 'html.parser')
pattern = re.compile(r"https://sv.wikipedia.org/wiki/.*_kommun")
a_tags = site.find("a", href=pattern)
print(a_tags.get('href'))
url = a_tags.get('href')
html = requests.get(url).text
site = BeautifulSoup(html, 'html.parser')