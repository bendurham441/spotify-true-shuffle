import * as React from 'react'
import styled from 'styled-components'

import {
  ContentContainer,
  ContainerHeader,
  MainHeading,
  ContainerContent,
  SubTitle,
  CallToActionButton,
} from '../StyleElements'

const Landing = () => (
  <ContentContainer>
    <ContainerHeader>
      <MainHeading>True Shuffle</MainHeading>
    </ContainerHeader>
    <ContainerContent>
      <SubTitle>Want to shuffle through your tracks randomly?</SubTitle>
      <p>
        I always seemed to notice that Spotify's shuffle wasn't random and it
        bothered me. Stop listening to the same songs over and over again now.
      </p>
    </ContainerContent>
    <CallToActionButton>Start Shuffling Now</CallToActionButton>
  </ContentContainer>
)

export default Landing
