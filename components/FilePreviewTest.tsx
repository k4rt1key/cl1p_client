import { FilePreviewDisplay } from './FilePreviewDisplay';

export function FilePreviewTest() {
    // Sample file data for testing
    const testFiles = [
        {
            url: "https://fileshare-v1-bucket.s3.ap-south-1.amazonaws.com/jay/file1.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWX2IF4JHXL5BOD7X%2F20250629%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250629T102758Z&X-Amz-Expires=3600&X-Amz-Signature=ae8400df04c936ecc97fbf7cbbd7e918427b7590461da2c8bd525fb16a27f919&X-Amz-SignedHeaders=host",
            fileName: "file1.pdf",
            size: 76785,
            mimeType: "application/pdf"
        },
        {
            url: "https://picsum.photos/400/400",
            fileName: "sample-image.jpg",
            size: 245760,
            mimeType: "image/jpeg"
        },
        {
            url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            fileName: "sample-video.mp4",
            size: 1048576,
            mimeType: "video/mp4"
        },
        {
            url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
            fileName: "sample-audio.wav",
            size: 512000,
            mimeType: "audio/wav"
        }
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Enhanced File Preview Test</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {testFiles.map((file, index) => (
                    <FilePreviewDisplay
                        key={index}
                        url={file.url}
                        fileName={file.fileName}
                        mimeType={file.mimeType}
                        size={file.size}
                    />
                ))}
            </div>
        </div>
    );
} 