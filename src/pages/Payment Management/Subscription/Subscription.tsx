import { SubScriptionPlan } from '../../../components/subscription/SubScriptionPlan';
import { Subscriptions } from '../../../components/subscription/Subscriptions';

const Subscription = () => {
	return <div className='overflow-scroll'>
		<Subscriptions />
		<SubScriptionPlan />
	</div>;
};

export default Subscription;
