import requests
from bs4 import BeautifulSoup
import os



def download_files(emissionTypes):
    for em in emissionTypes:
        url = f"https://nationellaemissionsdatabasen.smhi.se/api/getexcelfile/?county=0&municipality=0&sub={em}"
        response = requests.get(url)
        # create a folder for the files and a file for each emission type
        if(em != ""):
            with open(f'./Nationella-emmisions-databasen/{em}.xlsx', 'wb') as file:
                file.write(response.content)
                print (f"Downloaded {em}.xlsx")
        
