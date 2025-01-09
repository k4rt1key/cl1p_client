import { Cl1pContent } from '@/components/Cl1pContent'

export default function Cl1pPage({ params }: { params: { name: string } }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Cl1pContent name={params.name} />
    </div>
  )
}

