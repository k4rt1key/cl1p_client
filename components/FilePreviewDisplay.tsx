import { File, FileText, Image as ImageIcon, Video, Music, Archive, Code, Presentation, Download, Eye } from 'lucide-react'

interface FilePreviewProps {
    url: string,
    fileName: string,
    mimeType?: string,
    size?: number
}

export function FilePreviewDisplay({ url, fileName, mimeType = '', size = 0 }: FilePreviewProps) {
    const getFileIcon = (mimeType: string | undefined) => {
        const type = (mimeType || '').toLowerCase();
        if (type.startsWith('image/')) return <ImageIcon className="w-6 h-6" />;
        if (type.startsWith('video/')) return <Video className="w-6 h-6" />;
        if (type.startsWith('audio/')) return <Music className="w-6 h-6" />;
        if (type === 'application/pdf') return <FileText className="w-6 h-6" />;
        if (type.includes('zip') || type.includes('rar') || type.includes('7z')) return <Archive className="w-6 h-6" />;
        return <File className="w-6 h-6" />;
    };

    const getFilePreview = ({ url, fileName, mimeType }: FilePreviewProps) => {
        const type = (mimeType || '').toLowerCase();
        if (type.startsWith('image/')) {
            return (
                <img
                    src={url}
                    alt={fileName}
                    className="w-full h-full object-cover rounded"
                    loading="lazy"
                />
            );
        }
        if (type.startsWith('video/')) {
            return (
                <div className="relative w-full h-full">
                    <video className="w-full h-full object-cover rounded" preload="metadata">
                        <source src={url} type={mimeType} />
                    </video>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded">
                        <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded p-4">
                <div className="mb-2">{getFileIcon(mimeType)}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {mimeType || 'File'}
                </p>
            </div>
        );
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Helper to get file extension label
    const getFileExtensionLabel = (fileName: string, mimeType?: string) => {
        if (!mimeType) {
            const ext = fileName.split('.').pop();
            return ext ? ext.toUpperCase() : 'FILE';
        }
        if (mimeType.startsWith('image/')) {
            return mimeType.split('/')[1]?.toUpperCase() || 'IMG';
        }
        if (mimeType === 'application/pdf') return 'PDF';
        if (
            mimeType === 'application/zip' ||
            mimeType === 'application/x-zip-compressed'
        ) return 'ZIP';
        if (
            mimeType === 'application/x-rar-compressed' ||
            mimeType === 'application/vnd.rar'
        ) return 'RAR';
        if (
            mimeType === 'application/x-7z-compressed'
        ) return '7Z';
        if (mimeType.startsWith('video/')) {
            return mimeType.split('/')[1]?.toUpperCase() || 'VIDEO';
        }
        if (mimeType.startsWith('audio/')) {
            return mimeType.split('/')[1]?.toUpperCase() || 'AUDIO';
        }
        // fallback to file extension
        const ext = fileName.split('.').pop();
        return ext ? ext.toUpperCase() : 'FILE';
    };

    return (
        <div className="file-preview-minimal group">
            <div className="relative aspect-square overflow-hidden">
                {/* File Preview */}
                <div className="w-full h-full">
                    {getFilePreview({ url, fileName, mimeType })}
                </div>
                {/* Hover Overlay - Desktop Only */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hidden md:flex">
                    <div className="flex gap-2">
                        <button
                            className="p-2 bg-white/80 rounded hover:bg-white transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(url, '_blank');
                            }}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            className="p-2 bg-white/80 rounded hover:bg-white transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = fileName;
                                link.click();
                            }}
                        >
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
            {/* File Info */}
            <div className="p-3">
                <h3 className="font-medium text-sm truncate mb-2">{fileName}</h3>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="uppercase">{getFileExtensionLabel(fileName, mimeType)}</span>
                        <span>•</span>
                        <span>{formatFileSize(size)}</span>
                    </div>
                    {/* Mobile Action Buttons - Always Visible on Mobile */}
                    <div className="flex gap-1 md:hidden">
                        <button
                            className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(url, '_blank');
                            }}
                        >
                            <Eye className="w-3 h-3" />
                        </button>
                        <button
                            className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = fileName;
                                link.click();
                            }}
                        >
                            <Download className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

