import React, { Fragment } from "react"
import { Link } from "gatsby"

const codeToLanguage = (() => {
  const dict = {
    en: "English",
    ko: "한국어",
  }
  return langKey => dict[langKey] || langKey
})()

function Translations(props) {
  const { langKey, translations, slug, editOnGithub, filePath } = props
  // return <pre>{JSON.stringify(props, null, 2)}</pre>
  // const { translations, lang, languageLink, editUrl } = props;
  // const editUrl = "http://naver.com"

  const editUrl = editOnGithub && filePath && `${editOnGithub}${filePath}`

  if (translations && translations.length > 1) {
    const { origin } = (translations && translations[0]) || {}
    return (
      <p
        style={{
          fontSize: "1em",
          border: "1px solid var(--hr)",
          borderRadius: "0.3em",
          padding: "0.75em",
          // background: "var(--translation-bg)",
          background: "yellow",
          wordBreak: "keep-all",
        }}
      >
        <span>Translated by readers into: </span>
        {(translations || []).map(({ langKey: langKey_, slug }, i) => (
          <Fragment key={langKey_}>
            {langKey_ === langKey ? (
              <b>{codeToLanguage(langKey_)}</b>
            ) : (
              <Link to={slug}>{codeToLanguage(langKey_)}</Link>
            )}
            {i === translations.length - 1 ? "" : " • "}
          </Fragment>
        ))}
        {slug !== origin && (
          <>
            <br />
            <Link to={origin}>Read the original</Link>
            {" • "}
            {editUrl && (
              <>
                <a href={editUrl} target="_blank" rel="noopener noreferrer">
                  Improve this translation
                </a>
                {" • "}
              </>
            )}
            <Link to={`/${langKey}`}>View all translated posts</Link>{" "}
          </>
        )}
      </p>
    )
  }
  return null
}

export default Translations
