import { graphql } from 'gatsby';
import PostPage from 'gatsby-theme-blog-core/src/components/post';

export default PostPage;

export const query = graphql`
  query Bluewings_PostPageQuery($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
        social {
          name
          url
        }
      }
    }
    blogPost: mdxBlogPost(id: { eq: $id }) {
      id
      excerpt
      body
      slug
      title
      tags
      keywords
      date(formatString: "MMMM DD, YYYY")
      fields {
        langKey
        filePath
      }
      parent {
        ... on Mdx {
          frontmatter {
            max_width
          }
        }
      }
    }
    previous: mdxBlogPost(id: { eq: $previousId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
    next: mdxBlogPost(id: { eq: $nextId }) {
      id
      excerpt
      slug
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`;
