import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import { Styled, css } from 'theme-ui';

const codeToLanguage = (() => {
  const dict = {
    en: 'English',
    ko: '한국어',
    ja: '日本語',
  };
  return (langKey) => dict[langKey] || langKey;
})();

function Translations({ langKey, langKeyDefault, translations: _translations, slug, editUrl }) {
  const translations = _translations.filter((e) => e.langKey !== langKeyDefault);

  if (translations && translations.length > 0) {
    const { origin } = (translations && translations[0]) || {};
    return (
      <Styled.p
        css={css({
          p: '0.75em',
          border: '1px solid',
          borderRadius: '0.3em',
          borderColor: 'muted',
          bg: 'box',
        })}
      >
        <span>Translated by readers into: </span>
        {(translations || []).map(({ langKey: langKey_, slug }, i) => (
          <Fragment key={langKey_}>
            {langKey_ === langKey ? (
              <span>{codeToLanguage(langKey_)}</span>
            ) : (
              <Link to={slug}>{codeToLanguage(langKey_)}</Link>
            )}
            {i === translations.length - 1 ? '' : ' • '}
          </Fragment>
        ))}
        {slug !== origin && (
          <>
            <br />
            <Link to={origin}>Read the original</Link>
            {' • '}
            {editUrl && (
              <>
                <a href={editUrl} target="_blank" rel="noopener noreferrer">
                  Improve this translation
                </a>
                {' • '}
              </>
            )}
            <Link to={`/${langKey}`}>View all translated posts</Link>{' '}
          </>
        )}
      </Styled.p>
    );
  }
  return null;
}

export default Translations;
