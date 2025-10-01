import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  currency: string;
  deadline: string;
  status: string;
}

interface ProjectCardProps {
  project: Project;
  onBid: (projectId: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onBid }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Budget: {project.currency} {project.budget}
          </span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            Deadline: {new Date(project.deadline).toLocaleDateString()}
          </span>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          project.status === 'open' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {project.status}
        </span>
      </div>
      
      <button
        onClick={() => onBid(project.id)}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
      >
        Place Bid
      </button>
    </div>
  );
};

export default ProjectCard;
