import csv, json, pathlib, requests, datetime


def main():
    csvFilePath = pathlib.Path('data.csv').parent.absolute()
    jsonFilePath = pathlib.Path('data.json').parent.absolute()

    # using requests to get json data from fear greed index api 
    currentPrice = requests.get('https://api.alternative.me/v2/ticker/bitcoin/').json()['data']['1']['quotes']['USD']['price']

    todaysDate = datetime.datetime.now()
    todaysDate = '{} {}, {}'.format(todaysDate.strftime('%b'), todaysDate.strftime('%d'), todaysDate.strftime('%Y'))


    data = {}
    data[todaysDate]= {'Date':todaysDate, 'Close': '{:,.2f}'.format(currentPrice)}
    with open(csvFilePath.as_posix() + '/bitcoin/data.csv') as csvFile:
        csvReader = csv.DictReader(csvFile, delimiter='|')
        for row in csvReader:
            id = row['Date']
            data[id]= row
        

    with open(jsonFilePath.as_posix() + '/bitcoin/data.json', 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent=4))

main()
