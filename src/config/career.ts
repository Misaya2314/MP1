// career
export type CareerItemType = {
    company: string
    title: string
    image?: string
    logo: string
    start: string
    end: string
  }
  
export const careerList: Array<CareerItemType> = [
    {
      company: 'PoPoCo Studio',
      title: 'studio',
      logo: 'coffee',
      start: '2024',
      end: 'Present'
    },
  ]