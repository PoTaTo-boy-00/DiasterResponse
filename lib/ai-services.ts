```typescript
import { VertexAI } from '@google-cloud/vertexai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Vertex AI
const vertexAi = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT!,
  location: 'us-central1',
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!);

export interface DisasterPrediction {
  type: string;
  probability: number;
  severity: string;
  recommendedActions: string[];
}

export interface EmergencyReport {
  category: string;
  priority: number;
  keywords: string[];
  summary: string;
}

export async function predictDisaster(
  historicalData: any[],
  currentConditions: any
): Promise<DisasterPrediction> {
  const model = vertexAi.preview.getModel('disaster-prediction');
  
  const prediction = await model.predict([
    historicalData,
    currentConditions
  ]);

  return {
    type: prediction.type,
    probability: prediction.probability,
    severity: prediction.severity,
    recommendedActions: prediction.actions
  };
}

export async function categorizeEmergencyReport(
  reportText: string
): Promise<EmergencyReport> {
  const model = await genAI.getGenerativeModel({ model: 'gemini-pro' });

  const result = await model.generateContent(`
    Analyze this emergency report and provide:
    1. Category
    2. Priority (1-5)
    3. Key terms
    4. Brief summary
    
    Report: ${reportText}
  `);

  const response = result.response.text();
  // Parse the response and structure it
  // This is a simplified example
  return {
    category: 'Natural Disaster',
    priority: 4,
    keywords: ['flood', 'evacuation', 'emergency'],
    summary: response
  };
}

export async function forecastResourceDemand(
  disasterType: string,
  population: number,
  affectedArea: number
) {
  const model = vertexAi.preview.getModel('resource-forecasting');
  
  const forecast = await model.predict([
    disasterType,
    population,
    affectedArea
  ]);

  return {
    estimatedResources: forecast.resources,
    timeline: forecast.timeline,
    confidence: forecast.confidence
  };
}