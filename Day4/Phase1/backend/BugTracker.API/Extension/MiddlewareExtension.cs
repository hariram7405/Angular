using BugTracker.API.Middleware;
using Microsoft.AspNetCore.Builder;

namespace BugTracker.API.Extension
{
    public static class MiddlewareExtension
    {
        public static IApplicationBuilder UseGlobalExceptionMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<GlobalExceptionMiddleware>();
        }
    }
}
