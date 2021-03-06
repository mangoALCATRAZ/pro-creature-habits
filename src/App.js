import {Provider} from "react-redux";
import AppUnwrapped from "./AppUnwrapped";
import React from "react";
import {AsyncStorage} from "react-native";
import {persistReducer, persistStore} from "redux-persist";
import {combineReducers, createStore} from "redux";
import {RESET_BUTTON_PRESSED} from "./AppUnwrapped";
import balanceReducer from "./redux/coinBalance";
import hungerbarPointReducer from "./redux/hungerbarPoint";
import funbarPointReducer from "./redux/funbarPoint";
import hygienebarPointReducer from "./redux/hygienebarPoint"
import healthBarReducer from './redux/healthBarPoint';
import marketplaceInventoryReducer from "./redux/marketplaceInventory";
import petInfoReducer from "./redux/petInfo";
import petInventoryReducer from "./redux/petInventory";
import modalVisibleReducer from "./redux/modalVisible";
import selectedMarketItemReducer from "./redux/selectedMarketItem";
import statsVisibleReducer from "./redux/statsVisible";
import achievementsVisibleReducer from "./redux/achievementsVisible";
import difficultyReducer from "./redux/difficulty";
import achievementsCompleteReducer from "./redux/achievementsComplete";
import achievementFilterReducer from "./redux/achievementFilter";
import marketplaceItemsBoughtReducer from "./redux/marketplaceItemsBought";
import statTrackerReducer from "./redux/statTracker";
import petMVR from "./redux/petModalVisible";
import selectedPetItemReducer from "./redux/selectedPetItem";
import loginReducer from "./redux/firstLogin";
import pinReducer from "./redux/createPIN";
import hintReducer from "./redux/hint";
import modalTaskReducer from "./redux/createTaskModal";
import editTaskReducer from "./redux/editTaskModal";
import datedTasksReducer from "./redux/datedTasks";
import selectedDateReducer from "./redux/selectedDate";
import taskEditIndexReducer from "./redux/taskEditIndex";
import taskInputReducer from "./redux/taskInput";
import dailyTaskModalReducer from "./redux/dailyTaskModal";
import daysCheckedReducer from "./redux/daysChecked";
import dailyTasksReducer from "./redux/dailyTasks";
import taskFilterReducer from "./redux/taskFilter";
import editDailyReducer from "./redux/editDailyTaskModal";
import currentDayReducer from "./redux/currentDay";
import weatherStatusReducer from "./redux/weatherStatus";
import { PersistGate } from 'redux-persist/lib/integration/react';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import difficultyCheckedReducer from "./redux/difficultyCheckedReducer";
import timeOfBarsReducer from './redux/timeOfBars';
import daysInARowReducer from "./redux/daysInARow";
import authenticatedReducer from "./redux/authenticated";
import temperatureReducer from "./redux/temperature";
import weatherImgReducer from "./redux/weatherImg";

import AppLoading from "expo-app-loading";
import {cacheImages} from "./components/cacheImages.js";

const reducer = combineReducers({
	coins: balanceReducer,
	shopItems: marketplaceInventoryReducer,
	petDetails: petInfoReducer,
	petInv: petInventoryReducer,
	modalVisible: modalVisibleReducer,
	selectedMarketItem: selectedMarketItemReducer,
	statsVisible: statsVisibleReducer,
	achievementsVisible: achievementsVisibleReducer,
	difficulty: difficultyReducer,
	achievements: achievementsCompleteReducer,
	achievementsFilter: achievementFilterReducer,
	itemsBought: marketplaceItemsBoughtReducer,
	userStats: statTrackerReducer,
	petMV: petMVR,
	selectedPetItem: selectedPetItemReducer,
	fun:funbarPointReducer,
	hunger: hungerbarPointReducer,
	hygiene: hygienebarPointReducer,
	health :healthBarReducer,
	firstLogin: loginReducer,
	pin: pinReducer,
	pintHint: hintReducer,
	taskCreateVisible: modalTaskReducer,
	editTaskVisible: editTaskReducer,
	datedTasks: datedTasksReducer,
	selectedDate: selectedDateReducer,
	taskEditIndex: taskEditIndexReducer,
	taskInput: taskInputReducer,
	dailyTaskVisible: dailyTaskModalReducer,
	daysChecked: daysCheckedReducer,
	dailyTasks: dailyTasksReducer,
	taskFilter: taskFilterReducer,
	dailyEditModal: editDailyReducer,
	currentDay: currentDayReducer,
	difficultyCheck: difficultyCheckedReducer,
	currentTimeArray: timeOfBarsReducer,
	weatherStatus: weatherStatusReducer,
	daysRow: daysInARowReducer,
	authenticated: authenticatedReducer,
	temperature: temperatureReducer,
	weatherImg: weatherImgReducer
});

const rootReducer = (state, action) => {
	if (action.type === RESET_BUTTON_PRESSED) {
		persistConfig.storage.removeItem('persist:root')
		state = undefined;
	}
	return reducer(state, action);
};

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer);
const persistor = persistStore(store);


const App = () => {
	// Pre-cache assets such as images

	const [assetsLoaded, setAssetsLoaded] = React.useState(false);

	const _loadAssetsAsync = async() => {
		const imageAssets = cacheImages([
			require("./images/cat_happy.gif"),
			require("./images/dog_happy.gif"),
			require("./images/cat.png"),
			require("./images/dog.png"),
			require('./images/rain.gif'),
			require("./images/cat_sad.gif"),
			require("./images/dog_sad.gif")
		])

		await Promise.all({...imageAssets});
	};

	if(!assetsLoaded){
		return(
			<AppLoading
				startAsync={_loadAssetsAsync}
				onFinish={() => setAssetsLoaded(true)}
				onError={console.warn}
			/>
		);
	}

	// Now load main app...AppUnwrapped //
	return (

		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<AppUnwrapped/>
			</PersistGate>
		</Provider>
	)
}

export default App;
