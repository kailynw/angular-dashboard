import csv
import datetime
import json
import pathlib

import requests

csv_file_link = 'https://raw.githubusercontent.com/RamiKrispin/coronavirus-csv/master/coronavirus_dataset.csv'
txtFilePath = pathlib.Path('coronaText.txt').parent.absolute().as_posix() + '/server/corona/coronaText.txt'
jsonFilePath = pathlib.Path('coronaData.json').parent.absolute().as_posix() + '/server/corona/coronaData.json'


def get_prev_date(currentDate):
    currentDate = currentDate.split(sep='-')
    if (currentDate == ['2020','01','22']):
        return False
    else:
        currentDateTime = datetime.datetime(int(currentDate[0]), int(currentDate[1]), int(currentDate[2])) - datetime.timedelta(days=1)
        return "{}-{:02d}-{:02d}".format(currentDateTime.year, currentDateTime.month, currentDateTime.day)


def reformat_date(unformated):
    unformated = unformated.split(sep='-')
    formated = datetime.datetime(int(unformated[0]), int(unformated[1]), int(unformated[2]))
    return '{} {}, {}'.format(formated.strftime('%b'), formated.strftime('%d'), formated.strftime('%Y'))


def main():
    data = {}
    csvFile = requests.get(csv_file_link).text
    with open(txtFilePath, 'w') as textFile:
        print(csvFile, file=textFile)

    with open(txtFilePath, 'r') as csvFile:
        csvReader = csv.DictReader(csvFile, delimiter=',')
        for row in csvReader:
            del row['Country.Region']
            del row['Lat']
            del row['Long']
            del row['Province.State']
            del row['type']
            id = row["date"]
            row['cases'] = int(row.get('cases')) + int(data.get(id, row)['cases'])
            data[id] = row
    newData = {}
    for day in data:
        prev = get_prev_date(day)
        reformatedDate = reformat_date(day)
        if prev:
            data[day]['cases'] = data[day].get('cases') + data[prev].get('cases')
        data[day]['date'] = reformatedDate
        newData[reformatedDate] = data[day]

    with open(jsonFilePath, 'w') as jsonFile:
        jsonFile.write(json.dumps(newData, indent=4))

main()


