# Přispívání do kódu

Moc děkujeme za jakoukoli pomoc a zpětnou vazbu!

## Doporučené workflow
1) z issues tady na GitHubu  nebo v [Trellu](https://trello.com/b/gJA4Y6Ml/na%C5%A1i-politici) si vybereš, které bys chtěl realizovat
3) napíšeš na Slack kanál [#p-nasi-politici](https://cesko-digital.slack.com/archives/CK0ER8UBG), že máš chuť udělat issue XY a ideálně k němu přidáš i komentář na GitHubu, aby to bylo všem ostatním jasné a nepracovalo nás na na tom zbytečně více najednou
3) forkneš si repository, připravíš úpravy u sebe v repositáři
4) založíš pull request do master větve

# Kde si říct o pomoc:
* Slack kanál [#p-nasi-politici](https://cesko-digital.slack.com/archives/CK0ER8UBG)

## Testy
Projekt aktuálně nemá vytvořené testy, ale budeme rádi když s nimi pomůžeš.

## Pravidla přispívání
- kód a commity **v angličtině**,
- všechno ostatní (pull requesty, issues, dokumentace) **v češtině**,

Jde o dobrovolnický projekt a tedy věříme, že na code review můžete i chvíli počkat i když se vynasnažíme to udělat co nejdříve.

Všechny schválené pull requesty se začlenují do větve `master` squashnutím (tedy všechny commity v PR se sloučí do jednoho commitu a ten se následně vloží do větvě s jednou commit zprávou).

## Verzování

Verzování je tvořeno tříčíselným číslem verze: `<major>.<minor>.<patch>`

Toto číslo se mění následovně:
 - major číslo se zvýší a minor a patch čísla vynulují, pokud s verzí přichází breaking change
 - minor číslo se zvýší a patch číslo vynuluje, pokud s verzí přichází nová funkcionalita
 - patch číslo se zvýší, pokud s verzí přichází drobná oprava chyby

 Více o sémantickém verzování na [semver.org](https://semver.org/lang/cs/).
