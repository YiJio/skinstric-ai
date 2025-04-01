interface AnalysisStatsValueProps {
	label: string;
	score: number;
}

const AnalysisStatsValue: React.FC<AnalysisStatsValueProps> = ({ label, score }) => {

	return (
		<div className='sai-stats__value'>
			<div>
				<img src='/icons/radio-idle.svg' />
				<span>{label}</span>
			</div>
			<span>{Math.round(score * 100)}%</span>
		</div>
	);
};

export default AnalysisStatsValue;