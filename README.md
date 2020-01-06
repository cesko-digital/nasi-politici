# NasiPolitici

## Predispozice

Pro samotné spuštění aplikace je zapotřebí mít nainstalováno [.NET Core Runtime](https://dotnet.microsoft.com/download) podle používaného operačního systému.

Pokud chcete upravovat projekt, tak poté bude zapotřebí si nainstalovat [.NET Core SDK](https://dotnet.microsoft.com/download) podle používaného operačního systému.

## Způsob spuštění

- Naklonovat git repo

### Build

`dotnet publish` v rootu

vystup zobrazi cestu, kam to vybuildil.

### Windows

- ve složce viz vyse spustit `NasiPolitici.exe`

### Linux/Mac

- ve složce viz vyse spustit příkazem `dotnet NasiPolitici.dll`

## Zobrazení stránek

V browseru pak stačí zadat následující adresu http://localhost:5000/

Příklad:

search `https://localhost:5001/person/search/babis`

detail `https://localhost:5001/person/detail/andrej-babis`

## Způsob otevření projektu

Ve vašem oblíbeném textovém editoru, případně IDE si otevřete stažený Git repozitář.

## Env variables

### Frontend
 - /Frontend/.env pro base addressu
 
### Monitora-backend
 - /Monitora-backend/app/data/token.py pro token ke službě Monitory
