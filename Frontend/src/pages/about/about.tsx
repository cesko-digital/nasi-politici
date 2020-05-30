import * as React from 'react'
import styles from './about.module.scss'

const AboutUs: React.FC = () => {
  return (
    <div>
      <div className={styles.about}>
        <h1 className={styles.title}>O projektu</h1>
        <p className={styles.textBlock}>
          Otevřená databáze Naši politici (NP) je živoucím organismem plným dat a informací. Hlavním cílem je přinášet
          občanům a široké veřejnosti unikátní a nezávislý přehled dat z otevřených zdrojů. NP jsou rozcestníkem pro
          všechny, kdo hledají zdrojové informace.
        </p>
        <p className={styles.textBlock}>
          Spojující filozofií projektu je otevřenost a nezávislost. Nejen prosazovaná otevřenost ohledně politiků, která
          je nosnou myšlenkou celého projektu, ale také otevřenost celé databáze. NP jsou tzv. “open source” sestavený
          na základě nezávislých dat. Pokud máte dojem, že víte o zdroji informací, který by byl relevantní, nebo Vám
          nějaký zdroj informací chybí? Napište nám a rádi se na to podíváme.
        </p>
        <p className={styles.textBlock}>
          NP vznikli původně jako projekt stejnojmenného sdružení Naši politici, o.s. v roce 2008. Po deset let se
          plnila unikátní databáze ručně a s využitím otevřených zdrojů. Poté, co Naši politici, o.s. ukončili svou
          činnost v roce 2018, předali všechna data do rukou protikorupční nevládní organizace Transparency
          International (TI), aby dlouhé roky práce nepřišly nazmar.
        </p>
        <p className={styles.textBlock}>
          Proto TI s vizí vytvoření funkční a aktualizované databáze spojila síly s IT profesionály na otevřené zdroje z
          Hlídače státu a komunitou špičkových vývojářů, designérů a produkťáků z česko.digital. Díky této jedinečné
          spolupráci jsme reinkarnovali projekt, který by měl být místem, kde najdete ověřené informace o Vámi volených
          zástupcích.
        </p>
        <h1 className={styles.title}>Jak číst jednotlivé datové zdroje?</h1>
        <h2 className={styles.subTitle}>Výroky</h2>
        <p className={styles.textBlock}>
          Výroky naznačují, jak pravdivě či nepravdivě se vyjadřuje politik/politička, kterého hledáte. Jedná se o data
          organizace Demagog.cz, která ověřuje výroky politiků (tzv. factchecking) a snaží se tak kultivovat veřejnou
          debatu. Nehodnotí se politická prohlášení, hodnotící soudy a predikce dopadů nějakých opatření (např.:
          Opatření vlády XY je dobré, neboť způsobí růst zaměstnanosti.), jednoduše proto, že to není možné ověřit:
          budoucnost neznáme nikdo a u hodnotových soudů nelze nalézt jedinou „správnou“ pozici. Více o metodologii dat
          se dočtete na stránkách Demagog.cz.
        </p>
        <h2 className={styles.subTitle}>Kontakty</h2>
        <p className={styles.textBlock}>
          Chcete se s politikem/političkou spojit? Chcete si ověřit, které jsou oficiální profily? Tak jste v téhle
          škatulce správně! Najdete zde sesbírané kontakty z veřejných zdrojů, ať už z osobních stránek, stránek
          institucí, kde politik/politička působí, sociálních sítí, a dalších. Pokud víte o kontaktu, který nám unikl,
          klikněte na vlaječku a pošlete nám upozornění.
        </p>
        <h2 className={styles.subTitle}>Role</h2>
        <p className={styles.textBlock}>
          Politik/politička za svou kariéru vystřídá velkou řádku rolí. A ty nejdůležitější by měly být přímo tady.
          Kterými stranami prošel, jestli byl jen řadovým politikem nebo se dostal výš, nebo zda byl aktivním politikem
          před rokem 1989. Tyto informace sbíráme ručně, proto Vás žádáme o shovívavost, pokud nám nějaká unikne. Právě
          proto tu máme ikonku vlaječky, díky které nám případnou nepřesnost můžete nahlásit a my budeme informaci
          fact-checkovat dále.
        </p>
        <h2 className={styles.subTitle}>Sponzorství</h2>
        <p className={styles.textBlock}>
          Politika není jenom o tom, kdo sponzoruje politika/političku, ale také o tom, koho sponzoruje
          politik/politička. Zde můžete vidět, kolik komu daná osoba darovala a jaké politické subjekty finančně
          podporovala či stále podporuje.
        </p>
        <h2 className={styles.subTitle}>Insolvence</h2>
        <p className={styles.textBlock}>
          Ne všechno se vždycky daří podle představ a někdy to znamená být v červených číslech. Jenomže veřejně činná
          osoba by mohla být kvůli podobným peripetiím vydíratelná. A pokud se tato osoba nebo na ni napojené firmy
          nachází v insolvenci, mohl by mít nejenom motivaci ideovou, ale i finanční, rozhodovat se určitým způsobem. A
          to ať už přímo či nepřímo. Proto se v téhle škatulce můžete přesvědčit, jak to s ní doopravdy je.
        </p>
        <h2 className={styles.subTitle}>Centrální registr oznámení</h2>
        <p className={styles.textBlock}>
          Většina politiků a političek musí při zvolení, v průběhu funkce a při jejím ukončení vkládat své majetkové
          přiznání do oficiálního registru. Dozvíte se tak, zda je politik či politička vůbec odevzdala, kolik jich
          bylo, a co obsahují. Informací může být hodně, tak jsme se rozhodli Vám poskytnout základní přehled rovnou v
          roletce, ale detailnější informace přímo z Centrální evidence oznámení máte jen na dosah kliku.
          <br />
          Povinnost odevzdávat majetkové přiznání se vztahuje na členy Parlamentu ČR a na radní, jak na krajské, tak
          komunální úrovni. Na zastupitele se tato povinnost nevztahuje.
        </p>
        <h2 className={styles.subTitle}>Angažovanost</h2>
        <p className={styles.textBlock}>
          Ne každý máme rádi pavouky. Pro zobrazení majetkových sítí jsme proto radši zvolili časové osy. Přehledným
          způsobem Vám totiž ukazují, kam až sahá napojení politiků a političek chronologicky. Tyto osy jsou ale
          poskládané z otevřených zdrojů, tudíž nemusí ukazovat úplně všechny existující vazby, zobrazují však ty
          potvrzené.
        </p>
        <h2 className={styles.subTitle}>V médiích</h2>
        <p className={styles.textBlock}>
          Mediální obraz politika Vám může leccos napovědět. Je k tomu potřeba přistupovat kriticky, jako ke všem
          ostatním informacím, ale mít přehled, co se v poslední době o politikovi napsalo, obzvlášť před volbami, se
          vždycky hodí. V našem přehledu je zobrazená doba určena jako 90 dní, a protože například takový Jan Novák je
          jako politik složitě vyhledatelný, kombinujeme jméno politika s jeho příslušností k aktuální straně. I tak se
          může stát, že nám se do přehledu dostane článek, který o tomto politikovi nepojednává. Pokud takový článek
          uvidíte, klikněte, prosím, na vlaječku a dejte nám o něm vědět, abychom ho mohli odstranit.
        </p>
        <h1 className={styles.title}>Zpracování údajů</h1>
        <p className={styles.textBlock}>
          V databázi zveřejňujeme pouze údaje dostupné z veřejných zdrojů. Na jednom místě tak shromažďujeme informace o
          politicích a jiných veřejně činných osobách, které jsou roztroušeny po celém internetu. Databáze je zřízena
          jako bezplatná služba veřejnosti a není určena ke komerčním účelům.
        </p>
      </div>
    </div>
  )
}

export default AboutUs
