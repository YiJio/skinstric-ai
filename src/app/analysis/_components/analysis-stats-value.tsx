interface AnalysisStatsValueProps {
	label: string;
	score: number;
	isActive?: boolean;
	setActiveItem: () => void;
}

const AnalysisStatsValue: React.FC<AnalysisStatsValueProps> = ({ isActive = false, label, score, setActiveItem }) => {

	return (
		<div className={`sai-stats__value${isActive ? ' isActive' : ''}`} onClick={setActiveItem}>
			<div>
				<img src={`/icons/radio-${isActive ? 'selected' : 'idle'}.svg`} />
				<span>{label}</span>
			</div>
			<span>{Math.round(score * 100)} %</span>
		</div>
	);
};

export default AnalysisStatsValue;