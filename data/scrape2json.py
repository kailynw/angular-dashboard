import csv, json, pathlib

csvFilePath = str(pathlib.Path('data.csv').parent.absolute()) + '\\data\\data.csv'
jsonFilePath = str(pathlib.Path('data.json').parent.absolute()) + '\\data\\data.json'

def main():
    data = {}
    with open(csvFilePath) as csvFile:
        csvReader = csv.DictReader(csvFile, delimiter='|')
        for row in csvReader:
            id = row['Date']
            data[id]= row

    with open(jsonFilePath, 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent=4))

main()
