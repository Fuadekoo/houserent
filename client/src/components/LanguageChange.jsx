import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageChange = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav>
      <select onChange={changeLanguage} defaultValue={i18n.language}>
        <option value="en">English</option>
        <option value="am">Amharic</option>
      </select>
    </nav>
  );
};

export default LanguageChange;
