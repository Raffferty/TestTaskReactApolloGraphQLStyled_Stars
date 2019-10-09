import React from 'react'
import styled from 'styled-components'
import loc_pin from '../../assets/location-pin.svg'
import mail_pin from '../../assets/mail-pin.svg'
import star_pin from '../../assets/star.svg'

const StyledUser = styled.div`
  width: 80%;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  margin: 10px auto;
  box-sizing: border-box;
  display: -webkit-box;
  -webkit-box-orient: horizontal;
  padding: 15px 0px;
`

const IMG = styled.img`
  height: ${props => props.height};
  width: ${props => props.width};
  margin: ${props => props.margin};
`

const Wrapper = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-flex: 1;
`

const UserInfo = styled.section`
  display: block;
  margin: 5px;
  text-align: start;
  -webkit-box-flex: 1;
  font-size: 22px;
`

const Link = styled.a`
  font-size: 22px;
  text-decoration: none;
`

const Footer = styled.footer`
  color: #737373;
  margin: 5px;
  font-size: 16px;
  text-align: left;
`

const UserName = styled.span``

const UserBIO = styled.p`
  font-size: 18px;
`

const User = props => {
  const Usermail = props.email ? props.email : 'No public email'

  return (
    <StyledUser>
      <IMG src={props.avatar_url} alt="avatar" height="80px" width="80px" margin="5px" />
      <Wrapper>
        <UserInfo>
          <Link href={props.html_url} target="_blank" rel="noopener noreferrer">
            {props.login}
          </Link>
          <UserName>&ensp;{props.name}</UserName>
          <UserBIO>{props.bio}</UserBIO>
        </UserInfo>
        <Footer>
          <IMG src={loc_pin} alt="location" height="20px" width="20px" margin="0px" />
          {props.location} &ensp;
          <IMG src={mail_pin} alt="mail" height="20px" width="20px" margin="0px" />
          &nbsp;
          {Usermail}
          &ensp;
          <IMG src={star_pin} alt="star" height="20px" width="20px" margin="0px" />
          &nbsp;
          {props.stars}
        </Footer>
      </Wrapper>
    </StyledUser>
  )
}

export default User
