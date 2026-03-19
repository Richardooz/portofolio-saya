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

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query()->where('published', true);

        if ($request->filled('tech')) {
            $query->whereJsonContains('technologies', $request->string('tech'));
        }

        return response()->json([
            'projects' => $query->latest()->get(),
        ]);
    }
}`
    },
    {
      language: "Python AI",
      code: `import tensorflow as tf
from tensorflow.keras import layers

def build_tb_classifier(input_shape=(224, 224, 3)):
    base = tf.keras.applications.EfficientNetB0(
        include_top=False,
        input_shape=input_shape,
        weights="imagenet"
    )
    base.trainable = False

    model = tf.keras.Sequential([
        layers.Input(shape=input_shape),
        base,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.3),
        layers.Dense(1, activation="sigmoid")
    ])

    model.compile(
        optimizer="adam",
        loss="binary_crossentropy",
        metrics=["accuracy", tf.keras.metrics.AUC(name="auc")]
    )

    return model`
    },
    {
      language: "React",
      code: `const Portfolio = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/public/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects ?? []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="portfolio">
      {loading && <p>Loading projects...</p>}
      {projects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  )
}`
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
