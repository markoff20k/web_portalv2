import { Button, Col, message, Result, Row } from 'antd';
import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { findSalebyId, selectSaleItem, selectUserInfo } from '../../../../modules';
import { BuyersHistory, BuyHistory, SaleBuy, SaleDetail, SaleInfo, SaleSocial } from '../../containers';
//import './SaleDetailScreen.pcss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SectionTitle from "../../../../template_react/doob/src/elements/sectionTitle/SectionTitle";




export const SaleDetailScreen: React.FC = () => {

	const [tabIndex, setTabIndex] = useState(0);

	const history = useHistory();
	const { ieoID } = useParams<{ ieoID: string }>();
	const saleItem = useSelector(selectSaleItem);
	const user = useSelector(selectUserInfo);
	const dispatch = useDispatch();
	const dispatchFetchSaleItemByID = React.useCallback(
		(ieoIdParam: string) =>
			dispatch(
				findSalebyId({
					id: ieoIdParam,
				}),
			),
		[dispatch],
	);

	

	React.useEffect(() => {
		if (saleItem.loading) {
			message.loading('Aguarde...', 0);
		} else {
			message.destroy();
		}

		return () => {
			message.destroy();
		};
	}, [saleItem.loading]);

	React.useEffect(() => {
		dispatchFetchSaleItemByID(ieoID);
	}, [dispatchFetchSaleItemByID, ieoID]);

	let saleInfoView: JSX.Element;
	let saleBuyView: JSX.Element;
	let saleSocialView: JSX.Element;
	let saleDetailView: JSX.Element;
	let buyHistoryView: JSX.Element;
	if (saleItem && user) {
		saleInfoView = <SaleInfo ieoID={ieoID} sale={saleItem.payload} />;
		saleBuyView = <SaleBuy uid={user.uid} sale={saleItem.payload} />;
		saleDetailView = <SaleDetail ieoID={Number(ieoID)} />;
		if (user.uid) {
			buyHistoryView = (
				<>
					<div className="col-md-12 col-xl-6 mt-3">
						<BuyHistory uid={user.uid} ieoID={Number(ieoID)} />
					</div>
					<div className="col-md-12 col-xl-6 mt-3">
						<BuyersHistory ieoID={Number(ieoID)} />
					</div>
				</>
			);
		} else {
			buyHistoryView = (
				<>
					<div className="col-12">
						<BuyersHistory ieoID={Number(ieoID)} />
					</div>
				</>
			);
		}

		const saleSocial = saleItem.payload.social;
		saleSocialView = (
			<SaleSocial
				website={saleSocial.website}
				whitepaper={saleSocial.whitepaper}
				ico={saleSocial.ico}
				facebook={saleSocial.facebook}
				telegram={saleSocial.telegram}
				twitter={saleSocial.twitter}
				linkedin={saleSocial.linkedin}
				instagram={saleSocial.instagram}
			/>
		);
	}

	const getBadgeColor = type => {
		switch (type) {
			case 'ongoing':
				return '#2a9d8f';
			case 'upcoming':
				return '#e9c46a';
			case 'ended':
				return '#e63946';
			default:
				return '#0C9D58ff';
		}
	};

	const renderDetailScreenView = () => {
		if (!saleItem.payload.id) {
			return (
				<Result
					status="500"
					title="500"
					subTitle="Nenhuma emissão encontrada na plataforma"
					extra={
						<Button type="primary" onClick={() => history.goBack()}>
							Voltar
						</Button>
					}
				/>
			);
		} else {
			return (
				<div id="sale-detail-screen" style={{marginTop: '80px', marginBottom: '80px'}}>

<div className="rwt-advance-tab-area "  >
                    <div className="" >

						<Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
						<div className="container" style={{display: 'flex', flexDirection: 'row', width: '100%'}} >
						
							                    <div >
                        <div className="advance-tab-button advance-tab-button-1" style={{width: '250px', borderColor: '#009991', marginRight: '30px' }}>
                            <TabList className="tab-button-list">
                                <Tab>
                                    <div className="tab-button"  style={{ borderColor: '#009991'}}>
                                        <h4 className="title" style={{fontWeight: 'bold'}}>Informações</h4>
                                        <p className="description">Veja as informações mais relevantes relacionadas a essa captação</p>
                                    </div>   
                                </Tab>
                                <Tab>
                                    <div className="tab-button">
                                        <h4 className="title">Transações</h4>
                                        <p className="description">Extrato de todas as transações de compra já efetivadas</p>
                                    </div>   
                                </Tab>
                                <Tab>
                                    <div className="tab-button">
                                        <h4 className="title">Detalhes</h4>
                                        <p className="description">Conheça todos os detalhes do projeto</p>
                                    </div>   
                                </Tab>
                            </TabList>
                        </div>
                    </div>
                    <div className="row">
                        <div className="advance-tab-content advance-tab-content-1">
                            <TabPanel>
							<div className="tab-content">
                                    <div className="inner">
                                        <div className="thumbnail">
										<div id="sale-info" className="container-fluid">
						{saleInfoView}
					</div>
										

					</div>
					</div>
											                                        
		
                                </div>

                            </TabPanel>
                            
                            <TabPanel>
                                <div className="tab-content">
                                    <div className="inner">
                                        <div className="thumbnail">
										<div id="sale-info" className="container-fluid">
										{buyHistoryView}                               
										</div>
										</div>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel>
							<div className="tab-content">
                                    <div className="inner">
                                        <div className="thumbnail">
										<div id="sale-info" className="container-fluid">
										{saleSocialView}                             
										</div>
										</div>
                                    </div>
                                </div>
							
					
                            </TabPanel>
                        </div>
						
                    </div>					
				
						{saleBuyView}
					
			    </div>
				
            </Tabs>               
			





	
				
					<div id="sale-info-buy" className="container-fluid">
						<div className="row"></div>
					</div>
				


					</div>
					</div>
				{/*
					<span id="sale-info-buy" className="container-fluid">
						<div className="row">{buyHistoryView}</div>
					</span>

					<span id="sale-social" className="container-fluid">
						<div className="row">
							<div className="col-12">{saleSocialView}</div>
						</div>
					</span>
					<span id="sale-detail" className="container-fluid">
						<div className="row">
							<div className="col-12">{saleDetailView}</div>
						</div>
					</span>
		*/}
				</div>
			);
		}
	};

	return <React.Fragment>{renderDetailScreenView()}</React.Fragment>;
};
