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


def main():
    df = read_file('app/sverige-appen/Data/Styren Kommuner 1994_csv_modified.csv')

    df.drop(['Kod'], axis=1, inplace=True)
    df.to_csv('app/sverige-appen/Data/Styren_processed.csv', index=False)
    

if __name__ == "__main__":
    main()