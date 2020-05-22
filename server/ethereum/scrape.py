import requests, datetime, pathlib, json, os
import bs4 


def todaysdate():
    now = datetime.datetime.now()
    year = '{:02d}'.format(now.year)
    month = '{:02d}'.format(now.month)
    day = '{:02d}'.format(now.day)
    date="{}{}{}".format(year,month,day)
    return date


def main():
    date = todaysdate()
    jsonFilePath = os.path.dirname(os.path.abspath(__file__))+"/ethereumData.json"
    
    response = requests.get('https://coinmarketcap.com/currencies/ethereum/historical-data/?start=20130428&end='+date).text
    soup = bs4.BeautifulSoup(response, 'lxml')
    td = soup.find(lambda tag: tag.name == 'div' and tag.get('class', '') == ['cmc-table__table-wrapper-outer']).contents[0].contents[0].contents[1].contents
    Headers = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'Market Cap']
    data = {}
    for i in td:
        data[i.contents[0].contents[0].contents[0]] = {Headers[0]: i.contents[0].contents[0].contents[0], Headers[1]: i.contents[1].contents[0].contents[0], Headers[2]: i.contents[2].contents[0].contents[0], Headers[3]: i.contents[3].contents[0].contents[0], Headers[4]: i.contents[4].contents[0].contents[0], Headers[5]: i.contents[5].contents[0].contents[0], Headers[6]: i.contents[6].contents[0].contents[0]}
    
    with open(jsonFilePath, 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent=4))


main()

