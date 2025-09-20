# Resale - Full Stack E-commerce Platform

A modern, full-stack e-commerce platform built with **Next.js 15** and **Strapi CMS**. Features a clean, responsive frontend with a powerful headless CMS backend for content management.

## 🚀 Tech Stack

### Frontend (`resale-frontend/`)
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - No TypeScript for simplicity
- **qs** - Query string parsing library

### Backend (`resale-backend/`)
- **Strapi v5** - Headless CMS
- **Node.js** - Runtime environment
- **SQLite/PostgreSQL** - Database (configurable)

## 📁 Project Structure

```
resale/
├── resale-frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   │   ├── blog/        # Blog listing and detail pages
│   │   │   ├── tags/        # Tags listing and filtered articles
│   │   │   └── ...
│   │   ├── components/      # Reusable React components
│   │   │   ├── Header.js    # Navigation header
│   │   │   ├── Footer.js    # Site footer
│   │   │   ├── Pagination.js # Pagination controls
│   │   │   ├── Modal.js     # Modal component
│   │   │   └── ScrollToTop.js # Scroll to top button
│   │   ├── lib/            # Utility libraries
│   │   │   └── api.js      # API client for Strapi
│   │   ├── services/       # API service functions
│   │   │   ├── articles.js # Article-related API calls
│   │   │   └── tags.js     # Tag-related API calls
│   │   └── utils/          # Utility functions
│   │       └── format.js   # Date, currency, text formatting
│   ├── package.json
│   └── ...
├── resale-backend/          # Strapi CMS backend
│   ├── src/
│   │   ├── api/            # Strapi API endpoints
│   │   │   ├── article/    # Article content type
│   │   │   ├── tag/        # Tag content type
│   │   │   └── ...
│   │   └── components/     # Strapi components
│   ├── package.json
│   └── ...
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **Yarn** package manager
- **Git**

### 1. Clone the Repository
```bash
git clone <repository-url>
cd resale
```

### 2. Backend Setup (Strapi)
```bash
cd resale-backend
yarn install
yarn develop
```
The Strapi admin panel will be available at `http://localhost:1337/admin`

### 3. Frontend Setup (Next.js)
```bash
cd resale-frontend
yarn install
yarn dev
```
The frontend will be available at `http://localhost:3000`

### 4. Environment Variables
Create `.env.local` in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:1337
```

## 🎯 Features

### Frontend Features
- **🏠 Home Page** - Hero section with features and tag preview
- **📝 Blog System** - Article listing with pagination and individual article pages
- **🏷️ Tag System** - Tag-based content filtering and organization
- **📱 Responsive Design** - Mobile-first, fully responsive layout
- **⚡ Performance** - Next.js 15 with App Router and dynamic rendering
- **🎨 Modern UI** - Clean design with Tailwind CSS
- **🔄 Pagination** - Smart pagination with ellipsis and page controls
- **📜 Scroll to Top** - Smooth scroll-to-top functionality
- **🪟 Modal System** - Reusable modal component with backdrop
- **🔍 SEO Ready** - Dynamic metadata and Open Graph tags

### Backend Features (Strapi)
- **📊 Content Management** - Easy-to-use admin panel
- **🔗 API Endpoints** - RESTful API for all content types
- **🏷️ Tag Management** - Tag-based content organization
- **📝 Article Management** - Rich content editing capabilities
- **🔐 Authentication** - Built-in user management
- **📈 Analytics** - Content usage tracking

## 📚 API Endpoints

### Articles
- `GET /api/articles` - List all articles with pagination
- `GET /api/articles?filters[slug][$eq]=slug` - Get single article by slug

### Tags
- `GET /api/tags` - List all tags
- `GET /api/tag-articles?filters[slug][$eq]=tagSlug` - Get articles by tag

### Example API Response
```json
{
  "data": [
    {
      "id": 2,
      "title": "Test Article",
      "description": "Test Description",
      "slug": "test-article",
      "createdAt": "2025-09-09T10:09:09.008Z",
      "updatedAt": "2025-09-09T10:09:51.077Z",
      "publishedAt": "2025-09-09T10:09:52.112Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

## 🎨 Component Library

### Core Components
- **Header** - Navigation with responsive mobile menu
- **Footer** - Site footer with links and information
- **Pagination** - Smart pagination with page controls
- **Modal** - Reusable modal with backdrop and escape key
- **ScrollToTop** - Smooth scroll-to-top button

### Page Components
- **HomePage** - Hero section, features, and tag preview
- **BlogPage** - Article listing with pagination
- **ArticlePage** - Individual article detail view
- **TagsPage** - Tag listing and management
- **TagArticlesPage** - Articles filtered by tag

## 🛠️ Development

### Available Scripts

#### Frontend
```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
```

#### Backend
```bash
yarn develop      # Start Strapi development server
yarn build        # Build Strapi for production
yarn start        # Start Strapi production server
```

### Code Structure
- **Services** - API integration layer (`src/services/`)
- **Components** - Reusable UI components (`src/components/`)
- **Utils** - Utility functions (`src/utils/`)
- **Pages** - Next.js pages and routing (`src/app/`)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository to Vercel/Netlify
2. Set environment variable: `NEXT_PUBLIC_API_URL=your-strapi-url`
3. Deploy

### Backend (Railway/Heroku)
1. Connect your repository to Railway/Heroku
2. Set up database (PostgreSQL recommended for production)
3. Deploy

## 📝 Content Management

### Adding Articles
1. Go to Strapi admin panel (`http://localhost:1337/admin`)
2. Navigate to "Content Manager" → "Articles"
3. Click "Create new entry"
4. Fill in title, description, slug, and content
5. Publish the article

### Managing Tags
1. Go to "Content Manager" → "Tags"
2. Create new tags with name and slug
3. Assign tags to articles for filtering

## 🔧 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind config in `tailwind.config.js`
- Customize components in `src/components/`

### API Integration
- Add new services in `src/services/`
- Update API client in `src/lib/api.js`
- Modify content types in Strapi admin

## 🐛 Troubleshooting

### Common Issues
1. **API Connection Failed** - Check `NEXT_PUBLIC_API_URL` environment variable
2. **Build Errors** - Run `yarn install` and check for missing dependencies
3. **Strapi Not Starting** - Check database connection and run `yarn develop`

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in your environment variables.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@resale.com or create an issue in the repository.

---

**Built with ❤️ using Next.js and Strapi**
