namespace api.Services.Abstract
{
    public interface IImageService
    {
        string UploadImageToAzure(IFormFile File);
    }
}
