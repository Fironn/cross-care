import requests

response = requests.post('https://us-central1-cross-care-d73be.cloudfunctions.net/usersDetail', data={'userId': '0','userName':'Neko','eggName':'Inu'})
print(response.status_code)    # HTTPのステータスコード取得
print(response.text)    # レスポンスのHTMLを文字列で取得
