using System.Net;

namespace WEB_API.BLL
{
    public class ServerResponse
    {
        public required string Message { get; set; }
        public bool IsSuccess { get; set; } = true;
        public object? Data { get; set; } = null;
        public HttpStatusCode HttpStatusCode { get; set; } = HttpStatusCode.OK;
    }
}
