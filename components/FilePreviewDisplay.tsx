'use client';

import { File, FileText, Image as ImageIcon, Video, Music, Archive, Download, Eye } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface FilePreviewProps {
    url: string,
    fileName: string,
    mimeType?: string,
    size?: number
}

export function FilePreviewDisplay({ url, fileName, mimeType = '', size = 0 }: FilePreviewProps) {
    const [imageError, setImageError] = useState(false);

    const getFileIcon = (mimeType: string | undefined) => {
        const type = (mimeType || '').toLowerCase();
        if (type.startsWith('image/')) return <ImageIcon className="w-6 h-6" />;
        if (type.startsWith('video/')) return <Video className="w-6 h-6" />;
        if (type.startsWith('audio/')) return <Music className="w-6 h-6" />;
        if (type === 'application/pdf') return <FileText className="w-6 h-6" />;
        if (type.includes('zip') || type.includes('rar') || type.includes('7z')) return <Archive className="w-6 h-6" />;
        return <File className="w-6 h-6" />;
    };

    const getFilePreview = () => {
        const type = (mimeType || '').toLowerCase();

        if (type.startsWith('image/') && !imageError) {
            return (
                <Image
                    src={url}
                    alt={fileName}
                    className="w-full h-full object-contain rounded"
                    width={400}
                    height={400}
                    loading="lazy"
                    onError={() => setImageError(true)}
                />
            );
        }

        if (type.startsWith('video/')) {
            return (
                <div className="relative w-full h-full">
                    <video
                        className="w-full h-full object-cover rounded"
                        preload="metadata"
                        controls={false}
                        muted
                    >
                        <source src={url} type={mimeType} />
                    </video>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded">
                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md">
                            <Video className="w-5 h-5 text-black" />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 rounded p-4">
                <div className="mb-2">{getFileIcon(mimeType)}</div>
                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide text-center">
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

    const getFileExtensionLabel = () => {
        if (!mimeType) {
            const ext = fileName.split('.').pop();
            return ext ? ext.toUpperCase() : 'FILE';
        }
        const type = mimeType.toLowerCase();
        if (type.startsWith('image/')) return type.split('/')[1]?.toUpperCase() || 'IMG';
        if (type === 'application/pdf') return 'PDF';
        if (['application/zip', 'application/x-zip-compressed'].includes(type)) return 'ZIP';
        if (['application/x-rar-compressed', 'application/vnd.rar'].includes(type)) return 'RAR';
        if (type === 'application/x-7z-compressed') return '7Z';
        if (type.startsWith('video/')) return type.split('/')[1]?.toUpperCase() || 'VIDEO';
        if (type.startsWith('audio/')) return type.split('/')[1]?.toUpperCase() || 'AUDIO';

        const ext = fileName.split('.').pop();
        return ext ? ext.toUpperCase() : 'FILE';
    };

    return (
        <div className="file-preview-minimal group">
            <div className="relative aspect-square overflow-hidden">
                <div className="w-full h-full">{getFilePreview()}</div>

                {/* Desktop Hover Actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100 hidden md:flex">
                    <div className="flex gap-2">
                        <button
                            className="p-2 bg-white/80 rounded hover:bg-white transition"
                            onClick={(e) => {
                                e.preventDefault();
                                window.open(url, '_blank');
                            }}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            className="p-2 bg-white/80 rounded hover:bg-white transition"
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

            <div className="p-3">
                <h3 className="font-medium text-sm truncate mb-2">{fileName}</h3>
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="uppercase">{getFileExtensionLabel()}</span>
                        <span>•</span>
                        <span>{formatFileSize(size)}</span>
                    </div>
                    {/* Mobile Actions */}
                    <div className="flex gap-1 md:hidden">
                        <button
                            className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(url, '_blank');
                            }}
                        >
                            <Eye className="w-3 h-3" />
                        </button>
                        <button
                            className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
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
