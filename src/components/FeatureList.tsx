
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

interface FeatureListProps {
  features: { description: string; size: string }[];
}

export default function FeatureList({features}: FeatureListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature List</CardTitle>
        <CardDescription>
          List of project-specific features and their T-shirt size estimations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, index) => (
              <TableRow key={index}>
                <TableCell>{feature.description}</TableCell>
                <TableCell>{feature.size}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
