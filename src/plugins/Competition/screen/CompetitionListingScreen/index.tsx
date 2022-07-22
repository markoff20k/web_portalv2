import classNames from 'classnames';
import * as React from 'react';
import { ListCompetition } from '../../containers';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompetitionList, fetchListCompetition } from '../../../../modules';

export type statusCompetition = 'all' | 'ended' | 'ongoing' | 'upcoming';
export type typeCompetition = 'stake' | 'trade';
export const CompetitionListingScreen = () => {
	const [statusCompetition, setStatusCompetition] = React.useState<statusCompetition>('all');
	const [searchInputState, setSearchInputState] = React.useState<string>('');
	// const PAGE_SIZE = 12;
	const handleViewListingCompetition = (status: statusCompetition) => {
		setStatusCompetition(status);
		setSearchInputState('');
	};
	const dispatch = useDispatch();
	const renderActiveButtonAllClasses = classNames('upcoming', statusCompetition === 'all' ? 'button--all' : '');
	const renderActiveButtonUpcomingClasses = classNames('upcoming', statusCompetition === 'upcoming' ? 'button--upcoming' : '');
	const renderActiveButtonRunningClasses = classNames('running', statusCompetition === 'ongoing' ? 'button--running' : '');
	const renderActiveButtonEndedClasses = classNames('ended', statusCompetition === 'ended' ? 'button--ended' : '');
	const competitions = useSelector(selectCompetitionList);
	React.useEffect(() => {
		dispatch(fetchListCompetition());
	}, []);
	const getListingRender = () => {
		const checkSearch = item =>
			item.type.includes(searchInputState.trim()) || item.currency_id.includes(searchInputState.trim());
		if (statusCompetition === 'all') {
			return competitions.payload.filter(checkSearch);
		} else {
			return competitions.payload.filter(item => item.status === statusCompetition && checkSearch(item));
		}
	};
	return (
		<div id="competition-listing-screen" className="container">
			<div className="competition-listing-screen__header row" style={{ paddingLeft: '0px' }}>
				<h3 className="col-12">Competitions</h3>
				<div className="competition-listing-function flex-wrap col-12">
					<div className="input-list-function-search" style={{ width: '20rem', height: '45px' }}>
						<input
							name="function-search"
							type="text"
							value={searchInputState}
							placeholder="Search currency"
							onChange={e => {
								setSearchInputState(e.target.value);
							}}
						/>
						<div className="icon-search">
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
									fill="#848E9C"
								/>
							</svg>
						</div>
					</div>
					<div className="view-competition-item-type">
						<button
							type="button"
							className={renderActiveButtonAllClasses}
							onClick={() => {
								handleViewListingCompetition('all');
							}}
							style={{ borderRadius: ' 3px 0px 0px 3px' }}
						>
							All
						</button>
						<button
							type="button"
							className={renderActiveButtonUpcomingClasses}
							onClick={() => {
								handleViewListingCompetition('upcoming');
							}}
						>
							Upcoming
						</button>
						<button
							type="button"
							className={renderActiveButtonRunningClasses}
							onClick={() => {
								handleViewListingCompetition('ongoing');
							}}
						>
							Ongoing
						</button>
						<button
							type="button"
							className={renderActiveButtonEndedClasses}
							onClick={() => {
								handleViewListingCompetition('ended');
							}}
							style={{ borderRadius: ' 0px 5px 5px 0px' }}
						>
							Ended
						</button>
					</div>
				</div>
			</div>
			<div style={{ borderRadius: '10px', boxShadow: ' 0 4px 8px -2px rgb(0 0 0 / 15%)' }}>
				{competitions.loading ? (
					<div className="loading">
						<div className="spinner-border text-primary" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
				) : (
					<ListCompetition CompetitionList={getListingRender()} />
				)}
			</div>
		</div>
	);
};
