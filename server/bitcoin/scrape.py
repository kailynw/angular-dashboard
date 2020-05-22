import requests
import datetime
import os
import bs4
import json
import pathlib
import bs4



def todaysdate():
    now = datetime.datetime.now()
    year = '{:02d}'.format(now.year)
    month = '{:02d}'.format(now.month)
    day = '{:02d}'.format(now.day)
    date="{}{}{}".format(year,month,day)
    return date


def main():
    
    jsonFilePath = os.path.dirname(os.path.abspath(__file__))+"/data.json"

    currentPrice = requests.get('https://api.alternative.me/v2/ticker/bitcoin/').json()['data']['1']['quotes']['USD']['price']
    todaysDate = datetime.datetime.now()
    todaysDate = '{} {}, {}'.format(todaysDate.strftime('%b'), todaysDate.strftime('%d'), todaysDate.strftime('%Y'))

    date = todaysdate()
    response = requests.get('https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20130428&end='+date).text
    soup = bs4.BeautifulSoup(response, 'lxml')
    td = soup.find(lambda tag: tag.name == 'div' and tag.get('class', '') == ['cmc-table__table-wrapper-outer']).contents[0].contents[0].contents[1].contents
    Headers = ['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'Market Cap']
    data = {}
    data[todaysDate]= {'Date':todaysDate, 'Close': '{:,.2f}'.format(currentPrice)}
    for i in td:
        data[i.contents[0].contents[0].contents[0]] = {Headers[0]: i.contents[0].contents[0].contents[0], Headers[1]: i.contents[1].contents[0].contents[0], Headers[2]: i.contents[2].contents[0].contents[0], Headers[3]: i.contents[3].contents[0].contents[0], Headers[4]: i.contents[4].contents[0].contents[0], Headers[5]: i.contents[5].contents[0].contents[0], Headers[6]: i.contents[6].contents[0].contents[0]} 
    
    with open(jsonFilePath, 'w') as jsonFile:
        jsonFile.write(json.dumps(data, indent=4))


main()
