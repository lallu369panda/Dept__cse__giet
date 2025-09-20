import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { GraduationCap, Users, Award, BookOpen, Target, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Students', value: '500+' },
    { icon: GraduationCap, label: 'Faculty', value: '25+' },
    { icon: Award, label: 'Years of Excellence', value: '15+' },
    { icon: BookOpen, label: 'Courses', value: '50+' }
  ]

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for academic excellence and innovation in computer science education.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong community of learners, researchers, and industry professionals.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Fostering creativity and innovation through cutting-edge research and development.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightBlue-50 to-lightBlue-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Our Department
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The Computer Science and Engineering Department is committed to providing 
            world-class education and fostering innovation in technology.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide high-quality education in computer science and engineering, 
              preparing students for successful careers in technology while contributing 
              to the advancement of knowledge through research and innovation.
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be a leading department in computer science education and research, 
              recognized for producing graduates who are innovative, ethical, and 
              ready to tackle the challenges of the digital age.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Department Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Department Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Programs Offered</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Bachelor of Technology (B.Tech) in CSE</li>
                <li>• Master of Technology (M.Tech) in CSE</li>
                <li>• Doctor of Philosophy (Ph.D) in CSE</li>
                <li>• Post Graduate Diploma in Computer Applications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Research Areas</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Artificial Intelligence & Machine Learning</li>
                <li>• Data Science & Big Data Analytics</li>
                <li>• Cybersecurity & Network Security</li>
                <li>• Software Engineering & Development</li>
                <li>• Computer Networks & Distributed Systems</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
