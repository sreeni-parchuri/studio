
'use client';

import {useState, useEffect, useCallback, Suspense} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import Configuration from '@/components/Configuration';
import FeatureInput from '@/components/FeatureInput';
import FeatureList from '@/components/FeatureList';
import EffortCalculation from '@/components/EffortCalculation';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Switch} from '@/components/ui/switch';
import {v4 as uuidv4} from 'uuid';

interface Feature {
  id: string;
  module: string;
  name: string;
  multiplier: number;
  size: string;
  hours: number;
}

function ProjectPageContent() {
  // 'use client'; // No need for a nested 'use client' if the parent (this file) already has it.
  const searchParams = useSearchParams();
  const router = useRouter();

  const [projectId, setProjectId] = useState<string | null>(null);
  const [isLoadingProjectId, setIsLoadingProjectId] = useState(true); // To manage loading state for projectId

  useEffect(() => {
    // searchParams can be null initially on the client until Next.js hydration is complete
    if (searchParams) {
      const idFromParams = searchParams.get('projectId');
      setProjectId(idFromParams);
      setIsLoadingProjectId(false);
    } else {
      // If searchParams is null, it might mean we are on the very first client render
      // or it's still loading. We can decide to set loading to false if no projectId is expected without params.
      // For now, let's assume if searchParams is null and we haven't set projectId, we might still be loading.
      // A more robust check could be to see if router.isReady (if using Pages Router, but not directly applicable here)
      // or simply wait for searchParams to be non-null.
      // For App Router, searchParams should become available. If it remains null and projectId is expected,
      // it implies an issue or no param.
      // If no projectId is in URL, idFromParams will be null, which is fine.
       const idFromParams = searchParams?.get('projectId'); // Use optional chaining just in case
       setProjectId(idFromParams || null); // Ensure projectId is null if not found
       setIsLoadingProjectId(false);
    }
  }, [searchParams]);


  const [projectName, setProjectName] = useState('');
  const [projectOwner, setProjectOwner] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectIndustry, setProjectIndustry] = useState('');
  const [configuration, setConfiguration] = useState({
    XS: 10,
    S: 20,
    M: 30,
    L: 40,
    XL: 50,
    userSetup: 'Team size, experience levels',
    codeCoverage: 80,
    cssPreprocessor: 'Tailwind CSS, SCSS',
    accessibilityConsiderations: 'WCAG compliance',
    performanceTargets: 'Load times, optimization',
    securityConsiderations: 'Protection against XSS, CSRF',
    techStack: 'React, Next.js, Tailwind CSS',
    comments: 'Any additional comments or notes',
  });
  const [estimationInclusions, setEstimationInclusions] = useState({
    includeDesign: true,
    includeFrontend: true,
    includeBackend: false,
    includeQA: false,
    includeDatabase: false,
  });
  const [designComments, setDesignComments] = useState('');
  const [frontendComments, setFrontendComments] = useState('');
  const [backendComments, setBackendComments] = useState('');
  const [qaComments, setQAComments] = useState('');
  const [databaseComments, setDatabaseComments] = useState('');
  const [features, setFeatures] = useState<Feature[]>([]);
  const [totalEffort, setTotalEffort] = useState(0);

  useEffect(() => {
    const newTotalEffort = features.reduce((acc, feature) => acc + feature.hours, 0);
    setTotalEffort(newTotalEffort);
  }, [features]);

  const handleEstimationInclusionChange = (name: string, checked: boolean) => {
    setEstimationInclusions({...estimationInclusions, [name]: checked});
  };

  const handleFeatureAdd = (feature: Omit<Feature, 'id'>) => {
    const newFeature: Feature = { ...feature, id: uuidv4() };
    setFeatures([...features, newFeature]);
  };

  const handleAISuggestion = async (featureName: string) => {
    return new Promise<{suggestedTShirtSize: string; totalHours: number; reasoning: string;}>((resolve) => {
      setTimeout(() => {
        resolve({
          suggestedTShirtSize: 'M',
          totalHours: 25,
          reasoning: 'Based on the feature name, it seems like a medium-sized task.',
        });
      }, 500);
    });
  };

  const handleFeatureUpdate = useCallback((featureId: string, updatedFeature: Feature) => {
    setFeatures(currentFeatures =>
      currentFeatures.map(feature =>
        feature.id === featureId ? updatedFeature : feature
      )
    );
  }, []); // Removed setFeatures from dependency array as it's stable

  const handleFeatureDelete = useCallback((featureId: string) => {
    setFeatures(currentFeatures => currentFeatures.filter(feature => feature.id !== featureId));
  }, []); // Removed setFeatures from dependency array

  if (isLoadingProjectId) {
     return <div className="flex justify-center items-center h-screen"><p>Loading project data...</p></div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Frontend Estimator Pro {projectId ? `(Project ID: ${projectId})` : ''}</h1>

      <Tabs defaultValue="projectDetails" className="w-full">
        <TabsList>
          <TabsTrigger value="projectDetails">Project Details</TabsTrigger>
          <TabsTrigger value="estimationInclusions">Estimation Inclusions</TabsTrigger>
          <TabsTrigger value="featureList">Feature List</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
         </TabsList>
         <TabsContent value="projectDetails" className="space-y-4">
           <Card>
             <CardHeader>
               <CardTitle>Project Details</CardTitle>
               <CardDescription>Enter basic project information.</CardDescription>
             </CardHeader>
             <CardContent className="grid gap-4">
               <div className="grid gap-2">
                 <Label htmlFor="projectName">Project Name</Label>
                 <Input
                   type="text"
                   id="projectName"
                   placeholder="Project Name"
                   value={projectName}
                   onChange={(e) => setProjectName(e.target.value)}
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="projectOwner">Project Owner</Label>
                 <Input
                   type="text"
                   id="projectOwner"
                   placeholder="Project Owner"
                   value={projectOwner}
                   onChange={(e) => setProjectOwner(e.target.value)}
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="projectDescription">Project Description</Label>
                 <Textarea
                   id="projectDescription"
                   placeholder="Project Description"
                   value={projectDescription}
                   onChange={(e) => setProjectDescription(e.target.value)}
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="projectIndustry">Project Industry</Label>
                 <Input
                   type="text"
                   id="projectIndustry"
                   placeholder="Project Industry"
                   value={projectIndustry}
                   onChange={(e) => setProjectIndustry(e.target.value)}
                 />
               </div>
             </CardContent>
           </Card>
         </TabsContent>
         <TabsContent value="estimationInclusions" className="space-y-4">
           <Card>
             <CardHeader>
               <CardTitle>Estimation Inclusions</CardTitle>
               <CardDescription>Select which estimations to include in the project.</CardDescription>
             </CardHeader>
             <CardContent className="grid gap-4">
               <div className="grid gap-2">
                <Label htmlFor="includeDesign" className="flex items-center space-x-2">
                   <Switch
                     id="includeDesign"
                     name="includeDesign"
                     checked={estimationInclusions.includeDesign}
                     onCheckedChange={checked => handleEstimationInclusionChange('includeDesign', checked)}
                   />
                   <span>Include Design</span>
                 </Label>
                 <Textarea
                   id="designComments"
                   placeholder="Design Comments"
                   value={designComments}
                   onChange={(e) => setDesignComments(e.target.value)}
                   className="mt-2"
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="includeFrontend" className="flex items-center space-x-2">
                   <Switch
                     id="includeFrontend"
                     name="includeFrontend"
                     checked={estimationInclusions.includeFrontend}
                     onCheckedChange={checked => handleEstimationInclusionChange('includeFrontend', checked)}
                   />
                   <span>Include Frontend</span>
                 </Label>
                 <Textarea
                   id="frontendComments"
                   placeholder="Frontend Comments"
                   value={frontendComments}
                   onChange={(e) => setFrontendComments(e.target.value)}
                    className="mt-2"
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="includeBackend" className="flex items-center space-x-2">
                   <Switch
                     id="includeBackend"
                     name="includeBackend"
                     checked={estimationInclusions.includeBackend}
                     onCheckedChange={checked => handleEstimationInclusionChange('includeBackend', checked)}
                   />
                   <span>Include Backend</span>
                 </Label>
                 <Textarea
                   id="backendComments"
                   placeholder="Backend Comments"
                   value={backendComments}
                   onChange={(e) => setBackendComments(e.target.value)}
                    className="mt-2"
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="includeQA" className="flex items-center space-x-2">
                   <Switch
                     id="includeQA"
                     name="includeQA"
                     checked={estimationInclusions.includeQA}
                     onCheckedChange={checked => handleEstimationInclusionChange('includeQA', checked)}
                   />
                   <span>Include QA</span>
                 </Label>
                 <Textarea
                   id="qaComments"
                   placeholder="QA Comments"
                   value={qaComments}
                   onChange={(e) => setQAComments(e.target.value)}
                    className="mt-2"
                 />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="includeDatabase" className="flex items-center space-x-2">
                   <Switch
                     id="includeDatabase"
                     name="includeDatabase"
                     checked={estimationInclusions.includeDatabase}
                     onCheckedChange={checked => handleEstimationInclusionChange('includeDatabase', checked)}
                   />
                   <span>Include Database</span>
                 </Label>
                 <Textarea
                   id="databaseComments"
                   placeholder="Database Comments"
                   value={databaseComments}
                   onChange={(e) => setDatabaseComments(e.target.value)}
                    className="mt-2"
                 />
               </div>
             </CardContent>
           </Card>
         </TabsContent>
         <TabsContent value="featureList" className="space-y-4">
              <FeatureInput
                onFeatureAdd={handleFeatureAdd}
                onAISuggestion={handleAISuggestion}
                configuration={configuration}
                estimationInclusions={estimationInclusions}
              />
              <FeatureList
                features={features}
                onFeatureUpdate={handleFeatureUpdate}
                onFeatureDelete={handleFeatureDelete}
                configuration={configuration}
              />
         </TabsContent>
         <TabsContent value="configuration" className="space-y-4">
           <Configuration configuration={configuration} setConfiguration={setConfiguration} />
         </TabsContent>
       </Tabs>

       <EffortCalculation totalEffort={totalEffort} />
     </div>
   );
 }

export default function HomePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><p>Loading project details...</p></div>}>
      <ProjectPageContent />
    </Suspense>
  );
}

