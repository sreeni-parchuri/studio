'use client';

import {useState, useEffect} from 'react';
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

export default function Home() {
  const [features, setFeatures] = useState<
    {module: string; name: string; multiplier: number; size: string; hours: number}[]
  >([]);
  const [totalEffort, setTotalEffort] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [projectOwner, setProjectOwner] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectIndustry, setProjectIndustry] = useState('');
  const [includeDesign, setIncludeDesign] = useState(false);
  const [includeBackend, setIncludeBackend] = useState(false);
  const [includeFrontend, setIncludeFrontend] = useState(true); // Default to true
  const [includeQA, setIncludeQA] = useState(false);
  const [includeDatabase, setIncludeDatabase] = useState(false);
  const [designComments, setDesignComments] = useState('');
  const [backendComments, setBackendComments] = useState('');
  const [frontendComments, setFrontendComments] = useState('');
  const [qaComments, setQAComments] = useState('');
  const [databaseComments, setDatabaseComments] = useState('');

  const [configuration, setConfiguration] = useState({
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

  const handleFeatureAdd = (newFeature: {
    module: string;
    name: string;
    multiplier: number;
    size: string;
    hours: number;
  }) => {
    setFeatures([...features, newFeature]);
  };

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
                      checked={includeDesign}
                      onCheckedChange={(checked) => setIncludeDesign(checked)}
                    />
                  </div>
                  <Textarea
                    placeholder="Design Comments"
                    value={designComments}
                    onChange={(e) => setDesignComments(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeBackend">Include Backend</Label>
                    <Switch
                      id="includeBackend"
                      checked={includeBackend}
                      onCheckedChange={(checked) => setIncludeBackend(checked)}
                    />
                  </div>
                  <Textarea
                    placeholder="Backend Comments"
                    value={backendComments}
                    onChange={(e) => setBackendComments(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeFrontend">Include Frontend</Label>
                    <Switch
                      id="includeFrontend"
                      checked={includeFrontend}
                      onCheckedChange={(checked) => setIncludeFrontend(checked)}
                    />
                  </div>
                  <Textarea
                    placeholder="Frontend Comments"
                    value={frontendComments}
                    onChange={(e) => setFrontendComments(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeQA">Include QA</Label>
                    <Switch
                      id="includeQA"
                      checked={includeQA}
                      onCheckedChange={(checked) => setIncludeQA(checked)}
                    />
                  </div>
                  <Textarea
                    placeholder="QA Comments"
                    value={qaComments}
                    onChange={(e) => setQAComments(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeDatabase">Include Database</Label>
                    <Switch
                      id="includeDatabase"
                      checked={includeDatabase}
                      onCheckedChange={(checked) => setIncludeDatabase(checked)}
                    />
                  </div>
                  <Textarea
                    placeholder="Database Comments"
                    value={databaseComments}
                    onChange={(e) => setDatabaseComments(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="featureInput" className="space-y-4">
          {includeFrontend && (
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
    </div>
  );
}
