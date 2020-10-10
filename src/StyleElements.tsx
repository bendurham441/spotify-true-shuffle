import styled from 'styled-components'

export const ContentContainer = styled.section`
  margin: auto;
  width: 40em;
  height: 40em;
  margin-top: 3em;
`

export const MainHeading = styled.h1`
  font-weight: 700;
  font-size: 3rem;
  margin: 0;
`

export const MockLogo = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 0.5rem;
  background-color: lightblue;
`

export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 1em 1em 0 0;
  padding: 2em;
  background-color: white;
`

export const ContainerContent = styled.div`
  padding: 2em;
  background-color: rgb(245, 245, 245);
  border-radius: 0 0 1em 1em;
`

export const SubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0.5em 0;
`

export const CallToActionButton = styled.button`
  padding: 1.5rem;
  background-color: hsl(220, 50%, 50%);
  border-radius: 1rem;
  border: none;
  width: 15em;
  margin: 0 auto;
  position: relative;
  display: block;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  top: -2rem;
  border: 0.2rem solid hsl(220, 50%, 50%);
  &:hover {
    background-color: white;
    border: 0.2rem solid hsl(220, 50%, 50%);
    color: hsl(220, 50%, 50%);
  }
`
