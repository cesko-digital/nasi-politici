# NasiPolitici
Aplikace je tvořena třemi samostatnými službami - NasiPolitici (backend, .NET), Frontend (React) a Monitora-backend (služba poskytující články z médií, Python). Pro lokální prostředí je třeba zprovoznit minimálně backend a frontend. 

Následující návod popisuje nutné kroky ke zprovoznění celé aplikace. V jednotlivých adresářích jsou potom samostatná README s detaily pro konkrétní služby.
## Prerekvizity
Pro samotné spuštění aplikace je zapotřebí mít nainstalováno [.NET Core Runtime](https://dotnet.microsoft.com/download) podle používaného operačního systému.
Pokud chcete upravovat projekt, tak poté bude zapotřebí si nainstalovat [.NET Core SDK](https://dotnet.microsoft.com/download) podle používaného operačního systému.

Pro instalaci a spuštění frontendu je potřeba mít nainstalovaný [Yarn](https://yarnpkg.com/).

Pro spuštění Monitory je potřeba [Python3](https://www.python.org/). 

## Způsob spuštění
Prvním krokem je naklonování repozitáře:
```bash
$ git clone https://github.com/cesko-digital/nasi-politici
```

## NasiPolitici (backend)
Aplikace je ve složce `NasiPolitici` a příkazy je třeba pouštět v ní.

Nejprve je třeba pustit build projektu:
```bash
$ cd nasi-politici && dotnet publish
``` 
Výstup zobrazí cestu, kam byl uložen výsledek buildu. Další postup se liší podle operačního systému.

### Windows
Ve složce NasiPolitici spustit `NasiPolitici.exe` (je potřeba zadat celou cestu, tak jak se zobrazila na výstupu předchozího příkazu).

### Linux/Mac
Ve složce NasiPolitici spustit `dotnet NasiPolitici.dll` (je potřeba zadat celou cestu, tak jak se zobrazila na výstupu předchozího příkazu).

---
V obou případech by se měla objevit informace, že aplikace běží na adrese https://localhost:5001.

## Frontend
Ve složce Frontend je třeba spusti nejdříve `yarn install`, který nainstaluje závislosti, pak vytvořit lokální konfiguraci - zkopírovat soubor `.env-example` jako `.env` a nakonec aplikaci spustit pomocí `yarn start`.

Prohlížeč by se měl sám otevřít a zobrazit úvodní stránku.

## Monitora (volitelné)
Služba Monitora slouží k dohledávání online článků o politicích. Je v adresáři `Monitora-backend`. Není to nutné, ale obecně je lepší si pro vývoj vytvořit virtuální prostředí - [virtualenv](https://docs.python.org/3/library/venv.html). Potom je třeba nainstalovat závislosti pomocí `pip install -r requirements.txt`. Pak stačí aplikaci spustit příkazem `python main.py`. 

*POZOR*: Monitora ke svému fungování potřebuje token, který není veřejný. Pokud potřebujete vyvíjet něco na této části, ozvěte se na [Slacku](https://cesko-digital.slack.com/archives/CK0ER8UBG).
