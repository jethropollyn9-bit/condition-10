# Condition 10 

A premium, interactive e-commerce storefront for deadstock sneakers. Built entirely from scratch using React and Vite, Condition 10 goes beyond standard CRUD functionality by integrating AI-powered semantic search and translating real-world retail dynamics into digital UI architecture.

![Condition 10 Preview](./public/screenshot.png)

## Live Demo
[View the Live Deployment](https://condition-10.vercel.app/)

## Core Architecture & Technical Highlights

* **AI-Powered Semantic Search Engine:** Integrated the Google Gemini 2.5 Flash API via a Vercel serverless function to replace rigid, keyword-based searching. Parses natural language user queries (e.g., *"Show me casual white trainers under £150"*) and dynamically updates the React frontend's faceted navigation state. Includes strict prompt engineering and guardrails to handle out-of-scope requests gracefully.
* **"FOMO Engine" & Real-Time Global Inventory:** Lifted inventory state to the root `App.jsx` to serve as a single source of truth. Engineered a synchronized checkout flow that actively decrements global inventory and instantly locks down "Add to Cart" buttons across both standard and Quick View modals when an item hits a `stockLevel` of 0.
* **Modular Component Design:** Refactored a monolithic application into a highly decoupled, modular component tree, strictly separating routing logic from UI rendering to ensure scalability and ease of debugging.

## Additional Features

* **Dynamic Inventory Filtering:** Filter the vault by Brand, Gender, and Price using live React state management.
* **Global Shopping Cart:** A fully functional, persistent cart system with quantity adjustments, subtotal math, and smooth animations.
* **Algorithmic Tracking:** A "Recently Viewed" shelf that automatically tracks and displays your browsing history without duplicates.
* **Interactive Quick View:** A modal system for rapid size selection and cart additions.
* **Responsive Design:** A custom, fully responsive UI built with Tailwind CSS, featuring an animated countdown timer and hover-state slideshows.

## Tech Stack
* **Frontend:** React.js, Vite, React Router DOM
* **Styling:** Tailwind CSS
* **Backend / API:** Vercel Serverless Functions (Node.js)
* **Artificial Intelligence:** Google Generative AI (Gemini) SDK
* **Deployment & Hosting:** Vercel

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/jethropollyn9-bit/condition-10.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```