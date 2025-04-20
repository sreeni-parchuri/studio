
import {useState} from 'react';
import {toast} from '@/hooks/use-toast';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {suggestTShirtSize} from '@/ai/flows/suggest-t-shirt-size';

interface FeatureInputProps {
  onFeatureAdd: (feature: { description: string; size: string }) => void;
}

export default function FeatureInput({onFeatureAdd}: FeatureInputProps) {
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');

  const handleSubmit = () => {
    if (description && size) {
      onFeatureAdd({description, size});
      setDescription('');
      setSize('');
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
    if (description) {
      try {
        const aiSuggestion = await suggestTShirtSize({featureDescription: description});
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
        <div className="grid gap-2">
          <Label htmlFor="description">Feature Description</Label>
          <Textarea
            id="description"
            placeholder="Enter feature description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
