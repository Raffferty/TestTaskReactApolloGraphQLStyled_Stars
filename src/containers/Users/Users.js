import React from 'react'
import User from '../../components/User/User'
import Spinner from '../../components/UI/Spinner/Spinner'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const USERS = gql`
  query Users($query: String!, $first: Int!) {
    search(query: $query, first: $first, type: USER) {
      nodes {
        ... on User {
          id
          login
          name
          bio
          location
          email
          url
          avatarUrl

          repositories(first: 100) {
            nodes {
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`

const Error = styled.span`
  color: red;
`

const NoUsers = styled.h1`
  color: blue;
`

const Users = ({query, numberOfUsers}) => {
  const { loading, error, data } = useQuery(
    USERS,
    {
      variables: {
        query: query,
        first: numberOfUsers,
      },
    },
    {
      errorPolicy: 'none',
    }
  )

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <h1>
        Error: <Error>{error.message}</Error>
      </h1>
    )
  }

  if (data) {
    return data.search.nodes.map(({id, repositories, ...rest}) => {

      const userReposStarsArr = repositories.nodes.map(({stargazers}) => stargazers.totalCount)

      const userReposStarsCount = userReposStarsArr.reduce(
        (accStars, curStars) => accStars + curStars,
        0
      )

      return (
        <User
          key={id}
          stars={userReposStarsCount}
          {...rest}
        />
      )
    })
  }

  return <NoUsers>No Users in such query</NoUsers>
}

export default Users
