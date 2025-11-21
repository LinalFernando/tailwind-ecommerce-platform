<div align="center">
  <img src="https://heritagelanka.com/wp-content/uploads/2024/05/Heritage-logo-description.png" alt="Heritage Nature Organics Logo" width="200" />
  
  <br />

  # 🌿 Heritage Nature Organics 🌿
  
  **A Next-Generation E-Commerce Experience Powered by Google Gemini AI**

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-ai-implementation">AI Architecture</a> •
    <a href="#-license">License</a>
  </p>

  ![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-8E75B2?style=for-the-badge&logo=google&logoColor=white)
</div>

<br />

## 📖 About The Project

**Heritage Nature Organics** is a premium e-commerce platform designed to bridge the gap between traditional organic farming and modern artificial intelligence. 

Beyond a standard storefront, this application leverages the **Google GenAI SDK** to provide a multimodal shopping experience. Customers can chat with an AI expert, analyze product ingredients by uploading photos, and even generate creative marketing assets—all within a beautiful, responsive UI inspired by nature.

---

## ✨ Features

### 🛍️ Smart E-Commerce
*   **Dynamic Storefront:** Filter products by category, price, origin, and dietary badges.
*   **Interactive Modals:** Detailed product views with galleries and nutrition info.
*   **Secure Checkout Simulation:** A custom-built, multi-step payment gateway UI with validation and success states.

### 🤖 AI-Powered Capabilities
*   **🛒 Context-Aware Chatbot:** Powered by `gemini-3-pro-preview`, the assistant answers customer queries about health benefits and product availability with a specific system persona.
*   **📸 Visual Product Analysis:** Users can upload photos of food items or labels. The app uses Multimodal AI to identify ingredients, assess organic authenticity, and summarize nutrition facts.
*   **🎨 Creative Studio:** An integrated marketing tool using `imagen-4.0-generate-001` that allows users to generate high-quality promotional imagery for products.
*   **🌐 Grounded Search:** The "Ask AI" feature uses `gemini-2.5-flash` with Google Search Grounding to provide up-to-date information sourced directly from the web.

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS, Lucide React Icons |
| **AI / ML** | Google GenAI SDK (@google/genai) |
| **Models** | Gemini 3.0 Pro, Gemini 2.5 Flash, Imagen 4.0 |
| **Routing** | React Router DOM |
| **State** | React Hooks, LocalStorage Persistence |

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   npm or yarn
*   A Google Cloud Project with the Gemini API enabled

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/tailwind-ecommerce-platform.git
    cd tailwind-ecommerce-platform
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Google API key:
    ```env
    GEMINI_API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the application**
    ```bash
    npm start
    ```
    The app will launch at `http://localhost:3000`.

---

## 🧠 AI Implementation Details

This project demonstrates several advanced patterns using the `@google/genai` SDK:

### 1. Multimodal Analysis (`/analysis`)
We utilize **Gemini 3 Pro**'s vision capabilities to process Base64 image strings.
```typescript
const response = await ai.models.generateContent({
  model: "gemini-3-pro-preview",
  contents: {
    parts: [
      { inlineData: { mimeType: "image/jpeg", data: base64Image } },
      { text: "Analyze this product label for nutritional content..." }
    ]
  }
});
