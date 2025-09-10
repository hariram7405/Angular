using BugTrcaker.MVC.Models;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Json;

namespace BugTrcaker.MVC.Controllers
{
    public class BugViewController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<BugViewController> _logger;

        public BugViewController(IHttpClientFactory factory, ILogger<BugViewController> logger)
        {
            _httpClient = factory.CreateClient("BugTracker.API");
            _logger = logger;
        }

        public async Task<IActionResult> Index()
        {
            var bugs = await _httpClient.GetFromJsonAsync<IEnumerable<BugViewModel>>("BugView/Bugs");
            return View(bugs);
        }

        public async Task<IActionResult> Details(int id)
        {
            var bug = await _httpClient.GetFromJsonAsync<BugViewModel>($"BugView/BugDetails/{id}");
            return View(bug);
        }
    }
}