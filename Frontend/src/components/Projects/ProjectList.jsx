import React, { useState, useEffect } from 'react';
import { FiFolder } from 'react-icons/fi';
import api from '../../utils/api';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'Admin';

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Failed to load projects. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${projectId}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProject(null);
  };

  const handleFormSuccess = () => {
    fetchProjects();
    setShowForm(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 animate-fade-in">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-text-primary text-lg font-semibold">
          Loading projects...
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-1 md:mb-2 drop-shadow-lg tracking-tight">
            PROJECTS
          </h1>
          <p className="text-text-secondary text-sm md:text-base font-normal">
            Manage your team projects and tasks...
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold transition-smooth text-sm md:text-base w-full sm:w-auto"
          >
            + Create Project
          </button>
        )}
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <div className="bg-surface p-16 rounded-2xl shadow-md text-center border border-border-dark">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiFolder className="text-primary" size={48} />
          </div>
          <p className="text-text-primary text-xl font-semibold mb-2">
            No projects found
          </p>
          <p className="text-text-secondary mb-6">
            Start by creating your first project
          </p>
          {isAdmin && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-smooth"
            >
              Create Your First Project
            </button>
          )}
        </div>
      )}

      {showForm && (
        <ProjectForm
          project={selectedProject}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
};

export default ProjectList;
