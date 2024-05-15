import pandas as pd



# One time use function to remove the last 5 characters from each line in a file
# Should only be used to process the CSV file if downloaded again.
def process_file(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()
        lines = [line[:-5] + '\n' for line in lines]
        
    with open(file_path, 'w') as file:
        file.writelines(lines)

            

def read_file(file_path):
    with open(file_path, 'r') as file:
        return pd.read_csv(file)
    
def process_population_file(file_path='app/sverige-appen/Data/swedish population 1990-2023.csv'):
    # Melt the data so that the years are in a single column

    df_population = pd.read_csv(file_path)
    print(df_population.columns)
    df_population = pd.melt(df_population, id_vars=['Län'], var_name='År', value_name='Population')

    df_population.to_csv('app/sverige-appen/Data/swedish_population_transposed.csv', index=False)


def main():
    df = read_file('app/sverige-appen/Data/Styren Kommuner 1994_csv_modified.csv')
    df.drop(['Kod'], axis=1, inplace=True)
    df.to_csv('app/sverige-appen/Data/Styren_processed.csv', index=False)
    process_population_file()
    


if __name__ == "__main__":
    main()