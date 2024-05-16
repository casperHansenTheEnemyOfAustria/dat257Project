import pandas as pd
import sqlite3
import os

def main():
    print(os.getcwd())
    df_emissions = pd.read_csv("app/sverige-appen/Data/data.csv",)
    df_styren_kommuner = pd.read_csv("app/sverige-appen/Data/Styren_processed.csv")
    df_styren_regions = pd.read_csv("app/sverige-appen/Data/Styren_Regioner_processed.csv")
    df_population_counties = pd.read_csv("app/sverige-appen/Data/swedish_population_transposed.csv")

    try:
        conn = sqlite3.connect("app/sverige-appen/database.db")
        df_emissions.to_sql("emissions", conn, if_exists="replace", index=False)
        df_styren_regions.to_sql("styren_regions", conn, if_exists="replace", index=False)
        df_styren_kommuner.to_sql("styren_kommuner", conn, if_exists="replace", index=False)
        df_population_counties.to_sql("population_counties", conn, if_exists="replace", index=False)

    except:
        print("Error")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    main()