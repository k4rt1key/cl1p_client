import { FilePreviewTest } from '@/components/FilePreviewTest';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Enhanced File Preview Demo</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Test the enhanced file preview functionality with different file types
          </p>
        </div>
        <FilePreviewTest />
      </div>
    </div>
  );
} 