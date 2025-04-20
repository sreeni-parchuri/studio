'use client';

import {useState, useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {useRouter} from 'next/navigation';
import Configuration from '@/components/Configuration';
import FeatureInput from '@/components/FeatureInput';
import FeatureList from '@/components/FeatureList';
import EffortCalculation from '@/components/EffortCalculation';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Switch} from '@/components/ui/switch';
import {suggestTShirtSize} from '@/ai/flows/suggest-t-shirt-size';
import {Button} from '@/components/ui/button';
import {db} from '@/lib/firebase';
import {
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

interface Feature {
  module: string;
  name: string;
  multiplier: number;
  size: string;
  hours: number;
}

interface ConfigurationType {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  userSetup: string;
  codeCoverage: string;
  cssPreprocessor: string;
  accessibilityConsiderations: string;
  performanceTargets: string;
  securityConsiderations: string;
  xsMultiplier: number;
  sMultiplier: number;
  mMultiplier: number;
  lMultiplier: number;
  xlMultiplier: number;
  techStack: string;
  comments: string;
}

interface ProjectDetails {
  projectName: string;
  projectOwner: string;
  projectDescription: string;
  projectIndustry: string;
}

interface EstimationInclusions {
  includeDesign: boolean;
  includeBackend: boolean;
  includeFrontend: boolean;
  includeQA: boolean;
  includeDatabase: boolean;
  designComments: string;
  backendComments: string;
  frontendComments: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const router = useRouter();
  const [features, setFeatures] = useState<Feature[]>([]);
  const [totalEffort, setTotalEffort] = useState(0);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    projectName: '',
    projectOwner: '',
    projectDescription: '',
    projectIndustry: '',
  });
  const [estimationInclusions, setEstimationInclusions] = useState<EstimationInclusions>({
    includeDesign: false,
    includeBackend: false,
    includeFrontend: true,
    includeQA: false,
    includeDatabase: false,
    designComments: '',
    backendComments: '',
    frontendComments: '',
    qaComments: '',
    databaseComments: '',
  });

  const [configuration, setConfiguration] = useState<ConfigurationType>({
    XS: 10,
    S: 20,
    M: 30,
    L: 40,
    XL: 50,
    userSetup: '',
    codeCoverage: '',
    cssPreprocessor: '',
    accessibilityConsiderations: '',
    performanceTargets: '',
    securityConsiderations: '',
    xsMultiplier: 0.5,
    sMultiplier: 1,
    mMultiplier: 2,
    lMultiplier: 3,
    xlMultiplier: 5,
    techStack: '',
    comments: '',
  });

  useEffect(() => {
    if (projectId) {
      const fetchProjectData = async () => {
        const docRef = doc(db, 'projects', projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProjectDetails({
            projectName: data.projectName || '',
            projectOwner: data.projectOwner || '',
            projectDescription: data.projectDescription || '',
            projectIndustry: data.projectIndustry || '',
          });
          setEstimationInclusions({
            includeDesign: data.includeDesign || false,
            includeBackend: data.includeBackend || false,
            includeFrontend: data.includeFrontend || true,
            includeQA: data.includeQA || false,
            includeDatabase: data.includeDatabase || false,
            designComments: data.designComments || '',
            backendComments: data.backendComments || '',
            frontendComments: data.frontendComments || '',
            qaComments: data.qaComments || '',
            databaseComments: data.databaseComments || '',
          });
          setConfiguration({
            XS: data.XS || 10,
            S: data.S || 20,
            M: data.M || 30,
            L: data.L || 40,
            XL: data.XL || 50,
            userSetup: data.userSetup || '',
            codeCoverage: data.codeCoverage || '',
            cssPreprocessor: data.cssPreprocessor || '',
            accessibilityConsiderations: data.accessibilityConsiderations || '',
            performanceTargets: data.performanceTargets || '',
            securityConsiderations: data.securityConsiderations || '',
            xsMultiplier: data.xsMultiplier || 0.5,
            sMultiplier: data.sMultiplier || 1,
            mMultiplier: data.mMultiplier || 2,
            lMultiplier: data.lMultiplier || 3,
            xlMultiplier: data.xlMultiplier || 5,
            techStack: data.techStack || '',
            comments: data.comments || '',
          });
          setFeatures(data.features || []);
        } else {
          console.log('No such document!');
        }
      };

      fetchProjectData();
    }
  }, [projectId]);

  useEffect(() => {
    const calculateTotalEffort = () => {
      const effortValues: {[key: string]: number} = {
        XS: configuration.XS,
        S: configuration.S,
        M: configuration.M,
        L: configuration.L,
        XL: configuration.XL,
      };

      let calculatedEffort = 0;
      features.forEach((feature) => {
        calculatedEffort +=
          effortValues[feature.size] * feature.multiplier * feature.hours || 0;
      });
      setTotalEffort(calculatedEffort);
    };

    calculateTotalEffort();
  }, [features, configuration]);

  const handleFeatureAdd = (newFeature: Feature) => {
    setFeatures([...features, newFeature]);
  };

  const handleAISuggestion = async (featureName: string) => {
    if (featureName) {
      try {
        const aiSuggestion = await suggestTShirtSize({featureDescription: featureName});
        const {suggestedTShirtSize, totalHours, reasoning} = aiSuggestion;

        const effortValues: {[key: string]: number} = {
          XS: configuration.XS,
          S: configuration.S,
          M: configuration.M,
          L: configuration.L,
          XL: configuration.XL,
        };

        setTotalEffort(effortValues[suggestedTShirtSize] * totalHours);
        return {suggestedTShirtSize, totalHours, reasoning};
      } catch (error: any) {
        console.error('AI Suggestion Error:', error);
        return {
          suggestedTShirtSize: '',
          totalHours: 0,
          reasoning: error.message || 'Failed to get AI suggestion. Please try again.',
        };
      }
    } else {
      return {
        suggestedTShirtSize: '',
        totalHours: 0,
        reasoning: 'Please enter a feature description to get an AI suggestion.',
      };
    }
  };

  const handleProjectDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectDetails({...projectDetails, [e.target.name]: e.target.value});
  };

  const handleEstimationInclusionsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.type === 'checkbox') {
      setEstimationInclusions({
        ...estimationInclusions,
        [e.target.name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setEstimationInclusions({...estimationInclusions, [e.target.name]: e.target.value});
    }
  };

  const handleConfigurationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {id, value} = event.target;
    setConfiguration({...configuration, [id]: value as any});
  };

  const saveProjectData = async () => {
    if (projectId) {
      try {
        const docRef = doc(db, 'projects', projectId);
        await updateDoc(docRef, {
          ...projectDetails,
          ...estimationInclusions,
          ...configuration,
          features: features,
        });
        alert('Project data saved successfully!');
      } catch (error) {
        console.error('Error saving project data:', error);
        alert('Failed to save project data. Please try again.');
      }
    } else {
      alert('No project ID found. Please create or select a project first.');
      router.push('/dashboard');
     }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Frontend Estimator Pro</h1>
      <Tabs defaultValue="projectDetails" className="w-[100%]">
        <TabsList>
          <TabsTrigger value="projectDetails">Project Details</TabsTrigger>
          <TabsTrigger value="estimationInclusions">Estimation Inclusions</TabsTrigger>
          <TabsTrigger value="featureInput">Feature Input</TabsTrigger>
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
                  name="projectName"
                  placeholder="Project Name"
                  value={projectDetails.projectName}
                  onChange={handleProjectDetailsChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="projectOwner">Project Owner</Label>
                <Input
                  type="text"
                  id="projectOwner"
                  name="projectOwner"
                  placeholder="Project Owner"
                  value={projectDetails.projectOwner}
                  onChange={handleProjectDetailsChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea
                  id="projectDescription"
                  name="projectDescription"
                  placeholder="Project Description"
                  value={projectDetails.projectDescription}
                  onChange={handleProjectDetailsChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="projectIndustry">Project Industry</Label>
                <Input
                  type="text"
                  id="projectIndustry"
                  name="projectIndustry"
                  placeholder="Project Industry"
                  value={projectDetails.projectIndustry}
                  onChange={handleProjectDetailsChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="estimationInclusions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estimation Inclusions</CardTitle>
              <CardDescription>
                Select which estimations to include and provide comments.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeDesign">Include Design</Label>
                    <Switch
                      id="includeDesign"
                      name="includeDesign"
                      checked={estimationInclusions.includeDesign}
                      onCheckedChange={(checked) =>
                        handleEstimationInclusionsChange({
                          target: {name: 'includeDesign', type: 'checkbox', checked},
                        } as any)
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Design Comments"
                    name="designComments"
                    value={estimationInclusions.designComments}
                    onChange={handleEstimationInclusionsChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeBackend">Include Backend</Label>
                    <Switch
                      id="includeBackend"
                      name="includeBackend"
                      checked={estimationInclusions.includeBackend}
                      onCheckedChange={(checked) =>
                        handleEstimationInclusionsChange({
                          target: {name: 'includeBackend', type: 'checkbox', checked},
                        } as any)
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Backend Comments"
                    name="backendComments"
                    value={estimationInclusions.backendComments}
                    onChange={handleEstimationInclusionsChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeFrontend">Include Frontend</Label>
                    <Switch
                      id="includeFrontend"
                      name="includeFrontend"
                      checked={estimationInclusions.includeFrontend}
                      onCheckedChange={(checked) =>
                        handleEstimationInclusionsChange({
                          target: {name: 'includeFrontend', type: 'checkbox', checked},
                        } as any)
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Frontend Comments"
                    name="frontendComments"
                    value={estimationInclusions.frontendComments}
                    onChange={handleEstimationInclusionsChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeQA">Include QA</Label>
                    <Switch
                      id="includeQA"
                      name="includeQA"
                      checked={estimationInclusions.includeQA}
                      onCheckedChange={(checked) =>
                        handleEstimationInclusionsChange({
                          target: {name: 'includeQA', type: 'checkbox', checked},
                        } as any)
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="QA Comments"
                    name="qaComments"
                    value={estimationInclusions.qaComments}
                    onChange={handleEstimationInclusionsChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeDatabase">Include Database</Label>
                    <Switch
                      id="includeDatabase"
                      name="includeDatabase"
                      checked={estimationInclusions.includeDatabase}
                      onCheckedChange={(checked) =>
                        handleEstimationInclusionsChange({
                          target: {name: 'includeDatabase', type: 'checkbox', checked},
                        } as any)
                      }
                    />
                  </div>
                  <Textarea
                    placeholder="Database Comments"
                    name="databaseComments"
                    value={estimationInclusions.databaseComments}
                    onChange={handleEstimationInclusionsChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="featureInput" className="space-y-4">
          {estimationInclusions.includeFrontend && (
            <>
              <FeatureInput onFeatureAdd={handleFeatureAdd} onAISuggestion={handleAISuggestion} />
              <FeatureList features={features} />
            </>
          )}
          <EffortCalculation totalEffort={totalEffort} />
        </TabsContent>
        <TabsContent value="configuration" className="space-y-4">
          <Configuration
            configuration={configuration}
            setConfiguration={setConfiguration}
          />
        </TabsContent>
      </Tabs>
      <div className="flex gap-2">
        <Button onClick={saveProjectData}>Save Project</Button>
        <Button variant="secondary" onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
   );
}
