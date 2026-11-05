import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | PasteDocs</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="The page you are looking for does not exist. Browse all photo and document resizing tools on PasteDocs." />
      </Helmet>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-2xl mx-auto">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist, has been moved, or the specific tool configuration is unavailable.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </>
  );
}
