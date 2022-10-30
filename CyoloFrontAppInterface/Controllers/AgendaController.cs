using CyoloFrontAppInterface.Data;
using Microsoft.AspNetCore.Mvc;

namespace CyoloFrontAppInterface.Controllers
{
    public class AgendaController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        // POST: AgendaController/Create
        public async Task<JsonResult?> Create(AgendaDto agenda)
        {
            BackendServerAPI ls = new BackendServerAPI();
            var response = await ls.UploadAgenda(agenda);
            return new JsonResult(response);
        }
    }
}
