using CyoloFrontAppInterface.Controllers;
using CyoloFrontAppInterface.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [AllowAnonymous]
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
            ViewData["Message"] = HttpContext.Session.GetString("userinfo");
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
}
