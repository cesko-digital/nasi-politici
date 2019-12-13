import React from 'react'
import styles from './about.module.scss'

function AboutUs() {
  return (
    <div>
      <div className={styles.about}>
        <h1 className={styles.title}>O Projektu</h1>
        <div>Analyzujeme korupci a snažíme se proti ní aktivně bojovat. Podívejte se na kauzy, které sledujeme, nebo na projekty a publikace, které připravujeme.</div>
        <h2 className={styles.subTitle}>Jaká témata řešíme?</h2>
        <div>
          Zabýváme se korupcí ve všech jejích podobách a úrovních – od lokálních problémů až po ty s celonárodním dopadem.
          V naší práci nám můžete pomoct a korupci oznámit. Pokud máme dostatek podkladů, nemlčíme a jednáme.<br /><br />
          Děláme svoji práci, protože nám není jedno, jak česká společnost vypadá a funguje.
          Pokud vám to taky není jedno, ale nemáte zrovna čas vést vyšetřování, přispějte nám. Budeme bojovat i za vás.
        </div>
      </div>
    </div>
  )
}

export default AboutUs;
