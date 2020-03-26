import json, pathlib, requests, datetime


def timestamp2Date(timestp):
    formatted = datetime.datetime.fromtimestamp(int(timestp))
    return '{} {}, {}'.format(formatted.strftime('%b'), formatted.strftime('%d'), formatted.strftime('%Y'))

def main():
    jsonFilePath = pathlib.Path('fearGreedData.py').parent.absolute().as_posix() + '/server/fearGreedIndex/fearGreedIndexData.json'
    fearGreed = requests.get('https://api.alternative.me/fng/?limit=0').json()['data']
    data = {}
    data["time_until_update"] = {'time_until_update': fearGreed[0]["time_until_update"]}
    del fearGreed[0]["time_until_update"]
    for value in fearGreed:
        newDate = timestamp2Date(value['timestamp'])
        del value['timestamp']
        value['Date'] = newDate
        data[newDate] = value
    
    with open(jsonFilePath, 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent=4))


main()
