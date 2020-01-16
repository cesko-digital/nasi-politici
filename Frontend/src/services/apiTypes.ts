
interface Role {
	role: string,
	dateFrom: string,
	dateTo: string | null,
	organisation: string,
}

interface Insolvency {
	"debtorCount": number,
	"debtorLink": string,
	"creditorCount": number,
	"creditorLink": string,
	"bailiffCount": number,
	"bailiffLink": string,
}

interface Sponsor {
	"party": string,
	"donatedAmount": number,
	"year": number,
	"source": string | null,
}

export interface Detail {
	"id": string,
	"namePrefix": string,
	"nameSuffix": string,
	"name": string,
	"surname": string,
	"birthDate": string,
	"deathDate": string|null,
	"status": string,
	"photo": string,
	"description": string,
	"companyConnection": string,
	"roles": Role[],
	"insolvencyPerson": Insolvency,
	"insolvencyCompany": Insolvency,
	"source": string,
	"sponsor": Sponsor[],
	"currentParty": string,
}

interface SearchResult {

}

interface Speaker {
	id: string;
	firstName: string;
	lastName: string;
	stats: {
		misleading: number;
		true: number;
		untrue: number;
		unverifiable: number;
	}
}

export interface DemagogResponse {
	data: {
		speakers: Speaker[]
	}
}

interface Article {
	id: number;
	perex: string;
	published: string;
	shares: number;
	source: string;
	text: string;
	title: string;
	url: string;
}

export interface ArticleResponse {
	articles: Article[]
	topic_map: {[key: string]: number[]}
}


export interface API {
	search: (query: string) => SearchResult | Promise<SearchResult>
	fetchDetail: (id: string) => Detail | Promise<Detail>
	fetchDemagog: (id: string) => DemagogResponse | Promise<DemagogResponse>
	fetchNews: (fullName: string, party: string, searchQuery: string) => ArticleResponse | Promise<ArticleResponse>
}
