
import React, { useState, useEffect, useCallback } from 'react';
import { searchHeritageInfo } from '../services/geminiService';
import { GeminiSearchResponse } from '../types';
import { Search, Loader2, Globe } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Assistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<GeminiSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await searchHeritageInfo(searchQuery);
      setResult(response);
    } catch (err) {
      console.error(err);
      setResult({ text: "Sorry, I encountered an error while searching.", sources: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-search if URL has a query parameter
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(urlQuery);
      performSearch(urlQuery);
    }
  }, [searchParams, performSearch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query }); // Update URL to reflect state
    }
  };

  return (
    <div className="min-h-screen bg-heritage-cream py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 opacity-0 animate-slideUp">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-4 text-heritage-green">
             <Search size={32} />
          </div>
          <h1 className="text-4xl font-serif font-bold text-heritage-green mb-4">Heritage AI Assistant</h1>
          <p className="text-gray-600">Ask about our products, organic farming, or health benefits. Powered by Google Search.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 opacity-0 animate-slideUp delay-100">
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What are the benefits of King Coconut Water?"
              className="w-full pl-6 pr-16 py-5 text-lg border border-gray-300 rounded-xl focus:border-heritage-green focus:ring-1 focus:ring-heritage-green outline-none transition-all bg-white shadow-sm placeholder-gray-400 text-gray-900 hover:shadow-md"
            />
            <button 
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-3 top-2 bottom-2 bg-heritage-green text-white aspect-square rounded-lg hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex items-center justify-center shadow-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
            </button>
          </form>

          {loading && (
             <div className="mt-8 flex flex-col items-center justify-center text-heritage-green animate-fadeIn">
               <Loader2 size={32} className="animate-spin mb-2" />
               <p className="text-sm font-medium">Searching Heritage knowledge base...</p>
             </div>
          )}

          {result && !loading && (
            <div className="mt-8 animate-fadeIn">
              <div className="prose prose-green max-w-none">
                <div className="bg-heritage-light/50 p-6 rounded-xl border border-heritage-light shadow-sm animate-slideUp">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{result.text}</p>
                </div>
              </div>
              
              {result.sources.length > 0 && (
                <div className="mt-6 animate-slideUp delay-100">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Globe size={16} /> Sources
                  </h3>
                  <div className="grid gap-2">
                    {result.sources.map((source, idx) => (
                      <a 
                        key={idx}
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-heritage-green/30 transition-all text-sm text-heritage-green shadow-sm hover:shadow"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <span className="truncate font-medium">{source.title}</span>
                        <span className="text-xs text-gray-400 ml-4 flex-shrink-0">Visit</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {!result && !loading && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn delay-200">
               <p className="col-span-full text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Try asking</p>
               <button onClick={() => { setQuery("Benefits of Moringa powder"); performSearch("Benefits of Moringa powder"); }} className="text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-heritage-green hover:bg-heritage-light/20 transition-all text-gray-600 hover:text-heritage-green text-sm shadow-sm hover:shadow-md transform hover:-translate-y-1">
                 Benefits of Moringa powder
               </button>
               <button onClick={() => { setQuery("Is coconut oil keto friendly?"); performSearch("Is coconut oil keto friendly?"); }} className="text-left p-4 rounded-xl border border-gray-200 bg-white hover:border-heritage-green hover:bg-heritage-light/20 transition-all text-gray-600 hover:text-heritage-green text-sm shadow-sm hover:shadow-md transform hover:-translate-y-1">
                 Is coconut oil keto friendly?
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assistant;
