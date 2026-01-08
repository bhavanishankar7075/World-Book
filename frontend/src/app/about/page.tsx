export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
            About World Books Explorer
          </h1>
          <p className="text-lg md:text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Your gateway to discovering books through intelligent, real-time exploration
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Mission Statement */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Our Mission</h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                World Books Explorer is a cutting-edge product exploration platform that brings the vast world of books
                to your fingertips. We provide real-time access to comprehensive book data, enabling seamless browsing
                through categories, discovering new titles, and exploring detailed information about each book.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Scraping</h3>
            <p className="text-gray-600 leading-relaxed">
              Access live book data with on-demand scraping technology ensuring you always have the most current information.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Categories</h3>
            <p className="text-gray-600 leading-relaxed">
              Navigate through organized categories and subcategories to find exactly what you're looking for quickly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600 leading-relaxed">
              Optimized caching and intelligent data fetching ensure a smooth, responsive browsing experience.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Insights</h3>
            <p className="text-gray-600 leading-relaxed">
              Get comprehensive book details including descriptions, reviews, ratings, and recommendations.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-pink-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fully Responsive</h3>
            <p className="text-gray-600 leading-relaxed">
              Seamlessly browse on any device with our mobile-first, responsive design approach.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Reliable</h3>
            <p className="text-gray-600 leading-relaxed">
              Ethical scraping practices with proper rate limiting and caching to ensure reliability and respect.
            </p>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 md:p-10 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Built With Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
              <div className="text-3xl mb-2">⚛️</div>
              <div className="font-semibold">React & Next.js</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
              <div className="text-3xl mb-2">🎨</div>
              <div className="font-semibold">Tailwind CSS</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
              <div className="text-3xl mb-2">🔧</div>
              <div className="font-semibold">NestJS</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center backdrop-blur-sm">
              <div className="text-3xl mb-2">🗄️</div>
              <div className="font-semibold">PostgreSQL</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Exploring Today</h2>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Discover thousands of books across multiple categories with our intuitive platform
            </p>
            <a
              href="/"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Books Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}