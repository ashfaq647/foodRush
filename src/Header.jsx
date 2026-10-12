import { Link } from "react-router-dom";

function Header({ cartCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-7 py-4 flex items-center justify-between">
        {/* Logo */}
        <h2 className="text-3xl font-bold text-orange-500">
          <Link to="/">FoodRush</Link>
        </h2>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-orange-500">
            Home
          </Link>

          <Link to="/menu" className="text-gray-700 hover:text-orange-500">
            Menu
          </Link>

          <Link to="/cart" className="text-gray-700 hover:text-orange-500">
            Cart{cartCount > 0 && (
              <span className="ml-1 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
