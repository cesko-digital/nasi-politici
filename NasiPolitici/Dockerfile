FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source

COPY *.csproj .
RUN dotnet restore

COPY . .

RUN dotnet publish -c release -o /executable --no-restore

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

WORKDIR /app

COPY ./Content ./Content
COPY --from=build /executable .
EXPOSE 5001

ENTRYPOINT ["dotnet", "NasiPolitici.dll"]