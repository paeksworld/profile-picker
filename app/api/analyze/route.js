const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

export async function POST(req) {
  try {
    const { images, count } = await req.json()

    if (!images || images.length < 2) {
      return Response.json({ error: '사진을 2장 이상 올려줘' }, { status: 400, headers: corsHeaders })
    }

    const imageBlocks = images.map((img) => ({
      type: 'image',
      source: {
        type: 'base64',
        media_type: img.mediaType,
        data: img.data,
      },
    }))

    const prompt = `너는 지금 친한 남사친 역할이야. 여자 친구가 소개팅 프로필 사진 ${count}장을 보내면서 어떤 게 제일 나은지 물어봤어.

솔직하게, 근데 상처주지 않게 피드백해줘. 너무 착한 척하지 말고 진짜 남자 입장에서 봐줘.
사진 번호 순서에 절대 영향받지 말고, 오직 사진 품질만으로 판단해줘. 1번 사진도 동등하게 평가해.
각 사진에 대해 아래 JSON 형식으로만 답해줘. 다른 말 없이 JSON만:

{
  "summary": "전체적인 한마디 총평 (2-3문장, 친구한테 말하듯이 편하게)",
  "photos": [
    {
      "num": 1,
      "score": 8.5,
      "comment": "솔직한 코멘트 2-3문장",
      "good": ["좋은 점1", "좋은 점2"],
      "bad": ["아쉬운 점1"],
      "isBest": false
    }
  ],
  "bestNum": 2,
  "bestReason": "이 사진이 베스트인 이유 한 문장"
}

사진 번호는 1부터 ${count}까지. isBest는 베스트 사진만 true.

score는 아래 기준으로 채점해 (합산 10점). 각 항목마다 점수별 기준을 참고해서 최대한 일관되게 판단해:

**표정/눈빛 자연스러움 (0-3점)**
- 3점: 눈웃음/미소가 자연스럽고 카메라를 의식하지 않은 듯한 편안한 표정
- 2점: 무난한 미소, 약간 어색하지만 거슬리지 않음
- 1점: 뻣뻣하거나 억지스러운 표정, 무표정
- 0점: 눈 감김, 찡그림 등 명백히 좋지 않은 표정

**전체적인 인상/분위기 (0-3점)**
- 3점: 호감형 인상, 분위기가 매력적으로 느껴짐
- 2점: 평범하고 무난한 인상
- 1점: 다소 어색하거나 애매한 인상
- 0점: 부정적인 인상을 주는 요소가 뚜렷함

**배경/구도/조명 (0-2점)**
- 2점: 배경 깔끔하거나 분위기 있음, 조명 좋음, 구도 안정적
- 1점: 배경이 산만하거나 조명이 애매함
- 0점: 배경/조명이 인물을 가리거나 사진 품질을 떨어뜨림

**옷차림/스타일 (0-2점)**
- 2점: 단정하고 본인한테 잘 어울리는 스타일
- 1점: 무난하지만 특별히 돋보이지 않음
- 0점: TPO에 안 맞거나 스타일이 사진 인상을 깎아먹음

각 사진을 위 기준으로 독립적으로, 냉정하게 채점해. 애매하면 더 낮은 쪽 점수를 선택해. 같은 사진 세트를 다시 평가해도 항목별 점수가 이 기준표에서 크게 벗어나지 않아야 해.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1500,
        temperature: 0,
        messages: [
          {
            role: 'user',
            content: [...imageBlocks, { type: 'text', text: prompt }],
          },
        ],
      }),
    })

    const data = await response.json()
    if (data.error) throw new Error(data.error.message)

    const text = data.content.map((b) => b.text || '').join('')
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)

    return Response.json(parsed, { headers: corsHeaders })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders })
  }
}
