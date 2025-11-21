
import React, { useState } from 'react';
import { generateMarketingImage } from '../services/geminiService';
import { ImageAspectRatio } from '../types';
import { Image as ImageIcon, Loader2, Download, Wand2 } from 'lucide-react';

const Studio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<ImageAspectRatio>(ImageAspectRatio.SQUARE);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const result = await generateMarketingImage(prompt, aspectRatio);
      setGeneratedImage(result);
    } catch (error) {
      console.error(error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-heritage-cream py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 opacity-0 animate-slideUp">
          <h1 className="text-4xl font-serif font-bold text-heritage-green mb-4">Creative Studio</h1>
          <p className="text-gray-600">Generate unique marketing assets for your products using Imagen 4.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit opacity-0 animate-slideUp delay-100">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="w-full p-4 border border-gray-300 bg-white rounded-xl focus:border-heritage-green focus:ring-1 focus:ring-heritage-green outline-none resize-none transition-all shadow-sm text-gray-900 placeholder-gray-400 hover:border-heritage-green/50"
                  placeholder="e.g., A bottle of king coconut water on a sandy beach at sunset, professional photography"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Aspect Ratio</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(ImageAspectRatio).map(([key, value]) => {
                     if (key === 'WIDE' && value === '16:9') return null; // De-dupe
                     return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setAspectRatio(value as ImageAspectRatio)}
                        className={`py-3 px-3 text-sm border rounded-xl transition-all duration-200 font-medium ${
                          aspectRatio === value
                            ? 'bg-heritage-green text-white border-heritage-green shadow-md scale-105'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {value} ({key})
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full bg-heritage-accent text-heritage-green font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                Generate Asset
              </button>
            </form>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center min-h-[500px] opacity-0 animate-slideUp delay-200 relative overflow-hidden">
            {loading ? (
              <div className="text-center animate-fadeIn">
                <div className="w-20 h-20 border-4 border-heritage-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium animate-pulse">Creating your masterpiece...</p>
                <p className="text-xs text-gray-400 mt-2">This uses Imagen 4.0</p>
              </div>
            ) : generatedImage ? (
              <div className="w-full h-full flex flex-col items-center animate-popIn">
                <img 
                  src={generatedImage} 
                  alt="Generated" 
                  className="rounded-lg shadow-md max-h-[500px] object-contain mb-4" 
                />
                <div className="flex gap-4">
                    <a 
                      href={generatedImage} 
                      download={`heritage-generated-${Date.now()}.jpg`}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl transition-all font-bold hover:shadow-md"
                    >
                      <Download size={18} /> Download
                    </a>
                    <button 
                       onClick={() => setGeneratedImage(null)}
                       className="text-sm text-gray-500 hover:text-red-500 underline transition-colors"
                    >
                        Clear
                    </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-300 animate-fadeIn">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ImageIcon size={40} className="opacity-50" />
                </div>
                <p className="text-xl font-serif font-bold text-gray-400">Image preview will appear here</p>
                <p className="text-sm mt-2">Enter a prompt to start creating</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;
