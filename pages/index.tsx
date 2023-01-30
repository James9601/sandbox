import React, { FC, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import Modal from "react-modal";

interface FormValue {
   userId: string;
   name: string;
   nickname: string;
   email: string;
   email2: string;
   password: string;
   password_confirm: string;
   gender: string;
   agreement: string;
}

const FormWrapper = styled.form`
   overflow: hidden;
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 20px;
`;

const FormInput = styled.input`
   padding: 10px;
   margin: 10px 0;
   font-size: 16px;
   border: none;
   border-radius: 4px;
   &:focus {
      outline: none;
      border: 2px solid blue;
   }
`;

const FormSelect = styled.select`
   padding: 10px;
   margin: 10px 0;
   font-size: 16px;
   border: none;
   border-radius: 4px;
   &:focus {
      outline: none;
      border: 2px solid blue;
   }
`;

const FormLabel = styled.label`
   font-size: 20px;
   margin-bottom: 10px;
`;

const StyledButton = styled.button`
   padding: 10px 20px;
   background-color: #4caf50;
   color: white;
   font-size: 16px;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   &:hover {
      background-color: #3e8e41;
   }
   &:focus {
      outline: none;
   }
`;

const ErrorMessage = styled.div`
   color: red;
   font-size: 14px;
   margin-top: 10px;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
   appearance: none;
   width: 20px;
   height: 20px;
   background-color: #fff;
   border: 2px solid #333;
   border-radius: 4px;
   margin-right: 10px;

   /* Checkmark styles */
   &:after {
      content: "";
      position: absolute;
      display: none;
   }

   /* Checked styles */
   &:checked {
      background-color: #333;
      border-color: #333;
      &:after {
         display: block;
         width: 6px;
         height: 12px;
         border: solid #fff;
         border-width: 0 2px 2px 0;
         transform: rotate(45deg);
         left: 6px;
         top: 2px;
      }
   }
`;

const customStyles = {
   content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
   },
};
const Home: FC = () => {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<FormValue>();

   const passwordRef = useRef<string | null>(null);
   passwordRef.current = watch("password");

   const [isChecked, setIsChecked] = useState(false);
   const [modalOpen, setModalOpen] = useState(false);

   const handleModalClose = (event: any) => {
      event.preventDefault();
      setModalOpen(false);
   };
   const handleSignup = async (data) => {
      const response = await fetch(`/api/hello`, {
         method: "POST",
         body: JSON.stringify(data),
      });
      const json = await response.json();
      return json;
   };
   const handleSubmit1: SubmitHandler<FormValue> = (data) => {
      delete data.password_confirm;
      handleSignup(data);
      console.log(data);
   };

   return (
      <>
         <FormWrapper onSubmit={handleSubmit(handleSubmit1)}>
            <FormLabel>ID</FormLabel>
            <FormInput {...register("userId", { required: true, maxLength: 20 })} placeholder="아이디"></FormInput>
            {errors.userId && errors.userId.type === "required" && <ErrorMessage>아이디를 입력해 주세요</ErrorMessage>}
            <FormLabel>Name</FormLabel>
            <FormInput {...register("name", { required: true, pattern: /^[가-힣a-zA-Z0-9]*$/ })} placeholder="이름"></FormInput>
            {errors.name && errors.name.type === "required" && <ErrorMessage>이름을 입력해 주세요</ErrorMessage>}
            <FormLabel>NickName</FormLabel>
            <FormInput {...register("nickname", { required: true, pattern: /^[가-힣a-zA-Z0-9]*$/ })} placeholder="닉네임"></FormInput>
            {errors.nickname && errors.nickname.type === "required" && <ErrorMessage>닉네임을 입력해 주세요</ErrorMessage>}
            <FormLabel>Email</FormLabel>
            <FormInput {...register("email", { required: true })} placeholder="이메일"></FormInput>
            {errors.email && errors.email.type === "required" && <ErrorMessage>이메일을 입력해 주세요</ErrorMessage>}@
            <FormSelect {...register("email2", { required: true })}>
               <option disabled>선택해주세요</option>
               <option value="naver.com">naver.com</option>
               <option value="daum.com">daum.com</option>
               <option value="nate.com">nate.com</option>
               <option value="gmail.com">gmail.com</option>
            </FormSelect>
            {errors.email2 && errors.email2.type === "required" && <ErrorMessage>이메일 주소를 선택해주세요</ErrorMessage>}
            <FormLabel>password</FormLabel>
            <FormInput
               {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[a-zA-Z0-9!@#\$%\^&\*]{6,}$/,
               })}
               type="password"
               placeholder="비밀번호"
            />
            {errors.password && errors.password.type === "required" && <ErrorMessage>비밀번호를 입력해주세요</ErrorMessage>}
            {errors.password && errors.password.type === "pattern" && <ErrorMessage>영문자, 대문자, 숫자, 특수문자 각각 하나 이상 포함해야하고, 최소 6자 이상이어야합니다</ErrorMessage>}
            <FormLabel>password_confirm</FormLabel>
            <FormInput
               {...register("password_confirm", {
                  required: true,
                  validate: (value) => value === passwordRef.current,
               })}
               type="password"
               placeholder="비밀번호 확인"
            />
            {errors.password_confirm && errors.password_confirm.type === "validate" && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
            <StyledCheckbox {...register("agreement", { required: true })} onChange={() => setIsChecked(!isChecked)} />
            개인정보활용 동의(필수)
            <div>
               <span onClick={() => setModalOpen(true)}>보기</span>
               <Modal isOpen={modalOpen} shouldCloseOnOverlayClick={false} onRequestClose={handleModalClose} style={customStyles}>
                  <div>
                     <h2>모달 내용</h2>
                     <StyledButton onClick={handleModalClose}>닫기</StyledButton>
                  </div>
               </Modal>
            </div>
            {!isChecked && errors.agreement && errors.agreement.type === "required" && <ErrorMessage>동의버튼을 눌러주세요</ErrorMessage>}
            <ErrorMessage>{isChecked ? "동의해주셔서 감사드립니다." : ""}</ErrorMessage>
            <StyledButton type="submit">회원가입</StyledButton>
         </FormWrapper>
      </>
   );
};
export default Home;
