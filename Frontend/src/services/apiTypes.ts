interface Role {
  role: string
  dateFrom: string
  dateTo: string | null
  organisation: string
}

interface Insolvency {
  debtorCount: number
  debtorLink: string
  creditorCount: number
  creditorLink: string
  bailiffCount: number
  bailiffLink: string
}

interface Sponsor {
  party: string
  donatedAmount: number
  year: number
  source: string | null
}

export enum ContactService {
  Facebook = 'Facebook',
  FacebookPage = 'Facebook_page',
  FacebookProfile = 'Facebook_profile',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
  WWW = 'WWW',
}

export type Contact = {
  Contact: string
  Network: ContactService
  NetworkText: string
}

export interface Connection {
  company: string
  ico: string
  since: string
  until: string | null
  description: string
}

export interface Detail {
  birthDate: string
  contacts: Contact[]
  connections: Connection[]
  companyConnection: string
  currentParty: string
  deathDate: string | null
  description: string
  hasPhoto: boolean
  id: string
  insolvencyCompany: Insolvency
  insolvencyPerson: Insolvency
  lastManualUpdate: string
  lastUpdate: string
  name: string
  namePrefix: string
  nameSuffix: string
  notificationRegisterId: string
  notificationRegisterStatements: []
  photo: string
  roles: Role[]
  source: string
  sourceInsolvency: string
  sourceSponzor: string
  sourceRegisterStatements: string
  sourceRoles: string
  sponsor: Sponsor[]
  status: string
  surname: string
  wikiId: string
}

export interface SearchResult {
  NameId: string
  ShortName: string
  FullName: string
  BirthYear: number
  DeathYear: number | null
  PoliticalFunctions: string[]
  PoliticalParty: string | null
  StatusText: string
  Status: number
  PhotoUrl: string | null
}

interface Speaker {
  id: string
  firstName: string
  lastName: string
  stats: {
    misleading: number
    true: number
    untrue: number
    unverifiable: number
  }
}

export interface DemagogResponse {
  data: {
    speakers: Speaker[]
  }
}

interface Article {
  id: number
  perex: string
  published: string
  shares: number
  source: string
  text: string
  title: string
  url: string
}

export interface ArticleResponse {
  articles: Article[]
  topic_map: { [key: string]: number[] }
}

export interface API {
  search: (query: string) => SearchResult[] | Promise<SearchResult[]>
  fetchProfileCount: () => number | Promise<number>
  fetchDetail: (id: string) => Detail | Promise<Detail>
  fetchDemagog: (id: string, wikiId: string) => DemagogResponse | Promise<DemagogResponse>
  fetchNews: (fullName: string, party: string, searchQuery: string) => ArticleResponse | Promise<ArticleResponse>
  sendEmail: (subject: string, text: string) => void
}
