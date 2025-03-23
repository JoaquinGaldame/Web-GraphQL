import { gql } from "apollo-angular";

export const GetDataQUERY = gql`
{
  episodes{
    results{
      name
      episode
    }
  }
  characters{
    results {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      image
    }
  }
}`;