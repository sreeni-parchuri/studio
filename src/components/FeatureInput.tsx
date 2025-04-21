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
}

export default function FeatureInput({onFeatureAdd, onAISuggestion, configuration}: FeatureInputProps) {
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
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-5 gap-4">
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
          <div className="grid gap-2">
            <Label htmlFor="multiplier">Multiplier</Label>
            <Input
              type="number"
              id="multiplier"
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
            <Label htmlFor="size">T-Shirt Size</Label>
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
            <Label htmlFor="hours">Hours</Label>
            <Input
              type="number"
              id="hours"
              placeholder="Enter hours"
              value={hours || ''}
              readOnly
            />
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

