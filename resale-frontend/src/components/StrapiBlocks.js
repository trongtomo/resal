'use client'

import MarkdownRenderer from './MarkdownRenderer'

export default function StrapiBlocks({ blocks = [] }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        switch (block.__component) {
          case 'shared.rich-text':
            return (
              <div key={index} className="prose max-w-none">
                <MarkdownRenderer content={block.body} />
              </div>
            )
          
          case 'shared.media':
            return (
              <div key={index} className="my-8">
                {block.file?.url ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${block.file.url}`}
                    alt={block.alternativeText || ''}
                    className="w-full h-auto rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">No image</p>
                    </div>
                  </div>
                )}
                {block.caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center italic">
                    {block.caption}
                  </p>
                )}
              </div>
            )
          
          case 'shared.quote':
            return (
              <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-4 my-8 bg-gray-50 rounded-r-lg">
                <p className="text-lg italic text-gray-700 mb-2">
                  "{block.body}"
                </p>
                {block.author && (
                  <cite className="text-sm text-gray-600 font-medium">
                    — {typeof block.author === 'string' ? block.author : block.author.name || block.author.email || 'Unknown'}
                  </cite>
                )}
              </blockquote>
            )
          
          case 'shared.slider':
            return (
              <div key={index} className="my-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {block.files?.map((file, fileIndex) => (
                    <div key={fileIndex} className="relative">
                      {file.url ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${file.url}`}
                          alt={file.alternativeText || ''}
                          className="w-full h-48 object-cover rounded-lg shadow-sm"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-gray-400 text-center">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xs">No image</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          
          default:
            return null
        }
      })}
    </div>
  )
}
