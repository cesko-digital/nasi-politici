from os import environ

token_string = environ.get("MONITORA_TOKEN")

if not token_string or token_string == '':
    raise Exception("Missing monitora token.")
