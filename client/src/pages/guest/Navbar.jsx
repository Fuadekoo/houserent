import React from 'react'
import LanguageChange from '../../components/LanguageChange'
import { useTranslation } from 'react-i18next'

function Navbar() {
  const { t } = useTranslation();
  return (
    <div>
      <LanguageChange />
      <h1>{t('welcome')}</h1>
    </div>
  )
}

export default Navbar
