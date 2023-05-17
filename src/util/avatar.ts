import md5 from 'blueimp-md5'
import { getUser } from './api'

export function getAvatar(avatar) {
  if (/^[0-9]+$/.test(avatar)) {
    return `https://q1.qlogo.cn/g?b=qq&nk=${avatar}&s=640`
  } else {
    let hash = md5(avatar)
    return `https://cdn.sep.cc/avatar/${hash}?s=100&d=retro`
  }
}

export function getSuo(content) {
  if (!content) return ""
  let m = content.match(/suo(.+?)\)/i)
  return m ? m[1].slice(2) : 'https://cdn-us.imgs.moe/2023/02/27/63fcb180cbb30.jpg'
}

export function getBio(content) {
  console.log(content)
  if (!content) return "没有填写简介哦"
  let m = content.match(/(\`{3}[\w|\W]+\`{3})/ig)
  console.log(m)
  return m ? m[0].replace(/\`{3}/g,'`') : '木有填写简介哦'
}

export function getAv(id) {
  return id.substring(2, id.length)
}

export function isMobile() {
  try {
    document.createEvent("TouchEvent"); return true;
  } catch (e) {
    return false;
  }
}

export default function shouldVIP(time) {
  let tt = new Date(time)
  let ttt = tt.getTime()

  return ttt >= Date.now()
}
