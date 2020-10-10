import * as React from 'react'

import {
  ContentContainer,
  ContainerHeader,
  MainHeading,
  ContainerContent,
  SubTitle,
  CallToActionButton,
} from '../StyleElements'
import { getCode } from '../utils'


const Landing = (): React.FC => (
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
    <CallToActionButton onClick={() => getCode()}>Start Shuffling Now</CallToActionButton>
  </ContentContainer>
)

export default Landing
