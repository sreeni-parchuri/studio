
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export default function Configuration() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration Setup</CardTitle>
        <CardDescription>
          Set up standard estimation parameters.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="userSetup">User Setup Considerations</Label>
          <Input id="userSetup" placeholder="e.g., Team size, experience levels" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="codeCoverage">Code Coverage (%)</Label>
          <Input id="codeCoverage" type="number" placeholder="e.g., 80" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cssPreprocessor">CSS Preprocessor</Label>
          <Input id="cssPreprocessor" placeholder="e.g., Tailwind CSS, SCSS" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="accessibilityConsiderations">Accessibility Considerations</Label>
          <Input id="accessibilityConsiderations" placeholder="e.g., WCAG compliance" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="performanceTargets">Performance Targets</Label>
          <Input id="performanceTargets" placeholder="e.g., Load times, optimization" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="securityConsiderations">Security Considerations</Label>
          <Input id="securityConsiderations" placeholder="e.g., Protection against XSS, CSRF" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="xsMultiplier">XS Multiplier</Label>
          <Input id="xsMultiplier" type="number" placeholder="e.g., 0.5" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sMultiplier">S Multiplier</Label>
          <Input id="sMultiplier" type="number" placeholder="e.g., 1" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mMultiplier">M Multiplier</Label>
          <Input id="mMultiplier" type="number" placeholder="e.g., 2" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lMultiplier">L Multiplier</Label>
          <Input id="lMultiplier" type="number" placeholder="e.g., 3" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="xlMultiplier">XL Multiplier</Label>
          <Input id="xlMultiplier" type="number" placeholder="e.g., 5" />
        </div>
      </CardContent>
    </Card>
  );
}
