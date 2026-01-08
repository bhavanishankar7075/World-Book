export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16 border-t">
      <div className="max-w-7xl mx-auto p-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} WorldBook Product Explorer. All rights reserved.
      </div>
    </footer>
  );
}
