module.exports = `
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'common/src/theme/appclassic';
import { ResetCSS } from 'common/src/assets/css/style';
import Fade from 'react-reveal/Fade';

import Sticky from 'react-stickynode';
import Navbar from '../containers/AppClassic/Navbar';
import Heading from 'common/src/components/Heading';
import Text from 'common/src/components/Text';
import Image from 'common/src/components/Image';

import JoinTrail from '../containers/AppClassic/JoinTrail';
import Footer from '../containers/AppClassic/Footer';
import Customer from '../containers/AppClassic/Customer';

import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Icon } from 'react-icons-kit';
import { checkmarkCircled } from 'react-icons-kit/ionicons/checkmarkCircled';
import {
  PricingArea,
  InnerWrapper,
  PricingCard,
} from '../containers/AppClassic/PricingPolicy/pricingPolicy.style'

import GlobalStyle, {
  AppWrapper,
  ContentWrapper,
} from '../containers/AppClassic/appClassic.style';
import BannerWrapper, { BannerContent, BannerImage } from '../containers/AppClassic/Banner/banner.style'
import Container from 'common/src/components/UI/Container';

import SEO from '../components/seo';
import Button from 'common/src/components/Button';

import imageSrc from '../images/landings/path'


export default function () {
  return (
    <ThemeProvider theme={theme}>
      <>

        <SEO title="Titre" />
        <ResetCSS />
        <GlobalStyle />

        <AppWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-active">
            <Navbar landing />
          </Sticky>
          <ContentWrapper>

            <BannerWrapper id="home">
              <Container>
                <BannerContent>
                  <Fade up delay={100}>
                    <Heading
                      as="h1"
                      content="Titre2"
                    />
                  </Fade>
                  <Fade up delay={200}>
                    <Text content="Description" />
                  </Fade>
                  {/* <Fade up delay={300}>
                    <TelInput />
                  </Fade> */}
                </BannerContent>
                <BannerImage>
                  <Fade up delay={100}>
                    <Image style={{height: 200}} src={imageSrc} alt="altImage" />
                  </Fade>
                </BannerImage>
              </Container>
            </BannerWrapper>

            {/*  */}

            <PricingArea>
              <InnerWrapper style={{ display: 'flex', justifyContent: 'center' }}>
                <PricingCard key={'0-card--key1'}>
                  {/* <span className="tag">
                <img src={crown} alt="Crown" /> Populaire
              </span> */}
                  <div className="card-header">
                    <Heading as="h3" content={"Croco Cool"} />
                    <Text content={"La formule complète"} />
                  </div>
                  <div className="card-body">
                    <ul className="feature-list">
                      Features
                    </ul>
                  </div>
                  <div className="card-footer">
                    <strong>
                      <span>{39}€</span> /
                    mensuel
                  </strong>
                    <div className="fivepercent">et 5% des commandes frais bancaires inclus.</div>

                    <AnchorLink
                      href="#trail"
                    >
                      <Button
                        title={'Call To Action'}
                      />
                    </AnchorLink>
                  </div>
                </PricingCard>
              </InnerWrapper>
            </PricingArea>
            {/*  */}

            <div style={{ margin: 40, marginTop: 100, display: 'flex', flexDirection: "column" }}>
              <ul style={{ margin: 30 }} >
                
            </ul>
            </div>
            {/* <PricingPolicy currency={'€'}/> */}
            <Customer />
            <JoinTrail />
          </ContentWrapper>
          <Footer />
        </AppWrapper>
      </>
    </ThemeProvider>
  );
}
`