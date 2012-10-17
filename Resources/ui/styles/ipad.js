
var font = 'Gill Sans'

module.exports = {
	
	text: {
		font:{fontSize:18, fontFamily:font},
		color:'#333'
	},
	
	textMenu: {
		font:{fontSize:18, fontFamily:font},
		color:'#FFF',
		left:70
	},
	
	homeBlockText: {
		//bottom:20,
		font:{fontSize:24, fontFamily:font},
		color:'#FFF',
		shadowColor:'#000',
		shadowOffset:{x:1,y:1},
		left:75
	},
	
	homeBtn: {
		height:60,
		//top:20,
		//left:5
	},
	
	articleTitle: {
		font:{fontSize:25, fontFamily:font},
		color:'#333',
		top:330,
		left:20,
		right:20
	},
	
	articleText: {
		font:{fontSize:15, fontFamily:font},
		color:'#999',
		top:370,
		left:20,
		right:20
	},
	
	articleImages: {
		top:0,
		right:0,
		height:300,
		showPagingControl:true
	},
	
	separatorTop: {
		height:1,
		top:0,
		backgroundColor:'#5333'
	},
	
	separatorBottom: {
		height:1,
		bottom:0,
		backgroundColor:'#5000'
	}
	
}
