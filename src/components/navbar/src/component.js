import Store from '../../../model/model.js';
import Model from '../../../model/store';
export default {
name: 'navbar',
data(){
	return {
		title: Store.navTitle,
		model:Model.state
	}
}
};

