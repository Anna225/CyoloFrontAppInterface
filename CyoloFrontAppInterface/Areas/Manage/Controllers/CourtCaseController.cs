using CyoloFrontAppInterface.Controllers;
using CyoloFrontAppInterface.Data;
using CyoloFrontAppInterface.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.ComponentModel.DataAnnotations;
using Xamarin.Essentials;

namespace CyoloFrontAppInterface.Areas.Manage.Controllers
{
    [Area("Manage")]
    public class CourtCaseController : Controller
    {
        private readonly ILogger _logger;
        public CourtCaseController(ILogger<CourtCaseController> logger)
        {
            _logger = logger;
        }
        // GET: CourtCaseController
        public async Task<ActionResult> Index()
        {
            string date = DateTime.Now.ToString("yyyy-MM-dd");
            string email = HttpContext.Session.GetString("userinfo")!;
            if (string.IsNullOrEmpty(email))
            {
                return RedirectToAction("Login", "User", new { area = "" });
            }
            BackendServerAPI ls = new BackendServerAPI();
            try
            {
                ViewBag.Model = await ls.GetCourtCaseByEmailAndDate(email, date);
                ViewBag.Lawyer = await ls.GetLawyerByEmail(email);
            }
            catch(Exception ex)
            {
                ViewBag.Model = null;
                Console.WriteLine(ex);
            }

            ViewData["Message"] = HttpContext.Session.GetString("userinfo");
            ViewBag.Today = date;
            ViewBag.Email = email;

            ViewBag.CourtTypes = await ls.GetAllCourtTypes();
            ViewBag.CourtLocations = await ls.GetAllCourtLocations();
            ViewBag.ChamberIds = await ls.GetAllChamberIDs();

            return View();
        }

        // GET: CourtCaseController/GetByEmailAndDate
        public async Task<ActionResult> GetByEmailAndDate(string date, string name)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("userinfo")))
            {
                return RedirectToAction("Login", "User", new { area = "" });
            }

            if (date == null)
            {
                date = DateTime.Now.ToString("yyyy-MM-dd");
            }
            BackendServerAPI ls = new BackendServerAPI();
            try
            {
                ViewBag.Model = await ls.GetCourtCaseByNameAndDate(name, date);
                ViewBag.fullName = name;
            }
            catch (Exception ex)
            {
                ViewBag.Model = null;
                Console.WriteLine(ex);
            }
            ViewData["Message"] = HttpContext.Session.GetString("userinfo");
            ViewBag.Today = date;
            ViewBag.Email = name;
            return View();
        }
        
        // GET: CourtCaseController/Match
        public async Task<ActionResult> Match(string courtCaseNo)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("userinfo")))
            {
                return RedirectToAction("Login", "User", new { area = "" });
            }
            BackendServerAPI ls = new BackendServerAPI();
            ViewBag.CourtTypes = await ls.GetAllCourtTypes();
            ViewBag.CourtLocations = await ls.GetAllCourtLocations();
            ViewBag.ChamberIds = await ls.GetAllChamberIDs();
            ViewBag.Model = await ls.GetLawyersByCourtcaseno(courtCaseNo);
            ViewBag.CourtCase = await ls.GetCourtCaseByNo(courtCaseNo);
            LawyerDto lawyer = await ls.GetLawyerByEmail(HttpContext.Session.GetString("userinfo"));
            ViewBag.AvailableModel = await ls.GetAvailableLawyersByCourtCaseNo(courtCaseNo);
            ViewData["Message"] = lawyer.name + " " + lawyer.sureName;
            ViewBag.No = courtCaseNo;
            return View();
        }

        [HttpGet]
        // GET: CourtCaseController/Approve
        public async Task<JsonResult?> Approve(string caseno)
        {
            JsonResult? result = null;
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("userinfo")))
            {
                return result;
            }
            BackendServerAPI ls = new BackendServerAPI();
            var lawyer = await ls.GetLawyerByEmail(HttpContext.Session.GetString("userinfo"));
            var response = await ls.SetAvailableCourtCaseNo(caseno, lawyer.id);
            result = new JsonResult(response);
            return new JsonResult(result);
        }

        // POST: CourtCaseController/GetByCourtCase
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> GetByCourtCase(IFormCollection collection)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("userinfo")))
            {
                return RedirectToAction("Login", "User", new { area = "" });
            }
            BackendServerAPI ls = new BackendServerAPI();
            ViewBag.CourtTypes = await ls.GetAllCourtTypes();
            ViewBag.CourtLocations = await ls.GetAllCourtLocations();
            ViewBag.ChamberIds = await ls.GetAllChamberIDs();
            SearchDto retval = new SearchDto {
                CourtType = collection["courttype"],
                CourtCaseNo = collection["courtcaseno"],
                CourtLocation = collection["courtlocation"],
                ChamberID = collection["chamberid"],
                HearingDate = collection["hearingdate"],
                HearingTime = collection["hearingtime"]
            };
            ViewBag.CourtCase = retval;
            ViewBag.AvailableModel = await ls.GetByCourtCase(collection);
            ViewData["Message"] = HttpContext.Session.GetString("userinfo");
            ViewBag.Number = collection["courtcaseno"];
            LawyerDto lawyer = await ls.GetLawyerByEmail(HttpContext.Session.GetString("userinfo"));
            ViewBag.Name = lawyer.name + " " + lawyer.sureName;
            return View();
        }

        // GET: CourtCaseController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CourtCaseController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CourtCaseController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CourtCaseController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: CourtCaseController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CourtCaseController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: CourtCaseController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }

    public class AjaxRequest
    {
        public string caseno
        {
            get;
            set;
        }
    }
}
