import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  Shield, 
  Clock,
  Download,
  Bell
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: GraduationCap,
      title: 'Student Portal',
      description: 'Access your academic records, attendance, and personalized dashboard with all essential information at your fingertips.',
      features: ['Academic Records', 'Attendance Tracking', 'Grade History', 'Course Materials']
    },
    {
      icon: Users,
      title: 'Faculty Management',
      description: 'Comprehensive tools for faculty to manage students, upload results, and maintain academic records efficiently.',
      features: ['Student Management', 'Result Upload', 'Notice Creation', 'Attendance Management']
    },
    {
      icon: BarChart3,
      title: 'Result Management',
      description: 'Secure and transparent result checking system with detailed grade breakdowns and performance analytics.',
      features: ['Grade Viewing', 'Performance Analytics', 'Transcript Generation', 'Result History']
    },
    {
      icon: FileText,
      title: 'Question Papers',
      description: 'Extensive archive of previous year question papers organized by semester, subject, and year for easy access.',
      features: ['Subject-wise Papers', 'Year-wise Archive', 'PDF Downloads', 'Search Functionality']
    },
    {
      icon: Calendar,
      title: 'Events & Notices',
      description: 'Stay updated with departmental events, workshops, hackathons, and important announcements.',
      features: ['Event Calendar', 'Notice Board', 'Workshop Updates', 'Hackathon Info']
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Advanced security measures with role-based access control and encrypted data transmission.',
      features: ['JWT Authentication', 'Role-based Access', 'Data Encryption', 'Secure Login']
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for academic management in one centralized platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 card-hover"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-2">
                {feature.features.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p className="text-blue-100">Available round the clock for your convenience</p>
            </div>
            <div className="flex flex-col items-center">
              <Download className="h-12 w-12 mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">Easy Downloads</h3>
              <p className="text-blue-100">Quick access to all academic resources</p>
            </div>
            <div className="flex flex-col items-center">
              <Bell className="h-12 w-12 mb-4 text-blue-200" />
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-blue-100">Instant notifications for important updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
