import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';

interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  currency: string;
  deadline: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'bids' | 'messages'>('projects');

  useEffect(() => {
    // API থেকে প্রজেক্ট ডেটা লোড করুন
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleBid = (projectId: number) => {
    // বিড ফর্ম ওপেন করার লজিক
    console.log('Bid on project:', projectId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* নেভিগেশন বার */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">FreelancerBD</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Post Project
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* মেইন কন্টেন্ট */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* ট্যাব নেভিগেশন */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {['projects', 'bids', 'messages'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* প্রজেক্ট লিস্ট */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onBid={handleBid}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
