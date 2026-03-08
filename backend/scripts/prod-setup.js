/**
 * PROD CHECK & SETUP SCRIPT
 * Run this on the server before starting the app
 */
const fs = require('fs');
const path = require('path');

console.log("🚀 Starting Production Check for GuineaLogement...");

// 1. Check directories
const dirs = ['uploads', 'uploads/kyc'];
dirs.forEach(dir => {
    const fullPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(fullPath)) {
        console.log(`📁 Creating directory: ${dir}`);
        fs.mkdirSync(fullPath, { recursive: true });
    } else {
        console.log(`✅ Directory exists: ${dir}`);
    }
});

// 2. Check environment
const requiredEnv = ['DATABASE_URL', 'JWT_SECRET', 'GROQ_API_KEY'];
const missing = requiredEnv.filter(key => !process.env[key]);

if (missing.length > 0) {
    console.warn(`⚠️ Warning: Missing Env Vars: ${missing.join(', ')}`);
    console.warn("Ensure these are set in your hosting provider (Render/Vercel).");
} else {
    console.log("✅ Core Environment Variables found.");
}

console.log("🏁 Setup Check Complete. Ready to fly!");
