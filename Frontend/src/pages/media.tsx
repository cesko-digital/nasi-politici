import React from 'react'
import styles from '../pages/about/about.module.scss'

const Media: React.FC = () => {
  return (
    <div>
      <div className={styles.about}>
        <h1 className={styles.title}>O Projektu</h1>
        <div>
          Otevřená databáze Naši politici (NP) je živoucím organismem plným dat a informací. Hlavním cílem je přinášet
          občanům a široké veřejnosti unikátní a nezávislý přehled dat z otevřených zdrojů a z původních životopisů
          politiků online a na jednom místě. NP jsou rozcestníkem pro všechny, kdo hledají zdrojové informace.
          <br />
          <br />
          Spojujeme pro vás nenahraditelné informace odkazující na nejnovější data a na kauzy, které již překryl nános
          času, i ty, které aktuálně rezonujíve veřejném prostoru.
          <br />
          <br />
          Spojující filozofií NP je otevřenost a nezávislost. Ne jen prosazovaná otevřenost ohledně politiků, která je
          nosnou myšlenkou celého projektu, ale také otevřenost celé databáze. Naši politici jsou tzv. “open source”
          (otevřený zdroj) sestavený na základě nezávislých dat. Pokud máte dojem, že víte o zdroji informací, který by
          byl relevantní, doplnění jsou samozřejmě vítána.
          <br />
          <br />
          NP vznikli jako projekt sdružení Naši politici, o.s. v roce 2008. Po deset let se plnila unikátní databáze.
          Poté, co Naši politici, o.s. ukončili svou činnost v roce 2018, předali všechna data do rukou protikorupční
          nevládní organizace Transparency International (TI), aby dlouhé roky práce nepřišly nazmar.
          <br />
          <br />
          Proto TI s vizí vytvoření funkční a aktualizované databáze spojila síly s IT profesionály na otevřené zdroje z
          Hlídač státu a komunitou špičkových vývojářů, designérů a produkťáků z Česko.Digital. Díky této jedinečné
          spolupráci jsme reinkarnovali projekt NP.
          <br />
          <br />
        </div>
      </div>
    </div>
  )
}

export default Media
