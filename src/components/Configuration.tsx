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
  tshirtSize: '',
};

export default function Configuration() {
  const [configuration, setConfiguration] = useState(defaultConfiguration);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {id, value} = event.target;
    setConfiguration({...configuration, [id]: value});
  };

  const handleSelectChange = (value: string, id: string) => {
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
              <TableHead>T-Shirt Size</TableHead>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableCell>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, 'tshirtSize')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
