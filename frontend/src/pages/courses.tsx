import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/job-portal/navbar';
import { 
  Search, 
  BookOpen, 
  Clock, 
  User, 
  Star,
  ExternalLink,
  Code,
  Server,
  Shield,
  Bug,
  Settings,
  Building
} from 'lucide-react';
import type { Course } from '@shared/schema';

export default function Courses() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['/api/courses'],
  });

  const categories = [
    { id: 'all', label: 'All Courses', icon: BookOpen },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'testing', label: 'Testing', icon: Bug },
    { id: 'cyber-security', label: 'Cyber Security', icon: Shield },
    { id: 'devops', label: 'DevOps', icon: Settings },
    { id: 'sap', label: 'SAP', icon: Building },
  ];

  // Create free courses with new categories
  const freeCourses = [
    // Frontend Courses
    { id: 'html-css', title: 'Complete HTML & CSS Course', description: 'Learn HTML and CSS from scratch. Build responsive websites and understand web fundamentals.', instructor: 'GeeksforGeeks', duration: '6 weeks', level: 'beginner', category: 'frontend', imageUrl: '/images/html-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/html-tutorial/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'javascript', title: 'JavaScript Fundamentals', description: 'Learn JavaScript programming language and build interactive web applications.', instructor: 'GeeksforGeeks', duration: '10 weeks', level: 'intermediate', category: 'frontend', imageUrl: '/images/js-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/javascript/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'react', title: 'React.js Development', description: 'Build modern web applications with React.js. Learn components, hooks, and state management.', instructor: 'GeeksforGeeks', duration: '12 weeks', level: 'intermediate', category: 'frontend', imageUrl: '/images/react-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/react-tutorial/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'angular', title: 'Angular Complete Guide', description: 'Master Angular framework for building dynamic single-page applications.', instructor: 'GeeksforGeeks', duration: '14 weeks', level: 'intermediate', category: 'frontend', imageUrl: '/images/angular-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/angular-tutorial/', price: 'Free', createdAt: new Date().toISOString() },
    
    // Backend Courses
    { id: 'python', title: 'Python Programming for Beginners', description: 'Master Python programming from basics to advanced concepts. Perfect for beginners and job seekers.', instructor: 'GeeksforGeeks', duration: '8 weeks', level: 'beginner', category: 'backend', imageUrl: '/images/python-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/python-programming-language/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'java', title: 'Java Complete Bootcamp', description: 'Learn Java programming language with object-oriented programming concepts.', instructor: 'GeeksforGeeks', duration: '10 weeks', level: 'beginner', category: 'backend', imageUrl: '/images/java-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/java/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'nodejs', title: 'Node.js Backend Development', description: 'Build scalable backend applications using Node.js, Express.js, and MongoDB.', instructor: 'GeeksforGeeks', duration: '12 weeks', level: 'intermediate', category: 'backend', imageUrl: '/images/nodejs-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/nodejs/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'django', title: 'Django Web Framework', description: 'Create powerful web applications using Django Python framework.', instructor: 'GeeksforGeeks', duration: '10 weeks', level: 'intermediate', category: 'backend', imageUrl: '/images/django-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/django-tutorial/', price: 'Free', createdAt: new Date().toISOString() },
    
    // Testing Courses
    { id: 'selenium', title: 'Selenium Automation Testing', description: 'Learn automated testing with Selenium WebDriver for web applications.', instructor: 'GeeksforGeeks', duration: '8 weeks', level: 'intermediate', category: 'testing', imageUrl: '/images/selenium-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/selenium-python-tutorial/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'jira', title: 'JIRA for Project Management', description: 'Master JIRA for bug tracking, project management, and agile workflows.', instructor: 'GeeksforGeeks', duration: '4 weeks', level: 'beginner', category: 'testing', imageUrl: '/images/jira-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/what-is-jira-tool/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'cypress', title: 'Cypress End-to-End Testing', description: 'Modern testing framework for web applications with real-time browser testing.', instructor: 'GeeksforGeeks', duration: '6 weeks', level: 'intermediate', category: 'testing', imageUrl: '/images/cypress-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/cypress-tutorial/', price: 'Free', createdAt: new Date().toISOString() },
    
    // Cyber Security Courses
    { id: 'ethical-hacking', title: 'Ethical Hacking Fundamentals', description: 'Learn ethical hacking techniques and cybersecurity best practices.', instructor: 'GeeksforGeeks', duration: '12 weeks', level: 'intermediate', category: 'cyber-security', imageUrl: '/images/security-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/what-is-ethical-hacking/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'network-security', title: 'Network Security Essentials', description: 'Understand network security protocols, firewalls, and intrusion detection.', instructor: 'GeeksforGeeks', duration: '10 weeks', level: 'intermediate', category: 'cyber-security', imageUrl: '/images/network-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/network-security/', price: 'Free', createdAt: new Date().toISOString() },
    
    // DevOps Courses
    { id: 'docker', title: 'Docker Containerization', description: 'Learn containerization with Docker for application deployment and scaling.', instructor: 'GeeksforGeeks', duration: '8 weeks', level: 'intermediate', category: 'devops', imageUrl: '/images/docker-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/docker-tutorial/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'kubernetes', title: 'Kubernetes Orchestration', description: 'Master Kubernetes for container orchestration and microservices management.', instructor: 'GeeksforGeeks', duration: '10 weeks', level: 'advanced', category: 'devops', imageUrl: '/images/k8s-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/kubernetes/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'aws', title: 'AWS Cloud Fundamentals', description: 'Learn Amazon Web Services cloud computing platform and services.', instructor: 'GeeksforGeeks', duration: '12 weeks', level: 'beginner', category: 'devops', imageUrl: '/images/aws-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/amazon-web-services-aws-tutorial/', price: 'Free', createdAt: new Date().toISOString() },
    
    // SAP Courses
    { id: 'sap-basics', title: 'SAP Fundamentals', description: 'Introduction to SAP ERP system and business processes.', instructor: 'GeeksforGeeks', duration: '8 weeks', level: 'beginner', category: 'sap', imageUrl: '/images/sap-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/what-is-sap/', price: 'Free', createdAt: new Date().toISOString() },
    { id: 'sap-abap', title: 'SAP ABAP Programming', description: 'Learn SAP ABAP programming language for custom development.', instructor: 'GeeksforGeeks', duration: '12 weeks', level: 'intermediate', category: 'sap', imageUrl: '/images/abap-course.jpg', courseUrl: 'https://www.geeksforgeeks.org/introduction-to-abap/', price: 'Free', createdAt: new Date().toISOString() }
  ];

  const filteredCourses = freeCourses.filter((course) => {
    const matchesSearch = searchTerm === '' || 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.instructor && course.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCourseClick = (course: any) => {
    window.open(course.courseUrl, '_blank');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Learn New Skills</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your career prospects with our curated collection of courses. 
            From programming fundamentals to advanced technologies.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search courses, instructors, topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="search-courses"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center"
                data-testid={`category-${category.id}`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full">
              <Card>
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or check back later for new courses.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            filteredCourses.map((course: any) => (
              <Card 
                key={course.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => handleCourseClick(course)}
                data-testid={`course-card-${course.id}`}
              >
                {/* Course Image */}
                <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white" />
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <Badge className={`${getLevelColor(course.level || 'beginner')} text-xs`}>
                      {course.level}
                    </Badge>
                  </div>
                  
                  <CardDescription className="line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {/* Instructor */}
                    {course.instructor && (
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>{course.instructor}</span>
                      </div>
                    )}
                    
                    {/* Duration */}
                    {course.duration && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{course.duration}</span>
                      </div>
                    )}
                    
                    {/* Rating */}
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">(4.8)</span>
                    </div>
                    
                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="text-lg font-bold text-green-600">
                        {course.price}
                      </div>
                      <Button 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCourseClick(course);
                        }}
                        data-testid={`enroll-course-${course.id}`}
                      >
                        View Course
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Popular Courses Section */}
        {selectedCategory === 'all' && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Popular Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured Courses */}
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardHeader>
                  <CardTitle className="text-white">HTML & CSS Mastery</CardTitle>
                  <CardDescription className="text-blue-100">
                    Start your web development journey with HTML and CSS fundamentals.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">Free</span>
                    <Button 
                      variant="secondary"
                      onClick={() => window.open('https://www.geeksforgeeks.org/html-tutorial/', '_blank')}
                      data-testid="featured-html-course"
                    >
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <CardHeader>
                  <CardTitle className="text-white">Python Programming</CardTitle>
                  <CardDescription className="text-green-100">
                    Learn Python from scratch and build real-world applications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">₹2,999</span>
                    <Button 
                      variant="secondary"
                      onClick={() => window.open('https://www.geeksforgeeks.org/python-programming-language/', '_blank')}
                      data-testid="featured-python-course"
                    >
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}