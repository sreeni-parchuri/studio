'use client';

import {useState, useEffect} from 'react';
import {toast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

interface FeatureInputProps {
  onFeatureAdd: (feature: {
    module: string;
    name: string;
    multiplier: number;
    size: string;
    hours: number;
  }) => void;
  onAISuggestion: (featureName: string) => Promise<{
    suggestedTShirtSize: string;
    totalHours: number;
    reasoning: string;
  }>;
  configuration: any;
    estimationInclusions: any;
}

export default function FeatureInput({onFeatureAdd, onAISuggestion, configuration, estimationInclusions}: FeatureInputProps) {
  const [module, setModule] = useState('');
  const [name, setName] = useState('');
  const [multiplier, setMultiplier] = useState<number | undefined>(1);
  const [size, setSize] = useState('');
  const [hours, setHours] = useState<number | undefined>(0);

  useEffect(() => {
    const calculateHours = () => {
      if (size && multiplier !== undefined) {
        const sizeHours = configuration[size] || 0;
        const sizeMultiplier = configuration[`${size.toLowerCase()}Multiplier`] || 1;
        setHours(sizeHours * multiplier * sizeMultiplier);
      } else {
        setHours(0);
      }
    };

    calculateHours();
  }, [size, multiplier, configuration]);

  const handleSubmit = () => {
    const multiplierValue = multiplier !== undefined ? multiplier : 1;
    const hoursValue = hours !== undefined ? hours : 0;

    onFeatureAdd({module, name, multiplier: multiplierValue, size, hours: hoursValue});
    setModule('');
    setName('');
    setMultiplier(1);
    setSize('');
    setHours(0);

    toast({
      title: 'Feature Added',
      description: 'The feature has been successfully added to the list.',
    });
  };

  const handleAISuggestion = async () => {
    if (name) {
      try {
        const aiSuggestion = await onAISuggestion(name);
        if (aiSuggestion) {
          const {suggestedTShirtSize, reasoning} = aiSuggestion;
          setSize(suggestedTShirtSize);
          toast({
            title: 'AI Suggestion',
            description: reasoning,
          });
        } else {
          toast({
            title: 'AI Suggestion Failed',
            description: 'Failed to get AI suggestion. Please try again.',
            variant: 'destructive',
          });
        }
      } catch (error: any) {
        console.error('AI Suggestion Error:', error);
        toast({
          title: 'AI Suggestion Failed',
          description: error.message || 'Failed to get AI suggestion. Please try again.',
          variant: 'destructive',
        });
      }
     } else {
       toast({
         title: 'Error',
         description: 'Please enter a feature description to get an AI suggestion.',
         variant: 'destructive',
       });
     }
   };
 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Input</CardTitle>
        <CardDescription>
          Input project-specific features and requirements for estimation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
        <div className="flex gap-4" >
          <div className="grid gap-2">
            <Label htmlFor="module">Module</Label>
            <Input
              type="text"
              id="module"
              placeholder="Enter module name"
              value={module}
              onChange={(e) => setModule(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Feature Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter feature name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {estimationInclusions.includeDesign && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="designMultiplier">Design Multiplier</Label>
                <Input
                  type="number"
                  id="designMultiplier"
                  placeholder="Enter multiplier"
                  value={multiplier || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[0-9]+(\.[0-9]*)?$/.test(value)) {
                      setMultiplier(value === '' ? undefined : parseFloat(value));
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designSize">Design T-Shirt Size</Label>
                <Select onValueChange={setSize} value={size}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designHours">Design Hours</Label>
                <Input
                  type="number"
                  id="designHours"
                  placeholder="Enter hours"
                  value={hours || ''}
                  readOnly
                />
              </div>
            </>
          )}

         {estimationInclusions.includeFrontend && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="frontendMultiplier">Frontend Multiplier</Label>
                <Input
                  type="number"
                  id="frontendMultiplier"
                  placeholder="Enter multiplier"
                  value={multiplier || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[0-9]+(\.[0-9]*)?$/.test(value)) {
                      setMultiplier(value === '' ? undefined : parseFloat(value));
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frontendSize">Frontend T-Shirt Size</Label>
                <Select onValueChange={setSize} value={size}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frontendHours">Frontend Hours</Label>
                <Input
                  type="number"
                  id="frontendHours"
                  placeholder="Enter hours"
                  value={hours || ''}
                  readOnly
                />
              </div>
            </>
          )}

        {estimationInclusions.includeBackend && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="backendMultiplier">Backend Multiplier</Label>
                <Input
                  type="number"
                  id="backendMultiplier"
                  placeholder="Enter multiplier"
                  value={multiplier || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[0-9]+(\.[0-9]*)?$/.test(value)) {
                      setMultiplier(value === '' ? undefined : parseFloat(value));
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="backendSize">Backend T-Shirt Size</Label>
                <Select onValueChange={setSize} value={size}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="backendHours">Backend Hours</Label>
                <Input
                  type="number"
                  id="backendHours"
                  placeholder="Enter hours"
                  value={hours || ''}
                  readOnly
                />
              </div>
            </>
          )}

         {estimationInclusions.includeQA && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="qaMultiplier">QA Multiplier</Label>
                <Input
                  type="number"
                  id="qaMultiplier"
                  placeholder="Enter multiplier"
                  value={multiplier || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[0-9]+(\.[0-9]*)?$/.test(value)) {
                      setMultiplier(value === '' ? undefined : parseFloat(value));
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qaSize">QA T-Shirt Size</Label>
                <Select onValueChange={setSize} value={size}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qaHours">QA Hours</Label>
                <Input
                  type="number"
                  id="qaHours"
                  placeholder="Enter hours"
                  value={hours || ''}
                  readOnly
                />
              </div>
            </>
          )}

          {estimationInclusions.includeDatabase && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="databaseMultiplier">Database Multiplier</Label>
                <Input
                  type="number"
                  id="databaseMultiplier"
                  placeholder="Enter multiplier"
                  value={multiplier || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[0-9]+(\.[0-9]*)?$/.test(value)) {
                      setMultiplier(value === '' ? undefined : parseFloat(value));
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="databaseSize">Database T-Shirt Size</Label>
                <Select onValueChange={setSize} value={size}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="databaseHours">Database Hours</Label>
                <Input
                  type="number"
                  id="databaseHours"
                  placeholder="Enter hours"
                  value={hours || ''}
                  readOnly
                />
              </div>
            </>
          )}

        </div>
        </div>
        <div className="flex justify-between">
          <Button type="button" variant="secondary" onClick={handleAISuggestion}>
            Get AI Suggestion
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Add Feature
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

