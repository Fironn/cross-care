import requests

response = requests.get('https://us-central1-cross-care-d73be.cloudfunctions.net/setData', params={'userId': '1'})
print(response.status_code)    # HTTPのステータスコード取得
print(response.text)    # レスポンスのHTMLを文字列で取得
