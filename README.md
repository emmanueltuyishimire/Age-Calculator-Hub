# Calculator Hub - A Comprehensive Next.js Application

Welcome to the Calculator Hub, a full-featured web application built with Next.js and Firebase Studio. This project provides a wide array of free, accurate, and user-friendly age-related calculators, designed to be fast, accessible, and SEO-optimized.

## ✨ Features

- **🚀 Comprehensive Suite of Calculators**:
  - **Core Age Tools**: Chronological age, birthday countdowns, and age by year.
  - **Health & Scientific**: AI-powered Biological Age, Metabolic Age, and general health assessments.
  - **Pet Age**: Dog and Cat age converters based on modern veterinary science.
  
  - **Pregnancy & Fertility**: Due date, ovulation, gestational age, and pregnancy trackers.
  - **Financial Planning**: Social Security full retirement age calculator.
- **⚡ Blazing Fast Performance**: Built with Next.js App Router, Server Components, and optimized images for a top-tier user experience.
- **🎨 Modern, Responsive UI**: Styled with Tailwind CSS and ShadCN UI components for a clean, accessible, and professional look on any device.
- **🧠 AI-Powered Insights**: The Biological Age Calculator uses Google's Gemini model via Genkit to provide personalized health insights.
- **SEO Optimized**: Fully optimized for a sitemap, `robots.txt`, and structured data (JSON-LD) for articles and FAQs.
- **Monetization Ready**: Configured for Google AdSense integration.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Deployment**: Configured for [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) & Netlify

## 🚀 Getting Started

To get the project running locally, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤖 Enabling AI Features (Biological Age Calculator)

The Biological Age Calculator uses the Google Gemini API to provide AI-powered insights. To enable this feature, you need to get a free API key and add it to your project.

1.  **Get a Free API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to generate a free Gemini API key.
2.  **Create an Environment File**: In the root of your project, create a file named `.env`.
3.  **Add Your Key**: Add your API key to the `.env` file in the following format:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```

The application will now automatically use this key to power the Biological Age Calculator.

##  monetizing Monetizing with Google AdSense

The site is set up to display ads via Google AdSense. To enable this and start earning revenue, you must configure two things:

1.  **Update Your Publisher ID**:
    - Open the file `src/app/layout.tsx`.
    - Find the AdSense script tag and replace the placeholder with **your own Google AdSense Publisher ID**.

2.  **Authorize Your Site**:
    - Open the `public/ads.txt` file.
    - Replace the placeholder with **your own Google AdSense Publisher ID**. This file is crucial for advertisers to verify that your site is authorized to sell ad inventory.

Once these steps are completed, AdSense will be correctly configured for your site.
