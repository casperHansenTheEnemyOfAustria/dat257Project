import pandas as pd
import numpy as np



# One time use function to remove the last 5 characters from each line in a file
# Should only be used to process the CSV file if downloaded again.
def process_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        lines = [line[:-5] + '\n' for line in lines]
        
    with open(file_path, 'w') as file:
        file.writelines(lines)

            

def read_file(file_path):
    with open(file_path, 'rb') as file:
        return pd.read_csv(file)

def process_regions_file(file_path='app/sverige-appen/Data/Styren Regioner 1994-csv.csv'):
    df_regions = pd.read_csv(file_path, low_memory=False)
    # Define a function to repeat rows
    def repeat_rows(row):
        start_year = row['År']
        end_year = start_year + 4
        return pd.DataFrame({col: np.repeat(val, 4) if col != 'År' else np.arange(start_year, end_year) for col, val in row.items()})

    # Apply the function to each row
    all_year_df = pd.concat(df_regions.apply(repeat_rows, axis=1).tolist(), ignore_index=True)

    all_year_df.to_csv('app/sverige-appen/Data/Styren_Regioner_processed.csv', index=False)


    
def process_population_file(file_path='app/sverige-appen/Data/swedish population 1990-2023.csv'):
    # Melt the data so that the years are in a single column

    df_population = pd.read_csv(file_path)
    df_population = pd.melt(df_population, id_vars=['Län'], var_name='År', value_name='Population')
    df_population_sweden = pd.read_csv('app/sverige-appen/Data/population_sweden.csv')
    df_population = pd.concat([df_population, df_population_sweden], ignore_index=True)
    df_population.to_csv('app/sverige-appen/Data/swedish_population_transposed.csv', index=False)

def process_municipalities_file(file_path='app/sverige-appen/Data/Styren Kommuner 1994_csv_modified.csv'):
    def repeat_rows(row):
        start_year = row['Valår']
        end_year = start_year + 4
        output = pd.DataFrame({col: np.repeat(val, 4) if col != 'Valår' else np.arange(start_year, end_year) for col, val in row.items()})
        # print(output)
        return output
    df = pd.read_csv(file_path)
    correctMunicipalityNames = pd.read_csv('app/sverige-appen/Data/data.csv')['Kommun'].unique()
    for i in range(len(correctMunicipalityNames)):
        for d in df[df['Kommun'].str.contains(correctMunicipalityNames[i])]['Kommun']: 
            if d in correctMunicipalityNames:
                continue
            df.replace(d , correctMunicipalityNames[i], inplace=True)
    print(df.apply(repeat_rows, axis=1).tolist())
    all_year_df = pd.concat(df.apply(repeat_rows, axis=1).tolist(), ignore_index=True)
    # print(all_year_df)
    all_year_df.to_csv('app/sverige-appen/Data/Styren Kommuner 1994_csv_modified_modified.csv', index=False)
                
        

def main():
    process_municipalities_file()
    df = read_file('app/sverige-appen/Data/Styren Kommuner 1994_csv_modified_modified.csv')
    df.drop(['Kod'], axis=1, inplace=True)
    df.to_csv('app/sverige-appen/Data/Styren_processed.csv', index=False)
    process_population_file()
    process_regions_file()
    


if __name__ == "__main__":
    main()