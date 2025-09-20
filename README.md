# CSE Department Portal

A modern, centralized web portal for the Computer Science and Engineering department built with Next.js, React, and Tailwind CSS.

## Features

### 🎓 Student Portal
- **Personalized Dashboard**: View academic records, attendance, and performance metrics
- **Result Management**: Check grades, view transcripts, and track academic progress
- **Question Papers**: Access and download previous year question papers
- **Event Calendar**: Stay updated with departmental events and activities
- **Notice Board**: Receive important announcements and updates

### 👨‍🏫 Faculty Portal
- **Student Management**: Manage student records and academic data
- **Result Upload**: Upload and manage student results
- **Attendance Tracking**: Monitor student attendance
- **Notice Creation**: Create and manage departmental notices
- **Resource Management**: Upload and organize academic resources

### 🔐 Security Features
- **JWT Authentication**: Secure login with role-based access control
- **Password Encryption**: Bcrypt hashing for password security
- **Session Management**: Secure session handling with NextAuth.js
- **Role-based Access**: Different dashboards for students, faculty, and admin

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom light blue theme
- **Authentication**: NextAuth.js with JWT
- **Database**: MySQL (ready for integration)
- **UI Components**: Lucide React icons, custom components
- **State Management**: React hooks and context

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MySQL database (optional for demo)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cse-department-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   DATABASE_URL=mysql://username:password@localhost:3306/cse_portal
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

### Student Login
- **Email**: student@demo.com
- **Password**: password123

### Faculty Login
- **Email**: faculty@demo.com
- **Password**: password123

### Admin Login
- **Email**: admin@demo.com
- **Password**: password123

## Project Structure

```
cse-department-website/
├── app/                    # Next.js 13+ app directory
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── dashboard/         # Dashboard components
│   ├── home/              # Home page components
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   └── ui/                # Reusable UI components
├── public/                # Static assets
└── README.md
```

## Key Features Implemented

### ✅ Completed
- [x] Modern UI with light blue theme
- [x] Responsive design for all devices
- [x] Authentication system with NextAuth.js
- [x] Student dashboard with academic overview
- [x] Result checking interface
- [x] Question papers archive
- [x] Events and notices display
- [x] Role-based access control
- [x] Secure password handling

### 🚧 In Progress
- [ ] Faculty dashboard
- [ ] Admin dashboard
- [ ] Database integration
- [ ] File upload system
- [ ] Email notifications
- [ ] Advanced search functionality

## Customization

### Theme Colors
The website uses a custom light blue theme. To modify colors, update the `tailwind.config.js` file:

```javascript
theme: {
  extend: {
    colors: {
      lightBlue: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        // ... other shades
      }
    }
  }
}
```

### Adding New Features
1. Create new components in the `components/` directory
2. Add new pages in the `app/` directory
3. Create API routes in `app/api/`
4. Update the navigation in `components/layout/Header.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email cse@university.edu or create an issue in the repository.

---

**Built with ❤️ for the CSE Department**
