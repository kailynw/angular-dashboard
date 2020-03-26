import requests
import datetime
import csv
import bs4
import pandas as pd
from bs4 import BeautifulSoup

def main():
    date= todaysdate()
    response = requests.get('https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20130428&end='+date)
    with open('bitcoin/coinmarketdata.txt', 'w') as txt:
        data = response.text
        soup = BeautifulSoup(data, 'html.parser')
        td = soup.find_all('td')
        for i in td:
            value = i.contents[0].contents[0]
            input = value + "|"
            txt.write(str(input))
        txt.close()
    readcoin()

  
def readcoin():
    with open('bitcoin/coinmarketdata.txt', 'r') as csvfile:
        data = csv.reader(csvfile, delimiter='|')
        with open('bitcoin/data.csv', 'w') as c:
            cwriter = csv.writer(c, delimiter='|')
            i = 0
            l = list()
            cwriter.writerow(['Date','Open', 'High', 'Low', 'Close' ])
            for row in data:
                for word in row:
                    if(i==5):
                        i+=1
                    elif(i==6):
                        cwriter.writerow(l)
                        l = list()
                        i=0
                    else:
                        l.append(word)
                        i+=1
    readdata()

def readdata():
    data = pd.read_csv("bitcoin/data.csv", delimiter="|")
    print(data)

def todaysdate():
    now = datetime.datetime.now()
    year = '{:02d}'.format(now.year)
    month = '{:02d}'.format(now.month)
    day = '{:02d}'.format(now.day)
    date="{}{}{}".format(year,month,day)
    return date

main()
