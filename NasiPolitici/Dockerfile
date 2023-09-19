# Start with the .NET 7.0 SDK as the build environment
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set your working directory within this image
WORKDIR /source

# Copy just the .csproj file and restore any dependencies
COPY *.csproj .
RUN dotnet restore

# Copy the source code into the image and publish the project
COPY . .
RUN dotnet publish -c release -o /executable

# Use the .NET 7.0 runtime image for the execution environment
FROM mcr.microsoft.com/dotnet/aspnet:7.0

# Set working directory
WORKDIR /app

# Copy over content and executables
COPY ./Content ./Content
COPY --from=build /executable .

# Expose port 5001 for the application to listen on
EXPOSE 5001

# Set the entry point for the app
ENTRYPOINT ["dotnet", "NasiPolitici.dll"]
