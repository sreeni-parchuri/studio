'use server';
/**
 * @fileOverview An AI agent that suggests a T-shirt size estimate for a given feature description.
 *
 * - suggestTShirtSize - A function that handles the T-shirt size estimation process.
 * - SuggestTShirtSizeInput - The input type for the suggestTShirtSize function.
 * - SuggestTShirtSizeOutput - The return type for the suggestTShirtSize function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestTShirtSizeInputSchema = z.object({
  featureDescription: z.string().describe('The description of the feature to be estimated.'),
});
export type SuggestTShirtSizeInput = z.infer<typeof SuggestTShirtSizeInputSchema>;

const SuggestTShirtSizeOutputSchema = z.object({
  suggestedTShirtSize: z
    .enum(['XS', 'S', 'M', 'L', 'XL'])
    .describe('The suggested T-shirt size estimate for the feature.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested T-shirt size estimate.'),
});
export type SuggestTShirtSizeOutput = z.infer<typeof SuggestTShirtSizeOutputSchema>;

export async function suggestTShirtSize(
  input: SuggestTShirtSizeInput
): Promise<SuggestTShirtSizeOutput> {
  return suggestTShirtSizeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTShirtSizePrompt',
  input: {
    schema: z.object({
      featureDescription: z.string().describe('The description of the feature to be estimated.'),
    }),
  },
  output: {
    schema: z.object({
      suggestedTShirtSize: z
        .enum(['XS', 'S', 'M', 'L', 'XL'])
        .describe('The suggested T-shirt size estimate for the feature.'),
      reasoning: z
        .string()
        .describe('The reasoning behind the suggested T-shirt size estimate.'),
    }),
  },
  prompt: `You are an experienced project manager estimating frontend development effort.

Based on the following feature description, suggest a T-shirt size (XS, S, M, L, XL) estimate for the feature and explain your reasoning.

Feature Description: {{{featureDescription}}}

Consider factors like complexity, scope, and potential risks when determining the T-shirt size.
`,
});

const suggestTShirtSizeFlow = ai.defineFlow<
  typeof SuggestTShirtSizeInputSchema,
  typeof SuggestTShirtSizeOutputSchema
>({
  name: 'suggestTShirtSizeFlow',
  inputSchema: SuggestTShirtSizeInputSchema,
  outputSchema: SuggestTShirtSizeOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});