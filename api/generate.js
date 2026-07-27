import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt, type } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY가 설정되지 않았습니다.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    let systemInstruction = "당신은 친절하고 격려를 아끼지 않는 AI 학습 메이트입니다. 파란색처럼 쾌청하고 편안한 분위기로 답변해주세요.";
    if (type === 'placement') {
      systemInstruction += " 사용자의 성적을 분석하여 [상위권 / 중위권 / 하위권] 반 중 하나로 결정해 주고, 그 이유와 향후 공부 전략을 다정하고 명확하게 제시해 주세요.";
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return res.status(200).json({ result: responseText });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'AI 분석 중 오류가 발생했습니다.' });
  }
}
