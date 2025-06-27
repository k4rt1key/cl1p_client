import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, Lock, Upload } from 'lucide-react'

export function InstructionCards() {
  const instructions = [
    {
      title: "Search for a Cl1p",
      content: "Enter a cl1p name and click search. If found, the cl1p content and files will be displayed.",
      icon: <Search className="w-5 h-5" />
    },
    {
      title: "Create a New Cl1p",
      content: "If a cl1p isn't found, you can create a new one with the same name. Add text, files, and an optional password.",
      icon: <Plus className="w-5 h-5" />
    },
    {
      title: "Password Protection",
      content: "You can add an optional password to your cl1p for extra security. Only those with the password can access it.",
      icon: <Lock className="w-5 h-5" />
    },
    {
      title: "File Sharing",
      content: "Upload and share files along with your cl1p text. All files are easily accessible when viewing the cl1p.",
      icon: <Upload className="w-5 h-5" />
    }
  ]

  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          How to Use Cl1p
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get started with these simple steps
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {instructions.map((instruction, index) => (
          <Card key={index} className="card-minimal">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  {instruction.icon}
                </div>
                <CardTitle className="text-lg font-semibold">
                  {instruction.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {instruction.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
