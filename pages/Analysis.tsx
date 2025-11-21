import React, { useState, useRef } from 'react';
import { analyzeProductImage } from '../services/geminiService';
import { Camera, Upload, Loader2, Sparkles } from 'lucide-react';

const Analysis: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(''); // Clear previous analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const base64Data = image.split(',')[1];
      const result = await analyzeProductImage(
        base64Data,
        "Analyze this image. If it is a food product, list its likely ingredients, potential health benefits, and whether it appears to be organic/natural. If it's a label, summarize the nutrition facts."
      );
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      setAnalysis("Failed to analyze the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-heritage-cream py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 opacity-0 animate-slideUp">
          <h1 className="text-4xl font-serif font-bold text-heritage-green mb-4">AI Product Analysis</h1>
          <p className="text-gray-600">Upload a photo of any product or label to get instant health insights powered by Gemini 3 Pro.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[500px] opacity-0 animate-slideUp delay-100">
          {/* Input Section */}
          <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center bg-gray-50 transition-colors duration-500">
             <input 
               type="file" 
               accept="image/*" 
               ref={fileInputRef} 
               onChange={handleFileChange} 
               className="hidden" 
             />
             
             {image ? (
               <div className="relative w-full h-64 md:h-auto flex-1 rounded-lg overflow-hidden mb-6 shadow-md group animate-fadeIn">
                 <img src={image} alt="Uploaded" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 <button 
                   onClick={() => { setImage(null); setAnalysis(''); }}
                   className="absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full hover:bg-white transition-all shadow-sm hover:scale-110"
                 >
                   Change
                 </button>
               </div>
             ) : (
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="w-full h-64 md:h-80 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-heritage-green hover:bg-green-50 transition-all group hover:shadow-md"
               >
                 <div className="w-16 h-16 bg-green-100 text-heritage-green rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                   <Upload size={32} />
                 </div>
                 <p className="text-gray-500 font-medium group-hover:text-heritage-green transition-colors">Click to upload photo</p>
                 <p className="text-xs text-gray-400 mt-2">JPG, PNG supported</p>
               </div>
             )}

             <button
               onClick={handleAnalyze}
               disabled={!image || loading}
               className={`w-full mt-4 py-4 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                 !image || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-heritage-green hover:bg-green-900 shadow-lg hover:shadow-xl hover:-translate-y-1'
               }`}
             >
               {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
               {loading ? 'Analyzing...' : 'Analyze Product'}
             </button>
          </div>

          {/* Output Section */}
          <div className="w-full md:w-1/2 p-8 bg-white overflow-y-auto max-h-[600px] scroll-smooth">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 animate-fadeIn">
                <Loader2 className="animate-spin w-12 h-12 text-heritage-green" />
                <p className="animate-pulse">Gemini is examining your product...</p>
              </div>
            ) : analysis ? (
              <div className="prose prose-green animate-slideUp">
                <h3 className="text-xl font-serif font-bold text-heritage-green mb-4 border-b pb-2">Analysis Results</h3>
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {analysis}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 text-center animate-fadeIn">
                <Camera size={48} className="mb-4 opacity-20" />
                <p>Results will appear here after analysis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;