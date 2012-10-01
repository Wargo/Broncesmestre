
module.exports = function() {
	
	var data = {
		categories: [
			{
				id:1,
				name:'Herrajes decorativos',
				num:603,
				image:'http://broncesmestre.com/catalogo/categorias/imagen/Catalogo/1.JPG',
				subcategories: [
					{
						id:1,
						name:'Herraje puertas',
						num:481,
						image:'http://broncesmestre.com/catalogo/categorias/imagen/Linea/HER.JPG',
						subcategories: [
						
						]
					},
					{
						id:2,
						name:'Herraje Muebles',
						num:101,
						image:'http://broncesmestre.com/catalogo/categorias/imagen/Linea/HEM.JPG',
						subcategories: [
						
						]
					},
					{
						id:3,
						name:'Accesorios herraje',
						num:21,
						image:'http://broncesmestre.com/catalogo/categorias/imagen/Linea/ACH.JPG',
						subcategories: [
						
						]
					}
				]
			},
			{
				id:2,
				name:'Grifería artística',
				num:643,
				image:'http://broncesmestre.com/catalogo/categorias/imagen/Catalogo/2.JPG'
			},
			{
				id:3,
				name:'Iluminación decorativa',
				num:8,
				image:'http://broncesmestre.com/catalogo/categorias/imagen/Catalogo/3.JPG'
			}
		]
	};
	
	return data;
	
}
