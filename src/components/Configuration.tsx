'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {useState} from 'react';

const defaultConfiguration = {
  userSetup: '',
  codeCoverage: '',
  cssPreprocessor: '',
  accessibilityConsiderations: '',
  performanceTargets: '',
  securityConsiderations: '',
  xsMultiplier: '',
  sMultiplier: '',
  mMultiplier: '',
  lMultiplier: '',
  xlMultiplier: '',
  techStack: '',
  comments: '',
  xsHours: '',
  sHours: '',
  mHours: '',
  lHours: '',
  xlHours: '',
};

export default function Configuration() {
  const [configuration, setConfiguration] = useState(defaultConfiguration);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {id, value} = event.target;
    setConfiguration({...configuration, [id]: value});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration Setup</CardTitle>
        <CardDescription>Set up standard estimation parameters.</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Setting</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Label htmlFor="userSetup">User Setup Considerations</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  id="userSetup"
                  value={configuration.userSetup}
                  onChange={handleChange}
                  placeholder="e.g., Team size, experience levels"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="codeCoverage">Code Coverage (%)</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="codeCoverage"
                  value={configuration.codeCoverage}
                  onChange={handleChange}
                  placeholder="e.g., 80"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="cssPreprocessor">CSS Preprocessor</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  id="cssPreprocessor"
                  value={configuration.cssPreprocessor}
                  onChange={handleChange}
                  placeholder="e.g., Tailwind CSS, SCSS"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="accessibilityConsiderations">
                  Accessibility Considerations
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  id="accessibilityConsiderations"
                  value={configuration.accessibilityConsiderations}
                  onChange={handleChange}
                  placeholder="e.g., WCAG compliance"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="performanceTargets">Performance Targets</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  id="performanceTargets"
                  value={configuration.performanceTargets}
                  onChange={handleChange}
                  placeholder="e.g., Load times, optimization"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="securityConsiderations">
                  Security Considerations
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  id="securityConsiderations"
                  value={configuration.securityConsiderations}
                  onChange={handleChange}
                  placeholder="e.g., Protection against XSS, CSRF"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="xsMultiplier">XS Multiplier</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="xsMultiplier"
                  value={configuration.xsMultiplier}
                  onChange={handleChange}
                  placeholder="e.g., 0.5"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="sMultiplier">S Multiplier</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="sMultiplier"
                  value={configuration.sMultiplier}
                  onChange={handleChange}
                  placeholder="e.g., 1"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="mMultiplier">M Multiplier</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="mMultiplier"
                  value={configuration.mMultiplier}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="lMultiplier">L Multiplier</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="lMultiplier"
                  value={configuration.lMultiplier}
                  onChange={handleChange}
                  placeholder="e.g., 3"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="xlMultiplier">XL Multiplier</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="xlMultiplier"
                  value={configuration.xlMultiplier}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="xsHours">XS Hours</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="xsHours"
                  value={configuration.xsHours}
                  onChange={handleChange}
                  placeholder="e.g., 10"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="sHours">S Hours</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="sHours"
                  value={configuration.sHours}
                  onChange={handleChange}
                  placeholder="e.g., 20"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="mHours">M Hours</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="mHours"
                  value={configuration.mHours}
                  onChange={handleChange}
                  placeholder="e.g., 30"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="lHours">L Hours</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="lHours"
                  value={configuration.lHours}
                  onChange={handleChange}
                  placeholder="e.g., 40"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="xlHours">XL Hours</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  id="xlHours"
                  value={configuration.xlHours}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="techStack">Tech Stack</Label>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  id="techStack"
                  value={configuration.techStack}
                  onChange={handleChange}
                  placeholder="e.g., React, Next.js, Tailwind CSS"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label htmlFor="comments">Comments</Label>
              </TableCell>
              <TableCell>
                <Textarea
                  id="comments"
                  value={configuration.comments}
                  onChange={handleChange}
                  placeholder="Any additional comments or notes"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
