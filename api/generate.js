import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY가 설정되지 않았습니다.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const systemInstruction = `당신은 친절하고 격려를 아끼지 않는 전문 AI 학습 메이트입니다.
파란색처럼 쾌청하고 편안한 분위기로 답변해 주세요.
사용자의 성적 정보나 공부 고민을 바탕으로 분석하여:
1. [상위권 반 / 중위권 반 / 하위권 반] 중 어느 반에 해당하는지 명확하게 분류해 주세요.
2. 해당 반에 맞춘 구체적인 맞춤형 공부 전략, 취약점 보완법, 그리고 다정한 격려 메시지를 상세히 작성해 주세요.`;

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