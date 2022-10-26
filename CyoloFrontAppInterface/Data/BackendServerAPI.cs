#nullable disable
using Newtonsoft.Json;
using RestSharp;
using System.Linq.Expressions;

namespace CyoloFrontAppInterface.Data
{
    public class BackendServerAPI
    {
        private RestClient _client;
        public BackendServerAPI()
        {
            _client = new RestClient("https://cyoloapigateway.azure-api.net");
        }

        public void Dispose()
        {

        }

        public async Task<dynamic> GetCourtCaseByEmailAndDate(string email, string date)
        {
            var request = new RestRequest($"/api/Custom/CourtCaseByDateAndEmail/{date}/{email}");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }

        public async Task<dynamic> GetCourtCaseByNameAndDate(string lawyername, string date)
        {
            var request = new RestRequest($"/api/Custom/CourtCaseByDateAndName/{date}/{lawyername}");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }

        public async Task<dynamic> GetLawyersByCourtcaseno(string courtcaseno)
        {
            var request = new RestRequest($"/api/Custom/LawyersByCourtCaseId/{courtcaseno}");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }

        public async Task<dynamic> GetAllCourtTypes()
        {
            var request = new RestRequest($"/api/Custom/AllCourtTypes");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }

        public async Task<dynamic> GetAllCourtLocations()
        {
            var request = new RestRequest($"/api/Custom/AllCourtLocations");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }
        public async Task<dynamic> GetAllChamberIDs()
        {
            var request = new RestRequest($"/api/Custom/AllChamberIDs");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }

    }
}
