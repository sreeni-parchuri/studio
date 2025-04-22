import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

interface Feature {
  module: string;
  name: string;
  multiplier: number;
  size: string;
  hours: number;
}

interface FeatureListProps {
  features: Feature[];
}

export default function FeatureList({features}: FeatureListProps) {
  const basicSetupFeatures = features.filter(feature => 
    ['Setup Technology Stack Selection', 'Develop Processes'].includes(feature.module)
  );

  const existingFeatures = features.filter(feature => 
    !['Setup Technology Stack Selection', 'Develop Processes', 'Buffer', 'PMO Activities'].includes(feature.module) &&
    !basicSetupFeatures.includes(feature)
  );

  const additionalActivitiesFeatures = features.filter(feature => 
    ['Buffer', 'PMO Activities'].includes(feature.module)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature List</CardTitle>
        <CardDescription>
          List of project-specific features and their estimations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Basic Setup Section */}
        {basicSetupFeatures.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-2">Basic Setup</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Feature Name</TableHead>
                  <TableHead>Multiplier</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {basicSetupFeatures.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell>{feature.module}</TableCell>
                    <TableCell>{feature.name}</TableCell>
                    <TableCell>{feature.multiplier}</TableCell>
                    <TableCell>{feature.size}</TableCell>
                    <TableCell>{feature.hours}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        {/* Existing Features Section */}
        {existingFeatures.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-4 mb-2">Existing Features</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Feature Name</TableHead>
                  <TableHead>Multiplier</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {existingFeatures.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell>{feature.module}</TableCell>
                    <TableCell>{feature.name}</TableCell>
                    <TableCell>{feature.multiplier}</TableCell>
                    <TableCell>{feature.size}</TableCell>
                    <TableCell>{feature.hours}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        {/* Additional Activities Section */}
        {additionalActivitiesFeatures.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-4 mb-2">Additional Activities</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Feature Name</TableHead>
                  <TableHead>Multiplier</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {additionalActivitiesFeatures.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell>{feature.module}</TableCell>
                    <TableCell>{feature.name}</TableCell>
                    <TableCell>{feature.multiplier}</TableCell>
                    <TableCell>{feature.size}</TableCell>
                    <TableCell>{feature.hours}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}
