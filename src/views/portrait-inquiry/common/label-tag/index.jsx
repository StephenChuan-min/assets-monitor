import React from 'react';
import './style.scss';

const TagOneSide = params => (
	<div
		className={`${params.num === 0 ? 'yc-label-disabled' : (params.tag || 'yc-label-tag')}`}
		{...params}
	>
		<div className="yc-label-tag-content">
			{params.content}
			<span style={{ marginLeft: 10 }}>{`${params.num} 条`}</span>
		</div>
		<div className="line-triangle line-triangle-right">
			<div className="line-triangle-outside">
				<div className="line-triangle-inside" />
			</div>
		</div>
	</div>
);
const TagTwoSide = params => (
	<div className={`${params.num === 0 ? 'yc-label-disabled' : (params.tag || 'yc-label-tag')}`} {...params}>
		<div className="line-triangle line-triangle-left">
			<div className="line-triangle-outside">
				<div className="line-triangle-inside" />
			</div>
		</div>
		<div className="yc-label-tag-content">
			{params.content}
			<span style={{ marginLeft: 10 }}>{`${params.num} 条`}</span>
		</div>
		<div className="line-triangle line-triangle-right">
			<div className="line-triangle-outside">
				<div className="line-triangle-inside" />
			</div>
		</div>
	</div>
);

export { TagOneSide, TagTwoSide };
