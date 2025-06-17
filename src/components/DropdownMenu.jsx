import { Link } from "react-router-dom";

const DropdownMenu = ({ section }) => {
  const menuLink = "/productListpage";

  const renderLink = (text) => (
    <li>
      <Link to={menuLink} className="hover:underline">
        {text}
      </Link>
    </li>
  );

  if (section === "New & Featured") {
    return (
      <div className="grid grid-cols-4 gap-8 w-full text-sm text-gray-800">
        <div>
          <h3 className="font-bold mb-3">Featured</h3>
          <ul className="space-y-1">
            {["New & Upcoming Drops", "New Arrivals", "Bestsellers", "SNKRS Launch Calendar", "Customise with Nike By You", "Jordan"].map(renderLink)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Trending</h3>
          <ul className="space-y-1">
            {["Summer Essentials", "Air Max Dn8", "What's Trending", "Nike 24.7", "Colours of the Season: Pastel", "Retro Running", "Running Shoe Finder"].map(renderLink)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Shop Icons</h3>
          <ul className="space-y-1">
            {["Lifestyle", "Air Force 1", "Air Jordan 1", "Air Max", "Dunk", "Cortez", "Blazer", "Pegasus", "Vomero"].map(renderLink)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Shop By Sport</h3>
          <ul className="space-y-1">
            {["Running", "Basketball", "Football", "Golf", "Tennis", "Gym and Training", "Yoga", "Skateboarding"].map(renderLink)}
          </ul>
        </div>
      </div>
    );
  }

  if (["Men", "Women", "Kids", "Sale", "SNKRS"].includes(section)) {
    return (
      <div className="grid grid-cols-5 gap-8 w-full text-sm text-gray-800">
        <div>
          <h3 className="font-bold mb-3">Featured</h3>
          <ul className="space-y-2">
            {["New Arrivals", "Bestsellers", "Shop All Sale"].map(renderLink)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Shoes</h3>
          <ul className="space-y-2">
            {["All Shoes", "Lifestyle", "Jordan", "Running", "Football", "Basketball", "Gym and Training", "Skateboarding", "Sandals and Slides", "Nike By You"].map(renderLink)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Clothing</h3>
          <ul className="space-y-2">
            {["All Clothing", "Tops and T-Shirts", "Shorts", "Pants and Leggings", "Hoodies and Sweatshirts", "Jackets and Gilets", "Jerseys and Kits", "Jordan"].map(renderLink)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Shop By Sport</h3>
          <ul className="space-y-2">
            {["Running", "Basketball", "Football", "Golf", "Tennis", "Gym and Training", "Yoga", "Skateboarding"].map(renderLink)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Accessories & Equipment</h3>
          <ul className="space-y-2">
            {["All Accessories", "Bags and Backpacks", "Socks", "Hats and Headwear"].map(renderLink)}
          </ul>
        </div>
      </div>
    );
  }

  return null;
};

export default DropdownMenu;
