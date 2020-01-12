import requests
import datetime

now = datetime.datetime.now()

response = requests.post('https://us-central1-cross-care-d73be.cloudfunctions.net/usersDetail', data={'userId': '1','userName':'Neko','eggName':'Pengin','update':now})
print(response.status_code)    # HTTPのステータスコード取得
print(response.text)    # レスポンスのHTMLを文字列で取得
