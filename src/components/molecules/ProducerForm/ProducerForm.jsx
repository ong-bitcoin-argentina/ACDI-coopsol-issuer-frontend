
import { Input, Typography } from 'antd';
import { Formik } from 'formik';
import styled from 'styled-components';
import ButtonPrimary from '../../atoms/ButtonPrimary/button-primary';
import { CoopsolBackend } from 'services/di';
import { validateDid } from 'utils/validate';

const { Text } = Typography;


const FormWrapper = styled.div`
  display: flex;  
  width: 100%;
  
`
const FormContainer = styled.div`
  flex: 1;
  padding: 0px 15px;
`
const ButtonContainer = styled.div`
  display:flex;
  justify-content: flex-end;
  margin-top: 30px;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.7rem 0px;
`

const ProducerForm = ({ producer, onSuccess }) => {

  
  const initialValues = {
    lastname: producer?.lastname,
    firstname: producer?.firstname,
    dni: producer?.dni, 
    cuit: producer?.cuit,
    did: producer?.did
  }

  return (
    <FormWrapper>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validate={(values) => {
            const errors = {};
            console.log(`Validate did` ) //https://www.w3.org/TR/did-core/
            if(values.did){

              if(!validateDid(values.did)){
                errors.did = {display:"Did inválido"}
              }
            
              
            }
            
            return errors;
          }}

          onSubmit={async (values, { setSubmitting }) => {
            console.log(`handle submit!`, values);
            let result;
            if(producer?._id){
              console.log(`Update producer`)
              result = await CoopsolBackend().producers().update(producer?._id, values);

            } else {
              console.log(`create producer`)
              result = await CoopsolBackend().producers().create(values);
            }
            typeof onSuccess === "function" && onSuccess(result);
            console.log(result);
            
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <InputContainer>
                Apellido
                <Input
                  type="text"
                  name="lastname"
                  value={values["lastname"]}
                  onChange={handleChange} />
              </InputContainer>
              <InputContainer>
                Nombre
                <Input
                  type="text"
                  name="firstname"
                  value={values["firstname"]}
                  onChange={handleChange} />
              </InputContainer>
              <InputContainer>
                DNI
                <Input
                  type="text"
                  name="dni"
                  value={values["dni"]}
                  onChange={handleChange} />
              </InputContainer>
              <InputContainer>
                CUIT
                <Input
                  type="text"
                  name="cuit"
                  value={values["cuit"]}
                  onChange={handleChange} />
              </InputContainer>
              <InputContainer>
                DID
                <Input
                  type="text"
                  name="did"
                  value={values["did"]}
                  status={errors["did"] ? "error" : ""}
                  onChange={handleChange} 
                  />
                {errors["did"] && ( <Text type="danger">{errors["did"].display}</Text>)}
              </InputContainer>

              <ButtonContainer>
                <ButtonPrimary
                  disabled={isSubmitting || Object.keys(errors).length > 0} 
                  type="submit"
                  text="Guardar"
                  theme={`ThemePrimary ${(isSubmitting || Object.keys(errors).length > 0) ? "disabled" : ""}`}
                />
              </ButtonContainer>
            </form>
          )}

        </Formik>

      </FormContainer>
    </FormWrapper>
  )
}
export default ProducerForm;