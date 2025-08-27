import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Navbar } from '@/components/job-portal/navbar';
import { Plus, Building, Globe, Linkedin, MapPin } from 'lucide-react';
import type { InsertCompany, Company } from '@shared/schema';

function AddCompanyDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<InsertCompany>({
    name: '',
    description: '',
    website: '',
    linkedinUrl: '',
    logo: '',
    location: '',
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createCompanyMutation = useMutation({
    mutationFn: async (data: InsertCompany) => {
      const response = await apiRequest('POST', '/api/companies', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Company added successfully',
        description: 'The company has been added to the database.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/companies'] });
      setOpen(false);
      setFormData({
        name: '',
        description: '',
        website: '',
        linkedinUrl: '',
        logo: '',
        location: '',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to add company',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({
        title: 'Please enter company name',
        description: 'Company name is required.',
        variant: 'destructive',
      });
      return;
    }
    createCompanyMutation.mutate(formData);
  };

  const handleChange = (field: keyof InsertCompany, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription>
            Add a new company to the database for job postings.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name *</Label>
            <Input
              id="company-name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter company name"
              required
              data-testid="company-name-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-description">Description</Label>
            <Textarea
              id="company-description"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Company description"
              className="min-h-20"
              data-testid="company-description-textarea"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-website">Website</Label>
            <Input
              id="company-website"
              value={formData.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://company.com"
              data-testid="company-website-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-linkedin">LinkedIn URL</Label>
            <Input
              id="company-linkedin"
              value={formData.linkedinUrl || ''}
              onChange={(e) => handleChange('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/company/..."
              data-testid="company-linkedin-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-location">Location</Label>
            <Input
              id="company-location"
              value={formData.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="City, Country"
              data-testid="company-location-input"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="cancel-company-button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createCompanyMutation.isPending}
              data-testid="create-company-button"
            >
              {createCompanyMutation.isPending ? 'Adding...' : 'Add Company'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Companies() {
  const { data: companies = [], isLoading } = useQuery<Company[]>({
    queryKey: ['/api/companies'],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Companies</h1>
            <p className="text-gray-600">
              Manage companies for job postings and recruitment.
            </p>
          </div>
          
          <AddCompanyDialog>
            <Button className="w-full sm:w-auto" data-testid="add-company-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Company
            </Button>
          </AddCompanyDialog>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 md:p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {companies.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base md:text-lg">{company.name}</CardTitle>
                        {company.location && (
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {company.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {company.description && (
                    <CardDescription className="text-sm mb-4 line-clamp-3">
                      {company.description}
                    </CardDescription>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {company.website && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                        data-testid={`company-website-${company.id}`}
                      >
                        <a href={company.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="w-3 h-3 mr-1" />
                          Website
                        </a>
                      </Button>
                    )}
                    
                    {company.linkedinUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="text-xs"
                        data-testid={`company-linkedin-${company.id}`}
                      >
                        <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-3 h-3 mr-1" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && companies.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No companies yet</h3>
            <p className="text-gray-500 mb-4">
              Start by adding your first company to the database.
            </p>
            <AddCompanyDialog>
              <Button data-testid="add-first-company-button">
                <Plus className="w-4 h-4 mr-2" />
                Add First Company
              </Button>
            </AddCompanyDialog>
          </div>
        )}
      </div>
    </div>
  );
}