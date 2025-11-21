import { GoogleGenAI, Tool, GenerateContentResponse, Chat } from "@google/genai";
import { GeminiSearchResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * SEARCH GROUNDING
 * Uses gemini-2.5-flash with googleSearch tool
 */
export const searchHeritageInfo = async (query: string): Promise<GeminiSearchResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "I couldn't find specific information on that.";
    
    // Extract grounding chunks safely
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .map((chunk: any) => chunk.web)
      .filter((web: any) => web !== undefined)
      .map((web: any) => ({
        uri: web.uri,
        title: web.title
      }));

    return { text, sources };
  } catch (error) {
    console.error("Search Error:", error);
    throw new Error("Failed to perform search grounding.");
  }
};

/**
 * IMAGE ANALYSIS
 * Uses gemini-3-pro-preview for deep image understanding
 */
export const analyzeProductImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });
    return response.text || "Analysis failed to generate text.";
  } catch (error) {
    console.error("Analysis Error:", error);
    throw new Error("Failed to analyze image.");
  }
};

/**
 * IMAGE GENERATION
 * Uses imagen-4.0-generate-001
 */
export const generateMarketingImage = async (prompt: string, aspectRatio: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    // Handle the specific response structure for Imagen
    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    
    if (base64ImageBytes) {
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    
    throw new Error("No image data received");
  } catch (error) {
    console.error("Image Gen Error:", error);
    throw new Error("Failed to generate image. Please try again.");
  }
};

/**
 * CHAT BOT SESSION
 * Uses gemini-3-pro-preview
 */
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are a helpful, friendly customer support assistant for Heritage Nature Organics (UAE). You help customers find organic products, answer questions about health benefits (like Moringa, King Coconut Water), and assist with their shopping experience. You are polite, professional, and your answers are concise. If asked about pricing, refer to general ranges or advise checking the store page.",
    },
  });
};