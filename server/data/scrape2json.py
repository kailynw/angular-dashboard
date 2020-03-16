import csv, json, pathlib


csvFilePath = pathlib.Path('data.csv').parent.absolute()
jsonFilePath = pathlib.Path('data.json').parent.absolute()

def main():
    data = {}
    with open(csvFilePath.as_posix() + '/data/data.csv') as csvFile:
        csvReader = csv.DictReader(csvFile, delimiter='|')
        for row in csvReader:
            id = row['Date']
            data[id]= row

    with open(jsonFilePath.as_posix() + '/data/data.json', 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent=4))

main()
