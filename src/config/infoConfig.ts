export * from './projects'
export * from './education'
export * from './career'

// personal info
export const name = 'Misaya2314'
export const headline ='何も言わないままは嘘だ'
export const introduction =
  ""
export const email = '1301503758@qq.com'
export const githubUsername = 'Misaya2314'

// about page
export const aboutMeHeadline = '关于我'
export const aboutParagraphs = [
 "待定"
]

// blog
export const blogHeadLine = "活动日志"
export const blogIntro =
  "只是记录一些日常"

// social links
export type SocialLinkType = {
  name: string
  ariaLabel?: string
  icon: string
  href: string
}

export const socialLinks: Array<SocialLinkType> = [
  {
    name: 'Bilibili',
    icon: 'bilibili',
    href: 'https://space.bilibili.com/34572362',
  },
]

// https://simpleicons.org/
export const techIcons = [
  'typescript',
  'javascript',
  'supabase',
  'cloudflare',
  'java',
  'oracle',
  'mysql',
  'react',
  'nodedotjs',
  'nextdotjs',
  'prisma',
  'postgresql',
  'nginx',
  'vercel',
  'docker',
  'git',
  'github',
  'visualstudiocode',
  'androidstudio',
  'ios',
  'apple',
  'wechat',
]
