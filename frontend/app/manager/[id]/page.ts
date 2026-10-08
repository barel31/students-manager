import { getPost } from '@/posts/data'
 
export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const data = await getStudent(id)
 
  return (
    <div>
      <h1>{data.title}</h1>
      {/* ... */}
    </div>
  )
}