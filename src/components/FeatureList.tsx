import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

interface FeatureListProps {
  features: {
    module: string;
    name: string;
    multiplier: number;
    size: string;
    hours: number;
  }[];
}

export default function FeatureList({features}: FeatureListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature List</CardTitle>
        <CardDescription>
          List of project-specific features and their estimations.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
            {features.map((feature, index) => (
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
      </CardContent>
    </Card>
  );
}
