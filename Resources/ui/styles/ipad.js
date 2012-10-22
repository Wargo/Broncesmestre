
var font = 'Gill Sans';

module.exports = {
	
	text: {
		font:{fontSize:16, fontFamily:font},
		color:'#666'
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
		font:{fontSize:20, fontFamily:font, fontWeight:'bold'},
		color:'#000',
		top:25,
		left:175,
		right:20
	},
	
	articleModel: {
		font:{fontSize:18, fontFamily:font},
		color:'#000',
		top:55,
		left:175,
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
		top:550,
		right:30,
		left:30,
		height:165,
		contentWidth:'auto',
		showHorizontalScrollIndicator:true,
		layout:'horizontal'
		//showPagingControl:true
	},
	
	separatorTop: {
		height:1,
		top:0,
		backgroundColor:'#8444'
	},
	
	separatorBottom: {
		height:1,
		bottom:0,
		backgroundColor:'#9000'
	},
	
	tableHeader: {
		font:{fontSize:18, fontFamily:font},//, fontWeight:'bold'
		color:'#333',
		height:30
	}
	
}
