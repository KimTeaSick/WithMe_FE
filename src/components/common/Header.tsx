import Logo from './Logo';
import { HeaderWrapper } from './Header.styled';
import useModal from '@hooks/useModal';
import { CloseIcon } from '@assets/svg/common';
import Button from './Button';
import React, { useState, FC, useCallback } from 'react';
import { LoginModalWrapper } from '../Login.styled';
import APIs from '@lib/api/APIs';
import { SignupModalWrapper } from '../Signup';
import { useRouter } from 'next/router';

const LoginModal: FC<{ onCloseModal: () => void }> = ({ onCloseModal }) => {
	const [teamPage, setTeamPage] = useState<boolean>(true);
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [checkEmail, setCheckEmail] = useState<boolean>(true);
	const [checkPassword, setCheckPassword] = useState<boolean>(true);
	const [signupCheckEmail, setSignupCheckEmail] = useState<boolean>(true);
	const [signupCheckNickName, setSignupCheckNickName] = useState<boolean>(true);
	const [signupCheckPassword, setSignupCheckPassword] = useState<boolean>(true);
	const [signupCheckConfirmPassword, setSignupCheckConfirmPassword] = useState<boolean>(true);
	const [changeModal, setChangeModal] = useState<boolean>(false);
	const [signupEmail, setSignupEmail] = useState<string>('');
	const [signupNickName, setSignupNickname] = useState<string>('');
	const [signupPassword, setSignupPassword] = useState<string>('');
	const [signupConfirmPassword, setSignupConfirmPassword] = useState<string>('');
	const emailCheckHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			setEmail(e.target.value);
		},
		[email]
	);

	const passwordCheckHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			setPassword(e.target.value);
		},
		[password]
	);

	const signupEmailHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			setSignupEmail(e.target.value);
		},
		[signupEmail]
	);

	const signupNicknameHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			setSignupNickname(e.target.value);
		},
		[signupNickName]
	);

	const signupPasswordHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			setSignupPassword(e.target.value);
		},
		[signupPassword]
	);

	const signupConfirmPasswordHandler = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			setSignupConfirmPassword(e.target.value);
		},
		[signupConfirmPassword]
	);

	const changeSignupModalHandler = () => {
		setChangeModal(true);
	};

	const changeLoginModalHandler = () => {
		setChangeModal(false);
	};

	const payload = {
		email: email,
		password: password
	};

	const resetInput = () => {
		setEmail('');
		setPassword('');
		setSignupEmail('');
		setSignupNickname('');
		setSignupPassword('');
		setSignupConfirmPassword('');
	};

	const submitHandler = async () => {
		if (!email) {
			setCheckEmail(false);
			return;
		}
		if (!password) {
			setCheckPassword(false);
			return;
		}

		await APIs.testAxios()
			.then(res => {
				alert(`반갑습니다 ${res.name}님!`);
				resetInput();
				onCloseModal();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const signupSubmitHandler = async () => {
		if (!signupEmail) {
			setSignupCheckEmail(false);
			return;
		}
		if (!signupNickName) {
			setSignupCheckNickName(false);
			return;
		}
		if (!signupPassword) {
			setSignupCheckPassword(false);
			return;
		}
		if (signupPassword !== signupConfirmPassword || !signupConfirmPassword) {
			setSignupCheckConfirmPassword(false);
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}

		await APIs.testAxios().then(res => {
			alert('방갑읍니다');
			onCloseModal();
			resetInput();
			return;
		});
	};

	return (
		<>
			{changeModal === false ? (
				<LoginModalWrapper>
					<div className="login-modal-logo">
						<Logo />
						<CloseIcon className="close-btn" onClick={onCloseModal} />
					</div>
					<div className="login-modal-title">로그인</div>
					<div className="input-wrapper">
						{checkEmail === true ? (
							<div>
								<input placeholder="이메일" onChange={emailCheckHandler} className="login-email-input" />
							</div>
						) : (
							<div>
								<input placeholder="이메일" onChange={emailCheckHandler} className="login-email-input-error" />
							</div>
						)}
						{checkPassword === true ? (
							<div>
								<input
									placeholder="패스워드"
									onChange={passwordCheckHandler}
									type="password"
									className="login-password-input"
								/>
							</div>
						) : (
							<div>
								<input
									placeholder="패스워드"
									onChange={passwordCheckHandler}
									type="password"
									className="login-password-input-error"
								/>
							</div>
						)}
					</div>
					<Button color="white" className="login-btn" onClick={submitHandler}>
						로그인
					</Button>
					<div className="login-sub-title">
						<p>위드미가 처음이신가요?</p>
						<span onClick={changeSignupModalHandler} className="signup-btn">
							회원가입
						</span>
					</div>
					<div className="login-line">
						<hr />
						<span>또는</span>
						<hr />
					</div>
					<Button color="white" className="login-github-btn">
						<img src="/img/github.png" className="github-image" />
						Github 로그인
					</Button>
				</LoginModalWrapper>
			) : (
				<SignupModalWrapper>
					<div className="login-modal-logo">
						<Logo />
						<CloseIcon className="close-btn" onClick={onCloseModal} />
					</div>
					<div className="login-modal-title">회원가입</div>
					<div className="input-wrapper">
						{signupCheckEmail === true ? (
							<div>
								<input placeholder="이메일" className="login-email-input" onChange={signupEmailHandler} />
							</div>
						) : (
							<div>
								<input placeholder="이메일" className="login-email-input-error" onChange={signupEmailHandler} />
							</div>
						)}
						{signupCheckNickName === true ? (
							<div>
								<input placeholder="닉네임" className="login-email-input" onChange={signupNicknameHandler} />
							</div>
						) : (
							<div>
								<input placeholder="닉네임" className="login-email-input-error" onChange={signupNicknameHandler} />
							</div>
						)}
						{signupCheckPassword === true ? (
							<div>
								<input placeholder="비밀번호" className="login-email-input" onChange={signupPasswordHandler} />
							</div>
						) : (
							<div>
								<input placeholder="비밀번호" className="login-email-input-error" onChange={signupPasswordHandler} />
							</div>
						)}
						{signupCheckConfirmPassword === true ? (
							<div>
								<input
									placeholder="비밀번호 확인"
									onChange={signupConfirmPasswordHandler}
									type="password"
									className="login-password-input"
								/>
							</div>
						) : (
							<div>
								<input
									placeholder="비밀번호 확인"
									onChange={signupConfirmPasswordHandler}
									type="password"
									className="login-password-input-error"
								/>
							</div>
						)}
					</div>
					<Button color="white" className="login-btn" onClick={signupSubmitHandler}>
						회원가입
					</Button>
					<div className="login-sub-title">
						<p>이미 위드미 회원이신가요?</p>
						<span onClick={changeLoginModalHandler} className="signup-btn">
							로그인
						</span>
					</div>
					<div className="login-line">
						<hr />
						<span>또는</span>
						<hr />
					</div>
					<Button color="white" className="login-github-btn">
						<img src="/img/github.png" className="github-image" />
						Github 로그인
					</Button>
				</SignupModalWrapper>
			)}
		</>
	);
};

const Header = () => {
	const { ModalPortal, onCloseModal, onOpenModal } = useModal();
	const router = useRouter();
	return (
		<>
			<HeaderWrapper>
				<Logo />
				<div className="header-title">
					<span className="header-title-find" onClick={() => router.push('/team')}>
						팀찾기
					</span>
					<span className="header-title-comunity">커뮤니티</span>
				</div>
				<div className="button-wrapper">
					<span onClick={onOpenModal}>로그인 | 회원가입</span>
				</div>
			</HeaderWrapper>
			<ModalPortal>
				<LoginModal onCloseModal={onCloseModal} />
			</ModalPortal>
		</>
	);
};

export default Header;
