#Pull html from coinmarket. Convert to local html file.
import requests
import csv
import bs4
import pandas as pd
from bs4 import BeautifulSoup

def main():
        #use requests for get, put, post, delete
        response = requests.get('https://coinmarketcap.com/currencies/bitcoin/historical-data/?start=20130428&end=20200311')
        txt = open("coinmarketdata.txt", 'w')
        with open('coinmarket.html', 'w') as f:
                data = response.text
                soup = BeautifulSoup(data, 'html.parser')
                td = soup.find_all('td')
                for i in td:
                    value = i.contents[0].contents[0]
                    input = value + "|"
                    txt.write(str(input))
                f.write(data)
                f.close()
                txt.close()
        readcoin()

def readcoin():
    with open('coinmarket.csv', 'r') as csvfile:
        data = csv.reader(csvfile, delimiter='|')
        with open('data.csv', 'w') as c:
            cwriter = csv.writer(c, delimiter='|')
            i = 0
            l = list()
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
    data = pd.read_csv("data.csv", delimiter="|")
    print(data)

main()