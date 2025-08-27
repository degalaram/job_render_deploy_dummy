import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/job-portal/navbar';
import { 
  Search, 
  MapPin, 
  Clock, 
  Building, 
  ExternalLink,
  Users,
  Calendar,
  DollarSign,
  Share2,
  MessageCircle,
  Instagram,
  Send,
  CheckCircle,
  Eye
} from 'lucide-react';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';
import type { Job, Company } from '@shared/schema';

type JobWithCompany = Job & { company: Company };

export default function Jobs() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const { data: allJobs = [], isLoading } = useQuery({
    queryKey: ['/api/jobs'],
  });

  const { data: applications = [] } = useQuery({
    queryKey: ['/api/applications/user', user.id],
    enabled: !!user.id,
  });

  useEffect(() => {
    if (Array.isArray(applications) && applications.length > 0) {
      const appliedJobIds = applications.map((app: any) => app.jobId);
      setAppliedJobs(appliedJobIds);
    }
  }, [applications]);

  const filteredJobs = Array.isArray(allJobs) ? allJobs.filter((job: JobWithCompany) => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === '' || 
      job.location.toLowerCase().includes(locationFilter.toLowerCase());

    const now = new Date();
    const closingDate = new Date(job.closingDate);
    const isExpired = closingDate < now;
    const isExpiredRecently = (now.getTime() - closingDate.getTime()) <= (48 * 60 * 60 * 1000);

    switch (activeTab) {
      case 'fresher':
        return matchesSearch && matchesLocation && job.experienceLevel === 'fresher' && !isExpired;
      case 'experienced':
        return matchesSearch && matchesLocation && job.experienceLevel === 'experienced' && !isExpired;
      case 'expired':
        return matchesSearch && matchesLocation && (isExpired || !job.isActive);
      default:
        return matchesSearch && matchesLocation && !isExpired && job.isActive;
    }
  }) : [];

  const handleJobClick = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleShare = (e: React.MouseEvent, job: JobWithCompany, platform: string) => {
    e.stopPropagation();
    const jobUrl = `${window.location.origin}/jobs/${job.id}`;
    const text = `Check out this job: ${job.title} at ${job.company.name}`;
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + jobUrl)}`, '_blank');
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(jobUrl)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'instagram':
        // Instagram doesn't have direct link sharing, so copy to clipboard
        navigator.clipboard.writeText(jobUrl);
        alert('Link copied to clipboard! You can paste it on Instagram.');
        break;
      default:
        navigator.clipboard.writeText(jobUrl);
        alert('Link copied to clipboard!');
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffMs = now.getTime() - posted.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Less than 1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search jobs, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="search-jobs"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                  data-testid="search-location"
                />
              </div>
            </div>
            <Button data-testid="search-button">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Job Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8">
            <TabsTrigger value="all" data-testid="tab-all-jobs">All Jobs</TabsTrigger>
            <TabsTrigger value="fresher" data-testid="tab-fresher-jobs">Fresher Jobs</TabsTrigger>
            <TabsTrigger value="experienced" data-testid="tab-experienced-jobs">Experienced Jobs</TabsTrigger>
            <TabsTrigger value="expired" data-testid="tab-expired-jobs">Expired Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="grid gap-6">
              {filteredJobs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 mb-4">
                      <Users className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600">
                      {activeTab === 'expired' 
                        ? 'No expired jobs in your search criteria.' 
                        : 'Try adjusting your search criteria or check back later for new opportunities.'}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredJobs.map((job: JobWithCompany) => {
                  const isApplied = appliedJobs.includes(job.id);
                  const isExpired = new Date(job.closingDate) < new Date();
                  
                  return (
                    <Card 
                      key={job.id} 
                      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 border-l-blue-500 mx-2 sm:mx-0"
                      onClick={() => handleJobClick(job.id)}
                      data-testid={`job-card-${job.id}`}
                    >
                      <CardContent className="p-4 sm:p-6">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                              {job.title}
                            </h3>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Building className="w-4 h-4 mr-2" />
                                <span className="font-medium">{job.company.name}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{job.location}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {getTimeAgo(typeof job.createdAt === 'string' ? job.createdAt : new Date().toISOString())}
                            </div>
                          </div>
                          
                          {/* Company Logo & Status */}
                          <div className="flex flex-col items-end space-y-2 ml-0 sm:ml-4 mt-3 sm:mt-0">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border shadow-sm">
                              <img 
                                src={job.company.logo || '/api/placeholder/64/64'} 
                                alt={job.company.name}
                                className="w-14 h-14 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  target.nextElementSibling!.textContent = job.company.name.charAt(0).toUpperCase();
                                }}
                              />
                              <span className="hidden text-xl font-semibold text-gray-600"></span>
                            </div>
                            {isApplied && (
                              <Badge className="bg-green-500 text-white">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Applied
                              </Badge>
                            )}
                            {isExpired && (
                              <Badge variant="destructive">Expired</Badge>
                            )}
                          </div>
                        </div>

                        {/* Salary & Experience Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                            <div className="text-green-600 font-semibold text-lg">
                              {job.salary}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="w-4 h-4 mr-1" />
                              <span className="text-sm">{job.experienceMin}-{job.experienceMax} years</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span className="text-sm">
                                Closes: {new Date(job.closingDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Badge variant={job.experienceLevel === 'fresher' ? 'default' : 'secondary'}>
                            {job.experienceLevel === 'fresher' ? 'Fresher' : 'Experienced'}
                          </Badge>
                        </div>

                        {/* Skills Section */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.split(',').slice(0, 6).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                              {skill.trim()}
                            </Badge>
                          ))}
                          {job.skills.split(',').length > 6 && (
                            <Badge variant="outline" className="text-xs px-2 py-1">+{job.skills.split(',').length - 6} more</Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-3">
                            {/* Share Buttons */}
                            <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                              <button
                                onClick={(e) => handleShare(e, job, 'whatsapp')}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                                title="Share on WhatsApp"
                                data-testid={`share-whatsapp-${job.id}`}
                              >
                                <FaWhatsapp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleShare(e, job, 'telegram')}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                title="Share on Telegram"
                                data-testid={`share-telegram-${job.id}`}
                              >
                                <FaTelegram className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleShare(e, job, 'instagram')}
                                className="p-2 text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
                                title="Share on Instagram"
                                data-testid={`share-instagram-${job.id}`}
                              >
                                <Instagram className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => handleShare(e, job, 'copy')}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                                title="Copy Link"
                                data-testid={`share-copy-${job.id}`}
                              >
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                            {isApplied && (
                              <span className="text-sm text-green-600 font-medium">Applied</span>
                            )}
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJobClick(job.id);
                              }}
                              className="flex items-center space-x-2"
                              data-testid={`view-details-${job.id}`}
                            >
                              <Eye className="w-4 h-4" />
                              <span>View Details</span>
                            </Button>
                            {!isApplied && !isExpired && (
                              <Button 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (job.applyUrl) {
                                    window.open(job.applyUrl, '_blank');
                                  } else {
                                    handleJobClick(job.id);
                                  }
                                }}
                                className="bg-blue-600 hover:bg-blue-700"
                                data-testid={`apply-now-${job.id}`}
                              >
                                Apply Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}