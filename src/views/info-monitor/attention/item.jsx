import React from 'react';
import { Button } from '@/common';
import AssetsAuction from '../../asset-excavate/assets-auction/table-intact'; // 资产拍卖
import Subrogation from '../../asset-excavate/subrogation/table-intact'; // 代位权
import LandData from '../../asset-excavate/land-data/table-intact'; // 土地信息
import TenderBid from '../../asset-excavate/tender-bid/table-intact';
import FinancialAssets from '../../asset-excavate/financial-assets/table'; // 金融资产
import ChattelMortgage from '../../asset-excavate/chattel-mortgage/table-intact'; // 动产抵押
import Car from '../../asset-excavate/car/table-intact'; // 车辆信息
import RealEstate from '../../asset-excavate/real-estate/table-intact'; // 不动产登记
import Lawsuit from '../../risk-monitor/lawsuits-monitor/table-intact';
import Operation from '../../risk-monitor/operation-risk/table-intact';
import Bankruptcy from '../../risk-monitor/bankruptcy/table-intact';
import BrokenRecord from '../../risk-monitor/broken-record/table-intact';
import IntangibleAssets from '../../asset-excavate/intangible-assets/table-intact'; // 无形资产
import Pledge from '../../asset-excavate/equity-pledge/table-intact';
import UnBlock from '../../asset-excavate/seized-unblock/table/table-intact'; // 查/解封资产
import LimitHeight from '../../risk-monitor/limit-consumption/table/table-intact';
import ConstructProject from '../../asset-excavate/construct-project/table/table-intact'; // 在建工程

const TableItem	= (props) => {
	const {
		source, childType, sourceType, onBtnChange,
	} = props;
	const ID = source.child ? childType : sourceType;
	const curSourceArr = source.child && source.child.filter(i => i.id === ID);
	const curSourceObj = curSourceArr && Array.isArray(curSourceArr) ? curSourceArr[0] : undefined;
	return (
		<React.Fragment>
			{
				{
					YC0201: <AssetsAuction />,
					YC020201: <Subrogation sourceType={1} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020202: <Subrogation sourceType={2} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020203: <Subrogation sourceType={3} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020301: <LandData sourceType={1} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020302: <LandData sourceType={2} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020303: <LandData sourceType={3} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC0204: <TenderBid />,
					YC020501: <FinancialAssets sourceType={1} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020502: <FinancialAssets sourceType={2} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020503: <FinancialAssets sourceType={3} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC0206: <ChattelMortgage />,
					YC020701: <IntangibleAssets sourceType="YC020701" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020702: <IntangibleAssets sourceType="YC020702" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020703: <IntangibleAssets sourceType="YC020703" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC020704: <IntangibleAssets sourceType="YC020704" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC0208: <Pledge />,
					YC0209: <UnBlock />,
					YC0210: <RealEstate />,
					YC0211: <Car />,
					YC021201: <ConstructProject sourceType="YC021201" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC021202: <ConstructProject sourceType="YC021202" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC021203: <ConstructProject sourceType="YC021203" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC030101: <Lawsuit sourceType={1} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC030102: <Lawsuit sourceType={2} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC030103: <Lawsuit sourceType={3} onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC0302: <Bankruptcy />,
					YC030301: <Operation sourceType="YC030301" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC030302: <Operation sourceType="YC030302" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC030303: <Operation sourceType="YC030303" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC030304: <Operation sourceType="YC030304" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC030305: <Operation sourceType="YC030305" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC030306: <Operation sourceType="YC030306" onBtnChange={onBtnChange} curSourceObj={curSourceObj} />,
					YC0304: <BrokenRecord />,
					YC0305: <LimitHeight />,
				}[ID] || <AssetsAuction />
			}
		</React.Fragment>
	);
};
const Item = (props) => {
	const { source, childType, onBtnChange } = props;
	return (
		<div className="yc-attention-item">
			{
				source.child ? (
					<div className="item-btn-list">
						{
							source.child.map(item => (item.status ? (
								<Button
									active={item.id === childType}
									onClick={() => onBtnChange(item)}
									style={{ marginRight: 12, minWidth: 85 }}
								>
									{item.name}
									<span style={{ marginLeft: 4, color: '#FB5A5C' }}>{item.number || 0}</span>
								</Button>
							) : null))
						}
					</div>
				) : null
			}
			<TableItem {...props} />
		</div>
	);
};


export default Item;
