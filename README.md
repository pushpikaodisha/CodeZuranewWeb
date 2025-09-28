# CodeZura - Modern Creative Agency Portfolio Website

![Website Preview](https://github.com/user-attachments/assets/89ea3ce3-7cba-4b3c-9a6c-343f6d5f1c48)

A modern, responsive portfolio website for a creative agency, built with HTML5, SCSS, Bootstrap 5, and advanced JavaScript animations using GSAP. This project features a complete production-ready codebase with dark/light mode toggle, portfolio filtering, contact form with PHP backend, and SEO optimization.

## ✨ Features

### Design & User Experience
- **Modern, Clean Design** - Minimalist aesthetic with smooth animations
- **Dark/Light Mode Toggle** - User preference stored in localStorage
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - GSAP-powered transitions and scroll effects
- **Interactive Portfolio** - Category filtering with smooth transitions
- **Contact Form** - Working PHP backend with email validation
- **SEO Optimized** - Meta tags, OpenGraph, Twitter cards, sitemap.xml

### Technical Stack
- **Frontend**: HTML5, SCSS (Sass), Bootstrap 5, Vanilla JavaScript ES6+
- **Libraries**: GSAP, Swiper.js, GLightbox
- **Build System**: Vite with hot reload and asset optimization
- **Backend**: PHP contact form handler
- **Fonts**: Google Fonts (Inter & Poppins), Font Awesome 6

### Performance & Accessibility
- **Lighthouse Score 90+** - Optimized for performance and SEO
- **WCAG 2.1 AA Compliant** - Accessible design with keyboard navigation
- **Lazy Loading** - Images and content loaded on demand
- **WebP Support** - Modern image formats with fallbacks
- **Preloaded Assets** - Critical fonts and CSS optimization

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PHP server for contact form (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pushpikaodisha/CodeZuranewWeb.git
   cd CodeZuranewWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The website will be available at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be in the `dist/` folder.

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
/project-root
├── assets/
│   ├── scss/
│   │   ├── _variables.scss      # SCSS variables and CSS custom properties
│   │   ├── _mixins.scss         # Reusable SCSS mixins
│   │   ├── _animations.scss     # Animation keyframes and classes
│   │   ├── _components.scss     # Component styles
│   │   └── main.scss           # Main SCSS file
│   ├── css/
│   │   └── main.css            # Compiled CSS
│   ├── js/
│   │   └── main.js             # Main JavaScript file
│   └── img/                    # Images and assets
├── index.html                  # Homepage
├── portfolio.html              # Portfolio page
├── project-single.html         # Project detail page
├── about.html                  # About page
├── services.html               # Services page
├── contact.html               # Contact page
├── blog.html                  # Blog listing page
├── blog-single.html           # Blog post page
├── 404.html                   # 404 error page
├── contact.php                # Contact form handler
├── sitemap.xml                # XML sitemap
├── robots.txt                 # Search engine directives
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── README.md                  # This file
```

## 🎨 Customization

### Changing Colors
Edit the CSS custom properties in `assets/scss/_variables.scss`:

```scss
:root {
  --primary-color: #6366f1;      // Primary brand color
  --secondary-color: #f59e0b;     // Secondary brand color
  --bg-primary: #ffffff;          // Primary background
  --text-primary: #111827;        // Primary text color
}
```

### Changing Fonts
Update the Google Fonts import in HTML files and font variables in `_variables.scss`:

```scss
$font-family-primary: 'Inter', sans-serif;
$font-family-secondary: 'Poppins', sans-serif;
```

### Adding New Sections
1. Add HTML markup in the appropriate page
2. Create corresponding SCSS in `_components.scss`
3. Add JavaScript functionality in `main.js` if needed

### Modifying Animations
Edit animation settings in `assets/scss/_animations.scss` or customize GSAP animations in `main.js`.

## 📧 Contact Form Setup

### PHP Configuration
1. Edit `contact.php` and update the email settings:
   ```php
   $config = [
       'to_email' => 'your-email@domain.com',
       'from_email' => 'noreply@yourdomain.com',
       'from_name' => 'Your Website Name',
   ];
   ```

2. Upload the files to a PHP-enabled server

### Alternative Solutions
- **Netlify Forms** - Add `netlify` attribute to form
- **Formspree** - Change form action to Formspree endpoint
- **EmailJS** - Client-side email service

## 🌐 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

### Vercel
1. Import project from GitHub
2. Select Vite framework preset
3. Deploy with zero configuration

### Traditional Web Hosting
1. Run `npm run build`
2. Upload contents of `dist/` folder
3. Upload `contact.php` to root directory
4. Ensure PHP is enabled on your server

### GitHub Pages
1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add script: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## 🔧 Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🎯 SEO Features

- **Meta Tags** - Title, description, keywords for every page
- **OpenGraph Tags** - Social media sharing optimization
- **Twitter Cards** - Enhanced Twitter sharing
- **Structured Data** - JSON-LD schema markup
- **XML Sitemap** - Search engine indexing
- **Robots.txt** - Crawler directives
- **Canonical URLs** - Prevent duplicate content

## 📱 Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| xs | 0-575px | Mobile phones |
| sm | 576-767px | Large mobile phones |
| md | 768-991px | Tablets |
| lg | 992-1199px | Desktops |
| xl | 1200-1399px | Large desktops |
| xxl | 1400px+ | Extra large screens |

## 🧩 Components & Features

### Navigation
- Fixed header with scroll effects
- Mobile hamburger menu
- Smooth scroll to sections
- Active link highlighting

### Hero Section
- Fullscreen responsive hero
- Animated text with GSAP
- Call-to-action buttons
- Scroll indicator

### Portfolio
- Masonry grid layout
- Category filtering
- Hover effects
- Lightbox gallery
- Lazy loading

### Contact Form
- Real-time validation
- PHP email processing
- Success/error states
- Honeypot spam protection

### Dark Mode
- System preference detection
- Manual toggle button
- Smooth transitions
- localStorage persistence

## 🐛 Troubleshooting

### Build Issues
- Ensure Node.js version is 16+
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for SCSS syntax errors

### Contact Form Issues
- Verify PHP is enabled on server
- Check email server settings
- Test with error reporting enabled

### Performance Issues
- Optimize images (use WebP format)
- Enable server compression (gzip/brotli)
- Use CDN for static assets

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📞 Support

- **Email**: hello@codezura.com
- **GitHub Issues**: [Create an issue](https://github.com/pushpikaodisha/CodeZuranewWeb/issues)
- **Documentation**: Check this README and code comments

## 🙏 Acknowledgments

- **Bootstrap** - CSS framework
- **GSAP** - Animation library
- **Swiper.js** - Slider/carousel
- **GLightbox** - Lightbox solution
- **Unsplash** - Demo images
- **Font Awesome** - Icon library

---

**Built with ❤️ by CodeZura Team**

For more information, visit [codezura.com](https://codezura.com)