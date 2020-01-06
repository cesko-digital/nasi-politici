import collections
from ufal.morphodita import Forms, TaggedLemmas, TokenRanges, Tagger
import json

class Lemma:
    def __init__(self, lemma, tag, word):
        self.lemma = lemma
        self.tag = tag
        self.word = word

class NGramCount:
    def __init__(self, ngram, count):
        self.ngram = ngram
        self.count = count

class Helper:
    tokenizer = None
    tagger = None
    lemmas = []
    ngrams = []

    def load(self):
        self.tagger = Tagger.load("app/LM/czech-morfflex-pdt-161115.tagger")
        self.tokenizer = self.tagger.newTokenizer()

    def process(self, text):
        self.lemmas = self.create_lemmas(text)
        self.ngrams = self.create_ngrams()
        return self.ngrams

    def create_lemmas(self, text):
        _forms = Forms()
        _lemmas = TaggedLemmas()
        _tokens = TokenRanges()
        self.tokenizer.setText(text)
        lemmas = []
        while self.tokenizer.nextSentence(_forms, _tokens):
            self.tagger.tag(_forms, _lemmas)
            for i in range(len(_lemmas)):
                lemma = _lemmas[i]
                token = _tokens[i]
                form = _forms[i]
                lemmas.append(Lemma(lemma.lemma, lemma.tag, form))
        return lemmas

    def create_ngrams(self):
        lemmas = [(l.lemma, l.tag, l.word) for l in self.lemmas if l.tag.startswith("NN") or l.tag.startswith("AA") or l.tag.startswith("RR")]
        bi_grams = self.n_grams(lemmas, 2)
        tri_grams = self.n_grams(lemmas, 3)
        quad_grams = self.n_grams(lemmas, 4)
        all_grams = [*bi_grams, *tri_grams, *quad_grams]
        without_bad = self.delete_bad(all_grams).most_common(200)
        return [{"topic": c[0], "count": c[1]} for c in self.delete_shorter(without_bad).most_common(40)]


    def delete_bad(self, counts):
        results = {}
        def tag_type(item):
            return not item.ngram[0][1].startswith("RR") and not item.ngram[-1][1].startswith("AA") and not item.ngram[-1][1].startswith("RR")
        def months_mentioned(item):
            for gram in item.ngram:
                if gram[2] in ['ledna' 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince']:
                    return False
            return True
        def other(item):
            for gram in item.ngram:
                if gram[2].lower() in ['zdroj', 'autor']:
                    return False
            return True
        for item in counts:
            if tag_type(item) and months_mentioned(item) and other(item):
                results[self.get_collocation(item.ngram)] = item.count
        return collections.Counter(results)

    def delete_shorter(self, counts):
        def length(collocation):
            return len(collocation.split(' '))
        to_remove = []
        for a in counts:
            for b in counts:
                if length(a[0]) < length(b[0]) and a[0] in b[0]:
                    to_remove.append(a[0])
        return collections.Counter({c[0]: c[1] for c in counts if c[0] not in to_remove})

    def get_collocation(self, ngram):
        return ' '.join([word[2] for word in ngram])

    def n_grams(self, lemmas, n):
        ngrams = zip(*[lemmas[i:] for i in range(n)])
        counts = collections.Counter(tuple(ngrams))
        counts = collections.Counter({el: counts[el] for el in counts.elements() if counts[el] >= 2})
        return self.reduce_same(counts)


    def reduce_same(self, counts):
        map = {}
        results = []
        for gram in counts.elements():
            lemmas = ' '.join([l[0] for l in gram])
            if lemmas not in map:
                map[lemmas] = [(gram, counts[gram])]
            else:
                map[lemmas].append((gram, counts[gram]))
        for lemmas in map:
            correct = collections.Counter(map[lemmas]).most_common(1)[0][0][0]
            count = sum([count[1] for count in map[lemmas]])
            results.append(NGramCount(correct, count))
        return results






def flatten(lst):
    return [item for sublist in lst for item in sublist]

def decimal_default(obj):
    if isinstance(obj, Decimal):
        if Decimal(obj) % 1 == 0:
            return int(obj)
        elif Decimal(obj) % 1 != 0:
            return str(round(obj, 4))
    elif isinstance(obj, int):
        return int(obj)
    elif isinstance(obj, str):
        return str(obj)
    else:
        return str(obj)
    raise TypeError


def is_about_politician(name, party, text):
    found = False
    for sentence in text.split("."):
        found = name in sentence and party in sentence
        if found:
            return sentence, True
    return False



def remove_diacritic(input):
    '''
    Accept a unicode string, and return a normal string (bytes in Python 3)
    without any diacritical marks.
    '''
    return unicodedata.normalize('NFKD', input).encode('ASCII', 'ignore')