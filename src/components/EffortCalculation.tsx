
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface EffortCalculationProps {
  totalEffort: number;
}

export default function EffortCalculation({totalEffort}: EffortCalculationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Effort Calculation and Display</CardTitle>
        <CardDescription>
          Total estimated effort for the frontend development.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">Total Effort: {totalEffort} hours</p>
      </CardContent>
    </Card>
  );
}
