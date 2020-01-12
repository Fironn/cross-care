import requests

response = requests.post('https://us-central1-cross-care-d73be.cloudfunctions.net/setData', data={'userId': '0','add':2,'type':'cross'})
print(response.status_code)    # HTTPのステータスコード取得
print(response.text)    # レスポンスのHTMLを文字列で取得
