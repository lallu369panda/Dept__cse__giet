import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">CSE Department</h3>
                <p className="text-sm text-gray-400">Computer Science & Engineering</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A centralized platform for the Computer Science and Engineering department, 
              providing seamless access to academic resources, ERP functionalities, and 
              departmental information.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="/events" className="text-gray-400 hover:text-white transition-colors duration-200">Events</a></li>
              <li><a href="/question-papers" className="text-gray-400 hover:text-white transition-colors duration-200">Question Papers</a></li>
              <li><a href="/results" className="text-gray-400 hover:text-white transition-colors duration-200">Results</a></li>
              <li><a href="/notices" className="text-gray-400 hover:text-white transition-colors duration-200">Notices</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">
                  University Campus, Department of CSE
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400 text-sm">cse@university.edu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 CSE Department Portal. All rights reserved. | 
            <a href="/privacy" className="hover:text-white transition-colors duration-200 ml-1">Privacy Policy</a> | 
            <a href="/terms" className="hover:text-white transition-colors duration-200 ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
