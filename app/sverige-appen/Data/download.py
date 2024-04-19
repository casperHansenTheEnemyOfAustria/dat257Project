import requests
from bs4 import BeautifulSoup
import os

html = '<select id="WjN1pV2wYg" placeholder="" class=""><option value="NH3">Ammoniak (NH3)</option><option value="NMVOC">Flyktiga org.ämnen (NMVOC)</option><option value="NOx">Kväveoxider (NOx)</option><option value="PM25">PM2.5 (partiklar &lt; 2.5 mikrom.)</option><option value="SOx">Svaveloxider (SOx)</option><option value="GGT">Växthusgaser totalt</option><option value="" disabled=""></option><option value="As">Arsenik (As)</option><option value="BaP">Benso(a)pyren</option><option value="Pb">Bly (Pb)</option><option value="Dioxin">Dioxin</option><option value="HFC">Fluorkolväten (HFC), CO2-ekv.</option><option value="HCB">Hexaklorbensen (HCB)</option><option value="Cd">Kadmium (Cd)</option><option value="CO2">Koldioxid (CO2)</option><option value="CO">Kolmonoxid (CO)</option><option value="Cu">Koppar (Cu)</option><option value="Cr">Krom (Cr)</option><option value="Hg">Kvicksilver (Hg)</option><option value="N2O">Lustgas (N2O), CO2-ekv.</option><option value="CH4">Metan (CH4), CO2-ekv.</option><option value="Ni">Nickel (Ni)</option><option value="PFC">Perfluorkarboner (PFC), CO2-ekv.</option><option value="PM10">PM10 (partiklar &lt; 10 mikrom.)</option><option value="PAH4">Polyaromatiska kolväten (PAH-4)</option><option value="PCB">Polyklorerade bifenyler (PCB)</option><option value="Se">Selen (Se)</option><option value="BC">Sot (BC)</option><option value="SF6">Svavelhexafluorid (SF6), CO2-ekv.</option><option value="TSP">TSP (partiklar totalt)</option><option value="Zn">Zink (Zn)</option></select>'
soup = BeautifulSoup(html, 'html.parser')
options = soup.find_all('option')
emission_types = [option.get('value') for option in options]

def download_files(emissionTypes):
    for em in emissionTypes:
        url = f"https://nationellaemissionsdatabasen.smhi.se/api/getexcelfile/?county=0&municipality=0&sub={em}"
        response = requests.get(url)
        # create a folder for the files and a file for each emission type
        with open(f'./Nationella-emmisions-databasen/{em}.xlsx', 'wb') as file:
            file.write(response.content)
            print (f"Downloaded {em}.xlsx")
        

download_files(emission_types)