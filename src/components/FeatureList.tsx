
'use client';

import {useState, useEffect} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Button} from '@/components/ui/button';

interface Feature {
  id: string;
  module: string;
  name: string;
  multiplier: number;
  size: string;
  hours: number;
}

interface FeatureListProps {
  features: Feature[];
  onFeatureUpdate: (featureId: string, updatedFeature: Feature) => void;
  onFeatureDelete: (featureId: string) => void;
  configuration: any; // Add configuration to props
}

export default function FeatureList({features, onFeatureUpdate, onFeatureDelete, configuration}: FeatureListProps) {
  const [editingFeatureId, setEditingFeatureId] = useState<string | null>(null);
  const [editedModule, setEditedModule] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedMultiplier, setEditedMultiplier] = useState<number | undefined>(1);
  const [editedSize, setEditedSize] = useState('');
  const [editedHours, setEditedHours] = useState<number | undefined>(0);

  // Calculate hours when size or multiplier changes during edit
  useEffect(() => {
    if (editingFeatureId) {
      const sizeHours = configuration[editedSize] || 0;
      const sizeMultiplier = editedMultiplier || 1; // Use editedMultiplier
      // The individual size multipliers (xsMultiplier, sMultiplier etc) are not in configuration anymore based on previous request.
      // If they were, the logic would be:
      // const specificSizeMultiplier = configuration[`${editedSize.toLowerCase()}Multiplier`] || 1;
      // setEditedHours(sizeHours * sizeMultiplier * specificSizeMultiplier);
      setEditedHours(sizeHours * sizeMultiplier);
    }
  }, [editedSize, editedMultiplier, configuration, editingFeatureId]);


  const basicSetupFeatures = features.filter((feature) =>
    ['Setup Technology Stack Selection', 'Develop Processes', 'Code Setup', 'DevOps Setup'].includes(feature.module)
  );

  const existingFeatures = features.filter(
    (feature) =>
      !['Setup Technology Stack Selection', 'Develop Processes', 'Code Setup', 'DevOps Setup', 'Buffer', 'PMO Activities'].includes(
        feature.module
      )
  );

  const additionalActivitiesFeatures = features.filter((feature) =>
    ['Buffer', 'PMO Activities'].includes(feature.module)
  );

  const handleEditClick = (feature: Feature) => {
    setEditingFeatureId(feature.id);
    setEditedModule(feature.module);
    setEditedName(feature.name);
    setEditedMultiplier(feature.multiplier);
    setEditedSize(feature.size);
    setEditedHours(feature.hours);
  };

  const handleSaveClick = (featureId: string) => {
    if (editedMultiplier === undefined) {
      console.error('Multiplier cannot be undefined');
      return;
    }

    if (editedHours === undefined) {
      console.error('Hours cannot be undefined');
      return;
    }

    const updatedFeature = {
      id: featureId,
      module: editedModule,
      name: editedName,
      multiplier: editedMultiplier,
      size: editedSize,
      hours: editedHours,
    };
    onFeatureUpdate(featureId, updatedFeature);
    setEditingFeatureId(null);
  };

  const handleCancelClick = () => {
    setEditingFeatureId(null);
  };

  const renderFeatureSection = (title: string, featureList: Feature[]) => {
    if (featureList.length === 0) return null;
    return (
      <>
        <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Module</TableHead>
              <TableHead>Feature Name</TableHead>
              <TableHead>Multiplier</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featureList.map((feature) => (
              <TableRow key={feature.id}>
                <TableCell>
                  {editingFeatureId === feature.id ? (
                    <Input
                      type="text"
                      value={editedModule}
                      onChange={(e) => setEditedModule(e.target.value)}
                    />
                  ) : (
                    feature.module
                  )}
                </TableCell>
                <TableCell>
                  {editingFeatureId === feature.id ? (
                    <Input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    feature.name
                  )}
                </TableCell>
                <TableCell>
                  {editingFeatureId === feature.id ? (
                    <Input
                      type="number"
                      value={editedMultiplier === undefined ? '' : editedMultiplier}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEditedMultiplier(value === '' ? undefined : parseFloat(value));
                      }}
                    />
                  ) : (
                    feature.multiplier
                  )}
                </TableCell>
                <TableCell>
                  {editingFeatureId === feature.id ? (
                    <Select onValueChange={setEditedSize} value={editedSize}>
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
                  ) : (
                    feature.size
                  )}
                </TableCell>
                <TableCell>
                  {editingFeatureId === feature.id ? (
                    <Input
                      type="number"
                      value={editedHours === undefined ? '' : editedHours}
                      readOnly // Hours are calculated
                    />
                  ) : (
                    feature.hours
                  )}
                </TableCell>
                <TableCell>
                  {editingFeatureId === feature.id ? (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleSaveClick(feature.id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleEditClick(feature)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onFeatureDelete(feature.id)}>
                        Delete
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature List</CardTitle>
        <CardDescription>List of project-specific features and their estimations.</CardDescription>
      </CardHeader>
      <CardContent>
        {renderFeatureSection("Basic Setup", basicSetupFeatures)}
        {renderFeatureSection("Project Features", existingFeatures)}
        {renderFeatureSection("Additional Activities", additionalActivitiesFeatures)}

        {features.length === 0 && (
            <Table>
                <TableCaption>No features added yet.</TableCaption>
            </Table>
        )}
      </CardContent>
    </Card>
  );
}
