export function fixFileName(fileName: string | number): string {
    // Ensure fileName is a string
    if (typeof fileName !== 'string') {
        fileName = String(fileName); // Convert to string if not already
    }

    // Remove all invalid characters except alphanumeric and '.'
    let sanitized = fileName.replace(/[^a-zA-Z0-9.]/g, '');

    // Split into name and extension parts
    const parts = sanitized.split('.');

    if (parts.length < 2) {
        // If no extension, add a default one
        sanitized = `${parts[0] || 'default'}.txt`;
    } else {
        // Keep only the first name and extension, discard extra dots
        const namePart = parts[0].replace(/[^a-zA-Z0-9]/g, '') || 'default';
        const extPart = parts[1].replace(/[^a-zA-Z0-9]/g, '') || 'txt';
        sanitized = `${namePart}.${extPart}`;
    }

    return sanitized;
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getMaxFileSize(): number {
    return 25 * 1024 * 1024; // 25MB in bytes
}

export function getMaxFileSizeFormatted(): string {
    return formatFileSize(getMaxFileSize());
}