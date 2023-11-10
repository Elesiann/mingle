import {
  FacebookLogo,
  GoogleLogo,
  InstagramLogo,
  TwitterLogo
} from "@phosphor-icons/react";
import React from "react";
import styled from "styled-components";

const ContactInfoContainer = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 10px;
  * {
    color: var(--dark);
  }
  h2 {
    font-size: 1.5rem;
  }
`;

const FollowUs = styled.div`
  width: 200px;

  div {
    display: flex;
    justify-content: space-between;
  }
  h2 {
    font-size: 1.5rem;
    color: var(--dark);
  }
  svg {
    color: var(--dark);
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const ContactInfo: React.FC = () => {
  return (
    <ContactInfoContainer>
      <Section>
        <h2>Entre em contato</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis hic
          nulla numquam aliquid maiores expedita, iure libero maxime perferendis
          officia!
        </p>
      </Section>

      <Section>
        <h2>Nossa cafeteria</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit delectus
          animi quidem optio asperiores voluptatum.
        </p>
      </Section>

      <FollowUs>
        <h2>Siga-nos</h2>
        <div>
          <FacebookLogo />
          <TwitterLogo />
          <InstagramLogo />
          <GoogleLogo />
        </div>
      </FollowUs>
    </ContactInfoContainer>
  );
};

export default ContactInfo;
