import { GoogleGenerativeAI } from "@google/generative-ai";

// Upload audio to Cloudinary
export const uploadToCloudinary = async (audioBlob: Blob): Promise<string> => {
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;

  if (!cloudinaryUrl || !uploadPreset) {
    throw new Error('Missing Cloudinary configuration in environment variables');
  }

  const formData = new FormData();
  formData.append('file', audioBlob);
  formData.append('upload_preset', uploadPreset);

  console.log(audioBlob.type);

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload audio to Cloudinary');
    }

    const result = await response.json();
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading audio to Cloudinary:', error);
    throw error;
  }
};

export const uploadJsonToCloudinary = async (jsonData: object): Promise<string> => {
  const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL as string;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;

  if (!cloudinaryUrl || !uploadPreset) {
    throw new Error('Missing Cloudinary configuration in environment variables');
  }

  const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('file', jsonBlob, 'data.json');
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload JSON to Cloudinary');
    }

    const result = await response.json();
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading JSON to Cloudinary:', error);
    throw error;
  }
};


// Generate music theme using Google Generative AI
export const generateMusicTheme = async (prompt: string): Promise<string | null> => {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

  if (!googleApiKey) {
    throw new Error('Missing Google API key in environment variables');
  }

  try {
    const genAI = new GoogleGenerativeAI(googleApiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const formattedPrompt = `"Generate a creative and evocative one to two word theme for the following description: '${prompt}'. 
    The theme should evoke strong emotions, imagery, or moods, and align with the vibe of music creation. 
    Use laymen's words. strictly return only one theme."`;

    const result = await model.generateContent(formattedPrompt);
    console.log("Generated music theme:", result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error generating music theme:", error);
    return null;
  }
};

// Generate music using Hugging Face API
export const generateMusic = async (data: { inputs: string }) => {
  const beatovenApiKey = process.env.NEXT_PUBLIC_BEATOVEN_API_KEY as string;

  if (!beatovenApiKey) {
    throw new Error('Missing Beatoven API key in environment variables');
  }

  try {
    // Step 1: Compose the track
    const composeResponse = await fetch('https://public-api.beatoven.ai/api/v1/tracks/compose', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${beatovenApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: { text: data.inputs },
        format: 'wav',
        looping: false,
      }),
    });

    if (!composeResponse.ok) {
      throw new Error('Failed to initiate composition');
    }

    const composeResult = await composeResponse.json();
    const taskId = composeResult.task_id;

    // Step 2: Poll for composition completion
    let status = 'composing';
    let finalResult = null;

    while (status !== 'composed') {
      await new Promise((res) => setTimeout(res, 3000)); // wait 3 seconds
      const statusResponse = await fetch(`https://public-api.beatoven.ai/api/v1/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${beatovenApiKey}`,
        },
      });

      if (!statusResponse.ok) {
        throw new Error('Failed to check task status');
      }

      finalResult = await statusResponse.json();
      status = finalResult.status;

      if (status === 'failed') {
        throw new Error('Track composition failed');
      }
    }

    // Step 3: Return track URL (you could also return stems if needed)
    const trackUrl = finalResult.meta.track_url;
    return trackUrl;

  } catch (error) {
    console.error('Error generating music:', error);
    throw error;
  }
};

