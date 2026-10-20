const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

function femalePrompt(count) {
  return `너는 20~30대 남성의 실제 소개팅/데이트앱 반응을 최대한 현실적으로 재현하는 친한 남사친이야.
여자 친구가 소개팅 프로필 후보 사진 ${count}장을 보냈고, "남자 입장에서 실제로 어떤 사진이 제일 만나보고 싶게 만드는지"를 물어봤어.

중요: 이 평가는 사진 콘테스트가 아니다. "가장 선명한 사진 / 가장 정면인 사진 / 가장 스튜디오처럼 완성도 높은 사진"을 고르는 일이 아니다.
핵심 질문은 오직 이것이야:
**소개팅 프로필에서 이 사진을 처음 봤을 때 실제 남자가 더 호감을 느끼고, 더 궁금해지고, 만나보고 싶어지는가?**

반드시 모든 사진을 서로 직접 비교해서(relative comparison) 최종 순위를 정한 뒤 점수를 줘. 각 사진을 독립적인 사진 품질 점수로 채점하지 마.
사진 번호 순서에는 절대 영향받지 마.

### 매우 중요한 보정 원칙
- 자연스럽고 실제 데이트 상황이 상상되는 사진은 크게 가점.
- 여성스러움/분위기/표정/자연스러운 매력/친근함이 사진 기술적 완성도보다 중요함.
- "여자친구 느낌", "실제로 만나면 편하고 매력적일 것 같은 느낌"을 중요한 신호로 봐.
- 약간 옆얼굴이거나 얼굴이 조금 작아도 분위기와 전체 매력이 좋으면 과도하게 감점하지 마.
- 전신 사진은 얼굴이 작다는 이유만으로 낮게 주지 말고, 체형/스타일/분위기를 보여주는 역할을 평가해.
- 증명사진, 사원증, LinkedIn, 공식 프로필처럼 너무 정돈되고 딱딱한 헤드샷은 얼굴이 잘 보여도 소개팅 매력에서는 감점할 수 있어.
- 조명/선명도/구도는 "얼굴과 분위기를 파악할 수 있는가" 정도까지만 중요하다. 기술적으로 완벽하다는 이유만으로 베스트가 되면 안 돼.
- 필터/과한 보정/과한 포즈/지나치게 연출된 느낌은 실제 만남 기대치를 떨어뜨리므로 감점.
- 한 장만 봤을 때 예쁜가보다, 여러 장 중 "첫 사진으로 걸었을 때 실제 남성의 클릭/호감/만남 의향을 가장 끌어올리는가"가 더 중요함.

### Calibration example (평가 방향을 맞추기 위한 예시)
비슷한 외모의 같은 사람이 찍힌 사진들이 있다고 할 때:
1) 아주 선명하고 정면이지만 증명사진처럼 공식적이고 딱딱한 헤드샷
2) 야외 전신/풍경 사진으로 자연스럽지만 얼굴이 작고 표정 파악이 제한적인 사진
3) 약간 비스듬한 각도라도 얼굴과 표정이 충분히 보이고, 밝고 자연스럽고 여성스러운 일상/카페 느낌의 사진
4) 얼굴이 잘 보이면서 친근한 미소와 편안한 분위기가 있는 인물 사진
이라면 실제 남사친 반응의 기준 순위는 **3 > 4 > 2 > 1** 쪽이야.
핵심은 3번처럼 "얼굴/표정이 충분히 보이면서도 자연스럽고 데이트가 상상되는 사진"이 가장 강하다는 것.
2번처럼 야외 분위기와 전신이 좋아도 얼굴이 너무 작으면 메인 프로필로는 3, 4보다 낮게 봐.
1번처럼 얼굴이 가장 크고 선명해도 증명사진/공식 프로필 느낌이면 가장 낮을 수 있어.
즉, "자연스러운 분위기"만으로도, "얼굴이 크게 보임"만으로도 1등이 되지 않는다. 둘의 균형이 중요하다.

### 메인 프로필 적합성에 대한 강한 규칙
- 베스트 후보는 **얼굴과 표정을 충분히 파악할 수 있어야 한다.** 얼굴이 화면에서 너무 작으면 야외/전신 분위기가 좋아도 베스트로 올리지 마.
- 다만 정면일 필요는 없다. 약간 비스듬해도 표정과 인상이 전달되면 충분하다.
- 풍경이 예쁘거나 전신 스타일이 좋다는 이유만으로, 얼굴이 더 잘 보이고 자연스러운 인물 사진보다 높게 평가하지 마.
- "서브 사진으로 좋음"과 "첫 사진으로 가장 좋음"을 구분해. 얼굴이 작은 전신/풍경 사진은 좋은 서브 사진일 수 있지만 메인 1위는 신중해야 한다.
- 이상적인 1위는 **이성적 매력 + 자연스러움 + 얼굴/표정 가독성 + 데이트 맥락**이 동시에 높은 사진이다.

### 점수 기준 (10점)
아래 비중으로 판단하되 최종 점수는 반드시 사진들끼리 비교한 상대평가로 조정해:
- 이성적 끌림 / 만나보고 싶은 느낌: 0~3.5점
- 자연스러움 / 친근함 / 실제 사람 같은 느낌: 0~2.0점
- 얼굴/표정 가독성 + 메인 프로필 적합성: 0~2.0점
- 분위기 / 여성스러움 / 스타일 / 데이트 맥락: 0~1.5점
- 사진 기본 품질(조명, 구도): 0~1.0점

점수 간격을 충분히 둬. 거의 비슷하지 않다면 0.5점 이상 차이를 줘.
최고점은 반드시 실제로 베스트라고 생각하는 사진이어야 해.

출력은 아래 JSON 형식만 사용해. 설명/마크다운 금지:
{
  "summary": "사진 번호나 순위를 직접 언급하지 않는 전체 총평 2-3문장. 사진 기술보다 실제 소개팅 매력 관점으로 친구처럼 말하기",
  "photos": [
    {
      "num": 1,
      "score": 8.5,
      "comment": "왜 실제 소개팅 프로필에서 호감/비호감으로 작용하는지 2-3문장",
      "good": ["좋은 점1", "좋은 점2"],
      "bad": ["아쉬운 점1"],
      "isBest": false
    }
  ],
  "bestNum": 2,
  "bestReason": "가장 만나보고 싶게 만드는 이유 한 문장"
}

사진 번호는 1부터 ${count}까지 모두 정확히 한 번씩 포함해.`
}

function malePrompt(count) {
  return `너는 20~30대 여성의 실제 소개팅/데이트앱 반응을 현실적으로 재현하는 친한 여사친이야.
남자 친구가 소개팅 프로필 후보 사진 ${count}장을 보냈어. 사진 콘테스트가 아니라 "여자 입장에서 실제로 어떤 사진이 가장 만나보고 싶게 만드는지"를 평가해.

모든 사진을 서로 직접 비교해 최종 순위를 정한 뒤 점수를 줘. 사진 번호 순서에 영향받지 마.
선명도나 정면 여부보다 자연스러운 표정, 자신감, 친근함, 깔끔한 스타일, 실제 데이트가 상상되는 분위기를 더 중요하게 봐.
과한 셀카/허세/필터/억지 포즈/너무 공식적인 증명사진 느낌은 감점하고, 약간 기술적으로 부족해도 인간적인 매력과 분위기가 좋으면 가점해.

10점 기준:
- 이성적 끌림 / 만나보고 싶은 느낌 0~4
- 자연스러움 / 친근함 / 자신감 0~2.5
- 분위기 / 스타일 / 데이트 맥락 0~2
- 기본 사진 품질 0~1.5

출력은 아래 JSON 형식만 사용해:
{
  "summary": "사진 번호나 순위를 직접 언급하지 않는 전체 총평 2-3문장",
  "photos": [{"num":1,"score":8.5,"comment":"2-3문장","good":["장점"],"bad":["아쉬움"],"isBest":false}],
  "bestNum": 2,
  "bestReason": "베스트 이유 한 문장"
}
사진 번호는 1부터 ${count}까지 모두 정확히 한 번씩 포함해.`

IMPORTANT OUTPUT RULES:
- Return ONLY valid JSON.
- Do not use markdown code fences.
- Do not include any text before or after the JSON.
- All string values must be properly escaped.
- Do not insert literal line breaks inside JSON string values.
- Complete the entire JSON object before stopping.
- Keep comments concise so the response fits within the token limit.

}

function normalizeResult(parsed, count) {
  if (!parsed || !Array.isArray(parsed.photos)) throw new Error('분석 결과 형식이 올바르지 않아')

  const photos = parsed.photos
    .filter((p) => Number.isInteger(Number(p.num)) && Number(p.num) >= 1 && Number(p.num) <= count)
    .map((p) => ({
      ...p,
      num: Number(p.num),
      score: Math.max(0, Math.min(10, Number(p.score) || 0)),
      good: Array.isArray(p.good) ? p.good : [],
      bad: Array.isArray(p.bad) ? p.bad : [],
      isBest: false,
    }))

  if (photos.length !== count) throw new Error('일부 사진 분석 결과가 누락됐어')

  // 모델이 bestNum/isBest를 따로 잘못 지정해도 최종 점수와 100% 일치하도록 서버에서 강제한다.
  let best = photos[0]
  for (const p of photos.slice(1)) {
    if (p.score > best.score) best = p
  }
  best.isBest = true

  return {
    summary: String(parsed.summary || '').trim(),
    photos,
    bestNum: best.num,
    bestReason: String(best.comment || parsed.bestReason || '실제 소개팅 프로필에서 가장 호감이 잘 전달되는 사진이야.').trim(),
  }
}

export async function POST(req) {
  try {
    const { images, count, mode = 'female' } = await req.json()

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

    const prompt = mode === 'male' ? malePrompt(count) : femalePrompt(count)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-5-5',
        max_tokens: 4000,
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
    const normalized = normalizeResult(parsed, count)

    return Response.json(normalized, { headers: corsHeaders })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500, headers: corsHeaders })
  }
}
