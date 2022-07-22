import classnames from 'classnames';
import * as React from 'react';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import { ArrowIcon } from '../../../containers/ToolBar/icons/ArrowIcon';

const ModalComponent = props => {
	const [shouldAnimate, setShouldAnimate] = React.useState(false);

	React.useEffect(() => {
		if (props.isOpen) {
			setTimeout(() => {
				setShouldAnimate(true);
			}, 200);
		}

		return () => setShouldAnimate(false);
	}, [props.isOpen]);

	const handleOnClose = (event, strictTarget?: boolean) => {
		if (event) {
			event.preventDefault();

			if (strictTarget && event.target !== event.currentTarget) {
				return;
			}

			setShouldAnimate(false);

			setTimeout(() => {
				props.onClose && props.onClose();
			}, 200);
		}
	};

	const handleOnBack = () => {
		setShouldAnimate(false);

		setTimeout(() => {
			props.onBack();
		}, 200);
	};

	const renderDefaultHeader = (
		<div className="td-mobile-modal__header">
			<div className="td-mobile-modal__header-back" onClick={handleOnBack}>
				{props.backTitle ? (
					<React.Fragment>
						<ArrowIcon />
						<span>{props.backTitle}</span>
					</React.Fragment>
				) : null}
			</div>
			<div className="td-mobile-modal__header-title">{props.title}</div>
			<div className="td-mobile-modal__header-close" onClick={handleOnClose}>
				<CloseIcon />
			</div>
		</div>
	);

	const modalClassName = classnames('td-mobile-modal', {
		'td-mobile-modal--open': shouldAnimate,
	});
	const bodyClassName = classnames('td-mobile-modal__block', {
		'td-mobile-modal__block--open': shouldAnimate,
	});

	return (
		<div className={modalClassName} onClick={e => handleOnClose(e, true)}>
			<div className={bodyClassName}>
				{props.header || renderDefaultHeader}
				{props.children}
			</div>
		</div>
	);
};

export const Modal = React.memo(ModalComponent);
