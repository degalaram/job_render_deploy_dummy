import { 
  type User, type InsertUser, type Company, type InsertCompany,
  type Job, type InsertJob, type Course, type InsertCourse,
  type Application, type InsertApplication, type Contact, type InsertContact
} from "../shared/schema.js";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

export class MemStorage {
  private users = new Map<string, User>();
  private companies = new Map<string, Company>();
  private jobs = new Map<string, Job>();
  private courses = new Map<string, Course>();
  private applications = new Map<string, Application>();
  private contacts = new Map<string, Contact>();

  constructor() {
    this.initializeSampleData();
  }

  initializeSampleData() {
    // Sample company
    const accenture: Company = {
      id: "accenture-id",
      name: "Accenture",
      description: "A leading global professional services company",
      website: "https://www.accenture.com",
      linkedinUrl: "https://www.linkedin.com/company/accenture",
      logo: null,
      location: "Bengaluru, India",
      createdAt: new Date(),
    };
    this.companies.set("accenture-id", accenture);

    // Sample job
    const job: Job = {
      id: "job-1",
      companyId: "accenture-id",
      title: "Software Developer - Fresher",
      description: "Join our dynamic team as a Software Developer.",
      requirements: "Programming skills, Problem-solving",
      qualifications: "Bachelor's degree in Computer Science",
      skills: "Java, Python, JavaScript",
      experienceLevel: "fresher",
      experienceMin: 0,
      experienceMax: 1,
      location: "Bengaluru",
      jobType: "full-time",
      salary: "₹3.5 - 4.5 LPA",
      applyUrl: null,
      closingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      batchEligible: "2024",
      isActive: true,
      createdAt: new Date(),
    };
    this.jobs.set("job-1", job);

    // Sample course
    const course: Course = {
      id: "html-course",
      title: "Complete HTML & CSS Course",
      description: "Learn HTML and CSS from scratch",
      instructor: "John Doe",
      duration: "6 weeks",
      level: "beginner",
      category: "web-development",
      imageUrl: null,
      courseUrl: null,
      price: "Free",
      createdAt: new Date(),
    };
    this.courses.set("html-course", course);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = {
      id: randomUUID(),
      email: insertUser.email,
      fullName: insertUser.fullName,
      phone: insertUser.phone || null,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | undefined> {
    const user = await this.getUserByEmail(email);
    if (!user) return undefined;
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : undefined;
  }

  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getJobs(filters?: { experienceLevel?: string; location?: string; search?: string }): Promise<(Job & { company: Company })[]> {
    let jobs = Array.from(this.jobs.values());
    
    if (filters?.experienceLevel) {
      jobs = jobs.filter(job => job.experienceLevel === filters.experienceLevel);
    }
    
    return jobs.map(job => {
      const company = this.companies.get(job.companyId)!;
      return { ...job, company };
    });
  }

  async getJob(id: string): Promise<(Job & { company: Company }) | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    const company = this.companies.get(job.companyId)!;
    return { ...job, company };
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const application: Application = {
      id: randomUUID(),
      userId: insertApplication.userId,
      jobId: insertApplication.jobId,
      status: insertApplication.status || null,
      appliedAt: new Date(),
    };
    this.applications.set(application.id, application);
    return application;
  }

  async getUserApplications(userId: string): Promise<(Application & { job: Job & { company: Company } })[]> {
    const userApps = Array.from(this.applications.values()).filter(app => app.userId === userId);
    return userApps.map(app => {
      const job = this.jobs.get(app.jobId)!;
      const company = this.companies.get(job.companyId)!;
      return { ...app, job: { ...job, company } };
    });
  }

  async getCourses(category?: string): Promise<Course[]> {
    let courses = Array.from(this.courses.values());
    if (category) {
      courses = courses.filter(course => course.category === category);
    }
    return courses;
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const contact: Contact = {
      id: randomUUID(),
      name: insertContact.name,
      email: insertContact.email,
      message: insertContact.message,
      createdAt: new Date(),
    };
    this.contacts.set(contact.id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
