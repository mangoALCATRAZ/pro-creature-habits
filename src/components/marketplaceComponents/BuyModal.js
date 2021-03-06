import {Image, Modal, Pressable, Text, View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {ItemInventory} from "../ItemInventory";
import {OFF} from "../../redux/modalVisible";
import React from "react";
import {PURCHASE_GRAY} from "../../redux/marketplaceItemsBought";
import {BUY} from "../../redux/coinBalance";
import {ADD_TO_STAT, INCREMENT_STAT, SET_STAT} from "../../redux/statTracker";
import {ADD} from "../../redux/petInventory";
import {ACH_PROGRESS} from "../../redux/achievementsComplete";
import {showMessage} from "react-native-flash-message";
import * as Progress from 'react-native-progress';
import {Ionicons} from "@expo/vector-icons";

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		margin: 10,
		backgroundColor: '#341f6f',
		borderRadius: 10,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		borderWidth: 1,
		borderColor: '#7276e3',

	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	button: {
		borderRadius: 7,
		width: 80,
		alignItems: 'center',
		padding: 10,
		elevation: 2,
		justifyContent: 'center',
		flexDirection: 'row',
	},
	modalFooter: {
		flexDirection: 'row',
		paddingTop: 15
	},
	itemImage: {
		width:80,
		height:80,
		shadowOffset: {width: 0, height: 1},
		shadowOpacity: 0.8,
		shadowRadius: 3,
		padding: 3,
	},
	textStyle: {
		color: 'white'
	},
})


const BuyModal = () => {
	const selectedItem = useSelector(state=>state.selectedMarketItem);
	const achievements = useSelector(state=>state.achievements);
	const dispatch = useDispatch();

	const upperCase = (string) => {
		return string[0].toUpperCase() + string.slice(1);
	}

	const handlePurchase = (item) => {
		dispatch({type: PURCHASE_GRAY, data: item});
		dispatch({type: BUY, data: ItemInventory[item].cost});
		dispatch({type: ADD_TO_STAT, data: ['total_coins_spent', ItemInventory[item].cost]})
		dispatch({type: OFF});
		dispatch({type: ADD, data: item});
		dispatch({type: ACH_PROGRESS, data: 'buy_item'});
		dispatch({type: INCREMENT_STAT, data: 'items_bought'})
		if(ItemInventory[item].category === 'food') {
			dispatch({type: ACH_PROGRESS, data: 'buy_food'});
			dispatch({type: SET_STAT, data: ['food_bought', achievements['buy_food'].completed]})
		} else if (ItemInventory[item].category === 'toys') {
			dispatch({type: ACH_PROGRESS, data: 'buy_toy'});
			dispatch({type: SET_STAT, data: ['clothes_bought', achievements['buy_toy'].completed]})
		} else if (ItemInventory[item].category === 'grooming') {
			dispatch({type: ACH_PROGRESS, data: 'buy_grooming'});
			dispatch({type: SET_STAT, data: ['grooming_bought', achievements['buy_grooming'].completed]})
		} else {
			dispatch({type: ACH_PROGRESS, data: 'buy_clothes'})
			dispatch({type: SET_STAT, data: ['toys_bought', achievements['buy_clothes'].completed]})
		}

		showMessage({
			message: `${upperCase(ItemInventory[item].name)} has been added to your inventory`,
			type: "success",
			statusBarHeight: 52,
		})
	}

	return (
		<View style={styles.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={useSelector(state=>state.modalVisible)}
			>
				{ItemInventory[selectedItem].cost <= useSelector(state=>state.coins) ? (
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '75%', alignItems: 'center'}}>
								<Image style={styles.itemImage} source={ItemInventory[selectedItem].uri}/>
								<View style={{alignItems: 'center', paddingBottom: 20}}>
									<Text style={{color: 'white', marginTop: 10, fontSize: 20, marginBottom: 5, fontWeight: 'bold', alignSelf: 'flex-start'}}>
										{Object.keys(ItemInventory[selectedItem].benefits)}
									</Text>
									<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
										<Progress.Bar
											progress={ItemInventory[selectedItem].benefits[Object.keys(ItemInventory[selectedItem].benefits)]}
											width={60}
											height={8}
											color='lightgreen'
											borderColor='white'
											borderWidth={0.8}
											style={{marginRight: 5}}
										/>
										<Ionicons name='arrow-up-circle-outline' color='white' size={18}/>
									</View>
								</View>
							</View>
							<Text style={{color: 'white', paddingTop: 10, paddingBottom: 10}}>{ItemInventory[selectedItem].buyText}</Text>
							<View style={styles.modalFooter}>
								<Pressable
									style={[styles.button, styles.buttonClose, {left: -30}]}
									onPress={() => dispatch({type: OFF})}
								>
									<Text style={styles.textStyle}>Cancel</Text>
								</Pressable>
								<Pressable
									style={[styles.button, styles.buttonClose, {right: -30}]}
									onPress={() => handlePurchase(selectedItem)}
								>
									<Text style={styles.textStyle}>Buy {ItemInventory[selectedItem].cost}</Text>
									<Image style={{width: 20, height: 20}} source={require('../../test_images/coin.png')}/>
								</Pressable>
							</View>
						</View>
					</View>
				) : (
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={{color: 'white', paddingTop: 10, paddingBottom: 10, textAlign: 'center'}}>{'You do not have enough coins\n to buy this item'}</Text>
							<View style={styles.modalFooter}>
								<Pressable
									style={[styles.button, styles.buttonClose]}
									onPress={() => dispatch({type: OFF})}
								>
									<Text style={styles.textStyle}>Close</Text>
								</Pressable>
							</View>
						</View>
					</View>

				)}
			</Modal>
		</View>
	)
}

export default BuyModal;
