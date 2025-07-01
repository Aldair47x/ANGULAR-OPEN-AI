import { environment } from "environments/environment";


export interface OrthographyResponse {
  userPercentAccuracy: number;
  correction: any[];
  message: string;
}

export const orthographyUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${environment.gptApiUrl}` + `${environment.orthographyEndpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        ok: false,
        message: 'Failed to check orthography.',
        error: errorData.error || 'Unknown error',
      };
    }
    const data: OrthographyResponse = await response.json();
    return {
      ok: true,
      userScore: data.userPercentAccuracy,
      errors: data.correction,
      message: data.message,
    };
  } catch (error) {
    console.error('Error in orthography use case:', error);
    return {
      ok: false,
      message: 'An error occurred while processing the orthography request.',
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
