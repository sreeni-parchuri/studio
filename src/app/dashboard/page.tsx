'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {db} from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';

interface Project {
  id?: string;
  projectName: string;
  projectOwner: string;
  projectDescription: string;
  projectIndustry: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Project>({
    projectName: '',
    projectOwner: '',
    projectDescription: '',
    projectIndustry: '',
  });
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsList: Project[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];

      setProjects(projectsList);
      setLoading(false);
    };
    setLoading(true);
    fetchProjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProject({...newProject, [e.target.name]: e.target.value});
  };

  const createProject = async () => {
    try {
      const docRef = await addDoc(collection(db, 'projects'), newProject);
+     const createdProject: Project = {id: docRef.id, ...newProject};
+     setProjects((prevProjects) => [...prevProjects, createdProject]);
      setNewProject({
        projectName: '',
        projectOwner: '',
        projectDescription: '',
        projectIndustry: '',
      });
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    router.push(`/?projectId=${projectId}`);
  };

  const deleteProject = async (projectId: string) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Project Dashboard</h1>
      <Button onClick={() => setIsCreating(true)}>Create New Project</Button>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Project</CardTitle>
            <CardDescription>Enter project details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                type="text"
                id="projectName"
                name="projectName"
                placeholder="Project Name"
                value={newProject.projectName}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="projectOwner">Project Owner</Label>
              <Input
                type="text"
                id="projectOwner"
                name="projectOwner"
                placeholder="Project Owner"
                value={newProject.projectOwner}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Input
                type="text"
                id="projectDescription"
                name="projectDescription"
                placeholder="Project Description"
                value={newProject.projectDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="projectIndustry">Project Industry</Label>
              <Input
                type="text"
                id="projectIndustry"
                name="projectIndustry"
                placeholder="Project Industry"
                value={newProject.projectIndustry}
                onChange={handleInputChange}
              />
            </div>
            <Button type="button" onClick={createProject}>
              Create Project
            </Button>
          </CardContent>
        </Card>
      )}

      <h2 className="text-xl font-semibold">
        Existing Projects
      </h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.projectName}</CardTitle>
                <CardDescription>
                  Owner: {project.projectOwner} | Industry: {project.projectIndustry}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button onClick={() => handleProjectSelect(project.id || '')}>
                  Resume
                </Button>
                <Button variant="destructive" onClick={() => deleteProject(project.id || '')}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

