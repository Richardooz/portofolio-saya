"use client"

interface TimelineItem {
  year: string
  title: string
  description: string
  icon?: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
      
      {items.map((item, index) => (
        <div key={index} className="relative flex items-start mb-8 group">
          <div className="absolute left-2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg group-hover:scale-110 transition-transform duration-200"></div>
          
          <div className="ml-12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 group-hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.year}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
