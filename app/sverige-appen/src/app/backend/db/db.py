import pandas as pd
import sqlite3

def main():
    df = pd.read_csv("Data/data.csv")

    try:
        conn = sqlite3.connect("database.db")
        df.to_sql("emissions", conn, if_exists="replace", index=False)

    except:
        print("Error")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    main()