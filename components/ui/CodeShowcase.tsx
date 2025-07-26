"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CodeShowcase() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const codeExamples = [
    {
      language: "Laravel",
      code: `<?php

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
        ]);

        return User::create($validated);
    }
}`
    },
    {
      language: "React",
      code: `const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <div className="portfolio">
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};`
    }
  ]

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <div className="flex space-x-2">
          {codeExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-1 text-sm rounded ${
                activeTab === index 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {example.language}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyCode}
          className="text-gray-400 hover:text-white"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-gray-300">{codeExamples[activeTab].code}</code>
      </pre>
    </div>
  )
}
