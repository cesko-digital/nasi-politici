using HlidacStatu.NasiPolitici.ExternalApiData.Dto;

namespace HlidacStatu.NasiPolitici.ExternalApiData
{
    public interface IDataSource
    {
        PersonSearchResult Search(string text);
        
        Person GetPoliticianData(string id);
    }
}
