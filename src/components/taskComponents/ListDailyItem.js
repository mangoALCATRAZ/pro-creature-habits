import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React from "react";
import {showMessage} from "react-native-flash-message";
import {REWARD} from "../../redux/coinBalance";
import {SET_TASK_TEXT} from "../../redux/taskInput";
import {SET_INDEX} from "../../redux/taskEditIndex";
import {useDispatch, useSelector} from "react-redux";
import {COMPLETE_DAILY_TASK, REMOVE_TASK_DAILY} from "../../redux/dailyTasks";
import {DAILY_EDIT_ON} from "../../redux/editDailyTaskModal";
import {SET_DAYS} from "../../redux/daysChecked";
import {INCREMENT_STAT} from "../../redux/statTracker";
import {ACH_PROGRESS} from "../../redux/achievementsComplete";
import {FILTER_CHANGE} from "../../redux/achievementFilter";

const styles = StyleSheet.create({
	listItem: {
		paddingTop: '4%',
		paddingBottom: '4%',
		paddingLeft: '4%',
		margin: '3%',
		borderRadius: 10,
		marginTop: 0,
		backgroundColor: '#402688',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});


const ListDailyItem = ({task, index}) => {
	const iconSize = 30;
	let reward = 0;
	const dailyTask = useSelector(state=>state.dailyTasks)[index];
	const taskDays = dailyTask.days;
	const listLongDays = Object.keys(taskDays).filter(day => taskDays[day].on);
	const listDays = listLongDays.map(day => day.substring(0,3));
	const difficulty = useSelector(state => state.difficultyCheck);
	const dispatch = useDispatch();

	const onDelete = (index) => {
		dispatch({type: REMOVE_TASK_DAILY, data: index});
		showMessage({
			message: 'task deleted',
			type: "danger",
			statusBarHeight: 52,
		});
	}

	const onComplete = (index) => {
		dispatch({type: COMPLETE_DAILY_TASK, data: index});

		if(difficulty === 'easy'){
			reward = 3;
		}
		else if(difficulty === 'medium'){
			reward = 5;
		}
		else{
			reward = 10;
		}
		dispatch({type: REWARD, data: reward});
		dispatch({type: ACH_PROGRESS, data: 'complete_daily_task'});
		dispatch({type: INCREMENT_STAT, data: 'daily_tasks_completed'});
		showMessage({
			message: reward + ' coins have been added to your coin balance',
			type: "success",
			statusBarHeight: 52,
		});

	}

	const onPressEdit = (index) => {
		dispatch({type: DAILY_EDIT_ON});
		dispatch({type: SET_TASK_TEXT, data: task.task_name});
		dispatch({type: SET_DAYS, data: taskDays});
		dispatch({type: SET_INDEX, data: index});
	}

	return(
		<View style={styles.listItem}>
			<TouchableOpacity
				onPress={() => onComplete(index)}
			>
				<MaterialCommunityIcons
					name="checkbox-blank-circle-outline"
					size={30}
					color='white'
				/>
			</TouchableOpacity>
			<View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
				<Text style={{color: 'white', fontSize: 20, alignItems: 'center', width: 195}} color='white'>{task.task_name}</Text>
				<Text style={{color: 'white', fontSize: 12, alignItems: 'center', paddingTop: 5}} color='white'>
					{listDays.join(' ')}
				</Text>
				<Text style={{color: 'white', fontSize: 12, paddingTop: 5}} color='white'>
					{'Difficulty: ' + task.difficulty}
				</Text>
			</View>
			<View style = {{flexDirection:'row', marginRight: '5%', alignItems: 'center'}}>
				<TouchableOpacity
					onPress={() => onPressEdit(index)}
				>
					<MaterialCommunityIcons
						name = "pencil"
						size = {iconSize}
						color='white'
						style={{paddingRight: '2%'}}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => onDelete(index)}
				>
					<MaterialCommunityIcons
						name = "trash-can-outline"
						size = {iconSize}
						color='white'
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default ListDailyItem;
