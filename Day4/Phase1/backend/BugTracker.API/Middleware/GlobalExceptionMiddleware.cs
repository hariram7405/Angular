using BugTracker.Core.DTOs;
using BugTracker.Core.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace BugTracker.API.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger, IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var correlationId = context.TraceIdentifier;
            context.Response.ContentType = "application/json";

            int statusCode;
            string message;
            string? detail = null;

            switch (exception)
            {
                case NotFoundException nf:
                    statusCode = StatusCodes.Status404NotFound;
                    message = nf.Message;
                    detail = _env.IsDevelopment() ? nf.StackTrace : null;
                    break;

                case ValidationException ve:
                    statusCode = StatusCodes.Status400BadRequest;
                    message = ve.Message;
                    detail = _env.IsDevelopment() ? ve.StackTrace : null;
                    break;

                default:
                    statusCode = StatusCodes.Status500InternalServerError;
                    message = "An unexpected error occurred.";
                    detail = _env.IsDevelopment() ? exception.ToString() : null;
                    break;
            }

            context.Response.StatusCode = statusCode;

            _logger.LogError(exception, "Unhandled exception occurred. Method: {Method}, Path: {Path}, CorrelationId: {CorrelationId}", 
                context.Request.Method, context.Request.Path, correlationId);

            var response = new ErrorResponse
            {
                Message = message,
                CorrelationId = correlationId,
                Detail = detail
            };

            var json = JsonSerializer.Serialize(response);
            await context.Response.WriteAsync(json);
        }
    }
}
