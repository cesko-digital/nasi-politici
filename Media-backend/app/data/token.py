from os import environ

token_string = environ.get("MEDIA_TOKEN")
media_url = environ.get("MEDIA_URL")

if not token_string or token_string == '':
    raise Exception("Missing media token.")

if not media_url or media_url == '':
    raise Exception("Missing media url.")
