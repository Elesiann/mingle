import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import ContactInfo from "../components/layouts/ContactInfo";
import Map from "../components/Map";
import { Button, Input, Textarea } from "@chakra-ui/react";

interface FormData {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

const FindUs: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    document.title = "Sobre | Mingle";
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <h1>Encontre-nos</h1>
      <Content>
        <LeftColumn>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <label>Seu nome</label>
            <Input variant="outline" {...register("nome")} />

            <label>Seu email</label>
            <Input variant="outline" {...register("email")} />

            <label>Assunto</label>
            <Input variant="outline" {...register("assunto")} />

            <label>Mensagem</label>
            <Textarea colorScheme="green" {...register("mensagem")} />

            <Button colorScheme="green" type="submit">
              Enviar
            </Button>
          </Form>
        </LeftColumn>

        <MiddleColumn>
          <ContactInfo />
        </MiddleColumn>

        <RightColumn>
          <Map />
        </RightColumn>
      </Content>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 15vh;

  h1 {
    text-align: center;
    margin-bottom: 4rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--gray);
    margin-inline: 10vw;
  }

  @media screen and (max-width: 768px) {
    padding-top: 20vh;

    h1 {
      margin-inline: 0;
      margin-bottom: 1rem;
    }
  }
`;
const Content = styled.div`
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;

  width: 100%;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
`;

const LeftColumn = styled.div`
  width: 300px;

  button {
    margin-top: 2rem;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 2rem;
  }
`;

const MiddleColumn = styled.div`
  width: 300px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 2rem;
  }
`;

const RightColumn = styled.div`
  justify-self: center;
  width: 400px;
  height: 500px;

  @media screen and (max-width: 1280px) {
    width: 100%;
    padding: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input,
  textarea {
    border-color: var(--gray);
  }
`;

export default FindUs;
