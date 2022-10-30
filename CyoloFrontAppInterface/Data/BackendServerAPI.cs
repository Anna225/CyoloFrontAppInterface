#nullable disable
using CyoloFrontAppInterface.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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

        
        public async Task<LawyerDto> GetLawyerByEmail(string email)
        {
            var request = new RestRequest($"/api/Custom/GetlawyerByEmail/{email}");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<LawyerDto>(response.Content);
        }
        public async Task<CourtCaseAgendaDto> GetCourtCaseByNo(string courtCaseNo)
        {
            var request = new RestRequest($"/api/CourtCaseAgendas/GetCourtCaseByNo/{courtCaseNo}");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<CourtCaseAgendaDto>(response.Content);
        }
        public async Task<dynamic> GetCourtCaseByEmailAndDate(string email, string date)
        {
            var request = new RestRequest($"/api/Custom/CourtCaseByDateAndEmail/{date}/{email}");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }
        public async Task<dynamic> Login(UserDto userdto)
        {
            var request = new RestRequest($"/api/Auth/Login");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(userdto);
            var response = await _client.PostAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }
        public async Task<dynamic> GetByCourtCase(IFormCollection collection)
        {
            var request = new RestRequest($"/api/Lawyers/GetByCourtCase");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            request.AddHeader("Accept", "application/json");
            SearchDto searchdto = new SearchDto
            {
                CourtType = collection["courttype"],
                CourtLocation = collection["courtlocation"],
                ChamberID = collection["chamberid"],
                HearingDate = collection["hearingdate"],
                HearingTime = collection["hearingtime"]
            };
            request.AddJsonBody(searchdto);
            var response = await _client.PostAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }
        public async Task<dynamic> IsExist(UserDto userdto)
        {
            var request = new RestRequest($"/api/Auth/IsExist");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(userdto);
            var response = await _client.PostAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }
        public async Task<dynamic> Register(UserDto userdto)
        {
            var request = new RestRequest($"/api/Auth/Register");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            request.AddHeader("Accept", "application/json");
            request.AddJsonBody(userdto);
            var response = await _client.PostAsync(request);
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
        
        public async Task<dynamic> GetAvailableLawyersByCourtCaseNo(string courtcaseno)
        {
            var request = new RestRequest($"/api/Presentation/GetByCourtCaseNo/{courtcaseno}");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            var response = await _client.GetAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }
        public async Task<dynamic> SetAvailableCourtCaseNo(string courtcaseno, int lawyerid)
        {
            PresentationDto presentationdto = new PresentationDto
            {
                ID = 0,
                CourtCaseNo = courtcaseno,
                LawyerId = lawyerid,
                Available = 1
            };
            var request = new RestRequest($"/api/Presentation");
            request.AddHeader("ocp-apim-subscription-key", "d23d9c7c11da4b228417e567c85fa80c");
            request.AddJsonBody(presentationdto);
            var response = await _client.PostAsync(request);
            return JsonConvert.DeserializeObject<dynamic>(response.Content);
        }
        public async Task<dynamic> GetlawyerByEmail(string lawyeremail)
        {
            var request = new RestRequest($"/api/Lawyers/ByEmail/{lawyeremail}");
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
