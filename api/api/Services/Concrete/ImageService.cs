using api.Options;
using api.Services.Abstract;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;

namespace api.Services.Concrete
{
    public class ImageService : IImageService

    {
        private readonly AzureOptions _azureOptions;

        public ImageService(IOptions<AzureOptions> azureOptions)
        {
            _azureOptions = azureOptions.Value;
        }
        public string UploadImageToAzure(IFormFile file) 
        {
            string fileExtension =  Path.GetExtension(file.FileName);

            using MemoryStream fileUploadStream = new MemoryStream();
            file.CopyTo(fileUploadStream);
            fileUploadStream.Position = 0;

            BlobContainerClient blobContainerClient = new BlobContainerClient(
                _azureOptions.ConnectionString, _azureOptions.Container
                );

           // var filePath = Path.Combine(pathImages, imageName);
         /*   using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }*/
            var uniqueName = Guid.NewGuid().ToString() + fileExtension;
            BlobClient blobClient = blobContainerClient.GetBlobClient(uniqueName);

            blobClient.Upload(fileUploadStream, new BlobUploadOptions()
            {
                HttpHeaders = new BlobHttpHeaders
                {
                    ContentType = "image/bitmap"
                }
            }, cancellationToken: default);
            return uniqueName;
        }
    }
}
