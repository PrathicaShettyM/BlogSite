# BlogSite

```bash
nodemon server.js
```

```bash
npm run dev
```
backend/
├── controllers/       # Business logic
├── models/            # Mongoose schemas (User.js, Post.js, etc.)
├── routes/            # API endpoints grouped by feature
├── middlewares/       # JWT auth, error handling
├── utils/             # Reusable helpers (token, pagination, AI calls)
├── config/            # DB connection
└── index.js           # Entry point


📦 blog-website/
├── backend/                # Express.js + MongoDB
│   ├── controllers/        # Logic for routes (e.g., postController.js)
│   ├── models/             # Mongoose schemas (User.js, Post.js)
│   ├── routes/             # API endpoints (auth.js, posts.js)
│   ├── middlewares/        # Auth middleware, error handler, etc.
│   ├── utils/              # Token logic, etc.
│   ├── config/             # DB config (mongoose.connect)
│   ├── index.js            # Main server file
│   └── .env                # Environment variables
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar, PostCard, etc.)
│   │   ├── pages/          # Pages (Home, Login, Register, Dashboard)
│   │   ├── services/       # API functions using axios
│   │   ├── App.js
│   │   └── main.jsx
│   └── public/
│
├── README.md
├── package.json
└── .gitignore


Blog Platform – Feature Overview (CFG Hackathon Prep)
A full-stack MERN blog platform with powerful backend capabilities, user interactivity features (comments, likes, ratings, bookmarks), and AI-driven analytics for authors.

✅ Functionalities to Develop
🔐 1. Authentication
- User Registration (username, email, password – hashed)
- Secure Login with JWT
- Auth middleware to protect routes

📝 2. Blog Management
- Create Post
- Edit/Delete Post (by owner)
- Get All Posts
- Get Single Post
- Get Posts by User

❤️ 3. Likes System
- Like/unlike a post
- Total like count per post
- Prevent duplicate likes

⭐ 4. Rating System
- Submit 1–5 star rating
- Average rating per post
- One rating per user per post

🔖 5. Bookmark System
- Bookmark/unbookmark post
- View all bookmarked posts (by user)

💬 6. Comment System
- Add comment on a post
- Delete own comment or as post author
- Fetch all comments per post

🔍 7. Search & Pagination
Search blog posts by:
- Author name
- Tags/topics
- Posts with highest likes
- Posts with highest ratings
- Paginate results (e.g., ?page=1&limit=10)
- Sort options: Most recent / Most liked / Best rated

📊 8. Author Dashboard with AI Analytics
- Realtime Post Stats
- Likes, Comments, Ratings, Bookmarks (per post)


✅ Frontend Functionalities (React)
👤 1. Auth Pages
Login / Register (with form validation)
Token stored in localStorage or cookies

🏠 2. Home Page
List of blog posts with:
Title, author, tags, summary
Like, comment, rating, bookmark buttons

📄 3. Post Page
Full blog content
Like / Comment / Rate / Bookmark interactions
View existing comments
Add comment if logged in
See average rating

✍️ 4. Post Editor
Create/Edit blog post
Rich Text Editor (react-quill or draft.js)
Auto-suggest tags using AI
AI-generated title suggestions

📚 5. My Profile
View my posts
View bookmarked posts
Delete or edit my posts

📊 6.Dashboard
View analytics for my posts (likes, comments, ratings, bookmarks)
AI-generated insights on performance and audience engagement

📊 7. Search feature
Search a feature based on authors, blog tags


# authenctication
🧱 Step-by-Step Auth Plan
- User Registration (email + password)
- User Login (JWT)
- Google Login (OAuth 2.0 with Google API)
- Auth Middleware (to protect routes)
- Store hashed passwords securely

📁 Folder Structure Setup (Backend Auth Only)
backend/
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   └── auth.js
├── middlewares/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── utils/
│   └── generateToken.js
├── index.js
├── .env
