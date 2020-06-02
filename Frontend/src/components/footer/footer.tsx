import * as React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { ReactComponent as FBLogo } from 'assets/images/social-fb.svg'
import { ReactComponent as TWLogo } from 'assets/images/social-tw.svg'
import { ReactComponent as LogoNP } from 'assets/images/logo-np.svg'
import { ReactComponent as LogoCD } from 'assets/images/logo-cd.svg'
import { ReactComponent as LogoHS } from 'assets/images/logo-hs.svg'
import { ReactComponent as LogoTI } from 'assets/images/logo-ti.svg'

import styles from './footer.module.scss'

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <div className={classnames(styles.column, styles.social)}>
          <h3 className={styles.header}>Sociální sítě</h3>
          <div className={styles.socialWrapper}>
            <FBLogo />
            <a
              href="https://www.facebook.com/NasiPolitici.cz"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.socialLink}
            >
              Naši Politici
            </a>
          </div>
          <div className={styles.socialWrapper}>
            <TWLogo />
            <a
              href="https://twitter.com/nasipolitici"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.socialLink}
            >
              @nasipolitici
            </a>
          </div>
        </div>
        <div className={classnames(styles.column, styles.contacts)}>
          <h3 className={styles.header}>Kontakt</h3>
          <div className={styles.sponsor}>
            Transparency International —<br />
            Česká republika, o.p.s.
          </div>
          <br />
          <div className={styles.contact}>
            <div className={styles.address}>
              <div>
                Sokolovská 260/143
                <br />
                180 00, Praha 8<br />
                +420 224 240 895/6
                <br />
                <div className={styles.link}>posta@transparency.cz</div>
                <br />
              </div>
              <br />
              <div>
                IČ: 272 158 14
                <br />
                DIČ: CZ 272 158 14
                <br />
                Datová schránka: 8vzj3s2
                <br />
              </div>
            </div>
            <div>
              <div>
                Bankovní číslo transparentního
                <br />
                dárcovského účtu TI
                <br />
                <a href="https://ib.fio.cz/ib/transparent?a=2100385154" rel="noopener noreferrer" target="_blank">
                  2100385154/2010 (Fio banka, a.s.)
                </a>
                <br />
                <br />
                TI není plátcem DPH.
              </div>
            </div>
          </div>
        </div>
        <div className={styles.column}>
          <h3 className={styles.header}>Partneři</h3>
          <a href="https://www.transparency.cz/" rel="noopener noreferrer" target="_blank">
            <LogoTI className={classnames(styles.logoTI, styles.logo)} />
          </a>
          <div className={styles.logosBttm}>
            <a href="https://www.hlidacstatu.cz/" rel="noopener noreferrer" target="_blank">
              <LogoHS className={classnames(styles.logoHS)} />
            </a>
            <a href="https://cesko.digital/" rel="noopener noreferrer" target="_blank">
              <LogoCD className={classnames(styles.logoCD, styles.logo)} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottomWrapper}>
          <Link to="/o-projektu#" className={styles.aboutUsLink}>
            O projektu
          </Link>
          <LogoNP className={classnames(styles.logoNP, styles.logo)} />
        </div>
      </div>
    </div>
  )
}

export default Footer
