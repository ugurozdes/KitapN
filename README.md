<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/3eda0424-2365-495a-a1a4-6507682ad23f

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment (Vercel)

Bu projeyi Vercel'e dağıtırken aşağıdaki ortam değişkenlerini (Environment Variables) eklemeniz gerekmektedir:

| Değişken Adı | Değer |
| :--- | :--- |
| `VITE_SUPABASE_URL` | Supabase Proje URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase Anon Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key |
| `VITE_GEMINI_API_KEY` | Gemini API Key |

## Supabase Kurulumu

1. `supabase/migrations` altındaki SQL dosyalarını Supabase SQL Editor üzerinden çalıştırın.
2. `supabase/seed.sql` dosyasını çalıştırarak örnek verileri yükleyin.
