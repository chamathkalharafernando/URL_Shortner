# URL Shortener

A simple, fast, and reliable URL shortening service built with Node.js, Express, and MongoDB.

## 🚀 Features

- Shorten long URLs to manageable links
- Track click statistics for each shortened URL
- Clean and responsive user interface
- API endpoints for programmatic access
- Input validation and error handling
- MongoDB database for persistent storage

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd url-shortener
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost/urlshortener
PORT=3000
```

4. Start MongoDB service:
- Windows:
  ```batch
  net start MongoDB
  ```
- macOS/Linux:
  ```bash
  sudo service mongodb start
  ```

5. Run the application:
```bash
npm start
```

6. Visit `http://localhost:3000` in your browser

## 📁 Project Structure

```
url-shortener/
├── config/
│   └── db.js           # Database configuration
├── models/
│   └── Url.js          # URL model schema
├── public/
│   ├── css/
│   │   └── style.css   # Styles
│   ├── js/
│   │   └── main.js     # Frontend JavaScript
│   └── index.html      # Main HTML file
├── routes/
│   └── url.js          # URL routes
├── .env                # Environment variables
├── .gitignore         # Git ignore file
├── app.js             # Main application file
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## 🔧 API Endpoints

### Shorten URL
- **POST** `/api/shorten`
- **Body:**
  ```json
  {
    "url": "https://example.com/very/long/url"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "http://localhost:3000/abc123"
  }
  ```

### Access Shortened URL
- **GET** `/:shortCode`
- Redirects to the original URL

## 💻 Usage Example

```javascript
// Example using fetch API
async function shortenUrl(url) {
  try {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    return data.shortUrl;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## ⚙️ Configuration

### Environment Variables

| Variable     | Description           | Default Value              |
|-------------|-----------------------|---------------------------|
| PORT        | Server port           | 3000                      |
| MONGODB_URI | MongoDB connection URL| mongodb://localhost/urlshortener |

### MongoDB Configuration

The application uses MongoDB for storing URLs. Make sure MongoDB is running before starting the application.

Default database configuration:
- Database name: `urlshortener`
- Collection: `urls`
- Connection URL: `mongodb://localhost/urlshortener`

## 🔒 Security Features

- URL validation to prevent malicious inputs
- Rate limiting to prevent abuse
- XSS protection through input sanitization
- CORS configuration
- Security headers using Helmet

## 📊 Database Schema

```javascript
{
  originalUrl: String,  // Original URL
  shortCode: String,    // Generated short code
  clicks: Number,       // Number of clicks/redirects
  createdAt: Date      // Creation timestamp
}
```

## 🧪 Running Tests

```bash
# Install dev dependencies
npm install --dev

# Run tests
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Acknowledgments

- Express.js for the web framework
- MongoDB for the database
- Mongoose for object modeling

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```
   Solution: Ensure MongoDB service is running
   ```

2. **Port Already in Use**
   ```
   Solution: Change PORT in .env file
   ```

3. **Module Not Found**
   ```
   Solution: Run npm install
   ```

## 📱 Mobile Support

The application is responsive and works on:
- Desktop browsers
- Mobile browsers
- Tablets

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Custom short URLs
- [ ] URL expiration
- [ ] Analytics dashboard
- [ ] API rate limiting
- [ ] QR code generation

## 📞 Support

For support, chamadula555@gmail.com or create an issue in the repository.
