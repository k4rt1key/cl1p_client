import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function InstructionCards() {
  const instructions = [
    {
      title: "🔍 Search for a Cl1p",
      content: "Enter a cl1p name and click search. If found, the cl1p content and files will be displayed."
    },
    {
      title: "✨ Create a New Cl1p",
      content: "If a cl1p isn't found, you can create a new one with the same name. Add text, files, and an optional password."
    },
    {
      title: "🔒 Password Protection",
      content: "You can add an optional password to your cl1p for extra security. Only those with the password can access it."
    },
    {
      title: "📁 File Sharing",
      content: "Upload and share files along with your cl1p text. All files are easily accessible when viewing the cl1p."
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {instructions.map((instruction, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{instruction.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>{instruction.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
