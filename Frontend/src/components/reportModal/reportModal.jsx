import React, {useCallback, useState, useEffect} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import { ReactComponent as ReportIcon } from '../../assets/images/report.svg';
import style from './reportModal.module.scss'
import Modal from '../modal/modal'
import {createStructuredSelector} from 'reselect'
import {isReporModalOpen, getReporModalTitle} from '../../redux/selectors'
import {closeReportModal, submitReportModal} from '../../redux/actions'
import {useInput} from '../../hooks/hooks'

const EMAIL_REGEXP = /^[+a-zA-Z0-9_.!#$%&'*\\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/

const Form = ({onSubmit, validation, bindDescription, bindEmail}) => {
	const descriptionClassName = classnames({
		[style.description]: true,
		[style.invalid]: !validation.description
	})
	const emailClassName = classnames({
		[style.email]: true,
		[style.invalid]: !validation.email
	})
	return (
		<form onSubmit={onSubmit} className={style.reportForm}>
			<label htmlFor='description' className={style.descriptionLabel}>Popis nalezené chyby</label>
			<textarea
				id='description'
				name='description'
				className={descriptionClassName}
				{...bindDescription}
			/>
			{!validation.description && <div className={style.errorText}>Popište, prosím, nalezenou chybu.</div>}
			<label htmlFor='email' className={style.emailLabel}>Váš e-mail</label>
			<input id='email' className={emailClassName} type={style.email} {...bindEmail}/>
			{!validation.email && <div className={style.errorText}>Zadejte platnou e-mailovou adresu.</div>}
			<div className={style.submitWrapper}>
				<button type='submit' className={style.submit}>Odeslat</button>
			</div>
		</form>
	)
}

const ReportModal = ({title, isReporModalOpen, closeReportModal, submit}) => {

	const {value: description, reset: resetDescription, bind: bindDescription} = useInput('')
	const {value: email, reset: resetEmail, bind: bindEmail} = useInput('')
	const [validation, setValidation] = useState({email: true, description: true})
	const [submited, setSubmited] = useState(false)
	const onSubmit = useCallback((ev) => {
		ev.preventDefault()
		const validation = {
			description: !!description.trim(),
			email: !email.trim() || EMAIL_REGEXP.test(email.trim()),
		}
		setValidation(validation)
		if (validation.description && validation.email) {
			submit({
				description,
				email,
				title,
			})
			setSubmited(true)
		}
	}, [email, description, setValidation, submit, title, setSubmited])

	useEffect(() => {
		return () => {
			resetDescription()
			resetEmail()
			setValidation({email: true, description: true})
		}
	}, [isReporModalOpen, resetDescription, resetEmail, setValidation]);

	if (!isReporModalOpen) return null

	// TODO pouzit spravnou ikonku
	return (
		<Modal onCloseRequest={closeReportModal} className={style.modalWrapper}>
			<div className={style.header}>
				<div className={style.icon}>
					<ReportIcon />
					<div>Nahlásit chybu</div>
				</div>
				{!submited && <div className={style.cancel} onClick={closeReportModal}>Zrušit</div>}
			</div>
			<div className={style.body}>
				<div className={style.title} >{title}</div>
				{!submited && <Form onSubmit={onSubmit} validation={validation} bindDescription={bindDescription} bindEmail={bindEmail} />}
				{submited &&
					<div className={style.submited}>
						<div className={style.text}>Chyba v obsahu byla úspěšně nahlášena. Děkujeme, že nám pomáhate dělat naše politiky lepšími.</div>
						<div className={style.close} onClick={closeReportModal}>Zpět na profil politika</div>
					</div>
				}
			</div>
		</Modal>
	)
}

const mapStateToProps = createStructuredSelector({
	isReporModalOpen,
	title: getReporModalTitle
})

export default connect(mapStateToProps, {closeReportModal, submit: submitReportModal})(ReportModal);
