export default function Footer() {
  return (
    <footer className="bg-(--bg2) text-(--text2) px-6 pt-10 pb-24 md:pb-6 mt-10 rounded-t-2xl">
      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-4 text-sm">
        {/* Brand Info */}
        <div>
          <h2 className="text-lg font-bold mb-2">The Local Bite</h2>
          <p>Delicious food, cozy vibes.</p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="font-semibold mb-2">Follow Us</h2>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h2 className="font-semibold mb-2">Address</h2>
          <p>123 Flavor Street<br />Food City, BD 1234</p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold mb-2">Contact</h2>
          <p>Email: contact@gmail.com</p>
          <p>Phone: +880 1234-567890</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} The Local Bite. All rights reserved. Designed and made by Tawqi Tahmed
      </div>
    </footer>
  );
}
