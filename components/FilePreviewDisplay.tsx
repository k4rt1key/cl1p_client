interface FilePreviewProps {
    url: string,
    fileName: string
    contentType: string
}

export function FilePreviewDisplay({ url, fileName, contentType }: FilePreviewProps) {

    const getFilePreview = ({ url, fileName, contentType }: FilePreviewProps) => {
        if (['jpg', 'jpeg', 'png', 'gif'].includes(contentType)) {
            return (
                <img
                    src={url}
                    alt={fileName}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg"
                />
            )
        } else if (contentType === 'pdf') {
            return (
                <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                    <span className="text-4xl">📄</span>
                </div>
            )
        } else if (['mp4', 'webm', 'ogg'].includes(contentType)) {
            return (
                <video className="w-full h-full object-cover rounded-lg">
                    <source src={url} type={`video/${contentType}`} />
                    Your browser does not support the video tag.
                </video>
            )
        } else {
            return (
                <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
                    <span className="text-4xl">📎</span>
                </div>
            )
        }
    }

    return (
        <a href={url} target='_blank'>
            <div className={`relative rounded-lg overflow-hidden transition-all duration-200`}>
                <div className="bg-card p-4 aspect-square flex flex-col">
                    <div className="flex-1 flex items-center justify-center bg-muted rounded-lg mb-4">
                        {getFilePreview({ url, fileName, contentType })}
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate text-foreground">{fileName}</p>
                        </div>
                    </div>
                </div>
            </div>

        </a>
    )
}

