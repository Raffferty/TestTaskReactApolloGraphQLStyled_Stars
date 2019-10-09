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

const Users = props => {
  const { loading, error, data } = useQuery(
    USERS,
    {
      variables: {
        query: props.query,
        first: props.numberOfUsers,
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
    return data.search.nodes.map(user => {
      const userReposStarsArr = user.repositories.nodes.map(repo => repo.stargazers.totalCount)
      const userReposStarsCount = userReposStarsArr.reduce(
        (accStars, curStars) => accStars + curStars,
        0
      )

      return (
        <User
          key={user.id}
          login={user.login}
          name={user.name}
          bio={user.bio}
          location={user.location}
          email={user.email}
          html_url={user.url}
          avatar_url={user.avatarUrl}
          stars={userReposStarsCount}
        />
      )
    })
  }

  return <NoUsers>No Users in such query</NoUsers>
}

export default Users
