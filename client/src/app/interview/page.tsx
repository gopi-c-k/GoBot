// app/interview/page.tsx
export default function InterviewPage() {
  return (
    <div className="min-h-screen bg-[url('/images/bg-gradient.png')] bg-cover bg-center flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 p-10 rounded-xl text-white max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4">🎙️ GoBot Interview</h1>
        <p className="text-lg mb-6">Upload your resume, select a role, and begin your mock AI interview experience.</p>
        <button className="bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Start Interview
        </button>
      </div>
    </div>
  )
}