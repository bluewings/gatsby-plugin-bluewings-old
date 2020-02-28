// https: //github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog-core/src/templates/posts-query.js
import {
  graphql
} from 'gatsby';
import PostsPage from 'gatsby-theme-blog-core/src/components/posts';

export default PostsPage;

export const query = graphql `
  query Bluewings_PostsQuery($langKey: String!) {
    site {
      siteMetadata {
        title
        social {
          name
          url
        }
        langKeyDefault
      }
    }
    allBlogPost: allMdxBlogPost(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [date, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          excerpt
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          tags
        }
      }
    }
  }
`;