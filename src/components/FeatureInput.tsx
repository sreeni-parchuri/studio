'use client';

import {useState} from 'react';
import {toast} from '@/hooks/use-toast';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {suggestTShirtSize} from '@/ai/flows/suggest-t-shirt-size';

interface FeatureInputProps {
  onFeatureAdd: (feature: {
    module: string;
    name: string;
    multiplier: number;
    size: string;
    hours: number;
  }) => void;
}

export default function FeatureInput({onFeatureAdd}: FeatureInputProps) {
  const [module, setModule] = useState('');
  const [name, setName] = useState('');
  const [multiplier, setMultiplier] = useState(1);
  const [size, setSize] = useState('');
  const [hours, setHours] = useState(0);

  const handleSubmit = () => {
    if (module && name && multiplier && size && hours) {
      onFeatureAdd({module, name, multiplier, size, hours});
      setModule('');
      setName('');
      setMultiplier(1);
      setSize('');
      setHours(0);

      toast({
        title: 'Feature Added',
        description: 'The feature has been successfully added to the list.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
    }
  };

  const handleAISuggestion = async () => {
    if (name) {
      try {
        const aiSuggestion = await suggestTShirtSize({featureDescription: name});
        setSize(aiSuggestion.suggestedTShirtSize);
        toast({
          title: 'AI Suggestion',
          description: aiSuggestion.reasoning,
        });
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
        <div className="grid grid-cols-4 gap-4">
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
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value) || 1)}
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
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
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
