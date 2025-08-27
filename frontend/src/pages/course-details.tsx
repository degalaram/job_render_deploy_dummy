import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/job-portal/navbar';
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  User, 
  Star,
  BookOpen,
  CheckCircle,
  Download,
  Users,
  Award,
  Target
} from 'lucide-react';
import type { Course } from '@shared/schema';

export default function CourseDetails() {
  const [, navigate] = useLocation();
  const [, params] = useRoute('/courses/:id');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const { data: course, isLoading } = useQuery<Course>({
    queryKey: ['/api/courses', params?.id],
    enabled: !!params?.id,
  });

  // Mock course curriculum data
  const curriculum = [
    {
      title: 'Introduction and Setup',
      duration: '45 min',
      lessons: [
        'Course Overview and Goals',
        'Setting up Development Environment',
        'Understanding Basic Concepts',
        'Your First Project Setup'
      ],
      completed: true
    },
    {
      title: 'Fundamentals',
      duration: '2 hours',
      lessons: [
        'Core Concepts and Syntax',
        'Variables and Data Types',
        'Control Structures',
        'Functions and Methods',
        'Practice Exercises'
      ],
      completed: true
    },
    {
      title: 'Intermediate Topics',
      duration: '3 hours',
      lessons: [
        'Object-Oriented Programming',
        'Error Handling',
        'File Operations',
        'Working with APIs',
        'Building Real Projects'
      ],
      completed: false
    },
    {
      title: 'Advanced Concepts',
      duration: '2.5 hours',
      lessons: [
        'Advanced Patterns',
        'Performance Optimization',
        'Testing and Debugging',
        'Deployment Strategies'
      ],
      completed: false
    },
    {
      title: 'Final Project',
      duration: '4 hours',
      lessons: [
        'Project Planning',
        'Implementation Phase',
        'Code Review and Optimization',
        'Deployment and Documentation'
      ],
      completed: false
    }
  ];

  const completedSections = curriculum.filter(section => section.completed).length;
  const progressPercentage = (completedSections / curriculum.length) * 100;

  useEffect(() => {
    setProgress(progressPercentage);
    setIsEnrolled(progressPercentage > 0);
  }, [progressPercentage]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    setProgress(20); // Start with some progress
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Course not found</h3>
              <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate('/courses')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/courses')}
          className="mb-6"
          data-testid="back-to-courses"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card>
              <div className="h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                <Play className="w-20 h-20 text-white" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl lg:text-3xl mb-4">{course.title}</CardTitle>
                    <CardDescription className="text-lg mb-4">
                      {course.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                      {course.instructor && (
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">{course.instructor}</span>
                        </div>
                      )}
                      {course.duration && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="text-sm text-gray-600">{course.duration}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">(4.8) • 2,450 students</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Course Progress (if enrolled) */}
            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Course Completion</span>
                      <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-gray-600">
                      {completedSections} of {curriculum.length} sections completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Course Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {curriculum.map((section, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          {section.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3" />
                          )}
                          <h4 className="font-medium text-gray-900">{section.title}</h4>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {section.duration}
                        </div>
                      </div>
                      
                      <div className="ml-8 space-y-2">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-gray-300 rounded-full mr-3" />
                            {lesson}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Master the fundamentals and best practices',
                    'Build real-world projects from scratch',
                    'Understand industry-standard workflows',
                    'Learn debugging and troubleshooting',
                    'Prepare for technical interviews',
                    'Get hands-on experience with tools'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card>
              <CardHeader>
                <CardTitle>Course Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {course.price}
                  </div>
                </div>
                
                {isEnrolled ? (
                  <div className="space-y-3">
                    <Button className="w-full" size="lg" data-testid="continue-learning">
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                    <Button variant="outline" className="w-full" data-testid="download-materials">
                      <Download className="w-4 h-4 mr-2" />
                      Download Materials
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleEnroll}
                    data-testid="enroll-course"
                  >
                    {course.price === 'Free' ? 'Enroll Now' : 'Enroll Now'}
                  </Button>
                )}
                
                <div className="text-center">
                  <p className="text-xs text-gray-600">
                    30-day money-back guarantee
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Skill Level:</span>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Students:</span>
                  <span className="text-sm font-medium">2,450</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Languages:</span>
                  <span className="text-sm font-medium">English</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Includes:</span>
                  <span className="text-sm font-medium">Certificate</span>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Award className="w-4 h-4 mr-2 text-yellow-600" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Download className="w-4 h-4 mr-2 text-green-600" />
                    <span>Downloadable resources</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            {course.instructor && (
              <Card>
                <CardHeader>
                  <CardTitle>Instructor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{course.instructor}</h4>
                      <p className="text-sm text-gray-600">Senior Developer & Instructor</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">(4.9)</span>
                  </div>
                  
                  <p className="text-sm text-gray-700">
                    Experienced developer with 8+ years in the industry. Has taught over 50,000 students worldwide.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}