using CyoloFrontAppInterface.Data;
using Microsoft.AspNetCore.Mvc;

namespace CyoloFrontAppInterface.Controllers
{
    public class AgendaController1 : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("Create")]
        // POST: AgendaController/Create
        public async Task<JsonResult?> Create()
        {
            JsonResult? result = null;
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("userinfo")))
            {
                return result;
            }
            BackendServerAPI ls = new BackendServerAPI();
            var lawyer = await ls.GetLawyerByEmail(HttpContext.Session.GetString("userinfo"));
            //var response = await ls.SetAvailableCourtCaseNo(caseno, lawyer.id);
            //result = new JsonResult(response);
            return new JsonResult(result);
        }
    }
}
