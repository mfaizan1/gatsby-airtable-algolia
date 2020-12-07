const query = `
  {
    allAirtable(
      filter: { table: { eq: "projects" } }
    ) {
      nodes {
        table
        data {
          date
          name
          type
          image {
            localFiles {
              childImageSharp {
                fluid {
                  src
                  aspectRatio
                  base64
                  sizes
                  srcSet
                }
              }
            }
          }
        }
        id
      }
    }
  }`
const pageToAlgolia = ({ id, data: { name, type, date, image } }) => {
  return {
    objectID: id,
    name,
    type,
    date,
    image: { ...image.localFiles[0].childImageSharp.fluid },
  }
}
const queries = [
  {
    query,
    transformer: ({ data }) => data.allAirtable.nodes.map(pageToAlgolia),
  },
]

module.exports = queries
