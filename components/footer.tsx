import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#6E13E8] text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Logo and Tagline */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <svg
                width="48"
                height="24"
                viewBox="0 0 48 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M23.5059 5.36426C19.4619 5.36426 16.1709 8.65527 16.1709 12.6992C16.1709 16.7432 19.4619 20.0342 23.5059 20.0342C27.5498 20.0342 30.8408 16.7432 30.8408 12.6992C30.8408 8.65527 27.5498 5.36426 23.5059 5.36426ZM23.5059 17.0342C21.1152 17.0342 19.1709 15.0898 19.1709 12.6992C19.1709 10.3086 21.1152 8.36426 23.5059 8.36426C25.8965 8.36426 27.8408 10.3086 27.8408 12.6992C27.8408 15.0898 25.8965 17.0342 23.5059 17.0342Z"
                  fill="white"
                />
                <path
                  d="M12.4941 5.36426C8.45019 5.36426 5.15918 8.65527 5.15918 12.6992C5.15918 16.7432 8.45019 20.0342 12.4941 20.0342C16.5381 20.0342 19.8291 16.7432 19.8291 12.6992C19.8291 8.65527 16.5381 5.36426 12.4941 5.36426ZM12.4941 17.0342C10.1035 17.0342 8.15918 15.0898 8.15918 12.6992C8.15918 10.3086 10.1035 8.36426 12.4941 8.36426C14.8848 8.36426 16.8291 10.3086 16.8291 12.6992C16.8291 15.0898 14.8848 17.0342 12.4941 17.0342Z"
                  fill="white"
                />
              </svg>
              <span className="font-semibold text-xl">Solutions</span>
            </Link>
            <p className="text-white/80">We create content that is impossible to ignore.</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="footer-link-hover">
                <span className="link-default text-white/80">Home</span>
                <span className="link-hover">Home</span>
              </Link>
              <Link href="/about" className="footer-link-hover">
                <span className="link-default text-white/80">About</span>
                <span className="link-hover">About</span>
              </Link>
              <Link href="/works" className="footer-link-hover">
                <span className="link-default text-white/80">Works</span>
                <span className="link-hover">Works</span>
              </Link>
              <Link href="/services" className="footer-link-hover">
                <span className="link-default text-white/80">Services</span>
                <span className="link-hover">Services</span>
              </Link>
              <Link href="/insights" className="footer-link-hover">
                <span className="link-default text-white/80">Insights</span>
                <span className="link-hover">Insights</span>
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Follow us</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="https://instagram.com" className="footer-link-hover">
                <span className="link-default text-white/80">Instagram</span>
                <span className="link-hover">Instagram</span>
              </Link>
              <Link href="https://dribbble.com" className="footer-link-hover">
                <span className="link-default text-white/80">Dribbble</span>
                <span className="link-hover">Dribbble</span>
              </Link>
              <Link href="https://behance.net" className="footer-link-hover">
                <span className="link-default text-white/80">Behance</span>
                <span className="link-hover">Behance</span>
              </Link>
              <Link href="https://facebook.com" className="footer-link-hover">
                <span className="link-default text-white/80">Facebook</span>
                <span className="link-hover">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="footer-link-hover">
                <span className="link-default text-white/80">Twitter</span>
                <span className="link-hover">Twitter</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="/privacy" className="footer-link-hover">
              <span className="link-default text-white/80">Privacy</span>
              <span className="link-hover">Privacy</span>
            </Link>
            <Link href="/terms" className="footer-link-hover">
              <span className="link-default text-white/80">Terms</span>
              <span className="link-hover">Terms</span>
            </Link>
          </div>
          <p className="text-white/80">2024 Infinity Solutions. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
