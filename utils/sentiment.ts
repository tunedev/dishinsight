const sentimentServiceBaseUrl =
  process.env.TEXT_SENTIMENT_URL || "http://text-processing.com/api/sentiment/";

interface SentimentAnalysisResult {
  label: "pos" | "neg" | "neutral";
  probability: {
    pos: number;
    neg: number;
    neutral: number;
  };
}

const fetchWithExponentialBackoff = (
  url: string,
  options: RequestInit,
  retries: number,
  delay: number
): Promise<Response> => {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, options);
        if (!response.ok && response.status === 503 && i < retries - 1) {
          // Exponential backoff
          await new Promise((res) => setTimeout(res, delay * Math.pow(2, i)));
          continue;
        }
        return resolve(response);
      } catch (error) {
        if (i === retries - 1) return reject(error);
        await new Promise((res) => setTimeout(res, delay * Math.pow(2, i)));
      }
    }
  });
};

export const fetchSentiment = async (
  text: string,
  retries: number = 5,
  delay: number = 50000
): Promise<SentimentAnalysisResult> => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `text=${encodeURIComponent(text)}`,
  };

  try {
    const response = await fetchWithExponentialBackoff(
      sentimentServiceBaseUrl,
      options,
      retries,
      delay
    );
    if (!response.ok) {
      // Return neutral sentiment after all retries
      return {
        label: "neutral",
        probability: {
          pos: 0,
          neg: 0,
          neutral: 0,
        },
      };
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    // Return neutral sentiment after all retries if there's an exception
    return {
      label: "neutral",
      probability: {
        pos: 0,
        neg: 0,
        neutral: 0,
      },
    };
  }
};
