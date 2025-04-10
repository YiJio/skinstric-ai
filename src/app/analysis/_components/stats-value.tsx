'use client';

// css
import './styles.css';

interface StatsValueProps {
	label: string;
	score: number;
	isActive?: boolean;
	setActiveItem: () => void;
}

const StatsValue: React.FC<StatsValueProps> = ({ isActive = false, label, score, setActiveItem }) => {

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

export default StatsValue;