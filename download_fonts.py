import urllib.request
import re
import os

urls = [
    "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&display=swap",
    "https://fonts.googleapis.com/css2?family=Marko+One&family=Ubuntu:wght@400&display=swap"
]
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
}

os.makedirs('src/fonts', exist_ok=True)
all_css = []

for url in urls:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        css = response.read().decode('utf-8')
        
    def replace_url(match):
        font_url = match.group(1)
        filename = font_url.split('/')[-1]
        filepath = os.path.join('src/fonts', filename)
        
        if not os.path.exists(filepath):
            print(f"Downloading {filename}...")
            font_req = urllib.request.Request(font_url, headers=headers)
            with urllib.request.urlopen(font_req) as font_res:
                with open(filepath, 'wb') as f:
                    f.write(font_res.read())
        return f"url('../fonts/{filename}')"

    new_css = re.sub(r'url\((https://[^\)]+)\)', replace_url, css)
    all_css.append(new_css)

with open('src/css/google-fonts.css', 'w') as f:
    f.write('\n'.join(all_css))

print("Done. Saved fonts and src/css/google-fonts.css")
