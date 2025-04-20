import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#6E13E8] text-white py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Logo and Tagline */}
          <div>
            <Link href="/" className="flex items-center mb-4">
            <svg width="61" height="62" viewBox="0 0 61 62" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32.8076 0.212524C32.8076 0.212524 27.0076 30.8274 8.9209 46.6882C8.9209 46.6882 29.8048 40.6798 52.4269 45.4295C52.4269 45.4295 45.5747 40.4638 40.44 39.9303C35.3053 39.3964 34.2027 38.4835 31.6437 38.3338C29.0847 38.1841 34.1984 26.4022 34.1677 22.6288C34.137 18.8554 32.8076 0.212524 32.8076 0.212524Z" fill="#DBDBDB"/>
<path d="M31.6447 38.3332C29.0857 38.1837 34.1994 26.4016 34.1687 22.6282C34.138 18.855 32.8085 0.211914 32.8085 0.211914C32.8085 0.211914 27.0086 30.8268 8.92188 46.6876C8.92188 46.6876 20.026 43.1897 31.7689 38.3416C31.7276 38.339 31.6868 38.3358 31.6447 38.3332Z" fill="#F0F0F0"/>
<path d="M52.4271 45.4288C49.3266 44.5466 46.3169 43.8729 43.44 43.3637C42.7679 40.1699 42.0139 37.2066 41.2082 34.4614C40.1951 31.0125 39.1028 27.9088 37.9864 25.1326C35.9541 20.0803 33.8431 16.1076 31.9912 13.1152C32.3171 11.0487 32.5266 9.18013 32.6573 7.52959C32.8848 4.645 32.8933 2.1896 32.8083 0.212402C34.0365 1.49892 37.1868 5.08665 40.7396 11.4029C40.7388 11.4048 40.7388 11.4048 40.7406 11.4056C44.0179 17.2317 47.6408 25.3845 50.4144 36.1956C51.1533 39.08 51.8331 42.1561 52.4271 45.4288Z" fill="white"/>
<path d="M31.7497 42.0465C28.0857 41.8613 24.9144 41.9227 22.4121 42.0602C23.8907 39.0866 25.1613 36.2232 26.2566 33.4841C29.4397 25.5226 31.1244 18.6176 31.9916 13.116C32.3182 11.0493 32.5273 9.18123 32.6579 7.52858C32.8847 4.64531 32.8926 2.18991 32.8081 0.211914C34.0376 1.49843 37.1882 5.08642 40.7405 11.4024C40.7391 11.404 40.7391 11.404 40.7407 11.4053C40.2556 15.436 39.4044 20.0348 37.9862 25.1315C37.2216 27.8792 36.2922 30.7709 35.1686 33.7962C34.186 36.446 33.0532 39.2 31.7497 42.0465Z" fill="white"/>
<path d="M43.4412 43.3637C39.1972 42.6113 35.2487 42.2181 31.7507 42.0464C28.0849 41.862 24.9149 41.9217 22.4121 42.0599C23.8915 39.0861 25.1626 36.224 26.2574 33.4851C28.8839 33.4552 31.8824 33.5341 35.1694 33.7961C37.0886 33.9493 39.1069 34.1663 41.2091 34.4614C42.0148 37.2069 42.7688 40.1702 43.4412 43.3637Z" fill="white"/>
<path opacity="0.33" d="M38.7275 34.1467C39.7629 35.8487 42.2308 40.0619 43.3806 43.3537C43.4007 43.3571 43.42 43.3603 43.4402 43.3638C42.768 40.17 42.014 37.2067 41.2084 34.4615C40.3662 34.3433 39.5417 34.2408 38.7275 34.1467Z" fill="white"/>
<path d="M49.4961 50.51H60.6618V53.3619H57.3024V61.5469H52.8797V53.3619H49.4961V50.51Z" fill="white"/>
<path d="M39.6035 50.51H48.8277V53.4988H44.0263V54.667H47.9174V57.5188H44.0263V61.5469H39.6035V50.51Z" fill="white"/>
<path d="M29.5419 55.4887C29.5204 55.6766 29.5097 55.8592 29.5097 56.0365C29.5097 56.9065 29.7621 57.5886 30.267 58.0827C30.7181 58.5231 31.2794 58.7433 31.9507 58.7433C32.622 58.7433 33.1994 58.5231 33.6828 58.0827C34.2145 57.5886 34.4803 56.9388 34.4803 56.1331C34.5555 55.3222 34.3165 54.6401 33.7633 54.0869C33.2477 53.5821 32.6328 53.3296 31.9185 53.3296C31.3707 53.3296 30.8873 53.5015 30.4684 53.8452C30.0065 54.2265 29.6977 54.7744 29.5419 55.4887ZM32.0151 50.2925C34.2386 50.2925 35.9949 50.8698 37.2838 52.0245C38.4278 53.0718 38.9998 54.3608 38.9998 55.8915C38.9998 57.4705 38.3875 58.8158 37.163 59.9276C35.8096 61.1628 34.0077 61.7644 31.7574 61.7321C29.652 61.6945 27.9737 61.0769 26.7223 59.8792C25.5891 58.789 25.0225 57.4758 25.0225 55.9398C25.0225 54.3984 25.5944 53.1041 26.7384 52.0568C28.0274 50.8806 29.7863 50.2925 32.0151 50.2925Z" fill="white"/>
<path d="M15.8535 58.0344C16.0522 58.1955 16.4765 58.3486 17.1264 58.4936C17.7762 58.6386 18.3751 58.7111 18.9229 58.7111C19.6587 58.7111 20.0266 58.5741 20.0266 58.3002C20.0266 58.08 19.7634 57.7766 19.2371 57.3899C17.1264 55.8592 16.071 54.4736 16.071 53.233C16.071 52.4596 16.4711 51.7694 17.2714 51.1625C18.077 50.5503 19.1055 50.2441 20.3569 50.2441C20.851 50.2441 21.4444 50.2952 22.1373 50.3972C22.6905 50.4724 23.241 50.553 23.7888 50.6389L24.1674 54.0063C23.5068 53.5874 22.6555 53.378 21.6136 53.378C20.8188 53.378 20.4213 53.5391 20.4213 53.8613C20.4213 54.0815 20.6308 54.3501 21.0497 54.6669C22.489 55.7572 23.2275 56.3184 23.2651 56.3507C23.9096 56.9414 24.256 57.5456 24.3044 58.1633C24.4547 60.5425 23.0073 61.7321 19.9621 61.7321C18.8826 61.7321 17.6903 61.5817 16.3852 61.281L15.8535 58.0344Z" fill="white"/>
<path d="M5.75185 50.51H10.8352L15.3708 61.5469H11.0769L10.1746 59.0736H6.1466L5.23626 61.5469H0.68457L5.75185 50.51ZM7.05694 56.3507H9.3932L8.22507 53.4988L7.05694 56.3507Z" fill="white"/>
</svg>

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
