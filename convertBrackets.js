function solution(p) {
  // 1. 빈 문자열이면 빈 문자열 반환
  if (p == '') return ''

  const { u, v } = sliceUV(p)

  if (isCorrectCheck(u)) {
    // 3. u가 올바른 괄호 문자열 -> v를 1단계 재귀
    return u + solution(v)
  } else {
    // 4. u가 올바른 괄호 문자열이 아닐 때
    // 4-1,2,3
    let newV = '(' + solution(v) + ')'

    // 4-4
    let newU = u
      .split('')
      .slice(1, -1)
      .map((e) => {
        return e === '(' ? ')' : '('
      })
      .join('')

    //4-5
    return newV + newU
  }
}

// 2. 균형잡힌 문자열 분리 u, v
// 앞에서부터 괄호 짝이 맞을때까지 진행하고 짝이 맞으면 자르기
function sliceUV(p) {
  let balance = 0
  let u, v

  for (let i = 0; i < p.length; i++) {
    if (p[i] === '(') {
      balance++
    } else {
      balance--
    }

    if (balance === 0) {
      u = p.slice(0, i + 1)
      v = p.slice(i + 1)
      break
    }
  }
  return { u, v }
}

// 올바른 괄호 문자열 체크 (왼&오 반복)
function isCorrectCheck(u) {
  const k = u
  const stack = []
  for (let i = 0; i < u.length; i++) {
    if (u[i] === '(') {
      stack.push(u[i])
    } else {
      const last = stack.pop()

      if (last !== '(') return false
    }
  }
  return stack.length === 0
}
